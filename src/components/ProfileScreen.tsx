import React from 'react';
import { User as UserType } from '../types';
import { User, LogOut, Award, BookOpen, Building2, ShieldCheck, Zap } from 'lucide-react';

interface ProfileScreenProps {
  user: UserType;
  onOpenLogoutModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onOpenLogoutModal }) => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-[#090A0F] text-white overflow-y-auto no-scrollbar flex flex-col items-center justify-between text-center select-none">
      <div className="w-full flex flex-col items-center my-auto space-y-5">
        {/* Profile Avatar Container */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00F0FF] via-blue-600 to-purple-600 p-1 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[#00F0FF]">
              <User className="w-12 h-12" />
            </div>
          </div>
          <div
            className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-[0_0_10px_#34d399]"
            title="Estudiante Activo PUCP"
          />
        </div>

        {/* Student Details */}
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white tracking-wide font-heading uppercase">
            {user.fullName}
          </h2>
          <p className="text-xs font-mono font-bold text-[#00F0FF]">
            CÓDIGO PUCP: {user.studentCode}
          </p>
        </div>

        {/* Faculty and Major Cards */}
        <div className="w-full max-w-xs bg-slate-900/90 rounded-3xl p-5 border border-white/10 space-y-4 text-left shadow-2xl">
          <div className="flex items-center space-x-3 text-xs">
            <Building2 className="w-4 h-4 text-[#00F0FF] flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Facultad</span>
              <span className="font-extrabold text-white">{user.faculty}</span>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          <div className="flex items-center space-x-3 text-xs">
            <BookOpen className="w-4 h-4 text-[#00F0FF] flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Especialidad</span>
              <span className="font-extrabold text-white">{user.major}</span>
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          <div className="flex items-center space-x-3 text-xs">
            <Zap className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Cuota de Reserva</span>
              <span className="font-extrabold text-white">5 Horas / Día (Gratuito)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Button */}
      <div className="w-full max-w-xs pb-4">
        <button
          onClick={onOpenLogoutModal}
          className="w-full py-4 px-6 bg-red-500/15 hover:bg-red-500/25 active:scale-[0.99] text-red-300 font-extrabold border border-red-500/30 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>CERRAR SESIÓN</span>
        </button>
      </div>
    </div>
  );
};
