import React from 'react';
import { Search, Phone, MapPin, ExternalLink } from 'lucide-react';

const Customers: React.FC = () => {
  const customers = [
    { id: 1, name: 'Ramesh Gupta', plan: 'Turbo 100', address: 'Bhavani Nagar, Tirupati', lastService: '2 days ago', status: 'Active' },
    { id: 2, name: 'Anjali Sharma', plan: 'Fiber 50', address: 'KT Road, Tirupati', lastService: '1 week ago', status: 'Active' },
    { id: 3, name: 'Hotel Bliss', plan: 'Enterprise 500', address: 'Near Bus Stand', lastService: 'Yesterday', status: 'Issue Reported' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Customers</h1>
          <p className="text-gray-500 text-sm">Customers in your assigned territory</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                customer.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {customer.status}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{customer.name}</h3>
            <p className="text-orange-600 text-xs font-bold mb-4">{customer.plan}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <MapPin size={14} />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs text-blue-600 font-bold">
                <Phone size={14} />
                <span>Call Customer</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all">
              View History <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
