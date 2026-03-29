import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { Product, ProductGender } from '../../types';
import { ProductCard } from '../../components/public/ProductCard';
import { ProductModal } from '../../components/public/ProductModal';
import { ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SubcategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categories, subcategories, products } = useData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState<ProductGender | 'all'>('all');

  const subcategory = subcategories.find(s => s.slug === slug);
  const category = categories.find(c => c.id === subcategory?.categoryId);
  const subcategoryProducts = products.filter(p => p.subcategoryId === subcategory?.id);

  // Filtrar por gênero
  const filteredProducts = genderFilter === 'all'
    ? subcategoryProducts
    : subcategoryProducts.filter(p => p.gender === genderFilter);

  if (!subcategory || !category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl mb-4">Subcategoria não encontrada</h1>
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
    all: subcategoryProducts.length,
    masculina: subcategoryProducts.filter(p => p.gender === 'masculina').length,
    feminina: subcategoryProducts.filter(p => p.gender === 'feminina').length,
    infantil: subcategoryProducts.filter(p => p.gender === 'infantil').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-[#0D0678]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/categoria/${category.slug}`} className="hover:text-[#0D0678]">
              {category.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{subcategory.name}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-3">
            {subcategory.name}
          </h1>
          {subcategory.description && (
            <p className="text-lg text-gray-600">{subcategory.description}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-900">
            {genderFilter === 'all' ? 'Produtos Disponíveis' : `Produtos - ${genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}`}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">Nenhum produto disponível</p>
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

      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}