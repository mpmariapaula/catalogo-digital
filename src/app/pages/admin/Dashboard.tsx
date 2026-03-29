import { useData } from '../../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ShoppingBag, Layers, Tag, Image } from 'lucide-react';

export function Dashboard() {
  const { products, categories, subcategories, banners } = useData();

  const stats = [
    {
      title: 'Total de Produtos',
      value: products.length,
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Categorias',
      value: categories.length,
      icon: Layers,
      color: 'bg-green-500'
    },
    {
      title: 'Subcategorias',
      value: subcategories.length,
      icon: Tag,
      color: 'bg-purple-500'
    },
    {
      title: 'Banners Ativos',
      value: banners.filter(b => b.active).length,
      icon: Image,
      color: 'bg-orange-500'
    }
  ];

  const recentProducts = products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum produto cadastrado</p>
          ) : (
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-gray-900 truncate">{product.name}</h4>
                    <p className="text-xs text-gray-500">ID: {product.productId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#0D0678]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{product.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
