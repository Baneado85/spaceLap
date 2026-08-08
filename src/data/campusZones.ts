import { CampusZone } from '../types';

// Ubicaciones ilustrativas dentro del campus PUCP (posiciones relativas, no a escala).
export const campusZones: CampusZone[] = [
  {
    id: 'zone-z',
    code: 'Z',
    name: 'Aulario Z',
    description: 'Aulas multiuso cerca al ingreso por Av. Universitaria.',
    x: 28,
    y: 20,
  },
  {
    id: 'zone-a',
    code: 'A',
    name: 'Pabellón de Estudios Generales Letras',
    description: 'Aulas amplias junto a la Plaza de Letras.',
    x: 20,
    y: 52,
  },
  {
    id: 'zone-bc',
    code: 'BC',
    name: 'Biblioteca Central',
    description: 'Ambiente silencioso, mesas individuales y grupales.',
    x: 48,
    y: 38,
  },
  {
    id: 'zone-e',
    code: 'E',
    name: 'Pabellón de Estudios Generales Ciencias',
    description: 'Zona tranquila, ideal para estudio individual.',
    x: 40,
    y: 68,
  },
  {
    id: 'zone-y',
    code: 'Y',
    name: 'Pabellón de Ciencias e Ingeniería',
    description: 'Cerca a los laboratorios y talleres de Ingeniería.',
    x: 66,
    y: 30,
  },
  {
    id: 'zone-cia',
    code: 'CIA',
    name: 'Complejo de Innovación Académica',
    description: 'Espacios colaborativos con enchufes en cada mesa.',
    x: 75,
    y: 55,
  },
  {
    id: 'zone-cp',
    code: 'CP',
    name: 'Coliseo Polideportivo',
    description: 'Bancas techadas junto a las canchas deportivas.',
    x: 80,
    y: 82,
  },
  {
    id: 'zone-patio',
    code: 'PL',
    name: 'Patio central',
    description: 'Áreas verdes al aire libre, entre pabellones centrales.',
    x: 50,
    y: 58,
  },
];
