# Jersey Store - Loja de Réplicas de Camisas de Futebol

Sistema completo de e-commerce para venda de réplicas de camisas de futebol com painel administrativo integrado.

## 🎯 Funcionalidades

### Para Clientes (Site Público)
- ✅ Navegação por categorias (Seleções, Clubes)
- ✅ Navegação por subcategorias (Brasil, Argentina, Real Madrid, etc.)
- ✅ Visualização de produtos com múltiplas imagens
- ✅ Seleção de tamanhos
- ✅ Personalização (Nome, Número ou Ambos)
- ✅ Carrinho de compras
- ✅ Finalização via WhatsApp (pedido formatado)
- ✅ Design responsivo e elegante

### Para Administradores (Painel Admin)
- ✅ Dashboard com estatísticas
- ✅ **Gerenciar Produtos**
  - Adicionar, editar e excluir produtos
  - Upload de múltiplas imagens (URLs)
  - Definir: nome, preço, ID do produto, categoria, subcategoria
  - Modelo (I, II, III), temporada, qualidade, material
  - Tamanhos disponíveis
  - Status (Disponível, Sob Encomenda, Esgotado)
- ✅ **Gerenciar Categorias**
  - Criar categorias principais (ex: Seleções, Clubes)
  - Editar e excluir categorias
- ✅ **Gerenciar Subcategorias**
  - Criar subcategorias (ex: Brasil, Argentina dentro de Seleções)
  - Adicionar imagens para cada subcategoria
  - Editar e excluir subcategorias
- ✅ **Gerenciar Banners**
  - Criar banners para a página inicial
  - Ativar/desativar banners
  - Definir ordem de exibição

## 🔐 Acesso ao Painel Administrativo

### Como Acessar:
1. Acesse: `/admin/login`
2. Senha padrão: `admin123`
3. Após login, você será redirecionado para o dashboard

**⚠️ IMPORTANTE:** Para alterar a senha, edite o arquivo:
- `/src/app/context/AuthContext.tsx`
- Linha 8: `const ADMIN_PASSWORD = 'admin123';`

### Link Discreto no Site:
- No rodapé do site há um link "Admin" discreto que leva ao login

## 📱 Configuração do WhatsApp

Para que os pedidos sejam enviados para o seu WhatsApp:

1. Abra o arquivo: `/src/app/components/public/CartSheet.tsx`
2. Na linha 21, altere o número:
   ```typescript
   const whatsappNumber = '5511999999999'; // Substitua pelo seu número
   ```
3. Use o formato: Código do país + DDD + Número
   - Exemplo Brasil: `5511999999999` (55 + 11 + 999999999)

## 🗂️ Estrutura de Dados

### Categorias
- **ID**: Identificador único (gerado automaticamente)
- **Nome**: Ex: "Seleções", "Clubes"
- **Slug**: URL amigável (ex: "selecoes", "clubes")
- **Descrição**: Texto descritivo
- **Ordem**: Ordem de exibição

### Subcategorias
- **Categoria Pai**: Vinculada a uma categoria
- **Nome**: Ex: "Brasil", "Real Madrid"
- **Slug**: URL amigável
- **Imagem**: URL da imagem representativa
- **Descrição**: Texto descritivo
- **Ordem**: Ordem de exibição

### Produtos
- **ID do Produto**: Código único para WhatsApp (ex: BRA-001)
- **Nome**: Nome completo do produto
- **Preço**: Valor em reais
- **Categoria e Subcategoria**: Classificação
- **Imagens**: Múltiplas URLs de imagens
- **Tamanhos**: Lista separada por vírgula (ex: P, M, G, GG)
- **Modelo**: I (Titular), II (Reserva), III (Alternativo)
- **Temporada**: Ex: "2024/2025", "2026"
- **Qualidade**: Premium AAA, Thai, Standard
- **Material**: Ex: "Dry-fit Premium"
- **Status**: Disponível, Sob Encomenda, Esgotado
- **Descrição**: Texto descritivo do produto

## 💰 Preços de Personalização

Os valores são adicionados automaticamente no carrinho:
- **Nome OU Número**: + R$ 15,00
- **Nome E Número**: + R$ 25,00

## 🎨 Design

