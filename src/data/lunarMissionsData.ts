import type { LunarMissionItem } from '@/types';

export interface LunarSurfaceLandmark {
  id: string;
  name: string;
  kind: 'Mare (Bazaltik Deniz)' | 'Krater' | 'Havza / Dağlık Bölge';
  lat: number;
  lon: number;
  detail: string;
}

export const LUNAR_SURFACE_LANDMARKS: readonly LunarSurfaceLandmark[] = [
  {
    id: 'oceanus-procellarum',
    name: 'Oceanus Procellarum (Fırtınalar Okyanusu)',
    kind: 'Mare (Bazaltik Deniz)',
    lat: 18.4,
    lon: -57.4,
    detail: 'Ay’ın en geniş bazaltik düzlüğü (~4.000.000 km²); Luna 9’un iniş yaptığı bölge.',
  },
  {
    id: 'mare-imbrium',
    name: 'Mare Imbrium (Yağmurlar Denizi)',
    kind: 'Mare (Bazaltik Deniz)',
    lat: 32.8,
    lon: -15.6,
    detail: '1.145 km çaplı dev çarpışma havzası; Lunokhod 1, Apollo 15 ve Chang’e 3/Yutu görevlerine ev sahipliği yapar.',
  },
  {
    id: 'mare-serenitatis',
    name: 'Mare Serenitatis (Durgunluk Denizi)',
    kind: 'Mare (Bazaltik Deniz)',
    lat: 28.0,
    lon: 17.5,
    detail: 'Doğu sınırındaki Le Monnier Krateri ve Taurus-Littrow Vadisi’nde Lunokhod 2 ile Apollo 17 görevleri gerçekleştirilmiştir.',
  },
  {
    id: 'mare-tranquillitatis',
    name: 'Mare Tranquillitatis (Sessizlik Denizi)',
    kind: 'Mare (Bazaltik Deniz)',
    lat: 8.5,
    lon: 31.4,
    detail: 'İnsanlığın Ay yüzeyine ilk ayak bastığı Apollo 11 (Statio Tranquillitatis) bölgesini barındıran bazaltik ova.',
  },
  {
    id: 'tycho-crater',
    name: 'Tycho Krateri',
    kind: 'Krater',
    lat: -43.31,
    lon: -11.36,
    detail: '85 km çapında, 108 milyon yıllık genç çarpışma krateri; güney yarımkürede parlak ışın sistemiyle dikkat çeker.',
  },
  {
    id: 'spa-basin',
    name: 'Güney Kutbu–Aitken Havzası (Uzak Yüz)',
    kind: 'Havza / Dağlık Bölge',
    lat: -53.0,
    lon: 169.0,
    detail: '2.500 km çapında ve 8 km derinliğinde Güneş Sistemi’nin en büyük ve en eski çarpışma havzalarından biri; Chang’e 4 / Yutu-2 burada görev yapmaktadır.',
  },
];

