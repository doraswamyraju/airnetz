import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { api } from '../../services/api';

const Customers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await api.getAdminCustomers();
                setCustomers(data);
            } catch (err) {
                console.error('Failed to fetch customers', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer => 
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.id.toString().includes(searchTerm)
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
                    <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all registered customers and their service history</p>
                </div>
                <button 
                  onClick={() => alert('Please use the Leads tab to onboard new customers from received inquiries.')}
                  className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
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
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-medium">Customer Details</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Location</th>
                                <th className="p-4 font-medium">Plan</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {customer.customer_name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{customer.customer_name}</p>
                                                    <p className="text-xs text-gray-500">CUS-{customer.id} • Joined {new Date(customer.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{customer.phone}</td>
                                        <td className="p-4 text-sm text-gray-600">{customer.address}</td>
                                        <td className="p-4 text-sm text-gray-900 font-medium">{customer.plan_name || 'No Plan'}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    customer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">No customers found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customers;
