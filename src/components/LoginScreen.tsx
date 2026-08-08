import React, { useState } from 'react';
import { Eye, EyeOff, Laptop, ShieldCheck } from 'lucide-react';

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
    <div className="relative min-h-full w-full bg-[#031944] flex flex-col justify-between p-6 text-white overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f4c81_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      {/* Top PUCP branding header */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
        {/* Laptop icon container matching Figma design */}
        <div className="relative w-28 h-20 bg-slate-900/80 border-2 border-white/20 rounded-lg shadow-xl flex flex-col items-center justify-center p-2 mb-3">
          {/* Laptop Screen Content */}
          <div className="w-full h-full bg-[#02102b] rounded flex flex-col items-center justify-center border border-white/10 p-1">
            <div className="flex items-center space-x-1 mb-0.5">
              <ShieldCheck className="w-4 h-4 text-pucp-accent" />
              <span className="text-[10px] font-bold tracking-wider text-white">PUCP</span>
            </div>
            <div className="w-8 h-0.5 bg-pucp-accent/60 rounded" />
          </div>
          {/* Laptop Base */}
          <div className="absolute -bottom-2 w-32 h-2 bg-slate-700 rounded-b-md shadow-md" />
        </div>

        {/* App Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-heading mt-2">
          Book It
        </h1>
        <p className="text-xs text-blue-200/70 font-medium">
          Sistema de Reserva de Espacios SpaceLap
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-sm mx-auto space-y-4 my-auto">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Student Code Input */}
        <div>
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            placeholder="Código PUCP (ej. 20211038)"
            className="w-full px-4 py-3 bg-white text-slate-900 font-medium rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pucp-accent focus:border-transparent text-sm placeholder-slate-400 shadow-sm transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 bg-white text-slate-900 font-medium rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-pucp-accent focus:border-transparent text-sm placeholder-slate-400 shadow-sm transition-all pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors p-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-[10px] text-blue-200/60 font-light italic">
          * Campo obligatorio
        </p>

        {/* Remember me option */}
        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-pucp-accent focus:ring-pucp-accent accent-[#F5BE15] cursor-pointer"
          />
          <label htmlFor="remember" className="text-xs text-blue-100 font-normal cursor-pointer select-none">
            Recordar inicio de sesión
          </label>
        </div>

        {/* Primary Login Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 bg-[#F5BE15] hover:bg-[#e0ac10] active:scale-[0.99] text-slate-950 font-bold rounded-xl shadow-lg shadow-yellow-500/20 text-sm transition-all duration-150 mt-4 flex items-center justify-center space-x-2"
        >
          <span>Iniciar sesión</span>
        </button>

        {/* Forgot Password link */}
        <div className="text-center pt-2">
          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault();
              alert('Contacta al Administrador de TI PUCP o ingresa al portal del estudiante.');
            }}
            className="text-xs text-blue-200 hover:text-white underline decoration-blue-300/40 underline-offset-4 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>

      {/* Footer Info */}
      <div className="relative z-10 text-center pb-4 pt-2">
        <p className="text-[11px] text-blue-300/50 font-medium">
          PUCP &copy; 2026 SpaceLap - Grupo 6
        </p>
      </div>
    </div>
  );
};
