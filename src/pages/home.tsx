import Header from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCategories } from '@/components/featured-categories';
import { FeaturedProducts } from '@/components/featured-products';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      <Header />
      <main className='space-y-8 my-8'>
        <HeroSection />
        <FeaturedProducts />
        <FeaturedCategories />
      </main>
      <Footer />
    </div>
  );
}
