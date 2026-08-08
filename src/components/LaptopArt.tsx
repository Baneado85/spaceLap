import React from 'react';

type BrandTheme = {
  screen: string;
  screenGlow: string;
  base: string;
  chip: string;
};

const BRAND_THEMES: Record<string, BrandTheme> = {
  Dell: { screen: '#0F4C81', screenGlow: '#6FD3FF', base: '#0B2A4A', chip: '#6FD3FF' },
  Lenovo: { screen: '#1F2933', screenGlow: '#FCA5A5', base: '#7F1D1D', chip: '#F87171' },
  Apple: { screen: '#111214', screenGlow: '#E5E7EB', base: '#C7CBD1', chip: '#E5E7EB' },
  HP: { screen: '#043855', screenGlow: '#7DD3FC', base: '#082F49', chip: '#38BDF8' },
  Asus: { screen: '#14121F', screenGlow: '#C4B5FD', base: '#1E1B2E', chip: '#A78BFA' },
};

const DEFAULT_THEME: BrandTheme = BRAND_THEMES.Dell;

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
  const theme = BRAND_THEMES[brand] ?? DEFAULT_THEME;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-glass-sky-soft border border-white/50 flex items-center justify-center ${SIZE_CLASSES[size]} ${className}`}
    >
      {/* Diffused glass blobs */}
      <span className="blob w-16 h-16 bg-pucp-sky/50 -top-6 -right-4" />
      <span className="blob w-20 h-20 bg-pucp-skyDeep/30 -bottom-8 -left-6" />

      {/* Laptop illustration */}
      <svg viewBox="0 0 120 84" className="relative z-10 w-3/5 h-3/5 drop-shadow-md" role="img" aria-label={`Laptop ${brand}`}>
        <defs>
          <linearGradient id={`screen-${brand}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.screenGlow} stopOpacity="0.9" />
            <stop offset="100%" stopColor={theme.screen} />
          </linearGradient>
        </defs>
        <rect x="18" y="4" width="84" height="52" rx="6" fill={theme.screen} />
        <rect x="24" y="10" width="72" height="40" rx="3" fill={`url(#screen-${brand})`} opacity="0.9" />
        <path d="M6 64 h108 l-9 13 h-90 z" fill={theme.base} />
        <rect x="2" y="60" width="116" height="6" rx="3" fill={theme.base} />
      </svg>

      <span className="absolute bottom-1.5 right-2.5 text-[9px] font-bold tracking-wider text-slate-700/80 uppercase">
        {brand}
      </span>
    </div>
  );
};
