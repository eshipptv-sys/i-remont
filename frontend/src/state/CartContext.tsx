import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (slug: string) => void;
  update: (slug: string, quantity: number) => void;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) => (i.product.slug === product.slug ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  const update = (slug: string, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.product.slug === slug ? { ...i, quantity } : i)));

  const total = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, add, remove, update, total }}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('CartContext missing');
  return ctx;
};
