import { Link } from 'react-router-dom';
import { CartSheet } from './cart-sheet';

export default function Header() {
  return (
    <header className='border-b sticky top-0 bg-background z-10'>
      <div className='container mx-auto py-4 flex justify-between items-center'>
        <Link to={'/'} className='text-2xl font-bold'>
          Furniture Ecom
        </Link>
        <CartSheet />
      </div>
    </header>
  );
}
