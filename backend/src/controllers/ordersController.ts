import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { ContactMethod, DeliveryType } from '@prisma/client';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Укажите имя'),
  phone: z.string().min(5, 'Укажите телефон'),
  email: z.string().email().optional().or(z.literal('').transform(() => undefined)),
  contactMethod: z.nativeEnum(ContactMethod),
  deliveryType: z.nativeEnum(DeliveryType),
  city: z.string().optional(),
  addressLine: z.string().optional(),
  apartment: z.string().optional(),
  comment: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1)
      })
    )
    .nonempty('Добавьте товары')
});

export const createOrder = async (req: Request, res: Response) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Некорректные данные заказа', issues: parsed.error.issues });
  }

  const orderData = parsed.data;

  if (orderData.deliveryType !== DeliveryType.PICKUP) {
    if (!orderData.city || !orderData.addressLine) {
      return res.status(400).json({ message: 'Укажите адрес для доставки' });
    }
  }

  try {
    const ids = orderData.items.map((item) => item.productId);
    const products = await prisma.product.findMany({ where: { id: { in: ids } } });

    const lineItems = orderData.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Товар ${item.productId} не найден`);
      }
      const price = product.priceCurrent;
      return { ...item, price, name: product.name };
    });

    const totalAmount = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          customerName: orderData.customerName,
          phone: orderData.phone,
          email: orderData.email,
          contactMethod: orderData.contactMethod,
          deliveryType: orderData.deliveryType,
          city: orderData.city,
          addressLine: orderData.addressLine,
          apartment: orderData.apartment,
          comment: orderData.comment,
          totalAmount
        }
      });

      await tx.orderItem.createMany({
        data: lineItems.map((item) => ({
          orderId: createdOrder.id,
          productId: item.productId,
          price: item.price,
          quantity: item.quantity
        }))
      });

      return createdOrder;
    });

    res.status(201).json({ orderId: order.id, totalAmount });
  } catch (error) {
    console.error('createOrder error', error);
    res.status(500).json({ message: 'Не удалось создать заказ' });
  }
};
