import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '../ui/sheet';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = '🛒 *Novo Pedido - Jersey Store*\n\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   ID: ${item.product.productId}\n`;
      message += `   Tamanho: ${item.size}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      
      if (item.personalization !== 'none') {
        message += `   Personalização: `;
        if (item.personalization === 'name') {
          message += `Nome: ${item.customName}\n`;
        } else if (item.personalization === 'number') {
          message += `Número: ${item.customNumber}\n`;
        } else if (item.personalization === 'both') {
          message += `${item.customName} #${item.customNumber}\n`;
        }
      }
      
      const itemPrice = item.product.price + 
        (item.personalization === 'both' ? 25 : 
         item.personalization !== 'none' ? 15 : 0);
      message += `   Subtotal: R$ ${(itemPrice * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    message += `💰 *Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '5511999999999'; // ALTERAR PARA O NÚMERO DA LOJA
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    onOpenChange(false);
  };

  const getItemPrice = (item: typeof items[0]) => {
    let price = item.product.price;
    if (item.personalization === 'both') {
      price += 25;
    } else if (item.personalization !== 'none') {
      price += 15;
    }
    return price;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Seu carrinho está vazio</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm mb-1 line-clamp-2">{item.product.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Tamanho: {item.size}
                        {item.personalization !== 'none' && (
                          <>
                            <br />
                            {item.personalization === 'name' && `Nome: ${item.customName}`}
                            {item.personalization === 'number' && `Número: ${item.customNumber}`}
                            {item.personalization === 'both' && `${item.customName} #${item.customNumber}`}
                          </>
                        )}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#0D0678]">
                            R$ {(getItemPrice(item) * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl text-[#0D0678]">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Finalizar no WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="w-full"
                >
                  Continuar Comprando
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
