import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isPremium: boolean;
  downloads: string[];
  showPremiumModal: boolean;
  setIsPremium: (isPremium: boolean) => void;
  setShowPremiumModal: (show: boolean) => void;
  addDownload: (movieId: string) => void;
  canDownload: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isPremium: false,
      downloads: [],
      showPremiumModal: false,
      setIsPremium: (isPremium) => set({ isPremium }),
      setShowPremiumModal: (show) => set({ showPremiumModal: show }),
      addDownload: (movieId) => {
        const downloads = [...get().downloads, movieId];
        set({ downloads });
      },
      canDownload: () => {
        const { isPremium, downloads } = get();
        return isPremium || downloads.length < 10;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);