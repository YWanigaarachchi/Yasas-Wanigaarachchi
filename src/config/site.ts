export const SITE_CONFIG = {
  githubUsername: 'YWanigaarachchi',
  githubApiBase: 'https://api.github.com',
  cacheKey: 'yw_portfolio_gh_v1',
  cacheTtlMs: 15 * 60 * 1000, // 15 minutes
  navItems: [
    { id: 'about', label: 'About', code: '01' },
    { id: 'skills', label: 'Stack', code: '02' },
    { id: 'projects', label: 'Projects', code: '03' },
    { id: 'journey', label: 'Journey', code: '04' },
    { id: 'telemetry', label: 'GitHub', code: '05' },
    { id: 'contact', label: 'Contact', code: '06' },
  ],
} as const;
