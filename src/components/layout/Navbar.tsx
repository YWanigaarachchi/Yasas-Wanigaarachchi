import { useMemo, useState } from 'react';
import { Github, Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/app/providers/ThemeProvider';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => SITE_CONFIG.navItems.map((i) => i.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#070B14]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/40 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 text-xs font-bold text-violet-600 transition group-hover:border-violet-400 dark:text-violet-300">
            YW
          </span>
          <span className="hidden sm:inline">
            yasas<span className="text-violet-500">.dev</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {SITE_CONFIG.navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-violet-500/15 text-violet-700 dark:text-violet-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <span className="mr-1 font-mono text-[11px] text-violet-500/80">
                  {item.code}.
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${DEVELOPER_PROFILE.handle}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-violet-500/60 dark:hover:text-violet-300 sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-500 sm:inline-flex"
          >
            Let&apos;s Talk
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#090F1D] md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {SITE_CONFIG.navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70"
              >
                <span className="mr-2 font-mono text-xs text-violet-500">{item.code} //</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
