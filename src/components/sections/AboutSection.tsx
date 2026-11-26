import { motion } from 'framer-motion';
import { Building2, Cloud, Cpu, Layers } from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ICON_MAP = {
  building: Building2,
  cpu: Cpu,
  layers: Layers,
  cloud: Cloud,
} as const;

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="Engineering Profile"
          title="Architecting Reliable Systems from Concept to Cloud"
          description={DEVELOPER_PROFILE.extendedBio}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {DEVELOPER_PROFILE.specialties.map((spec, idx) => {
            const Icon = ICON_MAP[spec.icon];
            return (
              <motion.article
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-violet-400/70 hover:shadow-lg hover:shadow-violet-950/5 dark:border-slate-800/90 dark:bg-[#0C1222] dark:hover:border-violet-500/60"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-600 transition group-hover:scale-105 dark:text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                    {spec.code}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {spec.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {spec.summary}
                </p>

                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                  {spec.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
