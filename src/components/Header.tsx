import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="pt-6 pb-4 px-6 bg-slate-50 border-b border-slate-200 flex flex-col items-start justify-center shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight text-[#002B66] font-heading">
        Book It
      </h1>
      <p className="text-xs text-slate-500 font-medium mt-0.5">
        {user.email}
      </p>
    </div>
  );
};
