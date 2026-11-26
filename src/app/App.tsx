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
import { useGitHubStats } from '@/hooks/useGitHubStats';

function PortfolioShell() {
  const { data: telemetry, isLoading } = useGitHubStats();

  return (
    <div className="min-h-screen bg-engineering-grid">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection telemetry={telemetry} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <GitHubTelemetrySection telemetry={telemetry} isLoading={isLoading} />
        <ContactSection />
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
