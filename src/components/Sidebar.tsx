'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home, FolderOpen, CheckSquare, Calendar,
  BarChart3, Users, Clock, Settings, LogOut,
  Menu, X,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href;

  const NavLinks = () => (
    <>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                active
                  ? 'bg-brandos-primary/20 text-brandos-primary border border-brandos-primary/50'
                  : 'text-brandos-text-secondary hover:text-brandos-primary hover:bg-brandos-surface'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-brandos-border space-y-1">
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium text-brandos-text-secondary hover:text-brandos-danger hover:bg-brandos-surface"
            >
              <Icon size={18} className="flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.name}</span>}
            </Link>
          );
        })}
        {(!collapsed || mobileOpen) && (
          <p className="text-xs text-brandos-text-secondary text-center pt-2 opacity-50">
            BrandOS v0.1.0
          </p>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-brandos-bg border-b border-brandos-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🟢</span>
          <span className="font-bold text-brandos-primary text-sm">BrandOS</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-brandos-primary p-1"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`
        md:hidden fixed top-0 left-0 h-full z-50 w-64 bg-brandos-bg border-r border-brandos-border
        flex flex-col transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-brandos-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟢</span>
            <span className="font-bold text-brandos-primary">BrandOS</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-brandos-text-secondary">
            <X size={20} />
          </button>
        </div>
        <NavLinks />
      </div>

      {/* Desktop Sidebar */}
      <aside className={`
        hidden md:flex flex-col bg-brandos-bg border-r border-brandos-border transition-all duration-300
        ${collapsed ? 'w-16' : 'w-56'}
      `}>
        <div className="p-3 border-b border-brandos-border flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xl flex-shrink-0">🟢</span>
            {!collapsed && (
              <span className="font-bold text-brandos-primary text-sm truncate">BrandOS</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-brandos-text-secondary hover:text-brandos-primary transition-colors flex-shrink-0"
          >
            <Menu size={16} />
          </button>
        </div>
        <NavLinks />
      </aside>

      {/* Mobile top bar spacer */}
      <div className="md:hidden h-[52px] flex-shrink-0" />
    </>
  );
}
