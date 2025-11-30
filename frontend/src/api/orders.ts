import { api } from './client';
import { OrderPayload } from '../types';

export const createOrder = async (payload: OrderPayload) => {
  const response = await api.post<{ orderId: number; totalAmount: number }>('/orders', payload);
  return response.data;
};
