import React from 'react';
import { BRAND_CONFIG } from '@/config/brand';

interface LogoProps {
  variant?: 'default' | 'compact' | 'white';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  className = '',
  showTagline = true,
}) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Distinct Logo Emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white font-black text-xl shadow-xs transition-transform group-hover:scale-105 shrink-0">
        <span className="font-extrabold tracking-tighter">مـ</span>
        {/* Subtle accent dot */}
        <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-400 border border-emerald-800" />
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black text-xl tracking-tight ${
                isWhite ? 'text-white' : 'text-neutral-900'
              }`}
            >
              {BRAND_CONFIG.shortName}
            </span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              التعليمية
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[10px] font-medium tracking-normal mt-0.5 ${
                isWhite ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {BRAND_CONFIG.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
