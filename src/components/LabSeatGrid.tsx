import React, { useState } from 'react';
import { Laptop, LabSeat, TimeSlot } from '../types';
import { Monitor, Check, Calendar, Laptop as LaptopIcon, Clock, ChevronRight } from 'lucide-react';

interface LabSeatGridProps {
  laptop: Laptop;
  onSelectSeatAndSlot: (seat: LabSeat, slot: TimeSlot) => void;
  onClose?: () => void;
}

export const LabSeatGrid: React.FC<LabSeatGridProps> = ({ laptop, onSelectSeatAndSlot }) => {
  const defaultSeatsList: LabSeat[] = laptop.seats || [
    { id: 's1', label: 'A1', row: 1, col: 1, status: 'occupied' },
    { id: 's2', label: 'A2', row: 1, col: 2, status: 'available' },
    { id: 's3', label: 'A3', row: 1, col: 3, status: 'available' },
    { id: 's4', label: 'A4', row: 1, col: 4, status: 'available' },
    { id: 's5', label: 'A5', row: 1, col: 5, status: 'occupied' },
    { id: 's6', label: 'B1', row: 2, col: 1, status: 'available' },
    { id: 's7', label: 'B2', row: 2, col: 2, status: 'selected' },
    { id: 's8', label: 'B3', row: 2, col: 3, status: 'available' },
    { id: 's9', label: 'B4', row: 2, col: 4, status: 'available' },
    { id: 's10', label: 'B5', row: 2, col: 5, status: 'available' },
    { id: 's11', label: 'C1', row: 3, col: 1, status: 'occupied' },
    { id: 's12', label: 'C2', row: 3, col: 2, status: 'available' },
    { id: 's13', label: 'C3', row: 3, col: 3, status: 'available' },
    { id: 's14', label: 'C4', row: 3, col: 4, status: 'available' },
    { id: 's15', label: 'C5', row: 3, col: 5, status: 'occupied' },
  ];

  const [seats, setSeats] = useState<LabSeat[]>(defaultSeatsList);
  const [selectedSeat, setSelectedSeat] = useState<LabSeat>(
    defaultSeatsList.find((s) => s.status === 'selected') || defaultSeatsList[1]
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(
    laptop.availableSlots[0] || { start: '11:30', end: '14:30' }
  );

  const handleSeatClick = (seat: LabSeat) => {
    if (seat.status === 'occupied') return;

    const updated = seats.map((s) => {
      if (s.id === seat.id) {
        return { ...s, status: 'selected' as const };
      }
      if (s.status === 'selected') {
        return { ...s, status: 'available' as const };
      }
      return s;
    });

    setSeats(updated);
    setSelectedSeat({ ...seat, status: 'selected' });
  };

  return (
    <div className="flex flex-col h-full bg-[#090A0F] text-white p-4 space-y-5 overflow-y-auto select-none">
      {/* Header bar: Date pill & Laptop count chip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>12 JUN</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold flex items-center space-x-1.5">
            <LaptopIcon className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>1 Laptop</span>
          </div>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {laptop.labRoom || 'Lab 302 - San Miguel'}
        </span>
      </div>

      {/* Lab Screen / Curved Front Stage Header */}
      <div className="flex flex-col items-center pt-2">
        <div className="w-4/5 h-2 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent rounded-full shadow-[0_0_20px_#00F0FF]" />
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-2">
          PANTALLA DE PROYECCIÓN / PUESTOS DE TRABAJO
        </p>
      </div>

      {/* Interactive Seat Grid (Cinema Curved Layout) */}
      <div className="py-4 space-y-3 flex flex-col items-center">
        {[1, 2, 3].map((rowNum) => {
          const rowSeats = seats.filter((s) => s.row === rowNum);
          return (
            <div key={rowNum} className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-slate-500 w-4">
                {String.fromCharCode(64 + rowNum)}
              </span>
              <div className="flex space-x-2.5">
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeat?.id === seat.id;
                  const isOccupied = seat.status === 'occupied';

                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={isOccupied}
                      className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-bold text-xs transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.7)] scale-110 border-2 border-white'
                          : isOccupied
                          ? 'bg-slate-800/50 text-slate-600 border border-slate-700/50 cursor-not-allowed'
                          : 'bg-slate-900/80 text-slate-200 border border-slate-700/80 hover:border-[#00F0FF]/50 hover:bg-slate-800'
                      }`}
                    >
                      <Monitor className={`w-3.5 h-3.5 mb-0.5 ${isSelected ? 'text-black' : isOccupied ? 'text-slate-600' : 'text-slate-400'}`} />
                      <span className="text-[10px] leading-none">{seat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Legend */}
      <div className="flex items-center justify-center space-x-6 text-[11px] text-slate-400 pt-1">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-slate-800 border border-slate-600" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          <span className="text-white font-medium">Seleccionado</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-md bg-slate-800/40 border border-slate-800 opacity-60" />
          <span>Ocupado</span>
        </div>
      </div>

      {/* Time Slot Selection (Pill bar like Cinema movie times) */}
      <div className="pt-2">
        <div className="flex items-center space-x-2 mb-2.5">
          <Clock className="w-4 h-4 text-[#00F0FF]" />
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Selecciona la Franja Horaria
          </h4>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {laptop.availableSlots.map((slot, idx) => {
            const isSelected = selectedSlot.start === slot.start && selectedSlot.end === slot.end;
            return (
              <button
                key={idx}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <p className="text-xs font-bold">{slot.start} – {slot.end}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{slot.label || 'Bloque Horario'}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky CTA bar matching Screen 3 of Dribbble video */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
            Puesto: <span className="text-[#00F0FF] font-bold">{selectedSeat.label}</span>
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-base font-extrabold text-white">GRATUITO</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">
              Alumnos PUCP
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelectSeatAndSlot(selectedSeat, selectedSlot)}
          className="px-6 py-3.5 bg-[#00F0FF] hover:bg-[#33f3ff] text-black font-extrabold text-xs rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center space-x-2 transition-all active:scale-95"
        >
          <span>Reservar Puesto</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
