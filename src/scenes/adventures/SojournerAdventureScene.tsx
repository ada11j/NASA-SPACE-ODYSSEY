import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { AdventureControlsPad, DriveInput } from '../../components/home/adventures/AdventureControlsPad';
import { playAdventureTone } from '../../utils/adventureAudio';
import { Sojourner3DModel } from './ExplorerVehicleModels';

export interface AdventureSceneProps {
  lang: 'tr' | 'en';
  lowPerf: boolean;
  soundEnabled: boolean;
  completed: boolean;
  onComplete: () => void;
  resetSignal: number;
}

interface RockQuestion {
  promptTr: string;
  promptEn: string;
  options: {
    id: 'a' | 'b' | 'c';
    textTr: string;
    textEn: string;
  }[];
  correctId: 'a' | 'b' | 'c';
  explainCorrectTr: string;
  explainCorrectEn: string;
  explainWrongTr: string;
  explainWrongEn: string;
}

interface ElementBar {
  symbol: string;
  nameTr: string;
  nameEn: string;
  levelLabelTr: string;
  levelLabelEn: string;
  barPct: number;
  color: string;
}

interface RockSample {
  id: 'barnacle-bill' | 'yogi' | 'scooby-doo';
  name: string;
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  titleTr: string;
  titleEn: string;
  apxsMetricTr: string;
  apxsMetricEn: string;
  elementSummaryTr: string;
  elementSummaryEn: string;
  elements: ElementBar[];
  factTr: string;
  factEn: string;
  question: RockQuestion;
}

interface SurpriseSpot {
  id: 'sagan-station' | 'flood-channel';
  position: [number, number, number];
  labelTr: string;
  labelEn: string;
  tagTr: string;
  tagEn: string;
  summaryTr: string;
  summaryEn: string;
  image?: string;
  imageCaptionTr?: string;
  imageCaptionEn?: string;
}

