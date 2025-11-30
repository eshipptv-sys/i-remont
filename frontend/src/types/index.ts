export type ProductCategory =
  | 'IPHONE'
  | 'AIRPODS'
  | 'IPAD'
  | 'MAC'
  | 'WATCH'
  | 'ACCESSORY'
  | 'OTHER';

export type Condition = 'NEW' | 'LIKE_NEW' | 'USED';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  priceCurrent: number;
  priceOld?: number | null;
  memory: string;
  color: string;
  condition: Condition;
  isAvailable: boolean;
  shortDescription: string;
  fullDescription: string;
  mainImageUrl: string;
  gallery: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  customerName: string;
  phone: string;
  email?: string;
  contactMethod: 'WHATSAPP' | 'TELEGRAM' | 'CALL';
  deliveryType: 'MOSCOW' | 'RUSSIA' | 'PICKUP';
  city?: string;
  addressLine?: string;
  apartment?: string;
  comment?: string;
  items: { productId: number; quantity: number }[];
}
