import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0)
});
