import React, { useState } from 'react';
import { ArrowLeft, Mail, CreditCard, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = STRIPE_PRODUCTS[0]; // Get the first (and only) product

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          customer_email: email,
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
      setError(error instanceof Error ? error.message : 'Došlo je do greške');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors duration-200 mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <img 
                src="/Novi logo veći.png" 
                alt="Tvoja šansa logo" 
                className="h-10 w-10 rounded-full object-cover border-2 border-pink-400"
              />
              <h1 className="text-2xl font-bold text-white">Checkout</h1>
            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-white">€{product.price.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Trenutni pristup kursu</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email adresa
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                  placeholder="tvoj@email.com"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Link za pristup kursu će biti poslat na ovu email adresu
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium">Sigurna kupovina</p>
                  <p className="text-blue-200/80">Plaćanje se obrađuje preko Stripe-a, najsigurnijeg sistema za online plaćanja</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-xl"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Plati €{product.price.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>SSL zaštićeno</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Trenutni pristup</span>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-500">
              Klikom na "Plati" pristajete na naše uslove korišćenja i politiku privatnosti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}