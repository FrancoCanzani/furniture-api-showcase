import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import { ProductCard } from './product-card';
import { Loader2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getProducts({ limit: 8, offset: 0, featured: true }),
  });

  if (isLoading) {
    return (
      <div className='flex justify-center py-12'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <section className='py-24 px-4 md:px-8 bg-neutral-50'>
      <div className='container'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h4 className='text-sm uppercase tracking-wider text-neutral-500 mb-2'>
              New Arrivals
            </h4>
            <h2 className='text-4xl font-light'>Featured Collection</h2>
          </div>
          <Link
            to='/search?featured=true'
            className='text-sm flex items-center gap-1 hover:gap-2 transition-all'
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {data?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
