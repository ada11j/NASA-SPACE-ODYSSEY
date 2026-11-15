import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ExplorerVehicleShowcaseMesh } from '@/scenes/adventures/ExplorerVehicleModels';
import type { ExplorerStoryId, ExplorerStoryItem, SectionId } from '@/types';

interface MissionOverviewSectionProps {
  onNavigateToSection: (sectionId: SectionId) => void;
  onExploreStory: (storyId: ExplorerStoryId) => void;
}

interface ExplorerSummaryMeta {
  id: ExplorerStoryId;
  name: string;
  taglineTr: string;
  taglineEn: string;
  descTr: string;
  descEn: string;
  atmosphere: 'mars' | 'lunar';
}

const EXPLORER_SUMMARIES: ExplorerSummaryMeta[] = [
  {
    id: 'sojourner',
    name: 'SOJOURNER',
    taglineTr: 'Mars’ın İlk Kâşiflerinden Biri',
    taglineEn: 'One of Mars’s First Explorers',
    descTr:
      'Mars Pathfinder görevinin küçük ama öncü robotu. Mars yüzeyinde kaya ve toprak incelemeleri yaptı.',
    descEn:
      'The small yet pioneering rover of Mars Pathfinder that analyzed Martian rocks and soil.',
    atmosphere: 'mars',
  },
  {
    id: 'ingenuity',
    name: 'INGENUITY',
    taglineTr: 'Mars’ta Uçuşun Öncüsü',
    taglineEn: 'Pioneer of Flight on Mars',
    descTr:
      'Başka bir gezegende motorlu ve kontrollü uçuş gerçekleştiren ilk araç. Mars atmosferinde uçuş teknolojisini test etti.',
    descEn:
      'The first aircraft to achieve powered, controlled flight on another planet, testing aerial mobility in thin Martian air.',
    atmosphere: 'mars',
  },
  {
    id: 'opportunity',
    name: 'OPPORTUNITY',
    taglineTr: 'Kızıl Gezegenin Uzun Ömürlü Jeoloğu',
    taglineEn: 'The Red Planet’s Endurance Geologist',
    descTr:
      'Mars’ın geçmişteki su ortamlarına ilişkin önemli jeolojik kanıtlar topladı.',
    descEn:
      'Gathered decisive geological evidence of Mars’s ancient watery environments across 45.16 km.',
    atmosphere: 'mars',
  },
  {
    id: 'apollo-lrv',
    name: 'APOLLO LRV',
    taglineTr: 'Ay’ın İnsanlı Keşif Aracı',
    taglineEn: 'The Crewed Lunar Explorer',
    descTr:
      'Apollo astronotlarının Ay yüzeyinde daha geniş alanları keşfetmesini sağlayan elektrikli araç.',
    descEn:
      'The electric rover that enabled Apollo astronauts to explore far wider regions of the lunar surface.',
    atmosphere: 'lunar',
  },
];

const PURPOSE_POINTS = {
  tr: [
    'Uzay bilimlerini 13–15 yaş grubu genç öğrencilere sevdirmek.',
    'Gerçek NASA görevlerini birinci şahıs dijital hikâyelerle tanıtmak.',
    'Bilimsel bilgileri etkileşimli 3D deneyimlerle öğretmek.',
    'Öğrencilerin gözlem, araştırma, problem çözme ve bilimsel düşünme becerilerini geliştirmek.',
    'Okuma, keşif, uygulama ve değerlendirmeyi tek bir öğrenme deneyiminde birleştirmek.',
  ],
  en: [
    'Inspire a passion for space science among students aged 13–15.',
    'Introduce real NASA missions through first-person digital storytelling.',
    'Teach scientific concepts through interactive 3D experiences.',
    'Develop observation, inquiry, problem-solving, and scientific reasoning skills.',
    'Unite reading, exploration, hands-on practice, and assessment in one learning journey.',
  ],
};

