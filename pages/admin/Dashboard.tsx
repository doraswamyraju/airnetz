import React, { useState, useEffect } from 'react';
import { Users, UserCircle, CreditCard, ClipboardList, TrendingUp, Bell } from 'lucide-react';
import { api } from '../../services/api';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
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
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, requestsData] = await Promise.all([
          api.getStats(),
          api.getAdminRequests()
        ]);
        setStats(statsData);
        setRequests(requestsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={stats?.totalRequests || 0}
          icon={ClipboardList}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="Active Agents"
          value={stats?.activeAgents || 0}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={UserCircle}
          color="bg-purple-500"
          trend="+5%"
        />
        <StatCard
          title="Revenue (This Month)"
          value={`₹${(stats?.revenue || 0).toLocaleString()}`}
          icon={CreditCard}
          color="bg-orange-500"
          trend="+18%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Latest Service Requests</h2>
            <button className="text-sm text-brand-orange font-medium hover:text-brand-dark" onClick={() => window.location.hash = '#/admin/requests'}>View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {requests.length > 0 ? (
              requests.slice(0, 4).map((req) => (
                <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${req.priority === 'High' ? 'bg-red-500' :
                        req.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                    <div>
                      <p className="font-medium text-gray-900">{req.customer_name}</p>
                      <p className="text-sm text-gray-500">{req.type} • {req.id}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                    {req.status}
                  </span>
                </div>
              ))
            ) : (
                <div className="p-8 text-center text-gray-500">No requests found</div>
            )}
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
    </div>
  );
};

export default AdminDashboard;
