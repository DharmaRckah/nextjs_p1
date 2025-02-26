"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the sidebar when a link is clicked
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
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar Menu */}
        <div className={`fixed inset-0 bg-blue-500 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:bg-transparent`}>
          <div className="flex flex-col p-4">
            <Link href="/product" className="text-white px-4 py-2 hover:underline" onClick={handleLinkClick}>Products</Link>
            <Link href="/create-product" className="text-white px-4 py-2 hover:underline" onClick={handleLinkClick}>Create Product</Link>
            <Link href="/landing" className="text-white px-4 py-2 hover:underline" onClick={handleLinkClick}>Landing</Link>
            <Link href="/about" className="text-white px-4 py-2 hover:underline" onClick={handleLinkClick}>About</Link>
            <Link href="/contact" className="text-white px-4 py-2 hover:underline" onClick={handleLinkClick}>Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;