const LEARNING_STAGES = [
  {
    num: '01',
    titleTr: 'KÂŞİFİN HİKÂYESİ',
    titleEn: 'EXPLORER’S STORY',
    descTr: 'Görevin tarihini ve insan hikâyesini öğren.',
    descEn: 'Learn the mission’s history and human story.',
  },
  {
    num: '02',
    titleTr: 'ROBOTU TANI',
    titleEn: 'MEET THE ROBOT',
    descTr: 'Aracın parçalarını ve teknolojisini keşfet.',
    descEn: 'Inspect the vehicle’s parts and engineering.',
  },
  {
    num: '03',
    titleTr: 'GÖREVE HAZIRLAN',
    titleEn: 'MISSION PREP',
    descTr: 'Bilimsel hedefleri ve görev mantığını öğren.',
    descEn: 'Understand scientific goals and mission logic.',
  },
  {
    num: '04',
    titleTr: '3D MACERA',
    titleEn: '3D ADVENTURE',
    descTr: 'Keşif görevini etkileşimli ortamda deneyimle.',
    descEn: 'Experience the exploration mission in 3D.',
  },
  {
    num: '05',
    titleTr: 'KEŞİF RAPORU',
    titleEn: 'DISCOVERY REPORT',
    descTr: 'Öğrendiklerini değerlendir ve bilimsel katkıları keşfet.',
    descEn: 'Assess your learning and explore scientific impact.',
  },
];

const LEARNING_OUTCOMES = {
  tr: [
    'Uzay ve gezegen bilimleri bilgisi',
    'Robotik sistemleri tanıma',
    'Bilimsel gözlem ve analiz',
    'Problem çözme',
    'Kanıta dayalı düşünme',
    'Bilimsel teknolojileri anlama',
  ],
  en: [
    'Space and planetary science literacy',
    'Understanding robotic systems',
    'Scientific observation and analysis',
    'Problem solving',
    'Evidence-based reasoning',
    'Understanding scientific technologies',
  ],
};

const TECH_STACK = [
  {
    name: 'React & TypeScript',
    roleTr: 'Modüler bileşen mimarisi, tip güvenliği ve 5 aşamalı öğrenme akışının kesintisiz durum yönetimi.',
    roleEn: 'Modular component architecture, type safety, and seamless state management across the 5-stage flow.',
  },
  {
    name: 'Three.js & React Three Fiber',
    roleTr: 'Gerçek zamanlı WebGL 3D Mars ve Ay gezegenleri, etkileşimli araç inceleme ve görev sahneleri.',
    roleEn: 'Real-time WebGL 3D Mars and Moon globes, interactive vehicle inspection, and mission scenes.',
  },
  {
    name: 'Framer Motion',
    roleTr: 'Akıcı sahne geçişleri, arayüz mikro animasyonları ve erişilebilir hareket azaltma (reduced-motion) desteği.',
    roleEn: 'Smooth scene transitions, UI micro-animations, and accessible reduced-motion support.',
  },
  {
    name: 'Etkileşimli 3D Modelleme & Simülasyon',
    roleTr: '4 ortak 3D kâşif modeli ile APXS kaya tarama, ince atmosferde uçuş ve Ay yüzeyi sürüş görevleri.',
    roleEn: '4 shared 3D explorer models powering APXS rock scans, thin-air flight, and lunar driving missions.',
  },
  {
    name: 'Responsive Web Tasarımı',
    roleTr: 'Masaüstünden (1280×800) mobil ekranlara (390×844) kadar taşmasız düzen ve dokunmatik 3D kontrol pedi.',
    roleEn: 'Overflow-free layouts from desktop (1280×800) to mobile (390×844) with touch-friendly 3D controls.',
  },
  {
    name: 'Türkçe & İngilizce (TR | EN)',
    roleTr: 'Tüm hikâyeler, 3D etiketler, kavram testleri ve kaynaklar için sayfa yenilenmeden anında dil değişimi.',
    roleEn: 'Instant bilingual switching across stories, 3D labels, concept checks, and sources without reload.',
  },
];

const DIFFERENTIATORS = {
  tr: [
    'Dijital hikâye anlatıcılığı ile duygusal ve bilimsel bağ kurma',
    'Döndürülebilen ve parçaları tıklanarak incelenebilen 3D keşif araçları',
    'Görev tabanlı etkileşimli 3D maceralar ve serbest keşif modu',
    'Bilimsel analiz, telemetri yorumlama ve karar verme görevleri',
    'Macera sonu kavram kontrolü ve 4 derinleştirici yansıma sorusu',
    'Okuma, inceleme ve uygulamayı birleştiren bütünleşik 5 aşamalı deneyim',
  ],
  en: [
    'Digital storytelling that builds emotional and scientific connection',
    'Rotatable 3D explorers with clickable hardware inspection',
    'Mission-based interactive 3D adventures and free-exploration mode',
    'Scientific analysis, telemetry reading, and decision-making tasks',
    'Post-adventure concept check and 4 guided reflection questions',
    'Cohesive 5-stage learning journey uniting reading, inspection, and practice',
  ],
};

