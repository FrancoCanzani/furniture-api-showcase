import { Link } from 'react-router-dom';
import { CartSheet } from './cart-sheet';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header({ hasSearch }: { hasSearch?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('name') || ''
  );
  const currentSort = searchParams.get('sort') || 'newest';

  const updateSearchParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...current,
      ...newParams,
    });
  };

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue) {
        updateSearchParams({ name: searchValue });
      } else {
        // If search is empty, remove the name parameter while keeping others
        const current = Object.fromEntries(searchParams.entries());
        delete current.name;
        setSearchParams(current);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <header className='border-b sticky top-0 bg-white/80 z-10'>
      <div
        className={cn(
          'container sm:flex-row sm:space-y-0 mx-auto py-4 flex justify-between items-center w-full',
          hasSearch && 'flex-col space-y-4'
        )}
      >
        <Link to={'/'} className='text-2xl font-medium min-w-fit text-start'>
          Furniture Ecom
        </Link>
        <div className='flex items-center justify-end space-x-2 w-full'>
          {hasSearch ? (
            <>
              <Select
                value={currentSort}
                onValueChange={(value) => updateSearchParams({ sort: value })}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='price_asc'>
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value='price_desc'>
                      Price (High to Low)
                    </SelectItem>
                    <SelectItem value='name_asc'>Name (A-Z)</SelectItem>
                    <SelectItem value='name_desc'>Name (Z-A)</SelectItem>
                    <SelectItem value='oldest'>Oldest First</SelectItem>
                    <SelectItem value='newest'>Newest First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className='relative md:w-[300px]'>
                <Input
                  autoFocus
                  value={searchValue}
                  placeholder='Search products'
                  onChange={(e) => setSearchValue(e.target.value)}
                  className='w-full'
                />
              </div>
            </>
          ) : (
            <Link to={'/search'}>
              <Button variant='outline' size='icon'>
                <Search size={22} />
              </Button>
            </Link>
          )}
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
