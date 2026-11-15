import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { RoverId } from '@/types';

type ChartMetricKey = 'massKg' | 'distanceKm' | 'actualSol' | 'powerCapacityWatts';

export function RoverComparisonSection() {
  const { lang, t } = useLanguage();
  const cUi = t.ui.roverComparison;
  const comparisonProfiles = t.data.roverComparisonProfiles;
  const numLocale = lang === 'en' ? 'en-US' : 'tr-TR';

  const chartMetricMeta: Record<
    ChartMetricKey,
    {
      title: string;
      unit: string;
      maxVal: number;
      note: string;
    }
  > = {
    massKg: {
      title: cUi.metrics.mass.title,
      unit: cUi.metrics.mass.unit,
      maxVal: 1100,
      note: cUi.metrics.mass.subtitle,
    },
    distanceKm: {
      title: cUi.metrics.distance.title,
      unit: cUi.metrics.distance.unit,
      maxVal: 50,
      note: cUi.metrics.distance.subtitle,
    },
    actualSol: {
      title: cUi.metrics.sol.title,
      unit: cUi.metrics.sol.unit,
      maxVal: 5500,
      note: cUi.metrics.sol.subtitle,
    },
    powerCapacityWatts: {
      title: cUi.metrics.power.title,
      unit: cUi.metrics.power.unit,
      maxVal: 160,
      note: cUi.metrics.power.subtitle,
    },
  };

  const [selectedIds, setSelectedIds] = useState<RoverId[]>([
    'spirit',
    'opportunity',
    'curiosity',
    'perseverance',
  ]);
  const [activeChartMetric, setActiveChartMetric] =
    useState<ChartMetricKey>('distanceKm');

  const toggleRoverSelection = (id: RoverId) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least 2 rovers selected for meaningful comparison
        if (prev.length <= 2) return prev;
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectedProfiles = comparisonProfiles.filter((profile) =>
    selectedIds.includes(profile.roverId)
  );

  const chartMeta = chartMetricMeta[activeChartMetric];

  return (
    <section
      id="rover-comparison"
      className="exploration-section exploration-section--comparison"
      aria-labelledby="rover-comparison-heading"
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
            {cUi.eyebrow}
          </span>
          <h2 id="rover-comparison-heading" className="exploration-section__title">
            {cUi.title}
          </h2>
          <p className="exploration-section__subtitle">
            {cUi.subtitle}
          </p>
          <p className="exploration-section__lead">
            {cUi.description}
          </p>
        </motion.div>

        {/* Rover Selection & Preset Bar */}
        <div className="comparison-selector-bar" role="region" aria-label={cUi.title}>
          <div className="comparison-selector-bar__rovers">
            <span className="comparison-selector-bar__label">
              {lang === 'en' ? 'ROVERS TO COMPARE (SELECT AT LEAST 2):' : 'KARŞILAŞTIRILAN ARAÇLAR (EN AZ 2 SEÇİN):'}
            </span>
            <div className="comparison-check-group">
              {comparisonProfiles.map((profile) => {
                const isChecked = selectedIds.includes(profile.roverId);
                return (
                  <button
                    key={profile.roverId}
                    type="button"
                    aria-pressed={isChecked}
                    className={`comparison-rover-toggle ${
                      isChecked ? 'comparison-rover-toggle--active' : ''
                    }`}
                    style={{
                      borderColor: isChecked ? profile.color : undefined,
                    }}
                    onClick={() => toggleRoverSelection(profile.roverId)}
                  >
                    <span
                      className="comparison-rover-toggle__check"
                      style={{
                        backgroundColor: isChecked ? profile.color : 'transparent',
                        borderColor: profile.color,
                      }}
                    >
                      {isChecked ? '✓' : ''}
                    </span>
                    <span>{profile.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="comparison-presets">
            <button
              type="button"
              className="comparison-preset-btn"
              onClick={() =>
                setSelectedIds(['spirit', 'opportunity', 'curiosity', 'perseverance'])
              }
            >
              {lang === 'en' ? 'All 4 Rovers' : '4 Aracın Tümü'}
            </button>
            <button
              type="button"
              className="comparison-preset-btn"
              onClick={() => setSelectedIds(['spirit', 'opportunity'])}
            >
              {lang === 'en' ? 'MER Twins (2004)' : 'MER İkizleri (2004)'}
            </button>
            <button
              type="button"
              className="comparison-preset-btn"
              onClick={() => setSelectedIds(['curiosity', 'perseverance'])}
            >
              {lang === 'en' ? 'Nuclear Labs' : 'Nükleer Laboratuvarlar'}
            </button>
          </div>
        </div>

        {/* Interactive Quantitative Chart Card */}
        <div className="comparison-chart-card">
          <div className="comparison-chart-card__header">
            <div>
              <span className="comparison-chart-card__eyebrow">
                {lang === 'en' ? 'QUANTITATIVE PERFORMANCE CHART' : 'NİCEL PERFORMANS GRAFİĞİ'}
              </span>
              <h3 className="comparison-chart-card__title">
                {chartMeta.title} ({chartMeta.unit})
              </h3>
            </div>

            <div className="comparison-chart-tabs" role="tablist" aria-label={cUi.metricTabsAria}>
              {(
                [
                  { key: 'distanceKm', label: `${cUi.metrics.distance.label} (${cUi.metrics.distance.unit})` },
                  { key: 'actualSol', label: `${cUi.metrics.sol.label} (Sol)` },
                  { key: 'massKg', label: `${cUi.metrics.mass.label} (${cUi.metrics.mass.unit})` },
                  { key: 'powerCapacityWatts', label: `${cUi.metrics.power.label} (${cUi.metrics.power.unit})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activeChartMetric === tab.key}
                  className={`comparison-chart-tab ${
                    activeChartMetric === tab.key ? 'comparison-chart-tab--active' : ''
                  }`}
                  onClick={() => setActiveChartMetric(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <p className="comparison-chart-card__note">{chartMeta.note}</p>

          <div className="comparison-bars">
            {selectedProfiles.map((profile) => {
              const rawValue = profile[activeChartMetric];
              const pct = Math.min(100, Math.max(6, (rawValue / chartMeta.maxVal) * 100));
              const isApproxOngoing =
                profile.isOngoing &&
                (activeChartMetric === 'distanceKm' || activeChartMetric === 'actualSol');

              return (
                <div key={profile.roverId} className="comparison-bar-row">
                  <div className="comparison-bar-row__meta">
                    <span className="comparison-bar-row__name">
                      <span
                        className="comparison-bar-row__dot"
                        style={{ backgroundColor: profile.color }}
                      />
                      <strong>{profile.name}</strong>
                      <small>{profile.generationLabel}</small>
                    </span>
                    <span className="comparison-bar-row__val">
                      {rawValue.toLocaleString(numLocale)}
                      {isApproxOngoing ? '+' : ''} {chartMeta.unit}
                      {isApproxOngoing && (
                        <em className="comparison-ongoing-tag">{cUi.ongoingBadge}</em>
                      )}
                    </span>
                  </div>

                  <div className="comparison-bar-track">
                    <motion.div
                      className="comparison-bar-fill"
                      style={{ backgroundColor: profile.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                    />
                  </div>

                  {activeChartMetric === 'actualSol' && (
                    <span className="comparison-bar-row__sub">
                      {cUi.plannedPrefix} {profile.plannedSol} Sol → {cUi.actualShort}:{' '}
                      <strong>
                        {(profile.actualSol / profile.plannedSol).toFixed(1)}×
                      </strong>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Comprehensive Comparison Table */}
        <div className="comparison-table-wrap" role="region" aria-label={cUi.tableTitle} tabIndex={0}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" className="comparison-table__criteriaCol">
                  {cUi.tableTitle}
                </th>
                {selectedProfiles.map((profile) => (
                  <th
                    key={profile.roverId}
                    scope="col"
                    style={{ borderTop: `3px solid ${profile.color}` }}
                  >
                    <div className="comparison-table__roverHead">
                      <span className="comparison-table__gen">
                        {profile.generationLabel}
                      </span>
                      <strong>{profile.name}</strong>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{cUi.rows.mass}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.massKg.toLocaleString(numLocale)} kg</strong>
                    <small>{p.massNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.dimensions}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.dimensionsText}</strong>
                    <small>{lang === 'en' ? 'Length × Width × Height' : 'Uzunluk × Genişlik × Yükseklik'}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.maxSpeed}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.maxSpeedCmPerSec.toLocaleString(numLocale)} cm/s</strong>
                    <small>{p.avgSpeedNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.energy}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.energySource}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.powerWatts}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>~{p.powerCapacityWatts} Watt</strong>
                    <small>{p.powerCapacityNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.comms}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.communicationSystem}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.processor}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.processor}</strong>
                    <small>{p.memorySpec}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.duration}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>
                      {p.actualSol.toLocaleString(numLocale)}
                      {p.isOngoing ? `+ Sol (${cUi.ongoingBadge})` : ` Sol (${cUi.completedBadge})`}
                    </strong>
                    <small>
                      {cUi.plannedShort}: {p.plannedSol} Sol · {p.actualDurationNote}
                    </small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.distance}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>
                      {p.distanceKm.toLocaleString(numLocale)}
                      {p.isOngoing ? `+ km (${cUi.ongoingBadge})` : ` km (${cUi.completedBadge})`}
                    </strong>
                    <small>{p.distanceNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.instruments}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>
                      {p.scientificInstrumentCount}{' '}
                      {lang === 'en' ? 'Primary Instruments' : 'Ana Bilimsel Yük'}
                    </strong>
                    <small>{p.scientificInstrumentsSummary}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.discoveries}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.keyDiscoveriesSummary}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{cUi.rows.officialSource}</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comparison-source-link"
                    >
                      {cUi.officialNasaPageLink}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
