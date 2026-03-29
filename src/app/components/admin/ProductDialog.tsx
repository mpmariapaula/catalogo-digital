import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product, ProductModel, ProductQuality, ProductStatus, ProductGender } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { toast } from 'sonner';
import { X, Plus } from 'lucide-react';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const { addProduct, updateProduct, categories, subcategories } = useData();
  
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    price: '',
    categoryId: '',
    subcategoryId: '',
    images: [''],
    sizes: '',
    model: 'I' as ProductModel,
    season: '',
    quality: 'premium-aaa' as ProductQuality,
    gender: 'masculina' as ProductGender,
    material: '',
    status: 'available' as ProductStatus,
    description: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productId: product.productId,
        name: product.name,
        price: product.price.toString(),
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        images: product.images,
        sizes: product.sizes.join(', '),
        model: product.model,
        season: product.season,
        quality: product.quality,
        gender: product.gender,
        material: product.material,
        status: product.status,
        description: product.description || ''
      });
    } else {
      setFormData({
        productId: '',
        name: '',
        price: '',
        categoryId: '',
        subcategoryId: '',
        images: [''],
        sizes: '',
        model: 'I',
        season: '',
        quality: 'premium-aaa',
        gender: 'masculina',
        material: '',
        status: 'available',
        description: ''
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.productId.trim()) {
      toast.error('ID do produto é obrigatório');
      return;
    }
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Preço inválido');
      return;
    }
    if (!formData.categoryId) {
      toast.error('Selecione uma categoria');
      return;
    }
    if (!formData.subcategoryId) {
      toast.error('Selecione uma subcategoria');
      return;
    }
    if (formData.images.filter(img => img.trim()).length === 0) {
      toast.error('Adicione pelo menos uma imagem');
      return;
    }
    if (!formData.sizes.trim()) {
      toast.error('Adicione os tamanhos disponíveis');
      return;
    }

    const productData = {
      productId: formData.productId.trim(),
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      images: formData.images.filter(img => img.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
      model: formData.model,
      season: formData.season.trim(),
      quality: formData.quality,
      gender: formData.gender,
      material: formData.material.trim(),
      status: formData.status,
      description: formData.description.trim()
    };

    if (product) {
      updateProduct(product.id, productData);
      toast.success('Produto atualizado com sucesso!');
    } else {
      addProduct(productData);
      toast.success('Produto criado com sucesso!');
    }

    onOpenChange(false);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
  };

  const availableSubcategories = subcategories.filter(
    sub => sub.categoryId === formData.categoryId
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* ID do Produto */}
            <div>
              <Label htmlFor="productId">ID do Produto *</Label>
              <Input
                id="productId"
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                placeholder="Ex: BRA-001"
              />
              <p className="text-xs text-gray-500 mt-1">Para identificação no WhatsApp</p>
            </div>

            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Camisa Brasil 2026"
              />
            </div>

            {/* Preço */}
            <div>
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="89.90"
              />
            </div>

            {/* Categoria */}
            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value, subcategoryId: '' })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategoria */}
            <div>
              <Label htmlFor="subcategory">Subcategoria *</Label>
              <Select
                value={formData.subcategoryId}
                onValueChange={(value) => setFormData({ ...formData, subcategoryId: value })}
                disabled={!formData.categoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Modelo */}
            <div>
              <Label htmlFor="model">Modelo *</Label>
              <Select
                value={formData.model}
                onValueChange={(value) => setFormData({ ...formData, model: value as ProductModel })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">Modelo I (Titular)</SelectItem>
                  <SelectItem value="II">Modelo II (Reserva)</SelectItem>
                  <SelectItem value="III">Modelo III (Alternativo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Temporada */}
            <div>
              <Label htmlFor="season">Temporada *</Label>
              <Input
                id="season"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                placeholder="Ex: 2024/2025 ou 2026"
              />
            </div>

            {/* Qualidade */}
            <div>
              <Label htmlFor="quality">Qualidade *</Label>
              <Select
                value={formData.quality}
                onValueChange={(value) => setFormData({ ...formData, quality: value as ProductQuality })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premium-aaa">Premium AAA</SelectItem>
                  <SelectItem value="thai">Thai</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gênero */}
            <div>
              <Label htmlFor="gender">Gênero *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value as ProductGender })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculina">Masculina</SelectItem>
                  <SelectItem value="feminina">Feminina</SelectItem>
                  <SelectItem value="infantil">Infantil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Material */}
            <div>
              <Label htmlFor="material">Material *</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="Ex: Dry-fit Premium"
              />
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as ProductStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="on-order">Sob Encomenda</SelectItem>
                  <SelectItem value="sold-out">Esgotado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tamanhos */}
            <div className="md:col-span-2">
              <Label htmlFor="sizes">Tamanhos Disponíveis *</Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="P, M, G, GG, XG"
              />
              <p className="text-xs text-gray-500 mt-1">Separe por vírgula</p>
            </div>
          </div>

          {/* Imagens */}
          <div>
            <Label>Imagens (URLs) *</Label>
            <div className="space-y-2 mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="URL da imagem"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Imagem
              </Button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição detalhada do produto..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#0D0678] hover:bg-[#0D0678]/90">
              {product ? 'Atualizar' : 'Criar'} Produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}