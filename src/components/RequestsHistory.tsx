import React, { useState } from 'react';
import { BookingRequest } from '../types';
import { QrCode, CheckCircle2, Clock, XCircle, X, Hash } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LaptopArt } from './LaptopArt';

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
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Activa
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
            Finalizado
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
            <XCircle className="w-3 h-3 mr-1 text-slate-500" /> Cancelado
          </span>
        );
    }
  };

  return (
    <div className="flex-1 p-5 space-y-4 bg-[#F3F4F6] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Historial de Solicitudes</h2>
        <span className="text-xs font-medium text-slate-500">{filteredRequests.length} registros</span>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? 'bg-[#002B66] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Pasadas'}
          </button>
        ))}
      </div>

      {filteredRequests.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">
            No hay solicitudes registradas en esta categoría.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <LaptopArt brand={req.laptopBrand} size="sm" className="flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#002B66] truncate">{req.laptopName}</h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{req.laptopModel}</p>
                  </div>
                </div>
                {getStatusBadge(req.status)}
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <p><span className="font-semibold text-slate-700">Fecha:</span> {req.date}</p>
                <p>
                  <span className="font-semibold text-slate-700">Horario:</span>{' '}
                  {req.startTime} – {req.endTime}
                </p>
                <p><span className="font-semibold text-slate-700">Ubicación:</span> {req.zoneName}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                {req.status === 'active' && (
                  <button
                    onClick={() => setSelectedQRReq(req)}
                    className="px-3 py-1.5 bg-[#002B66] text-white text-[11px] font-bold rounded-lg flex items-center space-x-1 hover:bg-[#001D47] transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Ver QR</span>
                  </button>
                )}
                {req.status === 'active' && (
                  <button
                    onClick={() => {
                      if (confirm('¿Deseas cancelar esta reserva?')) {
                        onCancelRequest(req.id);
                      }
                    }}
                    className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-semibold rounded-lg flex items-center space-x-1 transition-colors ml-auto"
                  >
                    <span>Cancelar</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedQRReq && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl flex flex-col items-center text-center space-y-4 relative">
            <button
              onClick={() => setSelectedQRReq(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-slate-900 pt-2">Pase Digital de Ingreso PUCP</h3>
            <div className="p-3 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
              <QRCodeSVG value={selectedQRReq.qrCodeValue} size={160} />
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-[#002B66]">{selectedQRReq.laptopName}</p>
              <p className="text-[11px]">
                {selectedQRReq.date} ({selectedQRReq.startTime} – {selectedQRReq.endTime})
              </p>
              <p className="text-[11px]">{selectedQRReq.zoneName}</p>
              <p className="text-[10px] font-mono text-slate-400 pt-1">{selectedQRReq.id}</p>
            </div>
            <div className="w-full glass-panel rounded-xl p-2.5 flex items-center justify-center space-x-2 text-[11px] text-slate-600">
              <Hash className="w-3.5 h-3.5 text-pucp-skyDeep flex-shrink-0" />
              <span>Nº de equipo (especificaciones): <span className="font-mono font-semibold">{selectedQRReq.laptopCode}</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
