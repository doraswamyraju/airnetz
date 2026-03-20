import React from 'react';
import { TrendingUp, Wallet, Download, Clock } from 'lucide-react';

const Payments: React.FC = () => {
  const transactions = [
    { id: 1, type: 'Job Payout', customer: 'Ramesh G.', amount: '₹250', date: 'Today, 2:30 PM', status: 'Credited' },
    { id: 2, type: 'Incentive', customer: 'Weekly Target', amount: '₹1,000', date: 'Yesterday', status: 'Credited' },
    { id: 3, type: 'Job Payout', customer: 'Tech Solutions', amount: '₹450', date: 'Yesterday', status: 'Credited' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h1>
          <p className="text-gray-500 text-sm">Track your commissions and daily earnings</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all">
          <Download size={18} /> Export History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Wallet className="text-orange-400" size={24} />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</div>
              <div className="text-3xl font-bold mt-1">₹4,850.00</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs mb-6">Last payout: ₹3,200 on 10th March 2024</p>
          <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/30">
            Request Payout
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-500" size={20} /> Monthly Growth
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold text-gray-900">₹18,400</div>
                <div className="text-xs text-gray-400 font-bold uppercase">This Month</div>
              </div>
              <div className="text-green-500 text-sm font-bold">+12.5%</div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '70%' }}></div>
            </div>
            <p className="text-xs text-gray-500">You have completed 45/60 target jobs for this month.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-bold text-gray-900">{tx.type}</div>
                    <div className="text-xs text-gray-500">{tx.customer}</div>
                  </td>
                  <td className="px-8 py-5 font-bold text-green-600">{tx.amount}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{tx.date}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
