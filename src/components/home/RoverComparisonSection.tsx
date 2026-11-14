import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROVER_COMPARISON_PROFILES } from '@/data/roverComparisonData';
import type { RoverId } from '@/types';

type ChartMetricKey = 'massKg' | 'distanceKm' | 'actualSol' | 'powerCapacityWatts';

const CHART_METRIC_META: Record<
  ChartMetricKey,
  {
    title: string;
    unit: string;
    maxVal: number;
    note: string;
  }
> = {
  massKg: {
    title: 'Yüzey Gezici Kütlesi',
    unit: 'kg',
    maxVal: 1100,
    note: 'Fırlatma ve iniş kalkanı hariç Mars yüzeyinde hareket eden gezici kütlesi.',
  },
  distanceKm: {
    title: 'Kat Edilen Toplam Mesafe',
    unit: 'km',
    maxVal: 50,
    note: 'Spirit ve Opportunity nihai odometri değeridir; Curiosity ve Perseverance aktif görevde ilerlemeye devam etmektedir.',
  },
  actualSol: {
    title: 'Aktif Yüzey Görev Süresi',
    unit: 'Sol (Mars Günü)',
    maxVal: 5500,
    note: '1 Sol = 24 saat 39 dakika 35 saniye. Planlanan sürelerle (90 Sol / 668 Sol) birlikte değerlendirilmelidir.',
  },
  powerCapacityWatts: {
    title: 'Nominal Elektrik Güç Kapasitesi',
    unit: 'Watt',
    maxVal: 160,
    note: 'MER araçları yalnızca öğle güneşinde 140 W tepe güce ulaşır (~300–900 Wh/Sol); MMRTG nükleer araçlar ise gece-gündüz 24 saat ~110 W (~2.700 Wh/Sol) sürekli elektrik üretir.',
  },
};

export function RoverComparisonSection() {
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

  const selectedProfiles = ROVER_COMPARISON_PROFILES.filter((profile) =>
    selectedIds.includes(profile.roverId)
  );

  const chartMeta = CHART_METRIC_META[activeChartMetric];

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
            KARŞILAŞTIRMALI TELEMETRİ ANALİZİ · 05
          </span>
          <h2 id="rover-comparison-heading" className="exploration-section__title">
            ROVER KARŞILAŞTIRMA LABORATUVARI
          </h2>
          <p className="exploration-section__subtitle">
            Kütle, Güç, İşlemci, Mesafe ve Bilimsel Yüklerin Yan Yana Karşılaştırması
          </p>
          <p className="exploration-section__lead">
            Karşılaştırmak istediğiniz Mars keşif araçlarını seçin. Tüm veriler resmi NASA/JPL
            görev belgelerinden alınmış olup ölçüm birimleri ve görev koşulları (güneş enerjisi
            vs. nükleer MMRTG, tamamlanmış vs. devam eden görev) açıkça belirtilmiştir.
          </p>
        </motion.div>

        {/* Rover Selection & Preset Bar */}
        <div className="comparison-selector-bar" role="region" aria-label="Karşılaştırılacak araç seçimi">
          <div className="comparison-selector-bar__rovers">
            <span className="comparison-selector-bar__label">
              KARŞILAŞTIRILAN ARAÇLAR (EN AZ 2 SEÇİN):
            </span>
            <div className="comparison-check-group">
              {ROVER_COMPARISON_PROFILES.map((profile) => {
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
              4 Aracın Tümü
            </button>
            <button
              type="button"
              className="comparison-preset-btn"
              onClick={() => setSelectedIds(['spirit', 'opportunity'])}
            >
              MER İkizleri (2004)
            </button>
            <button
              type="button"
              className="comparison-preset-btn"
              onClick={() => setSelectedIds(['curiosity', 'perseverance'])}
            >
              Nükleer Laboratuvarlar
            </button>
          </div>
        </div>

        {/* Interactive Quantitative Chart Card */}
        <div className="comparison-chart-card">
          <div className="comparison-chart-card__header">
            <div>
              <span className="comparison-chart-card__eyebrow">
                NİCEL PERFORMANS GRAFİĞİ
              </span>
              <h3 className="comparison-chart-card__title">
                {chartMeta.title} ({chartMeta.unit})
              </h3>
            </div>

            <div className="comparison-chart-tabs" role="tablist" aria-label="Grafik ölçütü seçin">
              {(
                [
                  { key: 'distanceKm', label: 'Kat Edilen Mesafe (km)' },
                  { key: 'actualSol', label: 'Görev Süresi (Sol)' },
                  { key: 'massKg', label: 'Yüzey Kütlesi (kg)' },
                  { key: 'powerCapacityWatts', label: 'Güç Kapasitesi (W)' },
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
                      {rawValue.toLocaleString('tr-TR')}
                      {isApproxOngoing ? '+' : ''} {chartMeta.unit}
                      {isApproxOngoing && (
                        <em className="comparison-ongoing-tag">Aktif Görev</em>
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
                      Planlanan Görev Süresi: {profile.plannedSol} Sol → Gerçekleşen:{' '}
                      <strong>
                        {(profile.actualSol / profile.plannedSol).toFixed(1)}× katı
                      </strong>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Comprehensive Comparison Table */}
        <div className="comparison-table-wrap" role="region" aria-label="Yan yana rover karşılaştırma tablosu" tabIndex={0}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" className="comparison-table__criteriaCol">
                  KARŞILAŞTIRMA KRİTERİ & BİRİM
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
                <th scope="row">Kütle (kg)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.massKg.toLocaleString('tr-TR')} kg</strong>
                    <small>{p.massNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Boyutlar (m)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.dimensionsText}</strong>
                    <small>Uzunluk × Genişlik × Yükseklik</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Maksimum Hız (cm/sn)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.maxSpeedCmPerSec.toLocaleString('tr-TR')} cm/sn</strong>
                    <small>{p.avgSpeedNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Enerji Kaynağı</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.energySource}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Güç Kapasitesi (Watt & Wh/Sol)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>~{p.powerCapacityWatts} Watt</strong>
                    <small>{p.powerCapacityNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">İletişim Sistemi (kbps / Mbps)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.communicationSystem}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">İşlemci & Bellek</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.processor}</strong>
                    <small>{p.memorySpec}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Görev Süresi (Planlanan / Gerçekleşen Sol)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>
                      {p.actualSol.toLocaleString('tr-TR')}
                      {p.isOngoing ? '+ Sol (Aktif)' : ' Sol (Kesin)'}
                    </strong>
                    <small>
                      Planlanan: {p.plannedSol} Sol · {p.actualDurationNote}
                    </small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Kat Edilen Mesafe (km)</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>
                      {p.distanceKm.toLocaleString('tr-TR')}
                      {p.isOngoing ? '+ km (Aktif)' : ' km (Kesin)'}
                    </strong>
                    <small>{p.distanceNote}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Bilimsel Cihazlar</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <strong>{p.scientificInstrumentCount} Ana Bilimsel Yük</strong>
                    <small>{p.scientificInstrumentsSummary}</small>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Önemli Bilimsel Keşifler</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>{p.keyDiscoveriesSummary}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Resmi NASA Kaynağı</th>
                {selectedProfiles.map((p) => (
                  <td key={p.roverId}>
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comparison-source-link"
                    >
                      NASA Mission Fact Sheet ↗
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
