import type { ExplorerStoryId } from '@/types';

export interface OfficialSourceLink {
  titleTr: string;
  titleEn: string;
  url: string;
  agency: string;
}

export interface AssessmentQuestion {
  id: string;
  conceptTr: string;
  conceptEn: string;
  promptTr: string;
  promptEn: string;
  options: { id: 'a' | 'b' | 'c'; textTr: string; textEn: string }[];
  correctId: 'a' | 'b' | 'c';
  explainCorrectTr: string;
  explainCorrectEn: string;
  explainWrongTr: string;
  explainWrongEn: string;
}

export interface ExplorerPedagogy {
  id: ExplorerStoryId;
  learningOutcomesTr: string[];
  learningOutcomesEn: string[];
  skillsTr: string[];
  skillsEn: string[];
  problemTr: string;
  problemEn: string;
  technologySolutionTr: string;
  technologySolutionEn: string;
  contributionTr: string;
  contributionEn: string;
  currentStatusTr: string;
  currentStatusEn: string;
  reflectionQuestions: {
    questionTr: string;
    questionEn: string;
    answerTr: string;
    answerEn: string;
  }[];
  postAssessment: AssessmentQuestion[];
  officialSources: OfficialSourceLink[];
}

export const EXPLORER_PEDAGOGY_DATA: Record<ExplorerStoryId, ExplorerPedagogy> = {
  sojourner: {
    id: 'sojourner',
    learningOutcomesTr: [
      'Mars Pathfinder görevinin 4 Temmuz 1997’de Ares Vallis’e nasıl indiğini kavrar.',
      'Sojourner’ın 6 tekerlekli rocker-bogie süspansiyonunun engebeli arazide neden kullanıldığını açıklar.',
      'APXS (Alfa Parçacık X-Işını Spektrometresi) cihazının kaya kimyasını nasıl ölçtüğünü öğrenir.',
      'Barnacle Bill, Yogi ve Scooby-Doo analizlerinin Mars kabuğu ve antik su geçmişi hakkındaki bulgularını yorumlar.',
    ],
    learningOutcomesEn: [
      'Understand how Mars Pathfinder landed on Ares Vallis on July 4, 1997 using airbags.',
      'Explain why Sojourner’s 6-wheel rocker-bogie suspension handles rocky terrain without tipping.',
      'Learn how the APXS (Alpha Proton X-Ray Spectrometer) identifies chemical elements in rocks.',
      'Interpret what Barnacle Bill, Yogi, and Scooby-Doo revealed about Mars’s crust and ancient water.',
    ],
    skillsTr: [
      'Uzaktan araç yönlendirme ve hedef seçimi',
      'Element verisi okuma (silika, demir, sülfat)',
      'Gözlem ve kanıta dayalı bilimsel çıkarım',
    ],
    skillsEn: [
      'Remote rover navigation and target selection',
      'Reading elemental data (silica, iron, sulfates)',
      'Evidence-based scientific inference',
    ],
    problemTr:
      'Dünya’dan milyonlarca kilometre uzakta, sabit bir iniş aracının ulaşamadığı kayaların kimyasal yapısını düşük enerjiyle ve devrilmeden incelemek.',
    problemEn:
      'Analyzing rocks beyond a stationary lander’s reach millions of kilometers from Earth using minimal power and without tipping over.',
    technologySolutionTr:
      '10,6 kg’lık kompakt gövde, rocker-bogie 6 tekerlekli süspansiyon, güneş paneli ve kayalara temas eden APXS spektrometresi.',
    technologySolutionEn:
      'A compact 10.6 kg chassis, 6-wheel rocker-bogie suspension, solar array, and a contact-based APXS spectrometer.',
    contributionTr:
      'Başka bir gezegende tekerlekli bir robotun hareket edebileceğini ve yerinde kimyasal analiz yapabileceğini kanıtladı; Spirit, Opportunity, Curiosity ve Perseverance’ın önünü açtı.',
    contributionEn:
      'Proved that a wheeled robot could rove and perform in-situ chemistry on another planet, paving the way for Spirit, Opportunity, Curiosity, and Perseverance.',
    currentStatusTr:
      'Görev Tamamlandı (Tarihsel): 7 sol için planlanan Sojourner 83 sol çalıştı. Pathfinder ile son veri iletişimi 27 Eylül 1997’de alındı ve görev 10 Mart 1998’de resmen sonlandırıldı.',
    currentStatusEn:
      'Mission Completed (Historical): Planned for 7 sols, Sojourner operated for 83 sols. Final data transmission was received on September 27, 1997, and the mission officially concluded on March 10, 1998.',
    reflectionQuestions: [
      {
        questionTr: 'Bu görev neden gerçekleştirildi?',
        questionEn: 'Why was this mission carried out?',
        answerTr:
          'Düşük maliyetli hava yastıklı inişi ve Mars yüzeyinde hareketli bir gezicinin çalışabilirliğini test etmek için.',
        answerEn:
          'To demonstrate low-cost airbag landing and prove a mobile rover could operate and do science on Mars.',
      },
      {
        questionTr: 'Hangi problemi çözmeye çalıştı?',
        questionEn: 'What problem did it solve?',
        answerTr:
          'Sabit iniş araçlarının yalnızca kol mesafesindeki toprağı inceleyebilme kısıtını ortadan kaldırdı.',
        answerEn:
          'Overcame the limitation of stationary landers that could only sample soil within arm’s reach.',
      },
      {
        questionTr: 'Hangi bilimsel keşifleri mümkün kıldı?',
        questionEn: 'What scientific discoveries did it enable?',
        answerTr:
          'Silika zengini kayalar, antik taşkın ovası taşları ve mineral çimentolu toprak katmanlarıyla Mars’ın dinamik geçmişini gösterdi.',
        answerEn:
          'Revealed silica-rich rocks, flood-carried boulders, and mineral-cemented crusts pointing to Mars’s dynamic past.',
      },
      {
        questionTr: 'Gelecekteki uzay araştırmalarına nasıl katkı sağladı?',
        questionEn: 'How did it contribute to future exploration?',
        answerTr:
          'Rocker-bogie şasisi ve otonom engel algılama yaklaşımı sonraki tüm NASA Mars gezicilerinin temelini oluşturdu.',
        answerEn:
          'Its rocker-bogie chassis and hazard-avoidance software became the blueprint for every subsequent NASA Mars rover.',
      },
    ],
    postAssessment: [
      {
        id: 'soj-post-1',
        conceptTr: 'APXS ve Kaya Kimyası',
        conceptEn: 'APXS & Rock Chemistry',
        promptTr: 'Sojourner’ın Barnacle Bill kayasında yüksek silika (SiO₂) ölçmesi neyi kanıtladı?',
        promptEn: 'What did Sojourner’s high silica (SiO₂) reading on Barnacle Bill demonstrate?',
        options: [
          {
            id: 'a',
            textTr: 'Mars kabuğu geçmişte karmaşık volkanik farklılaşma süreçlerinden geçmiştir',
            textEn: 'Mars’s crust underwent complex volcanic differentiation in the past',
          },
          {
            id: 'b',
            textTr: 'Mars yüzeyinde güncel okyanuslar vardır',
            textEn: 'Modern oceans exist on Mars today',
          },
          {
            id: 'c',
            textTr: 'APXS yalnızca rüzgâr hızını ölçer',
            textEn: 'APXS only measures wind speed',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Doğru! Yüksek silika, Mars kayalarının tek tip olmadığını ve volkanik evrim geçirdiğini gösterdi.',
        explainCorrectEn:
          'Correct! Elevated silica showed Martian rocks are diverse and shaped by volcanic evolution.',
        explainWrongTr:
          'İpucu: APXS element oranlarını ölçer; yüksek silika volkanik kabuk farklılaşmasının işaretidir.',
        explainWrongEn:
          'Hint: APXS measures elemental ratios; high silica points to volcanic crust differentiation.',
      },
      {
        id: 'soj-post-2',
        conceptTr: 'Görev Süresi ve İletişim',
        conceptEn: 'Mission Duration & Relay',
        promptTr: '7 Mars günü (sol) için tasarlanan Sojourner gerçekte kaç sol boyunca veri gönderdi?',
        promptEn: 'Designed for 7 sols, how many sols did Sojourner actually operate?',
        options: [
          { id: 'a', textTr: '3 sol', textEn: '3 sols' },
          { id: 'b', textTr: '83 sol', textEn: '83 sols' },
          { id: 'c', textTr: '1.000 sol', textEn: '1,000 sols' },
        ],
        correctId: 'b',
        explainCorrectTr: 'Tebrikler! Planlanan sürenin neredeyse 12 katı olan 83 sol boyunca çalıştı.',
        explainCorrectEn: 'Well done! It operated for 83 sols — nearly 12 times its planned lifetime.',
        explainWrongTr: 'Tekrar dene: Sojourner 4 Temmuz’dan 27 Eylül 1997’ye kadar 83 sol görev yaptı.',
        explainWrongEn: 'Try again: Sojourner operated for 83 sols from July 4 to September 27, 1997.',
      },
    ],
    officialSources: [
      {
        titleTr: 'NASA Science — Mars Pathfinder / Sojourner Görev Özeti',
        titleEn: 'NASA Science — Mars Pathfinder / Sojourner Mission Overview',
        url: 'https://science.nasa.gov/mission/mars-pathfinder/',
        agency: 'NASA',
      },
      {
        titleTr: 'NASA/JPL Photojournal — PIA01122 (Sojourner & Yogi)',
        titleEn: 'NASA/JPL Photojournal — PIA01122 (Sojourner & Yogi)',
        url: 'https://photojournal.jpl.nasa.gov/catalog/PIA01122',
        agency: 'NASA / JPL',
      },
    ],
  },
  ingenuity: {
    id: 'ingenuity',
    learningOutcomesTr: [
      'Mars atmosferinin Dünya’nın yaklaşık %1’i yoğunlukta olmasının uçuşu neden zorlaştırdığını kavrar.',
      'Koaksiyel (eş eksenli) zıt yönlü iki karbon-fiber rotorun nasıl kaldırma kuvveti ürettiğini açıklar.',
      '19 Nisan 2021’deki ilk motorlu gezegenler arası uçuşun tarihsel önemini öğrenir.',
      '72 uçuşluk görev sürecinde teknoloji gösteriminden keşif gözcülüğüne geçişi yorumlar.',
    ],
    learningOutcomesEn: [
      'Understand why Mars’s ~1%-density atmosphere makes aerodynamic lift extremely difficult.',
      'Explain how counter-rotating coaxial carbon-fiber rotors generate lift on Mars.',
      'Learn the historical significance of the first powered flight on another planet (April 19, 2021).',
      'Trace how Ingenuity evolved from a 5-flight tech demo into a 72-flight aerial scout.',
    ],
    skillsTr: [
      'İrtifa ve uçuş süresi telemetrisi yorumlama',
      'Atmosfer yoğunluğu ile kaldırma kuvveti ilişkisi kurma',
      'Gerçek fizik ile basitleştirilmiş simülasyonu ayırt etme',
    ],
    skillsEn: [
      'Interpreting altitude & flight-time telemetry',
      'Connecting atmospheric density to aerodynamic lift',
      'Distinguishing real physics from simplified simulations',
    ],
    problemTr:
      'Dünya’nın %1’i kadar ince bir atmosferde, Dünya’dan anlık kumanda edilemeyecek kadar uzakta kontrollü motorlu uçuş gerçekleştirmek.',
    problemEn:
      'Achieving controlled powered flight in an atmosphere 1% as dense as Earth’s, too far away for real-time joystick control.',
    technologySolutionTr:
      '1,8 kg ultra hafif gövde, dakikada ~2.500 devir dönen 1,2 m koaksiyel karbon-fiber rotorlar, güneş şarjlı piller ve otonom seyrüsefer kamerası.',
    technologySolutionEn:
      'A 1.8 kg ultra-light airframe, 1.2 m coaxial carbon-fiber rotors at ~2,500 RPM, solar-charged batteries, and an autonomous nav camera.',
    contributionTr:
      'Wright Kardeşler’in Dünya’daki ilk uçuşundan 118 yıl sonra başka bir gezegende ilk motorlu uçuşu gerçekleştirdi; gelecekteki Mars helikopterleri ve Titan Dragonfly için yol açtı.',
    contributionEn:
      'Achieved the first powered aerodynamic flight on another world 118 years after the Wright brothers, inspiring future Mars rotorcraft and Titan’s Dragonfly.',
    currentStatusTr:
      'Uçuş Görevi Tamamlandı (Emekli): 18 Ocak 2024’teki 72. uçuşta rotor kanatlarında hasar oluştuğu için uçuş operasyonları 25 Ocak 2024’te sonlandırıldı; araç sabit bir veri/test istasyonu olarak Mars’ta kaldı.',
    currentStatusEn:
      'Flight Mission Concluded (Retired): After rotor blade damage during Flight 72 on January 18, 2024, NASA ended flight operations on January 25, 2024; it remains stationary on Mars as a testbed.',
    reflectionQuestions: [
      {
        questionTr: 'Bu görev neden gerçekleştirildi?',
        questionEn: 'Why was this mission carried out?',
        answerTr:
          'İnce Mars atmosferinde motorlu ve kontrollü uçuşun mümkün olup olmadığını kanıtlayan bir teknoloji gösterimi olarak.',
        answerEn:
          'As a technology demonstration to prove powered, controlled flight is possible in Mars’s thin atmosphere.',
      },
      {
        questionTr: 'Hangi problemi çözmeye çalıştı?',
        questionEn: 'What problem did it solve?',
        answerTr:
          'Tekerlekli gezicilerin gidemediği dik yamaçları ve kayalık alanları havadan keşfetme problemini.',
        answerEn:
          'Scouting steep cliffs and boulder fields from the air where wheeled rovers cannot safely drive.',
      },
      {
        questionTr: 'Hangi bilimsel/teknolojik keşifleri mümkün kıldı?',
        questionEn: 'What breakthroughs did it enable?',
        answerTr:
          'Başka bir gezegende 72 uçuş, 17 km’den fazla uçuş mesafesi ve Perseverance için hava keşif desteği sağladı.',
        answerEn:
          'Completed 72 flights and over 17 km of aerial travel, scouting terrain ahead for Perseverance.',
      },
      {
        questionTr: 'Gelecekteki uzay araştırmalarına nasıl katkı sağladı?',
        questionEn: 'How does it shape future missions?',
        answerTr:
          'Gelecekteki Mars örnek toplama helikopterleri ve diğer dünyalardaki hava araçları için uçuş verisi sağladı.',
        answerEn:
          'Provided vital flight data for next-generation planetary rotorcraft and aerial explorers.',
      },
    ],
    postAssessment: [
      {
        id: 'ing-post-1',
        conceptTr: 'Mars Atmosferi ve Rotor Hızı',
        conceptEn: 'Mars Atmosphere & Rotor Speed',
        promptTr: 'Ingenuity’nin rotorları neden Dünya’daki benzer boyuttaki dronlardan çok daha hızlı (~2.500 RPM) döner?',
        promptEn: 'Why do Ingenuity’s rotors spin much faster (~2,500 RPM) than similar-sized Earth drones?',
        options: [
          {
            id: 'a',
            textTr: 'Mars atmosferinin Dünya’nın yaklaşık %1’i kadar ince olması nedeniyle yeterli kaldırma kuvveti üretmek için',
            textEn: 'Because Mars’s atmosphere is ~1% as dense as Earth’s, requiring more speed for lift',
          },
          {
            id: 'b',
            textTr: 'Mars’ta yer çekiminin Dünya’dan 10 kat büyük olması nedeniyle',
            textEn: 'Because Mars gravity is 10x stronger than Earth’s',
          },
          {
            id: 'c',
            textTr: 'Güneş ışığını itmek için',
            textEn: 'To push against sunlight',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Doğru! İnce havada yeterli kaldırma kuvveti için hafif gövde + geniş ve hızlı dönen kanatlar gerekir.',
        explainCorrectEn:
          'Correct! Thin air requires ultra-light mass plus wide, high-RPM blades to generate lift.',
        explainWrongTr:
          'İpucu: Mars’ta yer çekimi Dünya’nın ~%38’idir ama hava çok incedir; hız bu ince havayı telafi eder.',
        explainWrongEn:
          'Hint: Mars gravity is ~38% of Earth’s, but its thin ~1% air density demands high rotor RPM.',
      },
      {
        id: 'ing-post-2',
        conceptTr: 'Görev Tarihi ve Durumu',
        conceptEn: 'Mission History & Status',
        promptTr: 'Başlangıçta 5 uçuşluk teknoloji gösterimi olarak planlanan Ingenuity toplam kaç uçuş yaptı?',
        promptEn: 'Initially planned as a 5-flight tech demo, how many flights did Ingenuity complete?',
        options: [
          { id: 'a', textTr: '5 uçuş', textEn: '5 flights' },
          { id: 'b', textTr: '72 uçuş', textEn: '72 flights' },
          { id: 'c', textTr: '200 uçuş', textEn: '200 flights' },
        ],
        correctId: 'b',
        explainCorrectTr: 'Harika! Ingenuity 18 Ocak 2024’teki 72. uçuşuna kadar olağanüstü bir performans sergiledi.',
        explainCorrectEn: 'Great! Ingenuity completed 72 flights through January 18, 2024.',
        explainWrongTr: 'Tekrar dene: Ingenuity planlanan 5 uçuşu aşarak toplam 72 uçuş tamamladı.',
        explainWrongEn: 'Try again: Ingenuity far exceeded its 5-flight plan, completing 72 flights.',
      },
    ],
    officialSources: [
      {
        titleTr: 'NASA Science — Ingenuity Mars Helikopteri',
        titleEn: 'NASA Science — Ingenuity Mars Helicopter',
        url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
        agency: 'NASA',
      },
      {
        titleTr: 'NASA/JPL — Ingenuity Uçuş Kayıtları',
        titleEn: 'NASA/JPL — Ingenuity Flight Log',
        url: 'https://mars.nasa.gov/technology/helicopter/',
        agency: 'NASA / JPL',
      },
    ],
  },
  opportunity: {
    id: 'opportunity',
    learningOutcomesTr: [
      'Meridiani Planum’daki hematit küreciklerinin (“yaban mersini”), katmanlı kayaların ve sülfat tuzlarının sıvı su kanıtı olduğunu kavrar.',
      'Su kanıtı ile doğrudan canlı yaşam kanıtı arasındaki bilimsel farkı ayırt eder.',
      'Opportunity’nin 90 sol’luk görevden 45,16 km’lik tarihi maratona nasıl ulaştığını öğrenir.',
      '2018 küresel toz fırtınasının güneş enerjili geziciler için neden kritik bir sınır oluşturduğunu açıklar.',
    ],
    learningOutcomesEn: [
      'Understand how hematite “blueberries,” layered sedimentary rocks, and sulfates prove past liquid water.',
      'Distinguish evidence of ancient habitability (water) from direct proof of living organisms.',
      'Learn how Opportunity turned a 90-sol plan into a record-breaking 45.16 km marathon.',
      'Explain why the 2018 global dust storm ended a solar-powered rover mission.',
    ],
    skillsTr: [
      'Jeolojik ipuçlarını birleştirme',
      'Bilimsel sınırları (yaşanabilirlik vs. yaşam) doğru kurma',
      'Uzun süreli gezegen keşfi verilerini yorumlama',
    ],
    skillsEn: [
      'Synthesizing geological clues',
      'Separating habitability from direct biosignatures',
      'Interpreting long-duration planetary exploration results',
    ],
    problemTr:
      'Mars yüzeyinde geçmişte sıvı suyun var olup olmadığını yerindeki mineral ve kaya katmanlarıyla kesin olarak kanıtlamak.',
    problemEn:
      'Proving on the ground whether liquid water ever persisted on ancient Mars using mineral and rock evidence.',
    technologySolutionTr:
      '6 tekerlekli arazi şasisi, güneş kanatları, Pancam direği, kaya öğütücülü (RAT) robotik kol ve Mössbauer/APXS spektrometreleri.',
    technologySolutionEn:
      '6-wheel mobility, solar wings, Pancam mast, robotic arm with Rock Abrasion Tool (RAT), and Mössbauer/APXS spectrometers.',
    contributionTr:
      'Mars’ın bir zamanlar sıvı suya ve yaşanabilir koşullara sahip olduğunu saha kanıtlarıyla doğruladı; 45,16 km ile Dünya dışı en uzun sürüş rekorunu kırdı.',
    contributionEn:
      'Confirmed through field geology that Mars once had liquid water and habitable environments, setting a 45.16 km off-world driving record.',
    currentStatusTr:
      'Görev Tamamlandı (Tarihsel): Haziran 2018’deki gezegen çapında toz fırtınası güneş panellerini örttü ve iletişim 10 Haziran 2018’de kesildi. NASA, aylarca süren çağrıların ardından 13 Şubat 2019’da görevi resmen sonlandırdı.',
    currentStatusEn:
      'Mission Completed (Historical): A planet-encircling dust storm in June 2018 blocked sunlight, ending contact on June 10, 2018. After months of recovery attempts, NASA concluded the mission on February 13, 2019.',
    reflectionQuestions: [
      {
        questionTr: 'Bu görev neden gerçekleştirildi?',
        questionEn: 'Why was this mission carried out?',
        answerTr:
          '“Suyu takip et” stratejisiyle Mars’ın geçmiş iklimini ve yaşanabilirliğini araştırmak için.',
        answerEn:
          'To “follow the water” and investigate Mars’s past climate and potential habitability.',
      },
      {
        questionTr: 'Hangi problemi çözmeye çalıştı?',
        questionEn: 'What problem did it solve?',
        answerTr:
          'Yörüngeden görülen mineral izlerinin yüzeydeki kaya katmanlarıyla uyuşup uyuşmadığını yerinde doğruladı.',
        answerEn:
          'Verified on the surface whether orbital mineral signatures truly matched water-altered rock layers.',
      },
      {
        questionTr: 'Hangi bilimsel keşifleri mümkün kıldı?',
        questionEn: 'What scientific discoveries did it enable?',
        answerTr:
          'Hematit kürecikleri, jarosit sülfatları ve kil mineralleriyle antik asidik ve nötr su dönemlerini ortaya çıkardı.',
        answerEn:
          'Uncovered hematite spheres, jarosite sulfates, and clay minerals recording ancient acidic and neutral water eras.',
      },
      {
        questionTr: 'Gelecekteki uzay araştırmalarına nasıl katkı sağladı?',
        questionEn: 'How did it contribute to future exploration?',
        answerTr:
          'Curiosity ve Perseverance’ın doğrudan antik yaşam izleri (biyo-imza) aramasına zemin hazırladı.',
        answerEn:
          'Laid the scientific foundation for Curiosity and Perseverance to search directly for ancient biosignatures.',
      },
    ],
    postAssessment: [
      {
        id: 'opp-post-1',
        conceptTr: 'Bilimsel Çıkarım Sınırı',
        conceptEn: 'Scientific Inference Boundary',
        promptTr: 'Meridiani Planum’daki su kanıtları bilim insanlarına kesin olarak neyi gösterir?',
        promptEn: 'What does the Meridiani Planum water evidence strictly prove to scientists?',
        options: [
          {
            id: 'a',
            textTr: 'Bölgenin geçmişte sıvı suya ve yaşanabilir koşullara sahip olduğunu (ancak tek başına canlı yaşamı kanıtlamaz)',
            textEn: 'The area once had liquid water and habitable conditions (though not direct proof of life alone)',
          },
          {
            id: 'b',
            textTr: 'Mars’ta kesinlikle gelişmiş uygarlıklar yaşadığını',
            textEn: 'Advanced civilizations definitely lived on Mars',
          },
          {
            id: 'c',
            textTr: 'Mars’ta hiç su bulunmadığını',
            textEn: 'Mars never had water',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Mükemmel! Bilimde su kanıtı yaşanabilirliği gösterir; yaşam için fosil veya organik biyo-imza kanıtı gerekir.',
        explainCorrectEn:
          'Excellent! Water proves habitability; confirming life requires direct biosignatures.',
        explainWrongTr:
          'İpucu: Sıvı su yaşam için gerekli bir koşuldur ama tek başına canlılığın doğrudan kanıtı değildir.',
        explainWrongEn:
          'Hint: Liquid water is necessary for life as we know it, but does not prove life on its own.',
      },
      {
        id: 'opp-post-2',
        conceptTr: 'Görevin Sona Erme Nedeni',
        conceptEn: 'End of Mission Cause',
        promptTr: '2018 yılında Opportunity ile iletişimin kesilmesine ne sebep oldu?',
        promptEn: 'What caused Opportunity to lose contact in 2018?',
        options: [
          {
            id: 'a',
            textTr: 'Güneş ışığını engelleyen küresel bir Mars toz fırtınası',
            textEn: 'A planet-encircling Martian dust storm blocking sunlight',
          },
          {
            id: 'b',
            textTr: 'Yakıt tankının patlaması',
            textEn: 'A fuel tank explosion',
          },
          {
            id: 'c',
            textTr: 'Dünya’ya geri dönmesi',
            textEn: 'It flew back to Earth',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Doğru! Güneş enerjili olduğu için fırtına panellerin güç üretmesini engelledi ve araç uyku modundan çıkamadı.',
        explainCorrectEn:
          'Correct! As a solar-powered rover, the global dust storm starved its batteries of sunlight.',
        explainWrongTr:
          'Tekrar dene: Opportunity güneş panelleriyle çalışıyordu; 2018’deki küresel toz fırtınası güneşi kapattı.',
        explainWrongEn:
          'Try again: Opportunity relied on solar arrays, which were starved by the 2018 global dust storm.',
      },
    ],
    officialSources: [
      {
        titleTr: 'NASA Science — Mars Exploration Rover: Opportunity',
        titleEn: 'NASA Science — Mars Exploration Rover: Opportunity',
        url: 'https://science.nasa.gov/mission/mer-opportunity/',
        agency: 'NASA',
      },
      {
        titleTr: 'NASA/JPL — Opportunity Görev Özeti ve Sonuçlar',
        titleEn: 'NASA/JPL — Opportunity Mission Overview',
        url: 'https://mars.nasa.gov/mer/mission/overview/',
        agency: 'NASA / JPL',
      },
    ],
  },
  'apollo-lrv': {
    id: 'apollo-lrv',
    learningOutcomesTr: [
      'Ay’da oksijen olmadığı için neden içten yanmalı motor yerine elektrikli batarya sistemi kullanıldığını açıklar.',
      'Düşük Ay yer çekiminde (~1/6 Dünya) tel örgü tekerleklerin ve süspansiyonun nasıl çalıştığını kavrar.',
      'Apollo 15, 16 ve 17 görevlerinde LRV sayesinde keşif menzilinin nasıl katlandığını öğrenir.',
      'LRV’nin katlanabilir alüminyum şasi mühendisliğini ve canlı TV/telemetri iletişimini tanır.',
    ],
    learningOutcomesEn: [
      'Explain why electric batteries replaced combustion engines on the airless Moon.',
      'Understand how wire-mesh wheels and suspension perform in ~1/6th lunar gravity.',
      'Learn how the LRV multiplied astronaut exploration range on Apollo 15, 16, and 17.',
      'Recognize the foldable aluminum chassis design and live Earth TV dish communications.',
    ],
    skillsTr: [
      'Enerji/batarya yönetimi ve engel kaçınma',
      'Vakum ve düşük yer çekimi koşullarına mühendislik uyarlaması',
      'İnsanlı keşif planlaması',
    ],
    skillsEn: [
      'Battery energy management & hazard avoidance',
      'Engineering adaptation for vacuum & 1/6th gravity',
      'Crewed surface traverse planning',
    ],
    problemTr:
      'Astronotların ağır uzay giysileriyle yürüyerek birkaç yüz metreden uzağa gidememesi ve Ay Modülü’nde sınırlı hacim bulunması.',
    problemEn:
      'Astronauts in bulky spacesuits could only walk short distances, and the Lunar Module had tight stowage space.',
    technologySolutionTr:
      'Yan bölmeye katlanabilen hafif alüminyum şasi, iki adet 36V gümüş-çinko elektrik bataryası, esnek tel örgü tekerlekler ve T-kol kontrolü.',
    technologySolutionEn:
      'A foldable aluminum frame stowed in the Lunar Module bay, dual 36V silver-zinc batteries, wire-mesh wheels, and a T-handle controller.',
    contributionTr:
      'Apollo 15, 16 ve 17 astronotlarının toplam ~90 km’den fazla yol katetmesini ve jeolojik açıdan çok çeşitli Ay kayalarını Dünya’ya getirmesini sağladı.',
    contributionEn:
      'Enabled Apollo 15, 16, and 17 crews to cover over ~90 km total and return diverse geological Moon samples to Earth.',
    currentStatusTr:
      'Görev Tamamlandı (Ay Yüzeyinde Korunuyor): Üç LRV aracı da (Apollo 15, 16 ve 17) görevlerini tamamladıktan sonra 1971–1972 yıllarında iniş bölgelerinde bırakıldı ve hâlâ Ay yüzeyindedir.',
    currentStatusEn:
      'Mission Completed (Preserved on the Moon): All three LRVs (Apollo 15, 16, and 17) remain parked at their lunar landing sites from 1971–1972 as historic artifacts.',
    reflectionQuestions: [
      {
        questionTr: 'Bu görev neden gerçekleştirildi?',
        questionEn: 'Why was this mission carried out?',
        answerTr:
          'Son Apollo J-serisi görevlerinde astronotların bilimsel keşif menzilini ve taşıyabilecekleri örnek miktarını artırmak için.',
        answerEn:
          'To expand astronauts’ scientific reach and sample-carrying capacity during the Apollo J-missions.',
      },
      {
        questionTr: 'Hangi problemi çözmeye çalıştı?',
        questionEn: 'What problem did it solve?',
        answerTr:
          'Yürüme yorgunluğu, sınırlı oksijen süresi ve küçük Ay Modülü bölmesine araç sığdırma problemini çözdü.',
        answerEn:
          'Solved suit-walking fatigue, oxygen time limits, and fitting a 3-meter vehicle into a compact lander bay.',
      },
      {
        questionTr: 'Hangi bilimsel keşifleri mümkün kıldı?',
        questionEn: 'What scientific discoveries did it enable?',
        answerTr:
          'Hadley Rille, Descartes Yaylaları ve Taurus-Littrow vadisindeki kraterlerden antik Ay kabuğu örnekleri toplandı.',
        answerEn:
          'Enabled sampling of ancient lunar highlands and volcanic glass across Hadley Rille, Descartes, and Taurus-Littrow.',
      },
      {
        questionTr: 'Gelecekteki uzay araştırmalarına nasıl katkı sağladı?',
        questionEn: 'How does it inspire future missions?',
        answerTr:
          'Artemis programı için geliştirilen yeni nesil Ay Arazi Araçları’nın (LTV) doğrudan atasıdır.',
        answerEn:
          'Serves as the direct ancestor of NASA’s upcoming Artemis Lunar Terrain Vehicle (LTV).',
      },
    ],
    postAssessment: [
      {
        id: 'lrv-post-1',
        conceptTr: 'Elektrikli Tahrik ve Vakum',
        conceptEn: 'Electric Drive in Vacuum',
        promptTr: 'Apollo LRV neden içten yanmalı motor yerine 36V elektrik bataryaları kullandı?',
        promptEn: 'Why did the Apollo LRV use 36V electric batteries instead of a combustion engine?',
        options: [
          {
            id: 'a',
            textTr: 'Ay’da yanma için gerekli oksijen ve atmosfer bulunmadığı için',
            textEn: 'Because the Moon lacks oxygen and an atmosphere needed for combustion',
          },
          {
            id: 'b',
            textTr: 'Ay’da güneş hiç doğmadığı için',
            textEn: 'Because the Sun never shines on the Moon',
          },
          {
            id: 'c',
            textTr: 'Elektrikli araçlar Ay’da uçabildiği için',
            textEn: 'Because electric vehicles can fly on the Moon',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Doğru! Vakum ortamında elektrik motorları hava gerektirmez ve her tekerlekte bağımsız çekiş sağlar.',
        explainCorrectEn:
          'Correct! Electric hub motors need no air and deliver independent traction in vacuum.',
        explainWrongTr:
          'İpucu: İçten yanmalı motorlar oksijensiz çalışamaz; Ay’da atmosfer yoktur.',
        explainWrongEn:
          'Hint: Combustion engines cannot run without oxygen in the Moon’s vacuum.',
      },
      {
        id: 'lrv-post-2',
        conceptTr: 'Tel Örgü Tekerlek Tasarımı',
        conceptEn: 'Wire-Mesh Wheel Engineering',
        promptTr: 'LRV’de neden hava dolu kauçuk lastik yerine tel örgü tekerlekler kullanıldı?',
        promptEn: 'Why did the LRV use wire-mesh wheels instead of air-filled rubber tires?',
        options: [
          {
            id: 'a',
            textTr: 'Vakum ve aşırı sıcaklık değişimlerinde patlama riski olmadan esnek tutuş sağladığı için',
            textEn: 'They provide flexible traction in vacuum and extreme temperatures without bursting',
          },
          {
            id: 'b',
            textTr: 'Sadece daha parlak göründüğü için',
            textEn: 'Only because they looked shinier',
          },
          {
            id: 'c',
            textTr: 'Ay’da asfalt yollar olduğu için',
            textEn: 'Because the Moon has paved highways',
          },
        ],
        correctId: 'a',
        explainCorrectTr:
          'Harika! Çinko kaplı piyano teli örgüsü hem çok hafiftir hem de gevşek Ay regolitini iyi kavrar.',
        explainCorrectEn:
          'Great! Zinc-coated piano-wire mesh is ultra-light and grips loose lunar regolith reliably.',
        explainWrongTr:
          'Tekrar dene: Hava dolu lastikler vakumda ve -150°C/+120°C sıcaklık farkında güvenilir değildir.',
        explainWrongEn:
          'Try again: Air-filled rubber tires are unreliable in lunar vacuum and extreme temperatures.',
      },
    ],
    officialSources: [
      {
        titleTr: 'NASA — Apollo Lunar Roving Vehicle (LRV) Teknik Sayfası',
        titleEn: 'NASA — Apollo Lunar Roving Vehicle (LRV) Overview',
        url: 'https://www.nasa.gov/history/alsj/lrvhand.html',
        agency: 'NASA',
      },
      {
        titleTr: 'NASA Science — Apollo 17 Görevi ve LRV-003',
        titleEn: 'NASA Science — Apollo 17 Mission & LRV-003',
        url: 'https://science.nasa.gov/mission/apollo-17/',
        agency: 'NASA',
      },
    ],
  },
};
