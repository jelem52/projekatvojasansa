import React from 'react';
import { CheckCircle, ArrowLeft, Download, MessageCircle } from 'lucide-react';

export const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Čestitamo! 🎉
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Uspešno ste kupili kurs "Tvoja Šansa". Vaša transformacija počinje sada!
          </p>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-green-400 mb-2">Šta je sledeće?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">Proverite svoj email za pristupne podatke i materijale kursa</p>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">Pridružite se našoj zajednici na Instagramu za dodatnu podršku</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="https://www.instagram.com/tvojaa_sansa?igsh=MWltdmtrd2h1ejlvNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center space-x-2"
            >
              <span>Pridruži se zajednici</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </a>
            
            <div className="pt-4">
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Nazad na početnu</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};