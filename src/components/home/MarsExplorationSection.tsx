
import { motion } from 'framer-motion';
import { MARS_ROVERS } from '@/data/explorers';
import type { MarsRoverItem } from '@/types';

interface MarsExplorationSectionProps {
  onNavigateToSection?: (sectionId: 'hero' | 'lunar-exploration') => void;
  onSelectRover: (rover: MarsRoverItem) => void;
}

export function MarsExplorationSection({
  onNavigateToSection,
  onSelectRover,
}: MarsExplorationSectionProps) {
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">
            KIZIL GEZEGEN ARŞİVİ · 01
          </span>

          <h2 id="mars-exploration-heading" className="exploration-section__title">
            MARS EXPLORATION
          </h2>

          <p className="exploration-section__subtitle">
            Kızıl Çöllerde İz Bırakan Dört Efsanevi Keşif Aracı
          </p>

          <p className="exploration-section__lead">
            Gusev Krateri’nden Jezero Deltası’na uzanan yirmi yılı aşkın
            yüzey araştırmalarında, Mars’ın antik su geçmişini ve jeolojik
            evrimini gün yüzüne çıkaran robotik kâşifler.
          </p>
        </motion.div>

        <div className="rover-grid">
          {MARS_ROVERS.map((rover, index) => {
            const isActive = rover.statusLabel === 'AKTİF GÖREV';

            return (
              <motion.article
                key={rover.id}
                className="rover-card"
                role="button"
                tabIndex={0}
                aria-label={`${rover.name} detaylarını keşfet`}
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
                    DETAYLARI KEŞFET →
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Complementary & Pioneer Mars Missions Strip (Sojourner, InSight, Ingenuity) */}
        <div className="mars-pioneers-strip" aria-label="Öncü ve tamamlayıcı Mars görevleri">
          <div className="mars-pioneers-strip__header">
            <span className="exploration-section__eyebrow">
              MARS KEŞİF EKOSİSTEMİ · ÖNCÜ &amp; DESTEKLEYİCİ GÖREVLER
            </span>
            <h3 className="mars-pioneers-strip__title">
              Rocker-Bogie’nin Öncüsü Sojourner, Sismik Gözlemci InSight ve Gökyüzü Kâşifi Ingenuity
            </h3>
          </div>

          <div className="mars-pioneers-strip__grid">
            <article className="mars-pioneer-card">
              <div className="mars-pioneer-card__top">
                <span className="mars-pioneer-card__tag">1997 · MARS PATHFINDER</span>
                <span className="mars-pioneer-card__loc">Ares Vallis (19.13°K, 326.78°D)</span>
              </div>
              <h4>Sojourner (İlk Mars Gezicisi)</h4>
              <p>
                4 Temmuz 1997’de Mars Pathfinder hava yastıklarıyla Ares Vallis’e inen 11.5 kg’lık
                Sojourner, 6 tekerlekli Rocker-Bogie süspansiyonunu ve APXS spektrometresini Mars’ta
                ilk kez doğrulayarak Spirit, Opportunity, Curiosity ve Perseverance’ın mühendislik
                temelini attı (83 Sol · ~100 m sürüş).
              </p>
              <div className="mars-pioneer-card__links">
                <a
                  href="https://science.nasa.gov/mission/mars-pathfinder/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA Mars Pathfinder &amp; Sojourner ↗
                </a>
                <a
                  href="https://tr.wikipedia.org/wiki/Sojourner_(ke%C5%9Fif_arac%C4%B1)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vikipedi (TR) ↗
                </a>
              </div>
            </article>

            <article className="mars-pioneer-card">
              <div className="mars-pioneer-card__top">
                <span className="mars-pioneer-card__tag">2018–2022 · JEOFİZİK İNİŞ ARACI</span>
                <span className="mars-pioneer-card__loc">Elysium Planitia (4.50°K, 135.62°D)</span>
              </div>
              <h4>InSight Mars Lander (İç Yapı ve Sismoloji)</h4>
              <p>
                26 Kasım 2018’de Elysium Planitia’ya inen sabit jeofizik laboratuvarı InSight,
                yüzeye yerleştirdiği ultra-hassas SEIS sismometresiyle 1.319 Mars depremi (marsquake)
                ve meteorit çarpması tespit ederek Mars’ın sıvı demir-nikel-kükürt çekirdek yarıçapını
                (~1.830 km) ve kabuk kalınlığını ilk kez ölçtü.
              </p>
              <div className="mars-pioneer-card__links">
                <a
                  href="https://science.nasa.gov/mission/insight/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA Science — InSight ↗
                </a>
                <a
                  href="https://tr.wikipedia.org/wiki/InSight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vikipedi (TR) ↗
                </a>
              </div>
            </article>

            <article className="mars-pioneer-card">
              <div className="mars-pioneer-card__top">
                <span className="mars-pioneer-card__tag">2021–2024 · MARS HELİKOPTERİ</span>
                <span className="mars-pioneer-card__loc">Jezero Krateri · Wright Brothers Field</span>
              </div>
              <h4>Ingenuity (İlk Gezegenlerarası Hava Aracı)</h4>
              <p>
                Perseverance’ın gövde altında Mars’a taşınan 1.8 kg’lık koaksiyel rotorlu Ingenuity,
                19 Nisan 2021’de başka bir gezegende motorlu ve kontrollü uçuş gerçekleştiren ilk hava
                aracı oldu. Planlanan 5 uçuşluk teknoloji gösterimini aşarak 72 başarılı uçuşta
                toplam 17.0 km mesafe kat etti.
              </p>
              <div className="mars-pioneer-card__links">
                <a
                  href="https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA Science — Ingenuity ↗
                </a>
                <a
                  href="https://tr.wikipedia.org/wiki/Ingenuity_(helikopter)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vikipedi (TR) ↗
                </a>
              </div>
            </article>
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
              <span>SONRAKİ BÖLÜM: LUNAR EXPLORATION</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
