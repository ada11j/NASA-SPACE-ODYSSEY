import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AdventureControlsPad, DriveInput } from '../../components/home/adventures/AdventureControlsPad';
import { AdventureSceneProps } from './SojournerAdventureScene';
import { playAdventureTone } from '../../utils/adventureAudio';
import { Opportunity3DModel } from './ExplorerVehicleModels';

interface GeoClue {
  id: 'hematite' | 'sediment' | 'sulfate';
  position: [number, number, number];
  color: string;
  labelTr: string;
  labelEn: string;
  detailTr: string;
  detailEn: string;
}

const GEO_CLUES: GeoClue[] = [
  {
    id: 'hematite',
    position: [-4.0, 0.25, -2.5],
    color: '#64748b',
    labelTr: 'Hematit Yaban Mersinleri',
    labelEn: 'Hematite Blueberries',
    detailTr:
      'Meridiani Planum toprağına gömülü milimetrik demir-oksit kürecikleri, geçmişte yer altı suyunun kayaların içinden aktığını gösterir.',
    detailEn:
      'Millimeter-scale iron-oxide spheres embedded in Meridiani Planum soil formed when groundwater moved through porous rock.',
  },
  {
    id: 'sediment',
    position: [4.2, 0.35, -3.2],
    color: '#b46542',
    labelTr: 'Katmanlı Çökelti Kayaları',
    labelEn: 'Layered Sedimentary Rock',
    detailTr:
      'Dalgalı ve ince tabakalı kaya yapısı, antik dönemde sığ ve durgun ya da yavaş akan yüzey sularının varlığına işaret eder.',
    detailEn:
      'Cross-bedded, finely layered rock outcrops record ancient shallow surface water or slow-moving currents.',
  },
  {
    id: 'sulfate',
    position: [0.4, 0.28, -5.6],
    color: '#d6a468',
    labelTr: 'Sülfat Tuzları (Jarosit)',
    labelEn: 'Sulfate Salts (Jarosite)',
    detailTr:
      'Suyun buharlaşmasıyla geride kalan tuz mineralleri, bir zamanlar asidik ama sıvı su havzalarının bulunduğunu kanıtlar.',
    detailEn:
      'Evaporite salt minerals left behind as water dried up prove liquid — though acidic — water once pooled here.',
  },
];

const INITIAL_INPUT: DriveInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

function OpportunityRoverMesh({
  inputRef,
  controlsRef,
  onApproachClue,
  lowPerf,
}: {
  inputRef: React.MutableRefObject<DriveInput>;
  controlsRef: React.MutableRefObject<any>;
  onApproachClue: (id: GeoClue['id']) => void;
  lowPerf: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const rockerLeftRef = useRef<THREE.Group | null>(null);
  const rockerRightRef = useRef<THREE.Group | null>(null);
  const armGroupRef = useRef<THREE.Group | null>(null);
  const headingRef = useRef(Math.PI);
  const lastNearClueRef = useRef<string | null>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const group = groupRef.current;
    if (!group) return;

    const { forward, backward, left, right } = inputRef.current;
    if (left) headingRef.current += 2.0 * dt;
    if (right) headingRef.current -= 2.0 * dt;

    let moveDir = 0;
    if (forward) moveDir += 1;
    if (backward) moveDir -= 1;

    if (moveDir !== 0) {
      const nextX = group.position.x + Math.sin(headingRef.current) * moveDir * 3.1 * dt;
      const nextZ = group.position.z + Math.cos(headingRef.current) * moveDir * 3.1 * dt;
      group.position.x = THREE.MathUtils.clamp(nextX, -7.2, 7.2);
      group.position.z = THREE.MathUtils.clamp(nextZ, -7.2, 5.5);

      wheelsRef.current.forEach((w) => {
        if (w) w.rotation.x += moveDir * dt * 5.5;
      });
    }

    if (!lowPerf) {
      const rockAngle = moveDir !== 0 ? Math.sin(state.clock.elapsedTime * 7.5) * 0.04 : 0;
      if (rockerLeftRef.current) rockerLeftRef.current.rotation.x = rockAngle;
      if (rockerRightRef.current) rockerRightRef.current.rotation.x = -rockAngle;
      if (armGroupRef.current) {
        armGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
      }
    }

    group.rotation.y = headingRef.current;

    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(group.position.x, 0.4, group.position.z),
        dt * 3.5
      );
      controlsRef.current.update();
    }

    let currentNear: string | null = null;
    for (const clue of GEO_CLUES) {
      const dx = group.position.x - clue.position[0];
      const dz = group.position.z - clue.position[2];
      if (dx * dx + dz * dz < 1.95 * 1.95) {
        currentNear = clue.id;
        if (lastNearClueRef.current !== currentNear) {
          onApproachClue(clue.id);
        }
        break;
      }
    }
    lastNearClueRef.current = currentNear;
  });

  return (
    <group ref={groupRef} position={[0, 0, 2.4]}>
      <Opportunity3DModel
        wheelsRef={wheelsRef}
        rockerLeftRef={rockerLeftRef}
        rockerRightRef={rockerRightRef}
        armGroupRef={armGroupRef}
        lowPerf={lowPerf}
      />
    </group>
  );
}

