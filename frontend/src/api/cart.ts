import { api } from './client';

export interface CartValidationItem {
  productId: number;
  slug?: string;
  name?: string;
  price?: number;
  quantity: number;
  isAvailable?: boolean;
  lineTotal?: number;
  valid?: boolean;
  reason?: string;
}

export const validateCart = async (items: { id: number; quantity: number }[]) => {
  const response = await api.post<{ items: CartValidationItem[]; total: number }>('/cart/validate', { items });
  return response.data;
};
