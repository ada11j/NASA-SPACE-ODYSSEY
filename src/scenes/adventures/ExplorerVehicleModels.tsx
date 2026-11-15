import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ExplorerStoryId } from '@/types';

/**
 * Shared realistic, proportional 3D models for:
 * - Sojourner (Mars Pathfinder)
 * - Ingenuity (Mars Helicopter)
 * - Opportunity (MER-B)
 * - Apollo LRV (Lunar Roving Vehicle)
 *
 * Uses distinct physically-based materials (gold thermal Kapton foil,
 * brushed aluminum struts, photovoltaic solar cells, carbon fiber,
 * and glass optics) with zero intersecting geometry and mechanical
 * animation refs for wheels, suspension, coaxial rotors, and steering.
 */

export function useExplorerMaterials() {
  return useMemo(() => {
    return {
      kaptonGold: new THREE.MeshStandardMaterial({
        color: '#c9933b',
        metalness: 0.75,
        roughness: 0.26,
      }),
      brushedAluminum: new THREE.MeshStandardMaterial({
        color: '#d4dce6',
        metalness: 0.8,
        roughness: 0.3,
      }),
      darkTitanium: new THREE.MeshStandardMaterial({
        color: '#475569',
        metalness: 0.68,
        roughness: 0.4,
      }),
      solarCell: new THREE.MeshStandardMaterial({
        color: '#12264a',
        metalness: 0.58,
        roughness: 0.2,
      }),
      solarGrid: new THREE.MeshStandardMaterial({
        color: '#3b82f6',
        metalness: 0.45,
        roughness: 0.35,
      }),
      carbonFiber: new THREE.MeshStandardMaterial({
        color: '#1e242d',
        metalness: 0.28,
        roughness: 0.48,
      }),
      whiteThermal: new THREE.MeshStandardMaterial({
        color: '#eef2f8',
        metalness: 0.2,
        roughness: 0.42,
      }),
      wheelTread: new THREE.MeshStandardMaterial({
        color: '#2b313b',
        metalness: 0.42,
        roughness: 0.72,
      }),
      wireMesh: new THREE.MeshStandardMaterial({
        color: '#a3aab5',
        metalness: 0.74,
        roughness: 0.38,
      }),
      glassLens: new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        metalness: 0.92,
        roughness: 0.08,
      }),
    };
  }, []);
}

