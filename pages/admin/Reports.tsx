import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, Calendar } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <span className={`flex items - center text - sm font - medium ${isPositive ? 'text-green-600' : 'text-red-600'} `}>
                {isPositive ? <ArrowUpRight size={16} /> : <TrendingUp size={16} className="rotate-180" />}
                {change}
            </span>
        </div>
    </div>
);

const Reports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-500 text-sm mt-1">Detailed overview of system performance and growth</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Last 30 Days</span>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Revenue" value="₹1,24,500" change="12.5%" isPositive={true} />
                <StatCard title="New Customers" value="45" change="8.2%" isPositive={true} />
                <StatCard title="Service Requests" value="156" change="3.1%" isPositive={false} />
                <StatCard title="Avg. Resolution Time" value="2.4 hrs" change="15%" isPositive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart (Mock) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <DollarSign size={20} className="text-brand-orange" />
                            Revenue Growth
                        </h2>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-4 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-xs text-gray-400">
                            <div className="flex justify-between w-full border-t border-dashed border-gray-200 relative"><span className="-translate-y-1/2 bg-white pr-2">₹50k</span></div>
                            <div className="flex justify-between w-full border-t border-dashed border-gray-200 relative"><span className="-translate-y-1/2 bg-white pr-2">₹25k</span></div>
                            <div className="flex justify-between w-full border-t border-dashed border-gray-200 relative"><span className="-translate-y-1/2 bg-white pr-2">₹0</span></div>
                        </div>

                        {/* Bars */}
                        {[45, 60, 35, 75, 55, 85].map((height, i) => (
                            <div key={i} className="w-1/6 flex flex-col items-center gap-2 z-10 group cursor-pointer">
                                <div
                                    className="w-full max-w-[40px] bg-brand-orange/20 rounded-t-sm relative transition-all group-hover:bg-brand-orange"
                                    style={{ height: `${height}% ` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                        ₹{height * 1000}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Month {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requests by Type Chart (Mock) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <BarChart3 size={20} className="text-brand-orange" />
                            Requests Overview
                        </h2>
                    </div>
                    <div className="flex items-center justify-center h-64 relative">
                        <div className="w-48 h-48 rounded-full border-[16px] border-gray-100 relative">
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-b-brand-orange border-l-brand-orange border-t-blue-500 border-r-green-500 rotate-45"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-900">156</span>
                                <span className="text-sm text-gray-500">Total</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-brand-orange"></span> Broadband</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> DTH</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Other</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
