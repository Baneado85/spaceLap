import React from 'react';
import { Laptop } from '../types';
import { X, Cpu, MemoryStick, MonitorSmartphone, CheckCircle2 } from 'lucide-react';
import { LaptopHero } from './LaptopHero';

interface LaptopDetailScreenProps {
  laptop: Laptop;
  onClose: () => void;
  onReserve: (laptop: Laptop) => void;
}

export const LaptopDetailScreen: React.FC<LaptopDetailScreenProps> = ({ laptop, onClose, onReserve }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md h-[92vh] sm:h-auto sm:max-h-[720px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="relative flex-1 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <LaptopHero laptop={laptop} size="full" className="rounded-none" />

          <div className="p-5 space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-pucp-skyDeep font-bold">{laptop.brand}</p>
              <h2 className="text-xl font-extrabold text-slate-900">{laptop.name}</h2>
              <p className="text-xs text-slate-500 mt-1">{laptop.tagline}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-800 mb-2">Especificaciones</h3>
              <div className="glass-panel rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
                <SpecTile icon={<Cpu className="w-4 h-4 text-pucp-skyDeep" />} label="Procesador" value={laptop.processor} />
                <SpecTile icon={<MemoryStick className="w-4 h-4 text-pucp-skyDeep" />} label="RAM" value={laptop.ram} />
                <SpecTile icon={<MonitorSmartphone className="w-4 h-4 text-pucp-skyDeep" />} label="Sistema" value={laptop.os} />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-800 mb-2">Por qué elegirla</h3>
              <ul className="space-y-2">
                {laptop.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => onReserve(laptop)}
            disabled={!laptop.available}
            className={`w-full py-3.5 rounded-xl text-sm font-bold transition-colors ${
              laptop.available
                ? 'bg-pucp-navy hover:bg-pucp-dark text-white shadow-md shadow-pucp-sky/20'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {laptop.available ? 'Reservar esta laptop' : 'No disponible en este momento'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SpecTile: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center space-y-1">
    {icon}
    <p className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">{label}</p>
    <p className="text-[11px] font-bold text-slate-800 leading-tight">{value}</p>
  </div>
);
