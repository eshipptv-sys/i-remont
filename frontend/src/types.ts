export interface ProductImage {
  id: number;
  url: string;
  position: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number | null;
  inStock: boolean;
  shortDescription: string;
  description: string;
  memory?: string | null;
  color?: string | null;
  mainImageUrl: string;
  characteristics: Record<string, string>;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export interface PaginatedProducts {
  total: number;
  page: number;
  take: number;
  items: Product[];
}
