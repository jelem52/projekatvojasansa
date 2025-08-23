import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useStripe } from '../hooks/useStripe';
import { AuthModal } from './AuthModal';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface CheckoutButtonProps {
  priceId: string;
  mode?: 'payment' | 'subscription';
  children: React.ReactNode;
  className?: string;
  price: number;
  currency: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  priceId, 
  mode = 'payment', 
  children, 
  className = '',
  price,
  currency
}) => {
  const { createCheckoutSession, loading, error } = useStripe();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClick = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    await createCheckoutSession(priceId, mode);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, automatically start checkout
    setTimeout(() => {
      createCheckoutSession(priceId, mode);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''} transition-all duration-300`}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Učitava...</span>
          </div>
        ) : (
          children
        )}
      </button>

      {error && (
        <div className="mt-4 bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};