export const LUNAR_MISSIONS: readonly LunarMissionItem[] = [
  {
    id: 'luna-9',
    name: 'Luna 9 (E-6M #202)',
    code: 'SSCB · LUNA-9 · 1966',
    agency: 'OKB-1 / Lavochkin (Sovyetler Birliği)',
    country: 'SSCB',
    missionType: 'Yumuşak İniş Aracı (Lander)',
    eraBadge: '1966 · ÖNCÜ DÖNEM',
    launchDate: '31 Ocak 1966 (11:41 UTC · Baykonur)',
    landingDate: '3 Şubat 1966 (18:45:30 UTC)',
    missionEndDate: '6 Şubat 1966 (22:55 UTC · Pil Tükenmesi)',
    durationLabel: '3 Gün (8 Saat 5 Dakika Aktif İletişim)',
    landingSite: 'Oceanus Procellarum (Fırtınalar Okyanusu · Planitia Descensus)',
    landingCoordinates: '7.08° K, 64.37° B (295.63° D)',
    lat: 7.08,
    lon: -64.37,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#f59e0b',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/luna-9.svg',
    imageAlt: 'Luna 9 yumuşak iniş kapsülü ve 4 yapraklı koruyucu açılır gövde şeması',
    imageCredit:
      'Teknik Görev Rekonstrüksiyon Şeması (Veri Kaynağı: NASA NSSDCA ID 1966-006A & Lavochkin Arşivi) · Canlı NASA Arşiv bağlantısı mevcuttur.',
    mediaKindLabel: 'Teknik Görev & Yüzey Rekonstrüksiyon İllüstrasyonu',
    nasaSearchQuery: 'Luna 9 lunar lander',
    summary:
      'Ay (ve Dünya dışı herhangi bir gök cismi) yüzeyine ilk kez başarılı yumuşak iniş gerçekleştiren ve yüzeyden ilk panoramik fotoğrafları Dünya’ya ileten tarihi uzay aracı.',
    missionObjective:
      'Luna 9’un temel amacı, Ay yüzeyinin bir uzay aracını yutacak kadar derin ve gevşek bir toz tabakasıyla kaplı olup olmadığını test etmek, hava yastıklı yumuşak iniş teknolojisini doğrulamak ve Ay yüzeyinden doğrudan çekilen ilk televizyon panoramalarını Dünya’ya göndermekti.',
    missionOutcome:
      'Tam başarı. 3 Şubat 1966’da Oceanus Procellarum’a iniş yapan 99 kg’lık küresel ALS kapsülü, 4 taç yaprağını açarak kendini dik konuma getirdi ve Ay yüzeyinin sağlam, taşıyıcı bir regolit yapısına sahip olduğunu kanıtlayarak hem Apollo hem de sonraki robotik görevlerin önünü açtı.',
    keyMetrics: [
      {
        label: 'FIRLATMA / İNİŞ KÜTLESİ',
        value: '1.583 kg / 99 kg',
        sublabel: 'Küre çapı: 58 cm (ALS kapsülü)',
      },
      {
        label: 'YÜZEY PANORAMASI',
        value: '27 Fotoğraf',
        sublabel: '3 farklı Güneş açısında 360° görünüm',
      },
      {
        label: 'AKTİF RADYO OTURUMU',
        value: '7 Oturum',
        sublabel: 'Toplam 8 saat 5 dakika veri aktarımı',
      },
      {
        label: 'TARİHİ ÖNEM',
        value: 'İlk Yumuşak İniş',
        sublabel: 'Dünya dışı bir yüzeye ilk sağlam temas',
      },
    ],
    technicalSpecs: [
      { label: 'Görev Sınıfı', value: 'Otomatik Ay İstasyonu (ALS E-6M)' },
      { label: 'Fırlatma Aracı', value: 'Molniya-M (8K78M) 4 Kademeli Roket' },
      { label: 'İniş Sistemi', value: 'KTDU-5A Sıvı Yakıtlı Frenleme Motoru + Çift Hava Yastığı' },
      { label: 'Kapsül Boyutları', value: '58 cm çapında hermetik küre (4 taç yapraklı dengeleyici)' },
      { label: 'Güç Kaynağı', value: 'Gümüş-Çinko (Ag-Zn) Batarya (~500 Wh kapasite)' },
      { label: 'İletişim Frekansı', value: '183.538 MHz VHF (4 çubuk + 4 taç yaprak anten)' },
      { label: 'Termal Kontrol', value: 'Basınçlı nitrojen gazı sirkülasyonu ve buharlaştırmalı soğutma' },
      { label: 'COSPAR / NSSDCA Kodu', value: '1966-006A' },
    ],
    scientificInstruments: [
      {
        code: 'OPT-TV',
        name: '860-A Optik-Mekanik Panoramik Televizyon Kamerası',
        location: 'Kapsül Üst Döner Kulesi',
        description:
          '1.4 kg ağırlığında, 360° yatay ve 29° dikey görüş alanına sahip tarayıcı kamera; 1.5–2 mm çözünürlükle yakın regolit dokusunu görüntüledi.',
      },
      {
        code: 'SBM',
        name: 'SBM Radyasyon Dedektörü (Gaz Deşarj Sayacı)',
        location: 'Kapsül Gövde İçi',
        description:
          'Ay yüzeyindeki kozmik ışın ve ikincil radyasyon dozunu ölçerek günlük radyasyon oranını ~30 milirad olarak belirledi.',
      },
      {
        code: 'DIHEDRAL-MIRROR',
        name: 'Üçlü Dihedral Stereoskopik Aynalar',
        location: 'Üst Gövde Çevresi',
        description:
          'Yüzeydeki çakıl ve kraterlerin mesafesini stereoskopik olarak hesaplamak için kamera görüş açısına yerleştirilen kalibrasyon aynaları.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Ay Regolitinin Taşıma Gücünün Kanıtlanması',
        location: 'Oceanus Procellarum (Cavalerius Krateri Kuzeydoğusu)',
        description:
          'Bilim dünyasında tartışılan "derin toz bataklığı" hipotezini çürüterek Ay yüzeyinin uzay araçlarını ve astronotları taşıyabilecek sıkılıkta olduğunu doğruladı.',
      },
      {
        title: 'Dünya Dışı Bir Yüzeyden İlk Panoramik Görüntüler',
        location: 'Planitia Descensus',
        description:
          'Güneş yüksekliği 7°, 14°, 27° ve 41° iken çekilen panoramalar, mikro-krater yapısını ve cm ölçeğindeki bazaltik kayaç parçalarını ilk kez gözler önüne serdi.',
      },
    ],
    timeline: [
      {
        date: '31 Ocak 1966',
        sol: 'T+0 Gün',
        title: 'Baykonur’dan Fırlatma',
        description: 'Luna 9, Molniya-M roketiyle fırlatılarak Ay transfer yörüngesine yerleştirildi.',
      },
      {
        date: '3 Şubat 1966 · 18:45 UTC',
        sol: 'İniş Günü',
        title: 'Oceanus Procellarum’a İlk Yumuşak İniş',
        description: 'Yüzeyden 5 metre yüksekte ana frenleme kademesinden ayrılan hava yastıklı kapsül yüzeye indi ve 4 yaprağını açtı.',
      },
      {
        date: '4–6 Şubat 1966',
        sol: 'Yüzey Günü 1–3',
        title: 'Panoramik Görüntü İletimi ve Görev Sonu',
        description: 'Toplam 8 saat 5 dakikalık radyo oturumlarının ardından bataryalar tükendi ve görev başarıyla tamamlandı.',
      },
    ],
    sourceLabel: 'NASA NSSDCA — Luna 9 Mission Catalog (1966-006A)',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-006A',
    secondarySourceLabel: 'NASA Science — Luna 9 Mission Overview',
    secondarySourceUrl: 'https://science.nasa.gov/mission/luna-9/',
  },
  {
    id: 'lunokhod-1',
    name: 'Lunokhod 1 (Luna 17 · 8E21 #203)',
    code: 'SSCB · LUNOKHOD-1 · 1970',
    agency: 'Lavochkin / VNIItransmash (Sovyetler Birliği)',
    country: 'SSCB',
    missionType: 'Robotik Ay Gezicisi (Rover)',
    eraBadge: '1970–1971 · İLK ROBOTİK ROVER',
    launchDate: '10 Kasım 1970 (14:44 UTC · Baykonur)',
    landingDate: '17 Kasım 1970 (03:47 UTC)',
    missionEndDate: '14 Eylül 1971 (Resmi Görev Sonu: 4 Ekim 1971)',
    durationLabel: '322 Dünya Günü (11 Ay Günü · Planlanan: 3 Ay Günü)',
    landingSite: 'Mare Imbrium (Yağmurlar Denizi · Sinus Iridum Güneyi)',
    landingCoordinates: '38.24° K, 35.00° B (325.00° D)',
    lat: 38.24,
    lon: -35.0,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#38bdf8',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/lunokhod-1.svg',
    imageAlt: 'Lunokhod 1 sekiz tekerlekli robotik Ay gezicisi ve açılır güneş paneli kapağı şeması',
    imageCredit:
      'Teknik Görev Rekonstrüksiyon Şeması (Veri Kaynağı: NASA NSSDCA ID 1970-095A & LROC Arşivi) · Canlı NASA Arşiv bağlantısı mevcuttur.',
    mediaKindLabel: 'Teknik Görev & Yüzey Rekonstrüksiyon İllüstrasyonu',
    nasaSearchQuery: 'Lunokhod 1 rover moon',
    summary:
      'Başka bir gök cismi üzerinde başarıyla hareket eden, Dünya’dan uzaktan kumanda edilen ilk robotik gezici (rover). 11 Ay günü boyunca 10.54 km yol kat etmiştir.',
    missionObjective:
      'Luna 17 iniş platformuyla Mare Imbrium’a indirilen Lunokhod 1’in amacı, Ay yüzeyinde uzun süreli mobil keşif yapmak, toprağın mekanik direncini ve kimyasal bileşimini yüzlerce noktada ölçmek ve lazer mesafe ölçümü deneyleri gerçekleştirmekti.',
    missionOutcome:
      'Planlanan 3 Ay günü (yaklaşık 90 Dünya günü) ömrünüเกือบ 4 kat aşarak 322 gün boyunca görev yaptı; 10.54 km sürüş mesafesi, 20.000’den fazla TV görüntüsü ve 206 yüksek çözünürlüklü panorama üretti. 2010 yılında NASA LRO tarafından tam konumu görüntülenmiş ve lazer reflektörü yeniden aktif olarak kullanılmıştır.',
    keyMetrics: [
      {
        label: 'KATEDİLEN MESAFE',
        value: '10.54 km',
        sublabel: 'Dünya dışı ilk uzun menzilli sürüş',
      },
      {
        label: 'GÖREV SÜRESİ',
        value: '322 Gün',
        sublabel: '11 Ay Günü / 10 Dondurucu Ay Gecesi',
      },
      {
        label: 'GÖRÜNTÜ ARŞİVİ',
        value: '20.000+ Kare',
        sublabel: '206 panoramik yüzey görüntüsü',
      },
      {
        label: 'TOPRAK TESTİ',
        value: '537 Nokta',
        sublabel: 'PrOP penetrometre & 25 RIFMA X-ışını analizi',
      },
    ],
    technicalSpecs: [
      { label: 'Gezici Kütlesi', value: '756 kg (Luna 17 iniş kademesiyle toplam 5.600 kg)' },
      { label: 'Boyutlar', value: 'Uzunluk: 2.22 m · Genişlik: 1.60 m · Yükseklik: 1.35 m' },
      { label: 'Yürüyüş Sistemi', value: '8 Bağımsız Elektrik Motorlu Tel Örgü Tekerlek (51 cm çap)' },
      { label: 'Sürüş Hızı', value: '2 hız kademesi: 0.8 km/sa ve 2.0 km/sa' },
      { label: 'Güç ve Isı Sistemi', value: 'İçbükey kapakta GaAs Güneş Hücreleri + Polonyum-210 RTG Isıtıcı' },
      { label: 'Kontrol Yöntemi', value: 'Dünya’daki 5 kişilik ekip tarafından gerçek zamanlı tele-operasyon' },
      { label: 'COSPAR / NSSDCA Kodu', value: '1970-095A' },
    ],
    scientificInstruments: [
      {
        code: 'RIFMA',
        name: 'RIFMA X-Işını Floresans Spektrometresi',
        location: 'Ön Alt Gövde',
        description:
          'Regolit içindeki alüminyum, kalsiyum, silisyum, demir, magnezyum, titanyum ve potasyum bolluklarını yerinde analiz etti.',
      },
      {
        code: 'PROP',
        name: 'PrOP Konik Kanatlı Toprak Penetrometresi + Dokuzuncu Tekerlek Odometresi',
        location: 'Arka Şasi Mekanizması',
        description:
          'Toprağa batırılıp döndürülen konik uç ile 537 farklı noktada Ay regolitinin kesme mukavemetini ve taşıma kapasitesini ölçtü.',
      },
      {
        code: 'TL-LASER',
        name: 'Fransız-Sovyet Köşe Küp Lazer Retroreflektörü (14 Prizma)',
        location: 'Ön Üst Güverte',
        description:
          'Dünya’daki gözlemevlerinden gönderilen lazer darbelerini geri yansıtarak Dünya-Ay mesafesinin santimetre hassasiyetinde ölçülmesini sağladı.',
      },
      {
        code: 'RT-1 / RV-2N',
        name: 'X-Işını Teleskobu ve Radyasyon Dedektörü',
        location: 'Üst Gövde',
        description:
          'Galaktik X-ışını arka planını ve Güneş proton olaylarını gözlemledi.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Mare Imbrium Bazaltik Kimyasının Haritalanması',
        location: 'Mare Imbrium Batı Havzası',
        description:
          'RIFMA ölçümleri, Mare Imbrium yüzeyinin demir ve titanyumca zengin bazaltik lav akıntılarından oluştuğunu doğruladı.',
      },
      {
        title: 'Ay Gecelerinde Nükleer Termal Hayatta Kalma Tekniği',
        location: '10 Ay Gecesi Döngüsü (-150°C)',
        description:
          'Güneş kapağını kapatıp Polonyum-210 ısı kaynağıyla iç sıcaklığı koruyarak 14 günlük dondurucu Ay gecelerini atlatan ilk gezici oldu.',
      },
    ],
    timeline: [
      {
        date: '17 Kasım 1970',
        sol: 'Ay Günü 1',
        title: 'Luna 17 İnişi ve Rampadan Yüzeye Çıkış',
        description: 'İnişten 2.5 saat sonra Lunokhod 1 iki rampadan birini kullanarak Ay toprağına indi.',
      },
      {
        date: 'Şubat 1971',
        sol: 'Ay Günü 4',
        title: 'Planlanan 90 Günlük Görev Süresinin Aşılması',
        description: 'Gezici planlanan tüm bilimsel hedeflerini tamamlayarak kuzey-güney jeolojik profil sürüşlerine başladı.',
      },
      {
        date: '14 Eylül 1971',
        sol: 'Ay Günü 11',
        title: 'Polonyum-210 Isı Kaynağının Tükenmesi ve Son İletişim',
        description: '11. Ay gecesine girerken izotop ısıtıcısının yarı ömrünü doldurması sonucu 4 Ekim 1971’de görev resmen sonlandırıldı.',
      },
    ],
    sourceLabel: 'NASA NSSDCA — Luna 17 / Lunokhod 1 (1970-095A)',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1970-095A',
    secondarySourceLabel: 'NASA Science — Luna 17 / Lunokhod 1',
    secondarySourceUrl: 'https://science.nasa.gov/mission/luna-17/',
  },
  {
    id: 'apollo-15-lrv',
    name: 'Apollo 15 LRV (LRV-001)',
    code: 'NASA · APOLLO 15 · LRV-1',
    agency: 'NASA / Boeing / Delco Electronics (ABD)',
    country: 'ABD',
    missionType: 'Mürettebatlı Ay Taşıtı (LRV)',
    eraBadge: '1971 · İLK İNSANLI AY ARABASI',
    launchDate: '26 Temmuz 1971 (13:34 UTC · Kennedy Uzay Merkezi)',
    landingDate: '30 Temmuz 1971 (22:16 UTC · İlk Sürüş: 31 Temmuz 1971)',
    missionEndDate: '2 Ağustos 1971 (3 EVA Sonrası Yüzeyde Bırakıldı)',
    durationLabel: '3 Saat 2 Dakika Sürüş Süresi (3 Yüzey Yürüyüşü / EVA)',
    landingSite: 'Hadley–Apennine (Hadley Rille & Montes Apenninus)',
    landingCoordinates: '26.13° K, 3.63° D',
    lat: 26.13,
    lon: 3.63,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#fb923c',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/apollo-15-lrv.svg',
    imageAlt: 'Apollo 15 Lunar Roving Vehicle (LRV-001) Hadley-Apennine görev şeması',
    imageCredit:
      'Teknik Görev Şeması & NASA ALSJ Arşivi (AS15-88-11901 / NASA History LRV Documents) · Canlı NASA Arşiv fotoğrafı mevcuttur.',
    mediaKindLabel: 'Teknik Görev & Yüzey Rekonstrüksiyon İllüstrasyonu',
    nasaSearchQuery: 'Apollo 15 Lunar Roving Vehicle',
    nasaArchiveId: 'as15-88-11901',
    summary:
      'Astronotlar David Scott ve James Irwin tarafından Hadley–Apennine bölgesinde kullanılan, insanlığın Dünya dışında sürdüğü ilk mürettebatlı elektrikli keşif taşıtı.',
    missionObjective:
      'Önceki Apollo görevlerinde yürüyüş mesafesiyle sınırlı kalan keşif yarıçapını katlayarak Montes Apenninus dağ eteklerine ve Hadley Rille lav kanalına ulaşmak; Ay’ın ilkel kabuğuna ait anortozit örneklerini ("Genesis Rock") toplamak.',
    missionOutcome:
      '27.76 km mesafe kat ederek 77 kg Ay kayası ve toprak örneğinin toplanmasını sağladı. 4.1 milyar yıllık ünlü "Genesis Rock" (Örnek 15415) bu görevde bulundu ve Falcon Ay Modülü’nün Ay’dan kalkışı LRV üzerindeki uzaktan kumandalı TV kamerasıyla canlı yayınlandı.',
    keyMetrics: [
      {
        label: 'TOPLAM SÜRÜŞ MESAFESİ',
        value: '27.76 km',
        sublabel: '3 ayrı EVA boyunca toplam 3 sa 02 dk sürüş',
      },
      {
        label: 'BOŞ KÜTLE / TAŞIMA',
        value: '210 kg / 490 kg',
        sublabel: 'Kendi ağırlığının 2 katından fazla yük kapasitesi',
      },
      {
        label: 'TOPLANAN NUMUNE',
        value: '77.3 kg',
        sublabel: 'Ünlü 15415 "Genesis Rock" anortoziti dahil',
      },
      {
        label: 'LM’DEN MAKS. UZAKLIK',
        value: '5.0 km',
        sublabel: 'Güvenli yürüyerek dönüş sınırı içinde',
      },
    ],
    technicalSpecs: [
      { label: 'Üretici Konsorsiyum', value: 'Boeing (Ana Yüklenici) & General Motors Delco Electronics' },
      { label: 'Boyutlar', value: 'Uzunluk: 3.10 m · Genişlik: 1.83 m · Dingil Mesafesi: 2.29 m' },
      { label: 'Tekerlek Tasarımı', value: '81 cm çapında çinko kaplı çelik tel örgü + titanyum şevron paletler' },
      { label: 'Tahrik Sistemi', value: 'Her tekerlekte 0.25 hp (190 W) elektrik motoru + 80:1 harmonik dişli' },
      { label: 'Güç Kaynağı', value: '2 adet 36V Gümüş-Çinko (Ag-Zn) şarj edilemez batarya (121 Ah / batarya)' },
      { label: 'Kontrol Sistemi', value: 'Koltuklar arasındaki T-kolu (T-Handle) elektronik kumanda' },
      { label: 'Navigasyon (LRV Nav)', value: 'Yön jiroskopu, odometre ve güneş gölge ölçerli ölü hesaplama bilgisayarı' },
    ],
    scientificInstruments: [
      {
        code: 'LCRU-TV',
        name: 'Ay İletişim Röle Ünitesi (LCRU) & RCA Renkli TV Kamerası',
        location: 'Ön Şasi ve Yüksek Kazançlı S-Bant Şemsiye Anten',
        description:
          'Houston’daki uçuş kontrolörü Ed Fendell tarafından uzaktan yönlendirilen kamera; astronotların jeolojik çalışmalarını ve LM kalkışını Dünya’ya canlı aktardı.',
      },
      {
        code: 'LRV-NAV',
        name: 'Boeing / Kearfott Ataletsel Navigasyon ve Mesafe Bilgisayarı',
        location: 'Ön Gösterge Paneli',
        description:
          'Manyetik alanı olmayan Ay’da jiroskop ve tekerlek dönüş sayacıyla Ay Modülü’ne olan yönü, mesafeyi ve toplam yolu %1 hata payıyla gösterdi.',
      },
      {
        code: 'GEO-RACK',
        name: 'Jeoloji Alet Taşıyıcı, Karot Matkabı ve Kayaç Çantaları',
        location: 'Arka Kargo Platformu',
        description:
          'Tırmık, çekiç, kepçe, polarimetrik gnomon ve derin regolit karot örnekleyicilerini taşıdı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Genesis Kayası (Örnek 15415) Keşfi',
        location: 'Spur Krateri · İstasyon 7 (EVA-2)',
        description:
          'Scott ve Irwin, Ay’ın ilkel magma okyanusundan kristalleşen ~4.1 milyar yıllık saf anortozit kabuk kayasını bularak Ay’ın erken evrimini aydınlattı.',
      },
      {
        title: 'Hadley Rille Lav Kanalı Tabakalarının Doğrudan Gözlemi',
        location: 'Hadley Rille Kenarı · İstasyon 9A',
        description:
          '1.5 km genişliğindeki ve 300 m derinliğindeki Hadley Rille vadisinin duvarlarında yerinde tabakalanmış bazalt katmanları fotoğraflandı ve örneklendi.',
      },
    ],
    timeline: [
      {
        date: '31 Temmuz 1971',
        sol: 'EVA-1 (10.3 km)',
        title: 'LRV’nin Falcon’dan İndirilmesi ve İlk Sürüş',
        description: 'Ön tekerlek yönlendirme devresi geçici olarak devre dışı kalsa da arka yönlendirmeyle Elbow ve St. George kraterlerine ulaşıldı.',
      },
      {
        date: '1 Ağustos 1971',
        sol: 'EVA-2 (12.5 km)',
        title: 'Apennine Cephesi Tırmanışı ve Genesis Kayası',
        description: 'Her iki yönlendirme sistemi aktif hale gelerek Spur Krateri’nde Genesis Rock bulundu.',
      },
      {
        date: '2 Ağustos 1971',
        sol: 'EVA-3 (5.0 km) & Kalkış',
        title: 'Hadley Rille Keşfi ve Canlı Kalkış Yayını',
        description: 'LRV, Falcon’un 90 m doğusuna park edilerek Ay’dan yükselişi Dünya’ya canlı yayınladı.',
      },
    ],
    sourceLabel: 'NASA History — Apollo Lunar Roving Vehicle Documentation (ALSJ)',
    sourceUrl: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    secondarySourceLabel: 'Türkçe Vikipedi — Ay Taşıtı (Apollo LRV)',
    secondarySourceUrl: 'https://tr.wikipedia.org/wiki/Ay_Ta%C5%9F%C4%B1t%C4%B1',
  },
  {
    id: 'apollo-16-lrv',
    name: 'Apollo 16 LRV (LRV-002)',
    code: 'NASA · APOLLO 16 · LRV-2',
    agency: 'NASA / Boeing / Delco Electronics (ABD)',
    country: 'ABD',
    missionType: 'Mürettebatlı Ay Taşıtı (LRV)',
    eraBadge: '1972 · YAYLA KEŞİF ARACI',
    launchDate: '16 Nisan 1972 (17:54 UTC · Kennedy Uzay Merkezi)',
    landingDate: '21 Nisan 1972 (02:23 UTC)',
    missionEndDate: '24 Nisan 1972 (3 EVA Sonrası Yüzeyde Bırakıldı)',
    durationLabel: '3 Saat 26 Dakika Sürüş Süresi (26.55 km)',
    landingSite: 'Descartes Yaylaları (Descartes & Cayley Oluşumları)',
    landingCoordinates: '8.97° G, 15.50° D',
    lat: -8.97,
    lon: 15.5,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#f97316',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/apollo-16-lrv.svg',
    imageAlt: 'Apollo 16 Lunar Roving Vehicle (LRV-002) Descartes Yaylaları görev şeması',
    imageCredit:
      'Teknik Görev Şeması & NASA ALSJ Arşivi (AS16-116-18649 / NASA History LRV Documents) · Canlı NASA Arşiv fotoğrafı mevcuttur.',
    mediaKindLabel: 'Teknik Görev & Yüzey Rekonstrüksiyon İllüstrasyonu',
    nasaSearchQuery: 'Apollo 16 Lunar Roving Vehicle',
    nasaArchiveId: 'as16-116-18649',
    summary:
      'Ay’ın engebeli yüksek yaylalarına (Descartes Highlands) inen tek Apollo görevi olan Apollo 16’da John Young ve Charles Duke tarafından Stone Mountain’ın 152 metre yukarısına kadar sürülen Ay arabası.',
    missionObjective:
      'Ay’ın bazaltik denizleri dışında kalan eski ve engebeli yayla bölgelerinin (Cayley ovaları ve Descartes dağları) volkanik kökenli mi yoksa çarpışma breşlerinden mi oluştuğunu yerinde incelemek.',
    missionOutcome:
      '26.55 km yol kat ederek 95.7 kg kayaç örneği toplanmasını sağladı. Toplanan örneklerin volkanik riyolit değil, dev çarpışmaların oluşturduğu darbe breşleri (impact breccias) olduğunu kanıtlayarak Ay jeolojisi modellerini kökten değiştirdi. Ayrıca John Young LRV ile ünlü "Grand Prix" performans testini gerçekleştirdi.',
    keyMetrics: [
      {
        label: 'TOPLAM SÜRÜŞ MESAFESİ',
        value: '26.55 km',
        sublabel: 'Engebeli yayla arazisinde 3 sa 26 dk sürüş',
      },
      {
        label: 'TIRMANIŞ İRTİFASI',
        value: '+152 m',
        sublabel: 'Stone Mountain yamacında en yüksek Apollo tırmanışı',
      },
      {
        label: 'TOPLANAN NUMUNE',
        value: '95.71 kg',
        sublabel: '11.7 kg’lık "Big Muley" (en büyük Apollo kayası) dahil',
      },
      {
        label: 'EĞİM KAPASİTESİ',
        value: '20° Eğim',
        sublabel: 'Dik krater ve dağ yamaçlarında tam tutunma',
      },
    ],
    technicalSpecs: [
      { label: 'Araç Seri Kodu', value: 'LRV-002 (Apollo 16 Orion Ay Modülü)' },
      { label: 'Maksimum Eğim Performansı', value: '25° statik stabilite, Stone Mountain’da ~20° aktif tırmanış' },
      { label: 'Dönüş Yarıçapı', value: '3.05 metre (Ön ve arka bağımsız çift yönlendirme)' },
      { label: 'Yerden Yükseklik', value: '35.6 cm (Tam yüklü durumda)' },
      { label: 'Süspansiyon', value: 'Çift salıncaklı (double wishbone) burulma çubuğu ve amortisör sistemi' },
      { label: 'Enerji Tüketimi', value: 'Toplam 26.55 km boyunca yalnızca ~93 Ah harcandı' },
    ],
    scientificInstruments: [
      {
        code: 'LPM',
        name: 'Taşınabilir Ay Manyetometresi (Lunar Portable Magnetometer)',
        location: 'LRV Kargo Bölmesi',
        description:
          'Farklı istasyonlarda yerel kalıntı manyetik alanı ölçerek Cayley oluşumunda 327 gama’ya ulaşan en güçlü yerel Ay manyetik anomalisini tespit etti.',
      },
      {
        code: 'LCRU-TV',
        name: 'Uzaktan Kumandalı Renkli TV ve S-Bant İletişim Ünitesi',
        location: 'Ön Şasi',
        description:
          'Stone Mountain ve North Ray Krateri’ndeki jeolojik örnekleme çalışmalarını doğrudan Houston’daki bilim ekibine aktardı.',
      },
      {
        code: 'UV-CAM',
        name: 'Uzak Morötesi Kamera / Spektrograf (Far UV Camera)',
        location: 'LM Gölgesi (LRV Destekli Operasyon)',
        description:
          'Dünya’nın jeokoronasını ve Büyük Macellan Bulutu’nu Ay yüzeyinden görüntüleyen ilk astronomik teleskop.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Volkanik Yayla Hipotezinin Çürütülmesi',
        location: 'Descartes ve Cayley Oluşumları',
        description:
          'LRV ile gezilen tüm istasyonlardan alınan kayaçların volkanik lav değil, Imbrium ve Nectaris gibi dev çarpışmaların fırlattığı metamorfik breşler olduğu kanıtlandı.',
      },
      {
        title: 'North Ray Krateri ve "House Rock" İncelemesi',
        location: 'EVA-3 · İstasyon 11',
        description:
          '1 km genişliğindeki North Ray Krateri kenarında 4 katlı bina büyüklüğündeki "House Rock" ve "Shadow Rock" dev breş bloklarından örnekler alındı.',
      },
    ],
    timeline: [
      {
        date: '21 Nisan 1972',
        sol: 'EVA-1 (4.2 km)',
        title: 'Flag ve Spook Kraterleri Sürüşü ve "Grand Prix"',
        description: 'Batı yönünde Flag Krateri’ne sürüş yapıldı ve John Young LRV’nin düşük kütleçekimindeki savrulma/fren davranışını test etti.',
      },
      {
        date: '22 Nisan 1972',
        sol: 'EVA-2 (11.1 km)',
        title: 'Stone Mountain Tırmanışı',
        description: 'LRV, vadi tabanından 152 m yukarıdaki Cinco Kraterleri’ne (İstasyon 4) tırmanarak en yüksek irtifa rekorunu kırdı.',
      },
      {
        date: '23 Nisan 1972',
        sol: 'EVA-3 (11.4 km)',
        title: 'North Ray Krateri ve Hız Sürüşü',
        description: 'Kuzeydeki derin North Ray Krateri incelendi ve toplam 95.7 kg örnek ile görev tamamlandı.',
      },
    ],
    sourceLabel: 'NASA History — Apollo Lunar Roving Vehicle Documentation (ALSJ)',
    sourceUrl: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    secondarySourceLabel: 'Türkçe Vikipedi — Ay Taşıtı (Apollo LRV)',
    secondarySourceUrl: 'https://tr.wikipedia.org/wiki/Ay_Ta%C5%9F%C4%B1t%C4%B1',
  },
  {
    id: 'apollo-17-lrv',
    name: 'Apollo 17 LRV (LRV-003)',
    code: 'NASA · APOLLO 17 · LRV-3',
    agency: 'NASA / Boeing / Delco Electronics (ABD)',
    country: 'ABD',
    missionType: 'Mürettebatlı Ay Taşıtı (LRV)',
    eraBadge: '1972 · REKORTMEN AY ARABASI',
    launchDate: '7 Aralık 1972 (05:33 UTC · Kennedy Uzay Merkezi)',
    landingDate: '11 Aralık 1972 (19:54 UTC)',
    missionEndDate: '14 Aralık 1972 (Son İnsanlı EVA)',
    durationLabel: '4 Saat 26 Dakika Sürüş Süresi (35.89 km)',
    landingSite: 'Taurus–Littrow Vadisi (Mare Serenitatis Güneydoğu Kenarı)',
    landingCoordinates: '20.19° K, 30.77° D',
    lat: 20.19,
    lon: 30.77,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#ea580c',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/apollo-17-lrv.jpg',
    imageAlt: 'Apollo 17 Komutanı Eugene Cernan Taurus–Littrow Vadisi’nde Lunar Roving Vehicle (LRV-003) ile test sürüşünde (NASA AS17-147-22526)',
    imageCredit:
      'NASA / Harrison Schmitt · Apollo 17 Hasselblad Görüntüsü (AS17-147-22526 · Taurus–Littrow Vadisi, 11 Aralık 1972) · Kaynak: NASA Apollo 50th & ALSJ',
    mediaKindLabel: 'Gerçek NASA / Arşiv Fotoğrafı',
    nasaSearchQuery: 'Apollo 17 Lunar Roving Vehicle',
    nasaArchiveId: 'as17-147-22526',
    summary:
      'Komutan Eugene Cernan ve jeolog astronot Harrison Schmitt tarafından Taurus–Littrow Vadisi’nde kullanılan; 35.89 km menzil, LM’den 7.6 km uzaklaşma ve 18 km/sa hız rekorlarını elinde tutan son Apollo Ay arabası.',
    missionObjective:
      'Taurus–Littrow Vadisi’ndeki eski dağ masifleri (North & South Massif) ile genç koyu vadi tabanı çökellerini incelemek, sismik ve gravimetrik profil çıkarmak ve Ay’a giden ilk profesyonel jeolog Harrison Schmitt ile kapsamlı saha araştırması yapmak.',
    missionOutcome:
      '35.89 km yol kat ederek tüm Apollo LRV’leri arasında en uzun mesafeyi, Ay Modülü’nden en uzak noktaya (7.6 km) ulaşımı ve en yüksek hızı (18 km/sa) kaydetti. 110.5 kg Ay kayası toplandı ve Shorty Krateri’nde volkanik kökenli "Turuncu Toprak" (Orange Soil) keşfedildi.',
    keyMetrics: [
      {
        label: 'TOPLAM SÜRÜŞ MESAFESİ',
        value: '35.89 km',
        sublabel: 'Apollo programının en uzun yüzey sürüşü (4 sa 26 dk)',
      },
      {
        label: 'AY HIZ REKORU',
        value: '18.0 km/sa',
        sublabel: 'Eugene Cernan tarafından yokuş aşağı kaydedilen hız',
      },
      {
        label: 'LM’DEN MAKS. UZAKLIK',
        value: '7.6 km',
        sublabel: 'EVA-2 · İstasyon 2 (Nansen Krateri / South Massif)',
      },
      {
        label: 'TOPLANAN NUMUNE',
        value: '110.52 kg',
        sublabel: 'Shorty Krateri Turuncu Volkanik Cam Kürecikleri dahil',
      },
    ],
    technicalSpecs: [
      { label: 'Araç Seri Kodu', value: 'LRV-003 (Apollo 17 Challenger Ay Modülü)' },
      { label: 'En Yüksek Kaydedilen Hız', value: '18.0 km/sa (11.2 mph · Resmi Guinness Dünya Dışı Hız Rekoru)' },
      { label: 'Saha Onarımı', value: 'Kırılan sağ arka çamurluğun 4 lamine Ay haritası, koli bandı ve kelepçelerle onarımı' },
      { label: 'Taşınan Bilimsel Yük', value: 'Traverse Gravimeter (TGE), SEP Verici/Alıcı, LSPE Sismik Şarjlar' },
      { label: 'Toplam EVA Süresi', value: '22 saat 04 dakika (3 EVA toplamı)' },
    ],
    scientificInstruments: [
      {
        code: 'TGE',
        name: 'Gezici Gravimetri Deneyi (Traverse Gravimeter Experiment)',
        location: 'LRV Arka Platformu',
        description:
          'Vadi boyunca 12 istasyonda kütleçekim ivmesini ölçerek Taurus–Littrow tabanındaki yüksek yoğunluklu bazalt dolgusunun kalınlığını (~1.4 km) hesapladı.',
      },
      {
        code: 'SEP',
        name: 'Yüzey Elektromanyetik Özellikler Deneyi (Surface Electrical Properties)',
        location: 'LRV Gövde Alıcı Kızağı',
        description:
          'Radyo dalgalarıyla yüzey altı tabakaların dielektrik sabitini ve nem/kayaç süreksizliklerini birkaç yüz metre derinliğe kadar taradı.',
      },
      {
        code: 'LSPE',
        name: 'Ay Sismik Profil Deneyi (Lunar Seismic Profiling Experiment)',
        location: 'LRV İle Yerleştirilen 8 Sismik Paket',
        description:
          'LRV sürüşleri sırasında vadi boyunca bırakılan 8 sismik paket, astronotlar ayrıldıktan sonra uzaktan patlatılarak Ay kabuğunun sismik hız profili çıkarıldı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Shorty Krateri’nde "Turuncu Toprak" (Orange Soil · 74220) Keşfi',
        location: 'EVA-2 · İstasyon 4 (Shorty Krateri)',
        description:
          'Jeolog Harrison Schmitt’in keşfettiği turuncu toprağın, 3.64 milyar yıl önce bir ateş çeşmesi (fire fountain) volkanik püskürmesiyle oluşan mikroskobik titanyum-zengin cam kürecikler olduğu ve içlerinde ilkel su izleri barındırdığı anlaşıldı.',
      },
      {
        title: 'Troktolit 76535 — Ay’ın Eski Manyetik Alanının Kanıtı',
        location: 'EVA-3 · İstasyon 6 (North Massif)',
        description:
          '4.25 milyar yıllık yavaş soğumuş derin kabuk kayası Troktolit 76535, Ay’ın erken döneminde Dünya benzeri bir çekirdek dinamosuna ve küresel manyetik alana sahip olduğunu kanıtladı.',
      },
    ],
    timeline: [
      {
        date: '11 Aralık 1972',
        sol: 'EVA-1 (3.5 km)',
        title: 'ALSEP Kurulumu, Steno Krateri ve Çamurluk Hasarı',
        description: 'Cernan’ın çekicinin sağ arka çamurluğa takılmasıyla kopan parça "horoz kuyruğu" şeklinde yoğun regolit tozu savrulmasına yol açtı.',
      },
      {
        date: '12 Aralık 1972',
        sol: 'EVA-2 (20.4 km)',
        title: 'Haritalı Çamurluk Onarımı, 7.6 km Rekoru ve Turuncu Toprak',
        description: '4 lamine harita ve bantla onarılan LRV ile South Massif’e (7.6 km uzaklık) gidildi; dönüşte Shorty Krateri’nde Turuncu Toprak bulundu.',
      },
      {
        date: '13–14 Aralık 1972',
        sol: 'EVA-3 (12.1 km)',
        title: 'North Massif, Sculptured Hills ve Challenger’ın Kalkışı',
        description: 'Bölünmüş dev Split Rock incelendi ve LRV kamerası insanlığın Ay’dan son ayrılışını canlı görüntüledi.',
      },
    ],
    sourceLabel: 'NASA Apollo 50th Anniversary — Official Mission Photos',
    sourceUrl: 'https://www.nasa.gov/specials/apollo50th/photos.html',
    secondarySourceLabel: 'NASA History — Apollo Lunar Roving Vehicle Documentation (ALSJ)',
    secondarySourceUrl: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
  },
  {
    id: 'lunokhod-2',
    name: 'Lunokhod 2 (Luna 21 · 8E22 #204)',
    code: 'SSCB · LUNOKHOD-2 · 1973',
    agency: 'Lavochkin / VNIItransmash (Sovyetler Birliği)',
    country: 'SSCB',
    missionType: 'Robotik Ay Gezicisi (Rover)',
    eraBadge: '1973 · 39 KM AY MESAFE REKORU',
    launchDate: '8 Ocak 1973 (06:55 UTC · Baykonur)',
    landingDate: '15 Ocak 1973 (23:35 UTC)',
    missionEndDate: '10 Mayıs 1973 (Resmi Duyuru: 3 Haziran 1973)',
    durationLabel: '4 Ay (5 Ay Günü · 39 km Sürüş)',
    landingSite: 'Le Monnier Krateri (Mare Serenitatis Doğu Kıyısı)',
    landingCoordinates: '25.85° K, 30.45° D',
    lat: 25.85,
    lon: 30.45,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#60a5fa',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/lunokhod-2.svg',
    imageAlt: 'Lunokhod 2 uzun menzilli robotik Ay gezicisi ve yükseltilmiş 3. navigasyon kamerası şeması',
    imageCredit:
      'Teknik Görev Rekonstrüksiyon Şeması (Veri Kaynağı: NASA NSSDCA ID 1973-001A & LROC Arşivi) · Canlı NASA Arşiv bağlantısı mevcuttur.',
    mediaKindLabel: 'Teknik Görev & Yüzey Rekonstrüksiyon İllüstrasyonu',
    nasaSearchQuery: 'Lunokhod 2 lunar rover',
    summary:
      'Ay yüzeyinde 39 km (LRO yüksek çözünürlüklü tekerlek izi ölçümlerine göre ~39–42 km) yol kat ederek Ay yüzeyinde en uzun mesafe sürüş rekorunu hâlâ elinde tutan gelişmiş Sovyet robotik gezicisi.',
    missionObjective:
      'Mare Serenitatis’in bazaltik düzlüğü ile Taurus dağlık yaylaları arasındaki geçiş kuşağında (Le Monnier Krateri) jeolojik, manyetik ve fotometrik araştırmalar yapmak; geliştirilmiş üçüncü yüksek kamera ile yüksek hızlı uzun menzilli sürüş gerçekleştirmek.',
    missionOutcome:
      'Sadece 4 ay içinde ~39 km yol kat ederek 2014 yılında Mars’ta Opportunity tarafından geçilene kadar 41 yıl boyunca "Dünya dışı en uzun mesafe kat eden araç" rekorunu korudu (Ay yüzeyinde ise hâlâ 1 numaradır). Mayıs 1973’te açık güneş kapağının gevşek bir krater duvarına sürtünüp tozla kaplanması sonucu aşırı ısınarak görevini tamamladı.',
    keyMetrics: [
      {
        label: 'AY MESAFE REKORU',
        value: '39.0 km',
        sublabel: 'Ay yüzeyinde tüm zamanların en uzun sürüşü',
      },
      {
        label: 'PANORAMİK GÖRÜNTÜ',
        value: '86 Panorama',
        sublabel: '+ 80.000’den fazla TV karesi',
      },
      {
        label: 'YÜKSELTİLMİŞ KAMERA',
        value: '3 TV Kamerası',
        sublabel: 'Operatör görüşünü artıran yüksek kule kamerası',
      },
      {
        label: 'LAZER REFLÖKTÖRÜ',
        value: 'Hâlâ Aktif',
        sublabel: 'Dünya’dan lazer mesafe ölçümlerinde kullanılıyor',
      },
    ],
    technicalSpecs: [
      { label: 'Gezici Kütlesi', value: '840 kg (Lunokhod 1’den 84 kg daha ağır ve gelişmiş)' },
      { label: 'Kamera Sistemi', value: '3 adet yavaş taramalı TV kamerası + 4 adet panoramik telefoto kamera' },
      { label: 'Güneş Paneli İyileştirmesi', value: 'Silisyum yerine daha yüksek verimli Galyum-Arsenit (GaAs) hücreler' },
      { label: 'Yürüyüş Sistemi', value: '8 bağımsız titanyum-çelik tel tekerlek + çift kademeli şanzıman' },
      { label: 'COSPAR / NSSDCA Kodu', value: '1973-001A' },
    ],
    scientificInstruments: [
      {
        code: 'SG-70',
        name: '1.5 m Bom Üzerinde Üç Eksenli Fluxgate Manyetometre',
        location: 'Ön Uzatılabilir Bom',
        description:
          'Rota boyunca bazaltik ovalar ve Fossa Recta tektonik yarığı çevresindeki yerel manyetik alan değişimlerini ölçtü.',
      },
      {
        code: 'AF-3L',
        name: 'AF-3L Görünür ve Morötesi Astrofotometre',
        location: 'Üst Gövde',
        description:
          'Ay gündüzünde ve alacakaranlığında gökyüzü parlaklığını ölçerek ince Ay ekzosferindeki toz saçılımını tespit etti.',
      },
      {
        code: 'RIFMA-M & PROP',
        name: 'Geliştirilmiş RIFMA-M X-Işını Spektrometresi ve PrOP Penetrometre',
        location: 'Ön ve Arka Şasi',
        description:
          'Deniz bazaltından dağlık anortozit geçiş bölgesine doğru demir oranının azalıp alüminyum oranının arttığını yerinde doğruladı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Fossa Recta Tektonik Hendek (Rille) İncelemesi',
        location: 'Güneydoğu Le Monnier Krateri',
        description:
          '300–400 metre genişliğinde ve 6 km uzunluğundaki Fossa Recta tektonik kırık hattı boyunca kayaç blokları ve krater duvar yapısı ayrıntılı olarak haritalandı.',
      },
      {
        title: 'Ay Alacakaranlık Toz Parlamasının (Horizon Glow) Ölçümü',
        location: 'Le Monnier Krateri',
        description:
          'AF-3L astrofotometre verileri, elektrostatik olarak havalanan ince regolit tozlarının güneş batımı sonrasında güneş ışığını saçtığını gösterdi.',
      },
    ],
    timeline: [
      {
        date: '15 Ocak 1973',
        sol: 'Ay Günü 1',
        title: 'Apollo 17’nin 180 km Kuzeyine İniş',
        description: 'Luna 21, Apollo 17 Taurus-Littrow vadisinin sadece 180 km kuzeyindeki Le Monnier Krateri’ne indi.',
      },
      {
        date: 'Şubat–Mart 1973',
        sol: 'Ay Günü 2–3',
        title: 'Tek Bir Ay Gününde 16.5 km Rekor Sürüş',
        description: 'Yükseltilmiş 3. navigasyon kamerası sayesinde tek bir Ay gününde 16.5 km mesafe kat edildi.',
      },
      {
        date: '9–10 Mayıs 1973',
        sol: 'Ay Günü 5',
        title: 'Krater Duvarı Toz Teması ve Aşırı Isınma',
        description: 'Açık güneş kapağının içine dökülen koyu renkli Ay tozu radyatörleri kapatarak iç sıcaklığı yükseltti ve görevi sonlandırdı.',
      },
    ],
    sourceLabel: 'NASA NSSDCA — Luna 21 / Lunokhod 2 (1973-001A)',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-001A',
    secondarySourceLabel: 'NASA Science — Luna 21 / Lunokhod 2',
    secondarySourceUrl: 'https://science.nasa.gov/mission/luna-21/',
  },
  {
    id: 'change-3-yutu',
    name: 'Chang’e 3 ve Yutu (Yeşim Tavşanı)',
    code: 'CNSA · CHANG’E-3 & YUTU · 2013',
    agency: 'CNSA — Çin Ulusal Uzay İdaresi (Çin)',
    country: 'Çin',
    missionType: 'Robotik Ay Gezicisi (Rover)',
    eraBadge: '2013 · MODERN RÖNESANS',
    launchDate: '1 Aralık 2013 (17:30 UTC · Xichang)',
    landingDate: '14 Aralık 2013 (13:11 UTC)',
    missionEndDate: '31 Temmuz 2016 (Yutu Rover · İniş Aracı LUT hâlâ çalışıyor)',
    durationLabel: '31 Ay (972 Gün Aktif Veri · Planlanan: 3 Ay)',
    landingSite: 'Mare Imbrium Kuzeydoğusu (Zi Wei / Guang Han Gong Krateri)',
    landingCoordinates: '44.12° K, 19.51° B (340.49° D)',
    lat: 44.12,
    lon: -19.51,
    hemisphereLabel: 'Yakın Yüz (Near Side)',
    markerColor: '#34d399',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/change-3-yutu.jpg',
    imageAlt: 'Yutu (Yeşim Tavşanı) gezicisinin panoramik kamerasından Mare Imbrium yüzeyindeki Chang’e 3 iniş aracı',
    imageCredit:
      'CNSA / Çin Bilimler Akademisi (CAS) / The Planetary Society — Yutu Gezicisinden Chang’e 3 İniş Aracı (Mare Imbrium, Aralık 2013)',
    mediaKindLabel: 'Gerçek NASA / Arşiv Fotoğrafı',
    nasaSearchQuery: 'Change 3 landing site LRO',
    summary:
      '1976’daki Luna 24’ten 37 yıl sonra Ay yüzeyine yapılan ilk yumuşak iniş ve Çin’in ilk Ay gezicisi. Yere Nüfuz Eden Radar (LPR) ile Ay yüzey altını ilk kez yerinde taramıştır.',
    missionObjective:
      'Çin Ay Keşif Programı’nın (CLEP) 2. aşaması kapsamında lazer/mikrodalga engelden kaçınma destekli otonom yumuşak iniş gerçekleştirmek, 6 tekerlekli Yutu gezicisiyle yüzey altı stratigrafisini radar ile haritalamak ve Ay yüzeyinden morötesi astronomik gözlem yapmak.',
    missionOutcome:
      'Yutu gezicisi 2. Ay gününde hareket mekanizmasında yaşanan bir arıza nedeniyle 114.8 m yürüdükten sonra sabit kalsa da, üzerindeki tüm bilimsel cihazlar 31 ay (972 gün) boyunca veri üretmeye devam etti ve daha önce bilinmeyen yeni bir titanyumca zengin bazalt türü keşfetti.',
    keyMetrics: [
      {
        label: 'GEZİCİ / İNİŞ KÜTLESİ',
        value: '140 kg / 1.200 kg',
        sublabel: '6 tekerlekli Rocker-Bogie şasi',
      },
      {
        label: 'YÜZEY ALTI RADAR (LPR)',
        value: '400 m Derinlik',
        sublabel: '9 ayrı yüzey altı volkanik katman tespiti',
      },
      {
        label: 'OPERASYON SÜRESİ',
        value: '972 Gün',
        sublabel: 'Planlanan 90 günlük ömrün 10 katından fazla',
      },
      {
        label: 'YENİ KAYAÇ KEŞFİ',
        value: 'Orta-Ti Bazalt',
        sublabel: 'Apollo ve Luna örneklerinde bulunmayan yeni bazalt',
      },
    ],
    technicalSpecs: [
      { label: 'Fırlatma Aracı', value: 'Long March 3B (CZ-3B) Roketi' },
      { label: 'Yutu Boyutları', value: 'Uzunluk: 1.5 m · Genişlik: 1.0 m · Yükseklik: 1.1 m' },
      { label: 'Yürüyüş Sistemi', value: '6 Tekerlekli Rocker-Bogie (4 köşe tekerlekten bağımsız yönlendirme)' },
      { label: 'Güç ve Isı Sistemi', value: '2 Katlanır Güneş Paneli + Plütonyum-238 RHU (Radyoizotop Isıtıcı)' },
      { label: 'İniş Aracı Özelliği', value: '7.500 N değişken itkili motor + 3D Lazer Tehlike Tespit Sistemi' },
      { label: 'COSPAR / NSSDCA Kodu', value: '2013-070A' },
    ],
    scientificInstruments: [
      {
        code: 'LPR',
        name: 'Ay Yere Nüfuz Eden Radarı (Lunar Penetrating Radar · 60 MHz & 500 MHz)',
        location: 'Yutu Alt Gövdesi',
        description:
          'Ay yüzeyinde ilk kez kullanılan yer radarı; yüksek frekansta ilk 30 metrelik regoliti, düşük frekansta 400 metre derinliğe kadar bazalt tabakalarını görüntüledi.',
      },
      {
        code: 'APXS & VNIS',
        name: 'Alfa Parçacık X-Işını Spektrometresi ve Görünür/Yakın Kızılötesi Görüntüleme Spektrometresi',
        location: 'Yutu Robotik Kolu ve Ön Gövde',
        description:
          'Zi Wei krateri çevresindeki genç Mare Imbrium bazaltlarının mineralojik ve elementel analizini gerçekleştirdi.',
      },
      {
        code: 'LUT',
        name: 'Ay Tabanlı Morötesi Teleskop (Lunar-based Ultraviolet Telescope · 150 mm)',
        location: 'Chang’e 3 İniş Platformu',
        description:
          'Ay yüzeyine kurulan ilk uzun ömürlü robotik astronomik gözlemevi; değişken yıldızları ve aktif galaksi çekirdeklerini yıllarca gözlemledi.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Yeni Bir Ay Bazalt Türünün (Orta-Titanyumlu Olivinli Bazalt) Keşfi',
        location: 'Zi Wei Krateri (Guang Han Gong)',
        description:
          'APXS ve VNIS verileri, ~2.96 milyar yıllık genç lav akıntılarının ne Apollo ne de Sovyet Luna örneklerinde görülen orta-titanyum ve yüksek demir/olivin oranına sahip olduğunu kanıtladı.',
      },
      {
        title: 'Yüzey Altında 9 Farklı Jeolojik Katmanın Radar Tespiti',
        location: 'Mare Imbrium Kuzeydoğusu',
        description:
          'LPR radarı, son 3.3 milyar yıl içinde gerçekleşen en az 3 ayrı volkanik lav taşkını dönemine ait 9 yüzey altı katmanı ortaya çıkardı.',
      },
    ],
    timeline: [
      {
        date: '14 Aralık 2013',
        sol: 'Ay Günü 1',
        title: 'Mare Imbrium’a Yumuşak İniş ve Yutu’nun Yüzeye İnişi',
        description: 'İnişten 7 saat sonra Yutu rampadan inerek Chang’e 3 ile karşılıklı fotoğraflar çekti.',
      },
      {
        date: 'Ocak 2014',
        sol: 'Ay Günü 2',
        title: '114.8 Metre Sürüş ve Sabit Bilim İstasyonu Modu',
        description: 'Hareket kontrol devresindeki arıza sonrası Yutu sabit gözlem moduna geçerek APXS ve spektral ölçümlerine devam etti.',
      },
      {
        date: '31 Temmuz 2016',
        sol: 'Ay Günü 33',
        title: 'Yutu’nun 972 Gün Sonra Görevini Tamamlaması',
        description: 'Yutu tüm zamanların en uzun süre çalışan Ay yüzey gezicisi rekorunu kırarak (sonradan Yutu-2 tarafından geçildi) kapandı.',
      },
    ],
    sourceLabel: 'The Planetary Society — Chang’e 3 & Yutu Surface Image Archive',
    sourceUrl: 'https://www.planetary.org/space-images/yutu-self-portrait',
    secondarySourceLabel: 'NASA NSSDCA — Chang’e 3 & Yutu Rover (2013-070A)',
    secondarySourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2013-070A',
  },
  {
    id: 'change-4-yutu-2',
    name: 'Chang’e 4 ve Yutu-2',
    code: 'CNSA · CHANG’E-4 & YUTU-2 · 2019',
    agency: 'CNSA — Çin Ulusal Uzay İdaresi (Çin)',
    country: 'Çin',
    missionType: 'Robotik Ay Gezicisi (Rover)',
    eraBadge: '2019–GÜNÜMÜZ · UZAK YÜZDE İLK KEŞİF',
    launchDate: '7 Aralık 2018 (18:23 UTC · Xichang)',
    landingDate: '3 Ocak 2019 (02:26 UTC)',
    missionEndDate: 'Aktif Görev (70+ Ay Günü · 1.600+ m Sürüş)',
    durationLabel: '6+ Yıl Aktif (Ay Yüzeyinde En Uzun Süre Çalışan Gezici)',
    landingSite: 'Von Kármán Krateri · Güney Kutbu–Aitken (SPA) Havzası (Ay’ın Uzak Yüzü)',
    landingCoordinates: '45.46° G, 177.60° D',
    lat: -45.46,
    lon: 177.6,
    hemisphereLabel: 'Uzak Yüz (Far Side)',
    markerColor: '#10b981',
    statusLabel: 'AKTİF / UZATILMIŞ GÖREV',
    image: '/assets/images/lunar/change-4-yutu-2.jpg',
    imageAlt: 'Ay’ın uzak yüzündeki Von Kármán Krateri’nde Yutu-2 gezicisi tarafından görüntülenen Chang’e 4 iniş aracı ve DLR LND deneyi',
    imageCredit:
      'CNSA / CLEP / DLR (Alman Havacılık ve Uzay Merkezi) — Yutu-2 Gezicisinden Chang’e 4 İniş Aracı ve LND Deneyi Görüntüsü (Von Kármán Krateri)',
    mediaKindLabel: 'Gerçek NASA / Arşiv Fotoğrafı',
    nasaSearchQuery: 'Change 4 landing site LRO',
    summary:
      'İnsanlık tarihinde Ay’ın Dünya’dan hiç görünmeyen uzak tarafına (Far Side) yumuşak iniş yapan ilk uzay aracı ve Yutu-2 gezicisi. Queqiao röle uydusu aracılığıyla iletişim kurarak Güney Kutbu–Aitken Havzası’nı incelemektedir.',
    missionObjective:
      'Dünya-Ay L2 Lagrange noktasındaki Queqiao röle uydusu üzerinden iletişim kurarak Ay’ın uzak yüzündeki dev Güney Kutbu–Aitken (SPA) çarpışma havzasında yer alan Von Kármán Krateri’ne inmek; derin Ay kabuğu ve üst manto minerallerini yerinde analiz etmek.',
    missionOutcome:
      'Tam başarı ve devam eden aktif görev. Yutu-2, 2019’dan bu yana 70’ten fazla dondurucu Ay gecesini atlatarak 1.6 km’nin üzerinde yol kat etmiş ve Ay yüzeyinde tüm zamanların en uzun süre çalışan gezicisi unvanını kazanmıştır.',
    keyMetrics: [
      {
        label: 'TARİHİ İLK',
        value: 'Uzak Yüz İnişi',
        sublabel: 'Ay’ın görünmeyen yarımküresine ilk yumuşak iniş',
      },
      {
        label: 'AKTİF GÖREV SÜRESİ',
        value: '70+ Ay Günü',
        sublabel: '2019’dan beri 6 yılı aşkın kesintisiz görev',
      },
      {
        label: 'RÖLE İLETİŞİMİ',
        value: 'Queqiao (L2)',
        sublabel: 'Dünya-Ay L2 halo yörüngesi üzerinden X-bant röle',
      },
      {
        label: 'RADAR PENETRASYONU',
        value: '40 m İnce Regolit',
        sublabel: '500 MHz LPR ile çok katmanlı ejekta haritası',
      },
    ],
    technicalSpecs: [
      { label: 'Yutu-2 Gezici Kütlesi', value: '135 kg (Tarihin en hafif Ay gezicilerinden biri)' },
      { label: 'İletişim Mimarisi', value: 'Queqiao ve Queqiao-2 Röle Uyduları (L2 / Eliptik Donuk Yörünge)' },
      { label: 'Uluslararası Yükler', value: 'Almanya (LND), İsveç (ASAN), Hollanda (NCLE)' },
      { label: 'Tekerlek İyileştirmesi', value: 'Yutu-1’deki kablo aşınmasını önleyen güçlendirilmiş iç kablo kanalları' },
      { label: 'COSPAR / NSSDCA Kodu', value: '2018-103A' },
    ],
    scientificInstruments: [
      {
        code: 'VNIS',
        name: 'Görünür ve Yakın Kızılötesi Görüntüleme Spektrometresi (450–2400 nm)',
        location: 'Yutu-2 Ön Alt Gövde',
        description:
          'SPA havzasındaki kayaç ve regolitin yansıma spektrumlarını ölçerek düşük kalsiyumlu piroksen ve olivin varlığını tespit etti.',
      },
      {
        code: 'LND & ASAN',
        name: 'Ay Nötron/Radyasyon Dozimetresi (Almanya) ve İleri Küçük Analizör (İsveç)',
        location: 'Chang’e 4 İniş Aracı ve Yutu-2 Gezicisi',
        description:
          'Astronot güvenliği için Ay yüzeyindeki tam radyasyon eşdeğer dozunu (1.369 µSv/gün) ilk kez doğrudan ölçtü ve Güneş rüzgarı-regolit etkileşimini inceledi.',
      },
      {
        code: 'LPR',
        name: 'Çift Kanallı Ay Yere Nüfuz Eden Radarı (60 MHz & 500 MHz)',
        location: 'Yutu-2 Şasi Altı',
        description:
          'Von Kármán Krateri’nin ilk 40 metresinde ince taneli regolit ve çarpışma ejekta katmanlarını yüksek çözünürlükle haritaladı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Ay’ın Derin Kabuk / Üst Manto Kökenli Minerallerinin Tespiti',
        location: 'Von Kármán Krateri (SPA Havzası)',
        description:
          'VNIS spektrometresi, Finsen Krateri çarpışmasının yüzeye fırlattığı malzemede düşük kalsiyumlu piroksen ve olivin tespit ederek derin kabuk/üst manto bileşimine dair ilk yerinde kanıtı sundu.',
      },
      {
        title: 'Ay Yüzeyindeki Radyasyon Dozunun İlk Tam Ölçümü',
        location: 'Statio Tianhe',
        description:
          'Alman LND dedektörü, Ay yüzeyindeki radyasyon seviyesinin Uluslararası Uzay İstasyonu’ndan (ISS) yaklaşık 2.6 kat, Dünya yüzeyinden ise ~200 kat daha yüksek olduğunu ortaya koydu.',
      },
    ],
    timeline: [
      {
        date: '3 Ocak 2019',
        sol: 'Ay Günü 1',
        title: 'Von Kármán Krateri’ne (Statio Tianhe) Tarihi İniş',
        description: 'Chang’e 4, Ay’ın uzak tarafına yumuşak iniş yapan ilk araç oldu; 12 saat sonra Yutu-2 yüzeye indi.',
      },
      {
        date: 'Mayıs–Ağustos 2019',
        sol: 'Ay Günü 5–8',
        title: 'Derin Manto Mineralleri ve Camlaşmış Çarpışma Ergiyiği Keşfi',
        description: 'Küçük bir krater içinde "jel benzeri" parlak koyu yeşil darbe ergiyiği (impact melt breccia) keşfedildi.',
      },
      {
        date: '2020–2026',
        sol: 'Ay Günü 15–70+',
        title: '1.6 Kilometreyi Aşan Uzatılmış Keşif Görevi',
        description: 'Yutu-2, kuzeybatı yönünde ilerleyerek yarı saydam cam kürecikler keşfetmeye ve veri göndermeye devam etmektedir.',
      },
    ],
    sourceLabel: 'DLR — Chang’e-4 Lunar Lander Imaged by the Yutu-2 Rover',
    sourceUrl: 'https://www.dlr.de/en/images/2020/3/chang-e-4-lunar-lander-imaged-by-the-yutu-2-rover/',
    secondarySourceLabel: 'NASA NSSDCA — Chang’e 4 & Yutu-2 (2018-103A)',
    secondarySourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-103A',
  },
  {
    id: 'chandrayaan-3-pragyan',
    name: 'Chandrayaan-3 (Vikram & Pragyan)',
    code: 'ISRO · CHANDRAYAAN-3 · 2023',
    agency: 'ISRO — Hindistan Uzay Araştırma Organizasyonu (Hindistan)',
    country: 'Hindistan',
    missionType: 'Robotik Ay Gezicisi (Rover)',
    eraBadge: '2023 · GÜNEY KUTBU KEŞFİ',
    launchDate: '14 Temmuz 2023 (09:05 UTC · Satish Dhawan Uzay Merkezi)',
    landingDate: '23 Ağustos 2023 (12:32 UTC)',
    missionEndDate: '3 Eylül 2023 (Ay Gecesi Uyku Modu)',
    durationLabel: '1 Tam Ay Günü (12 Dünya Günü Aktif Yüzey Operasyonu)',
    landingSite: 'Statio Shiv Shakti (Manzinus U ve Boguslawsky M Kraterleri Arası · Güney Kutbu Bölgesi)',
    landingCoordinates: '69.37° G, 32.32° D',
    lat: -69.37,
    lon: 32.32,
    hemisphereLabel: 'Güney Kutbu Bölgesi',
    markerColor: '#a78bfa',
    statusLabel: 'TARİHİ GÖREV TAMAMLANDI',
    image: '/assets/images/lunar/chandrayaan-3-pragyan.jpg',
    imageAlt: 'Chandrayaan-3 Pragyan gezicisinin NavCam kamerasından Ay Güney Kutbu Statio Shiv Shakti’deki Vikram iniş aracı',
    imageCredit:
      'ISRO (Hindistan Uzay Araştırma Organizasyonu) — Pragyan Gezicisi NavCam Kamerasından Vikram İniş Aracı (Statio Shiv Shakti, 30 Ağustos 2023)',
    mediaKindLabel: 'Gerçek NASA / Arşiv Fotoğrafı',
    nasaSearchQuery: 'Chandrayaan 3 landing site LRO',
    summary:
      'Ay’ın zorlu Güney Kutbu bölgesine (69.37° G enlemine) başarılı yumuşak iniş yapan ilk uzay görevi. Hindistan’ı Ay’a yumuşak iniş yapan 4. ülke konumuna taşımış ve yüksek enlem regolitinde kükürt varlığını yerinde doğrulamıştır.',
    missionObjective:
      'Ay’ın güney kutbu yakınlarındaki engebeli yayla arazisine güvenli ve yumuşak iniş gerçekleştirmek, 6 tekerlekli Pragyan gezicisiyle yüksek enlem regolitinin kimyasal bileşimini analiz etmek ve kutup bölgesi yüzey altı sıcaklık gradyanını yerinde ölçmek.',
    missionOutcome:
      'Tam başarı. Vikram iniş aracı ve 26 kg’lık Pragyan gezicisi tüm birincil hedeflerini tamamladı. Pragyan 101.4 metre sürüş yaptı ve kükürt (S) dahil birçok elementi doğrudan tespit etti; Vikram ise görev sonunda motorlarını yeniden ateşleyerek Ay yüzeyinde 40 cm yükselip 30–40 cm öteye ikinci kez inen "Hop Experiment" (Sıçrama Deneyi) başarısına imza attı.',
    keyMetrics: [
      {
        label: 'İNİŞ ENLEMİ REKORU',
        value: '69.37° Güney',
        sublabel: 'Güney kutup bölgesine yapılan ilk yumuşak iniş',
      },
      {
        label: 'PRAGYAN SÜRÜŞÜ',
        value: '101.4 Metre',
        sublabel: '26 kg kütle · 6 tekerlekli Rocker-Bogie',
      },
      {
        label: 'TERMAL GRADYAN',
        value: '+50°C → -10°C',
        sublabel: 'Yüzeyden sadece 8 cm derinde 60°C sıcaklık farkı',
      },
      {
        label: 'SIÇRAMA DENEYİ',
        value: '40 cm Hop',
        sublabel: 'Vikram motorlarını yeniden ateşleyerek ikinci kez indi',
      },
    ],
    technicalSpecs: [
      { label: 'Fırlatma Aracı', value: 'LVM3-M4 (Launch Vehicle Mark-3) Ağır Kaldırma Roketi' },
      { label: 'Vikram İniş Kütlesi', value: '1.749.86 kg (Pragyan dahil)' },
      { label: 'Pragyan Gezici Kütlesi & Güç', value: '26 kg · 50 W dikey açılır güneş paneli' },
      { label: 'Pragyan Boyutları', value: '91.7 cm × 75.0 cm × 39.7 cm (6 tekerlekli)' },
      { label: 'NASA Katkısı', value: 'Vikram üzerinde NASA LRA (Lazer Retroreflektör Dizisi) pasif hedefi' },
      { label: 'COSPAR / NSSDCA Kodu', value: '2023-098A' },
    ],
    scientificInstruments: [
      {
        code: 'LIBS & APXS',
        name: 'Lazer İndüklü Bozunum Spektroskopisi ve Alfa Parçacık X-Işını Spektrometresi',
        location: 'Pragyan Gezicisi Alt ve Ön Gövde',
        description:
          'Yüksek enerjili lazer darbeleriyle regoliti plazmaya dönüştürerek kükürt (S), alüminyum (Al), kalsiyum (Ca), demir (Fe), krom (Cr) ve titanyumu (Ti) yerinde tespit etti.',
      },
      {
        code: 'ChaSTE',
        name: 'Chandra Yüzey Termofiziksel Deneyi (10 Sensörlü Termal Sonda)',
        location: 'Vikram İniş Aracı',
        description:
          'Toprağın 10 cm derinliğine nüfuz ederek güney kutup bölgesi regolitinin üstün ısı yalıtım özelliğini ilk kez yerinde ölçtü.',
      },
      {
        code: 'ILSA & RAMBHA-LP',
        name: 'Ay Sismik Aktivite Cihazı (ILSA) ve Langmuir Plazma Sondası',
        location: 'Vikram İniş Aracı',
        description:
          'Pragyan’ın tekerlek titreşimlerini ve olası bir doğal Ay depremini kaydetti; yüzeye yakın iyonosferik plazma yoğunluğunu ölçtü.',
      },
      {
        code: 'NASA-LRA',
        name: 'NASA Lazer Retroreflektör Dizisi (Laser Retroreflector Array)',
        location: 'Vikram Üst Güverte',
        description:
          'NASA LRO yörünge aracından gönderilen lazer darbelerini yansıtarak güney kutbundaki sabit jeodezik referans noktası oldu.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Güney Kutbu Bölgesi Regolitinde Kükürt (S) Varlığının İlk Yerinde Kanıtı',
        location: 'Statio Shiv Shakti (69.37° G)',
        description:
          'Pragyan üzerindeki LIBS ve APXS cihazları, yörünge araçlarından kesin olarak tespit edilemeyen kükürt elementini yüksek enlem regolitinde doğrudan doğruladı.',
      },
      {
        title: 'Yüzey Altı Keskin Sıcaklık Düşüşünün (Termal Yalıtım) Ölçülmesi',
        location: 'Vikram ChaSTE Deney Noktası',
        description:
          'Yüzey sıcaklığı +50°C iken sadece 8 cm derinlikte sıcaklığın -10°C’ye düştüğünü göstererek Ay regolitinin su buzunu koruyabilecek ne kadar güçlü bir termal yalıtkan olduğunu kanıtladı.',
      },
    ],
    timeline: [
      {
        date: '23 Ağustos 2023',
        sol: 'Ay Günü 1',
        title: 'Statio Shiv Shakti’ye Yumuşak İniş ve Pragyan’ın Çıkışı',
        description: 'Vikram, 69.37° G enlemine başarıyla indi; birkaç saat sonra Pragyan rampadan Ay toprağına indi.',
      },
      {
        date: '27–30 Ağustos 2023',
        sol: 'Yüzey Günü 5–8',
        title: 'ChaSTE Sıcaklık Profili ve LIBS Kükürt Keşfi',
        description: 'Pragyan 4 metre çaplı bir kraterden otonom olarak kaçındı ve LIBS ile kükürt spektrumunu doğruladı.',
      },
      {
        date: '3 Eylül 2023',
        sol: 'Yüzey Günü 12',
        title: 'Vikram Sıçrama Deneyi (Hop Experiment) ve Uyku Modu',
        description: 'Vikram motorlarını ateşleyip 40 cm yükselerek yeniden indi; ardından her iki araç Ay gecesi için uyku moduna alındı.',
      },
    ],
    sourceLabel: 'ISRO — Official Chandrayaan-3 Mission Details & Surface Imagery',
    sourceUrl: 'https://www.isro.gov.in/ISRO_EN/Chandrayaan3_Details.html',
    secondarySourceLabel: 'NASA NSSDCA — Chandrayaan-3 Mission (2023-098A)',
    secondarySourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2023-098A',
  },
];
