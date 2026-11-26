import type { TimelineEntry } from '@/types/portfolio';

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'softgenix-founder',
    type: 'experience',
    period: 'Present',
    status: 'Active',
    title: 'Founder & Lead Software Architect',
    organization: 'SoftgenixLK',
    organizationUrl: 'https://softgenix.lk',
    location: 'Colombo, Sri Lanka',
    description:
      'Leading product architecture, engineering strategy, and delivery of enterprise Hospitality SaaS (HMS) products, bespoke full-stack applications, and cloud infrastructure solutions tailored for Sri Lankan and global businesses.',
    badges: ['Product Architecture', 'Hospitality SaaS', 'Full-Stack & Cloud', 'Leadership'],
  },
  {
    id: 'bsc-se',
    type: 'education',
    period: 'In Progress',
    status: 'Reading',
    title: 'BSc (Hons) in Software Engineering',
    organization: 'Cardiff Metropolitan University',
    location: 'United Kingdom / Sri Lanka',
    description:
      'Advancing expertise in distributed software architecture, scalable system design, cloud computing, and applied AI engineering.',
    badges: ['Software Engineering', 'Distributed Systems', 'Cloud Architecture'],
  },
  {
    id: 'hd-csse',
    type: 'education',
    period: 'Completed',
    status: 'Merit Pass',
    title: 'Higher Diploma in Computer Science & Software Engineering',
    organization: 'Cardiff Metropolitan University',
    location: 'United Kingdom / Sri Lanka',
    description:
      'Graduated with a Merit Pass, building a strong foundation in algorithms, object-oriented engineering, database systems, and full-stack web development.',
    badges: ['Merit Pass', 'Computer Science', 'OOP & Databases', 'Web Systems'],
  },
];
