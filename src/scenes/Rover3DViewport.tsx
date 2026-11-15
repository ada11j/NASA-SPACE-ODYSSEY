import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Quaternion, Vector3, type Group } from 'three';
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
const UP_AXIS = new Vector3(0, 1, 0);

interface MechanicalLinkProps {
  from: [number, number, number];
  to: [number, number, number];
  radiusTop?: number;
  radiusBottom?: number;
  radius?: number;
  color: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  radialSegments?: number;
  withCollars?: boolean;
  collarColor?: string;
}

/**
 * Precision point-to-point structural tube/link that mathematically guarantees
 * its start cap sits at `from` and its end cap sits at `to` using quaternion alignment.
 */
function MechanicalLink({
  from,
  to,
  radiusTop,
  radiusBottom,
  radius = 0.032,
  color,
  metalness = 0.72,
  roughness = 0.28,
  emissive = '#000000',
  emissiveIntensity = 0,
  radialSegments = 16,
  withCollars = false,
  collarColor = '#475569',
}: MechanicalLinkProps) {
  const rTop = radiusTop ?? radius;
  const rBottom = radiusBottom ?? radius;

  const { position, quaternion, length } = useMemo(() => {
    const vFrom = new Vector3(from[0], from[1], from[2]);
    const vTo = new Vector3(to[0], to[1], to[2]);
    const diff = vTo.clone().sub(vFrom);
    const len = Math.max(diff.length(), 0.0001);
    const mid = vFrom.clone().add(vTo).multiplyScalar(0.5);
    const dir = diff.normalize();
    const quat = new Quaternion().setFromUnitVectors(UP_AXIS, dir);
    return {
      position: [mid.x, mid.y, mid.z] as [number, number, number],
      quaternion: quat,
      length: len,
    };
  }, [from[0], from[1], from[2], to[0], to[1], to[2]]);

  const collarOffset = Math.max(length * 0.5 - 0.025, 0);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <cylinderGeometry args={[rTop, rBottom, length, radialSegments]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {withCollars && length > 0.1 && (
        <>
          <mesh position={[0, collarOffset, 0]}>
            <cylinderGeometry args={[rTop * 1.22, rTop * 1.22, 0.028, radialSegments]} />
            <meshStandardMaterial
              color={collarColor}
              metalness={0.8}
              roughness={0.25}
              emissive={emissive}
              emissiveIntensity={emissiveIntensity * 0.7}
            />
          </mesh>
          <mesh position={[0, -collarOffset, 0]}>
            <cylinderGeometry args={[rBottom * 1.22, rBottom * 1.22, 0.028, radialSegments]} />
            <meshStandardMaterial
              color={collarColor}
              metalness={0.8}
              roughness={0.25}
              emissive={emissive}
              emissiveIntensity={emissiveIntensity * 0.7}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

interface MechanicalJointProps {
  position: [number, number, number];
  axis?: 'x' | 'y' | 'z';
  radius: number;
  width: number;
  color?: string;
  capColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
}

/**
 * Rotary actuator joint housing with bearing end-caps and internal spherical union
 * so incoming and outgoing links meet seamlessly at any angle.
 */
function MechanicalJoint({
  position,
  axis = 'z',
  radius,
  width,
  color = '#334155',
  capColor = '#eab308',
  emissive = '#000000',
  emissiveIntensity = 0,
}: MechanicalJointProps) {
  const rotation: [number, number, number] =
    axis === 'z'
      ? [Math.PI / 2, 0, 0]
      : axis === 'x'
        ? [0, 0, Math.PI / 2]
        : [0, 0, 0];

  return (
    <group position={position}>
      {/* Spherical core guarantees zero gap for angled incoming tubes */}
      <mesh>
        <sphereGeometry args={[radius * 0.92, 18, 18]} />
        <meshStandardMaterial
          color={color}
          metalness={0.78}
          roughness={0.26}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Main cylindrical harmonic-drive actuator drum */}
      <mesh rotation={rotation}>
        <cylinderGeometry args={[radius, radius, width, 20]} />
        <meshStandardMaterial
          color={color}
          metalness={0.78}
          roughness={0.25}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Machined bearing end-caps */}
      <mesh rotation={rotation}>
        <cylinderGeometry args={[radius * 0.66, radius * 0.66, width * 1.14, 16]} />
        <meshStandardMaterial
          color={capColor}
          metalness={0.85}
          roughness={0.22}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity * 0.6}
        />
      </mesh>
    </group>
  );
}

/**
 * High-detail multi-part 3D engineering model of the 4 Mars Rovers:
 * - Spirit (MER-A) & Opportunity (MER-B): Gold Kapton Warm Electronics Box,
 *   multi-panel butterfly triple-junction solar wings with cell grid seams,
 *   Pancam Mast Assembly (PMA) with stereo Pancam/Navcam bar + Mini-TES periscope,
 *   connected 5-DOF Instrument Deployment Device (IDD) with 4-tool cross turret (RAT/MI/MB/APXS),
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

  // Kinematic coordinates for the 5-DOF Robotic Arm (nested parent-child hierarchy)
  const armMountPos: [number, number, number] = isMer
    ? [0.56, -0.04, -0.14]
    : [0.84, 0.0, -0.18];
  const shoulderOffset: [number, number, number] = isMer
    ? [0.1, 0.0, 0.0]
    : [0.12, 0.0, 0.0];
  const elbowRelPos: [number, number, number] = isMer
    ? [0.34, 0.18, 0.02]
    : [0.42, 0.24, 0.03];
  const wristRelPos: [number, number, number] = isMer
    ? [0.32, -0.26, 0.06]
    : [0.38, -0.34, 0.08];
  const turretRelPos: [number, number, number] = isMer
    ? [0.1, -0.05, 0.02]
    : [0.14, -0.07, 0.02];

  const armEmissive = highlightEmissive('arm');
  const armIntensity = highlightIntensity('arm');
  const wheelsEmissive = highlightEmissive('wheels');
  const wheelsIntensity = highlightIntensity('wheels');

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
          1. MOBILITY: 6 CLEATED WHEELS + FULLY CONNECTED ROCKER-BOGIE LINKAGES
         ===================================================================== */}
      <group onClick={handleMeshClick('wheels')}>
        {wheelCoords.map((w, idx) => (
          <group key={`wheel-${idx}`} position={[w.x, w.y, w.z]}>
            {/* Outer Cylindrical Tire Drum */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 36]} />
              <meshStandardMaterial
                color="#1b2028"
                roughness={0.62}
                metalness={0.52}
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
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
                  emissive={wheelsEmissive}
                  emissiveIntensity={wheelsIntensity}
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
                  emissive={wheelsEmissive}
                  emissiveIntensity={wheelsIntensity}
                />
              </mesh>
            ))}

            {/* Central Planetary Gear Hubcap */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry
                args={[wheelRadius * 0.34, wheelRadius * 0.34, wheelWidth * 1.14, 20]}
              />
              <meshStandardMaterial
                color={isMer ? '#eab308' : '#cbd5e1'}
                metalness={0.82}
                roughness={0.22}
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
            </mesh>
          </group>
        ))}

        {/* Articulated Left & Right Rocker-Bogie Linkages (100% Connected Node-to-Node) */}
        {[-1, 1].map((side) => {
          const zChassisWall = side * (isMer ? 0.44 : 0.56);
          const zTube = side * (isMer ? 0.59 : 0.7);
          const zCornerWheel = side * (isMer ? 0.72 : 0.84);
          const zMidWheel = side * (isMer ? 0.78 : 0.9);

          const frontX = isMer ? 0.88 : 1.06;
          const midX = isMer ? -0.02 : 0.0;
          const rearX = isMer ? -0.88 : -1.06;
          const wheelY = -0.46;
          const steerYokeY = isMer ? -0.14 : -0.1;
          const deckCrossbarY = isMer ? 0.23 : 0.29;

          const mainDiffPivot: [number, number, number] = [0.18, -0.03, zTube];
          const bogiePivot: [number, number, number] = [-0.44, -0.18, zTube];

          const frontSteeringTop: [number, number, number] = [frontX, steerYokeY, zTube];
          const frontWheelInnerHub: [number, number, number] = [frontX, wheelY, zTube];
          const frontWheelCenter: [number, number, number] = [frontX, wheelY, zCornerWheel];

          const midWheelInnerHub: [number, number, number] = [midX, wheelY, zTube];
          const midWheelCenter: [number, number, number] = [midX, wheelY, zMidWheel];

          const rearSteeringTop: [number, number, number] = [rearX, steerYokeY, zTube];
          const rearWheelInnerHub: [number, number, number] = [rearX, wheelY, zTube];
          const rearWheelCenter: [number, number, number] = [rearX, wheelY, zCornerWheel];

          const diffBarEnd: [number, number, number] = [0.06, deckCrossbarY, zTube];

          return (
            <group key={`rocker-bogie-${side}`}>
              {/* 1. Main Differential Axle connecting Chassis Side Wall to Main Rocker Pivot */}
              <MechanicalLink
                from={[0.18, -0.03, zChassisWall]}
                to={mainDiffPivot}
                radius={0.042}
                color="#94a3b8"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={mainDiffPivot}
                axis="z"
                radius={0.068}
                width={0.12}
                color="#cbd5e1"
                capColor="#eab308"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* 2. Forward Rocker Tube (Main Differential Pivot -> Front Steering Yoke Top) */}
              <MechanicalLink
                from={mainDiffPivot}
                to={frontSteeringTop}
                radius={0.031}
                color={isMer ? '#cbd5e1' : '#e2e8f0'}
                withCollars
                collarColor="#475569"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* Front Corner Steering Actuator Motor Housing + Vertical Yoke + Horizontal Wheel Axle */}
              <MechanicalJoint
                position={frontSteeringTop}
                axis="y"
                radius={0.048}
                width={0.11}
                color="#334155"
                capColor="#eab308"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalLink
                from={frontSteeringTop}
                to={frontWheelInnerHub}
                radius={0.028}
                color="#94a3b8"
                withCollars
                collarColor="#334155"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={frontWheelInnerHub}
                axis="z"
                radius={0.044}
                width={0.08}
                color="#475569"
                capColor="#cbd5e1"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalLink
                from={frontWheelInnerHub}
                to={frontWheelCenter}
                radius={0.034}
                color="#64748b"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* 3. Aft Rocker Tube (Main Differential Pivot -> Bogie Pivot Joint) */}
              <MechanicalLink
                from={mainDiffPivot}
                to={bogiePivot}
                radius={0.031}
                color={isMer ? '#cbd5e1' : '#e2e8f0'}
                withCollars
                collarColor="#475569"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={bogiePivot}
                axis="z"
                radius={0.056}
                width={0.11}
                color="#f59e0b"
                capColor="#334155"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* 4. Bogie Forward Strut (Bogie Pivot -> Middle Wheel Inner Hub -> Middle Wheel Axle) */}
              <MechanicalLink
                from={bogiePivot}
                to={midWheelInnerHub}
                radius={0.026}
                color="#94a3b8"
                withCollars
                collarColor="#334155"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={midWheelInnerHub}
                axis="z"
                radius={0.042}
                width={0.08}
                color="#475569"
                capColor="#cbd5e1"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalLink
                from={midWheelInnerHub}
                to={midWheelCenter}
                radius={0.034}
                color="#64748b"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* 5. Bogie Aft Strut (Bogie Pivot -> Rear Steering Yoke Top -> Rear Wheel Axle) */}
              <MechanicalLink
                from={bogiePivot}
                to={rearSteeringTop}
                radius={0.026}
                color="#94a3b8"
                withCollars
                collarColor="#334155"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={rearSteeringTop}
                axis="y"
                radius={0.048}
                width={0.11}
                color="#334155"
                capColor="#eab308"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalLink
                from={rearSteeringTop}
                to={rearWheelInnerHub}
                radius={0.028}
                color="#94a3b8"
                withCollars
                collarColor="#334155"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={rearWheelInnerHub}
                axis="z"
                radius={0.044}
                width={0.08}
                color="#475569"
                capColor="#cbd5e1"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalLink
                from={rearWheelInnerHub}
                to={rearWheelCenter}
                radius={0.034}
                color="#64748b"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />

              {/* 6. Differential Turnbuckle Link (Main Rocker Pivot -> Top Deck Differential Crossbar) */}
              <MechanicalLink
                from={mainDiffPivot}
                to={diffBarEnd}
                radius={0.016}
                color="#cbd5e1"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
              <MechanicalJoint
                position={diffBarEnd}
                axis="x"
                radius={0.028}
                width={0.06}
                color="#475569"
                capColor="#eab308"
                emissive={wheelsEmissive}
                emissiveIntensity={wheelsIntensity}
              />
            </group>
          );
        })}

        {/* Top Deck Differential Crossbar & Center Deck Pivot Bearing */}
        <MechanicalLink
          from={[0.06, isMer ? 0.23 : 0.29, -(isMer ? 0.59 : 0.7)]}
          to={[0.06, isMer ? 0.23 : 0.29, isMer ? 0.59 : 0.7]}
          radius={0.024}
          color="#cbd5e1"
          withCollars
          collarColor="#475569"
          emissive={wheelsEmissive}
          emissiveIntensity={wheelsIntensity}
        />
        <MechanicalJoint
          position={[0.06, isMer ? 0.21 : 0.26, 0]}
          axis="y"
          radius={0.046}
          width={0.08}
          color="#334155"
          capColor="#eab308"
          emissive={wheelsEmissive}
          emissiveIntensity={wheelsIntensity}
        />
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
            position={[isMer ? 0.59 : 0.87, -0.08, hz]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.028, 0.028, 0.05, 14]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.15} />
          </mesh>
        ))}

        {/* Top Deck Science Inlets / Calibration Targets */}
        {isMer ? (
          /* MER MarsDial Sundial Calibration Target on Rear Deck */
          <group position={[-0.42, 0.21, 0.3]}>
            <mesh>
              <cylinderGeometry args={[0.055, 0.055, 0.025, 20]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.03, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.045, 8]} />
              <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ) : (
          /* Curiosity SAM/CheMin Sample Funnels OR Perseverance Caching Carousel + Belly Ingenuity */
          <group>
            <mesh position={[0.25, 0.25, -0.15]}>
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
              <mesh key={`funnel-${i}`} position={[0.25 + fx, 0.29, -0.15]}>
                <cylinderGeometry args={[0.035, 0.02, 0.04, 16]} />
                <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.25} />
              </mesh>
            ))}

            {/* Perseverance specific: Belly-stowed Ingenuity Helicopter coaxial rotors silhouette */}
            {isPerseverance && (
              <group position={[0.05, -0.27, 0]}>
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

            {/* Left & Right Spread Butterfly Solar Wings + Mechanical Hinge Knuckles */}
            {[-1, 1].map((side) => (
              <group key={`solar-wing-${side}`}>
                {/* Mechanical Wing Hinge Bar along Deck Edge */}
                <MechanicalLink
                  from={[-0.5, 0, side * 0.47]}
                  to={[0.42, 0, side * 0.47]}
                  radius={0.018}
                  color="#94a3b8"
                  emissive={highlightEmissive('power')}
                  emissiveIntensity={highlightIntensity('power')}
                />
                <group
                  position={[-0.04, -0.01, side * 0.83]}
                  rotation={[side * 0.04, 0, 0]}
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
              </group>
            ))}

            {/* Rear Tail Solar Flap + Hinge */}
            <MechanicalLink
              from={[-0.61, 0, -0.36]}
              to={[-0.61, 0, 0.36]}
              radius={0.018}
              color="#94a3b8"
              emissive={highlightEmissive('power')}
              emissiveIntensity={highlightIntensity('power')}
            />
            <mesh position={[-0.86, -0.01, 0]} rotation={[0, 0, 0.06]}>
              <boxGeometry args={[0.54, 0.028, 0.78]} />
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
          /* Curiosity & Perseverance Rear Cantilevered MMRTG with Connected Bulkhead Truss */
          <group>
            {/* Rear Bulkhead Mounting Adapter Ring */}
            <mesh position={[-0.88, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.24, 0.1, 24]} />
              <meshStandardMaterial
                color="#475569"
                metalness={0.75}
                roughness={0.28}
                emissive={highlightEmissive('power')}
                emissiveIntensity={highlightIntensity('power')}
              />
            </mesh>

            {/* 4 Structural Truss Struts Bolting MMRTG Frame to Rear Chassis Bulkhead */}
            {[-1, 1].map((side) => (
              <group key={`mmrtg-truss-${side}`}>
                <MechanicalLink
                  from={[-0.84, 0.16, side * 0.32]}
                  to={[-1.36, 0.42, side * 0.28]}
                  radius={0.02}
                  color="#64748b"
                  withCollars
                  collarColor="#334155"
                  emissive={highlightEmissive('power')}
                  emissiveIntensity={highlightIntensity('power')}
                />
                <MechanicalLink
                  from={[-0.84, -0.08, side * 0.32]}
                  to={[-1.36, 0.42, side * 0.28]}
                  radius={0.018}
                  color="#64748b"
                  emissive={highlightEmissive('power')}
                  emissiveIntensity={highlightIntensity('power')}
                />
              </group>
            ))}

            {/* Angled MMRTG Core & 8 Radial Cooling Fins Connected Directly to Rear Bulkhead */}
            <group position={[-1.12, 0.21, 0]} rotation={[0, 0, -0.52]}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.22, 0.82, 24]} />
                <meshStandardMaterial
                  color="#f1f5f9"
                  metalness={0.38}
                  roughness={0.35}
                  emissive={highlightEmissive('power')}
                  emissiveIntensity={highlightIntensity('power')}
                />
              </mesh>

              {/* Aft Dome Cap */}
              <mesh position={[0, 0.41, 0]}>
                <sphereGeometry args={[0.2, 20, 16]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
              </mesh>

              {/* 8 Radial Heat-Rejection Cooling Fins */}
              {MMRTG_FIN_ANGLES.map((angle, finIdx) => (
                <mesh key={`mmrtg-fin-${finIdx}`} rotation={[0, angle, 0]}>
                  <boxGeometry args={[0.58, 0.72, 0.022]} />
                  <meshStandardMaterial
                    color="#dbe4f0"
                    metalness={0.48}
                    roughness={0.32}
                    emissive={highlightEmissive('power')}
                    emissiveIntensity={highlightIntensity('power')}
                  />
                </mesh>
              ))}
            </group>
          </group>
        )}
      </group>

      {/* =====================================================================
          4. CAMERA MAST (PMA / RSM), STEREO OPTICS & CHEMCAM / SUPERCAM HEAD
         ===================================================================== */}
      <group
        position={isMer ? [0.44, 0.2, 0.2] : [0.56, 0.23, 0.28]}
        onClick={handleMeshClick('cameras')}
      >
        {/* Basal Mast Turret & Mini-TES Periscope Window Flush with Top Deck */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.095, 0.115, 0.14, 20]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Main Vertical Mast Column */}
        <MechanicalLink
          from={[0, 0.05, 0]}
          to={[0, 0.84, 0]}
          radiusTop={0.052}
          radiusBottom={0.064}
          color={isMer ? '#e2e8f0' : '#f1f5f9'}
          metalness={0.5}
          roughness={0.34}
          withCollars
          collarColor="#475569"
          emissive={highlightEmissive('cameras')}
          emissiveIntensity={highlightIntensity('cameras')}
        />

        {/* REMS (Curiosity) or MEDA (Perseverance) Atmospheric Wind Sensor Booms Anchored to Mast Center */}
        {!isMer && (
          <group>
            <MechanicalLink
              from={[0, 0.52, 0]}
              to={[0.24, 0.52, 0.06]}
              radiusTop={0.016}
              radiusBottom={0.026}
              color="#cbd5e1"
              withCollars
              collarColor="#475569"
              emissive={highlightEmissive('cameras')}
              emissiveIntensity={highlightIntensity('cameras')}
            />
            <MechanicalLink
              from={[0, 0.43, 0]}
              to={[0.05, 0.43, 0.23]}
              radiusTop={0.016}
              radiusBottom={0.026}
              color="#cbd5e1"
              withCollars
              collarColor="#475569"
              emissive={highlightEmissive('cameras')}
              emissiveIntensity={highlightIntensity('cameras')}
            />
          </group>
        )}

        {/* Azimuth/Elevation Neck Gimbal Joint Connecting Mast Top to Camera Bar */}
        <MechanicalJoint
          position={[0, 0.84, 0]}
          axis="z"
          radius={0.058}
          width={0.13}
          color="#334155"
          capColor="#eab308"
          emissive={highlightEmissive('cameras')}
          emissiveIntensity={highlightIntensity('cameras')}
        />

        {/* Camera Head Assembly */}
        <group position={[0.02, 0.89, 0]}>
          {/* Stereo Navigation & Mastcam Bar */}
          <mesh>
            <boxGeometry args={isMer ? [0.16, 0.12, 0.56] : [0.22, 0.15, 0.48]} />
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
              position={[isMer ? 0.085 : 0.115, 0, lz]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[
                  i === 0 || i === 3 ? 0.032 : 0.024,
                  i === 0 || i === 3 ? 0.032 : 0.024,
                  0.05,
                  16,
                ]}
              />
              <meshStandardMaterial color="#0f172a" metalness={0.92} roughness={0.1} />
            </mesh>
          ))}

          {/* Curiosity ChemCam OR Perseverance SuperCam Upper Cyclops Laser Unit */}
          {!isMer && (
            <group position={[0.01, 0.15, 0]}>
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
              <mesh position={[0.135, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.068, 0.068, 0.04, 24]} />
                <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.08} />
              </mesh>
              <mesh position={[0.156, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <ringGeometry args={[0.052, 0.068, 24]} />
                <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>
      </group>

      {/* =====================================================================
          5. 5-DOF ARTICULATED ROBOTIC ARM & MULTI-INSTRUMENT TURRET
             (True Nested Parent-Child Kinematic Hierarchy:
              Chassis Mount -> Shoulder Joint -> Upper Arm -> Elbow Joint ->
              Forearm -> Wrist Joint -> 360° Instrument Turret)
         ===================================================================== */}
      <group position={armMountPos} onClick={handleMeshClick('arm')}>
        {/* 5.0 Front Chassis Bulkhead Mounting Flange & Structural Support Neck */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={isMer ? [0.08, 0.18, 0.18] : [0.1, 0.22, 0.22]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.78}
            roughness={0.26}
            emissive={armEmissive}
            emissiveIntensity={armIntensity}
          />
        </mesh>
        <MechanicalLink
          from={[0, 0, 0]}
          to={shoulderOffset}
          radius={isMer ? 0.054 : 0.066}
          color="#475569"
          emissive={armEmissive}
          emissiveIntensity={armIntensity}
        />

        {/* 5.1 LEVEL 1: Shoulder Azimuth & Elevation Joint Housing */}
        <group position={shoulderOffset}>
          {/* Shoulder Azimuth Vertical Actuator */}
          <MechanicalJoint
            position={[0, 0, 0]}
            axis="y"
            radius={isMer ? 0.068 : 0.082}
            width={isMer ? 0.15 : 0.18}
            color="#334155"
            capColor="#eab308"
            emissive={armEmissive}
            emissiveIntensity={armIntensity}
          />
          {/* Shoulder Elevation Horizontal Actuator */}
          <MechanicalJoint
            position={[0, 0, 0]}
            axis="z"
            radius={isMer ? 0.062 : 0.075}
            width={isMer ? 0.16 : 0.2}
            color="#475569"
            capColor="#cbd5e1"
            emissive={armEmissive}
            emissiveIntensity={armIntensity}
          />

          {/* Upper Arm Primary Structural Boom (Shoulder [0,0,0] -> Elbow `elbowRelPos`) */}
          <MechanicalLink
            from={[0, 0, 0]}
            to={elbowRelPos}
            radiusTop={isMer ? 0.036 : 0.046}
            radiusBottom={isMer ? 0.04 : 0.052}
            color="#e2e8f0"
            metalness={0.65}
            roughness={0.28}
            withCollars
            collarColor="#334155"
            emissive={armEmissive}
            emissiveIntensity={armIntensity}
          />

          {/* Upper Arm Parallel Kapton Data/Heater Cable Conduit */}
          <MechanicalLink
            from={[0, isMer ? 0.046 : 0.058, 0]}
            to={[elbowRelPos[0], elbowRelPos[1] + (isMer ? 0.046 : 0.058), elbowRelPos[2]]}
            radius={isMer ? 0.012 : 0.015}
            color="#d97706"
            metalness={0.8}
            roughness={0.25}
            emissive={armEmissive}
            emissiveIntensity={armIntensity * 0.6}
          />
          {/* Mid-Boom Cable Clamp Strut Connecting Harness to Main Upper Boom */}
          <MechanicalLink
            from={[elbowRelPos[0] * 0.5, elbowRelPos[1] * 0.5, elbowRelPos[2] * 0.5]}
            to={[
              elbowRelPos[0] * 0.5,
              elbowRelPos[1] * 0.5 + (isMer ? 0.046 : 0.058),
              elbowRelPos[2] * 0.5,
            ]}
            radius={0.014}
            color="#475569"
          />

          {/* 5.2 LEVEL 2: Elbow Joint Housing (Nested at exact tip of Upper Arm Boom) */}
          <group position={elbowRelPos}>
            <MechanicalJoint
              position={[0, 0, 0]}
              axis="z"
              radius={isMer ? 0.058 : 0.072}
              width={isMer ? 0.14 : 0.18}
              color="#334155"
              capColor="#eab308"
              emissive={armEmissive}
              emissiveIntensity={armIntensity}
            />

            {/* Forearm Primary Structural Boom (Elbow [0,0,0] -> Wrist `wristRelPos`) */}
            <MechanicalLink
              from={[0, 0, 0]}
              to={wristRelPos}
              radiusTop={isMer ? 0.032 : 0.042}
              radiusBottom={isMer ? 0.036 : 0.046}
              color="#cbd5e1"
              metalness={0.68}
              roughness={0.28}
              withCollars
              collarColor="#334155"
              emissive={armEmissive}
              emissiveIntensity={armIntensity}
            />

            {/* Forearm Parallel Cable Conduit */}
            <MechanicalLink
              from={[0, isMer ? 0.042 : 0.052, 0]}
              to={[wristRelPos[0], wristRelPos[1] + (isMer ? 0.042 : 0.052), wristRelPos[2]]}
              radius={isMer ? 0.011 : 0.014}
              color="#d97706"
              metalness={0.8}
              roughness={0.25}
              emissive={armEmissive}
              emissiveIntensity={armIntensity * 0.6}
            />
            {/* Forearm Mid-Span Cable Clamp */}
            <MechanicalLink
              from={[wristRelPos[0] * 0.5, wristRelPos[1] * 0.5, wristRelPos[2] * 0.5]}
              to={[
                wristRelPos[0] * 0.5,
                wristRelPos[1] * 0.5 + (isMer ? 0.042 : 0.052),
                wristRelPos[2] * 0.5,
              ]}
              radius={0.013}
              color="#475569"
            />

            {/* 5.3 LEVEL 3: Wrist Pitch/Roll Joint (Nested at exact tip of Forearm Boom) */}
            <group position={wristRelPos}>
              <MechanicalJoint
                position={[0, 0, 0]}
                axis="z"
                radius={isMer ? 0.05 : 0.062}
                width={isMer ? 0.12 : 0.15}
                color="#334155"
                capColor="#eab308"
                emissive={armEmissive}
                emissiveIntensity={armIntensity}
              />

              {/* Wrist Roll Neck Connecting Wrist Pitch Joint Directly to Turret Center */}
              <MechanicalLink
                from={[0, 0, 0]}
                to={turretRelPos}
                radius={isMer ? 0.042 : 0.054}
                color="#475569"
                withCollars
                collarColor="#eab308"
                emissive={armEmissive}
                emissiveIntensity={armIntensity}
              />

              {/* 5.4 LEVEL 4: Multi-Instrument Turret Assembly (Centered at `turretRelPos`) */}
              <group position={turretRelPos}>
                {/* Central 360° Turret Structural Core & Ring Housing */}
                <MechanicalJoint
                  position={[0, 0, 0]}
                  axis="y"
                  radius={isMer ? 0.095 : 0.135}
                  width={isMer ? 0.11 : 0.15}
                  color="#334155"
                  capColor="#cbd5e1"
                  emissive={armEmissive}
                  emissiveIntensity={armIntensity}
                />

                {/* 4 Radial Scientific Instrument Barrels Embedded Directly Into Turret Core */}
                {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((tAngle, tIdx) => {
                  const reach = isMer ? 0.16 : 0.22;
                  const tipPos: [number, number, number] = [
                    Math.cos(tAngle) * reach,
                    0,
                    Math.sin(tAngle) * reach,
                  ];
                  const lensPos: [number, number, number] = [
                    Math.cos(tAngle) * (reach + 0.015),
                    0,
                    Math.sin(tAngle) * (reach + 0.015),
                  ];
                  return (
                    <group key={`turret-tool-${tIdx}`}>
                      <MechanicalLink
                        from={[0, 0, 0]}
                        to={tipPos}
                        radiusTop={isMer ? 0.036 : 0.052}
                        radiusBottom={isMer ? 0.042 : 0.058}
                        color={tIdx === 0 ? '#eab308' : '#94a3b8'}
                        metalness={0.8}
                        roughness={0.24}
                        withCollars
                        collarColor="#1e293b"
                        emissive={armEmissive}
                        emissiveIntensity={armIntensity}
                      />
                      {/* Instrument Contact Ring / Optical Window at Tool Tip */}
                      <MechanicalLink
                        from={tipPos}
                        to={lensPos}
                        radius={isMer ? 0.028 : 0.04}
                        color="#0f172a"
                        metalness={0.9}
                        roughness={0.12}
                      />
                    </group>
                  );
                })}

                {/* Downward Rotary-Percussive Coring Drill / Rock Abrasion Bit & Contact Prongs */}
                <MechanicalLink
                  from={[0, 0, 0]}
                  to={[0, isMer ? -0.17 : -0.23, 0]}
                  radiusTop={isMer ? 0.028 : 0.036}
                  radiusBottom={0.01}
                  color="#e2643a"
                  metalness={0.85}
                  roughness={0.18}
                  emissive={armEmissive}
                  emissiveIntensity={armIntensity}
                />
                {!isMer &&
                  [-0.055, 0.055].map((px, i) => (
                    <MechanicalLink
                      key={`prong-${i}`}
                      from={[px, -0.02, 0.03]}
                      to={[px, -0.2, 0.03]}
                      radius={0.01}
                      color="#cbd5e1"
                      metalness={0.85}
                      roughness={0.2}
                    />
                  ))}
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* =====================================================================
          6. ANTENNAS: GIMBALED X-BAND HGA DISH, UHF MONOPOLE & LGA MAST
         ===================================================================== */}
      <group
        position={isMer ? [-0.26, 0.2, -0.3] : [-0.42, 0.23, -0.42]}
        onClick={handleMeshClick('antennas')}
      >
        {/* HGA Gimbal Pedestal Connected Flush to Deck */}
        <MechanicalLink
          from={[0, 0, 0]}
          to={[0, 0.18, 0]}
          radiusTop={0.028}
          radiusBottom={0.042}
          color="#94a3b8"
          withCollars
          collarColor="#334155"
          emissive={highlightEmissive('antennas')}
          emissiveIntensity={highlightIntensity('antennas')}
        />
        <MechanicalJoint
          position={[0, 0.18, 0]}
          axis="z"
          radius={0.036}
          width={0.07}
          color="#334155"
          capColor="#eab308"
          emissive={highlightEmissive('antennas')}
          emissiveIntensity={highlightIntensity('antennas')}
        />

        {/* High-Gain X-Band Steerable Hexagonal/Octagonal Flat-Panel Dish */}
        <group position={[0, 0.21, 0]} rotation={[0.42, 0.32, 0]}>
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

        {/* Low-Gain Omnidirectional Antenna (LGA) Mast Connected Flush to Deck */}
        <group position={[-0.18, 0, 0.18]}>
          <MechanicalLink
            from={[0, 0, 0]}
            to={[0, 0.46, 0]}
            radiusTop={0.016}
            radiusBottom={0.022}
            color="#cbd5e1"
            emissive={highlightEmissive('antennas')}
            emissiveIntensity={highlightIntensity('antennas')}
          />
          <mesh position={[0, 0.48, 0]}>
            <cylinderGeometry args={[0.034, 0.022, 0.07, 14]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>

        {/* UHF Orbital Relay Cylinder Antenna Connected Flush to Deck */}
        <MechanicalLink
          from={[-0.24, 0, 0.56]}
          to={[-0.24, 0.42, 0.56]}
          radius={0.042}
          color="#1e293b"
          metalness={0.62}
          roughness={0.35}
          withCollars
          collarColor="#eab308"
          emissive={highlightEmissive('antennas')}
          emissiveIntensity={highlightIntensity('antennas')}
        />
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
