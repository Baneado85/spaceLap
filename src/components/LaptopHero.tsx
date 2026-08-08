import React from 'react';
import { Laptop } from '../types';
import { Clock, Battery, Star, MapPin, Zap } from 'lucide-react';
import { LaptopGlyph } from './LaptopArt';

interface LaptopHeroProps {
  laptop: Laptop;
  size?: 'card' | 'full';
  className?: string;
}

export const LaptopHero: React.FC<LaptopHeroProps> = ({ laptop, size = 'card', className = '' }) => {
  const isFull = size === 'full';
  const heightClass = isFull ? 'h-72' : 'h-[360px]';

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] ${heightClass} ${className} shadow-2xl group border border-white/10 transition-all duration-300 hover:border-[#00F0FF]/40`}
    >
      {/* Background HD Image / Render with Dark Gradient Overlay */}
      {laptop.imageUrl ? (
        <img
          src={laptop.imageUrl}
          alt={laptop.name}
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a1226] to-[#040814]" />
      )}

      {/* Dark vignette gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

      {/* Top Floating Badges (Matching Dribbble Movie Card Layout) */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
        {/* Left Slot Pill */}
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center space-x-1.5 shadow-lg">
          <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>{laptop.availableSlots?.[0] ? `${laptop.availableSlots[0].start} - ${laptop.availableSlots[0].end}` : '3h Slot'}</span>
        </div>

        {/* Right Category / Spec Tag */}
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#00F0FF]/30 text-[11px] font-extrabold text-[#00F0FF] flex items-center space-x-1 shadow-lg">
          <Zap className="w-3 h-3 text-[#FFB800]" />
          <span className="uppercase tracking-wider">{laptop.processor.split(' ')[0]} {laptop.ram}</span>
        </div>
      </div>

      {/* Center Laptop Glyph Artwork */}
      <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
        <LaptopGlyph
          brand={laptop.brand}
          className="w-3/5 max-w-[200px] drop-shadow-[0_20px_35px_rgba(0,240,255,0.25)] opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Bottom Glass Card Overlay (Matching Dribbble Video 1 & 2) */}
      <div className="absolute bottom-3 inset-x-3 z-20 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-between space-y-1.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#00F0FF]">
              {laptop.brand} · {laptop.category || 'WORKSTATION'}
            </p>
            <h3 className="text-base font-extrabold text-white tracking-tight leading-tight line-clamp-1">
              {laptop.name}
            </h3>
          </div>
          {laptop.rating && (
            <span className="px-2 py-0.5 rounded-lg bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-[10px] font-bold flex-shrink-0">
              {laptop.rating}
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-300 line-clamp-1 font-medium">
          {laptop.tagline}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-[#00F0FF]" />
            <span className="truncate">{laptop.labRoom || 'Lab 302 Edificio V'}</span>
          </div>
          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            LIBRE AHORA
          </span>
        </div>
      </div>
    </div>
  );
};
