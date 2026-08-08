import React, { useState } from 'react';
import { availableLaptops, campusZonesList } from '../data/mockData';
import { Laptop, BookingRequest, TimeSlot, CampusZone, LabSeat } from '../types';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, MapPin, Laptop as LaptopIcon, Calendar, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LabSeatGrid } from './LabSeatGrid';
import { CampusMap } from './CampusMap';

type Step = 1 | 2 | 3 | 4;

interface NewBookingWizardProps {
  initialLaptop?: Laptop | null;
  onClose: () => void;
  onAddRequest: (request: BookingRequest) => void;
}

export const NewBookingWizard: React.FC<NewBookingWizardProps> = ({ initialLaptop, onClose, onAddRequest }) => {
  const [step, setStep] = useState<Step>(initialLaptop ? 2 : 1);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(initialLaptop || availableLaptops[0]);
  const [selectedZone, setSelectedZone] = useState<CampusZone>(campusZonesList[0]);
  const [selectedSeat, setSelectedSeat] = useState<LabSeat | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [createdRequest, setCreatedRequest] = useState<BookingRequest | null>(null);

  const handleSeatAndSlotChosen = (seat: LabSeat, slot: TimeSlot) => {
    setSelectedSeat(seat);
    setSelectedSlot(slot);

    if (!selectedLaptop) return;

    const randomId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = 'HOY, 12 JUN';

    const newReq: BookingRequest = {
      id: randomId,
      laptopId: selectedLaptop.id,
      laptopName: selectedLaptop.name,
      laptopBrand: selectedLaptop.brand,
      laptopCode: selectedLaptop.code,
      laptopModel: selectedLaptop.model,
      zoneName: selectedZone.name,
      seatLabel: `Mesa ${seat.label} (${seat.row === 1 ? 'Fila Frontal' : 'Fila Central'})`,
      date: todayStr,
      startTime: slot.start,
      endTime: slot.end,
      durationMinutes: 180,
      status: 'active',
      qrCodeValue: `SPACELAP-PUCP-20211038-${randomId}`,
      createdAt: new Date().toLocaleString('es-PE'),
    };

    setCreatedRequest(newReq);
    onAddRequest(newReq);
    setStep(4);

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 text-white">
      <div className="bg-[#090A0F] w-full max-w-md h-[92vh] sm:h-auto max-h-[820px] rounded-t-[36px] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden border border-white/15">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#00F0FF]">
              PASO {step} DE 4
            </span>
            <h3 className="text-base font-extrabold text-white">
              {step === 1 && 'Selecciona Laptop'}
              {step === 2 && 'Ubicación / Pabellón'}
              {step === 3 && 'Puesto & Horario (Grid)'}
              {step === 4 && '¡Reserva Confirmada!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-[#090A0F] flex flex-col">
          {/* STEP 1: Select Laptop */}
          {step === 1 && (
            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-400 font-medium">
                Elige el modelo de laptop que deseas reservar para tu sesión:
              </p>

              <div className="space-y-3">
                {availableLaptops.map((laptop) => {
                  const isSelected = selectedLaptop?.id === laptop.id;
                  return (
                    <div
                      key={laptop.id}
                      onClick={() => setSelectedLaptop(laptop)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <LaptopIcon className={`w-8 h-8 ${isSelected ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                        <div>
                          <p className="text-xs font-bold text-[#00F0FF]">{laptop.brand}</p>
                          <h4 className="text-sm font-extrabold text-white">{laptop.name}</h4>
                          <p className="text-[11px] text-slate-400">{laptop.processor} · {laptop.ram}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-[#00F0FF] text-black rounded-full flex items-center justify-center font-bold">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-extrabold text-xs rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] tracking-wider uppercase mt-4"
              >
                Continuar a Selección de Pabellón
              </button>
            </div>
          )}

          {/* STEP 2: Select Zone / Lab */}
          {step === 2 && (
            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-400 font-medium">
                Selecciona el laboratorio o pabellón del campus PUCP:
              </p>

              <CampusMap
                selectedZoneId={selectedZone.id}
                onSelect={(z) => setSelectedZone(z)}
              />

              <button
                onClick={() => setStep(3)}
                className="w-full py-4 bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-extrabold text-xs rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] tracking-wider uppercase mt-4"
              >
                Continuar a Selección de Puesto
              </button>
            </div>
          )}

          {/* STEP 3: Cinema-style Station Grid (Screen 3 Dribbble) */}
          {step === 3 && selectedLaptop && (
            <LabSeatGrid
              laptop={selectedLaptop}
              onSelectSeatAndSlot={handleSeatAndSlotChosen}
            />
          )}

          {/* STEP 4: Success Ticket Screen */}
          {step === 4 && createdRequest && (
            <div className="p-6 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-extrabold">
                  PASE DE RESERVA DIGITAL GENERADO
                </span>
                <h2 className="text-2xl font-black text-white mt-1">¡Reserva Confirmada!</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Muestra tu código QR al ingresar al laboratorio.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="w-full bg-slate-900 border border-white/15 rounded-3xl p-5 text-left space-y-3 shadow-2xl relative">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-[10px] font-bold text-slate-400">PASE SPACELAP</span>
                  <span className="text-xs font-mono font-bold text-[#FFB800]">{createdRequest.id}</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">EQUIPO</p>
                  <p className="text-base font-extrabold text-white">{createdRequest.laptopName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">PUESTO</p>
                    <p className="font-extrabold text-[#00F0FF]">{createdRequest.seatLabel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">HORARIO</p>
                    <p className="font-extrabold text-white">{createdRequest.startTime} – {createdRequest.endTime}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-[#00F0FF] text-black font-extrabold text-xs rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] tracking-wider uppercase"
              >
                VOLVER AL INICIO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
