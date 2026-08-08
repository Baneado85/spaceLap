import React, { useState } from 'react';
import { availableLabs } from '../data/mockData';
import { LabSpace, BookingRequest } from '../types';
import { X, Check, Calendar as CalendarIcon, Clock, Laptop, ArrowRight, ArrowLeft, QrCode, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

interface NewBookingWizardProps {
  onClose: () => void;
  onAddRequest: (request: BookingRequest) => void;
}

export const NewBookingWizard: React.FC<NewBookingWizardProps> = ({ onClose, onAddRequest }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLab, setSelectedLab] = useState<LabSpace>(availableLabs[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ start: string; end: string; duration: number }>({
    start: '12:00',
    end: '14:00',
    duration: 120,
  });
  const [purpose, setPurpose] = useState('Proyecto de Curso / Práctica');
  const [createdRequest, setCreatedRequest] = useState<BookingRequest | null>(null);

  const timeSlots = [
    { start: '08:00', end: '10:00', duration: 120 },
    { start: '10:00', end: '12:00', duration: 120 },
    { start: '12:00', end: '14:00', duration: 120 },
    { start: '14:00', end: '16:00', duration: 120 },
    { start: '16:00', end: '18:00', duration: 120 },
    { start: '18:00', end: '20:00', duration: 120 },
  ];

  const handleConfirm = () => {
    const randomId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: BookingRequest = {
      id: randomId,
      labId: selectedLab.id,
      labName: selectedLab.name,
      building: selectedLab.building,
      date: selectedDate,
      startTime: selectedTimeSlot.start,
      endTime: selectedTimeSlot.end,
      durationMinutes: selectedTimeSlot.duration,
      purpose: purpose,
      status: 'approved',
      qrCodeValue: `SPACELAP-PUCP-20211038-${randomId}`,
      createdAt: new Date().toLocaleString(),
    };

    setCreatedRequest(newReq);
    onAddRequest(newReq);
    setStep(4);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback if canvas error
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto max-h-[700px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 px-6 bg-[#002B66] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-200">
              Paso {step} de 4
            </span>
            <h3 className="text-base font-bold font-heading">
              {step === 1 && 'Selecciona un Espacio'}
              {step === 2 && 'Fecha y Horario'}
              {step === 3 && 'Motivo de Reserva'}
              {step === 4 && '¡Reserva Confirmada!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* STEP 1: Select Space */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Elige el laboratorio o cubículo PUCP que necesitas:
              </p>
              {availableLabs.map((lab) => (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLab(lab)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedLab.id === lab.id
                      ? 'border-[#002B66] bg-blue-50/60 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{lab.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{lab.building}</p>
                    </div>
                    {selectedLab.id === lab.id && (
                      <div className="w-5 h-5 bg-[#002B66] text-white rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {lab.specs.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center">
                    <Laptop className="w-3 h-3 mr-1 text-emerald-600" />
                    {lab.availablePCs} equipos disponibles ahora
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Fecha de Reserva
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002B66] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bloque Horario Disponible
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, i) => {
                    const isSelected =
                      selectedTimeSlot.start === slot.start && selectedTimeSlot.end === slot.end;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#002B66] bg-[#002B66] text-white shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Clock className="w-4 h-4 mb-1 opacity-80" />
                        <span>
                          {slot.start} - {slot.end}
                        </span>
                        <span className="text-[10px] opacity-75 font-normal">2 horas</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Purpose */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Finalidad de la Reserva
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#002B66] focus:outline-none"
                >
                  <option value="Proyecto de Curso / Práctica">Proyecto de Curso / Práctica</option>
                  <option value="Estudio Individual de Exámenes">Estudio Individual de Exámenes</option>
                  <option value="Trabajo de Investigación / Tesis">Trabajo de Investigación / Tesis</option>
                  <option value="Reunión de Equipo de Ingeniería">Reunión de Equipo de Ingeniería</option>
                </select>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                  Resumen de la Solicitud
                </h4>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>
                    <span className="font-semibold text-slate-800">Espacio:</span> {selectedLab.name}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Ubicación:</span> {selectedLab.building}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Fecha:</span> {selectedDate}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Horario:</span> {selectedTimeSlot.start} -{' '}
                    {selectedTimeSlot.end} (2 hrs)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success & QR Code */}
          {step === 4 && createdRequest && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Solicitud Registrada con Éxito
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Presenta este código QR en el ingreso al laboratorio
                </p>
              </div>

              {/* QR Code */}
              <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
                <QRCodeSVG value={createdRequest.qrCodeValue} size={150} />
                <p className="text-[10px] font-mono text-slate-500 font-bold mt-2">
                  {createdRequest.id}
                </p>
              </div>

              <div className="w-full text-left p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-slate-600 space-y-1">
                <p>
                  <strong className="text-[#002B66]">Laboratorio:</strong> {createdRequest.labName}
                </p>
                <p>
                  <strong className="text-[#002B66]">Fecha y Hora:</strong> {createdRequest.date} ({createdRequest.startTime} - {createdRequest.endTime})
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="px-5 py-2.5 bg-[#002B66] hover:bg-[#001D47] text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow transition-colors ml-auto"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 bg-[#F5BE15] hover:bg-[#e0ac10] text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 shadow transition-colors ml-auto"
            >
              <span>Confirmar Reserva</span>
            </button>
          )}

          {step === 4 && (
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#002B66] text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Cerrar y Volver a Inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
