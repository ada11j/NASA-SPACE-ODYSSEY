import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { RoverId } from '@/types';

export function MissionSimulationSection() {
  const { lang, t } = useLanguage();
  const sUi = t.ui.missionSimulation;
  const simData = t.data.missionSimulationData;

  const [selectedRoverId, setSelectedRoverId] = useState<RoverId>('opportunity');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const missionProfile = simData[selectedRoverId];
  const stages = missionProfile.stages;
  const activeStage = stages[currentStageIndex] ?? stages[0];

  const handleSelectRover = (roverId: RoverId) => {
    setSelectedRoverId(roverId);
    setCurrentStageIndex(0);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const timer = window.setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev + 1 >= stages.length) {
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, stages.length]);

  const progressPct =
    stages.length > 1 ? (currentStageIndex / (stages.length - 1)) * 100 : 100;

  const simRoverTabs = [
    {
      id: 'opportunity',
      label: 'Opportunity (MER-B)',
      tag: lang === 'en' ? '5 Stages · 2018 Dust Storm Special' : '5 Aşama · 2018 Toz Fırtınası Özel',
    },
    {
      id: 'spirit',
      label: 'Spirit (MER-A)',
      tag: lang === 'en' ? '3 Stages · Gusev & Home Plate' : '3 Aşama · Gusev & Home Plate',
    },
    {
      id: 'curiosity',
      label: 'Curiosity (MSL)',
      tag: lang === 'en' ? '3 Stages · Sky Crane & Mount Sharp' : '3 Aşama · Sky Crane & Sharp Dağı',
    },
    {
      id: 'perseverance',
      label: 'Perseverance (M2020)',
      tag: lang === 'en' ? '3 Stages · Ingenuity & Core Samples' : '3 Aşama · Ingenuity & Karotlar',
    },
  ] as const;

  return (
    <section
      id="mission-simulation"
      className="exploration-section exploration-section--simulation"
      aria-labelledby="mission-simulation-heading"
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
            {sUi.eyebrow}
          </span>
          <h2 id="mission-simulation-heading" className="exploration-section__title">
            {sUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {sUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {sUi.description}
          </p>
        </motion.div>

        {/* Explicit Scientific Honesty Disclaimer */}
        <div className="sim-disclaimer" role="note">
          <span className="sim-disclaimer__badge">
            {lang === 'en' ? 'SCIENTIFIC METHODOLOGY' : 'BİLİMSEL METODOLOJİ'}
          </span>
          <p>{missionProfile.disclaimer}</p>
        </div>

        {/* Rover Selector Tabs */}
        <div className="sim-rover-tabs" role="tablist" aria-label={sUi.roverSelectorAria}>
          {simRoverTabs.map((item) => {
            const isSelected = selectedRoverId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`sim-rover-tab ${
                  isSelected ? 'sim-rover-tab--active' : ''
                }`}
                onClick={() => handleSelectRover(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Chronological Stepper & Controls */}
        <div className="sim-timeline-bar">
          <div className="sim-timeline-bar__top">
            <span className="sim-timeline-bar__mission">
              {missionProfile.missionSubtitle}
            </span>
            <div className="sim-controls">
              <button
                type="button"
                className="sim-ctrl-btn"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentStageIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentStageIndex === 0}
              >
                {sUi.prevStageBtn}
              </button>

              <button
                type="button"
                className={`sim-ctrl-btn sim-ctrl-btn--play ${
                  isAutoPlaying ? 'sim-ctrl-btn--playing' : ''
                }`}
                onClick={() => setIsAutoPlaying((prev) => !prev)}
              >
                {isAutoPlaying ? sUi.pauseBtn : sUi.playBtn}
              </button>

              <button
                type="button"
                className="sim-ctrl-btn"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentStageIndex((prev) =>
                    Math.min(stages.length - 1, prev + 1)
                  );
                }}
                disabled={currentStageIndex === stages.length - 1}
              >
                {sUi.nextStageBtn}
              </button>
            </div>
          </div>

          {/* Step Nodes + Progress Track */}
          <div className="sim-stepper">
            <div className="sim-stepper__track">
              <div
                className="sim-stepper__fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="sim-stepper__nodes" role="tablist" aria-label={sUi.stageIndicatorPrefix}>
              {stages.map((stage, idx) => {
                const isCurrent = idx === currentStageIndex;
                const isCompleted = idx < currentStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    className={`sim-step-node ${
                      isCurrent
                        ? 'sim-step-node--active'
                        : isCompleted
                        ? 'sim-step-node--done'
                        : ''
                    }`}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentStageIndex(idx);
                    }}
                  >
                    <span className="sim-step-node__circle">{idx + 1}</span>
                    <span className="sim-step-node__sol">{stage.sol}</span>
                    <span className="sim-step-node__title">{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            className="sim-stage-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="sim-stage-card__contentCol">
              <div className="sim-stage-card__badges">
                <span className="sim-stage-card__phase">{activeStage.phaseLabel}</span>
                <span className="sim-stage-card__solBadge">{activeStage.sol}</span>
                <span className="sim-stage-card__dateBadge">{activeStage.date}</span>
              </div>

              <h3 className="sim-stage-card__title">{activeStage.title}</h3>

              <div className="sim-stage-card__telemetryStrip">
                <span>
                  📍 <strong>{lang === 'en' ? 'Location:' : 'Konum:'}</strong> {activeStage.location}
                </span>
                <span>
                  📡 <strong>{lang === 'en' ? 'Telemetry:' : 'Telemetri:'}</strong> {activeStage.telemetryBadge}
                </span>
              </div>

              <p className="sim-stage-card__narrative">{activeStage.narrative}</p>

              <div className="sim-stage-card__scienceBox">
                <span>{sUi.scienceTitle}</span>
                <p>{activeStage.scientificExplanation}</p>
              </div>

              {activeStage.specialAlert && (
                <div
                  className="sim-stage-card__specialAlert"
                  role="region"
                  aria-label={activeStage.specialAlert.title}
                >
                  <strong>⚠️ {activeStage.specialAlert.title}</strong>
                  <p>{activeStage.specialAlert.detail}</p>
                </div>
              )}

              <div className="sim-stage-card__events">
                <span>{sUi.keyEventsTitle}</span>
                <ul>
                  {activeStage.keyEvents.map((ev) => (
                    <li key={ev}>{ev}</li>
                  ))}
                </ul>
              </div>

              <div className="sim-stage-card__footer">
                <span className="sim-stage-card__sourceText">
                  {sUi.sourceLinkPrefix} {activeStage.sourceLabel}
                </span>
                <a
                  href={activeStage.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sim-stage-card__sourceLink"
                >
                  {lang === 'en' ? 'View NASA Mission Record ↗' : 'NASA Görev Kaydını Görüntüle ↗'}
                </a>
              </div>
            </div>

            <figure className="sim-stage-card__mediaCol">
              <div className="sim-stage-card__imgWrap">
                <img
                  src={activeStage.imageUrl}
                  alt={activeStage.imageCaption}
                  className="sim-stage-card__img"
                />
                <span className="sim-stage-card__imgKind">
                  {activeStage.imageKindLabel}
                </span>
              </div>
              <figcaption className="sim-stage-card__caption">
                {activeStage.imageCaption}
              </figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
