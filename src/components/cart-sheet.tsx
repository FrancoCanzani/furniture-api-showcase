import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';
import CartItemCard from './cart-item-card';
import { useCart } from '@/lib/cart-provider';

export function CartSheet() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } =
    useCart();

  const handleCheckout = async () => {
    // Implement your checkout logic here
    console.log('Proceeding to checkout with items:', items);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='relative'>
          <ShoppingCart className='h-5 w-5' />
          {totalItems > 0 && (
            <div className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center'>
              {totalItems}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col w-full sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-muted-foreground'>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className='flex-1 -mx-6 px-6'>
              <div className='divide-y'>
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className='border-t pt-4 mt-4 space-y-4'>
              <div className='flex justify-between'>
                <span className='font-medium'>Total</span>
                <span className='font-medium'>{totalPrice}</span>
              </div>

              <Button className='w-full' size='lg' onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