export default function OpportunityAdventureScene({
  lang,
  lowPerf,
  soundEnabled,
  completed,
  onComplete,
  resetSignal,
}: AdventureSceneProps) {
  const [foundIds, setFoundIds] = useState<GeoClue['id'][]>([]);
  const [activeClueId, setActiveClueId] = useState<GeoClue['id'] | null>(null);
  const [inferenceAnswer, setInferenceAnswer] = useState<'yes' | 'no' | null>(null);
  const inputRef = useRef<DriveInput>({ ...INITIAL_INPUT });
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setFoundIds([]);
    setActiveClueId(null);
    setInferenceAnswer(null);
    inputRef.current = { ...INITIAL_INPUT };
  }, [resetSignal]);

  const handleFindClue = (id: GeoClue['id']) => {
    setActiveClueId(id);
    setFoundIds((prev) => {
      if (prev.includes(id)) return prev;
      playAdventureTone(soundEnabled, 'discover');
      return [...prev, id];
    });
  };

  const handleInference = (choice: 'yes' | 'no') => {
    setInferenceAnswer(choice);
    if (choice === 'no') {
      playAdventureTone(soundEnabled, 'badge');
      onComplete();
    } else {
      playAdventureTone(soundEnabled, 'alert');
    }
  };

  const activeClue = useMemo(
    () => GEO_CLUES.find((c) => c.id === activeClueId) ?? null,
    [activeClueId]
  );

  const allCluesFound = foundIds.length === GEO_CLUES.length;
  const allDone = (allCluesFound && inferenceAnswer === 'no') || completed;

  return (
    <div className="adventure-stage">
      <div className="adventure-hud-top">
        <div className="adventure-objective-pill">
          {lang === 'tr'
            ? `Görev: Meridiani Planum’da 3 su kanıtını topla (${foundIds.length}/3)`
            : `Mission: Collect 3 water-evidence clues in Meridiani Planum (${foundIds.length}/3)`}
        </div>
        <div className="adventure-sample-chips">
          {GEO_CLUES.map((clue) => {
            const found = foundIds.includes(clue.id);
            return (
              <button
                key={clue.id}
                type="button"
                className={`adventure-chip ${found ? 'is-found' : ''}`}
                onClick={() => handleFindClue(clue.id)}
              >
                {found ? '✓' : '◎'} {lang === 'tr' ? clue.labelTr : clue.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="adventure-canvas-wrap">
        <Canvas
          key={resetSignal}
          dpr={lowPerf ? 1 : [1, 1.5]}
          shadows={!lowPerf}
          camera={{ position: [0, 6.2, 8.6], fov: 46 }}
        >
          <color attach="background" args={['#181110']} />
          <fog attach="fog" args={['#181110', 12, 26]} />
          <ambientLight intensity={0.75} color="#ffdcc4" />
          <directionalLight position={[6, 10, 5]} intensity={1.6} castShadow={!lowPerf} />

          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!lowPerf}>
            <planeGeometry args={[28, 28, lowPerf ? 8 : 20, lowPerf ? 8 : 20]} />
            <meshStandardMaterial color="#7b4632" roughness={0.95} />
          </mesh>

          <OpportunityRoverMesh
            inputRef={inputRef}
            controlsRef={controlsRef}
            onApproachClue={handleFindClue}
            lowPerf={lowPerf}
          />

          {GEO_CLUES.map((clue) => {
            const found = foundIds.includes(clue.id);
            return (
              <group key={clue.id} position={clue.position}>
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFindClue(clue.id);
                  }}
                >
                  {clue.id === 'hematite' ? (
                    <sphereGeometry args={[0.35, 14, 14]} />
                  ) : (
                    <boxGeometry args={[0.95, 0.55, 0.8]} />
                  )}
                  <meshStandardMaterial
                    color={clue.color}
                    emissive={found ? '#166534' : '#3b2416'}
                    emissiveIntensity={0.35}
                  />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -clue.position[1] + 0.03, 0]}>
                  <ringGeometry args={[0.9, 1.08, 24]} />
                  <meshBasicMaterial
                    color={found ? '#4ade80' : '#60a5fa'}
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            );
          })}

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={4.5}
            maxDistance={13}
            maxPolarAngle={Math.PI / 2.25}
          />
        </Canvas>

        <div className="adventure-controls-overlay">
          <AdventureControlsPad
            onInputChange={(updater) => {
              inputRef.current = updater(inputRef.current);
            }}
            ariaLabel={lang === 'tr' ? 'Opportunity sürüş kontrolleri' : 'Opportunity drive controls'}
          />
        </div>
      </div>

      {activeClue && (
        <div className="adventure-discovery-card">
          <div className="adventure-discovery-header">
            <strong>{lang === 'tr' ? activeClue.labelTr : activeClue.labelEn}</strong>
            <span className="adventure-discovery-tag">JEOLOJİK KANIT</span>
          </div>
          <p>{lang === 'tr' ? activeClue.detailTr : activeClue.detailEn}</p>
        </div>
      )}

      {allCluesFound && (
        <div className="adventure-discovery-card">
          <div className="adventure-discovery-header">
            <strong>
              {lang === 'tr'
                ? 'Bilimsel Çıkarım: Bu 3 kanıt Mars’ta canlı yaşam olduğunu kanıtlar mı?'
                : 'Scientific Inference: Do these 3 clues prove living organisms existed on Mars?'}
            </strong>
          </div>
          <div className="adventure-sample-chips" style={{ marginTop: '0.6rem' }}>
            <button
              type="button"
              className={`adventure-tool-btn ${inferenceAnswer === 'yes' ? 'is-active' : ''}`}
              onClick={() => handleInference('yes')}
            >
              {lang === 'tr' ? 'Evet, su varsa kesin yaşam vardır' : 'Yes, water proves life existed'}
            </button>
            <button
              type="button"
              className={`adventure-tool-btn ${inferenceAnswer === 'no' ? 'is-active' : ''}`}
              onClick={() => handleInference('no')}
            >
              {lang === 'tr'
                ? 'Hayır, yaşanabilir ortamı kanıtlar; doğrudan yaşamı değil'
                : 'No, it proves habitability, not direct life'}
            </button>
          </div>
          {inferenceAnswer === 'yes' && (
            <p className="adventure-science-note" style={{ marginTop: '0.6rem' }}>
              {lang === 'tr'
                ? 'Dikkat: Sıvı su yaşam için gerekli bir koşuldur ama tek başına fosil veya biyolojik iz olmadan yaşamı kanıtlamaz.'
                : 'Careful: Liquid water is necessary for life as we know it, but without biosignatures or fossils it does not prove life on its own.'}
            </p>
          )}
        </div>
      )}

      {allDone && (
        <div className="adventure-complete-banner">
          <div className="adventure-complete-icon">🔬</div>
          <div>
            <h4>
              {lang === 'tr'
                ? 'Keşif Raporu Tamamlandı — Mars Jeoloğu!'
                : 'Discovery Report Complete — Mars Geologist!'}
            </h4>
            <p>
              {lang === 'tr'
                ? 'Hematit kürecikleri, katmanlı kayalar ve sülfat tuzlarıyla antik su izlerini doğruladın; su kanıtının yaşanabilirlik anlamına geldiğini ancak tek başına yaşamı kanıtlamadığını ayırt ettin.'
                : 'You verified ancient water through hematite spheres, layered rocks, and sulfate salts, distinguishing habitability from direct proof of life.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
