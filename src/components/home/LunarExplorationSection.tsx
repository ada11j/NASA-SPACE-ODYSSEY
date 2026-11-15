import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { LunarMissionId, LunarMissionItem, SectionId } from '@/types';

const LazyMoonGlobeViewport = lazy(() => import('@/scenes/MoonGlobeViewport'));

interface LunarExplorationSectionProps {
  onNavigateToSection?: (sectionId: SectionId) => void;
  onSelectLunarMission?: (mission: LunarMissionItem) => void;
}

type LunarFilterKey = 'all' | 'soviet' | 'apollo' | 'china' | 'india';

export function LunarExplorationSection({
  onNavigateToSection,
  onSelectLunarMission,
}: LunarExplorationSectionProps) {
  const { lang, t } = useLanguage();
  const lUi = t.ui.lunarExploration;
  const gUi = t.ui.moonGlobe;
  const lunarMissions = t.data.lunarMissions;
  const lunarLandmarks = t.data.lunarSurfaceLandmarks;

  const filterTabs: ReadonlyArray<{ key: LunarFilterKey; label: string }> = [
    { key: 'all', label: lUi.filters.all },
    {
      key: 'soviet',
      label: lang === 'en' ? 'Luna & Lunokhod (USSR · 3)' : 'Luna & Lunokhod (SSCB · 3)',
    },
    { key: 'apollo', label: lUi.filters.apolloLrv },
    {
      key: 'china',
      label: lang === 'en' ? "Chang'e & Yutu (CNSA · 2)" : 'Chang’e & Yutu (CNSA · 2)',
    },
    { key: 'india', label: 'Chandrayaan-3 (ISRO · 1)' },
  ];

  const [selectedMissionId, setSelectedMissionId] = useState<LunarMissionId>('apollo-15-lrv');
  const [autoRotateGlobe, setAutoRotateGlobe] = useState<boolean>(false);
  const [showSelenographicGrid, setShowSelenographicGrid] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<LunarFilterKey>('all');

  const selectedMission =
    lunarMissions.find((m) => m.id === selectedMissionId) ?? lunarMissions[0];

  const filteredMissions = lunarMissions.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'soviet') return m.country === 'SSCB' || m.country === 'USSR';
    if (activeFilter === 'apollo') return m.country === 'ABD' || m.country === 'USA';
    if (activeFilter === 'china') return m.country === 'Çin' || m.country === 'China';
    if (activeFilter === 'india') return m.country === 'Hindistan' || m.country === 'India';
    return true;
  });

  const handleOpenDossier = (mission: LunarMissionItem) => {
    setSelectedMissionId(mission.id);
    onSelectLunarMission?.(mission);
  };

  return (
    <section
      id="lunar-exploration"
      className="exploration-section exploration-section--lunar"
      aria-labelledby="lunar-exploration-heading"
    >
      <div className="exploration-section__container">
        {/* Section Header */}
        <motion.div
          className="exploration-section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow exploration-section__eyebrow--lunar">
            {lUi.eyebrow}
          </span>
          <h2 id="lunar-exploration-heading" className="exploration-section__title">
            {lUi.title}
          </h2>
          <p className="exploration-section__subtitle exploration-section__subtitle--lunar">
            {lUi.description}
          </p>
        </motion.div>

        {/* PART 1: Interactive 3D Moon Globe & Selected Landing Site Briefing */}
        <div className="lunar-3d-CommandGrid">
          {/* Left: 3D Moon Globe Viewport */}
          <div className="lunar-3d-globeCard">
            <div className="lunar-3d-globeCard__toolbar">
              <div className="lunar-3d-globeCard__hemisphereBtns" role="group" aria-label={lUi.globeSectionTitle}>
                <button
                  type="button"
                  className={`module-pill ${
                    selectedMission.hemisphereLabel.includes('Near') ||
                    selectedMission.hemisphereLabel.includes('Yakın')
                      ? 'module-pill--active'
                      : ''
                  }`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('apollo-15-lrv');
                  }}
                >
                  🌕 {gUi.viewNearSide}
                </button>
                <button
                  type="button"
                  className={`module-pill ${selectedMission.id === 'change-4-yutu-2' ? 'module-pill--active' : ''}`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('change-4-yutu-2');
                  }}
                >
                  🌑 {gUi.viewFarSide}
                </button>
                <button
                  type="button"
                  className={`module-pill ${selectedMission.id === 'chandrayaan-3-pragyan' ? 'module-pill--active' : ''}`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('chandrayaan-3-pragyan');
                  }}
                >
                  🧭 {gUi.viewSouthPole}
                </button>
              </div>

              <div className="lunar-3d-globeCard__toggles">
                <button
                  type="button"
                  className={`module-pill ${autoRotateGlobe ? 'module-pill--active' : ''}`}
                  onClick={() => setAutoRotateGlobe((prev) => !prev)}
                >
                  {autoRotateGlobe ? `⏸ ${gUi.autoRotateOff}` : `↻ ${gUi.autoRotateOn}`}
                </button>
                <button
                  type="button"
                  className={`module-pill ${showSelenographicGrid ? 'module-pill--active' : ''}`}
                  onClick={() => setShowSelenographicGrid((prev) => !prev)}
                >
                  🌐 {gUi.landmarksToggle}
                </button>
              </div>
            </div>

            <div className="lunar-3d-globeCard__canvasWrap">
              <Suspense
                fallback={
                  <div className="lab-3d-viewport__loading">
                    {lang === 'en'
                      ? 'Loading 3D Selenographic Moon Globe & Crater Relief...'
                      : '3D Selenografik Ay Küresi ve Krater Rölyefi Yükleniyor...'}
                  </div>
                }
              >
                <LazyMoonGlobeViewport
                  selectedMissionId={selectedMissionId}
                  autoRotate={autoRotateGlobe}
                  showLandmarks={showSelenographicGrid}
                  onSelectMission={(id) => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId(id);
                  }}
                />
              </Suspense>
            </div>

            {/* Quick Landing Site Selector Bar Under the 3D Moon */}
            <div className="lunar-site-pinBar" aria-label={lUi.globeSectionTitle}>
              {lunarMissions.map((m) => {
                const isSelected = m.id === selectedMissionId;
                return (
                  <button
                    key={`pin-${m.id}`}
                    type="button"
                    className={`lunar-site-pinBtn ${isSelected ? 'lunar-site-pinBtn--active' : ''}`}
                    onClick={() => {
                      setAutoRotateGlobe(false);
                      setSelectedMissionId(m.id);
                    }}
                  >
                    <span
                      className="lunar-site-pinBtn__dot"
                      style={{ backgroundColor: m.markerColor }}
                      aria-hidden="true"
                    />
                    <span>{m.name.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Landing Site Telemetry & Selenographic Features Panel */}
          <aside className="lunar-3d-inspector" aria-live="polite">
            <div className="lunar-3d-inspector__badgeRow">
              <span
                className="lunar-3d-inspector__colorTag"
                style={{
                  borderColor: selectedMission.markerColor,
                  color: selectedMission.markerColor,
                }}
              >
                ● {lUi.selectedMissionPanelBadge}
              </span>
              <span className="lunar-3d-inspector__hemi">
                {selectedMission.hemisphereLabel}
              </span>
            </div>

            <h3 className="lunar-3d-inspector__title">{selectedMission.name}</h3>
            <p className="lunar-3d-inspector__site">
              📍 <strong>{selectedMission.landingSite}</strong> ({selectedMission.landingCoordinates})
            </p>
            <p className="lunar-3d-inspector__dates">
              🗓️ {t.ui.lunarMissionDetail.landingDateLabel}: <strong>{selectedMission.landingDate}</strong> · {lUi.cardDurationLabel} {selectedMission.durationLabel}
            </p>

            <p className="lunar-3d-inspector__summary">{selectedMission.summary}</p>

            <div className="lunar-3d-inspector__metrics">
              {selectedMission.keyMetrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="lunar-3d-inspector__metricBox">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.sublabel}</small>
                </div>
              ))}
            </div>

            <div className="lunar-3d-inspector__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handleOpenDossier(selectedMission)}
              >
                {lUi.selectedMissionOpenModalBtn}
              </button>
              <a
                href={selectedMission.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="archive-card__sourceLink"
              >
                {lang === 'en' ? 'Official NASA NSSDCA / ALSJ Source ↗' : 'Resmi NASA NSSDCA / ALSJ Kaynağı ↗'}
              </a>
            </div>

            {/* Major Lunar Maria & Craters Reference List */}
            <div className="lunar-landmarks-box">
              <span className="lunar-landmarks-box__heading">
                {lang === 'en'
                  ? 'MAJOR LUNAR MARIA & CRATER BASINS'
                  : 'BAŞLICA AY DENİZLERİ (MARIA) VE KRATER HAVZALARI'}
              </span>
              <div className="lunar-landmarks-box__list">
                {lunarLandmarks.map((lm) => (
                  <div key={lm.id} className="lunar-landmark-item">
                    <div className="lunar-landmark-item__top">
                      <strong>{lm.name}</strong>
                      <span>
                        {Math.abs(lm.lat)}°{lm.lat >= 0 ? (lang === 'en' ? 'N' : 'K') : (lang === 'en' ? 'S' : 'G')},{' '}
                        {Math.abs(lm.lon)}°{lm.lon >= 0 ? (lang === 'en' ? 'E' : 'D') : (lang === 'en' ? 'W' : 'B')}
                      </span>
                    </div>
                    <p>{lm.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* PART 2: All 9 Lunar Missions Filterable Showcase Grid */}
        <div className="lunar-missions-catalog">
          <div className="lunar-missions-catalog__header">
            <div>
              <span className="exploration-section__eyebrow exploration-section__eyebrow--lunar">
                {lang === 'en' ? 'LUNAR SURFACE EXPLORERS CATALOG (1966–2023)' : 'AY YÜZEY KÂŞİFLERİ KATALOĞU (1966–2023)'}
              </span>
              <h3 className="lunar-missions-catalog__title">
                {lang === 'en'
                  ? '9 Historic Lunar Landers & Rovers'
                  : '9 Tarihi Ay İniş Aracı ve Gezicisi (Lander & Rover)'}
              </h3>
            </div>

            <div className="module-toolbar__group" role="tablist" aria-label={lUi.filterTabsAria}>
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab.key}
                  className={`module-pill ${activeFilter === tab.key ? 'module-pill--active' : ''}`}
                  onClick={() => setActiveFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rover-grid lunar-missions-grid">
            {filteredMissions.map((mission, index) => {
              const isActive = mission.statusLabel === lUi.activeStatusMatch;
              return (
                <motion.article
                  key={mission.id}
                  className="rover-card rover-card--interactive lunar-mission-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${mission.name} — ${lUi.cardOpenDetailBtn}`}
                  onClick={() => handleOpenDossier(mission)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenDossier(mission);
                    }
                  }}
                >
                  <div className="rover-card__media">
                    <img
                      src={mission.image}
                      alt={mission.imageAlt}
                      className="rover-card__image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const svgFallback = `/assets/images/lunar/${mission.id}.svg`;
                        if (!target.dataset.fallbackApplied && !target.src.endsWith(svgFallback)) {
                          target.dataset.fallbackApplied = 'true';
                          target.src = svgFallback;
                        }
                      }}
                    />
                    <div className="rover-card__badges">
                      <span
                        className={`rover-card__status ${
                          isActive
                            ? 'rover-card__status--active'
                            : 'rover-card__status--completed'
                        }`}
                      >
                        {mission.statusLabel}
                      </span>
                      <span className="rover-card__year">{mission.eraBadge}</span>
                    </div>
                  </div>

                  <div className="rover-card__body">
                    <div className="rover-card__titleRow">
                      <h4 className="rover-card__name">{mission.name}</h4>
                      <span className="rover-card__code">{mission.country}</span>
                    </div>

                    <p className="rover-card__site">
                      <span className="rover-card__siteLabel">{lUi.cardLandingSiteLabel}</span>{' '}
                      {mission.landingSite} ({mission.landingCoordinates})
                    </p>

                    <p className="rover-card__summary">{mission.summary}</p>

                    <div className="lunar-card__miniSpecs">
                      <span>
                        <strong>{t.ui.lunarMissionDetail.landingDateLabel}:</strong> {mission.landingDate.split(' (')[0]}
                      </span>
                      <span>
                        <strong>{lang === 'en' ? 'Type:' : 'Tür:'}</strong> {mission.missionType}
                      </span>
                    </div>

                    <div className="rover-card__footer">
                      <p className="rover-card__credit">
                        [{mission.mediaKindLabel}] · {mission.imageCredit}
                      </p>
                      <span className="rover-card__cta">
                        <span>{lUi.cardOpenDetailBtn}</span>
                        <span className="rover-card__ctaArrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* PART 3: Chronological Lunar Exploration Timeline (1966 -> 2023) */}
        <div className="lunar-chronology-block">
          <div className="lunar-chronology-block__header">
            <span className="exploration-section__eyebrow exploration-section__eyebrow--lunar">
              {lang === 'en' ? 'CHRONOLOGICAL TIMELINE · 1966 – 2023' : 'KRONOLOJİK ZAMAN ÇİZELGESİ · 1966 – 2023'}
            </span>
            <h3 className="lunar-missions-catalog__title">
              {lang === 'en' ? 'Historic Evolution of Lunar Surface Exploration' : 'Ay Yüzey Keşiflerinin Tarihi Evrimi'}
            </h3>
            <p className="exploration-section__subtitle exploration-section__subtitle--lunar">
              {lang === 'en'
                ? 'Click a timeline node to focus the 3D Moon globe on that landing site or open the full mission dossier.'
                : 'Bir zaman düğümüne tıklayarak 3D Ay küresini o görevin iniş koordinatlarına odaklayabilir veya tam görev dosyasını açabilirsiniz.'}
            </p>
          </div>

          <ol className="lunar-chronology-list">
            {lunarMissions.map((mission, idx) => {
              const isSelected = mission.id === selectedMissionId;
              return (
                <li
                  key={`chrono-${mission.id}`}
                  className={`lunar-chronology-item ${
                    isSelected ? 'lunar-chronology-item--active' : ''
                  }`}
                >
                  <div className="lunar-chronology-item__top">
                    <span
                      className="lunar-chronology-item__index"
                      style={{ borderColor: mission.markerColor, color: mission.markerColor }}
                    >
                      0{idx + 1} · {mission.landingDate.split(' (')[0]}
                    </span>
                    <span className="lunar-chronology-item__agency">{mission.agency}</span>
                  </div>

                  <h4 className="lunar-chronology-item__title">{mission.name}</h4>
                  <p className="lunar-chronology-item__site">
                    📍 {mission.landingSite} ({mission.landingCoordinates})
                  </p>
                  <p className="lunar-chronology-item__outcome">{mission.missionOutcome}</p>

                  <div className="lunar-chronology-item__actions">
                    <button
                      type="button"
                      className="module-pill"
                      onClick={() => {
                        setAutoRotateGlobe(false);
                        setSelectedMissionId(mission.id);
                      }}
                    >
                      🌕 {lang === 'en' ? 'Focus on 3D Globe' : '3D Kürede Göster'}
                    </button>
                    <button
                      type="button"
                      className="module-pill module-pill--active"
                      onClick={() => handleOpenDossier(mission)}
                    >
                      📄 {lUi.selectedMissionOpenModalBtn}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {onNavigateToSection ? (
          <div className="exploration-section__footerNav">
            <a
              href="#spacecraft-quiz"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('spacecraft-quiz');
              }}
            >
              <span>{t.ui.nav.links.spacecraftQuiz}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#hero"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('hero');
              }}
            >
              <span>{t.ui.lunarMissionDetail.backToMain}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
