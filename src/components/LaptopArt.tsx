import React from 'react';

export type BrandTheme = {
  screen: string;
  screenGlow: string;
  base: string;
  chip: string;
  posterFrom: string;
  posterVia: string;
  posterTo: string;
};

export const BRAND_THEMES: Record<string, BrandTheme> = {
  Dell: {
    screen: '#0F4C81', screenGlow: '#6FD3FF', base: '#0B2A4A', chip: '#6FD3FF',
    posterFrom: '#12466f', posterVia: '#0F4C81', posterTo: '#031944',
  },
  Lenovo: {
    screen: '#1F2933', screenGlow: '#FCA5A5', base: '#7F1D1D', chip: '#F87171',
    posterFrom: '#3f1212', posterVia: '#1f2933', posterTo: '#020617',
  },
  Apple: {
    screen: '#111214', screenGlow: '#E5E7EB', base: '#C7CBD1', chip: '#E5E7EB',
    posterFrom: '#3a3a3c', posterVia: '#1c1c1e', posterTo: '#000000',
  },
  HP: {
    screen: '#3a1a06', screenGlow: '#FDBA74', base: '#1f2937', chip: '#FB923C',
    posterFrom: '#7c2d12', posterVia: '#1f2937', posterTo: '#0a0a0a',
  },
  Asus: {
    screen: '#14121F', screenGlow: '#C4B5FD', base: '#1E1B2E', chip: '#A78BFA',
    posterFrom: '#4c1d95', posterVia: '#1e1b2e', posterTo: '#0a0a0a',
  },
};

const DEFAULT_THEME: BrandTheme = BRAND_THEMES.Dell;

export const getBrandTheme = (brand: string): BrandTheme => BRAND_THEMES[brand] ?? DEFAULT_THEME;

interface LaptopGlyphProps {
  brand: string;
  className?: string;
}

export const LaptopGlyph: React.FC<LaptopGlyphProps> = ({ brand, className = '' }) => {
  const theme = getBrandTheme(brand);
  const gradId = `screen-${brand.replace(/\s+/g, '')}`;

  return (
    <svg viewBox="0 0 120 84" className={className} role="img" aria-label={`Laptop ${brand}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.screenGlow} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.screen} />
        </linearGradient>
      </defs>
      <rect x="18" y="4" width="84" height="52" rx="6" fill={theme.screen} />
      <rect x="24" y="10" width="72" height="40" rx="3" fill={`url(#${gradId})`} opacity="0.9" />
      <path d="M6 64 h108 l-9 13 h-90 z" fill={theme.base} />
      <rect x="2" y="60" width="116" height="6" rx="3" fill={theme.base} />
    </svg>
  );
};

interface LaptopArtProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<LaptopArtProps['size']>, string> = {
  sm: 'w-16 h-14',
  md: 'w-full h-24',
  lg: 'w-full h-40',
};

export const LaptopArt: React.FC<LaptopArtProps> = ({ brand, size = 'md', className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-glass-sky-soft border border-white/50 flex items-center justify-center ${SIZE_CLASSES[size]} ${className}`}
    >
      {/* Diffused glass blobs */}
      <span className="blob w-16 h-16 bg-pucp-sky/50 -top-6 -right-4" />
      <span className="blob w-20 h-20 bg-pucp-skyDeep/30 -bottom-8 -left-6" />

      <LaptopGlyph brand={brand} className="relative z-10 w-3/5 h-3/5 drop-shadow-md" />

      <span className="absolute bottom-1.5 right-2.5 text-[9px] font-bold tracking-wider text-slate-700/80 uppercase">
        {brand}
      </span>
    </div>
  );
};
