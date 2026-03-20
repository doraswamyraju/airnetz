import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Airnetz</h3>
            <p className="text-slate-400 text-sm mb-4">
              Providing high-speed fiber internet, HD DTH services, and premium OTT bundles to homes and businesses across Tirupati.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Instagram size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Services</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/broadband" className="hover:text-white">Fiber Broadband</Link></li>
              <li><Link to="/dth" className="hover:text-white">DTH & Cable</Link></li>
              <li><Link to="/dth" className="hover:text-white">OTT Bundles</Link></li>
              <li><Link to="/support" className="hover:text-white">Corporate Lines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/book" className="hover:text-white">New Connection</Link></li>
              <li><Link to="/support" className="hover:text-white">Pay Bill</Link></li>
              <li><Link to="/support" className="hover:text-white">Raise Ticket</Link></li>
              <li><Link to="/admin" className="hover:text-white text-brand-orange">Admin Portal</Link></li>
              <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-brand-orange" />
                <span>#42, Temple Road, Near Bus Stand, Tirupati, Andhra Pradesh - 517501</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-orange" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-orange" />
                <span>support@airnetz.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Airnetz Tirupati. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;