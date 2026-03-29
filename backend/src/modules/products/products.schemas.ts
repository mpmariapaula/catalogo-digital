import { z } from 'zod';

export const productImageSchema = z.object({
  url: z.string().min(1),
  publicId: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0)
});

export const productSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  sizes: z.array(z.string().min(1)).default([]),
  model: z.enum(['I', 'II', 'III']),
  season: z.string().min(1),
  quality: z.enum(['premium-aaa', 'thai', 'standard']),
  gender: z.enum(['masculina', 'feminina', 'infantil']),
  material: z.string().min(1),
  status: z.enum(['available', 'on-order', 'sold-out']),
  personalizationType: z.enum(['none', 'name', 'number', 'both']).default('none'),
  featured: z.boolean().default(false),
  images: z.array(productImageSchema).default([])
});
