import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Mail, Phone, MapPin, 
  Calendar, CheckCircle, XCircle, 
  ArrowRight, Filter, Search 
} from 'lucide-react';
import { api } from '../../services/api';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await api.getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleOnboard = async (lead: any) => {
    if (!window.confirm(`Create customer account for ${lead.name}?`)) return;
    
    setProcessingId(lead.id);
    try {
      const res = await fetch('/api/leads/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id })
      }).then(r => r.json());

      if (res.success) {
        alert(`Successfully onboarded ${lead.name}. Welcome email sent to ${lead.email}`);
        loadLeads();
      } else {
        alert(res.error || 'Onboarding failed');
      }
    } catch (err) {
      alert('Internal Server Error during onboarding');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connection Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Manage new service requests from public website</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search leads by name, email or phone..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Service Item</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Received</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center animate-pulse">Syncing leads...</td></tr>
              ) : filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{lead.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Mail size={12} /> {lead.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-gray-900">{lead.locality || 'Tirupati'}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} /> {lead.address.substring(0, 30)}...
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        lead.service_type === 'Broadband' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                      }`}>
                        {lead.service_type}
                      </span>
                      <p className="text-xs font-medium text-gray-600 mt-1">{lead.plan || 'Not Specified'}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {lead.status === 'Converted' ? (
                        <span className="text-green-600 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle size={14} /> ONBOARDED
                        </span>
                      ) : (
                        <button
                          onClick={() => handleOnboard(lead)}
                          disabled={processingId === lead.id}
                          className="bg-brand-orange text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-brand-dark transition-all disabled:opacity-50 ml-auto"
                        >
                          {processingId === lead.id ? 'Processing...' : (
                            <>Onboard <ArrowRight size={14} /></>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <UserPlus className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-gray-500 font-medium">No new leads found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsManager;
