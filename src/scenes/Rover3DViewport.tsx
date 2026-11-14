import { Suspense, useRef } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Group } from 'three';
import { ROVER_3D_ARCHITECTURES } from '@/data/rover3dLabData';
import type { RoverId } from '@/types';

export interface Rover3DViewportProps {
  roverId: RoverId;
  selectedPartId: string;
  autoRotate: boolean;
  onSelectPart: (partId: string) => void;
}

const CLEAT_ANGLES = Array.from({ length: 16 }, (_, i) => (i * Math.PI * 2) / 16);
const SPOKE_ANGLES = Array.from({ length: 6 }, (_, i) => (i * Math.PI * 2) / 6);
const MMRTG_FIN_ANGLES = Array.from({ length: 8 }, (_, i) => (i * Math.PI * 2) / 8);

/**
 * High-detail multi-part 3D engineering model of the 4 Mars Rovers:
 * - Spirit (MER-A) & Opportunity (MER-B): Gold Kapton Warm Electronics Box,
 *   multi-panel butterfly triple-junction solar wings with cell grid seams,
 *   Pancam Mast Assembly (PMA) with stereo Pancam/Navcam bar + Mini-TES periscope,
 *   5-DOF Instrument Deployment Device (IDD) with 4-tool cross turret (RAT/MI/MB/APXS),
 *   MarsDial calibration target, and 6 cleated wheels on articulated Rocker-Bogie links.
 * - Curiosity (MSL) & Perseverance (Mars 2020): White/cream monocoque chassis with
 *   exposed thermal fluid tubes, angled 8-fin MMRTG nuclear generator at the stern,
 *   Remote Sensing Mast (RSM) with ChemCam/SuperCam cyclops head + Mastcam/Mastcam-Z
 *   + REMS/MEDA wind booms, heavy 5-DOF robotic arm with rotary-percussive drill &
 *   SHERLOC/PIXL/MAHLI turret, and Perseverance's belly-stowed Ingenuity & RIMFAX.
 */
