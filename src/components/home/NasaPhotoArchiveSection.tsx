import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  fetchLiveNasaArchivePhotos,
  VERIFIED_NASA_ARCHIVE_PHOTOS,
} from '@/data/nasaPhotosData';
import type { NasaArchivePhoto, RoverId } from '@/types';

type MediaFilter = 'all' | 'photo-only' | 'illustration-only';

export function NasaPhotoArchiveSection() {
  const [roverFilter, setRoverFilter] = useState<RoverId | 'all'>('all');
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [livePhotos, setLivePhotos] = useState<NasaArchivePhoto[]>([]);
  const [apiStatus, setApiStatus] = useState<{
    state: 'idle' | 'loading' | 'online' | 'fallback';
    message: string;
  }>({
    state: 'idle',
    message:
      'Doğrulanmış yerel NASA/JPL arşivi aktif (8 yüksek çözünürlüklü kayıt). İsterseniz canlı NASA API sorgusu da başlatabilirsiniz.',
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const combinedPhotos = useMemo(() => {
    const existingIds = new Set(VERIFIED_NASA_ARCHIVE_PHOTOS.map((p) => p.nasaPiaCode));
    const uniqueLive = livePhotos.filter((p) => !existingIds.has(p.nasaPiaCode));
    return [...VERIFIED_NASA_ARCHIVE_PHOTOS, ...uniqueLive];
  }, [livePhotos]);

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
    setApiStatus({
      state: 'loading',
      message: 'NASA Resmi Görüntü Arşivi (images-api.nasa.gov) sorgulanıyor…',
    });

    try {
      const fetched = await fetchLiveNasaArchivePhotos(roverFilter);
      if (fetched.length > 0) {
        setLivePhotos((prev) => {
          const map = new Map(prev.map((item) => [item.id, item]));
          for (const item of fetched) map.set(item.id, item);
          return Array.from(map.values());
        });
        setApiStatus({
          state: 'online',
          message: `Canlı NASA API bağlantısı başarılı: ${fetched.length} ek arşiv kaydı yüklendi.`,
        });
      } else {
        setApiStatus({
          state: 'fallback',
          message:
            'NASA API ek kayıt döndürmedi; doğrulanmış yerel NASA/JPL arşivi kesintisiz kullanılıyor.',
        });
      }
    } catch {
      setApiStatus({
        state: 'fallback',
        message:
          'Çevrimdışı / ağ kısıtlaması algılandı: Doğrulanmış yerel NASA/JPL yedek (fallback) arşivi kesintisiz çalışıyor.',
      });
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
            RESMİ GÖRÜNTÜ KATALOĞU · 03
          </span>
          <h2 id="nasa-archive-heading" className="exploration-section__title">
            NASA FOTOĞRAF ARŞİVİ
          </h2>
          <p className="exploration-section__subtitle">
            Doğrulanmış Görev Fotoğrafları, Kamera Telemetrisi ve Kaynak Arşivi
          </p>
          <p className="exploration-section__lead">
            NASA/JPL-Caltech Photojournal ve NASA Image Library kayıtları. Her görselde
            çekim tarihi, kullanılan kamera sistemi, PIA katalog numarası ve görselin
            <strong> gerçek görev fotoğrafı mı yoksa resmi mühendislik illüstrasyonu mu</strong> olduğu
            açıkça belirtilmiştir.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="archive-controls" role="region" aria-label="Fotoğraf arşivi filtreleri">
          <div className="archive-controls__topRow">
            <div className="archive-rover-tabs" role="tablist" aria-label="Rovera göre filtrele">
              {(
                [
                  { id: 'all', label: 'Tüm Araçlar' },
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
                Görsel Türü Filtresi
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
                <option value="all">Tüm Görsel Türleri</option>
                <option value="photo-only">Sadece Gerçek NASA Fotoğrafları</option>
                <option value="illustration-only">Sadece Resmi İllüstrasyonlar</option>
              </select>
            </div>
          </div>

          <div className="archive-controls__bottomRow">
            <div className="archive-search-wrap">
              <input
                type="search"
                className="archive-search-input"
                placeholder="Kamera adı (PANCAM, MAHLI, WATSON), PIA kodu veya anahtar kelime ara…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setLightboxIndex(null);
                }}
                aria-label="Fotoğraf arşivinde ara"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="archive-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  Temizle
                </button>
              )}
            </div>

            <button
              type="button"
              className="archive-api-btn"
              onClick={handleLoadLiveNasaApi}
              disabled={apiStatus.state === 'loading'}
            >
              {apiStatus.state === 'loading'
                ? 'Sorgulanıyor…'
                : '🛰️ Canlı NASA API Sorgula'}
            </button>
          </div>

          <div
            className={`archive-status-bar archive-status-bar--${apiStatus.state}`}
            role="status"
            aria-live="polite"
          >
            <span className="archive-status-bar__dot" />
            <span>{apiStatus.message}</span>
          </div>
        </div>

        {/* Gallery Grid or Empty Result State */}
        {filteredPhotos.length === 0 ? (
          <div className="archive-empty-state">
            <h3>Eşleşen Arşiv Kaydı Bulunamadı</h3>
            <p>
              Seçtiğiniz filtre veya arama terimiyle eşleşen bir NASA görseli bulunamadı.
              Filtreleri sıfırlayarak tüm doğrulanmış arşivi görüntüleyebilirsiniz.
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
              Filtreleri Sıfırla
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
                    aria-label={`${photo.title} fotoğrafını tam ekran büyüt`}
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
                        {photo.mediaKindLabelTr}
                      </span>
                      <span className="archive-cam-badge">{photo.cameraCode}</span>
                    </div>
                    <div className="archive-card__zoomHint">
                      <span>🔍 BÜYÜT & GALERİDE AÇ</span>
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
                      <strong>Kamera:</strong> {photo.cameraFullName}
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
                          Büyüt
                        </button>
                        <a
                          href={photo.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-card__sourceLink"
                        >
                          NASA Kaynağı ↗
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
                    {activeLightboxPhoto.mediaKindLabelTr}
                  </span>
                  <span className="archive-lightbox__counter">
                    Görüntü {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="archive-lightbox__closeBtn"
                  onClick={() => setLightboxIndex(null)}
                >
                  ✕ KAPAT (ESC)
                </button>
              </header>

              <div className="archive-lightbox__content">
                <div className="archive-lightbox__imageStage">
                  <button
                    type="button"
                    className="archive-lightbox__navBtn archive-lightbox__navBtn--prev"
                    aria-label="Önceki fotoğraf"
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
                    aria-label="Sonraki fotoğraf"
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
                      <dt>ÇEKİM TARİHİ / SOL</dt>
                      <dd>
                        {activeLightboxPhoto.earthDate} · {activeLightboxPhoto.solOrDate}
                      </dd>
                    </div>
                    <div>
                      <dt>KAMERA SİSTEMİ</dt>
                      <dd>
                        {activeLightboxPhoto.cameraCode} —{' '}
                        {activeLightboxPhoto.cameraFullName}
                      </dd>
                    </div>
                    <div>
                      <dt>KATALOG KODU & TELİF</dt>
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
                    RESMİ NASA KATALOG SAYFASINI AÇ ↗
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
