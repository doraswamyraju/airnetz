import React from 'react';
import { Wifi, ArrowRight } from 'lucide-react';

interface ActivePlanProps {
  planName?: string;
  speed?: number;
  expiryDate?: string;
}

const ActivePlan: React.FC<ActivePlanProps> = ({ 
  planName = 'Turbo Home 100', 
  speed = 100,
  expiryDate = 'April 10, 2026'
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <span className="inline-block px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full mb-4">ACTIVE PLAN</span>
          <h3 className="text-4xl font-extrabold mb-2">{planName}</h3>
          <p className="text-slate-400 font-medium mb-8">Pure Fiber Connection • Symmetrical Speed</p>
          
          <div className="flex flex-wrap gap-8 items-center">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bandwidth</div>
              <div className="text-2xl font-bold">{speed} Mbps <span className="text-sm opacity-50 font-medium">Unlimited</span></div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Uptime</div>
              <div className="text-2xl font-bold text-green-400">99.9%</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bill Due In</div>
              <div className="text-2xl font-bold">12 Days</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-6">
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
              <Wifi size={32} className="text-brand-orange" />
           </div>
           <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl shadow-black/20">
              Renew Now <ArrowRight size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ActivePlan;
