import type { Rover3DPart, RoverId } from '@/types';

export interface Rover3DArchitecture {
  roverId: RoverId;
  roverName: string;
  chassisFamily: 'mer-solar' | 'msl-nuclear' | 'm2020-nuclear';
  schematicNotice: string;
  scaleSummary: string;
  parts: readonly Rover3DPart[];
}

/**
 * Engineering subsystem definitions for each of the four Mars rovers in the 3D Inspection Lab.
 * Models are built from faithful Three.js parametric CAD primitives (MER solar-wing architecture
 * for Spirit/Opportunity; MMRTG nuclear-tail architecture for Curiosity/Perseverance) and
 * explicitly labeled as interactive engineering schematics.
 */
export const ROVER_3D_ARCHITECTURES: Record<RoverId, Rover3DArchitecture> = {
  spirit: {
    roverId: 'spirit',
    roverName: 'Spirit (MER-A)',
    chassisFamily: 'mer-solar',
    schematicNotice:
      'Mimari Not: NASA/JPL MER-A mühendislik şemasına sadık etkileşimli 3B parametrik CAD modeli (kelebek güneş panelleri, 6 tekerlekli Rocker-Bogie, PMA direği ve 5 eklemli IDD kolu).',
    scaleSummary: 'Ölçek: 1,5 m yükseklik × 2,3 m kanat açıklığı × 1,6 m uzunluk · 185 kg',
    parts: [
      {
        id: 'wheels',
        code: 'MOB-01',
        name: '6 Tekerlekli Rocker-Bogie Süspansiyon',
        category: 'mobility',
        categoryLabel: 'Yürüyüş & Süspansiyon',
        functionSummary:
          'Yay kullanmadan aracın tekerlek çapının iki katı (50 cm) yüksekliğindeki kayaların üzerinden devrilmeden geçmesini sağlayan titanyum diferansiyel süspansiyon.',
        technicalDetails:
          '25 cm çapında, 16 cm genişliğinde işlenmiş alüminyum tekerlekler. Her tekerlekte bağımsız sürüş motoru; ön ve arka 4 tekerlekte yerinde 360° dönüş sağlayan direksiyon aktüatörleri bulunur. Spirit’in sağ ön tekerleği Sol 779’da kilitlenmiş ve toprağı kazıyarak Home Plate’teki saf silika yataklarını ortaya çıkarmıştır.',
        specs: '6× Ø25 cm alüminyum tekerlek · Titanyum tüp şasi · Maks. 30° eğim',
        position: [0.95, -0.42, 0.72],
      },
      {
        id: 'cameras',
        code: 'OPT-02',
        name: 'Pancam & Navcam Kamera Direği (PMA)',
        category: 'optics',
        categoryLabel: 'Optik & Uzaktan Algılama',
        functionSummary:
          'Yüzeyden 1,54 metre yükseklikte 360° panoramik renkli görüntüleme, stereo navigasyon ve Mini-TES kızılötesi periskop ölçümü sağlar.',
        technicalDetails:
          'Direk tepesindeki kamera barında 30 cm aralıklı iki Pancam (1024×1024 CCD, 8’er filtre tekerleği) ve iki geniş açılı Navcam yer alır. Direk tabanındaki periskop aynası ise gövde içindeki Mini-TES termal emisyon spektrometresine kızılötesi ışığı iletir.',
        specs: '2× Pancam (0,28 mrad/piksel) + 2× Navcam + 4× Gövde Hazcam',
        position: [0.55, 0.95, 0.0],
      },
      {
        id: 'arm',
        code: 'ARM-03',
        name: 'Robotik Kol (IDD) & 4’lü Bilim Tareti',
        category: 'arm',
        categoryLabel: 'Robotik Kol & Temas Cihazları',
        functionSummary:
          'İnsan kolu gibi omuz, dirsek ve bilek eklemlerine sahip 5 serbestlik dereceli kol; ucundaki döner tarette 4 temas cihazı taşır.',
        technicalDetails:
          'Instrument Deployment Device (IDD) ucundaki tarette RAT (elmas kaya aşındırma aracı), MI (30 µm/piksel mikroskobik görüntüleyici), Mössbauer Spektrometresi (demir mineralojisi) ve APXS (alfa parçacık X-ışını element spektrometresi) yer alır.',
        specs: '90 cm erişim · 5 eklem · Taret yükü: RAT + MI + MB + APXS',
        position: [1.36, -0.15, -0.05],
      },
      {
        id: 'power',
        code: 'PWR-04',
        name: 'Üç Eklemli Güneş Panelleri & WEB Gövdesi',
        category: 'power',
        categoryLabel: 'Enerji & Isıl Kontrol',
        functionSummary:
          'Açılır kelebek kanat diziliminde 1,3 m² yüzey alanına sahip GaInP/GaAs/Ge güneş hücreleri ve altın kaplamalı sıcak elektronik kutusu (WEB).',
        technicalDetails:
          'Mars öğle güneşinde ~140 Watt güç üretir ve gövde içindeki iki adet 8 Ah lityum-iyon bataryayı şarj eder. Gövde duvarları silika aerojel yalıtımı, altın kaplama ve 8 adet Plütonyum-238 RHU ısıtıcı kapsülü ile -105 °C Mars gecelerinde elektroniği korur.',
        specs: '1,3 m² üç eklemli panel (~140 W) · 2× Li-ion batarya · Aerojel yalıtım',
        position: [-0.15, 0.14, 0.85],
      },
      {
        id: 'antennas',
        code: 'COM-05',
        name: 'X-Band Yüksek Kazançlı (HGA) & UHF Antenler',
        category: 'comms',
        categoryLabel: 'Derin Uzay İletişimi',
        functionSummary:
          'Dünya’daki Derin Uzay Ağı (DSN) antenleriyle doğrudan X-Band bağlantısı ve Mars yörüngesindeki uydularla UHF veri aktarma sistemi.',
        technicalDetails:
          '28 cm çapındaki yönlendirilebilir düzlem X-Band Yüksek Kazançlı Anten (HGA) doğrudan Dünya ile haberleşir. Silindirik UHF monopole anten ise verilerin büyük kısmını Mars Odyssey ve Mars Reconnaissance Orbiter üzerinden Dünya’ya aktarır.',
        specs: 'X-Band (7–8 GHz, 3,5–12 kbps) + UHF (401 MHz, 128–256 kbps aktarma)',
        position: [-0.28, 0.56, -0.36],
      },
      {
        id: 'science',
        code: 'SCI-06',
        name: 'Mini-TES & RAD6000 Aviyonik Paketi',
        category: 'science',
        categoryLabel: 'İç Spektrometre & Bilgisayar',
        functionSummary:
          'Gövde içinde korunan kızılötesi mineral spektrometresi, ataletsel ölçüm birimi (IMU) ve radyasyona dayanıklı uçuş bilgisayarı.',
        technicalDetails:
          'Mini-TES (5–29 µm) kayaçların kristal yapısını uzaktan çözer. BAE RAD6000 (20 MHz) işlemci, otonom engel algılama, güneş takibi ve tüm bilimsel sekansları VxWorks işletim sistemi üzerinde yürütür.',
        specs: 'BAE RAD6000 (20 MHz) · 128 MB RAM · 256 MB Flash · Mini-TES (5–29 µm)',
        position: [0.0, 0.0, 0.0],
      },
    ],
  },
  opportunity: {
    roverId: 'opportunity',
    roverName: 'Opportunity (MER-B)',
    chassisFamily: 'mer-solar',
    schematicNotice:
      'Mimari Not: NASA/JPL MER-B (Opportunity) mühendislik şemasına sadık etkileşimli 3B parametrik CAD modeli. 45,16 km rekor kıran Rocker-Bogie yürüyüş sistemi ve Athena bilim yükünü gösterir.',
    scaleSummary: 'Ölçek: 1,5 m yükseklik × 2,3 m kanat açıklığı × 1,6 m uzunluk · 185 kg',
    parts: [
      {
        id: 'wheels',
        code: 'MOB-01',
        name: 'Rekor Kıran Rocker-Bogie & 6 Alüminyum Tekerlek',
        category: 'mobility',
        categoryLabel: 'Yürüyüş & Süspansiyon',
        functionSummary:
          'Meridiani Planum’dan Endeavour Krateri’ne 45,16 km yol katederek Dünya dışı sürüş rekorunu kıran 6 tekerlekli mafsallı süspansiyon.',
        technicalDetails:
          'Spiral esnek kollara (solucan dişli darbe emicilere) sahip Ø25 cm alüminyum tekerlekler, Purgatory kumullarından ve Victoria/Endeavour krater yamaçlarından başarıyla çıktı. Sağ ön direksiyon motorundaki arızaya ve yaşlanan tekerlek tellerine rağmen 5.111 Sol boyunca hareket kabiliyetini korudu.',
        specs: '45,16 km toplam sürüş · 6× bağımsız tahrik motoru · 4× direksiyon motoru',
        position: [0.95, -0.42, 0.72],
      },
      {
        id: 'cameras',
        code: 'OPT-02',
        name: 'Pancam Stereo Spektral Görüntüleyici & Navcam',
        category: 'optics',
        categoryLabel: 'Optik & Atmosferik Ölçüm',
        functionSummary:
          '217.594 ham görüntü kaydeden, hematit/sülfat spektral haritaları çıkaran ve 2018 toz fırtınasında atmosferik opaklığı (Tau) ölçen kamera kulesi.',
        technicalDetails:
          '440 nm’den 1001 nm’ye uzanan 11 dar bantlı mineral filtresi ve doğrudan Güneş gözlem filtreleriyle çalışır. Haziran 2018’deki küresel toz fırtınasında Tau değerinin 10,8’i aşarak gökyüzünü tamamen kararttığını Pancam güneş filtreleri tespit etmiştir.',
        specs: '1024×1024 CCD · 16 filtre konumu · 30 cm stereo baz açıklığı',
        position: [0.55, 0.95, 0.0],
      },
      {
        id: 'arm',
        code: 'ARM-03',
        name: 'IDD Robotik Kol (MI, RAT, Mössbauer, APXS)',
        category: 'arm',
        categoryLabel: 'Robotik Kol & Athena Taret Cihazları',
        functionSummary:
          'Eagle Krateri’ndeki hematit "yaban mersini" küreciklerini, jarosit mineralini, Heat Shield Rock göktaşını ve Homestake jips damarını analiz eden kol.',
        technicalDetails:
          '5 eklemli titanyum-karbon kompozit kol. Ucundaki RAT aşındırıcı ile onlarca sülfat kumtaşını zımparaladı; Mössbauer ve APXS ile jarosit ve smektit killerini doğruladı; Microscopic Imager (MI) ile milimetrik su dalgası çapraz tabakalanmalarını görüntüledi.',
        specs: '5 serbestlik derecesi · 30 µm/piksel MI · 45 mm RAT aşındırma çapı',
        position: [1.36, -0.15, -0.05],
      },
      {
        id: 'power',
        code: 'PWR-04',
        name: 'Güneş Panelleri (Rüzgâr Temizlemeli) & Li-Ion Bataryalar',
        category: 'power',
        categoryLabel: 'Enerji & Batarya Sistemi',
        functionSummary:
          '90 Sol ömür biçilen ancak Mars rüzgârlarının (cleaning events) tozu süpürmesi sayesinde yaklaşık 15 yıl boyunca enerji üreten üç eklemli güneş kanatları.',
        technicalDetails:
          '5.000’den fazla şarj-deşarj döngüsünü tamamlayan iki adet 8 Ah lityum-iyon batarya uzay donanım tarihinde rekor kırdı. 10 Haziran 2018’de gezegeni saran toz fırtınası güneş ışığını %99,99 oranında kesince enerji üretimi durdu.',
        specs: '1,3 m² GaInP/GaAs/Ge hücreler · 5.000+ şarj döngüsü · 8× RHU ısıtıcı',
        position: [-0.15, 0.14, 0.85],
      },
      {
        id: 'antennas',
        code: 'COM-05',
        name: 'UHF Yörünge Rölesi & X-Band HGA / LGA Antenleri',
        category: 'comms',
        categoryLabel: 'Telemetri & İletişim',
        functionSummary:
          '15 yıl boyunca Dünya’ya bilimsel veri aktaran ve Şubat 2019’a kadar 1.000’den fazla kurtarma komutunun dinlendiği iletişim sistemi.',
        technicalDetails:
          'Mars Odyssey ve MRO uydularıyla UHF bandında yüksek hızlı veri aktarımı sağladı; X-Band Yüksek Kazançlı (HGA) ve Düşük Kazançlı (LGA) antenlerle doğrudan Dünya Derin Uzay Ağı (DSN) istasyonlarıyla haberleşti.',
        specs: 'UHF (401 MHz) + X-Band (7,1 / 8,4 GHz) · Çift yönlü DSN bağlantısı',
        position: [-0.28, 0.56, -0.36],
      },
      {
        id: 'science',
        code: 'SCI-06',
        name: 'Mini-TES & Gövde İçi Aviyonik Merkez',
        category: 'science',
        categoryLabel: 'Termal Spektrometre & Uçuş Bilgisayarı',
        functionSummary:
          'Endurance ve Victoria kraterlerinin dik yamaçlarındaki sülfat katmanlarını uzaktan haritalayan kızılötesi spektrometre ve RAD6000 bilgisayarı.',
        technicalDetails:
          '2014 yılında yaşlanan Flash bellek hücrelerinde oluşan hataları aşmak için JPL mühendisleri tarafından yazılımı güncellenerek RAM-tabanlı geçici bellek modunda yıllarca kusursuz çalıştırıldı.',
        specs: 'RAD6000 CPU · 128 MB RAM · Mini-TES kızılötesi tayfölçer',
        position: [0.0, 0.0, 0.0],
      },
    ],
  },
  curiosity: {
    roverId: 'curiosity',
    roverName: 'Curiosity (MSL)',
    chassisFamily: 'msl-nuclear',
    schematicNotice:
      'Mimari Not: NASA/JPL Mars Science Laboratory (Curiosity) mühendislik şemasına sadık etkileşimli 3B parametrik CAD modeli (arka MMRTG nükleer güç üreteci, ChemCam/Mastcam direği ve ağır sondaj kolu).',
    scaleSummary: 'Ölçek: 2,9 m uzunluk × 2,7 m genişlik × 2,2 m yükseklik · 899 kg',
    parts: [
      {
        id: 'wheels',
        code: 'MOB-01',
        name: 'Ø50 cm 6 Tekerlekli Ağır Rocker-Bogie Süspansiyon',
        category: 'mobility',
        categoryLabel: 'Yürüyüş & Sky Crane İniş Şasisi',
        functionSummary:
          '900 kg’lık nükleer laboratuvarı Sharp Dağı’nın keskin kayalık yamaçlarına tırmandıran ve Gökyüzü Vinç inişinde doğrudan iniş takımı görevi gören şasi.',
        technicalDetails:
          '50 cm çapındaki her alüminyum tekerlek tek parça bloktan işlenmiştir ve üzerindeki delikli iz deseni Mars kumuna Mors alfabesiyle "JPL" (·--- ·--· ·-··) yazar. Keskin kaya aşınmalarına karşı JPL tarafından geliştirilen çekiş kontrol algoritmasıyla tekerlek torku zemine göre anlık ayarlanır.',
        specs: '6× Ø50 cm alüminyum tekerlek · 75 cm engel aşma kapasitesi',
        position: [1.05, -0.45, 0.82],
      },
      {
        id: 'cameras',
        code: 'OPT-02',
        name: 'ChemCam LIBS Lazeri & Mastcam (34 mm / 100 mm) Kulesi',
        category: 'optics',
        categoryLabel: 'Lazer Tayfölçer & Optik Direk',
        functionSummary:
          '7 metre uzaktaki kayaları kızılötesi lazerle buharlaştırıp plazma ışığını okuyan ChemCam ve yüksek çözünürlüklü stereo Mastcam kameraları.',
        technicalDetails:
          '1067 nm dalga boylu darbeli lazer kayada 10 milyon Watt’lık odaklanmış güçle plazma kıvılcımı oluşturur; teleskop ve 3 spektrometre (240–850 nm) anında element bileşimini okur. Hemen altında 34 mm orta açı ve 100 mm telefoto Mastcam çifti yer alır.',
        specs: 'ChemCam LIBS (1–7 m menzil) + Mastcam 34/100 mm + 4× Navcam',
        position: [0.68, 1.08, 0.32],
      },
      {
        id: 'arm',
        code: 'ARM-03',
        name: '2,1 m Robotik Kol & 30 kg Sondaj/Analiz Tareti',
        category: 'arm',
        categoryLabel: 'Kaya Sondajı & Makro Görüntüleme',
        functionSummary:
          '40’tan fazla Mars kayasını delip iç tozunu SAM ve CheMin laboratuvarlarına aktaran darbeli matkap, CHIMRA eleği, MAHLI kamerası ve APXS.',
        technicalDetails:
          '2,1 metre uzanabilen 5 eklemli kolun ucunda 60 cm çaplı, 30 kg ağırlığında dev bir taret bulunur. Tarette döner-darbeli kaya matkabı (1,6 cm çap, 5 cm derinlik), toz işleme ünitesi (CHIMRA), DRT tel fırçası, 14 µm/piksel MAHLI renkli makro kamerası ve APXS yer alır.',
        specs: '2,1 m erişim · 30 kg taret · Darbeli matkap + MAHLI + APXS + CHIMRA',
        position: [1.82, -0.14, -0.06],
      },
      {
        id: 'power',
        code: 'PWR-04',
        name: 'MMRTG Nükleer Güç Üreteci (Plütonyum-238)',
        category: 'power',
        categoryLabel: 'Nükleer Enerji & Isı Sistemi',
        functionSummary:
          'Toz fırtınalarından ve Mars kışından etkilenmeden gece-gündüz kesintisiz elektrik ve termal ısı üreten radyoizotop termoelektrik jeneratör.',
        technicalDetails:
          'Arka kısımda yukarı doğru açılı duran kanatçıklı beyaz radyatör silindiri içinde 4,8 kg Plütonyum-238 dioksit bulunur. Doğal radyoaktif bozunma ısısını (~2.000 W termal) termokupllarla elektriğe (başlangıçta ~110 W) dönüştürür; atık ısı ise borularla dolaştırılarak gövde içi laboratuvarları ısıtır.',
        specs: '4,8 kg PuO₂ · ~110 W elektrik + ~2.000 W termal · 2× 42 Ah Li-ion batarya',
        position: [-1.28, 0.42, 0.0],
      },
      {
        id: 'antennas',
        code: 'COM-05',
        name: 'Altıgen X-Band HGA & Yüksek Hızlı UHF Antenleri',
        category: 'comms',
        categoryLabel: 'Derin Uzay & Yörünge İletişimi',
        functionSummary:
          'MRO ve TGO uyduları üzerinden günde yüzlerce megabit bilimsel veriyi Dünya’ya aktaran çift bantlı iletişim paketi.',
        technicalDetails:
          'Gövde arkasındaki UHF anteni Mars Reconnaissance Orbiter ile geçiş başına 2 Mbps’ye varan hızda veri aktarır. İki eksende hareketli altıgen X-Band Yüksek Kazançlı Anten ise gövdeyi döndürmeden doğrudan Dünya’daki DSN istasyonlarına kilitlenir.',
        specs: 'UHF (up to 2 Mbps MRO aktarma) + X-Band HGA/LGA doğrudan Dünya hattı',
        position: [-0.42, 0.58, -0.46],
      },
      {
        id: 'science',
        code: 'SCI-06',
        name: 'SAM & CheMin Gövde İçi Analitik Laboratuvarları',
        category: 'science',
        categoryLabel: 'Organik Kimya & X-Işını Kırınımı',
        functionSummary:
          'Üst güvertedeki kapaklardan kaya tozunu teslim alıp organik karbon moleküllerini, metan gazını ve kristal mineral yapısını çözümleyen iki iç laboratuvar.',
        technicalDetails:
          'SAM (Sample Analysis at Mars) 74 örnek kabına, 1000 °C fırına, gaz kromatografına, kütle spektrometresine ve lazer spektrometresine sahiptir. CheMin ise X-ışını kırınımı (XRD) ile kil, sülfat ve kükürt minerallerini kesin olarak teşhis eder. Ayrıca gövdede RAD radyasyon dedektörü ve DAN nötron dedektörü bulunur.',
        specs: 'SAM (GCMS + TLS) + CheMin (XRD/XRF) + RAD + REMS + DAN',
        position: [0.05, 0.15, 0.0],
      },
    ],
  },
  perseverance: {
    roverId: 'perseverance',
    roverName: 'Perseverance (Mars 2020)',
    chassisFamily: 'm2020-nuclear',
    schematicNotice:
      'Mimari Not: NASA/JPL Mars 2020 (Perseverance) mühendislik şemasına sadık etkileşimli 3B parametrik CAD modeli (güçlendirilmiş tekerlekler, SuperCam/Mastcam-Z kulesi, SHERLOC/PIXL tareti ve MOXIE/SCS iç modülleri).',
    scaleSummary: 'Ölçek: 3,0 m uzunluk × 2,7 m genişlik × 2,2 m yükseklik · 1.025 kg',
    parts: [
      {
        id: 'wheels',
        code: 'MOB-01',
        name: 'Ø52,5 cm Güçlendirilmiş Tekerlekler & AutoNav Süspansiyonu',
        category: 'mobility',
        categoryLabel: 'Otonom Sürüş & Güçlendirilmiş Tekerlekler',
        functionSummary:
          'Curiosity deneyiminden öğrenilerek çapı büyütülen, 48 kavisli titanyum sırt dişine sahip dayanıklı tekerlekler ve yüksek hızlı AutoNav sistemi.',
        technicalDetails:
          '52,5 cm çaplı, daha dar ama daha kalın alüminyum gövdeli tekerlekler keskin kayalara karşı iki kat daha dirençlidir. Özel görüntü işleme işlemcisiyle çalışan AutoNav, araç durmadan sürüş esnasında 3B arazi haritası çıkararak saatte 152 metreye kadar otonom ilerleme sağlar.',
        specs: '6× Ø52,5 cm tekerlek (48 sırt dişi) · AutoNav yüksek hızlı otonom sürüş',
        position: [1.05, -0.45, 0.82],
      },
      {
        id: 'cameras',
        code: 'OPT-02',
        name: 'SuperCam Lazer/Mikrofon & Mastcam-Z (3:1 Zoom) Kulesi',
        category: 'optics',
        categoryLabel: 'Optik Zoom, Lazer Raman & Akustik',
        functionSummary:
          'Uzaktan UV/kızılötesi lazer spektroskopisi, Mars ses kaydı yapan mikrofon ve 3:1 optik yakınlaştırmalı stereo Mastcam-Z kameraları.',
        technicalDetails:
          'SuperCam hem LIBS lazeri hem de yeşil Raman lazeri kullanarak 7 metreden organik ve mineral bileşimini okur; üzerindeki mikrofon Mars rüzgârlarını ve lazer darbe seslerini kaydetmiştir. Mastcam-Z ise 26 mm–110 mm optik zoom lensleriyle Jezero deltasını yüksek çözünürlüklü 3B olarak görüntüler.',
        specs: 'SuperCam (LIBS + Raman + Mikrofon) + Mastcam-Z (3:1 Optik Zoom) + 23 Kamera',
        position: [0.68, 1.08, 0.32],
      },
      {
        id: 'arm',
        code: 'ARM-03',
        name: '2,1 m Robotik Kol & SHERLOC / PIXL / Karot Tareti',
        category: 'arm',
        categoryLabel: 'Astrobiyoloji Tareti & Kaya Karot Matkabı',
        functionSummary:
          '45 kg’lık astrobiyoloji tareti: UV Raman ile organik biyo-imza tarayan SHERLOC, mikro X-ışını haritalayıcı PIXL ve kaya karotu kesici matkap.',
        technicalDetails:
          'Kayayı toz haline getirmek yerine tebeşir büyüklüğünde (13 mm × 60 mm) sağlam kaya karotları kesip doğrudan titanyum tüplere dolduran döner-darbeli matkap taşır. SHERLOC & WATSON kamerası ile PIXL cihazı, "Cheyava Falls" kayasındaki organik karbonu ve leopar benekli reaksiyon halkalarını bu taretle keşfetmiştir.',
        specs: '45 kg taret · SHERLOC (Derin UV Raman) + PIXL (120 µm XRF) + Karot Matkabı',
        position: [1.82, -0.14, -0.06],
      },
      {
        id: 'power',
        code: 'PWR-04',
        name: 'MMRTG Nükleer Jeneratör & Kapasitif Güç Yönetimi',
        category: 'power',
        categoryLabel: 'Nükleer Enerji & Isıl Döngü',
        functionSummary:
          '4,8 kg Plütonyum-238 dioksit yakıtıyla çalışan, karot delme ve MOXIE oksijen üretimi gibi yüksek güç gerektiren operasyonları besleyen jeneratör.',
        technicalDetails:
          'Arka kısımda yer alan MMRTG ~110 Watt sürekli elektrik üretir ve iki adet 43 Ah lityum-iyon bataryayı şarj eder. MOXIE cihazı 800 °C’de oksijen üretirken veya karot matkabı çalışırken gereken ~900 Watt’lık tepe güç bu bataryalardan karşılanır.',
        specs: 'MMRTG (~110 W elektrik) + 2× 43 Ah Li-ion batarya · Freon-11 ısı boruları',
        position: [-1.28, 0.42, 0.0],
      },
      {
        id: 'antennas',
        code: 'COM-05',
        name: 'X-Band HGA, UHF Yörünge Rölesi & Helikopter Baz İstasyonu',
        category: 'comms',
        categoryLabel: 'Derin Uzay & Ingenuity Haberleşmesi',
        functionSummary:
          'Dünya ve Mars yörünge uydularıyla haberleşmenin yanı sıra Ingenuity helikopteriyle 900 MHz ZigBee radyo bağlantısı kuran sistem.',
        technicalDetails:
          'Altıgen yönlendirilebilir X-Band Yüksek Kazançlı Anten, omni-direksiyonel LGA ve UHF röle antenine ek olarak, 72 uçuş boyunca Ingenuity Mars Helikopteri’nin telemetri ve görüntülerini alan 900 MHz helikopter baz istasyonu antenini barındırır.',
        specs: 'X-Band HGA/LGA + UHF (2 Mbps) + 900 MHz Ingenuity Helikopter Hattı',
        position: [-0.42, 0.58, -0.46],
      },
      {
        id: 'science',
        code: 'SCI-06',
        name: 'SCS Örnek Mühürleme, MOXIE Oksijen Üreteci & RIMFAX Radar',
        category: 'science',
        categoryLabel: 'Örnek Önbellekleme, Oksijen & Yeraltı Radarı',
        functionSummary:
          'Gövde içindeki 43 titanyum tüplü robotik mühürleme istasyonu (SCS), Mars CO₂ atmosferinden oksijen üreten MOXIE ve yeraltı radarı RIMFAX.',
        technicalDetails:
          'Adaptive Caching Assembly içinde ikinci bir mini robotik kol, alınan karot tüplerini fotoğraflar, hacmini ölçer ve hermetik olarak mühürler (25+ tüp mühürlendi). MOXIE 16 denemede 122 g saf O₂ üretti; RIMFAX ise 10 metre derinliğe kadar Jezero deltası katmanlarını radarla taradı.',
        specs: '43× Titanyum Tüp (SCS) + MOXIE (122 g O₂) + RIMFAX (150–1200 MHz Radar) + MEDA',
        position: [0.05, 0.15, 0.0],
      },
    ],
  },
};
