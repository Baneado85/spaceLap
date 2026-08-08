import React from 'react';
import { TabType } from '../types';
import { RotateCcw, Home, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="w-full bg-[#002B66] py-3 px-8 flex items-center justify-around border-t border-blue-900/40 shadow-lg relative z-20">
      {/* Tab 1: Historial / Solicitudes */}
      <button
        onClick={() => onChangeTab('requests')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
          activeTab === 'requests'
            ? 'text-white scale-110'
            : 'text-blue-300/70 hover:text-white'
        }`}
        title="Historial de Solicitudes"
      >
        <RotateCcw className="w-6 h-6 stroke-[2.2]" />
      </button>

      {/* Tab 2: Home */}
      <button
        onClick={() => onChangeTab('home')}
        className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all duration-200 ${
          activeTab === 'home'
            ? 'bg-blue-800/80 text-white shadow-inner scale-110 border border-blue-600/40'
            : 'text-blue-300/70 hover:text-white'
        }`}
        title="Inicio"
      >
        <Home className="w-6 h-6 stroke-[2.2]" />
      </button>

      {/* Tab 3: Perfil */}
      <button
        onClick={() => onChangeTab('profile')}
        className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
          activeTab === 'profile'
            ? 'text-white scale-110'
            : 'text-blue-300/70 hover:text-white'
        }`}
        title="Perfil de Estudiante"
      >
        <User className="w-6 h-6 stroke-[2.2]" />
      </button>
    </div>
  );
};
