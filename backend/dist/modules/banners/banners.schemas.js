import { z } from 'zod';
export const bannerSchema = z.object({
    title: z.string().min(2),
    subtitle: z.string().optional(),
    image: z.string().min(1),
    link: z.string().optional(),
    active: z.boolean().default(true),
    order: z.coerce.number().int().min(0).default(0)
});
