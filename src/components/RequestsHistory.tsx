import React, { useState } from 'react';
import { BookingRequest } from '../types';
import { QrCode, CheckCircle2, Clock, XCircle, X } from 'lucide-react';

interface RequestsHistoryProps {
  requests: BookingRequest[];
  onCancelRequest: (id: string) => void;
}

export const RequestsHistory: React.FC<RequestsHistoryProps> = ({ requests, onCancelRequest }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedQRReq, setSelectedQRReq] = useState<BookingRequest | null>(null);

  const filteredRequests = requests.filter((req) => {
    if (filter === 'active') return req.status === 'active';
    if (filter === 'completed') return req.status === 'completed' || req.status === 'cancelled';
    return true;
  });

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40">
            <CheckCircle2 className="w-3 h-3 mr-1 text-[#00F0FF]" /> ACTIVA
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            FINALIZADA
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <XCircle className="w-3 h-3 mr-1" /> CANCELADA
          </span>
        );
    }
  };

  return (
    <div className="flex-1 p-5 space-y-4 bg-[#090A0F] text-white overflow-y-auto no-scrollbar select-none">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-white uppercase tracking-wider font-heading">Historial de Solicitudes</h2>
        <span className="text-xs font-bold text-slate-400">{filteredRequests.length} registros</span>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2 border-b border-white/10 pb-3">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
              filter === f
                ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Pasadas'}
          </button>
        ))}
      </div>

      {filteredRequests.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/60 rounded-3xl p-6 border border-white/10 shadow-lg">
          <Clock className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">
            No hay solicitudes registradas en esta categoría.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-900/90 rounded-3xl p-4 border border-white/10 space-y-3 shadow-xl hover:border-[#00F0FF]/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">{req.laptopName}</h3>
                  <p className="text-[11px] text-[#00F0FF] font-bold mt-0.5">{req.seatLabel || 'Mesa A2'}</p>
                </div>
                {getStatusBadge(req.status)}
              </div>

              <div className="text-xs text-slate-300 space-y-1 bg-slate-950/60 p-3 rounded-2xl border border-white/5 font-medium">
                <p><span className="text-slate-400">Fecha:</span> {req.date}</p>
                <p><span className="text-slate-400">Horario:</span> {req.startTime} – {req.endTime}</p>
                <p><span className="text-slate-400">Ubicación:</span> {req.zoneName}</p>
              </div>

              {req.status === 'active' && (
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setSelectedQRReq(req)}
                    className="px-4 py-2 bg-[#00F0FF] text-black text-xs font-extrabold rounded-xl flex items-center space-x-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:bg-[#33f3ff] transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>MOSTRAR CÓDIGO QR</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('¿Deseas cancelar esta reserva?')) {
                        onCancelRequest(req.id);
                      }
                    }}
                    className="px-3 py-2 bg-red-500/20 text-red-300 text-xs font-bold rounded-xl border border-red-500/30 hover:bg-red-500/30 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedQRReq && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 w-full max-w-xs shadow-2xl flex flex-col items-center text-center space-y-4 relative text-white">
            <button
              onClick={() => setSelectedQRReq(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-extrabold text-white">Pase Digital de Reserva</h3>
            <div className="p-4 bg-white rounded-2xl w-48 h-48 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedQRReq.qrCodeValue)}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-bold text-[#00F0FF]">{selectedQRReq.laptopName}</p>
              <p className="text-[11px] text-slate-400">{selectedQRReq.date} ({selectedQRReq.startTime} – {selectedQRReq.endTime})</p>
              <p className="text-[10px] font-mono text-slate-400">{selectedQRReq.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
