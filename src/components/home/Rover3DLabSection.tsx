import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { Rover3DPart, RoverId } from '@/types';

const Rover3DViewport = lazy(() => import('@/scenes/Rover3DViewport'));

export function Rover3DLabSection() {
  const { lang, t } = useLanguage();
  const rUi = t.ui.rover3dLab;
  const architectures = t.data.rover3dArchitectures;

  const [selectedRoverId, setSelectedRoverId] = useState<RoverId>('opportunity');
  const [selectedPartId, setSelectedPartId] = useState<string>('arm');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const currentArch = architectures[selectedRoverId];
  const activePart: Rover3DPart =
    currentArch.parts.find((p) => p.id === selectedPartId) ?? currentArch.parts[0];

  const roverTabs = [
    {
      id: 'spirit',
      label: 'Spirit (MER-A)',
      sub: lang === 'en' ? 'Solar Powered · 185 kg' : 'Güneş Panelli · 185 kg',
    },
    {
      id: 'opportunity',
      label: 'Opportunity (MER-B)',
      sub: lang === 'en' ? 'Solar Powered · 185 kg' : 'Güneş Panelli · 185 kg',
    },
    {
      id: 'curiosity',
      label: 'Curiosity (MSL)',
      sub: lang === 'en' ? 'MMRTG Nuclear · 899 kg' : 'MMRTG Nükleer · 899 kg',
    },
    {
      id: 'perseverance',
      label: 'Perseverance (M2020)',
      sub: lang === 'en' ? 'MMRTG Nuclear · 1,025 kg' : 'MMRTG Nükleer · 1.025 kg',
    },
  ] as const;

  return (
    <section
      id="rover-3d-lab"
      className="exploration-section exploration-section--lab3d"
      aria-labelledby="rover-3d-lab-heading"
    >
      <div className="exploration-section__container">
        <motion.div
          className="exploration-section__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">
            {rUi.eyebrow}
          </span>
          <h2 id="rover-3d-lab-heading" className="exploration-section__title">
            {rUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {rUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {rUi.description}
          </p>
        </motion.div>

        {/* Top Rover Selector Bar */}
        <div className="lab3d-rover-bar" role="tablist" aria-label={rUi.roverSelectorAria}>
          {roverTabs.map((item) => {
            const isSelected = selectedRoverId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`lab3d-rover-tab ${
                  isSelected ? 'lab3d-rover-tab--active' : ''
                }`}
                onClick={() => setSelectedRoverId(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.sub}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Lab Grid */}
        <div className="lab3d-workspace">
          {/* Left: Three.js / R3F Interactive Viewport */}
          <div className="lab3d-viewport-card">
            <div className="lab3d-viewport-card__hudTop">
              <span className="lab3d-schematic-badge">
                {rUi.hudBadgePrefix}
              </span>
              <button
                type="button"
                className="lab3d-autorotate-btn"
                onClick={() => setAutoRotate((prev) => !prev)}
              >
                {autoRotate ? `⏸ ${rUi.autoRotateOff}` : `▶ ${rUi.autoRotateOn}`}
              </button>
            </div>

            <div className="lab3d-canvas-wrap" aria-label={`${currentArch.roverName} 3D`}>
              <Suspense
                fallback={
                  <div className="lab3d-loading">
                    {lang === 'en' ? 'Loading 3D Model Scene…' : '3B Model Sahnesi Yükleniyor…'}
                  </div>
                }
              >
                <Rover3DViewport
                  roverId={selectedRoverId}
                  selectedPartId={selectedPartId}
                  autoRotate={autoRotate}
                  onSelectPart={setSelectedPartId}
                />
              </Suspense>
            </div>

            <div className="lab3d-viewport-card__footer">
              <p className="lab3d-notice">{currentArch.schematicNotice}</p>
              <span className="lab3d-scale">{currentArch.scaleSummary}</span>
            </div>
          </div>

          {/* Right: Subsystem Selector Buttons + Active Part Technical Dossier */}
          <aside className="lab3d-inspector" aria-label={rUi.SelectedSubsystemBadge}>
            <div className="lab3d-part-selector">
              <span className="lab3d-part-selector__label">
                {rUi.partsListTitlePrefix} ({rUi.partsListHint})
              </span>
              <div className="lab3d-part-buttons">
                {currentArch.parts.map((part) => {
                  const isActive = part.id === activePart.id;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      className={`lab3d-part-btn ${
                        isActive ? 'lab3d-part-btn--active' : ''
                      }`}
                      onClick={() => setSelectedPartId(part.id)}
                    >
                      <span className="lab3d-part-btn__code">{part.code}</span>
                      <span className="lab3d-part-btn__name">{part.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lab3d-part-dossier">
              <div className="lab3d-part-dossier__top">
                <span className="lab3d-part-dossier__cat">
                  {activePart.categoryLabel}
                </span>
                <span className="lab3d-part-dossier__code">{activePart.code}</span>
              </div>

              <h3 className="lab3d-part-dossier__title">{activePart.name}</h3>

              <div className="lab3d-part-dossier__block">
                <span>{rUi.functionSummaryTitle}</span>
                <p>{activePart.functionSummary}</p>
              </div>

              <div className="lab3d-part-dossier__block">
                <span>{rUi.technicalDetailsTitle}</span>
                <p>{activePart.technicalDetails}</p>
              </div>

              <div className="lab3d-part-dossier__specsBox">
                <span>{rUi.specsBadgeLabel}</span>
                <strong>{activePart.specs}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
