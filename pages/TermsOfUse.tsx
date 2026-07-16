import React from 'react';
import { FileText, ShieldAlert, CheckCircle, Scale, Mail, Phone, MapPin, RefreshCw, XCircle, Info } from 'lucide-react';

const TermsOfUse = () => {
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
                <Scale size={12} /> Terms & Conditions
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Terms of Use</h1>
              <p className="text-slate-300 text-sm md:text-base max-w-xl">
                These terms govern your subscription, portal access, and use of Airnetz Broadband Services Pvt Ltd services and mobile apps.
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
          
          {/* Section: About Us */}
          <section className="space-y-4 bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Info className="text-brand-orange" size={20} /> About Us
            </h2>
            <p className="text-sm md:text-base">
              Welcome to <strong>Airnetz Broadband Services Pvt Ltd</strong>. We are a premier Fiber Optic Network & Fiber-To-The-Home (FTTH) technology Internet Service Provider, delivering high-speed broadband, DTH, and digital connectivity solutions in Tirupati, Andhra Pradesh.
            </p>
          </section>

          {/* Section 1: Use of Services */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-primary-50 text-primary-600 rounded-lg"><FileText size={20} /></span>
              1. Acceptance of Terms & Conditions
            </h2>
            <p>
              The use of Airnetz Broadband Services Pvt Ltd services is regulated by these Terms and Conditions of use. The user must read these terms and conditions before using and/or accessing our services. You must also review our Privacy Policy.
            </p>
            <p>
              By using our services, you agree to be bound by these terms and represent that you are <strong>above 16 years of age</strong>. Airnetz services can be accessed through our website, applications on devices, and other media.
            </p>
            <p>
              Airnetz Broadband Services Pvt Ltd reserves the right to disallow the user from using its services at any time without prior notice, if the user does not agree to these terms. Before using the services, the user must ensure that he/she is legally capable of entering into a contract and incurs no disqualification under any laws in force.
            </p>
          </section>

          {/* Section 2: Service Availability */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-50 text-brand-orange rounded-lg"><ShieldAlert size={20} /></span>
              2. Service Availability
            </h2>
            <p>
              Due to the nature of the Service technology, Airnetz Broadband Services Pvt Ltd reserves the right to deem the service unavailable to you up to, including, and after the installation.
            </p>
            <p>
              Airnetz Broadband Services Pvt Ltd assumes no liability whatsoever for any claims, damages, losses, or expenses arising out of or otherwise relating to the unavailability of the Service in your geographical area, for any reason, even where such unavailability occurs after installation of the service.
            </p>
          </section>

          {/* Section 3: User Account */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={20} /></span>
              3. User Account Security
            </h2>
            <p>
              Airnetz Broadband Services Pvt Ltd services are available on a user account protected by the user's password. Airnetz Broadband Services Pvt Ltd accepts no responsibility for the dilution or violation of the user account due to the disclosure of the password to any third party by the user.
            </p>
            <p>
              We will take notice of unauthorized use of the user account immediately upon the user notifying us. In order to protect data during transmission, the user must use an encrypted connection. Airnetz Broadband Services Pvt Ltd shall not be responsible for loss of data during transmission.
            </p>
          </section>

          {/* Section 4: Intellectual Property Rights */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Scale size={20} /></span>
              4. Intellectual Property Rights & Infringements
            </h2>
            <p>
              <strong>Protection:</strong> Airnetz Broadband Services Pvt Ltd reserves all rights which are not expressly granted to the user. All software, copyrighted material, brand names, logos, trademarks, and service marks are the intellectual property of Airnetz Broadband Services Pvt Ltd. Use of our services does not grant the user any right, title, or interest in such property. Breach of this clause is a material breach and makes the user liable for damages in a Court of Law.
            </p>
            <p>
              <strong>Infringement Policy:</strong> Airnetz Broadband Services Pvt Ltd respects the intellectual property rights of others. The user must ensure that files, data, or information shared, copied, uploaded, or downloaded do not infringe third-party rights. Airnetz Broadband Services Pvt Ltd shall immediately delete or erase any such information on receiving notice of infringement from third parties or law enforcement authorities, without prior notice to the user.
            </p>
            <p>
              Any complaints regarding intellectual property infringement may be sent to our support email at: <span className="font-semibold text-brand-orange">support@airnetz.in</span>.
            </p>
          </section>

          {/* Section 5: Third Party Services */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileText size={20} /></span>
              5. Third-Party Services & Software
            </h2>
            <p>
              Airnetz Broadband Services Pvt Ltd may use third-party services, software, and applications to provide its services effectively. However, we do not guarantee the authenticity, accuracy, and availability of such third-party utilities.
            </p>
            <p>
              The user shall use third-party services at his/her own discretion and risk. If Airnetz Broadband Services Pvt Ltd uses any open-source software, the provisions of such open-source licenses will be applicable.
            </p>
          </section>

          {/* Section 6: Cancellation & Refund Policy */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-teal-50 text-teal-600 rounded-lg"><RefreshCw size={20} /></span>
              6. Cancellation & Refund Policy
            </h2>
            <p>
              All sales of Recharge are final, and there will be no refund or exchange permitted. You are solely responsible for verifying the customer account number you purchase Recharge for. The company is not responsible for any purchase of Recharge for an incorrect account number.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 text-sm md:text-base">
              <strong>Failed Transaction Clause:</strong> In a case where a transaction has been completed by you on our site, and money has been charged to your card or bank account but a Recharge has not been delivered within 24 hours of your completion of the transaction, you may inform us by sending an email to <span className="font-bold">support@airnetz.in</span>. In such a scenario, you will be entitled to a full refund. 
              <br /><br />
              Please include:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Recharge Value</li>
                <li>Transaction Date</li>
                <li>Order/Transaction ID</li>
              </ul>
              <br />
              Airnetz Broadband Services Pvt Ltd shall investigate the incident. If it is verified that money was charged without delivery of the Recharge, you will be refunded the money within <strong>7 working days</strong> from the receipt of your email.
            </div>
          </section>

          {/* Section 7: Termination */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-red-50 text-red-600 rounded-lg"><XCircle size={20} /></span>
              7. Termination of Services
            </h2>
            <p>
              Airnetz Broadband Services Pvt Ltd reserves the right to terminate services, with or without notice, if the user does not comply with the Terms of Use or upon receiving lawful orders from government or telecom authorities.
            </p>
            <p>
              In case of termination, we may assist the user to recover user data or information, but are not bound to do so. After termination of services, Airnetz Broadband Services Pvt Ltd reserves every right to repossess the router or any other hardware installed at the customer premise where the link was commissioned.
            </p>
          </section>

          {/* Section 8: Governing Law & Jurisdiction */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-slate-100 text-slate-700 rounded-lg"><Scale size={20} /></span>
              8. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms and Conditions are governed by and operated in accordance with the laws of India. If any of the parties wish to seek legal recourse, they may do so exclusively in the courts of law in <strong>Tirupati, Andhra Pradesh</strong>.
            </p>
          </section>

          {/* Contact Info */}
          <section className="pt-6 border-t border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
            <p>If you require clarification on any part of these Terms of Use, please reach out to us:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <MapPin className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Registered Office</span>
                  <span className="text-gray-500">#42, Temple Road, Near Bus Stand, Tirupati, Andhra Pradesh - 517501</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Support Email</span>
                  <span className="text-gray-500">support@airnetz.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Phone className="text-brand-orange flex-shrink-0 mt-1" size={18} />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-900">Phone Help</span>
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
