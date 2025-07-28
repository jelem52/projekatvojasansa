import React from 'react';
import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Heart, 
  Users, 
  MessageCircle, 
  Target, 
  Star, 
  CheckCircle, 
  Play,
  Instagram,
  ArrowRight,
  Zap,
  Trophy,
  BookOpen,
  Video,
  Infinity,
  X
} from 'lucide-react';

function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isDiscountActive, setIsDiscountActive] = useState(true);

  useEffect(() => {
    // Set the countdown end date (4 days from now)
    const countdownEnd = new Date();
    countdownEnd.setDate(countdownEnd.getDate() + 4);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownEnd.getTime() - now;
      
      if (distance < 0) {
        setIsDiscountActive(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/Novi logo veći.png" 
                alt="Tvoja šansa logo" 
                className="h-12 w-12 rounded-full object-cover border-2 border-pink-400"
              />
              <h1 className="text-2xl font-bold text-white">Tvoja šansa</h1>
            </div>
            <a 
              href="https://tvojaasansa.gumroad.com/l/eexxce?_gl=1*6dq7se*_ga*MTM0ODYxMzk2Mi4xNzUyNzg4MzY0*_ga_6LJN6D94N6*czE3NTI3OTE2MjIkbzIkZzEkdDE3NTI3OTE2MjUkajU3JGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Kupi sad
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Tvoja šansa da
                  <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"> konačno smuvaš ribu</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Jel se plašiš da priđeš devojci?<br />
                  Jel se plašiš da će te odbiti?<br />
                  Jel se plašiš da ćeš zauvek ostati sam?
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-400 font-semibold text-lg">
                      {isDiscountActive ? 'Ograničena ponuda!' : 'Regularna cena'}
                    </div>
                    <div className="text-white text-sm">
                      {isDiscountActive 
                        ? 'Cena kursa je snižena sa $25 na samo $15' 
                        : 'Cena kursa je $25'
                      }
                    </div>
                    {isDiscountActive && (
                      <div className="text-red-400 text-xs mt-1 font-medium">
                        Ponuda ističe za: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-lg line-through">$25</div>
                    <div className="text-3xl font-bold text-green-400">
                      ${isDiscountActive ? '15' : '25'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://tvojaasansa.gumroad.com/l/eexxce?_gl=1*6dq7se*_ga*MTM0ODYxMzk2Mi4xNzUyNzg4MzY0*_ga_6LJN6D94N6*czE3NTI3OTE2MjIkbzIkZzEkdDE3NTI3OTE2MjUkajU3JGwwJGgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Nauči kako</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10">
                  Saznaj više
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span>500+ zadovoljnih korisnika</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>4.9/5 ocena</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-black/50 rounded-xl relative overflow-hidden group cursor-pointer" onClick={() => setShowVideo(true)}>
                  {!showVideo ? (
                    <>
                      {/* Thumbnail as background */}
                      <img 
                        src="https://img.youtube.com/vi/NBTN1YJ4jhU/maxresdefault.jpg" 
                        alt="Tvoja šansa video thumbnail"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {/* Subtle dark overlay */}
                      <div className="absolute inset-0 bg-black/20 rounded-xl group-hover:bg-black/30 transition-all duration-300"></div>
                      
                      {/* Hover overlay with centered play icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* YouTube Embed */}
                      <iframe
                        src="https://www.youtube.com/embed/NBTN1YJ4jhU?autoplay=1&rel=0"
                        title="Tvoja šansa - Dating Course Video"
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      
                      {/* Close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideo(false);
                        }}
                        className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-all duration-300 border border-white/20 z-10"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-center text-gray-300 mt-4 font-medium">
                  {!showVideo ? 'Pogledaj uvodni video i saznaj kako možeš promeniti svoj život' : 'Kliknite X da zatvorite video'}
                </p>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                🔥 NAJPOPULARNIJI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Zašto si uopšte ovde?</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Jer ti srce lupa svaki put kad ti se devojka obrati. Jer zavidiš likovima koji svaki vikend smuvaju drugu ribu. Dosta brate! Treba ti ovo:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Veština komunikacije",
                description: "Naučićeš kako da pričaš sa devojkama bez da mucaš i zaboravljaš šta si hteo da kažeš."
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "Video lekcije",
                description: "Jasne lekcije, u kojima ćeš videti detaljna objašnjenja i realne primere."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Izgradnja samopouzdanja",
                description: "Pokazaćemo ti tehnike uz pomoć kojih se više nećeš znojiti kad treba da platiš konobaricu za račun."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Psihologija privlačnosti",
                description: "Postaćeš genije za razumevanje ženskog uma, i saznaćeš šta ih zapravo privlači."
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "Video lekcije",
                description: "Jasne lekcije, u kojima ćeš videti detaljna objašnjenja i realne primere."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Konkretni rezultati",
                description: "Videćeš konkretne rezultate čim kreneš da primenjuješ znanje."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-pink-400/50 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://tvojaasansa.gumroad.com/l/eexxce?_gl=1*6dq7se*_ga*MTM0ODYxMzk2Mi4xNzUyNzg4MzY0*_ga_6LJN6D94N6*czE3NTI3OTE2MjIkbzIkZzEkdDE3NTI3OTE2MjUkajU3JGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl leading-tight max-w-xs sm:max-w-none mx-auto block relative"
            >
              <span className="block text-center">Pristup celom kursu</span>
              <span className="block text-center text-xs sm:text-base mt-1 sm:mt-0 sm:inline sm:ml-2">
                Kupi sad za ${isDiscountActive ? '15' : '25'}
              </span>
              {isDiscountActive && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  POPUST!
                </div>
              )}
            </a>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Rezultati naših korisnika</h3>
            <p className="text-xl text-gray-300">Realni rezultati, realne transformacije</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                image: "/IMG_0827 (2).jpeg",
                alt: "Rezultat 1"
              },
              {
                image: "/IMG_0826 (2).jpeg", 
                alt: "Rezultat 2"
              },
              {
                image: "/E97670C1-3CC1-40FD-9EBB-4AB0FD13CC4B (2).jpeg",
                alt: "Rezultat 3"
              },
              {
                image: "/0D4B5846-3D84-4740-9786-26B3D00E018A (2).jpeg",
                alt: "Rezultat 4"
              }
            ].map((result, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:border-pink-400/50 transition-all duration-300">
                <div className="w-full h-96 sm:h-80 lg:h-96 rounded-md overflow-hidden">
                  <img 
                    src={result.image} 
                    alt={result.alt}
                    className="w-full h-full object-contain bg-black/20"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600/20 to-red-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Spreman da nađeš devojku?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Svaki dan koji prođe je propuštena prilika za poljubac, vezu ili druženje na veče...
            Prestani da odlažeš ovo, znaš da ti treba. Klikni na dugme ispod pa se vidimo u kursu.
          </p>
          
          <div className="space-y-4">
            <a 
              href="https://tvojaasansa.gumroad.com/l/eexxce?_gl=1*6dq7se*_ga*MTM0ODYxMzk2Mi4xNzUyNzg4MzY0*_ga_6LJN6D94N6*czE3NTI3OTE2MjIkbzIkZzEkdDE3NTI3OTE2MjUkajU3JGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block leading-tight relative"
            >
              <span className="block sm:inline">
                Kupi sad za ${isDiscountActive ? '15' : '25'}
              </span>
              <span className="block sm:inline sm:ml-2">Počni transformaciju</span>
              {isDiscountActive && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  POPUST!
                </div>
              )}
            </a>
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <Infinity className="w-4 h-4 text-pink-400" />
              <span>Doživotni pristup kursu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img 
                src="/Novi logo veći.png" 
                alt="Tvoja šansa logo" 
                className="h-10 w-10 rounded-full object-cover border-2 border-pink-400"
              />
              <span className="text-white font-semibold text-lg">Tvoja šansa</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <p className="text-gray-300">Pratite nas:</p>
              <a 
                href="https://www.instagram.com/tvojaa_sansa?igsh=MWltdmtrd2h1ejlvNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://www.tiktok.com/@tvojasansa?_t=ZM-8xkIqqqmYgH&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-black to-gray-800 p-3 rounded-full hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-110 border border-white/20"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Tvoja šansa. Sva prava zadržana. | Transformišemo živote od 2020.
            </p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;