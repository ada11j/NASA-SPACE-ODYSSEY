import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { APP_CONFIG } from '@/config/constants';
import type { CameraConfig } from '@/types';

interface SceneCanvasProps {
  children: ReactNode;
  /** Extra class names for the viewport wrapper. */
  className?: string;
  /** Optional camera override; defaults to APP_CONFIG.defaultCamera. */
  camera?: CameraConfig;
  /** Upper bound for device pixel ratio (performance guard). */
  maxDpr?: number;
}

/**
 * Reusable, transparent React Three Fiber viewport.
 * Scenes are passed as children so the same canvas setup can host Mars,
 * the Moon or any later 3D section.
 */
export function SceneCanvas({
  children,
  className,
  camera = APP_CONFIG.defaultCamera,
  maxDpr = 1.75,
}: SceneCanvasProps) {
  return (
    <div className={`scene-viewport ${className ?? ''}`.trim()} aria-hidden="true">
      <Canvas
        dpr={[1, maxDpr]}
        camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