const JURY_DEMO_STEPS: {
  step: string;
  titleTr: string;
  titleEn: string;
  descTr: string;
  descEn: string;
  targetSection: SectionId;
  actionTr: string;
  actionEn: string;
}[] = [
  {
    step: '01',
    titleTr: '3D Mars & Dil Anahtarı',
    titleEn: '3D Mars & Language Switch',
    descTr: 'Üst çubuktan TR | EN geçişini deneyin ve 3D Mars küresini inceleyin.',
    descEn: 'Test the TR | EN switcher in the top bar and explore the 3D Mars globe.',
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
    descTr: '1. aşamada hikâyeyi okuyup 2. aşamada 3D robot parçalarına tıklayın.',
    descEn: 'Read the story in Stage 1, then click 3D robot components in Stage 2.',
    targetSection: 'explorer-stories',
    actionTr: 'Maceralara Git →',
    actionEn: 'Go to Adventures →',
  },
  {
    step: '04',
    titleTr: 'Göreve Hazırlık & 3D Macera',
    titleEn: 'Mission Prep & 3D Adventure',
    descTr: '3. aşamada hazırlık sorusunu yanıtlayıp 4. aşamada 3D görevi deneyimleyin.',
    descEn: 'Answer the Stage 3 prep question and play the 3D mission in Stage 4.',
    targetSection: 'explorer-stories',
    actionTr: '3D Sahneyi Aç →',
    actionEn: 'Open 3D Stage →',
  },
  {
    step: '05',
    titleTr: 'Keşif Raporu & Ölçme',
    titleEn: 'Discovery Report & Assessment',
    descTr: '5. aşamada öğrenme kazanımlarını, kavram testini ve yansıma sorularını görün.',
    descEn: 'Review learning outcomes, concept check, and reflection questions in Stage 5.',
    targetSection: 'explorer-stories',
    actionTr: 'Raporu İncele →',
    actionEn: 'Inspect Report →',
  },
  {
    step: '06',
    titleTr: 'Resmî NASA Kaynakları',
    titleEn: 'Official NASA Sources',
    descTr: 'Sayfa sonundaki resmî NASA / JPL kaynak bağlantılarıyla verileri doğrulayın.',
    descEn: 'Verify mission data against the official NASA / JPL source links at the bottom.',
    targetSection: 'references',
    actionTr: 'Kaynaklara Git ↓',
    actionEn: 'Go to References ↓',
  },
];

