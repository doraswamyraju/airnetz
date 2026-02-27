import React from 'react';
import { MapPin, Navigation, Phone, Search, Filter } from 'lucide-react';

const MOCK_ACTIVE_AGENTS = [
    { id: 'AG-001', name: 'John Doe', status: 'En Route', destination: 'Tirupati North', ETA: '5 mins', top: '40%', left: '30%' },
    { id: 'AG-002', name: 'Sarah Smith', status: 'Working', destination: 'KT Road', ETA: '-', top: '60%', left: '55%' },
    { id: 'AG-004', name: 'Priya Reddy', status: 'En Route', destination: 'Chandragiri', ETA: '12 mins', top: '75%', left: '20%' },
];

const ActiveAgents: React.FC = () => {
    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Agent Tracking</h1>
                    <p className="text-gray-500 text-sm mt-1">Monitor real-time locations of active field agents</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search agent..."
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-gray-100 rounded-xl shadow-inner border border-gray-200 relative overflow-hidden flex">
                {/* Sidebar List */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-20 shadow-xl hidden md:flex">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900 flex items-center justify-between">
                            Active Agents
                            <span className="bg-green-100 text-green-700 py-0.5 px-2 rounded-full text-xs font-bold">3 Online</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {MOCK_ACTIVE_AGENTS.map((agent) => (
                            <div key={agent.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group border-l-4 border-transparent hover:border-brand-orange">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-semibold text-gray-900">{agent.name}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${agent.status === 'En Route' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {agent.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <MapPin size={12} /> <span className="truncate">{agent.destination}</span>
                                </div>
                                {agent.status === 'En Route' && (
                                    <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-gray-100">
                                        <span className="text-gray-500">ETA</span>
                                        <span className="font-semibold text-gray-900">{agent.ETA}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative">
                    <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>

                    {/* Agent Map Markers */}
                    {MOCK_ACTIVE_AGENTS.map((agent) => (
                        <div
                            key={agent.id}
                            className="absolute z-10 group cursor-pointer"
                            style={{ top: agent.top, left: agent.left, transform: 'translate(-50%, -50%)' }}
                        >
                            {agent.status === 'En Route' ? (
                                <div className="relative flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 absolute animate-ping"></div>
                                    <div className="w-8 h-8 bg-blue-500 border-2 border-white shadow-md rounded-full flex items-center justify-center text-white relative z-10">
                                        <Navigation size={14} className="rotate-45" />
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex items-center justify-center">
                                    <div className="w-8 h-8 bg-brand-orange border-2 border-white shadow-md rounded-full flex items-center justify-center text-white relative z-10">
                                        <MapPin size={14} />
                                    </div>
                                </div>
                            )}

                            {/* Tooltip */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-2 min-w-[120px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 text-center">
                                <p className="text-xs font-bold text-gray-900">{agent.name}</p>
                                <p className="text-[10px] text-gray-500">{agent.status}</p>
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-t border-l border-gray-100 rotate-45"></div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default ActiveAgents;
