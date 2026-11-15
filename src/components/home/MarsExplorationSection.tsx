
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { MarsRoverItem } from '@/types';

interface MarsExplorationSectionProps {
  onNavigateToSection?: (sectionId: 'hero' | 'lunar-exploration') => void;
  onSelectRover: (rover: MarsRoverItem) => void;
}

export function MarsExplorationSection({
  onNavigateToSection,
  onSelectRover,
}: MarsExplorationSectionProps) {
  const { lang, t } = useLanguage();

  return (
    <section
      id="mars-exploration"
      className="exploration-section exploration-section--mars"
      aria-labelledby="mars-exploration-heading"
    >
      <div className="exploration-section__TransitionGlow" aria-hidden="true" />

      <div className="exploration-section__container">
        <motion.div
          className="exploration-section__header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">
            {t.ui.marsExploration.eyebrow}
          </span>

          <h2 id="mars-exploration-heading" className="exploration-section__title">
            {t.ui.marsExploration.title}
          </h2>

          <p className="exploration-section__subtitle">
            {t.ui.marsExploration.subtitle}
          </p>

          <p className="exploration-section__lead">
            {t.ui.marsExploration.description}
          </p>
        </motion.div>

        <div className="rover-grid">
          {t.data.marsRovers.map((rover, index) => {
            const isActive =
              rover.statusLabel === 'AKTİF GÖREV' ||
              rover.statusLabel === 'ACTIVE MISSION';

            return (
              <motion.article
                key={rover.id}
                className="rover-card"
                role="button"
                tabIndex={0}
                aria-label={`${rover.name} — ${t.ui.marsExploration.inspectAriaSuffix}`}
                onClick={() => onSelectRover(rover)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectRover(rover);
                  }
                }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.985 }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="rover-card__media">
                  <img
                    src={rover.image}
                    alt={rover.imageAlt}
                    className="rover-card__image"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="rover-card__mediaOverlay" aria-hidden="true" />

                  <div className="rover-card__badges">
                    <span
                      className={`rover-card__status ${
                        isActive
                          ? 'rover-card__status--active'
                          : 'rover-card__status--completed'
                      }`}
                    >
                      {rover.statusLabel}
                    </span>

                    <span className="rover-card__years">
                      {rover.landingYear}
                    </span>
                  </div>
                </div>

                <div className="rover-card__body">
                  <span className="rover-card__code">{rover.code}</span>
                  <h3 className="rover-card__title">{rover.name}</h3>
                  <p className="rover-card__summary">{rover.summary}</p>
                  <p className="rover-card__credit">{rover.imageCredit}</p>

                  <span className="rover-card__action">
                    {t.ui.marsExploration.cardInspectHint}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Complementary & Pioneer Mars Missions Strip (Sojourner, InSight, Ingenuity) */}
        <div
          className="mars-pioneers-strip"
          aria-label={t.ui.marsExploration.pioneerEyebrow}
        >
          <div className="mars-pioneers-strip__header">
            <span className="exploration-section__eyebrow">
              {t.ui.marsExploration.pioneerEyebrow}
            </span>
            <h3 className="mars-pioneers-strip__title">
              {t.ui.marsExploration.pioneerTitle}
            </h3>
          </div>

          <div className="mars-pioneers-strip__grid">
            {t.ui.marsExploration.pioneerMissions.map((pioneer) => (
              <article key={pioneer.id} className="mars-pioneer-card">
                <div className="mars-pioneer-card__top">
                  <span className="mars-pioneer-card__tag">{pioneer.badge}</span>
                  <span className="mars-pioneer-card__loc">{pioneer.site}</span>
                </div>
                <h4>{pioneer.name}</h4>
                <p>{pioneer.summary}</p>
                <div className="mars-pioneer-card__links">
                  <a
                    href={pioneer.nasaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.ui.marsExploration.pioneerNasaLink} ↗
                  </a>
                  <a
                    href={pioneer.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pioneer.wikiLabel} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {onNavigateToSection && (
          <div className="exploration-section__footerNav">
            <a
              href="#lunar-exploration"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('lunar-exploration');
              }}
            >
              <span>
                {lang === 'en'
                  ? 'NEXT SECTION: LUNAR EXPLORATION'
                  : 'SONRAKİ BÖLÜM: LUNAR EXPLORATION'}
              </span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
