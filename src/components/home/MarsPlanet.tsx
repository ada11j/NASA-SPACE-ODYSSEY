import { Component, lazy, Suspense, useCallback, useState, type ReactNode } from 'react';
import { MARS_HERO_HOTSPOTS, type MarsHeroHotspot } from '@/data/marsHeroHotspots';

// Lazy-load the 3D scene so the title and buttons render immediately.
const MarsScene = lazy(() => import('@/scenes/MarsScene'));

interface BoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

/** Falls back to a soft CSS glow if WebGL is unavailable or the scene fails. */
class SceneErrorBoundary extends Component<BoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function readEnvironment() {
  if (typeof window === 'undefined') {
    return { compact: false, reducedMotion: false };
  }
  return {
    compact: window.innerWidth < 768,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
}

/**
 * Interactive Hero Mars:
 * - Real-time 3D sphere (Three.js + React Three Fiber)
 * - Continuous axial rotation that pauses on user interaction and smoothly resumes
 * - 360° mouse & touch rotation + wheel & pinch zoom
 * - High-resolution areographically anchored surface features (Olympus Mons, Valles Marineris, Jezero, Polar Caps)
 * - Clickable surface hotspots with scientific dossier card
 */
export function MarsPlanet() {
  const [{ compact, reducedMotion }] = useState(readEnvironment);
  const [selectedHotspot, setSelectedHotspot] = useState<MarsHeroHotspot | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<MarsHeroHotspot | null>(null);
  const [focusTrigger, setFocusTrigger] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [zoomCommand, setZoomCommand] = useState<{ step: number; seq: number }>({
    step: 0,
    seq: 0,
  });

  const handleSelectHotspotFromGlobe = useCallback((hotspot: MarsHeroHotspot) => {
    setSelectedHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot));
  }, []);

  const handleSelectHotspotFromHud = useCallback((hotspot: MarsHeroHotspot) => {
    setSelectedHotspot(hotspot);
    setFocusTrigger((c) => c + 1);
  }, []);

  const triggerZoom = useCallback((step: number) => {
    setZoomCommand((prev) => ({ step, seq: prev.seq + 1 }));
  }, []);

  const fallback = <div className="mars-fallback" aria-hidden="true" />;

  return (
    <>
      <SceneErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <MarsScene
            textureWidth={compact ? 1024 : 1536}
            reducedMotion={reducedMotion}
            compact={compact}
            selectedHotspotId={selectedHotspot?.id ?? null}
            focusTrigger={focusTrigger}
            zoomCommand={zoomCommand}
            onSelectHotspot={handleSelectHotspotFromGlobe}
            onHoverHotspot={setHoveredHotspot}
            onInteractionStateChange={setIsInteracting}
          />
        </Suspense>
      </SceneErrorBoundary>

      {/* Hero-scoped Interactive Controls & Hotspot Info Overlay */}
      <div className="mars-hero-overlay" aria-label="İnteraktif 3D Mars Kontrolleri ve Bilgi Noktaları">
        {/* Hover Tooltip Pill when pointing at a 3D Hotspot on Mars */}
        {hoveredHotspot && hoveredHotspot.id !== selectedHotspot?.id ? (
          <div className="mars-hover-pill" role="status">
            <span
              className="mars-hover-pill__dot"
              style={{ backgroundColor: hoveredHotspot.color }}
              aria-hidden="true"
            />
            <strong>{hoveredHotspot.name}</strong>
            <span>({hoveredHotspot.coordinatesText}) · Tıklayın</span>
          </div>
        ) : null}

        {/* Active Hotspot Scientific Info Card */}
        {selectedHotspot ? (
          <aside
            className="mars-hotspot-card"
            role="dialog"
            aria-modal="false"
            aria-labelledby="mars-hotspot-title"
          >
            <div className="mars-hotspot-card__header">
              <div className="mars-hotspot-card__badgeRow">
                <span
                  className="mars-hotspot-card__catBadge"
                  style={{
                    borderColor: selectedHotspot.color,
                    color: selectedHotspot.color,
                  }}
                >
                  ● {selectedHotspot.category.toUpperCase()}
                </span>
                <span className="mars-hotspot-card__coords">
                  {selectedHotspot.coordinatesText}
                </span>
              </div>

              <button
                type="button"
                className="mars-hotspot-card__closeBtn"
                aria-label="Bölge bilgi kartını kapat"
                onClick={() => setSelectedHotspot(null)}
              >
                ✕
              </button>
            </div>

            <h2 id="mars-hotspot-title" className="mars-hotspot-card__title">
              {selectedHotspot.name}
            </h2>

            <p className="mars-hotspot-card__scale">{selectedHotspot.scaleOrElevation}</p>

            <div className="mars-hotspot-card__section">
              <span className="mars-hotspot-card__label">KISA AÇIKLAMA</span>
              <p>{selectedHotspot.shortDescription}</p>
            </div>

            <div className="mars-hotspot-card__section mars-hotspot-card__section--science">
              <span className="mars-hotspot-card__label">BİLİMSEL ÖNEMİ</span>
              <p>{selectedHotspot.scientificSignificance}</p>
            </div>

            <div className="mars-hotspot-card__footer">
              <a
                href={selectedHotspot.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mars-hotspot-card__sourceLink"
              >
                Kaynak: {selectedHotspot.sourceLabel} ↗
              </a>
            </div>
          </aside>
        ) : null}

        {/* Minimalist Bottom HUD Bar: Rotation Telemetry, Hotspot Quick-Pills & Zoom Controls */}
        <div className="mars-hero-hud">
          <div className="mars-hero-hud__status">
            <span
              className={`mars-hero-hud__dot ${
                isInteracting ? 'mars-hero-hud__dot--manual' : ''
              }`}
              aria-hidden="true"
            />
            <span>
              {isInteracting
                ? '360° SERBEST KONTROL (OTOMATİK DÖNÜŞ DURAKLATILDI)'
                : reducedMotion
                  ? 'HAREKET AZALTMA MODU AKTİF'
                  : 'EKSENEL DÖNÜŞ AKTİF · FAREYLE 360° DÖNDÜR & YAKINLAŞTIR'}
            </span>
          </div>

          <div
            className="mars-hero-hud__hotspots"
            role="group"
            aria-label="Mars üzerindeki önemli bölgeler"
          >
            {MARS_HERO_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  className={`mars-hotspot-chip ${
                    isSelected ? 'mars-hotspot-chip--active' : ''
                  }`}
                  onClick={() => handleSelectHotspotFromHud(spot)}
                >
                  <span
                    className="mars-hotspot-chip__dot"
                    style={{ backgroundColor: spot.color }}
                    aria-hidden="true"
                  />
                  <span>{spot.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="mars-hero-hud__zoomGroup" role="group" aria-label="Mars yakınlaştırma kontrolleri">
            <button
              type="button"
              className="mars-zoom-btn"
              title="Yakınlaştır (Mouse tekerleği ile de yakınlaştırabilirsiniz)"
              aria-label="Mars'ı yakınlaştır"
              onClick={() => triggerZoom(-0.75)}
            >
              +
            </button>
            <button
              type="button"
              className="mars-zoom-btn"
              title="Uzaklaştır"
              aria-label="Mars'ı uzaklaştır"
              onClick={() => triggerZoom(0.75)}
            >
              −
            </button>
            <button
              type="button"
              className="mars-zoom-btn mars-zoom-btn--reset"
              title="Bakış açısını ve yakınlaştırmayı sıfırla"
              aria-label="Mars görünümünü sıfırla"
              onClick={() => {
                triggerZoom(0);
                setSelectedHotspot(null);
              }}
            >
              ↺
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
