import React, { useMemo, useState } from 'react';
import { availableLaptops } from '../data/mockData';
import { Laptop, BookingRequest, TimeSlot } from '../types';
import { X, Check, Clock, ArrowRight, ArrowLeft, Sparkles, Cpu, MemoryStick, MonitorSmartphone, Hash } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { LaptopArt } from './LaptopArt';

interface NewBookingWizardProps {
  onClose: () => void;
  onAddRequest: (request: BookingRequest) => void;
}

export const NewBookingWizard: React.FC<NewBookingWizardProps> = ({ onClose, onAddRequest }) => {
  const brands = useMemo(
    () => Array.from(new Set(availableLaptops.map((l) => l.brand))),
    []
  );

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBrand, setSelectedBrand] = useState<string>(brands[0]);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [createdRequest, setCreatedRequest] = useState<BookingRequest | null>(null);

  const filteredLaptops = availableLaptops.filter(
    (l) => l.brand === selectedBrand && l.available
  );

  const handleConfirm = () => {
    if (!selectedLaptop || !startTime || !endTime) return;

    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const durationMinutes = (eh * 60 + em) - (sh * 60 + sm);

    const randomId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const newReq: BookingRequest = {
      id: randomId,
      laptopId: selectedLaptop.id,
      laptopName: selectedLaptop.name,
      laptopBrand: selectedLaptop.brand,
      laptopCode: selectedLaptop.code,
      laptopModel: selectedLaptop.model,
      date: today,
      startTime,
      endTime,
      durationMinutes,
      status: 'active',
      qrCodeValue: `SPACELAP-PUCP-20211038-${randomId}`,
      createdAt: new Date().toLocaleString(),
    };

    setCreatedRequest(newReq);
    onAddRequest(newReq);
    setStep(4);

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleSlotSelect = (slot: TimeSlot, laptop: Laptop) => {
    setSelectedLaptop(laptop);
    setSelectedSlot(slot);
    setStartTime(slot.start);
    setEndTime(slot.end);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto max-h-[720px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 bg-glass-sky glass-panel-dark text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-pucp-skyLight">
              Paso {step} de 4
            </span>
            <h3 className="text-base font-bold">
              {step === 1 && 'Elige una marca'}
              {step === 2 && 'Laptops disponibles'}
              {step === 3 && 'Horario de reserva'}
              {step === 4 && '¡Reserva confirmada!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-pucp-skyLight/30 to-white">
          {/* STEP 1: Select brand */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">Elige la marca de laptop que prefieres:</p>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <div
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`relative p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedBrand === brand
                        ? 'border-pucp-navy shadow-md'
                        : 'border-slate-200 hover:border-pucp-sky/60 bg-white'
                    }`}
                  >
                    <LaptopArt brand={brand} size="md" />
                    <div className="flex items-center justify-between mt-2">
                      <h4 className="text-xs font-bold text-slate-900">{brand}</h4>
                      {selectedBrand === brand && (
                        <div className="w-5 h-5 bg-pucp-navy text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {availableLaptops.filter((l) => l.brand === brand && l.available).length} disponibles
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Available laptops with slots */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-[11px] text-slate-500">
                Cada laptop cuenta con una disponibilidad inicial de 8 horas durante el transcurso del día.
              </p>
              {filteredLaptops.length === 0 ? (
                <p className="text-center text-slate-500 text-xs py-8">
                  No hay laptops {selectedBrand} disponibles hoy.
                </p>
              ) : (
                filteredLaptops.map((laptop) => (
                  <LaptopSlotCard
                    key={laptop.id}
                    laptop={laptop}
                    selectedLaptop={selectedLaptop}
                    selectedSlot={selectedSlot}
                    onSelectSlot={(slot) => handleSlotSelect(slot, laptop)}
                  />
                ))
              )}
            </div>
          )}

          {/* STEP 3: Confirm time */}
          {step === 3 && selectedLaptop && (
            <div className="space-y-5">
              <div className="relative rounded-2xl overflow-hidden">
                <LaptopArt brand={selectedLaptop.brand} size="lg" />
                <div className="mt-3 text-center">
                  <h4 className="text-sm font-extrabold text-slate-900">{selectedLaptop.name}</h4>
                  <p className="text-[11px] text-slate-500">{selectedLaptop.brand}</p>
                </div>
              </div>

              <SpecsPanel laptop={selectedLaptop} />

              <p className="text-[11px] text-slate-500 text-center">
                Selecciona tu horario de reserva según los horarios disponibles.
              </p>
              <div className="text-[11px] text-slate-500 text-right mb-1">Formato de 24 horas</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Ingrese la hora de inicio:</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-28 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-pucp-navy focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Ingrese la hora de fin:</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-28 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-pucp-navy focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && createdRequest && selectedLaptop && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Solicitud registrada con éxito</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Presenta este código QR al recoger la laptop
                </p>
              </div>
              <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
                <QRCodeSVG value={createdRequest.qrCodeValue} size={150} />
                <p className="text-[10px] font-mono text-slate-500 font-bold mt-2">{createdRequest.id}</p>
              </div>
              <div className="w-full text-left p-3 glass-panel rounded-xl text-[11px] text-slate-700 space-y-1">
                <p><strong className="text-pucp-navy">Laptop:</strong> {createdRequest.laptopName}</p>
                <p><strong className="text-pucp-navy">Horario:</strong> {createdRequest.startTime} – {createdRequest.endTime}</p>
                <p className="text-red-600 text-[10px]">
                  Recuerda: De no recoger el dispositivo después de 10 minutos de iniciado la reserva esta se cancelará automáticamente.
                </p>
              </div>
              <SpecsPanel laptop={selectedLaptop} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Volver</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              disabled={step === 2 && !selectedSlot}
              className="px-5 py-2.5 bg-pucp-navy hover:bg-pucp-dark disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow transition-colors ml-auto"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              onClick={handleConfirm}
              disabled={!startTime || !endTime}
              className="px-5 py-2.5 bg-pucp-navy hover:bg-pucp-dark disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow transition-colors ml-auto"
            >
              <span>Aceptar</span>
            </button>
          )}

          {step === 4 && (
            <button
              onClick={onClose}
              className="w-full py-3 bg-pucp-navy text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Cerrar y volver a inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SpecsPanel: React.FC<{ laptop: Laptop }> = ({ laptop }) => (
  <div className="glass-panel rounded-xl p-3 grid grid-cols-2 gap-2.5 text-[11px] text-slate-700">
    <SpecItem icon={<Cpu className="w-3.5 h-3.5 text-pucp-skyDeep" />} label="Procesador" value={laptop.processor} />
    <SpecItem icon={<MemoryStick className="w-3.5 h-3.5 text-pucp-skyDeep" />} label="Memoria RAM" value={laptop.ram} />
    <SpecItem icon={<MonitorSmartphone className="w-3.5 h-3.5 text-pucp-skyDeep" />} label="Sistema" value={laptop.os} />
    <SpecItem icon={<Hash className="w-3.5 h-3.5 text-pucp-skyDeep" />} label="Nº de equipo" value={laptop.code} mono />
  </div>
);

const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string; mono?: boolean }> = ({
  icon, label, value, mono,
}) => (
  <div className="flex items-start space-x-2">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">{label}</p>
      <p className={`text-xs font-bold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  </div>
);

interface LaptopSlotCardProps {
  laptop: Laptop;
  selectedLaptop: Laptop | null;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

const LaptopSlotCard: React.FC<LaptopSlotCardProps> = ({
  laptop, selectedLaptop, selectedSlot, onSelectSlot,
}) => {
  const [expanded, setExpanded] = useState(false);
  const totalMins = laptop.availableSlots.reduce((acc, s) => {
    const [sh, sm] = s.start.split(':').map(Number);
    const [eh, em] = s.end.split(':').map(Number);
    return acc + (eh * 60 + em) - (sh * 60 + sm);
  }, 0);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const label = m > 0 ? `${h}h ${m}min` : `${h}h`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center space-x-3 p-3 text-left"
      >
        <LaptopArt brand={laptop.brand} size="sm" className="flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate">{laptop.name}</p>
          <p className="text-[11px] text-slate-500">Disponibilidad: {label}</p>
          <p className="text-[10px] text-slate-400">{laptop.processor} · {laptop.ram} · {laptop.os}</p>
        </div>
        <span className="text-slate-500 text-sm flex-shrink-0">{expanded ? '∧' : '∨'}</span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {laptop.availableSlots.map((slot, i) => {
              const isSelected =
                selectedLaptop?.id === laptop.id &&
                selectedSlot?.start === slot.start &&
                selectedSlot?.end === slot.end;
              return (
                <button
                  key={i}
                  onClick={() => onSelectSlot(slot)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                    isSelected
                      ? 'bg-pucp-navy text-white border-pucp-navy'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {slot.start} – {slot.end} hrs
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 flex items-center space-x-1">
            <Hash className="w-3 h-3" />
            <span>Nº de equipo: <span className="font-mono">{laptop.code}</span></span>
          </p>
        </div>
      )}
    </div>
  );
};
