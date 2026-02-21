'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  FolderOpen,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  Clock,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Sprints', href: '/sprints', icon: Calendar },
  { name: 'Metrics', href: '/metrics', icon: BarChart3 },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Timeline', href: '/timeline', icon: Clock },
];

const secondaryNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/auth/logout', icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`bg-brandos-bg border-r border-brandos-border transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-brandos-border flex items-center justify-between">
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <span className="text-2xl">🟢</span>
          {!isCollapsed && (
            <span className="font-bold text-brandos-primary text-glow">BrandOS</span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-brandos-text-secondary hover:text-brandos-primary transition-colors hidden lg:block"
        >
          <ChevronDown size={18} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-brandos-primary/20 text-brandos-primary border border-brandos-primary'
                  : 'text-brandos-text-secondary hover:text-brandos-primary hover:bg-brandos-surface'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="font-medium text-sm">{item.name}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-4 border-t border-brandos-border space-y-2">
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-brandos-danger/20 text-brandos-danger border border-brandos-danger'
                  : 'text-brandos-text-secondary hover:text-brandos-danger hover:bg-brandos-surface'
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-brandos-border text-center">
          <p className="text-xs text-brandos-text-secondary">
            BrandOS Command Center v0.1.0
          </p>
        </div>
      )}
    </aside>
  );
}
