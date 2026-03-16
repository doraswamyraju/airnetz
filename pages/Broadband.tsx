import React from 'react';
import PlanCard from '../components/PlanCard';
import { Plan } from '../types';
import { Wifi, ArrowDown, Shield, Check, X, Router as RouterIcon, Signal, Activity } from 'lucide-react';

const Broadband: React.FC = () => {
  const [duration, setDuration] = React.useState<'monthly' | 'sixMonths' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: '50mbps',
      name: 'Standard 50 Mbps',
      speed: '50 Mbps',
      price: duration === 'monthly' ? 650 : duration === 'sixMonths' ? 600 : 550,
      prices: { monthly: 650, sixMonths: 3600, yearly: 6600 },
      data: 'Unlimited',
      ottBenefits: [],
      type: 'broadband'
    },
    {
      id: '75mbps',
      name: 'Streamer 75 Mbps',
      speed: '75 Mbps',
      price: duration === 'monthly' ? 750 : duration === 'sixMonths' ? 700 : 650,
      prices: { monthly: 750, sixMonths: 4200, yearly: 7800 },
      data: 'Unlimited',
      ottBenefits: [],
      type: 'broadband'
    },
    {
      id: '90mbps',
      name: 'Turbo 90 Mbps',
      speed: '90 Mbps',
      price: duration === 'monthly' ? 950 : duration === 'sixMonths' ? 900 : 850,
      prices: { monthly: 950, sixMonths: 5400, yearly: 10200 },
      data: 'Unlimited',
      ottBenefits: [],
      type: 'broadband',
      recommended: true
    },
    {
      id: '50mbps-combo',
      name: 'Combo 50 Mbps',
      speed: '50 Mbps',
      price: duration === 'monthly' ? 950 : duration === 'sixMonths' ? 850 : 750,
      prices: { monthly: 950, sixMonths: 5100, yearly: 9000 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'OTT Apps'],
      type: 'bundle'
    },
    {
      id: '75mbps-combo',
      name: 'Combo 75 Mbps',
      speed: '75 Mbps',
      price: duration === 'monthly' ? 1050 : duration === 'sixMonths' ? 950 : 850,
      prices: { monthly: 1050, sixMonths: 5700, yearly: 10200 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'OTT Apps'],
      type: 'bundle'
    },
    {
      id: '90mbps-combo',
      name: 'Combo 90 Mbps',
      speed: '90 Mbps',
      price: duration === 'monthly' ? 1250 : duration === 'sixMonths' ? 1150 : 1050,
      prices: { monthly: 1250, sixMonths: 6900, yearly: 12600 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'OTT Apps'],
      type: 'bundle'
    },
    {
      id: '50mbps-premium',
      name: 'Premium 50 Mbps',
      speed: '50 Mbps',
      price: duration === 'monthly' ? 1250 : duration === 'sixMonths' ? 1100 : 950,
      prices: { monthly: 1250, sixMonths: 6600, yearly: 11400 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'Premium OTT', 'Static IP'],
      type: 'bundle'
    },
    {
      id: '75mbps-premium',
      name: 'Premium 75 Mbps',
      speed: '75 Mbps',
      price: duration === 'monthly' ? 1350 : duration === 'sixMonths' ? 1200 : 1050,
      prices: { monthly: 1350, sixMonths: 7200, yearly: 12600 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'Premium OTT', 'Static IP'],
      type: 'bundle'
    },
    {
      id: '90mbps-premium',
      name: 'Premium 90 Mbps',
      speed: '90 Mbps',
      price: duration === 'monthly' ? 1550 : duration === 'sixMonths' ? 1400 : 1250,
      prices: { monthly: 1550, sixMonths: 8400, yearly: 15000 },
      data: 'Unlimited',
      ottBenefits: ['IPTV', 'Premium OTT', 'Static IP'],
      type: 'bundle'
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Premium Hero Header */}
      <div className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1522869635100-39e344663d22?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Family using internet" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
         
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange font-bold tracking-wider uppercase text-sm mb-6 backdrop-blur-md">
             Pure Fiber Network
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight">
            Plans Built for <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Next Gen Life</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you're streaming 4K, gaming competitively, or working from home, we have a plan that fits your digital lifestyle perfectly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-12">
             <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <Wifi size={20} className="text-green-400" /> 
                <span className="text-white font-medium">99.9% Uptime</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <ArrowDown size={20} className="text-blue-400" /> 
                <span className="text-white font-medium">Symmetrical Speeds</span>
             </div>
             <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <Shield size={20} className="text-purple-400" /> 
                <span className="text-white font-medium">DDoS Protection</span>
             </div>
          </div>
        </div>
      </div>

      {/* Plan Selector / Grid */}
      <div className="flex-grow py-20 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Visual Toggle */}
           <div className="flex justify-center mb-16">
              <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-gray-100 flex items-center">
                 <button 
                  onClick={() => setDuration('monthly')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'monthly' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Monthly
                </button>
                 <button 
                  onClick={() => setDuration('sixMonths')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'sixMonths' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  6 Months
                </button>
                 <button 
                  onClick={() => setDuration('yearly')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${duration === 'yearly' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  12 Months
                </button>
              </div>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Hardware Spotlight Section */}
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden mb-24 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
               <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4">Included Hardware</span>
               <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">Advanced Wi-Fi 6 Ready Router</h2>
               <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                 Don't let your router be the bottleneck. Every 6-month+ plan comes with our premium Dual-Band Gigabit Router designed for wall-to-wall coverage.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-start">
                     <div className="bg-primary-100 p-2 rounded-lg text-primary-600 mr-4"><RouterIcon size={24}/></div>
                     <div>
                        <h4 className="font-bold text-gray-900">Dual Band Technology</h4>
                        <p className="text-sm text-gray-500">2.4GHz for range, 5GHz for raw speed.</p>
                     </div>
                  </li>
                  <li className="flex items-start">
                     <div className="bg-primary-100 p-2 rounded-lg text-primary-600 mr-4"><Signal size={24}/></div>
                     <div>
                        <h4 className="font-bold text-gray-900">High-Gain Antennas</h4>
                        <p className="text-sm text-gray-500">4x5dBi antennas for penetrating walls.</p>
                     </div>
                  </li>
                  <li className="flex items-start">
                     <div className="bg-primary-100 p-2 rounded-lg text-primary-600 mr-4"><Activity size={24}/></div>
                     <div>
                        <h4 className="font-bold text-gray-900">MU-MIMO Support</h4>
                        <p className="text-sm text-gray-500">Connect 20+ devices without lag.</p>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="lg:w-1/2 bg-gray-100 relative min-h-[400px]">
               <img src="https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" alt="Router" />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10"></div>
            </div>
          </div>
          
          {/* Comparison Table Section */}
          <div className="mb-24">
             <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">How we compare</h2>
             <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-wider">Feature</th>
                            <th className="p-6 font-bold text-primary-600 text-lg">Airnetz Fiber</th>
                            <th className="p-6 font-bold text-gray-400">Typical Broadband</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         <tr>
                            <td className="p-6 font-semibold text-gray-700">Upload Speed</td>
                            <td className="p-6 text-gray-900 font-bold bg-primary-50/30">Same as Download (1:1)</td>
                            <td className="p-6 text-gray-500">10% of Download Speed</td>
                         </tr>
                         <tr>
                            <td className="p-6 font-semibold text-gray-700">Latency (Ping)</td>
                            <td className="p-6 text-gray-900 font-bold bg-primary-50/30">&lt; 5ms to major servers</td>
                            <td className="p-6 text-gray-500">20-50ms</td>
                         </tr>
                         <tr>
                            <td className="p-6 font-semibold text-gray-700">Data Cap (FUP)</td>
                            <td className="p-6 text-gray-900 font-bold bg-primary-50/30">Truly Unlimited</td>
                            <td className="p-6 text-gray-500">3300 GB Limit</td>
                         </tr>
                         <tr>
                            <td className="p-6 font-semibold text-gray-700">Router Included</td>
                            <td className="p-6 text-green-600 bg-primary-50/30"><Check size={24} /></td>
                            <td className="p-6 text-gray-400"><X size={24} /></td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-4">Powering Your Business?</h3>
                <p className="text-slate-300 max-w-lg text-lg">
                    Get dedicated leased lines with static IPs, priority routing, and 4-hour SLA support for your enterprise needs in Tirupati.
                </p>
              </div>
              <a href="/support" className="relative z-10 inline-block px-10 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg hover:-translate-y-1 flex-shrink-0">
                  Contact Corporate Sales
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadband;