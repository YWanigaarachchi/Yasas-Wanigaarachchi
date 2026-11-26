import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { GitHubTelemetrySection } from '@/components/sections/GitHubTelemetrySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { GitHubTelemetryPage } from '@/pages/GitHubTelemetryPage';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { useGitHubContributions } from '@/hooks/useGitHubContributions';
import { usePageRoute } from '@/hooks/usePageRoute';

function PortfolioShell() {
  const { route, navigateTo } = usePageRoute();
  const { data: telemetry, isLoading: isStatsLoading, refresh: refreshStats } = useGitHubStats();
  const {
    contributions,
    events,
    isLoading: isContribLoading,
    refresh: refreshContributions,
  } = useGitHubContributions();

  const handleRefreshAll = () => {
    refreshStats();
    refreshContributions();
  };

  return (
    <div className="min-h-screen bg-engineering-grid">
      <ScrollProgressBar />
      <Navbar route={route} onNavigate={navigateTo} />
      <main>
        {route === 'github' ? (
          <GitHubTelemetryPage
            telemetry={telemetry}
            contributions={contributions}
            events={events}
            isLoading={isStatsLoading || isContribLoading}
            onRefresh={handleRefreshAll}
            onBackHome={() => navigateTo('home')}
          />
        ) : (
          <>
            <HeroSection telemetry={telemetry} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <JourneySection />
            <GitHubTelemetrySection
              telemetry={telemetry}
              contributions={contributions}
              isLoading={isStatsLoading || isContribLoading}
              onOpenFullPage={() => navigateTo('github')}
            />
            <ContactSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <PortfolioShell />
    </ThemeProvider>
  );
}

export default App;
