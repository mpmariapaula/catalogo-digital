import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Category, Subcategory, Product, Banner } from '../types';
import {
  categories as initialCategories,
  subcategories as initialSubcategories,
  products as initialProducts,
  banners as initialBanners
} from '../data/mockData';

interface DataContextType {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
  banners: Banner[];
  
  // Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Subcategories
  addSubcategory: (subcategory: Omit<Subcategory, 'id'>) => void;
  updateSubcategory: (id: string, subcategory: Partial<Subcategory>) => void;
  deleteSubcategory: (id: string) => void;
  
  // Products
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Banners
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CATEGORIES: 'admin_categories',
  SUBCATEGORIES: 'admin_subcategories',
  PRODUCTS: 'admin_products',
  BANNERS: 'admin_banners'
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const loadedSubcategories = localStorage.getItem(STORAGE_KEYS.SUBCATEGORIES);
    const loadedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const loadedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);

    setCategories(loadedCategories ? JSON.parse(loadedCategories) : initialCategories);
    setSubcategories(loadedSubcategories ? JSON.parse(loadedSubcategories) : initialSubcategories);
    setProducts(loadedProducts ? JSON.parse(loadedProducts) : initialProducts);
    setBanners(loadedBanners ? JSON.parse(loadedBanners) : initialBanners);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (subcategories.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SUBCATEGORIES, JSON.stringify(subcategories));
    }
  }, [subcategories]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
  }, [banners]);

  // Categories
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: `cat-${Date.now()}` };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setSubcategories(prev => prev.filter(sub => sub.categoryId !== id));
    setProducts(prev => prev.filter(prod => prod.categoryId !== id));
  };

  // Subcategories
  const addSubcategory = (subcategory: Omit<Subcategory, 'id'>) => {
    const newSubcategory = { ...subcategory, id: `sub-${Date.now()}` };
    setSubcategories(prev => [...prev, newSubcategory]);
  };

  const updateSubcategory = (id: string, updates: Partial<Subcategory>) => {
    setSubcategories(prev => prev.map(sub => (sub.id === id ? { ...sub, ...updates } : sub)));
  };

  const deleteSubcategory = (id: string) => {
    setSubcategories(prev => prev.filter(sub => sub.id !== id));
    setProducts(prev => prev.filter(prod => prod.subcategoryId !== id));
  };

  // Products
  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(prod =>
        prod.id === id ? { ...prod, ...updates, updatedAt: new Date() } : prod
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

  // Banners
  const addBanner = (banner: Omit<Banner, 'id'>) => {
    const newBanner = { ...banner, id: `banner-${Date.now()}` };
    setBanners(prev => [...prev, newBanner]);
  };

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners(prev => prev.map(banner => (banner.id === id ? { ...banner, ...updates } : banner)));
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        subcategories,
        products,
        banners,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
