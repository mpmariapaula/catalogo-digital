import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { slugify } from '../../shared/slug.js';
import { categorySchema } from './categories.schemas.js';
export const categoriesRouter = Router();
categoriesRouter.get('/', async (_request, response) => {
    const categories = await prisma.category.findMany({
        orderBy: [{ order: 'asc' }, { name: 'asc' }]
    });
    return response.json(categories);
});
categoriesRouter.post('/', async (request, response) => {
    const data = categorySchema.parse(request.body);
    const category = await prisma.category.create({
        data: {
            ...data,
            slug: data.slug ?? slugify(data.name)
        }
    });
    return response.status(201).json(category);
});
categoriesRouter.put('/:id', async (request, response) => {
    const data = categorySchema.partial().parse(request.body);
    const category = await prisma.category.update({
        where: { id: request.params.id },
        data: {
            ...data,
            slug: data.slug ?? (data.name ? slugify(data.name) : undefined)
        }
    });
    return response.json(category);
});
categoriesRouter.delete('/:id', async (request, response) => {
    await prisma.category.delete({ where: { id: request.params.id } });
    return response.status(204).send();
});
