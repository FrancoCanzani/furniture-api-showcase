import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useCart } from '@/lib/cart-provider';
import { useState } from 'react';
import { updateStock } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export function CheckoutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, clearCart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      const updates = items.map((item) => ({
        productSku: item.sku,
        quantity: -item.quantity,
      }));

      await updateStock(updates);

      clearCart();

      toast.success('Order placed successfully!');

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-4'>
            {items.map((item) => (
              <div key={item.id} className='flex justify-between items-center'>
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p>${item.price * item.quantity}</p>
              </div>
            ))}
            <div className='border-t pt-4'>
              <div className='flex justify-between items-center'>
                <p className='font-medium'>Total</p>
                <p className='font-medium'>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className='w-full'
          >
            {isProcessing ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
