import React, { useState } from 'react';
import { Tv, MonitorPlay, Film, Wifi, CheckCircle2, Zap, Mic, Cast, RotateCcw, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DTH: React.FC = () => {
  const [duration, setDuration] = useState<'monthly' | 'sixMonths' | 'yearly'>('monthly');

  const getPrice = (prices: { monthly: number; sixMonths: number; yearly: number }) => {
    return prices[duration];
  };

  const iptvPrices = { monthly: 300, sixMonths: 1500, yearly: 2400 };
  const ottPrices = { monthly: 300, sixMonths: 1500, yearly: 2400 };
  const staticIPPrices = { monthly: 200, sixMonths: 1200, yearly: 2400 };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-900 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop" 
            alt="Entertainment Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm">
              Next Gen Entertainment
           </span>
           <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
             Premium Entertainment <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">On Your Own Terms</span>
           </h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
             Choose between standalone OTT subscriptions or integrated IPTV experiences. 
           </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Duration Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-1.5 rounded-2xl shadow-xl border border-gray-100 flex gap-2">
              <button
                onClick={() => setDuration('monthly')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'monthly' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setDuration('sixMonths')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'sixMonths' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                6 Months
              </button>
              <button
                onClick={() => setDuration('yearly')}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'yearly' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                12 Months
              </button>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Pricing Plans</h2>
            <p className="text-gray-600 text-lg">Flexible options for IPTV, OTT, and Business needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* IPTV Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Tv size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Digital IPTV</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Access 450+ live channels with HD support and smart features.</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900">₹{getPrice(iptvPrices)}</span>
                <span className="text-gray-400 ml-2 font-medium">/{duration === 'monthly' ? 'mo' : duration === 'sixMonths' ? '6mo' : 'year'}</span>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                  <span>450+ Live Channels</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                  <span>7-Day Catch Up</span>
                </div>
                <div className="flex items-center gap-3 text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                  <Info size={18} />
                  <span className="text-xs uppercase tracking-tight">Requires Broadband</span>
                </div>
              </div>

              <Link to="/book" className="block w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-center transition-all shadow-lg shadow-purple-200">
                Book IPTV
              </Link>
            </div>

            {/* OTT Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative scale-105 z-10 text-white">
              <div className="absolute top-0 right-10 bg-gradient-to-r from-brand-orange to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-b-xl">
                MOST POPULAR
              </div>
              <div className="w-14 h-14 bg-orange-500/20 text-brand-orange rounded-2xl flex items-center justify-center mb-8">
                <Film size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">OTT Subscription</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Stream your favorite movies and shows on any device, anywhere.</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-white">₹{getPrice(ottPrices)}</span>
                <span className="text-slate-500 ml-2 font-medium">/{duration === 'monthly' ? 'mo' : duration === 'sixMonths' ? '6mo' : 'year'}</span>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-slate-100 font-medium">
                  <CheckCircle2 size={20} className="text-brand-orange flex-shrink-0" />
                  <span>All Premium Apps</span>
                </div>
                <div className="flex items-center gap-3 text-slate-100 font-medium">
                  <CheckCircle2 size={20} className="text-brand-orange flex-shrink-0" />
                  <span>Multi-device Support</span>
                </div>
                <div className="flex items-center gap-3 text-green-400 font-bold bg-white/5 p-3 rounded-xl border border-white/10">
                  <Zap size={18} />
                  <span className="text-xs uppercase tracking-tight">Standalone Available</span>
                </div>
              </div>

              <Link to="/book" className="block w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl text-center transition-all shadow-xl shadow-orange-900/40">
                Get OTT Pack
              </Link>
            </div>

            {/* Static IP Card */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Wifi size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Static IP Add-on</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Fixed IP for hosting, CCTV, and secure business connections.</p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900">₹{getPrice(staticIPPrices)}</span>
                <span className="text-gray-400 ml-2 font-medium">/{duration === 'monthly' ? 'mo' : duration === 'sixMonths' ? '6mo' : 'year'}</span>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                  <span>Global Accessibility</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                  <span>Port Forwarding Ready</span>
                </div>
                <div className="flex items-center gap-3 text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                  <Info size={18} />
                  <span className="text-xs uppercase tracking-tight">Requires Broadband</span>
                </div>
              </div>

              <Link to="/book" className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-center transition-all shadow-lg shadow-slate-200">
                Add Static IP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Box CTA */}
      <section className="bg-white py-20 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center relative group">
               <div className="p-10 md:w-1/2 relative z-10 md:p-16">
                  <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">COMBO OFFER</span>
                  <h2 className="text-4xl font-bold text-white mb-6">Broadband + IPTV + OTT</h2>
                  <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                    Get the ultimate entertainment bundle with savings up to <span className="text-white font-bold underline decoration-brand-orange">30% every month</span>. Includes premium router and Smart Set-top box installation.
                  </p>
                  <Link to="/book" className="inline-flex items-center px-10 py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                    View Combo Plans <ArrowRight size={20} className="ml-2"/>
                  </Link>
               </div>
               <div className="md:w-1/2 h-64 md:h-[450px] relative">
                  <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop" alt="Hybrid Entertainment" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent"></div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default DTH;