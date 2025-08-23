import React from 'react';
import { Loader2 } from 'lucide-react';
import { useStripe } from '../hooks/useStripe';

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
}) => {
  const { createCheckoutSession, loading, error } = useStripe();

  const handleClick = async () => {
    await createCheckoutSession(priceId, mode);
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
    </>
  );
};