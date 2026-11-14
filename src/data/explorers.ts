import type { LunarMissionPreviewItem, MarsRoverItem } from '@/types';

/**
 * Mars Exploration Rover & Mars Science Laboratory / Mars 2020 mission data.
 * Uses local public-domain NASA / JPL-Caltech visuals stored in /assets/images/rovers/.
 */
export const MARS_ROVERS: readonly MarsRoverItem[] = [
  {
    id: 'spirit',
    name: 'Spirit (MER-A)',
    code: 'MER-A · Gusev Krateri',
    landingYear: '2004 – 2010',
    landingSite: 'Gusev Krateri & Columbia Tepeleri',
    landingCoordinates: '14.57°G, 175.47°D (Columbia Memorial Station)',
    launchDate: '10 Haziran 2003 (Cape Canaveral, Delta II 7925)',
    landingDate: '4 Ocak 2004, 04:35 UTC',
    missionEndDate: '22 Mart 2010 (Sol 2210 son iletişim) / 25 Mayıs 2011 resmi görev sonu',
    plannedDuration: '90 Sol (~92,5 Dünya günü)',
    actualDuration: '2.208 Sol (6 yıl, 77 gün — planlananın 24 katı)',
    statusLabel: 'GÖREV TAMAMLANDI',
    image: '/assets/images/rovers/spirit.jpg',
    imageAlt: 'Mars yüzeyinde görev yapan Spirit (MER-A) keşif aracı konsept görseli',
    imageCredit: 'Görsel: NASA / JPL / Cornell University, Maas Digital LLC (PIA04413)',
    summary:
      '90 Mars günü için tasarlanmasına rağmen 6 yılı aşkın süre görev yaptı. Gusev Krateri ve Columbia Tepeleri’nde geçmişte sıcak su faaliyetlerine işaret eden silika yataklarını ortaya çıkardı.',
    missionObjective:
      'Eskiden büyük bir krater gölü olduğu düşünülen 166 km çapındaki Gusev Krateri’nde suyla etkileşime girmiş kayaçları ve toprakları incelemek, Mars’ın erken dönem iklim koşullarını karakterize etmek ve geçmişte yaşamı destekleyebilecek hidrotermal veya sulu ortam izlerini aramak.',
    finalLegacy:
      'Gusev düzlüklerindeki bazaltik lav örtüsünü aşıp Columbia Tepeleri’ne tırmanan ilk keşif aracı oldu. 2009 yılında "Troy" adı verilen gevşek sülfat kumuluna saplandıktan sonra sabit bir bilim istasyonu olarak çalışmaya devam etti ve Home Plate platosunda keşfettiği %90 saflıktaki opalin silika ile Mars’ta antik sıcak su kaynaklarının (fumarol/gayzer) en güçlü kanıtlarından birini sundu.',
    keyMetrics: [
      {
        label: 'KAT EDİLEN MESAFE',
        value: '7,73 km',
        sublabel: 'Planlanan 600 m hedefinin 12 katı',
      },
      {
        label: 'AKTİF GÖREV SÜRESİ',
        value: '2.208 Sol',
        sublabel: '6 Yıl, 2 Ay, 18 Gün',
      },
      {
        label: 'GÖNDERİLEN GÖRÜNTÜ',
        value: '124.800+',
        sublabel: 'Pancam, Navcam ve MI verisi',
      },
      {
        label: 'GÜÇ KAYNAĞI',
        value: 'Güneş Paneli',
        sublabel: 'Üç eklemli GaInP/GaAs/Ge paneller',
      },
    ],
    technicalSpecs: [
      { label: 'Kütle', value: '185 kg (yüzey gezici kütlesi)' },
      { label: 'Boyutlar', value: '1,5 m yükseklik × 2,3 m genişlik × 1,6 m uzunluk' },
      { label: 'Güç Sistemi', value: 'Güneş panelleri (~140 W tepe) + 2× Li-ion şarjlı batarya' },
      { label: 'Yürüyüş Sistemi', value: '6 tekerlekli Rocker-Bogie süspansiyon (25 cm çaplı alüminyum tekerlekler)' },
      { label: 'Azami Hız', value: '5 cm/sn (ortalama otonom sürüş hızı ~1 cm/sn)' },
      { label: 'Yerleşik Bilgisayar', value: 'BAE RAD6000 (20 MHz, radyasyona dayanıklı) · 128 MB RAM · 256 MB Flash' },
      { label: 'İletişim', value: 'X-Band doğrudan Dünya hattı ve UHF yörünge aktarma (Mars Odyssey / MRO)' },
      { label: 'Çalışma Sıcaklığı', value: '-105 °C ile +20 °C arası (8 adet RHU radyoizotop ısıtıcı destekli)' },
    ],
    scientificInstruments: [
      {
        code: 'PANCAM',
        name: 'Panoramic Camera',
        location: 'Kamera Direği (PMA - 1,5 m yükseklik)',
        description:
          'İki adet 1024×1024 CCD sensör ve 16 spektral filtre ile Gusev Krateri’nin yüksek çözünürlüklü renkli panoramalarını ve mineralojik yansıma verilerini kaydetti.',
      },
      {
        code: 'MINI-TES',
        name: 'Miniature Thermal Emission Spectrometer',
        location: 'Kamera Direği İç Gövdesi',
        description:
          'Termal kızılötesi dalga boylarında (5–29 µm) kayaların mineral bileşimini uzaktan teşhis etti ve atmosferik toz şeytanlarının (dust devil) sıcaklık profillerini ölçtü.',
      },
      {
        code: 'MB',
        name: 'Mössbauer Spectrometer (MIMOS II)',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          'Demir içeren minerallerin oksidasyon durumunu belirleyerek Columbia Tepeleri’ndeki götit (goethite) ve manyetit minerallerini tespit etti.',
      },
      {
        code: 'APXS',
        name: 'Alpha Particle X-Ray Spectrometer',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          'Kaya ve toprak hedeflerini alfa parçacıkları ve X-ışınları ile uyararak sodyumdan çinkoya kadar ana element bolluklarını hassas biçimde ölçtü.',
      },
      {
        code: 'MI',
        name: 'Microscopic Imager',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          '30 mikrometre/piksel çözünürlükle kaya dokularını, volkanik vezikülleri ve ince sülfat tuzlarını jeolog el büyüteci düzeyinde görüntüledi.',
      },
      {
        code: 'RAT',
        name: 'Rock Abrasion Tool',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          'Elmas tozlu döner uçlarıyla 15’ten fazla Mars kayasının aşınmış dış kabuğunu 45 mm çapında zımparalayarak bozulmamış iç yüzeyi analiz için açığa çıkardı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Home Plate Opalin Silika Yatakları',
        location: 'Home Plate Platosu · Sol 1148',
        description:
          'Arızalanan sağ ön tekerleğin toprağı kazımasıyla ortaya çıkan %90 saflıktaki amorf opalin silika, geçmişte volkanik fumarollerin veya sıcak su kaynaklarının varlığını kanıtladı.',
      },
      {
        title: 'Humphrey Kayası ve Götit (Goethite) Keşfi',
        location: 'Adirondack & Clovis Kayası · Columbia Tepeleri',
        description:
          'Yalnızca suyun varlığında oluşabilen demir-oksit-hidroksit minerali götit (α-FeOOH) tespit edilerek Gusev Krateri kayaçlarının geçmişte sıvı suyla değişime uğradığı doğrulandı.',
      },
      {
        title: 'Comanche Çıkıntısında Magnezyum-Demir Karbonatlar',
        location: 'Columbia Tepeleri · Comanche Outcrop',
        description:
          '%16–34 oranında zengin karbonat mineralleri keşfedilerek erken Mars’ta asidik olmayan, nötr pH değerine yakın sulu hidrotermal koşulların varlığı gösterildi.',
      },
      {
        title: 'Aktif Toz Şeytanları (Dust Devils) ve Rüzgâr Temizliği',
        location: 'Gusev Düzlükleri & Husband Tepesi',
        description:
          'Mars yüzeyindeki toz hortumları ilk kez hareketli görüntülerle belgelendi; bu rüzgârların güneş panellerini temizleyerek görev ömrünü yıllarca uzattığı keşfedildi.',
      },
    ],
    timeline: [
      {
        date: '10 Haziran 2003',
        sol: 'Fırlatma',
        title: 'Dünya’dan Ayrılış',
        description: 'Cape Canaveral SLC-17A rampasından Delta II roketiyle Mars yolculuğuna başladı.',
      },
      {
        date: '4 Ocak 2004',
        sol: 'Sol 1',
        title: 'Gusev Krateri’ne Başarılı İniş',
        description: 'Paraşüt, geri tepmeli roketler ve hava yastıklarıyla Gusev Krateri tabanına indi.',
      },
      {
        date: 'Mart 2004',
        sol: 'Sol 65',
        title: 'Bonneville Krateri ve Columbia Tepeleri Yürüyüşü',
        description: 'Bonneville Krateri’ni inceledikten sonra 2,6 km uzaktaki Columbia Tepeleri’ne yöneldi.',
      },
      {
        date: 'Ağustos 2005',
        sol: 'Sol 581',
        title: 'Husband Tepesi Zirvesine Tırmanış',
        description: 'Çevredeki düzlüklere göre 82 metre yükseklikteki Husband Tepesi zirvesine ulaşan ilk gezici oldu.',
      },
      {
        date: 'Şubat 2006',
        sol: 'Sol 744',
        title: 'Home Plate Platosuna Varış',
        description: 'Katmanlı volkaniklastik bir yapı olan Home Plate’e ulaşarak hidrotermal izleri incelemeye başladı.',
      },
      {
        date: 'Mayıs 2007',
        sol: 'Sol 1198',
        title: 'Saf Silika Keşfi (Gertrude Weise Toprağı)',
        description: 'Sürüklenen tekerleğin açtığı hendekte antik sıcak su kaynaklarına işaret eden parlak silika bulundu.',
      },
      {
        date: 'Mayıs 2009',
        sol: 'Sol 1892',
        title: 'Troy Kumuluna Saplanma ve Sabit İstasyon Dönemi',
        description: 'Yumuşak ferrik sülfat kumuna saplandı; sabit platform olarak atmosfer ve çekirdek ölçümleri yaptı.',
      },
      {
        date: '22 Mart 2010',
        sol: 'Sol 2210',
        title: 'Son Sinyal',
        description: 'Şiddetli Mars kışında güneş enerjisinin düşmesiyle son kez Dünya ile iletişim kurdu.',
      },
    ],
  },
  {
    id: 'opportunity',
    name: 'Opportunity (MER-B)',
    code: 'MER-B · Meridiani Planum',
    landingYear: '2004 – 2018',
    landingSite: 'Meridiani Planum → Endeavour Krateri',
    landingCoordinates: '1.95°G, 354.47°D (Challenger Memorial Station)',
    launchDate: '7 Temmuz 2003 (Cape Canaveral SLC-17B, Delta II 7925H)',
    landingDate: '25 Ocak 2004, 05:05 UTC',
    missionEndDate: '10 Haziran 2018 (Sol 5111 son iletişim) / 13 Şubat 2019 resmi görev sonu',
    plannedDuration: '90 Sol (~92,5 Dünya günü) · 1 km hedef menzil',
    actualDuration: '5.111 Sol (14 yıl, 294 gün — planlananın 57 katı)',
    statusLabel: 'GÖREV TAMAMLANDI',
    image: '/assets/images/rovers/opportunity.jpg',
    imageAlt: 'Opportunity (MER-B) keşif aracının Mars yüzeyinde Pancam ile çekilen otoportresi',
    imageCredit: 'Fotoğraf: NASA / JPL-Caltech / Cornell / ASU (PIA17759)',
    summary:
      'Meridiani Planum’dan Endeavour Krateri’ne uzanan yaklaşık 15 yıllık yolculuğunda 45 kilometreden fazla mesafe katetti ve hematit kürecikleriyle antik sıvı su kanıtlarını doğruladı.',
    missionObjective:
      'Yörüngedeki Mars Global Surveyor (TES) cihazının tespit ettiği geniş kristal hematit (α-Fe₂O₃) yataklarının kökenini yerinde araştırmak; Meridiani Planum’daki tortul kayaç katmanlarını çözümleyerek Mars’ta geçmişte sıvı suyun ne kadar süreyle, hangi kimyasal koşullarda (pH, tuzluluk, oksidasyon) bulunduğunu ve antik ortamın mikrobiyal yaşama elverişliliğini belirlemek.',
    finalLegacy:
      'Gezegenler arası keşif tarihinin en dayanıklı ve üretken robotik elçisi oldu. 90 günlük bir görev için tasarlanmasına karşın yaklaşık 15 yıl boyunca Eagle, Endurance, Erebus, Victoria, Santa Maria ve 22 km çapındaki Endeavour kraterlerini inceledi. 45,16 km ile Dünya dışında en uzun mesafe kateden tekerlekli araç rekorunu kırdı ve Mars’ın hem asidik sülfatlı sulara hem de yaşam dostu nötr pH’lı kil ortamlarına sahip olduğunu kanıtladı. Haziran 2018’de tüm gezegeni saran tarihi toz fırtınasında Perseverance Vadisi’nde sessizliğe büründü.',
    keyMetrics: [
      {
        label: 'TOPLAM MESAFE REKORU',
        value: '45,16 km',
        sublabel: 'Dünya dışı maraton rekoru (28,06 mil)',
      },
      {
        label: 'AKTİF GÖREV SÜRESİ',
        value: '5.111 Sol',
        sublabel: '14 Yıl, 9 Ay, 19 Gün (Planlananın 57 katı)',
      },
      {
        label: 'GÖNDERİLEN GÖRÜNTÜ',
        value: '217.594',
        sublabel: 'Pancam, Navcam, Hazcam ve MI arşivi',
      },
      {
        label: 'İNCELENEN KRATERLER',
        value: '100+ Krater',
        sublabel: 'Eagle, Endurance, Victoria, Endeavour dâhil',
      },
    ],
    technicalSpecs: [
      { label: 'Kütle', value: '185 kg (yüzey gezicisi) · Toplam fırlatma kütlesi 1.063 kg' },
      { label: 'Boyutlar', value: '1,5 m yükseklik × 2,3 m genişlik × 1,6 m uzunluk' },
      { label: 'Güç Sistemi', value: '1,3 m² üç eklemli GaInP/GaAs/Ge güneş panelleri (~140 W) + 2× 8 Ah Li-ion batarya' },
      { label: 'Yürüyüş & Süspansiyon', value: '6 tekerlekli titanyum Rocker-Bogie; bağımsız tahrik ve ön/arka direksiyon motorları' },
      { label: 'Azami Eğim & Hız', value: '30° eğim tırmanma kapasitesi · 5 cm/sn azami hız' },
      { label: 'Robotik Kol (IDD)', value: '5 serbestlik dereceli Instrument Deployment Device (4 bilimsel cihaz taşıyıcı taret)' },
      { label: 'Bilgisayar & Bellek', value: '20 MHz BAE RAD6000 CPU · 128 MB DRAM · 256 MB Flash · VxWorks gerçek zamanlı İS' },
      { label: 'İletişim & Isıl Koruma', value: 'UHF (Mars Odyssey / MRO aktarmalı) + X-Band Yüksek Kazançlı Anten · 8× प्लütonyum-238 RHU ısıtıcı' },
    ],
    scientificInstruments: [
      {
        code: 'PANCAM',
        name: 'Panoramic Camera (Stereo Spektral Görüntüleyici)',
        location: 'Kamera Direği (PMA - 1,54 m yükseklik)',
        description:
          '30 cm aralıklı iki yüksek çözünürlüklü CCD kamera ve 8’er konumlu filtre tekerlekleri (440–1001 nm) ile 360° renkli panoramalar, demir oksit haritaları ve güneş atmosferik opaklık (Tau) ölçümleri üretti.',
      },
      {
        code: 'MINI-TES',
        name: 'Miniature Thermal Emission Spectrometer',
        location: 'Kamera Direği İç Gövdesi (Periskop Aynalı)',
        description:
          '5 ile 29 mikrometre arasındaki termal kızılötesi emisyonu ölçerek krater duvarlarındaki sülfat tuzlarını, silikatları ve hematit yataklarını uzaktan haritaladı.',
      },
      {
        code: 'MB',
        name: 'Mössbauer Spectrometer (MIMOS II)',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          'Kobalt-57 gama ışını kaynağı kullanarak Eagle Krateri’nde jarosit (KFe₃(SO₄)₂(OH)₆) ve kristal hematit (α-Fe₂O₃) varlığını kesin olarak teşhis etti.',
      },
      {
        code: 'APXS',
        name: 'Alpha Particle X-Ray Spectrometer',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          'Küriyum-244 kaynaklarıyla kayaçların elementel bileşimini ölçerek kükürt, klor, brom, demir, kalsiyum ve silisyum zenginleşmelerini ortaya koydu.',
      },
      {
        code: 'MI',
        name: 'Microscopic Imager',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          '31 × 31 mm görüş alanında 30 µm/piksel çözünürlükle küresel hematit konkresyonlarını ("yaban mersinleri"), çapraz tabakalanmaları ve sülfat kristal kalıplarını görüntüledi.',
      },
      {
        code: 'RAT',
        name: 'Rock Abrasion Tool (Kaya Aşındırma Aracı)',
        location: 'Robotik Kol (IDD) Taret Ucu',
        description:
          '3.000 devir/dakika hızla dönen elmas reçine başlığıyla onlarca Mars kayasında 45 mm çaplı taze kesitler açarak iç mineral dokusunu ortaya çıkardı.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Hematit "Yaban Mersinleri" (Blueberries) ve Jarosit Minerali',
        location: 'Eagle Krateri · Meridiani Planum (Sol 1–60)',
        description:
          'İniş noktasındaki katmanlı ana kayada bulunan milimetrik gri hematit kürecikleri (konkresyonlar) ve yalnızca asidik sulu ortamlarda oluşan demir hidroksit sülfat minerali jarosit, Mars’ta geçmişte yeraltı ve yüzey sularının aktığını kesin biçimde kanıtladı.',
      },
      {
        title: 'Burns Oluşumu ve Antik Sığ Deniz / Playalar (Festoon Cross-Bedding)',
        location: 'Eagle & Endurance Kraterleri (Sol 95–315)',
        description:
          'Mikroskobik görüntülerde keşfedilen santimetre ölçekli içbükey çapraz tabakalanmalar (festoon cross-lamination), kum tanelerinin rüzgârla değil, akan sığ su dalgalarıyla taşınıp çökeldiğini ortaya koydu.',
      },
      {
        title: 'Heat Shield Rock: Başka Bir Gezegende Bulunan İlk Göktaşı',
        location: 'Meridiani Planum (Sol 339 · Ocak 2005)',
        description:
          'Aracın kendi ısı kalkanı enkazının hemen yanında bulunan basketbol topu büyüklüğündeki çukurlu kayanın %93 demir ve %7 nikel içeren bir IAB demir-nikel meteoriti (resmi adıyla Meridiani Planum meteoriti) olduğu APXS ve Mössbauer ile doğrulandı.',
      },
      {
        title: 'Homestake Kalsiyum Sülfat (Jips) Damarı',
        location: 'Cape York · Endeavour Krateri Kenarı (Sol 2764 · Kasım 2011)',
        description:
          'Ana kayadaki çatlaklar boyunca uzanan parmak kalınlığındaki parlak "Homestake" damarının, nispeten ılımlı ve düşük asitlikteki yeraltı sularından çökelmiş saf hidratlı kalsiyum sülfat (jips - CaSO₄·2H₂O) olduğu belirlendi.',
      },
      {
        title: 'Espérance Kayası ve Yaşam Dostu Nötr pH’lı Kil Mineralleri',
        location: 'Matijevic Tepesi · Endeavour Krateri (Sol 3230 · 2013)',
        description:
          'Noachian dönemine (yaklaşık 4 milyar yıl öncesine) ait eski krater halkası kayaçlarında alüminyumca zengin smektit kil mineralleri (montmorillonit) keşfedildi. Bu bulgu, Mars’ın en erken döneminde asidik olmayan, içilebilir nitelikte nötr su kaynaklarına sahip olduğunu gösterdi.',
      },
    ],
    timeline: [
      {
        date: '7 Temmuz 2003',
        sol: 'Fırlatma',
        title: 'Cape Canaveral’dan Fırlatma',
        description: 'Delta II 7925H ağır fırlatma aracıyla Dünya’dan ayrıldı ve 202 günlük gezegenler arası yolculuğuna başladı.',
      },
      {
        date: '25 Ocak 2004',
        sol: 'Sol 1',
        title: 'Eagle Krateri’ne İniş ("Gezegenler Arası Tek Vuruş")',
        description: 'Hava yastıklarıyla sekerek 22 metre çapındaki Eagle Krateri’nin içine, açıkta duran tortul ana kayanın tam önüne indi.',
      },
      {
        date: '2 Mart 2004',
        sol: 'Sol 37',
        title: 'Antik Sıvı Su Kanıtının Açıklanması',
        description: 'Jarosit, sülfat tuzları ve hematit küreciklerinin analiziyle Eagle Krateri kayaçlarının bir zamanlar sıvı suyla ıslandığı resmen ilan edildi.',
      },
      {
        date: 'Haziran – Aralık 2004',
        sol: 'Sol 134–315',
        title: 'Endurance Krateri’ne İniş ve Stratigrafik İnceleme',
        description: '130 metre çapındaki stadyum büyüklüğündeki Endurance Krateri’nin dik yamaçlarına inerek 7 metre kalınlığındaki tortul katmanları inceledi.',
      },
      {
        date: 'Nisan – Haziran 2005',
        sol: 'Sol 446–484',
        title: 'Purgatory Kumulundan Kurtuluş',
        description: 'Yumuşak kum tepesine gömülen tekerlekler, JPL’de kurulan kum havuzu simülasyonları ve milimetrik manevralarla 5 hafta sonunda kurtarıldı.',
      },
      {
        date: 'Eylül 2006 – Ağustos 2008',
        sol: 'Sol 951–1634',
        title: 'Victoria Krateri Keşfi (800 Metre Çap)',
        description: 'Kıvrımlı burun ve koylarıyla dikkat çeken Victoria Krateri çevresini dolaştı ve Duck Bay yamacından kraterin içine inerek antik kumul katmanlarını analiz etti.',
      },
      {
        date: 'Ağustos 2011',
        sol: 'Sol 2681',
        title: '3 Yıllık Yolculuk Sonunda Endeavour Krateri’ne Varış',
        description: 'Victoria Krateri’nden ayrıldıktan sonra 21 km yol katederek 22 km çapındaki dev Endeavour Krateri’nin batı kenarındaki Cape York’a ulaştı.',
      },
      {
        date: 'Mayıs 2013',
        sol: 'Sol 3309',
        title: 'Espérance Kayasında Nötr Su ve Kil Mineralleri',
        description: 'Endeavour Krateri’nin 4 milyar yıllık yaşlı kayaçlarında yaşam için elverişli nötr pH’lı suyun izlerini taşıyan kil minerallerini belgeledi.',
      },
      {
        date: '24 Mart 2015',
        sol: 'Sol 3968',
        title: 'Dünya Dışı İlk Maraton Rekoru (42,195 km)',
        description: 'Marathon Vadisi yakınlarında toplam 42,195 kilometreyi geride bırakarak başka bir gök cisminde maraton mesafesini tamamlayan ilk insan yapımı araç oldu.',
      },
      {
        date: 'Mayıs 2017 – Mayıs 2018',
        sol: 'Sol 4722–5100',
        title: 'Perseverance Vadisi Araştırması',
        description: 'Endeavour Krateri’nin batı yamacını boydan boya kesen antik akış kanalı Perseverance Vadisi’ne girerek su, rüzgâr veya çamur akıntısı hipotezlerini test etti.',
      },
      {
        date: '10 Haziran 2018',
        sol: 'Sol 5111',
        title: 'Küresel Toz Fırtınası ve Son İletişim',
        description: 'Gezegeni kaplayan tarihi toz fırtınasında atmosferik opaklık (Tau > 10.8) rekor düzeye ulaştı ve güneş ışığının kesilmesiyle son düşük güç sinyali alındı.',
      },
      {
        date: '13 Şubat 2019',
        sol: 'Sol 5352',
        title: 'Görevin Resmi Olarak Tamamlanması',
        description: 'Derin Uzay Ağı (DSN) üzerinden gönderilen 1.000’den fazla kurtarma komutuna yanıt alınamaması üzerine NASA görevi tamamlanmış ilan etti.',
      },
    ],
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    code: 'MSL · Gale Krateri',
    landingYear: '2012 – Günümüz',
    landingSite: 'Gale Krateri · Aeolis Mons (Sharp Dağı)',
    landingCoordinates: '4.5895°G, 137.4417°D (Bradbury Landing)',
    launchDate: '26 Kasım 2011 (Cape Canaveral SLC-41, Atlas V 541)',
    landingDate: '6 Ağustos 2012, 05:17 UTC',
    missionEndDate: 'Aktif Görevde (13+ Dünya yılıdır kesintisiz çalışıyor)',
    plannedDuration: '1 Mars Yılı (~687 Dünya günü / 668 Sol)',
    actualDuration: '4.300+ Sol (Ağustos 2012’den bu yana aktif)',
    statusLabel: 'AKTİF GÖREV',
    image: '/assets/images/rovers/curiosity.jpg',
    imageAlt: 'Curiosity keşif aracının Gale Krateri’nde MAHLI kamerasıyla çekilen otoportresi',
    imageCredit: 'Fotoğraf: NASA / JPL-Caltech / MSSS (Sol 1065)',
    summary:
      'Nükleer güç kaynağıyla çalışan gezici laboratuvar; Gale Krateri ve Sharp Dağı eteklerinde antik göl yataklarını, organik molekülleri ve Mars’ın geçmişteki yaşanabilirlik koşullarını inceliyor.',
    missionObjective:
      '154 km çapındaki Gale Krateri ve merkezinde 5,5 km yükselen katmanlı Sharp Dağı’nda (Aeolis Mons) Mars’ın iklim ve jeolojik tarihini okumak; antik ortamın mikrobiyal yaşam için gerekli kimyasal yapı taşlarını (karbon, hidrojen, azot, oksijen, fosfor, kükürt) ve enerji kaynaklarını barındırıp barındırmadığını belirlemek.',
    finalLegacy:
      'Gökyüzü Vinç (Sky Crane) iniş teknolojisini başarıyla kanıtlayan 900 kg’lık nükleer gezici laboratuvar, Yellowknife Bay’deki antik göl yatağında Mars’ın geçmişte mikrobiyal yaşamı destekleyebilecek tüm kimyasal koşullara sahip olduğunu kanıtladı. Sharp Dağı’nın kil birimleri, sülfat geçiş kuşakları ve Gediz Vallis kanalında Mars’ın ıslak bir gezegenden kurak bir çöle nasıl dönüştüğünü katman katman belgelemeye devam ediyor.',
    keyMetrics: [
      {
        label: 'KAT EDİLEN MESAFE',
        value: '32+ km',
        sublabel: 'Bradbury Landing → Sharp Dağı yamaçları',
      },
      {
        label: 'DELİNEN KAYA ÖRNEĞİ',
        value: '40+ Sondaj',
        sublabel: 'SAM ve CheMin iç laboratuvar analizi',
      },
      {
        label: 'GÖREV DURUMU',
        value: 'AKTİF',
        sublabel: '4.300+ Sol kesintisiz yüzey operasyonu',
      },
      {
        label: 'GÜÇ KAYNAĞI',
        value: 'MMRTG Nükleer',
        sublabel: '4,8 kg Plütonyum-238 dioksit ısı/elektrik üreteci',
      },
    ],
    technicalSpecs: [
      { label: 'Kütle', value: '899 kg (80 kg bilimsel laboratuvar yükü dâhil)' },
      { label: 'Boyutlar', value: '2,9 m uzunluk × 2,7 m genişlik × 2,2 m yükseklik' },
      { label: 'Güç Sistemi', value: 'MMRTG (Çok Görevli Radyoizotop Termoelektrik Jeneratör) · Başlangıçta ~110 W elektrik' },
      { label: 'Robotik Kol', value: '2,1 m uzunluk, 5 eklemli; ucunda 30 kg’lık darbeli matkap, kepçe, MAHLI ve APXS tareti' },
      { label: 'İniş Sistemi', value: '4,5 m ısı kalkanı + süpersonik paraşüt + 8 roket motorlu Sky Crane (Gökyüzü Vinç)' },
      { label: 'Yerleşik Bilgisayar', value: 'Çift yedekli BAE RAD750 (200 MHz) · 256 MB DRAM · 2 GB Flash bellek' },
      { label: 'Yürüyüş Sistemi', value: '50 cm çaplı 6 alüminyum tekerlekli Rocker-Bogie (JPL Mors kodu desenli)' },
      { label: 'Azami Hız', value: '4 cm/sn (otonom tehlike algılamalı sürüşte ortalama 1,5–2 cm/sn)' },
    ],
    scientificInstruments: [
      {
        code: 'SAM',
        name: 'Sample Analysis at Mars',
        location: 'Gövde İçi Analitik Laboratuvar',
        description:
          'Gaz kromatografisi, dört kutuplu kütle spektrometresi ve ayarlanabilir lazer spektrometresi ile delinen kaya tozlarında organik karbon bileşiklerini ve atmosferik metan dalgalanmalarını ölçer.',
      },
      {
        code: 'CHEMIN',
        name: 'Chemistry and Mineralogy (X-Işını Kırınımı)',
        location: 'Gövde İçi Analitik Laboratuvar',
        description:
          'X-ışını kırınımı (XRD) ve floresansı kullanarak toz örneklerdeki kil, sülfat, hematit ve silikat minerallerinin kristal yapısını kesin olarak tanımlar.',
      },
      {
        code: 'CHEMCAM',
        name: 'Chemistry and Camera Complex (LIBS Lazer)',
        location: 'Kamera Direği Üst Gövdesi',
        description:
          '7 metreye kadar uzaktaki kayalara kızılötesi lazer darbeleri gönderip oluşan plazma kıvılcımının tayfını okuyarak anında element analizi yapar.',
      },
      {
        code: 'MASTCAM',
        name: 'Mast Camera (34 mm & 100 mm Telefoto)',
        location: 'Kamera Direği (~2 m yükseklik)',
        description:
          'İki farklı odak uzaklığına sahip renkli kamera çifti ile Sharp Dağı’ndaki tortul tabakaların yüksek çözünürlüklü jeolojik panoramalarını ve HD videolarını çeker.',
      },
      {
        code: 'MAHLI & APXS',
        name: 'Mars Hand Lens Imager & Alpha Particle X-Ray Spectrometer',
        location: 'Robotik Kol Taret Ucu',
        description:
          '14 mikrometre/piksel makro renkli görüntüleme (ve ikonik rover otoportreleri) ile temas halindeki kayaçların kimyasal element analizini gerçekleştirir.',
      },
      {
        code: 'RAD, REMS & DAN',
        name: 'Radiation Assessment Detector, Weather Station & Dynamic Albedo of Neutrons',
        location: 'Gövde Üstü ve Direk Sensörleri',
        description:
          'Gelecekteki insanlı görevler için yüzey radyasyon dozunu (RAD), günlük meteorolojik verileri (REMS) ve yeraltındaki hidrojen/su içeriğini (DAN) ölçer.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Yellowknife Bay Antik Tatlı Su Gölü ve Yaşanabilirlik Kanıtı',
        location: 'John Klein & Cumberland Sondajları (Sol 182–279 · 2013)',
        description:
          'İnce taneli çamurtaşı (mudstone) örneklerinde %20 kil minerali, düşük tuzluluk, nötr pH ve yaşam için zorunlu CHNOPS elementlerinin tamamı tespit edilerek Gale Krateri’nin milyarlarca yıl önce mikrobiyal yaşamı destekleyebilecek bir göl olduğu kanıtlandı.',
      },
      {
        title: '3,5 Milyar Yıllık Çamurtaşlarında Karmaşık Organik Moleküller',
        location: 'Pahrump Hills & Vera Rubin Sırtı (2018)',
        description:
          'SAM laboratuvarında 500–800 °C’ye ısıtılan kaya tozlarında tiyofenik, aromatik ve alifatik organik karbon molekülleri keşfedildi.',
      },
      {
        title: 'Mevsimsel Atmosferik Metan Döngüsü',
        location: 'Gale Krateri Atmosferi (2014–Günümüz)',
        description:
          'SAM lazer spektrometresi, arka plan metan seviyesinin (~0,4 ppb) Mars yaz aylarında mevsimsel olarak yükseldiğini ve zaman zaman 7–21 ppb’lik ani artışlar gösterdiğini ortaya koydu.',
      },
      {
        title: 'Kil-Sülfat Geçiş Kuşağı ve Gediz Vallis Saf Kükürt Kristalleri',
        location: 'Sharp Dağı Yamaçları & Gediz Vallis Kanalı (2023–2024)',
        description:
          'Kilce zengin göl çökellerinden sülfatça zengin kurak dönem katmanlarına geçişi belgeledi ve 2024 yılında tekerleğin ezdiği bir kayanın içinde Mars’ta ilk kez saf elementel sarı kükürt kristalleri keşfetti.',
      },
    ],
    timeline: [
      {
        date: '26 Kasım 2011',
        sol: 'Fırlatma',
        title: 'Atlas V 541 ile Fırlatma',
        description: 'Cape Canaveral’dan Mars Bilim Laboratuvarı (MSL) görevi kapsamında fırlatıldı.',
      },
      {
        date: '6 Ağustos 2012',
        sol: 'Sol 0',
        title: 'Sky Crane ile Bradbury Landing İnişi',
        description: 'Yedi dakikalık kritik iniş dizisi sonunda Gökyüzü Vinç kablolarıyla Gale Krateri tabanına kusursuz biçimde indirildi.',
      },
      {
        date: 'Şubat 2013',
        sol: 'Sol 182',
        title: 'Mars’ta İlk Derin Kaya Sondajı (John Klein)',
        description: 'Darbeli matkabıyla bir Mars kayasını delip iç toz örneğini yerleşik laboratuvarlarına aktaran ilk gezici oldu.',
      },
      {
        date: 'Eylül 2014',
        sol: 'Sol 753',
        title: 'Sharp Dağı (Aeolis Mons) Eteklerine Varış',
        description: 'Pahrump Hills’e ulaşarak 5,5 km yüksekliğindeki dağın taban katmanlarını tırmanarak incelemeye başladı.',
      },
      {
        date: 'Haziran 2018',
        sol: 'Sol 2075',
        title: 'Organik Moleküller ve Mevsimsel Metan Keşfi',
        description: 'Gale Krateri çamurtaşlarında korunmuş antik organik bileşikler ve atmosferik metan döngüsü Science dergisinde yayımlandı.',
      },
      {
        date: '2019 – 2021',
        sol: 'Sol 2300–3050',
        title: 'Glen Torridon Kil Bölgesi ve Mont Mercou',
        description: 'Yörüngeden güçlü kil imzası veren Glen Torridon vadisinde yoğun sondaj kampanyası yürüttü.',
      },
      {
        date: 'Mayıs 2024',
        sol: 'Sol 4199',
        title: 'Gediz Vallis Kanalında Saf Elementel Kükürt Keşfi',
        description: 'Tekerleğin kırdığı "Convict Lake" bölgesi kayasında parlak sarı saf kükürt kristallerini ortaya çıkardı.',
      },
    ],
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    code: 'MARS 2020 · Jezero Krateri',
    landingYear: '2021 – Günümüz',
    landingSite: 'Jezero Krateri & Antik Nehir Deltası',
    landingCoordinates: '18.4447°K, 77.4508°D (Octavia E. Butler Landing)',
    launchDate: '30 Temmuz 2020 (Cape Canaveral SLC-41, Atlas V 541)',
    landingDate: '18 Şubat 2021, 20:55 UTC',
    missionEndDate: 'Aktif Görevde (Jezero Krateri kenarına tırmanış aşamasında)',
    plannedDuration: 'En az 1 Mars Yılı (~687 Dünya günü)',
    actualDuration: '1.300+ Sol (Şubat 2021’den bu yana aktif)',
    statusLabel: 'AKTİF GÖREV',
    image: '/assets/images/rovers/perseverance.jpg',
    imageAlt: 'Perseverance keşif aracının Jezero Krateri Rochette kayası yanında çekilen otoportresi',
    imageCredit: 'Fotoğraf: NASA / JPL-Caltech / MSSS (PIA24836)',
    summary:
      'Antik bir nehir deltasına ev sahipliği yapan Jezero Krateri’nde mikrobiyal yaşam izlerini araştırıyor, Dünya’ya getirilecek kaya örneklerini tüplerde topluyor ve yeni nesil teknolojileri test ediyor.',
    missionObjective:
      '3,5 milyar yıl önce bir nehir deltası ve krater gölü olan 45 km çapındaki Jezero Krateri’nde astrobiyolojik açıdan antik mikrobiyal yaşam izlerini (biyo-imzaları) aramak; Dünya’daki gelişmiş laboratuvarlarda incelenmek üzere hermetik titanyum tüplerde karot kaya örnekleri toplamak ve gelecekteki insanlı görevler için Mars atmosferinden oksijen üretimini (MOXIE) test etmek.',
    finalLegacy:
      'Başka bir gezegende ilk motorlu hava aracı olan Ingenuity Mars Helikopteri’ni (72 başarılı uçuş) konuşlandırdı, MOXIE cihazıyla Mars’ın karbondioksit atmosferinden toplam 122 gram saf solunabilir oksijen üretti, Three Forks noktasında insanlığın başka bir gezegendeki ilk örnek deposunu kurdu ve Neretva Vallis kanalındaki "Cheyava Falls" kayasında organik karbon ile birlikte olası mikrobiyal süreçlere işaret eden leopar benekli dokuları keşfetti.',
    keyMetrics: [
      {
        label: 'MÜHÜRLENEN ÖRNEK',
        value: '25+ Tüp',
        sublabel: 'Kaya karotu, regolit ve atmosfer örnekleri',
      },
      {
        label: 'KAT EDİLEN MESAFE',
        value: '30+ km',
        sublabel: 'Otonom AutoNav yüksek hızlı sürüş sistemi',
      },
      {
        label: 'MOXIE OKSİJEN ÜRETİMİ',
        value: '122 gram',
        sublabel: '16 denemede %98+ saflıkta O₂ üretimi',
      },
      {
        label: 'INGENUITY HELİKOPTERİ',
        value: '72 Uçuş',
        sublabel: 'Başka bir gezegende ilk motorlu uçuş',
      },
    ],
    technicalSpecs: [
      { label: 'Kütle', value: '1.025 kg (Mars yüzeyine indirilen en ağır ve gelişmiş keşif aracı)' },
      { label: 'Boyutlar', value: '3,0 m uzunluk × 2,7 m genişlik × 2,2 m yükseklik' },
      { label: 'Güç Sistemi', value: 'MMRTG nükleer jeneratör (~110 W elektrik) + 2× Li-ion şarjlı batarya' },
      { label: 'Örnekleme Sistemi (SCS)', value: '9 matkap ucu, 43 titanyum örnek tüpü ve gövde içi robotik mühürleme istasyonu' },
      { label: 'İniş Teknolojisi', value: 'TRN (Araziye Göre Navigasyon) kamera güdümlü Sky Crane iniş sistemi' },
      { label: 'Tekerlek Tasarımı', value: '52,5 cm çapında güçlendirilmiş 6 alüminyum tekerlek (48 titanyum kavisli sırt dişi)' },
      { label: 'İşlemci & Kameralar', value: 'RAD750 CPU + görüntü işleme hızlandırıcısı · Toplam 23 kamera ve 2 mikrofon' },
      { label: 'Otonom Sürüş (AutoNav)', value: 'Sürüş sırasında 3B rota planlama ile saatte 152 metreye varan ilerleme hızı' },
    ],
    scientificInstruments: [
      {
        code: 'SHERLOC & WATSON',
        name: 'Scanning Habitable Environments with Raman & Luminescence for Organics & Chemicals',
        location: 'Robotik Kol Taret Ucu',
        description:
          'Derin morötesi (UV) Raman ve floresans spektrometresi ile kaya yüzeylerindeki organik bileşikleri ve olası biyo-imzaları temassız ve tahribatsız biçimde haritalar.',
      },
      {
        code: 'PIXL',
        name: 'Planetary Instrument for X-ray Lithochemistry',
        location: 'Robotik Kol Taret Ucu',
        description:
          'Bir tuz tanesi ölçeğinde (120 mikrometre) odaklanmış X-ışını floresans demetiyle kayaçlardaki mikro-kimyasal element dağılımlarını çıkarır.',
      },
      {
        code: 'SUPERCAM',
        name: 'Laser Micro-Imager & Spectroscopy Suite',
        location: 'Kamera Direği Üst Gövdesi',
        description:
          'LIBS lazeri, Raman, görünür/kızılötesi spektrometre ve mikrofon birleşimiyle 7 metre mesafeden kaya kimyasını ve Mars rüzgâr/lazer seslerini kaydeder.',
      },
      {
        code: 'MASTCAM-Z',
        name: 'Zoomable Panoramic Cameras',
        location: 'Kamera Direği (~2,1 m yükseklik)',
        description:
          '3:1 optik yakınlaştırma (zoom) yeteneğine sahip multispektral stereo kameralarla Jezero deltasının 3B tortul mimarisini görüntüler.',
      },
      {
        code: 'MOXIE',
        name: 'Mars Oxygen In-Situ Resource Utilization Experiment',
        location: 'Gövde İçi (Sağ Ön Bölme)',
        description:
          'Mars atmosferindeki %95 CO₂ gazını 800 °C’de katı oksit elektroliziyle ayrıştırarak solunabilir oksijen (O₂) üreten öncü teknoloji gösterimi.',
      },
      {
        code: 'RIMFAX & MEDA',
        name: 'Radar Imager for Mars Subsurface Experiment & Environmental Dynamics Analyzer',
        location: 'Gövde Altı Arka Kısmı & Direk Sensörleri',
        description:
          'RIMFAX yeraltı radarı 10 metre derinliğe kadar jeolojik katmanları tarar; MEDA ise basınç, nem, radyasyon, rüzgâr ve toz özelliklerini ölçer.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Cheyava Falls Kayası: Organik Moleküller ve "Leopar Benekleri"',
        location: 'Neretva Vallis Nehir Kanalı (Sol 1215 · Temmuz 2024)',
        description:
          'Antik nehir vadisindeki ok ucu şekilli "Cheyava Falls" kayasında SHERLOC ile organik bileşikler, kalsiyum sülfat damarları ve Dünya’da mikrobiyal kimyasal reaksiyonlarla ilişkilendirilen demir-fosfat halkalı milimetrik "leopar benekleri" tespit edildi.',
      },
      {
        title: 'Jezero Krateri Tabanında Magmatik Kümülat Kayaçlar ve Su Etkileşimi',
        location: 'Máaz ve Séítah Oluşumları (2021–2022)',
        description:
          'Krater tabanının beklendiği gibi göl çamurundan değil, yavaş soğumuş olivince zengin magmatik kayaçlardan oluştuğu ve bu kayaçların sonradan tuzlu yeraltı sularıyla değişime uğradığı ortaya çıkarıldı.',
      },
      {
        title: 'Three Forks Örnek Deposu ve İlk Karot Koleksiyonu',
        location: 'Three Forks · Jezero Deltası Tabanı (Aralık 2022 – Ocak 2023)',
        description:
          '6 Eylül 2021’de "Rochette" kayasından alınan "Montdenier" ile başlayan örnekleme kampanyasında 10 yedek titanyum tüp Three Forks yüzeyine bırakılarak başka bir gezegendeki ilk örnek deposu tamamlandı.',
      },
      {
        title: 'Mars Atmosferinde İlk Ses Kayıtları, MOXIE Oksijen Başarısı ve Ingenuity',
        location: 'Jezero Krateri (2021–2024)',
        description:
          'Mars’ta ses hızının frekansa bağlı olarak değiştiği (240 m/sn ve 250 m/sn) mikrofonlarla kanıtlandı; MOXIE toplam 122 g oksijen üreterek görevini tamamladı ve Ingenuity 72 uçuşla 17 km uçtu.',
      },
    ],
    timeline: [
      {
        date: '30 Temmuz 2020',
        sol: 'Fırlatma',
        title: 'Cape Canaveral’dan Fırlatma',
        description: 'Atlas V 541 roketiyle Ingenuity helikopteriyle birlikte Mars’a doğru yola çıktı.',
      },
      {
        date: '18 Şubat 2021',
        sol: 'Sol 0',
        title: 'Jezero Krateri’ne Hassas İniş (TRN)',
        description: 'Araziye Göre Navigasyon sistemiyle tehlikeli kayalıkları otonom olarak aşarak Octavia E. Butler noktasına indi.',
      },
      {
        date: '19 Nisan 2021',
        sol: 'Sol 58',
        title: 'Ingenuity Helikopteri ve MOXIE İlkleri',
        description: 'Ingenuity başka bir gezegende ilk motorlu uçuşu gerçekleştirdi; ertesi gün MOXIE Mars atmosferinden ilk oksijeni üretti.',
      },
      {
        date: '6 Eylül 2021',
        sol: 'Sol 194',
        title: 'İlk Kaya Karotu: "Montdenier" (Rochette Kayası)',
        description: 'Citadelle bölgesindeki Rochette kayasından ilk sızdırmaz titanyum tüp örneğini başarıyla mühürledi.',
      },
      {
        date: 'Nisan 2022',
        sol: 'Sol 409',
        title: 'Antik Jezero Nehir Deltasına Varış',
        description: 'Rekor hızda otonom sürüşle Three Forks üzerinden antik nehir deltasının tortul cephesine ulaştı.',
      },
      {
        date: 'Ocak 2023',
        sol: 'Sol 690',
        title: 'Three Forks Örnek Deposunun Tamamlanması',
        description: 'Gelecekteki Mars Örnek Getirme (MSR) görevi için 10 titanyum örnek tüpünü yüzeyde zikzak düzende konumlandırdı.',
      },
      {
        date: 'Temmuz 2024',
        sol: 'Sol 1215',
        title: 'Cheyava Falls Kayası ve "Sapphire Canyon" Örneği',
        description: 'Neretva Vallis’te organik karbon ve leopar benekli reaksiyon halkaları içeren 22. kaya karotunu topladı.',
      },
    ],
  },
] as const;

