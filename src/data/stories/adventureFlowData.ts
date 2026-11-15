import type { ExplorerStoryId } from '@/types';

export interface RobotPartInfo {
  id: string;
  position: [number, number, number];
  nameTr: string;
  nameEn: string;
  roleTr: string;
  roleEn: string;
  detailTr: string;
  detailEn: string;
}

export interface PrepQuestion {
  id: string;
  promptTr: string;
  promptEn: string;
  options: { id: 'a' | 'b' | 'c'; textTr: string; textEn: string }[];
  correctId: 'a' | 'b' | 'c';
  explainCorrectTr: string;
  explainCorrectEn: string;
  explainWrongTr: string;
  explainWrongEn: string;
}

export interface AdventureFlowConfig {
  id: ExplorerStoryId;
  controlMode: 'drive' | 'flight';
  prepObjectiveTr: string;
  prepObjectiveEn: string;
  prepControlsTr: string;
  prepControlsEn: string;
  robotParts: RobotPartInfo[];
  prepQuestions: PrepQuestion[];
}

export const ADVENTURE_FLOW_DATA: Record<ExplorerStoryId, AdventureFlowConfig> = {
  sojourner: {
    id: 'sojourner',
    controlMode: 'drive',
    prepObjectiveTr:
      'Ares Vallis ovasında Sojourner’ı sür, Barnacle Bill, Yogi ve Scooby-Doo hedeflerine ulaşarak APXS analizlerini tamamla.',
    prepObjectiveEn:
      'Drive Sojourner across Ares Vallis, reach Barnacle Bill, Yogi, and Scooby-Doo, and complete APXS rock analyses.',
    prepControlsTr:
      'Klavyeden W/A/S/D veya Yön Tuşlarını ya da ekrandaki dokunmatik yön pedini kullanarak aracı sür; kayalara tıklayarak hedef seç.',
    prepControlsEn:
      'Use W/A/S/D or Arrow keys, or the on-screen touch D-pad to drive; click rocks to inspect targets.',
    robotParts: [
      {
        id: 'wheels',
        position: [-0.55, 0.18, 0.45],
        nameTr: '6 Tekerlekli Rocker-Bogie Süspansiyon',
        nameEn: '6-Wheel Rocker-Bogie Suspension',
        roleTr: 'Hareket Sistemi',
        roleEn: 'Mobility System',
        detailTr:
          'Her tekerlek bağımsız motora sahiptir. Bu özel süspansiyon, kendi boyunun 1,5 katı kadar taşların üzerinden devrilmeden tırmanmasını sağlar.',
        detailEn:
          'Each wheel has its own motor. The rocker-bogie suspension lets Sojourner climb over rocks up to 1.5x its wheel diameter without tipping.',
      },
      {
        id: 'apxs',
        position: [0, 0.3, -0.66],
        nameTr: 'APXS Spektrometresi',
        nameEn: 'APXS Spectrometer',
        roleTr: 'Bilimsel Analiz Cihazı',
        roleEn: 'Science Instrument',
        detailTr:
          'Aracın arkasındaki bu sensör kayalara yaslanır ve alfa parçacıkları göndererek kayadaki silika, demir ve diğer elementleri ölçer.',
        detailEn:
          'Mounted at the rear, this sensor presses against rocks and uses alpha particles to measure silica, iron, and elemental makeup.',
      },
      {
        id: 'cameras',
        position: [0, 0.4, 0.56],
        nameTr: 'Stereo Ön & Arka Kameralar',
        nameEn: 'Stereo Front & Rear Cameras',
        roleTr: 'Görüntüleme ve Engel Algılama',
        roleEn: 'Imaging & Hazard Sensing',
        detailTr:
          'Öndeki iki siyah-beyaz kamera derinlik algılayarak engelleri seçer; arkadaki renkli kamera ise APXS hedeflerini yakından görüntüler.',
        detailEn:
          'Twin front monochrome cameras perceive depth to spot hazards, while the rear color camera documents APXS rock targets.',
      },
      {
        id: 'antenna',
        position: [0.3, 0.62, -0.3],
        nameTr: 'UHF Anten ve İletişim Sistemi',
        nameEn: 'UHF Antenna & Comms',
        roleTr: 'Veri Aktarımı',
        roleEn: 'Data Relay',
        detailTr:
          'Sojourner verileri doğrudan Dünya’ya değil, yakındaki Pathfinder iniş istasyonuna UHF radyo sinyaliyle iletir; istasyon da Dünya’ya yollar.',
        detailEn:
          'Sojourner relays data via UHF radio to the nearby Pathfinder lander, which then transmits it back to Earth.',
      },
      {
        id: 'solar',
        position: [0, 0.52, 0],
        nameTr: 'Güneş Paneli ve Isı Korumalı Kutu',
        nameEn: 'Solar Panel & Warm Electronics Box',
        roleTr: 'Enerji Sistemi',
        roleEn: 'Power System',
        detailTr:
          'Üstteki 0,22 m² güneş paneli gündüzleri güç üretir; altın yalıtımlı gövde ise -100°C’ye düşen Mars gecelerinde elektronikleri korur.',
        detailEn:
          'The top solar array powers daytime driving while the insulated Warm Electronics Box protects circuits through -100°C Martian nights.',
      },
    ],
    prepQuestions: [
      {
        id: 'soj-q1',
        promptTr: 'Sojourner kayaların kimyasal yapısını ölçmek için hangi cihazını kullanır?',
        promptEn: 'Which instrument does Sojourner use to measure a rock’s chemical composition?',
        options: [
          { id: 'a', textTr: 'APXS Spektrometresi', textEn: 'APXS Spectrometer' },
          { id: 'b', textTr: 'Paraşüt', textEn: 'Parachute' },
          { id: 'c', textTr: 'İniş Hava Yastığı', textEn: 'Landing Airbag' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Doğru! APXS cihazı kayalara temas ederek element oranlarını okur.',
        explainCorrectEn: 'Correct! The APXS touches rocks to read their elemental composition.',
        explainWrongTr: 'Tekrar dene: Paraşüt ve hava yastığı iniş içindir; kaya analizi APXS ile yapılır.',
        explainWrongEn: 'Try again: Parachutes and airbags are for landing; APXS performs rock analysis.',
      },
      {
        id: 'soj-q2',
        promptTr: 'Sojourner topladığı verileri Dünya’ya nasıl ulaştırıyordu?',
        promptEn: 'How did Sojourner send its data back to Earth?',
        options: [
          { id: 'a', textTr: 'Pathfinder iniş istasyonuna UHF ile aktararak', textEn: 'Via UHF link to the Pathfinder lander' },
          { id: 'b', textTr: 'Kablo çekerek', textEn: 'Through a physical cable' },
          { id: 'c', textTr: 'Sadece ses dalgalarıyla', textEn: 'Using sound waves only' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Harika! Pathfinder istasyonu Sojourner için Dünya ile köprü görevi gördü.',
        explainCorrectEn: 'Great! The Pathfinder lander acted as Sojourner’s communications relay to Earth.',
        explainWrongTr: 'İpucu: Küçük rover UHF anteniyle veriyi Pathfinder istasyonuna gönderiyordu.',
        explainWrongEn: 'Hint: The small rover used a UHF antenna to relay data through Pathfinder.',
      },
    ],
  },
  ingenuity: {
    id: 'ingenuity',
    controlMode: 'flight',
    prepObjectiveTr:
      'Wright Kardeşler Sahası’ndan kalkış yap, en az 3.0 metre irtifaya yüksel ve güvenli iniş gerçekleştir.',
    prepObjectiveEn:
      'Take off from Wright Brothers Field, climb to at least 3.0 meters altitude, and land safely.',
    prepControlsTr:
      'Uçuş panelindeki Kalkış, Yüksel, Alçal ve İniş düğmelerini kullanarak irtifa ve uçuş süresini yönet.',
    prepControlsEn:
      'Use the Takeoff, Ascend, Descend, and Land buttons on the flight deck to manage altitude and flight time.',
    robotParts: [
      {
        id: 'rotors',
        position: [0, 0.88, 0],
        nameTr: 'Koaksiyel Karbon-Fiber Pervaneler',
        nameEn: 'Coaxial Carbon-Fiber Rotors',
        roleTr: 'Kaldırma Sistemi',
        roleEn: 'Lift System',
        detailTr:
          'Zıt yönde dönen 1,2 metrelik iki pervane, Dünya’nın %1’i yoğunluktaki Mars havasında tutunmak için dakikada ~2.500 devir döner.',
        detailEn:
          'Counter-rotating 1.2 m blades spin at ~2,500 RPM to generate lift in Mars’s 1%-density atmosphere.',
      },
      {
        id: 'solar-top',
        position: [0, 0.98, 0],
        nameTr: 'Tepe Güneş Paneli',
        nameEn: 'Top Solar Panel',
        roleTr: 'Enerji Kaynağı',
        roleEn: 'Power Source',
        detailTr:
          'Uçuşlar arasında lityum-iyon pilleri şarj ederek helikopterin otonom uçuşları ve gece ısıtıcılarını besler.',
        detailEn:
          'Recharges the lithium-ion batteries between flights to power autonomous hops and night heaters.',
      },
      {
        id: 'fuselage',
        position: [0, 0.42, 0],
        nameTr: 'Yalıtımlı Gövde Kutusu',
        nameEn: 'Insulated Avionics Box',
        roleTr: 'Bilgisayar ve Piller',
        roleEn: 'Flight Computer & Batteries',
        detailTr:
          'Uçuş bilgisayarı, sensörler ve piller bu hafif yalıtımlı gövde içinde dondurucu Jezero gecelerinden korunur.',
        detailEn:
          'Houses the flight computer, sensors, and batteries, shielding them from freezing Jezero nights.',
      },
      {
        id: 'legs',
        position: [0.25, 0.18, 0.25],
        nameTr: '4 Karbon-Fiber İniş Ayağı',
        nameEn: '4 Carbon-Fiber Landing Legs',
        roleTr: 'İniş Takımı',
        roleEn: 'Landing Gear',
        detailTr:
          'Esnek ve ultra hafif ayaklar, sadece 1,8 kg ağırlığındaki helikopterin engebeli Mars zeminine yumuşak inmesini sağlar.',
        detailEn:
          'Flexible ultra-light legs absorb touchdown shock for the 1.8 kg helicopter on uneven Martian ground.',
      },
      {
        id: 'navcam',
        position: [0, 0.3, 0.15],
        nameTr: 'Seyrüsefer Kamerası ve Altimetre',
        nameEn: 'Nav Camera & Laser Altimeter',
        roleTr: 'Otonom Konumlandırma',
        roleEn: 'Autonomous Navigation',
        detailTr:
          'Sinyaller Dünya’ya dakikalarca geç ulaştığı için Ingenuity yere bakan kamerası ve lazer altimetresiyle kendi dengesini kurar.',
        detailEn:
          'Because signals take minutes to reach Earth, Ingenuity uses a downward camera and laser altimeter to fly autonomously.',
      },
    ],
    prepQuestions: [
      {
        id: 'ing-q1',
        promptTr: 'Mars atmosferi Dünya’nın yaklaşık %1’i yoğunlukta olduğu için Ingenuity’nin pervaneleri nasıl çalışır?',
        promptEn: 'Since Mars’s atmosphere is ~1% as dense as Earth’s, how do Ingenuity’s rotors compensate?',
        options: [
          { id: 'a', textTr: 'Geniş kanatlarla çok yüksek devirde (~2.500 RPM) dönerek', textEn: 'With wide blades spinning at very high RPM (~2,500 RPM)' },
          { id: 'b', textTr: 'Yakıt yakıp jet motoru çalıştırarak', textEn: 'By firing jet fuel' },
          { id: 'c', textTr: 'Hiç dönmeden süzülerek', textEn: 'By gliding without spinning' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Doğru! İnce havada kaldırma kuvveti üretmek için geniş ve çok hızlı dönen kanatlar gerekir.',
        explainCorrectEn: 'Correct! Wide blades spinning extremely fast are needed to generate lift in thin air.',
        explainWrongTr: 'İpucu: Ingenuity elektrikli bir helikopterdir; ince havayı yakalamak için yüksek devir kullanır.',
        explainWrongEn: 'Hint: Ingenuity is an electric helicopter using high rotor speed to catch thin air.',
      },
      {
        id: 'ing-q2',
        promptTr: 'Bu 3D uçuş simülasyonu neyi öğretmek için tasarlanmıştır?',
        promptEn: 'What is this 3D flight simulation designed to teach?',
        options: [
          { id: 'a', textTr: 'Basitleştirilmiş eğitim modeliyle irtifa, atmosfer ve rotor mantığını', textEn: 'Altitude, thin atmosphere, and rotor concepts via a simplified educational model' },
          { id: 'b', textTr: 'Gerçek savaş uçağı aerodinamiğini', textEn: 'Fighter jet aerodynamics' },
          { id: 'c', textTr: 'Denizaltı dalış fiziğini', textEn: 'Submarine diving physics' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Kesinlikle! Gerçek uçuş fiziği yerine temel kavramları anlaşılır şekilde gösterir.',
        explainCorrectEn: 'Exactly! It teaches the core concepts clearly using a simplified educational model.',
        explainWrongTr: 'Tekrar dene: Bu sahne Mars atmosferi ve uçuş mantığını öğreten basitleştirilmiş bir simülasyondur.',
        explainWrongEn: 'Try again: This stage is a simplified educational simulation of Mars flight concepts.',
      },
    ],
  },
  opportunity: {
    id: 'opportunity',
    controlMode: 'drive',
    prepObjectiveTr:
      'Meridiani Planum’da 3 jeolojik su kanıtını (Hematit, Katmanlı Kaya, Sülfat Tuzları) topla ve bilimsel çıkarım sorusunu çöz.',
    prepObjectiveEn:
      'Collect 3 geological water clues in Meridiani Planum (Hematite, Layered Rock, Sulfate Salts) and solve the science inference.',
    prepControlsTr:
      'W/A/S/D, Yön Tuşları veya dokunmatik pedle sürüş yap; parlayan jeolojik örneklere yaklaş veya tıkla.',
    prepControlsEn:
      'Drive using W/A/S/D, Arrow keys, or the touch D-pad; approach or click the glowing geological clues.',
    robotParts: [
      {
        id: 'solar-wings',
        position: [0, 0.66, -0.1],
        nameTr: 'Güneş Kanatları',
        nameEn: 'Solar Array Wings',
        roleTr: 'Uzun Ömürlü Enerji',
        roleEn: 'Long-Life Power',
        detailTr:
          'Mars rüzgârlarının panellerdeki tozu temizlemesi sayesinde Opportunity 90 günlük planı aşıp 14 yılı aşkın süre çalıştı.',
        detailEn:
          'Martian wind gusts cleared dust from these wings, helping Opportunity operate for over 14 years instead of 90 days.',
      },
      {
        id: 'pancam',
        position: [0, 1.32, 0.35],
        nameTr: 'Pancam ve Mini-TES Direği',
        nameEn: 'Pancam & Mini-TES Mast',
        roleTr: 'Panoramik Gözlem',
        roleEn: 'Panoramic Vision',
        detailTr:
          'İnsan gözü yüksekliğindeki bu direk, yüksek çözünürlüklü panoramalar çeker ve uzaktaki mineralleri kızılötesiyle tarar.',
        detailEn:
          'Standing at human eye level, this mast captures panoramas and scans distant minerals with infrared light.',
      },
      {
        id: 'idd-arm',
        position: [0, 0.38, 0.72],
        nameTr: 'Robotik Kol ve Kaya Öğütücü (RAT)',
        nameEn: 'Robotic Arm & Rock Abrasion Tool',
        roleTr: 'Yakın Temas Analizi',
        roleEn: 'Close-Up Sampling',
        detailTr:
          'Kayaların tozlu dış kabuğunu kazıyarak içindeki taze mineral katmanlarını mikroskop ve spektrometrelere sunar.',
        detailEn:
          'Grinds away weathered dust coatings to expose fresh rock interiors for microscopic and chemical inspection.',
      },
      {
        id: 'spectrometers',
        position: [0, 0.45, 0],
        nameTr: 'Mössbauer & APXS Spektrometreleri',
        nameEn: 'Mössbauer & APXS Spectrometers',
        roleTr: 'Mineral ve Demir Analizi',
        roleEn: 'Mineral & Iron Analysis',
        detailTr:
          'Hematit “yaban mersinleri” ve jarosit gibi suyla oluşan demir-sülfat minerallerini kesin olarak tanımladı.',
        detailEn:
          'Confirmed water-formed iron-bearing minerals such as hematite “blueberries” and jarosite.',
      },
      {
        id: 'wheels-opp',
        position: [-0.65, 0.2, 0.55],
        nameTr: '6 Tekerlekli Arazi Şasisi',
        nameEn: '6-Wheel Off-Road Chassis',
        roleTr: '45,16 km Maraton Sürüşü',
        roleEn: '45.16 km Marathon Drive',
        detailTr:
          'Opportunity bu tekerleklerle Mars yüzeyinde 45,16 km yol katederek Dünya dışı en uzun sürüş rekorunu kırdı.',
        detailEn:
          'Carried Opportunity 45.16 km across Mars — setting an off-world driving distance record.',
      },
    ],
    prepQuestions: [
      {
        id: 'opp-q1',
        promptTr: 'Meridiani Planum’daki hematit “yaban mersinleri” ve sülfat tuzları neyi kanıtlar?',
        promptEn: 'What do hematite “blueberries” and sulfate salts in Meridiani Planum prove?',
        options: [
          { id: 'a', textTr: 'Geçmişte bölgede sıvı suyun bulunduğunu', textEn: 'Liquid water once existed in the region' },
          { id: 'b', textTr: 'Mars’ta meyve yetiştiğini', textEn: 'Fruit grows on Mars' },
          { id: 'c', textTr: 'Yüzeyin tamamen plastik olduğunu', textEn: 'The surface is made of plastic' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Doğru! Bu mineraller sıvı suyun kayalarla etkileşimi sonucu oluşur.',
        explainCorrectEn: 'Correct! These minerals form when liquid water interacts with rock.',
        explainWrongTr: 'İpucu: “Yaban mersini” yalnızca benzetmedir; aslında suyla oluşan demir-oksit kürecikleridir.',
        explainWrongEn: 'Hint: “Blueberries” is just a nickname for water-formed iron-oxide spheres.',
      },
      {
        id: 'opp-q2',
        promptTr: 'Sıvı su kanıtı tek başına Mars’ta canlı yaşam olduğunu kanıtlar mı?',
        promptEn: 'Does evidence of ancient liquid water alone prove living organisms existed on Mars?',
        options: [
          { id: 'a', textTr: 'Hayır, yaşanabilir ortamı gösterir; doğrudan yaşamı değil', textEn: 'No, it proves habitability, not direct life' },
          { id: 'b', textTr: 'Evet, su varsa kesin canlı vardır', textEn: 'Yes, water automatically proves life' },
          { id: 'c', textTr: 'Su Mars için önemsizdir', textEn: 'Water is irrelevant on Mars' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Harika bilimsel düşünce! Yaşam için fosil veya biyolojik izler gibi ek kanıtlar gerekir.',
        explainCorrectEn: 'Great scientific thinking! Proving life requires biosignatures beyond water alone.',
        explainWrongTr: 'Dikkat: Su yaşam için gerekli bir koşuldur ama tek başına canlılığı kanıtlamaz.',
        explainWrongEn: 'Careful: Liquid water supports habitability, but does not prove life on its own.',
      },
    ],
  },
  'apollo-lrv': {
    id: 'apollo-lrv',
    controlMode: 'drive',
    prepObjectiveTr:
      'Ay yüzeyindeki kraterlerden kaçınarak bataryanı koru ve 3 Apollo istasyonuna ulaş.',
    prepObjectiveEn:
      'Avoid lunar craters to conserve battery and reach all 3 Apollo exploration stations.',
    prepControlsTr:
      'W/A/S/D, Yön Tuşları veya dokunmatik pedle elektrikli LRV’yi sür; istasyon halkalarına ulaş.',
    prepControlsEn:
      'Steer the electric LRV with W/A/S/D, Arrow keys, or the touch D-pad to reach all station rings.',
    robotParts: [
      {
        id: 'mesh-wheels',
        position: [-0.68, 0.22, 0.72],
        nameTr: 'Tel Örgü Tekerlekler',
        nameEn: 'Wire-Mesh Wheels',
        roleTr: 'Ay Regoliti Tutuşu',
        roleEn: 'Lunar Regolith Traction',
        detailTr:
          'Hava basıncı Ay vakumunda sorun çıkaracağı için kauçuk yerine titanyum şeritli esnek çinko-kaplı tel örgü tekerlekler kullanıldı.',
        detailEn:
          'Instead of air-filled rubber tires, flexible zinc-coated piano-wire mesh wheels gripped loose lunar regolith.',
      },
      {
        id: 'batteries',
        position: [0, 0.34, 0.45],
        nameTr: 'İki Adet 36V Gümüş-Çinko Batarya',
        nameEn: 'Dual 36V Silver-Zinc Batteries',
        roleTr: 'Elektrikli Tahrik Gücü',
        roleEn: 'Electric Drive Power',
        detailTr:
          'Ay’da oksijen olmadığı için benzinli motor çalışmaz; LRV tamamen elektrikli motorlarla sessizce ilerler.',
        detailEn:
          'With no oxygen on the Moon for combustion, the LRV drove silently on dual 36-volt electric batteries.',
      },
      {
        id: 'high-gain',
        position: [0, 0.92, 0.62],
        nameTr: 'Yüksek Kazançlı Çanak Anten',
        nameEn: 'High-Gain Dish Antenna',
        roleTr: 'Canlı TV ve Ses Yayını',
        roleEn: 'Live TV & Voice Link',
        detailTr:
          'Dünya’ya doğrudan canlı televizyon görüntüsü ve astronotların telsiz seslerini ileten altın renkli şemsiye anten.',
        detailEn:
          'Gold mesh umbrella dish that beamed live TV footage and astronaut communications straight to Earth.',
      },
      {
        id: 'seats',
        position: [0, 0.58, -0.1],
        nameTr: 'Astronot Koltukları ve T-Kol Kontrolü',
        nameEn: 'Astronaut Seats & T-Handle Controller',
        roleTr: 'Sürüş Kokpiti',
        roleEn: 'Crew Cockpit',
        detailTr:
          'Kalın uzay eldivenleriyle kolay kullanılabilmesi için direksiyon yerine ortada tek bir T-şekilli kumanda kolu bulunuyordu.',
        detailEn:
          'A single center T-handle replaced a steering wheel so astronauts could drive easily in pressurized gloves.',
      },
      {
        id: 'chassis',
        position: [0, 0.34, -0.55],
        nameTr: 'Katlanabilir Alüminyum Şasi & Örnek Rafı',
        nameEn: 'Foldable Aluminum Frame & Sample Rack',
        roleTr: 'Taşıma Kapasitesi',
        roleEn: 'Cargo & Sample Capacity',
        detailTr:
          'Ay Modülü’nün yan bölmesine katlanarak sığan araç, kendi ağırlığının iki katından fazla astronot ve Ay kayası taşıyabildi.',
        detailEn:
          'Folded neatly into the Lunar Module side bay, yet carried more than twice its own weight in crew and Moon rocks.',
      },
    ],
    prepQuestions: [
      {
        id: 'lrv-q1',
        promptTr: 'Apollo Ay aracı neden benzinli değil elektrikli motorla çalışıyordu?',
        promptEn: 'Why did the Apollo LRV use electric motors instead of gasoline engines?',
        options: [
          { id: 'a', textTr: 'Ay’da yanma için gereken atmosfer ve oksijen olmadığı için', textEn: 'Because the Moon has no atmosphere or oxygen for combustion' },
          { id: 'b', textTr: 'Ay’da benzin istasyonu pahalı olduğu için', textEn: 'Because gas stations were expensive' },
          { id: 'c', textTr: 'Sadece gece kullanıldığı için', textEn: 'Because it only drove at night' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Doğru! Elektrikli tahrik vakum ortamında güvenle çalışır.',
        explainCorrectEn: 'Correct! Electric drive works reliably in the airless lunar vacuum.',
        explainWrongTr: 'İpucu: Benzinli motorların çalışması için oksijen gerekir; Ay’da atmosfer yoktur.',
        explainWrongEn: 'Hint: Combustion engines require oxygen, which does not exist in the Moon’s vacuum.',
      },
      {
        id: 'lrv-q2',
        promptTr: 'Apollo 15, 16 ve 17 görevlerinde LRV kullanımı astronotlara ne kazandırdı?',
        promptEn: 'What did the LRV allow astronauts to achieve during Apollo 15, 16, and 17?',
        options: [
          { id: 'a', textTr: 'Yürüyerek ulaşamayacakları uzak bölgelere gidip toplam ~90+ km yol katetmeyi', textEn: 'Exploring far beyond walking range, covering ~90+ km across the three missions' },
          { id: 'b', textTr: 'Ay yörüngesine uçmayı', textEn: 'Flying back into lunar orbit' },
          { id: 'c', textTr: 'Mars’a inmeyi', textEn: 'Landing on Mars' },
        ],
        correctId: 'a',
        explainCorrectTr: 'Harika! LRV sayesinde çok daha çeşitli jeolojik bölgelerden Ay örnekleri toplandı.',
        explainCorrectEn: 'Great! The LRV multiplied scientific reach and sample diversity.',
        explainWrongTr: 'Tekrar dene: LRV menzili yürüme sınırının çok ötesine taşıdı.',
        explainWrongEn: 'Try again: The LRV extended surface range far beyond walking distance.',
      },
    ],
  },
};