const ROCK_SAMPLES: RockSample[] = [
  {
    id: 'barnacle-bill',
    name: 'Barnacle Bill',
    position: [-4.2, 0.35, -3.5],
    scale: [0.85, 0.65, 0.75],
    color: '#8f523a',
    titleTr: 'Barnacle Bill Kayası',
    titleEn: 'Barnacle Bill Rock',
    apxsMetricTr: 'APXS Ölçümü: Yüksek Silika (SiO₂) ve Potasyum oranı',
    apxsMetricEn: 'APXS Reading: High Silica (SiO₂) & Potassium ratio',
    elementSummaryTr:
      'Silika oranının klasik bazalt kayalardan yüksek çıkması, kayanın geçmişte eriyip yeniden kristalleşen magmadan oluştuğunu gösterir.',
    elementSummaryEn:
      'Silica levels higher than typical basalt show this rock formed from magma that melted and evolved in stages.',
    elements: [
      {
        symbol: 'SiO₂',
        nameTr: 'Silika',
        nameEn: 'Silica',
        levelLabelTr: 'Yüksek (~%55)',
        levelLabelEn: 'High (~55%)',
        barPct: 78,
        color: '#38bdf8',
      },
      {
        symbol: 'FeO',
        nameTr: 'Demir Oksit',
        nameEn: 'Iron Oxide',
        levelLabelTr: 'Orta (~%14)',
        levelLabelEn: 'Moderate (~14%)',
        barPct: 42,
        color: '#f97316',
      },
      {
        symbol: 'Al₂O₃',
        nameTr: 'Alümina',
        nameEn: 'Alumina',
        levelLabelTr: 'Orta (~%12)',
        levelLabelEn: 'Moderate (~12%)',
        barPct: 36,
        color: '#a78bfa',
      },
    ],
    factTr:
      'Sojourner’ın APXS (Alfa Parçacık X-Işını Spektrometresi) cihazını yaslayarak elementlerini ölçtüğü ilk Mars kayası!',
    factEn:
      'The very first Mars rock analyzed up close with Sojourner’s APXS (Alpha Proton X-Ray Spectrometer)!',
    question: {
      promptTr: 'APXS bu kayada beklenenden yüksek silika ölçtü. Bu bilim insanlarına ne gösterdi?',
      promptEn: 'APXS measured higher silica than expected in this rock. What did that reveal?',
      options: [
        {
          id: 'a',
          textTr: 'Mars kabuğu volkanik süreçlerle farklılaşmış (andezit benzeri) kayalara da sahip',
          textEn: 'Mars’s crust underwent volcanic differentiation, forming silica-rich rocks',
        },
        {
          id: 'b',
          textTr: 'Kaya tamamen buzdan oluşuyor',
          textEn: 'The rock is made entirely of water ice',
        },
        {
          id: 'c',
          textTr: 'Mars’ta bugün aktif yağmur yağıyor',
          textEn: 'Liquid rain falls on Mars today',
        },
      ],
      correctId: 'a',
      explainCorrectTr:
        'Doğru! Yüksek silika oranı, Mars’ın yalnızca tek tip bazalt kayalardan oluşmadığını; kabuğun geçmişte karmaşık volkanik aşamalardan geçtiğini kanıtladı.',
      explainCorrectEn:
        'Correct! High silica proved Mars is not just simple basalt; its crust went through complex volcanic melting and differentiation.',
      explainWrongTr:
        'İpucu: Silika (SiO₂) kayaların eriyip yeniden kristalleşmesiyle zenginleşir; buz veya bugünkü yağmurla değil, volkanik kabuk evrimiyle ilgilidir.',
      explainWrongEn:
        'Hint: Silica enriches when magma melts and cools in stages — pointing to volcanic crust evolution rather than ice or modern rain.',
    },
  },
  {
    id: 'yogi',
    name: 'Yogi',
    position: [4.6, 0.55, -2.4],
    scale: [1.15, 0.95, 1.05],
    color: '#7c432d',
    titleTr: 'Yogi Kayası',
    titleEn: 'Yogi Rock',
    apxsMetricTr: 'APXS & Kamera: Bazaltik bileşim + rüzgârla aşınmış doku',
    apxsMetricEn: 'APXS & Camera: Basaltic composition + wind-sculpted texture',
    elementSummaryTr:
      'Demir ve magnezyumca zengin bazaltik yapısı, Ares Vallis’e uzak volkanik alanlardan dev taşkınlarla sürüklendiğini destekler.',
    elementSummaryEn:
      'Its iron- and magnesium-rich basaltic makeup supports being swept into Ares Vallis by ancient floods.',
    elements: [
      {
        symbol: 'SiO₂',
        nameTr: 'Silika',
        nameEn: 'Silica',
        levelLabelTr: 'Bazaltik (~%47)',
        levelLabelEn: 'Basaltic (~47%)',
        barPct: 64,
        color: '#38bdf8',
      },
      {
        symbol: 'FeO',
        nameTr: 'Demir Oksit',
        nameEn: 'Iron Oxide',
        levelLabelTr: 'Yüksek (~%18)',
        levelLabelEn: 'High (~18%)',
        barPct: 58,
        color: '#f97316',
      },
      {
        symbol: 'MgO',
        nameTr: 'Magnezyum',
        nameEn: 'Magnesium',
        levelLabelTr: 'Orta (~%9)',
        levelLabelEn: 'Moderate (~9%)',
        barPct: 34,
        color: '#4ade80',
      },
    ],
    factTr:
      'Büyük boyutlu bu kaya, Ares Vallis ovasındaki taşların kökenini anlamak için kritik bir hedef oldu.',
    factEn:
      'This large boulder became a key target for tracing where rocks across Ares Vallis came from.',
    question: {
      promptTr: 'Yogi gibi farklı kayaların aynı ovada toplanmış olması NASA’ya neyi doğrulattı?',
      promptEn: 'What did finding varied boulders like Yogi gathered on the same plain confirm?',
      options: [
        {
          id: 'a',
          textTr: 'Astronotların onları oraya bıraktığını',
          textEn: 'Astronauts placed them there manually',
        },
        {
          id: 'b',
          textTr: 'Ares Vallis’in antik dev sel taşkınlarıyla taşınmış kayalarla dolu olduğunu',
          textEn: 'Ares Vallis was shaped by giant ancient floods that carried rocks downstream',
        },
        {
          id: 'c',
          textTr: 'Mars’ta hiç rüzgâr esmediğini',
          textEn: 'Wind never blows on Mars',
        },
      ],
      correctId: 'b',
      explainCorrectTr:
        'Harika! NASA iniş alanı olarak Ares Vallis’i özellikle seçmişti çünkü antik taşkınlar farklı bölgelerden kayaları tek bir ovaya sürüklemişti.',
      explainCorrectEn:
        'Spot on! NASA chose Ares Vallis specifically because ancient catastrophic floods swept diverse rocks into one accessible plain.',
      explainWrongTr:
        'Tekrar dene: Ares Vallis antik bir taşkın kanalı ağzıdır ve Yogi’nin yüzeyi de rüzgâr erozyonunun izlerini taşır.',
      explainWrongEn:
        'Try again: Ares Vallis sits at the mouth of an ancient outflow channel, and Yogi’s surface also shows wind erosion.',
    },
  },
  {
    id: 'scooby-doo',
    name: 'Scooby-Doo',
    position: [0.8, 0.28, -5.8],
    scale: [0.95, 0.45, 0.85],
    color: '#a86544',
    titleTr: 'Scooby-Doo Katmanı',
    titleEn: 'Scooby-Doo Crust',
    apxsMetricTr: 'APXS & Tekerlek Testi: Çimentolaşmış ince taneli toprak kabuğu',
    apxsMetricEn: 'APXS & Wheel Test: Cemented fine-grained soil crust',
    elementSummaryTr:
      'Yüksek kükürt/sülfat ve kalsiyum izleri, ince Mars toprağının suyla taşınan tuzlar tarafından sertleştirildiğini gösterir.',
    elementSummaryEn:
      'Enriched sulfur/sulfates and calcium indicate fine Martian soil grains cemented together by water-borne salts.',
    elements: [
      {
        symbol: 'SiO₂',
        nameTr: 'Silika',
        nameEn: 'Silica',
        levelLabelTr: 'Toprak (~%45)',
        levelLabelEn: 'Soil (~45%)',
        barPct: 60,
        color: '#38bdf8',
      },
      {
        symbol: 'SO₃',
        nameTr: 'Sülfat / Kükürt',
        nameEn: 'Sulfates',
        levelLabelTr: 'Zengin (~%8)',
        levelLabelEn: 'Enriched (~8%)',
        barPct: 52,
        color: '#facc15',
      },
      {
        symbol: 'CaO',
        nameTr: 'Kalsiyum',
        nameEn: 'Calcium',
        levelLabelTr: 'Yüksek İz',
        levelLabelEn: 'Elevated',
        barPct: 44,
        color: '#22d3ee',
      },
    ],
    factTr:
      'Uzaktan beyazımsı bir kaya sanıldı; ancak tekerlek izi ve APXS analizi gerçeği ortaya çıkardı.',
    factEn:
      'From afar it looked like a pale rock, until wheel scuffs and APXS revealed what it really was.',
    question: {
      promptTr: 'Scooby-Doo incelendiğinde aslında ne olduğu anlaşıldı?',
      promptEn: 'What did close inspection reveal Scooby-Doo actually was?',
      options: [
        {
          id: 'a',
          textTr: 'Saf altından oluşan bir göktaşı',
          textEn: 'A meteorite made of pure gold',
        },
        {
          id: 'b',
          textTr: 'Sertleşmiş ve minerallerle çimentolaşmış bir toprak/çökelti kabuğu',
          textEn: 'A hardened soil crust cemented together by minerals',
        },
        {
          id: 'c',
          textTr: 'Aktif bir lav akıntısı',
          textEn: 'An active lava flow',
        },
      ],
      correctId: 'b',
      explainCorrectTr:
        'Kesinlikle! Toprak taneciklerini birbirine yapıştıran tuz ve mineraller, geçmişte bu bölgede suyun bulunduğunu gösteren önemli bir ipucuydu.',
      explainCorrectEn:
        'Exactly! Salts and minerals cementing soil grains together gave strong evidence that water once moved through the ground here.',
      explainWrongTr:
        'İpucu: Sojourner’ın tekerleği bu yapıyı çizemedi bile — minerallerin çimentoladığı sert bir toprak kabuğuydu.',
      explainWrongEn:
        'Hint: Sojourner’s wheel barely scratched it — it was a mineral-cemented soil crust rather than lava or metal.',
    },
  },
];

