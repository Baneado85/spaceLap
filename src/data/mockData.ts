import { User, LabSpace, BookingRequest } from '../types';

export const currentUser: User = {
  studentCode: '20211038',
  fullName: 'NAVARRO COLLAO WALTER JUNIOR',
  email: 'estudiante@pucp.edu.pe',
  faculty: 'FACULTAD CIENCIAS E INGENIERÍA',
  major: 'INGENIERÍA INFORMÁTICA',
  dailyQuotaSeconds: 18000, // 5h 00m 00s
};

export const availableLabs: LabSpace[] = [
  {
    id: 'lab-v101',
    name: 'Laboratorio de Cómputo V-101',
    building: 'Pabellón V',
    roomNumber: 'V-101',
    category: 'computer_lab',
    capacity: 40,
    availablePCs: 18,
    specs: ['Intel Core i7 13th Gen', '16GB RAM', 'GPU RTX 3060', 'VS Code, MATLAB, AutoCAD'],
    description: 'Laboratorio de alto rendimiento ideal para programación y software de ingeniería.',
  },
  {
    id: 'lab-v102',
    name: 'Laboratorio Mac V-102',
    building: 'Pabellón V',
    roomNumber: 'V-102',
    category: 'mac_lab',
    capacity: 25,
    availablePCs: 10,
    specs: ['Apple Mac Studio M2 Max', '32GB RAM', 'Xcode, Final Cut Pro, Figma'],
    description: 'Laboratorio especializado en desarrollo iOS y diseño multimedia.',
  },
  {
    id: 'cub-e204',
    name: 'Cubículo de Estudio E-204',
    building: 'Biblioteca Central (Pabellón E)',
    roomNumber: 'E-204',
    category: 'study_cubicle',
    capacity: 6,
    availablePCs: 2,
    specs: ['Pantalla Smart HD', 'Pizarra Blanca', 'Tomas de Corriente & WiFi Acelerado'],
    description: 'Espacio insonorizado perfecto para reuniones de equipo y trabajos grupales.',
  },
  {
    id: 'lab-v203',
    name: 'Laboratorio de Inteligencia Artificial V-203',
    building: 'Pabellón V',
    roomNumber: 'V-203',
    category: 'computer_lab',
    capacity: 30,
    availablePCs: 8,
    specs: ['NVIDIA RTX 4080', '64GB RAM', 'PyTorch, TensorFlow, CUDA Pre-instalado'],
    description: 'Equipos avanzados para procesamiento de Modelos de Lenguaje y Visión Computacional.',
  },
];

export const initialRequests: BookingRequest[] = [
  {
    id: 'REQ-2026-0881',
    labId: 'lab-v101',
    labName: 'Laboratorio de Cómputo V-101',
    building: 'Pabellón V',
    date: '2026-08-08',
    startTime: '10:00',
    endTime: '12:00',
    durationMinutes: 120,
    purpose: 'Proyecto de Curso - Algoritmos Avanzados',
    status: 'approved',
    qrCodeValue: 'SPACELAP-PUCP-20211038-REQ-0881',
    createdAt: '2026-08-07 14:30',
  },
  {
    id: 'REQ-2026-0742',
    labId: 'cub-e204',
    labName: 'Cubículo de Estudio E-204',
    building: 'Biblioteca Central',
    date: '2026-08-05',
    startTime: '15:00',
    endTime: '17:00',
    durationMinutes: 120,
    purpose: 'Estudio Grupal de Ingeniería de Software',
    status: 'completed',
    qrCodeValue: 'SPACELAP-PUCP-20211038-REQ-0742',
    createdAt: '2026-08-04 09:15',
  }
];
