import { useEffect, useState } from 'react';
import {
  fetchGitHubTelemetry,
  getFallbackGitHubTelemetry,
} from '@/services/githubService';
import type { GitHubTelemetryData } from '@/types/portfolio';

export function useGitHubStats() {
  const [data, setData] = useState<GitHubTelemetryData>(() => getFallbackGitHubTelemetry());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchGitHubTelemetry(controller.signal)
      .then((liveData) => {
        setData(liveData);
      })
      .catch(() => {
        // Keep curated fallback silently on network / rate-limit failure
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, isLoading };
}
