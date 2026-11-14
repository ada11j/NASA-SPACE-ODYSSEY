import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BackSide, Color, FrontSide, Vector3, type DirectionalLight } from 'three';
import type { RefObject } from 'react';

interface MarsAtmosphereProps {
  /** Initial world-space direction towards the sun. */
  lightDirection: [number, number, number];
  /** Optional ref to the active directional sun light so rim lighting tracks camera orbit. */
  sunLightRef?: RefObject<DirectionalLight | null>;
}

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;

  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Thin rim hugging the planet surface (front faces).
const rimFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uIntensity;
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(-vViewPosition);
    float fresnel = pow(1.0 - clamp(dot(vViewNormal, viewDir), 0.0, 1.0), 3.0);
    float lit = 0.25 + 0.75 * smoothstep(-0.25, 0.6, dot(vWorldNormal, uLightDir));
    gl_FragColor = vec4(uColor, fresnel * lit * uIntensity);
  }
`;

// Soft outer halo (back faces of a larger shell), fading outwards.
const haloFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uLightDir;
  uniform float uIntensity;
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(-vViewPosition);
    float edge = clamp(abs(dot(vViewNormal, viewDir)) / 0.5, 0.0, 1.0);
    float glow = pow(edge, 2.2);
    float lit = 0.2 + 0.8 * smoothstep(-0.35, 0.6, dot(vWorldNormal, uLightDir));
    gl_FragColor = vec4(uColor, glow * lit * uIntensity);
  }
`;

/**
 * Lightweight two-layer Fresnel atmosphere (no post-processing required).
 */
export function MarsAtmosphere({ lightDirection, sunLightRef }: MarsAtmosphereProps) {
  const uniforms = useMemo(() => {
    const lightDir = new Vector3(...lightDirection).normalize();
    return {
      rim: {
        uColor: { value: new Color('#ff9a66') },
        uLightDir: { value: lightDir.clone() },
        uIntensity: { value: 0.88 },
      },
      halo: {
        uColor: { value: new Color('#e2643a') },
        uLightDir: { value: lightDir.clone() },
        uIntensity: { value: 0.56 },
      },
    };
  }, [lightDirection]);

  useFrame(() => {
    if (sunLightRef?.current) {
      uniforms.rim.uLightDir.value.copy(sunLightRef.current.position).normalize();
      uniforms.halo.uLightDir.value.copy(sunLightRef.current.position).normalize();
    }
  });

  return (
    <group>
      <mesh scale={1.013} raycast={() => null}>
        <sphereGeometry args={[1, 64, 48]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={rimFragmentShader}
          uniforms={uniforms.rim}
          side={FrontSide}
          blending={AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.145} raycast={() => null}>
        <sphereGeometry args={[1, 64, 48]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={haloFragmentShader}
          uniforms={uniforms.halo}
          side={BackSide}
          blending={AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
