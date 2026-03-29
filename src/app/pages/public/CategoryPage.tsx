import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Product, ProductGender } from '../../types';
import { ProductCard } from '../../components/public/ProductCard';
import { ProductModal } from '../../components/public/ProductModal';
import { ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categories, subcategories, products } = useData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState<ProductGender | 'all'>('all');

  const category = categories.find(c => c.slug === slug);
  const categorySubcategories = subcategories.filter(s => s.categoryId === category?.id);
  const categoryProducts = products.filter(p => p.categoryId === category?.id);

  // Filtrar por gênero
  const filteredProducts = genderFilter === 'all'
    ? categoryProducts
    : categoryProducts.filter(p => p.gender === genderFilter);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl mb-4">Categoria não encontrada</h1>
        <Link to="/">
          <Button>Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const genderCounts = {
    all: categoryProducts.length,
    masculina: categoryProducts.filter(p => p.gender === 'masculina').length,
    feminina: categoryProducts.filter(p => p.gender === 'feminina').length,
    infantil: categoryProducts.filter(p => p.gender === 'infantil').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-[#0D0678]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{category.name}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600">{category.description}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Subcategories */}
        {categorySubcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl text-gray-900 mb-6">Times</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categorySubcategories.sort((a, b) => a.order - b.order).map((sub) => (
                <Link
                  key={sub.id}
                  to={`/subcategoria/${sub.slug}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow mb-2">
                    {sub.image ? (
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl text-gray-400">{sub.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-center text-gray-700 group-hover:text-[#0D0678] transition-colors">
                    {sub.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gender Filter */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-600 mb-3">Filtrar por:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-5 py-2.5 rounded-lg border-2 transition-all font-medium ${
                genderFilter === 'all'
                  ? 'bg-[#0D0678] text-white border-[#0D0678]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D0678]'
              }`}
            >
              Todos ({genderCounts.all})
            </button>
            <button
              onClick={() => setGenderFilter('masculina')}
              className={`px-5 py-2.5 rounded-lg border-2 transition-all font-medium ${
                genderFilter === 'masculina'
                  ? 'bg-[#0D0678] text-white border-[#0D0678]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D0678]'
              }`}
            >
              Masculina ({genderCounts.masculina})
            </button>
            <button
              onClick={() => setGenderFilter('feminina')}
              className={`px-5 py-2.5 rounded-lg border-2 transition-all font-medium ${
                genderFilter === 'feminina'
                  ? 'bg-[#0D0678] text-white border-[#0D0678]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D0678]'
              }`}
            >
              Feminina ({genderCounts.feminina})
            </button>
            <button
              onClick={() => setGenderFilter('infantil')}
              className={`px-5 py-2.5 rounded-lg border-2 transition-all font-medium ${
                genderFilter === 'infantil'
                  ? 'bg-[#0D0678] text-white border-[#0D0678]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D0678]'
              }`}
            >
              Infantil ({genderCounts.infantil})
            </button>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-900">
              {genderFilter === 'all' ? 'Todos os Produtos' : `Produtos - ${genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}`}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">Nenhum produto disponível nesta categoria</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}