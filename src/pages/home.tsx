import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getProducts, ProductsResponse } from '@/lib/api';
import { ProductCard } from '@/components/product-card';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import Header from '@/components/header';

export default function HomePage() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [limitParam, setLimitParam] = useState(24);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = useCallback(async () => {
    const products = await getProducts(limitParam);
    setProducts(products);
    setIsFetching(false);
  }, [limitParam]);

  useEffect(() => {
    if (inView) {
      setIsFetching(true);
      setLimitParam(limitParam + 24);
      fetchProducts();
    }
  }, [inView]);

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='min-h-screen mx-auto'>
      <Header />
      <main className='container mx-auto py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div ref={ref} className='flex justify-center py-8'>
          {isFetching && <Loader2 className='h-6 w-6 animate-spin' />}
        </div>
      </main>
    </div>
  );
}
