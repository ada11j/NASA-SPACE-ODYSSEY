import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BrandLogo } from '@/components/home/BrandLogo';
import { LUNAR_MISSIONS } from '@/data/lunarMissionsData';
import type { LunarMissionItem } from '@/types';

interface LunarMissionDetailViewProps {
  mission: LunarMissionItem;
  onClose: () => void;
  onSelectMission: (mission: LunarMissionItem) => void;
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
}: LunarMissionDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [livePhoto, setLivePhoto] = useState<LiveNasaPhotoResult | null>(null);
  const [loadingLivePhoto, setLoadingLivePhoto] = useState(false);
  const [livePhotoError, setLivePhotoError] = useState<string | null>(null);

  const isActive = mission.statusLabel === 'AKTİF / UZATILMIŞ GÖREV';

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
        setLivePhotoError(
          'Bu sorgu için doğrudan görsel bulunamadı; resmi NASA NSSDCA bağlantısını kullanabilirsiniz.'
        );
      }
    } catch {
      setLivePhotoError(
        'Canlı NASA API bağlantısı kurulamadı (çevrimdışı veya ağ kısıtlaması). Doğrulanmış yerel görev şeması gösteriliyor.'
      );
    } finally {
      setLoadingLivePhoto(false);
    }
  };

  const currentIndex = LUNAR_MISSIONS.findIndex((item) => item.id === mission.id);
  const prevMission =
    LUNAR_MISSIONS[(currentIndex - 1 + LUNAR_MISSIONS.length) % LUNAR_MISSIONS.length];
  const nextMission =
    LUNAR_MISSIONS[(currentIndex + 1) % LUNAR_MISSIONS.length];

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
            <span>AY KEŞİFLERİNE DÖN</span>
          </button>

          <nav
            className="rover-detail__switcher"
            aria-label="Diğer Ay keşif görevleri"
          >
            {LUNAR_MISSIONS.map((item) => {
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
                <dt>AJANS / ÜLKE &amp; SINIF</dt>
                <dd>
                  <strong>{mission.agency}</strong>
                  <span>{mission.missionType}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>FIRLATMA &amp; AY’A İNİŞ TARİHİ</dt>
                <dd>
                  <strong>İniş: {mission.landingDate}</strong>
                  <span>Fırlatma: {mission.launchDate}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>İNİŞ BÖLGESİ &amp; KOORDİNATLAR</dt>
                <dd>
                  <strong>{mission.landingSite}</strong>
                  <span>
                    {mission.landingCoordinates} · {mission.hemisphereLabel}
                  </span>
                </dd>
              </div>
              <div className="rover-detail__metaItem">
                <dt>AKTİF GÖREV SÜRESİ &amp; SONUÇ</dt>
                <dd>
                  <strong>{mission.durationLabel}</strong>
                  <span>{mission.missionEndDate}</span>
                </dd>
              </div>
              <div className="rover-detail__metaItem rover-detail__metaItem--wide">
                <dt>DOĞRULANMIŞ BİLİMSEL KAYNAKLAR</dt>
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
                  [{livePhoto ? 'GERÇEK NASA ARŞİV FOTOĞRAFI' : mission.mediaKindLabel}]
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
                      ? 'NASA Arşivi Sorgulanıyor...'
                      : '📸 NASA Image Library’den Gerçek Görev Fotoğrafı Yükle'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="lunar-live-photo-btn"
                    onClick={() => setLivePhoto(null)}
                  >
                    📐 Teknik Rekonstrüksiyon Şemasına Dön
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

        {/* 01 · Mission Objective & Outcome */}
        <section
          className="rover-detail__section"
          aria-labelledby="lunar-objective-heading"
        >
          <div className="rover-detail__sectionHeader">
            <span className="rover-detail__sectionIndex">BÖLÜM 01</span>
            <h2
              id="lunar-objective-heading"
              className="rover-detail__sectionTitle"
            >
              GÖREV AMACI VE GÖREV SONUCU
            </h2>
          </div>

          <div className="rover-detail__objectiveGrid">
            <article className="rover-detail__narrativeCard">
              <span className="rover-detail__cardTag">GÖREV AMACI</span>
              <h3>Bilimsel ve Mühendislik Hedefleri</h3>
              <p>{mission.missionObjective}</p>
            </article>

            <article className="rover-detail__narrativeCard rover-detail__narrativeCard--accent">
              <span className="rover-detail__cardTag">GÖREV SONUCU &amp; MİRASI</span>
              <h3>Elde Edilen Başarı ve Sonuç</h3>
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
            <span className="rover-detail__sectionIndex">BÖLÜM 02</span>
            <h2 id="lunar-specs-heading" className="rover-detail__sectionTitle">
              TEKNİK ÖZELLİKLER VE DONANIM MİMARİSİ
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
            <span className="rover-detail__sectionIndex">BÖLÜM 03</span>
            <h2
              id="lunar-instruments-heading"
              className="rover-detail__sectionTitle"
            >
              BİLİMSEL CİHAZLAR VE DENEY YÜKLERİ
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
            <span className="rover-detail__sectionIndex">BÖLÜM 04</span>
            <h2
              id="lunar-discoveries-heading"
              className="rover-detail__sectionTitle"
            >
              ÖNEMLİ BİLİMSEL KEŞİFLER
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
                    KEŞİF 0{idx + 1}
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
            <span className="rover-detail__sectionIndex">BÖLÜM 05</span>
            <h2
              id="lunar-timeline-heading"
              className="rover-detail__sectionTitle"
            >
              GÖREV ZAMAN ÇİZELGESİ
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
            <span className="rover-detail__neighborHint">← ÖNCEKİ AY GÖREVİ</span>
            <strong>{prevMission.name}</strong>
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={onClose}
          >
            ← AY KEŞİFLERİNE DÖN
          </button>

          <button
            type="button"
            className="rover-detail__neighborBtn rover-detail__neighborBtn--next"
            onClick={() => onSelectMission(nextMission)}
          >
            <span className="rover-detail__neighborHint">SONRAKİ AY GÖREVİ →</span>
            <strong>{nextMission.name}</strong>
          </button>
        </footer>
      </main>
    </motion.div>
  );
}