const SURPRISE_SPOTS: SurpriseSpot[] = [
  {
    id: 'sagan-station',
    position: [0, 0.16, 4.4],
    labelTr: 'Carl Sagan Anıt İstasyonu',
    labelEn: 'Carl Sagan Memorial Station',
    tagTr: 'KEŞİF SÜRPRİZİ · GERÇEK NASA FOTOĞRAFI',
    tagEn: 'DISCOVERY SURPRISE · REAL NASA PHOTO',
    summaryTr:
      '4 Temmuz 1997’de Pathfinder iniş aracı dev hava yastıklarıyla (airbag) Mars yüzeyine sekerek indi ve astronom Carl Sagan’ın anısına adlandırıldı. Sojourner bu rampadan inerek tarih yazdı.',
    summaryEn:
      'On July 4, 1997, Pathfinder bounced onto Mars inside giant airbags and was named after astronomer Carl Sagan. Sojourner rolled down this ramp into history.',
    image: '/assets/images/rovers/sojourner.jpg',
    imageCaptionTr: 'NASA/JPL (PIA01122): Sojourner, Yogi kayasını APXS ile incelerken.',
    imageCaptionEn: 'NASA/JPL (PIA01122): Sojourner analyzing Yogi rock with APXS.',
  },
  {
    id: 'flood-channel',
    position: [-5.4, 0.05, 1.4],
    labelTr: 'Antik Taşkın Kanalı İzi',
    labelEn: 'Ancient Flood Channel Trace',
    tagTr: 'KEŞİF SÜRPRİZİ · JEOLOJİK İPUCU',
    tagEn: 'DISCOVERY SURPRISE · GEOLOGY CLUE',
    summaryTr:
      'Milyarlarca yıl önce Ares Vallis’ten geçen sular Dünya’daki Amazon Nehri’nin yüzlerce katı debiye ulaşabiliyordu. Bugün gördüğümüz çakıl ve kaya dağılımı o dev taşkınların mirası.',
    summaryEn:
      'Billions of years ago, catastrophic floods carving Ares Vallis carried hundreds of times more water than the Amazon River, scattering the rocks we explore today.',
  },
];

const INITIAL_INPUT: DriveInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

