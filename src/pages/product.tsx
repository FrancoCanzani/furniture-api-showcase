import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct, getRelatedProducts, Product } from '@/lib/api';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingCart } from 'lucide-react';
import Header from '@/components/header';
import { useCart } from '@/lib/cart-provider';

export default function ProductPage() {
  const { sku } = useParams<{ sku: string }>();
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', sku],
    queryFn: () => getProduct(sku!),
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', product?.category],
    queryFn: () => getRelatedProducts(product!.category, product!.sku),
    enabled: !!product,
  });

  if (isLoading || !product) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='aspect-square'>
            <img
              src={product.image_path}
              alt={product.name}
              className='w-full h-full object-cover rounded-sm'
            />
          </div>
          <div className='space-y-6'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-lg text-muted-foreground'>
              {product.description}
            </p>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Wood Type:</span>{' '}
                {product.wood_type}
              </p>
              <p>
                <span className='font-medium'>Finish:</span> {product.finish}
              </p>
              <p>
                <span className='font-medium'>Dimensions:</span>{' '}
                {product.dimensions.width}W x {product.dimensions.depth}D x{' '}
                {product.dimensions.height}H inches
              </p>
            </div>
            <div className='flex items-center gap-4'>{product.price}</div>
            <Button
              size='lg'
              className='w-full'
              onClick={() => addItem(product)}
            >
              <ShoppingCart className='mr-2 h-5 w-5' />
              Add to Cart
            </Button>
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <div className='mt-16'>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((product: Product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
