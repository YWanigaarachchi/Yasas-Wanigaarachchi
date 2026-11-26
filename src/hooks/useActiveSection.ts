import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });

          let bestId = '';
          let bestRatio = 0;
          visibilityMap.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = key;
            }
          });
          if (bestId) setActiveId(bestId);
        },
        {
          rootMargin: '-25% 0px -55% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeId;
}
