import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { MOCK_REQUESTS, ServiceRequest } from '../../services/mockData';

const AdminRequests: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = MOCK_REQUESTS.filter(req => {
    const matchesFilter = filter === 'All' || req.status === filter;
    const matchesSearch = 
      req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-gray-500 mt-1">Manage and track customer tickets</p>
        </div>
        <button className="bg-brand-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
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
                  {req.type} - {req.customerName}
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
    </div>
  );
};

export default AdminRequests;
