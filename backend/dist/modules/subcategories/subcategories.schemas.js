import { z } from 'zod';
export const subcategorySchema = z.object({
    categoryId: z.string().min(1),
    name: z.string().min(2),
    slug: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    order: z.coerce.number().int().min(0).default(0)
});
