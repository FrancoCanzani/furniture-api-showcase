import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const backgroundImages = {
  sofa: 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/25be42f9-5e06-43c7-bd7b-55ca2b019983.jpeg',
  chair:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/10f4256f-14e1-44ce-96e1-988d7b7fd08e.jpeg',
  table:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/a0fef812-c73a-46ed-ba9b-d2fcec1e32eb.jpeg',
  desk: 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/5351cfe9-90e7-4379-9a61-a48069b12f01.jpeg',
  stool:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/37361617-6fbd-4dc4-80a3-af801da59c48.jpeg',
  kitchen:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/3559a19f-aa51-4efb-a024-a55bc20aa5ba.jpeg',
  vanitory:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/87280141-a60b-4b76-ab54-a2e4f6781752.jpeg',
  matress:
    'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/a77e3e2b-f36c-40a8-81c4-8e47c75de141.jpeg',
};

export function FeaturedCategories() {
  return (
    <section className='py-24'>
      <div className='container'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h4 className='text-sm uppercase tracking-wider text-neutral-500 mb-2'>
              Categories
            </h4>
            <h2 className='text-4xl font-light'>Browse by Room</h2>
          </div>
          <Link
            to='/search'
            className='text-sm flex items-center gap-1 hover:gap-2 transition-all'
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {CATEGORIES.slice(0, 8).map((category) => (
            <Link
              key={category}
              to={`/search?category=${category}`}
              className={cn(
                'group relative aspect-[4/5] overflow-hidden bg-neutral-100',
                'hover:shadow-xl transition-all duration-500'
              )}
            >
              <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40' />
              <img
                src={
                  backgroundImages[category as keyof typeof backgroundImages]
                }
                alt={category}
                className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-x-0 bottom-0 p-6'>
                <h3 className='text-lg text-white capitalize'>{category}</h3>
                <span className='text-sm text-white/80 flex items-center gap-1 group-hover:gap-2 transition-all'>
                  Shop Now <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
