import { SITE_CONFIG } from '@/config/site';
import { DEVELOPER_PROFILE } from '@/data/profile';
import type {
  ContributionDay,
  ContributionLevel,
  GitHubActivityEvent,
  GitHubContributionsData,
  GitHubRepoSummary,
  GitHubTelemetryData,
  GitHubUserSummary,
  MonthlyContribution,
} from '@/types/portfolio';

interface CachedPayload<T> {
  timestamp: number;
  data: T;
}

const FALLBACK_REPOS: GitHubRepoSummary[] = [
  {
    name: 'ContextSync-AI',
    description:
      'Intelligent Retrieval-Augmented Generation system connecting LLMs to proprietary knowledge bases.',
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
    description:
      'Decoupled Hotel Management System with Node.js/Express API, React + Tailwind dashboard, dual-currency sync & KOT.',
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
    description:
      'Multi-chain Hotel Management System built for Sri Lankan hospitality across Kandy & Hikkaduwa.',
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
    description:
      'Modern Hotel Management System for Sri Lankan boutique villas and luxury resorts.',
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
    description:
      'Scalable and modular Hotel Management System for Sri Lankan tourism and hospitality.',
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
    description:
      'Holistic wellness portal for yoga, therapy, and nutrition with booking & therapist dashboards.',
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

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload<T>;
    if (Date.now() - parsed.timestamp > SITE_CONFIG.cacheTtlMs) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    const payload: CachedPayload<T> = { timestamp: Date.now(), data };
    sessionStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

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

export async function fetchGitHubTelemetry(
  signal?: AbortSignal,
  forceRefresh = false
): Promise<GitHubTelemetryData> {
  if (!forceRefresh) {
    const cached = readCache<GitHubTelemetryData>(SITE_CONFIG.cacheKey);
    if (cached) return cached;
  }

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
      (r) =>
        r.name !== githubUsername &&
        r.name !== 'awesome-github-profile-readme-templates'
    ),
    languageDistribution: computeLanguageDistribution(originalRepos),
    totalStars: allRepos.reduce((sum, r) => sum + r.stars, 0),
    originalRepoCount: originalRepos.length,
    syncedAt: new Date().toISOString(),
    isFallback: false,
  };

  writeCache(SITE_CONFIG.cacheKey, data);
  return data;
}

function summarizeContributions(
  days: ContributionDay[],
  totalOverride?: number,
  isFallback = false
): GitHubContributionsData {
  let longestStreak = 0;
  let running = 0;
  let activeDays = 0;
  let computedTotal = 0;
  let bestDay: { date: string; count: number } | null = null;
  const monthMap = new Map<string, number>();

  for (const day of days) {
    computedTotal += day.count;
    if (day.count > 0) {
      activeDays += 1;
      running += 1;
      if (running > longestStreak) longestStreak = running;
      if (!bestDay || day.count > bestDay.count) {
        bestDay = { date: day.date, count: day.count };
      }
    } else {
      running = 0;
    }

    const monthKey = day.date.slice(0, 7);
    monthMap.set(monthKey, (monthMap.get(monthKey) ?? 0) + day.count);
  }

  // Current streak counting backwards from most recent day (allowing today = 0 if yesterday > 0)
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    const count = days[i].count;
    if (count > 0) {
      currentStreak += 1;
    } else if (i === days.length - 1) {
      continue;
    } else {
      break;
    }
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyTotals: MonthlyContribution[] = Array.from(monthMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12)
    .map(([monthKey, count]) => {
      const monthIdx = Number(monthKey.split('-')[1]) - 1;
      return {
        monthKey,
        label: monthNames[monthIdx] ?? monthKey,
        count,
      };
    });

  const totalLastYear = totalOverride ?? computedTotal;
  const averagePerActiveDay = activeDays > 0 ? Math.round((totalLastYear / activeDays) * 10) / 10 : 0;

  return {
    totalLastYear,
    days,
    currentStreak,
    longestStreak,
    activeDays,
    averagePerActiveDay,
    bestDay,
    monthlyTotals,
    syncedAt: new Date().toISOString(),
    isFallback,
  };
}

export function getFallbackContributions(): GitHubContributionsData {
  const days: ContributionDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = 364; offset >= 0; offset -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const iso = d.toISOString().slice(0, 10);
    // Deterministic realistic pattern when offline
    const seed = (offset * 17 + d.getDay() * 31) % 23;
    const count = seed < 6 ? 0 : seed < 12 ? 3 : seed < 17 ? 9 : seed < 21 ? 18 : 34;
    const level: ContributionLevel =
      count === 0 ? 0 : count <= 4 ? 1 : count <= 10 ? 2 : count <= 20 ? 3 : 4;
    days.push({ date: iso, count, level });
  }

  return summarizeContributions(days, undefined, true);
}

