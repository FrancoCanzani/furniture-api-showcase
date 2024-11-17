import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { CartItem } from '@/lib/cart-provider';

export default function CartItemCard({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <div className='flex gap-4 py-4 border-b'>
      <div className='relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-md'>
        <img src={item.image_path} alt={item.name} className='object-cover' />
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex justify-between'>
          <h3 className='font-medium'>{item.name}</h3>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>

        <p className='text-sm text-muted-foreground'>{item.wood_type}</p>

        <div className='flex items-center justify-between mt-auto'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8'
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className='h-4 w-4' />
            </Button>
            <span className='w-8 text-center'>{item.quantity}</span>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8'
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <p className='font-medium'>${item.price}</p>
        </div>
      </div>
    </div>
  );
}
