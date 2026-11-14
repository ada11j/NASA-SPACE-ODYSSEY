import { createNoise3D, createRandom, fbm3D } from '@/utils/noise';

/**
 * PROCEDURAL SELENOGRAPHIC MOON TEXTURE — SOURCE NOTICE
 * -----------------------------------------------------
 * Generates an equirectangular colour map and matching bump (height) map for
 * the interactive 3D Moon globe. Major Lunar Maria (Mare Imbrium, Oceanus
 * Procellarum, Mare Serenitatis, Mare Tranquillitatis, Mare Crisium, and the
 * South Pole–Aitken Basin) are anchored near their real selenographic
 * coordinates, combined with 3D spherical fBm highland relief and multi-scale
 * impact craters so landing site markers align with recognizable lunar basins.
 */

export interface MoonTextureSet {
  color: HTMLCanvasElement;
  bump: HTMLCanvasElement;
}

type RGB = readonly [number, number, number];

const MARE_DARK: RGB = [56, 62, 74];
const MARE_MID: RGB = [82, 89, 102];
const HIGHLAND_LOW: RGB = [132, 139, 152];
const HIGHLAND_MID: RGB = [174, 181, 194];
const HIGHLAND_BRIGHT: RGB = [216, 222, 232];
const EJECTA_RAY: RGB = [238, 242, 249];

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

interface SelenographicBasin {
  x: number;
  y: number;
  z: number;
  angularRadius: number;
  darkness: number;
}

function latLonToUnitVector(latDeg: number, lonDeg: number): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const cosLat = Math.cos(lat);
  return [cosLat * Math.cos(lon), Math.sin(lat), -cosLat * Math.sin(lon)];
}

const MAJOR_MARIA_BASINS: SelenographicBasin[] = [
  // Mare Imbrium
  (() => {
    const [x, y, z] = latLonToUnitVector(33, -16);
    return { x, y, z, angularRadius: 0.34, darkness: 0.88 };
  })(),
  // Oceanus Procellarum (north & south lobes)
  (() => {
    const [x, y, z] = latLonToUnitVector(18, -57);
    return { x, y, z, angularRadius: 0.46, darkness: 0.82 };
  })(),
  (() => {
    const [x, y, z] = latLonToUnitVector(-4, -46);
    return { x, y, z, angularRadius: 0.36, darkness: 0.76 };
  })(),
  // Mare Serenitatis
  (() => {
    const [x, y, z] = latLonToUnitVector(28, 18);
    return { x, y, z, angularRadius: 0.25, darkness: 0.86 };
  })(),
  // Mare Tranquillitatis
  (() => {
    const [x, y, z] = latLonToUnitVector(9, 31);
    return { x, y, z, angularRadius: 0.27, darkness: 0.84 };
  })(),
  // Mare Crisium
  (() => {
    const [x, y, z] = latLonToUnitVector(17, 59);
    return { x, y, z, angularRadius: 0.17, darkness: 0.85 };
  })(),
  // Mare Nubium & Mare Humorum
  (() => {
    const [x, y, z] = latLonToUnitVector(-21, -17);
    return { x, y, z, angularRadius: 0.26, darkness: 0.75 };
  })(),
  // South Pole-Aitken Basin (Far side subtle darker depression)
  (() => {
    const [x, y, z] = latLonToUnitVector(-53, 169);
    return { x, y, z, angularRadius: 0.48, darkness: 0.52 };
  })(),
];

interface LunarCrater {
  x: number;
  y: number;
  z: number;
  radius: number;
  cosOuter: number;
  depth: number;
  hasRays: boolean;
}

function createLunarCraters(count: number, seed: number): LunarCrater[] {
  const random = createRandom(seed);
  const craters: LunarCrater[] = [];

  // Add Tycho (-43.3°, -11.4°) and Copernicus (9.6°, -20.1°) as prominent ray craters
  const namedCraters: Array<{ lat: number; lon: number; radius: number; depth: number; hasRays: boolean }> = [
    { lat: -43.3, lon: -11.4, radius: 0.065, depth: 0.36, hasRays: true },
    { lat: 9.6, lon: -20.1, radius: 0.062, depth: 0.34, hasRays: true },
    { lat: -45.5, lon: 177.6, radius: 0.055, depth: 0.3, hasRays: false }, // Von Kármán
  ];

  for (const nc of namedCraters) {
    const [x, y, z] = latLonToUnitVector(nc.lat, nc.lon);
    craters.push({
      x,
      y,
      z,
      radius: nc.radius,
      cosOuter: Math.cos(nc.radius * (nc.hasRays ? 3.2 : 1.45)),
      depth: nc.depth,
      hasRays: nc.hasRays,
    });
  }

  for (let i = 0; i < count; i++) {
    const z = random() * 2 - 1;
    const phi = random() * Math.PI * 2;
    const r = Math.sqrt(1 - z * z);
    const radius = 0.01 + Math.pow(random(), 2.6) * 0.085;
    const hasRays = i < 5;
    craters.push({
      x: r * Math.cos(phi),
      y: z,
      z: r * Math.sin(phi),
      radius,
      cosOuter: Math.cos(radius * (hasRays ? 2.6 : 1.4)),
      depth: 0.16 + random() * 0.2,
      hasRays,
    });
  }
  return craters;
}

export function generateMoonTextures(width = 1024, seed = 1969): MoonTextureSet {
  const height = Math.round(width / 2);

  const highlandNoise = createNoise3D(seed);
  const detailNoise = createNoise3D(seed + 107);
  const microNoise = createNoise3D(seed + 223);
  const craters = createLunarCraters(96, seed + 409);

  const colorCanvas = document.createElement('canvas');
  const bumpCanvas = document.createElement('canvas');
  colorCanvas.width = bumpCanvas.width = width;
  colorCanvas.height = bumpCanvas.height = height;

  const colorCtx = colorCanvas.getContext('2d');
  const bumpCtx = bumpCanvas.getContext('2d');
  if (!colorCtx || !bumpCtx) {
    throw new Error('2D canvas context is not available for Moon texture generation.');
  }

  const colorImage = colorCtx.createImageData(width, height);
  const bumpImage = bumpCtx.createImageData(width, height);
  const colorData = colorImage.data;
  const bumpData = bumpImage.data;

  const cosLon = new Float32Array(width);
  const sinLon = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    // Map x=0..width to lon = -180..+180 degrees matching Three.js SphereGeometry UV layout
    const lon = (((x + 0.5) / width) * 2 - 1) * Math.PI;
    cosLon[x] = Math.cos(lon);
    sinLon[x] = -Math.sin(lon);
  }

  const rgb = [0, 0, 0];

  for (let y = 0; y < height; y++) {
    const lat = (0.5 - (y + 0.5) / height) * Math.PI;
    const cosLat = Math.cos(lat);
    const py = Math.sin(lat);

    for (let x = 0; x < width; x++) {
      const px = cosLat * cosLon[x];
      const pz = cosLat * sinLon[x];

      const terrain = fbm3D(highlandNoise, px * 2.3 + 4.1, py * 2.3, pz * 2.3, 5);
      const detail = fbm3D(detailNoise, px * 6.5, py * 6.5, pz * 6.5, 4);
      const micro = fbm3D(microNoise, px * 16.0, py * 16.0, pz * 16.0, 3);

      // Compute mare basin influence
      let mareFactor = 0;
      for (let b = 0; b < MAJOR_MARIA_BASINS.length; b++) {
        const basin = MAJOR_MARIA_BASINS[b];
        const cosd = px * basin.x + py * basin.y + pz * basin.z;
        const dist = Math.acos(cosd > 1 ? 1 : cosd < -1 ? -1 : cosd);
        const perturbedRadius = basin.angularRadius * (0.82 + terrain * 0.36);
        if (dist < perturbedRadius) {
          const w = 1 - smoothstep(perturbedRadius * 0.55, perturbedRadius, dist);
          mareFactor = Math.max(mareFactor, w * basin.darkness);
        }
      }

      // Compute craters (bowl + raised rim + optional ejecta rays)
      let craterHeight = 0;
      let rayBrightness = 0;
      for (let i = 0; i < craters.length; i++) {
        const c = craters[i];
        const cosd = px * c.x + py * c.y + pz * c.z;
        if (cosd < c.cosOuter) continue;
        const angle = Math.acos(cosd > 1 ? 1 : cosd);
        const t = angle / c.radius;
        if (t < 1.45) {
          const bowl = t < 1 ? (t * t - 1) * 0.72 : 0;
          const rimT = (t - 1) / 0.16;
          const centralPeak = t < 0.22 ? (1 - t / 0.22) * 0.24 : 0;
          craterHeight += (bowl + Math.exp(-rimT * rimT) * 0.44 + centralPeak) * c.depth;
        }
        if (c.hasRays && t >= 0.92 && t < 3.1) {
          const rayFalloff = 1 - (t - 0.92) / 2.18;
          rayBrightness = Math.max(rayBrightness, rayFalloff * rayFalloff * (0.35 + detail * 0.65));
        }
      }

      const highlandRelief = clamp01((terrain - 0.25) / 0.52);

      // Base Highland Colour Ramp
      if (highlandRelief < 0.45) {
        mixRGB(rgb, HIGHLAND_LOW, HIGHLAND_MID, highlandRelief / 0.45);
      } else {
        mixRGB(rgb, HIGHLAND_MID, HIGHLAND_BRIGHT, (highlandRelief - 0.45) / 0.55);
      }

      // Blend dark basaltic Mare plains
      if (mareFactor > 0.01) {
        const mareColor = detail > 0.52 ? MARE_MID : MARE_DARK;
        mixInto(rgb, mareColor, clamp01(mareFactor));
      }

      // Add bright ejecta rays & fresh crater rims
      if (rayBrightness > 0.02) {
        mixInto(rgb, EJECTA_RAY, clamp01(rayBrightness * 0.68));
      }

      const shade = (0.86 + micro * 0.28) * (1 + craterHeight * 0.95);
      rgb[0] = clamp01((rgb[0] * shade) / 255) * 255;
      rgb[1] = clamp01((rgb[1] * shade) / 255) * 255;
      rgb[2] = clamp01((rgb[2] * shade) / 255) * 255;

      const idx = (y * width + x) * 4;
      colorData[idx] = rgb[0];
      colorData[idx + 1] = rgb[1];
      colorData[idx + 2] = rgb[2];
      colorData[idx + 3] = 255;

      // Maria are smoother & lower; highlands are rougher & higher
      const baseHeight = highlandRelief * (1 - mareFactor * 0.68) * 0.55;
      const h = clamp01(baseHeight + detail * 0.14 + micro * 0.08 + craterHeight * 0.95 + 0.28) * 255;
      bumpData[idx] = h;
      bumpData[idx + 1] = h;
      bumpData[idx + 2] = h;
      bumpData[idx + 3] = 255;
    }
  }

  colorCtx.putImageData(colorImage, 0, 0);
  bumpCtx.putImageData(bumpImage, 0, 0);

  return { color: colorCanvas, bump: bumpCanvas };
}
