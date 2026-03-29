export type PersonalizationType = 'none' | 'name' | 'number' | 'both';

export type ProductStatus = 'available' | 'on-order' | 'sold-out';

export type ProductModel = 'I' | 'II' | 'III';

export type ProductQuality = 'premium-aaa' | 'thai' | 'standard';

export type ProductGender = 'masculina' | 'feminina' | 'infantil';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  slug?: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  images: string[];
  sizes: string[];
  model: ProductModel;
  season: string;
  quality: ProductQuality;
  gender: ProductGender;
  material: string;
  status: ProductStatus;
  description?: string;
  personalizationType?: PersonalizationType;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  personalization: PersonalizationType;
  customName?: string;
  customNumber?: string;
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  active: boolean;
  order: number;
}
