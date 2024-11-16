import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/lib/api';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.sku}`}>
      <Card className='overflow-hidden group border-gray-200 shadow-none hover:shadow transition-shadow duration-300 rounded-sm'>
        <CardContent className='p-0'>
          <div className='aspect-square relative'>
            <div className='relative group overflow-hidden'>
              {/* Main image container with hover effect */}
              <div className='relative transition-transform duration-700 ease-out transform group-hover:scale-105'>
                <img
                  src={product.image_path}
                  alt={product.name}
                  className='object-cover w-full h-full'
                />

                {/* Warm overlay effect */}
                <div className='absolute inset-0 bg-gradient-to-b from-amber-50 via-transparent to-orange-100 mix-blend-multiply' />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-start gap-2 p-4'>
          <h3 className='font-semibold text-lg'>{product.name}</h3>
          <p className='text-sm capitalize text-gray-500'>
            {product.wood_type} wood, {product.finish} finish
          </p>
          <div className='flex gap-2 items-center justify-between w-full'>
            <span className='text-sm'>${product.price}</span>
            <button className='text-xs font-semibold hover:underline group-hover:opacity-100 opacity-0 transition-opacity duration-300'>
              Add to cart
            </button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
