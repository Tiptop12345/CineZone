import axios from 'axios';

const API_KEY = '3ad085192a5e24d2750056dee5092347';
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

export const getMoviesByCategory = async (category: string, page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: category,
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id: string) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};