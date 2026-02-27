import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ServiceType } from '../types';
import { CheckCircle, AlertCircle, ShieldCheck, Clock, Award, Calendar, ChevronRight } from 'lucide-react';

const BookConnection: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPlan = queryParams.get('plan') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    locality: '',
    serviceType: ServiceType.BROADBAND,
    plan: initialPlan,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Request Received!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Thank you for choosing Airnetz. Our representative will call you at <strong className="text-gray-900">{formData.phone}</strong> within 24 hours to schedule the installation.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-gray-500">
             Order Reference: <span className="font-mono font-bold text-gray-900">#{Math.floor(Math.random() * 100000)}</span>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Trust & Info */}
        <div className="lg:col-span-1 space-y-6">
           {/* Timeline Card */}
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">What happens next?</h3>
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                 <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 border-2 border-white shadow-md"></span>
                    <h4 className="font-bold text-sm text-gray-900">Request Submitted</h4>
                    <p className="text-xs text-gray-500 mt-1">We receive your details instantly.</p>
                 </div>
                 <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></span>
                    <h4 className="font-bold text-sm text-gray-500">Verification Call</h4>
                    <p className="text-xs text-gray-400 mt-1">We confirm your plan & address.</p>
                 </div>
                 <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></span>
                    <h4 className="font-bold text-sm text-gray-500">Installation</h4>
                    <p className="text-xs text-gray-400 mt-1">Engineer sets up fiber & router.</p>
                 </div>
              </div>
           </div>

           <div className="bg-primary-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-display font-bold mb-4">Why Airnetz?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ShieldCheck className="mr-3 text-primary-200 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Secure & Reliable</h4>
                      <p className="text-primary-100 text-xs">AES encrypted network.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="mr-3 text-primary-200 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Quick Installation</h4>
                      <p className="text-primary-100 text-xs">Connected within 24 hours.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Award className="mr-3 text-primary-200 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Best Support</h4>
                      <p className="text-primary-100 text-xs">Rated #1 ISP in Tirupati.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
           </div>

           <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center text-brand-orange mb-3">
                 <AlertCircle className="mr-2" size={20} />
                 <span className="font-bold">Limited Time Offer</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get <strong>Free Installation</strong> and a <strong>Dual-Band Router</strong> worth ₹2500 when you book any plan for 6 months or more.
              </p>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="px-8 py-8 border-b border-gray-100 bg-gray-50/50">
              <h1 className="text-3xl font-display font-bold text-gray-900">Get a New Connection</h1>
              <p className="text-gray-500 mt-2">Fill in your details and we'll do the rest.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="locality" className="block text-sm font-semibold text-gray-700 mb-2">Locality / Area</label>
                <select
                  id="locality"
                  name="locality"
                  required
                  value={formData.locality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select your area in Tirupati</option>
                  <option value="alipiri">Alipiri / RUIA</option>
                  <option value="kt_road">KT Road</option>
                  <option value="mr_palli">MR Palli</option>
                  <option value="air_bypass">AIR Bypass Road</option>
                  <option value="renigunta">Renigunta Road</option>
                  <option value="tiruchanur">Tiruchanur</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
                  placeholder="House No, Street Name, Landmark..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    {Object.values(ServiceType).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                 <div>
                  <label htmlFor="plan" className="block text-sm font-semibold text-gray-700 mb-2">Interested Plan</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">I'll decide later</option>
                    <option value="starter">Starter (40 Mbps)</option>
                    <option value="streamer">Streamer (100 Mbps)</option>
                    <option value="gamer">Gamer (300 Mbps)</option>
                    <option value="value_prime">DTH Value Prime</option>
                    <option value="mega_hd">DTH Mega HD</option>
                    <option value="entertainment_max">DTH Entertainment Max</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 px-6 bg-gradient-to-r from-brand-orange to-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 disabled:opacity-70 flex justify-center items-center text-lg"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Book Connection <ChevronRight className="ml-2" size={20} /></>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">By clicking Book Now, you agree to our Terms of Service. Your data is secure.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConnection;