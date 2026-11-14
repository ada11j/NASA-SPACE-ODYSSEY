import { createNoise3D, createRandom, fbm3D } from '@/utils/noise';

/**
 * AREOGRAPHICALLY ANCHORED PROCEDURAL MARS TEXTURE — SOURCE NOTICE
 * ----------------------------------------------------------------
 * Generates a high-resolution equirectangular colour map, topographic bump
 * (elevation) map, and roughness map on the unit sphere.
 *
 * Major Martian geological formations (Olympus Mons, Tharsis Montes, Valles
 * Marineris canyon system, Hellas Planitia, Syrtis Major, Acidalia Planitia,
 * Isidis/Jezero basin, Gale Crater, and Planum Boreum / Planum Australe polar
 * caps) are mathematically synthesized at their real IAU / NASA MOLA
 * areographic coordinates `(lat, lonEast)` so 3D surface markers align
 * accurately with visible surface features.
 *
 * Note: While feature coordinates and regional albedo/elevation profiles are
 * based on NASA MOLA / USGS Astrogeology reference coordinates, the pixel
 * texture itself is procedurally synthesized at runtime.
 */

export interface MarsTextureSet {
  color: HTMLCanvasElement;
  bump: HTMLCanvasElement;
  roughness: HTMLCanvasElement;
}

type RGB = readonly [number, number, number];

// Rich Martian palette: basaltic dark plains → rust → ochre → dusty orange → polar water/CO2 ice.
const BASALT_DARK: RGB = [46, 22, 15];
const DEEP_BROWN: RGB = [68, 28, 16];
const DARK_RUST: RGB = [108, 42, 20];
const RUST: RGB = [156, 63, 29];
const MARS_RED: RGB = [188, 82, 39];
const ORANGE: RGB = [214, 118, 62];
const BRIGHT_DUST: RGB = [228, 162, 108];
const CALDERA_ASH: RGB = [132, 64, 38];
const POLAR_ICE: RGB = [242, 236, 228];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

function mixRGB(out: number[], a: RGB, b: RGB, t: number) {
  out[0] = a[0] + (b[0] - a[0]) * t;
  out[1] = a[1] + (b[1] - a[1]) * t;
  out[2] = a[2] + (b[2] - a[2]) * t;
}

function mixInto(out: number[], b: RGB, t: number) {
  out[0] += (b[0] - out[0]) * t;
  out[1] += (b[1] - out[1]) * t;
  out[2] += (b[2] - out[2]) * t;
}

/**
 * Converts planetocentric latitude (-90..+90) and East longitude (0..360)
 * into a 3D point on a Three.js SphereGeometry of the given radius.
 * Matches Three.js SphereGeometry UV parametrization 1:1.
 */
export function areographicToUnitVector(
  latDeg: number,
  lonEastDeg: number,
  radius = 1
): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180;
  const phi = (((lonEastDeg % 360) + 360) % 360) * (Math.PI / 180);
  const cosLat = Math.cos(lat);
  return [
    -radius * cosLat * Math.cos(phi),
    radius * Math.sin(lat),
    radius * cosLat * Math.sin(phi),
  ];
}

interface ShieldVolcano {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  calderaRadius: number;
  height: number;
}

// Olympus Mons & the 3 Tharsis Montes volcanoes at their real IAU coordinates
const SHIELD_VOLCANOES: ShieldVolcano[] = [
  // Olympus Mons (18.65°N, 226.2°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(18.65, 226.2);
    return { x, y, z, baseRadius: 0.115, calderaRadius: 0.018, height: 0.52 };
  })(),
  // Ascraeus Mons (11.9°N, 255.9°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(11.9, 255.9);
    return { x, y, z, baseRadius: 0.068, calderaRadius: 0.012, height: 0.36 };
  })(),
  // Pavonis Mons (1.5°N, 247.0°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(1.5, 247.0);
    return { x, y, z, baseRadius: 0.065, calderaRadius: 0.012, height: 0.32 };
  })(),
  // Arsia Mons (-8.4°S, 239.0°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(-8.4, 239.0);
    return { x, y, z, baseRadius: 0.072, calderaRadius: 0.015, height: 0.35 };
  })(),
  // Elysium Mons (25.0°N, 147.2°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(25.0, 147.2);
    return { x, y, z, baseRadius: 0.06, calderaRadius: 0.01, height: 0.28 };
  })(),
];

interface RegionalFeature {
  x: number;
  y: number;
  z: number;
  radius: number;
  albedoShift: number; // < 0 dark basaltic, > 0 bright dust/basin
  elevationShift: number;
}

