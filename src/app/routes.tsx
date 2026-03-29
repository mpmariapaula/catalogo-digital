import { createBrowserRouter, Navigate } from 'react-router';
import { PublicHome } from './pages/public/Home';
import { CategoryPage } from './pages/public/CategoryPage';
import { SubcategoryPage } from './pages/public/SubcategoryPage';
import { NotFound } from './pages/public/NotFound';
import { Layout } from './Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { Categories } from './pages/admin/Categories';
import { Subcategories } from './pages/admin/Subcategories';
import { Banners } from './pages/admin/Banners';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicHome
      },
      {
        path: 'categoria/:slug',
        Component: CategoryPage
      },
      {
        path: 'subcategoria/:slug',
        Component: SubcategoryPage
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  },
  {
    path: '/admin/login',
    Component: Login
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'produtos',
        Component: Products
      },
      {
        path: 'categorias',
        Component: Categories
      },
      {
        path: 'subcategorias',
        Component: Subcategories
      },
      {
        path: 'banners',
        Component: Banners
      }
    ]
  }
]);