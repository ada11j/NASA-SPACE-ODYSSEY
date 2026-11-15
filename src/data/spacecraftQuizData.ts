import type { QuizQuestionItem, QuizSpacecraftGroup } from '@/types';

export const SPACECRAFT_QUIZ_GROUPS: readonly QuizSpacecraftGroup[] = [
  {
    id: 'ingenuity',
    groupNumber: 1,
    title: '1. UZAY ARACI: INGENUITY HELİKOPTERİ',
    subtitle: 'Başka Bir Gezegende Motorlu ve Kontrollü Uçuş Gerçekleştiren İlk Hava Aracı (Jezero Krateri · 2021–2024)',
    badge: 'MARS HAVA ARACI · 72 UÇUŞ',
    accentColor: '#38bdf8',
    questions: [
      {
        id: 'quiz-q1',
        questionNumber: 1,
        spacecraftGroupId: 'ingenuity',
        spacecraftTitle: '1. UZAY ARACI: INGENUITY HELİKOPTERİ',
        prompt:
          'Ingenuity helikopteri Mars yüzeyine hangi keşif aracının gövdesine bağlı olarak taşındı?',
        options: [
          { key: 'A', text: 'Curiosity' },
          { key: 'B', text: 'Perseverance' },
          { key: 'C', text: 'Opportunity' },
          { key: 'D', text: 'Spirit' },
        ],
        correctOption: 'B',
        explanation:
          "Ingenuity, NASA'nın Mars 2020 görevi kapsamında Perseverance keşif aracının gövdesinin altına yerleştirilerek Mars'a taşındı ve 18 Şubat 2021'de Jezero Krateri'ne indi.",
      },
      {
        id: 'quiz-q2',
        questionNumber: 2,
        spacecraftGroupId: 'ingenuity',
        spacecraftTitle: '1. UZAY ARACI: INGENUITY HELİKOPTERİ',
        prompt:
          "Mars'ın Dünya'dakinin yalnızca %1'i yoğunluğundaki ince atmosferinde Ingenuity nasıl havalanabildi?",
        options: [
          { key: 'A', text: 'Sıcak hava balonu sistemi kullanarak' },
          { key: 'B', text: 'Roket iticileriyle dikey yükselerek' },
          {
            key: 'C',
            text: 'Çok hafif gövdesi ve dakikada yaklaşık 2.500 devir dönen geniş çift pervanesi sayesinde',
          },
          { key: 'D', text: "Mars'taki güçlü rüzgâr akımlarından yararlanarak" },
        ],
        correctOption: 'C',
        explanation:
          'Ingenuity 1,8 kg ağırlığındaki ultra hafif gövdesi ve birbirine ters yönde dakikada yaklaşık 2.400–2.537 devir dönen 1,2 metrelik karbon fiber çift pervanesi sayesinde uçabildi.',
      },
    ],
  },
  {
    id: 'sojourner',
    groupNumber: 2,
    title: '2. UZAY ARACI: SOJOURNER GEZGİNİ',
    subtitle: 'Mars Yüzeyinde Tekerlek İzini Bırakan İlk Robotik Gezici (Mars Pathfinder · Ares Vallis · 1997)',
    badge: 'ÖNCÜ MARS ROVER · 83 GÜN',
    accentColor: '#f59e0b',
    questions: [
      {
        id: 'quiz-q3',
        questionNumber: 3,
        spacecraftGroupId: 'sojourner',
        spacecraftTitle: '2. UZAY ARACI: SOJOURNER GEZGİNİ',
        prompt:
          "Sojourner 4 Temmuz 1997'de Mars'ın Ares Vallis bölgesine hangi yöntemle güvenli bir iniş yaptı?",
        options: [
          { key: 'A', text: 'Paraşüt kancalarıyla doğrudan kayalara tutunarak' },
          { key: 'B', text: 'Dev hava yastıkları sayesinde yüzeyde top gibi sekerek' },
          { key: 'C', text: 'Helikopter pervaneleriyle süzülerek' },
          { key: 'D', text: 'Başka bir aracın vinç sistemiyle indirilerek' },
        ],
        correctOption: 'B',
        explanation:
          "Sojourner, Mars'ın kayalık Ares Vallis bölgesine dev hava yastıkları sayesinde top gibi sekerek iniş yaptı ve 5 Temmuz gecesi rampadan süzülerek kızıl toprağa ilk tekerlek izini bıraktı.",
      },
      {
        id: 'quiz-q4',
        questionNumber: 4,
        spacecraftGroupId: 'sojourner',
        spacecraftTitle: '2. UZAY ARACI: SOJOURNER GEZGİNİ',
        prompt:
          'Başlangıçta yalnızca 7 gün çalışması planlanan Sojourner, Mars yüzeyinde toplam kaç gün görev yaptı?',
        options: [
          { key: 'A', text: '15 gün' },
          { key: 'B', text: '30 gün' },
          { key: 'C', text: '83 gün' },
          { key: 'D', text: '365 gün' },
        ],
        correctOption: 'C',
        explanation:
          "Sadece 7 gün çalışması planlanan Sojourner, beklentilerin çok ötesine geçerek 27 Eylül 1997'ye kadar tam 83 gün boyunca çalıştı ve Dünya'ya 550 fotoğraf gönderdi.",
      },
    ],
  },
  {
    id: 'opportunity',
    groupNumber: 3,
    title: '3. UZAY ARACI: OPPORTUNITY GEZGİNİ',
    subtitle: 'Meridiani Planum’dan Endeavour Krateri’ne 45,16 km Yol Kateden Rekortmen Gezici (MER-B · 2004–2018)',
    badge: 'MARS MARATONCUSU · 5.111 SOL',
    accentColor: '#e2643a',
    questions: [
      {
        id: 'quiz-q5',
        questionNumber: 5,
        spacecraftGroupId: 'opportunity',
        spacecraftTitle: '3. UZAY ARACI: OPPORTUNITY GEZGİNİ',
        prompt:
          "Opportunity'nin Mars'ta bir zamanlar sıvı su bulunduğuna dair keşfettiği küçük, yuvarlak hematit parçacıklarına bilim insanları ne ad verdi?",
        options: [
          { key: 'A', text: 'Kızıl inciler' },
          { key: 'B', text: 'Mars yaban mersinleri' },
          { key: 'C', text: 'Uzay çakılları' },
          { key: 'D', text: 'Demir damlaları' },
        ],
        correctOption: 'B',
        explanation:
          'Opportunity, geçmişte sıvı su bulunduğunu gösteren küçük ve yuvarlak hematit parçacıkları keşfetti; bilim insanları bunlara sevgiyle "Mars yaban mersinleri" adını verdi.',
      },
      {
        id: 'quiz-q6',
        questionNumber: 6,
        spacecraftGroupId: 'opportunity',
        spacecraftTitle: '3. UZAY ARACI: OPPORTUNITY GEZGİNİ',
        prompt:
          "Yaklaşık 15 yıl boyunca görev yapan Opportunity'nin 2018 yılında Dünya ile bağlantısının kesilmesine ne sebep oldu?",
        options: [
          { key: 'A', text: 'Bir kratere düşerek tekerleklerinin kırılması' },
          {
            key: 'B',
            text: 'Devasa bir toz fırtınasının Güneş ışığını engelleyerek enerjisini tüketmesi',
          },
          { key: 'C', text: 'Görev süresinin dolması nedeniyle uzaktan kapatılması' },
          { key: 'D', text: 'Asteroit çarpması sonucu anteninin kopması' },
        ],
        correctOption: 'B',
        explanation:
          "2018 yılında meydana gelen devasa bir toz fırtınası Güneş ışığını engellediği için Opportunity'nin enerjisi tükendi ve son sinyalini 10 Haziran 2018'de gönderdi.",
      },
    ],
  },
  {
    id: 'apollo-lrv',
    groupNumber: 4,
    title: '4. UZAY ARACI: APOLLO LUNAR ROVING VEHICLE (AY GEZGİNİ)',
    subtitle: 'Apollo 15, 16 ve 17 Görevlerinde Astronotların Ay Yüzeyinde Kullandığı Elektrikli Keşif Aracı (1971–1972)',
    badge: 'İNSANLI AY TAŞITI · APOLLO 15–17',
    accentColor: '#34d399',
    questions: [
      {
        id: 'quiz-q7',
        questionNumber: 7,
        spacecraftGroupId: 'apollo-lrv',
        spacecraftTitle: '4. UZAY ARACI: APOLLO LUNAR ROVING VEHICLE (AY GEZGİNİ)',
        prompt:
          'Apollo 15, 16 ve 17 görevlerinde astronotları taşıyan Ay Gezgini hangi enerji kaynağıyla çalışıyordu ve en yüksek hızı ne kadardı?',
        options: [
          { key: 'A', text: 'Güneş panelleriyle çalışıyordu, en yüksek hızı saatte 5 km idi' },
          { key: 'B', text: 'Sıvı roket yakıtıyla çalışıyordu, en yüksek hızı saatte 40 km idi' },
          {
            key: 'C',
            text: 'Pillerle (elektrikle) çalışıyordu, en yüksek hızı saatte yaklaşık 13 km idi',
          },
          { key: 'D', text: 'Nükleer enerjiyle çalışıyordu, en yüksek hızı saatte 25 km idi' },
        ],
        correctOption: 'C',
        explanation:
          'Dört tekerlekli Ay Gezgini pillerle, yani elektrikle çalışıyordu ve en yüksek hızı saatte yaklaşık 13 kilometreydi.',
      },
      {
        id: 'quiz-q8',
        questionNumber: 8,
        spacecraftGroupId: 'apollo-lrv',
        spacecraftTitle: '4. UZAY ARACI: APOLLO LUNAR ROVING VEHICLE (AY GEZGİNİ)',
        prompt:
          "Görevler tamamlandığında Ay Gezgini neden astronotlarla birlikte Dünya'ya geri getirilmedi?",
        options: [
          { key: 'A', text: 'Kum fırtınasında kaybolduğu için' },
          {
            key: 'B',
            text: 'Dönüş aracında yer ve ağırlık sınırlı olduğu ve en değerli yük Ay kayaçları olduğu için',
          },
          { key: 'C', text: "Ay'da başka astronotlar tarafından kullanılacağı için" },
          { key: 'D', text: 'Pilleri patladığı için' },
        ],
        correctOption: 'B',
        explanation:
          "Dönüş aracında yer ve ağırlık sınırlı olduğundan ve en değerli yük Ay kayaçları sayıldığından Ay Gezginleri Dünya'ya getirilmedi; Hadley Vadisi, Descartes Yaylası ve Taurus-Littrow Vadisi'nde bırakıldı.",
      },
    ],
  },
  {
    id: 'insight',
    groupNumber: 5,
    title: '5. UZAY ARACI: INSIGHT İNİŞ ARACI',
    subtitle: 'Mars’ın Kabuk, Manto ve Çekirdek Yapısını Sismik Dalgalarla Haritalandıran Jeofizik İstasyonu (Elysium Planitia · 2018–2022)',
    badge: 'MARS SİSMOLOJİ İSTASYONU · 1.300+ DEPREM',
    accentColor: '#a78bfa',
    questions: [
      {
        id: 'quiz-q9',
        questionNumber: 9,
        spacecraftGroupId: 'insight',
        spacecraftTitle: '5. UZAY ARACI: INSIGHT İNİŞ ARACI',
        prompt:
          'Sabit bir iniş aracı olan InSight, Mars\'ın iç yapısını haritalandırmak için hangi bilimsel cihazı kullanarak gezegenin "kalp atışlarını" dinledi?',
        options: [
          { key: 'A', text: 'Derin sondaj matkabı' },
          { key: 'B', text: 'Hassas sismometre' },
          { key: 'C', text: 'Kızılötesi teleskop' },
          { key: 'D', text: 'Kimyasal toprak fırını' },
        ],
        correctOption: 'B',
        explanation:
          'InSight üzerindeki hassas sismometre ile Mars depremlerini yakaladı ve sismik dalgaları inceleyerek gezegenin kabuk, manto ve çekirdek yapısını haritalandırdı.',
      },
      {
        id: 'quiz-q10',
        questionNumber: 10,
        spacecraftGroupId: 'insight',
        spacecraftTitle: '5. UZAY ARACI: INSIGHT İNİŞ ARACI',
        prompt:
          "Başlangıçta 2 yıl çalışması planlanan ve 4 yıl görev yapan InSight'ın görevi 2022 yılında neden sona erdi?",
        options: [
          {
            key: 'A',
            text: 'Mars tozlarının güneş panellerini kaplayıp enerjisini tüketmesi nedeniyle',
          },
          { key: 'B', text: 'Şiddetli bir Mars depreminde devrildiği için' },
          { key: 'C', text: 'Hareket ederken derin bir kratere düştüğü için' },
          { key: 'D', text: 'Nükleer yakıtı tükendiği için' },
        ],
        correctOption: 'A',
        explanation:
          "Sabit bir iniş aracı olan InSight'ın görevi, Mars tozlarının güneş panellerini kaplayıp enerjisini tüketmesiyle 2022 yılında sona erdi.",
      },
    ],
  },
];

export const ALL_QUIZ_QUESTIONS: readonly QuizQuestionItem[] =
  SPACECRAFT_QUIZ_GROUPS.flatMap((group) => group.questions);

export const TOTAL_QUIZ_QUESTIONS = ALL_QUIZ_QUESTIONS.length;
