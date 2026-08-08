import React from 'react';
import { User } from '../types';
import { ShieldCheck, Laptop } from 'lucide-react';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="pt-7 pb-3 px-5 bg-[#090A0F]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between shadow-lg select-none z-20">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <Laptop className="w-5 h-5 text-black" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-white font-heading leading-tight flex items-center space-x-1">
            <span>SpaceLap</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-mono">
              PUCP
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium truncate max-w-[170px]">
            {user.fullName.split(' ')[0]} {user.fullName.split(' ')[1]}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/15 text-[10px] font-bold text-slate-300 flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>{user.studentCode}</span>
        </div>
      </div>
    </div>
  );
};
