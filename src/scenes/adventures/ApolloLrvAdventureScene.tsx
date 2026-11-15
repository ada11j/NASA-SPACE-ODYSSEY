import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AdventureControlsPad, DriveInput } from '../../components/home/adventures/AdventureControlsPad';
import { AdventureSceneProps } from './SojournerAdventureScene';
import { playAdventureTone } from '../../utils/adventureAudio';
import { ApolloLrv3DModel } from './ExplorerVehicleModels';

interface LunarWaypoint {
  id: 'crater-rim' | 'basalt' | 'sample-site';
  position: [number, number, number];
  labelTr: string;
  labelEn: string;
  factTr: string;
  factEn: string;
}

const WAYPOINTS: LunarWaypoint[] = [
  {
    id: 'crater-rim',
    position: [-4.5, 0.05, -2.0],
    labelTr: 'İstasyon 1: Krater Kenarı',
    labelEn: 'Station 1: Crater Rim',
    factTr:
      'Ay’da yer çekimi Dünya’nın yaklaşık 1/6’sı kadardır. Hafif LRV, düşük yer çekimi sayesinde gevşek regolit üzerinde rahatça ilerler.',
    factEn:
      'Lunar gravity is ~1/6th of Earth’s. The lightweight LRV glides smoothly across loose regolith thanks to low gravity.',
  },
  {
    id: 'basalt',
    position: [4.4, 0.05, -3.4],
    labelTr: 'İstasyon 2: Bazalt Kayası',
    labelEn: 'Station 2: Basalt Outcrop',
    factTr:
      'Ay’da atmosfer ve oksijen olmadığı için içten yanmalı motor çalışmaz. LRV gücünü iki adet 36 volt gümüş-çinko elektrik bataryasından alır.',
    factEn:
      'Without oxygen on the Moon, combustion engines cannot run. The LRV is powered by two 36-volt silver-zinc electric batteries.',
  },
  {
    id: 'sample-site',
    position: [0.0, 0.05, -6.0],
    labelTr: 'İstasyon 3: Örnek Toplama Noktası',
    labelEn: 'Station 3: Rock Sample Site',
    factTr:
      'Apollo 15, 16 ve 17 görevlerinde LRV sayesinde astronotlar yürüyerek ulaşamayacakları uzak noktalara gidip toplam ~90 km’den fazla yol katetti.',
    factEn:
      'Across Apollo 15, 16, and 17, the LRV carried astronauts far beyond walking range, covering over ~90 km in total.',
  },
];

const HAZARDS: { x: number; z: number; r: number }[] = [
  { x: -1.8, z: -0.6, r: 0.9 },
  { x: 2.1, z: -1.2, r: 1.0 },
  { x: -1.4, z: -4.2, r: 0.95 },
];

const INITIAL_INPUT: DriveInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