function SojournerRoverMesh({
  inputRef,
  roverPosRef,
  controlsRef,
  onDriveMoved,
  onApproachSample,
  onApproachSurprise,
  scanTargetPos,
  lowPerf,
}: {
  inputRef: React.MutableRefObject<DriveInput>;
  roverPosRef: React.MutableRefObject<THREE.Vector3>;
  controlsRef: React.MutableRefObject<any>;
  onDriveMoved: () => void;
  onApproachSample: (id: RockSample['id']) => void;
  onApproachSurprise: (id: SurpriseSpot['id']) => void;
  scanTargetPos: [number, number, number] | null;
  lowPerf: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const rockerLeftRef = useRef<THREE.Group | null>(null);
  const rockerRightRef = useRef<THREE.Group | null>(null);
  const apxsGlowRef = useRef<THREE.Mesh>(null);
  const apxsBeamRef = useRef<THREE.Mesh>(null);
  const headingRef = useRef(Math.PI);
  const movedReportedRef = useRef(false);
  const lastNearIdRef = useRef<string | null>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const group = groupRef.current;
    if (!group) return;

    const isScanning = scanTargetPos !== null;

    if (scanTargetPos) {
      // Aim rear APXS (-Z local axis) toward target rock
      const dx = group.position.x - scanTargetPos[0];
      const dz = group.position.z - scanTargetPos[2];
      const desiredHeading = Math.atan2(dx, dz);
      let diff = desiredHeading - headingRef.current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      headingRef.current += diff * Math.min(1, dt * 6);
    } else {
      const { forward, backward, left, right } = inputRef.current;
      const turnSpeed = 2.15;
      const moveSpeed = 3.35;

      if (left) headingRef.current += turnSpeed * dt;
      if (right) headingRef.current -= turnSpeed * dt;

      let moveDir = 0;
      if (forward) moveDir += 1;
      if (backward) moveDir -= 1;

      if (moveDir !== 0) {
        const nextX = group.position.x + Math.sin(headingRef.current) * moveDir * moveSpeed * dt;
        const nextZ = group.position.z + Math.cos(headingRef.current) * moveDir * moveSpeed * dt;
        group.position.x = THREE.MathUtils.clamp(nextX, -7.2, 7.2);
        group.position.z = THREE.MathUtils.clamp(nextZ, -7.2, 5.5);

        wheelsRef.current.forEach((wheel) => {
          if (wheel) wheel.rotation.x += moveDir * dt * 6;
        });

        if (!movedReportedRef.current) {
          const distFromStart = Math.hypot(group.position.x - 0, group.position.z - 2.5);
          if (distFromStart >= 1.1) {
            movedReportedRef.current = true;
            onDriveMoved();
          }
        }
      }
    }

    group.rotation.y = headingRef.current;
    roverPosRef.current.copy(group.position);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(group.position.x, 0.3, group.position.z),
        dt * 3.5
      );
      controlsRef.current.update();
    }

    if (apxsGlowRef.current) {
      apxsGlowRef.current.visible = isScanning;
      if (isScanning && !lowPerf) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.22;
        apxsGlowRef.current.scale.set(s, s, s);
      }
    }

    if (apxsBeamRef.current) {
      apxsBeamRef.current.visible = isScanning;
      if (isScanning && !lowPerf) {
        apxsBeamRef.current.rotation.y = state.clock.elapsedTime * 4;
      }
    }

    if (!isScanning && !lowPerf) {
      const { forward, backward } = inputRef.current;
      const isMoving = forward || backward;
      const rockAngle = isMoving ? Math.sin(state.clock.elapsedTime * 8) * 0.045 : 0;
      if (rockerLeftRef.current) rockerLeftRef.current.rotation.x = rockAngle;
      if (rockerRightRef.current) rockerRightRef.current.rotation.x = -rockAngle;
    }

    let currentNearId: string | null = null;
    for (const sample of ROCK_SAMPLES) {
      const dx = group.position.x - sample.position[0];
      const dz = group.position.z - sample.position[2];
      if (dx * dx + dz * dz < 1.95 * 1.95) {
        currentNearId = `sample:${sample.id}`;
        if (lastNearIdRef.current !== currentNearId) {
          onApproachSample(sample.id);
        }
        break;
      }
    }

    if (!currentNearId) {
      for (const spot of SURPRISE_SPOTS) {
        const dx = group.position.x - spot.position[0];
        const dz = group.position.z - spot.position[2];
        if (dx * dx + dz * dz < 1.75 * 1.75) {
          currentNearId = `spot:${spot.id}`;
          if (lastNearIdRef.current !== currentNearId) {
            onApproachSurprise(spot.id);
          }
          break;
        }
      }
    }
    lastNearIdRef.current = currentNearId;
  });

  return (
    <group ref={groupRef} position={[0, 0, 2.5]}>
      <Sojourner3DModel
        wheelsRef={wheelsRef}
        rockerLeftRef={rockerLeftRef}
        rockerRightRef={rockerRightRef}
        apxsGlowRef={apxsGlowRef}
        apxsBeamRef={apxsBeamRef}
        lowPerf={lowPerf}
      />
    </group>
  );
}

