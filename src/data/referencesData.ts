import type { ReferenceCategoryGroup, ReferenceItem } from '@/types';

export const REFERENCE_CATEGORIES: readonly ReferenceCategoryGroup[] = [
  {
    id: 'nasa-official',
    code: 'KAT-01',
    title: 'NASA Resmi Görev Kaynakları',
    subtitle: 'Mars ve Ay keşif görevlerinin resmi NASA Science & NSSDCA görev portalları',
  },
  {
    id: 'nasa-media',
    code: 'KAT-02',
    title: 'NASA Görsel ve Medya Arşivleri',
    subtitle: 'Projede kullanılan gerçek NASA/JPL Photojournal (PIA) ve NASA Image Library kayıtları',
  },
  {
    id: 'nasa-technical',
    code: 'KAT-03',
    title: 'NASA / JPL Teknik ve Bilimsel Kaynakları',
    subtitle: 'Apollo LRV mühendislik belgeleri, USGS jeodezik koordinatları ve PDS telemetri verileri',
  },
  {
    id: 'turkish-space',
    code: 'KAT-04',
    title: 'TÜBİTAK ve Türkiye Uzay Ajansı (TUA)',
    subtitle: 'Türkçe popüler bilim, uzay teknolojileri terminolojisi ve kurumsal uzay araştırmaları referansları',
  },
  {
    id: 'wikipedia-tr',
    code: 'KAT-05',
    title: 'Türkçe Vikipedi Kaynakları',
    subtitle: 'Uzay araçlarının Türkçe ansiklopedik özetleri ve terminolojik karşılaştırma kaynakları',
  },
  {
    id: 'models-open-data',
    code: 'KAT-06',
    title: 'Kullanılan 3D Modeller ve Açık Veri Kaynakları',
    subtitle: '3D prosedürel gezegen dokuları, R3F çok parçalı CAD şemaları ve açık API dokümantasyonu',
  },
];

