import { useMemo, useState } from 'react';
import { CalendarDays, Flame, Palette } from 'lucide-react';
import type { ContributionDay, ContributionLevel, GitHubContributionsData } from '@/types/portfolio';

interface ContributionHeatmapProps {
  data: GitHubContributionsData;
  compact?: boolean;
}

type HeatmapTheme = 'emerald' | 'brand';

const LEVEL_PALETTES: Record<HeatmapTheme, Record<ContributionLevel, string>> = {
  emerald: {
    0: 'bg-slate-200/80 dark:bg-slate-800/80',
    1: 'bg-emerald-200 dark:bg-emerald-950/90 border border-emerald-400/20',
    2: 'bg-emerald-400 dark:bg-emerald-700',
    3: 'bg-emerald-500 dark:bg-emerald-500',
    4: 'bg-emerald-700 dark:bg-emerald-300',
  },
  brand: {
    0: 'bg-slate-200/80 dark:bg-slate-800/80',
    1: 'bg-violet-200 dark:bg-violet-950/90 border border-violet-400/20',
    2: 'bg-violet-400 dark:bg-violet-700',
    3: 'bg-violet-600 dark:bg-violet-500',
    4: 'bg-cyan-500 dark:bg-cyan-400',
  },
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatHumanDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ContributionHeatmap({ data, compact = false }: ContributionHeatmapProps) {
  const [palette, setPalette] = useState<HeatmapTheme>('emerald');
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  const { weeks, monthMarkers } = useMemo(() => {
    if (data.days.length === 0) {
      return { weeks: [] as Array<Array<ContributionDay | null>>, monthMarkers: [] as Array<{ weekIdx: number; label: string }> };
    }

    const firstParts = data.days[0].date.split('-').map(Number);
    const firstDate = new Date(firstParts[0], firstParts[1] - 1, firstParts[2]);
    const leadingEmpty = firstDate.getDay(); // 0 = Sunday .. 6 = Saturday

    const padded: Array<ContributionDay | null> = [
      ...Array<null>(leadingEmpty).fill(null),
      ...data.days,
    ];

    const groupedWeeks: Array<Array<ContributionDay | null>> = [];
    for (let i = 0; i < padded.length; i += 7) {
      const slice = padded.slice(i, i + 7);
      while (slice.length < 7) slice.push(null);
      groupedWeeks.push(slice);
    }

    const markers: Array<{ weekIdx: number; label: string }> = [];
    let lastMonth = -1;
    groupedWeeks.forEach((week, weekIdx) => {
      const firstRealDay = week.find((d): d is ContributionDay => d !== null);
      if (!firstRealDay) return;
      const monthIdx = Number(firstRealDay.date.split('-')[1]) - 1;
      if (monthIdx !== lastMonth) {
        // Avoid crowded label right next to previous
        if (markers.length === 0 || weekIdx - markers[markers.length - 1].weekIdx >= 3) {
          markers.push({ weekIdx, label: MONTH_LABELS[monthIdx] ?? '' });
        }
        lastMonth = monthIdx;
      }
    });

    return { weeks: groupedWeeks, monthMarkers: markers };
  }, [data.days]);

  const colors = LEVEL_PALETTES[palette];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/90 dark:bg-[#0C1222] sm:p-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-violet-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              {data.totalLastYear.toLocaleString()} contributions in the last year
            </h3>
          </div>
          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
            {hovered ? (
              <span className="text-violet-600 dark:text-cyan-300">
                {hovered.count} contribution{hovered.count === 1 ? '' : 's'} on{' '}
                {formatHumanDate(hovered.date)}
              </span>
            ) : (
              <span>
                Hover or focus any day square to inspect exact daily commit counts
                {data.bestDay
                  ? ` · Peak: ${data.bestDay.count} on ${formatHumanDate(data.bestDay.date)}`
                  : ''}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!compact && (
            <button
              type="button"
              onClick={() => setPalette((p) => (p === 'emerald' ? 'brand' : 'emerald'))}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] font-medium text-slate-700 transition hover:border-violet-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
            >
              <Palette className="h-3.5 w-3.5 text-violet-500" />
              <span>{palette === 'emerald' ? 'GitHub Green' : 'Violet · Cyan'}</span>
            </button>
          )}
          <span className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 font-mono text-[11px] font-medium text-amber-700 dark:text-amber-300">
            <Flame className="h-3.5 w-3.5" />
            <span>Best Streak: {data.longestStreak}d</span>
          </span>
        </div>
      </div>

      {/* Scrollable Heatmap Grid */}
      <div className="mt-5 overflow-x-auto pb-2">
        <div className="inline-block min-w-[720px]">
          {/* Month Row */}
          <div className="mb-1.5 flex pl-9">
            <div className="relative h-4 flex-1">
              {monthMarkers.map((m) => (
                <span
                  key={`${m.weekIdx}-${m.label}`}
                  style={{ left: `${(m.weekIdx / Math.max(weeks.length, 1)) * 100}%` }}
                  className="absolute font-mono text-[10px] text-slate-500 dark:text-slate-400"
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {/* Day Labels */}
            <div className="flex w-7 flex-col justify-between py-[2px] font-mono text-[10px] text-slate-400 dark:text-slate-500">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* 53 Weeks x 7 Days */}
            <div
              className="flex flex-1 gap-[3px]"
              onMouseLeave={() => setHovered(null)}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <span
                          key={`empty-${wIdx}-${dIdx}`}
                          className="h-[11px] w-[11px] rounded-[2.5px] bg-transparent"
                        />
                      );
                    }
                    const isSelected = hovered?.date === day.date;
                    return (
                      <button
                        key={day.date}
                        type="button"
                        onMouseEnter={() => setHovered(day)}
                        onFocus={() => setHovered(day)}
                        aria-label={`${day.count} contributions on ${day.date}`}
                        title={`${day.count} contributions on ${formatHumanDate(day.date)}`}
                        className={`h-[11px] w-[11px] rounded-[2.5px] transition-transform duration-100 focus:outline-none ${colors[day.level]} ${
                          isSelected
                            ? 'scale-125 ring-2 ring-violet-500 dark:ring-cyan-300'
                            : 'hover:scale-125'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
        <span>
          Active days: <strong className="text-slate-800 dark:text-slate-200">{data.activeDays}</strong> / {data.days.length} · Avg:{' '}
          <strong className="text-slate-800 dark:text-slate-200">{data.averagePerActiveDay}</strong>/active day
        </span>

        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as ContributionLevel[]).map((lvl) => (
            <span
              key={lvl}
              className={`h-[11px] w-[11px] rounded-[2.5px] ${colors[lvl]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
