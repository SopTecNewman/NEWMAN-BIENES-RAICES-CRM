
export enum UserRole {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  AGENT = 'AGENT'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  username: string;
}

export interface SocialPost {
  id: string;
  agentId: string;
  agentName: string;
  content: string;
  platform: 'FB' | 'IG' | 'TK';
  link: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  from: string;
  to: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  action?: () => void;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  pricePerM2: number;
  totalArea: number;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  growthRate: number;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
