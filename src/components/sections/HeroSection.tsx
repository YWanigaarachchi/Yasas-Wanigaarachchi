import { motion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Github,
  MapPin,
  Rocket,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import type { GitHubTelemetryData } from '@/types/portfolio';

interface HeroSectionProps {
  telemetry: GitHubTelemetryData;
}

export function HeroSection({ telemetry }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/70 py-16 dark:border-slate-800/70 sm:py-24"
    >
      {/* Ambient architectural lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl dark:from-violet-600/25 dark:via-indigo-500/15 dark:to-cyan-500/20"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left Identity Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            {DEVELOPER_PROFILE.availableForOpportunities && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for Engineering &amp; Architecture Roles
              </span>
            )}
            <a
              href={DEVELOPER_PROFILE.company.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-medium text-violet-700 transition hover:bg-violet-500/20 dark:text-violet-300"
            >
              <Rocket className="h-3.5 w-3.5" />
              Founder @ {DEVELOPER_PROFILE.company.name}
            </a>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
            Yasas Nirmitha{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-300">
              Wanigaarachchi
            </span>
          </h1>

          <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-200 sm:text-xl">
            {DEVELOPER_PROFILE.headline}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {DEVELOPER_PROFILE.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-cyan-500" />
              {DEVELOPER_PROFILE.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-violet-500" />
              {DEVELOPER_PROFILE.ethos.join(' · ')}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={DEVELOPER_PROFILE.company.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-500/20 dark:text-cyan-300"
            >
              <Rocket className="h-4 w-4" />
              <span>Visit Softgenix.lk</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>

            <a
              href={`https://github.com/${DEVELOPER_PROFILE.handle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-violet-500/70"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Profile</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>

          {/* Quick live GitHub KPI Strip */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
            <div>
              <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {telemetry.user.publicRepos}+
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Public Repos
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {telemetry.user.followers}
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                GH Followers
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                4 Live
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                HMS SaaS Apps
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Code-Card Column (Inspired by Yasas's GitHub Profile README) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-2xl border border-slate-200 bg-white/95 shadow-2xl shadow-violet-950/10 backdrop-blur dark:border-slate-800 dark:bg-[#0B1120]/95 dark:shadow-violet-950/40">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/90">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                <Terminal className="h-3.5 w-3.5 text-violet-500" />
                <span>yasas.profile.ts</span>
              </div>
              <img
                src={DEVELOPER_PROFILE.avatarUrl}
                alt={DEVELOPER_PROFILE.shortName}
                className="h-7 w-7 rounded-full border border-violet-500/50 object-cover"
              />
            </div>

            {/* Code Body */}
            <div className="overflow-x-auto p-5 font-mono text-xs leading-6 sm:text-[13px]">
              <pre className="text-slate-800 dark:text-slate-200">
                <code>
                  <span className="text-violet-600 dark:text-violet-400">const</span>{' '}
                  <span className="text-cyan-700 dark:text-cyan-300">yasas</span>
                  <span className="text-slate-500">:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-300">SoftwareEngineer</span>{' '}
                  <span className="text-slate-500">=</span> {'{\n'}
                  {'  '}name<span className="text-slate-500">:</span>{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;Yasas Wanigaarachchi&quot;
                  </span>
                  ,{'\n'}
                  {'  '}founder<span className="text-slate-500">:</span>{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;SoftgenixLK&quot;
                  </span>
                  ,{'\n'}
                  {'  '}location<span className="text-slate-500">:</span>{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;Colombo, Sri Lanka&quot;
                  </span>
                  ,{'\n'}
                  {'  '}degree<span className="text-slate-500">:</span>{' '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;BSc (Hons) SE @ Cardiff Met&quot;
                  </span>
                  ,{'\n'}
                  {'  '}focus<span className="text-slate-500">:</span> [{'\n'}
                  {'    '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;Hospitality SaaS (HMS)&quot;
                  </span>
                  ,{'\n'}
                  {'    '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;AI / RAG Orchestration&quot;
                  </span>
                  ,{'\n'}
                  {'    '}
                  <span className="text-emerald-600 dark:text-emerald-300">
                    &quot;AWS Cloud &amp; Microservices&quot;
                  </span>
                  {'\n'}
                  {'  '}],{'\n'}
                  {'  '}hireable<span className="text-slate-500">:</span>{' '}
                  <span className="text-cyan-600 dark:text-cyan-400">true</span>
                  {'\n'}
                  {'}'};
                </code>
              </pre>
            </div>

            {/* Footer status bar */}
            <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/80 px-4 py-2.5 font-mono text-[11px] text-slate-500 dark:border-slate-800/90 dark:bg-slate-900/60 dark:text-slate-400 rounded-b-2xl">
              <span>UTF-8 · TypeScript</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ● {telemetry.isFallback ? 'Curated Snapshot' : 'GitHub Live Sync'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
