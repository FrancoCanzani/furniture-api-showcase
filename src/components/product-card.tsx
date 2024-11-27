import { Link } from 'react-router-dom';
import { Product } from '@/lib/api';
import { useCart } from '@/lib/cart-provider';
import { Button } from './ui/button';
import { ChevronRight, ShoppingCart } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className='group'>
      <Link to={`/product/${product.sku}`} className='block'>
        <div className='relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4'>
          <img
            src={product.image_path}
            alt={product.name}
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
          <Button
            variant='outline'
            size='sm'
            className='absolute bottom-4 right-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
        <div className='space-y-1'>
          <h3 className='font-light text-lg group-hover:underline'>
            {product.name}
          </h3>
          <p className='text-sm text-neutral-500 capitalize'>
            {product.wood_type} wood, {product.finish} finish
          </p>
          <div className='flex items-center justify-between pt-2'>
            <span className='text-lg'>${product.price}</span>
            <span className='text-sm flex items-center gap-1 group-hover:gap-2 transition-all'>
              View Details <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
