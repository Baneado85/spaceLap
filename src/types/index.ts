export type TabType = 'requests' | 'home' | 'profile';

export type BookingStatus = 'approved' | 'pending' | 'completed' | 'cancelled';

export type LabCategory = 'computer_lab' | 'mac_lab' | 'study_cubicle' | 'meeting_room';

export interface User {
  studentCode: string;
  fullName: string;
  email: string;
  faculty: string;
  major: string;
  avatarUrl?: string;
  dailyQuotaSeconds: number; // e.g. 5 hours = 18000 seconds
}

export interface LabSpace {
  id: string;
  name: string;
  building: string;
  roomNumber: string;
  category: LabCategory;
  capacity: number;
  availablePCs: number;
  specs: string[];
  description: string;
  imageUrl?: string;
}

export interface BookingRequest {
  id: string;
  labId: string;
  labName: string;
  building: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  purpose: string;
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
