export type TabType = 'requests' | 'home' | 'profile';

export type BookingStatus = 'active' | 'completed' | 'cancelled';

export interface User {
  studentCode: string;
  fullName: string;
  email: string;
  faculty: string;
  major: string;
  avatarUrl?: string;
  dailyQuotaSeconds: number;
  weeklyQuotaSeconds: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Laptop {
  id: string;
  name: string;
  code: string;
  brand: string;
  model: string;
  os: string;
  ram: string;
  processor: string;
  available: boolean;
  availableSlots: TimeSlot[];
  tagline: string;
  benefits: string[];
  featured?: boolean;
}

export interface CampusZone {
  id: string;
  code: string;
  name: string;
  description: string;
  x: number;
  y: number;
}

export interface BookingRequest {
  id: string;
  laptopId: string;
  laptopName: string;
  laptopBrand: string;
  laptopCode: string;
  laptopModel: string;
  zoneName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: BookingStatus;
  qrCodeValue: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}
