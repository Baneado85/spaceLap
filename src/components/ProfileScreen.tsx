import React from 'react';
import { User as UserType } from '../types';
import { User, LogOut, Award, BookOpen, Building2 } from 'lucide-react';

interface ProfileScreenProps {
  user: UserType;
  onOpenLogoutModal: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onOpenLogoutModal }) => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-[#F3F4F6] overflow-y-auto flex flex-col items-center justify-between text-center">
      <div className="w-full flex flex-col items-center my-auto space-y-5">
        {/* Profile Avatar Container matching Figma */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center text-slate-400">
            <User className="w-12 h-12" />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white" title="Estado: Estudiante Activo PUCP" />
        </div>

        {/* Student Details */}
        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-slate-900 tracking-wide font-heading uppercase">
            {user.fullName}
          </h2>
          <p className="text-xs font-semibold text-[#002B66] font-mono">
            {user.studentCode}
          </p>
        </div>

        {/* Faculty and Major Cards */}
        <div className="w-full max-w-xs bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 text-left">
          <div className="flex items-center space-x-3 text-xs">
            <Building2 className="w-4 h-4 text-[#002B66] flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Facultad</span>
              <span className="font-bold text-slate-800">{user.faculty}</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <div className="flex items-center space-x-3 text-xs">
            <BookOpen className="w-4 h-4 text-[#002B66] flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Especialidad</span>
              <span className="font-bold text-slate-800">{user.major}</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <div className="flex items-center space-x-3 text-xs">
            <Award className="w-4 h-4 text-pucp-accent flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Nivel de Acceso</span>
              <span className="font-bold text-slate-800">Pregrado - Acceso Total Labs V</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Button matching Figma */}
      <div className="w-full max-w-xs pb-4">
        <button
          onClick={onOpenLogoutModal}
          className="w-full py-3.5 px-6 bg-[#002B66] hover:bg-[#001D47] active:scale-[0.99] text-white font-bold rounded-xl shadow-md text-xs transition-all flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4 text-blue-200" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
