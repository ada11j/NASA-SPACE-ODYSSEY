import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Vector3, type DirectionalLight, type Group } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SceneCanvas } from '@/canvas/SceneCanvas';
import type { MarsHeroHotspot } from '@/data/marsHeroHotspots';
import { MarsAtmosphere } from '@/scenes/mars/MarsAtmosphere';
import { MarsGlobe } from '@/scenes/mars/MarsGlobe';

/** Initial direction towards the sun (upper right, slightly in front). */
const SUN_POSITION: [number, number, number] = [5, 1.6, 3.4];
/** Mars' real axial tilt is ~25.2°. */
const MARS_AXIAL_TILT = (25.2 * Math.PI) / 180;
const CAMERA = { position: [0, 0, 6] as [number, number, number], fov: 45 };

export interface MarsSceneProps {
  textureWidth: number;
  reducedMotion: boolean;
  compact: boolean;
  selectedHotspotId: string | null;
  focusTrigger: number;
  zoomCommand: { step: number; seq: number };
  onSelectHotspot: (hotspot: MarsHeroHotspot) => void;
  onHoverHotspot?: (hotspot: MarsHeroHotspot | null) => void;
  onInteractionStateChange?: (interacting: boolean) => void;
}

interface ResponsiveMarsProps {
  textureWidth: number;
  reducedMotion: boolean;
  isUserInteracting: boolean;
  lastInteractionEndMs: number;
  selectedHotspotId: string | null;
  focusTrigger: number;
  sunLightRef: React.RefObject<DirectionalLight | null>;
  onSelectHotspot: (hotspot: MarsHeroHotspot) => void;
  onHoverHotspot?: (hotspot: MarsHeroHotspot | null) => void;
}

/**
 * Keeps the planet sized relative to the visible viewport at the reference
 * camera distance (6 units) so it frames well on phones and desktops, while
 * allowing OrbitControls to zoom the camera closer or farther.
 */
function ResponsiveMars({
  textureWidth,
  reducedMotion,
  isUserInteracting,
  lastInteractionEndMs,
  selectedHotspotId,
  focusTrigger,
  sunLightRef,
  onSelectHotspot,
  onHoverHotspot,
}: ResponsiveMarsProps) {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  // Compute reference viewport dimensions at default camera distance Z=6 so zooming
  // the camera actually magnifies the planet instead of being cancelled by viewport rescaling.
  const fovRad = ('fov' in camera ? (camera.fov * Math.PI) / 180 : (45 * Math.PI) / 180);
  const refHeight = 2 * Math.tan(fovRad / 2) * 6;
  const refWidth = refHeight * (size.width / Math.max(1, size.height));
  const isPortrait = refWidth < refHeight;
  const radius = Math.min(refWidth, refHeight) * (isPortrait ? 0.44 : 0.38);
  const offsetY = -refHeight * 0.04;

  return (
    <group position={[0, offsetY, 0]} scale={radius}>
      <group rotation={[0, 0, MARS_AXIAL_TILT]}>
        <MarsGlobe
          textureWidth={textureWidth}
          rotationSpeed={reducedMotion ? 0 : 0.048}
          isUserInteracting={isUserInteracting}
          lastInteractionEndMs={lastInteractionEndMs}
          selectedHotspotId={selectedHotspotId}
          focusTrigger={focusTrigger}
          onSelectHotspot={onSelectHotspot}
          onHoverHotspot={onHoverHotspot}
        />
      </group>
      <MarsAtmosphere lightDirection={SUN_POSITION} sunLightRef={sunLightRef} />
    </group>
  );
}

interface SolarAndOrbitRigProps {
  reducedMotion: boolean;
  compact: boolean;
  zoomCommand: { step: number; seq: number };
  sunLightRef: React.RefObject<DirectionalLight | null>;
  onInteractStart: () => void;
  onInteractEnd: () => void;
}

/**
 * Manages the deep 3D star shell, OrbitControls (360° drag rotation, mouse-wheel
 * zoom, mobile touch gestures), and camera-relative solar phase lighting so
 * whichever side of Mars the user rotates into view is realistically illuminated.
 */
