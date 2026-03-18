import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, MapPin, Calendar, X } from 'lucide-react';
import { api } from '../../services/api';

const AdminRequests: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newType, setNewType] = useState('Installation');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAgentId, setNewAgentId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reqData, agentData] = await Promise.all([
          api.getAdminRequests(),
          api.getAgents()
        ]);
        setRequests(reqData);
        setAgents(agentData.filter((a: any) => a.is_active !== 0)); // Only show active agents
      } catch (err) {
        console.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      const data = {
        name: newName,
        email: newEmail,
        phone: newPhone,
        address: newAddress,
        type: newType,
        priority: newPriority,
        agent_id: newAgentId ? parseInt(newAgentId) : null,
        description: newDescription
      };
      const res = await api.createAdminRequest(data);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setSuccessMsg(`Request ${res.requestId} created!` + (res.isNewUser ? ` Temp Password sent: ${res.initialPassword}` : ''));
        setNewName(''); setNewEmail(''); setNewPhone(''); setNewAddress(''); setNewDescription(''); setNewAgentId('');
        
        // Refresh list
        const reqData = await api.getAdminRequests();
        setRequests(reqData);

        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg('');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'All' || req.status === filter;
    const customerName = req.customer_name || 'Unknown';
    const matchesSearch = 
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <div className="p-12 text-center animate-pulse">Loading Requests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-gray-500 mt-1">Manage and track customer tickets</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          + New Request
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <Link 
            to={`/admin/requests/${req.id}`}
            key={req.id} 
            className="block bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {req.id}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    req.priority === 'High' ? 'bg-red-100 text-red-700' :
                    req.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {req.priority} Priority
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-orange transition-colors">
                  {req.type} - {req.customer_name || 'Guest'}
                </h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{req.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span className="truncate max-w-[200px]">{req.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {req.status}
                </span>
                <ChevronRight className="text-gray-300 group-hover:text-brand-orange" />
              </div>
            </div>
          </Link>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium">No requests found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Create New Service Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRequest} className="p-6 space-y-6">
              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
              {successMsg && <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">{successMsg}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Email for notification & login" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Contact number" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label><textarea required rows={2} value={newAddress} onChange={(e) => setNewAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Full address" /></div>
                </div>

                {/* Request Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Service Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                        <option>Installation</option>
                        <option>Repair</option>
                        <option>Maintenance</option>
                        <option>Upgrade</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Agent (Optional)</label>
                    <select value={newAgentId} onChange={(e) => setNewAgentId(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                      <option value="">Unassigned</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name} {agent.location ? `(${agent.location})` : ''}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">If assigned, status automatically becomes "In Progress".</p>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea required rows={3} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Problem details or service instructions" /></div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Creating...' : 'Create & Assign Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
