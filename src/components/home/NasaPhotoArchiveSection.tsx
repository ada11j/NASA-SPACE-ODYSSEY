import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchLiveNasaArchivePhotos } from '@/data/nasaPhotosData';
import { useLanguage } from '@/context/LanguageContext';
import type { NasaArchivePhoto, RoverId } from '@/types';

type MediaFilter = 'all' | 'photo-only' | 'illustration-only';

export function NasaPhotoArchiveSection() {
  const { lang, t } = useLanguage();
  const aUi = t.ui.nasaPhotoArchive;
  const verifiedPhotos = t.data.nasaArchivePhotos;

  const [roverFilter, setRoverFilter] = useState<RoverId | 'all'>('all');
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [livePhotos, setLivePhotos] = useState<NasaArchivePhoto[]>([]);
  const [apiState, setApiState] = useState<{
    state: 'idle' | 'loading' | 'online' | 'fallback';
    fetchedCount?: number;
  }>({ state: 'idle' });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const apiMessage = useMemo(() => {
    if (apiState.state === 'loading') return aUi.liveStatusLoading;
    if (apiState.state === 'online') {
      return `${aUi.liveStatusSuccessPrefix} ${apiState.fetchedCount ?? 0} ${
        lang === 'en' ? 'additional records loaded.' : 'ek arşiv kaydı yüklendi.'
      }`;
    }
    if (apiState.state === 'fallback') return aUi.liveStatusFallback;
    return lang === 'en'
      ? `Verified local NASA/JPL archive active (${verifiedPhotos.length} high-resolution records). You can also query the live NASA API.`
      : `Doğrulanmış yerel NASA/JPL arşivi aktif (${verifiedPhotos.length} yüksek çözünürlüklü kayıt). İsterseniz canlı NASA API sorgusu da başlatabilirsiniz.`;
  }, [apiState, aUi, lang, verifiedPhotos.length]);

  const combinedPhotos = useMemo(() => {
    const existingIds = new Set(verifiedPhotos.map((p) => p.nasaPiaCode));
    const uniqueLive = livePhotos.filter((p) => !existingIds.has(p.nasaPiaCode));
    return [...verifiedPhotos, ...uniqueLive];
  }, [verifiedPhotos, livePhotos]);

  const filteredPhotos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return combinedPhotos.filter((photo) => {
      if (roverFilter !== 'all' && photo.roverId !== roverFilter) return false;
      if (
        mediaFilter === 'photo-only' &&
        photo.mediaKind !== 'Actual NASA Mission Photo'
      ) {
        return false;
      }
      if (
        mediaFilter === 'illustration-only' &&
        photo.mediaKind !== 'Official NASA/JPL Mission Concept Illustration'
      ) {
        return false;
      }
      if (!q) return true;
      return (
        photo.title.toLowerCase().includes(q) ||
        photo.cameraCode.toLowerCase().includes(q) ||
        photo.cameraFullName.toLowerCase().includes(q) ||
        photo.nasaPiaCode.toLowerCase().includes(q) ||
        photo.description.toLowerCase().includes(q)
      );
    });
  }, [combinedPhotos, roverFilter, mediaFilter, searchQuery]);

  const handleLoadLiveNasaApi = async () => {
    setApiState({ state: 'loading' });

    try {
      const fetched = await fetchLiveNasaArchivePhotos(roverFilter);
      if (fetched.length > 0) {
        setLivePhotos((prev) => {
          const map = new Map(prev.map((item) => [item.id, item]));
          for (const item of fetched) map.set(item.id, item);
          return Array.from(map.values());
        });
        setApiState({ state: 'online', fetchedCount: fetched.length });
      } else {
        setApiState({ state: 'fallback' });
      }
    } catch {
      setApiState({ state: 'fallback' });
    }
  };

  // Keyboard navigation for the Lightbox modal
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight' && filteredPhotos.length > 0) {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (event.key === 'ArrowLeft' && filteredPhotos.length > 0) {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredPhotos.length]);

  const activeLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  return (
    <section
      id="nasa-photo-archive"
      className="exploration-section exploration-section--archive"
      aria-labelledby="nasa-archive-heading"
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
            {aUi.eyebrow}
          </span>
          <h2 id="nasa-archive-heading" className="exploration-section__title">
            {aUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {aUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {aUi.description}
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="archive-controls" role="region" aria-label={aUi.title}>
          <div className="archive-controls__topRow">
            <div className="archive-rover-tabs" role="tablist" aria-label={aUi.filterAll}>
              {(
                [
                  { id: 'all', label: aUi.filterAll },
                  { id: 'spirit', label: 'Spirit (MER-A)' },
                  { id: 'opportunity', label: 'Opportunity (MER-B)' },
                  { id: 'curiosity', label: 'Curiosity' },
                  { id: 'perseverance', label: 'Perseverance' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={roverFilter === tab.id}
                  className={`archive-tab-btn ${
                    roverFilter === tab.id ? 'archive-tab-btn--active' : ''
                  }`}
                  onClick={() => {
                    setRoverFilter(tab.id);
                    setLightboxIndex(null);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="archive-media-filter">
              <label htmlFor="archive-media-select" className="sr-only">
                {lang === 'en' ? 'Media Type Filter' : 'Görsel Türü Filtresi'}
              </label>
              <select
                id="archive-media-select"
                className="archive-select"
                value={mediaFilter}
                onChange={(e) => {
                  setMediaFilter(e.target.value as MediaFilter);
                  setLightboxIndex(null);
                }}
              >
                <option value="all">{lang === 'en' ? 'All Media Types' : 'Tüm Görsel Türleri'}</option>
                <option value="photo-only">{aUi.mediaKindActual}</option>
                <option value="illustration-only">{aUi.mediaKindIllustration}</option>
              </select>
            </div>
          </div>

          <div className="archive-controls__bottomRow">
            <div className="archive-search-wrap">
              <input
                type="search"
                className="archive-search-input"
                placeholder={
                  lang === 'en'
                    ? 'Search camera (PANCAM, MAHLI, WATSON), PIA code, or keyword…'
                    : 'Kamera adı (PANCAM, MAHLI, WATSON), PIA kodu veya anahtar kelime ara…'
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setLightboxIndex(null);
                }}
                aria-label={lang === 'en' ? 'Search photo archive' : 'Fotoğraf arşivinde ara'}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="archive-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  {lang === 'en' ? 'Clear' : 'Temizle'}
                </button>
              )}
            </div>

            <button
              type="button"
              className="archive-api-btn"
              onClick={handleLoadLiveNasaApi}
              disabled={apiState.state === 'loading'}
            >
              {apiState.state === 'loading'
                ? aUi.liveStatusLoading
                : `🛰️ ${aUi.modeLiveBtn}`}
            </button>
          </div>

          <div
            className={`archive-status-bar archive-status-bar--${apiState.state}`}
            role="status"
            aria-live="polite"
          >
            <span className="archive-status-bar__dot" />
            <span>{apiMessage}</span>
          </div>
        </div>

        {/* Gallery Grid or Empty Result State */}
        {filteredPhotos.length === 0 ? (
          <div className="archive-empty-state">
            <h3>{lang === 'en' ? 'No Matching Archive Records' : 'Eşleşen Arşiv Kaydı Bulunamadı'}</h3>
            <p>
              {lang === 'en'
                ? 'No NASA images matched your selected filter or search term. Reset filters to view the full verified archive.'
                : 'Seçtiğiniz filtre veya arama terimiyle eşleşen bir NASA görseli bulunamadı. Filtreleri sıfırlayarak tüm doğrulanmış arşivi görüntüleyebilirsiniz.'}
            </p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setRoverFilter('all');
                setMediaFilter('all');
                setSearchQuery('');
              }}
            >
              {lang === 'en' ? 'Reset Filters' : 'Filtreleri Sıfırla'}
            </button>
          </div>
        ) : (
          <div className="archive-grid">
            {filteredPhotos.map((photo, index) => {
              const isRealPhoto = photo.mediaKind === 'Actual NASA Mission Photo';
              return (
                <motion.article
                  key={photo.id}
                  className="archive-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                >
                  <div
                    className="archive-card__media"
                    role="button"
                    tabIndex={0}
                    aria-label={`${photo.title} — ${aUi.cardInspectBtn}`}
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="archive-card__img"
                      loading="lazy"
                    />
                    <div className="archive-card__topBadges">
                      <span
                        className={`archive-kind-badge ${
                          isRealPhoto
                            ? 'archive-kind-badge--real'
                            : 'archive-kind-badge--illustration'
                        }`}
                      >
                        {isRealPhoto ? aUi.mediaKindActual : aUi.mediaKindIllustration}
                      </span>
                      <span className="archive-cam-badge">{photo.cameraCode}</span>
                    </div>
                    <div className="archive-card__zoomHint">
                      <span>🔍 {aUi.cardInspectBtn.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="archive-card__body">
                    <div className="archive-card__metaRow">
                      <span className="archive-card__rover">{photo.roverName}</span>
                      <span className="archive-card__date">
                        {photo.earthDate} ({photo.solOrDate})
                      </span>
                    </div>

                    <h3 className="archive-card__title">{photo.title}</h3>
                    <p className="archive-card__camFull">
                      <strong>{aUi.modalCameraLabel}:</strong> {photo.cameraFullName}
                    </p>
                    <p className="archive-card__desc">{photo.description}</p>

                    <div className="archive-card__footer">
                      <span className="archive-card__credit">
                        {photo.nasaPiaCode} · {photo.credit}
                      </span>
                      <div className="archive-card__actions">
                        <button
                          type="button"
                          className="archive-card__expandBtn"
                          onClick={() => setLightboxIndex(index)}
                        >
                          {aUi.cardInspectBtn}
                        </button>
                        <a
                          href={photo.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-card__sourceLink"
                        >
                          {aUi.modalOfficialLink}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Fullscreen Gallery Inspection */}
      <AnimatePresence>
        {activeLightboxPhoto && lightboxIndex !== null && (
          <motion.div
            className="archive-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-photo-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="archive-lightbox__dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="archive-lightbox__header">
                <div className="archive-lightbox__headerMeta">
                  <span
                    className={`archive-kind-badge ${
                      activeLightboxPhoto.mediaKind === 'Actual NASA Mission Photo'
                        ? 'archive-kind-badge--real'
                        : 'archive-kind-badge--illustration'
                    }`}
                  >
                    {activeLightboxPhoto.mediaKind === 'Actual NASA Mission Photo'
                      ? aUi.mediaKindActual
                      : aUi.mediaKindIllustration}
                  </span>
                  <span className="archive-lightbox__counter">
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="archive-lightbox__closeBtn"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={aUi.modalCloseAria}
                >
                  ✕ {aUi.modalCloseBtn}
                </button>
              </header>

              <div className="archive-lightbox__content">
                <div className="archive-lightbox__imageStage">
                  <button
                    type="button"
                    className="archive-lightbox__navBtn archive-lightbox__navBtn--prev"
                    aria-label={lang === 'en' ? 'Previous photo' : 'Önceki fotoğraf'}
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredPhotos.length) %
                          filteredPhotos.length
                      )
                    }
                  >
                    ‹
                  </button>

                  <img
                    src={activeLightboxPhoto.imageUrl}
                    alt={activeLightboxPhoto.title}
                    className="archive-lightbox__img"
                  />

                  <button
                    type="button"
                    className="archive-lightbox__navBtn archive-lightbox__navBtn--next"
                    aria-label={lang === 'en' ? 'Next photo' : 'Sonraki fotoğraf'}
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)
                    }
                  >
                    ›
                  </button>
                </div>

                <aside className="archive-lightbox__details">
                  <span className="archive-lightbox__mission">
                    {activeLightboxPhoto.missionLabel}
                  </span>
                  <h3 id="lightbox-photo-title" className="archive-lightbox__title">
                    {activeLightboxPhoto.title}
                  </h3>

                  <dl className="archive-lightbox__specs">
                    <div>
                      <dt>{aUi.modalEarthDateLabel} / {aUi.modalSolLabel}</dt>
                      <dd>
                        {activeLightboxPhoto.earthDate} · {activeLightboxPhoto.solOrDate}
                      </dd>
                    </div>
                    <div>
                      <dt>{aUi.modalCameraLabel}</dt>
                      <dd>
                        {activeLightboxPhoto.cameraCode} —{' '}
                        {activeLightboxPhoto.cameraFullName}
                      </dd>
                    </div>
                    <div>
                      <dt>{aUi.modalPiaLabel} &amp; {aUi.modalCreditLabel}</dt>
                      <dd>
                        {activeLightboxPhoto.nasaPiaCode} · {activeLightboxPhoto.credit}
                      </dd>
                    </div>
                  </dl>

                  <p className="archive-lightbox__description">
                    {activeLightboxPhoto.description}
                  </p>

                  <a
                    href={activeLightboxPhoto.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary archive-lightbox__extBtn"
                  >
                    {aUi.modalOfficialLink}
                  </a>
                </aside>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
