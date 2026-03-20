import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  UserCircle, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  MapPin,
  WifiOff
} from 'lucide-react';
import { api } from '../services/api';

const AgentLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [gpsStatus, setGpsStatus] = React.useState<'idle' | 'active' | 'denied'>('idle');
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AG';

  // GPS Location Push — every 30 seconds
  React.useEffect(() => {
    if (!user.id || !('geolocation' in navigator)) return;

    const pushLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsStatus('active');
          console.log(`Pushing location for agent ${user.id}:`, pos.coords.latitude, pos.coords.longitude);
          api.updateAgentLocation({
            userId: user.id,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
          .then(d => console.log('Location push response:', d))
          .catch((err) => console.error('Location push failed:', err));
        },
        (err) => {
            console.warn('GPS Error:', err.message);
            setGpsStatus('denied');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') {
        setGpsStatus('denied');
      } else {
        pushLocation();
        const interval = setInterval(pushLocation, 30000);
        return () => clearInterval(interval);
      }
    });
  }, [user.id]);

  // Close sidebar on route change (mobile)
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const navItems = [
    { path: '/agent', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/agent/tasks', icon: ClipboardList, label: 'My Tasks' },
    { path: '/agent/customers', icon: UserCircle, label: 'Customers' },
    { path: '/agent/payments', icon: CreditCard, label: 'Earnings' },
    { path: '/agent/reports', icon: BarChart3, label: 'Performance' },
    { path: '/agent/settings', icon: Settings, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-orange-600">Airnetz Agent</span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* GPS Status Indicator */}
            <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
              gpsStatus === 'active' ? 'bg-green-100 text-green-700' :
              gpsStatus === 'denied' ? 'bg-red-100 text-red-600' :
              'bg-gray-100 text-gray-500'
            }`}>
              {gpsStatus === 'denied' ? <WifiOff size={12} /> : <MapPin size={12} />}
              <span className="hidden sm:inline">
                {gpsStatus === 'active' ? 'GPS Live' : gpsStatus === 'denied' ? 'GPS Off' : 'GPS...'}
              </span>
            </div>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-900">{user.name || 'Agent'}</div>
                <div className="text-xs text-green-500 font-medium">
                  {gpsStatus === 'active' ? '● Live' : 'Online'}
                </div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;
