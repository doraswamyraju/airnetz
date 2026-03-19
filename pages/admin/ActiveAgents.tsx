import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Search, Filter, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Agents
const createAgentIcon = (status: string, hasGps: boolean) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div class="relative flex items-center justify-center">
                ${status === 'Working' ? '<div class="w-8 h-8 rounded-full bg-blue-500/20 absolute animate-ping"></div>' : ''}
                <div class="w-10 h-10 ${status === 'Working' ? 'bg-blue-600' : 'bg-orange-500'} border-2 border-white shadow-lg rounded-full flex items-center justify-center text-white relative z-10 transition-transform hover:scale-110">
                    ${status === 'Working' ? 
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-45"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>' : 
                        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
                    }
                </div>
                ${hasGps ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white z-20 shadow-sm"></span>' : ''}
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
};

// Component to handle map center updates and fix size issues
const MapController = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    
    useEffect(() => {
        // Fix for Leaflet partial loading (common in React)
        setTimeout(() => {
            map.invalidateSize();
        }, 500);
    }, [map]);

    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
};

const ActiveAgents: React.FC = () => {
    const [agents, setAgents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedAgent, setSelectedAgent] = useState<any>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([13.6288, 79.4192]); // Tirupati

    const fetchLiveAgents = async () => {
        try {
            const data = await api.getLiveAgents();
            // Ensure data has reasonable lat/lng if missing (for demo purposes if GPS not active)
            const processedData = data.map((a: any) => {
                if (!a.lat || !a.lng) {
                    // Spread pseudo-randomly around central Tirupati if no real GPS
                    return {
                        ...a,
                        lat: 13.6288 + (Math.sin(a.id) * 0.02),
                        lng: 79.4192 + (Math.cos(a.id) * 0.02),
                        isSimulated: true
                    };
                }
                return a;
            });
            setAgents(processedData);
        } catch (error) {
            console.error('Failed to load live agents', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveAgents();
        const interval = setInterval(fetchLiveAgents, 15000);
        return () => clearInterval(interval);
    }, []);

    const filteredAgents = agents.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (a.destination || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAgentClick = (agent: any) => {
        setSelectedAgent(agent);
        setMapCenter([agent.lat, agent.lng]);
    };

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-120px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Live Agent Tracking</h1>
                    <p className="text-gray-500 text-sm mt-1">Real-time geographic monitoring of active field agents</p>
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

            <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 relative overflow-hidden flex">
                {/* Sidebar List */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-[1000] shadow-xl hidden md:flex">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900 flex items-center justify-between">
                            Active Agents
                            <span className="bg-green-100 text-green-700 py-0.5 px-2 rounded-full text-xs font-bold">{agents.length} Online</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {loading && <div className="p-4 text-center text-gray-500 text-sm">Loading map data...</div>}
                        {filteredAgents.map((agent) => (
                            <div 
                                key={agent.id} 
                                onClick={() => handleAgentClick(agent)}
                                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors group border-l-4 ${selectedAgent?.id === agent.id ? 'border-brand-orange bg-orange-50/30' : 'border-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-semibold text-gray-900">{agent.name}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${agent.status === 'Working' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                        {agent.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <MapPin size={12} /> <span className="truncate">{agent.destination}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Phone size={12} /> <span>{agent.phone || 'No phone'}</span>
                                </div>
                                {agent.isSimulated && (
                                    <p className="text-[10px] text-gray-400 italic mt-1">Simulated position (No real GPS yet)</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative z-10">
                    <MapContainer 
                        center={mapCenter} 
                        zoom={13} 
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapController center={mapCenter} />
                        
                        {filteredAgents.map((agent) => (
                            <Marker 
                                key={agent.id} 
                                position={[agent.lat, agent.lng]}
                                icon={createAgentIcon(agent.status, !agent.isSimulated)}
                            >
                                <Popup>
                                    <div className="min-w-[150px]">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm font-bold text-gray-900 m-0">{agent.name}</p>
                                            <span className={`text-[10px] uppercase font-bold px-1 rounded-sm ${agent.status === 'Working' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {agent.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 m-0 flex items-center gap-1">
                                            <MapPin size={10} /> {agent.destination}
                                        </p>
                                        <p className="text-xs text-gray-600 m-0 flex items-center gap-1 mt-1">
                                            <Phone size={10} /> {agent.phone || 'N/A'}
                                        </p>
                                        {agent.last_seen && (
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                Last seen: {new Date(agent.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        )}
                                        {!agent.isSimulated ? (
                                            <p className="text-[10px] text-green-600 font-bold mt-2 flex items-center gap-1">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                Live GPS Telemetry
                                            </p>
                                        ) : (
                                            <p className="text-[10px] text-gray-400 italic mt-2">Station Reference</p>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ActiveAgents;
