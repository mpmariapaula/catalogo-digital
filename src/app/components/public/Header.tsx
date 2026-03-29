import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { CartSheet } from './CartSheet';
import { Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Logo } from './Logo';

export function Header() {
  const { totalItems } = useCart();
  const { categories } = useData();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="border-b border-gray-100 py-2 hidden md:block">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <div className="flex items-center gap-6">
                <span>📦 Frete Grátis acima de R$ 169,90</span>
                {/* <span>⚡ Entrega Rápida</span> */}
              </div>
              <div className="flex items-center gap-4">
                <span>
                  <a href="https://wa.me/5584991859918" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp: (84) 99185-9918
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between h-24 md:h-28">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-22 h-18 md:w-32 md:h-28 transition-transform group-hover:scale-105">
                <Logo />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-[#0D0678] to-[#1a0f9e] bg-clip-text text-transparent">
                  Bebezão Store
                </h1>
                <p className="text-xs md:text-sm text-gray-500 tracking-wide">CAMISAS DE FUTEBOL</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-6 py-3 text-gray-700 hover:text-[#0D0678] hover:bg-gray-50 rounded-lg transition-all relative group"
              >
                Home
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0D0678] group-hover:w-3/4 transition-all" />
              </Link>
              {categories.sort((a, b) => a.order - b.order).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categoria/${cat.slug}`}
                  className="px-6 py-3 text-gray-700 hover:text-[#0D0678] hover:bg-gray-50 rounded-lg transition-all relative group"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0D0678] group-hover:w-3/4 transition-all" />
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative group h-12 w-12"
              >
                <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#0D0678] text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-12 w-12"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-gray-100 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-[#0D0678] hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </Link>
              {categories.sort((a, b) => a.order - b.order).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categoria/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-[#0D0678] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}