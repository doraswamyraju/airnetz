/**
 * Airnetz API Service
 * Centralized data fetching for the application
 */

const API_BASE = '/api';

export const api = {
  // Auth
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

  getAgents: async () => {
    const res = await fetch(`${API_BASE}/admin/agents`);
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
  }
};
