/**
 * Small, dependency-free seeded noise helpers used for procedural textures.
 */

/** Deterministic pseudo random generator (Park–Miller). */
export function createRandom(seed: number): () => number {
  let s = Math.max(1, Math.floor(seed) % 2147483647);
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Noise3D = (x: number, y: number, z: number) => number;

/**
 * Seeded 3D value noise returning values in [0, 1].
 * Sampling it on a unit sphere produces seamless equirectangular textures.
 */
export function createNoise3D(seed: number): Noise3D {
  const random = createRandom(seed);
  const perm = new Uint8Array(512);
  const values = new Float32Array(256);
  const base = new Uint8Array(256);

  for (let i = 0; i < 256; i++) {
    base[i] = i;
    values[i] = random();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = base[i];
    base[i] = base[j];
    base[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = base[i & 255];

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const fade = (t: number) => t * t * (3 - 2 * t);

  return (x, y, z) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const u = fade(x - xi);
    const v = fade(y - yi);
    const w = fade(z - zi);
    const X = xi & 255;
    const Y = yi & 255;
    const Z = zi & 255;

    const a = perm[X] + Y;
    const b = perm[X + 1] + Y;
    const aa = perm[a] + Z;
    const ab = perm[a + 1] + Z;
    const ba = perm[b] + Z;
    const bb = perm[b + 1] + Z;

    return lerp(
      lerp(
        lerp(values[perm[aa]], values[perm[ba]], u),
        lerp(values[perm[ab]], values[perm[bb]], u),
        v
      ),
      lerp(
        lerp(values[perm[aa + 1]], values[perm[ba + 1]], u),
        lerp(values[perm[ab + 1]], values[perm[bb + 1]], u),
        v
      ),
      w
    );
  };
}

/** Fractal Brownian motion built on a 3D noise function, normalised to [0, 1]. */
export function fbm3D(
  noise: Noise3D,
  x: number,
  y: number,
  z: number,
  octaves: number,
  lacunarity = 2.03,
  gain = 0.5
): number {
  let amplitude = 0.5;
  let frequency = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amplitude * noise(x * frequency, y * frequency, z * frequency);
    norm += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  return sum / norm;
}
