import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import {
  CanvasTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  SRGBColorSpace,
  Vector3,
  type Group,
} from 'three';
import { MARS_HERO_HOTSPOTS, type MarsHeroHotspot } from '@/data/marsHeroHotspots';
import { areographicToUnitVector, generateMarsTextures } from '@/utils/marsTexture';

export interface MarsGlobeProps {
  /** Width of the generated equirectangular texture (height = width / 2). */
  textureWidth: number;
  /** Base self-rotation speed in radians per second. */
  rotationSpeed: number;
  /** Whether the user is currently dragging/zooming the planet. */
  isUserInteracting: boolean;
  /** Timestamp (ms) of the last user interaction end. */
  lastInteractionEndMs: number;
  /** Currently selected hotspot ID (if any). */
  selectedHotspotId: string | null;
  /** Incremented counter when the user selects a hotspot from the HUD chip bar to orient the globe. */
  focusTrigger: number;
  /** Callback when a hotspot marker on the 3D globe is clicked. */
  onSelectHotspot: (hotspot: MarsHeroHotspot) => void;
  /** Callback when a hotspot marker is hovered. */
  onHoverHotspot?: (hotspot: MarsHeroHotspot | null) => void;
}

/**
 * Unit-radius Mars sphere with an areographically anchored colour, bump,
 * and roughness map plus 3D surface hotspot markers that rotate with the globe.
 */
