import { motion } from 'framer-motion';
import {
  Activity,
  ExternalLink,
  FolderGit2,
  GitFork,
  Star,
  Users,
} from 'lucide-react';
import type { GitHubTelemetryData } from '@/types/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface GitHubTelemetrySectionProps {
  telemetry: GitHubTelemetryData;
  isLoading: boolean;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: 'bg-amber-400',
  TypeScript: 'bg-sky-500',
  Python: 'bg-blue-500',
  PHP: 'bg-indigo-400',
  Java: 'bg-orange-500',
  'C++': 'bg-pink-500',
  HTML: 'bg-rose-500',
};

export function GitHubTelemetrySection({
  telemetry,
  isLoading,
}: GitHubTelemetrySectionProps) {
  const recentRepos = telemetry.repos.slice(0, 6);

  return (
    <section id="telemetry" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            index="05"
            eyebrow="Live GitHub Telemetry"
            title="Real-Time Open-Source Activity"
            description="Directly synchronized with the GitHub REST API (cached client-side with graceful offline fallback)."
          />
          <div className="mb-12 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-300 sm:self-auto">
            <Activity
              className={`h-3.5 w-3.5 ${
                isLoading
                  ? 'animate-pulse text-amber-400'
                  : telemetry.isFallback
                    ? 'text-cyan-400'
                    : 'text-emerald-400'
              }`}
            />
            <span>
              {isLoading
                ? 'Syncing GitHub API...'
                : telemetry.isFallback
                  ? 'Curated Snapshot'
                  : 'Live GitHub Sync'}
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Public Repositories',
              value: telemetry.user.publicRepos,
              icon: FolderGit2,
              accent: 'text-violet-500',
            },
            {
              label: 'Original Projects',
              value: telemetry.originalRepoCount,
              icon: GitFork,
              accent: 'text-cyan-500',
            },
            {
              label: 'GitHub Followers',
              value: telemetry.user.followers,
              icon: Users,
              accent: 'text-emerald-500',
            },
            {
              label: 'Total Stars',
              value: telemetry.totalStars,
              icon: Star,
              accent: 'text-amber-400',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                <stat.icon className={`h-4 w-4 ${stat.accent}`} />
              </div>
              <div className="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Language Distribution Bar */}
        <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Repository Language Breakdown (Original Repos)
            </h3>
            <a
              href={telemetry.user.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-violet-600 hover:underline dark:text-violet-400"
            >
              <span>@{telemetry.user.login}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            {telemetry.languageDistribution.map((lang) => (
              <div
                key={lang.language}
                style={{ width: `${Math.max(lang.percentage, 5)}%` }}
                title={`${lang.language}: ${lang.percentage}%`}
                className={`${LANG_COLORS[lang.language] ?? 'bg-violet-500'} h-full transition-all`}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {telemetry.languageDistribution.map((lang) => (
              <div key={lang.language} className="flex items-center gap-2 text-xs">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${LANG_COLORS[lang.language] ?? 'bg-violet-500'}`}
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {lang.language}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Public Repositories Feed */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentRepos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 transition hover:border-violet-400/70 dark:border-slate-800/90 dark:bg-[#0C1222] dark:hover:border-violet-500/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-sm font-semibold text-slate-900 group-hover:text-violet-600 dark:text-slate-100 dark:group-hover:text-violet-300">
                    {repo.name}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-violet-400" />
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {repo.description ?? 'Public software engineering repository.'}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      repo.language ? (LANG_COLORS[repo.language] ?? 'bg-violet-500') : 'bg-slate-400'
                    }`}
                  />
                  {repo.language ?? 'Docs'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" />
                  {repo.stars}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
