import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { slugify } from '../../shared/slug.js';
import { subcategorySchema } from './subcategories.schemas.js';

export const subcategoriesRouter = Router();

subcategoriesRouter.get('/', async (_request, response) => {
  const subcategories = await prisma.subcategory.findMany({
    include: { category: true },
    orderBy: [{ order: 'asc' }, { name: 'asc' }]
  });

  return response.json(subcategories);
});

subcategoriesRouter.post('/', async (request, response) => {
  const data = subcategorySchema.parse(request.body);

  const subcategory = await prisma.subcategory.create({
    data: {
      ...data,
      slug: data.slug ?? slugify(data.name)
    }
  });

  return response.status(201).json(subcategory);
});

subcategoriesRouter.put('/:id', async (request, response) => {
  const data = subcategorySchema.partial().parse(request.body);

  const subcategory = await prisma.subcategory.update({
    where: { id: request.params.id },
    data: {
      ...data,
      slug: data.slug ?? (data.name ? slugify(data.name) : undefined)
    }
  });

  return response.json(subcategory);
});

subcategoriesRouter.delete('/:id', async (request, response) => {
  await prisma.subcategory.delete({ where: { id: request.params.id } });
  return response.status(204).send();
});
