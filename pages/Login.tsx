import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user info in localStorage for session handling
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'employee') {
          navigate('/agent');
        } else {
          navigate('/customer');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 font-sans">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl mx-auto flex items-center justify-center mb-6 border border-gray-100 p-3">
            <img src="/assets/images/Airnetz logo.jpeg" alt="Airnetz Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to access your Airnetz dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100">
          {/* Role Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 border border-gray-200">
            <button
              onClick={() => setRole('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
                role === 'customer' ? 'bg-white text-primary-600 shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              <span className="text-sm">Customer</span>
            </button>
            <button
              onClick={() => setRole('employee')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
                role === 'employee' ? 'bg-white text-orange-600 shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase size={18} />
              <span className="text-sm">Agent</span>
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
                role === 'admin' ? 'bg-white text-slate-900 shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={18} />
              <span className="text-sm">Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between ml-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-gray-600 font-medium">Remember me</span>
              </label>
              <button type="button" className="text-sm font-bold text-primary-600 hover:text-primary-700">Forgot Password?</button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              } ${
                role === 'admin' ? 'bg-slate-900 shadow-slate-200' : 
                role === 'employee' ? 'bg-orange-600 shadow-orange-200' : 'bg-primary-600 shadow-primary-200'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-500">
          Don't have an account? <button className="font-bold text-primary-600 hover:underline">Contact Support</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