function SolarAndOrbitRig({
  reducedMotion,
  compact,
  zoomCommand,
  sunLightRef,
  onInteractStart,
  onInteractEnd,
}: SolarAndOrbitRigProps) {
  const starsRef = useRef<Group>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const glDomElement = useThree((state) => state.gl.domElement);

  const camForward = useRef(new Vector3());
  const camRight = useRef(new Vector3());
  const camUp = useRef(new Vector3());
  const sunPos = useRef(new Vector3(...SUN_POSITION));

  // Track mouse wheel activity on the canvas so wheel zooming also pauses & smoothly resumes rotation
  useEffect(() => {
    let wheelTimeout: number | undefined;
    const handleWheel = () => {
      onInteractStart();
      if (wheelTimeout !== undefined) {
        window.clearTimeout(wheelTimeout);
      }
      wheelTimeout = window.setTimeout(() => {
        onInteractEnd();
      }, 220);
    };
    glDomElement.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      glDomElement.removeEventListener('wheel', handleWheel);
      if (wheelTimeout !== undefined) {
        window.clearTimeout(wheelTimeout);
      }
    };
  }, [glDomElement, onInteractStart, onInteractEnd]);

  // Execute HUD zoom in / zoom out / reset commands
  useEffect(() => {
    if (zoomCommand.seq === 0 || !controlsRef.current) return;
    const controls = controlsRef.current;
    const cam = controls.object;

    if (zoomCommand.step === 0) {
      // Reset view
      controls.reset();
      cam.position.set(0, 0, 6);
      controls.update();
    } else {
      const currentDist = cam.position.length();
      const nextDist = Math.min(8.6, Math.max(3.0, currentDist + zoomCommand.step));
      cam.position.normalize().multiplyScalar(nextDist);
      controls.update();
    }
    onInteractEnd();
  }, [zoomCommand, onInteractEnd]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    if (!reducedMotion && starsRef.current) {
      starsRef.current.rotation.y += dt * 0.005;
    }

    // Keep the primary directional Sun light at an upper-right ~50° phase angle
    // relative to the camera view so 360° inspection never leaves the viewed side in darkness.
    if (sunLightRef.current) {
      const cam = state.camera;
      camForward.current.copy(cam.position).normalize();
      camUp.current.copy(cam.up).normalize();
      camRight.current.crossVectors(camUp.current, camForward.current).normalize();
      const orthoUp = camUp.current.crossVectors(camForward.current, camRight.current).normalize();

      sunPos.current
        .set(0, 0, 0)
        .addScaledVector(camForward.current, 3.4)
        .addScaledVector(camRight.current, 5.0)
        .addScaledVector(orthoUp, 1.6);

      sunLightRef.current.position.copy(sunPos.current);
    }
  });

  return (
    <>
      <group ref={starsRef}>
        <Stars
          radius={60}
          depth={50}
          count={compact ? 1200 : 2400}
          factor={3}
          saturation={0}
          fade
          speed={reducedMotion ? 0 : 0.6}
        />
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.62}
        zoomSpeed={0.85}
        minDistance={3.0}
        maxDistance={8.6}
        minPolarAngle={0.16}
        maxPolarAngle={Math.PI - 0.16}
        onStart={onInteractStart}
        onEnd={onInteractEnd}
      />
    </>
  );
}

/**
 * Interactive Hero 3D Mars Scene:
 * - Continuous axial rotation that pauses on user drag/zoom and smoothly resumes
 * - 360° mouse & touch rotation + wheel & pinch zoom
 * - High-resolution areographically anchored texture (Olympus Mons, Valles Marineris, Jezero, Polar Caps)
 * - Surface-locked 3D clickable hotspots
 */
export function MarsScene({
  textureWidth,
  reducedMotion,
  compact,
  selectedHotspotId,
  focusTrigger,
  zoomCommand,
  onSelectHotspot,
  onHoverHotspot,
  onInteractionStateChange,
}: MarsSceneProps) {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [lastInteractionEndMs, setLastInteractionEndMs] = useState(0);
  const sunLightRef = useRef<DirectionalLight | null>(null);

  const handleInteractStart = () => {
    setIsUserInteracting(true);
    onInteractionStateChange?.(true);
  };

  const handleInteractEnd = () => {
    setIsUserInteracting(false);
    setLastInteractionEndMs(performance.now());
    onInteractionStateChange?.(false);
  };

  return (
    <SceneCanvas className="scene-viewport--mars" camera={CAMERA} maxDpr={compact ? 1.5 : 1.75}>
      <ambientLight intensity={0.08} color="#9fb4ff" />
      <directionalLight ref={sunLightRef} position={SUN_POSITION} intensity={2.75} color="#fff1e0" />
      <directionalLight position={[-6, 1, -4]} intensity={0.26} color="#5a78ff" />

      <SolarAndOrbitRig
        reducedMotion={reducedMotion}
        compact={compact}
        zoomCommand={zoomCommand}
        sunLightRef={sunLightRef}
        onInteractStart={handleInteractStart}
        onInteractEnd={handleInteractEnd}
      />

      <ResponsiveMars
        textureWidth={textureWidth}
        reducedMotion={reducedMotion}
        isUserInteracting={isUserInteracting}
        lastInteractionEndMs={lastInteractionEndMs}
        selectedHotspotId={selectedHotspotId}
        focusTrigger={focusTrigger}
        sunLightRef={sunLightRef}
        onSelectHotspot={onSelectHotspot}
        onHoverHotspot={onHoverHotspot}
      />
    </SceneCanvas>
  );
}

export default MarsScene;
