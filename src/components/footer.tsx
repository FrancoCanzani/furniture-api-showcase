import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-white/80 backdrop-blur-md border-t py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <p className='text-sm'>&copy; 2024. All rights reserved.</p>
          </div>
          <nav className='mb-4 md:mb-0'>
            <ul className='flex space-x-4'>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </nav>
          <div className='flex space-x-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900'
            >
              <Facebook size={20} />
              <span className='sr-only'>Facebook</span>
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900'
            >
              <Twitter size={20} />
              <span className='sr-only'>Twitter</span>
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900'
            >
              <Instagram size={20} />
              <span className='sr-only'>Instagram</span>
            </a>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900'
            >
              <Github size={20} />
              <span className='sr-only'>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
