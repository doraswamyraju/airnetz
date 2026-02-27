import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const MOCK_CUSTOMERS = [
    { id: 'CUS-1001', name: 'Ramesh Naidu', phone: '+91 9123456780', area: 'Mangalam', service: 'Broadband Details', joined: '12 Jan 2026', status: 'Active' },
    { id: 'CUS-1002', name: 'Lakshmi Narayana', phone: '+91 8123456789', area: 'KT Road', service: 'DTH Repair', joined: '05 Feb 2026', status: 'Pending' },
    { id: 'CUS-1003', name: 'Venkata Subbaiah', phone: '+91 7123456789', area: 'Alipiri', service: 'New Broadband', joined: '15 Feb 2026', status: 'Active' },
    { id: 'CUS-1004', name: 'Srinivasa Rao', phone: '+91 6123456789', area: 'Bhavani Nagar', service: 'DTH Installation', joined: '20 Feb 2026', status: 'Inactive' },
];

const Customers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all registered customers and their service history</p>
                </div>
                <button className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    <span>Add New Customer</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search customers by name, ID or phone..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange bg-white text-gray-600">
                            <option value="all">All Services</option>
                            <option value="broadband">Broadband</option>
                            <option value="dth">DTH</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange bg-white text-gray-600">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-medium">Customer Details</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Location</th>
                                <th className="p-4 font-medium">Primary Service</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_CUSTOMERS.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{customer.name}</p>
                                                <p className="text-xs text-gray-500">{customer.id} • Joined {customer.joined}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{customer.phone}</td>
                                    <td className="p-4 text-sm text-gray-600">{customer.area}</td>
                                    <td className="p-4 text-sm text-gray-900 font-medium">{customer.service}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
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
                    <p>Showing 4 of 4 customers</p>
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

export default Customers;
