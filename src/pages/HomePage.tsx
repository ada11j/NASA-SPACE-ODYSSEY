import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo } from '@/components/home/BrandLogo';
import { LanguageSwitcher } from '@/components/home/LanguageSwitcher';
import { LunarExplorationSection } from '@/components/home/LunarExplorationSection';
import { LunarMissionDetailView } from '@/components/home/LunarMissionDetailView';
import { MarsExplorationSection } from '@/components/home/MarsExplorationSection';
import { MarsMapSection } from '@/components/home/MarsMapSection';
import { MarsPlanet } from '@/components/home/MarsPlanet';
import { MissionSimulationSection } from '@/components/home/MissionSimulationSection';
import { NasaPhotoArchiveSection } from '@/components/home/NasaPhotoArchiveSection';
import { ReferencesSection } from '@/components/home/ReferencesSection';
import { Rover3DLabSection } from '@/components/home/Rover3DLabSection';
import { RoverComparisonSection } from '@/components/home/RoverComparisonSection';
import { RoverDetailView } from '@/components/home/RoverDetailView';
import { SpacecraftQuizSection } from '@/components/home/SpacecraftQuizSection';
import { StarField } from '@/components/home/StarField';
import { useLanguage } from '@/context/LanguageContext';
import type { LunarMissionItem, MarsRoverItem, SectionId } from '@/types';

/**
 * Main landing experience of HVB HORIZON with smooth section navigation
 * across Mars Exploration, Interactive Mars Map, NASA Photo Archive,
 * 3D Rover Lab, Comparison Lab, Mission Simulation, Lunar Exploration,
 * and the Scientific Bibliography (Kaynakça).
 */