export function MarsGlobe({
  textureWidth,
  rotationSpeed,
  isUserInteracting,
  lastInteractionEndMs,
  selectedHotspotId,
  focusTrigger,
  onSelectHotspot,
  onHoverHotspot,
}: MarsGlobeProps) {
  const globeGroupRef = useRef<Group>(null);
  const pulseRingRef = useRef<Group>(null);
  const speedFactorRef = useRef(1);
  const targetRotationYRef = useRef<number | null>(null);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const camera = useThree((state) => state.camera);

  const { map, bumpMap, roughnessMap } = useMemo(() => {
    const { color, bump, roughness } = generateMarsTextures(textureWidth);

    const colorTexture = new CanvasTexture(color);
    colorTexture.colorSpace = SRGBColorSpace;
    colorTexture.minFilter = LinearMipmapLinearFilter;
    colorTexture.magFilter = LinearFilter;
    colorTexture.anisotropy = 8;
    colorTexture.needsUpdate = true;

    const bumpTexture = new CanvasTexture(bump);
    bumpTexture.minFilter = LinearMipmapLinearFilter;
    bumpTexture.magFilter = LinearFilter;
    bumpTexture.needsUpdate = true;

    const roughTexture = new CanvasTexture(roughness);
    roughTexture.minFilter = LinearMipmapLinearFilter;
    roughTexture.magFilter = LinearFilter;
    roughTexture.needsUpdate = true;

    return { map: colorTexture, bumpMap: bumpTexture, roughnessMap: roughTexture };
  }, [textureWidth]);

  useEffect(
    () => () => {
      map.dispose();
      bumpMap.dispose();
      roughnessMap.dispose();
    },
    [map, bumpMap, roughnessMap]
  );

  // Orient the Mars globe toward the selected hotspot when triggered from the HUD
  useEffect(() => {
    if (!selectedHotspotId || focusTrigger === 0 || !globeGroupRef.current) return;
    const spot = MARS_HERO_HOTSPOTS.find((h) => h.id === selectedHotspotId);
    if (!spot) return;

    const phi = (((spot.lonEast % 360) + 360) % 360) * (Math.PI / 180);
    const camAz = Math.atan2(camera.position.x, camera.position.z);
    const rawTarget = Math.PI / 2 - phi - camAz;

    // Shortest angular path from current rotation.y
    const current = globeGroupRef.current.rotation.y;
    const twoPi = Math.PI * 2;
    const deltaAngle = ((((rawTarget - current) % twoPi) + twoPi + Math.PI) % twoPi) - Math.PI;
    targetRotationYRef.current = current + deltaAngle;
  }, [selectedHotspotId, focusTrigger, camera]);

  // Cancel scripted orientation if the user grabs the globe
  useEffect(() => {
    if (isUserInteracting) {
      targetRotationYRef.current = null;
    }
  }, [isUserInteracting]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);

    if (globeGroupRef.current) {
      if (targetRotationYRef.current !== null && !isUserInteracting) {
        const diff = targetRotationYRef.current - globeGroupRef.current.rotation.y;
        if (Math.abs(diff) > 0.004) {
          globeGroupRef.current.rotation.y += diff * Math.min(1, dt * 4.5);
        } else {
          targetRotationYRef.current = null;
        }
      } else {
        // Pause rotation immediately on user interaction; after release, wait 1.1s then smoothly ease back
        const msSinceRelease = performance.now() - lastInteractionEndMs;
        const shouldPause = isUserInteracting || msSinceRelease < 1100;
        const targetFactor = shouldPause ? 0 : selectedHotspotId ? 0.18 : 1;

        const lerpRate = shouldPause ? 9.5 : 1.6;
        speedFactorRef.current +=
          (targetFactor - speedFactorRef.current) * Math.min(1, dt * lerpRate);

        if (rotationSpeed > 0) {
          globeGroupRef.current.rotation.y += dt * rotationSpeed * speedFactorRef.current;
        }
      }
    }

    if (pulseRingRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4.2) * 0.24;
      pulseRingRef.current.scale.set(s, s, s);
    }
  });

  const handleMarkerClick =
    (hotspot: MarsHeroHotspot) => (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      targetRotationYRef.current = null;
      onSelectHotspot(hotspot);
    };

  return (
    <group ref={globeGroupRef} rotation={[0, 2.2, 0]}>
      {/* Main 3D Mars Sphere */}
      <mesh>
        <sphereGeometry args={[1, 96, 64]} />
        <meshStandardMaterial
          map={map}
          bumpMap={bumpMap}
          bumpScale={2.6}
          roughnessMap={roughnessMap}
          roughness={0.92}
          metalness={0.03}
        />
      </mesh>

      {/* Surface-Locked 3D Geological & Mission Hotspots */}
      {MARS_HERO_HOTSPOTS.map((spot) => {
        const isSelected = spot.id === selectedHotspotId;
        const isHovered = spot.id === hoveredHotspotId;
        const isActive = isSelected || isHovered;

        const surfacePos = areographicToUnitVector(spot.lat, spot.lonEast, 1.006);
        const normal = new Vector3(surfacePos[0], surfacePos[1], surfacePos[2]).normalize();
        const pinHeadPos: [number, number, number] = [
          normal.x * (isActive ? 1.062 : 1.038),
          normal.y * (isActive ? 1.062 : 1.038),
          normal.z * (isActive ? 1.062 : 1.038),
        ];

        return (
          <group key={spot.id}>
            {/* Generous Invisible Hit Target for Easy Mouse & Mobile Touch Clicking */}
            <mesh
              position={pinHeadPos}
              onClick={handleMarkerClick(spot)}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredHotspotId(spot.id);
                onHoverHotspot?.(spot);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredHotspotId((prev) => (prev === spot.id ? null : prev));
                onHoverHotspot?.(null);
                document.body.style.cursor = '';
              }}
            >
              <sphereGeometry args={[0.068, 12, 12]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Surface Anchor Disc */}
            <mesh position={surfacePos} raycast={() => null}>
              <sphereGeometry args={[isActive ? 0.024 : 0.017, 14, 14]} />
              <meshStandardMaterial
                color={spot.color}
                emissive={spot.color}
                emissiveIntensity={isActive ? 1.4 : 0.7}
              />
            </mesh>

            {/* Elevated Glowing Telemetry Beacon */}
            <mesh position={pinHeadPos} raycast={() => null}>
              <sphereGeometry args={[isActive ? 0.032 : 0.022, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#ffffff' : spot.color}
                emissive={spot.color}
                emissiveIntensity={isActive ? 1.8 : 0.95}
              />
            </mesh>

            {/* Pulsing Outer Halo for Active/Selected Hotspot */}
            {isActive && (
              <group ref={isSelected ? pulseRingRef : undefined} position={pinHeadPos}>
                <mesh raycast={() => null}>
                  <sphereGeometry args={[0.054, 16, 16]} />
                  <meshBasicMaterial
                    color={spot.color}
                    transparent
                    opacity={0.36}
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
