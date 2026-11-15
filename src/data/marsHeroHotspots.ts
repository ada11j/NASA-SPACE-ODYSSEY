export interface MarsHeroHotspot {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  /** Planetocentric latitude (-90 south to +90 north). */
  lat: number;
  /** East longitude (0 to 360). */
  lonEast: number;
  coordinatesText: string;
  scaleOrElevation: string;
  color: string;
  shortDescription: string;
  scientificSignificance: string;
  sourceLabel: string;
  sourceUrl: string;
}

/**
 * Verified IAU / USGS Astrogeology / NASA MOLA coordinates and scientific
 * descriptions for the interactive hotspots on the Hero 3D Mars globe.
 */
export const MARS_HERO_HOTSPOTS: readonly MarsHeroHotspot[] = [
  {
    id: 'olympus-mons',
    name: 'Olympus Mons',
    shortLabel: 'Olympus Mons',
    category: 'Jeolojik Oluşum',
    lat: 18.65,
    lonEast: 226.2,
    coordinatesText: '18.65° K, 226.20° D',
    scaleOrElevation: '+21.9 km Yükseklik · 624 km Çap',
    color: '#fb923c',
    shortDescription:
      'Güneş Sistemi’nde bilinen en büyük yanardağ ve gezegen dağı. Everest Dağı’nın yaklaşık 2.5 katı yüksekliğe ve zirvesinde 80 km genişliğinde çok halkalı bir kaldera sistemine sahiptir.',
    scientificSignificance:
      'Mars’ta Dünya benzeri aktif levha tektoniği bulunmadığı için kabuk sabit bir manto sorgucu (plume) üzerinde milyarlarca yıl kalarak bu devasa bazaltik kalkan yanardağın birikmesini sağlamıştır. Genç lav akıntıları Mars’ın jeolojik olarak yakın geçmişe kadar volkanik açıdan aktif kaldığını gösterir.',
    sourceLabel: 'USGS Gazetteer & NASA MOLA Topografya Arşivi',
    sourceUrl: 'https://planetarynames.wr.usgs.gov/Feature/4453',
  },
  {
    id: 'valles-marineris',
    name: 'Valles Marineris',
    shortLabel: 'Valles Marineris',
    category: 'Jeolojik Oluşum',
    lat: -11.5,
    lonEast: 292.0,
    coordinatesText: '11.50° G, 292.00° D',
    scaleOrElevation: '4.000 km Uzunluk · 7 km Derinlik',
    color: '#f97316',
    shortDescription:
      'Mars ekvatorunun hemen güneyinde gezegen çevresinin yaklaşık dörtte biri boyunca uzanan, 200 km genişliğe ve 7 km derinliğe ulaşan devasa tektonik kanyon sistemi.',
    scientificSignificance:
      'Tharsis volkanik platosunun yükselmesi sırasında Mars kabuğunun gerilip yırtılmasıyla oluşmuştur. Kanyon duvarlarında açığa çıkan kilometrelik kayaç kesitleri ve iç havzalardaki sülfatlı tortul tabakalar, Mars’ın erken dönem yeraltı suyu ve tektonik evriminin doğal kesitini sunar.',
    sourceLabel: 'NASA Science & USGS Planetary Nomenclature',
    sourceUrl: 'https://planetarynames.wr.usgs.gov/Feature/6287',
  },
  {
    id: 'jezero-crater',
    name: 'Jezero Krateri (Perseverance & Ingenuity)',
    shortLabel: 'Jezero Krateri',
    category: 'Aktif / Tarihi Keşif Bölgesi',
    lat: 18.38,
    lonEast: 77.58,
    coordinatesText: '18.38° K, 77.58° D',
    scaleOrElevation: '45 km Çap · -2.555 m Rakım',
    color: '#38bdf8',
    shortDescription:
      'Isidis Planitia havzasının batı kenarında yer alan, 3.7 milyar yıl önce Neretva Vallis nehrinin beslediği antik bir krater gölü ve yelpaze deltası. Perseverance ve Ingenuity’nin görev bölgesidir.',
    scientificSignificance:
      'Nehir sularının krater gölüne taşıdığı kil ve karbonat mineralleri, mikrobiyal yaşam izlerini (biyo-imzalar) milyarlarca yıl koruyabilecek en ideal astrobiyolojik ortamdır. Perseverance burada Dünya’ya getirilmek üzere kayaç karot örnekleri toplamaktadır.',
    sourceLabel: 'NASA Mars 2020 Perseverance Resmi Görev Sayfası',
    sourceUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
  },
  {
    id: 'planum-boreum',
    name: 'Planum Boreum (Kuzey Kutup Buzulu)',
    shortLabel: 'Kuzey Kutbu',
    category: 'Kutup Buzulu',
    lat: 82.5,
    lonEast: 15.0,
    coordinatesText: '82.50° K, 15.00° D',
    scaleOrElevation: '~1.000 km Çap · 3 km Buz Kalınlığı',
    color: '#e0f2fe',
    shortDescription:
      'Mars’ın kuzey kutbunu çevreleyen, yaklaşık 3 km kalınlığında kalıcı su buzu ve kış aylarında üzerine çöken 1 metre kalınlığında mevsimsel kuru buzdan (CO₂) oluşan dev kutup kubbesi.',
    scientificSignificance:
      'Katmanlı kutup çökelleri (Polar Layered Deposits) ve rüzgâr erozyonuyla oyulmuş Chasma Boreale spiral vadileri, Mars’ın eksen eğikliği (obliquity) değişimlerini ve son birkaç milyon yıllık küresel iklim döngülerini buz çekirdeği gibi kaydeder.',
    sourceLabel: 'USGS Gazetteer — Planum Boreum',
    sourceUrl: 'https://planetarynames.wr.usgs.gov/Feature/4754',
  },
  {
    id: 'planum-australe',
    name: 'Planum Australe (Güney Kutup Buzulu)',
    shortLabel: 'Güney Kutbu',
    category: 'Kutup Buzulu',
    lat: -83.5,
    lonEast: 160.0,
    coordinatesText: '83.50° G, 160.00° D',
    scaleOrElevation: '~400 km Kalıcı Kuşak · 3.7 km Kalınlık',
    color: '#bae6fd',
    shortDescription:
      'Güney yüksek yaylalarında yer alan, su buzu temel tabakası üzerinde yıl boyu erimeyen kalıcı bir karbondioksit (CO₂) buzu örtüsü barındıran güney kutup platosu.',
    scientificSignificance:
      'MRO SHARAD ve Mars Express MARSIS radar verileri, burada atmosferdeki karbondioksitin önemli bir kısmına eşdeğer gömülü kuru buz rezervleri bulunduğunu ortaya koymuştur; bu rezervler Mars atmosfer basıncının geçmişte çok daha yüksek olabileceğini gösterir.',
    sourceLabel: 'USGS Gazetteer — Planum Australe',
    sourceUrl: 'https://planetarynames.wr.usgs.gov/Feature/4753',
  },
  {
    id: 'gale-crater',
    name: 'Gale Krateri & Mount Sharp (Curiosity)',
    shortLabel: 'Gale Krateri',
    category: 'Aktif / Tarihi Keşif Bölgesi',
    lat: -5.4,
    lonEast: 137.8,
    coordinatesText: '5.40° G, 137.80° D',
    scaleOrElevation: '154 km Çap · 5.5 km Merkez Dağ (Aeolis Mons)',
    color: '#34d399',
    shortDescription:
      'Ortasında 5.5 km yüksekliğindeki katmanlı Mount Sharp (Aeolis Mons) dağını barındıran çarpışma krateri; 2012’den beri Curiosity (MSL) gezicisi tarafından incelenmektedir.',
    scientificSignificance:
      'Tabandaki tatlı su gölü killerinden (Yellowknife Bay) üst katmanlardaki sülfatlı kurak dönem çökellerine kadar olan tortul istif, Mars’ın ılık ve sulak bir gezegenden bugünkü soğuk çöle nasıl dönüştüğünü katman katman kanıtlamıştır.',
    sourceLabel: 'NASA MSL Curiosity Resmi Görev Sayfası',
    sourceUrl: 'https://science.nasa.gov/mission/msl-curiosity/',
  },
  {
    id: 'meridiani-planum',
    name: 'Meridiani Planum (Opportunity)',
    shortLabel: 'Meridiani Planum',
    category: 'Aktif / Tarihi Keşif Bölgesi',
    lat: -1.95,
    lonEast: 354.47,
    coordinatesText: '1.95° G, 354.47° D',
    scaleOrElevation: '45.16 km Opportunity Sürüş Rotası',
    color: '#fbbf24',
    shortDescription:
      'Mars başlangıç meridyeninin hemen batısında uzanan, yörüngeden kristal hematit minerali imzası tespit edilerek Opportunity (MER-B) gezicisinin indirildiği geniş ekvatoral düzlük.',
    scientificSignificance:
      'Opportunity burada 15 yıl boyunca "yaban mersini" (blueberries) adı verilen hematit küreciklerini, jarosit sülfatlarını ve Endeavour Krateri kıyısındaki nötr pH’lı smektit killerini keşfederek Mars yüzeyinde bir zamanlar sıvı su bulunduğunu kesin olarak kanıtladı.',
    sourceLabel: 'NASA MER Opportunity Resmi Görev Sayfası',
    sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
  },
  {
    id: 'hellas-planitia',
    name: 'Hellas Planitia',
    shortLabel: 'Hellas Havzası',
    category: 'Jeolojik Oluşum',
    lat: -42.4,
    lonEast: 70.5,
    coordinatesText: '42.40° G, 70.50° D',
    scaleOrElevation: '2.300 km Çap · -7.152 m Derinlik',
    color: '#a78bfa',
    shortDescription:
      'Güney yarımkürede yer alan, 2.300 km çapında ve çevre yaylalardan 9 km, referans yüzeyden 7.15 km daha derin olan devasa antik çarpışma havzası.',
    scientificSignificance:
      'Yaklaşık 4 milyar yıl önceki Geç Ağır Bombardıman döneminde dev bir asteroit çarpmasıyla oluşmuştur. Mars’ın en alçak noktası olan tabanında atmosfer basıncı ortalamanın neredeyse iki katına (~11.5 mbar) ulaşır.',
    sourceLabel: 'USGS Gazetteer — Hellas Planitia',
    sourceUrl: 'https://planetarynames.wr.usgs.gov/Feature/2427',
  },
];
