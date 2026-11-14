import type { AppConfig } from '@/types';

/**
 * Core application constants used by the foundational viewport and shell.
 */
export const APP_CONFIG: AppConfig = {
  title: 'NASA Space Odyssey',
  version: '0.1.0',
  defaultCamera: {
    position: [0, 1.5, 5],
    fov: 45,
  },
};

/**
 * Landing page copy.
 */
export const HOME_CONTENT = {
  title: 'SILENT EXPLORERS',
  subtitle: 'Sessiz Kâşifler – Uzayda Kalan Hikâyeler',
  description:
    "İnsanlığın uzaydaki keşif yolculuğuna tanıklık edin. Mars'ın kızıl çöllerinden Ay'ın sessiz yüzeyine kadar, keşif araçlarının ardında bıraktığı hikâyeleri keşfedin.",
} as const;

/**
 * Honest source label for the hero Mars visual (shown in the page footer).
 * The surface texture is generated procedurally in src/utils/marsTexture.ts.
 */
export const MARS_VISUAL_CREDIT =
  'Mars 3D Küresi: Olympus Mons, Valles Marineris, Jezero Krateri ve kutup bölgeleri IAU / NASA MOLA jeodezik koordinatlarına göre konumlandırılmış, yüksek çözünürlüklü prosedürel yüzey dokusu ve kabartma (bump) haritasıdır (doğrudan uydu fotoğrafı değildir).';
