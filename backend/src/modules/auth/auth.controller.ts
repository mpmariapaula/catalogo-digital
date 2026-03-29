import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';
import { env } from '../../config/env.js';
import { comparePassword, hashPassword } from '../../shared/hash.js';
import { AppError } from '../../shared/AppError.js';
import { loginSchema } from './auth.schemas.js';

export const authRouter = Router();

authRouter.post('/login', async (request, response) => {
  const { email, password } = loginSchema.parse(request.body);

  let admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin && email === env.ADMIN_EMAIL) {
    admin = await prisma.admin.create({
      data: {
        email: env.ADMIN_EMAIL,
        passwordHash: await hashPassword(env.ADMIN_PASSWORD)
      }
    });
  }

  if (!admin) {
    throw new AppError('Credenciais inválidas.', 401);
  }

  const passwordMatches = await comparePassword(password, admin.passwordHash);

  if (!passwordMatches) {
    throw new AppError('Credenciais inválidas.', 401);
  }

  const token = jwt.sign({ email: admin.email }, env.JWT_SECRET, {
    subject: admin.id,
    expiresIn: '1d'
  });

  return response.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email
    }
  });
});
