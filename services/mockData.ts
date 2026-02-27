
export interface ServiceRequest {
  id: string;
  customerName: string;
  type: 'Installation' | 'Repair' | 'Upgrade' | 'Relocation';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  address: string;
  phone: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  technician?: string;
}

export const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 'SR-2024-001',
    customerName: 'Ramesh Gupta',
    type: 'Installation',
    status: 'Pending',
    date: '2024-02-20',
    address: '12-4-302, Gandhi Road, Tirupati',
    phone: '+91 98765 43210',
    priority: 'High',
    description: 'New Fiber connection request. 100Mbps plan selected.',
  },
  {
    id: 'SR-2024-002',
    customerName: 'Priya Sharma',
    type: 'Repair',
    status: 'In Progress',
    date: '2024-02-19',
    address: 'Flat 402, Balaji Residency, KT Road',
    phone: '+91 98765 12345',
    priority: 'High',
    description: 'Internet light blinking red on router. No connectivity since morning.',
    technician: 'Suresh Kumar'
  },
  {
    id: 'SR-2024-003',
    customerName: 'Tech Solutions Office',
    type: 'Upgrade',
    status: 'Completed',
    date: '2024-02-18',
    address: '2nd Floor, IT Park, Renigunta Road',
    phone: '+91 99887 76655',
    priority: 'Medium',
    description: 'Upgrade plan from 300Mbps to 1Gbps.',
    technician: 'Rajesh V'
  },
  {
    id: 'SR-2024-004',
    customerName: 'Lakshmi Narayana',
    type: 'Relocation',
    status: 'Pending',
    date: '2024-02-21',
    address: 'Moving from T.Nagar to AIR Bypass Road',
    phone: '+91 88776 65544',
    priority: 'Medium',
    description: 'Shifting house on 25th Feb. Need connection moved.',
  },
  {
    id: 'SR-2024-005',
    customerName: 'Hotel Bliss',
    type: 'Repair',
    status: 'Pending',
    date: '2024-02-22',
    address: 'Near Ramanuja Circle',
    phone: '+91 77665 54433',
    priority: 'High',
    description: 'WiFi signal weak in 3rd floor rooms.',
  }
];

export const getRequests = () => Promise.resolve(MOCK_REQUESTS);

export const getRequestById = (id: string) => Promise.resolve(MOCK_REQUESTS.find(r => r.id === id));

export const updateRequestStatus = (id: string, status: ServiceRequest['status']) => {
  const req = MOCK_REQUESTS.find(r => r.id === id);
  if (req) req.status = status;
  return Promise.resolve(req);
};
