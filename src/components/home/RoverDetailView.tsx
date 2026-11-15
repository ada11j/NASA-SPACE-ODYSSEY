import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/home/BrandLogo';
import { useLanguage } from '@/context/LanguageContext';
import type { MarsRoverItem } from '@/types';

interface RoverDetailViewProps {
  rover: MarsRoverItem;
  onClose: () => void;
  onSelectRover: (rover: MarsRoverItem) => void;
}

/**
 * Full-screen mission dossier view for a selected Mars rover.
 * Preserves the HVB HORIZON deep-space atmosphere while presenting
 * mission dates, landing site, mission objective, technical specs,
 * scientific instruments, major discoveries, and the mission timeline.
 */
export function RoverDetailView({
  rover,
  onClose,
  onSelectRover,
}: RoverDetailViewProps) {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isActive =
    rover.statusLabel === 'AKTİF GÖREV' || rover.statusLabel === 'ACTIVE MISSION';

  // Scroll the detail view to the top whenever a new rover is selected.
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rover.id]);

  // Allow closing with the Escape key.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const rovers = t.data.marsRovers;
  const currentIndex = rovers.findIndex((item) => item.id === rover.id);
  const prevRover = rovers[(currentIndex - 1 + rovers.length) % rovers.length];
  const nextRover = rovers[(currentIndex + 1) % rovers.length];

  return (
    <motion.div
      ref={containerRef}
      className="rover-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rover-detail-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Sticky Top Command Bar */}
      <header className="rover-detail__topbar">
        <div className="rover-detail__topbarInner">
          <button
            type="button"
            className="rover-detail__backBtn"
            onClick={onClose}
          >
            <span aria-hidden="true">←</span>
            <span>{t.ui.roverDetail.backToMars.toUpperCase()}</span>
          </button>

          <nav
            className="rover-detail__switcher"
            aria-label={t.ui.roverDetail.switchRoverTitle}
          >
            {rovers.map((item) => {
              const isSelected = item.id === rover.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`rover-detail__switchPill ${
                    isSelected ? 'rover-detail__switchPill--active' : ''
                  }`}
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelectRover(item)}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="rover-detail__brandWrap">
            <BrandLogo />
          </div>
        </div>
      </header>

      <main className="rover-detail__main">
        {/* Hero Dossier Header */}
        <section className="rover-detail__hero">
          <div className="rover-detail__heroContent">
            <div className="rover-detail__badgeRow">
              <span
                className={`rover-card__status ${
                  isActive
                    ? 'rover-card__status--active'
                    : 'rover-card__status--completed'
                }`}
              >
                {rover.statusLabel}
              </span>
              <span className="rover-detail__codeBadge">{rover.code}</span>
              <span className="rover-detail__yearsBadge">{rover.landingYear}</span>
            </div>

            <h1 id="rover-detail-title" className="rover-detail__title">
              {rover.name}
            </h1>

            <p className="rover-detail__summaryLead">{rover.summary}</p>

            {/* Primary Mission Metadata Grid */}
            <dl className="rover-detail__metaGrid">
              <div className="rover-detail__metaItem">
                <dt>{t.ui.roverDetail.launchDateLabel.toUpperCase()}</dt>
                <dd>{rover.launchDate}</dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>{t.ui.roverDetail.landingDateLabel.toUpperCase()}</dt>
                <dd>{rover.landingDate}</dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>{t.ui.roverDetail.coordsLabel.toUpperCase()}</dt>
                <dd>
                  <strong>{rover.landingSite}</strong>
                  <span>{rover.landingCoordinates}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>
                  {t.ui.roverDetail.plannedDurationLabel.toUpperCase()} /{' '}
                  {t.ui.roverDetail.actualDurationLabel.toUpperCase()}
                </dt>
                <dd>
                  <strong>{rover.actualDuration}</strong>
                  <span>
                    {lang === 'en' ? 'Planned:' : 'Planlanan:'} {rover.plannedDuration}
                  </span>
                </dd>
              </div>
              <div className="rover-detail__metaItem rover-detail__metaItem--wide">
                <dt>{t.ui.roverDetail.missionEndDateLabel.toUpperCase()}</dt>
                <dd>{rover.missionEndDate}</dd>
              </div>
            </dl>
          </div>

          <figure className="rover-detail__heroMedia">
            <div className="rover-detail__imageFrame">
              <img
                src={rover.image}
                alt={rover.imageAlt}
                className="rover-detail__image"
              />
            </div>
            <figcaption className="rover-detail__imageCaption">
              {rover.imageCredit}
            </figcaption>
          </figure>
        </section>

        {/* Key Telemetry Metrics */}
        <section
          className="rover-detail__metricsSection"
          aria-label={t.ui.roverDetail.metricsAriaLabel}
        >
          <div className="rover-detail__metricsGrid">
            {rover.keyMetrics.map((metric) => (
              <div key={metric.label} className="rover-metric-card">
                <span className="rover-metric-card__label">{metric.label}</span>
                <strong className="rover-metric-card__value">
                  {metric.value}
                </strong>
                <span className="rover-metric-card__sub">{metric.sublabel}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 01 · Mission Objective & Legacy */}
        <section
          className="rover-detail__section"
          aria-labelledby="section-objective-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">
              {lang === 'en' ? 'SECTION 01' : 'BÖLÜM 01'}
            </span>
            <h2
              id="section-objective-heading"
              className="rover-detail__sectionTitle"
            >
              {t.ui.roverDetail.objectiveTitle.toUpperCase()} &amp;{' '}
              {t.ui.roverDetail.legacyTitle.toUpperCase()}
            </h2>
          </div>

          <div className="rover-detail__objectiveGrid">
            <article className="rover-detail__narrativeCard">
              <span className="rover-detail__cardTag">{t.ui.roverDetail.objectiveEyebrow}</span>
              <h3>{t.ui.roverDetail.objectiveTitle}</h3>
              <p>{rover.missionObjective}</p>
            </article>

            <article className="rover-detail__narrativeCard rover-detail__narrativeCard--accent">
              <span className="rover-detail__cardTag">{t.ui.roverDetail.legacyEyebrow}</span>
              <h3>{t.ui.roverDetail.legacyTitle}</h3>
              <p>{rover.finalLegacy}</p>
            </article>
          </div>
        </section>

        {/* 02 · Technical Specifications */}
        <section
          className="rover-detail__section"
          aria-labelledby="section-specs-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">
              {lang === 'en' ? 'SECTION 02' : 'BÖLÜM 02'}
            </span>
            <h2 id="section-specs-heading" className="rover-detail__sectionTitle">
              {t.ui.roverDetail.specsTitle.toUpperCase()}
            </h2>
          </div>

          <dl className="rover-specs-grid">
            {rover.technicalSpecs.map((spec) => (
              <div key={spec.label} className="rover-spec-card">
                <dt className="rover-spec-card__label">{spec.label}</dt>
                <dd className="rover-spec-card__value">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 03 · Scientific Instruments */}
        <section
          className="rover-detail__section"
          aria-labelledby="section-instruments-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">
              {lang === 'en' ? 'SECTION 03' : 'BÖLÜM 03'}
            </span>
            <h2
              id="section-instruments-heading"
              className="rover-detail__sectionTitle"
            >
              {t.ui.roverDetail.instrumentsTitle.toUpperCase()}
            </h2>
          </div>

          <div className="rover-instruments-grid">
            {rover.scientificInstruments.map((instrument) => (
              <article key={instrument.code} className="rover-instrument-card">
                <div className="rover-instrument-card__top">
                  <span className="rover-instrument-card__code">
                    {instrument.code}
                  </span>
                  <span className="rover-instrument-card__location">
                    {instrument.location}
                  </span>
                </div>
                <h3 className="rover-instrument-card__name">
                  {instrument.name}
                </h3>
                <p className="rover-instrument-card__desc">
                  {instrument.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 04 · Major Scientific Discoveries */}
        <section
          className="rover-detail__section"
          aria-labelledby="section-discoveries-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">
              {lang === 'en' ? 'SECTION 04' : 'BÖLÜM 04'}
            </span>
            <h2
              id="section-discoveries-heading"
              className="rover-detail__sectionTitle"
            >
              {t.ui.roverDetail.discoveriesTitle.toUpperCase()}
            </h2>
          </div>

          <div className="rover-discoveries-grid">
            {rover.majorDiscoveries.map((discovery, idx) => (
              <article
                key={discovery.title}
                className="rover-discovery-card"
              >
                <div className="rover-discovery-card__header">
                  <span className="rover-discovery-card__num">
                    {lang === 'en' ? `DISCOVERY 0${idx + 1}` : `KEŞİF 0${idx + 1}`}
                  </span>
                  <span className="rover-discovery-card__loc">
                    {discovery.location}
                  </span>
                </div>
                <h3 className="rover-discovery-card__title">
                  {discovery.title}
                </h3>
                <p className="rover-discovery-card__desc">
                  {discovery.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 05 · Mission Timeline */}
        <section
          className="rover-detail__section"
          aria-labelledby="section-timeline-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">
              {lang === 'en' ? 'SECTION 05' : 'BÖLÜM 05'}
            </span>
            <h2
              id="section-timeline-heading"
              className="rover-detail__sectionTitle"
            >
              {t.ui.roverDetail.timelineTitle.toUpperCase()}
            </h2>
          </div>

          <ol className="rover-timeline">
            {rover.timeline.map((event) => (
              <li
                key={`${event.sol}-${event.title}`}
                className="rover-timeline__item"
              >
                <div className="rover-timeline__marker" aria-hidden="true" />
                <div className="rover-timeline__card">
                  <div className="rover-timeline__meta">
                    <span className="rover-timeline__sol">{event.sol}</span>
                    <span className="rover-timeline__date">{event.date}</span>
                  </div>
                  <h3 className="rover-timeline__title">{event.title}</h3>
                  <p className="rover-timeline__desc">{event.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Bottom Navigation Bar */}
        <footer className="rover-detail__bottomNav">
          <button
            type="button"
            className="rover-detail__neighborBtn"
            onClick={() => onSelectRover(prevRover)}
          >
            <span className="rover-detail__neighborHint">
              ← {lang === 'en' ? 'PREVIOUS ROVER' : 'ÖNCEKİ ARAÇ'}
            </span>
            <strong>{prevRover.name}</strong>
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={onClose}
          >
            ← {t.ui.roverDetail.backToMars.toUpperCase()}
          </button>

          <button
            type="button"
            className="rover-detail__neighborBtn rover-detail__neighborBtn--next"
            onClick={() => onSelectRover(nextRover)}
          >
            <span className="rover-detail__neighborHint">
              {lang === 'en' ? 'NEXT ROVER' : 'SONRAKİ ARAÇ'} →
            </span>
            <strong>{nextRover.name}</strong>
          </button>
        </footer>
      </main>
    </motion.div>
  );
}
