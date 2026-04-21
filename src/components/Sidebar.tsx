'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LESSONS = [
  { href: '/',           icon: '🏠', label: 'Home',              id: 'home' },
  { href: '/setup',      icon: '⚡', label: 'Setup & /init',     id: 'setup',      badge: '1' },
  { href: '/prompting',  icon: '✍️',  label: 'Prompting Mastery', id: 'prompting',  badge: '2' },
  { href: '/tokens',     icon: '🪙', label: 'Token Economy',     id: 'tokens',     badge: '3' },
  { href: '/models',     icon: '🧠', label: 'Sonnet vs Opus',    id: 'models',     badge: '4' },
  { href: '/skills',     icon: '🛠️',  label: 'Skills & Commands', id: 'skills',     badge: '5' },
  { href: '/scenario',   icon: '🎯', label: 'Live Scenario',     id: 'scenario',   badge: '★', highlight: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-w-[256px] bg-bg-secondary border-r border-border sticky top-0 h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #f97316, #3b82f6)' }}>
            ⚡
          </div>
          <div>
            <div className="text-sm font-bold text-[--text-primary] leading-tight">Claude Code Guide</div>
            <div className="text-[11px] text-[--text-muted] font-normal">Bank Sinarmas Internal</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        <div className="px-5 py-2 text-[10px] font-bold text-[--text-muted] uppercase tracking-widest">
          Modules
        </div>
        {LESSONS.map(({ href, icon, label, badge, highlight }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-[3px] transition-all duration-150 no-underline',
                active
                  ? 'text-accent-blue bg-blue-500/10 border-l-accent-blue font-semibold'
                  : highlight
                    ? 'text-accent-orange border-l-transparent hover:border-l-accent-orange hover:bg-orange-500/5'
                    : 'text-[--text-secondary] border-l-transparent hover:text-[--text-primary] hover:bg-blue-500/5 hover:border-l-border-light',
              ].join(' ')}
            >
              <span className="w-5 text-center text-[15px]">{icon}</span>
              <span className="flex-1">{label}</span>
              {badge && (
                <span className={[
                  'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                  active ? 'bg-accent-blue text-white' : highlight ? 'bg-accent-orange/20 text-accent-orange' : 'bg-border-light/50 text-[--text-muted]',
                ].join(' ')}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <div className="text-[11px] text-[--text-muted]">
          Powered by Claude Sonnet 4.6
        </div>
        <div className="text-[11px] text-[--text-muted]">Bank Sinarmas Engineering</div>
      </div>
    </aside>
  );
}