export async function fetchGitHubContributions(
  signal?: AbortSignal,
  forceRefresh = false
): Promise<GitHubContributionsData> {
  if (!forceRefresh) {
    const cached = readCache<GitHubContributionsData>(SITE_CONFIG.contributionsCacheKey);
    if (cached) return cached;
  }

  const url = `${SITE_CONFIG.githubContributionsApi}/${SITE_CONFIG.githubUsername}?y=last`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Contributions API returned ${res.status}`);
  }

  const json = (await res.json()) as {
    total?: { lastYear?: number };
    contributions?: Array<{ date: string; count: number; level: number }>;
  };

  const days: ContributionDay[] = (json.contributions ?? []).map((item) => {
    const clampedLevel = Math.max(0, Math.min(4, Number(item.level ?? 0))) as ContributionLevel;
    return {
      date: String(item.date),
      count: Number(item.count ?? 0),
      level: clampedLevel,
    };
  });

  if (days.length === 0) {
    throw new Error('Contributions API returned empty dataset');
  }

  const data = summarizeContributions(days, json.total?.lastYear, false);
  writeCache(SITE_CONFIG.contributionsCacheKey, data);
  return data;
}

export function getFallbackEvents(): GitHubActivityEvent[] {
  return [
    {
      id: 'fallback-1',
      type: 'PullRequestEvent',
      repoName: 'YWanigaarachchi/Yasas-Wanigaarachchi',
      repoUrl: 'https://github.com/YWanigaarachchi/Yasas-Wanigaarachchi',
      createdAt: new Date().toISOString(),
      summary: 'Updated pull request on Yasas-Wanigaarachchi',
    },
    {
      id: 'fallback-2',
      type: 'PushEvent',
      repoName: 'YWanigaarachchi/Siyala_HMS1',
      repoUrl: 'https://github.com/YWanigaarachchi/Siyala_HMS1',
      createdAt: '2026-11-05T10:38:55Z',
      summary: 'Pushed commits to Siyala_HMS1',
    },
    {
      id: 'fallback-3',
      type: 'PushEvent',
      repoName: 'YWanigaarachchi/Resortify-hms',
      repoUrl: 'https://github.com/YWanigaarachchi/Resortify-hms',
      createdAt: '2026-08-14T06:36:43Z',
      summary: 'Pushed commits to Resortify-hms',
    },
  ];
}

function describeEvent(type: string, repoShort: string, payload: Record<string, unknown>): string {
  switch (type) {
    case 'PushEvent': {
      const commits = Array.isArray(payload.commits) ? payload.commits.length : 0;
      return commits > 0
        ? `Pushed ${commits} commit${commits === 1 ? '' : 's'} to ${repoShort}`
        : `Pushed updates to ${repoShort}`;
    }
    case 'PullRequestEvent': {
      const action = typeof payload.action === 'string' ? payload.action : 'updated';
      return `${action.charAt(0).toUpperCase() + action.slice(1)} a pull request in ${repoShort}`;
    }
    case 'CreateEvent': {
      const refType = typeof payload.ref_type === 'string' ? payload.ref_type : 'resource';
      return `Created ${refType} in ${repoShort}`;
    }
    case 'WatchEvent':
      return `Starred ${repoShort}`;
    case 'ForkEvent':
      return `Forked ${repoShort}`;
    case 'IssuesEvent': {
      const action = typeof payload.action === 'string' ? payload.action : 'updated';
      return `${action.charAt(0).toUpperCase() + action.slice(1)} an issue in ${repoShort}`;
    }
    default:
      return `${type.replace('Event', '')} activity on ${repoShort}`;
  }
}

export async function fetchGitHubEvents(
  signal?: AbortSignal,
  forceRefresh = false
): Promise<GitHubActivityEvent[]> {
  if (!forceRefresh) {
    const cached = readCache<GitHubActivityEvent[]>(SITE_CONFIG.eventsCacheKey);
    if (cached) return cached;
  }

  const url = `${SITE_CONFIG.githubApiBase}/users/${SITE_CONFIG.githubUsername}/events/public?per_page=15`;
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Events API returned ${res.status}`);
  }

  const raw = (await res.json()) as Array<Record<string, unknown>>;
  const events: GitHubActivityEvent[] = raw.slice(0, 10).map((item, index) => {
    const repoObj = (item.repo as Record<string, unknown>) ?? {};
    const repoName = String(repoObj.name ?? `${SITE_CONFIG.githubUsername}/repository`);
    const repoShort = repoName.includes('/') ? repoName.split('/')[1] : repoName;
    const type = String(item.type ?? 'PushEvent');
    const payload = (item.payload as Record<string, unknown>) ?? {};

    return {
      id: String(item.id ?? `evt-${index}`),
      type,
      repoName,
      repoUrl: `https://github.com/${repoName}`,
      createdAt: String(item.created_at ?? ''),
      summary: describeEvent(type, repoShort, payload),
    };
  });

  writeCache(SITE_CONFIG.eventsCacheKey, events);
  return events;
}
