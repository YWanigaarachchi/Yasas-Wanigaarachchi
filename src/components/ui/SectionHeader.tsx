import { motion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className="mb-12 max-w-2xl"
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 font-mono text-xs font-medium tracking-wider text-violet-600 dark:text-violet-300">
        <span>{index} //</span>
        <span className="uppercase">{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
