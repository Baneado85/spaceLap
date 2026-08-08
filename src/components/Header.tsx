import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-4 px-6 bg-gradient-to-r from-pucp-skyLight/60 via-slate-50 to-slate-50 border-b border-slate-200 flex flex-col items-start justify-center shadow-sm">
      <span className="blob w-24 h-24 bg-pucp-sky/30 -top-10 -right-6" />
      <h1 className="relative text-2xl font-bold tracking-tight text-[#002B66] font-heading">
        Book It
      </h1>
      <p className="relative text-xs text-slate-500 font-medium mt-0.5">
        {user.email}
      </p>
    </div>
  );
};
