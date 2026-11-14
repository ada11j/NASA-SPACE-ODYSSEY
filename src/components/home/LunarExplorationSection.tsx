import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { LUNAR_EXPLORATION_CONTENT } from '@/data/explorers';
import { LUNAR_MISSIONS, LUNAR_SURFACE_LANDMARKS } from '@/data/lunarMissionsData';
import type { LunarMissionId, LunarMissionItem, SectionId } from '@/types';

const LazyMoonGlobeViewport = lazy(() => import('@/scenes/MoonGlobeViewport'));

interface LunarExplorationSectionProps {
  onNavigateToSection?: (sectionId: SectionId) => void;
  onSelectLunarMission?: (mission: LunarMissionItem) => void;
}

type LunarFilterKey = 'all' | 'soviet' | 'apollo' | 'china' | 'india';

const FILTER_TABS: ReadonlyArray<{ key: LunarFilterKey; label: string }> = [
  { key: 'all', label: 'Tümü (9 Görev)' },
  { key: 'soviet', label: 'Luna & Lunokhod (SSCB · 3)' },
  { key: 'apollo', label: 'Apollo LRV (NASA · 3)' },
  { key: 'china', label: 'Chang’e & Yutu (CNSA · 2)' },
  { key: 'india', label: 'Chandrayaan-3 (ISRO · 1)' },
];