function SampleBeacon({
  sample,
  analyzed,
  isSelected,
  onSelect,
  lowPerf,
}: {
  sample: RockSample;
  analyzed: boolean;
  isSelected: boolean;
  onSelect: (id: RockSample['id']) => void;
  lowPerf: boolean;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current && !lowPerf) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 1.4;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      ringRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={sample.position}>
      <mesh
        scale={sample.scale}
        castShadow={!lowPerf}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(sample.id);
        }}
      >
        <dodecahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          color={sample.color}
          roughness={0.88}
          metalness={0.08}
          emissive={analyzed ? '#1e6e48' : isSelected ? '#0284c7' : '#5e2410'}
          emissiveIntensity={analyzed ? 0.4 : isSelected ? 0.45 : 0.15}
        />
      </mesh>
      <mesh
        ref={ringRef}
        position={[0, -sample.position[1] + 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(sample.id);
        }}
      >
        <ringGeometry args={[0.95, 1.15, lowPerf ? 18 : 32]} />
        <meshBasicMaterial
          color={analyzed ? '#4ade80' : isSelected ? '#38bdf8' : '#ff9f43'}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function SojournerAdventureScene({
  lang,
  lowPerf,
  soundEnabled,
  completed,
  onComplete,
  resetSignal,
}: AdventureSceneProps) {
  const [hasDriven, setHasDriven] = useState(false);
  const [scannedIds, setScannedIds] = useState<RockSample['id'][]>([]);
  const [answeredIds, setAnsweredIds] = useState<RockSample['id'][]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState<RockSample['id'] | null>(null);
  const [scanningId, setScanningId] = useState<RockSample['id'] | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'a' | 'b' | 'c'>>({});
  const [discoveredSurprises, setDiscoveredSurprises] = useState<SurpriseSpot['id'][]>([]);
  const [activeSurpriseId, setActiveSurpriseId] = useState<SurpriseSpot['id'] | null>(null);
  const [freeExploreMode, setFreeExploreMode] = useState(false);

  const inputRef = useRef<DriveInput>({ ...INITIAL_INPUT });
  const roverPosRef = useRef(new THREE.Vector3(0, 0, 2.5));
  const controlsRef = useRef<any>(null);
  const scanTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (scanTimerRef.current) {
      window.clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    setHasDriven(false);
    setScannedIds([]);
    setAnsweredIds([]);
    setSelectedSampleId(null);
    setScanningId(null);
    setScanProgress(0);
    setSelectedAnswers({});
    setDiscoveredSurprises([]);
    setActiveSurpriseId(null);
    setFreeExploreMode(false);
    inputRef.current = { ...INITIAL_INPUT };
  }, [resetSignal]);

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) {
        window.clearInterval(scanTimerRef.current);
      }
    };
  }, []);

  const handleSelectSample = (id: RockSample['id']) => {
    setActiveSurpriseId(null);
    setSelectedSampleId(id);
    if (!hasDriven) {
      setHasDriven(true);
    }
  };

  const handleStartApxsScan = (id: RockSample['id']) => {
    if (scanningId === id) return;
    if (scanTimerRef.current) {
      window.clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    setScanningId(id);
    setScanProgress(10);
    playAdventureTone(soundEnabled, 'step');

    const stepMs = lowPerf ? 40 : 90;
    scanTimerRef.current = window.setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          if (scanTimerRef.current) {
            window.clearInterval(scanTimerRef.current);
            scanTimerRef.current = null;
          }
          setScanningId(null);
          setScannedIds((sPrev) => (sPrev.includes(id) ? sPrev : [...sPrev, id]));
          playAdventureTone(soundEnabled, 'discover');
          return 100;
        }
        return prev + 15;
      });
    }, stepMs);
  };

  const handleAnswerQuestion = (sample: RockSample, optionId: 'a' | 'b' | 'c') => {
    setSelectedAnswers((prev) => ({ ...prev, [sample.id]: optionId }));
    if (optionId === sample.question.correctId) {
      setAnsweredIds((prev) => {
        if (prev.includes(sample.id)) return prev;
        const next = [...prev, sample.id];
        const isLast = next.length === ROCK_SAMPLES.length;
        playAdventureTone(soundEnabled, isLast ? 'badge' : 'discover');
        if (isLast) {
          onComplete();
        }
        return next;
      });
    } else {
      playAdventureTone(soundEnabled, 'alert');
    }
  };

  const handleSelectSurprise = (id: SurpriseSpot['id']) => {
    setActiveSurpriseId(id);
    setSelectedSampleId(null);
    setDiscoveredSurprises((prev) => {
      if (prev.includes(id)) return prev;
      playAdventureTone(soundEnabled, 'discover');
      return [...prev, id];
    });
  };

  const activeSample = useMemo(
    () => ROCK_SAMPLES.find((s) => s.id === selectedSampleId) ?? null,
    [selectedSampleId]
  );

  const activeSurprise = useMemo(
    () => SURPRISE_SPOTS.find((s) => s.id === activeSurpriseId) ?? null,
    [activeSurpriseId]
  );

  const allSamplesCompleted = answeredIds.length === ROCK_SAMPLES.length || completed;
  const totalStepsDone = (hasDriven ? 1 : 0) + scannedIds.length + answeredIds.length;
  const totalStepsGoal = 1 + ROCK_SAMPLES.length * 2;
  const progressPct = allSamplesCompleted
    ? 100
    : Math.round((totalStepsDone / totalStepsGoal) * 100);

  const commsMessage = useMemo(() => {
    if (allSamplesCompleted) {
      return lang === 'tr'
        ? '“Harika ekip çalışması! 3 kaya örneğinin tamamını APXS ile analiz edip verileri Dünya’ya ilettik.”'
        : '“Great teamwork! We analyzed all 3 rock targets with APXS and beamed the data back to Earth.”';
    }
    if (scanningId) {
      return lang === 'tr'
        ? '“APXS sensörünü kayaya yaklaştırıyorum... Alfa parçacıkları element oranlarını okuyor!”'
        : '“Positioning the APXS sensor against the rock... Reading elemental ratios!”';
    }
    if (activeSample && !scannedIds.includes(activeSample.id)) {
      return lang === 'tr'
        ? `“${activeSample.name} hedefine ulaştık! Şimdi aşağıdaki ‘APXS Taramasını Başlat’ butonuna bas.”`
        : `“We reached ${activeSample.name}! Press ‘Start APXS Scan’ below to analyze its chemistry.”`;
    }
    if (!hasDriven) {
      return lang === 'tr'
        ? '“Merhaba! Ben Sojourner. Pathfinder rampasından indim — yön tuşlarıyla veya dokunmatik pedle beni sür ve parlayan kayalara yaklaş!”'
        : '“Hi! I’m Sojourner. I just rolled off Pathfinder’s ramp — drive me toward the glowing rocks using keys or the touch pad!”';
    }
    return lang === 'tr'
      ? `“Ares Vallis’te ilerliyoruz! İncelenecek ${ROCK_SAMPLES.length - answeredIds.length} kaya örneği kaldı. Turkuaz işaretli sürpriz noktalara da uğrayabilirsin.”`
      : `“Rolling across Ares Vallis! ${ROCK_SAMPLES.length - answeredIds.length} rock target(s) left. You can also check the cyan surprise landmarks.”`;
  }, [
    allSamplesCompleted,
    scanningId,
    activeSample,
    scannedIds,
    hasDriven,
    answeredIds.length,
    lang,
  ]);

  return (
    <div className="adventure-stage">
      {/* Comms Speech Bubble */}
      <div className="sojourner-comms-bubble" aria-live="polite">
        <span className="sojourner-comms-avatar" aria-hidden="true">
          🛰️
        </span>
        <div className="sojourner-comms-text">
          <strong>SOJOURNER · ARES VALLIS</strong>
          <p>{commsMessage}</p>
        </div>
      </div>

      {/* Mission Checklist & Visual Progress */}
      <div className="adventure-hud-top">
        <div className="sojourner-mission-progress">
          <div className="sojourner-mission-progress__head">
            <span>
              {lang === 'tr' ? `Görev İlerlemesi: %${progressPct}` : `Mission Progress: ${progressPct}%`}
            </span>
            <span>
              {lang === 'tr'
                ? `Sürprizler: ${discoveredSurprises.length}/${SURPRISE_SPOTS.length}`
                : `Surprises: ${discoveredSurprises.length}/${SURPRISE_SPOTS.length}`}
            </span>
          </div>
          <div className="sojourner-progress-track" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="sojourner-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="sojourner-checklist">
            <span className={`sojourner-task ${hasDriven || allSamplesCompleted ? 'is-done' : ''}`}>
              {hasDriven || allSamplesCompleted ? '✓' : '1.'}{' '}
              {lang === 'tr' ? 'Ares Vallis’te sürüş yap' : 'Drive across Ares Vallis'}
            </span>
            <span className={`sojourner-task ${scannedIds.length === 3 || allSamplesCompleted ? 'is-done' : ''}`}>
              {scannedIds.length === 3 || allSamplesCompleted ? '✓' : '2.'}{' '}
              {lang === 'tr'
                ? `APXS taraması (${scannedIds.length}/3)`
                : `APXS scans (${scannedIds.length}/3)`}
            </span>
            <span className={`sojourner-task ${allSamplesCompleted ? 'is-done' : ''}`}>
              {allSamplesCompleted ? '✓' : '3.'}{' '}
              {lang === 'tr'
                ? `Bilimsel analiz (${answeredIds.length}/3)`
                : `Science checks (${answeredIds.length}/3)`}
            </span>
          </div>
        </div>

        <div className="adventure-sample-chips">
          {ROCK_SAMPLES.map((s) => {
            const done = answeredIds.includes(s.id);
            const scanned = scannedIds.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                className={`adventure-chip ${done ? 'is-found' : ''}`}
                onClick={() => handleSelectSample(s.id)}
              >
                <span>{done ? '✓' : scanned ? '🔬' : '◎'}</span> {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="adventure-canvas-wrap">
        <Canvas
          key={resetSignal}
          dpr={lowPerf ? 1 : [1, 1.5]}
          shadows={!lowPerf}
          camera={{ position: [0, 6.2, 8.5], fov: 46 }}
        >
          <color attach="background" args={['#1d110c']} />
          <fog attach="fog" args={['#1d110c', 12, 26]} />
          <ambientLight intensity={0.75} color="#ffd8b8" />
          <directionalLight
            position={[7, 10, 6]}
            intensity={1.65}
            color="#fff0dc"
            castShadow={!lowPerf}
          />

          {/* Ares Vallis terrain */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!lowPerf}>
            <planeGeometry args={[28, 28, lowPerf ? 8 : 24, lowPerf ? 8 : 24]} />
            <meshStandardMaterial color="#87452a" roughness={0.95} metalness={0.04} />
          </mesh>

          {/* Pathfinder / Carl Sagan Memorial Station landmark */}
          <group position={[0, 0.16, 4.4]}>
            <mesh
              receiveShadow={!lowPerf}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSurprise('sagan-station');
              }}
            >
              <cylinderGeometry args={[1.25, 1.5, 0.32, 6]} />
              <meshStandardMaterial color="#68707d" metalness={0.5} roughness={0.45} />
            </mesh>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.12, 0]}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSurprise('sagan-station');
              }}
            >
              <ringGeometry args={[1.65, 1.85, 24]} />
              <meshBasicMaterial
                color={discoveredSurprises.includes('sagan-station') ? '#4ade80' : '#22d3ee'}
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Optional Surprise 2: Ancient Flood Channel Trace */}
          <group position={[-5.4, 0.05, 1.4]}>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSurprise('flood-channel');
              }}
            >
              <ringGeometry args={[0.85, 1.05, 24]} />
              <meshBasicMaterial
                color={discoveredSurprises.includes('flood-channel') ? '#4ade80' : '#22d3ee'}
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          <SojournerRoverMesh
            inputRef={inputRef}
            roverPosRef={roverPosRef}
            controlsRef={controlsRef}
            onDriveMoved={() => setHasDriven(true)}
            onApproachSample={handleSelectSample}
            onApproachSurprise={handleSelectSurprise}
            scanTargetPos={
              scanningId
                ? ROCK_SAMPLES.find((s) => s.id === scanningId)?.position ?? null
                : null
            }
            lowPerf={lowPerf}
          />

          {ROCK_SAMPLES.map((sample) => (
            <SampleBeacon
              key={sample.id}
              sample={sample}
              analyzed={answeredIds.includes(sample.id)}
              isSelected={selectedSampleId === sample.id}
              onSelect={handleSelectSample}
              lowPerf={lowPerf}
            />
          ))}

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
            ariaLabel={lang === 'tr' ? 'Sojourner sürüş kontrolleri' : 'Sojourner drive controls'}
          />
        </div>
      </div>

      {/* Interactive APXS & Science Question Panel */}
      {activeSample && (
        <div className="adventure-discovery-card">
          <div className="adventure-discovery-header">
            <strong>{lang === 'tr' ? activeSample.titleTr : activeSample.titleEn}</strong>
            <span className="adventure-discovery-tag">APXS LABORATUVARI</span>
          </div>
          <p>{lang === 'tr' ? activeSample.factTr : activeSample.factEn}</p>

          {!scannedIds.includes(activeSample.id) || scanningId === activeSample.id ? (
            <div className="sojourner-apxs-action">
              <button
                type="button"
                className="story-nav-btn"
                disabled={scanningId === activeSample.id}
                onClick={() => handleStartApxsScan(activeSample.id)}
              >
                {scanningId === activeSample.id
                  ? lang === 'tr'
                    ? `🔬 APXS Tarıyor... %${Math.min(100, scanProgress)}`
                    : `🔬 Scanning with APXS... ${Math.min(100, scanProgress)}%`
                  : lang === 'tr'
                  ? '🔬 APXS Taramasını Başlat'
                  : '🔬 Start APXS Scan'}
              </button>
              {scanningId === activeSample.id && (
                <div className="sojourner-scan-progress-wrap">
                  <div className="sojourner-progress-track">
                    <div
                      className="sojourner-progress-fill"
                      style={{ width: `${Math.min(100, scanProgress)}%` }}
                    />
                  </div>
                </div>
              )}
              <small>
                {lang === 'tr'
                  ? 'APXS: Aracın arkasındaki sensörü kayaya doğrultup alfa parçacıklarıyla element oranlarını ölçer.'
                  : 'APXS: Aims the rear spectrometer at the rock to measure chemical elements with alpha particles.'}
              </small>
            </div>
          ) : (
            <div className="sojourner-quiz-box">
              <div className="sojourner-apxs-reading">
                <span>📡</span>
                <strong>
                  {lang === 'tr' ? activeSample.apxsMetricTr : activeSample.apxsMetricEn}
                </strong>
              </div>

              {/* Simplified Educational Element Analysis */}
              <div className="sojourner-elements-panel">
                <div className="sojourner-elements-head">
                  <span>
                    {lang === 'tr'
                      ? 'Basitleştirilmiş Element Analizi'
                      : 'Simplified Elemental Analysis'}
                  </span>
                  <small>
                    {lang === 'tr'
                      ? 'Eğitim amaçlı simüle ölçüm (Mars Pathfinder APXS bulgularına dayalı)'
                      : 'Educational simulated reading (based on Mars Pathfinder APXS data)'}
                  </small>
                </div>
                <div className="sojourner-elements-bars">
                  {activeSample.elements.map((el) => (
                    <div key={el.symbol} className="sojourner-element-row">
                      <div className="sojourner-element-label">
                        <strong>{el.symbol}</strong>
                        <span>{lang === 'tr' ? el.nameTr : el.nameEn}</span>
                        <small>{lang === 'tr' ? el.levelLabelTr : el.levelLabelEn}</small>
                      </div>
                      <div className="sojourner-element-track">
                        <div
                          className="sojourner-element-fill"
                          style={{ width: `${el.barPct}%`, backgroundColor: el.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="sojourner-element-explain">
                  {lang === 'tr' ? activeSample.elementSummaryTr : activeSample.elementSummaryEn}
                </p>
                {freeExploreMode && (
                  <button
                    type="button"
                    className="adventure-tool-btn"
                    onClick={() => handleStartApxsScan(activeSample.id)}
                  >
                    {lang === 'tr' ? '🔬 APXS Taramasını Tekrarla' : '🔬 Re-run APXS Scan'}
                  </button>
                )}
              </div>

              <p className="sojourner-quiz-prompt">
                {lang === 'tr' ? activeSample.question.promptTr : activeSample.question.promptEn}
              </p>
              <div className="sojourner-quiz-options">
                {activeSample.question.options.map((opt) => {
                  const chosen = selectedAnswers[activeSample.id] === opt.id;
                  const isCorrect = opt.id === activeSample.question.correctId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`sojourner-quiz-option ${
                        chosen ? (isCorrect ? 'is-correct' : 'is-wrong') : ''
                      }`}
                      onClick={() => handleAnswerQuestion(activeSample, opt.id)}
                    >
                      {lang === 'tr' ? opt.textTr : opt.textEn}
                    </button>
                  );
                })}
              </div>
              {selectedAnswers[activeSample.id] && (
                <p
                  className={`sojourner-quiz-feedback ${
                    selectedAnswers[activeSample.id] === activeSample.question.correctId
                      ? 'is-correct'
                      : 'is-wrong'
                  }`}
                >
                  {selectedAnswers[activeSample.id] === activeSample.question.correctId
                    ? lang === 'tr'
                      ? activeSample.question.explainCorrectTr
                      : activeSample.question.explainCorrectEn
                    : lang === 'tr'
                    ? activeSample.question.explainWrongTr
                    : activeSample.question.explainWrongEn}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Optional Discovery Surprise Card (with real NASA photo when available) */}
      {activeSurprise && (
        <div className="adventure-discovery-card sojourner-surprise-card">
          <div className="adventure-discovery-header">
            <strong>{lang === 'tr' ? activeSurprise.labelTr : activeSurprise.labelEn}</strong>
            <span className="adventure-discovery-tag">
              {lang === 'tr' ? activeSurprise.tagTr : activeSurprise.tagEn}
            </span>
          </div>
          <div className="sojourner-surprise-body">
            {activeSurprise.image && (
              <figure className="sojourner-surprise-figure">
                <img
                  src={activeSurprise.image}
                  alt={
                    lang === 'tr'
                      ? activeSurprise.imageCaptionTr
                      : activeSurprise.imageCaptionEn
                  }
                />
                <figcaption>
                  {lang === 'tr'
                    ? activeSurprise.imageCaptionTr
                    : activeSurprise.imageCaptionEn}
                </figcaption>
              </figure>
            )}
            <p>{lang === 'tr' ? activeSurprise.summaryTr : activeSurprise.summaryEn}</p>
          </div>
        </div>
      )}

      {/* Enhanced End-of-Mission Summary Screen + Free Exploration Toggle */}
      {allSamplesCompleted && !freeExploreMode && (
        <div className="adventure-complete-banner sojourner-debrief">
          <div className="adventure-complete-icon">🏅</div>
          <div className="sojourner-debrief__content">
            <div className="sojourner-debrief__top">
              <h4>
                {lang === 'tr'
                  ? 'İlk Mars keşfini tamamladın!'
                  : 'You completed the first Mars exploration!'}
              </h4>
              <span className="sojourner-badge-earned">
                {lang === 'tr' ? 'Rozet: Mars’ın İlk Kâşifi' : 'Badge: Mars’ First Explorer'}
              </span>
            </div>

            <div className="sojourner-debrief__grid">
              <div className="sojourner-debrief__box">
                <strong>{lang === 'tr' ? 'İncelenen Örnekler' : 'Analyzed Samples'}</strong>
                <ul>
                  <li>✓ Barnacle Bill</li>
                  <li>✓ Yogi</li>
                  <li>✓ Scooby-Doo</li>
                </ul>
              </div>
              <div className="sojourner-debrief__box">
                <strong>{lang === 'tr' ? 'Tamamlanan Görevler' : 'Completed Tasks'}</strong>
                <ul>
                  <li>✓ {lang === 'tr' ? 'Ares Vallis sürüşü' : 'Ares Vallis drive'}</li>
                  <li>✓ {lang === 'tr' ? '3 APXS element taraması' : '3 APXS elemental scans'}</li>
                  <li>✓ {lang === 'tr' ? '3 bilimsel analiz sorusu' : '3 science analysis checks'}</li>
                </ul>
              </div>
            </div>

            <div className="sojourner-real-facts">
              <strong>
                {lang === 'tr'
                  ? 'Gerçek NASA Görevinden 3 İlginç Bilgi'
                  : '3 Real NASA Mission Facts'}
              </strong>
              <ul>
                <li>
                  {lang === 'tr'
                    ? '4 Temmuz 1997: Pathfinder dev hava yastıklarıyla Mars’a sekerek inen ilk araç oldu.'
                    : 'July 4, 1997: Pathfinder became the first spacecraft to bounce onto Mars inside giant airbags.'}
                </li>
                <li>
                  {lang === 'tr'
                    ? '10.6 kg & ~65 cm: Sojourner yalnızca bir mikrodalga fırın büyüklüğündeydi.'
                    : '10.6 kg & ~65 cm: Sojourner was roughly the size of a microwave oven.'}
                </li>
                <li>
                  {lang === 'tr'
                    ? '83 Sol: Yalnızca 7 Mars günü için tasarlanmıştı ama 83 sol boyunca veri gönderdi.'
                    : '83 Sols: Designed for just 7 Martian days, it operated for 83 sols until September 1997.'}
                </li>
              </ul>
            </div>

            <div className="sojourner-free-explore-bar">
              <button
                type="button"
                className="story-nav-btn"
                onClick={() => setFreeExploreMode(true)}
              >
                {lang === 'tr'
                  ? '🧭 Serbest Keşfe Geç (Rozet & İlerleme Korunur)'
                  : '🧭 Enter Free Exploration (Keeps Badge & Progress)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {allSamplesCompleted && freeExploreMode && (
        <div className="sojourner-free-explore-pill">
          <span>
            🧭{' '}
            {lang === 'tr'
              ? 'Serbest Keşif Modu Aktif — Rozetin korundu! Kayaları ve sürpriz noktaları özgürce tekrar inceleyebilirsin.'
              : 'Free Exploration Mode Active — Your badge is saved! Freely revisit rocks and surprise landmarks.'}
          </span>
          <button
            type="button"
            className="adventure-tool-btn"
            onClick={() => setFreeExploreMode(false)}
          >
            {lang === 'tr' ? '🏅 Görev Raporunu Göster' : '🏅 Show Mission Debrief'}
          </button>
        </div>
      )}
    </div>
  );
}
