import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../shared/AppError.js';

interface TokenPayload {
  sub: string;
  email: string;
}

export function ensureAuthenticated(request: Request, _response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não informado.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    request.user = {
      id: decoded.sub,
      email: decoded.email
    };

    return next();
  } catch {
    throw new AppError('Token inválido.', 401);
  }
}