function ApolloLrvMesh({
  inputRef,
  controlsRef,
  onReachWaypoint,
  onHazardHit,
  onBatteryDrain,
  lowPerf,
}: {
  inputRef: React.MutableRefObject<DriveInput>;
  controlsRef: React.MutableRefObject<any>;
  onReachWaypoint: (id: LunarWaypoint['id']) => void;
  onHazardHit: () => void;
  onBatteryDrain: (deltaPct: number) => void;
  lowPerf: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const frontLeftSteerRef = useRef<THREE.Group | null>(null);
  const frontRightSteerRef = useRef<THREE.Group | null>(null);
  const headingRef = useRef(Math.PI);
  const hazardCooldownRef = useRef(0);
  const lastNearWpRef = useRef<string | null>(null);
  const batteryAccumRef = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const group = groupRef.current;
    if (!group) return;

    if (hazardCooldownRef.current > 0) {
      hazardCooldownRef.current = Math.max(0, hazardCooldownRef.current - dt);
    }

    const { forward, backward, left, right } = inputRef.current;
    if (left) headingRef.current += 2.1 * dt;
    if (right) headingRef.current -= 2.1 * dt;

    const targetSteer = left ? 0.35 : right ? -0.35 : 0;
    if (frontLeftSteerRef.current) {
      frontLeftSteerRef.current.rotation.y = THREE.MathUtils.lerp(
        frontLeftSteerRef.current.rotation.y,
        targetSteer,
        dt * 10
      );
    }
    if (frontRightSteerRef.current) {
      frontRightSteerRef.current.rotation.y = THREE.MathUtils.lerp(
        frontRightSteerRef.current.rotation.y,
        targetSteer,
        dt * 10
      );
    }

    let moveDir = 0;
    if (forward) moveDir += 1;
    if (backward) moveDir -= 1;

    if (moveDir !== 0) {
      const nextX = group.position.x + Math.sin(headingRef.current) * moveDir * 3.5 * dt;
      const nextZ = group.position.z + Math.cos(headingRef.current) * moveDir * 3.5 * dt;
      group.position.x = THREE.MathUtils.clamp(nextX, -7.2, 7.2);
      group.position.z = THREE.MathUtils.clamp(nextZ, -7.2, 5.5);

      wheelsRef.current.forEach((w) => {
        if (w) w.rotation.x += moveDir * dt * 6;
      });
      batteryAccumRef.current += dt * 1.1;
      if (batteryAccumRef.current >= 0.4) {
        onBatteryDrain(batteryAccumRef.current);
        batteryAccumRef.current = 0;
      }
    }

    group.rotation.y = headingRef.current;

    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(group.position.x, 0.35, group.position.z),
        dt * 3.5
      );
      controlsRef.current.update();
    }

    for (const hz of HAZARDS) {
      const dx = group.position.x - hz.x;
      const dz = group.position.z - hz.z;
      if (dx * dx + dz * dz < (hz.r + 0.55) * (hz.r + 0.55) && hazardCooldownRef.current === 0) {
        hazardCooldownRef.current = 1.2;
        onHazardHit();
      }
    }

    let currentNear: string | null = null;
    for (const wp of WAYPOINTS) {
      const dx = group.position.x - wp.position[0];
      const dz = group.position.z - wp.position[2];
      if (dx * dx + dz * dz < 1.9 * 1.9) {
        currentNear = wp.id;
        if (lastNearWpRef.current !== currentNear) {
          onReachWaypoint(wp.id);
        }
        break;
      }
    }
    lastNearWpRef.current = currentNear;
  });

  return (
    <group ref={groupRef} position={[0, 0, 2.8]}>
      <ApolloLrv3DModel
        wheelsRef={wheelsRef}
        frontLeftSteerRef={frontLeftSteerRef}
        frontRightSteerRef={frontRightSteerRef}
        lowPerf={lowPerf}
      />
    </group>
  );
}

