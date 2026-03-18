import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Download, Filter } from 'lucide-react';
import { api } from '../../services/api';

const StatCard = ({ title, amount, subtext, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{amount}</h3>
                <p className="text-xs text-gray-400 mt-1">{subtext}</p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
    </div>
);

const Payments: React.FC = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalRevenue: '₹0', pendingAmount: '₹0', totalCommissions: '₹0' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.getAdminPayments();
                setPayments(data.transactions);
                setStats(data.stats);
            } catch (err) {
                console.error("Failed to load payments", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-12 text-center text-gray-500 animate-pulse">Loading Payments...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments & Commissions</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage transactions and agent payouts</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Revenue" amount={stats.totalRevenue} subtext="Successfully collected" icon={CreditCard} color="bg-blue-500" />
                <StatCard title="Pending Payments" amount={stats.pendingAmount} subtext="Awaiting collection" icon={DollarSign} color="bg-orange-500" />
                <StatCard title="Agent Commissions" amount={stats.totalCommissions} subtext="Total commissions generated" icon={ArrowUpRight} color="bg-green-500" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-medium">Transaction ID</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Agent</th>
                                <th className="p-4 font-medium">Commission</th>
                                <th className="p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.length > 0 ? payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-sm font-medium text-gray-900">{payment.id}</td>
                                    <td className="p-4 text-sm text-gray-500">{payment.date}</td>
                                    <td className="p-4 text-sm text-gray-900">{payment.customer}</td>
                                    <td className="p-4 text-sm font-medium text-gray-900">{payment.amount}</td>
                                    <td className="p-4 text-sm text-gray-600">{payment.agent}</td>
                                    <td className="p-4 text-sm font-medium text-green-600">{payment.commission}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">No payment records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments;
