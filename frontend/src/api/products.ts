import { api } from './client';
import { Product } from '../types';

export interface ProductListResponse {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  memory?: string;
  color?: string;
  condition?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const fetchProducts = async (filters: ProductFilters) => {
  const response = await api.get<ProductListResponse>('/products', { params: filters });
  return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
  const response = await api.get<{ product: Product; related: Product[] }>(`/products/${slug}`);
  return response.data;
};
