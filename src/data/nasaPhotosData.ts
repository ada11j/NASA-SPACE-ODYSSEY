import type { NasaArchivePhoto, RoverId } from '@/types';

/**
 * Curated, locally stored NASA / JPL-Caltech archive photos.
 * Serves as the primary verified collection AND instant fallback when external APIs
 * are offline or rate-limited. Every item clearly distinguishes actual mission
 * photography from official NASA/JPL concept illustrations.
 */
export const VERIFIED_NASA_ARCHIVE_PHOTOS: readonly NasaArchivePhoto[] = [
  {
    id: 'pia10128-spirit-deck',
    roverId: 'spirit',
    roverName: 'Spirit (MER-A)',
    title: 'Spirit Güneş Panellerinde Mars Tozu Birikimi (Home Plate)',
    solOrDate: 'Sol 1355–1358',
    earthDate: '26–29 Ekim 2007',
    cameraCode: 'PANCAM',
    cameraFullName: 'Panoramic Camera (430, 530, 750 nm Filtre Birleşimi)',
    missionLabel: 'Mars Exploration Rover-A (Spirit) · Gusev Krateri',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/spirit-deck.jpg',
    description:
      'Spirit keşif aracının Gusev Krateri Home Plate platosu yakınlarında Pancam kamerasıyla çektiği dikey projeksiyon otoportre mozaiği. Güneş panellerini kaplayan ince kızıl demir oksit tozu ve aracın bıraktığı tekerlek izleri açıkça görülmektedir.',
    credit: 'NASA / JPL-Caltech / Cornell University',
    nasaPiaCode: 'PIA10128',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA10128',
  },
  {
    id: 'pia04413-spirit-concept',
    roverId: 'spirit',
    roverName: 'Spirit (MER-A)',
    title: 'Mars Exploration Rover Yüzey Operasyonu Konsept Çalışması',
    solOrDate: 'Görev Öncesi Referans',
    earthDate: 'Şubat 2003 (2004 İniş Temsili)',
    cameraCode: 'JPL CAD / RENDER',
    cameraFullName: 'NASA/JPL & Cornell Resmi Görev Mühendislik İllüstrasyonu',
    missionLabel: 'Mars Exploration Rover (MER-A / MER-B)',
    mediaKind: 'Official NASA/JPL Mission Concept Illustration',
    mediaKindLabelTr: 'RESMİ NASA/JPL GÖREV İLLÜSTRASYONU',
    imageUrl: '/assets/images/rovers/spirit.jpg',
    description:
      'Spirit ve Opportunity ikiz keşif araçlarının Mars yüzeyinde robotik kolunu (IDD) bir kaya hedefine uzatırken ve Pancam direğini yükseltirken gösteren resmi NASA/JPL mühendislik illüstrasyonu.',
    credit: 'NASA / JPL / Cornell University / Maas Digital LLC',
    nasaPiaCode: 'PIA04413',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA04413',
  },
  {
    id: 'pia17759-opportunity-selfie',
    roverId: 'opportunity',
    roverName: 'Opportunity (MER-B)',
    title: 'Opportunity 10. Yıl Dönümü Pancam Otoportresi (Endeavour Krateri)',
    solOrDate: 'Sol 3536–3539',
    earthDate: '3–6 Ocak 2014',
    cameraCode: 'PANCAM',
    cameraFullName: 'Panoramic Camera (Yakın Kızılötesi, Yeşil ve Mor Filtreler)',
    missionLabel: 'Mars Exploration Rover-B (Opportunity) · Meridiani Planum',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/opportunity.jpg',
    description:
      'Opportunity’nin Mars yüzeyindeki 10. Dünya yılını tamamlamasına haftalar kala Endeavour Krateri Solander Noktası’nda çekilen 360° dikey otoportresi. Önceki kış dönemine göre rüzgâr temizleme olayıyla güneş panellerinin açıldığı görülüyor.',
    credit: 'NASA / JPL-Caltech / Cornell Univ. / Arizona State Univ.',
    nasaPiaCode: 'PIA17759',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA17759',
  },
  {
    id: 'pia07269-opportunity-meteorite',
    roverId: 'opportunity',
    roverName: 'Opportunity (MER-B)',
    title: 'Heat Shield Rock: Başka Bir Gezegende Bulunan İlk Göktaşı',
    solOrDate: 'Sol 339',
    earthDate: '6 Ocak 2005',
    cameraCode: 'PANCAM',
    cameraFullName: 'Panoramic Camera (600, 530 ve 480 nm Filtre Bileşimi)',
    missionLabel: 'Mars Exploration Rover-B (Opportunity) · Meridiani Planum',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/opportunity-meteorite.jpg',
    description:
      'Endurance Krateri’nden çıktıktan hemen sonra aracın kendi ısı kalkanı enkazı yakınında keşfettiği basketbol topu büyüklüğündeki demir-nikel göktaşı (resmi adıyla Meridiani Planum Meteoriti). Mössbauer ve APXS ile %93 demir, %7 nikel içeriği doğrulandı.',
    credit: 'NASA / JPL-Caltech / Cornell University',
    nasaPiaCode: 'PIA07269',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA07269',
  },
  {
    id: 'pia19807-curiosity-buckskin',
    roverId: 'curiosity',
    roverName: 'Curiosity',
    title: 'Curiosity "Buckskin" Kaya Sondajı Otoportresi (Marias Pass)',
    solOrDate: 'Sol 1065',
    earthDate: '5 Ağustos 2015',
    cameraCode: 'MAHLI',
    cameraFullName: 'Mars Hand Lens Imager (Robotik Kol Makro Kamerası · 92 Kare Mozaik)',
    missionLabel: 'Mars Science Laboratory (Curiosity) · Gale Krateri',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/curiosity.jpg',
    description:
      'Sharp Dağı eteklerindeki Marias Pass bölgesinde yüksek silika ve tridimit minerali içeren "Buckskin" kayasını deldikten sonra MAHLI kamerasıyla çekilen 92 pozluk yüksek çözünürlüklü otoportre.',
    credit: 'NASA / JPL-Caltech / Malin Space Science Systems',
    nasaPiaCode: 'PIA19807',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19807',
  },
  {
    id: 'pia19912-curiosity-mount-sharp',
    roverId: 'curiosity',
    roverName: 'Curiosity',
    title: 'Sharp Dağı (Aeolis Mons) Tortul Katmanları Telefoto Panoraması',
    solOrDate: 'Sol 1099',
    earthDate: '9 Eylül 2015',
    cameraCode: 'MASTCAM-100',
    cameraFullName: 'Mast Camera (100 mm Telefoto Lens Mozaiği)',
    missionLabel: 'Mars Science Laboratory (Curiosity) · Gale Krateri',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/curiosity-mount-sharp.jpg',
    description:
      'Curiosity’nin 100 mm telefoto Mastcam kamerasıyla görüntülediği Sharp Dağı yamaçları. Ön plandaki hematit sırtı, kil mineralince zengin vadi ve arka plandaki yuvarlak sülfat tepeleri Mars’ın antik iklim geçişini gözler önüne seriyor.',
    credit: 'NASA / JPL-Caltech / MSSS',
    nasaPiaCode: 'PIA19912',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19912',
  },
  {
    id: 'pia24836-perseverance-rochette',
    roverId: 'perseverance',
    roverName: 'Perseverance',
    title: 'Perseverance İlk Kaya Karotu "Rochette" Yanında Otoportre',
    solOrDate: 'Sol 198',
    earthDate: '10 Eylül 2021',
    cameraCode: 'WATSON',
    cameraFullName: 'Wide Angle Topographic Sensor for Operations and eNgineering (SHERLOC)',
    missionLabel: 'Mars 2020 (Perseverance) · Jezero Krateri',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/perseverance.jpg',
    description:
      'Jezero Krateri Citadelle bölgesindeki "Rochette" kayasından "Montdenier" ve "Montagnac" adlı ilk iki kaya karotunu başarıyla aldıktan sonra WATSON kamerasıyla çekilen 57 karelik mozaik. Kayadaki iki sondaj deliği aracın hemen önünde görülmektedir.',
    credit: 'NASA / JPL-Caltech / MSSS',
    nasaPiaCode: 'PIA24836',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24836',
  },
  {
    id: 'pia24542-perseverance-ingenuity',
    roverId: 'perseverance',
    roverName: 'Perseverance',
    title: 'Perseverance ve Ingenuity Mars Helikopteri Tarihi Otoportresi',
    solOrDate: 'Sol 46',
    earthDate: '6 Nisan 2021',
    cameraCode: 'WATSON',
    cameraFullName: 'SHERLOC-WATSON Robotik Kol Kamerası (62 Kare Mozaik)',
    missionLabel: 'Mars 2020 (Perseverance & Ingenuity) · Jezero Krateri',
    mediaKind: 'Actual NASA Mission Photo',
    mediaKindLabelTr: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    imageUrl: '/assets/images/rovers/perseverance-ingenuity.jpg',
    description:
      'Wright Brothers Field uçuş alanında, başka bir gezegende ilk motorlu uçuşu gerçekleştirmeden hemen önce Perseverance’ın yaklaşık 3,9 metre uzağında duran Ingenuity helikopteriyle birlikte çektiği tarihi WATSON otoportresi.',
    credit: 'NASA / JPL-Caltech / MSSS',
    nasaPiaCode: 'PIA24542',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24542',
  },
] as const;

