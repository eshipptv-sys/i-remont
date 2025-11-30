import { Condition, ProductCategory } from '@prisma/client';

export type ProductFilters = {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  memory?: string;
  color?: string;
  condition?: Condition;
  search?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  sort?: 'price-asc' | 'price-desc' | 'new' | 'popular';
};
