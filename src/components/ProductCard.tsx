import React, { useState } from 'react';
import { StripeProduct } from '../stripe-config';
import { ShoppingCart, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProductCardProps {
  product: StripeProduct;
  userHasAccess?: boolean;
}

export function ProductCard({ product, userHasAccess = false }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Morate biti ulogovani da biste kupili kurs');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Greška pri kreiranju checkout sesije');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Nije dobijen URL za checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Došlo je do greške');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pink-400/50 transition-all duration-300 group">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text mb-4">
          €{product.price.toFixed(2)}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      {userHasAccess ? (
        <div className="flex items-center justify-center space-x-2 py-3 px-6 bg-green-500/20 border border-green-400/30 rounded-full text-green-400 font-semibold">
          <CheckCircle className="w-5 h-5" />
          <span>Već imate pristup</span>
        </div>
      ) : (
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Kupi sad</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}