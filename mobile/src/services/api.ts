/**
 * Airnetz Mobile API Service
 * Dedicated for the mobile APK to connect to the live backend.
 */

const API_BASE = 'https://airnetz.sriddha.com/api';

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

  // Agent Specific
  getLiveAgents: async () => {
    const res = await fetch(`${API_BASE}/admin/agents/live`);
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

  getNotifications: async (userId: number) => {
    const res = await fetch(`${API_BASE.replace('/api', '')}/notifications/${userId}`);
    return res.json();
  },

  // Admin Specific
  getAdminRequests: async () => {
    const res = await fetch(`${API_BASE}/admin/requests`);
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return res.json();
  }
};
