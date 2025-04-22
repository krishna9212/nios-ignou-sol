'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart ,Search} from 'lucide-react';
import Image from 'next/image';
import logo from '@/public/logo.png';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Home', route: '/' },
    { title: 'About', route: '/about-us' },
    {
      title: 'NIOS',
      route: '/nios',
      children: [
        { title: 'NIOS Class 10th', route: '/nios/nios-10th' },
        { title: 'NIOS Class 12th', route: '/nios/nios-12th' },
      ],
    },
    { title: 'IGNOU', route: '/ignou' },
    { title: 'SOL DU', route: '/sol-du' },
    { title: 'Contact us', route: '/contact-us' },
  ];

  const isCartActive = pathname === '/cart';

  const handleNavClick = (route) => {
    router.push(route);
    setMobileMenuOpen(false);
  };
  const handleSearchClick = () => {
    router.push('/search'); // Navigate to the /search route
  };
  const baseButtonClasses =
    'text-sm uppercase font-medium transition-all duration-300 tracking-wide';

  return (
    <header className="w-full bg-white shadow-md px-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <div onClick={() => handleNavClick('/')} className="cursor-pointer">
        <Image src={logo} alt="nios-ignou-sol.com" width={100} height={100} />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link, idx) => {
          const isActive = pathname === link.route;

          if (link.children) {
            return (
              <div key={idx} className="relative group">
                <button
                  onClick={() => handleNavClick(link.route)}
                  className={`${baseButtonClasses} border-b-2 ${
                    isActive
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent mb-[3px] hover:text-blue-600 hover:border-blue-600'
                  }`}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {link.title}
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0  py-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 translate-y-0 min-w-[180px] z-50 pointer-events-none group-hover:pointer-events-auto">
                  {link.children.map((child, childIdx) => (
                    <button
                      key={childIdx}
                      onClick={() => handleNavClick(child.route)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => handleNavClick(link.route)}
              className={`${baseButtonClasses} border-b-2 ${
                isActive
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
              }`}
            >
              {link.title}
            </button>
          );
        })}
{/* Search Icon */}
<button
          onClick={handleSearchClick}
          className={`flex items-center px-2 py-2 border rounded-full text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600`}
          aria-label="Go to search"
        >
          <Search size={20} />
        </button>
        {/* Cart */}
        <button
          onClick={() => handleNavClick('/cart')}
          className={`flex items-center  px-2 py-2 border rounded-full ${isCartActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'}`}
          aria-label="Go to cart"
        >
          <ShoppingCart size={20} />
        </button>
        
      </nav>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center space-x-3">
            <button
          onClick={handleSearchClick}
          className={`p-2 rounded-full transition-all duration-300 ${
            pathname === '/search'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
          }`}
          aria-label="Go to search"
        >
          <Search size={22} />
        </button>
                {/* Cart (Mobile) */}
                <button
                    onClick={() => handleNavClick('/cart')}
                    className={`p-2 rounded-full transition-all duration-300 ${
                        isCartActive
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                    }`}
                    aria-label="Go to cart"
                >
                    <ShoppingCart size={22} />
                </button>
                     {/* Search Icon (Mobile) */}
        
                {/* Hamburger */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-gray-700 text-[1.45rem] hover:text-black transition-transform"
                    aria-label="Open mobile menu"
                >
                    ☰
                </button>
            </div>

            {/* Slide-in Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-[75%] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center px-6 pt-4">
                    <div className="text-lg font-semibold text-gray-800"></div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-500 hover:text-gray-800 text-4xl"
                        aria-label="Close mobile menu"
                    >
                        &times;
                    </button>
                </div>

                {/* Mobile Links */}
                <div className="px-6 py-6 flex justify-center h-[75%] flex-col space-y-8">
                    {navLinks.map((link, idx) => {
                        const isActive = pathname === link.route;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleNavClick(link.route)}
                                className={`text-[1.1rem] font-medium uppercase tracking-wide text-left transition duration-300 ${
                                    isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {link.title}
                            </button>
                        );
                    })}

                   
                </div>
            </div>

            {/* Backdrop */}
            {mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                />
            )}
        </header>
    );
}

export default Navbar;