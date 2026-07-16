import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-6 -mr-6 w-48 h-48 bg-brand-orange opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute left-1/3 bottom-0 -mb-10 w-72 h-72 bg-primary-500 opacity-10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-brand-orange mb-4 backdrop-blur-sm">
                <Shield size={12} /> Privacy Protection
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
              <p className="text-slate-300 text-sm md:text-base max-w-xl">
                At Airnetz, we value your trust and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm flex-shrink-0 self-start md:self-auto">
              <span className="text-xs text-slate-400 block mb-1">Last Updated</span>
              <span className="font-bold text-sm text-white">July 16, 2026</span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-primary-50 text-primary-600 rounded-lg"><Eye size={20} /></span>
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to our subscribers and app users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, physical address, and Customer ID.</li>
              <li><strong>Account Credentials:</strong> Username, password, and security preferences.</li>
              <li><strong>Network Data:</strong> IP addresses, network status, bandwidth usage, and router connectivity logs to troubleshoot broadband issues.</li>
              <li><strong>Location Data:</strong> Coarse and fine location coordinates (specifically for our field agents to assign and navigate service/installation requests, and for users to check service coverage areas).</li>
              <li><strong>Device Info:</strong> Hardware model, operating system, and unique device identifiers when accessing our mobile application.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-50 text-brand-orange rounded-lg"><Lock size={20} /></span>
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>To provision, maintain, and upgrade your Fiber Broadband, DTH, and OTT services.</li>
              <li>To process bill payments, generate invoices, and notify you about plan renewals.</li>
              <li>To facilitate installation and on-site support by routing our field agents to your location.</li>
              <li>To answer support queries, track support tickets, and resolve service outages.</li>
              <li>To comply with legal obligations, licensing requirements, and telecom regulatory authorities (TRAI and Department of Telecommunications, India).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></span>
              3. Data Sharing & Security
            </h2>
            <p>
              We do not sell your personal data. We only share information with third-party service providers (like payment gateways, SMS route providers, and local operations partners) under strict confidentiality agreements.
            </p>
            <p>
              To protect your data, we employ industry-standard physical, electronic, and procedural security measures. This includes SSL/TLS encryption for all data in transit (such as passwords and payment details) and firewalled database systems.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Shield size={20} /></span>
              4. Data Retention & Deletion
            </h2>
            <p>
              We retain your personal information as long as your subscription is active, or as required by regulatory compliance. You have the right to request deletion of your account or correction of inaccurate information by contacting our support team.
            </p>
          </section>

          {/* Section 5 - Contact Info */}
          <section className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
            <p>If you have any questions or concerns regarding our privacy practices, please reach out to us:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <MapPin className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Office Address</span>
                  <span className="text-gray-500">#42, Temple Road, Near Bus Stand, Tirupati, AP - 517501</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Email Support</span>
                  <span className="text-gray-500">support@airnetz.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Phone className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Phone Support</span>
                  <span className="text-gray-500">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
