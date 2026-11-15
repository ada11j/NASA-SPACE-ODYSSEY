import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ExplorerVehicleShowcaseMesh } from '@/scenes/adventures/ExplorerVehicleModels';
import type { ExplorerStoryId } from '@/types';

interface MeetExplorersSectionProps {
  selectedStoryId: ExplorerStoryId;
  onSelectExplorer: (storyId: ExplorerStoryId) => void;
}

export function MeetExplorersSection({
  selectedStoryId,
  onSelectExplorer,
}: MeetExplorersSectionProps) {
  const { lang, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const stories = t.data.explorerStories;

  return (
    <section
      id="meet-the-explorers"
      className="exploration-section exploration-section--meet"
      aria-labelledby="meet-explorers-heading"
    >
      <div className="exploration-section__container">
        <div className="exploration-section__header">
          <span className="exploration-section__eyebrow">
            {lang === 'tr' ? 'KEŞİF FİLOSU · 3D ÖNİZLEME' : 'EXPLORER FLEET · 3D PREVIEW'}
          </span>
          <h2 id="meet-explorers-heading" className="exploration-section__title">
            MEET THE EXPLORERS
          </h2>
          <p className="exploration-section__subtitle">
            {lang === 'tr'
              ? 'Dört Efsanevi Aracı 3D İncele ve Macerasını Başlat'
              : 'Inspect Four Legendary Vehicles in 3D & Launch Their Adventure'}
          </p>
          <p className="exploration-section__lead">
            {lang === 'tr'
              ? 'Her kartta aracın gerçek oranlarına uygun tam gövde 3D modelini döndürebilir, tıklayarak doğrudan o kâşifin hikâye ve 3D macera akışına geçebilirsin.'
              : 'Orbit each proportionally accurate full-body 3D explorer below, then click any card to jump directly into its Story-First 3D adventure.'}
          </p>
        </div>

        <div className="meet-explorers-grid">
          {stories.map((story) => {
            const isSelected = story.id === selectedStoryId;
            return (
              <article
                key={story.id}
                className={`meet-explorer-card ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="meet-explorer-card__canvas">
                  <Canvas
                    dpr={shouldReduceMotion ? 1 : [1, 1.5]}
                    camera={{ position: [2.75, 1.75, 2.95], fov: 40 }}
                  >
                    <color attach="background" args={['#090e1a']} />
                    <ambientLight intensity={0.85} />
                    <directionalLight position={[5, 7, 5]} intensity={1.7} color="#fff4e6" />
                    <directionalLight position={[-4, 3, -4]} intensity={0.75} color="#7dd3fc" />
                    <ExplorerVehicleShowcaseMesh
                      storyId={story.id}
                      autoRotate={!shouldReduceMotion}
                      lowPerf={Boolean(shouldReduceMotion)}
                    />
                    <OrbitControls
                      enablePan={false}
                      enableZoom={false}
                      minPolarAngle={Math.PI / 5}
                      maxPolarAngle={Math.PI / 2.1}
                    />
                  </Canvas>
                  <span className="meet-explorer-card__badge">{story.badge}</span>
                </div>

                <div className="meet-explorer-card__body">
                  <h3>{story.spacecraftName}</h3>
                  <p>{story.subtitle}</p>
                  <button
                    type="button"
                    className="story-nav-btn meet-explorer-card__cta"
                    onClick={() => onSelectExplorer(story.id)}
                  >
                    {lang === 'tr' ? 'Maceraya Git →' : 'Launch Adventure →'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
