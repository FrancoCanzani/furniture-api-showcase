import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='overflow-hidden bg-white space-y-8 px-4 md:px-8 text-black'>
      <div className='inset-0 flex items-center'>
        <div className='container'>
          <div className='max-w-2xl space-y-8'>
            <h1 className='text-[4rem] leading-none font-light'>
              Discover
              <br />
              <span className='font-normal'>Timeless Furniture</span>
              <br />
              Design
            </h1>
            <p className='text-xl'>
              Explore our collection of handcrafted furniture, made with premium
              materials and exceptional craftsmanship.
            </p>
            <Button asChild size='lg' variant={'ghost'}>
              <Link to='/search' className='flex items-center gap-2'>
                Shop Now
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
