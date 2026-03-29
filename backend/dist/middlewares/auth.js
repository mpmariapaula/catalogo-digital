import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../shared/AppError.js';
export function ensureAuthenticated(request, _response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('Token não informado.', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        request.user = {
            id: decoded.sub,
            email: decoded.email
        };
        return next();
    }
    catch {
        throw new AppError('Token inválido.', 401);
    }
}
