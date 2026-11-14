import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo } from '@/components/home/BrandLogo';
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
import { StarField } from '@/components/home/StarField';
import { HOME_CONTENT, MARS_VISUAL_CREDIT } from '@/config/constants';
import type { LunarMissionItem, MarsRoverItem, SectionId } from '@/types';

const NAV_ITEMS: ReadonlyArray<{ id: SectionId; label: string }> = [
  { id: 'mars-exploration', label: 'MARS ARAÇLARI' },
  { id: 'mars-map', label: 'MARS HARİTASI' },
  { id: 'nasa-photo-archive', label: 'FOTOĞRAF ARŞİVİ' },
  { id: 'rover-3d-lab', label: '3D ROVER LAB' },
  { id: 'rover-comparison', label: 'KARŞILAŞTIRMA' },
  { id: 'mission-simulation', label: 'GÖREV SİMÜLASYONU' },
  { id: 'lunar-exploration', label: 'LUNAR EXPLORATION' },
  { id: 'references', label: 'KAYNAKÇA' },
];

/**
 * Main landing experience of HVB HORIZON with smooth section navigation
 * across Mars Exploration, Interactive Mars Map, NASA Photo Archive,
 * 3D Rover Lab, Comparison Lab, Mission Simulation, Lunar Exploration,
 * and the Scientific Bibliography (Kaynakça).
 */
export function HomePage() {
  const [selectedRover, setSelectedRover] = useState<MarsRoverItem | null>(null);
  const [selectedLunarMission, setSelectedLunarMission] = useState<LunarMissionItem | null>(null);

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
      <MarsPlanet />
      <div className="home__veil" aria-hidden="true" />

      {/* Hero viewport */}
      <div id="hero" className="home__hero">
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

          <nav className="home__nav" aria-label="Bölüm navigasyonu">
            {NAV_ITEMS.map((navItem) => (
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
        </header>

        <motion.main
          className="home__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="home__title">{HOME_CONTENT.title}</h1>
          <p className="home__subtitle">{HOME_CONTENT.subtitle}</p>
          <p className="home__description">{HOME_CONTENT.description}</p>

          <div className="home__actions">
            <a
              href="#mars-exploration"
              className="btn btn--primary"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('mars-exploration');
              }}
            >
              MARS'I KEŞFET
            </a>
            <a
              href="#lunar-exploration"
              className="btn btn--ghost"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('lunar-exploration');
              }}
            >
              AY'I KEŞFET
            </a>
          </div>

          {/* Quick Interactive Modules Strip */}
          <div className="home__modulePills" aria-label="Etkileşimli keşif modülleri">
            <a
              href="#mars-map"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('mars-map');
              }}
            >
              🗺️ İnteraktif Mars Haritası
            </a>
            <a
              href="#nasa-photo-archive"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('nasa-photo-archive');
              }}
            >
              📸 NASA Fotoğraf Arşivi
            </a>
            <a
              href="#rover-3d-lab"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rover-3d-lab');
              }}
            >
              🔬 3D Rover Laboratuvarı
            </a>
            <a
              href="#rover-comparison"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('rover-comparison');
              }}
            >
              📊 Karşılaştırma Laboratuvarı
            </a>
            <a
              href="#mission-simulation"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('mission-simulation');
              }}
            >
              🚀 Görev Simülasyonu
            </a>
            <a
              href="#lunar-exploration"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('lunar-exploration');
              }}
            >
              🌕 3D Ay &amp; 9 Ay Görevi
            </a>
            <a
              href="#references"
              className="home__modulePill"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('references');
              }}
            >
              📚 Bilimsel Kaynakça
            </a>
          </div>
        </motion.main>

        <div className="home__heroFooter">
          <p className="home__credit">{MARS_VISUAL_CREDIT}</p>
        </div>
      </div>

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
      <ReferencesSection onNavigateToSection={scrollToSection} />

      <footer className="home__footer">
        <div className="home__footerInner">
          <BrandLogo />
          <nav className="home__footerLinks" aria-label="Alt bilgi bölüm bağlantıları">
            {NAV_ITEMS.map((item) => (
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
            HVB HORIZON · SILENT EXPLORERS — {MARS_VISUAL_CREDIT}
          </p>
        </div>
      </footer>

      {/* Dedicated Mars Rover Detail Screen Overlay */}
      <AnimatePresence>
        {selectedRover ? (
          <RoverDetailView
            key="rover-detail-modal"
            rover={selectedRover}
            onClose={handleCloseRoverDetail}
            onSelectRover={setSelectedRover}
          />
        ) : null}
      </AnimatePresence>

      {/* Dedicated Lunar Mission Detail Screen Overlay */}
      <AnimatePresence>
        {selectedLunarMission ? (
          <LunarMissionDetailView
            key="lunar-detail-modal"
            mission={selectedLunarMission}
            onClose={handleCloseLunarDetail}
            onSelectMission={setSelectedLunarMission}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
