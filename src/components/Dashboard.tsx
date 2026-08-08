import React, { useState, useEffect } from 'react';
import { BookingRequest, User } from '../types';
import { Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
    <h2 className="text-sm font-bold text-slate-800 mb-3">Mis Solicitudes</h2>h2>
    
      {activeRequest ? (
      <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div>
      <p className="text-[11px] text-slate-500">Codigo de laptop</p>p>
      <p className="text-sm font-bold text-slate-900">{activeRequest.laptopCode}</p>p>
      </div>div>
      <div className="text-right">
      <p className="text-[11px] text-slate-500">Fecha</p>p>
      <p className="text-sm font-bold text-slate-900">{activeRequest.date}</p>p>
      </div>div>
      </div>div>
      
      <div className="flex items-center justify-between">
      <div>
      <p className="text-[11px] text-slate-500">Hora de inicio</p>p>
      <p className="text-sm font-bold text-slate-900">{activeRequest.startTime}</p>p>
      </div>div>
      <button
        onClick={() => setShowQr(true)}
        className="px-4 py-2 bg-[#042454] hover:bg-[#031944] text-white text-xs font-bold rounded-lg flex items-center space-x-1 transition-colors"
        >
      <span>Ver QR</span>span>
      <span>{'>>>'}</span>span>
      </button>button>
      </div>div>
      
      <div className="flex items-center justify-between">
      <div>
      <p className="text-[11px] text-slate-500">Hora de fin</p>p>
      <p className="text-sm font-bold text-slate-900">{activeRequest.endTime}</p>p>
      </div>div>
      <button
        onClick={() => setShowCancelConfirm(true)}
        className="px-4 py-2 bg-[#CC2121] hover:bg-[#a81b1b] text-white text-xs font-bold rounded-lg transition-colors"
        >
      Cancelar
      </button>button>
      </div>div>
      </div>div>
      ) : (
      <p className="text-sm text-slate-500 text-center py-6 italic">
      Aun no has realizado ninguna solicitud!
      </p>p>
    )}
    </div>div>
    
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
    <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center space-x-2">
    <Clock className="w-4 h-4 text-slate-500" />
    <span>Notificaciones</span>span>
    </h2>h2>
      {activeRequest && (
      <p className="text-xs text-slate-500 mb-2">
      No olvides que tienes 10 minutos de tolerancia para recoger la laptop y no perder tu reserva.
      </p>p>
    )}
    <p className="text-xs text-slate-700">
    Tiempo restante hoy: <span className="font-bold text-[#042454]">{formatTimer(secondsRemaining)}</span>span>
    </p>p>
    </div>div>
    
    <button
      onClick={onOpenNewBooking}
      disabled={!!activeRequest}
      className={`w-full py-3.5 rounded-xl text-sm font-bold transition-colors ${
        activeRequest
        ? 'bg-[#8F8E94] text-white cursor-not-allowed'
        : 'bg-[#042454] hover:bg-[#031944] text-white'
      }`}
      >
    + Nueva solicitud
    </button>button>
    
      {showCancelConfirm && activeRequest && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center space-y-4 shadow-xl">
      <p className="text-sm text-slate-800 font-medium">
      Estas seguro que quieres cancelar tu reserva?
      </p>p>
      <div className="flex space-x-3">
      <button
        onClick={() => setShowCancelConfirm(false)}
        className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold"
        >
      No
      </button>button>
      <button
        onClick={() => {
          onCancelRequest(activeRequest.id);
          setShowCancelConfirm(false);
        }}
        className="flex-1 py-2 rounded-lg bg-[#CC2121] text-white text-sm font-semibold"
        >
      Si, cancelar
      </button>button>
      </div>div>
      </div>div>
      </div>div>
    )}
    
      {showQr && activeRequest && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs space-y-4 shadow-xl relative">
      <button
        onClick={() => setShowQr(false)}
        className="absolute top-3 right-3 text-red-500 font-bold"
        >
      X
      </button>button>
      <div className="flex items-center justify-between">
      <div>
      <p className="text-xs font-bold text-[#042454]">INICIO</p>p>
      <p className="text-sm text-slate-800">{activeRequest.startTime}</p>p>
      </div>div>
      <p className="text-[11px] text-slate-500">{durationLabel(activeRequest.startTime, activeRequest.endTime)}</p>p>
      <div className="text-right">
      <p className="text-xs font-bold text-[#042454]">FIN</p>p>
      <p className="text-sm text-slate-800">{activeRequest.endTime}</p>p>
      </div>div>
      </div>div>
      <div className="flex items-center space-x-4 pt-2">
      <div>
      <p className="text-[11px] text-slate-500">Alumno</p>p>
      <p className="text-sm font-bold text-slate-900">{user.fullName}</p>p>
      <p className="text-[11px] text-slate-500 mt-2">Codigo</p>p>
      <p className="text-sm font-bold text-slate-900">{user.studentCode}</p>p>
      </div>div>
      <QRCodeSVG value={activeRequest.qrCodeValue} size={100} />
      </div>div>
      </div>div>
      </div>div>
    )}
    </div>div>
    );
};
</div>
