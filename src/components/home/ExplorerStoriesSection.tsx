import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ADVENTURE_FLOW_DATA } from '@/data/stories/adventureFlowData';
import { RobotInspectorStage } from './adventures/RobotInspectorStage';
import { MissionPrepStage } from './adventures/MissionPrepStage';
import { DiscoveryReportStage } from './adventures/DiscoveryReportStage';
import type {
  ExplorerStoryId,
  LunarMissionId,
  RoverId,
  SectionId,
} from '@/types';

type AdventureStageNumber = 1 | 2 | 3 | 4 | 5;

const SojournerAdventureScene = lazy(
  () => import('@/scenes/adventures/SojournerAdventureScene')
);
const IngenuityAdventureScene = lazy(
  () => import('@/scenes/adventures/IngenuityAdventureScene')
);
const OpportunityAdventureScene = lazy(
  () => import('@/scenes/adventures/OpportunityAdventureScene')
);
const ApolloLrvAdventureScene = lazy(
  () => import('@/scenes/adventures/ApolloLrvAdventureScene')
);

const BADGE_STORAGE_KEY = 'nasa-space-odyssey-badges';
type BadgeProgress = Record<ExplorerStoryId, boolean>;

const DEFAULT_BADGES: BadgeProgress = {
  sojourner: false,
  ingenuity: false,
  opportunity: false,
  'apollo-lrv': false,
};

function loadBadgeProgress(): BadgeProgress {
  try {
    const raw = window.localStorage.getItem(BADGE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_BADGES };
    const parsed = JSON.parse(raw) as Partial<BadgeProgress>;
    return {
      sojourner: Boolean(parsed.sojourner),
      ingenuity: Boolean(parsed.ingenuity),
      opportunity: Boolean(parsed.opportunity),
      'apollo-lrv': Boolean(parsed['apollo-lrv']),
    };
  } catch {
    return { ...DEFAULT_BADGES };
  }
}

interface ExplorerStoriesSectionProps {
  selectedStoryId?: ExplorerStoryId;
  onSelectStoryId?: (storyId: ExplorerStoryId) => void;
  onNavigateToSection?: (sectionId: SectionId) => void;
  onOpenRoverById?: (roverId: RoverId) => void;
  onOpenLunarMissionById?: (missionId: LunarMissionId) => void;
}

