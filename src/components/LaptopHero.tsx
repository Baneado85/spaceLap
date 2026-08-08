import React from 'react';
import { Laptop } from '../types';
import { LaptopGlyph, getBrandTheme } from './LaptopArt';

interface LaptopHeroProps {
  laptop: Laptop;
  size?: 'card' | 'full';
  className?: string;
}

export const LaptopHero: React.FC<LaptopHeroProps> = ({ laptop, size = 'card', className = '' }) => {
  const theme = getBrandTheme(laptop.brand);
  const heightClass = size === 'full' ? 'h-56' : 'h-48';

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${heightClass} ${className} shadow-lg`}
      style={{
        background: `linear-gradient(135deg, ${theme.posterFrom} 0%, ${theme.posterVia} 55%, ${theme.posterTo} 100%)`,
      }}
    >
      {/* Cinematic glow blobs */}
      <span className="blob w-44 h-44" style={{ background: `${theme.chip}33`, top: '-3rem', right: '-2.5rem' }} />
      <span className="blob w-36 h-36 bg-black/30 -bottom-10 -left-10" />

      {/* Faint brand wordmark watermark */}
      <span className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-white/10 font-black uppercase tracking-tighter text-[4.5rem] leading-none whitespace-nowrap">
          {laptop.brand}
        </span>
      </span>

      <LaptopGlyph
        brand={laptop.brand}
        className="relative z-10 w-3/5 mx-auto mt-6 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">{laptop.brand}</p>
        <h3 className="text-base font-extrabold text-white leading-tight">{laptop.name}</h3>
        <p className="text-[11px] text-white/80 mt-0.5 line-clamp-1">{laptop.tagline}</p>
      </div>
    </div>
  );
};
