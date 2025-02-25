import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/auth-store';
import { toast } from 'sonner';

export function PremiumModal() {
  const { showPremiumModal, setShowPremiumModal, setIsPremium } = useAuthStore();

  const handlePurchase = async () => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsPremium(true);
      setShowPremiumModal(false);
      toast.success('Welcome to Premium! Enjoy unlimited downloads and ad-free streaming.');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {showPremiumModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-xl bg-gray-900 p-6 shadow-xl"
          >
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Upgrade to Premium</h2>
              <p className="mt-2 text-gray-400">
                Enjoy unlimited downloads and ad-free streaming
              </p>
            </div>

            <div className="mt-8">
              <div className="rounded-lg bg-gray-800 p-6">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-white">Premium Plan</span>
                  <span className="text-2xl font-bold text-white">$10</span>
                </div>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center text-gray-300">
                    <span className="mr-2">✓</span>
                    Unlimited movie downloads
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="mr-2">✓</span>
                    Ad-free streaming experience
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="mr-2">✓</span>
                    High-quality downloads (1080p/4K)
                  </li>
                  <li className="flex items-center text-gray-300">
                    <span className="mr-2">✓</span>
                    Priority customer support
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              className="mt-6 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              Upgrade Now - $10
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              One-time payment. No recurring fees.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}