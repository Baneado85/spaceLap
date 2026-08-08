import React, { useState, useEffect } from 'react';
import { BookingRequest, Laptop, User, LaptopCategory } from '../types';
import { Clock, Calendar, Sparkles, QrCode, XCircle, ArrowRight, Laptop as LaptopIcon } from 'lucide-react';
import { LaptopHero } from './LaptopHero';
import { availableLaptops } from '../data/mockData';

interface DashboardProps {
  activeRequest: BookingRequest | null;
  user: User;
  onOpenNewBooking: () => void;
  onCancelRequest: (id: string) => void;
  onSelectFeaturedLaptop: (laptop: Laptop) => void;
  dailyQuotaSeconds?: number;
}

const categories: { key: LaptopCategory; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'popular', label: 'Más Populares' },
  { key: 'macbook', label: 'Apple Silicon' },
  { key: 'gaming', label: 'Gaming & AI' },
  { key: 'ultrabook', label: 'Ultrabooks' },
];

export const Dashboard: React.FC<DashboardProps> = ({
  activeRequest,
  user,
  onOpenNewBooking,
  onCancelRequest,
  onSelectFeaturedLaptop,
  dailyQuotaSeconds = 18000,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(dailyQuotaSeconds);
  const [selectedCategory, setSelectedCategory] = useState<LaptopCategory>('all');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m de cuota hoy`;
  };

  const filteredLaptops = availableLaptops.filter((laptop) => {
    if (selectedCategory === 'all') return true;
    return laptop.category === selectedCategory;
  });

  return (
    <div className="flex-1 bg-[#090A0F] text-white p-4 sm:p-5 space-y-5 overflow-y-auto no-scrollbar select-none">
      {/* Category Pill Filters (Top Dribbble Bar) */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {categories.map((cat) => {
          const active = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 ${
                active
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_18px_rgba(0,240,255,0.5)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Massive Bold Date Display (Matching Dribbble Movie Concept Header) */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#00F0FF] font-extrabold">
            CATÁLOGO DISPONIBLE
          </p>
          <h1 className="text-3xl font-black text-white tracking-wider uppercase font-heading">
            HOY, 12 JUN
          </h1>
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Active Booking Ticket Card (If User Has Reservation) */}
      {activeRequest && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00F0FF]/15 via-slate-900 to-slate-900 p-5 border border-[#00F0FF]/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-extrabold uppercase tracking-wider border border-[#00F0FF]/30">
              RESERVA ACTIVA · PASE DIGITAL
            </span>
            <span className="text-[11px] font-bold text-slate-400">{activeRequest.id}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-black text-white">{activeRequest.laptopName}</h3>
              <p className="text-xs text-slate-300 font-semibold">{activeRequest.zoneName}</p>
              <p className="text-[11px] text-[#00F0FF] font-bold mt-0.5">{activeRequest.seatLabel || 'Desk B2'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase">HORARIO</p>
              <p className="text-sm font-extrabold text-[#FFB800]">{activeRequest.startTime} – {activeRequest.endTime}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setShowQr(true)}
              className="flex-1 py-2.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>MOSTRAR CÓDIGO QR</span>
            </button>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold text-xs rounded-xl border border-red-500/40 transition-colors"
            >
              CANCELAR
            </button>
          </div>
        </div>
      )}

      {/* Vertical Stack Carousel of Laptop Posters (Dribbble Ref 1 & 2) */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            EQUIPOS RECOMENDADOS ({filteredLaptops.length})
          </h2>
          <span className="text-[11px] text-[#00F0FF] font-bold cursor-pointer">
            Desliza verticalmente ↓
          </span>
        </div>

        <div className="space-y-5">
          {filteredLaptops.map((laptop) => (
            <div
              key={laptop.id}
              onClick={() => onSelectFeaturedLaptop(laptop)}
              className="cursor-pointer"
            >
              <LaptopHero laptop={laptop} size="card" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <button
        onClick={onOpenNewBooking}
        disabled={!!activeRequest}
        className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-2xl ${
          activeRequest
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            : 'bg-gradient-to-r from-[#00F0FF] to-[#00a8ff] text-black shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-[1.01] active:scale-[0.99]'
        }`}
      >
        <LaptopIcon className="w-4 h-4" />
        <span>+ RESERVAR PUESTO DE LAPTOP</span>
      </button>

      {/* QR Modal */}
      {showQr && activeRequest && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 w-full max-w-xs text-center space-y-4 shadow-2xl relative text-white">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-black text-white">{activeRequest.laptopName}</h3>
            <p className="text-xs text-[#00F0FF] font-bold">{activeRequest.zoneName}</p>

            <div className="bg-white p-4 rounded-2xl flex items-center justify-center w-48 h-48 mx-auto shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeRequest.qrCodeValue)}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Código: {activeRequest.id}
            </p>
          </div>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {showCancelConfirm && activeRequest && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 w-full max-w-xs text-center space-y-4 shadow-2xl text-white">
            <p className="text-sm font-bold text-slate-200">
              ¿Estás seguro que deseas cancelar tu reserva activa?
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
              >
                No, mantener
              </button>
              <button
                onClick={() => {
                  onCancelRequest(activeRequest.id);
                  setShowCancelConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
