import React from 'react';
import { FileText, ShieldAlert, CheckCircle, Scale, Mail, Phone, MapPin } from 'lucide-react';

const TermsOfUse: React.FC = () => {
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
                <Scale size={12} /> Terms & Regulations
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Terms of Use</h1>
              <p className="text-slate-300 text-sm md:text-base max-w-xl">
                These terms govern your subscription and use of Airnetz Broadband, DTH, and mobile applications. By accessing our services, you agree to these terms.
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
              <span className="p-2 bg-primary-50 text-primary-600 rounded-lg"><FileText size={20} /></span>
              1. Acceptance of Terms
            </h2>
            <p>
              By subscribing to Airnetz services, accessing the customer portal, or using the Airnetz mobile application, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our services or application.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-50 text-brand-orange rounded-lg"><CheckCircle size={20} /></span>
              2. Account Registration & KYC Verification
            </h2>
            <p>
              In compliance with Department of Telecommunications (DoT) and TRAI guidelines in India, all subscribers must fulfill Know-Your-Customer (KYC) requirements. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>Provide accurate, current, and complete proof of identity and proof of address.</li>
              <li>Maintain the confidentiality of your account password and login credentials.</li>
              <li>Promptly notify Airnetz of any unauthorized use or security breach of your account.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-red-50 text-red-600 rounded-lg"><ShieldAlert size={20} /></span>
              3. Acceptable Use Policy
            </h2>
            <p>
              Subscribers are responsible for all activities occurring on their broadband connection and/or mobile application. You agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>Use the connection or app for any unlawful, illegal, or fraudulent activities.</li>
              <li>Resell or redistribute the broadband connectivity, DTH feeds, or OTT services to third parties without prior written consent from Airnetz.</li>
              <li>Distribute malware, spam, or attempt unauthorized access (hacking) to other servers or our infrastructure.</li>
              <li>Use the services in a manner that degrades network performance or restricts other subscribers' access.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Scale size={20} /></span>
              4. Billing, Payments & Outages
            </h2>
            <p>
              Subscription charges are billed in advance based on the selected package. Invoices must be paid on or before the due date to avoid service disconnection. Applicable taxes (GST) will be charged on all plans.
            </p>
            <p>
              While Airnetz strives to provide uninterrupted fiber broadband and DTH connectivity, temporary service interruptions may occur due to fiber cuts, weather events, power failures, or system upgrades. Airnetz will make reasonable efforts to resolve outages promptly, but is not liable for indirect losses caused by such disruptions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileText size={20} /></span>
              5. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms or services will be subject to the exclusive jurisdiction of the courts in Tirupati, Andhra Pradesh, India.
            </p>
          </section>

          {/* Contact Info */}
          <section className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Need Help?</h2>
            <p>If you require clarification on any part of these Terms of Use, please reach out to us:</p>
            
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

export default TermsOfUse;
