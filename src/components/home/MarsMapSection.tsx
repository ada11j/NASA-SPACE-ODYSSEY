import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { MarsRoverMapProfile, RoverId } from '@/types';

type MapMode = 'global' | 'regional';

/**
 * Converts planetocentric latitude (-90..+90) and East longitude (0..360)
 * into SVG coordinates on a 1000×500 equirectangular map centered at 180°E.
 */
function latLonToGlobalSvg(lat: number, lonEast: number): { x: number; y: number } {
  const normalizedLon = ((lonEast % 360) + 360) % 360;
  const x = (normalizedLon / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

export function MarsMapSection() {
  const { lang, t } = useLanguage();
  const mUi = t.ui.marsMap;
  const mapProfiles = t.data.marsRoverMapProfiles;
  const globalLandmarks = t.data.marsGlobalLandmarks;

  const [mapMode, setMapMode] = useState<MapMode>('global');
  const [activeRoverId, setActiveRoverId] = useState<RoverId | 'all'>('all');
  const [selectedProfileId, setSelectedProfileId] = useState<RoverId>(
    mapProfiles[1]?.roverId ?? mapProfiles[0].roverId
  );
  const [selectedWaypointId, setSelectedWaypointId] = useState<string>(
    mapProfiles[1]?.waypoints[0]?.id ?? mapProfiles[0].waypoints[0].id
  );

  const selectedProfile =
    mapProfiles.find((p) => p.roverId === selectedProfileId) ?? mapProfiles[0];
  const selectedWaypoint =
    selectedProfile.waypoints.find((w) => w.id === selectedWaypointId) ??
    selectedProfile.waypoints[0];

  // Interactive Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; panX: number; panY: number }>({
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  });

  const handleZoomChange = (delta: number) => {
    setZoom((prev) => {
      const next = Math.min(4.5, Math.max(1, Number((prev + delta).toFixed(2))));
      if (next === 1) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFocusRoverOnGlobal = (profile: MarsRoverMapProfile) => {
    setSelectedProfileId(profile.roverId);
    setSelectedWaypointId(profile.waypoints[0].id);
    if (mapMode === 'global') {
      const { x, y } = latLonToGlobalSvg(profile.lat, profile.lonEast);
      const targetZoom = 2.4;
      setZoom(targetZoom);
      setPan({
        x: (500 - x) * 0.55,
        y: (250 - y) * 0.55,
      });
    }
  };

  const handleSwitchToRegional = (profile: MarsRoverMapProfile) => {
    setSelectedProfileId(profile.roverId);
    setSelectedWaypointId(profile.waypoints[0].id);
    setActiveRoverId(profile.roverId);
    setMapMode('regional');
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = event.clientX - dragStartRef.current.startX;
    const dy = event.clientY - dragStartRef.current.startY;
    const maxOffset = (zoom - 1) * 280 + 90;
    setPan({
      x: Math.max(-maxOffset, Math.min(maxOffset, dragStartRef.current.panX + dx)),
      y: Math.max(-maxOffset * 0.6, Math.min(maxOffset * 0.6, dragStartRef.current.panY + dy)),
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const visibleProfiles =
    activeRoverId === 'all'
      ? mapProfiles
      : mapProfiles.filter((p) => p.roverId === activeRoverId);

  return (
    <section
      id="mars-map"
      className="exploration-section exploration-section--map"
      aria-labelledby="mars-map-heading"
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
            {mUi.eyebrow}
          </span>
          <h2 id="mars-map-heading" className="exploration-section__title">
            {mUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {mUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {mUi.description}
          </p>
        </motion.div>

        {/* Top Control Bar: Mode Switcher + Rover Legend Filters */}
        <div className="mars-map-toolbar" role="region" aria-label={mUi.roverSelectorAria}>
          <div className="mars-map-toolbar__modes" role="tablist" aria-label={mUi.roverSelectorAria}>
            <button
              type="button"
              role="tab"
              aria-selected={mapMode === 'global'}
              className={`mars-map-mode-btn ${
                mapMode === 'global' ? 'mars-map-mode-btn--active' : ''
              }`}
              onClick={() => {
                setMapMode('global');
                handleResetView();
              }}
            >
              🌐 {mUi.viewModeGlobal}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mapMode === 'regional'}
              className={`mars-map-mode-btn ${
                mapMode === 'regional' ? 'mars-map-mode-btn--active' : ''
              }`}
              onClick={() => {
                setMapMode('regional');
                handleResetView();
              }}
            >
              🧭 {mUi.viewModeRegional}
            </button>
          </div>

          <div className="mars-map-toolbar__rovers" aria-label={mUi.roverSelectorAria}>
            {mapMode === 'global' && (
              <button
                type="button"
                className={`mars-rover-chip ${
                  activeRoverId === 'all' ? 'mars-rover-chip--active' : ''
                }`}
                onClick={() => {
                  setActiveRoverId('all');
                  handleResetView();
                }}
              >
                {lang === 'en' ? 'All Rovers (4)' : 'Tüm Araçlar (4)'}
              </button>
            )}
            {mapProfiles.map((profile) => {
              const isSelected =
                mapMode === 'regional'
                  ? selectedProfile.roverId === profile.roverId
                  : activeRoverId === profile.roverId;

              return (
                <button
                  key={profile.roverId}
                  type="button"
                  className={`mars-rover-chip ${
                    isSelected ? 'mars-rover-chip--active' : ''
                  }`}
                  style={{
                    borderColor: isSelected ? profile.color : undefined,
                  }}
                  onClick={() => {
                    setSelectedProfileId(profile.roverId);
                    setSelectedWaypointId(profile.waypoints[0].id);
                    if (mapMode === 'global') {
                      setActiveRoverId(profile.roverId);
                      handleFocusRoverOnGlobal(profile);
                    } else {
                      setActiveRoverId(profile.roverId);
                      handleResetView();
                    }
                  }}
                >
                  <span
                    className="mars-rover-chip__dot"
                    style={{ backgroundColor: profile.color }}
                  />
                  <span>{profile.roverName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Map Workspace */}
        <div className="mars-map-workspace">
          {/* Left/Center Interactive Viewport */}
          <div className="mars-map-stage">
            <div className="mars-map-stage__hudTop">
              <div className="mars-map-stage__scaleInfo">
                <span className="mars-map-stage__badge">
                  {mapMode === 'global'
                    ? mUi.globalTitlePrefix
                    : `${selectedProfile.craterName.toUpperCase()} — ${mUi.regionalTitlePrefix}`}
                </span>
                <span className="mars-map-stage__sub">
                  {mapMode === 'global'
                    ? mUi.inspectorIdleHint
                    : selectedProfile.regionalScaleLabel}
                </span>
              </div>

              <div className="mars-map-stage__zoomControls" aria-label="Zoom controls">
                <button
                  type="button"
                  className="mars-zoom-btn"
                  aria-label={lang === 'en' ? 'Zoom out' : 'Uzaklaştır'}
                  onClick={() => handleZoomChange(-0.45)}
                  disabled={zoom <= 1}
                >
                  −
                </button>
                <span className="mars-zoom-readout">{zoom.toFixed(1)}×</span>
                <button
                  type="button"
                  className="mars-zoom-btn"
                  aria-label={lang === 'en' ? 'Zoom in' : 'Yakınlaştır'}
                  onClick={() => handleZoomChange(0.45)}
                  disabled={zoom >= 4.5}
                >
                  +
                </button>
                <button
                  type="button"
                  className="mars-zoom-btn mars-zoom-btn--reset"
                  onClick={handleResetView}
                >
                  {lang === 'en' ? 'Reset' : 'Sıfırla'}
                </button>
              </div>
            </div>

            {/* Draggable & Zoomable Canvas Container */}
            <div
              className={`mars-map-viewport ${
                isDragging ? 'mars-map-viewport--dragging' : ''
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div
                className="mars-map-canvasTransform"
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                }}
              >
                {mapMode === 'global' ? (
                  /* ---- GLOBAL MARS MAP SVG ---- */
                  <svg
                    viewBox="0 0 1000 500"
                    className="mars-map-svg"
                    role="img"
                    aria-label="Mars küresel iniş noktaları ve coğrafi bölgeler haritası"
                  >
                    <defs>
                      <linearGradient id="marsGlobalBg" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3c1d14" />
                        <stop offset="22%" stopColor="#6c2d19" />
                        <stop offset="50%" stopColor="#8f3c1e" />
                        <stop offset="78%" stopColor="#652815" />
                        <stop offset="100%" stopColor="#2e1610" />
                      </linearGradient>

                      <radialGradient id="tharsisRise" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d9723e" stopOpacity="0.48" />
                        <stop offset="100%" stopColor="#8f3c1e" stopOpacity="0" />
                      </radialGradient>

                      <radialGradient id="hellasBasin" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#1a1221" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#421c12" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Base Martian Albedo & Hypsometric Relief */}
                    <rect width="1000" height="500" fill="url(#marsGlobalBg)" />

                    {/* Northern Lowlands (Vastitas Borealis / Utopia / Acidalia) */}
                    <path
                      d="M0,0 L1000,0 L1000,190 Q820,225 650,175 Q480,145 310,185 Q140,210 0,180 Z"
                      fill="#23181a"
                      opacity="0.45"
                    />

                    {/* Tharsis Volcanic Plateau */}
                    <ellipse cx="700" cy="245" rx="190" ry="115" fill="url(#tharsisRise)" />

                    {/* Syrtis Major Dark Albedo Shield */}
                    <ellipse
                      cx="195"
                      cy="228"
                      rx="68"
                      ry="52"
                      fill="#261412"
                      opacity="0.55"
                      transform="rotate(-14 195 228)"
                    />

                    {/* Hellas Impact Basin */}
                    <ellipse cx="196" cy="368" rx="95" ry="62" fill="url(#hellasBasin)" />

                    {/* Valles Marineris Canyon System */}
                    <path
                      d="M765,282 Q835,292 910,285"
                      stroke="#240e09"
                      strokeWidth="9"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.7"
                    />

                    {/* Polar Caps */}
                    <rect x="0" y="0" width="1000" height="16" fill="#f3ece6" opacity="0.28" />
                    <rect x="0" y="486" width="1000" height="14" fill="#f3ece6" opacity="0.24" />

                    {/* Latitude & Longitude Graticule */}
                    <g stroke="rgba(255, 232, 214, 0.16)" strokeWidth="1">
                      {[60, 30, 0, -30, -60].map((lat) => {
                        const y = ((90 - lat) / 180) * 500;
                        return (
                          <g key={`lat-${lat}`}>
                            <line
                              x1="0"
                              y1={y}
                              x2="1000"
                              y2={y}
                              strokeDasharray={lat === 0 ? undefined : '4 4'}
                              strokeWidth={lat === 0 ? 1.5 : 1}
                            />
                            <text
                              x="10"
                              y={y - 5}
                              fill="rgba(255, 228, 210, 0.55)"
                              fontSize="10"
                              fontFamily="monospace"
                            >
                              {lat === 0 ? mUi.equatorLabel : `${Math.abs(lat)}°${lat > 0 ? (lang === 'en' ? 'N' : 'K') : (lang === 'en' ? 'S' : 'G')}`}
                            </text>
                          </g>
                        );
                      })}

                      {[60, 120, 180, 240, 300].map((lon) => {
                        const x = (lon / 360) * 1000;
                        return (
                          <g key={`lon-${lon}`}>
                            <line
                              x1={x}
                              y1="0"
                              x2={x}
                              y2="500"
                              strokeDasharray="4 4"
                            />
                            <text
                              x={x + 5}
                              y="480"
                              fill="rgba(255, 228, 210, 0.5)"
                              fontSize="10"
                              fontFamily="monospace"
                            >
                              {lon}°{lang === 'en' ? 'E' : 'D'}
                            </text>
                          </g>
                        );
                      })}
                    </g>

                    {/* Global Reference Landmarks */}
                    {globalLandmarks.map((landmark) => {
                      const { x, y } = latLonToGlobalSvg(landmark.lat, landmark.lonEast);
                      return (
                        <g key={landmark.id} transform={`translate(${x}, ${y})`} opacity="0.72">
                          <circle r="3" fill="none" stroke="#ffd8be" strokeWidth="1.2" />
                          <text
                            x="7"
                            y="3"
                            fill="#ffd8be"
                            fontSize="9.5"
                            fontStyle="italic"
                            letterSpacing="0.06em"
                          >
                            {landmark.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Rover Landing Markers */}
                    {visibleProfiles.map((profile) => {
                      const { x, y } = latLonToGlobalSvg(profile.lat, profile.lonEast);
                      const isFocused = selectedProfile.roverId === profile.roverId;

                      return (
                        <g
                          key={profile.roverId}
                          transform={`translate(${x}, ${y})`}
                          className="mars-map-pin"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProfileId(profile.roverId);
                            setSelectedWaypointId(profile.waypoints[0].id);
                          }}
                        >
                          <circle
                            r={isFocused ? 20 : 14}
                            fill={profile.color}
                            opacity={isFocused ? 0.25 : 0.14}
                          />
                          <circle
                            r={isFocused ? 11 : 8}
                            fill="none"
                            stroke={profile.color}
                            strokeWidth="2"
                          />
                          <circle r="5" fill={profile.color} stroke="#070b14" strokeWidth="1.5" />
                          <g transform="translate(12, -10)">
                            <rect
                              x="0"
                              y="-11"
                              width={profile.roverName.length * 6.5 + 16}
                              height="20"
                              rx="5"
                              fill="rgba(6, 10, 22, 0.88)"
                              stroke={profile.color}
                              strokeWidth="1.2"
                            />
                            <text
                              x="8"
                              y="3"
                              fill="#ffffff"
                              fontSize="10.5"
                              fontWeight="700"
                            >
                              {profile.roverName}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  /* ---- REGIONAL TRAVERSE & DISCOVERY MAP SVG ---- */
                  <svg
                    viewBox="0 0 800 460"
                    className="mars-map-svg mars-map-svg--regional"
                    role="img"
                    aria-label={`${selectedProfile.roverName} bölgesel görev rotası ve keşif haritası`}
                  >
                    <defs>
                      <radialGradient id="regionalCraterFloor" cx="50%" cy="50%" r="65%">
                        <stop offset="0%" stopColor="#5f2a18" />
                        <stop offset="55%" stopColor="#3c1b12" />
                        <stop offset="100%" stopColor="#1b0e0d" />
                      </radialGradient>
                    </defs>

                    <rect width="800" height="460" fill="url(#regionalCraterFloor)" />

                    {/* Topographic Contour Lines */}
                    <g fill="none" stroke="rgba(255, 210, 180, 0.12)" strokeWidth="1.2">
                      <ellipse cx="410" cy="235" rx="350" ry="190" />
                      <ellipse cx="420" cy="240" rx="275" ry="145" strokeDasharray="6 4" />
                      <ellipse cx="435" cy="245" rx="195" ry="102" />
                      <ellipse cx="450" cy="255" rx="115" ry="62" strokeDasharray="4 4" />
                    </g>

                    {/* Regional Coordinate Grid */}
                    <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1">
                      {[100, 200, 300, 400, 500, 600, 700].map((gx) => (
                        <line key={`gx-${gx}`} x1={gx} y1="0" x2={gx} y2="460" />
                      ))}
                      {[90, 180, 270, 360].map((gy) => (
                        <line key={`gy-${gy}`} x1="0" y1={gy} x2="800" y2={gy} />
                      ))}
                    </g>

                    {/* Traverse Route Polyline (Shadow + Main Line + Animated Dash) */}
                    {(() => {
                      const points = selectedProfile.waypoints
                        .map((wp) => `${(wp.regionalX / 100) * 800},${(wp.regionalY / 100) * 460}`)
                        .join(' ');
                      return (
                        <g>
                          <polyline
                            points={points}
                            fill="none"
                            stroke="rgba(0,0,0,0.65)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points={points}
                            fill="none"
                            stroke={selectedProfile.color}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points={points}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="1.4"
                            strokeDasharray="6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.85"
                          />
                        </g>
                      );
                    })()}

                    {/* Waypoints & Scientific Discovery Markers */}
                    {selectedProfile.waypoints.map((wp, index) => {
                      const cx = (wp.regionalX / 100) * 800;
                      const cy = (wp.regionalY / 100) * 460;
                      const isActiveWp = selectedWaypoint.id === wp.id;

                      return (
                        <g
                          key={wp.id}
                          transform={`translate(${cx}, ${cy})`}
                          className="mars-map-pin"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWaypointId(wp.id);
                          }}
                        >
                          {isActiveWp && (
                            <circle
                              r="20"
                              fill={selectedProfile.color}
                              opacity="0.28"
                            />
                          )}
                          <circle
                            r={isActiveWp ? 11 : 8}
                            fill={
                              wp.kind === 'landing'
                                ? '#ffffff'
                                : wp.kind === 'discovery'
                                ? selectedProfile.color
                                : '#131d33'
                            }
                            stroke={selectedProfile.color}
                            strokeWidth="2.5"
                          />
                          <text
                            x="0"
                            y="3.5"
                            textAnchor="middle"
                            fill={wp.kind === 'milestone' ? '#ffffff' : '#080c16'}
                            fontSize="9.5"
                            fontWeight="800"
                          >
                            {index + 1}
                          </text>

                          <g transform="translate(14, -12)">
                            <rect
                              x="0"
                              y="-11"
                              width={Math.min(250, wp.name.length * 6.2 + 16)}
                              height="21"
                              rx="5"
                              fill={
                                isActiveWp
                                  ? 'rgba(8, 14, 28, 0.96)'
                                  : 'rgba(6, 10, 20, 0.82)'
                              }
                              stroke={
                                isActiveWp
                                  ? selectedProfile.color
                                  : 'rgba(255, 255, 255, 0.22)'
                              }
                              strokeWidth={isActiveWp ? '1.6' : '1'}
                            />
                            <text
                              x="8"
                              y="3"
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight={isActiveWp ? '700' : '600'}
                            >
                              {wp.name.length > 36
                                ? `${wp.name.slice(0, 34)}…`
                                : wp.name}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                )}
              </div>
            </div>

            {/* Bottom Legend & Quick Mode Action */}
            <div className="mars-map-stage__footer">
              <div className="mars-map-legend">
                <span className="mars-map-legend__item">
                  <span className="mars-map-legend__dot mars-map-legend__dot--landing" />
                  {mUi.legendLanding}
                </span>
                <span className="mars-map-legend__item">
                  <span
                    className="mars-map-legend__dot"
                    style={{ backgroundColor: selectedProfile.color }}
                  />
                  {mUi.legendDiscovery}
                </span>
                <span className="mars-map-legend__item">
                  <span className="mars-map-legend__line" style={{ backgroundColor: selectedProfile.color }} />
                  {mUi.traverseLineLabel} ({selectedProfile.totalTraverseKm} km)
                </span>
              </div>

              {mapMode === 'global' ? (
                <button
                  type="button"
                  className="mars-map-switchAction"
                  onClick={() => handleSwitchToRegional(selectedProfile)}
                >
                  {selectedProfile.roverName} — {mUi.viewModeRegional} →
                </button>
              ) : (
                <button
                  type="button"
                  className="mars-map-switchAction"
                  onClick={() => {
                    setMapMode('global');
                    setActiveRoverId('all');
                    handleResetView();
                  }}
                >
                  ← {mUi.viewModeGlobal}
                </button>
              )}
            </div>
          </div>

          {/* Right Discovery & Telemetry Inspector Card */}
          <aside
            className="mars-map-inspector"
            aria-label={mUi.activeWaypointBadge}
          >
            <div
              className="mars-map-inspector__roverHeader"
              style={{ borderColor: selectedProfile.color }}
            >
              <div className="mars-map-inspector__roverBadgeRow">
                <span
                  className="mars-map-inspector__colorBadge"
                  style={{
                    backgroundColor: selectedProfile.accentBg,
                    color: selectedProfile.color,
                    borderColor: selectedProfile.color,
                  }}
                >
                  {selectedProfile.roverName}
                </span>
                <span className="mars-map-inspector__traverse">
                  {mUi.totalTraversePrefix} {selectedProfile.totalTraverseKm} km
                </span>
              </div>

              <h3 className="mars-map-inspector__craterTitle">
                {selectedProfile.craterName}
              </h3>
              <p className="mars-map-inspector__coords">
                {mUi.coordinatesLabel}: <strong>{selectedProfile.coordinateText}</strong> ·{' '}
                {selectedProfile.elevationText}
              </p>
            </div>

            {/* Waypoint Selector Strip */}
            <div className="mars-map-inspector__waypointList">
              <span className="mars-map-inspector__sectionLabel">
                {mUi.waypointListTitlePrefix} ({selectedProfile.waypoints.length})
              </span>
              <div className="mars-map-inspector__StepPills">
                {selectedProfile.waypoints.map((wp, idx) => {
                  const isCurrent = wp.id === selectedWaypoint.id;
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      className={`mars-waypoint-pill ${
                        isCurrent ? 'mars-waypoint-pill--active' : ''
                      }`}
                      style={{
                        borderColor: isCurrent ? selectedProfile.color : undefined,
                      }}
                      onClick={() => {
                        setSelectedWaypointId(wp.id);
                        if (mapMode === 'global') {
                          setMapMode('regional');
                          handleResetView();
                        }
                      }}
                    >
                      <span className="mars-waypoint-pill__num">{idx + 1}</span>
                      <span className="mars-waypoint-pill__text">{wp.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Waypoint Discovery Card */}
            <div className="mars-discovery-card">
              <div className="mars-discovery-card__meta">
                <span className="mars-discovery-card__kind">
                  {mUi.waypointKinds[selectedWaypoint.kind]}
                </span>
                <span className="mars-discovery-card__sol">
                  {selectedWaypoint.sol}
                </span>
              </div>

              <h4 className="mars-discovery-card__title">
                {selectedWaypoint.name}
              </h4>

              <div className="mars-discovery-card__coordsRow">
                <span>
                  {mUi.coordinatesLabel}:{' '}
                  <strong>
                    {Math.abs(selectedWaypoint.lat).toFixed(4)}°
                    {selectedWaypoint.lat >= 0 ? (lang === 'en' ? 'N' : 'K') : (lang === 'en' ? 'S' : 'G')},{' '}
                    {selectedWaypoint.lonEast.toFixed(4)}°{lang === 'en' ? 'E' : 'D'}
                  </strong>
                </span>
                <span>
                  {mUi.elevationLabel}: <strong>{selectedWaypoint.elevationMeters}</strong>
                </span>
              </div>

              <p className="mars-discovery-card__summary">
                {selectedWaypoint.summary}
              </p>

              <div className="mars-discovery-card__findingBox">
                <span>{mUi.scientificFindingTitle}</span>
                <p>{selectedWaypoint.scientificFinding}</p>
              </div>

              <div className="mars-discovery-card__source">
                <span>{mUi.sourceVerifyPrefix} {selectedWaypoint.sourceLabel}</span>
                <a
                  href={selectedWaypoint.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mars-discovery-card__link"
                >
                  {lang === 'en' ? 'Official NASA/JPL Source ↗' : 'Resmi NASA/JPL Kaynağı ↗'}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
