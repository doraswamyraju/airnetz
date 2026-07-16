import React from 'react';
import { Shield, Lock, Eye, Mail, Phone, MapPin, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
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
                At Airnetz Broadband Services Pvt Ltd, we value your privacy and trust. Read below to understand how we collect, store, and manage your data.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm flex-shrink-0 self-start md:self-auto">
              <span className="text-xs text-slate-400 block mb-1">Last Updated</span>
              <span className="font-bold text-sm text-white">July 16, 2026</span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed font-sans">
          
          {/* Section 1: Information Ownership */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-primary-50 text-primary-600 rounded-lg"><Shield size={20} /></span>
              1. Information Ownership & Limited Rights
            </h2>
            <p>
              The user retains his/her ownership of the information uploaded by the user by accessing the Airnetz Broadband Services Pvt Ltd website and its services, except those rights which are needed to keep the services of Airnetz Broadband Services Pvt Ltd active and/or for hosting user files, sharing of information, technical administration, data backups, etc.
            </p>
            <p>
              By accepting these terms, the user gives permission to use such limited rights with regard to trusted third-party websites with whom Airnetz Broadband Services Pvt Ltd works to provide its services.
            </p>
          </section>

          {/* Section 2: Collection and Use */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-50 text-brand-orange rounded-lg"><Eye size={20} /></span>
              2. Collection, Storage, and Use of Information
            </h2>
            <p>
              Our privacy policy governs the collection, storage, and use of user information, which includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>User-uploaded content such as videos, audios, photos, documents, and other files.</li>
              <li>Account registration credentials and contact details (name, email address, phone number).</li>
              <li>Network usage telemetry and troubleshooting metrics.</li>
              <li>Coarse and fine location details (e.g. for verifying service feasibility, agent navigation, and local support dispatching).</li>
            </ul>
            <p>
              We may share content with law enforcement or government authorities when required for compliance with applicable laws and regulatory guidelines in India.
            </p>
          </section>

          {/* Section 3: Content Monitoring Policy */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20} /></span>
              3. Content Monitoring & Responsibility
            </h2>
            <p>
              Airnetz Broadband Services Pvt Ltd does not monitor the contents (including files, folders, photos, audios, and videos) shared by the user on the Airnetz Broadband Services Pvt Ltd website for their accuracy or legal compliance. Users must themselves ensure that they comply with all legal requirements and verify their data's accuracy.
            </p>
            <p className="bg-red-50/50 border border-red-100 rounded-2xl p-5 text-sm md:text-base text-gray-800">
              <strong>Content Moderation:</strong> Airnetz Broadband Services Pvt Ltd reserves the right to monitor any information and to remove any obscene, pornographic, or objectionable content of whatsoever nature at any time without any prior notice to the user. Airnetz Broadband Services Pvt Ltd takes no responsibility for any user activity related to their files, folders, and other information.
            </p>
          </section>

          {/* Section 4: Data Security & Transmission */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Lock size={20} /></span>
              4. Data Transmission Security
            </h2>
            <p>
              In order to protect data during transmission, the user must use an encrypted connection. Airnetz Broadband Services Pvt Ltd shall not be responsible for any loss of data during transmission. We implement secure servers and SSL/TLS encryption protocols to safeguard your account records and stored profiles.
            </p>
          </section>

          {/* Contact Details */}
          <section className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
            <p>If you have any questions, complaints, or feedback regarding our privacy practices, please contact us:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <MapPin className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Head Office</span>
                  <span className="text-gray-500">#42, Temple Road, Near Bus Stand, Tirupati, Andhra Pradesh - 517501</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Email Address</span>
                  <span className="text-gray-500">support@airnetz.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Phone className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Helpline</span>
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
