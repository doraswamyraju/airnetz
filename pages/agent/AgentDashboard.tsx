import React from 'react';
import { 
  Users, Calendar, CheckCircle, Clock, 
  TrendingUp, AlertCircle 
} from 'lucide-react';
import AssignedJobs from '../../components/agent/AssignedJobs';

const AgentDashboard: React.FC = () => {
  const stats = [
    { label: 'Assigned Jobs', value: '8', icon: Calendar, color: 'blue' },
    { label: 'Completed Today', value: '5', icon: CheckCircle, color: 'green' },
    { label: 'Pending Requests', value: '3', icon: Clock, color: 'orange' },
    { label: 'Efficiency', value: '94%', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Agent Dashboard</h1>
            <p className="text-gray-500">Welcome back, Agent Rajesh. Stay productive!</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <div className="pr-4">
              <div className="text-xs font-bold text-gray-400 uppercase">Live Status</div>
              <div className="text-sm font-bold text-gray-900">Available / Online</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Jobs */}
          <div className="lg:col-span-2 space-y-6">
            <AssignedJobs />
          </div>

          {/* Activity/Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Notifications</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-red-50 text-red-600 rounded-2xl flex-shrink-0">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Emergency Maintenance</h5>
                    <p className="text-xs text-gray-500 mt-1">Fiber cut reported at MR Palli circle. Priority repair requested.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Stock Updated</h5>
                    <p className="text-xs text-gray-500 mt-1">Standard Dual-band routers restocked at main office.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-[2.5rem] shadow-xl p-8 text-white">
              <h4 className="text-lg font-bold mb-2">Earnings Today</h4>
              <div className="text-3xl font-bold mb-4">₹1,450</div>
              <p className="text-primary-100 text-xs leading-relaxed mb-6">Includes base pay + commissions for 5 completed jobs.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all">
                View Payouts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
