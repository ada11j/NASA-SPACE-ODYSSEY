import { useLanguage } from '@/context/LanguageContext';

const SUMMARY_PILLS = {
  tr: [
    '4 Efsanevi Keşif Aracı',
    '5 Aşamalı Öğrenme Deneyimi',
    'Etkileşimli 3D Maceralar',
    'TR | EN Dil Desteği',
  ],
  en: [
    '4 Legendary Explorers',
    '5-Stage Learning Experience',
    'Interactive 3D Adventures',
    'TR | EN Bilingual Support',
  ],
};

export function ProjectSummaryStrip() {
  const { lang } = useLanguage();
  const pills = lang === 'tr' ? SUMMARY_PILLS.tr : SUMMARY_PILLS.en;

  return (
    <section
      id="project-summary"
      className="project-summary-strip"
      aria-labelledby="project-summary-heading"
    >
      <div className="project-summary-strip__card">
        <span id="project-summary-heading" className="project-summary-strip__label">
          {lang === 'tr' ? 'PROJECT SUMMARY — PROJE ÖZETİ' : 'PROJECT SUMMARY'}
        </span>

        <p className="project-summary-strip__lead">
          <em>
            {lang === 'tr'
              ? 'Sessiz Kâşifler, Mars ve Ay’ın keşif tarihinde iz bırakan dört robotik ve insanlı keşif aracının hikâyelerini etkileşimli bir uzay deneyimine dönüştüren eğitim projesidir.'
              : 'Silent Explorers is an educational project that transforms the stories of four robotic and crewed explorers from the history of Mars and Moon exploration into an interactive space experience.'}
          </em>
        </p>

        <p className="project-summary-strip__body">
          {lang === 'tr'
            ? 'Ziyaretçiler Sojourner, Ingenuity, Opportunity ve Apollo LRV’nin görevlerini tanır; gerçek uzay araştırmalarından ilham alan 3D modelleri inceler, interaktif maceralara katılır ve bilimsel keşifler yapar.'
            : 'Visitors explore the missions of Sojourner, Ingenuity, Opportunity, and Apollo LRV; inspect 3D models inspired by real space missions, join interactive adventures, and make scientific discoveries.'}
        </p>

        <ul className="project-summary-strip__pills">
          {pills.map((item) => (
            <li key={item} className="project-summary-strip__pill">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