const REGIONAL_FEATURES: RegionalFeature[] = [
  // Syrtis Major Planum (8.4°N, 69.5°E) - iconic dark basaltic shield
  (() => {
    const [x, y, z] = areographicToUnitVector(8.4, 69.5);
    return { x, y, z, radius: 0.28, albedoShift: -0.78, elevationShift: 0.05 };
  })(),
  // Acidalia Planitia (49.8°N, 339.3°E) - dark northern plain
  (() => {
    const [x, y, z] = areographicToUnitVector(49.8, 339.3);
    return { x, y, z, radius: 0.34, albedoShift: -0.68, elevationShift: -0.18 };
  })(),
  // Hellas Planitia (-42.4°S, 70.5°E) - giant deep bright-floored impact basin
  (() => {
    const [x, y, z] = areographicToUnitVector(-42.4, 70.5);
    return { x, y, z, radius: 0.29, albedoShift: 0.62, elevationShift: -0.34 };
  })(),
  // Tharsis Rise bulge (-2.0°S, 252.0°E) - high bright volcanic plateau
  (() => {
    const [x, y, z] = areographicToUnitVector(-2.0, 252.0);
    return { x, y, z, radius: 0.42, albedoShift: 0.45, elevationShift: 0.22 };
  })(),
  // Isidis Planitia & Jezero Border (14.0°N, 87.0°E)
  (() => {
    const [x, y, z] = areographicToUnitVector(14.0, 87.0);
    return { x, y, z, radius: 0.16, albedoShift: 0.35, elevationShift: -0.16 };
  })(),
  // Meridiani Planum (-2.0°S, 354.5°E) - dark hematite-bearing plain
  (() => {
    const [x, y, z] = areographicToUnitVector(-2.0, 354.5);
    return { x, y, z, radius: 0.22, albedoShift: -0.52, elevationShift: -0.05 };
  })(),
];

// Valles Marineris segment chain from Noctis Labyrinthus (7°S, 268°E) to Capri/Eos Chasma (14°S, 318°E)
const VALLES_POINTS: Array<[number, number, number]> = [
  areographicToUnitVector(-7.0, 268.0),
  areographicToUnitVector(-9.5, 280.0),
  areographicToUnitVector(-11.5, 292.0),
  areographicToUnitVector(-13.2, 305.0),
  areographicToUnitVector(-14.0, 317.0),
];

interface Crater {
  x: number;
  y: number;
  z: number;
  radius: number;
  cosOuter: number;
  depth: number;
}

function createCraters(count: number, seed: number): Crater[] {
  const random = createRandom(seed);
  const craters: Crater[] = [];

  // Named mission craters at exact coordinates
  const named: Array<{ lat: number; lon: number; radius: number; depth: number }> = [
    { lat: 18.38, lon: 77.58, radius: 0.028, depth: 0.28 }, // Jezero Crater
    { lat: -5.4, lon: 137.8, radius: 0.042, depth: 0.32 }, // Gale Crater
    { lat: -14.57, lon: 175.48, radius: 0.044, depth: 0.3 }, // Gusev Crater
    { lat: -33.0, lon: 309.0, radius: 0.14, depth: 0.26 }, // Argyre Basin
  ];

  for (const n of named) {
    const [x, y, z] = areographicToUnitVector(n.lat, n.lon);
    craters.push({
      x,
      y,
      z,
      radius: n.radius,
      cosOuter: Math.cos(n.radius * 1.4),
      depth: n.depth,
    });
  }

  for (let i = 0; i < count; i++) {
    const z = random() * 2 - 1;
    const phi = random() * Math.PI * 2;
    const r = Math.sqrt(1 - z * z);
    const radius = 0.011 + Math.pow(random(), 3) * 0.09;
    craters.push({
      x: r * Math.cos(phi),
      y: z,
      z: r * Math.sin(phi),
      radius,
      cosOuter: Math.cos(radius * 1.35),
      depth: 0.16 + random() * 0.18,
    });
  }
  return craters;
}

/**
 * Generates an equirectangular colour map, bump map, and roughness map.
 */
