import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl mb-4">404</div>
          <h1 className="text-3xl text-gray-900 mb-3">Página não encontrada</h1>
          <p className="text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-[#0D0678] hover:bg-[#0D0678]/90">
              <Home className="w-4 h-4 mr-2" />
              Voltar para Home
            </Button>
          </Link>
          <Link to="/categoria/selecoes">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Ver Produtos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
