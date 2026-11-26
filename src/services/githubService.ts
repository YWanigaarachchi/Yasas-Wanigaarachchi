import { SITE_CONFIG } from '@/config/site';
import { DEVELOPER_PROFILE } from '@/data/profile';
import type { GitHubRepoSummary, GitHubTelemetryData, GitHubUserSummary } from '@/types/portfolio';

interface CachedTelemetry {
  timestamp: number;
  data: GitHubTelemetryData;
}

const FALLBACK_REPOS: GitHubRepoSummary[] = [
  {
    name: 'ContextSync-AI',
    description: 'Intelligent Retrieval-Augmented Generation system connecting LLMs to proprietary knowledge bases.',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/ContextSync-AI',
    homepage: null,
    topics: ['rag', 'llm', 'ai'],
    updatedAt: '2026-06-09T17:11:53Z',
  },
  {
    name: 'Resortify-hms',
    description: 'Decoupled Hotel Management System with Node.js/Express API, React + Tailwind dashboard, dual-currency sync & KOT.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/Resortify-hms',
    homepage: 'https://resortify-hms.vercel.app',
    topics: ['reactjs', 'nodejs', 'mern-stack-app', 'hospitality-tech'],
    updatedAt: '2026-08-14T06:36:43Z',
  },
  {
    name: 'Siyala_HMS1',
    description: 'Multi-chain Hotel Management System built for Sri Lankan hospitality across Kandy & Hikkaduwa.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/Siyala_HMS1',
    homepage: 'https://siyala-hms-1.vercel.app',
    topics: ['hospitality', 'hms'],
    updatedAt: '2026-08-14T05:40:39Z',
  },
  {
    name: 'athithi-hms',
    description: 'Modern Hotel Management System for Sri Lankan boutique villas and luxury resorts.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/athithi-hms',
    homepage: 'https://athithi-hms.vercel.app',
    topics: [],
    updatedAt: '2026-08-17T19:49:21Z',
  },
  {
    name: 'lankarest-hms',
    description: 'Scalable and modular Hotel Management System for Sri Lankan tourism and hospitality.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/lankarest-hms',
    homepage: 'https://lankarest-hms.vercel.app',
    topics: [],
    updatedAt: '2026-08-14T06:22:04Z',
  },
  {
    name: 'GreenLife_Wellness_Center',
    description: 'Holistic wellness portal for yoga, therapy, and nutrition with booking & therapist dashboards.',
    language: 'PHP',
    stars: 1,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/GreenLife_Wellness_Center',
    homepage: null,
    topics: [],
    updatedAt: '2026-03-10T08:42:35Z',
  },
  {
    name: 'Pet-Shop-System',
    description: 'Paw Pet Shop System built with Java.',
    language: 'Java',
    stars: 0,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/Pet-Shop-System',
    homepage: null,
    topics: [],
    updatedAt: '2025-10-02T18:50:22Z',
  },
  {
    name: 'GENIUS_BOOKS-',
    description: 'Book shop management system in C++.',
    language: 'C++',
    stars: 1,
    forks: 0,
    isFork: false,
    htmlUrl: 'https://github.com/YWanigaarachchi/GENIUS_BOOKS-',
    homepage: null,
    topics: [],
    updatedAt: '2025-10-02T18:39:31Z',
  },
];

function computeLanguageDistribution(repos: GitHubRepoSummary[]) {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.isFork && repo.language) {
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
  }
  const total = Array.from(counts.values()).reduce((acc, n) => acc + n, 0) || 1;
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }));
}

