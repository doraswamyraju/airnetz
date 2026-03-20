import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

const Reports: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getAdminReports()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const totals = data?.totals || {};
    const monthlyRevenue: any[] = data?.monthlyRevenue || [];
    const agentPerformance: any[] = data?.agentPerformance || [];
    const requestsByType: any[] = data?.requestsByType || [];
    const maxRevenue = Math.max(...monthlyRevenue.map((m: any) => m.revenue || 0), 1);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-500 text-sm mt-1">Real-time overview of system performance</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Total Requests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{totals.totalRequests || 0}</p>
                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                        <BarChart3 size={12} /> All Time
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{totals.completed || 0}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                        <CheckCircle size={12} /> Resolved
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">In Progress</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{totals.inProgress || 0}</p>
                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                        <Clock size={12} /> Active
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">{totals.pending || 0}</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 mt-2">
                        <AlertCircle size={12} /> Awaiting
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart - Real Data */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
                        <DollarSign size={20} className="text-brand-orange" />
                        Revenue Trend (Last 6 Months)
                    </h2>
                    {monthlyRevenue.length > 0 ? (
                        <div className="h-52 flex items-end justify-between gap-2 px-2">
                            {monthlyRevenue.map((m: any, i: number) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                                    <span className="text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100">
                                        ₹{Number(m.revenue).toLocaleString()}
                                    </span>
                                    <div
                                        className="w-full bg-brand-orange/20 rounded-t hover:bg-brand-orange transition-colors"
                                        style={{ height: `${Math.max((m.revenue / maxRevenue) * 180, 4)}px` }}
                                    />
                                    <span className="text-[10px] text-gray-500 text-center">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
                            No payment data yet
                        </div>
                    )}
                </div>

                {/* Requests by Type */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
                        <BarChart3 size={20} className="text-brand-orange" />
                        Requests by Type
                    </h2>
                    {requestsByType.length > 0 ? (
                        <div className="space-y-3">
                            {requestsByType.map((r: any, i: number) => {
                                const total = requestsByType.reduce((s: number, x: any) => s + x.count, 0);
                                const pct = total > 0 ? Math.round((r.count / total) * 100) : 0;
                                const colors = ['bg-brand-orange', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
                                return (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-700 font-medium">{r.type}</span>
                                            <span className="text-gray-500">{r.count} ({pct}%)</span>
                                        </div>
                                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${colors[i % colors.length]} rounded-full`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-52 flex items-center justify-center text-gray-400 text-sm">
                            No request data yet
                        </div>
                    )}
                </div>
            </div>

            {/* Agent Performance Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                    <Users size={18} className="text-brand-orange" />
                    <h2 className="font-semibold text-gray-900">Agent Performance</h2>
                </div>
                {agentPerformance.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {agentPerformance.map((agent: any, i: number) => {
                            const rate = agent.totalAssigned > 0 ? Math.round((agent.completed / agent.totalAssigned) * 100) : 0;
                            return (
                                <div key={i} className="flex items-center justify-between px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-sm">
                                            {agent.name.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{agent.name}</p>
                                            <p className="text-xs text-gray-500">{agent.totalAssigned} assigned · {agent.completed} completed</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${rate}%` }} />
                                        </div>
                                        <span className={`text-sm font-bold ${rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {rate}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-400 text-sm">No agent data yet</div>
                )}
            </div>
        </div>
    );
};

export default Reports;
