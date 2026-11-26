import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import type { MonthlyContribution } from '@/types/portfolio';

interface MonthlyActivityChartProps {
  months: MonthlyContribution[];
}

export function MonthlyActivityChart({ months }: MonthlyActivityChartProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const maxCount = Math.max(...months.map((m) => m.count), 1);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-cyan-500" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Monthly Contribution Velocity (Last 12 Months)
          </h3>
        </div>
        <span className="font-mono text-xs text-violet-600 dark:text-cyan-300">
          {activeIdx !== null && months[activeIdx]
            ? `${months[activeIdx].label} (${months[activeIdx].monthKey}): ${months[activeIdx].count.toLocaleString()} contributions`
            : `Peak Month: ${maxCount.toLocaleString()} contributions`}
        </span>
      </div>

      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">
        {months.map((m, idx) => {
          const heightPct = Math.max(Math.round((m.count / maxCount) * 100), m.count > 0 ? 6 : 2);
          const isActive = activeIdx === idx;
          return (
            <div
              key={m.monthKey}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span
                className={`font-mono text-[10px] transition ${
                  isActive
                    ? 'font-bold text-violet-600 dark:text-cyan-300'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {m.count > 0 ? m.count : ''}
              </span>

              <div className="relative flex h-32 w-full items-end overflow-hidden rounded-lg bg-slate-100/90 dark:bg-slate-800/60">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.45, delay: idx * 0.03 }}
                  className={`w-full rounded-t-lg transition-opacity ${
                    isActive
                      ? 'bg-gradient-to-t from-violet-600 via-fuchsia-500 to-cyan-400'
                      : 'bg-gradient-to-t from-violet-600/80 to-cyan-500/80 group-hover:from-violet-500 group-hover:to-cyan-400'
                  }`}
                />
              </div>

              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
