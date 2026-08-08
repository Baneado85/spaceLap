import React from 'react';
import { TabType } from '../types';
import { Clock, Home, User, Laptop } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="w-full bg-[#090A0F]/90 backdrop-blur-2xl py-2.5 px-8 flex items-center justify-around border-t border-white/10 shadow-2xl relative z-30 select-none">
      {/* Tab 1: Solicitudes */}
      <button
        onClick={() => onChangeTab('requests')}
        className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 ${
          activeTab === 'requests'
            ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Historial de Solicitudes"
      >
        <Clock className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">Reservas</span>
      </button>

      {/* Tab 2: Home */}
      <button
        onClick={() => onChangeTab('home')}
        className={`flex flex-col items-center justify-center py-1.5 px-5 rounded-2xl transition-all duration-200 ${
          activeTab === 'home'
            ? 'bg-[#00F0FF] text-black shadow-[0_0_20px_#00F0FF] scale-110 font-extrabold'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Inicio"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-extrabold mt-0.5">Inicio</span>
      </button>

      {/* Tab 3: Perfil */}
      <button
        onClick={() => onChangeTab('profile')}
        className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 ${
          activeTab === 'profile'
            ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
        title="Perfil de Estudiante"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">Perfil</span>
      </button>
    </div>
  );
};
