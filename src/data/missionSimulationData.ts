import type { MissionSimulationStage, RoverId } from '@/types';

/**
 * Interactive Historical Mission Chronology dataset for all four Mars rovers.
 * Explicitly framed as an interactive historical narrative based on official NASA/JPL
 * mission logs (NOT a real-time physics engine).
 */
export const MISSION_SIMULATION_DATA: Record<
  RoverId,
  {
    roverId: RoverId;
    roverName: string;
    missionSubtitle: string;
    disclaimer: string;
    stages: readonly MissionSimulationStage[];
  }
> = {
  opportunity: {
    roverId: 'opportunity',
    roverName: 'Opportunity (MER-B)',
    missionSubtitle: '7 Temmuz 2003 – 13 Şubat 2019 · 5.111 Sol · Meridiani Planum’dan Endeavour Krateri’ne',
    disclaimer:
      'Metodoloji Notu: Bu modül gerçek zamanlı bir yörünge/fizik simülasyonu değildir; NASA/JPL uçuş kayıtlarına dayanan tarihsel görev olaylarının kronolojik ve etkileşimli anlatımıdır.',
    stages: [
      {
        id: 'opp-stage-1',
        stageNumber: 1,
        phaseCode: 'LAUNCH',
        phaseLabel: 'AŞAMA 01 · FIRLATMA VE GEZEGENLER ARASI YOLCULUK',
        date: '7 Temmuz 2003 (03:18 UTC)',
        sol: 'T-202 Gün (Fırlatma)',
        title: 'Cape Canaveral’dan Delta II 7925H ile Fırlatılış',
        location: 'Cape Canaveral SLC-17B → Dünya–Mars Transfer Yörüngesi',
        telemetryBadge: 'Hız: 36.100 km/sa · Yolculuk Mesafesi: 456 Milyon km',
        imageUrl: '/assets/images/rovers/spirit.jpg',
        imageCaption: 'NASA/JPL MER Görev Konsepti (PIA04413)',
        imageKindLabel: 'RESMİ NASA/JPL GÖREV İLLÜSTRASYONU',
        narrative:
          'İkizi Spirit’ten 27 gün sonra, 7 Temmuz 2003 gecesi ağır güçlendirilmiş Delta II 7925H roketiyle uzaya fırlatıldı. 202 gün süren 456 milyon kilometrelik gezegenler arası seyir boyunca yörünge düzeltme manevralarını kusursuz tamamladı.',
        scientificExplanation:
          'Hedef olarak seçilen Meridiani Planum, Mars Global Surveyor yörünge aracının Termal Emisyon Spektrometresi (TES) ile uzaydan tespit ettiği devasa kristal gri hematit (α-Fe₂O₃) yatakları nedeniyle seçilmişti; hematit Dünya’da çoğunlukla sıvı suyun varlığında oluşan bir demir oksit mineralidir.',
        keyEvents: [
          'Delta II 7925H roketiyle Cape Canaveral SLC-17B rampasından başarılı kalkış.',
          '202 günlük seyir süresince tüm bilimsel cihazların (Athena yükü) uzay kalibrasyonu.',
          'Mars atmosferine giriş öncesi son yörünge düzeltme manevrası (TCM-4).',
        ],
        sourceLabel: 'NASA/JPL MER Launch & Cruise Press Kit',
        sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
      },
      {
        id: 'opp-stage-2',
        stageNumber: 2,
        phaseCode: 'EDL',
        phaseLabel: 'AŞAMA 02 · ATMOSFERE GİRİŞ VE EAGLE KRATERİ İNİŞİ (EDL)',
        date: '25 Ocak 2004 (05:05 UTC)',
        sol: 'Sol 1',
        title: '"Gezegenler Arası Tek Vuruş": Eagle Krateri’ne İniş',
        location: 'Eagle Krateri · Meridiani Planum (1.9462°G, 354.4734°D)',
        telemetryBadge: 'Giriş Hızı: 19.300 km/sa · Krater Çapı: 22 Metre',
        imageUrl: '/assets/images/rovers/opportunity.jpg',
        imageCaption: 'Opportunity Güverte ve Pancam Otoportresi (PIA17759)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          '6 dakikalık kritik EDL (Giriş, Alçalma ve İniş) sürecinde ısı kalkanı, süpersonik paraşüt, RAD geri tepmeli roketler ve dev poliüretan hava yastıkları devreye girdi. Yüzeyde 26 kez seken Opportunity, uçsuz bucaksız düz ovada 22 metre çapındaki Eagle Krateri’nin tam içine yuvarlanarak durdu.',
        scientificExplanation:
          'Pancam kameraları açıldığında bilim ekibini tarihi bir sürpriz karşıladı: Kraterin iç duvarı boyunca uzanan açık renkli katmanlı tortul ana kaya (bedrock) aracın yalnızca birkaç metre önündeydi. Bu sayede kilometrelerce sürüş yapmadan ilk haftalarda doğrudan Mars’ın jeolojik geçmişi incelenebildi.',
        keyEvents: [
          '1.600 °C sıcaklığa ulaşan aeroshell ısı kalkanı ile atmosferik frenleme.',
          'Hava yastıklarıyla 22 m çaplı Eagle Krateri içine iniş ("Interplanetary Hole-in-One").',
          'İlk Pancam panoramasında katmanlı tortul ana kayanın ve gri hematit toprağının görüntülenmesi.',
        ],
        sourceLabel: 'NASA/JPL PIA05460 · Eagle Crater Landing',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA05460',
      },
      {
        id: 'opp-stage-3',
        stageNumber: 3,
        phaseCode: 'SURFACE_EARLY',
        phaseLabel: 'AŞAMA 03 · ANTİK SIVI SU KANITI VE GÖKTAŞI KEŞFİ',
        date: 'Mart 2004 – Ocak 2005',
        sol: 'Sol 37 – Sol 339',
        title: 'Hematit "Yaban Mersinleri", Jarosit ve Heat Shield Rock',
        location: 'Eagle Krateri & Endurance Krateri (Meridiani Planum)',
        telemetryBadge: 'Su Kanıtı: Sol 37 · İlk Göktaşı: Sol 339',
        imageUrl: '/assets/images/rovers/opportunity-meteorite.jpg',
        imageCaption: 'Opportunity Pancam ile görüntülenen Heat Shield Rock Göktaşı (PIA07269)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Eagle Krateri’ndeki kayaçları RAT ile zımparalayan ve Mössbauer/APXS/MI cihazlarıyla inceleyen Opportunity, 2 Mart 2004’te Mars’ta geçmişte sıvı suyun bulunduğunu kesin olarak kanıtladı. Ardından 130 m çapındaki Endurance Krateri’ne inip 6 ay boyunca tortul katmanları inceledi ve çıkışta kendi ısı kalkanının yanında "Heat Shield Rock" göktaşını buldu.',
        scientificExplanation:
          'Kayaçların içinde bulunan milimetrik küresel hematit konkresyonları ("blueberries") suyla doygun tortullarda büyümüştü. Ayrıca Mössbauer spektrometresinin tespit ettiği "jarosit" (demir hidroksit sülfat) minerali yalnızca asidik sulu ortamlarda oluşur. İçbükey çapraz tabakalanmalar ise suyun sadece yeraltında kalmayıp yüzeyde dalgalı sığ göller (playalar) oluşturduğunu kanıtladı.',
        keyEvents: [
          'Sol 37: Jarosit ve hematit kürecikleriyle antik sıvı su kanıtının resmen açıklanması.',
          'Sol 134–315: Endurance Krateri’nde Burns Oluşumu kumtaşı katmanlarının 7 m derinliğe kadar analizi.',
          'Sol 339: Başka bir gezegende keşfedilen ilk göktaşı olan Heat Shield Rock (%93 Fe, %7 Ni) tespiti.',
        ],
        sourceLabel: 'Squyres et al., Science (2004) / PIA07269',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA07269',
      },
      {
        id: 'opp-stage-4',
        stageNumber: 4,
        phaseCode: 'PRIME_DISCOVERY',
        phaseLabel: 'AŞAMA 04 · VICTORIA VE ENDEAVOUR KRATERLERİ (NÖTR SU & KİL)',
        date: '2006 – 2015',
        sol: 'Sol 951 – Sol 3968',
        title: 'Victoria Krateri, Homestake Jips Damarı ve Maraton Rekoru',
        location: 'Victoria Krateri → Endeavour Krateri (Cape York & Marathon Vadisi)',
        telemetryBadge: 'Maraton Rekoru: 42,195 km (Sol 3968 · 24 Mart 2015)',
        imageUrl: '/assets/images/rovers/opportunity.jpg',
        imageCaption: 'Endeavour Krateri’nde Opportunity (PIA17759)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Purgatory kumulundan kurtulduktan sonra 800 m çapındaki Victoria Krateri’ni iki yıl boyunca inceleyen Opportunity, ardından 21 kilometrelik destansı bir yolculukla 22 km çapındaki dev Endeavour Krateri’ne ulaştı. 24 Mart 2015’te (Sol 3968) toplam 42,195 kilometreyi aşarak başka bir gezegende maraton mesafesini tamamlayan ilk araç oldu.',
        scientificExplanation:
          'Endeavour Krateri’nin Noachian dönemine (~4 milyar yıl öncesine) ait halkasında keşfedilen "Homestake" kalsiyum sülfat (jips) damarı ve Matijevic Tepesi’ndeki "Espérance" kayasında bulunan alüminyumca zengin smektit killeri, erken Mars’ta Meridiani’deki asidik sulardan önce mikrobiyal yaşam için son derece elverişli, nötr pH’lı tatlı su ortamlarının var olduğunu ortaya koydu.',
        keyEvents: [
          'Sol 951–1634: 800 metre çapındaki Victoria Krateri’nin çevrelenmesi ve Duck Bay inişi.',
          'Sol 2681 (Ağustos 2011): 22 km çapındaki Endeavour Krateri’nin Cape York sırtına varış.',
          'Sol 2764 & Sol 3309: Homestake jips damarı ve Espérance kayası nötr pH’lı kil mineralleri keşfi.',
          'Sol 3968 (24 Mart 2015): 42,195 km ile Dünya dışı ilk maraton mesafesi rekoru.',
        ],
        sourceLabel: 'Arvidson et al., Science (2014) / NASA JPL',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA14760',
      },
      {
        id: 'opp-stage-5',
        stageNumber: 5,
        phaseCode: 'EXTENDED_OR_END',
        phaseLabel: 'AŞAMA 05 · 2018 KÜRESEL TOZ FIRTINASI VE SON İLETİŞİM (SOL 5111)',
        date: 'Haziran 2018 – 13 Şubat 2019',
        sol: 'Sol 5111 – Sol 5352',
        title: 'Gezegeni Saran Karanlık: Perseverance Vadisi ve Son Sinyal',
        location: 'Perseverance Vadisi · Endeavour Krateri Batı Yamacı',
        telemetryBadge: 'Atmosferik Opaklık (Tau): >10,8 · Son Odometri: 45,16 km',
        imageUrl: '/assets/images/rovers/opportunity.jpg',
        imageCaption: 'Opportunity’nin 15 Yıllık Görev Mirası (PIA17759)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Mayıs 2018 sonunda başlayan bölgesel bir toz fırtınası birkaç hafta içinde tüm Mars gezegenini saran tarihi bir küresel fırtınaya (Planet-Encircling Dust Event) dönüştü. Perseverance Vadisi’nde bulunan Opportunity’nin üzerinde gökyüzü tamamen karardı; güneş enerjisi üretimi normalin %0,002’sine düştü ve araçtan son sinyal 10 Haziran 2018’de (Sol 5111) alındı.',
        scientificExplanation:
          'Normal bir Mars gününde atmosferik optik derinlik (Tau) yaklaşık 0,5 iken, Haziran 2018 fırtınasında Tau değeri 10,8’i aşarak Mars araştırmaları tarihindeki en yüksek opaklığa ulaştı. Güneş ışığının kesilmesiyle bataryalar tükendi, aracın iç görev saati (mission clock) sıfırlandı ve düşük güç hatası (low-power fault) moduna girdi. Fırtına dindikten sonra NASA Derin Uzay Ağı (DSN) üzerinden 8 ay boyunca gönderilen 1.000’den fazla kurtarma komutuna yanıt alınamaması üzerine 13 Şubat 2019’da görev resmen tamamlandı.',
        keyEvents: [
          'Mayıs 2018 sonu: Perseverance Vadisi üzerinde hızla büyüyen toz fırtınasının tespit edilmesi.',
          '10 Haziran 2018 (Sol 5111): Tau > 10,8 karanlığında Dünya’ya ulaşan son düşük güç telemetrisi.',
          'Eylül 2018 – Ocak 2019: Rüzgâr temizleme sezonunda 1.000+ "sweep and beep" kurtarma komutu gönderilmesi.',
          '13 Şubat 2019: 90 gün için gidip 14 yıl 294 gün çalışan Opportunity görevinin resmen tamamlanması.',
        ],
        specialAlert: {
          title: 'ÖZEL DOSYA: 2018 KÜRESEL TOZ FIRTINASI VE SON İLETİŞİM ANALİZİ',
          detail:
            'Sol 5111’de güneş panelleri yalnızca 22 Watt-saat enerji üretebildi (normalde ~600–900 Wh/Sol). Batarya voltajı 24 V sınırının altına inince uçuş bilgisayarı uyku moduna geçti. Aşırı soğuk Mars gecelerinde (-80 °C) ısıtıcıların çalışamaması nedeniyle iç elektronikte kalıcı donma veya saat kayması yaşandığı değerlendirilmektedir.',
        },
        sourceLabel: 'NASA/JPL Opportunity End of Mission Report (PIA22962)',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA22962',
      },
    ],
  },
  spirit: {
    roverId: 'spirit',
    roverName: 'Spirit (MER-A)',
    missionSubtitle: '10 Haziran 2003 – 22 Mart 2010 · 2.208 Sol · Gusev Krateri & Columbia Tepeleri',
    disclaimer:
      'Metodoloji Notu: Bu modül gerçek zamanlı bir fizik simülasyonu değildir; NASA/JPL uçuş kayıtlarına dayanan tarihsel görev olaylarının kronolojik ve etkileşimli anlatımıdır.',
    stages: [
      {
        id: 'spi-stage-1',
        stageNumber: 1,
        phaseCode: 'LAUNCH',
        phaseLabel: 'AŞAMA 01 · FIRLATMA VE GUSEV KRATERİNE İNİŞ',
        date: '10 Haziran 2003 – 4 Ocak 2004',
        sol: 'Fırlatma → Sol 1',
        title: 'Delta II Fırlatılışı ve Gusev Krateri İnişi',
        location: 'Cape Canaveral → Columbia Memorial Station (14.5684°G, 175.4726°D)',
        telemetryBadge: 'İniş Tarihi: 4 Ocak 2004 (04:35 UTC)',
        imageUrl: '/assets/images/rovers/spirit.jpg',
        imageCaption: 'MER-A Spirit Görev İllüstrasyonu (PIA04413)',
        imageKindLabel: 'RESMİ NASA/JPL GÖREV İLLÜSTRASYONU',
        narrative:
          '10 Haziran 2003’te fırlatılan Spirit, 7 aylık yolculuğun ardından 4 Ocak 2004’te hava yastıklarıyla 166 km çapındaki Gusev Krateri tabanına başarıyla indi.',
        scientificExplanation:
          'Ma’adim Vallis nehir vadisinin döküldüğü Gusev Krateri’nin antik bir göl olduğu düşünülüyordu; ancak iniş düzlüğünün daha genç olivinli bazalt lavlarıyla örtüldüğü tespit edildi.',
        keyEvents: [
          '10 Haziran 2003: Cape Canaveral’dan Delta II 7925 ile fırlatılış.',
          '4 Ocak 2004: Gusev Krateri tabanına iniş ve ilk Pancam görüntülerinin alınması.',
          'Sol 18: Flash bellek dosya sistemi anomalisinin JPL mühendislerince uzaktan onarılması.',
        ],
        sourceLabel: 'NASA/JPL MER-A Spirit Mission Overview',
        sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
      },
      {
        id: 'spi-stage-2',
        stageNumber: 2,
        phaseCode: 'SURFACE_EARLY',
        phaseLabel: 'AŞAMA 02 · COLUMBIA TEPELERİ VE HUSBAND ZİRVESİ',
        date: 'Nisan 2004 – Eylül 2005',
        sol: 'Sol 100 – Sol 618',
        title: 'Götit Keşfi, Rüzgâr Temizleme Olayı ve Dağ Tırmanışı',
        location: 'West Spur & Husband Tepesi (Columbia Tepeleri)',
        telemetryBadge: 'Zirve Rakımı: +82 m · Götit Minerali Kanıtı',
        imageUrl: '/assets/images/rovers/spirit-deck.jpg',
        imageCaption: 'Spirit Güvertesi Pancam Otoportresi (PIA10128)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Lav düzlüklerini aşarak 2,6 km uzaktaki yaşlı Columbia Tepeleri’ne ulaşan Spirit, Mart 2005’te bir toz şeytanının (dust devil) güneş panellerini temizlemesiyle tam güce kavuştu ve Ağustos 2005’te Husband Tepesi zirvesine tırmandı.',
        scientificExplanation:
          'Clovis ve Humphrey kayalarında Mössbauer spektrometresiyle yalnızca suyun varlığında oluşabilen "götit" (α-FeOOH) minerali ve Comanche çıkıntısında zengin magnezyum-demir karbonatlar keşfedildi.',
        keyEvents: [
          'Sol 215: Clovis kayasında su kanıtı olan götit mineralinin tespiti.',
          'Sol 420 (Mart 2005): Rüzgâr temizleme olayıyla güneş paneli gücünün ikiye katlanması.',
          'Sol 581 (Ağustos 2005): Husband Tepesi zirvesine ulaşan ilk gezegen gezicisi.',
        ],
        sourceLabel: 'NASA/JPL PIA10128 / Morris et al. (2006)',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA10128',
      },
      {
        id: 'spi-stage-3',
        stageNumber: 3,
        phaseCode: 'EXTENDED_OR_END',
        phaseLabel: 'AŞAMA 03 · HOME PLATE SAF SİLİKA KEŞFİ VE SON SİNYAL',
        date: '2006 – 22 Mart 2010',
        sol: 'Sol 744 – Sol 2210',
        title: 'Hidrotermal Silika Yatakları ve Troy Kumulunda Son İletişim',
        location: 'Home Plate Platosu & Troy (Gusev Krateri)',
        telemetryBadge: 'Silika Saflığı: %90 · Toplam Mesafe: 7,73 km',
        imageUrl: '/assets/images/rovers/spirit-deck.jpg',
        imageCaption: 'Home Plate Yakınlarında Spirit Güvertesi (PIA10128)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Sağ ön tekerleğinin arızalanmasıyla geri geri ilerleyen Spirit, tekerleğin kazıdığı toprakta %90 saflıkta beyaz opalin silika ortaya çıkardı. Mayıs 2009’da Troy kumuluna saplandı ve 22 Mart 2010’da (Sol 2210) kış soğuğunda son sinyalini gönderdi.',
        scientificExplanation:
          'Home Plate çevresindeki amorf opalin silika yatakları, geçmişte volkanik sıcak su kaynaklarının (gayzer/fumarol) varlığını kanıtladı; Dünya’da bu tür ortamlar zengin mikrobiyal ekosistemlere ev sahipliği yapar.',
        keyEvents: [
          'Sol 1198 (Mayıs 2007): Gertrude Weise hendeğinde %90 saflıkta opalin silika keşfi.',
          'Sol 1892 (Mayıs 2009): Troy sülfat kumuluna saplanma ve sabit bilim istasyonu evresi.',
          'Sol 2210 (22 Mart 2010): Planlanan 90 Sol’ün 24 katı sonunda alınan son sinyal.',
        ],
        sourceLabel: 'Squyres et al., Science (2008) / PIA09485',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA09485',
      },
    ],
  },
  curiosity: {
    roverId: 'curiosity',
    roverName: 'Curiosity (MSL)',
    missionSubtitle: '26 Kasım 2011 – Günümüz · 4.300+ Sol · Gale Krateri & Sharp Dağı',
    disclaimer:
      'Metodoloji Notu: Bu modül gerçek zamanlı bir fizik simülasyonu değildir; NASA/JPL uçuş kayıtlarına dayanan tarihsel görev olaylarının kronolojik ve etkileşimli anlatımıdır.',
    stages: [
      {
        id: 'cur-stage-1',
        stageNumber: 1,
        phaseCode: 'EDL',
        phaseLabel: 'AŞAMA 01 · SKY CRANE (GÖKYÜZÜ VİNÇ) İLE GALE KRATERİ İNİŞİ',
        date: '26 Kasım 2011 – 6 Ağustos 2012',
        sol: 'Fırlatma → Sol 0',
        title: '900 kg’lık Nükleer Laboratuvarın Gökyüzü Vinç İnişi',
        location: 'Bradbury Landing · Gale Krateri (4.5895°G, 137.4417°D)',
        telemetryBadge: 'Kütle: 899 kg · İniş Tarihi: 6 Ağustos 2012 (05:17 UTC)',
        imageUrl: '/assets/images/rovers/curiosity.jpg',
        imageCaption: 'Curiosity MAHLI Otoportresi (PIA19807)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Hava yastıklarıyla indirilemeyecek kadar ağır olan 899 kg’lık Curiosity, 6 Ağustos 2012’de süpersonik paraşüt ve 8 roket motorlu Sky Crane (Gökyüzü Vinç) sistemiyle 7,5 metrelik naylon kablolarla Gale Krateri tabanına tekerlekleri üzerine indirildi.',
        scientificExplanation:
          'Güdümlü atmosferik giriş ve Sky Crane teknolojisi, iniş elipsini 20×7 km’ye küçülterek 5,5 km yüksekliğindeki katmanlı Sharp Dağı’nın hemen eteğine güvenli iniş sağladı.',
        keyEvents: [
          '26 Kasım 2011: Atlas V 541 roketiyle Cape Canaveral’dan fırlatılış.',
          '6 Ağustos 2012: Sky Crane manevrasının ilk kez Mars’ta kusursuz uygulanması.',
          'Sol 182 (Şubat 2013): Yellowknife Bay "John Klein" kayasında Mars’taki ilk derin sondaj.',
        ],
        sourceLabel: 'NASA/JPL MSL Landing Press Kit / PIA19807',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19807',
      },
      {
        id: 'cur-stage-2',
        stageNumber: 2,
        phaseCode: 'PRIME_DISCOVERY',
        phaseLabel: 'AŞAMA 02 · ANTİK GÖL YAŞANABİLİRLİĞİ VE ORGANİK MOLEKÜLLER',
        date: '2013 – 2018',
        sol: 'Sol 182 – Sol 2075',
        title: 'Yellowknife Bay Göl Yatağı, Organik Karbon ve Metan Döngüsü',
        location: 'Yellowknife Bay → Pahrump Hills → Vera Rubin Sırtı',
        telemetryBadge: 'Sondaj: 40+ Kaya · Yaşanabilirlik Doğrulandı',
        imageUrl: '/assets/images/rovers/curiosity-mount-sharp.jpg',
        imageCaption: 'Mastcam 100 mm ile Sharp Dağı Katmanları (PIA19912)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Yellowknife Bay çamurtaşlarını CheMin ve SAM laboratuvarlarında inceleyen Curiosity, Gale Krateri’nin milyarlarca yıl önce tatlı ve nötr pH’lı bir göl olduğunu kanıtladı. 2014’te Sharp Dağı eteklerine ulaştı ve 2018’de 3,5 milyar yıllık kayalarda karmaşık organik moleküller buldu.',
        scientificExplanation:
          'SAM kütle spektrometresi çamurtaşlarında tiyofenik ve aromatik organik karbon zincirleri tespit etti; TLS lazer spektrometresi ise atmosferik metanın (~0,4 ppb) yaz aylarında mevsimsel olarak yükseldiğini belgeledi.',
        keyEvents: [
          'Mart 2013: CHNOPS elementleri ve nötr su izleriyle antik yaşanabilirlik kanıtı.',
          'Eylül 2014 (Sol 753): Sharp Dağı taban katmanlarına (Pahrump Hills) varış.',
          'Haziran 2018: Antik organik moleküllerin ve mevsimsel metan döngüsünün keşfi.',
        ],
        sourceLabel: 'Grotzinger et al. (2014) / Eigenbrode et al. (2018) / PIA19912',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA19912',
      },
      {
        id: 'cur-stage-3',
        stageNumber: 3,
        phaseCode: 'EXTENDED_OR_END',
        phaseLabel: 'AŞAMA 03 · KİL-SÜLFAT GEÇİŞİ VE GEDİZ VALLİS SAF KÜKÜRT KEŞFİ',
        date: '2019 – Günümüz (Aktif Görev)',
        sol: 'Sol 2300 – Sol 4300+',
        title: 'Sharp Dağı Tırmanışı ve Mars’ta İlk Saf Kükürt Kristalleri',
        location: 'Glen Torridon → Sülfat Kuşağı → Gediz Vallis Kanalı',
        telemetryBadge: 'Tırmanış: +780 m · Mesafe: 32+ km (Aktif)',
        imageUrl: '/assets/images/rovers/curiosity.jpg',
        imageCaption: 'Curiosity Gale Krateri Yüzey Operasyonu (PIA19807)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Kil mineralince zengin Glen Torridon vadisinden daha kurak dönemi temsil eden Sülfat Kuşağı’na tırmanan Curiosity, Mayıs 2024’te (Sol 4199) Gediz Vallis kanalında tekerleğinin ezdiği bir kayanın içinde parlak sarı saf kükürt kristalleri ortaya çıkardı.',
        scientificExplanation:
          'Daha önce sülfat tuzları yaygın olarak bilinse de, Mars’ta ilk kez saf elementel kükürt (S₈) bulunması Gediz Vallis’teki antik su ve jeokimyasal süreçler hakkında yepyeni sorular doğurdu.',
        keyEvents: [
          '2019–2021: Glen Torridon kil biriminde yoğun sondaj kampanyası.',
          '2022–2023: Islak kil döneminden kurak sülfat dönemine geçiş kuşağının haritalanması.',
          'Mayıs 2024 (Sol 4199): Gediz Vallis’te saf elementel sarı kükürt kristallerinin keşfi.',
        ],
        sourceLabel: 'NASA/JPL PIA26356 · Elemental Sulfur Discovery',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26356',
      },
    ],
  },
  perseverance: {
    roverId: 'perseverance',
    roverName: 'Perseverance (Mars 2020)',
    missionSubtitle: '30 Temmuz 2020 – Günümüz · 1.300+ Sol · Jezero Krateri & Nehir Deltası',
    disclaimer:
      'Metodoloji Notu: Bu modül gerçek zamanlı bir fizik simülasyonu değildir; NASA/JPL uçuş kayıtlarına dayanan tarihsel görev olaylarının kronolojik ve etkileşimli anlatımıdır.',
    stages: [
      {
        id: 'per-stage-1',
        stageNumber: 1,
        phaseCode: 'EDL',
        phaseLabel: 'AŞAMA 01 · TRN GÜDÜMLÜ İNİŞ, INGENUITY UÇUŞU VE MOXIE OKSİJENİ',
        date: '30 Temmuz 2020 – Nisan 2021',
        sol: 'Fırlatma → Sol 60',
        title: 'Jezero Krateri İnişi, İlk Helikopter Uçuşu ve Oksijen Üretimi',
        location: 'Octavia E. Butler Landing · Jezero Krateri (18.4447°K, 77.4508°D)',
        telemetryBadge: 'Kütle: 1.025 kg · Ingenuity: 72 Uçuş · MOXIE: 122 g O₂',
        imageUrl: '/assets/images/rovers/perseverance-ingenuity.jpg',
        imageCaption: 'Perseverance ve Ingenuity Mars Helikopteri (PIA24542)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          '18 Şubat 2021’de Araziye Göre Navigasyon (TRN) sistemiyle Jezero Krateri’ne inen Perseverance, 19 Nisan 2021’de Ingenuity helikopterinin başka bir gezegendeki ilk motorlu uçuşuna tanıklık etti ve ertesi gün MOXIE ile Mars CO₂ atmosferinden ilk solunabilir oksijeni üretti.',
        scientificExplanation:
          'TRN sistemi alçalma sırasında yüzey fotoğraflarını yerleşik haritayla anlık karşılaştırarak dik yamaçlardan kaçındı. Ingenuity %1 yoğunluktaki ince Mars atmosferinde 2.400 devir/dakika dönen karbon fiber rotorlarıyla 72 uçuş tamamladı.',
        keyEvents: [
          '18 Şubat 2021: TRN ve Sky Crane ile Jezero Krateri’ne nokta atışı iniş.',
          '19 Nisan 2021 (Sol 58): Ingenuity Mars Helikopteri’nin tarihi ilk uçuşu.',
          '20 Nisan 2021 (Sol 59): MOXIE cihazıyla Mars atmosferinden ilk saf oksijen üretimi.',
        ],
        sourceLabel: 'NASA/JPL PIA24542 · Perseverance & Ingenuity',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24542',
      },
      {
        id: 'per-stage-2',
        stageNumber: 2,
        phaseCode: 'PRIME_DISCOVERY',
        phaseLabel: 'AŞAMA 02 · İLK KAYA KAROTLARI VE THREE FORKS ÖRNEK DEPOSU',
        date: 'Eylül 2021 – Ocak 2023',
        sol: 'Sol 194 – Sol 690',
        title: 'Rochette Kayası Karotu ve Başka Bir Gezegendeki İlk Örnek Deposu',
        location: 'Citadelle → Three Forks → Jezero Nehir Deltası',
        telemetryBadge: 'Mühürlenen Tüp: 25+ · Three Forks Deposu: 10 Tüp',
        imageUrl: '/assets/images/rovers/perseverance.jpg',
        imageCaption: 'Perseverance Rochette Kayası Yanında Otoportre (PIA24836)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          '6 Eylül 2021’de "Rochette" kayasından ilk karot örneğini ("Montdenier") sızdırmaz titanyum tüpe mühürleyen Perseverance, Ocak 2023’te Three Forks düzlüğünde 10 yedek örnek tüpünü yüzeye bırakarak insanlığın başka bir gezegendeki ilk örnek deposunu kurdu.',
        scientificExplanation:
          'PIXL ve SHERLOC analizleri, Jezero Krateri tabanının yavaş soğumuş olivince zengin magmatik kümülat kayaçlardan oluştuğunu ve sonradan tuzlu göl sularıyla etkileşime girerek karbonat ve sülfat mineralleri barındırdığını ortaya koydu.',
        keyEvents: [
          '6 Eylül 2021 (Sol 194): İlk kaya karotu "Montdenier"in titanyum tüpte mühürlenmesi.',
          'Nisan 2022: AutoNav otonom sürüşüyle antik Jezero nehir deltası cephesine varış.',
          'Ocak 2023 (Sol 690): Three Forks’ta 10 tüplü yedek örnek deposunun tamamlanması.',
        ],
        sourceLabel: 'NASA/JPL PIA24836 & PIA25663',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA24836',
      },
      {
        id: 'per-stage-3',
        stageNumber: 3,
        phaseCode: 'EXTENDED_OR_END',
        phaseLabel: 'AŞAMA 03 · NERETVA VALLIS VE CHEYAVA FALLS "LEOPAR BENEKLERİ"',
        date: '2024 – Günümüz (Aktif Görev)',
        sol: 'Sol 1100 – Sol 1300+',
        title: 'Cheyava Falls Kayası: Organik Karbon ve Olası Biyo-İmza Halkaları',
        location: 'Neretva Vallis Nehir Kanalı · Jezero Krateri Batı Kenarı',
        telemetryBadge: '22. Kaya Karotu: "Sapphire Canyon" (Temmuz 2024)',
        imageUrl: '/assets/images/rovers/perseverance.jpg',
        imageCaption: 'Perseverance Astrobiyoloji Örnekleme Operasyonu (PIA24836)',
        imageKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
        narrative:
          'Temmuz 2024’te (Sol 1215) Jezero Krateri’ni besleyen antik nehir kanalı Neretva Vallis’i inceleyen Perseverance, "Cheyava Falls" adlı kayada şimdiye kadarki en dikkat çekici astrobiyolojik bulgusuna ulaştı ve "Sapphire Canyon" karotunu mühürledi.',
        scientificExplanation:
          'SHERLOC cihazının organik bileşikler tespit ettiği kızıl kayanın üzerinde, PIXL cihazıyla demir ve fosfatça zengin siyah halkalarla çevrili milimetrik beyaz "leopar benekleri" bulundu. Dünya’daki tortul kayaçlarda bu tür indirgenme reaksiyon halkaları sıklıkla yeraltı mikroplarının enerji üretimiyle oluşur; kesin doğrulama için örneğin Dünya’ya getirilmesi hedeflenmektedir.',
        keyEvents: [
          'Temmuz 2024 (Sol 1215): Cheyava Falls kayasında organik karbon ve leopar benekli reaksiyon halkalarının keşfi.',
          'Ağustos 2024: Jezero Krateri’nin 300 metre yüksekliğindeki batı kenarına (Crater Rim) tırmanışın başlaması.',
        ],
        sourceLabel: 'NASA/JPL PIA26368 · Cheyava Falls Discovery',
        sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA26368',
      },
    ],
  },
};
