import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { getMoviesByCategory, getPopularMovies } from '../lib/api';
import { motion } from 'framer-motion';

const CATEGORIES = {
  popular: { name: 'Popular Movies', id: null },
  action: { name: 'Action Movies', id: '28' },
  animation: { name: 'Animation Movies', id: '16' },
  comedy: { name: 'Comedy Movies', id: '35' },
  'science-fiction': { name: 'Science Fiction Movies', id: '878' },
};

export function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || 'popular';

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['movies', category, currentPage],
    queryFn: () => 
      category === 'popular' 
        ? getPopularMovies(currentPage)
        : getMoviesByCategory(CATEGORIES[category]?.id || '', currentPage),
  });

  const totalPages = data?.total_pages || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white"
      >
        {CATEGORIES[category]?.name || 'Movies'}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
          />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isFetching}
          className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage <= 3
              ? i + 1
              : currentPage >= totalPages - 2
                ? totalPages - 4 + i
                : currentPage - 2 + i;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={isFetching}
                className={`h-10 w-10 rounded-lg transition-colors ${
                  pageNumber === currentPage
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isFetching}
          className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}