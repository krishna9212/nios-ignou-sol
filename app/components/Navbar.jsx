'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { title: 'Home', route: '/' },
        { title: 'About', route: '/about-us' },
        { title: 'NIOS', route: '/nios' },
        { title: 'IGNOU', route: '/ignou' },
        { title: 'SOL DU', route: '/sol-du' },
        { title: 'Contact us', route: '/contact-us' },
    ];

    const handleNavClick = (route) => {
        router.push(route);
        setMobileMenuOpen(false);
    };

    const isCartActive = pathname === '/cart';

    return (
        <header className="w-full bg-white text-xl font-semibold shadow-md px-6 py-4 flex items-center justify-between relative z-50">
            {/* Logo */}
            <div
                className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer select-none  transition-transform"
                onClick={() => handleNavClick('/')}
            >
                nios-ignou-sol.com
            </div>

            {/* Desktop Navigation */}
            
<nav className="hidden md:flex items-center space-x-10">
    {navLinks.map((link, idx) => {
        const isActive = pathname === link.route;
        return (
            <button
                key={idx}
                onClick={() => handleNavClick(link.route)}
                className={`text-sm uppercase font-medium transition-all duration-300 border-b-2 tracking-wide ${
                    isActive
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
                }`}
            >
                {link.title}
            </button>
        );
    })}


                           {/* Cart (Styled Like a Link) */}
                           <button
                    onClick={() => handleNavClick('/cart')}
                    className={`flex items-center gap-1 text-sm uppercase font-medium px-2 py-2 border-[0.1px] rounded-full transition-all duration-300 ${
                        isCartActive
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
                    }`}
                    aria-label="Go to cart"
                    >
                    <ShoppingCart size={20} />
                </button>
                </nav>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center space-x-3">
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