import { Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Shirt, Instagram, Facebook, MessageCircle } from 'lucide-react';

export function Footer() {
  const { categories } = useData();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0D0678] flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg">Jersey Store</h3>
                <p className="text-xs text-gray-400">Réplicas Premium</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              As melhores réplicas de camisas de futebol com qualidade garantida e entrega rápida.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {categories.sort((a, b) => a.order - b.order).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/categoria/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm mb-4">Informações</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Qualidade Premium AAA e Thai</li>
              <li>Personalização disponível</li>
              <li>Entrega para todo Brasil</li>
              <li>Pagamento via WhatsApp</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#0D0678] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#0D0678] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jersey Store. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs">
            Este site vende réplicas de camisas de futebol. Não somos afiliados às marcas originais.
          </p>
          <div className="mt-4">
            <Link to="/admin" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}