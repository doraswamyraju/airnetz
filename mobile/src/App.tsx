import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
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
import LeadsManager from './pages/admin/Leads';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import AgentLayout from './components/agent/AgentLayout';
import AgentDashboard from './pages/agent/AgentDashboard';
import AgentTasks from './pages/agent/Tasks';
import AgentCustomers from './pages/agent/Customers';
import AgentPayments from './pages/agent/Payments';
import AgentReports from './pages/agent/Reports';
import CustomerLayout from './components/customer/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerBilling from './pages/customer/Billing';
import CustomerSupport from './pages/customer/Support';

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
          <Route path="leads" element={<LeadsManager />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Agent Routes */}
        <Route path="/agent" element={<AgentLayout />}>
          <Route index element={<AgentDashboard />} />
          <Route path="tasks" element={<AgentTasks />} />
          <Route path="customers" element={<AgentCustomers />} />
          <Route path="payments" element={<AgentPayments />} />
          <Route path="reports" element={<AgentReports />} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-500 font-sans">Profile Settings Coming Soon</div>} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="billing" element={<CustomerBilling />} />
          <Route path="support" element={<CustomerSupport />} />
          <Route path="plans" element={<div className="p-8 text-center text-gray-500 font-sans">Plan Details Coming Soon</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-500 font-sans">Account Settings Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;