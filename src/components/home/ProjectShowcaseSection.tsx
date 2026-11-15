import { useLanguage } from '@/context/LanguageContext';
import type { SectionId } from '@/types';

interface ProjectShowcaseSectionProps {
  onNavigateToSection: (sectionId: SectionId) => void;
}

interface ShowcaseCard {
  id: string;
  tagTr: string;
  tagEn: string;
  titleTr: string;
  titleEn: string;
  bodyTr: string;
  bodyEn: string;
}

interface DemoStep {
  step: string;
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  targetSection: SectionId;
  actionTr: string;
  actionEn: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'purpose',
    tagTr: '01 · AMAÇ',
    tagEn: '01 · PURPOSE',
    titleTr: 'Projenin Amacı',
    titleEn: 'Project Purpose',
    bodyTr:
      'NASA’nın ikonik keşif araçlarını pasif metinler yerine birinci şahıs hikâye anlatımı, 3D donanım incelemesi ve görev simülasyonlarıyla öğreten etkileşimli bir uzay bilimleri platformu sunmak.',
    bodyEn:
      'To deliver an interactive space science platform that teaches NASA’s iconic exploration vehicles through first-person storytelling, 3D hardware inspection, and mission simulations instead of passive text.',
  },
  {
    id: 'audience',
    tagTr: '02 · HEDEF KİTLE',
    tagEn: '02 · TARGET GROUP',
    titleTr: '13–15 Yaş Grubu Odaklı Tasarım',
    titleEn: 'Designed for Ages 13–15',
    bodyTr:
      'Ortaokul son ve lise başlangıç düzeyindeki öğrenciler için bilimsel doğruluğu koruyan, ancak karmaşık mühendislik kavramlarını görsel ve anlaşılır adımlara bölen pedagojik bir dil kullanır.',
    bodyEn:
      'Uses a pedagogical tone for middle-to-high school learners (ages 13–15) that preserves scientific accuracy while breaking complex engineering concepts into clear, visual steps.',
  },
  {
    id: 'need',
    tagTr: '03 · EĞİTSEL İHTİYAÇ',
    tagEn: '03 · EDUCATIONAL NEED',
    titleTr: 'Çözdüğü Eğitsel İhtiyaç',
    titleEn: 'Educational Need Addressed',
    bodyTr:
      'Öğrenciler uzay görevlerini çoğu zaman ezberlenecek tarihler olarak görür. Bu platform, "Neden gönderildi? Hangi problemi çözdü? Nasıl çalıştı?" sorularını deneyimleterek kavramsal öğrenmeyi güçlendirir.',
    bodyEn:
      'Students often view space missions as dates to memorize. This platform strengthens conceptual learning by letting them experience why each mission launched, what problem it solved, and how it operated.',
  },
  {
    id: 'creativity',
    tagTr: '04 · YARATICILIK',
    tagEn: '04 · CREATIVITY',
    titleTr: '5 Aşamalı Bütünleşik Akış',
    titleEn: 'Cohesive 5-Stage Journey',
    bodyTr:
      'Her kâşif tek bir bütünleşik yolculuk sunar: (1) Kâşifin Hikâyesi → (2) 3D Robotu Tanı → (3) Göreve Hazırlık → (4) 3D Macera → (5) Keşif Raporu ve Öğrenme Değerlendirmesi.',
    bodyEn:
      'Each explorer follows one cohesive journey: (1) Explorer’s Story → (2) Meet the 3D Robot → (3) Mission Prep → (4) 3D Adventure → (5) Discovery Report & Learning Assessment.',
  },
  {
    id: 'tech',
    tagTr: '05 · TEKNOLOJİ',
    tagEn: '05 · TECHNOLOGIES',
    titleTr: 'Kullanılan Teknolojiler',
    titleEn: 'Technologies Used',
    bodyTr:
      'React 19, TypeScript, Three.js / React Three Fiber (gerçek zamanlı WebGL 3D sahneler), Framer Motion ve iki dilli (TR | EN) duyarlı arayüz mimarisiyle sıfır harici oyun motoru bağımlılığıyla geliştirilmiştir.',
    bodyEn:
      'Built with React 19, TypeScript, Three.js / React Three Fiber (real-time WebGL 3D scenes), Framer Motion, and a bilingual (TR | EN) responsive UI architecture.',
  },
  {
    id: 'explorers',
    tagTr: '06 · 4 KÂŞİF',
    tagEn: '06 · 4 EXPLORERS',
    titleTr: '4 NASA Kâşifinin Rolü',
    titleEn: 'Role of the 4 NASA Explorers',
    bodyTr:
      'Sojourner (ilk Mars gezgini & APXS), Ingenuity (ince atmosferde aerodinamik uçuş), Opportunity (Mars’ta su kanıtları & uzun ömür mühendisliği) ve Apollo LRV (Ay yüzeyinde insanlı keşif menzili) farklı bilim alanlarını kapsar.',
    bodyEn:
      'Sojourner (first Mars rover & APXS), Ingenuity (aerodynamic flight in thin air), Opportunity (water evidence & endurance engineering), and Apollo LRV (crewed lunar mobility) cover distinct STEM domains.',
  },
  {
    id: 'outcomes',
    tagTr: '07 · ETKİ & ÖLÇME',
    tagEn: '07 · IMPACT & ASSESSMENT',
    titleTr: 'Öğrenme Kazanımları & Ölçme',
    titleEn: 'Learning Outcomes & Assessment',
    bodyTr:
      '3. aşamada ön hazırlık sorusu, 4. aşamada 3D analiz ve karar görevleri, 5. aşamada ise açıklayıcı geri bildirimli kavram kontrolü ve 4 derinleştirici yansıma sorusu ile öğrenme çıktıları ölçülür.',
    bodyEn:
      'Learning is measured via pre-mission checks in Stage 3, 3D analysis decisions in Stage 4, and an explanatory concept check plus 4 guided reflection questions in Stage 5.',
  },
  {
    id: 'sources',
    tagTr: '08 · BİLİMSEL GEÇERLİLİK',
    tagEn: '08 · SCIENTIFIC VALIDITY',
    titleTr: 'Bilimsel Kaynak Yaklaşımı',
    titleEn: 'Scientific Source Methodology',
    bodyTr:
      'Görev tarihleri, cihaz işlevleri ve bilimsel bulgular doğrudan NASA ve NASA JPL kaynaklarına dayanır. 3D sürüş/uçuş sahnelerinin eğitsel amaçla basitleştirilmiş simülasyonlar olduğu açıkça belirtilir.',
    bodyEn:
      'Mission dates, instrument functions, and findings are grounded in official NASA and NASA JPL pages. Simplified 3D driving/flight simulations are clearly distinguished from real mission telemetry.',
  },
  {
    id: 'disclaimer',
    tagTr: '09 · ŞEFFAFLIK',
    tagEn: '09 · TRANSPARENCY',
    titleTr: 'Bağımsız Eğitim Projesi',
    titleEn: 'Independent Educational Project',
    bodyTr:
      'NASA-SPACE-ODYSSEY, öğrencilerin uzay bilimlerine ilgisini artırmak amacıyla geliştirilmiş bağımsız bir eğitim projesidir; NASA tarafından resmî olarak onaylanmış veya NASA ile kurumsal bağlantılı değildir.',
    bodyEn:
      'NASA-SPACE-ODYSSEY is an independent educational project created to inspire student interest in space science; it is not officially affiliated with or endorsed by NASA.',
  },
];

