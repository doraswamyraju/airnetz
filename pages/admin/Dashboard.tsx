import React from 'react';
import { Users, UserCircle, CreditCard, ClipboardList, CheckCircle, Clock, TrendingUp, Bell } from 'lucide-react';
import { MOCK_REQUESTS } from '../../services/mockData';

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
  const pendingCount = MOCK_REQUESTS.filter(r => r.status === 'Pending').length;
  const progressCount = MOCK_REQUESTS.filter(r => r.status === 'In Progress').length;
  const completedCount = MOCK_REQUESTS.filter(r => r.status === 'Completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of service performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={MOCK_REQUESTS.length}
          icon={ClipboardList}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="Active Agents"
          value="24"
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Total Customers"
          value="1,245"
          icon={UserCircle}
          color="bg-purple-500"
          trend="+5%"
        />
        <StatCard
          title="Revenue (This Month)"
          value="₹45,200"
          icon={CreditCard}
          color="bg-orange-500"
          trend="+18%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Latest Service Requests</h2>
            <button className="text-sm text-brand-orange font-medium hover:text-brand-dark">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_REQUESTS.slice(0, 4).map((req) => (
              <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${req.priority === 'High' ? 'bg-red-500' :
                      req.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                  <div>
                    <p className="font-medium text-gray-900">{req.customerName}</p>
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
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Activity Feed</h2>
          </div>
          <div className="p-6 space-y-6">
            {[
              { time: '10 mins ago', desc: 'Agent John started task REQ-001' },
              { time: '1 hour ago', desc: 'New customer "Acme Corp" registered' },
              { time: '2 hours ago', desc: 'Payment of ₹1,500 received' },
              { time: '3 hours ago', desc: 'Agent Sarah marked REQ-002 as completed' }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 bg-blue-100 p-1.5 rounded-full text-blue-600 h-fit">
                  <Bell size={14} />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{activity.desc}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
