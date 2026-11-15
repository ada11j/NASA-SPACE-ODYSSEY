import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AdventureSceneProps } from './SojournerAdventureScene';
import { playAdventureTone } from '../../utils/adventureAudio';
import { Ingenuity3DModel } from './ExplorerVehicleModels';

type FlightPhase = 'landed' | 'airborne';

function IngenuityModel({
  targetAlt,
  phase,
  lowPerf,
  controlsRef,
  onTelemetry,
}: {
  targetAlt: number;
  phase: FlightPhase;
  lowPerf: boolean;
  controlsRef: React.MutableRefObject<any>;
  onTelemetry: (alt: number, timeDelta: number) => void;
}) {
  const heliRef = useRef<THREE.Group>(null);
  const topRotorRef = useRef<THREE.Group | null>(null);
  const bottomRotorRef = useRef<THREE.Group | null>(null);
  const altRef = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const heli = heliRef.current;
    if (!heli) return;

    const goal = phase === 'airborne' ? targetAlt : 0;
    altRef.current = THREE.MathUtils.lerp(altRef.current, goal, dt * 2.2);
    if (Math.abs(altRef.current - goal) < 0.02) {
      altRef.current = goal;
    }

    const hoverBob =
      phase === 'airborne' && !lowPerf ? Math.sin(state.clock.elapsedTime * 3.2) * 0.05 : 0;
    heli.position.y = altRef.current + hoverBob;

    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(0, altRef.current + 0.5, 0),
        dt * 3
      );
      controlsRef.current.update();
    }

    const rpmSpeed = phase === 'airborne' ? 28 : 0.8;
    if (topRotorRef.current) topRotorRef.current.rotation.y += rpmSpeed * dt;
    if (bottomRotorRef.current) bottomRotorRef.current.rotation.y -= rpmSpeed * dt;

    onTelemetry(altRef.current, phase === 'airborne' ? dt : 0);
  });

  return (
    <group ref={heliRef} position={[0, 0, 0]}>
      <Ingenuity3DModel
        topRotorRef={topRotorRef}
        bottomRotorRef={bottomRotorRef}
        lowPerf={lowPerf}
      />
    </group>
  );
}

function PerseveranceNearby({ lowPerf }: { lowPerf: boolean }) {
  return (
    <group position={[-4.5, 0, -2.5]} rotation={[0, 0.55, 0]}>
      <mesh position={[0, 0.65, 0]} castShadow={!lowPerf}>
        <boxGeometry args={[1.25, 0.5, 1.75]} />
        <meshStandardMaterial color="#e3e7ed" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.25, 0.55]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 10]} />
        <meshStandardMaterial color="#c8ced8" />
      </mesh>
      <mesh position={[0, 1.65, 0.55]}>
        <boxGeometry args={[0.35, 0.22, 0.26]} />
        <meshStandardMaterial color="#edf1f7" />
      </mesh>
      {[
        [-0.75, 0.25, 0.65],
        [-0.75, 0.25, 0],
        [-0.75, 0.25, -0.65],
        [0.75, 0.25, 0.65],
        [0.75, 0.25, 0],
        [0.75, 0.25, -0.65],
      ].map((pos, idx) => (
        <mesh
          key={idx}
          position={pos as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.25, 0.25, 0.16, 12]} />
          <meshStandardMaterial color="#2e343d" />
        </mesh>
      ))}
    </group>
  );
}

