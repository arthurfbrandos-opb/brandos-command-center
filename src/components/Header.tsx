'use client';

import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
}

export default function Header({
  title = 'BrandOS Command Center',
  subtitle,
  onRefresh,
}: HeaderProps) {
  return (
    <header className="border-b border-brandos-border bg-brandos-bg px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🟢</span>
          <div>
            <h1 className="text-lg font-bold text-brandos-primary">{title}</h1>
            {subtitle && (
              <p className="text-xs text-brandos-text-secondary">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="btn-secondary p-2 rounded"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-1 rounded border border-brandos-border text-sm">
            <span className="w-2 h-2 bg-brandos-success rounded-full animate-pulse" />
            <span className="text-brandos-text-secondary text-xs">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
