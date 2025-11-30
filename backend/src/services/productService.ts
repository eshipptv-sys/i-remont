import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';
import { slugify } from '../utils/slug.js';

export interface ProductPayload {
  name: string;
  brand: string;
  categoryId: number;
  price: number;
  oldPrice?: number | null;
  inStock: boolean;
  shortDescription: string;
  description: string;
  memory?: string | null;
  color?: string | null;
  mainImageUrl: string;
  gallery?: { url: string; position?: number }[];
  characteristics: Record<string, string>;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  isFeatured?: boolean;
}

export const productService = {
  async list(params: {
    brand?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc' | 'newest';
    featured?: boolean;
    search?: string;
    page?: number;
    take?: number;
  }) {
    const {
      brand,
      category,
      minPrice,
      maxPrice,
      sort = 'newest',
      featured,
      search,
      page = 1,
      take = 12,
    } = params;

    const where: Prisma.ProductWhereInput = {};
    if (brand) where.brand = brand;
    if (category) where.category = { slug: category };
    if (typeof featured === 'boolean') where.isFeatured = featured;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {} as Prisma.DecimalFilter;
      if (minPrice) where.price.gte = new Prisma.Decimal(minPrice);
      if (maxPrice) where.price.lte = new Prisma.Decimal(maxPrice);
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
      switch (sort) {
        case 'price_asc':
          return { price: 'asc' };
        case 'price_desc':
          return { price: 'desc' };
        case 'newest':
        default:
          return { createdAt: 'desc' };
      }
    })();

    const skip = (page - 1) * take;

    const [total, items] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: { images: true, category: true },
      }),
    ]);

    return {
      total,
      page,
      take,
      items,
    };
  },

  async bySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: { images: true, category: true },
    });
  },

  async create(payload: ProductPayload) {
    const slug = slugify(payload.name);
    return prisma.product.create({
      data: {
        ...payload,
        slug,
        price: new Prisma.Decimal(payload.price),
        oldPrice: payload.oldPrice ? new Prisma.Decimal(payload.oldPrice) : null,
        characteristics: payload.characteristics,
        images: payload.gallery
          ? {
              create: payload.gallery.map((img, idx) => ({ url: img.url, position: img.position ?? idx })),
            }
          : undefined,
      },
      include: { images: true, category: true },
    });
  },

  async update(id: number, payload: Partial<ProductPayload>) {
    const data: Prisma.ProductUpdateInput = {
      ...payload,
      price: payload.price ? new Prisma.Decimal(payload.price) : undefined,
      oldPrice: payload.oldPrice === undefined ? undefined : payload.oldPrice ? new Prisma.Decimal(payload.oldPrice) : null,
      characteristics: payload.characteristics,
    };
    if (payload.name) data.slug = slugify(payload.name);
    if (payload.gallery) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      data.images = {
        create: payload.gallery.map((img, idx) => ({ url: img.url, position: img.position ?? idx })),
      };
    }

    return prisma.product.update({ where: { id }, data, include: { images: true, category: true } });
  },

  async remove(id: number) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    return prisma.product.delete({ where: { id } });
  },
};
