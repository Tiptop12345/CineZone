import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { getMoviesByCategory, getPopularMovies } from '../lib/api';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: '28', name: 'Action', slug: 'action' },
  { id: '16', name: 'Animation', slug: 'animation' },
  { id: '35', name: 'Comedy', slug: 'comedy' },
  { id: '878', name: 'Science Fiction', slug: 'science-fiction' },
];

export function HomePage() {
  const navigate = useNavigate();

  const { data: popularMovies, isLoading: popularLoading } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => getPopularMovies(),
  });

  const categoryQueries = CATEGORIES.map((category) => ({
    ...useQuery({
      queryKey: ['movies', category.id],
      queryFn: () => getMoviesByCategory(category.id),
    }),
    name: category.name,
    slug: category.slug,
  }));

  const handleViewAll = (category: string) => {
    navigate(`/movies?category=${category}&page=1`);
  };

  if (popularLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative -mx-4 aspect-video overflow-hidden">
        {popularMovies?.results[0] && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${popularMovies.results[0].backdrop_path}`}
              alt={popularMovies.results[0].title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-white md:text-5xl"
                >
                  {popularMovies.results[0].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 max-w-xl text-gray-300"
                >
                  {popularMovies.results[0].overview}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <Link
                    to={`/movie/${popularMovies.results[0].id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Watch Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Popular Movies */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
          <button
            onClick={() => handleViewAll('popular')}
            className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {popularMovies?.results.slice(0, 5).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              streamingLink={movie.streaming_url || '/default-streaming-url'} // Pass the streaming link here
            />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categoryQueries.map((query) => (
        <section key={query.name}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{query.name}</h2>
            <button
              onClick={() => handleViewAll(query.slug)}
              className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {query.isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {query.data?.results.slice(0, 5).map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseDate={movie.release_date}
                  voteAverage={movie.vote_average}
                  streamingLink={movie.streaming_url || '/default-streaming-url'} // Pass the streaming link here as well
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
