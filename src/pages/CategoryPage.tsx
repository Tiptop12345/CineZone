import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { getMoviesByCategory } from '../lib/api';

const CATEGORY_IDS: Record<string, string> = {
  action: '28',
  animation: '16',
  comedy: '35',
  'science-fiction': '878',
};

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryId = category ? CATEGORY_IDS[category] : '28';

  const { data, isLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getMoviesByCategory(categoryId),
    enabled: !!categoryId,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white capitalize">
        {category?.replace('-', ' ')} Movies
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
      </div>
    </div>
  );
}