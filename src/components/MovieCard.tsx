import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { IMAGE_BASE_URL } from '../lib/utils';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  streamingLink: string;  // Add streamingLink prop
}

export function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  voteAverage,
  streamingLink,  // Destructure streamingLink
}: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-lg bg-gray-900"
    >
      <Link to={`/movie/${id}`}>
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}/w500${posterPath}`}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 p-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-300">{new Date(releaseDate).getFullYear()}</p>
            <div className="mt-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-white">{voteAverage.toFixed(1)}</span>
            </div>
            <a
              href={streamingLink}  // Use streamingLink as the href
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              <Play className="h-4 w-4" />
              Watch Now
            </a>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
