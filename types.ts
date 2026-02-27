export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: number;
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
