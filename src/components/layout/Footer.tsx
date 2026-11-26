import { ArrowUp, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 py-10 dark:border-slate-800/80 dark:bg-[#060911]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <div className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
            {DEVELOPER_PROFILE.fullName}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Built with React 19, TypeScript, Tailwind CSS v4 &amp; Live GitHub API · {year}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${DEVELOPER_PROFILE.handle}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-violet-300"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/yasas-wanigaarachchi"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-violet-300"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={DEVELOPER_PROFILE.company.url}
            target="_blank"
            rel="noreferrer"
            aria-label="SoftgenixLK"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-violet-300"
          >
            <Globe className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            aria-label="Email"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-violet-300"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 font-mono text-xs text-slate-600 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
