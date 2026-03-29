import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Subcategory } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Card, CardContent } from '../../components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { toast } from 'sonner';

export function Subcategories() {
  const { subcategories, categories, addSubcategory, updateSubcategory, deleteSubcategory } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [deletingSubcategory, setDeletingSubcategory] = useState<Subcategory | null>(null);
  const [formData, setFormData] = useState({ categoryId: '', name: '', slug: '', description: '', image: '', order: '' });

  const handleOpenDialog = (subcategory?: Subcategory) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData({
        categoryId: subcategory.categoryId,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description || '',
        image: subcategory.image || '',
        order: subcategory.order.toString()
      });
    } else {
      setEditingSubcategory(null);
      setFormData({ categoryId: '', name: '', slug: '', description: '', image: '', order: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.name.trim() || !formData.slug.trim()) {
      toast.error('Categoria, nome e slug são obrigatórios');
      return;
    }

    const subcategoryData = {
      categoryId: formData.categoryId,
      name: formData.name.trim(),
      slug: formData.slug.trim().toLowerCase(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      order: parseInt(formData.order) || 0
    };

    if (editingSubcategory) {
      updateSubcategory(editingSubcategory.id, subcategoryData);
      toast.success('Subcategoria atualizada!');
    } else {
      addSubcategory(subcategoryData);
      toast.success('Subcategoria criada!');
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deletingSubcategory) {
      deleteSubcategory(deletingSubcategory.id);
      toast.success('Subcategoria excluída!');
      setDeletingSubcategory(null);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || '-';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Subcategorias</h1>
          <p className="text-gray-600">{subcategories.length} subcategorias cadastradas</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-[#0D0678] hover:bg-[#0D0678]/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Subcategoria
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subcategories.sort((a, b) => a.order - b.order).map((subcategory) => (
          <Card key={subcategory.id}>
            <CardContent className="p-6">
              {subcategory.image && (
                <img src={subcategory.image} alt={subcategory.name} className="w-full h-32 object-cover rounded mb-3" />
              )}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg text-gray-900">{subcategory.name}</h3>
                  <p className="text-xs text-gray-500">{getCategoryName(subcategory.categoryId)} / {subcategory.slug}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(subcategory)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeletingSubcategory(subcategory)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {subcategory.description && <p className="text-sm text-gray-600">{subcategory.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubcategory ? 'Editar' : 'Nova'} Subcategoria</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="categoryId">Categoria *</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Brasil" />
            </div>
            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="Ex: brasil" />
            </div>
            <div>
              <Label htmlFor="image">Imagem (URL)</Label>
              <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="URL da imagem" />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="order">Ordem</Label>
              <Input id="order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} placeholder="0" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#0D0678] hover:bg-[#0D0678]/90">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingSubcategory} onOpenChange={() => setDeletingSubcategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Excluir "{deletingSubcategory?.name}" também excluirá todos os produtos relacionados.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