O site possui um design:
- ✨ Sofisticado e elegante
- 🎯 Clean e minimalista
- 💎 Cor de destaque: #0D0678 (usado com sutileza)
- 📱 Totalmente responsivo
- ⚡ Animações suaves com Motion (Framer Motion)

## 💾 Armazenamento de Dados

Os dados são armazenados no **localStorage** do navegador:
- Produtos, categorias, subcategorias e banners
- Persistem mesmo após fechar o navegador
- Ideais para testes e uso local

**⚠️ Para produção:** Considere integrar com um backend real (Supabase, Firebase, etc.)

## 🚀 Como Usar

### Primeiro Acesso (Admin)

1. **Acesse o painel admin**: `/admin/login`
2. **Entre com a senha**: `admin123`
3. **Configure suas categorias:**
   - Vá em "Categorias"
   - As categorias "Seleções" e "Clubes" já estão criadas
   - Você pode editar, adicionar ou excluir
4. **Configure subcategorias:**
   - Vá em "Subcategorias"
   - Crie subcategorias para cada time/seleção
   - Adicione imagens representativas
5. **Adicione produtos:**
   - Vá em "Produtos"
   - Clique em "Novo Produto"
   - Preencha todos os campos
   - Adicione múltiplas imagens (URLs)
6. **Configure banners (opcional):**
   - Vá em "Banners"
   - Crie banners para a home
   - Ative/desative conforme necessário

### Para Clientes

1. Navegam pelo site
2. Escolhem produtos
3. Selecionam tamanho e personalização
4. Adicionam ao carrinho
5. Finalizam pelo WhatsApp (mensagem automática formatada)

## 📋 Exemplo de Mensagem WhatsApp

Quando o cliente finaliza, uma mensagem como esta é enviada:

```
🛒 *Novo Pedido - Jersey Store*

1. Camisa Brasil 2026 - Modelo I
   ID: BRA-001
   Tamanho: M
   Quantidade: 1
   Personalização: NEYMAR #10
   Subtotal: R$ 114,90

2. Camisa Real Madrid 2024/2025 - Modelo I
   ID: RMA-001
   Tamanho: G
   Quantidade: 2
   Subtotal: R$ 179,80

💰 *Total: R$ 294,70*
```

## 🔧 Personalização

### Alterar Nome da Loja
Edite os seguintes arquivos:
- `/src/app/components/public/Header.tsx` (linha 21-24)
- `/src/app/components/public/Footer.tsx` (linha 11-14)

### Alterar Cores
A cor principal (#0D0678) está usada em vários componentes.
Para alterar globalmente, busque por `#0D0678` nos arquivos e substitua.

### Adicionar Mais Qualidades de Produto
Edite `/src/app/types/index.ts`:
```typescript
export type ProductQuality = 'premium-aaa' | 'thai' | 'standard' | 'SUA_NOVA_QUALIDADE';
```

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique se todos os campos obrigatórios estão preenchidos
- Limpe o localStorage se tiver problemas: Inspecionar > Application > Local Storage > Limpar
- Certifique-se de que as URLs das imagens são válidas e acessíveis

## ✅ Checklist Pós-Instalação

- [ ] Alterei a senha do admin
- [ ] Configurei o número do WhatsApp
- [ ] Criei minhas categorias
- [ ] Criei minhas subcategorias com imagens
- [ ] Adicionei meus produtos
- [ ] Testei o carrinho e envio para WhatsApp
- [ ] Personalizei nome e cores da loja (opcional)
- [ ] Configurei banners da home (opcional)

---

**Desenvolvido com React, TypeScript, Tailwind CSS e Motion** 🚀


## Backend para produção

Foi adicionada uma pasta `backend/` com a base de produção do projeto, incluindo:

- autenticação JWT
- CRUD de categorias
- CRUD de subcategorias
- CRUD de produtos
- CRUD de banners
- upload local de imagens
- Prisma + PostgreSQL

### Variáveis do frontend

Crie um arquivo `.env` na raiz do frontend quando for integrar com a API:

```env
VITE_API_URL=http://localhost:3333
VITE_USE_API=true
```

### Observação importante

O frontend ainda não foi totalmente migrado para consumir a API em todas as telas. Esta entrega já deixa o backend pronto e adiciona a base de configuração (`src/app/config/env.ts` e `src/app/services/api.ts`) para a próxima etapa da integração.