export function LunarExplorationSection({
  onNavigateToSection,
  onSelectLunarMission,
}: LunarExplorationSectionProps) {
  const [selectedMissionId, setSelectedMissionId] = useState<LunarMissionId>('apollo-15-lrv');
  const [autoRotateGlobe, setAutoRotateGlobe] = useState<boolean>(false);
  const [showSelenographicGrid, setShowSelenographicGrid] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<LunarFilterKey>('all');

  const selectedMission =
    LUNAR_MISSIONS.find((m) => m.id === selectedMissionId) ?? LUNAR_MISSIONS[0];

  const filteredMissions = LUNAR_MISSIONS.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'soviet') return m.country === 'SSCB';
    if (activeFilter === 'apollo') return m.country === 'ABD';
    if (activeFilter === 'china') return m.country === 'Çin';
    if (activeFilter === 'india') return m.country === 'Hindistan';
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
            {LUNAR_EXPLORATION_CONTENT.eyebrow} · 07 · 3D SELENOGRAFİK HARİTA &amp; 9 TARİHİ GÖREV
          </span>
          <h2 id="lunar-exploration-heading" className="exploration-section__title">
            {LUNAR_EXPLORATION_CONTENT.title}
          </h2>
          <p className="exploration-section__subtitle exploration-section__subtitle--lunar">
            Luna 9’un ilk yumuşak inişinden Sovyet Lunokhod gezicilerine, astronotların sürdüğü Apollo
            Ay Taşıtlarından (LRV) Ay’ın uzak tarafındaki Yutu-2 ve güney kutbundaki Chandrayaan-3
            Pragyan’a kadar 9 tarihi Ay yüzey görevini 3D Ay küresi üzerinde keşfedin.
          </p>
        </motion.div>

        {/* PART 1: Interactive 3D Moon Globe & Selected Landing Site Briefing */}
        <div className="lunar-3d-CommandGrid">
          {/* Left: 3D Moon Globe Viewport */}
          <div className="lunar-3d-globeCard">
            <div className="lunar-3d-globeCard__toolbar">
              <div className="lunar-3d-globeCard__hemisphereBtns" role="group" aria-label="Ay yarımküre odak noktaları">
                <button
                  type="button"
                  className={`module-pill ${selectedMission.hemisphereLabel === 'Yakın Yüz (Near Side)' ? 'module-pill--active' : ''}`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('apollo-15-lrv');
                  }}
                >
                  🌕 Yakın Yüz (Near Side)
                </button>
                <button
                  type="button"
                  className={`module-pill ${selectedMission.id === 'change-4-yutu-2' ? 'module-pill--active' : ''}`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('change-4-yutu-2');
                  }}
                >
                  🌑 Uzak Yüz (Chang’e 4)
                </button>
                <button
                  type="button"
                  className={`module-pill ${selectedMission.id === 'chandrayaan-3-pragyan' ? 'module-pill--active' : ''}`}
                  onClick={() => {
                    setAutoRotateGlobe(false);
                    setSelectedMissionId('chandrayaan-3-pragyan');
                  }}
                >
                  🧭 Güney Kutbu (Chandrayaan-3)
                </button>
              </div>

              <div className="lunar-3d-globeCard__toggles">
                <button
                  type="button"
                  className={`module-pill ${autoRotateGlobe ? 'module-pill--active' : ''}`}
                  onClick={() => setAutoRotateGlobe((prev) => !prev)}
                >
                  {autoRotateGlobe ? '⏸ Dönüşü Durdur' : '↻ Otomatik Döndür'}
                </button>
                <button
                  type="button"
                  className={`module-pill ${showSelenographicGrid ? 'module-pill--active' : ''}`}
                  onClick={() => setShowSelenographicGrid((prev) => !prev)}
                >
                  🌐 Ekvator Halkası
                </button>
              </div>
            </div>

            <div className="lunar-3d-globeCard__canvasWrap">
              <Suspense
                fallback={
                  <div className="lab-3d-viewport__loading">
                    3D Selenografik Ay Küresi ve Krater Rölyefi Yükleniyor...
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
            <div className="lunar-site-pinBar" aria-label="Ay iniş noktaları hızlı seçim çubuğu">
              {LUNAR_MISSIONS.map((m) => {
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
                ● SEÇİLİ İNİŞ NOKTASI
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
              🗓️ İniş: <strong>{selectedMission.landingDate}</strong> · Süre: {selectedMission.durationLabel}
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
                GÖREV DETAYLARINI İNCELE →
              </button>
              <a
                href={selectedMission.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="archive-card__sourceLink"
              >
                Resmi NASA NSSDCA / ALSJ Kaynağı ↗
              </a>
            </div>

            {/* Major Lunar Maria & Craters Reference List */}
            <div className="lunar-landmarks-box">
              <span className="lunar-landmarks-box__heading">
                BAŞLICA AY DENİZLERİ (MARIA) VE KRATER HAVZALARI
              </span>
              <div className="lunar-landmarks-box__list">
                {LUNAR_SURFACE_LANDMARKS.map((lm) => (
                  <div key={lm.id} className="lunar-landmark-item">
                    <div className="lunar-landmark-item__top">
                      <strong>{lm.name}</strong>
                      <span>
                        {Math.abs(lm.lat)}°{lm.lat >= 0 ? 'K' : 'G'}, {Math.abs(lm.lon)}°
                        {lm.lon >= 0 ? 'D' : 'B'}
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
                AY YÜZEY KÂŞİFLERİ KATALOĞU (1966–2023)
              </span>
              <h3 className="lunar-missions-catalog__title">
                9 Tarihi Ay İniş Aracı ve Gezicisi (Lander &amp; Rover)
              </h3>
            </div>

            <div className="module-toolbar__group" role="tablist" aria-label="Ay görevlerini ülkeye ve programa göre filtrele">
              {FILTER_TABS.map((tab) => (
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
              const isActive = mission.statusLabel === 'AKTİF / UZATILMIŞ GÖREV';
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
                  aria-label={`${mission.name} görev detaylarını aç`}
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
                      <span className="rover-card__siteLabel">İniş Bölgesi:</span>{' '}
                      {mission.landingSite} ({mission.landingCoordinates})
                    </p>

                    <p className="rover-card__summary">{mission.summary}</p>

                    <div className="lunar-card__miniSpecs">
                      <span>
                        <strong>İniş:</strong> {mission.landingDate.split(' (')[0]}
                      </span>
                      <span>
                        <strong>Tür:</strong> {mission.missionType}
                      </span>
                    </div>

                    <div className="rover-card__footer">
                      <p className="rover-card__credit">
                        [{mission.mediaKindLabel}] · {mission.sourceLabel}
                      </p>
                      <span className="rover-card__cta">
                        <span>DETAYLARI İNCELE</span>
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
              KRONOLOJİK ZAMAN ÇİZELGESİ · 1966 – 2023
            </span>
            <h3 className="lunar-missions-catalog__title">
              Ay Yüzey Keşiflerinin Tarihi Evrimi
            </h3>
            <p className="exploration-section__subtitle exploration-section__subtitle--lunar">
              Bir zaman düğümüne tıklayarak 3D Ay küresini o görevin iniş koordinatlarına odaklayabilir
              veya tam görev dosyasını açabilirsiniz.
            </p>
          </div>

          <ol className="lunar-chronology-list">
            {LUNAR_MISSIONS.map((mission, idx) => {
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
                      🌕 3D Kürede Göster
                    </button>
                    <button
                      type="button"
                      className="module-pill module-pill--active"
                      onClick={() => handleOpenDossier(mission)}
                    >
                      📄 Görev Dosyasını Aç →
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
              href="#references"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('references');
              }}
            >
              <span>BİLİMSEL KAYNAKÇA BÖLÜMÜNE İLERLE</span>
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
              <span>ANA EKRANA DÖN</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
