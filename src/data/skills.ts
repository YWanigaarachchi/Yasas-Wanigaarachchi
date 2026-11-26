import type { SkillItem } from '@/types/portfolio';

export const SKILLS: SkillItem[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages', level: 'Core', note: 'Type-safe frontend & backend apps' },
  { name: 'JavaScript', category: 'Languages', level: 'Core', note: 'ES2023+ full-stack engineering' },
  { name: 'Python', category: 'Languages', level: 'Core', note: 'FastAPI, AI/RAG & automation' },
  { name: 'Java', category: 'Languages', level: 'Proficient', note: 'OOP & enterprise foundations' },
  { name: 'PHP', category: 'Languages', level: 'Proficient', note: 'Server-rendered web portals' },
  { name: 'Dart', category: 'Languages', level: 'Working', note: 'Cross-platform Flutter apps' },
  { name: 'C++', category: 'Languages', level: 'Working', note: 'Algorithms & systems tools' },

  // Frontend & UI
  { name: 'React', category: 'Frontend & UI', level: 'Core', note: 'Component systems & hooks' },
  { name: 'Next.js', category: 'Frontend & UI', level: 'Core', note: 'SSR, App Router & performance' },
  { name: 'Tailwind CSS', category: 'Frontend & UI', level: 'Core', note: 'Design systems & responsive UI' },
  { name: 'Vite', category: 'Frontend & UI', level: 'Core', note: 'Modern fast bundling & DX' },
  { name: 'Redux', category: 'Frontend & UI', level: 'Proficient', note: 'Predictable global state' },
  { name: 'Figma', category: 'Frontend & UI', level: 'Proficient', note: 'Wireframing & UI handoff' },

  // Backend & AI
  { name: 'Node.js', category: 'Backend & AI', level: 'Core', note: 'Event-driven scalable APIs' },
  { name: 'Express', category: 'Backend & AI', level: 'Core', note: 'REST microservices & middleware' },
  { name: 'FastAPI', category: 'Backend & AI', level: 'Core', note: 'Async Python APIs for AI' },
  { name: 'RAG / LLMs', category: 'Backend & AI', level: 'Core', note: 'Vector retrieval & agent flows' },
  { name: 'Flask', category: 'Backend & AI', level: 'Proficient', note: 'Lightweight Python services' },
  { name: 'Flutter', category: 'Backend & AI', level: 'Working', note: 'Multi-platform mobile UI' },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', level: 'Core', note: 'Cloud architecture & hosting' },
  { name: 'GCP', category: 'Cloud & DevOps', level: 'Proficient', note: 'Cloud services & workloads' },
  { name: 'Docker', category: 'Cloud & DevOps', level: 'Core', note: 'Containerized deployments' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', level: 'Proficient', note: 'Container orchestration' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', level: 'Core', note: 'Automated CI/CD pipelines' },
  { name: 'NGINX', category: 'Cloud & DevOps', level: 'Proficient', note: 'Reverse proxy & load routing' },
  { name: 'Linux', category: 'Cloud & DevOps', level: 'Core', note: 'Server ops & shell automation' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', level: 'Core', note: 'Relational modeling & ACID' },
  { name: 'MongoDB', category: 'Databases', level: 'Core', note: 'Document stores for SaaS' },
  { name: 'MySQL', category: 'Databases', level: 'Proficient', note: 'Structured web backends' },
  { name: 'Redis', category: 'Databases', level: 'Proficient', note: 'In-memory caching & queues' },
  { name: 'Firebase', category: 'Databases', level: 'Proficient', note: 'Realtime sync & auth' },
];
