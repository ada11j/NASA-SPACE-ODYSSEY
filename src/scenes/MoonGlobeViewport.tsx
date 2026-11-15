import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  Vector3,
  type Group,
} from 'three';
import { useLanguage } from '@/context/LanguageContext';
import type { LunarMissionId, LunarMissionItem } from '@/types';
import { generateMoonTextures } from '@/utils/moonTexture';

export interface MoonGlobeViewportProps {
  selectedMissionId: LunarMissionId;
  autoRotate: boolean;
  showLandmarks: boolean;
  onSelectMission: (missionId: LunarMissionId) => void;
}

const MOON_RADIUS = 1.46;

function latLonToCartesian(latDeg: number, lonDeg: number, radius: number): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [
    radius * cosLat * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * cosLat * Math.sin(lon),
  ];
}

interface InteractiveMoonSphereProps extends MoonGlobeViewportProps {
  missions: readonly LunarMissionItem[];
  onHoverMission: (mission: LunarMissionItem | null) => void;
}

function InteractiveMoonSphere({
  missions,
  selectedMissionId,
  autoRotate,
  showLandmarks,
  onSelectMission,
  onHoverMission,
}: InteractiveMoonSphereProps) {
  const moonGroupRef = useRef<Group>(null);
  const pulseRingRef = useRef<Group>(null);
  const targetRotationY = useRef<number | null>(null);

  const { colorMap, bumpMap } = useMemo(() => {
    const { color, bump } = generateMoonTextures(1024, 1969);

    const cTex = new CanvasTexture(color);
    cTex.colorSpace = SRGBColorSpace;
    cTex.minFilter = LinearMipmapLinearFilter;
    cTex.magFilter = LinearFilter;
    cTex.anisotropy = 4;
    cTex.needsUpdate = true;

    const bTex = new CanvasTexture(bump);
    bTex.minFilter = LinearMipmapLinearFilter;
    bTex.magFilter = LinearFilter;
    bTex.needsUpdate = true;

    return { colorMap: cTex, bumpMap: bTex };
  }, []);

  useEffect(() => {
    return () => {
      colorMap.dispose();
      bumpMap.dispose();
    };
  }, [colorMap, bumpMap]);

  // Whenever selectedMissionId changes, orient the globe so the landing site faces toward the camera (+X / +Z view)
  useEffect(() => {
    const mission = missions.find((m) => m.id === selectedMissionId);
    if (!mission) return;
    // Camera is at [3.1, 0.85, 2.2] (azimuth angle ~ 0.62 rad from +X toward +Z)
    const cameraAzimuth = Math.atan2(2.2, 3.1);
    const siteLonRad = (mission.lon * Math.PI) / 180;
    targetRotationY.current = siteLonRad - cameraAzimuth;
  }, [missions, selectedMissionId]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    if (moonGroupRef.current) {
      if (targetRotationY.current !== null && !autoRotate) {
        const current = moonGroupRef.current.rotation.y;
        const diff = targetRotationY.current - current;
        if (Math.abs(diff) > 0.005) {
          moonGroupRef.current.rotation.y += diff * Math.min(1, dt * 4.5);
        } else {
          targetRotationY.current = null;
        }
      } else if (autoRotate) {
        moonGroupRef.current.rotation.y += dt * 0.14;
      }
    }

    if (pulseRingRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3.8) * 0.22;
      pulseRingRef.current.scale.set(s, s, s);
    }
  });

  const handleMarkerClick =
    (missionId: LunarMissionId) => (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      targetRotationY.current = null;
      onSelectMission(missionId);
    };

  return (
    <group ref={moonGroupRef}>
      {/* Main 3D Lunar Sphere with Maria, Highlands & Crater Bump Relief */}
      <mesh>
        <sphereGeometry args={[MOON_RADIUS, 72, 72]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.048}
          roughness={0.88}
          metalness={0.06}
        />
      </mesh>

      {/* Subtle Lunar Exosphere / Limb Scattering Rim Glow */}
      <mesh scale={1.032}>
        <sphereGeometry args={[MOON_RADIUS, 48, 48]} />
        <meshBasicMaterial
          color="#93c5fd"
          transparent
          opacity={0.08}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Optional Selenographic Equator & Prime Meridian Rings */}
      {showLandmarks && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[MOON_RADIUS * 1.008, MOON_RADIUS * 1.012, 96]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.22} side={2} />
          </mesh>
          <mesh>
            <ringGeometry args={[MOON_RADIUS * 1.008, MOON_RADIUS * 1.012, 96]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.16} side={2} />
          </mesh>
        </group>
      )}

      {/* 3D Landing Site Markers for all 9 Lunar Missions */}
      {missions.map((mission) => {
        const isSelected = mission.id === selectedMissionId;
        const pos = latLonToCartesian(mission.lat, mission.lon, MOON_RADIUS * 1.012);
        const normal = new Vector3(pos[0], pos[1], pos[2]).normalize();
        const stalkEnd: [number, number, number] = [
          normal.x * (MOON_RADIUS * (isSelected ? 1.13 : 1.075)),
          normal.y * (MOON_RADIUS * (isSelected ? 1.13 : 1.075)),
          normal.z * (MOON_RADIUS * (isSelected ? 1.13 : 1.075)),
        ];

        return (
          <group key={mission.id}>
            {/* Surface Base Pad */}
            <mesh
              position={pos}
              onClick={handleMarkerClick(mission.id)}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverMission(mission);
              }}
              onPointerOut={() => onHoverMission(null)}
            >
              <sphereGeometry args={[isSelected ? 0.048 : 0.032, 16, 16]} />
              <meshStandardMaterial
                color={mission.markerColor}
                emissive={mission.markerColor}
                emissiveIntensity={isSelected ? 1.2 : 0.55}
              />
            </mesh>

            {/* Elevated Orbital Beacon Sphere */}
            <mesh
              position={stalkEnd}
              onClick={handleMarkerClick(mission.id)}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverMission(mission);
              }}
              onPointerOut={() => onHoverMission(null)}
            >
              <sphereGeometry args={[isSelected ? 0.056 : 0.036, 18, 18]} />
              <meshStandardMaterial
                color={isSelected ? '#ffffff' : mission.markerColor}
                emissive={mission.markerColor}
                emissiveIntensity={isSelected ? 1.5 : 0.75}
              />
            </mesh>

            {/* Pulsing Halo around the Currently Selected Landing Site */}
            {isSelected && (
              <group ref={pulseRingRef} position={stalkEnd}>
                <mesh>
                  <sphereGeometry args={[0.095, 20, 20]} />
                  <meshBasicMaterial
                    color={mission.markerColor}
                    transparent
                    opacity={0.32}
                    wireframe
                  />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function MoonGlobeViewport(props: MoonGlobeViewportProps) {
  const { t } = useLanguage();
  const gUi = t.ui.moonGlobe;
  const missions = t.data.lunarMissions;
  const [hoveredMission, setHoveredMission] = useState<LunarMissionItem | null>(null);
  const activeMission =
    hoveredMission ??
    missions.find((m) => m.id === props.selectedMissionId) ??
    missions[0];

  return (
    <div className="moon-globe-viewport">
      <Canvas dpr={[1, 1.75]} camera={{ position: [3.1, 0.85, 2.2], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.42} color="#cbd5e1" />
          <directionalLight position={[6, 3.5, 4.5]} intensity={2.45} color="#f8fafc" />
          <directionalLight position={[-5, -2, -4]} intensity={0.55} color="#60a5fa" />

          <InteractiveMoonSphere
            {...props}
            missions={missions}
            onHoverMission={setHoveredMission}
          />

          <OrbitControls
            enablePan={false}
            minDistance={2.25}
            maxDistance={5.2}
            rotateSpeed={0.65}
          />
        </Suspense>
      </Canvas>

      {/* Live Selenographic HUD Overlay inside the 3D Viewport */}
      <div className="moon-globe-hud" aria-live="polite">
        <div className="moon-globe-hud__top">
          <span className="moon-globe-hud__badge">{gUi.hudBadge}</span>
          <span className="moon-globe-hud__coords">
            {activeMission.landingCoordinates} · {activeMission.hemisphereLabel}
          </span>
        </div>
        <div className="moon-globe-hud__bottom">
          <div>
            <span className="moon-globe-hud__label">{t.ui.lunarExploration.selectedMissionPanelBadge}</span>
            <strong className="moon-globe-hud__site">
              {activeMission.name} — {activeMission.landingSite}
            </strong>
          </div>
          <span className="moon-globe-hud__hint">
            {gUi.hudHint}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MoonGlobeViewport;
