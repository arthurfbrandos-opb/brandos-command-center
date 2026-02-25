'use client';

import { FC } from 'react';
import { Zap } from 'lucide-react';

interface BrandOSHeaderProps {
  title?: string;
  subtitle?: string;
}

export const BrandOSHeader: FC<BrandOSHeaderProps> = ({
  title = 'Mission Control',
  subtitle = 'BrandOS Command Center',
}) => {
  return (
    <div className="relative w-full bg-gradient-to-b from-brandos-dark-800 to-brandos-dark-900 border-b border-brandos-neon-700/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-carbon-fiber"></div>

      <div className="relative px-8 py-12">
        {/* BrandOS Logo/Pattern */}
        <div className="flex items-center gap-4 mb-8">
          {/* Geometric pattern placeholder */}
          <div className="w-12 h-12 rounded-lg border-2 border-brandos-neon-400 flex items-center justify-center bg-brandos-dark-900 shadow-neon-glow">
            <Zap className="w-6 h-6 text-brandos-neon-400 animate-neon-pulse" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-brandos-neon-400/80 text-sm mt-1 font-mono">
              {'> '} {subtitle}
            </p>
          </div>
        </div>

        {/* Status line */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-brandos-neon-400 animate-neon-pulse"></div>
          <span className="text-brandos-metal-400">SYSTEM ONLINE</span>
          <span className="text-brandos-metal-500 ml-4">
            v1.0 • Production Ready
          </span>
        </div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brandos-neon-400 to-transparent opacity-50"></div>
    </div>
  );
};
