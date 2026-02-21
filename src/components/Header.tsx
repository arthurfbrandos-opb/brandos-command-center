'use client';

import { useState } from 'react';
import { Menu, X, RefreshCw } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
}

export default function Header({ title = 'BrandOS Command Center', subtitle, onRefresh }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-brandos-border bg-gradient-to-r from-brandos-bg to-brandos-surface p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hidden md:hidden text-brandos-primary"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟢</span>
            <div>
              <h1 className="text-xl font-bold text-brandos-primary text-glow">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-brandos-text-secondary">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="btn-secondary p-2"
              title="Refresh data"
            >
              <RefreshCw size={20} />
            </button>
          )}
          
          <div className="flex items-center gap-2 px-3 py-1 rounded border border-brandos-border text-sm">
            <span className="w-2 h-2 bg-brandos-success rounded-full animate-pulse"></span>
            <span className="text-brandos-text-secondary">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
