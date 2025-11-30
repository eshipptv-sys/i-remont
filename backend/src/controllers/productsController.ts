import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { ProductFilters, PaginationParams } from '../models/product.js';
import { Condition, ProductCategory, Prisma } from '@prisma/client';

const parseFilters = (query: Request['query']): ProductFilters => {
  const filters: ProductFilters = {};

  if (query.category && typeof query.category === 'string') {
    const category = query.category.toUpperCase();
    if (Object.keys(ProductCategory).includes(category)) {
      filters.category = category as ProductCategory;
    }
  }

  if (query.minPrice) filters.minPrice = Number(query.minPrice);
  if (query.maxPrice) filters.maxPrice = Number(query.maxPrice);
  if (query.memory && typeof query.memory === 'string') filters.memory = query.memory;
  if (query.color && typeof query.color === 'string') filters.color = query.color;

  if (query.condition && typeof query.condition === 'string') {
    const value = query.condition.toUpperCase();
    if (Object.keys(Condition).includes(value)) {
      filters.condition = value as Condition;
    }
  }

  if (query.search && typeof query.search === 'string') {
    filters.search = query.search;
  }

  return filters;
};

const parsePagination = (query: Request['query']): PaginationParams => {
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 12;
  const sort = query.sort as PaginationParams['sort'];

  return { page, limit, sort };
};

const buildWhere = (filters: ProductFilters) => {
  const where: any = {};
  if (filters.category) where.category = filters.category;
  if (filters.memory) where.memory = filters.memory;
  if (filters.color) where.color = filters.color;
  if (filters.condition) where.condition = filters.condition;
  if (filters.minPrice || filters.maxPrice) {
    where.priceCurrent = {};
    if (filters.minPrice) where.priceCurrent.gte = filters.minPrice;
    if (filters.maxPrice) where.priceCurrent.lte = filters.maxPrice;
  }
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { shortDescription: { contains: filters.search, mode: 'insensitive' } },
      { fullDescription: { contains: filters.search, mode: 'insensitive' } }
    ];
  }
  return where;
};

const buildOrderBy = (sort?: PaginationParams['sort']): Prisma.ProductOrderByWithRelationInput => {
  switch (sort) {
    case 'price-asc':
      return { priceCurrent: 'asc' };
    case 'price-desc':
      return { priceCurrent: 'desc' };
    case 'popular':
      return { createdAt: 'asc' };
    case 'new':
    default:
      return { createdAt: 'desc' };
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const filters = parseFilters(req.query);
  const { page = 1, limit = 12, sort } = parsePagination(req.query);
  const skip = (page - 1) * limit;

  try {
    const where = buildWhere(filters);
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: buildOrderBy(sort)
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('getProducts error', error);
    res.status(500).json({ message: 'Не удалось загрузить каталог' });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    const related = await prisma.product.findMany({
      where: {
        category: product.category,
        NOT: { id: product.id }
      },
      take: 4
    });

    res.json({ product, related });
  } catch (error) {
    console.error('getProductBySlug error', error);
    res.status(500).json({ message: 'Не удалось загрузить товар' });
  }
};
