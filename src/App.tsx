import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { PremiumModal } from './components/PremiumModal';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import { CategoryPage } from './pages/CategoryPage';
import { MoviesPage } from './pages/MoviesPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main className="container mx-auto px-4 pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </main>
          <PremiumModal />
          <Toaster position="top-center" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App