function OverviewMini3DCard({
  story,
  meta,
  shouldReduceMotion,
  lang,
  onExploreStory,
}: {
  story: ExplorerStoryItem;
  meta: ExplorerSummaryMeta;
  shouldReduceMotion: boolean;
  lang: 'tr' | 'en';
  onExploreStory: (storyId: ExplorerStoryId) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { rootMargin: '220px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`overview-explorer-card overview-explorer-card--${meta.atmosphere}`}
    >
      <div className="overview-explorer-card__visual">
        <img
          src={story.image}
          alt={story.imageAlt}
          loading="lazy"
          className="overview-explorer-card__photo"
        />
        <div className="overview-explorer-card__vignette" aria-hidden="true" />
        <div className="overview-explorer-card__canvas">
          {isNear ? (
            <Canvas
              dpr={[1, 1.4]}
              camera={{ position: [2.6, 1.55, 2.95], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight
                intensity={meta.atmosphere === 'lunar' ? 0.72 : 0.78}
                color={meta.atmosphere === 'lunar' ? '#e2e8f0' : '#ffedd5'}
              />
              <directionalLight
                position={[4, 5, 3]}
                intensity={1.75}
                color={meta.atmosphere === 'lunar' ? '#f8fafc' : '#fff3e0'}
              />
              <ExplorerVehicleShowcaseMesh storyId={story.id} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={!shouldReduceMotion}
                autoRotateSpeed={1.1}
              />
            </Canvas>
          ) : (
            <div className="overview-explorer-card__fallback" aria-hidden="true">
              {story.badgeIcon}
            </div>
          )}
        </div>
        <span className="overview-explorer-card__badge">
          {story.badgeIcon} {meta.name}
        </span>
      </div>

      <div className="overview-explorer-card__body">
        <h4>{lang === 'tr' ? meta.taglineTr : meta.taglineEn}</h4>
        <p>{lang === 'tr' ? meta.descTr : meta.descEn}</p>
        <button
          type="button"
          className="overview-explorer-card__btn"
          onClick={() => onExploreStory(story.id)}
        >
          {lang === 'tr' ? 'Hikâyeye & 3D Maceraya Git →' : 'Go to Story & 3D Adventure →'}
        </button>
      </div>
    </article>
  );
}

export function MissionOverviewSection({
  onNavigateToSection,
  onExploreStory,
}: MissionOverviewSectionProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const stories = t.data.explorerStories;

  return (
    <section
      id="mission-overview"
      className="section-block mission-overview-section"
      aria-labelledby="mission-overview-title"
    >
      <div className="mission-overview-container">
        {/* 1. Header & Introduction */}
        <div className="mission-overview-header">
          <div className="mission-overview-header__glowMars" aria-hidden="true" />
          <div className="mission-overview-header__glowMoon" aria-hidden="true" />

          <span className="section-eyebrow">
            {lang === 'tr'
              ? 'KAPSAMLI DİJİTAL PROJE ÖZETİ · 13–15 YAŞ GRUBU'
              : 'COMPREHENSIVE PROJECT SUMMARY · AGES 13–15'}
          </span>

          <h2 id="mission-overview-title" className="mission-overview-title">
            {lang === 'tr'
              ? 'MISSION OVERVIEW — PROJEYE GENEL BAKIŞ'
              : 'MISSION OVERVIEW'}
          </h2>

          <p className="mission-overview-subtitle">
            {lang === 'tr'
              ? '“İnsanlığın uzaydaki sessiz kâşiflerinin hikâyelerini keşfet, bilimsel görevlerini öğren ve keşif deneyiminin bir parçası ol.”'
              : '“Discover the stories of humanity’s silent explorers in space, learn their scientific missions, and become part of the exploration.”'}
          </p>

          <p className="mission-overview-audienceNote">
            {lang === 'tr'
              ? '13–15 yaş grubundaki öğrenciler, öğretmenler ve jüri üyeleri için tasarlanan bu platform; gerçek NASA görevlerini birinci şahıs hikâye anlatımı, 3D araç incelemesi ve ölçülebilir bilimsel görevlerle birleştirir.'
              : 'Designed for students aged 13–15, educators, and jury members, this platform unites real NASA missions with first-person storytelling, 3D hardware inspection, and measurable scientific tasks.'}
          </p>
        </div>

        {/* 2. Purpose & 8. Why It's Different */}
        <div className="overview-dual-grid">
          <article className="overview-panel">
            <span className="overview-panel__tag">
              {lang === 'tr' ? '01 · PROJENİN AMACI' : '01 · PROJECT PURPOSE'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Uzay Bilimlerini Deneyimleyerek Öğrenme'
                : 'Learning Space Science Through Experience'}
            </h3>
            <ul className="overview-check-list">
              {(lang === 'tr' ? PURPOSE_POINTS.tr : PURPOSE_POINTS.en).map((item) => (
                <li key={item}>✦ {item}</li>
              ))}
            </ul>
          </article>

          <article className="overview-panel">
            <span className="overview-panel__tag">
              {lang === 'tr' ? '02 · NEDEN FARKLI?' : '02 · WHY IS IT DIFFERENT?'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Sıradan Bir Bilgi Sitesinin Ötesinde'
                : 'Beyond a Static Information Site'}
            </h3>
            <ul className="overview-check-list">
              {(lang === 'tr' ? DIFFERENTIATORS.tr : DIFFERENTIATORS.en).map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </article>
        </div>

        {/* 3. Four Great Explorers (Real NASA Photo + Shared 3D Model) */}
        <div className="overview-block">
          <div className="overview-block__head">
            <span className="overview-panel__tag">
              {lang === 'tr' ? '03 · DÖRT BÜYÜK KEŞİF' : '03 · FOUR GREAT EXPLORERS'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Mars ve Ay’daki 4 Sessiz Kâşif'
                : '4 Silent Explorers on Mars & the Moon'}
            </h3>
          </div>

          <div className="overview-explorers-grid">
            {EXPLORER_SUMMARIES.map((meta) => {
              const story = stories.find((s) => s.id === meta.id) ?? stories[0];
              return (
                <OverviewMini3DCard
                  key={meta.id}
                  story={story}
                  meta={meta}
                  shouldReduceMotion={shouldReduceMotion}
                  lang={lang}
                  onExploreStory={onExploreStory}
                />
              );
            })}
          </div>
        </div>

        {/* 4. Five-Stage Connected Learning Journey */}
        <div className="overview-block overview-journey-panel">
          <div className="overview-block__head">
            <span className="overview-panel__tag">
              {lang === 'tr'
                ? '04 · BEŞ AŞAMALI ÖĞRENME YOLCULUĞU'
                : '04 · FIVE-STAGE LEARNING JOURNEY'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Story-First Bütünleşik Eğitim Akışı'
                : 'Cohesive Story-First Educational Flow'}
            </h3>
          </div>

          <div className="overview-journey-track">
            {LEARNING_STAGES.map((stage) => (
              <div key={stage.num} className="overview-journey-step">
                <span className="overview-journey-num">{stage.num}</span>
                <h4>{lang === 'tr' ? stage.titleTr : stage.titleEn}</h4>
                <p>{lang === 'tr' ? stage.descTr : stage.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Educational Outcomes & 6. Technology Stack */}
        <div className="overview-dual-grid">
          <article className="overview-panel">
            <span className="overview-panel__tag">
              {lang === 'tr' ? '05 · EĞİTSEL KAZANIMLAR' : '05 · LEARNING OUTCOMES'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Öğrencilerin Geliştirdiği Beceriler'
                : 'Skills Students Develop'}
            </h3>
            <div className="overview-skills-grid">
              {(lang === 'tr' ? LEARNING_OUTCOMES.tr : LEARNING_OUTCOMES.en).map(
                (skill) => (
                  <span key={skill} className="overview-skill-pill">
                    {skill}
                  </span>
                )
              )}
            </div>
            <p className="overview-panel__footnote">
              {lang === 'tr'
                ? 'Tüm öğrenme kazanımları 3. aşamadaki ön hazırlık, 4. aşamadaki 3D görev kararları ve 5. aşamadaki macera sonu kavram kontrolü + 4 yansıma sorusu ile desteklenir ve ölçülür.'
                : 'All learning outcomes are reinforced and assessed via Stage 3 prep checks, Stage 4 3D mission decisions, and Stage 5 post-adventure concept checks + 4 reflection questions.'}
            </p>
          </article>

          <article className="overview-panel">
            <span className="overview-panel__tag">
              {lang === 'tr' ? '06 · PROJENİN TEKNOLOJİSİ' : '06 · PROJECT TECHNOLOGY'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Modern Web & 3D Simülasyon Mimarisi'
                : 'Modern Web & 3D Simulation Architecture'}
            </h3>
            <div className="overview-tech-list">
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="overview-tech-item">
                  <strong>{tech.name}</strong>
                  <span>{lang === 'tr' ? tech.roleTr : tech.roleEn}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* 7. Scientific Credibility & Independent Project Notice */}
        <div className="overview-validity-banner">
          <div className="overview-validity-banner__content">
            <span className="overview-panel__tag">
              {lang === 'tr'
                ? '07 · BİLİMSEL GÜVENİLİRLİK & ŞEFFAFLIK'
                : '07 · SCIENTIFIC CREDIBILITY & TRANSPARENCY'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Resmî NASA / JPL Kaynakları ve Bağımsız Eğitim Projesi Bildirimi'
                : 'Official NASA / JPL Sources & Independent Educational Project Notice'}
            </h3>
            <ul className="overview-check-list">
              <li>
                ✦{' '}
                {lang === 'tr'
                  ? 'Tüm görev tarihleri, cihaz işlevleri ve bilimsel bulgular resmî NASA ve NASA/JPL kaynaklarına dayanır; her görev için doğrudan kaynak bağlantıları sunulur.'
                  : 'All mission dates, instrument functions, and scientific findings are grounded in official NASA and NASA/JPL sources, with direct source links for each mission.'}
              </li>
              <li>
                ✦{' '}
                {lang === 'tr'
                  ? 'Gerçek NASA görev verileri ile 13–15 yaş grubu için basitleştirilmiş 3D eğitim simülasyonları açıkça birbirinden ayrılır; her aracın bilimsel katkısı ve güncel durumu raporlanır.'
                  : 'Verified NASA mission data is clearly distinguished from simplified 3D educational simulations, alongside each vehicle’s scientific contribution and current status.'}
              </li>
              <li>
                ✦{' '}
                {lang === 'tr'
                  ? 'Bağımsız Proje Bildirimi: NASA-SPACE-ODYSSEY, NASA tarafından resmen geliştirilmemiş veya onaylanmamış bağımsız bir dijital eğitim projesidir.'
                  : 'Independent Project Notice: NASA-SPACE-ODYSSEY is an independent digital educational project and is not officially developed, affiliated with, or endorsed by NASA.'}
              </li>
            </ul>
          </div>
          <div className="overview-validity-banner__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onNavigateToSection('references')}
            >
              {lang === 'tr'
                ? '🔗 Resmî NASA Kaynaklarını Gör →'
                : '🔗 View Official NASA Sources →'}
            </button>
          </div>
        </div>

        {/* 6-Step Jury Demo Flow */}
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
      </div>
    </section>
  );
}
