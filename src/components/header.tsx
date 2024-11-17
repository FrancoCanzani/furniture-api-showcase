import { Link } from 'react-router-dom';
import { CartSheet } from './cart-sheet';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className='border-b sticky top-0 bg-background z-10'>
      <div className='container mx-auto py-4 flex justify-between items-center'>
        <Link to={'/'} className='text-2xl font-bold'>
          Furniture Ecom
        </Link>
        <div className='flex items-center justify-end space-x-2'>
          <Link to={'/search'}>
            <Button variant='outline' size='icon'>
              <Search size={22} />
            </Button>
          </Link>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
