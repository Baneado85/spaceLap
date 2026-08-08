import React, { useState, useEffect } from 'react';
import { BookingRequest } from '../types';
import { Clock, Plus, Calendar, CheckCircle2, AlertCircle, XCircle, QrCode } from 'lucide-react';

interface DashboardProps {
  requests: BookingRequest[];
  onOpenNewBooking: () => void;
  onSelectRequest: (req: BookingRequest) => void;
  initialQuotaSeconds?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({
  requests,
  onOpenNewBooking,
  onSelectRequest,
  initialQuotaSeconds = 18000, // 5 hours
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialQuotaSeconds);

  // Live timer simulation
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

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Aprobado
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1 text-amber-600" /> Pendiente
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            Finalizado
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <XCircle className="w-3 h-3 mr-1 text-slate-500" /> Cancelado
          </span>
        );
    }
  };

  return (
    <div className="flex-1 p-5 space-y-5 bg-[#F3F4F6] overflow-y-auto">
      {/* Mis Solicitudes Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 transition-all hover:shadow-md">
        <h2 className="text-sm font-bold text-slate-800 mb-3 font-heading flex items-center justify-between">
          <span>Mis Solicitudes</span>
          {requests.length > 0 && (
            <span className="text-[11px] font-medium text-slate-500">
              {requests.length} {requests.length === 1 ? 'solicitud' : 'solicitudes'}
            </span>
          )}
        </h2>

        {requests.length === 0 ? (
          <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-xs text-slate-500 font-normal">
              ¡Aún no has realizado ninguna solicitud!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {requests.map((req) => (
              <div
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200/80 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#002B66]">{req.labName}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {req.date} &bull; {req.startTime} - {req.endTime}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-1.5">
                  {getStatusBadge(req.status)}
                  <button className="text-[10px] text-blue-600 font-semibold flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <QrCode className="w-3 h-3 mr-1" /> QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notificaciones Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 transition-all hover:shadow-md">
        <h2 className="text-sm font-bold text-slate-800 mb-3 font-heading flex items-center">
          <Clock className="w-4 h-4 text-[#002B66] mr-1.5" />
          <span>Notificaciones</span>
        </h2>

        <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Tiempo restante hoy:{' '}
            <span className="font-bold text-[#002B66] tracking-wide font-mono">
              {formatTimer(secondsRemaining)}
            </span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Límite diario asignado para laboratorios PUCP: 5h 00m.
          </p>
        </div>
      </div>

      {/* Action Button: Nueva solicitud */}
      <div className="pt-2">
        <button
          onClick={onOpenNewBooking}
          className="w-full py-4 px-6 bg-[#002B66] hover:bg-[#001D47] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-blue-900/10 text-sm transition-all duration-150 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5 text-pucp-accent" />
          <span>Nueva solicitud</span>
        </button>
      </div>
    </div>
  );
};
