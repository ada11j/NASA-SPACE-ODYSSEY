import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ExplorerVehicleShowcaseMesh } from '@/scenes/adventures/ExplorerVehicleModels';
import type { ExplorerStoryId, ExplorerStoryItem } from '@/types';

interface StoriesShowcaseSectionProps {
  onExploreStory: (storyId: ExplorerStoryId) => void;
}

const THEME_CLASS_MAP: Record<ExplorerStoryId, string> = {
  sojourner: 'stories-exhibit-panel--mars',
  ingenuity: 'stories-exhibit-panel--flight',
  opportunity: 'stories-exhibit-panel--endurance',
  'apollo-lrv': 'stories-exhibit-panel--lunar',
};

function Exhibition3DViewport({
  story,
  shouldReduceMotion,
}: {
  story: ExplorerStoryItem;
  shouldReduceMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { rootMargin: '260px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="stories-exhibit-panel__stage">
      <img
        src={story.image}
        alt={story.imageAlt}
        loading="lazy"
        className="stories-exhibit-panel__backdrop"
      />
      <div className="stories-exhibit-panel__vignette" aria-hidden="true" />

      <div className="stories-exhibit-panel__canvas">
        {isNearViewport ? (
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [2.7, 1.65, 3.05], fov: 37 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight
              intensity={story.id === 'apollo-lrv' ? 0.72 : 0.78}
              color={story.id === 'apollo-lrv' ? '#e2e8f0' : '#ffedd5'}
            />
            <directionalLight
              position={[4.5, 5.5, 3.5]}
              intensity={story.id === 'apollo-lrv' ? 1.85 : 1.75}
              color={story.id === 'apollo-lrv' ? '#f8fafc' : '#fff3e0'}
            />
            <directionalLight
              position={[-3.5, 2, -2.5]}
              intensity={0.55}
              color={story.accentColor}
            />
            <ExplorerVehicleShowcaseMesh storyId={story.id} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!shouldReduceMotion}
              autoRotateSpeed={1.0}
              minPolarAngle={0.5}
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
          </Canvas>
        ) : (
          <div className="stories-exhibit-panel__placeholder" aria-hidden="true">
            <span>{story.badgeIcon}</span>
          </div>
        )}
      </div>

      <div className="stories-exhibit-panel__photoBadge">
        <span>{story.imageCredit}</span>
      </div>
    </div>
  );
}

export function StoriesShowcaseSection({
  onExploreStory,
}: StoriesShowcaseSectionProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = Boolean(useReducedMotion());
  const stories = t.data.explorerStories;

  const scrollToExhibitionCards = () => {
    const el = document.getElementById('stories-exhibit-list');
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="stories-showcase"
      className="stories-exhibit-section"
      aria-labelledby="stories-exhibit-heading"
    >
      <div className="stories-exhibit-container">
        {/* Cinematic Exhibition Opening */}
        <div className="stories-exhibit-hero">
          <div className="stories-exhibit-hero__glowMars" aria-hidden="true" />
          <div className="stories-exhibit-hero__glowMoon" aria-hidden="true" />

          <span className="stories-exhibit-hero__eyebrow">
            {lang === 'tr'
              ? 'NASA DİJİTAL SERGİSİ · MARS & AY KEŞİFLERİ'
              : 'NASA DIGITAL EXHIBITION · MARS & LUNAR EXPLORATION'}
          </span>

          <h2 id="stories-exhibit-heading" className="stories-exhibit-hero__title">
            THE STORIES OF SILENT EXPLORERS
          </h2>

          <p className="stories-exhibit-hero__lead">
            {lang === 'tr'
              ? 'İnsanlığın ayak basmadığı veya yalnızca birkaç gün kalabildiği dünyalarda; toz fırtınalarına, dondurucu gecelere ve bilinmeyen kraterlere tek başına meydan okuyan dört keşif aracının gerçek hikâyesini keşfedin.'
              : 'Discover the true stories of four explorers that braved dust storms, freezing nights, and uncharted craters across Mars and the Moon—each unlocking a chapter of human spaceflight.'}
          </p>

          <div className="stories-exhibit-hero__actions">
            <button
              type="button"
              className="btn btn--primary stories-exhibit-hero__cta"
              onClick={scrollToExhibitionCards}
            >
              {lang === 'tr'
                ? '4 KÂŞİFİN HİKÂYESİNİ KEŞFET ↓'
                : 'EXPLORE THE 4 STORIES ↓'}
            </button>

            <div className="stories-exhibit-hero__quickPills">
              {stories.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  className="stories-exhibit-quickPill"
                  onClick={() => onExploreStory(story.id)}
                >
                  <span aria-hidden="true">{story.badgeIcon}</span>
                  <span>{story.spacecraftName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Large Cinematic Story Panels */}
        <div id="stories-exhibit-list" className="stories-exhibit-list">
          {stories.map((story, index) => {
            const isReversed = index % 2 === 1;
            const themeClass = THEME_CLASS_MAP[story.id];

            return (
              <article
                key={story.id}
                className={`stories-exhibit-panel ${themeClass} ${
                  isReversed ? 'is-reversed' : ''
                }`}
              >
                <Exhibition3DViewport
                  story={story}
                  shouldReduceMotion={shouldReduceMotion}
                />

                <div className="stories-exhibit-panel__content">
                  <div className="stories-exhibit-panel__meta">
                    <span className="stories-exhibit-panel__num">
                      {story.orderNumber}
                    </span>
                    <span className="stories-exhibit-panel__badge">
                      {story.badgeIcon} {story.badge}
                    </span>
                    <span className="stories-exhibit-panel__time">
                      {story.readingTime}
                    </span>
                  </div>

                  <h3 className="stories-exhibit-panel__title">
                    {story.spacecraftName} — {story.title}
                  </h3>

                  <p className="stories-exhibit-panel__subtitle">
                    {story.subtitle}
                  </p>

                  <blockquote className="stories-exhibit-panel__quote">
                    “{story.quote}”
                  </blockquote>

                  <div className="stories-exhibit-panel__facts">
                    {story.quickFacts.slice(0, 3).map((fact) => (
                      <div key={fact.label} className="stories-exhibit-fact">
                        <span className="stories-exhibit-fact__label">
                          {fact.label}
                        </span>
                        <strong className="stories-exhibit-fact__value">
                          {fact.value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="stories-exhibit-panel__footer">
                    <button
                      type="button"
                      className="stories-exhibit-panel__cta"
                      onClick={() => onExploreStory(story.id)}
                    >
                      {lang === 'tr'
                        ? 'HİKÂYEYİ KEŞFET & 3D MACERAYA BAŞLA →'
                        : 'EXPLORE STORY & START 3D ADVENTURE →'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
