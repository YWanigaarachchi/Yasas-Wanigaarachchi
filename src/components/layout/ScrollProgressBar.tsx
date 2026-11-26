import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 h-[2.5px] w-full bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
