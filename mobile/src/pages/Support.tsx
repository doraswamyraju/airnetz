import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, HelpCircle, ChevronRight } from 'lucide-react';

const Support: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    customerId: '',
    issueType: 'slow_internet',
    description: ''
  });
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API
    console.log("Raising ticket", ticketData);
    setTicketStatus('success');
    setTimeout(() => setTicketStatus('idle'), 3000);
    setTicketData({ customerId: '', issueType: 'slow_internet', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How can we help you?</h1>
           <p className="text-gray-600">Our dedicated support team is available 24/7 to resolve your queries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Side */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                 <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
              <p className="text-gray-500 text-sm mb-3">Customer Care (24/7)</p>
              <p className="text-xl font-bold text-primary-700">+91 98765 43210</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange mb-4">
                 <Mail size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-500 text-sm mb-3">Support & Billing Queries</p>
              <p className="text-lg font-medium text-gray-900">support@airnetz.in</p>
            </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                 <MessageCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">WhatsApp Support</h3>
              <p className="text-gray-500 text-sm mb-3">Chat for Quick Help</p>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 font-bold hover:underline"
              >
                Start Chat <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Raise Ticket Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-brand-orange/10 rounded-xl mr-4">
                    <HelpCircle className="text-brand-orange" size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Raise a Service Request</h2>
                    <p className="text-gray-500 text-sm">We usually respond within 2 hours.</p>
                </div>
              </div>
              
              {ticketStatus === 'success' ? (
                 <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-center animate-fade-in">
                   <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                   Ticket raised successfully! Check your SMS for the Ticket ID.
                 </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Customer ID / Mobile</label>
                      <input 
                        type="text" 
                        required
                        value={ticketData.customerId}
                        onChange={(e) => setTicketData({...ticketData, customerId: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 98765xxxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Type</label>
                      <select 
                         value={ticketData.issueType}
                         onChange={(e) => setTicketData({...ticketData, issueType: e.target.value})}
                         className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="slow_internet">Slow Internet Speed</option>
                        <option value="no_connection">No Connectivity / Red Light</option>
                        <option value="billing">Billing / Payment Issue</option>
                        <option value="relocation">Shifting Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={ticketData.description}
                    onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Describe your issue briefly..."
                  ></textarea>
                </div>

                <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Submit Ticket
                    </button>
                </div>
              </form>
            </div>
            
            {/* FAQ Preview */}
            <div className="mt-12">
               <h3 className="text-xl font-bold mb-6 text-gray-900">Common Questions</h3>
               <div className="space-y-4">
                  <details className="group bg-white rounded-xl border border-gray-200 p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
                    <summary className="flex justify-between items-center font-semibold text-gray-900">
                      How do I change my Wi-Fi password?
                      <span className="transition-transform group-open:rotate-180 text-gray-400">
                        <ChevronRight />
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed group-open:animate-fade-in text-sm">
                       You can change it by logging into your router admin page (usually 192.168.1.1 or 192.168.0.1). If you need help, call our support.
                    </p>
                  </details>
                  <details className="group bg-white rounded-xl border border-gray-200 p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
                    <summary className="flex justify-between items-center font-semibold text-gray-900">
                      Is installation free?
                      <span className="transition-transform group-open:rotate-180 text-gray-400">
                         <ChevronRight />
                      </span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed group-open:animate-fade-in text-sm">
                       Yes, installation and the Wi-Fi router are free if you subscribe to any plan for 6 months or more.
                    </p>
                  </details>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;