export function generateMarsTextures(width = 1024, seed = 1977): MarsTextureSet {
  const height = Math.round(width / 2);

  const terrainNoise = createNoise3D(seed);
  const albedoNoise = createNoise3D(seed + 101);
  const grainNoise = createNoise3D(seed + 202);
  const craters = createCraters(68, seed + 303);

  const colorCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  const roughnessCanvas = document.createElement('canvas');
  colorCanvas.width = bumpCanvas.width = roughnessCanvas.width = width;
  colorCanvas.height = bumpCanvas.height = roughnessCanvas.height = height;

  const colorCtx = colorCanvas.getContext('2d');
  const bumpCtx = bumpCanvas.getContext('2d');
  const roughnessCtx = roughnessCanvas.getContext('2d');
  if (!colorCtx || !bumpCtx || !roughnessCtx) {
    throw new Error('2D canvas context is not available for Mars texture generation.');
  }

  const colorImage = colorCtx.createImageData(width, height);
  const bumpImage = bumpCtx.createImageData(width, height);
  const roughnessImage = roughnessCtx.createImageData(width, height);
  const colorData = colorImage.data;
  const bumpData = bumpImage.data;
  const roughnessData = roughnessImage.data;

  // Match Three.js SphereGeometry UV mapping: phi = u * 2*PI, vx = -cos(phi)*cos(lat), vz = sin(phi)*cos(lat)
  const cosPhi = new Float32Array(width);
  const sinPhi = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    const phi = ((x + 0.5) / width) * Math.PI * 2;
    cosPhi[x] = -Math.cos(phi);
    sinPhi[x] = Math.sin(phi);
  }

  const rgb = [0, 0, 0];

  for (let y = 0; y < height; y++) {
    const lat = (0.5 - (y + 0.5) / height) * Math.PI;
    const cosLat = Math.cos(lat);
    const py = Math.sin(lat);
    const absLat = Math.abs(lat);

    for (let x = 0; x < width; x++) {
      const px = cosLat * cosPhi[x];
      const pz = cosLat * sinPhi[x];

      // Base spherical terrain & albedo fBm
      const terrain = fbm3D(terrainNoise, px * 2.4 + 7.1, py * 2.4, pz * 2.4, 6);
      let relief = clamp01((terrain - 0.28) / 0.44);
      const albedo = fbm3D(albedoNoise, px * 1.25 + 3.3, py * 1.25, pz * 1.25, 4);
      let darkRegion = smoothstep(0.51, 0.63, albedo);
      const grain = fbm3D(grainNoise, px * 10.5, py * 10.5, pz * 10.5, 3);

      // Apply anchored regional features (Syrtis Major, Acidalia, Hellas, Tharsis, Meridiani)
      let brightDustBoost = 0;
      for (let r = 0; r < REGIONAL_FEATURES.length; r++) {
        const reg = REGIONAL_FEATURES[r];
        const cosd = px * reg.x + py * reg.y + pz * reg.z;
        const dist = Math.acos(cosd > 1 ? 1 : cosd < -1 ? -1 : cosd);
        const effRad = reg.radius * (0.82 + terrain * 0.35);
        if (dist < effRad) {
          const w = 1 - smoothstep(effRad * 0.45, effRad, dist);
          relief = clamp01(relief + reg.elevationShift * w);
          if (reg.albedoShift < 0) {
            darkRegion = clamp01(darkRegion + -reg.albedoShift * w);
          } else {
            brightDustBoost = Math.max(brightDustBoost, reg.albedoShift * w);
            darkRegion = clamp01(darkRegion * (1 - w * 0.7));
          }
        }
      }

      // Apply Olympus Mons & Tharsis shield volcanoes
      let volcanoElevation = 0;
      let calderaDarken = 0;
      for (let v = 0; v < SHIELD_VOLCANOES.length; v++) {
        const vol = SHIELD_VOLCANOES[v];
        const cosd = px * vol.x + py * vol.y + pz * vol.z;
        const dist = Math.acos(cosd > 1 ? 1 : cosd);
        if (dist < vol.baseRadius) {
          const normDist = dist / vol.baseRadius;
          const cone = Math.pow(1 - normDist * normDist, 1.65) * vol.height;
          // Summit caldera depression
          const caldera =
            dist < vol.calderaRadius * 1.3
              ? -0.22 * (1 - smoothstep(vol.calderaRadius * 0.5, vol.calderaRadius * 1.3, dist))
              : 0;
          volcanoElevation += cone + caldera;
          calderaDarken = Math.max(calderaDarken, (1 - normDist) * 0.55);
        }
      }

      // Apply Valles Marineris tectonic canyon system
      let canyonDepth = 0;
      if (py > -0.35 && py < 0.05) {
        let minCanyonDist = 10;
        for (let s = 0; s < VALLES_POINTS.length - 1; s++) {
          const a = VALLES_POINTS[s];
          const b = VALLES_POINTS[s + 1];
          // Project P onto chord AB
          const abx = b[0] - a[0];
          const aby = b[1] - a[1];
          const abz = b[2] - a[2];
          const apx = px - a[0];
          const apy = py - a[1];
          const apz = pz - a[2];
          const abLenSq = abx * abx + aby * aby + abz * abz;
          const tProj = clamp01((apx * abx + apy * aby + apz * abz) / abLenSq);
          const cx = a[0] + abx * tProj;
          const cy = a[1] + aby * tProj;
          const cz = a[2] + abz * tProj;
          const dx = px - cx;
          const dy = py - cy;
          const dz = pz - cz;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < minCanyonDist) minCanyonDist = d;
        }
        const canyonWidth = 0.036 * (0.75 + grain * 0.5);
        if (minCanyonDist < canyonWidth) {
          const cw = 1 - smoothstep(canyonWidth * 0.25, canyonWidth, minCanyonDist);
          canyonDepth = cw * 0.44;
        }
      }

      // Impact craters (bowl + raised rim)
      let crater = 0;
      for (let i = 0; i < craters.length; i++) {
        const c = craters[i];
        const cosd = px * c.x + py * c.y + pz * c.z;
        if (cosd < c.cosOuter) continue;
        const t = Math.acos(cosd > 1 ? 1 : cosd) / c.radius;
        const bowl = t < 1 ? (t * t - 1) * 0.62 : 0;
        const rimT = (t - 1) / 0.18;
        crater += (bowl + Math.exp(-rimT * rimT) * 0.36) * c.depth;
      }

      // Base colour ramp across relief
      if (relief < 0.35) mixRGB(rgb, DARK_RUST, RUST, relief / 0.35);
      else if (relief < 0.68) mixRGB(rgb, RUST, MARS_RED, (relief - 0.35) / 0.33);
      else mixRGB(rgb, MARS_RED, ORANGE, (relief - 0.68) / 0.32);

      // Dark basaltic plains (Syrtis Major, Acidalia, Mare Erythraeum)
      mixInto(rgb, DEEP_BROWN, darkRegion * 0.68);
      if (darkRegion > 0.65) {
        mixInto(rgb, BASALT_DARK, (darkRegion - 0.65) * 0.85);
      }

      // Bright ochre dust plains (Hellas floor, Tharsis, Arabia Terra)
      mixInto(
        rgb,
        BRIGHT_DUST,
        clamp01(smoothstep(0.6, 0.95, relief) * 0.32 * (1 - darkRegion) + brightDustBoost * 0.48)
      );

      // Shield volcano flanks & summit caldera tint
      if (calderaDarken > 0.02) {
        mixInto(rgb, CALDERA_ASH, calderaDarken);
      }

      // Valles Marineris deep basaltic canyon shadow
      if (canyonDepth > 0.01) {
        mixInto(rgb, BASALT_DARK, clamp01(canyonDepth * 1.85));
      }

      const shade =
        (0.84 + grain * 0.32) *
        (1 + crater * 1.1 + volcanoElevation * 0.55 - canyonDepth * 0.65);
      rgb[0] = clamp01((rgb[0] * shade) / 255) * 255;
      rgb[1] = clamp01((rgb[1] * shade) / 255) * 255;
      rgb[2] = clamp01((rgb[2] * shade) / 255) * 255;

      // Planum Boreum (North) & Planum Australe (South) polar ice caps with spiral troughs
      const spiralPerturb = Math.sin(x * 0.045 + lat * 12.0) * 0.025;
      const capEdge =
        (lat > 0 ? 1.28 : 1.35) +
        (terrain - 0.5) * 0.36 +
        (grain - 0.5) * 0.1 +
        spiralPerturb;
      const cap = smoothstep(capEdge, capEdge + 0.065, absLat);
      if (cap > 0) {
        mixInto(rgb, POLAR_ICE, cap * 0.92);
      }

      const idx = (y * width + x) * 4;
      colorData[idx] = rgb[0];
      colorData[idx + 1] = rgb[1];
      colorData[idx + 2] = rgb[2];
      colorData[idx + 3] = 255;

      const h =
        clamp01(
          relief * 0.52 +
            grain * 0.12 +
            crater * 0.85 +
            volcanoElevation * 0.95 -
            canyonDepth * 0.9 +
            cap * 0.14 +
            0.22
        ) * 255;
      bumpData[idx] = h;
      bumpData[idx + 1] = h;
      bumpData[idx + 2] = h;
      bumpData[idx + 3] = 255;

      // Roughness: polar ice caps & smooth basaltic shields reflect subtle sunlight; dust is matte
      const roughVal =
        clamp01(0.92 - cap * 0.34 - darkRegion * 0.1 + (grain - 0.5) * 0.08) * 255;
      roughnessData[idx] = roughVal;
      roughnessData[idx + 1] = roughVal;
      roughnessData[idx + 2] = roughVal;
      roughnessData[idx + 3] = 255;
    }
  }

  colorCtx.putImageData(colorImage, 0, 0);
  bumpCtx.putImageData(bumpImage, 0, 0);
  roughnessCtx.putImageData(roughnessImage, 0, 0);

  return { color: colorCanvas, bump: bumpCanvas, roughness: roughnessCanvas };
}