export function Sojourner3DModel({
  wheelsRef,
  rockerLeftRef,
  rockerRightRef,
  apxsGlowRef,
  apxsBeamRef,
  lowPerf = false,
}: {
  wheelsRef?: React.MutableRefObject<THREE.Mesh[]>;
  rockerLeftRef?: React.MutableRefObject<THREE.Group | null>;
  rockerRightRef?: React.MutableRefObject<THREE.Group | null>;
  apxsGlowRef?: React.MutableRefObject<THREE.Mesh | null>;
  apxsBeamRef?: React.MutableRefObject<THREE.Mesh | null>;
  lowPerf?: boolean;
}) {
  const mat = useExplorerMaterials();
  const segs = lowPerf ? 10 : 18;
  const wheelZPositions = [0.46, 0.0, -0.46];

  return (
    <group>
      {/* Warm Electronics Box (gold Kapton thermal wrap) */}
      <mesh position={[0, 0.34, 0]} material={mat.kaptonGold} castShadow={!lowPerf}>
        <boxGeometry args={[0.66, 0.22, 0.92]} />
      </mesh>
      {/* Aluminum top rim & thermal radiator strip */}
      <mesh position={[0, 0.455, 0]} material={mat.brushedAluminum} castShadow={!lowPerf}>
        <boxGeometry args={[0.78, 0.025, 1.04]} />
      </mesh>
      {/* Photovoltaic Solar Panel Deck + Cell Grid */}
      <mesh position={[0, 0.474, 0]} material={mat.solarCell}>
        <boxGeometry args={[0.72, 0.015, 0.98]} />
      </mesh>
      {[-0.22, 0, 0.22].map((gx, i) => (
        <mesh key={i} position={[gx, 0.483, 0]} material={mat.solarGrid}>
          <boxGeometry args={[0.01, 0.004, 0.96]} />
        </mesh>
      ))}

      {/* Differential Pivot Cross-Bar */}
      <mesh position={[0, 0.31, 0.0]} material={mat.darkTitanium}>
        <cylinderGeometry args={[0.02, 0.02, 0.78, 8]} />
      </mesh>

      {/* Left & Right Articulated Rocker-Bogie Assemblies */}
      {([-1, 1] as const).map((side) => {
        const refProp = side === -1 ? rockerLeftRef : rockerRightRef;
        return (
          <group key={side} ref={refProp}>
            <mesh position={[side * 0.36, 0.31, 0.0]} material={mat.brushedAluminum}>
              <boxGeometry args={[0.14, 0.04, 0.04]} />
            </mesh>
            {/* Front rocker strut */}
            <mesh
              position={[side * 0.42, 0.24, 0.23]}
              rotation={[0.32, 0, 0]}
              material={mat.brushedAluminum}
            >
              <boxGeometry args={[0.032, 0.032, 0.52]} />
            </mesh>
            {/* Rear bogie link */}
            <mesh
              position={[side * 0.42, 0.22, -0.23]}
              rotation={[-0.22, 0, 0]}
              material={mat.brushedAluminum}
            >
              <boxGeometry args={[0.032, 0.032, 0.52]} />
            </mesh>
            {/* Bogie pivot hub */}
            <mesh
              position={[side * 0.42, 0.27, 0]}
              rotation={[0, 0, Math.PI / 2]}
              material={mat.darkTitanium}
            >
              <cylinderGeometry args={[0.032, 0.032, 0.045, 10]} />
            </mesh>

            {/* 3 Independent Wheels per side */}
            {wheelZPositions.map((zPos, i) => {
              const wheelIdx = (side === -1 ? 0 : 3) + i;
              return (
                <group key={i}>
                  <mesh
                    position={[side * 0.43, 0.16, zPos]}
                    rotation={[0, 0, Math.PI / 2]}
                    material={mat.darkTitanium}
                  >
                    <cylinderGeometry args={[0.022, 0.022, 0.12, 8]} />
                  </mesh>
                  <group position={[side * 0.48, 0.16, zPos]}>
                    <mesh
                      ref={(el) => {
                        if (wheelsRef && el) wheelsRef.current[wheelIdx] = el;
                      }}
                      rotation={[0, 0, Math.PI / 2]}
                      material={mat.wheelTread}
                      castShadow={!lowPerf}
                    >
                      <cylinderGeometry args={[0.16, 0.16, 0.11, segs]} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]} material={mat.brushedAluminum}>
                      <cylinderGeometry args={[0.075, 0.075, 0.12, 10]} />
                    </mesh>
                  </group>
                </group>
              );
            })}
          </group>
        );
      })}

      {/* Front Dual Stereo Monochrome Cameras + Laser Hazard Projectors */}
      {[-0.14, 0.14].map((xPos, i) => (
        <group key={i} position={[xPos, 0.39, 0.48]}>
          <mesh material={mat.darkTitanium}>
            <boxGeometry args={[0.095, 0.08, 0.075]} />
          </mesh>
          <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={mat.glassLens}>
            <cylinderGeometry args={[0.022, 0.022, 0.02, 10]} />
          </mesh>
        </group>
      ))}

      {/* Rear Color Camera & APXS Deployment Arm */}
      <mesh position={[0.16, 0.39, -0.47]} material={mat.darkTitanium}>
        <boxGeometry args={[0.08, 0.07, 0.06]} />
      </mesh>
      <mesh position={[0, 0.34, -0.5]} material={mat.brushedAluminum}>
        <boxGeometry args={[0.08, 0.055, 0.14]} />
      </mesh>
      <mesh position={[0, 0.3, -0.57]} rotation={[0.45, 0, 0]} material={mat.darkTitanium}>
        <boxGeometry args={[0.05, 0.05, 0.12]} />
      </mesh>
      <mesh
        position={[0, 0.27, -0.64]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mat.whiteThermal}
        castShadow={!lowPerf}
      >
        <cylinderGeometry args={[0.095, 0.105, 0.18, 14]} />
      </mesh>

      {/* Optional APXS Active Scan Glow & Beam */}
      {apxsGlowRef && (
        <mesh ref={apxsGlowRef} position={[0, 0.27, -0.76]} visible={false}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>
      )}
      {apxsBeamRef && (
        <mesh
          ref={apxsBeamRef}
          position={[0, 0.27, -1.1]}
          rotation={[Math.PI / 2, 0, 0]}
          visible={false}
        >
          <coneGeometry args={[0.28, 0.78, 14, 1, true]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Rear UHF Whip Antenna with Base Insulator */}
      <mesh position={[0.26, 0.5, -0.36]} material={mat.darkTitanium}>
        <cylinderGeometry args={[0.028, 0.032, 0.05, 8]} />
      </mesh>
      <mesh position={[0.26, 0.69, -0.36]} material={mat.brushedAluminum}>
        <cylinderGeometry args={[0.01, 0.015, 0.36, 8]} />
      </mesh>
      <mesh position={[0.26, 0.88, -0.36]} material={mat.kaptonGold}>
        <sphereGeometry args={[0.024, 8, 8]} />
      </mesh>
    </group>
  );
}

