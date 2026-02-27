import React from 'react';
import { Tv, MonitorPlay, Film, Wifi, CheckCircle2, Zap, Mic, Cast, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const DTH: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
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
             Cinematic Experience <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Right at Home</span>
           </h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
             Smart Set Top Boxes with 4K support, Dolby Audio, and integrated OTT apps for the ultimate viewing experience.
           </p>
           <div className="flex justify-center gap-4">
              <Link to="/book" className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Get New Connection
              </Link>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <MonitorPlay size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Android Box</h3>
                <p className="text-gray-600">Turn any TV into a Smart TV. Access YouTube, Prime Video, and 5000+ apps from Play Store.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <Tv size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">400+ Live Channels</h3>
                <p className="text-gray-600">Crystal clear HD channels with 7-day catch-up TV. Pause, Record, and Rewind live TV.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                    <Film size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">On Demand Movies</h3>
                <p className="text-gray-600">Access to a huge library of regional and international movies on demand.</p>
            </div>
        </div>
      </section>

      {/* Smart Features Breakdown (New) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
                <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop" className="relative z-10 rounded-3xl shadow-2xl border-4 border-white" alt="Smart Remote" />
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">More Than Just a Set Top Box</h2>
                <p className="text-gray-600 text-lg mb-10">Experience the future of television with our Android-powered Smart Box. It learns what you like.</p>
                <div className="space-y-8">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                         <Mic size={24} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-gray-900">Voice Control Remote</h4>
                         <p className="text-gray-600">"Find comedy movies". "Open YouTube". Just say it, and your TV obeys.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                         <Cast size={24} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-gray-900">Chromecast Built-in</h4>
                         <p className="text-gray-600">Cast photos, videos, and music from your phone to the big screen instantly.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                         <RotateCcw size={24} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-gray-900">7-Day Catch Up</h4>
                         <p className="text-gray-600">Missed your favorite serial? Watch shows from the last 7 days anytime.</p>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Entertainment Pack</h2>
            <p className="text-gray-600">Flexible plans for every family size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Basic Pack */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="text-gray-500 font-bold tracking-wide text-sm mb-4 uppercase">Value Prime</div>
                  <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-gray-900">₹250</span>
                      <span className="text-gray-500 ml-2">/mo</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">Perfect for regional content lovers.</p>
                  <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 250+ SD Channels</li>
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 30+ HD Channels</li>
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> SunNXT, Zee5 included</li>
                  </ul>
                  <Link to="/book?service=dth&plan=value_prime" className="block w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-xl text-center border border-gray-200 transition-colors">Select Pack</Link>
              </div>

              {/* Entertainment Max - NEW & FEATURED */}
              <div className="bg-slate-900 rounded-3xl p-8 border border-gray-800 shadow-2xl relative md:-translate-y-6">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl">
                    RECOMMENDED
                  </div>
                  <div className="text-purple-400 font-bold tracking-wide text-sm mb-4 uppercase">Entertainment Max</div>
                  <div className="flex items-baseline mb-6">
                      <span className="text-5xl font-extrabold text-white">₹650</span>
                      <span className="text-slate-400 ml-2">/mo</span>
                  </div>
                  <p className="text-slate-300 mb-6 text-sm">The ultimate entertainment bundle.</p>
                  <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-white font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> 500+ SD Channels</li>
                      <li className="flex items-center text-white font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> 120+ HD Channels</li>
                      <li className="flex items-center text-white font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> Netflix Standard</li>
                      <li className="flex items-center text-white font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> Amazon Prime Video</li>
                      <li className="flex items-center text-white font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> Disney+ Hotstar</li>
                  </ul>
                  <Link to="/book?service=dth&plan=entertainment_max" className="block w-full py-4 bg-gradient-to-r from-brand-orange to-orange-600 hover:to-orange-700 text-white font-bold rounded-xl text-center transition-all shadow-lg hover:shadow-orange-500/30">Get Entertainment Max</Link>
              </div>

              {/* Mega HD */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="text-gray-500 font-bold tracking-wide text-sm mb-4 uppercase">Mega HD</div>
                  <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-gray-900">₹400</span>
                      <span className="text-gray-500 ml-2">/mo</span>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">Sports & Movies galore.</p>
                  <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 400+ SD Channels</li>
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 80+ HD Channels</li>
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> All Sports Channels</li>
                      <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> Disney+ Hotstar included</li>
                  </ul>
                  <Link to="/book?service=dth&plan=mega_hd" className="block w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-xl text-center border border-gray-200 transition-colors">Select Pack</Link>
              </div>
          </div>
        </div>
      </section>

      {/* Hybrid Box CTA */}
      <section className="bg-white py-20 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center relative group">
                {/* Badge */}
               <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                  LIMITED OFFER
               </div>
               
               <div className="p-10 md:w-1/2 relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-4">Already have Airnetz Fiber?</h2>
                  <p className="text-slate-300 mb-8 text-lg">
                    Upgrade to our <span className="text-brand-orange font-bold">Hybrid Box Bundle</span>. Get Broadband + DTH + OTT in a single bill and <span className="text-white font-bold underline decoration-brand-orange">save up to 20%</span> every month.
                  </p>
                  <Link to="/book" className="inline-flex items-center px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30">
                    Check Bundle Availability <Wifi size={20} className="ml-2"/>
                  </Link>
               </div>
               <div className="md:w-1/2 h-64 md:h-full relative min-h-[350px]">
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