import React, { useState, useEffect } from 'react';
import { Download, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';

interface DownloadPageProps {
  token: string;
}

export function DownloadPage({ token }: DownloadPageProps) {
  const [status, setStatus] = useState<'loading' | 'valid' | 'expired' | 'used' | 'invalid'>('loading');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Verify token validity when component mounts
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-download-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('valid');
      } else {
        if (data.error === 'Token expired') {
          setStatus('expired');
        } else if (data.error === 'Token already used') {
          setStatus('used');
        } else {
          setStatus('invalid');
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setStatus('invalid');
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      // Redirect to the download endpoint which will handle the file access
      window.location.href = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/download-course?token=${token}`;
      
      // After a short delay, update the status to show the link was used
      setTimeout(() => {
        setStatus('used');
        setDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Download error:', error);
      setDownloading(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifikujemo vaš pristup...</h2>
            <p className="text-gray-600">Molimo sačekajte trenutak</p>
          </div>
        );

      case 'valid':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vaš kurs je spreman! 🎉</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kliknite na dugme ispod da preuzmete kurs "Tvoja Šansa". 
              <br />
              <strong>Napomena:</strong> Link se može koristiti samo jednom i ističe za 24 sata.
            </p>
            
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl mx-auto"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Preuzimanje...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Preuzmite kurs</span>
                </>
              )}
            </button>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-800 mb-1">Važne informacije</p>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Link se može koristiti samo jednom</li>
                    <li>• Link ističe za 24 sata od kreiranja</li>
                    <li>• Sačuvajte fajl na sigurnom mestu</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'used':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kurs je već preuzet</h2>
            <p className="text-gray-600 mb-6">
              Ovaj link je već korišćen za preuzimanje kursa. Iz bezbednosnih razloga, svaki link se može koristiti samo jednom.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm">
                Ukoliko imate problema sa pristupom kursu, kontaktirajte nas preko Instagram-a 
                <a href="https://www.instagram.com/tvojaa_sansa" className="font-semibold underline">@tvojaa_sansa</a>
              </p>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Link je istekao</h2>
            <p className="text-gray-600 mb-6">
              Ovaj link za preuzimanje je istekao. Linkovi su važeći 24 sata od kreiranja.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">
                Kontaktirajte nas preko Instagram-a 
                <a href="https://www.instagram.com/tvojaa_sansa" className="font-semibold underline">@tvojaa_sansa</a> 
                da dobijete novi link za preuzimanje.
              </p>
            </div>
          </div>
        );

      case 'invalid':
      default:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nevaljan link</h2>
            <p className="text-gray-600 mb-6">
              Ovaj link za preuzimanje nije valjan ili ne postoji.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">
                Proverite da li ste kopirali kompletan link iz email-a ili kontaktirajte nas preko Instagram-a 
                <a href="https://www.instagram.com/tvojaa_sansa" className="font-semibold underline">@tvojaa_sansa</a>
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-red-500 px-8 py-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <img 
                src="/Novi logo veći.png" 
                alt="Tvoja šansa logo" 
                className="h-10 w-10 rounded-full object-cover border-2 border-white/30"
              />
              <h1 className="text-2xl font-bold text-white">Tvoja Šansa</h1>
            </div>
          </div>

          <div className="px-8 py-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}