import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/home/BrandLogo';
import { DetailStoryBanner } from '@/components/home/DetailStoryBanner';
import { useLanguage } from '@/context/LanguageContext';
import type { ExplorerStoryId, LunarMissionItem } from '@/types';

interface LunarMissionDetailViewProps {
  mission: LunarMissionItem;
  onClose: () => void;
  onSelectMission: (mission: LunarMissionItem) => void;
  onReadFullStory?: (storyId: ExplorerStoryId) => void;
}

interface LiveNasaPhotoResult {
  imageUrl: string;
  title: string;
  nasaId: string;
  dateCreated: string;
}

/**
 * Full-screen mission dossier view for any of the 9 Lunar surface missions
 * (Luna 9, Lunokhod 1, Lunokhod 2, Apollo 15/16/17 LRVs, Chang'e 3/Yutu,
 * Chang'e 4/Yutu-2, Chandrayaan-3/Pragyan).
 */
export function LunarMissionDetailView({
  mission,
  onClose,
  onSelectMission,
  onReadFullStory,
}: LunarMissionDetailViewProps) {
  const { lang, t } = useLanguage();
  const dUi = t.ui.lunarMissionDetail;
  const lunarMissions = t.data.lunarMissions;

  const containerRef = useRef<HTMLDivElement>(null);
  const [livePhoto, setLivePhoto] = useState<LiveNasaPhotoResult | null>(null);
  const [loadingLivePhoto, setLoadingLivePhoto] = useState(false);
  const [livePhotoError, setLivePhotoError] = useState<string | null>(null);

  const isActive = mission.statusLabel === t.ui.lunarExploration.activeStatusMatch;

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setLivePhoto(null);
    setLivePhotoError(null);
  }, [mission.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFetchLiveNasaPhoto = async () => {
    setLoadingLivePhoto(true);
    setLivePhotoError(null);
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          mission.nasaSearchQuery
        )}&media_type=image`
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();
      const items = json?.collection?.items ?? [];
      const firstWithLink = items.find(
        (it: { links?: Array<{ href?: string }>; data?: Array<{ title?: string; nasa_id?: string; date_created?: string }> }) =>
          it.links?.[0]?.href && it.data?.[0]
      );
      if (firstWithLink) {
        setLivePhoto({
          imageUrl: firstWithLink.links[0].href,
          title: firstWithLink.data[0].title ?? mission.name,
          nasaId: firstWithLink.data[0].nasa_id ?? 'NASA-ARCHIVE',
          dateCreated: (firstWithLink.data[0].date_created ?? '').slice(0, 10),
        });
      } else {
        setLivePhotoError(dUi.liveGalleryEmpty);
      }
    } catch {
      setLivePhotoError(
        lang === 'en'
          ? 'Could not connect to live NASA API (offline or network restriction). Displaying verified local mission diagram.'
          : 'Canlı NASA API bağlantısı kurulamadı (çevrimdışı veya ağ kısıtlaması). Doğrulanmış yerel görev şeması gösteriliyor.'
      );
    } finally {
      setLoadingLivePhoto(false);
    }
  };

  const currentIndex = lunarMissions.findIndex((item) => item.id === mission.id);
  const prevMission =
    lunarMissions[(currentIndex - 1 + lunarMissions.length) % lunarMissions.length];
  const nextMission =
    lunarMissions[(currentIndex + 1) % lunarMissions.length];

  const isApolloLrv =
    mission.id === 'apollo-15-lrv' ||
    mission.id === 'apollo-16-lrv' ||
    mission.id === 'apollo-17-lrv';
  const relatedStory = isApolloLrv
    ? t.data.explorerStories.find((s) => s.id === 'apollo-lrv') ?? null
    : null;

  return (
    <motion.div
      ref={containerRef}
      className="rover-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lunar-detail-title"
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
            <span>{dUi.backToLunar}</span>
          </button>

          <nav
            className="rover-detail__switcher"
            aria-label={dUi.switchMissionTitle}
          >
            {lunarMissions.map((item) => {
              const isSelected = item.id === mission.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`rover-detail__switchPill ${
                    isSelected ? 'rover-detail__switchPill--active' : ''
                  }`}
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelectMission(item)}
                >
                  {item.name.split(' (')[0]}
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
                {mission.statusLabel}
              </span>
              <span className="rover-detail__codeBadge">{mission.code}</span>
              <span className="rover-detail__yearsBadge">{mission.eraBadge}</span>
            </div>

            <h1 id="lunar-detail-title" className="rover-detail__title">
              {mission.name}
            </h1>

            <p className="rover-detail__summaryLead">{mission.summary}</p>

            {/* Primary Mission Metadata Grid */}
            <dl className="rover-detail__metaGrid">
              <div className="rover-detail__metaItem">
                <dt>{lang === 'en' ? 'AGENCY / COUNTRY & CLASS' : 'AJANS / ÜLKE & SINIF'}</dt>
                <dd>
                  <strong>{mission.agency}</strong>
                  <span>{mission.missionType}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>{dUi.launchDateLabel} &amp; {dUi.landingDateLabel}</dt>
                <dd>
                  <strong>{dUi.landingDateLabel}: {mission.landingDate}</strong>
                  <span>{dUi.launchDateLabel}: {mission.launchDate}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>{dUi.coordsLabel}</dt>
                <dd>
                  <strong>{mission.landingSite}</strong>
                  <span>
                    {mission.landingCoordinates} · {mission.hemisphereLabel}
                  </span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>{dUi.durationLabel} &amp; {dUi.missionEndDateLabel}</dt>
                <dd>
                  <strong>{mission.durationLabel}</strong>
                  <span>{mission.missionEndDate}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem rover-detail__metaItem--wide">
                <dt>{dUi.sourcesTitle}</dt>
                <dd className="lunar-detail__sourceLinks">
                  <a
                    href={mission.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="archive-card__sourceLink"
                  >
                    {mission.sourceLabel} ↗
                  </a>
                  {mission.secondarySourceUrl && mission.secondarySourceLabel ? (
                    <a
                      href={mission.secondarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="archive-card__sourceLink"
                    >
                      {mission.secondarySourceLabel} ↗
                    </a>
                  ) : null}
                </dd>
              </div>
            </dl>
          </div>

          <figure className="rover-detail__heroMedia">
            <div className="rover-detail__imageFrame">
              <img
                src={livePhoto ? livePhoto.imageUrl : mission.image}
                alt={livePhoto ? livePhoto.title : mission.imageAlt}
                className="rover-detail__image"
                onError={(e) => {
                  const target = e.currentTarget;
                  const svgFallback = `/assets/images/lunar/${mission.id}.svg`;
                  if (livePhoto && !target.src.endsWith(mission.image)) {
                    target.src = mission.image;
                  } else if (!target.dataset.fallbackApplied && !target.src.endsWith(svgFallback)) {
                    target.dataset.fallbackApplied = 'true';
                    target.src = svgFallback;
                  }
                }}
              />
            </div>
            <figcaption className="rover-detail__imageCaption">
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#93c5fd' }}>
                  [{livePhoto ? (lang === 'en' ? 'ACTUAL NASA ARCHIVE PHOTO' : 'GERÇEK NASA ARŞİV FOTOĞRAFI') : mission.mediaKindLabel}]
                </strong>{' '}
                {livePhoto
                  ? `${livePhoto.title} (NASA ID: ${livePhoto.nasaId} · ${livePhoto.dateCreated})`
                  : mission.imageCredit}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {!livePhoto ? (
                  <button
                    type="button"
                    className="lunar-live-photo-btn"
                    onClick={handleFetchLiveNasaPhoto}
                    disabled={loadingLivePhoto}
                  >
                    {loadingLivePhoto
                      ? dUi.liveGalleryLoading
                      : `📸 ${dUi.liveGalleryTitle}`}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="lunar-live-photo-btn"
                    onClick={() => setLivePhoto(null)}
                  >
                    📐 {lang === 'en' ? 'Return to Technical Diagram' : 'Teknik Rekonstrüksiyon Şemasına Dön'}
                  </button>
                )}
              </div>
              {livePhotoError ? (
                <p style={{ marginTop: '0.4rem', color: '#fbbf24', fontSize: '0.76rem' }}>
                  {livePhotoError}
                </p>
              ) : null}
            </figcaption>
          </figure>
        </section>

        {/* Key Telemetry Metrics */}
        <section
          className="rover-detail__metricsSection"
          aria-label="Öne çıkan Ay görevi istatistikleri"
        >
          <div className="rover-detail__metricsGrid">
            {mission.keyMetrics.map((metric) => (
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

        {relatedStory ? (
          <DetailStoryBanner story={relatedStory} onReadFullStory={onReadFullStory} />
        ) : null}

        {/* 01 · Mission Objective & Outcome */}
        <section
          className="rover-detail__section"
          aria-labelledby="lunar-objective-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">{dUi.sectionLabel} 01</span>
            <h2
              id="lunar-objective-heading"
              className="rover-detail__sectionTitle"
            >
              {dUi.objectiveTitle} &amp; {dUi.outcomeTitle}
            </h2>
          </div>

          <div className="rover-detail__objectiveGrid">
            <article className="rover-detail__narrativeCard">
              <span className="rover-detail__cardTag">{dUi.objectiveEyebrow}</span>
              <h3>{dUi.objectiveTitle}</h3>
              <p>{mission.missionObjective}</p>
            </article>

            <article className="rover-detail__narrativeCard rover-detail__narrativeCard--accent">
              <span className="rover-detail__cardTag">{dUi.outcomeEyebrow}</span>
              <h3>{dUi.outcomeTitle}</h3>
              <p>{mission.missionOutcome}</p>
            </article>
          </div>
        </section>

        {/* 02 · Technical Specifications */}
        <section
          className="rover-detail__section"
          aria-labelledby="lunar-specs-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">{dUi.sectionLabel} 02</span>
            <h2 id="lunar-specs-heading" className="rover-detail__sectionTitle">
              {dUi.specsTitle}
            </h2>
          </div>

          <dl className="rover-specs-grid">
            {mission.technicalSpecs.map((spec) => (
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
          aria-labelledby="lunar-instruments-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">{dUi.sectionLabel} 03</span>
            <h2
              id="lunar-instruments-heading"
              className="rover-detail__sectionTitle"
            >
              {dUi.instrumentsTitle}
            </h2>
          </div>

          <div className="rover-instruments-grid">
            {mission.scientificInstruments.map((instrument) => (
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

        {/* 04 · Major Discoveries */}
        <section
          className="rover-detail__section"
          aria-labelledby="lunar-discoveries-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">{dUi.sectionLabel} 04</span>
            <h2
              id="lunar-discoveries-heading"
              className="rover-detail__sectionTitle"
            >
              {dUi.discoveriesTitle}
            </h2>
          </div>

          <div className="rover-discoveries-grid">
            {mission.majorDiscoveries.map((discovery, idx) => (
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
          aria-labelledby="lunar-timeline-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">{dUi.sectionLabel} 05</span>
            <h2
              id="lunar-timeline-heading"
              className="rover-detail__sectionTitle"
            >
              {dUi.timelineTitle}
            </h2>
          </div>

          <ol className="rover-timeline">
            {mission.timeline.map((event) => (
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
            onClick={() => onSelectMission(prevMission)}
          >
            <span className="rover-detail__neighborHint">
              {lang === 'en' ? '← PREVIOUS LUNAR MISSION' : '← ÖNCEKİ AY GÖREVİ'}
            </span>
            <strong>{prevMission.name}</strong>
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={onClose}
          >
            ← {dUi.backToLunar}
          </button>

          <button
            type="button"
            className="rover-detail__neighborBtn rover-detail__neighborBtn--next"
            onClick={() => onSelectMission(nextMission)}
          >
            <span className="rover-detail__neighborHint">
              {lang === 'en' ? 'NEXT LUNAR MISSION →' : 'SONRAKİ AY GÖREVİ →'}
            </span>
            <strong>{nextMission.name}</strong>
          </button>
        </footer>
      </main>
    </motion.div>
  );
}
