import { ProductGender, ProductModel, ProductQuality, ProductStatus, PersonalizationType } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../../lib/prisma.js';
import { slugify } from '../../shared/slug.js';
import { productSchema } from './products.schemas.js';

export const productsRouter = Router();

productsRouter.get('/', async (_request, response) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { order: 'asc' } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const product = await prisma.product.findUnique({
    where: { id: request.params.id },
    include: {
      category: true,
      subcategory: true,
      images: { orderBy: { order: 'asc' } }
    }
  });

  return response.json(product);
});

productsRouter.post('/', async (request, response) => {
  const data = productSchema.parse(request.body);

  const product = await prisma.product.create({
    data: {
      productId: data.productId,
      name: data.name,
      slug: data.slug ?? slugify(data.name),
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      sizes: data.sizes,
      model: prismaModel(data.model),
      season: data.season,
      quality: prismaQuality(data.quality),
      gender: prismaGender(data.gender),
      material: data.material,
      status: prismaStatus(data.status),
      personalizationType: prismaPersonalization(data.personalizationType),
      featured: data.featured,
      images: {
        create: data.images
      }
    },
    include: { images: true }
  });

  return response.status(201).json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const data = productSchema.partial().parse(request.body);

  const product = await prisma.$transaction(async tx => {
    if (data.images) {
      await tx.productImage.deleteMany({ where: { productId: request.params.id } });
    }

    return tx.product.update({
      where: { id: request.params.id },
      data: {
        productId: data.productId,
        name: data.name,
        slug: data.slug ?? (data.name ? slugify(data.name) : undefined),
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        sizes: data.sizes,
        model: data.model ? prismaModel(data.model) : undefined,
        season: data.season,
        quality: data.quality ? prismaQuality(data.quality) : undefined,
        gender: data.gender ? prismaGender(data.gender) : undefined,
        material: data.material,
        status: data.status ? prismaStatus(data.status) : undefined,
        personalizationType: data.personalizationType ? prismaPersonalization(data.personalizationType) : undefined,
        featured: data.featured,
        images: data.images ? { create: data.images } : undefined
      },
      include: { images: { orderBy: { order: 'asc' } } }
    });
  });

  return response.json(product);
});

productsRouter.delete('/:id', async (request, response) => {
  await prisma.product.delete({ where: { id: request.params.id } });
  return response.status(204).send();
});

function prismaStatus(value: 'available' | 'on-order' | 'sold-out') {
  const map: Record<string, ProductStatus> = {
    available: 'AVAILABLE',
    'on-order': 'ON_ORDER',
    'sold-out': 'SOLD_OUT'
  };

  return map[value];
}

function prismaModel(value: 'I' | 'II' | 'III') {
  return value as ProductModel;
}

function prismaQuality(value: 'premium-aaa' | 'thai' | 'standard') {
  const map: Record<string, ProductQuality> = {
    'premium-aaa': 'PREMIUM_AAA',
    thai: 'THAI',
    standard: 'STANDARD'
  };

  return map[value];
}

function prismaGender(value: 'masculina' | 'feminina' | 'infantil') {
  const map: Record<string, ProductGender> = {
    masculina: 'MASCULINA',
    feminina: 'FEMININA',
    infantil: 'INFANTIL'
  };

  return map[value];
}

function prismaPersonalization(value: 'none' | 'name' | 'number' | 'both') {
  const map: Record<string, PersonalizationType> = {
    none: 'NONE',
    name: 'NAME',
    number: 'NUMBER',
    both: 'BOTH'
  };

  return map[value];
}
