import React from 'react';
import { 
  Wifi, CreditCard, Headphones, Package, 
  ChevronRight, ArrowRight, Zap, ShieldCheck 
} from 'lucide-react';
import { api } from '../../services/api';
import ActivePlan from '../../components/customer/ActivePlan';

const CustomerDashboard: React.FC = () => {
  const [profile, setProfile] = React.useState<any>(null);
  const [requests, setRequests] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await api.getCustomerProfile(user.id);
        setProfile(profileData);
        
        if (profileData?.id) {
          const requestData = await api.getCustomerRequests(profileData.id);
          setRequests(requestData);
        }
      } catch (err) {
        console.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (user.id) loadData();
  }, [user.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Syncing with Network...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Hello, {profile?.name || user.name}</h1>
            <p className="text-gray-500">Welcome to your Airnetz Portal. Network is running smoothly.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-600 hover:text-primary-600 transition-all">
                <Headphones size={24} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            {profile?.plan_name ? (
              <ActivePlan 
                planName={profile?.plan_name} 
                speed={profile?.speed_mbps}
                expiryDate="Next Month"
              />
            ) : (
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Account Status</span>
                    <h2 className="text-4xl font-display font-bold mb-2">Pending Installation</h2>
                    <p className="text-primary-100/80 max-w-md">Our team is preparing your fiber connection. Your chosen plan will be activated once installation is complete.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/10">
                    <Wifi size={48} className="animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Installation Tracking (If any) */}
            {requests.some(r => r.type === 'Installation' && r.status !== 'Completed') && (
              <div className="mt-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Package size={80} className="text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-brand-orange" />
                  Installation Status
                </h3>
                
                <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                    {/* Progress Line */}
                    <div className="absolute left-0 right-0 h-1 bg-gray-100 top-1/2 -translate-y-1/2 z-0"></div>
                    <div className={`absolute left-0 h-1 bg-brand-orange top-1/2 -translate-y-1/2 z-0 transition-all duration-1000`} 
                         style={{ width: requests.find(r => r.type === 'Installation')?.status === 'In Progress' ? '50%' : '5%' }}></div>
                    
                    {[
                      { label: 'Booked', status: 'Pending' },
                      { label: 'Assigned', status: 'In Progress' },
                      { label: 'Activated', status: 'Completed' }
                    ].map((step, i) => {
                      const currentStatus = requests.find(r => r.type === 'Installation')?.status;
                      const isActive = i === 0 || (i === 1 && currentStatus === 'In Progress') || (i === 2 && currentStatus === 'Completed');
                      return (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${isActive ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-400'}`}>
                              {i + 1}
                           </div>
                           <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                </div>
                
                <div className="mt-8 p-4 bg-orange-50 rounded-2xl flex items-center justify-between">
                   <p className="text-sm text-orange-800 font-medium whitespace-pre-wrap">
                      {requests.find(r => r.type === 'Installation')?.status === 'In Progress' 
                        ? 'Technician has been assigned. They will call you shortly.' 
                        : 'Your connection request is in queue. Expect a call within 24 hours.'}
                   </p>
                   <span className="text-[10px] font-black uppercase text-brand-orange tracking-widest">{requests.find(r => r.type === 'Installation')?.id}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-primary-500/30 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Billing History</h4>
                    <p className="text-xs text-gray-500">View and download invoices</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-primary-600" />
             </div>
             
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-orange-500/30 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-brand-orange rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Upgrade Speed</h4>
                    <p className="text-xs text-gray-500">Boost to 300 Mbps instantly</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-brand-orange" />
             </div>

             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-green-500/30 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Manage Add-ons</h4>
                    <p className="text-xs text-gray-500">Netflix, Prime & IPTV packs</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-green-600" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Recent Activity */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-xl font-bold text-gray-900">Recent Service Activity</h3>
              </div>
              <div className="p-8 space-y-6">
                {requests.length > 0 ? (
                  requests.map((act, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${act.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm">{act.type} {act.status}</h5>
                        <p className="text-xs text-gray-500 mt-1">{act.description}</p>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-2 block">
                          {new Date(act.requested_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-400 text-sm">No recent activity found.</p>
                  </div>
                )}
              </div>
            </div>

           {/* Security / Router Info */}
           <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400">
                    <ShieldCheck size={40} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-900">Network Security</h3>
                    <p className="text-gray-500">WPA3 encryption active on all devices.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-gray-600">Primary WiFi SSID</span>
                    <span className="font-bold text-gray-900">Airnetz_90_Home</span>
                 </div>
                 <div className="p-5 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <span className="font-medium text-gray-600">Connected Devices</span>
                    <span className="font-bold text-gray-900">12 Devices</span>
                 </div>
                 <button className="w-full py-4 text-primary-600 font-bold hover:underline">Manage WiFi Settings</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
