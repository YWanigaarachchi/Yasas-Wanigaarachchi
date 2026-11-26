import { motion } from 'framer-motion';
import { Award, Briefcase, ExternalLink, GraduationCap, MapPin } from 'lucide-react';
import { TIMELINE } from '@/data/timeline';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function JourneySection() {
  return (
    <section
      id="journey"
      className="border-y border-slate-200/70 bg-slate-50/70 py-20 dark:border-slate-800/70 dark:bg-[#090E1B] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          eyebrow="Experience & Education"
          title="Entrepreneurial Leadership & Academic Credentials"
          description="Combining real-world product leadership at SoftgenixLK with formal UK software engineering credentials from Cardiff Metropolitan University."
        />

        <div className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-5 before:w-px before:bg-gradient-to-b before:from-violet-500/70 before:via-cyan-500/50 before:to-transparent sm:before:left-6">
          {TIMELINE.map((entry, idx) => {
            const isWork = entry.type === 'experience';
            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative pl-14 sm:pl-16"
              >
                {/* Timeline node */}
                <div
                  className={`absolute top-5 left-0 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm sm:h-12 sm:w-12 ${
                    isWork
                      ? 'border-violet-500/40 bg-violet-600 text-white shadow-violet-600/25'
                      : 'border-cyan-500/40 bg-white text-cyan-600 dark:bg-[#0D1426] dark:text-cyan-300'
                  }`}
                >
                  {isWork ? (
                    <Briefcase className="h-5 w-5" />
                  ) : (
                    <GraduationCap className="h-5 w-5" />
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800/90 dark:bg-[#0D1426]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-violet-500/10 px-2.5 py-1 font-mono text-xs font-medium text-violet-700 dark:text-violet-300">
                        {entry.period}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {entry.status === 'Merit Pass' && <Award className="h-3.5 w-3.5" />}
                        {entry.status}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {entry.location}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    {entry.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-cyan-300">
                    {entry.organizationUrl ? (
                      <a
                        href={entry.organizationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <span>{entry.organization}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span>{entry.organization}</span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {entry.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
