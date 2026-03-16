export type UserRole = 'admin' | 'employee' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
  prices?: {
    monthly: number;
    sixMonths: number;
    yearly: number;
  };
  data: string;
  ottBenefits: string[];
  type: 'broadband' | 'dth' | 'bundle';
  recommended?: boolean;
}

export interface ServiceRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  planId?: string;
  message?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ServiceType {
  BROADBAND = 'Broadband',
  DTH = 'DTH',
  OTT = 'OTT Bundle',
  CORPORATE = 'Corporate Leased Line'
}
