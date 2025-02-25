import { Link, useLocation } from 'react-router-dom';
import { Film, Search, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/auth-store';
import { SearchBar } from './SearchBar';
import { cn } from '../lib/utils';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isPremium, showPremiumModal, setShowPremiumModal } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 z-50 w-full bg-black/95 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Film className="h-6 w-6 text-red-600" />
          <span>CineZone</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm transition-colors",
              isActive('/') ? "text-red-600" : "text-gray-300 hover:text-white"
            )}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            className={cn(
              "text-sm transition-colors",
              isActive('/movies') ? "text-red-600" : "text-gray-300 hover:text-white"
            )}
          >
            Movies
          </Link>
          <Link 
            to="/categories" 
            className={cn(
              "text-sm transition-colors",
              isActive('/categories') ? "text-red-600" : "text-gray-300 hover:text-white"
            )}
          >
            Categories
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowPremiumModal(true)}
            className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <User className="h-4 w-4" />
            {isPremium ? 'Premium' : 'Get Premium'}
          </button>
        </div>
      </div>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}