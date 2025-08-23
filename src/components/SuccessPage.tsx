import React from 'react';
import { CheckCircle, ArrowRight, Home, Mail } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Čestitamo! 🎉
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Vaša kupovina je uspešno završena. Pristup kursu "Tvoja Šansa" će biti poslat na vašu email adresu!
            </p>
          </div>

          <div className="bg-black/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Šta sledi?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-300">Proverite vašu email adresu za link za pristup kursu</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-300">Pristupite kursu i počnite sa prvom lekcijom</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-gray-300">Pratite nas na društvenim mrežama za dodatne savete</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <p className="text-gray-300">Primenite naučeno i transformišite svoj ljubavni život</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Važna napomena</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Ukoliko ne vidite email u vašem inbox-u, proverite spam/junk folder. 
              Email sa pristupom kursu će stići u roku od 5 minuta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 border-2 border-white/30 hover:border-white/50 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:bg-white/10 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Početna</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}