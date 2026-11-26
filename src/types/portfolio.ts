export type ProjectCategory = 'All' | 'AI / RAG' | 'Hospitality SaaS' | 'Web & Systems';

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  platform: 'github' | 'linkedin' | 'website' | 'devto' | 'twitter' | 'email';
}

export interface Specialty {
  id: string;
  code: string;
  title: string;
  summary: string;
  highlights: string[];
  icon: 'layers' | 'cpu' | 'cloud' | 'building';
}

export interface DeveloperProfile {
  fullName: string;
  shortName: string;
  monogram: string;
  handle: string;
  headline: string;
  roles: string[];
  company: {
    name: string;
    role: string;
    url: string;
  };
  location: string;
  email: string;
  avatarUrl: string;
  availableForOpportunities: boolean;
  ethos: string[];
  bio: string;
  extendedBio: string;
  socials: SocialLink[];
  specialties: Specialty[];
}

export interface ProjectItem {
  id: string;
  repoName: string;
  title: string;
  domain: string;
  category: Exclude<ProjectCategory, 'All'>;
  tagline: string;
  description: string;
  architectureHighlights: string[];
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  accent: 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose';
}

export type SkillCategory =
  | 'All'
  | 'Languages'
  | 'Frontend & UI'
  | 'Backend & AI'
  | 'Cloud & DevOps'
  | 'Databases';

export interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  level: 'Core' | 'Proficient' | 'Working';
  note: string;
}

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  period: string;
  status: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  description: string;
  badges: string[];
}

export interface GitHubUserSummary {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  htmlUrl: string;
  createdAt: string;
}

export interface GitHubRepoSummary {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  isFork: boolean;
  htmlUrl: string;
  homepage: string | null;
  topics: string[];
  updatedAt: string;
}

export interface GitHubTelemetryData {
  user: GitHubUserSummary;
  repos: GitHubRepoSummary[];
  languageDistribution: Array<{ language: string; count: number; percentage: number }>;
  totalStars: number;
  originalRepoCount: number;
  syncedAt: string;
  isFallback: boolean;
}
