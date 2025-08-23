import React from 'react';
import { CheckCircle, ArrowRight, Home, Mail, Download } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Čestitamo! 🎉
            </h1>
            <p className="text-xl text-green-100">
              Vaša kupovina je uspešno završena
            </p>
          </div>

          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Pristup kursu "Tvoja Šansa"
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Link za pristup kursu će biti poslat na vašu email adresu u roku od 5 minuta. 
                Proverite i spam folder ukoliko ne vidite email.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 mb-8 border border-pink-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Download className="w-5 h-5 text-pink-600" />
                <span>Šta sledi?</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Proverite email</p>
                    <p className="text-sm text-gray-600">Link za Google Docs sa kursom će stići na vašu email adresu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pristupite kursu</p>
                    <p className="text-sm text-gray-600">Kliknite na link i počnite sa prvom lekcijom</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Primenite naučeno</p>
                    <p className="text-sm text-gray-600">Transformišite svoj ljubavni život korak po korak</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Važna napomena</p>
                  <p className="text-blue-700">
                    Ukoliko ne vidite email u vašem inbox-u, proverite spam/junk folder. 
                    Email sa pristupom kursu će stići u roku od 5 minuta.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Povratak na početnu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}