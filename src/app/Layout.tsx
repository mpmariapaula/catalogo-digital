import { Outlet } from 'react-router';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { ScrollToTop } from './components/public/ScrollToTop';
import { Toaster } from './components/ui/sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}