import { Category, Subcategory, Product, Banner } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Seleções',
    slug: 'selecoes',
    description: 'Camisas de seleções nacionais',
    order: 1
  },
  {
    id: 'cat-2',
    name: 'Clubes',
    slug: 'clubes',
    description: 'Camisas de clubes do mundo',
    order: 2
  }
];

export const subcategories: Subcategory[] = [
  // Seleções
  {
    id: 'sub-1',
    categoryId: 'cat-1',
    name: 'Brasil',
    slug: 'brasil',
    image: 'https://images.unsplash.com/photo-1690841813659-813aa4daaba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBzb2NjZXIlMjBqZXJzZXklMjBtYXNjdWxpbmV8ZW58MXx8fHwxNzc0NzM5NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    order: 1
  },
  {
    id: 'sub-2',
    categoryId: 'cat-1',
    name: 'Argentina',
    slug: 'argentina',
    image: 'https://images.unsplash.com/photo-1601087373050-0cb2aa6bf7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBmb290YmFsbCUyMHNoaXJ0JTIweWVsbG93fGVufDF8fHx8MTc3NDczOTQ1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    order: 2
  },
  {
    id: 'sub-3',
    categoryId: 'cat-1',
    name: 'Portugal',
    slug: 'portugal',
    image: 'https://images.unsplash.com/photo-1768854318260-f69ab6fc11e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBuYXRpb25hbCUyMHRlYW0lMjBqZXJzZXl8ZW58MXx8fHwxNzc0NzM5NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    order: 3
  },
  // Clubes
  {
    id: 'sub-4',
    categoryId: 'cat-2',
    name: 'Real Madrid',
    slug: 'real-madrid',
    image: 'https://images.unsplash.com/photo-1772450235863-996680ddb732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBqZXJzZXklMjB5ZWxsb3clMjBncmVlbnxlbnwxfHx8fDE3NzQ3Mzk0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    order: 1
  },
  {
    id: 'sub-5',
    categoryId: 'cat-2',
    name: 'Barcelona',
    slug: 'barcelona',
    image: 'https://images.unsplash.com/photo-1759447946445-397b1c034768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGtpdCUyMHNwb3J0cyUyMGFwcGFyZWx8ZW58MXx8fHwxNzc0NzM5NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    order: 2
  },
  {
    id: 'sub-6',
    categoryId: 'cat-2',
    name: 'Manchester United',
    slug: 'manchester-united',
    image: 'https://images.unsplash.com/photo-1494778696781-8f23fd5553c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBqZXJzZXklMjB3b21lbiUyMGZvb3RiYWxsfGVufDF8fHx8MTc3NDczOTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    order: 3
  }
];

export const products: Product[] = [
  // Brasil
  {
    id: 'prod-1',
    productId: 'BRA-001',
    name: 'Camisa Brasil 2026 - Modelo I',
    price: 89.90,
    categoryId: 'cat-1',
    subcategoryId: 'sub-1',
    images: [
      'https://images.unsplash.com/photo-1690841813659-813aa4daaba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBzb2NjZXIlMjBqZXJzZXklMjBtYXNjdWxpbmV8ZW58MXx8fHwxNzc0NzM5NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1601087373050-0cb2aa6bf7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBmb290YmFsbCUyMHNoaXJ0JTIweWVsbG93fGVufDF8fHx8MTc3NDczOTQ1MHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    model: 'I',
    season: '2026',
    quality: 'premium-aaa',
    gender: 'masculina',
    material: 'Dry-fit Premium',
    status: 'available',
    description: 'Réplica de alta qualidade da camisa titular do Brasil para a Copa do Mundo 2026',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'prod-2',
    productId: 'BRA-002',
    name: 'Camisa Brasil 2026 - Modelo II',
    price: 89.90,
    categoryId: 'cat-1',
    subcategoryId: 'sub-1',
    images: [
      'https://images.unsplash.com/photo-1768854318260-f69ab6fc11e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBuYXRpb25hbCUyMHRlYW0lMjBqZXJzZXl8ZW58MXx8fHwxNzc0NzM5NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    model: 'II',
    season: '2026',
    quality: 'premium-aaa',
    gender: 'masculina',
    material: 'Dry-fit Premium',
    status: 'available',
    description: 'Réplica de alta qualidade da camisa reserva do Brasil',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  // Argentina
  {
    id: 'prod-3',
    productId: 'ARG-001',
    name: 'Camisa Argentina 2024/2025 - Modelo I',
    price: 89.90,
    categoryId: 'cat-1',
    subcategoryId: 'sub-2',
    images: [
      'https://images.unsplash.com/photo-1772450235863-996680ddb732?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBqZXJzZXklMjB5ZWxsb3clMjBncmVlbnxlbnwxfHx8fDE3NzQ3Mzk0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    model: 'I',
    season: '2024/2025',
    quality: 'premium-aaa',
    gender: 'masculina',
    material: 'Dry-fit Premium',
    status: 'available',
    description: 'Réplica de alta qualidade da camisa titular da Argentina',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  // Real Madrid
  {
    id: 'prod-4',
    productId: 'RMA-001',
    name: 'Camisa Real Madrid 2024/2025 - Modelo I',
    price: 89.90,
    categoryId: 'cat-2',
    subcategoryId: 'sub-4',
    images: [
      'https://images.unsplash.com/photo-1759447946445-397b1c034768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGtpdCUyMHNwb3J0cyUyMGFwcGFyZWx8ZW58MXx8fHwxNzc0NzM5NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    model: 'I',
    season: '2024/2025',
    quality: 'premium-aaa',
    gender: 'masculina',
    material: 'Dry-fit Premium',
    status: 'available',
    description: 'Réplica de alta qualidade da camisa do Real Madrid',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: 'prod-5',
    productId: 'BAR-001',
    name: 'Camisa Barcelona 2024/2025 - Modelo I',
    price: 89.90,
    categoryId: 'cat-2',
    subcategoryId: 'sub-5',
    images: [
      'https://images.unsplash.com/photo-1494778696781-8f23fd5553c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBqZXJzZXklMjB3b21lbiUyMGZvb3RiYWxsfGVufDF8fHx8MTc3NDczOTQ1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    model: 'I',
    season: '2024/2025',
    quality: 'thai',
    gender: 'feminina',
    material: 'Poliéster Premium',
    status: 'available',
    description: 'Réplica Thai de alta qualidade da camisa do Barcelona',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  }
];

export const banners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Copa do Mundo 2026',
    subtitle: 'Camisas das Seleções - Réplicas Premium',
    image: 'https://images.unsplash.com/photo-1690841813659-813aa4daaba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWwlMjBzb2NjZXIlMjBqZXJzZXklMjBtYXNjdWxpbmV8ZW58MXx8fHwxNzc0NzM5NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: '/categoria/selecoes',
    active: true,
    order: 1
  }
];