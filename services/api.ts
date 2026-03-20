/**
 * Airnetz API Service
 * Centralized data fetching for the application
 */

// In production/mobile mode, we need the absolute URL of the backend
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '/api' 
  : 'https://airnetz.sriddha.com/api';

export const api = {
  // Auth
  updateRequestStatus: async (requestId: string, status: string) => {
    const res = await fetch(`${API_BASE}/admin/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, status })
    });
    return res.json();
  },

  convertLead: async (leadId: number) => {
    const res = await fetch(`${API_BASE}/leads/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId })
    });
    return res.json();
  },

  getNotifications: async (adminId: number) => {
    const res = await fetch(`${API_BASE}/notifications/${adminId}`);
    return res.json();
  },

  markNotificationRead: async (id: number) => {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, { method: 'PUT' });
    return res.json();
  },

  markAllNotificationsRead: async (adminId: number) => {
    const res = await fetch(`${API_BASE}/notifications/readall/${adminId}`, { method: 'PUT' });
    return res.json();
  },

  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  // Customer
  getCustomerProfile: async (userId: number) => {
    const res = await fetch(`${API_BASE}/customer/profile/${userId}`);
    return res.json();
  },

  getCustomerRequests: async (customerId: number) => {
    const res = await fetch(`${API_BASE}/customer/requests/${customerId}`);
    return res.json();
  },

  createRequest: async (request: any) => {
    const res = await fetch(`${API_BASE}/customer/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    return res.json();
  },

  getCustomerPayments: async (customerId: number) => {
    const res = await fetch(`${API_BASE}/customer/payments/${customerId}`);
    return res.json();
  },

  // Admin
  getAdminRequests: async () => {
    const res = await fetch(`${API_BASE}/admin/requests`);
    return res.json();
  },

  getAdminCustomers: async () => {
    const res = await fetch(`${API_BASE}/admin/customers`);
    return res.json();
  },

  deleteCustomer: async (id: number) => {
    const res = await fetch(`${API_BASE}/admin/customers/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  changePassword: async (data: { userId: number, newPassword: string }) => {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  forgotPassword: async (data: { email: string, role: string }) => {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  createAdminCustomer: async (customerData: any) => {
    const res = await fetch(`${API_BASE}/admin/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    return res.json();
  },

  createAdminRequest: async (requestData: any) => {
    const res = await fetch(`${API_BASE}/admin/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    return res.json();
  },

  getAgents: async () => {
    const res = await fetch(`${API_BASE}/admin/agents`);
    return res.json();
  },

  getLiveAgents: async () => {
    const res = await fetch(`${API_BASE}/admin/agents/live`);
    return res.json();
  },

  getAdminPayments: async () => {
    const res = await fetch(`${API_BASE}/admin/payments`);
    return res.json();
  },

  createAgent: async (agentData: any) => {
    const res = await fetch(`${API_BASE}/admin/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentData)
    });
    return res.json();
  },

  updateAgentStatus: async (agentId: number, is_active: boolean) => {
    const res = await fetch(`${API_BASE}/admin/agents/${agentId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active })
    });
    return res.json();
  },

  updateAgentLocation: async (data: { userId: number, lat: number, lng: number }) => {
    const res = await fetch(`${API_BASE}/agent/location`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  resendAgentPassword: async (agentId: number) => {
    const res = await fetch(`${API_BASE}/admin/agents/${agentId}/resend-password`, {
      method: 'POST'
    });
    return res.json();
  },

  deleteAgent: async (agentId: number) => {
    const res = await fetch(`${API_BASE}/admin/agents/${agentId}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  assignTechnician: async (requestId: string, agentId: number) => {
    const res = await fetch(`${API_BASE}/admin/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, agentId })
    });
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return res.json();
  },

  // General
  getPlans: async () => {
    const res = await fetch(`${API_BASE}/plans`);
    return res.json();
  },

  // Public
  bookConnection: async (data: any) => {
    const res = await fetch(`${API_BASE}/public/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin Leads
  getLeads: async () => {
    const res = await fetch(`${API_BASE}/admin/leads`);
    return res.json();
  },

  getAdminReports: async () => {
    const res = await fetch(`${API_BASE}/admin/reports`);
    return res.json();
  },
};