export function ExplorerStoriesSection({
  selectedStoryId: controlledStoryId,
  onSelectStoryId,
  onNavigateToSection,
  onOpenRoverById,
  onOpenLunarMissionById,
}: ExplorerStoriesSectionProps) {
  const { t, lang } = useLanguage();
  const sUi = t.ui.stories;
  const stories = t.data.explorerStories;
  const shouldReduceMotion = useReducedMotion();

  const [internalStoryId, setInternalStoryId] = useState<ExplorerStoryId>('sojourner');
  const activeStoryId = controlledStoryId ?? internalStoryId;
  const [badges, setBadges] = useState<BadgeProgress>(() => loadBadgeProgress());
  const [storyStages, setStoryStages] = useState<Record<ExplorerStoryId, AdventureStageNumber>>({
    sojourner: 1,
    ingenuity: 1,
    opportunity: 1,
    'apollo-lrv': 1,
  });
  const [stage4Mounted, setStage4Mounted] = useState<Record<ExplorerStoryId, boolean>>({
    sojourner: false,
    ingenuity: false,
    opportunity: false,
    'apollo-lrv': false,
  });
  const [inspectedParts, setInspectedParts] = useState<Record<ExplorerStoryId, string[]>>({
    sojourner: ['wheels'],
    ingenuity: ['rotors'],
    opportunity: ['solar-wings'],
    'apollo-lrv': ['mesh-wheels'],
  });
  const [selectedPartByStory, setSelectedPartByStory] = useState<Record<ExplorerStoryId, string | null>>({
    sojourner: 'wheels',
    ingenuity: 'rotors',
    opportunity: 'solar-wings',
    'apollo-lrv': 'mesh-wheels',
  });
  const [storyMode, setStoryMode] = useState<'scenes' | 'full'>('scenes');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [lowPerf, setLowPerf] = useState(Boolean(shouldReduceMotion));
  const [resetSignal, setResetSignal] = useState(0);

  const currentStage = storyStages[activeStoryId] ?? 1;

  const setStageForActiveStory = (nextStage: AdventureStageNumber) => {
    setStoryStages((prev) => ({ ...prev, [activeStoryId]: nextStage }));
    if (nextStage === 4) {
      setStage4Mounted((prev) => (prev[activeStoryId] ? prev : { ...prev, [activeStoryId]: true }));
    }
  };

  const handleSelectRobotPart = (partId: string) => {
    setSelectedPartByStory((prev) => ({ ...prev, [activeStoryId]: partId }));
    setInspectedParts((prev) => {
      const existing = prev[activeStoryId] ?? [];
      if (existing.includes(partId)) return prev;
      return { ...prev, [activeStoryId]: [...existing, partId] };
    });
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(badges));
    } catch {
      // Ignore storage quota errors
    }
  }, [badges]);

  const setActiveStory = (id: ExplorerStoryId) => {
    setSceneIndex(0);
    setLearnMoreOpen(false);
    if (onSelectStoryId) {
      onSelectStoryId(id);
    } else {
      setInternalStoryId(id);
    }
  };

  const handleEarnBadge = (id: ExplorerStoryId) => {
    setBadges((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const earnedCount = Object.values(badges).filter(Boolean).length;

  const activeIndex = Math.max(
    0,
    stories.findIndex((s) => s.id === activeStoryId)
  );
  const activeStory = stories[activeIndex] ?? stories[0];
  const activeScenes = activeStory.scenes ?? [];
  const safeSceneIdx = Math.min(sceneIndex, Math.max(0, activeScenes.length - 1));
  const activeScene = activeScenes[safeSceneIdx];
  const prevStory = stories[(activeIndex - 1 + stories.length) % stories.length];
  const nextStory = stories[(activeIndex + 1) % stories.length];

  const handleOpenRelatedVehicle = () => {
    if (activeStory.relatedRoverId && onOpenRoverById) {
      onOpenRoverById(activeStory.relatedRoverId);
    } else if (activeStory.relatedLunarMissionId && onOpenLunarMissionById) {
      onOpenLunarMissionById(activeStory.relatedLunarMissionId);
    }
  };

  return (
    <section
      id="explorer-stories"
      className="exploration-section exploration-section--stories"
      aria-labelledby="explorer-stories-heading"
    >
      <div className="exploration-section__container">
        {/* Section Header */}
        <motion.div
          className="exploration-section__header"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="exploration-section__eyebrow">{sUi.eyebrow}</span>
          <h2 id="explorer-stories-heading" className="exploration-section__title">
            {sUi.title}
          </h2>
          <p className="exploration-section__subtitle">{sUi.subtitle}</p>
          <p className="exploration-section__lead">{sUi.description}</p>
        </motion.div>

        {/* Exploration Badges & Progress Bar */}
        <div className="adventure-badges-bar" aria-label={sUi.progressHeading}>
          <div className="adventure-badges-bar__head">
            <span className="adventure-badges-bar__title">{sUi.progressHeading}</span>
            <span className="adventure-badges-bar__count">
              {earnedCount}/{stories.length} {sUi.progressCompletedSuffix}
            </span>
          </div>
          <div className="adventure-badges-bar__grid">
            {stories.map((story) => {
              const earned = badges[story.id];
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveStory(story.id)}
                  className={`adventure-badge-pill ${earned ? 'is-earned' : ''} ${
                    story.id === activeStory.id ? 'is-current' : ''
                  }`}
                >
                  <span className="adventure-badge-pill__icon" aria-hidden="true">
                    {story.badgeIcon}
                  </span>
                  <span className="adventure-badge-pill__text">
                    <strong>{story.badgeTitle}</strong>
                    <small>{earned ? sUi.badgeEarnedLabel : sUi.badgeLockedLabel}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Story Selector Cards */}
        <div
          className="stories-selector-grid"
          role="tablist"
          aria-label={sUi.selectorAria}
        >
          {stories.map((story) => {
            const isSelected = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`story-selector-card ${
                  isSelected ? 'story-selector-card--active' : ''
                }`}
                style={
                  {
                    '--story-accent': story.accentColor,
                  } as React.CSSProperties
                }
                onClick={() => setActiveStory(story.id)}
              >
                <div className="story-selector-card__thumbWrap">
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    className="story-selector-card__thumb"
                    loading="lazy"
                  />
                  <span className="story-selector-card__num">{story.orderNumber}</span>
                </div>
                <div className="story-selector-card__body">
                  <span className="story-selector-card__spacecraft">
                    {story.spacecraftName}
                  </span>
                  <strong className="story-selector-card__title">{story.title}</strong>
                  <span className="story-selector-card__meta">{story.readingTime}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Story Reading Stage */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeStory.id}
            className="story-reader"
            style={
              {
                '--story-accent': activeStory.accentColor,
              } as React.CSSProperties
            }
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-live="polite"
          >
            {/* Story Hero Banner */}
            <div className="story-reader__hero">
              <div className="story-reader__heroText">
                <div className="story-reader__badgeRow">
                  <span className="story-reader__badge">{activeStory.badge}</span>
                  <span className="story-reader__readTime">{activeStory.readingTime}</span>
                </div>

                <h3 className="story-reader__title">{activeStory.title}</h3>
                <p className="story-reader__subtitle">{activeStory.subtitle}</p>

                <blockquote className="story-reader__quote">
                  {activeStory.quote}
                </blockquote>

                {/* Mission Fact Card (4 key metrics) */}
                <div className="story-facts-card">
                  <span className="story-facts-card__heading">{sUi.factsCardTitle}</span>
                  <div className="story-facts-card__grid">
                    {activeStory.quickFacts.map((fact) => (
                      <div key={fact.label} className="story-fact-item">
                        <span>{fact.label}</span>
                        <strong>{fact.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <figure className="story-reader__media">
                <div className="story-reader__imgFrame">
                  <img
                    src={activeStory.image}
                    alt={activeStory.imageAlt}
                    className="story-reader__img"
                  />
                  <span className="story-reader__mediaKind">
                    {activeStory.mediaKindLabel}
                  </span>
                </div>
                <figcaption className="story-reader__caption">
                  {activeStory.imageCredit}
                </figcaption>
              </figure>
            </div>

            {/* 5-Stage Story-First Stepper */}
            <nav
              className="story-stage-stepper"
              aria-label={lang === 'tr' ? 'Macera Aşamaları' : 'Adventure Stages'}
            >
              {(
                [
                  { num: 1, tr: '1. Kâşifin Hikâyesi', en: '1. Explorer’s Story' },
                  { num: 2, tr: '2. Robotu Tanı', en: '2. Meet the Robot' },
                  { num: 3, tr: '3. Göreve Hazırlan', en: '3. Mission Prep' },
                  { num: 4, tr: '4. 3D Macera', en: '4. 3D Adventure' },
                  { num: 5, tr: '5. Keşif Raporu', en: '5. Discovery Report' },
                ] as const
              ).map((step) => {
                const isActive = currentStage === step.num;
                const isPast = currentStage > step.num;
                return (
                  <button
                    key={step.num}
                    type="button"
                    className={`story-stage-pill ${isActive ? 'is-active' : ''} ${
                      isPast ? 'is-done' : ''
                    }`}
                    onClick={() => setStageForActiveStory(step.num)}
                  >
                    <span>{lang === 'tr' ? step.tr : step.en}</span>
                  </button>
                );
              })}
            </nav>

            {/* STAGE 2: Robotu Tanı */}
            {currentStage === 2 && (
              <RobotInspectorStage
                storyId={activeStory.id}
                parts={ADVENTURE_FLOW_DATA[activeStory.id].robotParts}
                inspectedIds={inspectedParts[activeStory.id] ?? []}
                selectedPartId={selectedPartByStory[activeStory.id] ?? null}
                onSelectPart={handleSelectRobotPart}
                lang={lang}
                lowPerf={lowPerf}
              />
            )}

            {/* STAGE 3: Göreve Hazırlan */}
            {currentStage === 3 && (
              <MissionPrepStage
                config={ADVENTURE_FLOW_DATA[activeStory.id]}
                lang={lang}
                onStartAdventure={() => setStageForActiveStory(4)}
              />
            )}

            {/* STAGE 4: Interactive 3D Adventure Stage (kept mounted once entered so progress is never lost) */}
            {stage4Mounted[activeStory.id] && (
              <div
                className="adventure-workspace"
                style={{ display: currentStage === 4 ? 'block' : 'none' }}
              >
                <div className="adventure-toolbar">
                  <div className="adventure-toolbar__left">
                    <span className="adventure-toolbar__badge">3D MINI MACERA</span>
                    <span className="adventure-toolbar__hint">
                      {sUi.controlsHintDesktop} · {sUi.controlsHintTouch}
                    </span>
                  </div>
                  <div className="adventure-toolbar__actions">
                    <button
                      type="button"
                      className={`adventure-tool-btn ${soundEnabled ? 'is-active' : ''}`}
                      onClick={() => setSoundEnabled((prev) => !prev)}
                    >
                      {soundEnabled ? `🔊 ${sUi.soundOnLabel}` : `🔇 ${sUi.soundOffLabel}`}
                    </button>
                    <button
                      type="button"
                      className={`adventure-tool-btn ${lowPerf ? 'is-active' : ''}`}
                      onClick={() => setLowPerf((prev) => !prev)}
                    >
                      {lowPerf ? `⚡ ${sUi.perfLowLabel}` : `✨ ${sUi.perfStandardLabel}`}
                    </button>
                    <button
                      type="button"
                      className="adventure-tool-btn"
                      onClick={() => setResetSignal((prev) => prev + 1)}
                    >
                      ↺ {sUi.resetAdventureBtn}
                    </button>
                  </div>
                </div>

                <Suspense
                  fallback={
                    <div className="adventure-loading">
                      {lang === 'tr' ? '3D Keşif Sahnesi Yükleniyor...' : 'Loading 3D Exploration Stage...'}
                    </div>
                  }
                >
                  {activeStory.id === 'sojourner' && (
                    <SojournerAdventureScene
                      lang={lang}
                      lowPerf={lowPerf}
                      soundEnabled={soundEnabled}
                      completed={badges.sojourner}
                      onComplete={() => handleEarnBadge('sojourner')}
                      resetSignal={resetSignal}
                    />
                  )}
                  {activeStory.id === 'ingenuity' && (
                    <IngenuityAdventureScene
                      lang={lang}
                      lowPerf={lowPerf}
                      soundEnabled={soundEnabled}
                      completed={badges.ingenuity}
                      onComplete={() => handleEarnBadge('ingenuity')}
                      resetSignal={resetSignal}
                    />
                  )}
                  {activeStory.id === 'opportunity' && (
                    <OpportunityAdventureScene
                      lang={lang}
                      lowPerf={lowPerf}
                      soundEnabled={soundEnabled}
                      completed={badges.opportunity}
                      onComplete={() => handleEarnBadge('opportunity')}
                      resetSignal={resetSignal}
                    />
                  )}
                  {activeStory.id === 'apollo-lrv' && (
                    <ApolloLrvAdventureScene
                      lang={lang}
                      lowPerf={lowPerf}
                      soundEnabled={soundEnabled}
                      completed={badges['apollo-lrv']}
                      onComplete={() => handleEarnBadge('apollo-lrv')}
                      resetSignal={resetSignal}
                    />
                  )}
                </Suspense>
              </div>
            )}

            {/* STAGE 5: Keşif Raporu */}
            {currentStage === 5 && (
              <DiscoveryReportStage
                story={activeStory}
                flowConfig={ADVENTURE_FLOW_DATA[activeStory.id]}
                inspectedPartIds={inspectedParts[activeStory.id] ?? []}
                badgeEarned={badges[activeStory.id]}
                lang={lang}
                onGoToStage={setStageForActiveStory}
              />
            )}

            {/* STAGE 1: Kâşifin Hikâyesi (Short Scenes / Full Story) */}
            {currentStage === 1 && (
              <>
                <div className="story-mode-bar">
              <div className="story-mode-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={storyMode === 'scenes'}
                  className={`story-mode-tab ${storyMode === 'scenes' ? 'is-active' : ''}`}
                  onClick={() => setStoryMode('scenes')}
                >
                  {sUi.sceneModeLabel} ({activeScenes.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={storyMode === 'full'}
                  className={`story-mode-tab ${storyMode === 'full' ? 'is-active' : ''}`}
                  onClick={() => setStoryMode('full')}
                >
                  {sUi.fullStoryModeLabel}
                </button>
              </div>
            </div>

            {storyMode === 'scenes' && activeScene ? (
              <div className="story-scene-deck">
                <div className="story-scene-progress">
                  {activeScenes.map((sc, idx) => (
                    <button
                      key={sc.id}
                      type="button"
                      className={`story-scene-step ${idx === safeSceneIdx ? 'is-active' : ''} ${
                        idx < safeSceneIdx ? 'is-done' : ''
                      }`}
                      onClick={() => {
                        setSceneIndex(idx);
                        setLearnMoreOpen(false);
                      }}
                    >
                      <span>{sc.sceneNumber}</span>
                      <small>{sc.title}</small>
                    </button>
                  ))}
                </div>

                <div className="story-scene-card">
                  <div className="story-scene-card__meta">
                    <span className="story-chapter-card__num">{activeScene.sceneNumber}</span>
                    <h4>{activeScene.title}</h4>
                  </div>

                  <div className="story-scene-card__body">
                    {activeScene.paragraphs.map((p, idx) => (
                      <p key={`${activeScene.id}-p${idx}`}>{p}</p>
                    ))}
                  </div>

                  <div className="story-scene-takeaway">
                    <strong>{lang === 'tr' ? 'Önemli Bilimsel Bilgi' : 'Key Scientific Fact'}</strong>
                    <p>{activeScene.keyTakeaway}</p>
                  </div>

                  <div className="story-scene-prompt">
                    <span>🔭</span>
                    <p>{activeScene.interactionPrompt}</p>
                  </div>

                  <div className="story-scene-learnmore">
                    <button
                      type="button"
                      className="story-learnmore-toggle"
                      aria-expanded={learnMoreOpen}
                      onClick={() => setLearnMoreOpen((prev) => !prev)}
                    >
                      <span>{activeScene.learnMoreTitle}</span>
                      <strong>{learnMoreOpen ? sUi.learnMoreClose : sUi.learnMoreOpen}</strong>
                    </button>
                    {learnMoreOpen && (
                      <div className="story-learnmore-panel">
                        <p>{activeScene.learnMoreDetail}</p>
                      </div>
                    )}
                  </div>

                  <div className="story-scene-nav">
                    <button
                      type="button"
                      className="story-nav-btn"
                      disabled={safeSceneIdx === 0}
                      onClick={() => {
                        setSceneIndex((prev) => Math.max(0, prev - 1));
                        setLearnMoreOpen(false);
                      }}
                    >
                      ← {sUi.prevSceneBtn}
                    </button>
                    <span className="story-scene-counter">
                      {safeSceneIdx + 1} / {activeScenes.length}
                    </span>
                    <button
                      type="button"
                      className="story-nav-btn"
                      disabled={safeSceneIdx >= activeScenes.length - 1}
                      onClick={() => {
                        setSceneIndex((prev) => Math.min(activeScenes.length - 1, prev + 1));
                        setLearnMoreOpen(false);
                      }}
                    >
                      {sUi.nextSceneBtn} →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Structured Chapters (Comfortable 13-15 age reading rhythm) */
              <div className="story-chapters-grid">
                {activeStory.chapters.map((chapter) => (
                  <section key={chapter.id} className="story-chapter-card">
                    <span className="story-chapter-card__num">{chapter.chapterNumber}</span>
                    <h4 className="story-chapter-card__heading">{chapter.heading}</h4>
                    <div className="story-chapter-card__paragraphs">
                      {chapter.paragraphs.map((p, idx) => (
                        <p key={`${chapter.id}-p${idx}`}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Science Glossary + Mini Timeline + Discoveries */}
            <div className="story-enrichment-grid">
              {/* Mini Historical Timeline */}
              <div className="story-panel">
                <h4 className="story-panel__title">{sUi.timelineTitle}</h4>
                <ol className="story-mini-timeline">
                  {activeStory.timeline.map((ev) => (
                    <li key={`${ev.date}-${ev.title}`} className="story-mini-timeline__item">
                      <span className="story-mini-timeline__date">{ev.date}</span>
                      <strong>{ev.title}</strong>
                      <p>{ev.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right Column: Discoveries + Quick Science Glossary */}
              <div className="story-enrichment-col">
                <div className="story-panel">
                  <h4 className="story-panel__title">{sUi.discoveriesTitle}</h4>
                  <div className="story-discoveries-list">
                    {activeStory.discoveries.map((disc) => (
                      <div key={disc.title} className="story-discovery-item">
                        <strong>{disc.title}</strong>
                        <p>{disc.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="story-panel">
                  <h4 className="story-panel__title">{sUi.glossaryTitle}</h4>
                  <dl className="story-glossary-list">
                    {activeStory.glossary.map((item) => (
                      <div key={item.term} className="story-glossary-item">
                        <dt>{item.term}</dt>
                        <dd>{item.explanation}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
              </>
            )}

            {/* Stage Navigation (Back / Next Stage) */}
            <div className="story-stage-nav">
              <button
                type="button"
                className="adventure-tool-btn"
                disabled={currentStage === 1}
                onClick={() =>
                  setStageForActiveStory(
                    Math.max(1, currentStage - 1) as AdventureStageNumber
                  )
                }
              >
                ← {lang === 'tr' ? 'Önceki Aşama' : 'Previous Stage'}
              </button>
              <span className="story-scene-counter">
                {lang === 'tr' ? `Aşama ${currentStage} / 5` : `Stage ${currentStage} / 5`}
              </span>
              <button
                type="button"
                className="story-nav-btn"
                disabled={currentStage === 5}
                onClick={() =>
                  setStageForActiveStory(
                    Math.min(5, currentStage + 1) as AdventureStageNumber
                  )
                }
              >
                {lang === 'tr' ? 'Sonraki Aşama' : 'Next Stage'} →
              </button>
            </div>

            {/* Bottom Story Controls & Cross-Link to Vehicle Dossier */}
            <div className="story-reader__footer">
              <div className="story-reader__navBtns">
                <button
                  type="button"
                  className="module-pill"
                  onClick={() => setActiveStory(prevStory.id)}
                >
                  {sUi.prevStoryBtn} ({prevStory.orderNumber})
                </button>
                <button
                  type="button"
                  className="module-pill"
                  onClick={() => setActiveStory(nextStory.id)}
                >
                  {sUi.nextStoryBtn} ({nextStory.orderNumber})
                </button>
              </div>

              {(activeStory.relatedRoverId || activeStory.relatedLunarMissionId) && (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleOpenRelatedVehicle}
                >
                  {activeStory.relatedVehicleLabel} →
                </button>
              )}
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Section Footer Jump Links */}
        {onNavigateToSection ? (
          <div className="exploration-section__footerNav">
            <a
              href="#references"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('references');
              }}
            >
              <span>{t.ui.nav.links.references}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#hero"
              className="section-jump-link"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToSection('hero');
              }}
            >
              <span>{t.ui.lunarMissionDetail.backToMain}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ExplorerStoriesSection;
