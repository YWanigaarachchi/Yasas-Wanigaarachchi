import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import type { ProjectCategory, ProjectItem } from '@/types/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectModal } from '@/components/ui/ProjectModal';

const CATEGORIES: ProjectCategory[] = ['All', 'AI / RAG', 'Hospitality SaaS', 'Web & Systems'];

const ACCENT_TOP_BAR = {
  violet: 'from-violet-500 to-fuchsia-500',
  cyan: 'from-cyan-500 to-sky-500',
  emerald: 'from-emerald-500 to-teal-500',
  amber: 'from-amber-500 to-orange-500',
  rose: 'from-rose-500 to-pink-500',
} as const;

export function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const visibleProjects = useMemo(() => {
    const byCategory =
      category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category);
    if (category !== 'All' || showAll) return byCategory;
    return byCategory.filter((p) => p.featured);
  }, [category, showAll]);

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            index="03"
            eyebrow="Selected Engineering"
            title="Production Systems & Open-Source Builds"
            description="Curated from @YWanigaarachchi on GitHub — featuring live Hospitality SaaS platforms, AI/RAG pipelines, and full-stack web applications."
          />
        </div>

        {/* Category filter pills */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`rounded-xl px-4 py-2 font-mono text-xs font-medium transition ${
                    active
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-slate-900 dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-300 dark:hover:border-violet-500/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {category === 'All' && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="font-mono text-xs font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-400"
            >
              {showAll
                ? 'Show Featured Only (6)'
                : `Show All Projects (${PROJECTS.length})`}
            </button>
          )}
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-400/70 hover:shadow-xl hover:shadow-violet-950/10 dark:border-slate-800/90 dark:bg-[#0C1222] dark:hover:border-violet-500/60"
            >
              {/* Top Accent Strip */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${ACCENT_TOP_BAR[project.accent]}`}
              />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 dark:bg-slate-800/90 dark:text-cyan-300">
                    {project.domain}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{project.year}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900 transition group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-300">
                  {project.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200/90 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live deployment`}
                        className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1.5 font-mono text-[11px] font-medium text-cyan-700 transition hover:bg-cyan-500/20 dark:text-cyan-300"
                      >
                        <span>Live</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
