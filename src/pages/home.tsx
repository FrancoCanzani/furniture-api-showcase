import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';
import { ProductCard } from '@/components/product-card';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import Header from '@/components/header';

export default function HomePage() {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 24;

  const fetchProducts = useCallback(async () => {
    if (isFetching || !hasMore) return;

    try {
      setIsFetching(true);
      const response = await getProducts({ limit: LIMIT, offset });

      // Only add new products, don't include the existing ones
      setProducts((prevProducts) => {
        // Create a Set of existing IDs for quick lookup
        const existingIds = new Set(prevProducts.map((p) => p.id));

        // Filter out any products that already exist
        const newProducts = response.data.filter((p) => !existingIds.has(p.id));

        return [...prevProducts, ...newProducts];
      });

      setHasMore(response.count > offset + LIMIT);
    } catch (err) {
      setHasMore(false);
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, [offset, isFetching, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [offset, fetchProducts]);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setOffset((prev) => prev + LIMIT);
    }
  }, [inView, hasMore, isFetching]);

  const isInitialLoading = !products.length && isFetching;

  if (isInitialLoading) {
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && (
          <div ref={ref} className='flex justify-center py-8'>
            {isFetching && <Loader2 className='h-6 w-6 animate-spin' />}
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className='text-center text-muted-foreground py-8'>
            No more products to load
          </p>
        )}
      </main>
    </div>
  );
}
