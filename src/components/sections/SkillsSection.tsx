import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/skills';
import type { SkillCategory } from '@/types/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';

const CATEGORIES: SkillCategory[] = [
  'All',
  'Languages',
  'Frontend & UI',
  'Backend & AI',
  'Cloud & DevOps',
  'Databases',
];

const LEVEL_STYLES = {
  Core: 'border-violet-500/35 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  Proficient: 'border-cyan-500/35 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  Working: 'border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
} as const;

export function SkillsSection() {
  const [selected, setSelected] = useState<SkillCategory>('All');

  const filtered = useMemo(
    () => (selected === 'All' ? SKILLS : SKILLS.filter((s) => s.category === selected)),
    [selected]
  );

  return (
    <section
      id="skills"
      className="border-y border-slate-200/70 bg-slate-50/70 py-20 dark:border-slate-800/70 dark:bg-[#090E1B] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          eyebrow="Technical Stack"
          title="Tools & Technologies Across the Full Lifecycle"
          description="From type-safe React frontends and FastAPI/Node.js services to Dockerized AWS cloud deployments."
        />

        {/* Category Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter skills">
          {CATEGORIES.map((category) => {
            const active = selected === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(category)}
                className={`rounded-xl px-4 py-2 font-mono text-xs font-medium transition ${
                  active
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-slate-900 dark:border-slate-800 dark:bg-[#0D1426] dark:text-slate-300 dark:hover:border-violet-500/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filtered.map((skill) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-slate-200/90 bg-white p-4 transition hover:border-violet-400/70 dark:border-slate-800/90 dark:bg-[#0D1426] dark:hover:border-violet-500/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  {skill.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium ${LEVEL_STYLES[skill.level]}`}
                >
                  {skill.level}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {skill.note}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
