import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { api } from '../../services/api';

const Customers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState<any[]>([]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPlanId, setNewPlanId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

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

    const fetchPlans = async () => {
        try {
            const p = await api.getPlans();
            setPlans(p);
        } catch (err) {
            console.error('Failed to fetch plans', err);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchPlans();
    }, []);

    const handleAddCustomer = async (e: React.FormEvent) => {
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
                plan_id: newPlanId ? parseInt(newPlanId) : null
            };
            const res = await api.createAdminCustomer(data);
            if (res.error) {
                 setError(res.error);
            } else if (res.success) {
                setSuccessMsg(res.message + (res.initialPassword ? ` Temp Password: ${res.initialPassword}` : ''));
                setNewName('');
                setNewEmail('');
                setNewPhone('');
                setNewAddress('');
                setNewPlanId('');
                fetchCustomers(); // Refresh list
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccessMsg('');
                }, 4000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to onboard customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCustomer = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer? This will also delete their associated user account.')) {
            try {
                await api.deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                console.error('Failed to delete customer', err);
                alert('Failed to delete customer');
            }
        }
    };

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
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-brand-orange text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-sm font-medium">
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

                {/* Mobile: Card view */}
                <div className="block lg:hidden divide-y divide-gray-100">
                    {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                        <div key={customer.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                                        {customer.customer_name.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{customer.customer_name}</p>
                                        <p className="text-xs text-gray-500">{customer.phone}</p>
                                        {customer.address && <p className="text-xs text-gray-400 mt-0.5">📍 {customer.address}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {customer.status}
                                    </span>
                                    <span className="text-xs text-gray-400">{customer.plan_name || 'No Plan'}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 pl-14">
                                <button 
                                  onClick={() => handleDeleteCustomer(customer.id)}
                                  className="flex-1 py-1.5 text-xs border border-red-200 rounded-lg text-red-600 hover:bg-red-50 flex items-center justify-center gap-1">
                                    <Trash2 size={13} /> Delete
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-gray-400">No customers found</div>
                    )}
                </div>

                {/* Desktop: Table view */}
                <div className="hidden lg:block overflow-x-auto">
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
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.status === 'active' ? 'bg-green-100 text-green-700' : customer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                  onClick={() => handleDeleteCustomer(customer.id)}
                                                  className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
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

            {/* Add Customer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden my-8">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Manual Customer Onboarding</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        placeholder="e.g. John Doe"
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
                                        placeholder="johndoe@example.com"
                                    />
                                </div>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Plan (Optional)</label>
                                    <select
                                        value={newPlanId}
                                        onChange={(e) => setNewPlanId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white"
                                    >
                                        <option value="">Select a Plan</option>
                                        {plans.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} (₹{p.price})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Installation Address</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={newAddress}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                                        placeholder="Full address for service installation"
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
                                    {isSubmitting ? 'Onboarding...' : 'Onboard Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
