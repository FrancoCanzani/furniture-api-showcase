import Header from '@/components/header';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { getProducts, Product } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { ref, inView } = useInView();

  const [products, setProducts] = useState<Product[]>([]);
  const [limitParam, setLimitParam] = useState(24);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (isFetching || !hasMore) return;

    try {
      setIsFetching(true);

      const searchTerm = searchParams.get('name');
      const response = await getProducts(limitParam, searchTerm ?? undefined);

      if (response.data.length > products.length) {
        setProducts(response.data);
        setHasMore(response.count > response.data.length);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [limitParam, searchParams, products.length, isFetching, hasMore]);

  useEffect(() => {
    setProducts([]);
    setLimitParam(24);
    setHasMore(true);
    fetchProducts();
  }, [searchParams.get('name')]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setLimitParam((prev) => prev + 24);
      fetchProducts();
    }
  }, [inView, hasMore, isFetching, fetchProducts]);

  const searchTerm = searchParams.get('name');
  const isInitialLoading = !products.length && isFetching;

  return (
    <div className='min-h-screen mx-auto'>
      <Header hasSearch />
      <main className='container mx-auto py-8'>
        {searchTerm && (
          <div className='mb-6'>
            <h1 className='text-xl font-semibold'>
              {isInitialLoading
                ? 'Searching...'
                : products.length > 0
                ? `Results for "${searchTerm}"`
                : `No results found for "${searchTerm}"`}
            </h1>
          </div>
        )}

        {isInitialLoading ? (
          <div className='flex items-center justify-center min-h-[400px]'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
}
