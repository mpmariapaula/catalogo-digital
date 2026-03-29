import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Category, Subcategory, Product, Banner, PersonalizationType } from '../types';
import {
  categories as initialCategories,
  subcategories as initialSubcategories,
  products as initialProducts,
  banners as initialBanners
} from '../data/mockData';
import { apiRequest } from '../services/api';
import { appEnv } from '../config/env';

interface DataContextType {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
  banners: Banner[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addSubcategory: (subcategory: Omit<Subcategory, 'id'>) => Promise<void>;
  updateSubcategory: (id: string, subcategory: Partial<Subcategory>) => Promise<void>;
  deleteSubcategory: (id: string) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addBanner: (banner: Omit<Banner, 'id'>) => Promise<void>;
  updateBanner: (id: string, banner: Partial<Banner>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
}

interface ApiProductImage {
  id?: string;
  url: string;
  publicId?: string | null;
  order: number;
}

interface ApiProduct {
  id: string;
  productId: string;
  name: string;
  slug?: string;
  price: number | string;
  categoryId: string;
  subcategoryId: string;
  sizes: string[];
  model: Product['model'];
  season: string;
  quality: Product['quality'];
  gender: Product['gender'];
  material: string;
  status: Product['status'];
  description?: string | null;
  personalizationType?: PersonalizationType;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  images?: ApiProductImage[];
}

interface CatalogPayload {
  categories: Category[];
  subcategories: Subcategory[];
  products: ApiProduct[];
  banners: Banner[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CATEGORIES: 'admin_categories',
  SUBCATEGORIES: 'admin_subcategories',
  PRODUCTS: 'admin_products',
  BANNERS: 'admin_banners'
};

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}


function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith('/')) return `${appEnv.apiUrl}${url}`;
  return url;
}

function normalizeProduct(product: ApiProduct | Product): Product {
  const images = Array.isArray((product as ApiProduct).images)
    ? ((product as ApiProduct).images ?? []).map((image) => resolveAssetUrl(image.url) ?? image.url)
    : Array.isArray((product as Product).images)
      ? (product as Product).images
      : [];

  return {
    id: product.id,
    productId: product.productId,
    name: product.name,
    slug: 'slug' in product ? product.slug : undefined,
    price: Number(product.price),
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId,
    images,
    sizes: product.sizes ?? [],
    model: product.model,
    season: product.season,
    quality: product.quality,
    gender: product.gender,
    material: product.material,
    status: product.status,
    description: product.description ?? undefined,
    personalizationType: 'personalizationType' in product ? product.personalizationType ?? 'none' : 'none',
    featured: 'featured' in product ? product.featured ?? false : false,
    createdAt: product.createdAt instanceof Date ? product.createdAt : new Date(product.createdAt),
    updatedAt: product.updatedAt instanceof Date ? product.updatedAt : new Date(product.updatedAt)
  };
}

function getInitialState() {
  return {
    categories: safeParse<Category[]>(localStorage.getItem(STORAGE_KEYS.CATEGORIES), initialCategories),
    subcategories: safeParse<Subcategory[]>(localStorage.getItem(STORAGE_KEYS.SUBCATEGORIES), initialSubcategories),
    products: safeParse<Product[]>(localStorage.getItem(STORAGE_KEYS.PRODUCTS), initialProducts).map(normalizeProduct),
    banners: safeParse<Banner[]>(localStorage.getItem(STORAGE_KEYS.BANNERS), initialBanners)
  };
}

function saveLocalState(categories: Category[], subcategories: Subcategory[], products: Product[], banners: Banner[]) {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(subcategories));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
}

