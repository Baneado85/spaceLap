import React from 'react';
import { CampusZone } from '../types';
import { campusZonesList } from '../data/mockData';
import { MapPin, Navigation } from 'lucide-react';

interface CampusMapProps {
  selectedZoneId: string | null;
  onSelect: (zone: CampusZone) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({ selectedZoneId, onSelect }) => {
  const selectedZone = campusZonesList.find((z) => z.id === selectedZoneId) || campusZonesList[0];

  return (
    <div className="space-y-3 select-none">
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0c1222] via-[#080d19] to-[#04060c] shadow-2xl">
        {/* Cyber Grid Walkways */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 H100" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 0 V100" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="30" stroke="#00F0FF" strokeWidth="0.3" fill="none" />
        </svg>

        {/* Compass hint */}
        <span className="absolute top-3 right-3 text-[9px] font-extrabold text-[#00F0FF] tracking-widest bg-black/60 px-2 py-1 rounded-full border border-white/10 flex items-center space-x-1">
          <Navigation className="w-3 h-3 text-[#00F0FF]" />
          <span>CAMPUS SAN MIGUEL</span>
        </span>

        {/* Zone Markers */}
        {campusZonesList.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelect(zone)}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all z-20 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110 opacity-80'
              }`}
            >
              <span
                className={`px-3 py-1.5 rounded-xl font-extrabold text-xs border shadow-2xl transition-all ${
                  isSelected
                    ? 'bg-[#00F0FF] text-black border-white shadow-[0_0_20px_#00F0FF]'
                    : 'bg-slate-900/90 text-white border-white/20 hover:border-[#00F0FF]'
                }`}
              >
                {zone.code}
              </span>
              {isSelected && <MapPin className="w-4 h-4 text-[#00F0FF] -mt-1 drop-shadow-[0_0_8px_#00F0FF]" />}
            </button>
          );
        })}
      </div>

      {selectedZone && (
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex items-start space-x-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center font-extrabold text-xs flex-shrink-0">
            {selectedZone.code}
          </div>
          <div>
            <h4 className="text-xs font-black text-white">{selectedZone.name}</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{selectedZone.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
