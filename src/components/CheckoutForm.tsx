import React, { useState } from 'react';
import { ArrowLeft, Mail, CreditCard, Shield, CheckCircle, Loader2, Lock } from 'lucide-react';
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
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-red-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/Novi logo veći.png" 
                  alt="Tvoja šansa logo" 
                  className="h-10 w-10 rounded-full object-cover border-2 border-white/30"
                />
                <h1 className="text-2xl font-bold text-white">Checkout</h1>
              </div>
              <div className="w-6"></div> {/* Spacer for centering */}
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">jednokratno</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Trenutni pristup kursu</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email adresa
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300 text-lg"
                    placeholder="tvoj@email.com"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>Link za pristup kursu će biti poslat na ovu email adresu</span>
                </p>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 mb-1">Sigurna kupovina</p>
                    <p className="text-blue-700">Plaćanje se obrađuje preko Stripe-a, najsigurnijeg sistema za online plaćanja</p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    <span>Plati €{product.price.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-8 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>SSL zaštićeno</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Trenutni pristup</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>Sigurno plaćanje</span>
                </div>
              </div>
              
              <p className="text-center text-xs text-gray-400 leading-relaxed">
                Klikom na "Plati" pristajete na naše uslove korišćenja i politiku privatnosti.<br />
                Vaši podaci su zaštićeni i neće biti deljeni sa trećim stranama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}