/**
 * Copy and extensible structure for the Lunar Exploration section.
 */
export const LUNAR_EXPLORATION_CONTENT = {
  eyebrow: 'DÜNYA’NIN SESSİZ TANIKLARI',
  title: 'LUNAR EXPLORATION',
  subtitle: 'Ay Keşifleri – Gri Ufukta Bırakılan İzler',
  description:
    'İnsanlığın Dünya dışındaki ilk durağı olan Ay; öncü robotik sondalardan Apollo yüzey araçlarına ve modern kutup keşiflerine kadar uzay tarihinin en sessiz anıtlarını barındırıyor. Sessiz kraterlerde bekleyen Ay görevleri çok yakında bu bölümde yer alacak.',
  visualCaption:
    'Ay görseli: Krater ve mare dokularını yansıtan sanatsal illüstrasyon.',
} as const;

/**
 * Structured placeholder registry ready to be populated with full Lunar mission cards in the next stage.
 */
export const UPCOMING_LUNAR_MISSIONS: readonly LunarMissionPreviewItem[] = [
  {
    id: 'lunokhod-archive',
    program: 'LUNA & LUNOKHOD SERİSİ',
    title: 'İlk Robotik Ay Gezicileri',
    era: '1970 – 1973',
    summary:
      'Ay yüzeyinde uzaktan kumandayla ilerleyen ilk tekerlekli keşif araçlarının rota ve telemetri kayıtları.',
    upcomingBadge: 'Arşiv Hazırlanıyor',
  },
  {
    id: 'apollo-lrv',
    program: 'APOLLO LUNAR ROVING VEHICLE',
    title: 'Ay Yüzey Araçları (Apollo 15, 16, 17)',
    era: '1971 – 1972',
    summary:
      'Hadley Rille, Descartes Yaylaları ve Taurus-Littrow vadisinde astronotların keşif menzilini genişleten elektrikli araçlar.',
    upcomingBadge: 'Arşiv Hazırlanıyor',
  },
  {
    id: 'modern-lunar-rovers',
    program: 'CHANG’E & MODERN KUTUP KEŞİFLERİ',
    title: 'Ay’ın Uzak Yüzü ve Güney Kutbu',
    era: '2013 – Günümüz',
    summary:
      'Yutu gezicileri ve su buzu arayışıyla Ay’ın karanlık kraterlerine gönderilen yeni nesil yüzey kaşifleri.',
    upcomingBadge: 'Arşiv Hazırlanıyor',
  },
] as const;
