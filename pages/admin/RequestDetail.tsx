import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Calendar, User, AlertCircle, CheckCircle, Clock, Navigation } from 'lucide-react';
import { getRequestById, updateRequestStatus, ServiceRequest } from '../../services/mockData';

const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getRequestById(id).then(data => {
        setRequest(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleStatusChange = async (newStatus: ServiceRequest['status']) => {
    if (request) {
      const updated = await updateRequestStatus(request.id, newStatus);
      setRequest({ ...updated });
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  if (!request) return <div className="p-8 text-center text-gray-500">Request not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/admin/requests')}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Requests
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm text-gray-500 font-medium">#{request.id}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${request.priority === 'High' ? 'bg-red-100 text-red-700' :
                    request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                  {request.priority}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{request.type} Request</h1>
              <p className="text-gray-500 mt-1">Created on {request.date}</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={request.status}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className={`pl-3 pr-8 py-2 rounded-lg text-sm font-semibold appearance-none cursor-pointer border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ${request.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-800 focus:ring-yellow-500' :
                    request.status === 'In Progress' ? 'bg-blue-50 border-blue-200 text-blue-800 focus:ring-blue-500' :
                      'bg-green-50 border-green-200 text-green-800 focus:ring-green-500'
                  }`}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Customer Info */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Customer Details</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="font-medium text-gray-900">{request.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a href={`tel:${request.phone}`} className="font-medium text-brand-orange hover:underline">
                    {request.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="font-medium text-gray-900">{request.address}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Issue Description */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
              {request.description}
            </div>
          </section>

          {/* Technician Assignment */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Technician</h3>
            {request.technician ? (
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold">
                  {request.technician.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{request.technician}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle size={12} /> Assigned
                  </p>
                </div>
                <button className="ml-auto text-sm text-gray-500 hover:text-brand-orange">Change</button>
              </div>
            ) : (
              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-colors flex items-center justify-center gap-2 font-medium">
                <User size={20} />
                Assign Technician
              </button>
            )}
          </section>

          {/* Agent Tracking (Visible if assigned) */}
          {request.technician && (
            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Live Tracking</h3>
                <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Agent is 5 mins away
                </span>
              </div>
              <div className="bg-gray-100 w-full h-48 rounded-xl shadow-inner border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-brand-orange shadow-[0_0_0_4px_rgba(249,115,22,0.2)] rounded-full z-10"></div>
                <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md z-10 flex items-center justify-center">
                  <div className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Destination
                  </div>
                </div>
                <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 25 50 Q 50 30 75 50" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" />
                </svg>

                <div className="z-20 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2 pointer-events-none">
                  <div className="bg-brand-orange/10 p-1.5 rounded-full text-brand-orange">
                    <Navigation size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-900">En route to location</p>
                    <p className="text-[10px] text-gray-500">Speed: 45 km/h</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
