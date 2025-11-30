import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';

const cartSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.number(),
        quantity: z.number().min(1)
      })
    )
    .nonempty('Корзина пуста')
});

export const validateCart = async (req: Request, res: Response) => {
  const parseResult = cartSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Неверный формат корзины', issues: parseResult.error.issues });
  }

  const { items } = parseResult.data;
  const ids = items.map((item) => item.id);

  try {
    const products = await prisma.product.findMany({ where: { id: { in: ids } } });
    const mapped = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        return { ...item, valid: false, reason: 'Товар не найден' };
      }

      const lineTotal = product.priceCurrent * item.quantity;
      return {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.priceCurrent,
        quantity: item.quantity,
        isAvailable: product.isAvailable,
        lineTotal
      };
    });

    const total = mapped.reduce((acc, item: any) => acc + (item.lineTotal || 0), 0);
    res.json({ items: mapped, total });
  } catch (error) {
    console.error('validateCart error', error);
    res.status(500).json({ message: 'Не удалось проверить корзину' });
  }
};
