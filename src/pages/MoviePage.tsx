import { useQuery } from '@tanstack/react-query';
import { Download, Loader2, Play, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getMovieDetails } from '../lib/api';
import { useAuthStore } from '../store/auth-store';
import { motion } from 'framer-motion';

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { canDownload, addDownload, isPremium } = useAuthStore();

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  const handleDownload = () => {
    if (!canDownload()) {
      toast.error(
        'You have reached your download limit. Upgrade to premium for unlimited downloads!'
      );
      return;
    }

    addDownload(id!);
    toast.success('Download started!');
  };

  if (isLoading || !movie) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="-mx-4">
      {/* Hero Section */}
      <div className="relative aspect-video">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50">
          <div className="absolute bottom-0 left-0 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:gap-8"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-48 rounded-lg shadow-lg md:w-64"
              />
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                </div>
                <p className="max-w-2xl text-gray-300">{movie.overview}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700">
                    <Play className="h-5 w-5" />
                    Watch Now
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 rounded-full bg-gray-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto mt-8 space-y-8">
        {!isPremium && (
          <div className="rounded-lg bg-gradient-to-r from-red-600 to-red-500 p-6 text-white shadow-lg">
            <h3 className="text-xl font-semibold">Upgrade to Premium</h3>
            <p className="mt-2">
              Get unlimited downloads, ad-free streaming, and exclusive content.
            </p>
            <button className="mt-4 rounded-full bg-white px-6 py-2 font-semibold text-red-600 transition-colors hover:bg-gray-100">
              Get Premium Now
            </button>
          </div>
        )}

        {/* Movie Information */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Genres</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Languages</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {movie.spoken_languages.map((language) => (
                <span
                  key={language.iso_639_1}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  {language.english_name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Production</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {movie.production_companies.map((company) => (
                <span
                  key={company.id}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}