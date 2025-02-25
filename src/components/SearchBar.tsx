import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies } from '../lib/api';
import { IMAGE_BASE_URL } from '../lib/utils';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const handleClose = () => {
    setQuery('');
    setDebouncedQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 right-0 top-full border-t border-gray-800 bg-black/95"
        >
          <div className="container mx-auto p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full rounded-lg bg-gray-800 px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {debouncedQuery && (
              <div className="mt-4 max-h-[70vh] overflow-y-auto rounded-lg bg-gray-900 p-4">
                {isLoading ? (
                  <div className="py-8 text-center text-gray-400">Searching...</div>
                ) : data?.results.length === 0 ? (
                  <div className="py-8 text-center text-gray-400">No movies found</div>
                ) : (
                  <div className="grid gap-4">
                    {data?.results.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-800"
                      >
                        <img
                          src={`${IMAGE_BASE_URL}/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-16 w-12 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-white">{movie.title}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}