import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, X, Mail, Power } from 'lucide-react';
import { api } from '../../services/api';

const Agents: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const fetchAgents = async () => {
        try {
            const data = await api.getAgents();
            setAgents(data);
        } catch (err) {
            console.error('Failed to fetch agents', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleAddAgent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setIsSubmitting(true);

        try {
            const res = await api.createAgent({ name: newName, email: newEmail, phone: newPhone, location: newLocation });
            if (res.error || res.message) {
                 setError(res.error || res.message);
            } else if (res.success) {
                setSuccessMsg(`Agent created successfully! Temp Password: ${res.defaultPassword}`);
                setNewName('');
                setNewEmail('');
                setNewPhone('');
                setNewLocation('');
                fetchAgents(); // Refresh list
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccessMsg('');
                }, 4000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create agent');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: number) => {
        try {
            await api.updateAgentStatus(id, !currentStatus);
            fetchAgents();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const handleResendPassword = async (id: number) => {
        if (window.confirm('Are you sure you want to reset and resend the password for this agent?')) {
            try {
                await api.resendAgentPassword(id);
                alert('Password reset successfully. Email sent to agent.');
            } catch (err) {
                console.error('Failed to resend password', err);
                alert('Failed to resend password. Check console.');
            }
        }
    };

    const handleDeleteAgent = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this agent? This cannot be undone.')) {
            try {
                await api.deleteAgent(id);
                fetchAgents();
            } catch (err) {
                console.error('Failed to delete agent', err);
            }
        }
    };

    const filteredAgents = agents.filter(agent => 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Agents Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all service agents and their assignments</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-brand-orange text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-sm font-medium">
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
                            placeholder="Search agents by name or email..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-medium">Agent Details</th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAgents.length > 0 ? (
                                filteredAgents.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
                                                    {agent.name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{agent.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {agent.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{agent.email}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${agent.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${agent.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {agent.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleResendPassword(agent.id)} title="Reset & Resend Password" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                                    <Mail size={16} />
                                                </button>
                                                <button onClick={() => handleToggleStatus(agent.id, agent.is_active)} title={agent.is_active ? "Deactivate" : "Activate"} className={`p-2 rounded-lg transition-colors ${agent.is_active ? 'hover:bg-orange-50 text-orange-500' : 'hover:bg-green-50 text-green-500'}`}>
                                                    <Power size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteAgent(agent.id)} title="Delete" className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-400">No agents found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Agent Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Add New Agent</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddAgent} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                            {successMsg && (
                                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">
                                    {successMsg}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                    placeholder="e.g. Rahul Sharma"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                    placeholder="agent@airnetz.com"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        placeholder="Mobile Number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        placeholder="Service Area"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Agent'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agents;
