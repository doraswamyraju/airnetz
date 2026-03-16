import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Download, ExternalLink, 
  ArrowUpRight, ShieldCheck, Zap
} from 'lucide-react';
import { api } from '../../services/api';

const CustomerBilling: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await api.getCustomerProfile(user.id);
        if (profile?.id) {
          const data = await api.getCustomerPayments(profile.id);
          setPayments(data);
        }
      } catch (err) {
        console.error('Failed to load billing');
      } finally {
        setLoading(false);
      }
    };
    if (user.id) loadData();
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-500">Manage your subscriptions and view transaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                 <h3 className="text-xl font-bold text-gray-900">Payment History</h3>
                 <button className="text-sm font-bold text-primary-600 hover:underline">Download All</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method</th>
                          <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-5"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {loading ? (
                          <tr><td colSpan={6} className="px-8 py-10 text-center animate-pulse">Syncing transactions...</td></tr>
                       ) : payments.length > 0 ? (
                         payments.map((p) => (
                           <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-8 py-6">
                                 <span className="font-mono text-sm text-gray-400 font-medium lowercase">#{p.id.toString().padStart(6, '0')}</span>
                              </td>
                              <td className="px-8 py-6">
                                 <p className="font-bold text-gray-900 text-sm">{new Date(p.payment_date).toLocaleDateString()}</p>
                              </td>
                              <td className="px-8 py-6">
                                 <p className="font-bold text-gray-900">₹{p.amount}</p>
                              </td>
                              <td className="px-8 py-6 lowercase">
                                 <span className="text-sm font-medium text-gray-500">{p.payment_method}</span>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                   p.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                 }`}>
                                    {p.status}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <button className="p-2 text-gray-300 hover:text-primary-600 transition-colors">
                                    <Download size={18} />
                                 </button>
                              </td>
                           </tr>
                         ))
                       ) : (
                         <tr><td colSpan={6} className="px-8 py-10 text-center text-gray-400">No payment history found</td></tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-6">
            <div className="bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
               <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Next Payment Due</p>
               <h3 className="text-4xl font-extrabold mb-6">₹699.00</h3>
               <button className="w-full py-4 bg-white text-primary-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                  Pay Now <ArrowUpRight size={20} />
               </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Plan</p>
                    <p className="font-bold text-gray-900">Broadband 100 Mbps</p>
                  </div>
               </div>
               <button className="w-full flex items-center justify-between text-sm font-bold text-gray-400 hover:text-primary-600 transition-colors">
                  Manage Subscription <ExternalLink size={16} />
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBilling;
