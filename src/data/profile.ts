import type { DeveloperProfile } from '@/types/portfolio';

export const DEVELOPER_PROFILE: DeveloperProfile = {
  fullName: 'Yasas Nirmitha Wanigaarachchi',
  shortName: 'Yasas Wanigaarachchi',
  monogram: 'YNW',
  handle: 'YWanigaarachchi',
  headline: 'Full-Stack Software Engineer & Cloud Solutions Architect',
  roles: [
    'Founder @ SoftgenixLK',
    'Full-Stack Software Engineer',
    'Cloud Solutions Architect',
  ],
  company: {
    name: 'SoftgenixLK',
    role: 'Founder & Lead Architect',
    url: 'https://softgenix.lk',
  },
  location: 'Colombo, Sri Lanka',
  email: 'ywanigaarachchi@gmail.com',
  avatarUrl: 'https://avatars.githubusercontent.com/u/168370336?v=4',
  availableForOpportunities: true,
  ethos: ['Clean Architecture', 'High Reliability', 'Elegant UX'],
  bio: 'Building resilient Hospitality SaaS platforms, AI/RAG pipelines, and cloud-native full-stack products from Colombo, Sri Lanka.',
  extendedBio:
    'I am the Founder of SoftgenixLK and a Software Engineering undergraduate at Cardiff Metropolitan University (Higher Diploma Merit Pass). My engineering focus bridges decoupled full-stack web systems, Retrieval-Augmented Generation (RAG) workflows, and production AWS/GCP cloud architecture tailored for real-world scale.',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/YWanigaarachchi',
      handle: '@YWanigaarachchi',
      platform: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yasas-wanigaarachchi',
      handle: 'yasas-wanigaarachchi',
      platform: 'linkedin',
    },
    {
      label: 'SoftgenixLK',
      href: 'https://softgenix.lk',
      handle: 'softgenix.lk',
      platform: 'website',
    },
    {
      label: 'Dev.to',
      href: 'https://dev.to/ywanigaarachchi',
      handle: '@ywanigaarachchi',
      platform: 'devto',
    },
    {
      label: 'X / Twitter',
      href: 'https://x.com/YWanigaarachchi',
      handle: '@YWanigaarachchi',
      platform: 'twitter',
    },
    {
      label: 'Email',
      href: 'mailto:ywanigaarachchi@gmail.com',
      handle: 'ywanigaarachchi@gmail.com',
      platform: 'email',
    },
  ],
  specialties: [
    {
      id: 'hospitality-saas',
      code: 'SPEC // 01',
      title: 'Enterprise Hospitality SaaS (HMS)',
      summary:
        'Purpose-built multi-property hotel and resort management platforms tailored for Sri Lankan hospitality workflows.',
      highlights: [
        'Dual-currency sync (LKR / USD) & VAT/SSCL compliance',
        'Real-time Kitchen Order Ticket (KOT) & inventory sync',
        'Multi-chain booking engines & staff operations dashboards',
      ],
      icon: 'building',
    },
    {
      id: 'ai-rag',
      code: 'SPEC // 02',
      title: 'AI & RAG Workflows',
      summary:
        'Retrieval-Augmented Generation pipelines connecting proprietary knowledge bases with LLM orchestration.',
      highlights: [
        'Contextual vector search & grounded cited responses',
        'FastAPI & TypeScript agent orchestration services',
        'Streaming multi-turn conversational interfaces',
      ],
      icon: 'cpu',
    },
    {
      id: 'distributed-systems',
      code: 'SPEC // 03',
      title: 'Distributed & Decoupled Systems',
      summary:
        'Cleanly architected APIs and modular frontends designed for maintainability, speed, and fault isolation.',
      highlights: [
        'Node.js / Express & Python FastAPI service boundaries',
        'PostgreSQL, MongoDB & Redis caching strategies',
        'Type-safe React + Next.js client architectures',
      ],
      icon: 'layers',
    },
    {
      id: 'cloud-devops',
      code: 'SPEC // 04',
      title: 'Cloud Infrastructure & CI/CD',
      summary:
        'Automated deployment pipelines and containerized workloads across AWS, GCP, Docker, and Kubernetes.',
      highlights: [
        'Dockerized microservices with NGINX reverse proxies',
        'GitHub Actions CI/CD & zero-downtime releases',
        'Linux server hardening & observability telemetry',
      ],
      icon: 'cloud',
    },
  ],
};
