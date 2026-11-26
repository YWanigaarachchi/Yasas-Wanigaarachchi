import { useCallback, useEffect, useState } from 'react';
import {
  fetchGitHubTelemetry,
  getFallbackGitHubTelemetry,
} from '@/services/githubService';
import type { GitHubTelemetryData } from '@/types/portfolio';

export function useGitHubStats() {
  const [data, setData] = useState<GitHubTelemetryData>(() => getFallbackGitHubTelemetry());
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback((forceRefresh = false, signal?: AbortSignal) => {
    setIsLoading(true);
    fetchGitHubTelemetry(signal, forceRefresh)
      .then((liveData) => {
        setData(liveData);
      })
      .catch(() => {
        // Keep curated fallback silently on network / rate-limit failure
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

  return { data, isLoading, refresh };
}
