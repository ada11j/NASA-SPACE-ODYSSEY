import type { ExplorerStoryItem } from '@/types';

/**
 * 13–15 yaş grubu öğrenciler için bilimsel gerçeklere dayalı,
 * birinci şahıs anlatımlı Türkçe keşif hikâyeleri.
 */
export const TR_EXPLORER_STORIES: readonly ExplorerStoryItem[] = [
  {
    id: 'sojourner',
    orderNumber: '01',
    spacecraftName: 'SOJOURNER (MARS PATHFINDER)',
    badge: 'HİKÂYE 01 · İLK MARS GEZİCİSİ',
    badgeTitle: 'Mars’ın İlk Kâşifi',
    badgeSubtitle: 'Sojourner · Ares Vallis',
    badgeIcon: '🪨',
    accentColor: '#fb923c',
    title: 'Kızıl Gezegenin Minik Kâşifi: Sojourner’ın Büyük Macerası',
    subtitle: 'Ares Vallis’in Taşlı Ovasında Başlayan İlk Tekerlek İzleri',
    quote:
      '“Bir mikrodalga fırın kadardım; ama tekerleklerim Kızıl Gezegene değdiği an, insanlığın Mars’ta yürüme biçimi sonsuza dek değişti.”',
    readingTime: '3 dk okuma',
    image: '/assets/images/rovers/sojourner.jpg',
    imageAlt:
      'Mars Pathfinder görevinde Sojourner keşif aracının Ares Vallis’te Yogi kayasını incelerken çekilen NASA fotoğrafı',
    imageCredit: 'NASA / JPL (PIA01122)',
    mediaKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    quickFacts: [
      { label: 'MARS’A İNİŞ', value: '4 Temmuz 1997' },
      { label: 'BÖLGE', value: 'Ares Vallis' },
      { label: 'GÖREV SÜRESİ', value: '83 Mars günü (sol)' },
      { label: 'FOTOĞRAF', value: 'Yaklaşık 550' },
    ],
    chapters: [
      {
        id: 'sojourner-ch1',
        chapterNumber: 'BÖLÜM 01',
        heading: 'Hava Yastıklarıyla Zıplayarak İniş',
        paragraphs: [
          'Merhaba! Ben Sojourner. 4 Aralık 1996’da Mars Pathfinder uzay aracıyla Dünya’dan ayrıldığımda, kimse başka bir gezegenin yüzeyinde serbestçe dolaşacak ilk robotik gezici olacağımı tam olarak hayal edemiyordu. Ağırlığım yalnızca 10,6 kilogramdı; yani yaklaşık bir mikrodalga fırın boyutundaydım.',
          '4 Temmuz 1997’de Mars atmosferine girdiğimizde, benden önceki araçlar gibi iniş roketleriyle yumuşak bir dokunuş yapmadık. Bunun yerine dev hava yastıkları etrafımızda şişti! Paraşüt ve fren roketlerinin ardından Ares Vallis adlı taşlı ovaya çarpıp yaklaşık 15 kez zıplayarak durduk. Koruyucu yapraklar açıldığında, önümdeki kızıl taşlarla dolu antik sel yatağını gördüm.',
        ],
      },
      {
        id: 'sojourner-ch2',
        chapterNumber: 'BÖLÜM 02',
        heading: 'Kızıl Gezegendeki İlk Tekerlek İzleri',
        paragraphs: [
          '6 tekerleğim, özel bir Rocker-Bogie süspansiyon sistemine bağlıydı. Bu sayede kayaların üzerinden devrilmeden tırmanabiliyordum. Rampadan yavaşça inip Mars toprağına ilk tekerlek izlerimi bıraktığımda, Dünya’daki kontrol odasında büyük bir alkış koptu.',
          'Benim görevim tek başıma uzaklara gitmek değildi; Sagan Anıt İstasyonu adını alan ana iniş aracının yakınında kalarak kayaları analiz etmekti. Önümdeki ilginç kayalara “Barnacle Bill” ve “Yogi” gibi sevimli takma adlar verdiler. Alfa Proton X-Işını Spektrometrem (APXS) ile kayalara dokunup kimyasal yapılarını ölçtüm.',
        ],
      },
      {
        id: 'sojourner-ch3',
        chapterNumber: 'BÖLÜM 03',
        heading: '7 Sol Yerine 83 Mars Günü (Sol)',
        paragraphs: [
          'Mühendisler bana sadece 7 Mars günü (sol) ömür biçmişti; en iyi ihtimalle 30 sol çalışabileceğimi düşünüyorlardı. Ama güneş panelimle enerji toplamaya ve soğuk Mars gecelerine direnmeye devam ettim. Sonunda tam 83 Mars günü boyunca görev yaptım!',
          'Bu sürede Dünya’ya yaklaşık 550 fotoğraf gönderdim; ana iniş aracıyla birlikte binlerce karelik bir arşiv oluşturduk. İncelediğim yuvarlak çakıllar ve üst üste yığılmış kayalar, Ares Vallis’in milyarlarca yıl önce devasa sellerle sular altında kaldığını kanıtladı. 27 Eylül 1997’de iletişimimiz kesildiğinde görevimi fazlasıyla tamamlamıştım. Benden sonra gelen Spirit, Opportunity, Curiosity ve Perseverance’ın yolunu açan ilk adım bendim.',
        ],
      },
    ],
    timeline: [
      {
        date: '4 Aralık 1996',
        title: 'Dünya’dan Fırlatma',
        detail: 'Mars Pathfinder uzay aracı ile Delta II roketiyle uzaya fırlatıldım.',
      },
      {
        date: '4 Temmuz 1997',
        title: 'Ares Vallis’e Hava Yastıklı İniş',
        detail: 'Koruyucu hava yastıklarıyla sekerek yüzeye ulaştım; ilk tekerlek izlerimi bıraktım.',
      },
      {
        date: 'Temmuz – Eylül 1997',
        title: '83 Sol Bilimsel Keşif',
        detail: 'Barnacle Bill ve Yogi kayalarını analiz ettim; yaklaşık 550 fotoğraf gönderdim.',
      },
      {
        date: '27 Eylül 1997',
        title: 'Son Sinyal ve Tarihi Miras',
        detail: 'Planlanan 7 sol süreyi katlayarak 83 Mars günü görev yaptıktan sonra sessizliğe büründüm.',
      },
    ],
    discoveries: [
      {
        title: 'Antik Sel Yatağı Kanıtları',
        summary:
          'Ares Vallis’teki yuvarlaklaşmış çakıllar ve kayaların dizilimi, bölgede bir zamanlar şiddetli su akıntıları yaşandığını gösterdi.',
      },
      {
        title: 'Mars Kayalarının Kimyası',
        summary:
          'APXS cihazı sayesinde silisyumca zengin andezit benzeri kayalar saptandı ve Mars kabuğunun jeolojik çeşitliliği anlaşıldı.',
      },
    ],
    glossary: [
      {
        term: 'Sol (Mars Günü)',
        explanation:
          'Mars’ın kendi ekseni etrafında bir tur dönüş süresi; yaklaşık 24 saat 39 dakika 35 saniyedir.',
      },
      {
        term: 'Hava Yastıklı İniş',
        explanation:
          'Uzay aracının yüzeye çarpma darbesini emmek için etrafını saran dev dayanıklı gaz yastıkları.',
      },
      {
        term: 'APXS Spektrometresi',
        explanation:
          'Kayaların yüzeyine radyasyon göndererek hangi elementlerden oluştuğunu belirleyen bilimsel cihaz.',
      },
    ],
    relatedRoverId: 'spirit',
    relatedVehicleLabel: 'Mars Keşif Araçlarını İncele',
    scenes: [
      {
        id: 'soj-s1',
        sceneNumber: 'SAHNE 01',
        title: 'Hava Yastıklarıyla Zıplayarak İniş',
        paragraphs: [
          '4 Aralık 1996’da yola çıktım, 4 Temmuz 1997’de Mars atmosferine daldım. İniş roketi yerine dev hava yastıkları etrafımda şişti ve Ares Vallis ovasında yaklaşık 15 kez sekerek durdum!',
        ],
        keyTakeaway: 'Sojourner yalnızca 10,6 kg ağırlığında, bir mikrodalga fırın boyutundaydı.',
        learnMoreTitle: 'Hava yastıklı iniş neden seçildi?',
        learnMoreDetail:
          'Ares Vallis gibi kayalık bir alanda ağır iniş ayakları devrilebilirdi. Dayanıklı gaz yastıkları çarpma enerjisini emerek maliyet ve ağırlıktan tasarruf sağladı.',
        interactionPrompt: 'Aşağıdaki 3D sahnede Sojourner’ı sürmeye hazır ol!',
      },
      {
        id: 'soj-s2',
        sceneNumber: 'SAHNE 02',
        title: 'Kızıl Topraktaki İlk Tekerlek İzleri',
        paragraphs: [
          'Rampadan aşağı indim ve başka bir gezegenin yüzeyinde özgürce hareket eden ilk robotik gezici oldum. 6 tekerleğim Rocker-Bogie süspansiyonu sayesinde kayalara kolayca tırmanıyordu.',
        ],
        keyTakeaway: 'Sojourner, Mars yüzeyinde tekerlek izi bırakan ilk gezgin araçtır.',
        learnMoreTitle: 'Rocker-Bogie süspansiyonu nasıl çalışır?',
        learnMoreDetail:
          'Yay kullanmayan bu mafsallı sistem, bir tekerlek yüksek bir kayanın üstüne çıkarken gövdenin dengesini korur ve devrilmeyi önler.',
        interactionPrompt: '3D sahnede yön tuşları veya dokunmatik oklarla ilk izini bırak.',
      },
      {
        id: 'soj-s3',
        sceneNumber: 'SAHNE 03',
        title: 'Barnacle Bill ve Yogi Kayalarının Sırrı',
        paragraphs: [
          'Önümdeki kayalara yaklaştım ve APXS cihazımı yüzeye dayadım. İncelediğim yuvarlak çakıllar ve kaya dizilimleri, Ares Vallis’in milyarlarca yıl önce dev sellerle yıkandığını gösterdi.',
        ],
        keyTakeaway: 'Kayaç kimyası ve yuvarlak çakıllar Mars’taki antik su akıntılarının kanıtıdır.',
        learnMoreTitle: 'APXS kayaların içini nasıl anlar?',
        learnMoreDetail:
          'Alfa Proton X-Işını Spektrometresi kayaya zararsız parçacıklar gönderir; geri yansıyan X-ışınları kayadaki elementlerin parmak izini verir.',
        interactionPrompt: '3D Mars yüzeyinde 3 kaya örneğine yaklaşıp tıkla!',
      },
      {
        id: 'soj-s4',
        sceneNumber: 'SAHNE 04',
        title: '7 Sol Yerine 83 Mars Günü (Sol)',
        paragraphs: [
          'Sadece 7 Mars günü (sol) çalışmam bekleniyordu; ama tam 83 sol dayanarak yaklaşık 550 fotoğraf gönderdim. Bugün Mars’ta dolaşan dev gezicilerin yolunu ben açtım.',
        ],
        keyTakeaway: '1 Mars günü (sol) yaklaşık 24 saat 39 dakikadır; Dünya günüyle aynı değildir.',
        learnMoreTitle: 'Görev neden 27 Eylül 1997’de sona erdi?',
        learnMoreDetail:
          'Mars kışı yaklaşırken ana iniş istasyonunun bataryaları aşırı soğuk nedeniyle tükendi ve Dünya ile telsiz bağlantısı kesildi.',
        interactionPrompt: '3 kaya örneğini toplayarak "Mars’ın İlk Kâşifi" rozetini kazan!',
      },
    ],
  },
  {
    id: 'ingenuity',
    orderNumber: '02',
    spacecraftName: 'INGENUITY (MARS HELİKOPTERİ)',
    badge: 'HİKÂYE 02 · BAŞKA GEZEGENDE İLK UÇUŞ',
    badgeTitle: 'İlk Uçuş Pilotu',
    badgeSubtitle: 'Ingenuity · Jezero Krateri',
    badgeIcon: '🚁',
    accentColor: '#38bdf8',
    title: 'Merhaba! Ben Ingenuity',
    subtitle: 'İncecik Mars Gökyüzünde 72 Kez Kanat Çırpan Minik Helikopter',
    quote:
      '“Bana ‘Mars’ta uçmak imkânsız’ dediler. Ben ise yalnızca 5 uçuş için gönderildiğim gökyüzünde tam 72 kez havalandım!”',
    readingTime: '3 dk okuma',
    image: '/assets/images/rovers/perseverance-ingenuity.jpg',
    imageAlt:
      'Perseverance keşif aracının Jezero Krateri’nde Ingenuity Mars helikopteri ile çekilen gerçek NASA fotoğrafı',
    imageCredit: 'NASA / JPL-Caltech / MSSS (PIA24542)',
    mediaKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    quickFacts: [
      { label: 'AĞIRLIK', value: 'Yaklaşık 1,8 kg' },
      { label: 'MARS’A İNİŞ', value: '18 Şubat 2021' },
      { label: 'İLK UÇUŞ', value: '19 Nisan 2021' },
      { label: 'TOPLAM UÇUŞ', value: '72 uçuş (Ocak 2024’e kadar)' },
    ],
    chapters: [
      {
        id: 'ingenuity-ch1',
        chapterNumber: 'BÖLÜM 01',
        heading: 'Dünya’dan Yüz Kat İnce Bir Havada Uçmak',
        paragraphs: [
          'Merhaba! Ben Ingenuity. 18 Şubat 2021’de dev yol arkadaşım Perseverance’ın karnına katlanmış halde Jezero Krateri’ne indim. Kütlesi yalnızca yaklaşık 1,8 kilogram olan küçücük bir helikopterim; gövdem neredeyse bir kâğıt mendil kutusu kadardır.',
          'Mars’ta uçmak Dünya’da uçmaya hiç benzemez. Çünkü Mars atmosferi, Dünya atmosferinin yalnızca yaklaşık yüzde 1’i kadar yoğundur! Yani pervanelerimin havayı kavrayıp beni kaldırabilmesi için çok hafif olmam ve 1,2 metrelik karbon-fiber kanatlarımın Dünya’daki helikopterlerden çok daha hızlı, dakikada yaklaşık 2.400 devir dönmesi gerekiyordu.',
        ],
      },
      {
        id: 'ingenuity-ch2',
        chapterNumber: 'BÖLÜM 02',
        heading: '19 Nisan 2021: Wright Kardeşler Anı',
        paragraphs: [
          'Perseverance beni güvenli bir şekilde Mars toprağına bıraktıktan sonra geri çekildi ve kameralarını bana çevirdi. Mühendisler yalnızca 5 deneme uçuşu yapmamı planlamıştı; tek amacım “Mars’ta motorlu ve kontrollü uçuş mümkün mü?” sorusuna yanıt vermekti.',
          '19 Nisan 2021 sabahı pervanelerim hızla dönmeye başladı ve yerden 3 metre yükselip 39 saniye boyunca havada asılı kaldım! Bu, Dünya dışında başka bir gezegende gerçekleştirilen ilk motorlu uçuştu. İlk kalkış yaptığım alana tarihe saygı olarak “Wright Brothers Field” adı verildi.',
        ],
      },
      {
        id: 'ingenuity-ch3',
        chapterNumber: 'BÖLÜM 03',
        heading: '5 Uçuştan 72 Uçuşa: Gökyüzü Rehberi',
        paragraphs: [
          'Beş uçuşluk teknoloji gösterimini hatasız tamamlayınca NASA görevimi uzattı. Artık sadece bir deney değil, Perseverance’ın havadan keşif ortağıydım! Kayalık sırtların ve kum tepelerinin üzerinden uçarak arkadaşımın güvenli rota seçmesine yardımcı oldum.',
          'Neredeyse üç yıl boyunca tam 72 uçuş gerçekleştirdim ve Mars yüzeyinde toplam 17 kilometreden fazla mesafe kat ettim. Ocak 2024’te yaptığım 72. uçuşun ardından iniş sırasında rotor kanatlarımdan birinde hasar meydana geldi. Artık uçamasam da topladığım veriler gelecekte Mars’a gönderilecek yeni nesil hava araçlarının tasarımına ışık tutuyor.',
        ],
      },
    ],
    timeline: [
      {
        date: '18 Şubat 2021',
        title: 'Jezero Krateri’ne İniş',
        detail: 'Perseverance keşif aracının gövdesinin altında Mars yüzeyine ulaştım.',
      },
      {
        date: '19 Nisan 2021',
        title: 'Tarihi İlk Uçuş',
        detail: 'Başka bir gezegende ilk kez motorlu ve kontrollü uçuşu (3 m irtifa, 39,1 sn) başardım.',
      },
      {
        date: '2021 – 2023',
        title: 'Havadan Keşif Desteği',
        detail: 'Planlanan 5 uçuşu aşarak Perseverance için onlarca keşif uçuşu gerçekleştirdim.',
      },
      {
        date: 'Ocak 2024',
        title: '72. Uçuş ve Görev Sonu',
        detail: '18 Ocak 2024’teki 72. uçuşta oluşan kanat hasarı sonrası uçuş görevim onurla tamamlandı.',
      },
    ],
    discoveries: [
      {
        title: 'İnce Atmosferde Aerodinamik Kanıt',
        summary:
          'Dünya’nın ~%1’i yoğunluktaki karbondioksit atmosferinde otonom uçuşun mümkün ve sürdürülebilir olduğu kanıtlandı.',
      },
      {
        title: 'Geleceğin Mars Hava Araçları',
        summary:
          '72 uçuşluk veri seti, Mars’taki kanyon ve dik yamaçları inceleyecek gelecek hava araçları için temel oluşturdu.',
      },
    ],
    glossary: [
      {
        term: 'Atmosfer Yoğunluğu',
        explanation:
          'Birim hacimdeki gaz molekülü miktarı. Mars atmosferi Dünya’nın yaklaşık %1’i kadar incedir.',
      },
      {
        term: 'Ters Yönlü Rotor',
        explanation:
          'Birbirine zıt yönde dönen iki pervane seti; gövdenin kendi etrafında dönmesini engeller.',
      },
      {
        term: 'Teknoloji Gösterimi',
        explanation:
          'Yeni bir mühendislik fikrinin uzay ortamında çalışıp çalışmadığını test eden öncü görev.',
      },
    ],
    relatedRoverId: 'perseverance',
    relatedVehicleLabel: 'Perseverance Görev Dosyasını Aç',
    scenes: [
      {
        id: 'ing-s1',
        sceneNumber: 'SAHNE 01',
        title: 'Dünya’dan 100 Kat İnce Bir Gökyüzü',
        paragraphs: [
          '18 Şubat 2021’de Perseverance’ın altında Jezero Krateri’ne indim. Kütlesi yalnızca yaklaşık 1,8 kg olan küçücük bir helikopterim.',
        ],
        keyTakeaway: 'Mars atmosferi Dünya atmosferinin yalnızca yaklaşık %1’i kadar yoğundur.',
        learnMoreTitle: 'İnce havada uçmak neden bu kadar zor?',
        learnMoreDetail:
          'Hava molekülleri çok seyrek olduğu için pervaneler yeterince kaldırma kuvveti üretemez. Bu yüzden çok hafif tasarlandım.',
        interactionPrompt: '3D uçuş simülasyonunda ince Mars atmosferini deneyimle!',
      },
      {
        id: 'ing-s2',
        sceneNumber: 'SAHNE 02',
        title: 'Özel Ters Yönlü Pervaneler',
        paragraphs: [
          '1,2 metrelik karbon-fiber kanatlarım Dünya’daki helikopterlerden çok daha hızlı, dakikada yaklaşık 2.400 devir döner. Üstelik iki pervane birbirine zıt yönde dönerek dengemi korur.',
        ],
        keyTakeaway: 'Özel pervane tasarımı ve yüksek dönüş hızı olmadan Mars’ta havalanmak mümkün değildir.',
        learnMoreTitle: 'Neden kuyruk pervanem yok?',
        learnMoreDetail:
          'Ters yönlü (koaksiyel) iki ana rotor birbirinin dönme torkunu sıfırlar; böylece ek kuyruk rotoruna gerek kalmaz.',
        interactionPrompt: 'Kontrol panelinden "Kalkış" butonuna bas ve pervaneleri çalıştır.',
      },
      {
        id: 'ing-s3',
        sceneNumber: 'SAHNE 03',
        title: '19 Nisan 2021: Başka Gezegende İlk Uçuş',
        paragraphs: [
          '19 Nisan 2021 sabahı yerden 3 metre yükseldim ve 39 saniye havada asılı kaldım! Bu, insanlığın Dünya dışında gerçekleştirdiği ilk motorlu kontrollü uçuştu.',
        ],
        keyTakeaway: 'İlk kalkış noktama havacılık tarihine saygı olarak Wright Brothers Field adı verildi.',
        learnMoreTitle: 'Neden otonom uçmak zorundayım?',
        learnMoreDetail:
          'Mars ile Dünya arasındaki radyo sinyali dakikalarca sürer. Bu yüzden pilot Dünya’dan kumanda edemez; kendi kameralarımla dengemi korurum.',
        interactionPrompt: '"Yüksel" ile tırman, Mars yüzeyini yukarıdan incele!',
      },
      {
        id: 'ing-s4',
        sceneNumber: 'SAHNE 04',
        title: '5 Uçuştan 72 Uçuşa (Ocak 2024)',
        paragraphs: [
          'Sadece 5 deneme uçuşu için gönderildim ama tam 72 uçuş yaptım ve Perseverance’a havadan rehberlik ettim. Ocak 2024’teki 72. uçuşumun ardından görevimi tamamladım.',
        ],
        keyTakeaway: 'Planlanan 5 uçuşluk teknoloji gösterimi, 72 uçuşluk tarihi bir başarıya dönüştü.',
        learnMoreTitle: 'Görevim nasıl sona erdi?',
        learnMoreDetail:
          '18 Ocak 2024’teki 72. uçuşta kum tepelerine iniş sırasında rotor kanatlarımdan biri hasar aldı ve uçuş görevim onurla sonlandırıldı.',
        interactionPrompt: 'Kalkış + yükseliş + güvenli iniş yaparak "İlk Uçuş Pilotu" rozetini kazan!',
      },
    ],
  },
  {
    id: 'opportunity',
    orderNumber: '03',
    spacecraftName: 'OPPORTUNITY (MER-B)',
    badge: 'HİKÂYE 03 · 15 YILLIK MARATON',
    badgeTitle: 'Mars Jeoloğu',
    badgeSubtitle: 'Opportunity · Meridiani Planum',
    badgeIcon: '🔍',
    accentColor: '#f59e0b',
    title: 'Ben Opportunity: Mars’ın Sessiz Kâşifi',
    subtitle: '90 Gün İçin Yola Çıkıp Yaklaşık 15 Yıl Boyunca 45 Kilometre Aşan Yolculuk',
    quote:
      '“90 Mars günü için uyandım; ama Meridiani Planum’un ufukları o kadar merak uyandırıcıydı ki tam 45 kilometreden fazla yol aldım.”',
    readingTime: '4 dk okuma',
    image: '/assets/images/rovers/opportunity.jpg',
    imageAlt:
      'Opportunity (MER-B) keşif aracının Mars yüzeyinde Pancam kamerasıyla çekilen gerçek NASA otoportresi',
    imageCredit: 'NASA / JPL-Caltech / Cornell / ASU (PIA17759)',
    mediaKindLabel: 'GERÇEK NASA GÖREV FOTOĞRAFI',
    quickFacts: [
      { label: 'MARS’A İNİŞ', value: '25 Ocak 2004' },
      { label: 'GÖREV SÜRESİ', value: 'Yaklaşık 15 yıl (Planlanan: 90 sol)' },
      { label: 'MESAFE', value: '45 km’den fazla (45,16 km)' },
      { label: 'FOTOĞRAF', value: '217.000’den fazla' },
    ],
    chapters: [
      {
        id: 'opportunity-ch1',
        chapterNumber: 'BÖLÜM 01',
        heading: '90 Mars Günü Planı, 15 Yıllık Macera',
        paragraphs: [
          'Merhaba! Ben Opportunity, kısaca “Oppy”. 7 Temmuz 2003’te Dünya’dan fırlatıldım ve 25 Ocak 2004’te Mars’taki Meridiani Planum bölgesine, küçük bir kraterin tam içine iniş yaptım. Bilim insanları bu isabeti “gezegenler arası bir deliğe tek atışta golf topu sokmak” diye kutladı.',
          'Görev planım yalnızca 90 Mars günü (sol) sürecekti; çünkü Mars rüzgârlarının güneş panellerimi kısa sürede tozla kaplayıp enerjimi bitireceği düşünülüyordu. Ancak Mars rüzgârları zaman zaman panellerimi temizledi ve ben 90 gün yerine yaklaşık 15 yıl boyunca görev yapmayı başardım!',
        ],
      },
      {
        id: 'opportunity-ch2',
        chapterNumber: 'BÖLÜM 02',
        heading: 'Hematit “Yaban Mersinleri” ve Antik Sular',
        paragraphs: [
          'İndiğim Eagle Krateri’nin zemininde minik, gri ve yuvarlak taş kürecikler buldum. Araştırmacılar bunlara görünüşleri yüzünden “yaban mersini” adını verdi. Yapılarını incelediğimde onların hematit mineralinden oluştuğunu gördüm.',
          'Dünya’da hematit kürecikleri genellikle minerallerin su içinde çökelmesiyle oluşur. Yani milyarlarca yıl önce Meridiani Planum’un yüzeyinde sıvı suyun aktığı veya göllendiği bir dönem yaşanmıştı! Victoria ve dev Endeavour kraterlerinin kenarlarında da suyun izini taşıyan kil mineralleri ve damar yapıları keşfettim.',
        ],
      },
      {
        id: 'opportunity-ch3',
        chapterNumber: 'BÖLÜM 03',
        heading: '45 Kilometrelik Maraton ve 2018 Toz Fırtınası',
        paragraphs: [
          'Yıllar boyunca tekerleklerim durmaksızın döndü. Mars yüzeyinde 45 kilometreden fazla (45,16 km) yol alarak Dünya dışındaki bir gök cisminde en uzun mesafeyi kat eden gezici rekorunu kırdım ve Dünya’ya 217.000’den fazla görüntü gönderdim.',
          '2018 yılının Haziran ayında tüm gezegeni saran devasa bir toz fırtınası başladı. Gökyüzü o kadar karardı ki Güneş’i göremedim, güneş panellerim enerji üretemedi ve 10 Haziran 2018’de son sinyalimi gönderdim. Fırtına dindikten sonra NASA mühendisleri beni aylarca yeniden uyandırmaya çalıştı ama bataryalarım artık geri dönemeyecek kadar tükenmişti. İnsanlığın Mars’ı anlamasına sunduğum büyük mirasla görevim Şubat 2019’da resmen sona erdi.',
        ],
      },
    ],
    timeline: [
      {
        date: '7 Temmuz 2003',
        title: 'Dünya’dan Fırlatma',
        detail: 'İkizim Spirit’in ardından Delta II roketiyle Kızıl Gezegene doğru yola çıktım.',
      },
      {
        date: '25 Ocak 2004',
        title: 'Eagle Krateri’ne İniş',
        detail: 'Meridiani Planum’a indim ve ilk günden antik su izi taşıyan hematit küreciklerini buldum.',
      },
      {
        date: '2011 – 2018',
        title: 'Endeavour Krateri ve 45,16 km Rekoru',
        detail: '45 km’den fazla yol aldım; 217.000’den fazla fotoğraf ile Mars jeolojisini belgeledim.',
      },
      {
        date: 'Haziran 2018 / Şubat 2019',
        title: 'Küresel Toz Fırtınası ve Veda',
        detail: '2018’deki dev toz fırtınası güneş ışığını kesti; yaklaşık 15 yıllık efsanevi görevim sona erdi.',
      },
    ],
    discoveries: [
      {
        title: 'Hematit Kürecikleri ve Antik Su',
        summary:
          'Meridiani Planum’daki hematit “yaban mersinleri”, bölgenin geçmişte sıvı suyla temas ettiğini doğruladı.',
      },
      {
        title: '45+ km Odometri ve 217.000+ Görüntü',
        summary:
          'Yaklaşık 15 yıllık kesintisiz gözlem, Mars iklimi, krater jeolojisi ve toz fırtınaları hakkında eşsiz veri sağladı.',
      },
    ],
    glossary: [
      {
        term: 'Hematit',
        explanation:
          'Demir oksit içeren bir mineral. Çoğunlukla sıvı suyun bulunduğu ortamlarda oluşur.',
      },
      {
        term: 'Küresel Toz Fırtınası',
        explanation:
          'Mars’ın tamamını haftalarca kaplayabilen, güneş ışığının yüzeye ulaşmasını engelleyen dev fırtına.',
      },
      {
        term: 'Odometri',
        explanation:
          'Bir aracın tekerlek dönüşlerini ve hareketini ölçerek kat ettiği toplam mesafeyi hesaplama yöntemi.',
      },
    ],
    relatedRoverId: 'opportunity',
    relatedVehicleLabel: 'Opportunity Teknik Dosyasını Aç',
    scenes: [
      {
        id: 'opp-s1',
        sceneNumber: 'SAHNE 01',
        title: '90 Günlük Plan, 15 Yıllık Yolculuk',
        paragraphs: [
          '25 Ocak 2004’te Meridiani Planum’a indim. Mühendisler yalnızca 90 Mars günü (sol) çalışacağımı sanıyordu; ama Mars rüzgârları güneş panellerimi temizledikçe yaklaşık 15 yıl yaşadım!',
        ],
        keyTakeaway: 'Planlanan görev süresi 90 sol, gerçekleşen aktif görev süresi ise yaklaşık 15 yıldır.',
        learnMoreTitle: 'Güneş panellerini rüzgâr nasıl temizledi?',
        learnMoreDetail:
          'Mars’taki küçük toz şeytanları (dust devils) zaman zaman panellerin üzerindeki ince tozu süpürerek enerji üretimimi yeniden artırdı.',
        interactionPrompt: '3D araştırmada Opportunity’yi sür ve ipuçlarını bul!',
      },
      {
        id: 'opp-s2',
        sceneNumber: 'SAHNE 02',
        title: 'Hematit “Yaban Mersinleri” Nedir?',
        paragraphs: [
          'Eagle Krateri’nde küçük, gri ve yuvarlak mineral kürecikleri buldum. Bilim insanları bunlara “yaban mersini” dedi; yapıları demir oksit minerali olan hematitten oluşuyordu.',
        ],
        keyTakeaway: 'Hematit kürecikleri genellikle sıvı suyun bulunduğu ortamlarda çökelerek oluşur.',
        learnMoreTitle: 'Bilim insanları kayaçlardan nasıl sonuç çıkarır?',
        learnMoreDetail:
          'Kayaların şekli, katmanları ve mineral yapısı mikroskopla ve spektrometrelerle incelenir; ardından Dünya’daki benzer oluşumlarla karşılaştırılır.',
        interactionPrompt: '3D yüzeyde hematit küreciklerini ve katmanlı kayaları incele.',
      },
      {
        id: 'opp-s3',
        sceneNumber: 'SAHNE 03',
        title: 'Su Kanıtı Tek Başına Yaşam Kanıtı Mıdır?',
        paragraphs: [
          'Bulduğum hematit ve kil mineralleri Mars’ta geçmişte sıvı su bulunduğunu kanıtladı. Ancak dikkat: suyun varlığı yaşam için gerekli bir koşul olsa da, tek başına geçmişte yaşam olduğunun kanıtı değildir!',
        ],
        keyTakeaway: 'Jeolojik su kanıtı, bölgenin "yaşanabilir" olabileceğini gösterir; yaşamın kendisini kanıtlamaz.',
        learnMoreTitle: 'Yaşamı kanıtlamak için ne gerekir?',
        learnMoreDetail:
          'Biyo-imza adı verilen organik molekül desenleri, fosil izleri veya biyolojik kökenli kimyasal izotopların doğrudan doğrulanması gerekir.',
        interactionPrompt: 'Tüm ipuçlarını toplayarak Keşif Raporunu oluştur!',
      },
      {
        id: 'opp-s4',
        sceneNumber: 'SAHNE 04',
        title: '45 km+ Maraton ve 2018 Toz Fırtınası',
        paragraphs: [
          '45 kilometreden fazla (45,16 km) yol aldım ve 217.000’den fazla fotoğraf gönderdim. 2018’deki küresel toz fırtınası Güneş’i kapatınca enerji üretemedim ve görevim Şubat 2019’da sona erdi.',
        ],
        keyTakeaway: 'Opportunity, Dünya dışındaki en uzun mesafe rekorunu 45,16 km ile kırmıştır.',
        learnMoreTitle: '2018 toz fırtınası neden bu kadar tehlikeliydi?',
        learnMoreDetail:
          'Tüm gezegeni haftalarca saran toz bulutu gökyüzünü kararttı; güneş panelleri şarj olamayınca ısıtıcılar da çalışamadı.',
        interactionPrompt: 'Araştırmayı tamamla ve "Mars Jeoloğu" rozetini kazan!',
      },
    ],
  },
  {
    id: 'apollo-lrv',
    orderNumber: '04',
    spacecraftName: 'APOLLO LUNAR ROVING VEHICLE (LRV)',
    badge: 'HİKÂYE 04 · AY’IN İLK ELEKTRİKLİ ARABASI',
    badgeTitle: 'Ay Gezgini',
    badgeSubtitle: 'Apollo LRV · Apollo 15–17',
    badgeIcon: '🌕',
    accentColor: '#a78bfa',
    title: 'Ben Ay Gezgini: Ay’ın Sessiz Yollarında',
    subtitle: 'Apollo 15, 16 ve 17 Astronotlarını Bilimin Ufkuna Taşıyan Elektrikli Kâşif',
    quote:
      '“Katlanıp bir roketin yanına sığdım; Ay’da açıldığımda ise astronotları kraterlerin ötesine taşıyan ilk elektrikli araba oldum.”',
    readingTime: '3 dk okuma',
    image: '/assets/images/lunar/apollo-17-lrv.jpg',
    imageAlt:
      'Apollo 17 Komutanı Eugene Cernan’ın Taurus–Littrow Vadisi’nde Lunar Roving Vehicle (LRV-003) ile çekilen gerçek NASA fotoğrafı',
    imageCredit: 'NASA (AS17-147-22526)',
    mediaKindLabel: 'GERÇEK NASA APOLLO FOTOĞRAFI',
    quickFacts: [
      { label: 'GÖREVLER', value: 'Apollo 15, 16 ve 17' },
      { label: 'GÖREV YILLARI', value: '1971–1972' },
      { label: 'EN YÜKSEK HIZ', value: 'Yaklaşık 13 km/sa' },
      { label: 'TOPLAM MESAFE', value: 'Yaklaşık 90 km (3 görev)' },
    ],
    chapters: [
      {
        id: 'apollo-lrv-ch1',
        chapterNumber: 'BÖLÜM 01',
        heading: 'Katlanabilir Tasarım ve Elektrikli Dört Tekerlek',
        paragraphs: [
          'Merhaba! Ben Apollo Lunar Roving Vehicle (LRV), yani Ay Gezgini. İlk Apollo görevlerinde astronotlar ağır uzay giysileriyle yürüyerek iniş araçlarından fazla uzaklaşamıyordu. Bilim insanları daha uzak kraterlerden taş ve toprak örnekleri toplayabilmek için beni geliştirdi.',
          'Dünya’da 210 kilogram ağırlığındaydım ama Ay’ın zayıf yerçekiminde yalnızca 35 kilogram gibi hissediliyordum. Roketin ve Ay Modülü’nün dar bölmesine sığabilmem için katlanabilir bir şasiyle tasarlandım. Yüzeye indiğimde astronotlar ipleri çekti ve ben dakikalar içinde açılarak dört tekerleğimin üzerine indim!',
        ],
      },
      {
        id: 'apollo-lrv-ch2',
        chapterNumber: 'BÖLÜM 02',
        heading: 'Apollo 15, 16 ve 17’de Tarihi Yolculuklar',
        paragraphs: [
          'Hava olmadığından içten yanmalı bir motor kullanamazdım; bu yüzden dört tekerleğimin her birinde ayrı bir elektrik motoru ve iki adet 36 voltluk pilim vardı. Tel örgü tekerleklerimle Ay tozunun içinde saatte yaklaşık 13 kilometre hıza ulaşabiliyordum.',
          '1971 ve 1972 yıllarında Apollo 15, Apollo 16 ve Apollo 17 görevlerinde toplam üç kardeş olarak görev yaptık. Astronotları, bilimsel cihazları ve yüzlerce kilogram Ay kaya örneğini güvenle taşıdık. Apollo 15’te 27,9 km, Apollo 16’da 26,7 km ve Apollo 17’de 35,9 km yol alarak üç görevde toplam yaklaşık 90 kilometre mesafe kat ettik.',
        ],
      },
      {
        id: 'apollo-lrv-ch3',
        chapterNumber: 'BÖLÜM 03',
        heading: 'Bugün Hâlâ Ay’ın Sessiz Yüzeyindeyiz',
        paragraphs: [
          'Görevlerimiz tamamlandığında astronotlar Ay Modülü ile Dünya’ya döndü; ama bizi yanlarında geri götürmeleri mümkün değildi. Her birimiz iniş bölgelerimizin biraz uzağına park edildik.',
          'Ayrılmadan önce uzaktan kumandalı televizyon kameralarımızla astronotların Ay’dan kalkış anlarını canlı olarak Dünya’ya aktardık. Bugün bile üç Ay Gezgini olarak Hadley Rille, Descartes Yaylaları ve Taurus–Littrow Vadisi’nde sessizce duruyor, insanlığın Ay’daki izlerini koruyoruz.',
        ],
      },
    ],
    timeline: [
      {
        date: '31 Temmuz 1971',
        title: 'Apollo 15 · İlk Ay Sürüşü',
        detail: 'Hadley-Apennine bölgesinde LRV-1 ile 27,9 km yol kat edildi.',
      },
      {
        date: '21 Nisan 1972',
        title: 'Apollo 16 · Descartes Yaylaları',
        detail: 'LRV-2 ile krater kenarları incelendi; 26,7 km sürüş gerçekleştirildi.',
      },
      {
        date: '11–14 Aralık 1972',
        title: 'Apollo 17 · Mesafe Rekoru',
        detail: 'LRV-3 ile 35,9 km kat edilerek üç görevde toplam ~90 km mesafeye ulaşıldı.',
      },
      {
        date: '1972 – Günümüz',
        title: 'Ay Yüzeyindeki Sessiz Anıtlar',
        detail: 'Üç LRV de görevlerin ardından Ay yüzeyinde bırakıldı ve bugün hâlâ orada bulunuyor.',
      },
    ],
    discoveries: [
      {
        title: 'Keşif Menzilinin Katlanması',
        summary:
          'LRV sayesinde astronotlar yürüyerek ulaşabileceklerinin çok ötesine, iniş noktasından kilometrelerce uzağa gidebildi.',
      },
      {
        title: 'Zengin Ay Jeolojisi Örnekleri',
        summary:
          'Üç görevde yüzlerce kilogramlık farklı Ay kayaçları ve volkanik cam örnekleri Dünya laboratuvarlarına getirildi.',
      },
    ],
    glossary: [
      {
        term: 'Ay Modülü (LM)',
        explanation:
          'Apollo astronotlarını Ay yörüngesinden yüzeye indiren ve tekrar yörüngeye çıkaran iki kademeli uzay aracı.',
      },
      {
        term: 'Tel Örgü Tekerlek',
        explanation:
          'Kauçuk lastik yerine esnek piyano teli ve titanyum şeritlerden yapılan, Ay tozunda batmayan özel tekerlek.',
      },
      {
        term: 'Regolit',
        explanation:
          'Ay yüzeyini örten ince, keskin kenarlı toz ve kırılmış kaya tabakası.',
      },
    ],
    relatedLunarMissionId: 'apollo-17-lrv',
    relatedVehicleLabel: 'Apollo 17 LRV Dosyasını Aç',
    scenes: [
      {
        id: 'lrv-s1',
        sceneNumber: 'SAHNE 01',
        title: 'Astronotlar Neden Ay Gezgini’ne İhtiyaç Duydu?',
        paragraphs: [
          'Ağır uzay giysileriyle yürüyen astronotlar iniş aracından fazla uzaklaşamıyordu. Bilim insanları, daha uzak kraterlere ve dağ eteklerine ulaşabilmeleri için beni geliştirdi.',
        ],
        keyTakeaway: 'LRV, Apollo 15, 16 ve 17 görevlerinde astronotların keşif menzilini katladı.',
        learnMoreTitle: 'Katlanabilir tasarım nasıl sığdı?',
        learnMoreDetail:
          'Dünya’da 210 kg olan gövdem, Ay Modülü’nün yan bölmesine katlanarak yerleştirildi ve yüzeye inince dakikalar içinde açıldı.',
        interactionPrompt: '3D Ay sürüşünde astronotları hedef noktalara ulaştır!',
      },
      {
        id: 'lrv-s2',
        sceneNumber: 'SAHNE 02',
        title: 'Düşük Ay Yerçekimi ve Elektrikli Sürüş',
        paragraphs: [
          'Ay’ın yerçekimi Dünya’nın yaklaşık altıda biridir; bu yüzden taşlar ve toz çok daha farklı davranır. Hava olmadığı için benzinli motor yerine dört tekerleğimde elektrik motorları ve piller taşıdım.',
        ],
        keyTakeaway: 'Ay Gezgini tamamen elektrikle çalışan 4 tekerlekli bir uzay taşıtıydı.',
        learnMoreTitle: 'Neden kauçuk lastik kullanılmadı?',
        learnMoreDetail:
          'Ay’daki aşırı sıcaklık farkları ve vakum ortamı kauçuğu bozardı. Bunun yerine esnek piyano teli örgü tekerlekler kullanıldı.',
        interactionPrompt: 'Sürüş sırasında sağ üstteki enerji (batarya) göstergesini takip et!',
      },
      {
        id: 'lrv-s3',
        sceneNumber: 'SAHNE 03',
        title: 'Kraterlerden Kaçın, Örnek Topla!',
        paragraphs: [
          'Saatte yaklaşık 13 km hıza çıkabiliyordum. Apollo 15, 16 ve 17 görevlerinde toplam yaklaşık 90 km yol alarak astronotları, bilimsel cihazları ve yüzlerce kilo Ay kayasını taşıdım.',
        ],
        keyTakeaway: 'Üç Apollo görevinde (15, 16, 17) toplam yaklaşık 90 km mesafe kat edildi.',
        learnMoreTitle: 'En yüksek hız ne kadardı?',
        learnMoreDetail:
          'Düz zeminde saatte yaklaşık 13 km hızla ilerlerken, Apollo 17’de bir iniş eğiminde kısa süreli ~18 km/sa hız kaydedildi.',
        interactionPrompt: 'Krater ve kayalara çarpmadan kaya örneği toplama noktasına ulaş!',
      },
      {
        id: 'lrv-s4',
        sceneNumber: 'SAHNE 04',
        title: 'Bugün Hâlâ Ay Yüzeyindeyiz',
        paragraphs: [
          'Görevler bittiğinde Dünya’ya geri götürülmedik. Üç Ay Gezgini de iniş bölgelerinin yakınında bırakıldı; bugün hâlâ Ay’ın sessiz yüzeyinde duruyoruz.',
        ],
        keyTakeaway: 'Apollo 15, 16 ve 17’nin üç Ay Gezgini de günümüzde hâlâ Ay’dadır.',
        learnMoreTitle: 'Ayrılmadan önce son görevleri neydi?',
        learnMoreDetail:
          'Uzaktan kumandalı televizyon kameraları, astronotların Ay Modülü ile Ay’dan kalkış anını Dünya’ya canlı yayınladı.',
        interactionPrompt: 'Kaya örneğini topla ve "Ay Gezgini" rozetini kazan!',
      },
    ],
  },
];
