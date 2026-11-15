import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { ExplorerStoryId, ExplorerStoryItem } from '@/types';

interface DetailStoryBannerProps {
  story: ExplorerStoryItem;
  onReadFullStory?: (storyId: ExplorerStoryId) => void;
}

/**
 * Reusable inline first-person story panel rendered inside vehicle detail views
 * (RoverDetailView and LunarMissionDetailView) so visitors can read the explorer's
 * story alongside technical telemetry.
 */
export function DetailStoryBanner({ story, onReadFullStory }: DetailStoryBannerProps) {
  const { t } = useLanguage();
  const sUi = t.ui.stories;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="detail-story-banner"
      style={{ '--story-accent': story.accentColor } as React.CSSProperties}
      aria-label={story.title}
    >
      <div className="detail-story-banner__top">
        <div className="detail-story-banner__meta">
          <span className="detail-story-banner__eyebrow">{sUi.detailPanelEyebrow}</span>
          <span className="detail-story-banner__badge">{story.badge}</span>
        </div>
        <h3 className="detail-story-banner__title">{story.title}</h3>
        <blockquote className="detail-story-banner__quote">{story.quote}</blockquote>

        <div className="detail-story-banner__actions">
          <button
            type="button"
            className="module-pill module-pill--active"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? `▲ ${sUi.detailCollapseBtn}` : `📖 ${sUi.detailExpandBtn}`}
          </button>
          {onReadFullStory ? (
            <button
              type="button"
              className="module-pill"
              onClick={() => onReadFullStory(story.id)}
            >
              {sUi.detailReadFullBtn}
            </button>
          ) : null}
        </div>
      </div>

      {isExpanded ? (
        <div className="detail-story-banner__chapters">
          {story.chapters.map((ch) => (
            <div key={ch.id} className="detail-story-banner__chapter">
              <span>{ch.chapterNumber}</span>
              <h4>{ch.heading}</h4>
              {ch.paragraphs.map((p, idx) => (
                <p key={`${ch.id}-inline-${idx}`}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
