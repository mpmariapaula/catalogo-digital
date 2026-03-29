import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}