export default function ApolloLrvAdventureScene({
  lang,
  lowPerf,
  soundEnabled,
  completed,
  onComplete,
  resetSignal,
}: AdventureSceneProps) {
  const [visitedIds, setVisitedIds] = useState<LunarWaypoint['id'][]>([]);
  const [activeWaypointId, setActiveWaypointId] = useState<LunarWaypoint['id'] | null>(null);
  const [battery, setBattery] = useState(100);
  const [hazardWarning, setHazardWarning] = useState(false);
  const inputRef = useRef<DriveInput>({ ...INITIAL_INPUT });
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setVisitedIds([]);
    setActiveWaypointId(null);
    setBattery(100);
    setHazardWarning(false);
    inputRef.current = { ...INITIAL_INPUT };
  }, [resetSignal]);

  const handleReachWaypoint = (id: LunarWaypoint['id']) => {
    setActiveWaypointId(id);
    setHazardWarning(false);
    setVisitedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      playAdventureTone(soundEnabled, next.length === WAYPOINTS.length ? 'badge' : 'discover');
      if (next.length === WAYPOINTS.length) {
        onComplete();
      }
      return next;
    });
  };

  const handleHazardHit = () => {
    setHazardWarning(true);
    setBattery((prev) => Math.max(15, Number((prev - 4).toFixed(0))));
    playAdventureTone(soundEnabled, 'alert');
  };

  const handleBatteryDrain = (deltaPct: number) => {
    setBattery((prev) => Math.max(15, Number((prev - deltaPct * 0.25).toFixed(1))));
  };

  const activeWaypoint = useMemo(
    () => WAYPOINTS.find((w) => w.id === activeWaypointId) ?? null,
    [activeWaypointId]
  );

  const allDone = visitedIds.length === WAYPOINTS.length || completed;

  return (
    <div className="adventure-stage">
      <div className="adventure-hud-top">
        <div className="adventure-objective-pill">
          {lang === 'tr'
            ? `Görev: Kraterlerden kaçınarak 3 Ay istasyonuna ulaş (${visitedIds.length}/3) · Batarya: %${Math.round(battery)}`
            : `Mission: Avoid craters & reach 3 lunar stations (${visitedIds.length}/3) · Battery: ${Math.round(battery)}%`}
        </div>
        <div className="adventure-sample-chips">
          {WAYPOINTS.map((wp) => {
            const done = visitedIds.includes(wp.id);
            return (
              <button
                key={wp.id}
                type="button"
                className={`adventure-chip ${done ? 'is-found' : ''}`}
                onClick={() => handleReachWaypoint(wp.id)}
              >
                {done ? '✓' : '◎'} {lang === 'tr' ? wp.labelTr : wp.labelEn}
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
          camera={{ position: [0, 6.2, 8.8], fov: 46 }}
        >
          <color attach="background" args={['#06070c']} />
          <ambientLight intensity={0.6} color="#e5e9f0" />
          <directionalLight position={[8, 12, 4]} intensity={1.75} castShadow={!lowPerf} />

          {/* Lunar regolith surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!lowPerf}>
            <planeGeometry args={[28, 28, lowPerf ? 8 : 20, lowPerf ? 8 : 20]} />
            <meshStandardMaterial color="#6b707a" roughness={0.96} />
          </mesh>

          {/* Crater hazards */}
          {HAZARDS.map((hz, idx) => (
            <group key={idx} position={[hz.x, 0.03, hz.z]}>
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[hz.r * 0.45, hz.r, 20]} />
                <meshStandardMaterial color="#3f444e" roughness={1} />
              </mesh>
              <mesh position={[hz.r * 0.3, 0.25, 0]}>
                <dodecahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial color="#525864" roughness={0.9} />
              </mesh>
            </group>
          ))}

          <ApolloLrvMesh
            inputRef={inputRef}
            controlsRef={controlsRef}
            onReachWaypoint={handleReachWaypoint}
            onHazardHit={handleHazardHit}
            onBatteryDrain={handleBatteryDrain}
            lowPerf={lowPerf}
          />

          {WAYPOINTS.map((wp) => {
            const done = visitedIds.includes(wp.id);
            return (
              <group key={wp.id} position={wp.position}>
                <mesh
                  rotation={[-Math.PI / 2, 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReachWaypoint(wp.id);
                  }}
                >
                  <ringGeometry args={[0.9, 1.15, 24]} />
                  <meshBasicMaterial
                    color={done ? '#4ade80' : '#facc15'}
                    transparent
                    opacity={0.9}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                <mesh position={[0, 0.4, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
                  <meshStandardMaterial color="#e2e8f0" />
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
            ariaLabel={lang === 'tr' ? 'Apollo LRV sürüş kontrolleri' : 'Apollo LRV drive controls'}
          />
        </div>
      </div>

      {hazardWarning && (
        <div className="adventure-sim-notice">
          {lang === 'tr'
            ? 'Krater kenarına yaklaştın! Düşük Ay yer çekiminde kaymamak için kraterlerin etrafından dolaş.'
            : 'Crater hazard! Steer around craters and boulders to conserve battery and avoid skidding in 1/6th gravity.'}
        </div>
      )}

      {activeWaypoint && (
        <div className="adventure-discovery-card">
          <div className="adventure-discovery-header">
            <strong>{lang === 'tr' ? activeWaypoint.labelTr : activeWaypoint.labelEn}</strong>
            <span className="adventure-discovery-tag">APOLLO 15 / 16 / 17</span>
          </div>
          <p>{lang === 'tr' ? activeWaypoint.factTr : activeWaypoint.factEn}</p>
        </div>
      )}

      {allDone && (
        <div className="adventure-complete-banner">
          <div className="adventure-complete-icon">🌕</div>
          <div>
            <h4>
              {lang === 'tr'
                ? 'Ay yolculuğunu tamamladın — Ay Gezgini!'
                : 'Lunar expedition complete — Lunar Explorer!'}
            </h4>
            <p>
              {lang === 'tr'
                ? 'Elektrikli LRV ile kraterlerden kaçınarak tüm istasyonlara ulaştın ve düşük yer çekiminde keşif menzilinin nasıl katlandığını deneyimledin.'
                : 'You navigated around craters in the electric LRV to reach every station, experiencing how Apollo multiplied lunar exploration range.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
