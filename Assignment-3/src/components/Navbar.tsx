import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav h-20 transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-violet-400 font-headline">
          CardStore
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-headline font-medium">
          <Link 
            to="/" 
            className={cn(
              "transition-all duration-300 ease-out pb-1",
              location.pathname === '/' ? "text-violet-400 border-b-2 border-violet-400" : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={cn(
              "transition-all duration-300 ease-out pb-1",
              location.pathname === '/shop' ? "text-violet-400 border-b-2 border-violet-400" : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            Shop
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800/50 hover:text-violet-400 transition-all duration-300 ease-out active:scale-90">
            <Search size={20} />
          </button>
          <button aria-label="Cart" className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800/50 hover:text-violet-400 transition-all duration-300 ease-out active:scale-90">
            <ShoppingCart size={20} />
          </button>
          <button aria-label="Profile" className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800/50 hover:text-violet-400 transition-all duration-300 ease-out active:scale-90">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
