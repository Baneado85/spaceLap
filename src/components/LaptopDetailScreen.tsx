import React from 'react';
import { Laptop } from '../types';
import { X, Cpu, MemoryStick, Monitor, Battery, CheckCircle2, ShieldCheck, MapPin, Star } from 'lucide-react';
import { LaptopHero } from './LaptopHero';

interface LaptopDetailScreenProps {
  laptop: Laptop;
  onClose: () => void;
  onReserve: (laptop: Laptop) => void;
}

export const LaptopDetailScreen: React.FC<LaptopDetailScreenProps> = ({ laptop, onClose, onReserve }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#090A0F] w-full max-w-md h-[94vh] sm:h-auto sm:max-h-[820px] rounded-t-[36px] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden border border-white/15 text-white">
        <div className="relative flex-1 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Poster Banner */}
          <LaptopHero laptop={laptop} size="full" className="rounded-none border-b border-white/10" />

          {/* Detailed Content */}
          <div className="p-6 space-y-6">
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-extrabold uppercase tracking-wider">
                  {laptop.brand} · {laptop.category || 'High End'}
                </span>
                {laptop.rating && (
                  <span className="text-[10px] font-bold text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded-full border border-[#FFB800]/30">
                    {laptop.rating}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">{laptop.name}</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{laptop.tagline}</p>
            </div>

            {/* Spec Matrix Grid (Screen 2 Dribbble style) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                ESPECIFICACIONES TÉCNICAS
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                <SpecTile icon={<Cpu className="w-4 h-4 text-[#00F0FF]" />} label="CPU" value={laptop.processor} />
                <SpecTile icon={<MemoryStick className="w-4 h-4 text-[#00F0FF]" />} label="RAM" value={laptop.ram} />
                <SpecTile icon={<Monitor className="w-4 h-4 text-[#00F0FF]" />} label="PANTALLA" value={laptop.screenSpec || 'OLED 2K'} />
                <SpecTile icon={<Battery className="w-4 h-4 text-[#FFB800]" />} label="BATERÍA" value={laptop.batteryLevel || '100%'} />
                <SpecTile icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />} label="GPU" value={laptop.gpu || 'Dedicada'} />
                <SpecTile icon={<MapPin className="w-4 h-4 text-sky-400" />} label="UBICACIÓN" value={laptop.labRoom?.split(' - ')[0] || 'Lab 302'} />
              </div>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                EQUIPAMIENTO & VENTAJAS
              </h3>
              <ul className="space-y-2.5">
                {laptop.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-950 border-t border-white/10">
          <button
            onClick={() => onReserve(laptop)}
            disabled={!laptop.available}
            className={`w-full py-4 rounded-2xl text-xs font-extrabold tracking-wider uppercase transition-all shadow-xl ${
              laptop.available
                ? 'bg-[#00F0FF] hover:bg-[#33f3ff] text-black shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {laptop.available ? 'RESERVAR ESTA LAPTOP / ELEGIR PUESTO' : 'NO DISPONIBLE HOY'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SpecTile: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-center">
    {icon}
    <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1.5">{label}</p>
    <p className="text-[11px] font-extrabold text-white leading-tight mt-0.5 line-clamp-1">{value}</p>
  </div>
);