function RoverDetailedModel({
  roverId,
  selectedPartId,
  autoRotate,
  onSelectPart,
}: Rover3DViewportProps) {
  const rootRef = useRef<Group>(null);
  const beaconRef = useRef<Group>(null);
  const arch = ROVER_3D_ARCHITECTURES[roverId];
  const isMer = arch.chassisFamily === 'mer-solar';
  const isPerseverance = arch.chassisFamily === 'm2020-nuclear';
  const isSpirit = roverId === 'spirit';

  const activePart =
    arch.parts.find((p) => p.id === selectedPartId) ?? arch.parts[0];

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    if (autoRotate && rootRef.current) {
      rootRef.current.rotation.y += dt * 0.2;
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.z += dt * 1.4;
    }
  });

  const handleMeshClick = (partId: string) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectPart(partId);
  };

  const highlightEmissive = (partId: string) =>
    selectedPartId === partId ? '#e2643a' : '#000000';
  const highlightIntensity = (partId: string) =>
    selectedPartId === partId ? 0.52 : 0;

  // 6 wheel coordinates: [x (front/mid/rear), y, z (left/right)]
  const wheelCoords: Array<{ x: number; y: number; z: number; isCorner: boolean }> = isMer
    ? [
        { x: 0.88, y: -0.46, z: 0.72, isCorner: true },
        { x: -0.02, y: -0.46, z: 0.78, isCorner: false },
        { x: -0.88, y: -0.46, z: 0.72, isCorner: true },
        { x: 0.88, y: -0.46, z: -0.72, isCorner: true },
        { x: -0.02, y: -0.46, z: -0.78, isCorner: false },
        { x: -0.88, y: -0.46, z: -0.72, isCorner: true },
      ]
    : [
        { x: 1.06, y: -0.46, z: 0.84, isCorner: true },
        { x: 0.0, y: -0.46, z: 0.9, isCorner: false },
        { x: -1.06, y: -0.46, z: 0.84, isCorner: true },
        { x: 1.06, y: -0.46, z: -0.84, isCorner: true },
        { x: 0.0, y: -0.46, z: -0.9, isCorner: false },
        { x: -1.06, y: -0.46, z: -0.84, isCorner: true },
      ];

  const wheelRadius = isMer ? 0.22 : isPerseverance ? 0.295 : 0.275;
  const wheelWidth = isMer ? 0.165 : isPerseverance ? 0.21 : 0.245;

  return (
    <group ref={rootRef}>
      {/* Martian Surface Terrain Pedestal with Rock Outcrops & Telemetry Ring */}
      <group>
        <mesh position={[0, -0.76, 0]} receiveShadow>
          <cylinderGeometry args={[2.45, 2.62, 0.09, 64]} />
          <meshStandardMaterial color="#2c1610" roughness={0.95} metalness={0.04} />
        </mesh>
        {/* Subtle Martian rocks & wheel track grooves on pedestal */}
        <mesh position={[0.55, -0.7, 0.45]} rotation={[0.2, 0.5, 0.1]}>
          <dodecahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color="#4a261b" roughness={0.92} />
        </mesh>
        <mesh position={[-0.78, -0.71, -0.35]} rotation={[0.4, 0.2, 0.3]}>
          <dodecahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial color="#3d1e15" roughness={0.92} />
        </mesh>
        <mesh position={[0, -0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.3, 2.36, 72]} />
          <meshBasicMaterial color="#e2643a" transparent opacity={0.38} />
        </mesh>
      </group>

      {/* =====================================================================
          1. MOBILITY: 6 CLEATED WHEELS + ARTICULATED ROCKER-BOGIE SUSPENSION
         ===================================================================== */}
      <group onClick={handleMeshClick('wheels')}>
        {wheelCoords.map((w, idx) => {
          const sideSign = w.z > 0 ? 1 : -1;
          return (
            <group key={`wheel-${idx}`} position={[w.x, w.y, w.z]}>
              {/* Outer Cylindrical Tire Drum */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 36]} />
                <meshStandardMaterial
                  color="#1b2028"
                  roughness={0.62}
                  metalness={0.52}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* 16 Radial Traction Cleats / Grousers around each wheel */}
              {CLEAT_ANGLES.map((angle, cIdx) => (
                <mesh
                  key={`cleat-${cIdx}`}
                  position={[
                    Math.cos(angle) * (wheelRadius + 0.006),
                    Math.sin(angle) * (wheelRadius + 0.006),
                    0,
                  ]}
                  rotation={[0, 0, angle]}
                >
                  <boxGeometry args={[0.014, 0.022, wheelWidth * 0.96]} />
                  <meshStandardMaterial
                    color={isPerseverance ? '#cbd5e1' : '#64748b'}
                    metalness={0.75}
                    roughness={0.3}
                    emissive={highlightEmissive('wheels')}
                    emissiveIntensity={highlightIntensity('wheels')}
                  />
                </mesh>
              ))}

              {/* Recessed Inner Rim Cavity */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry
                  args={[wheelRadius * 0.76, wheelRadius * 0.76, wheelWidth * 1.02, 28]}
                />
                <meshStandardMaterial
                  color="#0f141c"
                  roughness={0.8}
                  metalness={0.3}
                />
              </mesh>

              {/* 6 Radial Structural Spokes / MER Spiral Flexures */}
              {SPOKE_ANGLES.map((sAngle, sIdx) => (
                <mesh
                  key={`spoke-${sIdx}`}
                  rotation={[0, 0, sAngle + (isMer ? 0.25 : 0)]}
                >
                  <boxGeometry
                    args={[wheelRadius * 1.42, 0.026, wheelWidth * 1.05]}
                  />
                  <meshStandardMaterial
                    color={
                      isMer
                        ? '#d4a23c'
                        : isPerseverance
                          ? '#e2e8f0'
                          : '#94a3b8'
                    }
                    metalness={0.78}
                    roughness={0.28}
                    emissive={highlightEmissive('wheels')}
                    emissiveIntensity={highlightIntensity('wheels')}
                  />
                </mesh>
              ))}

              {/* Central Planetary Gear Hubcap */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry
                  args={[wheelRadius * 0.34, wheelRadius * 0.34, wheelWidth * 1.12, 20]}
                />
                <meshStandardMaterial
                  color={isMer ? '#eab308' : '#cbd5e1'}
                  metalness={0.82}
                  roughness={0.22}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* Corner Wheel Vertical Steering Actuator Bracket & C-Yoke */}
              {w.isCorner && (
                <group>
                  <mesh position={[0, wheelRadius + 0.12, -sideSign * 0.05]}>
                    <cylinderGeometry args={[0.036, 0.036, 0.24, 16]} />
                    <meshStandardMaterial
                      color="#94a3b8"
                      metalness={0.75}
                      roughness={0.28}
                      emissive={highlightEmissive('wheels')}
                      emissiveIntensity={highlightIntensity('wheels')}
                    />
                  </mesh>
                  {/* Steering Motor Cap */}
                  <mesh position={[0, wheelRadius + 0.25, -sideSign * 0.05]}>
                    <cylinderGeometry args={[0.046, 0.046, 0.08, 16]} />
                    <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
                  </mesh>
                </group>
              )}
            </group>
          );
        })}

        {/* Articulated Left & Right Rocker-Bogie Linkages */}
        {[-1, 1].map((side) => {
          const zTube = side * (isMer ? 0.62 : 0.73);
          const frontX = isMer ? 0.88 : 1.06;
          const midX = isMer ? -0.02 : 0.0;
          const rearX = isMer ? -0.88 : -1.06;
          return (
            <group key={`rocker-bogie-${side}`}>
              {/* Main Differential Pivot Hub on Chassis Flank */}
              <mesh position={[0.18, -0.04, zTube * 0.92]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.075, 0.075, 0.14, 20]} />
                <meshStandardMaterial
                  color="#cbd5e1"
                  metalness={0.8}
                  roughness={0.25}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* Forward Rocker Arm (From Chassis Pivot down to Front Wheel Steering Yoke) */}
              <mesh
                position={[(0.18 + frontX) / 2, -0.09, zTube]}
                rotation={[0, 0, -0.22]}
              >
                <boxGeometry args={[isMer ? 0.78 : 0.95, 0.055, 0.055]} />
                <meshStandardMaterial
                  color={isMer ? '#cbd5e1' : '#e2e8f0'}
                  metalness={0.78}
                  roughness={0.26}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* Rear Rocker Link (From Chassis Pivot back to Bogie Pivot Joint) */}
              <mesh
                position={[-0.14, -0.1, zTube]}
                rotation={[0, 0, 0.25]}
              >
                <boxGeometry args={[0.68, 0.055, 0.055]} />
                <meshStandardMaterial
                  color={isMer ? '#cbd5e1' : '#e2e8f0'}
                  metalness={0.78}
                  roughness={0.26}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* Bogie Pivot Joint Housing (Between Middle and Rear Wheels) */}
              <mesh position={[-0.44, -0.18, zTube]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.1, 18]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.75} roughness={0.25} />
              </mesh>

              {/* Bogie Forward Strut (Bogie Pivot to Middle Wheel) */}
              <mesh
                position={[(-0.44 + midX) / 2, -0.28, zTube]}
                rotation={[0, 0, -0.38]}
              >
                <boxGeometry args={[0.52, 0.046, 0.046]} />
                <meshStandardMaterial
                  color="#94a3b8"
                  metalness={0.75}
                  roughness={0.28}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>

              {/* Bogie Aft Strut (Bogie Pivot to Rear Wheel Steering Yoke) */}
              <mesh
                position={[(-0.44 + rearX) / 2, -0.22, zTube]}
                rotation={[0, 0, 0.16]}
              >
                <boxGeometry args={[isMer ? 0.52 : 0.68, 0.046, 0.046]} />
                <meshStandardMaterial
                  color="#94a3b8"
                  metalness={0.75}
                  roughness={0.28}
                  emissive={highlightEmissive('wheels')}
                  emissiveIntensity={highlightIntensity('wheels')}
                />
              </mesh>
            </group>
          );
        })}

        {/* Top Deck Differential Crossbar & Center Pivot */}
        <mesh position={[0.05, isMer ? 0.24 : 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, isMer ? 1.18 : 1.38, 16]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.8}
            roughness={0.25}
            emissive={highlightEmissive('wheels')}
            emissiveIntensity={highlightIntensity('wheels')}
          />
        </mesh>
      </group>

      {/* =====================================================================
          2. CHASSIS CORE (WARM ELECTRONICS BOX) & INTERNAL SCIENCE PAYLOADS
         ===================================================================== */}
      <group onClick={handleMeshClick('science')}>
        {/* Main Avionics & Lab Chassis Body */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={isMer ? [1.16, 0.38, 0.88] : [1.72, 0.48, 1.14]} />
          <meshStandardMaterial
            color={isMer ? '#d49b27' : '#e8ecf4'}
            metalness={isMer ? 0.82 : 0.32}
            roughness={isMer ? 0.26 : 0.38}
            emissive={highlightEmissive('science')}
            emissiveIntensity={highlightIntensity('science')}
          />
        </mesh>

        {/* Lower Belly Pan & Structural Frame Longerons */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={isMer ? [1.08, 0.07, 0.8] : [1.62, 0.08, 1.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.65} roughness={0.35} />
        </mesh>

        {/* Gold Kapton Thermal Foils / Side Heat-Exchanger Fluid Tubes */}
        {[-1, 1].map((side) => (
          <group key={`flank-${side}`}>
            <mesh position={[0.1, 0.02, side * (isMer ? 0.45 : 0.58)]}>
              <boxGeometry args={[isMer ? 0.95 : 1.48, 0.14, 0.025]} />
              <meshStandardMaterial
                color="#eab308"
                metalness={0.85}
                roughness={0.22}
                emissive={highlightEmissive('science')}
                emissiveIntensity={highlightIntensity('science')}
              />
            </mesh>
          </group>
        ))}

        {/* Front Stereo Hazcam Pair (Mounted low on front chassis bulkhead) */}
        {[-0.18, 0.18].map((hz, i) => (
          <mesh
            key={`hazcam-${i}`}
            position={[isMer ? 0.6 : 0.88, -0.08, hz]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.028, 0.028, 0.05, 14]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}

        {/* Top Deck Science Inlets / Calibration Targets */}
        {isMer ? (
          /* MER MarsDial Sundial Calibration Target on Rear Deck */
          <group position={[-0.42, 0.24, 0.3]}>
            <mesh>
              <cylinderGeometry args={[0.055, 0.055, 0.025, 20]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.035, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
              <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ) : (
          /* Curiosity SAM/CheMin Sample Funnels OR Perseverance Caching Carousel + Belly Ingenuity */
          <group>
            <mesh position={[0.25, 0.26, -0.15]}>
              <cylinderGeometry args={[0.14, 0.18, 0.06, 24]} />
              <meshStandardMaterial
                color="#334155"
                metalness={0.7}
                roughness={0.3}
                emissive={highlightEmissive('science')}
                emissiveIntensity={highlightIntensity('science')}
              />
            </mesh>
            {[-0.08, 0.08].map((fx, i) => (
              <mesh key={`funnel-${i}`} position={[0.25 + fx, 0.3, -0.15]}>
                <cylinderGeometry args={[0.035, 0.02, 0.04, 16]} />
                <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.25} />
              </mesh>
            ))}

            {/* Perseverance specific: Belly-stowed Ingenuity Helicopter coaxial rotors silhouette */}
            {isPerseverance && (
              <group position={[0.05, -0.29, 0]}>
                <mesh>
                  <boxGeometry args={[0.16, 0.08, 0.16]} />
                  <meshStandardMaterial color="#eab308" metalness={0.85} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.03, 0]}>
                  <boxGeometry args={[0.68, 0.012, 0.05]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
                </mesh>
              </group>
            )}
          </group>
        )}
      </group>

      {/* =====================================================================
          3. POWER SYSTEM: MER BUTTERFLY SOLAR PANELS vs MSL/M2020 8-FIN MMRTG
         ===================================================================== */}
      <group onClick={handleMeshClick('power')}>
        {isMer ? (
          <group position={[-0.06, 0.2, 0]}>
            {/* Central Deck Solar Panel */}
            <mesh>
              <boxGeometry args={[1.22, 0.032, 0.94]} />
              <meshStandardMaterial
                color={isSpirit ? '#1e3a5f' : '#162d54'}
                metalness={0.68}
                roughness={0.22}
                emissive={highlightEmissive('power')}
                emissiveIntensity={highlightIntensity('power')}
              />
            </mesh>

            {/* Left & Right Spread Butterfly Solar Wings */}
            {[-1, 1].map((side) => (
              <group
                key={`solar-wing-${side}`}
                position={[-0.04, -0.01, side * 0.84]}
                rotation={[side * 0.05, 0, 0]}
              >
                <mesh>
                  <boxGeometry args={[1.14, 0.028, 0.74]} />
                  <meshStandardMaterial
                    color="#1a3668"
                    metalness={0.72}
                    roughness={0.2}
                    emissive={highlightEmissive('power')}
                    emissiveIntensity={highlightIntensity('power')}
                  />
                </mesh>
                {/* Silver Perimeter Frame Seam */}
                <mesh position={[0, 0.016, 0]}>
                  <boxGeometry args={[1.12, 0.004, 0.02]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.016, side * 0.22]}>
                  <boxGeometry args={[1.12, 0.004, 0.015]} />
                  <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
                </mesh>
              </group>
            ))}

            {/* Rear Tail Solar Flap */}
            <mesh position={[-0.88, -0.01, 0]} rotation={[0, 0, 0.07]}>
              <boxGeometry args={[0.56, 0.028, 0.78]} />
              <meshStandardMaterial
                color="#1a3668"
                metalness={0.72}
                roughness={0.2}
                emissive={highlightEmissive('power')}
                emissiveIntensity={highlightIntensity('power')}
              />
            </mesh>
          </group>
        ) : (
          /* Curiosity & Perseverance Rear Cantilevered MMRTG with 8 Radial Cooling Fins */
          <group position={[-1.18, 0.24, 0]} rotation={[0, 0, -0.52]}>
            {/* Central Cylindrical Plutonium-238 Housing */}
            <mesh>
              <cylinderGeometry args={[0.2, 0.22, 0.78, 24]} />
              <meshStandardMaterial
                color="#f1f5f9"
                metalness={0.38}
                roughness={0.35}
                emissive={highlightEmissive('power')}
                emissiveIntensity={highlightIntensity('power')}
              />
            </mesh>

            {/* Aft Dome Cap */}
            <mesh position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.2, 20, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* 8 Radial Heat-Rejection Cooling Fins */}
            {MMRTG_FIN_ANGLES.map((angle, finIdx) => (
              <mesh
                key={`mmrtg-fin-${finIdx}`}
                rotation={[0, angle, 0]}
              >
                <boxGeometry args={[0.58, 0.7, 0.022]} />
                <meshStandardMaterial
                  color="#dbe4f0"
                  metalness={0.48}
                  roughness={0.32}
                  emissive={highlightEmissive('power')}
                  emissiveIntensity={highlightIntensity('power')}
                />
              </mesh>
            ))}

            {/* Protective Rear Tubular Truss Guards */}
            {[-0.32, 0.32].map((gz, i) => (
              <mesh key={`guard-${i}`} position={[0.1, 0.05, gz]}>
                <cylinderGeometry args={[0.022, 0.022, 0.82, 12]} />
                <meshStandardMaterial color="#64748b" metalness={0.75} roughness={0.3} />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* =====================================================================
          4. CAMERA MAST (PMA / RSM), STEREO OPTICS & CHEMCAM / SUPERCAM HEAD
         ===================================================================== */}
      <group
        position={isMer ? [0.46, 0.22, 0.2] : [0.58, 0.24, 0.3]}
        onClick={handleMeshClick('cameras')}
      >
        {/* Basal Mast Turret & Mini-TES Periscope Window */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.095, 0.11, 0.14, 20]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Main Vertical Mast Column */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.052, 0.064, 0.82, 20]} />
          <meshStandardMaterial
            color={isMer ? '#e2e8f0' : '#f1f5f9'}
            metalness={0.5}
            roughness={0.34}
            emissive={highlightEmissive('cameras')}
            emissiveIntensity={highlightIntensity('cameras')}
          />
        </mesh>

        {/* REMS (Curiosity) or MEDA (Perseverance) Horizontal Atmospheric Wind Sensor Booms */}
        {!isMer && (
          <group position={[0.05, 0.48, 0]}>
            <mesh position={[0.12, 0.04, 0.06]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.024, 0.24, 12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0.02, -0.05, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.018, 0.024, 0.22, 12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* Camera Head Assembly */}
        <group position={[0.04, 0.88, 0]}>
          {/* Stereo Navigation & Mastcam Bar */}
          <mesh>
            <boxGeometry args={isMer ? [0.16, 0.12, 0.56] : [0.22, 0.16, 0.48]} />
            <meshStandardMaterial
              color="#f8fafc"
              metalness={0.38}
              roughness={0.32}
              emissive={highlightEmissive('cameras')}
              emissiveIntensity={highlightIntensity('cameras')}
            />
          </mesh>

          {/* 4 Stereo Lenses Along the Horizontal Camera Bar (2 Pancam/Mastcam + 2 Navcam) */}
          {[-0.21, -0.09, 0.09, 0.21].map((lz, i) => (
            <mesh
              key={`bar-lens-${i}`}
              position={[isMer ? 0.09 : 0.12, 0, lz]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[i === 0 || i === 3 ? 0.032 : 0.024, i === 0 || i === 3 ? 0.032 : 0.024, 0.05, 16]}
              />
              <meshStandardMaterial color="#0f172a" metalness={0.92} roughness={0.1} />
            </mesh>
          ))}

          {/* Curiosity ChemCam OR Perseverance SuperCam Upper Cyclops Laser Unit */}
          {!isMer && (
            <group position={[0.02, 0.16, 0]}>
              <mesh>
                <boxGeometry args={[0.26, 0.16, 0.26]} />
                <meshStandardMaterial
                  color="#f8fafc"
                  metalness={0.35}
                  roughness={0.32}
                  emissive={highlightEmissive('cameras')}
                  emissiveIntensity={highlightIntensity('cameras')}
                />
              </mesh>
              {/* Gold/Dark Blue Cyclops Telescope Objective Mirror */}
              <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.068, 0.068, 0.04, 24]} />
                <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.08} />
              </mesh>
              <mesh position={[0.155, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <ringGeometry args={[0.052, 0.068, 24]} />
                <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* =====================================================================
          5. 5-DOF ARTICULATED ROBOTIC ARM & MULTI-INSTRUMENT TURRET
         ===================================================================== */}
      <group
        position={isMer ? [0.6, -0.02, -0.14] : [0.86, 0.02, -0.18]}
        onClick={handleMeshClick('arm')}
      >
        {/* Shoulder Azimuth/Elevation Base Mount on Front Bulkhead */}
        <mesh>
          <cylinderGeometry args={[0.075, 0.085, 0.16, 18]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.75}
            roughness={0.28}
            emissive={highlightEmissive('arm')}
            emissiveIntensity={highlightIntensity('arm')}
          />
        </mesh>

        {/* Upper Arm Boom + Parallel Cable Harness */}
        <group position={[0.24, 0.08, 0]} rotation={[0, 0, -0.32]}>
          <mesh>
            <cylinderGeometry args={[0.038, 0.042, 0.56, 16]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.62}
              roughness={0.3}
              emissive={highlightEmissive('arm')}
              emissiveIntensity={highlightIntensity('arm')}
            />
          </mesh>
          <mesh position={[0.045, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.52, 10]} />
            <meshStandardMaterial color="#d97706" metalness={0.75} roughness={0.3} />
          </mesh>
        </group>

        {/* Elbow Joint Actuator Drum */}
        <mesh position={[0.48, 0.16, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.13, 18]} />
          <meshStandardMaterial color="#334155" metalness={0.75} roughness={0.28} />
        </mesh>

        {/* Forearm Boom Reaching Forward & Downward */}
        <mesh position={[0.66, -0.05, 0.08]} rotation={[0.16, 0, 0.52]}>
          <cylinderGeometry args={[0.035, 0.038, 0.54, 16]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.68}
            roughness={0.28}
            emissive={highlightEmissive('arm')}
            emissiveIntensity={highlightIntensity('arm')}
          />
        </mesh>

        {/* Multi-Instrument Turret at Wrist (RAT/MI/MB/APXS OR Drill/SHERLOC/PIXL/MAHLI) */}
        <group position={[0.84, -0.24, 0.14]}>
          {/* Central Wrist Rotation Hub */}
          <mesh>
            <cylinderGeometry
              args={isMer ? [0.13, 0.13, 0.14, 20] : [0.21, 0.21, 0.18, 24]}
            />
            <meshStandardMaterial
              color="#334155"
              metalness={0.78}
              roughness={0.25}
              emissive={highlightEmissive('arm')}
              emissiveIntensity={highlightIntensity('arm')}
            />
          </mesh>

          {/* 4 Radial Scientific Instrument Housings Around the Turret Cross */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((tAngle, tIdx) => (
            <mesh
              key={`turret-tool-${tIdx}`}
              position={[
                Math.cos(tAngle) * (isMer ? 0.14 : 0.2),
                0,
                Math.sin(tAngle) * (isMer ? 0.14 : 0.2),
              ]}
              rotation={[0, -tAngle, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[isMer ? 0.042 : 0.062, isMer ? 0.038 : 0.055, 0.14, 16]}
              />
              <meshStandardMaterial
                color={tIdx === 0 ? '#eab308' : '#94a3b8'}
                metalness={0.8}
                roughness={0.25}
                emissive={highlightEmissive('arm')}
                emissiveIntensity={highlightIntensity('arm')}
              />
            </mesh>
          ))}

          {/* Downward Coring Drill / Rock Abrasion Bit & Dual Contact Stabilizer Prongs */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.024, 0.01, 0.18, 14]} />
            <meshStandardMaterial color="#e2643a" metalness={0.85} roughness={0.18} />
          </mesh>
          {!isMer &&
            [-0.06, 0.06].map((px, i) => (
              <mesh key={`prong-${i}`} position={[px, -0.14, 0.04]}>
                <cylinderGeometry args={[0.01, 0.01, 0.16, 10]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.2} />
              </mesh>
            ))}
        </group>
      </group>

      {/* =====================================================================
          6. ANTENNAS: GIMBALED X-BAND HGA DISH, UHF MONOPOLE & LGA MAST
         ===================================================================== */}
      <group
        position={isMer ? [-0.26, 0.23, -0.3] : [-0.42, 0.26, -0.42]}
        onClick={handleMeshClick('antennas')}
      >
        {/* HGA Gimbal Pedestal */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.032, 0.042, 0.16, 14]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.3} />
        </mesh>

        {/* High-Gain X-Band Steerable Hexagonal/Octagonal Flat-Panel Dish */}
        <group position={[0, 0.2, 0]} rotation={[0.42, 0.32, 0]}>
          <mesh>
            <cylinderGeometry args={[0.19, 0.19, 0.032, 8]} />
            <meshStandardMaterial
              color="#eab308"
              metalness={0.76}
              roughness={0.24}
              emissive={highlightEmissive('antennas')}
              emissiveIntensity={highlightIntensity('antennas')}
            />
          </mesh>
          <mesh position={[0, 0.022, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.01, 8]} />
            <meshStandardMaterial color="#fef08a" metalness={0.65} roughness={0.28} />
          </mesh>
        </group>

        {/* Low-Gain Omnidirectional Antenna (LGA) Mast */}
        <group position={[-0.18, 0.24, 0.18]}>
          <mesh>
            <cylinderGeometry args={[0.016, 0.02, 0.46, 12]} />
            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.75}
              roughness={0.28}
              emissive={highlightEmissive('antennas')}
              emissiveIntensity={highlightIntensity('antennas')}
            />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.034, 0.022, 0.07, 14]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>

        {/* UHF Orbital Relay Cylinder Antenna */}
        <mesh position={[-0.24, 0.22, 0.56]}>
          <cylinderGeometry args={[0.042, 0.042, 0.42, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.62}
            roughness={0.35}
            emissive={highlightEmissive('antennas')}
            emissiveIntensity={highlightIntensity('antennas')}
          />
        </mesh>
      </group>

      {/* 3D Selection Target Beacon Ring around the active subsystem */}
      <group ref={beaconRef} position={activePart.position}>
        <mesh>
          <ringGeometry args={[0.24, 0.295, 36]} />
          <meshBasicMaterial color="#ff8a5b" transparent opacity={0.92} />
        </mesh>
      </group>
    </group>
  );
}

export function Rover3DViewport(props: Rover3DViewportProps) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [2.85, 1.68, 2.95], fov: 40 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.68} color="#dbe8ff" />
        <directionalLight position={[5, 6, 4]} intensity={2.2} color="#fff2e2" />
        <directionalLight position={[-4, 3, -4]} intensity={0.85} color="#6ea0ff" />

        <RoverDetailedModel {...props} />

        <OrbitControls
          enablePan={false}
          minDistance={2.05}
          maxDistance={5.5}
          maxPolarAngle={Math.PI / 2 + 0.08}
        />
      </Suspense>
    </Canvas>
  );
}

export default Rover3DViewport;
