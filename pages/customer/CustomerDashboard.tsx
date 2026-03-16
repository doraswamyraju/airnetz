import React from 'react';
import { 
  Wifi, CreditCard, Headphones, Package, 
  ChevronRight, ArrowRight, Zap, ShieldCheck 
} from 'lucide-react';
import ActivePlan from '../../components/customer/ActivePlan';

  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getCustomerProfile(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    if (user.id) loadData();
  }, [user.id]);

  if (loading) return <div className="p-8 text-center animate-pulse">Loading Portal...</div>;

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
            <ActivePlan 
              planName={profile?.plan_name || 'Broadband 100'} 
              speed={profile?.speed_mbps || 100}
              expiryDate="Next Month"
            />
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
                {[
                  { title: 'Payment Successful', date: 'March 10, 2026', desc: 'Monthly subscription for Turbo Plan.', type: 'payment' },
                  { title: 'Support Ticket Closed', date: 'Feb 15, 2026', desc: 'Resolved: Slow WiFi speeds in bedroom.', type: 'support' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${act.type === 'payment' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{act.title}</h5>
                      <p className="text-xs text-gray-500 mt-1">{act.desc}</p>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-2 block">{act.date}</span>
                    </div>
                  </div>
                ))}
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
