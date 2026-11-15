import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { ExplorerStoryId } from '@/types';
import type { RobotPartInfo } from '@/data/stories/adventureFlowData';
import {
  ApolloLrv3DModel,
  Ingenuity3DModel,
  Opportunity3DModel,
  Sojourner3DModel,
} from '@/scenes/adventures/ExplorerVehicleModels';

function InspectedExplorerRig({
  storyId,
  lowPerf,
}: {
  storyId: ExplorerStoryId;
  lowPerf: boolean;
}) {
  const topRotorRef = useRef<THREE.Group | null>(null);
  const bottomRotorRef = useRef<THREE.Group | null>(null);

  useFrame((_, delta) => {
    if (storyId === 'ingenuity' && !lowPerf) {
      if (topRotorRef.current) topRotorRef.current.rotation.y += delta * 2.6;
      if (bottomRotorRef.current) bottomRotorRef.current.rotation.y -= delta * 2.6;
    }
  });

  if (storyId === 'ingenuity') {
    return (
      <Ingenuity3DModel
        topRotorRef={topRotorRef}
        bottomRotorRef={bottomRotorRef}
        lowPerf={lowPerf}
      />
    );
  }
  if (storyId === 'opportunity') return <Opportunity3DModel lowPerf={lowPerf} />;
  if (storyId === 'apollo-lrv') return <ApolloLrv3DModel lowPerf={lowPerf} />;
  return <Sojourner3DModel lowPerf={lowPerf} />;
}

export function RobotInspectorStage({
  storyId,
  parts,
  inspectedIds,
  selectedPartId,
  onSelectPart,
  lang,
  lowPerf,
}: {
  storyId: ExplorerStoryId;
  parts: RobotPartInfo[];
  inspectedIds: string[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  lang: 'tr' | 'en';
  lowPerf: boolean;
}) {
  const activePart = useMemo(
    () => parts.find((p) => p.id === selectedPartId) ?? parts[0],
    [parts, selectedPartId]
  );

  const yOffset =
    storyId === 'opportunity' ? -0.45 : storyId === 'sojourner' ? -0.32 : -0.38;

  return (
    <div className="story-first-panel">
      <div className="story-first-panel__head">
        <div>
          <h4>
            {lang === 'tr'
              ? '3D Aracı İncele — Parçalara Tıkla'
              : 'Inspect the 3D Explorer — Click Any Part'}
          </h4>
          <p>
            {lang === 'tr'
              ? `Keşfedilen ekipmanlar: ${inspectedIds.length}/${parts.length}`
              : `Equipment inspected: ${inspectedIds.length}/${parts.length}`}
          </p>
        </div>
        <div className="adventure-sample-chips">
          {parts.map((part) => {
            const seen = inspectedIds.includes(part.id);
            const active = activePart.id === part.id;
            return (
              <button
                key={part.id}
                type="button"
                className={`adventure-chip ${seen ? 'is-found' : ''} ${
                  active ? 'is-selected-part' : ''
                }`}
                onClick={() => onSelectPart(part.id)}
              >
                <span>{seen ? '✓' : '◎'}</span>{' '}
                {lang === 'tr' ? part.nameTr : part.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="robot-inspector-grid">
        <div className="robot-inspector-canvas">
          <Canvas
            dpr={lowPerf ? 1 : [1, 1.5]}
            camera={{ position: [2.7, 1.75, 2.9], fov: 42 }}
          >
            <color attach="background" args={['#090e1a']} />
            <ambientLight intensity={0.85} />
            <directionalLight position={[5, 7, 5]} intensity={1.7} color="#fff4e6" />
            <directionalLight position={[-4, 3, -4]} intensity={0.75} color="#7dd3fc" />

            <group position={[0, yOffset, 0]}>
              <InspectedExplorerRig storyId={storyId} lowPerf={lowPerf} />

              {parts.map((part) => {
                const isSelected = activePart.id === part.id;
                const isSeen = inspectedIds.includes(part.id);
                return (
                  <mesh
                    key={part.id}
                    position={part.position}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPart(part.id);
                    }}
                  >
                    <sphereGeometry args={[isSelected ? 0.11 : 0.085, 14, 14]} />
                    <meshBasicMaterial
                      color={
                        isSelected ? '#38bdf8' : isSeen ? '#4ade80' : '#fbbf24'
                      }
                    />
                  </mesh>
                );
              })}
            </group>

            <OrbitControls enablePan={false} minDistance={2.0} maxDistance={5.6} />
          </Canvas>
        </div>

        <div className="robot-inspector-card">
          <span className="adventure-discovery-tag">
            {lang === 'tr' ? activePart.roleTr : activePart.roleEn}
          </span>
          <h5>{lang === 'tr' ? activePart.nameTr : activePart.nameEn}</h5>
          <p>{lang === 'tr' ? activePart.detailTr : activePart.detailEn}</p>
          <small className="robot-inspector-hint">
            {lang === 'tr'
              ? 'İpucu: 3D modeli sürükleyerek çevirebilir, renkli noktalara veya yukarıdaki etiketlere tıklayabilirsin.'
              : 'Tip: Drag to orbit the 3D model and click glowing nodes or chips above.'}
          </small>
        </div>
      </div>
    </div>
  );
}