const JURY_DEMO_STEPS: DemoStep[] = [
  {
    step: '01',
    titleTr: '3D Mars Sahnesi & Dil Anahtarı',
    titleEn: '3D Mars Scene & Language Switch',
    descTr: 'Üst çubuktan TR | EN geçişini deneyin ve etkileşimli 3D Mars küresini inceleyin.',
    descEn: 'Test the TR | EN switcher in the top bar and explore the interactive 3D Mars globe.',
    targetSection: 'hero',
    actionTr: 'Hero’ya Git ↑',
    actionEn: 'Go to Hero ↑',
  },
  {
    step: '02',
    titleTr: 'The Stories of Silent Explorers',
    titleEn: 'The Stories of Silent Explorers',
    descTr: '4 kâşifin büyük 3D sergi vitrinini inceleyip bir hikâyeyi seçin.',
    descEn: 'Explore the grand 3D exhibition of the 4 explorers and pick a story.',
    targetSection: 'stories-showcase',
    actionTr: 'Hikâye Vitrinine Git →',
    actionEn: 'Open Stories Showcase →',
  },
  {
    step: '03',
    titleTr: 'Hikâye & 3D Parça İnceleme',
    titleEn: 'Story & 3D Hardware Inspection',
    descTr: '1. aşamada birinci şahıs hikâyeyi okuyup 2. aşamada 3D robot parçalarına tıklayın.',
    descEn: 'Read the first-person story in Stage 1, then click 3D robot components in Stage 2.',
    targetSection: 'explorer-stories',
    actionTr: 'Maceralara Git →',
    actionEn: 'Go to Adventures →',
  },
  {
    step: '04',
    titleTr: 'Göreve Hazırlık & 3D Macera',
    titleEn: 'Mission Prep & 3D Adventure',
    descTr: '3. aşamada hazırlık sorusunu yanıtlayıp 4. aşamada 3D sürüş/uçuş görevini deneyimleyin.',
    descEn: 'Answer the Stage 3 prep question and play the 3D driving/flight mission in Stage 4.',
    targetSection: 'explorer-stories',
    actionTr: '3D Sahneyi Aç →',
    actionEn: 'Open 3D Stage →',
  },
  {
    step: '05',
    titleTr: 'Keşif Raporu & Ölçme',
    titleEn: 'Discovery Report & Assessment',
    descTr: '5. aşamada öğrenme kazanımlarını, kavram testini, 4 yansıma sorusunu ve NASA linklerini görün.',
    descEn: 'Review learning outcomes, the concept check, 4 reflection questions, and NASA links in Stage 5.',
    targetSection: 'explorer-stories',
    actionTr: 'Raporu İncele →',
    actionEn: 'Inspect Report →',
  },
  {
    step: '06',
    titleTr: 'Quiz & Resmî Kaynaklar',
    titleEn: 'Quiz & Official Sources',
    descTr: 'Uzay Aracı Bilgi Yarışması ve sayfa sonundaki Resmî NASA Kaynaklarını doğrulayın.',
    descEn: 'Verify the Spacecraft Quiz and the Official NASA References section at the bottom.',
    targetSection: 'references',
    actionTr: 'Kaynaklara Git ↓',
    actionEn: 'Go to References ↓',
  },
];

