import React from 'react';

interface UnitevLogoProps {
  variant?: 'full' | 'compact' | 'mark-only';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const UnitevLogo: React.FC<UnitevLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  
  // Scaling factors based on size
  const scaleClass = {
    sm: 'scale-75 origin-left',
    md: 'scale-90 origin-left',
    lg: 'scale-100 origin-left',
    hero: 'scale-110 sm:scale-125 origin-left',
  }[size];

  const navyColor = isDark ? '#FFFFFF' : '#002D62';
  const subtitleColor = isDark ? '#E2E8F0' : '#002B66';
  const taglineColor = isDark ? '#94A3B8' : '#334155';
  const orangeColor = '#F97316';
  const greenLeafDark = '#15803D';
  const greenLeafLight = '#22C55E';

  return (
    <div className={`inline-flex flex-col select-none ${scaleClass} ${className}`}>
      <div className="flex items-center gap-1.5">
        {/* The Trademarked 'U' with Twin Eco Green Leaves */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* The Stylized Navy 'U' Base Container */}
            <path
              d="M18 16 V55 C18 78 35 90 56 90 C78 90 92 78 92 55 V16 H74 V53 C74 65 67 72 55 72 C43 72 36 65 36 53 V16 H18 Z"
              fill={navyColor}
            />
            {/* Left Eco Leaf (Deep emerald) */}
            <path
              d="M48 30 C34 40 32 60 48 72 C42 58 44 42 48 30 Z"
              fill={greenLeafDark}
            />
            {/* Right / Center Eco Leaf (Vibrant fresh leaf) */}
            <path
              d="M48 24 C58 35 62 55 48 72 C55 58 58 40 48 24 Z"
              fill={greenLeafLight}
            />
            {/* Leaf center spine accent */}
            <path
              d="M48 28 Q49 50 48 70"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

        {variant !== 'mark-only' && (
          <div className="flex flex-col justify-center">
            {/* nitev with green accent bar above 'ev' */}
            <div className="relative flex items-baseline tracking-tight">
              <span
                className="font-extrabold text-[28px] leading-none"
                style={{ color: navyColor, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                nitev
              </span>
              <span
                className="text-[9px] font-bold ml-0.5 relative -top-3"
                style={{ color: navyColor }}
              >
                TM
              </span>
              {/* Green accent line above 'ev' */}
              <span
                className="absolute right-3 top-[-3px] h-[3px] w-[26px] rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
              />
            </div>
          </div>
        )}
      </div>

      {variant === 'full' && (
        <div className="mt-1 flex flex-col pl-0.5">
          {/* Vibrant Orange Horizontal Underline Bar */}
          <div
            className="h-[2.5px] w-full max-w-[210px] rounded-full"
            style={{ backgroundColor: orangeColor }}
          />

          {/* EV CHARGING NETWORK */}
          <span
            className="text-[9.5px] font-bold tracking-[0.24em] uppercase mt-1 leading-none"
            style={{ color: subtitleColor }}
          >
            EV CHARGING NETWORK
          </span>

          {/* Tagline */}
          <span
            className="text-[8.5px] font-medium tracking-[0.08em] mt-1 text-slate-500"
            style={{ color: taglineColor }}
          >
            We Build. You Earn.
          </span>
        </div>
      )}
    </div>
  );
};
