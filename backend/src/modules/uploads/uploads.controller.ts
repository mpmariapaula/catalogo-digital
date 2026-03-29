import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { Router } from 'express';
import { env } from '../../config/env.js';

const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => callback(null, uploadDir),
  filename: (_request, file, callback) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    callback(null, safeName);
  }
});

const upload = multer({ storage });

export const uploadsRouter = Router();

uploadsRouter.post('/image', upload.single('file'), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: 'Arquivo não enviado.' });
  }

  return response.status(201).json({
    url: `/uploads/${request.file.filename}`,
    publicId: request.file.filename,
    filename: request.file.filename
  });
});
