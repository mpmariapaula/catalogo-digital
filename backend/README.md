# Backend do Catálogo Digital

Este backend foi preparado para substituir o `localStorage` do painel admin por persistência real com:

- Node.js + Express
- Prisma
- PostgreSQL
- JWT para autenticação
- Upload local de imagens com Multer

## Rotas principais

- `POST /auth/login`
- `GET|POST|PUT|DELETE /categories`
- `GET|POST|PUT|DELETE /subcategories`
- `GET|POST|PUT|DELETE /products`
- `GET|POST|PUT|DELETE /banners`
- `POST /uploads/image`

## Passo a passo

1. Copie `.env.example` para `.env`
2. Instale as dependências com `npm install`
3. Gere o Prisma Client com `npm run prisma:generate`
4. Rode as migrations com `npm run prisma:migrate`
5. Suba o servidor com `npm run dev`

## Observações

- O primeiro login usa `ADMIN_EMAIL` e `ADMIN_PASSWORD` do `.env`
- Se o admin ainda não existir, ele será criado automaticamente no primeiro login bem-sucedido
- O upload está local para agilizar a implantação inicial. Depois, o ideal é trocar para S3 ou Cloudinary.
