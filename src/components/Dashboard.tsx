import React, { useState, useEffect } from 'react';
import { BookingRequest, User } from '../types';
import { Clock, Hash } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LaptopArt } from './LaptopArt';

interface DashboardProps {
  activeRequest: BookingRequest | null;
  user: User;
  onOpenNewBooking: () => void;
  onCancelRequest: (id: string) => void;
  dailyQuotaSeconds?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  activeRequest,
  user,
  onOpenNewBooking,
  onCancelRequest,
  dailyQuotaSeconds = 18000,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(dailyQuotaSeconds);
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
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}min ${String(seconds).padStart(2, '0')}s`;
  };

  const durationLabel = (start: string, end: string) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const totalMin = (eh * 60 + em) - (sh * 60 + sm);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h}h${m > 0 ? ' ' + m + 'min' : ''}`;
  };

  return (
    <div className="flex-1 p-5 space-y-5 bg-[#F3F4F6] overflow-y-auto">
      <div className="relative overflow-hidden rounded-2xl glass-panel-dark p-5 text-white shadow-lg">
        <span className="blob w-28 h-28 bg-pucp-sky/40 -top-10 -right-10" />
        <span className="blob w-24 h-24 bg-pucp-skyDeep/30 -bottom-12 -left-8" />
        <h2 className="relative text-sm font-bold mb-3">Mis Solicitudes</h2>

        {activeRequest ? (
          <div className="relative space-y-4">
            <div className="flex items-center space-x-3">
              <LaptopArt brand={activeRequest.laptopBrand} size="sm" className="flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-pucp-skyLight">Laptop reservada</p>
                <p className="text-sm font-bold text-white truncate">{activeRequest.laptopName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-pucp-skyLight">Fecha</p>
                <p className="text-sm font-bold text-white">{activeRequest.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-pucp-skyLight">Horario</p>
                <p className="text-sm font-bold text-white">{activeRequest.startTime} – {activeRequest.endTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setShowQr(true)}
                className="px-4 py-2 bg-pucp-sky hover:bg-pucp-skyDeep text-pucp-dark hover:text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition-colors"
              >
                <span>Ver QR</span>
                <span>{'>>>'}</span>
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="px-4 py-2 bg-[#CC2121] hover:bg-[#a81b1b] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="relative text-sm text-pucp-skyLight/90 text-center py-6 italic">
            ¡Aún no has realizado ninguna solicitud!
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
        <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Notificaciones</span>
        </h2>
        {activeRequest && (
          <p className="text-xs text-slate-500 mb-2">
            No olvides que tienes 10 minutos de tolerancia para recoger la laptop y no perder tu reserva.
          </p>
        )}
        <p className="text-xs text-slate-700">
          Tiempo restante hoy:{' '}
          <span className="font-bold text-pucp-navy">{formatTimer(secondsRemaining)}</span>
        </p>
      </div>

      <button
        onClick={onOpenNewBooking}
        disabled={!!activeRequest}
        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-colors ${
          activeRequest
            ? 'bg-[#8F8E94] text-white cursor-not-allowed'
            : 'bg-pucp-navy hover:bg-pucp-dark text-white shadow-md shadow-pucp-sky/20'
        }`}
      >
        + Nueva solicitud
      </button>

      {showCancelConfirm && activeRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center space-y-4 shadow-xl">
            <p className="text-sm text-slate-800 font-medium">
              ¿Estás seguro que quieres cancelar tu reserva?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold"
              >
                No
              </button>
              <button
                onClick={() => {
                  onCancelRequest(activeRequest.id);
                  setShowCancelConfirm(false);
                }}
                className="flex-1 py-2 rounded-lg bg-[#CC2121] text-white text-sm font-semibold"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showQr && activeRequest && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs space-y-4 shadow-xl relative">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 text-red-500 font-bold text-lg"
            >
              ✕
            </button>
            <div className="text-center pt-2">
              <h4 className="text-sm font-bold text-slate-900">{activeRequest.laptopName}</h4>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-xs font-bold text-pucp-navy">INICIO</p>
                <p className="text-sm text-slate-800">{activeRequest.startTime}</p>
              </div>
              <p className="text-[11px] text-slate-500">
                {durationLabel(activeRequest.startTime, activeRequest.endTime)}
              </p>
              <div className="text-right">
                <p className="text-xs font-bold text-pucp-navy">FIN</p>
                <p className="text-sm text-slate-800">{activeRequest.endTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <div>
                <p className="text-[11px] text-slate-500">Alumno</p>
                <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                <p className="text-[11px] text-slate-500 mt-2">Codigo</p>
                <p className="text-sm font-bold text-slate-900">{user.studentCode}</p>
              </div>
              <QRCodeSVG value={activeRequest.qrCodeValue} size={100} />
            </div>
            <div className="glass-panel rounded-xl p-2.5 flex items-center space-x-2 text-[11px] text-slate-600">
              <Hash className="w-3.5 h-3.5 text-pucp-skyDeep flex-shrink-0" />
              <span>Nº de equipo (especificaciones): <span className="font-mono font-semibold">{activeRequest.laptopCode}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
