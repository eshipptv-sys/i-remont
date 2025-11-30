import { Request, Response } from 'express';
import { Product, Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { productService, ProductPayload } from '../services/productService.js';

const productSchema = z.object({
  name: z.string().min(2),
  brand: z.string().min(2),
  categoryId: z.number(),
  price: z.number(),
  oldPrice: z.number().nullable().optional(),
  inStock: z.boolean(),
  shortDescription: z.string().min(2),
  description: z.string().min(2),
  memory: z.string().optional(),
  color: z.string().optional(),
  mainImageUrl: z.string().url(),
  gallery: z.array(z.object({ url: z.string().url(), position: z.number().optional() })).optional(),
  characteristics: z.record(z.string()).default({}),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
});

const formatProduct = (product: Product & { images: any; category: any }) => ({
  ...product,
  price: Number(product.price),
  oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
});

export const productController = {
  async list(req: Request, res: Response) {
    const { brand, category, minPrice, maxPrice, sort, featured, search, page, take } = req.query;
    const result = await productService.list({
      brand: brand as string | undefined,
      category: category as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort: sort as 'price_asc' | 'price_desc' | 'newest' | undefined,
      featured: featured ? featured === 'true' : undefined,
      search: search as string | undefined,
      page: page ? Number(page) : undefined,
      take: take ? Number(take) : undefined,
    });
    return res.json({ ...result, items: result.items.map((item) => formatProduct(item as any)) });
  },

  async getOne(req: Request, res: Response) {
    const { slug } = req.params;
    const product = await productService.bySlug(slug);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(formatProduct(product as any));
  },

  async create(req: Request, res: Response) {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Invalid data', errors: parsed.error.flatten() });

    const payload = parsed.data as ProductPayload;
    const product = await productService.create(payload);
    return res.status(201).json(formatProduct(product as any));
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: 'Invalid data', errors: parsed.error.flatten() });

    const product = await productService.update(Number(id), parsed.data);
    return res.json(formatProduct(product as any));
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await productService.remove(Number(id));
    return res.status(204).send();
  },

  async setAvailability(req: Request, res: Response) {
    const { id } = req.params;
    const { inStock } = req.body;
    if (typeof inStock !== 'boolean') return res.status(400).json({ message: 'inStock must be boolean' });

    const product = await prisma.product.update({ where: { id: Number(id) }, data: { inStock } });
    return res.json(formatProduct(product as any));
  },
};
