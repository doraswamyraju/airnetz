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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Entertainment Packages</h2>
            <p className="text-gray-600 text-lg">Choose what fits your lifestyle - IPTV, OTT, or stay connected with both.</p>
          </div>

          {/* Individual IPTV Packs */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><Tv size={24}/></div>
              Individual IPTV (DTH) Packages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-purple-500 font-bold tracking-wide text-xs mb-4 uppercase">Regional Value</div>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold text-gray-900">₹300</span>
                        <span className="text-gray-500 ml-2">/mo</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 250+ SD Channels</li>
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 40+ HD Channels</li>
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> Regional Movie Pack</li>
                    </ul>
                    <Link to="/book?service=iptv&plan=regional" className="block w-full py-3 bg-purple-50 text-purple-700 font-bold rounded-xl text-center hover:bg-purple-100 transition-colors">Choose IPTV</Link>
                </div>
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl scale-105 z-10">
                    <div className="text-purple-400 font-bold tracking-wide text-xs mb-4 uppercase">Digital Max</div>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold text-white">₹450</span>
                        <span className="text-slate-500 ml-2">/mo</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-slate-300 font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> 450+ SD Channels</li>
                        <li className="flex items-center text-slate-300 font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> 120+ HD Channels</li>
                        <li className="flex items-center text-slate-300 font-medium"><CheckCircle2 size={18} className="mr-3 text-purple-500"/> Sports & Kids Unlimited</li>
                    </ul>
                    <Link to="/book?service=iptv&plan=max" className="block w-full py-4 bg-brand-orange text-white font-bold rounded-xl text-center hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">Get Best IPTV</Link>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-purple-500 font-bold tracking-wide text-xs mb-4 uppercase">Sports HD</div>
                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold text-gray-900">₹400</span>
                        <span className="text-gray-500 ml-2">/mo</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> All Sports Channels</li>
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> 100+ HD Channels</li>
                        <li className="flex items-center text-gray-700 font-medium"><CheckCircle2 size={18} className="mr-3 text-green-500"/> English Entertainment</li>
                    </ul>
                    <Link to="/book?service=iptv&plan=sports" className="block w-full py-3 bg-purple-50 text-purple-700 font-bold rounded-xl text-center hover:bg-purple-100 transition-colors">Choose IPTV</Link>
                </div>
            </div>
          </div>

          {/* Individual OTT Packs */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600"><Film size={24}/></div>
              Individual OTT Subscriptions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'OTT Basic', price: 300, apps: 'SunNXT, Zee5, Discovery+', color: 'pink' },
                  { name: 'OTT Movie Master', price: 600, apps: 'Netflix (Basic), Zee5, SonyLIV', color: 'blue' },
                  { name: 'OTT Pro', price: 900, apps: 'Netflix, Prime, Hotstar, Zee5', color: 'orange' },
                  { name: 'OTT Yearly Saver', price: 2400, apps: 'All Premium Apps Included', color: 'green', yearly: true },
                ].map((pack) => (
                  <div key={pack.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all text-center">
                    <h4 className="font-bold text-gray-900 mb-2">{pack.name}</h4>
                    <div className="text-2xl font-extrabold text-gray-900 mb-4">₹{pack.price}{pack.yearly ? '' : <span className="text-sm text-gray-500 font-medium"> /mo</span>}</div>
                    <p className="text-xs text-gray-500 mb-6">{pack.apps}</p>
                    <Link to="/book" className="text-sm font-bold text-primary-600 hover:underline">Select Pack</Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Combo Packs */}
          <div className="bg-purple-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <span className="text-brand-orange font-bold uppercase tracking-wider text-sm mb-4 block">Ultimate Savings</span>
                <h3 className="text-4xl font-display font-bold mb-6">IPTV + OTT Combo Packs</h3>
                <p className="text-purple-200 text-lg mb-8 leading-relaxed">
                  Get the best of both worlds. Combine 450+ Live Channels with premium streaming apps and save up to 30% on combined subscriptions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">Netflix Standard</div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">Prime Video</div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">SonyLIV</div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">Zee5</div>
                </div>
              </div>
              <div className="lg:w-1/3 bg-white text-slate-900 p-8 rounded-3xl shadow-2xl text-center">
                <div className="text-purple-600 font-bold text-sm mb-2">MOST POPULAR COMBO</div>
                <h4 className="text-2xl font-bold mb-4">Entertainment Max Combo</h4>
                <div className="text-5xl font-extrabold text-slate-900 mb-6">₹1250<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> 500+ HD Channels</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> All Premium OTT Apps</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Static IP Support</li>
                </ul>
                <Link to="/book" className="block w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">Get the Combo</Link>
              </div>
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