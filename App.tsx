import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Broadband from './pages/Broadband';
import DTH from './pages/DTH';
import BookConnection from './pages/BookConnection';
import Support from './pages/Support';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRequests from './pages/admin/Requests';
import RequestDetail from './pages/admin/RequestDetail';
import Agents from './pages/admin/Agents';
import Customers from './pages/admin/Customers';
import Reports from './pages/admin/Reports';
import Payments from './pages/admin/Payments';
import ActiveAgents from './pages/admin/ActiveAgents';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <AIChat />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="customers" element={<Customers />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="requests/:id" element={<RequestDetail />} />
          <Route path="reports" element={<Reports />} />
          <Route path="payments" element={<Payments />} />
          <Route path="active-agents" element={<ActiveAgents />} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings Coming Soon</div>} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/broadband" element={<Broadband />} />
          <Route path="/dth" element={<DTH />} />
          <Route path="/book" element={<BookConnection />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;