interface NasaImageLibraryItem {
  data?: Array<{
    nasa_id?: string;
    title?: string;
    date_created?: string;
    description?: string;
    secondary_creator?: string;
    center?: string;
  }>;
  links?: Array<{
    href?: string;
    rel?: string;
  }>;
}

const ROVER_QUERY_MAP: Record<RoverId, string> = {
  spirit: 'Spirit rover Gusev Pancam',
  opportunity: 'Opportunity rover Meridiani Pancam',
  curiosity: 'Curiosity rover Gale crater Mastcam MAHLI',
  perseverance: 'Perseverance rover Jezero crater Mastcam-Z WATSON',
};

const ROVER_LABEL_MAP: Record<RoverId, string> = {
  spirit: 'Spirit (MER-A)',
  opportunity: 'Opportunity (MER-B)',
  curiosity: 'Curiosity',
  perseverance: 'Perseverance',
};

/**
 * Queries the official public NASA Image and Video Library API (`https://images-api.nasa.gov`).
 * Does NOT require or expose any secret API key in client code. If an optional
 * `VITE_NASA_API_KEY` environment variable is configured by the developer for
 * `api.nasa.gov`, its presence is respected without embedding secrets in the bundle.
 */
export async function fetchLiveNasaArchivePhotos(
  roverFilter: RoverId | 'all',
  signal?: AbortSignal
): Promise<NasaArchivePhoto[]> {
  const targetRover: RoverId = roverFilter === 'all' ? 'opportunity' : roverFilter;
  const query = encodeURIComponent(ROVER_QUERY_MAP[targetRover]);
  const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image&page_size=6`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`NASA Image API yanıt kodu: ${response.status}`);
  }

  const payload = (await response.json()) as {
    collection?: { items?: NasaImageLibraryItem[] };
  };

  const rawItems = payload.collection?.items ?? [];
  const results: NasaArchivePhoto[] = [];

  for (const item of rawItems) {
    const meta = item.data?.[0];
    const thumb = item.links?.find((l) => l.rel === 'preview')?.href ?? item.links?.[0]?.href;
    if (!meta?.nasa_id || !meta?.title || !thumb) continue;

    const lowerDesc = `${meta.title} ${meta.description ?? ''}`.toLowerCase();
    const isIllustration =
      lowerDesc.includes('artist') ||
      lowerDesc.includes('concept') ||
      lowerDesc.includes('illustration') ||
      lowerDesc.includes('rendering');

    results.push({
      id: `live-${meta.nasa_id}`,
      roverId: targetRover,
      roverName: ROVER_LABEL_MAP[targetRover],
      title: meta.title,
      solOrDate: meta.nasa_id,
      earthDate: meta.date_created ? meta.date_created.slice(0, 10) : 'NASA Arşiv Kaydı',
      cameraCode: 'NASA ARCHIVE',
      cameraFullName: `${meta.center ?? 'JPL'} Resmi Arşiv Kaydı`,
      missionLabel: `${ROVER_LABEL_MAP[targetRover]} · NASA Image Library`,
      mediaKind: isIllustration
        ? 'Official NASA/JPL Mission Concept Illustration'
        : 'Actual NASA Mission Photo',
      mediaKindLabelTr: isIllustration
        ? 'RESMİ NASA/JPL GÖREV İLLÜSTRASYONU'
        : 'GERÇEK NASA GÖREV FOTOĞRAFI',
      imageUrl: thumb,
      description:
        meta.description?.slice(0, 340) ??
        'NASA Resmi Görüntü ve Video Kütüphanesi üzerinden alınan görev kaydı.',
      credit: meta.secondary_creator ?? 'NASA / JPL-Caltech',
      nasaPiaCode: meta.nasa_id,
      sourceUrl: `https://images.nasa.gov/details/${encodeURIComponent(meta.nasa_id)}`,
    });

    if (results.length >= 4) break;
  }

  return results;
}
