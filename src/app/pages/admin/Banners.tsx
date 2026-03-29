import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Banner } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Card, CardContent } from '../../components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/alert-dialog';
import { toast } from 'sonner';

export function Banners() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({ title: '', subtitle: '', image: '', link: '', active: true, order: '' });

  const handleOpenDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        subtitle: banner.subtitle || '',
        image: banner.image,
        link: banner.link || '',
        active: banner.active,
        order: banner.order.toString()
      });
    } else {
      setEditingBanner(null);
      setFormData({ title: '', subtitle: '', image: '', link: '', active: true, order: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      toast.error('Título e imagem são obrigatórios');
      return;
    }

    const bannerData = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      image: formData.image.trim(),
      link: formData.link.trim(),
      active: formData.active,
      order: parseInt(formData.order) || 0
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, bannerData);
      toast.success('Banner atualizado!');
    } else {
      addBanner(bannerData);
      toast.success('Banner criado!');
    }
    setIsDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deletingBanner) {
      deleteBanner(deletingBanner.id);
      toast.success('Banner excluído!');
      setDeletingBanner(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Banners</h1>
          <p className="text-gray-600">{banners.length} banners cadastrados</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-[#0D0678] hover:bg-[#0D0678]/90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {banners.sort((a, b) => a.order - b.order).map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-0">
              <div className="relative">
                <img src={banner.image} alt={banner.title} className="w-full h-48 object-cover rounded-t-lg" />
                {!banner.active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Inativo</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg text-gray-900">{banner.title}</h3>
                    {banner.subtitle && <p className="text-sm text-gray-600">{banner.subtitle}</p>}
                    {banner.link && <p className="text-xs text-gray-500 mt-1">{banner.link}</p>}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(banner)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeletingBanner(banner)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBanner ? 'Editar' : 'Novo'} Banner</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Copa do Mundo 2026" />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input id="subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Texto adicional" />
            </div>
            <div>
              <Label htmlFor="image">Imagem (URL) *</Label>
              <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="URL da imagem" />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <Input id="link" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="/categoria/selecoes" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Ativo</Label>
              <Switch id="active" checked={formData.active} onCheckedChange={(checked) => setFormData({ ...formData, active: checked })} />
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

      <AlertDialog open={!!deletingBanner} onOpenChange={() => setDeletingBanner(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir o banner "{deletingBanner?.title}"?</AlertDialogDescription>
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
