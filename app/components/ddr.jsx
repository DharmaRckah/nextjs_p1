// components/Header.tsx
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">My Social Site</Link>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="text-white md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✖' : '☰'} {/* Hamburger icon */}
        </button>

        {/* Navigation Links */}
        <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static bg-blue-500 md:bg-transparent w-full md:w-auto top-16 left-0`}>
          <Link href="/product" className='text-white px-4 py-2 hover:underline'>Products</Link>
          <Link href="/create-product" className='text-white px-4 py-2 hover:underline'>Create Product</Link>
          <Link href="/landing" className="text-white px-4 py-2 hover:underline">Landing</Link>
          <Link href="/about" className="text-white px-4 py-2 hover:underline">About</Link>
          <Link href="/contact" className="text-white px-4 py-2 hover:underline">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;