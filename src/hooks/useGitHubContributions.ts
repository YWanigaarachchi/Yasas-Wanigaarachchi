import { useCallback, useEffect, useState } from 'react';
import {
  fetchGitHubContributions,
  fetchGitHubEvents,
  getFallbackContributions,
  getFallbackEvents,
} from '@/services/githubService';
import type { GitHubActivityEvent, GitHubContributionsData } from '@/types/portfolio';

export function useGitHubContributions() {
  const [contributions, setContributions] = useState<GitHubContributionsData>(() =>
    getFallbackContributions()
  );
  const [events, setEvents] = useState<GitHubActivityEvent[]>(() => getFallbackEvents());
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback((forceRefresh = false, signal?: AbortSignal) => {
    setIsLoading(true);
    Promise.allSettled([
      fetchGitHubContributions(signal, forceRefresh),
      fetchGitHubEvents(signal, forceRefresh),
    ])
      .then(([contribRes, eventsRes]) => {
        if (contribRes.status === 'fulfilled') {
          setContributions(contribRes.value);
        }
        if (eventsRes.status === 'fulfilled' && eventsRes.value.length > 0) {
          setEvents(eventsRes.value);
        }
      })
      .finally(() => {
        if (!signal?.aborted) setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(false, controller.signal);
    return () => controller.abort();
  }, [load]);

  const refresh = useCallback(() => {
    load(true);
  }, [load]);

  return { contributions, events, isLoading, refresh };
}
