import { useCallback, useEffect, useState } from 'react';
import type { PageRoute } from '@/types/portfolio';

function resolveRouteFromHash(): PageRoute {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#/github' || hash === '#github-telemetry') {
    return 'github';
  }
  return 'home';
}

export function usePageRoute() {
  const [route, setRoute] = useState<PageRoute>(() => resolveRouteFromHash());

  useEffect(() => {
    const onHashChange = () => {
      const next = resolveRouteFromHash();
      setRoute(next);
      if (next === 'github') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((target: PageRoute, sectionId?: string) => {
    if (target === 'github') {
      window.location.hash = '#/github';
      setRoute('github');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute('home');
    if (sectionId) {
      window.location.hash = `#${sectionId}`;
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.history.pushState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { route, navigateTo };
}
