import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface CheckoutFormProps {
  onSuccess: () => void;
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!customerEmail) {
        throw new Error('Email je obavezan');
      }

      // Call Stripe checkout function
      const { data, error: functionError } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          customerEmail,
          customerName,
          price_id: STRIPE_PRODUCTS.course.priceId,
          mode: STRIPE_PRODUCTS.course.mode,
          success_url: `${window.location.origin}?success=true`,
          cancel_url: window.location.origin,
        },
      });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error('Edge Function returned a non-2xx status code');
      }

      if (data?.error) {
        console.error('Checkout error:', data.error);
        throw new Error('Greška pri kreiranju checkout sesije');
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Nedostaje checkout URL');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Došlo je do greške');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email adresa *
        </label>
        <input
          type="email"
          id="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          placeholder="vasa@email.com"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Ime (opciono)
        </label>
        <input
          type="text"
          id="name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          placeholder="Vaše ime"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Kreiranje...' : `Kupi sada - ${STRIPE_PRODUCTS.course.name}`}
      </button>
    </form>
  );
}