export default function IngenuityAdventureScene({
  lang,
  lowPerf,
  soundEnabled,
  completed,
  onComplete,
  resetSignal,
}: AdventureSceneProps) {
  const [phase, setPhase] = useState<FlightPhase>('landed');
  const [targetAlt, setTargetAlt] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [flightTime, setFlightTime] = useState(0);
  const [reachedPeak, setReachedPeak] = useState(false);
  const [landedSafely, setLandedSafely] = useState(false);
  const [earlyLandHint, setEarlyLandHint] = useState(false);
  const lastUiSyncRef = useRef(0);
  const flightTimeRef = useRef(0);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setPhase('landed');
    setTargetAlt(0);
    setAltitude(0);
    setFlightTime(0);
    setReachedPeak(false);
    setLandedSafely(false);
    setEarlyLandHint(false);
    flightTimeRef.current = 0;
    lastUiSyncRef.current = 0;
  }, [resetSignal]);

  const handleTelemetry = (currentAlt: number, dt: number) => {
    if (dt > 0) {
      flightTimeRef.current += dt;
    }
    lastUiSyncRef.current += dt > 0 ? dt : 0.016;
    if (lastUiSyncRef.current >= 0.14) {
      lastUiSyncRef.current = 0;
      setAltitude(Number(currentAlt.toFixed(1)));
      if (dt > 0) {
        setFlightTime(Number(flightTimeRef.current.toFixed(1)));
      }
    }
    if (currentAlt >= 2.8 && !reachedPeak) {
      setReachedPeak(true);
      setEarlyLandHint(false);
    }
  };

  const handleTakeoff = () => {
    setEarlyLandHint(false);
    setPhase('airborne');
    setTargetAlt(2.0);
    playAdventureTone(soundEnabled, 'step');
  };

  const handleAscend = () => {
    setEarlyLandHint(false);
    setPhase('airborne');
    setTargetAlt((prev) => Math.min(5.0, prev + 1.5));
    playAdventureTone(soundEnabled, 'discover');
  };

  const handleDescend = () => {
    setTargetAlt((prev) => Math.max(1.0, prev - 1.5));
    playAdventureTone(soundEnabled, 'step');
  };

  const handleLand = () => {
    setPhase('landed');
    setTargetAlt(0);
    if (reachedPeak) {
      setLandedSafely(true);
      setEarlyLandHint(false);
      playAdventureTone(soundEnabled, 'badge');
      onComplete();
    } else {
      setEarlyLandHint(true);
      playAdventureTone(soundEnabled, 'alert');
    }
  };

  const allDone = landedSafely || completed;

  return (
    <div className="adventure-stage">
      <div className="adventure-sim-notice">
        {lang === 'tr'
          ? 'Not: Bu sahne gerçek uçuş fiziği değil, atmosfer ve rotor mantığını öğreten basitleştirilmiş bir eğitim simülasyonudur.'
          : 'Note: This scene is a simplified educational simulation designed to teach Mars atmosphere and rotor concepts, not real flight physics.'}
      </div>

      <div className="adventure-hud-top">
        <div className="adventure-objective-pill">
          {lang === 'tr'
            ? 'Görev: Kalkış yap, en az 3.0 m yüksekliğe çık ve güvenli iniş yap.'
            : 'Mission: Take off, ascend to at least 3.0 m, and land safely.'}
        </div>
        <div className="adventure-sample-chips">
          <span className={`adventure-chip ${reachedPeak ? 'is-found' : ''}`}>
            {reachedPeak ? '✓' : '◎'} {lang === 'tr' ? '3m+ İrtifa' : '3m+ Altitude'}
          </span>
          <span className={`adventure-chip ${allDone ? 'is-found' : ''}`}>
            {allDone ? '✓' : '◎'} {lang === 'tr' ? 'Güvenli İniş' : 'Safe Landing'}
          </span>
        </div>
      </div>

      <div className="adventure-canvas-wrap">
        <Canvas
          key={resetSignal}
          dpr={lowPerf ? 1 : [1, 1.5]}
          shadows={!lowPerf}
          camera={{ position: [4.2, 3.6, 6.2], fov: 48 }}
        >
          <color attach="background" args={['#1c110d']} />
          <fog attach="fog" args={['#1c110d', 12, 28]} />
          <ambientLight intensity={0.75} color="#ffdcc4" />
          <directionalLight position={[6, 11, 5]} intensity={1.6} castShadow={!lowPerf} />

          {/* Jezero Crater floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!lowPerf}>
            <planeGeometry args={[32, 32, lowPerf ? 8 : 20, lowPerf ? 8 : 20]} />
            <meshStandardMaterial color="#8a4b32" roughness={0.95} />
          </mesh>

          {/* Wright Brothers Field airfield marker */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[1.4, 1.55, 28]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
          </mesh>

          <IngenuityModel
            targetAlt={targetAlt}
            phase={phase}
            lowPerf={lowPerf}
            controlsRef={controlsRef}
            onTelemetry={handleTelemetry}
          />
          <PerseveranceNearby lowPerf={lowPerf} />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={3.5}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>

        <div className="adventure-flight-deck">
          <div className="adventure-flight-buttons">
            <button
              type="button"
              className="adventure-flight-btn"
              disabled={phase === 'airborne'}
              onClick={handleTakeoff}
            >
              🛫 {lang === 'tr' ? 'Kalkış' : 'Takeoff'}
            </button>
            <button
              type="button"
              className="adventure-flight-btn"
              disabled={phase === 'landed' || targetAlt >= 5}
              onClick={handleAscend}
            >
              ⬆ {lang === 'tr' ? 'Yüksel' : 'Ascend'}
            </button>
            <button
              type="button"
              className="adventure-flight-btn"
              disabled={phase === 'landed' || targetAlt <= 1}
              onClick={handleDescend}
            >
              ⬇ {lang === 'tr' ? 'Alçal' : 'Descend'}
            </button>
            <button
              type="button"
              className="adventure-flight-btn"
              disabled={phase === 'landed'}
              onClick={handleLand}
            >
              🛬 {lang === 'tr' ? 'İniş' : 'Land'}
            </button>
          </div>

          <div className="adventure-telemetry-box">
            <div className="adventure-telemetry-item">
              <span>{lang === 'tr' ? 'İrtifa' : 'Altitude'}</span>
              <strong>{altitude.toFixed(1)} m</strong>
            </div>
            <div className="adventure-telemetry-item">
              <span>{lang === 'tr' ? 'Uçuş Süresi' : 'Flight Time'}</span>
              <strong>{flightTime.toFixed(1)} s</strong>
            </div>
            <div className="adventure-telemetry-item">
              <span>{lang === 'tr' ? 'Atmosfer' : 'Atmosphere'}</span>
              <strong>~%1 Dünya</strong>
            </div>
          </div>
        </div>
      </div>

      {earlyLandHint && (
        <div className="adventure-sim-notice">
          {lang === 'tr'
            ? 'İpucu: Görevi tamamlamak için iniş yapmadan önce "Yüksel" düğmesiyle en az 3.0 m irtifaya çık!'
            : 'Tip: Use "Ascend" to reach at least 3.0 m altitude before landing to complete the mission!'}
        </div>
      )}

      <div className="adventure-discovery-card">
        <div className="adventure-discovery-header">
          <strong>
            {lang === 'tr'
              ? 'Neden Mars’ta Uçmak Bu Kadar Zor?'
              : 'Why Is Flying on Mars So Challenging?'}
          </strong>
          <span className="adventure-discovery-tag">72 UÇUŞ</span>
        </div>
        <p>
          {lang === 'tr'
            ? 'Mars atmosferinin yoğunluğu Dünya’nın yaklaşık %1’i kadardır. Ingenuity bu yüzden geniş karbon-fiber kanatlarını dakikada ~2.500 devirle döndürerek kaldırma kuvveti üretir.'
            : 'Mars’s atmosphere is only ~1% as dense as Earth’s. Ingenuity spins its wide carbon-fiber rotors at ~2,500 RPM to generate enough lift.'}
        </p>
        <p className="adventure-science-note">
          <span>{lang === 'tr' ? 'Tarihi Başarı: ' : 'Historic Milestone: '}</span>
          {lang === 'tr'
            ? '19 Nisan 2021’de başka bir gezegende ilk motorlu uçuşu gerçekleştirdi ve toplam 72 uçuş tamamladı.'
            : 'Completed the first powered aerodynamic flight on another planet on April 19, 2021, eventually logging 72 flights.'}
        </p>
      </div>

      {allDone && (
        <div className="adventure-complete-banner">
          <div className="adventure-complete-icon">🚁</div>
          <div>
            <h4>
              {lang === 'tr'
                ? 'İlk Mars uçuşunu başarıyla yönettin!'
                : 'You successfully piloted the first Mars flight!'}
            </h4>
            <p>
              {lang === 'tr'
                ? 'Wright Kardeşler Sahası’nda havalanıp güvenli iniş yaparak İlk Uçuş Pilotu rozetini kazandın.'
                : 'You lifted off from Wright Brothers Field and landed safely to earn the First Flight Pilot badge.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
