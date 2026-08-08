import React, { useState } from 'react';
import { Eye, EyeOff, Laptop, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [studentCode, setStudentCode] = useState('20211038');
  const [password, setPassword] = useState('45667908');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCode.trim()) {
      setError('Por favor ingresa tu código PUCP');
      return;
    }
    if (!password.trim()) {
      setError('Por favor ingresa tu contraseña');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="relative min-h-full w-full bg-[#090A0F] flex flex-col justify-between p-6 text-white overflow-hidden select-none">
      {/* Background Cyber Glow */}
      <span className="blob w-64 h-64 bg-[#00F0FF]/15 -top-20 -left-20" />
      <span className="blob w-64 h-64 bg-purple-600/15 -bottom-20 -right-20" />

      {/* Top PUCP Branding */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#00F0FF] to-blue-600 p-0.5 shadow-[0_0_35px_rgba(0,240,255,0.4)] mb-4 flex items-center justify-center">
          <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
            <Laptop className="w-8 h-8 text-[#00F0FF]" />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-wider text-white font-heading">
          SpaceLap
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Sistema de Reserva de Laptops PUCP
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-sm mx-auto space-y-4 my-auto bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded-xl text-center font-semibold">
            {error}
          </div>
        )}

        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">CÓDIGO ALUMNO PUCP</label>
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            placeholder="Ej. 20211038"
            className="w-full px-4 py-3 bg-slate-950 text-white font-semibold rounded-xl border border-white/15 focus:outline-none focus:border-[#00F0FF] text-sm placeholder-slate-500 transition-all"
          />
        </div>

        <div className="relative">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">CONTRASEÑA</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-950 text-white font-semibold rounded-xl border border-white/15 focus:outline-none focus:border-[#00F0FF] text-sm placeholder-slate-500 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-[#00F0FF] focus:ring-[#00F0FF] accent-[#00F0FF] cursor-pointer"
          />
          <label htmlFor="remember" className="text-xs text-slate-300 font-medium cursor-pointer">
            Recordar en este dispositivo
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-black uppercase text-xs tracking-wider rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all active:scale-[0.98] mt-2"
        >
          Iniciar sesión
        </button>
      </form>

      <div className="relative z-10 text-center pb-2 pt-2">
        <p className="text-[11px] text-slate-500 font-medium">
          PUCP &copy; 2026 SpaceLap · Sistema de Reserva
        </p>
      </div>
    </div>
  );
};
