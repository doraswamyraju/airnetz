import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Search, Filter } from 'lucide-react';
import { api } from '../../services/api';

const ActiveAgents: React.FC = () => {
    const [agents, setAgents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchLiveAgents = async () => {
        try {
            const data = await api.getLiveAgents();
            setAgents(data);
        } catch (error) {
            console.error('Failed to load live agents', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveAgents();
        // Set up polling every 15 seconds to simulate "Live" tracking
        const interval = setInterval(fetchLiveAgents, 15000);
        return () => clearInterval(interval);
    }, []);

    // Use real GPS if available, else fall back to pseudo-random position for demo
    const getMapPosition = (agent: any) => {
        if (agent.lat && agent.lng) {
            // Normalize real GPS to percentage position within the map area
            // Tirupati area: lat ~13.6, lng ~79.4 — clamp to a reasonable range
            const clampedLat = Math.min(Math.max(agent.lat, 8), 22); // India lat range
            const clampedLng = Math.min(Math.max(agent.lng, 68), 98); // India lng range
            const top = `${100 - ((clampedLat - 8) / 14) * 80 + 5}%`;
            const left = `${((clampedLng - 68) / 30) * 80 + 5}%`;
            return { top, left };
        }
        // Fallback pseudo-random
        return {
            top: `${((agent.id * 37) % 70) + 15}%`,
            left: `${((agent.id * 43) % 75) + 10}%`
        };
    };

    const filteredAgents = agents.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (a.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            <span className="bg-green-100 text-green-700 py-0.5 px-2 rounded-full text-xs font-bold">{agents.length} Online</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {loading && <div className="p-4 text-center text-gray-500 text-sm">Loading map data...</div>}
                        {filteredAgents.map((agent) => (
                            <div key={agent.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group border-l-4 border-transparent hover:border-brand-orange">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-semibold text-gray-900">{agent.name}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${agent.status === 'Working' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {agent.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <MapPin size={12} /> <span className="truncate">{agent.destination}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Phone size={12} /> <span>{agent.phone || 'No phone'}</span>
                                </div>
                                {agent.status === 'Working' && agent.task && (
                                    <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-gray-100">
                                        <span className="text-gray-500">Current Task</span>
                                        <span className="font-semibold text-gray-900 truncate max-w-[120px]">{agent.task}</span>
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
                    {filteredAgents.map((agent) => {
                        const pos = getMapPosition(agent);
                        return (
                        <div
                            key={agent.id}
                            className="absolute z-10 group cursor-pointer"
                            style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                        >
                            {agent.status === 'Working' ? (
                                <div className="relative flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 absolute animate-ping"></div>
                                    <div className="w-8 h-8 bg-blue-500 border-2 border-white shadow-md rounded-full flex items-center justify-center text-white relative z-10">
                                        <Navigation size={14} className="rotate-45" />
                                    </div>
                                    {agent.lat && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white z-20" title="Real GPS" />}
                                </div>
                            ) : (
                                <div className="relative flex items-center justify-center">
                                    <div className="w-8 h-8 bg-brand-orange border-2 border-white shadow-md rounded-full flex items-center justify-center text-white relative z-10">
                                        <MapPin size={14} />
                                    </div>
                                    {agent.lat && <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white z-20" title="Real GPS" />}
                                </div>
                            )}

                            {/* Tooltip */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-2 min-w-[120px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 text-center">
                                <p className="text-xs font-bold text-gray-900">{agent.name}</p>
                                <p className="text-[10px] text-gray-500">{agent.status}</p>
                                {agent.lat && <p className="text-[10px] text-green-600 font-medium">📍 Real GPS</p>}
                                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-t border-l border-gray-100 rotate-45"></div>
                            </div>
                        </div>
                    )})}

                </div>
            </div>
        </div>
    );
};

export default ActiveAgents;
