import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wifi } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Broadband Plans', path: '/broadband' },
    { name: 'DTH & OTT', path: '/dth' },
    { name: 'Book Connection', path: '/book' },
    { name: 'Support', path: '/support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg py-1' : 'bg-white/95 py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300 transform group-hover:scale-105">
                <Wifi size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight text-gray-900 leading-none">Airnetz</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Tirupati</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive(link.path)
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 active:scale-95 text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-6 bg-gradient-to-r from-brand-orange to-orange-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg"
          >
            Get New Connection
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;