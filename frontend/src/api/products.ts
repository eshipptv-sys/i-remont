import { PaginatedProducts, Product, Category } from '../types';
import { api } from './client';

export const fetchProducts = (params: Record<string, string | number | boolean | undefined> = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.append(key, String(value));
  });
  const qs = query.toString();
  return api<PaginatedProducts>(`/products${qs ? `?${qs}` : ''}`);
};

export const fetchProduct = (slug: string) => api<Product>(`/products/${slug}`);
export const fetchCategories = () => api<Category[]>(`/categories`);

export const login = (email: string, password: string) =>
  api<{ token: string; user: { id: number; email: string; name: string } }>(`/admin/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const createProduct = (token: string, payload: Partial<Product>) =>
  api<Product>(`/admin/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

export const updateProduct = (token: string, id: number, payload: Partial<Product>) =>
  api<Product>(`/admin/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

export const deleteProduct = (token: string, id: number) =>
  api<void>(`/admin/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateAvailability = (token: string, id: number, inStock: boolean) =>
  api<Product>(`/admin/products/${id}/availability`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ inStock }),
  });