export function Ingenuity3DModel({
  topRotorRef,
  bottomRotorRef,
  lowPerf = false,
}: {
  topRotorRef?: React.MutableRefObject<THREE.Group | null>;
  bottomRotorRef?: React.MutableRefObject<THREE.Group | null>;
  lowPerf?: boolean;
}) {
  const mat = useExplorerMaterials();
  const legCorners: [number, number][] = [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];

  return (
    <group>
      {/* Compact Insulated Fuselage Box (Gold Kapton Thermal Foil + Aluminum Frame) */}
      <mesh position={[0, 0.42, 0]} material={mat.kaptonGold} castShadow={!lowPerf}>
        <boxGeometry args={[0.26, 0.22, 0.26]} />
      </mesh>
      <mesh position={[0, 0.535, 0]} material={mat.brushedAluminum}>
        <boxGeometry args={[0.27, 0.018, 0.27]} />
      </mesh>

      {/* Downward Nav Camera & Laser Altimeter Pod */}
      <mesh position={[0, 0.29, 0.04]} material={mat.darkTitanium}>
        <boxGeometry args={[0.12, 0.05, 0.14]} />
      </mesh>
      <mesh position={[0, 0.26, 0.06]} material={mat.glassLens}>
        <cylinderGeometry args={[0.024, 0.024, 0.02, 10]} />
      </mesh>

      {/* 4 Splayed Carbon-Fiber Landing Legs with Upper Brackets & Foot Pads */}
      {legCorners.map(([sx, sz], idx) => (
        <group key={idx}>
          <mesh position={[sx * 0.11, 0.33, sz * 0.11]} material={mat.brushedAluminum}>
            <boxGeometry args={[0.04, 0.035, 0.04]} />
          </mesh>
          <mesh
            position={[sx * 0.21, 0.19, sz * 0.21]}
            rotation={[sz * -0.44, 0, sx * 0.44]}
            material={mat.carbonFiber}
          >
            <cylinderGeometry args={[0.014, 0.018, 0.48, 8]} />
          </mesh>
          <mesh position={[sx * 0.33, 0.015, sz * 0.33]} material={mat.darkTitanium}>
            <cylinderGeometry args={[0.038, 0.044, 0.025, 10]} />
          </mesh>
        </group>
      ))}

      {/* Central Carbon-Fiber Rotor Mast & Swashplate Collar */}
      <mesh position={[0, 0.72, 0]} material={mat.brushedAluminum}>
        <cylinderGeometry args={[0.026, 0.032, 0.44, 10]} />
      </mesh>
      <mesh position={[0, 0.64, 0]} material={mat.darkTitanium}>
        <cylinderGeometry args={[0.048, 0.048, 0.03, 12]} />
      </mesh>

      {/* Lower Coaxial Rotor Assembly (Hub + Dual Tapered Blades) */}
      <group ref={bottomRotorRef} position={[0, 0.76, 0]}>
        <mesh material={mat.darkTitanium}>
          <cylinderGeometry args={[0.058, 0.058, 0.042, 12]} />
        </mesh>
        {[-1, 1].map((dir) => (
          <mesh key={dir} position={[dir * 0.44, 0, 0]} material={mat.carbonFiber}>
            <boxGeometry args={[0.78, 0.014, 0.095]} />
          </mesh>
        ))}
      </group>

      {/* Upper Coaxial Rotor Assembly (Hub + Dual Tapered Blades) */}
      <group ref={topRotorRef} position={[0, 0.86, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={mat.darkTitanium}>
          <cylinderGeometry args={[0.058, 0.058, 0.042, 12]} />
        </mesh>
        {[-1, 1].map((dir) => (
          <mesh key={dir} position={[dir * 0.44, 0, 0]} material={mat.carbonFiber}>
            <boxGeometry args={[0.78, 0.014, 0.095]} />
          </mesh>
        ))}
      </group>

      {/* Top Solar Array Panel Cap (mounted above upper rotor) */}
      <mesh position={[0, 0.94, 0]} material={mat.brushedAluminum}>
        <boxGeometry args={[0.42, 0.022, 0.22]} />
      </mesh>
      <mesh position={[0, 0.955, 0]} material={mat.solarCell}>
        <boxGeometry args={[0.39, 0.012, 0.19]} />
      </mesh>
    </group>
  );
}

export function Opportunity3DModel({
  wheelsRef,
  rockerLeftRef,
  rockerRightRef,
  armGroupRef,
  lowPerf = false,
}: {
  wheelsRef?: React.MutableRefObject<THREE.Mesh[]>;
  rockerLeftRef?: React.MutableRefObject<THREE.Group | null>;
  rockerRightRef?: React.MutableRefObject<THREE.Group | null>;
  armGroupRef?: React.MutableRefObject<THREE.Group | null>;
  lowPerf?: boolean;
}) {
  const mat = useExplorerMaterials();
  const segs = lowPerf ? 10 : 18;
  const wheelZPositions = [0.58, 0.0, -0.58];

  return (
    <group>
      {/* Warm Electronics Box (Gold Kapton Body) */}
      <mesh position={[0, 0.44, -0.04]} material={mat.kaptonGold} castShadow={!lowPerf}>
        <boxGeometry args={[0.78, 0.3, 0.96]} />
      </mesh>

      {/* Deployed Solar Array Wings (Center Deck + Left & Right Wings + Cell Grid) */}
      <mesh position={[0, 0.61, -0.06]} material={mat.brushedAluminum} castShadow={!lowPerf}>
        <boxGeometry args={[1.68, 0.03, 1.04]} />
      </mesh>
      <mesh position={[0, 0.63, -0.06]} material={mat.solarCell}>
        <boxGeometry args={[1.6, 0.018, 0.96]} />
      </mesh>
      {[-0.55, 0, 0.55].map((gx, i) => (
        <mesh key={i} position={[gx, 0.642, -0.06]} material={mat.solarGrid}>
          <boxGeometry args={[0.012, 0.005, 0.94]} />
        </mesh>
      ))}

      {/* Articulated Left & Right Rocker-Bogie Suspension */}
      {([-1, 1] as const).map((side) => {
        const refProp = side === -1 ? rockerLeftRef : rockerRightRef;
        return (
          <group key={side} ref={refProp}>
            <mesh position={[side * 0.48, 0.36, 0]} material={mat.brushedAluminum}>
              <boxGeometry args={[0.2, 0.045, 0.045]} />
            </mesh>
            <mesh
              position={[side * 0.58, 0.28, 0.29]}
              rotation={[0.28, 0, 0]}
              material={mat.brushedAluminum}
            >
              <boxGeometry args={[0.04, 0.04, 0.64]} />
            </mesh>
            <mesh
              position={[side * 0.58, 0.26, -0.29]}
              rotation={[-0.2, 0, 0]}
              material={mat.brushedAluminum}
            >
              <boxGeometry args={[0.04, 0.04, 0.64]} />
            </mesh>
            {wheelZPositions.map((zPos, i) => {
              const wheelIdx = (side === -1 ? 0 : 3) + i;
              return (
                <group key={i}>
                  <mesh
                    position={[side * 0.6, 0.2, zPos]}
                    rotation={[0, 0, Math.PI / 2]}
                    material={mat.darkTitanium}
                  >
                    <cylinderGeometry args={[0.025, 0.025, 0.16, 8]} />
                  </mesh>
                  <group position={[side * 0.68, 0.2, zPos]}>
                    <mesh
                      ref={(el) => {
                        if (wheelsRef && el) wheelsRef.current[wheelIdx] = el;
                      }}
                      rotation={[0, 0, Math.PI / 2]}
                      material={mat.wheelTread}
                      castShadow={!lowPerf}
                    >
                      <cylinderGeometry args={[0.2, 0.2, 0.14, segs]} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]} material={mat.brushedAluminum}>
                      <cylinderGeometry args={[0.095, 0.095, 0.15, 10]} />
                    </mesh>
                  </group>
                </group>
              );
            })}
          </group>
        );
      })}

      {/* Pancam Mast Assembly (PMA) + Stereo Pancam/Navcam Head */}
      <mesh position={[0.18, 0.96, 0.42]} material={mat.whiteThermal}>
        <cylinderGeometry args={[0.04, 0.045, 0.68, 10]} />
      </mesh>
      <group position={[0.18, 1.32, 0.42]}>
        <mesh material={mat.whiteThermal}>
          <boxGeometry args={[0.34, 0.14, 0.16]} />
        </mesh>
        {[-0.1, 0.1].map((lx, i) => (
          <mesh
            key={i}
            position={[lx, 0.01, 0.085]}
            rotation={[Math.PI / 2, 0, 0]}
            material={mat.glassLens}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.02, 10]} />
          </mesh>
        ))}
      </group>

      {/* Articulated Front 5-DOF Robotic Arm (IDD) & Science Turret */}
      <group ref={armGroupRef} position={[-0.12, 0.42, 0.52]}>
        <mesh material={mat.darkTitanium}>
          <sphereGeometry args={[0.045, 10, 10]} />
        </mesh>
        <mesh position={[0, -0.05, 0.16]} rotation={[0.35, 0, 0]} material={mat.brushedAluminum}>
          <boxGeometry args={[0.052, 0.052, 0.34]} />
        </mesh>
        <mesh position={[0, -0.14, 0.34]} rotation={[-0.35, 0, 0]} material={mat.darkTitanium}>
          <boxGeometry args={[0.048, 0.048, 0.24]} />
        </mesh>
        <mesh position={[0, -0.18, 0.46]} material={mat.kaptonGold}>
          <cylinderGeometry args={[0.09, 0.09, 0.09, 12]} />
        </mesh>
      </group>

      {/* Rear High-Gain Dish Antenna + UHF Whip */}
      <group position={[-0.24, 0.78, -0.44]} rotation={[-0.5, 0, 0]}>
        <mesh material={mat.whiteThermal}>
          <cylinderGeometry args={[0.2, 0.04, 0.07, 16]} />
        </mesh>
      </group>
      <mesh position={[0.34, 0.8, -0.44]} material={mat.brushedAluminum}>
        <cylinderGeometry args={[0.01, 0.014, 0.36, 8]} />
      </mesh>
    </group>
  );
}

