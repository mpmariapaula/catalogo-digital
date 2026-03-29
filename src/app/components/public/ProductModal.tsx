import { useState, useEffect } from 'react';
import { Product, PersonalizationType } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [size, setSize] = useState('');
  const [personalization, setPersonalization] = useState<PersonalizationType>('none');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCurrentImageIndex(0);
    setSize('');
    setPersonalization('none');
    setCustomName('');
    setCustomNumber('');
    setQuantity(1);
  }, [product, open]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!size) {
      toast.error('Por favor, selecione um tamanho');
      return;
    }

    if (personalization === 'name' && !customName.trim()) {
      toast.error('Por favor, informe o nome para personalização');
      return;
    }

    if (personalization === 'number' && !customNumber.trim()) {
      toast.error('Por favor, informe o número para personalização');
      return;
    }

    if (personalization === 'both' && (!customName.trim() || !customNumber.trim())) {
      toast.error('Por favor, informe nome e número para personalização');
      return;
    }

    addItem({
      product,
      size,
      personalization,
      customName: customName.trim() || undefined,
      customNumber: customNumber.trim() || undefined,
      quantity
    });

    toast.success('Produto adicionado ao carrinho!');
    onOpenChange(false);
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const getPersonalizationPrice = () => {
    if (personalization === 'name' || personalization === 'number') return 30;
    if (personalization === 'both') return 30;
    return 0;
  };

  const getTotalPrice = () => {
    if (!product) return 0;
    return (product.price + getPersonalizationPrice()) * quantity;
  };

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'premium-aaa': return 'Premium AAA';
      case 'thai': return 'Thai';
      default: return 'Standard';
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-[#0D0678]' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Product Info */}
            <div className="mt-6 space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge>{getQualityLabel(product.quality)}</Badge>
                <Badge variant="outline">Modelo {product.model}</Badge>
                <Badge variant="outline">{product.season}</Badge>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Material:</strong> {product.material}
              </p>
              {product.description && (
                <p className="text-sm text-gray-600">{product.description}</p>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-6">
            {/* Size */}
            <div>
              <Label className="mb-4 block text-base">Selecione o Tamanho *</Label>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`relative h-14 border-2 rounded-xl font-medium transition-all ${
                      size === s
                        ? 'bg-[#0D0678] text-white border-[#0D0678] shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#0D0678] hover:shadow-md'
                    }`}
                  >
                    {s}
                    {size === s && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="text-xs text-gray-500 mt-2">👆 Escolha um tamanho para continuar</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <Label className="mb-3 block text-base">Quantidade</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-12 w-12 rounded-xl"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="w-20 text-center text-2xl">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-12 w-12 rounded-xl"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Personalization */}
            <div>
              <Label className="mb-3 block text-base">Personalização</Label>
              <RadioGroup value={personalization} onValueChange={(v) => setPersonalization(v as PersonalizationType)}>
                <div className="space-y-2">
                  <label
                    htmlFor="none"
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      personalization === 'none'
                        ? 'border-[#0D0678] bg-[#0D0678]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="none" id="none" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Sem personalização</span>
                    </div>
                  </label>
                  <label
                    htmlFor="name"
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      personalization === 'name'
                        ? 'border-[#0D0678] bg-[#0D0678]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="name" id="name" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Nome</span>
                      <span className="text-[#0D0678] ml-2 text-xs font-semibold">+R$ 30,00</span>
                    </div>
                  </label>
                  <label
                    htmlFor="number"
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      personalization === 'number'
                        ? 'border-[#0D0678] bg-[#0D0678]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="number" id="number" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Número</span>
                      <span className="text-[#0D0678] ml-2 text-xs font-semibold">+R$ 30,00</span>
                    </div>
                  </label>
                  <label
                    htmlFor="both"
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      personalization === 'both'
                        ? 'border-[#0D0678] bg-[#0D0678]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="both" id="both" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Nome e Número</span>
                      <span className="text-[#0D0678] ml-2 text-xs font-semibold">+R$ 30,00</span>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Custom Fields */}
            {(personalization === 'name' || personalization === 'both') && (
              <div>
                <Label htmlFor="customName" className="text-sm font-medium">Nome *</Label>
                <Input
                  id="customName"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Digite o nome"
                  maxLength={15}
                  className="mt-2 h-12 rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 15 caracteres</p>
              </div>
            )}

            {(personalization === 'number' || personalization === 'both') && (
              <div>
                <Label htmlFor="customNumber" className="text-sm font-medium">Número *</Label>
                <Input
                  id="customNumber"
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Digite o número"
                  maxLength={2}
                  className="mt-2 h-12 rounded-xl"
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 2 dígitos</p>
              </div>
            )}

            {/* Price Summary */}
            <div className="pt-6 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Preço unitário</span>
                <span>R$ {product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              {getPersonalizationPrice() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Personalização</span>
                  <span>R$ {getPersonalizationPrice().toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              {quantity > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantidade</span>
                  <span>x{quantity}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-xl">Total</span>
                <span className="text-3xl text-[#0D0678]">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            Cancelar
          </Button>
          <Button 
            onClick={handleAddToCart} 
            className="bg-[#0D0678] hover:bg-[#0D0678]/90 flex-1 sm:flex-none"
            size="lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}