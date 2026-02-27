import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const MOCK_AGENTS = [
    { id: 'AG-001', name: 'John Doe', phone: '+91 9876543210', area: 'Tirupati North', status: 'Active', tasks: 3 },
    { id: 'AG-002', name: 'Sarah Smith', phone: '+91 8765432109', area: 'Tirupati South', status: 'Busy', tasks: 5 },
    { id: 'AG-003', name: 'Ravi Kumar', phone: '+91 7654321098', area: 'Renigunta', status: 'Offline', tasks: 0 },
    { id: 'AG-004', name: 'Priya Reddy', phone: '+91 6543210987', area: 'Chandragiri', status: 'Active', tasks: 1 },
];

const Agents: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Agents Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all service agents and their assignments</p>
                </div>
                <button className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    <span>Add New Agent</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search agents by name, ID or area..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange bg-white text-gray-600">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="busy">Busy</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-medium">Agent Details</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Service Area</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Active Tasks</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_AGENTS.map((agent) => (
                                <tr key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
                                                {agent.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{agent.name}</p>
                                                <p className="text-xs text-gray-500">{agent.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{agent.phone}</td>
                                    <td className="p-4 text-sm text-gray-600">{agent.area}</td>
                                    <td className="p-4">
                                        <span className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium ${agent.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            agent.status === 'Busy' ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-100 text-gray-700'
                                            } `}>
                                            <span className={`w - 1.5 h - 1.5 rounded - full mr - 1.5 ${agent.status === 'Active' ? 'bg-green-500' :
                                                agent.status === 'Busy' ? 'bg-orange-500' :
                                                    'bg-gray-500'
                                                } `}></span>
                                            {agent.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-gray-900">{agent.tasks}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing 4 of 4 agents</p>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 rounded bg-brand-orange text-white">1</button>
                        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agents;
