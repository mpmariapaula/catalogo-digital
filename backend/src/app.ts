import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { env } from './config/env.js';
import { authRouter } from './modules/auth/auth.controller.js';
import { categoriesRouter } from './modules/categories/categories.controller.js';
import { subcategoriesRouter } from './modules/subcategories/subcategories.controller.js';
import { productsRouter } from './modules/products/products.controller.js';
import { bannersRouter } from './modules/banners/banners.controller.js';
import { uploadsRouter } from './modules/uploads/uploads.controller.js';
import { ensureAuthenticated } from './middlewares/auth.js';
import { errorHandler } from './middlewares/error-handler.js';
import { prisma } from './lib/prisma.js';

export const app = express();

app.use(cors({ origin: env.APP_WEB_URL }));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));

app.get('/health', (_request, response) => {
  return response.json({ status: 'ok' });
});

app.get('/public/catalog', async (_request, response) => {
  const [categories, subcategories, products, banners] = await Promise.all([
    prisma.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
    prisma.subcategory.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
    prisma.product.findMany({
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.banner.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  ]);

  return response.json({ categories, subcategories, products, banners });
});

app.use('/auth', authRouter);
app.use('/uploads', ensureAuthenticated, uploadsRouter);
app.use('/categories', ensureAuthenticated, categoriesRouter);
app.use('/subcategories', ensureAuthenticated, subcategoriesRouter);
app.use('/products', ensureAuthenticated, productsRouter);
app.use('/banners', ensureAuthenticated, bannersRouter);

app.use(errorHandler);
