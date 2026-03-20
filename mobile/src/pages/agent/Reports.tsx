import React from 'react';
import { BarChart, PieChart, TrendingUp, Award, Target, Star } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-500 text-sm">Analyze your work efficiency and customer ratings</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-sm">Monthly</button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-700 text-xs font-bold">Quarterly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center justify-between">
            Jobs Completed vs Target
            <BarChart className="text-blue-500" size={20} />
          </h3>
          <div className="flex items-end gap-3 h-48 mb-8">
            {[65, 45, 80, 55, 90, 40, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-slate-100 group-hover:bg-blue-500 transition-all rounded-t-lg relative" 
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h} Jobs
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Day {i+1}</span>
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-100 pt-6">
            <div className="flex-1 text-center border-r border-gray-100">
              <div className="text-xl font-bold text-gray-900">124</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">Total Work Hours</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-gray-900">4.9/5</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Award size={24} className="text-yellow-400" />
              <h4 className="text-lg font-bold">Top Performer</h4>
            </div>
            <p className="text-blue-100 text-sm mb-6">You're in the top 5% of agents this month! Keep it up.</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-white/20 flex items-center justify-center text-sm font-bold">
                #2
              </div>
              <div className="text-xs">Ranked 2nd out of 45 agents in Tirupati zone.</div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={18} /> Customer Feedback
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs italic text-gray-600">"Very professional service. Fixed the fiber issue in 20 minutes."</p>
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-500 text-yellow-500" />)}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-xs italic text-gray-600">"Excellent behavior and very helpful with router settings."</p>
                <div className="flex items-center gap-1 mt-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-500 text-yellow-500" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
