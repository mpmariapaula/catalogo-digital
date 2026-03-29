import { Product } from '../../types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'premium-aaa':
        return 'Premium AAA';
      case 'thai':
        return 'Thai';
      default:
        return 'Standard';
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'masculina':
        return 'Masculina';
      case 'feminina':
        return 'Feminina';
      case 'infantil':
        return 'Infantil';
      default:
        return gender;
    }
  };

  const getStatusBadge = () => {
    if (product.status === 'sold-out') {
      return <Badge className="absolute top-3 right-3 bg-red-600">Esgotado</Badge>;
    }
    if (product.status === 'on-order') {
      return <Badge className="absolute top-3 right-3 bg-yellow-600">Sob Encomenda</Badge>;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group border-0 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {getStatusBadge()}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {getQualityLabel(product.quality)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {getGenderLabel(product.gender)}
              </Badge>
            </div>
            <h3 className="text-sm text-gray-900 line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">
              Modelo {product.model} • {product.season}
            </p>
          </div>
          
          <div className="mt-auto">
            <p className="text-2xl text-[#0D0678] mb-3">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            
            <Button
              onClick={() => onSelect(product)}
              disabled={product.status === 'sold-out'}
              className="w-full bg-[#0D0678] hover:bg-[#0D0678]/90 disabled:opacity-50"
            >
              {product.status === 'sold-out' ? 'Esgotado' : 'Comprar'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}