export function HomePage() {
  const { t } = useLanguage();
  const [selectedRover, setSelectedRover] = useState<MarsRoverItem | null>(null);
  const [selectedLunarMission, setSelectedLunarMission] = useState<LunarMissionItem | null>(null);

  const navItems: ReadonlyArray<{ id: SectionId; label: string }> = useMemo(
    () => [
      { id: 'mars-exploration', label: t.ui.nav.links.marsExploration.toUpperCase() },
      { id: 'mars-map', label: t.ui.nav.links.marsMap.toUpperCase() },
      { id: 'nasa-photo-archive', label: t.ui.nav.links.nasaPhotoArchive.toUpperCase() },
      { id: 'rover-3d-lab', label: t.ui.nav.links.rover3dLab.toUpperCase() },
      { id: 'rover-comparison', label: t.ui.nav.links.roverComparison.toUpperCase() },
      { id: 'mission-simulation', label: t.ui.nav.links.missionSimulation.toUpperCase() },
      { id: 'lunar-exploration', label: t.ui.nav.links.lunarExploration.toUpperCase() },
      { id: 'spacecraft-quiz', label: t.ui.nav.links.spacecraftQuiz.toUpperCase() },
      { id: 'references', label: t.ui.nav.links.references.toUpperCase() },
    ],
    [t]
  );

  const activeRover = useMemo(
    () =>
      selectedRover
        ? (t.data.marsRovers.find((r) => r.id === selectedRover.id) ?? selectedRover)
        : null,
    [selectedRover, t]
  );

  const activeLunarMission = useMemo(
    () =>
      selectedLunarMission
        ? (t.data.lunarMissions.find((m) => m.id === selectedLunarMission.id) ??
          selectedLunarMission)
        : null,
    [selectedLunarMission, t]
  );

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  const handleCloseRoverDetail = useCallback(() => {
    setSelectedRover(null);
  }, []);

  const handleCloseLunarDetail = useCallback(() => {
    setSelectedLunarMission(null);
  }, []);

  return (
    <div className="home">
      <StarField />
      <MarsPlanet>
        <header className="home__header">
          <a
            href="#hero"
            className="home__brandLink"
            aria-label="HVB HORIZON Ana Ekran"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('hero');
            }}
          >
            <BrandLogo />
          </a>

          <nav className="home__nav" aria-label={t.ui.nav.mainAriaLabel}>
            {navItems.map((navItem) => (
              <a
                key={navItem.id}
                href={`#${navItem.id}`}
                className="home__navLink"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(navItem.id);
                }}
              >
                {navItem.label}
              </a>
            ))}
          </nav>

          <LanguageSwitcher className="home__langSwitcher" />
        </header>

        <motion.main
          className="home__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="home__title">{t.ui.hero.title}</h1>
          <p className="home__subtitle">{t.ui.hero.subtitle}</p>
          <p className="home__description">{t.ui.hero.description}</p>

          <div className="home__actions">
            <a
              href="#mars-exploration"
              className="btn btn--primary"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('mars-exploration');
              }}
            >
              {t.ui.hero.ctaMars}
            </a>
            <a
              href="#lunar-exploration"
              className="btn btn--ghost"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('lunar-exploration');
              }}
            >
              {t.ui.hero.ctaLunar}
            </a>
          </div>

          {/* Quick Interactive Modules Strip */}
          <div className="home__modulePills" aria-label={t.ui.hero.modulesAriaLabel}>
            <a
              href="#mars-map"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('mars-map');
              }}
            >
              🗺️ {t.ui.hero.pills.marsMap}
            </a>
            <a
              href="#nasa-photo-archive"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('nasa-photo-archive');
              }}
            >
              📸 {t.ui.hero.pills.nasaPhotoArchive}
            </a>
            <a
              href="#rover-3d-lab"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rover-3d-lab');
              }}
            >
              🔬 {t.ui.hero.pills.rover3dLab}
            </a>
            <a
              href="#rover-comparison"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rover-comparison');
              }}
            >
              📊 {t.ui.hero.pills.roverComparison}
            </a>
            <a
              href="#mission-simulation"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('mission-simulation');
              }}
            >
              🚀 {t.ui.hero.pills.missionSimulation}
            </a>
            <a
              href="#lunar-exploration"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('lunar-exploration');
              }}
            >
              🌕 {t.ui.hero.pills.lunarExploration}
            </a>
            <a
              href="#spacecraft-quiz"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('spacecraft-quiz');
              }}
            >
              🧠 {t.ui.hero.pills.spacecraftQuiz}
            </a>
            <a
              href="#references"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('references');
              }}
            >
              📚 {t.ui.hero.pills.references}
            </a>
          </div>
        </motion.main>

        <div className="home__heroFooter">
          <p className="home__credit">{t.ui.hero.footer.credit}</p>
        </div>
      </MarsPlanet>

      {/* Scrollable Exploration & Interactive Science Sections */}
      <MarsExplorationSection
        onNavigateToSection={scrollToSection}
        onSelectRover={setSelectedRover}
      />
      <MarsMapSection />
      <NasaPhotoArchiveSection />
      <Rover3DLabSection />
      <RoverComparisonSection />
      <MissionSimulationSection />
      <LunarExplorationSection
        onNavigateToSection={scrollToSection}
        onSelectLunarMission={setSelectedLunarMission}
      />
      <SpacecraftQuizSection onNavigateToSection={scrollToSection} />
      <ReferencesSection onNavigateToSection={scrollToSection} />

      <footer className="home__footer">
        <div className="home__footerInner">
          <BrandLogo />
          <nav className="home__footerLinks" aria-label={t.ui.footer.quickLinksTitle}>
            {navItems.map((item) => (
              <a
                key={`footer-${item.id}`}
                href={`#${item.id}`}
                className="home__footerLink"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="home__credit">
            {t.ui.footer.copyright}
          </p>
        </div>
      </footer>

      {/* Dedicated Mars Rover Detail Screen Overlay */}
      <AnimatePresence>
        {activeRover ? (
          <RoverDetailView
            key="rover-detail-modal"
            rover={activeRover}
            onClose={handleCloseRoverDetail}
            onSelectRover={setSelectedRover}
          />
        ) : null}
      </AnimatePresence>

      {/* Dedicated Lunar Mission Detail Screen Overlay */}
      <AnimatePresence>
        {activeLunarMission ? (
          <LunarMissionDetailView
            key="lunar-detail-modal"
            mission={activeLunarMission}
            onClose={handleCloseLunarDetail}
            onSelectMission={setSelectedLunarMission}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