export const REFERENCE_ITEMS: readonly ReferenceItem[] = [
  // =========================================================================
  // 1. NASA RESMİ GÖREV KAYNAKLARI
  // =========================================================================
  {
    id: 'nasa-mer-opportunity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Exploration Rover Opportunity (MER-B)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mer-opportunity/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration', 'Opportunity Detay Dosyası', 'İnteraktif Mars Haritası', 'Görev Simülasyonu'],
    description:
      'Opportunity (MER-B) gezicisinin 5.352 Sol süren görevi, 45.16 km sürüş rotası, hematit kürecikleri keşfi ve 2018 küresel toz fırtınası verilerinin resmi kaynağı.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-mer-spirit',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Exploration Rover Spirit (MER-A)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mer-spirit/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration', 'Spirit Detay Dosyası', 'İnteraktif Mars Haritası', 'Görev Simülasyonu'],
    description:
      'Spirit (MER-A) gezicisinin Gusev Krateri inişi, Husband Hill tırmanışı, Home Plate opalin silika keşfi ve Troy kum tuzağı telemetri kayıtları.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-msl-curiosity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Science Laboratory (Curiosity Rover)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/msl-curiosity/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration', 'Curiosity Detay Dosyası', '3D Rover Lab', 'Karşılaştırma Lab'],
    description:
      'Curiosity gezicisinin Gale Krateri (Bradbury Landing) inişi, Yellowknife Bay kil taşı sondajı, Mount Sharp tırmanışı ve SAM/CheMin analiz sonuçları.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-m2020-perseverance',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars 2020 Perseverance Rover',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration', 'Perseverance Detay Dosyası', '3D Rover Lab', 'Görev Simülasyonu'],
    description:
      'Perseverance gezicisinin Jezero Krateri (Octavia E. Butler Landing) inişi, MOXIE oksijen üretimi, Three Forks örnek deposu ve Cheyava Falls keşfi.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-ingenuity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Ingenuity Mars Helicopter Mission',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü Görevler)', 'NASA Fotoğraf Arşivi (PIA24760)', '3D Rover Lab (Perseverance)', 'Görev Simülasyonu'],
    description:
      'Başka bir gezegende motorlu ve kontrollü uçuş gerçekleştiren ilk hava aracı olan Ingenuity Mars Helikopterinin 72 uçuşluk görev verileri.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-insight',
    categoryId: 'nasa-official',
    title: 'NASA Science — InSight Mars Lander Mission',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/insight/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü & Jeofizik Görevler)', 'Kaynakça'],
    description:
      'Elysium Planitia’ya inen InSight sabit iniş aracının SEIS sismometresiyle tespit ettiği 1.300’den fazla Mars depremi (marsquake) ve Mars çekirdek/kabuk kalınlığı verileri.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-pathfinder',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Pathfinder & Sojourner Rover',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-pathfinder/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü Görevler)', '3D Rover Lab (Rocker-Bogie Mirası)', 'Kaynakça'],
    description:
      '1997 yılında Ares Vallis’e inerek Mars yüzeyinde çalışan ilk tekerlekli gezici olan 11.5 kg’lık Sojourner ve hava yastıklı iniş teknolojisinin resmi görev sayfası.',
    badge: 'RESMİ NASA GÖREV SAYFASI',
  },
  {
    id: 'nasa-nssdca-lunar',
    categoryId: 'nasa-official',
    title: 'NASA NSSDCA — Lunar Spacecraft Catalog (Luna 9, Lunokhod 1/2, Chang’e 3/4, Chandrayaan-3)',
    organization: 'NASA Goddard Space Flight Center (NSSDCA)',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Lunar Exploration (Ay Keşifleri)', '3D Selenografik Ay Küresi'],
    description:
      'Luna 9 (1966-006A), Lunokhod 1 (1970-095A), Lunokhod 2 (1973-001A), Chang’e 3/Yutu (2013-070A), Chang’e 4/Yutu-2 (2018-103A) ve Chandrayaan-3 (2023-098A) iniş koordinatları ve görev katalogları.',
    badge: 'NASA NSSDCA KATALOĞU',
  },

  // =========================================================================
  // 2. NASA GÖRSEL VE MEDYA ARŞİVLERİ
  // =========================================================================
  {
    id: 'nasa-images-library',
    categoryId: 'nasa-media',
    title: 'NASA Image and Video Library (images.nasa.gov & REST API)',
    organization: 'NASA Headquarters / Office of Communications',
    url: 'https://images.nasa.gov/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['NASA Fotoğraf Arşivi', 'Ay Görevleri Canlı Fotoğraf Sorgulama'],
    description:
      'Projede hem çevrimdışı doğrulanmış arşiv fotoğrafları hem de canlı REST API (images-api.nasa.gov) sorgularında kullanılan resmi NASA medya veri tabanı.',
    badge: 'RESMİ MEDYA ARŞİVİ',
  },
  {
    id: 'nasa-photojournal-mer',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Spirit & Opportunity Görselleri (PIA05584, PIA07268, PIA03240)',
    organization: 'NASA / JPL-Caltech / Cornell University',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA07268',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration Kartları', 'NASA Fotoğraf Arşivi', 'Görev Simülasyonu'],
    description:
      'Spirit’in Gusev Krateri güneş panelleri özçekimi (PIA05584), Opportunity’nin Meridiani Planum’da keşfettiği Heat Shield Rock demir-nikel göktaşı (PIA07268) ve MER konsept görseli (PIA03240).',
    badge: 'GERÇEK GÖREV FOTOĞRAFLARI',
  },
  {
    id: 'nasa-photojournal-msl',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Curiosity MAHLI & Mastcam Görselleri (PIA19920, PIA16239, PIA19808)',
    organization: 'NASA / JPL-Caltech / MSSS',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA19808',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration Kartları', 'NASA Fotoğraf Arşivi', 'Görev Simülasyonu'],
    description:
      'Curiosity’nin Buckskin sondaj noktasındaki MAHLI özçekimi (PIA19920), Mount Sharp (Aeolis Mons) Mastcam panoraması (PIA19808) ve Rocknest kepçe izi (PIA16239).',
    badge: 'GERÇEK GÖREV FOTOĞRAFLARI',
  },
  {
    id: 'nasa-photojournal-m2020',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Perseverance & Ingenuity Görseli (PIA24760 & PIA23764)',
    organization: 'NASA / JPL-Caltech / MSSS',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA24760',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration Kartları', 'NASA Fotoğraf Arşivi', 'Görev Simülasyonu'],
    description:
      'Perseverance WATSON kamerasıyla Sol 46’da (6 Nisan 2021) çekilen Perseverance ve Ingenuity Mars Helikopteri ortak özçekimi (PIA24760) ile Mars 2020 illüstrasyonu (PIA23764).',
    badge: 'GERÇEK GÖREV FOTOĞRAFLARI',
  },

  // =========================================================================
  // 3. NASA / JPL TEKNİK VE BİLİMSEL KAYNAKLARI
  // =========================================================================
  {
    id: 'nasa-alsj-lrv',
    categoryId: 'nasa-technical',
    title: 'NASA History — Apollo Lunar Roving Vehicle (LRV) Documentation (ALSJ)',
    organization: 'NASA History Division / Apollo Lunar Surface Journal',
    url: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Lunar Exploration (Apollo 15, 16, 17 LRV)', 'Apollo LRV Detay Dosyaları'],
    description:
      'Apollo 15 (LRV-001), Apollo 16 (LRV-002) ve Apollo 17 (LRV-003) Ay Taşıtlarının Boeing/Delco mühendislik el kitapları, sürüş mesafeleri, güç tüketimi ve navigasyon sistemi belgeleri.',
    badge: 'TEKNİK MÜHENDİSLİK DOKÜMANI',
  },
  {
    id: 'usgs-planetary-names',
    categoryId: 'nasa-technical',
    title: 'USGS Astrogeology Science Center — Gazetteer of Planetary Nomenclature (Mars & Moon)',
    organization: 'USGS / International Astronomical Union (IAU)',
    url: 'https://planetarynames.wr.usgs.gov/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['İnteraktif Mars Haritası', '3D Selenografik Ay Küresi'],
    description:
      'Mars (Gusev, Meridiani Planum, Gale, Jezero, Olympus Mons, Valles Marineris) ve Ay (Mare Imbrium, Oceanus Procellarum, Taurus-Littrow, Von Kármán) koordinatlarının IAU onaylı jeodezik kaynağı.',
    badge: 'JEODEZİK VERİ KAYNAĞI',
  },
  {
    id: 'nasa-pds-geosciences',
    categoryId: 'nasa-technical',
    title: 'NASA Planetary Data System (PDS) — Geosciences Node (MER, MSL & Mars 2020 Analyst’s Notebook)',
    organization: 'NASA PDS / Washington University in St. Louis',
    url: 'https://pds-geosciences.wustl.edu/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['İnteraktif Mars Haritası (Rota Noktaları)', 'Karşılaştırma Laboratuvarı'],
    description:
      'Mars gezicilerinin Sol bazlı odometri, spektrometre (APXS, Mössbauer, ChemCam, SHERLOC) ve sondaj konum verilerinin arşivlendiği bilimsel veri sistemi.',
    badge: 'BİLİMSEL TELEMETRİ ARŞİVİ',
  },

  // =========================================================================
  // 4. TÜBİTAK VE TÜRKİYE UZAY AJANSI (TUA)
  // =========================================================================
  {
    id: 'tubitak-bilimgenc',
    categoryId: 'nasa-technical' === ('turkish-space' as string) ? 'nasa-technical' : 'turkish-space',
    title: 'TÜBİTAK Bilim Genç — Uzay ve Gezegen Keşifleri Bilim Portalı',
    organization: 'TÜBİTAK (Türkiye Bilimsel ve Teknolojik Araştırma Kurumu)',
    url: 'https://bilimgenc.tubitak.gov.tr/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Türkçe Bilimsel Anlatım)', 'Lunar Exploration', 'Kaynakça'],
    description:
      'Mars ve Ay keşif araçları, gezegen jeolojisi, uzay teknolojileri ve Türkçe astronomi/uzay mühendisliği terminolojisi için yararlanılan kurumsal popüler bilim kaynağı.',
    badge: 'KURUMSAL TÜRKÇE BİLİM KAYNAĞI',
  },
  {
    id: 'tua-gov-tr',
    categoryId: 'turkish-space',
    title: 'Türkiye Uzay Ajansı (TUA) Resmi Portalı',
    organization: 'Türkiye Uzay Ajansı (TUA)',
    url: 'https://tua.gov.tr/',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Lunar Exploration (Ulusal Uzay & Ay Araştırmaları Bağlamı)', 'Kaynakça'],
    description:
      'Milli Uzay Programı, Ay Araştırma Programı (AYAP) ve Türkçe uzay görev terminolojisi standartları için temel kurumsal referans.',
    badge: 'RESMİ KURUMSAL KAYNAK',
  },

  // =========================================================================
  // 5. TÜRKÇE VİKİPEDİ KAYNAKLARI
  // =========================================================================
  {
    id: 'wiki-tr-ay-tasiti',
    categoryId: 'wikipedia-tr',
    title: 'Türkçe Vikipedi — Ay Taşıtı (Apollo Lunar Roving Vehicle)',
    organization: 'Vikipedi Özgür Ansiklopedi',
    url: 'https://tr.wikipedia.org/wiki/Ay_Ta%C5%9F%C4%B1t%C4%B1',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Lunar Exploration (Apollo 15, 16, 17 LRV)', 'Apollo LRV Detay Dosyaları'],
    description:
      'Apollo 15, 16 ve 17 görevlerinde kullanılan Ay Taşıtının (LRV) Türkçe teknik terimleri, boyutları ve görev özetleri için yardımcı ansiklopedik kaynak.',
    badge: 'ANSİKLOPEDİK KAYNAK',
  },
  {
    id: 'wiki-tr-opportunity',
    categoryId: 'wikipedia-tr',
    title: 'Türkçe Vikipedi — Opportunity (keşif aracı)',
    organization: 'Vikipedi Özgür Ansiklopedi',
    url: 'https://tr.wikipedia.org/wiki/Opportunity_(ke%C5%9Fif_arac%C4%B1)',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration', 'Opportunity Detay Dosyası', 'Karşılaştırma Lab'],
    description:
      'Opportunity (MER-B) keşif aracının Türkçe görev kronolojisi, Meridiani Planum bulguları ve 15 yıllık görev özeti referansı.',
    badge: 'ANSİKLOPEDİK KAYNAK',
  },
  {
    id: 'wiki-tr-ingenuity',
    categoryId: 'wikipedia-tr',
    title: 'Türkçe Vikipedi — Ingenuity (helikopter)',
    organization: 'Vikipedi Özgür Ansiklopedi',
    url: 'https://tr.wikipedia.org/wiki/Ingenuity_(helikopter)',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü Görevler)', 'Perseverance Detay Dosyası', 'NASA Fotoğraf Arşivi'],
    description:
      'Perseverance ile Mars’a gönderilen Ingenuity helikopterinin koaksiyel rotor yapısı ve uçuş tarihçesi için Türkçe referans.',
    badge: 'ANSİKLOPEDİK KAYNAK',
  },
  {
    id: 'wiki-tr-insight',
    categoryId: 'wikipedia-tr',
    title: 'Türkçe Vikipedi — InSight',
    organization: 'Vikipedi Özgür Ansiklopedi',
    url: 'https://tr.wikipedia.org/wiki/InSight',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü & Jeofizik Görevler)', 'Kaynakça'],
    description:
      'Mars’ın iç yapısını, sismik aktivitesini ve ısı akışını inceleyen InSight uzay aracının Türkçe görev özeti.',
    badge: 'ANSİKLOPEDİK KAYNAK',
  },
  {
    id: 'wiki-tr-sojourner',
    categoryId: 'wikipedia-tr',
    title: 'Türkçe Vikipedi — Sojourner (keşif aracı)',
    organization: 'Vikipedi Özgür Ansiklopedi',
    url: 'https://tr.wikipedia.org/wiki/Sojourner_(ke%C5%9Fif_arac%C4%B1)',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Mars Exploration (Öncü Görevler)', '3D Rover Lab', 'Kaynakça'],
    description:
      'Mars Pathfinder göreviyle 1997’de yüzeye inen ilk Mars gezicisi Sojourner’ın Türkçe teknik ve tarihsel özeti.',
    badge: 'ANSİKLOPEDİK KAYNAK',
  },

  // =========================================================================
  // 6. KULLANILAN 3D MODELLER VE AÇIK VERİ KAYNAKLARI
  // =========================================================================
  {
    id: 'nasa-3d-resources-rover',
    categoryId: 'models-open-data',
    title: 'Three.js / React Three Fiber Çok Parçalı Mühendislik CAD Modelleri & NASA 3D Resources Referansı',
    organization: 'HVB HORIZON Prosedürel Mühendislik Motoru & NASA 3D Resources (nasa3d.arc.nasa.gov)',
    url: 'https://nasa3d.arc.nasa.gov/models',
    accessDate: '14 Kasım 2026',
    usedInSections: ['3D Rover İnceleme Laboratuvarı (Rover3DViewport.tsx)'],
    description:
      'Spirit, Opportunity, Curiosity ve Perseverance için gerçek JPL/NASA şasi oranları (6 paletli tekerlek, mafsallı Rocker-Bogie süspansiyon, kelebek güneş panelleri, 8 kanatlı MMRTG, PMA/RSM kamera direği ve 5 eksenli robotik kol/taret) referans alınarak Three.js ile gerçek zamanlı oluşturulan etkileşimli 3D CAD modelleri.',
    badge: '3D MODEL & CAD MİMARİSİ',
  },
  {
    id: 'procedural-mars-moon-textures',
    categoryId: 'models-open-data',
    title: 'Birim Küre 3D fBm Prosedürel Mars ve Selenografik Ay Yüzey Dokuları',
    organization: 'HVB HORIZON Matematiksel Yüzey Sentezleyici (marsTexture.ts & moonTexture.ts)',
    url: 'https://threejs.org/docs/#api/en/textures/CanvasTexture',
    accessDate: '14 Kasım 2026',
    usedInSections: ['Ana Ekran 3D Mars Küresi', '3D Selenografik Ay Küresi (Lunar Exploration)'],
    description:
      'Doğrudan bir NASA uydu fotoğrafı olduğunu iddia etmeden şeffaf biçimde etiketlenen; 3D fraktal Brown hareketi (fBm), krater çanak/kenar fonksiyonları ve gerçek selenografik deniz (Mare Imbrium, Oceanus Procellarum, Mare Serenitatis, SPA Havzası) koordinatlarıyla çalışma zamanında üretilen 3D renk ve rölyef (bump) haritaları.',
    badge: 'PROSEDÜREL 3D DOKU SİSTEMİ',
  },
];