export function getFallbackGitHubTelemetry(): GitHubTelemetryData {
  const user: GitHubUserSummary = {
    login: SITE_CONFIG.githubUsername,
    name: DEVELOPER_PROFILE.shortName,
    avatarUrl: DEVELOPER_PROFILE.avatarUrl,
    bio: 'create something new.',
    company: 'SoftGenix.LK',
    location: 'Colombo',
    publicRepos: 18,
    followers: 29,
    following: 41,
    htmlUrl: `https://github.com/${SITE_CONFIG.githubUsername}`,
    createdAt: '2024-04-28T19:01:00Z',
  };

  const originalRepos = FALLBACK_REPOS.filter((r) => !r.isFork);
  return {
    user,
    repos: originalRepos,
    languageDistribution: computeLanguageDistribution(originalRepos),
    totalStars: FALLBACK_REPOS.reduce((sum, r) => sum + r.stars, 0) + 1,
    originalRepoCount: 14,
    syncedAt: new Date().toISOString(),
    isFallback: true,
  };
}

function readCache(): GitHubTelemetryData | null {
  try {
    const raw = sessionStorage.getItem(SITE_CONFIG.cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedTelemetry;
    if (Date.now() - parsed.timestamp > SITE_CONFIG.cacheTtlMs) {
      sessionStorage.removeItem(SITE_CONFIG.cacheKey);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: GitHubTelemetryData): void {
  try {
    const payload: CachedTelemetry = { timestamp: Date.now(), data };
    sessionStorage.setItem(SITE_CONFIG.cacheKey, JSON.stringify(payload));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export async function fetchGitHubTelemetry(signal?: AbortSignal): Promise<GitHubTelemetryData> {
  const cached = readCache();
  if (cached) return cached;

  const { githubApiBase, githubUsername } = SITE_CONFIG;
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };

  const [userRes, reposRes] = await Promise.all([
    fetch(`${githubApiBase}/users/${githubUsername}`, { headers, signal }),
    fetch(`${githubApiBase}/users/${githubUsername}/repos?sort=updated&per_page=100`, {
      headers,
      signal,
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API returned ${userRes.status}/${reposRes.status}`);
  }

  const rawUser = await userRes.json();
  const rawRepos = (await reposRes.json()) as Array<Record<string, unknown>>;

  const user: GitHubUserSummary = {
    login: String(rawUser.login ?? githubUsername),
    name: String(rawUser.name ?? DEVELOPER_PROFILE.shortName),
    avatarUrl: String(rawUser.avatar_url ?? DEVELOPER_PROFILE.avatarUrl),
    bio: rawUser.bio ? String(rawUser.bio).trim() : null,
    company: rawUser.company ? String(rawUser.company) : null,
    location: rawUser.location ? String(rawUser.location) : null,
    publicRepos: Number(rawUser.public_repos ?? 0),
    followers: Number(rawUser.followers ?? 0),
    following: Number(rawUser.following ?? 0),
    htmlUrl: String(rawUser.html_url ?? `https://github.com/${githubUsername}`),
    createdAt: String(rawUser.created_at ?? ''),
  };

  const allRepos: GitHubRepoSummary[] = rawRepos.map((r) => ({
    name: String(r.name ?? ''),
    description: r.description ? String(r.description) : null,
    language: r.language ? String(r.language) : null,
    stars: Number(r.stargazers_count ?? 0),
    forks: Number(r.forks_count ?? 0),
    isFork: Boolean(r.fork),
    htmlUrl: String(r.html_url ?? ''),
    homepage: r.homepage ? String(r.homepage) : null,
    topics: Array.isArray(r.topics) ? (r.topics as string[]) : [],
    updatedAt: String(r.updated_at ?? ''),
  }));

  const originalRepos = allRepos.filter((r) => !r.isFork);
  const data: GitHubTelemetryData = {
    user,
    repos: originalRepos.filter(
      (r) => r.name !== githubUsername && r.name !== 'awesome-github-profile-readme-templates'
    ),
    languageDistribution: computeLanguageDistribution(originalRepos),
    totalStars: allRepos.reduce((sum, r) => sum + r.stars, 0),
    originalRepoCount: originalRepos.length,
    syncedAt: new Date().toISOString(),
    isFallback: false,
  };

  writeCache(data);
  return data;
}
