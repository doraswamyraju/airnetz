import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCircle, CreditCard, ClipboardList, TrendingUp, Bell, X } from 'lucide-react';
import { api } from '../../services/api';

const StatCard = ({ title, value, icon: Icon, color, trend, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200' : ''}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <TrendingUp size={16} className="text-green-500 mr-1" />
        <span className="text-green-600 font-medium">{trend}</span>
        <span className="text-gray-400 ml-1">vs last month</span>
      </div>
    )}
    {onClick && <p className="mt-3 text-xs text-brand-orange font-medium">View Details →</p>}
  </div>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Assignment Modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, requestsData, agentsData] = await Promise.all([
          api.getStats(),
          api.getAdminRequests(),
          api.getAgents()
        ]);
        setStats(statsData);
        setRequests(requestsData);
        setAgents(agentsData.filter((a: any) => a.is_active));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequestId || !selectedAgentId) return;

    setIsAssigning(true);
    try {
      await api.assignTechnician(selectedRequestId, parseInt(selectedAgentId));
      
      // Refresh requests to show updated status
      const updatedReqs = await api.getAdminRequests();
      setRequests(updatedReqs);
      
      setIsAssignModalOpen(false);
      setSelectedRequestId(null);
      setSelectedAgentId('');
    } catch (err) {
      console.error('Failed to assign agent', err);
      alert('Failed to assign agent');
    } finally {
      setIsAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of service performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={stats?.totalRequests || 0}
          icon={ClipboardList}
          color="bg-blue-500"
          trend="+12%"
          onClick={() => navigate('/admin/requests')}
        />
        <StatCard
          title="Active Agents"
          value={stats?.activeAgents || 0}
          icon={Users}
          color="bg-green-500"
          onClick={() => navigate('/admin/agents')}
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={UserCircle}
          color="bg-purple-500"
          trend="+5%"
          onClick={() => navigate('/admin/customers')}
        />
        <StatCard
          title="Revenue (This Month)"
          value={`₹${(stats?.revenue || 0).toLocaleString()}`}
          icon={CreditCard}
          color="bg-orange-500"
          trend="+18%"
          onClick={() => navigate('/admin/payments')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Latest Service Requests</h2>
            <button className="text-sm text-brand-orange font-medium hover:text-brand-dark" onClick={() => window.location.hash = '#/admin/requests'}>View All</button>
          </div>
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="min-w-[600px] lg:min-w-0 divide-y divide-gray-100">
              {requests.length > 0 ? (
                requests.slice(0, 4).map((req) => (
                  <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between whitespace-nowrap lg:whitespace-normal">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${req.priority === 'High' ? 'bg-red-500' :
                          req.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                      <div>
                        <p className="font-medium text-gray-900">{req.customer_name}</p>
                        <p className="text-sm text-gray-500">{req.type} • {req.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                        {req.status}
                      </span>
                      {req.status === 'Pending' && (
                        <button 
                          onClick={() => {
                            setSelectedRequestId(req.id);
                            setIsAssignModalOpen(true);
                          }}
                          className="text-xs bg-brand-orange text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium flex-shrink-0">
                          Assign Agent
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                  <div className="p-8 text-center text-gray-400">No recent requests</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Activity Feed</h2>
          </div>
          <div className="p-6 space-y-6">
            {requests.length > 0 ? (
              requests.slice(0, 4).map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600 h-fit">
                    <Bell size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">
                        {activity.status === 'Pending' ? `New ${activity.type} request from ${activity.customer_name}` : 
                         activity.status === 'In Progress' ? `${activity.agent_name || 'An agent'} started ${activity.id}` :
                         `${activity.id} was marked as ${activity.status}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(activity.requested_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
                <div className="text-center py-4 text-gray-400 text-sm">No recent activity</div>
            )}
          </div>
        </div>
      </div>

      {/* Assignment Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-900">Assign Request {selectedRequestId}</h2>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAssignSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Active Agent</label>
                <select 
                  required
                  value={selectedAgentId} 
                  onChange={(e) => setSelectedAgentId(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-brand-orange"
                >
                  <option value="">-- Choose Agent --</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name} {agent.location ? `(${agent.location})` : ''}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex gap-2">
                <button type="button" onClick={() => setIsAssignModalOpen(false)} className="flex-1 px-3 py-2 border text-gray-600 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" disabled={isAssigning} className="flex-1 px-3 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 font-medium disabled:opacity-50">
                  {isAssigning ? 'Assigning...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
