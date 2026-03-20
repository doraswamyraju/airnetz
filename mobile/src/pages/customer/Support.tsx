import React, { useState, useEffect } from 'react';
import { 
  Plus, MessageSquare, Clock, CheckCircle, 
  AlertCircle, Shield, ArrowRight, X
} from 'lucide-react';
import { api } from '../../services/api';

const CustomerSupport: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    type: 'Repair',
    description: '',
    phone: ''
  });
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const loadRequests = async () => {
    try {
      const profile = await api.getCustomerProfile(user.id);
      if (profile?.id) {
        const data = await api.getCustomerRequests(profile.id);
        setRequests(data);
      }
    } catch (err) {
      console.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) loadRequests();
  }, [user.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profile = await api.getCustomerProfile(user.id);
      await api.createRequest({
        customer_id: profile.id,
        type: newTicket.type,
        description: newTicket.description,
        address: profile.address,
        phone: newTicket.phone || profile.phone
      });
      setShowModal(false);
      loadRequests();
    } catch (err) {
      alert('Failed to create ticket');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-500">Need help? Raise a ticket or track your requests.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
        >
          <Plus size={20} /> New Support Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Your Recent Tickets</h3>
          {loading ? (
            <div className="p-12 text-center animate-pulse">Syncing tickets...</div>
          ) : requests.length > 0 ? (
            requests.map((req) => (
              <div key={req.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between group">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    req.status === 'Completed' ? 'bg-green-50 text-green-600' : 
                    req.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                    'bg-yellow-50 text-yellow-600'
                  }`}>
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-gray-400">#{req.id}</span>
                      <span className="font-bold text-gray-900">{req.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{req.description}</p>
                    <div className="flex gap-4 text-xs font-bold text-gray-400 lowercase">
                       <span className="flex items-center gap-1"><Clock size={12} /> {new Date(req.requested_date).toLocaleDateString()}</span>
                       <span className="flex items-center gap-1 uppercase tracking-wider text-primary-600">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                         {req.status}
                       </span>
                    </div>
                  </div>
                </div>
                <button className="p-3 text-gray-300 hover:text-primary-600 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 text-center rounded-[2.5rem] border border-gray-100 border-dashed">
              <Shield className="mx-auto text-gray-300 mb-4" size={48} />
              <h4 className="text-gray-900 font-bold mb-1">No active tickets</h4>
              <p className="text-gray-500 text-sm">Everything looks good with your connection.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-xl font-bold mb-4">Quick Support</h4>
              <p className="text-slate-400 text-sm mb-6">Our average response time today is 15 minutes.</p>
              <div className="space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">WhatsApp Help</p>
                    <p className="font-bold">+91 91234 56789</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Technical Support</p>
                    <p className="font-bold">support@airnetz.com</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Raise Support Ticket</h2>
              <p className="text-gray-500 mb-8">Our technicians will be assigned within 30 minutes.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Issue Category</label>
                    <select 
                      value={newTicket.type}
                      onChange={(e) => setNewTicket({...newTicket, type: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-medium"
                    >
                      <option>Repair</option>
                      <option>Installation</option>
                      <option>Upgrade</option>
                      <option>Relocation</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                    <textarea 
                      required
                      placeholder="Tell us what's wrong (e.g. Red light blinking on router)"
                      rows={4}
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-medium resize-none"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Contact Number</label>
                    <input 
                      type="tel"
                      placeholder="Technician will call this number"
                      value={newTicket.phone}
                      onChange={(e) => setNewTicket({...newTicket, phone: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 font-medium"
                    />
                 </div>
                 <button className="w-full py-5 bg-primary-600 text-white rounded-[2rem] font-bold text-lg hover:bg-primary-700 transition-all">
                    Submit Request
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;
