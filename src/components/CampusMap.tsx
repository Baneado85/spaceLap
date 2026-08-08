import React from 'react';
import { CampusZone } from '../types';
import { campusZones } from '../data/campusZones';
import { MapPin } from 'lucide-react';

interface CampusMapProps {
  selectedZoneId: string | null;
  onSelect: (zone: CampusZone) => void;
}

const decorativeTrees = [
  { x: 10, y: 12 }, { x: 92, y: 14 }, { x: 8, y: 88 },
  { x: 92, y: 92 }, { x: 60, y: 12 }, { x: 12, y: 68 },
];

export const CampusMap: React.FC<CampusMapProps> = ({ selectedZoneId, onSelect }) => {
  const selectedZone = campusZones.find((z) => z.id === selectedZoneId) ?? null;

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-emerald-50 via-sky-50 to-pucp-skyLight/50">
        {/* Decorative walkways */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 45 H100" stroke="#CBD5E1" strokeWidth="0.8" />
          <path d="M45 0 V100" stroke="#CBD5E1" strokeWidth="0.8" />
          <path d="M15 15 L85 85" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M85 15 L15 85" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        {/* Decorative greenery dots */}
        {decorativeTrees.map((t, i) => (
          <span
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-emerald-300/70 border border-emerald-400/40"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          />
        ))}

        {/* Compass hint */}
        <span className="absolute top-2 right-2 text-[9px] font-bold text-slate-400 tracking-widest">N ↑</span>
        <span className="absolute bottom-2 left-2 text-[9px] font-semibold text-slate-400">Campus PUCP · San Miguel</span>

        {campusZones.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelect(zone)}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform z-10 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
              title={zone.name}
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-extrabold border-2 shadow-md transition-colors ${
                  isSelected
                    ? 'bg-pucp-navy text-white border-white'
                    : 'bg-white/90 text-pucp-navy border-pucp-sky/70'
                }`}
              >
                {zone.code}
              </span>
              {isSelected && <MapPin className="w-4 h-4 text-pucp-navy -mt-0.5 fill-pucp-sky" />}
            </button>
          );
        })}
      </div>

      {selectedZone ? (
        <div className="glass-panel rounded-xl p-3 flex items-start space-x-3">
          <div className="w-10 h-10 rounded-lg bg-pucp-navy text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">
            {selectedZone.code}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{selectedZone.name}</p>
            <p className="text-[11px] text-slate-600">{selectedZone.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 text-center py-1">
          Toca un punto del mapa para elegir dónde usarás la laptop.
        </p>
      )}
    </div>
  );
};
