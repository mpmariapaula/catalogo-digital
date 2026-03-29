import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { bannerSchema } from './banners.schemas.js';

export const bannersRouter = Router();

bannersRouter.get('/', async (_request, response) => {
  const banners = await prisma.banner.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
  });

  return response.json(banners);
});

bannersRouter.post('/', async (request, response) => {
  const data = bannerSchema.parse(request.body);
  const banner = await prisma.banner.create({ data });
  return response.status(201).json(banner);
});

bannersRouter.put('/:id', async (request, response) => {
  const data = bannerSchema.partial().parse(request.body);
  const banner = await prisma.banner.update({
    where: { id: request.params.id },
    data
  });

  return response.json(banner);
});

bannersRouter.delete('/:id', async (request, response) => {
  await prisma.banner.delete({ where: { id: request.params.id } });
  return response.status(204).send();
});
