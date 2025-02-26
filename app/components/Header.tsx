// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">My Social Site</Link>
        <div>
          <Link href="/product" className='text-white px-4 hover:underline'>Products</Link>
          <Link href="/create-product" className='text-white px-4 hover:underline'>Create Product</Link>
          <Link href="/landing" className="text-white px-4 hover:underline">Landing</Link>
          <Link href="/about" className="text-white px-4 hover:underline">About</Link>
          
          <Link href="/contact" className="text-white px-4 hover:underline">Contact</Link>

        </div>
      </nav>
    </header>
  );
};

export default Header;