import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowLeft,
  CalendarCheck2,
  ExternalLink,
  Flame,
  FolderGit2,
  GitCommitHorizontal,
  GitPullRequest,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import type {
  GitHubActivityEvent,
  GitHubContributionsData,
  GitHubTelemetryData,
} from '@/types/portfolio';
import { ContributionHeatmap } from '@/components/github/ContributionHeatmap';
import { MonthlyActivityChart } from '@/components/github/MonthlyActivityChart';

interface GitHubTelemetryPageProps {
  telemetry: GitHubTelemetryData;
  contributions: GitHubContributionsData;
  events: GitHubActivityEvent[];
  isLoading: boolean;
  onRefresh: () => void;
  onBackHome: () => void;
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

function formatRelativeTime(iso: string): string {
  if (!iso) return 'Recently';
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return 'Recently';
  const diffHours = Math.max(0, Math.floor((Date.now() - ts) / (1000 * 60 * 60)));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function GitHubTelemetryPage({
  telemetry,
  contributions,
  events,
  isLoading,
  onRefresh,
  onBackHome,
}: GitHubTelemetryPageProps) {
  const [repoQuery, setRepoQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('All');

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    telemetry.repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [telemetry.repos]);

  const filteredRepos = useMemo(() => {
    const q = repoQuery.trim().toLowerCase();
    return telemetry.repos.filter((repo) => {
      const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
      const matchesQuery =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        (repo.description ?? '').toLowerCase().includes(q) ||
        repo.topics.some((t) => t.toLowerCase().includes(q));
      return matchesLang && matchesQuery;
    });
  }, [telemetry.repos, repoQuery, selectedLang]);

  const isLive = !telemetry.isFallback && !contributions.isFallback;

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Action & Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-400 hover:text-violet-600 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-200 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-300">
              <Activity
                className={`h-3.5 w-3.5 ${
                  isLoading
                    ? 'animate-pulse text-amber-400'
                    : isLive
                      ? 'text-emerald-400'
                      : 'text-cyan-400'
                }`}
              />
              <span>
                {isLoading
                  ? 'Syncing Live Telemetry...'
                  : isLive
                    ? 'Live GitHub Sync Active'
                    : 'Hybrid Snapshot Active'}
              </span>
            </span>

            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 font-mono text-xs font-medium text-slate-700 transition hover:border-violet-400 disabled:opacity-50 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-200"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <a
              href={telemetry.user.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-500"
            >
              <span>@{telemetry.user.login}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Page Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-medium text-violet-600 dark:text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>GITHUB TELEMETRY // LAST 365 DAYS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Live GitHub Telemetry &amp; Contributions
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Real-time engineering activity, 365-day contribution heatmap, monthly commit velocity,
              language distribution, and searchable public repositories for{' '}
              <span className="font-mono text-violet-600 dark:text-cyan-300">
                @{telemetry.user.login}
              </span>
              .
            </p>
          </div>

          <div className="flex items-center gap-3.5 self-start rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222] md:self-auto">
            <img
              src={telemetry.user.avatarUrl}
              alt={telemetry.user.name}
              className="h-12 w-12 rounded-xl border border-violet-500/40 object-cover"
            />
            <div>
              <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {telemetry.user.name}
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {telemetry.user.company ?? 'SoftGenix.LK'} · {telemetry.user.location ?? 'Colombo'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Primary Telemetry KPI Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            {
              label: 'Last Year',
              value: contributions.totalLastYear.toLocaleString(),
              sub: 'Contributions',
              icon: TrendingUp,
              accent: 'text-emerald-500',
            },
            {
              label: 'Current Streak',
              value: `${contributions.currentStreak}d`,
              sub: 'Consecutive days',
              icon: Flame,
              accent: 'text-amber-500',
            },
            {
              label: 'Longest Streak',
              value: `${contributions.longestStreak}d`,
              sub: '365-day record',
              icon: CalendarCheck2,
              accent: 'text-violet-500',
            },
            {
              label: 'Active Days',
              value: `${contributions.activeDays}`,
              sub: `Avg ${contributions.averagePerActiveDay}/day`,
              icon: GitCommitHorizontal,
              accent: 'text-cyan-500',
            },
            {
              label: 'Public Repos',
              value: `${telemetry.user.publicRepos}`,
              sub: `${telemetry.originalRepoCount} original`,
              icon: FolderGit2,
              accent: 'text-indigo-400',
            },
            {
              label: 'Followers',
              value: `${telemetry.user.followers}`,
              sub: `${telemetry.totalStars} total stars`,
              icon: Users,
              accent: 'text-rose-400',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {kpi.label}
                </span>
                <kpi.icon className={`h-4 w-4 ${kpi.accent}`} />
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {kpi.value}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 365-Day Contribution Heatmap */}
        <div className="mt-6">
          <ContributionHeatmap data={contributions} />
        </div>

        {/* Monthly Velocity Chart + Language Breakdown */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MonthlyActivityChart months={contributions.monthlyTotals} />
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222] sm:p-6 lg:col-span-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Language Distribution
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Across original public repositories
            </p>

            <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              {telemetry.languageDistribution.map((lang) => (
                <div
                  key={lang.language}
                  style={{ width: `${Math.max(lang.percentage, 5)}%` }}
                  title={`${lang.language}: ${lang.percentage}%`}
                  className={`${LANG_COLORS[lang.language] ?? 'bg-violet-500'} h-full`}
                />
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {telemetry.languageDistribution.map((lang) => (
                <div key={lang.language} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        LANG_COLORS[lang.language] ?? 'bg-violet-500'
                      }`}
                    />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {lang.language}
                    </span>
                  </div>
                  <span className="font-mono text-slate-500 dark:text-slate-400">
                    {lang.count} repo{lang.count === 1 ? '' : 's'} ({lang.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Live Activity Events */}
        <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222] sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-violet-500" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Recent Public GitHub Activity Stream
              </h3>
            </div>
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              Latest {events.length} events
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800/80">
            {events.map((evt) => (
              <a
                key={evt.id}
                href={evt.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-wrap items-center justify-between gap-3 py-3 transition hover:bg-slate-50/70 dark:hover:bg-slate-900/40 sm:px-2 sm:rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-violet-700 dark:text-violet-300">
                    {evt.type.replace('Event', '')}
                  </span>
                  <span className="text-sm text-slate-700 group-hover:text-violet-600 dark:text-slate-200 dark:group-hover:text-violet-300">
                    {evt.summary}
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {formatRelativeTime(evt.createdAt)}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Searchable Repository Explorer */}
        <div className="mt-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Public Repositories Explorer
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Showing {filteredRepos.length} of {telemetry.repos.length} original repositories
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={repoQuery}
                  onChange={(e) => setRepoQuery(e.target.value)}
                  placeholder="Filter repositories..."
                  className="rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-8 text-xs text-slate-900 outline-none transition focus:border-violet-500 dark:border-slate-800 dark:bg-[#0C1222] dark:text-white"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={`rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-medium transition ${
                      selectedLang === lang
                        ? 'bg-violet-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-400 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo) => (
              <div
                key={repo.name}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 transition hover:border-violet-400/70 dark:border-slate-800/90 dark:bg-[#0C1222] dark:hover:border-violet-500/60"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate font-mono text-sm font-semibold text-slate-900 hover:text-violet-600 dark:text-slate-100 dark:hover:text-violet-300"
                    >
                      {repo.name}
                    </a>
                    <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {repo.description ?? 'Public software engineering repository.'}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        repo.language
                          ? (LANG_COLORS[repo.language] ?? 'bg-violet-500')
                          : 'bg-slate-400'
                      }`}
                    />
                    {repo.language ?? 'Docs'}
                  </span>

                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-600 hover:underline dark:text-cyan-300"
                      >
                        Live ↗
                      </a>
                    )}
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-600 hover:underline dark:text-violet-400"
                    >
                      Repo ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
