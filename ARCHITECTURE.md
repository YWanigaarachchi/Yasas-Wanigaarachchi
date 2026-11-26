# Portfolio System Architecture

This document describes the frontend architecture, layering strategy, data flow, caching model, and deployment setup for **Yasas Wanigaarachchi's React Engineering Portfolio** (`YWanigaarachchi`).

---

## 1. Architectural Principles

- **Clean Separation of Concerns (Layered Modular Frontend)**: Domain types, static curated content, external API services, stateful custom hooks, reusable UI primitives, and page sections are strictly decoupled.
- **Resilient Hybrid Data Strategy**: Curated portfolio metadata (`src/data/`) loads instantaneously with zero layout shift, while live GitHub telemetry (`src/services/githubService.ts`) hydrates asynchronously with `sessionStorage` caching (15-minute TTL) and automatic graceful fallback if offline or rate-limited.
- **Type-Safe Domain Modeling**: Strict TypeScript (`strict: true`, `noUnusedLocals`, `noUnusedParameters`) with `@/` path aliases.
- **Performance-First Bundling**: Vite 6 with manual Rollup chunk splitting (`vendor`, `motion`, `icons`) for optimal browser caching.

---

## 2. High-Level System Architecture

```mermaid
flowchart TB
  subgraph Client["React 19 SPA (Vite + TypeScript + Tailwind v4)"]
    Entry["main.tsx"] --> Provider["ThemeProvider (Dark/Light + localStorage)"]
    Provider --> Shell["App.tsx (PortfolioShell)"]

    subgraph Hooks["Custom Hooks Layer"]
      H1["useGitHubStats()"]
      H2["useActiveSection()"]
      H3["useScrollProgress()"]
    end

    subgraph Presentation["Presentation Layer"]
      Layout["Layout: Navbar · ScrollProgressBar · Footer"]
      Sections["Sections: Hero · About · Skills · Projects · Journey · GitHubTelemetry · Contact"]
      UI["UI Primitives: SectionHeader · ProjectModal"]
    end

    subgraph DataLayer["Data & Service Layer"]
      Static["Static Curated Data (profile, projects, skills, timeline)"]
      Service["githubService.ts"]
      Cache[("sessionStorage (15m TTL)")]
    end

    Shell --> Hooks
    Shell --> Presentation
    Sections --> Static
    Sections --> UI
    H1 --> Service
    Service <--> Cache
  end

  subgraph External["External Services"]
    GH["GitHub REST API v3 (/users/YWanigaarachchi & /repos)"]
    Vercel["Live Project Demos (*.vercel.app)"]
  end

  Service -- "HTTPS JSON (AbortController)" --> GH
  Sections -. "Outbound Demo Links" .-> Vercel
```

---

## 3. Folder Structure & Module Responsibilities

```text
Yasas-Wanigaarachchi/
├── index.html                          # Entry HTML, Google Fonts & SEO meta tags
├── vite.config.ts                      # Vite + React + Tailwind v4 + chunk splitting
├── tsconfig*.json                      # Strict TypeScript project references
├── ARCHITECTURE.md                     # This architecture specification
├── public/
│   └── favicon.svg                     # Custom YW monogram vector icon
└── src/
    ├── main.tsx                        # React 19 root mount
    ├── styles/
    │   └── index.css                   # Tailwind v4 tokens, dark variant & grid backdrop
    ├── config/
    │   └── site.ts                     # Central constants (GitHub handle, cache TTL, nav)
    ├── types/
    │   └── portfolio.ts                # Core domain TypeScript interfaces
    ├── data/
    │   ├── profile.ts                  # Developer identity, specialties & social links
    │   ├── projects.ts                 # Featured & systems projects with architecture notes
    │   ├── skills.ts                   # Categorized engineering stack & proficiency tiers
    │   └── timeline.ts                 # Founder experience & Cardiff Met education
    ├── services/
    │   └── githubService.ts            # GitHub REST client + TTL cache + fallback factory
    ├── hooks/
    │   ├── useGitHubStats.ts           # Live telemetry hook with AbortController cleanup
    │   ├── useActiveSection.ts         # IntersectionObserver scroll-spy for Navbar
    │   └── useScrollProgress.ts        # Passive scroll listener for progress bar
    ├── app/
    │   ├── App.tsx                     # Root composition shell
    │   └── providers/
    │       └── ThemeProvider.tsx       # Persistent Dark/Light theme context
    └── components/
        ├── ui/
        │   ├── SectionHeader.tsx       # Standardized indexed section headings (01 // ...)
        │   └── ProjectModal.tsx        # Accessible architecture deep-dive modal
        ├── layout/
        │   ├── ScrollProgressBar.tsx   # Top scroll indicator
        │   ├── Navbar.tsx              # Sticky glassmorphic header + mobile drawer
        │   └── Footer.tsx              # Footer & back-to-top anchor
        └── sections/
            ├── HeroSection.tsx         # Identity hero + interactive TS code profile card
            ├── AboutSection.tsx        # 4 core engineering specialty pillars
            ├── SkillsSection.tsx       # Tab-filtered technical stack matrix
            ├── ProjectsSection.tsx     # Filterable showcase + Architecture modal trigger
            ├── JourneySection.tsx      # SoftgenixLK & Cardiff Met vertical timeline
            ├── GitHubTelemetrySection.tsx # Live KPI cards, language bar & repo feed
            └── ContactSection.tsx      # Direct links, copy email & mailto composer
```

---

## 4. Data Flow & Caching Sequence (GitHub Live Sync)

```mermaid
sequenceDiagram
  participant UI as PortfolioShell
  participant Hook as useGitHubStats
  participant Svc as githubService
  participant Cache as sessionStorage
  participant API as GitHub REST API

  UI->>Hook: Mount & initialize
  Hook->>Svc: getFallbackGitHubTelemetry()
  Hook-->>UI: Immediate curated snapshot (0ms FCP)
  Hook->>Svc: fetchGitHubTelemetry(signal)
  Svc->>Cache: Read cached payload
  alt Cache Hit (< 15 min)
    Cache-->>Svc: Return cached telemetry
  else Cache Miss / Expired
    Svc->>API: Promise.all([/users/YWanigaarachchi, /repos])
    alt HTTP 200 OK
      API-->>Svc: Live user & repo JSON
      Svc->>Svc: Compute language distribution & stars
      Svc->>Cache: Persist with timestamp
    else Rate-limited / Offline
      API-->>Svc: Error
      Svc-->>Hook: Reject (silently retain curated snapshot)
    end
  end
  Svc-->>Hook: Live telemetry object
  Hook-->>UI: Seamless state hydration
```

---

## 5. Deployment Architecture

Because the application compiles to a pure static bundle (`dist/`), it can be deployed with zero backend overhead on:

1. **Vercel (Recommended)**: Connect `YWanigaarachchi/Yasas-Wanigaarachchi` directly; Vite preset auto-detected (`npm run build` -> `dist/`).
2. **GitHub Pages**: Add a GitHub Actions workflow running `npm ci && npm run build` and publishing `dist/` to `gh-pages`.
3. **Cloudflare Pages / AWS S3 + CloudFront**: Upload `dist/` with immutable caching on `/assets/*`.