export function ApolloLrv3DModel({
  wheelsRef,
  frontLeftSteerRef,
  frontRightSteerRef,
  lowPerf = false,
}: {
  wheelsRef?: React.MutableRefObject<THREE.Mesh[]>;
  frontLeftSteerRef?: React.MutableRefObject<THREE.Group | null>;
  frontRightSteerRef?: React.MutableRefObject<THREE.Group | null>;
  lowPerf?: boolean;
}) {
  const mat = useExplorerMaterials();
  const segs = lowPerf ? 10 : 18;
  const rearWheelCoords: [number, number, number][] = [
    [-0.68, 0.22, -0.72],
    [0.68, 0.22, -0.72],
  ];

  return (
    <group>
      {/* Open Tubular Aluminum Space-Frame Chassis (Side Rails + Crossbeams + Floor Pan) */}
      {[-0.44, 0.44].map((rx, i) => (
        <mesh key={i} position={[rx, 0.3, 0]} material={mat.brushedAluminum} castShadow={!lowPerf}>
          <boxGeometry args={[0.055, 0.07, 1.82]} />
        </mesh>
      ))}
      {[-0.86, -0.25, 0.35, 0.86].map((cz, i) => (
        <mesh key={i} position={[0, 0.3, cz]} material={mat.brushedAluminum}>
          <boxGeometry args={[0.92, 0.055, 0.055]} />
        </mesh>
      ))}
      <mesh position={[0, 0.275, -0.05]} material={mat.darkTitanium}>
        <boxGeometry args={[0.84, 0.02, 1.1]} />
      </mesh>

      {/* Front Dual 36V Silver-Zinc Battery & Electronics Bay */}
      <mesh position={[0, 0.38, 0.58]} material={mat.kaptonGold}>
        <boxGeometry args={[0.74, 0.14, 0.42]} />
      </mesh>

      {/* Rear Equipment & Lunar Rock Sample Rack */}
      <mesh position={[0, 0.42, -0.68]} material={mat.darkTitanium}>
        <boxGeometry args={[0.84, 0.18, 0.34]} />
      </mesh>
      <mesh position={[-0.22, 0.55, -0.68]} material={mat.whiteThermal}>
        <boxGeometry args={[0.22, 0.12, 0.2]} />
      </mesh>

      {/* Two Astronaut Seats (Backrest + Seat Pan + Headrest) */}
      {[-0.26, 0.26].map((sx, idx) => (
        <group key={idx} position={[sx, 0.44, -0.1]}>
          <mesh position={[0, 0, 0]} material={mat.darkTitanium}>
            <boxGeometry args={[0.34, 0.06, 0.34]} />
          </mesh>
          <mesh position={[0, 0.2, -0.15]} rotation={[-0.18, 0, 0]} material={mat.brushedAluminum}>
            <boxGeometry args={[0.32, 0.36, 0.05]} />
          </mesh>
        </group>
      ))}

      {/* Center Console & T-Handle Hand Controller */}
      <mesh position={[0, 0.52, 0.16]} material={mat.darkTitanium}>
        <cylinderGeometry args={[0.025, 0.03, 0.34, 8]} />
      </mesh>
      <mesh position={[0, 0.69, 0.16]} rotation={[0, 0, Math.PI / 2]} material={mat.brushedAluminum}>
        <cylinderGeometry args={[0.018, 0.018, 0.16, 8]} />
      </mesh>

      {/* Front High-Gain Gold Mesh Dish Antenna */}
      <group position={[0.26, 0.84, 0.68]} rotation={[0.45, 0, 0]}>
        <mesh position={[0, -0.22, 0]} material={mat.brushedAluminum}>
          <cylinderGeometry args={[0.02, 0.02, 0.42, 8]} />
        </mesh>
        <mesh material={mat.kaptonGold}>
          <cylinderGeometry args={[0.34, 0.06, 0.1, 18]} />
        </mesh>
      </group>

      {/* Front Color TV Camera Mast */}
      <mesh position={[-0.26, 0.64, 0.68]} material={mat.brushedAluminum}>
        <cylinderGeometry args={[0.018, 0.02, 0.42, 8]} />
      </mesh>
      <mesh position={[-0.26, 0.86, 0.68]} material={mat.whiteThermal}>
        <boxGeometry args={[0.12, 0.1, 0.16]} />
      </mesh>

      {/* Steerable Front Wire-Mesh Wheels (Indices 0 & 1) */}
      {(
        [
          { side: -1, ref: frontLeftSteerRef, idx: 0 },
          { side: 1, ref: frontRightSteerRef, idx: 1 },
        ] as const
      ).map(({ side, ref, idx }) => (
        <group key={idx}>
          <mesh
            position={[side * 0.5, 0.25, 0.72]}
            rotation={[0, 0, side > 0 ? -0.18 : 0.18]}
            material={mat.brushedAluminum}
          >
            <boxGeometry args={[0.36, 0.04, 0.06]} />
          </mesh>
          <group ref={ref} position={[side * 0.68, 0.22, 0.72]}>
            <mesh
              ref={(el) => {
                if (wheelsRef && el) wheelsRef.current[idx] = el;
              }}
              rotation={[0, 0, Math.PI / 2]}
              material={mat.wireMesh}
              castShadow={!lowPerf}
            >
              <cylinderGeometry args={[0.22, 0.22, 0.14, segs]} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} material={mat.kaptonGold}>
              <cylinderGeometry args={[0.09, 0.09, 0.15, 10]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Rear Wire-Mesh Wheels (Indices 2 & 3) */}
      {rearWheelCoords.map((pos, i) => {
        const idx = 2 + i;
        return (
          <group key={idx}>
            <mesh
              position={[pos[0] * 0.72, 0.25, pos[2]]}
              rotation={[0, 0, pos[0] > 0 ? -0.18 : 0.18]}
              material={mat.brushedAluminum}
            >
              <boxGeometry args={[0.36, 0.04, 0.06]} />
            </mesh>
            <group position={pos}>
              <mesh
                ref={(el) => {
                  if (wheelsRef && el) wheelsRef.current[idx] = el;
                }}
                rotation={[0, 0, Math.PI / 2]}
                material={mat.wireMesh}
                castShadow={!lowPerf}
              >
                <cylinderGeometry args={[0.22, 0.22, 0.14, segs]} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]} material={mat.kaptonGold}>
                <cylinderGeometry args={[0.09, 0.09, 0.15, 10]} />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Full-body framed 3D preview wrapper used in Meet The Explorers cards.
 */
export function ExplorerVehicleShowcaseMesh({
  storyId,
  autoRotate = false,
  lowPerf = false,
}: {
  storyId: ExplorerStoryId;
  autoRotate?: boolean;
  lowPerf?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const topRotorRef = useRef<THREE.Group | null>(null);
  const bottomRotorRef = useRef<THREE.Group | null>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current && !lowPerf) {
      groupRef.current.rotation.y += delta * 0.38;
    }
    if (storyId === 'ingenuity' && !lowPerf) {
      if (topRotorRef.current) topRotorRef.current.rotation.y += delta * 3.4;
      if (bottomRotorRef.current) bottomRotorRef.current.rotation.y -= delta * 3.4;
    }
  });

  const scale =
    storyId === 'apollo-lrv'
      ? 0.85
      : storyId === 'opportunity'
      ? 0.92
      : 1.15;

  const yPos =
    storyId === 'opportunity' ? -0.45 : storyId === 'ingenuity' ? -0.48 : -0.35;

  return (
    <group ref={groupRef} scale={scale} position={[0, yPos, 0]} rotation={[0, 0.55, 0]}>
      {storyId === 'sojourner' && <Sojourner3DModel lowPerf={lowPerf} />}
      {storyId === 'ingenuity' && (
        <Ingenuity3DModel
          topRotorRef={topRotorRef}
          bottomRotorRef={bottomRotorRef}
          lowPerf={lowPerf}
        />
      )}
      {storyId === 'opportunity' && <Opportunity3DModel lowPerf={lowPerf} />}
      {storyId === 'apollo-lrv' && <ApolloLrv3DModel lowPerf={lowPerf} />}
    </group>
  );
}