export function ProjectShowcaseSection({
  onNavigateToSection,
}: ProjectShowcaseSectionProps) {
  const { lang } = useLanguage();

  return (
    <section
      id="project-showcase"
      className="section-block project-showcase-section"
      aria-labelledby="project-showcase-title"
    >
      <div className="section-heading">
        <span className="section-eyebrow">
          {lang === 'tr'
            ? 'JÜRİ & EĞİTİMCİ SUNUMU'
            : 'JURY & EDUCATOR SHOWCASE'}
        </span>
        <h2 id="project-showcase-title">
          {lang === 'tr'
            ? 'PROJE VİZYONU VE HIZLI DEMO REHBERİ'
            : 'PROJECT VISION & INTERACTIVE DEMO GUIDE'}
        </h2>
        <p className="section-lead">
          {lang === 'tr'
            ? 'THE STORIES OF SILENT EXPLORERS; bilimsel geçerlilik, etkileşimli 3D deneyim ve ölçülebilir öğrenme etkisi ilkeleriyle 13–15 yaş grubu için tasarlanmıştır.'
            : 'THE STORIES OF SILENT EXPLORERS is designed for ages 13–15 around scientific validity, interactive 3D discovery, and measurable learning impact.'}
        </p>
      </div>

      {/* Signature Creative Thesis */}
      <blockquote className="showcase-thesis-quote">
        <span className="showcase-thesis-badge">
          {lang === 'tr' ? 'TEMEL EĞİTİM YAKLAŞIMI' : 'CORE EDUCATIONAL THESIS'}
        </span>
        <p>
          {lang === 'tr'
            ? '“Öğrenciler uzay keşiflerini yalnızca okumaz; gerçek görevlerden ilham alan dijital deneyimlerle keşfeder, gözlemler ve öğrenir.”'
            : '“Students do not merely read about space exploration; they discover, observe, and learn through digital experiences inspired by real missions.”'}
        </p>
      </blockquote>

      {/* 9 Criterion Cards */}
      <div className="showcase-cards-grid">
        {SHOWCASE_CARDS.map((card) => (
          <article key={card.id} className="showcase-card">
            <span className="showcase-card__tag">
              {lang === 'tr' ? card.tagTr : card.tagEn}
            </span>
            <h3>{lang === 'tr' ? card.titleTr : card.titleEn}</h3>
            <p>{lang === 'tr' ? card.bodyTr : card.bodyEn}</p>
          </article>
        ))}
      </div>

      {/* 6-Step Interactive Jury Demo Flow */}
      <div className="showcase-demo-panel">
        <div className="showcase-demo-header">
          <div>
            <span className="section-eyebrow">
              {lang === 'tr' ? '2 DAKİKALIK TUR' : '2-MINUTE TOUR'}
            </span>
            <h3>
              {lang === 'tr'
                ? '6 Adımlık Jüri Demo Akışı'
                : '6-Step Jury Demo Flow'}
            </h3>
          </div>
          <p>
            {lang === 'tr'
              ? 'Aşağıdaki adımlara tıklayarak platformun tüm temel bölümlerine doğrudan atlayabilirsiniz.'
              : 'Click any step below to jump directly to the core interactive sections of the platform.'}
          </p>
        </div>

        <div className="showcase-demo-grid">
          {JURY_DEMO_STEPS.map((item) => (
            <div key={item.step} className="showcase-demo-step">
              <div className="showcase-demo-step__top">
                <span className="showcase-demo-num">{item.step}</span>
                <h4>{lang === 'tr' ? item.titleTr : item.titleEn}</h4>
              </div>
              <p>{lang === 'tr' ? item.descTr : item.descEn}</p>
              <button
                type="button"
                className="showcase-demo-btn"
                onClick={() => onNavigateToSection(item.targetSection)}
              >
                {lang === 'tr' ? item.actionTr : item.actionEn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