function toProductPayload(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> | Partial<Product>) {
  return {
    productId: product.productId,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
    subcategoryId: product.subcategoryId,
    sizes: product.sizes,
    model: product.model,
    season: product.season,
    quality: product.quality,
    gender: product.gender,
    material: product.material,
    status: product.status,
    personalizationType: product.personalizationType ?? 'none',
    featured: product.featured ?? false,
    images: (product.images ?? []).filter(Boolean).map((url, index) => ({ url, order: index }))
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const initialState = getInitialState();
  const [categories, setCategories] = useState<Category[]>(initialState.categories);
  const [subcategories, setSubcategories] = useState<Subcategory[]>(initialState.subcategories);
  const [products, setProducts] = useState<Product[]>(initialState.products);
  const [banners, setBanners] = useState<Banner[]>(initialState.banners);
  const [isLoading, setIsLoading] = useState(appEnv.useApi);

  const applyCatalogPayload = useCallback((payload: CatalogPayload) => {
    const nextCategories = payload.categories ?? [];
    const nextSubcategories = (payload.subcategories ?? []).map((subcategory) => ({
      ...subcategory,
      image: resolveAssetUrl(subcategory.image)
    }));
    const nextProducts = (payload.products ?? []).map(normalizeProduct);
    const nextBanners = (payload.banners ?? []).map((banner) => ({
      ...banner,
      image: resolveAssetUrl(banner.image) ?? banner.image
    }));

    setCategories(nextCategories);
    setSubcategories(nextSubcategories);
    setProducts(nextProducts);
    setBanners(nextBanners);
    saveLocalState(nextCategories, nextSubcategories, nextProducts, nextBanners);
  }, []);

  const refreshData = useCallback(async () => {
    if (!appEnv.useApi) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const payload = await apiRequest<CatalogPayload>('/public/catalog');
      applyCatalogPayload(payload);
    } finally {
      setIsLoading(false);
    }
  }, [applyCatalogPayload]);

  useEffect(() => {
    void refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (!appEnv.useApi) {
      saveLocalState(categories, subcategories, products, banners);
    }
  }, [banners, categories, products, subcategories]);

  const addCategory = useCallback(async (category: Omit<Category, 'id'>) => {
    if (appEnv.useApi) {
      await apiRequest('/categories', {
        method: 'POST',
        body: JSON.stringify(category)
      });
      await refreshData();
      return;
    }

    const nextCategories = [...categories, { ...category, id: `cat-${Date.now()}` }];
    setCategories(nextCategories);
  }, [categories, refreshData]);

  const updateCategory = useCallback(async (id: string, category: Partial<Category>) => {
    if (appEnv.useApi) {
      await apiRequest(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(category)
      });
      await refreshData();
      return;
    }

    setCategories((prev) => prev.map((item) => (item.id === id ? { ...item, ...category } : item)));
  }, [refreshData]);

  const deleteCategory = useCallback(async (id: string) => {
    if (appEnv.useApi) {
      await apiRequest(`/categories/${id}`, { method: 'DELETE' });
      await refreshData();
      return;
    }

    setCategories((prev) => prev.filter((item) => item.id !== id));
    setSubcategories((prev) => prev.filter((item) => item.categoryId !== id));
    setProducts((prev) => prev.filter((item) => item.categoryId !== id));
  }, [refreshData]);

  const addSubcategory = useCallback(async (subcategory: Omit<Subcategory, 'id'>) => {
    if (appEnv.useApi) {
      await apiRequest('/subcategories', {
        method: 'POST',
        body: JSON.stringify(subcategory)
      });
      await refreshData();
      return;
    }

    setSubcategories((prev) => [...prev, { ...subcategory, id: `sub-${Date.now()}` }]);
  }, [refreshData]);

  const updateSubcategory = useCallback(async (id: string, subcategory: Partial<Subcategory>) => {
    if (appEnv.useApi) {
      await apiRequest(`/subcategories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(subcategory)
      });
      await refreshData();
      return;
    }

    setSubcategories((prev) => prev.map((item) => (item.id === id ? { ...item, ...subcategory } : item)));
  }, [refreshData]);

  const deleteSubcategory = useCallback(async (id: string) => {
    if (appEnv.useApi) {
      await apiRequest(`/subcategories/${id}`, { method: 'DELETE' });
      await refreshData();
      return;
    }

    setSubcategories((prev) => prev.filter((item) => item.id !== id));
    setProducts((prev) => prev.filter((item) => item.subcategoryId !== id));
  }, [refreshData]);

  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (appEnv.useApi) {
      await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(toProductPayload(product))
      });
      await refreshData();
      return;
    }

    const nextProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts((prev) => [...prev, nextProduct]);
  }, [refreshData]);

  const updateProduct = useCallback(async (id: string, product: Partial<Product>) => {
    if (appEnv.useApi) {
      await apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(toProductPayload(product))
      });
      await refreshData();
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...product, updatedAt: new Date() } : item
      )
    );
  }, [refreshData]);

  const deleteProduct = useCallback(async (id: string) => {
    if (appEnv.useApi) {
      await apiRequest(`/products/${id}`, { method: 'DELETE' });
      await refreshData();
      return;
    }

    setProducts((prev) => prev.filter((item) => item.id !== id));
  }, [refreshData]);

  const addBanner = useCallback(async (banner: Omit<Banner, 'id'>) => {
    if (appEnv.useApi) {
      await apiRequest('/banners', {
        method: 'POST',
        body: JSON.stringify(banner)
      });
      await refreshData();
      return;
    }

    setBanners((prev) => [...prev, { ...banner, id: `banner-${Date.now()}` }]);
  }, [refreshData]);

  const updateBanner = useCallback(async (id: string, banner: Partial<Banner>) => {
    if (appEnv.useApi) {
      await apiRequest(`/banners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(banner)
      });
      await refreshData();
      return;
    }

    setBanners((prev) => prev.map((item) => (item.id === id ? { ...item, ...banner } : item)));
  }, [refreshData]);

  const deleteBanner = useCallback(async (id: string) => {
    if (appEnv.useApi) {
      await apiRequest(`/banners/${id}`, { method: 'DELETE' });
      await refreshData();
      return;
    }

    setBanners((prev) => prev.filter((item) => item.id !== id));
  }, [refreshData]);

  const value = useMemo(
    () => ({
      categories,
      subcategories,
      products,
      banners,
      isLoading,
      refreshData,
      addCategory,
      updateCategory,
      deleteCategory,
      addSubcategory,
      updateSubcategory,
      deleteSubcategory,
      addProduct,
      updateProduct,
      deleteProduct,
      addBanner,
      updateBanner,
      deleteBanner
    }),
    [
      addBanner,
      addCategory,
      addProduct,
      addSubcategory,
      banners,
      categories,
      deleteBanner,
      deleteCategory,
      deleteProduct,
      deleteSubcategory,
      isLoading,
      products,
      refreshData,
      subcategories,
      updateBanner,
      updateCategory,
      updateProduct,
      updateSubcategory
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
