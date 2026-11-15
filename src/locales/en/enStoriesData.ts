import type { ExplorerStoryItem } from '@/types';

/**
 * First-person, scientifically accurate English explorer stories
 * tailored for 13–15 year-old students.
 */
export const EN_EXPLORER_STORIES: readonly ExplorerStoryItem[] = [
  {
    id: 'sojourner',
    orderNumber: '01',
    spacecraftName: 'SOJOURNER (MARS PATHFINDER)',
    badge: 'STORY 01 · FIRST MARS ROVER',
    badgeTitle: 'First Mars Explorer',
    badgeSubtitle: 'Sojourner · Ares Vallis',
    badgeIcon: '🪨',
    accentColor: '#fb923c',
    title: 'The Tiny Explorer of the Red Planet: Sojourner’s Great Adventure',
    subtitle: 'The Very First Wheel Tracks Across the Rocky Plains of Ares Vallis',
    quote:
      '“I was only the size of a microwave oven, yet the moment my wheels touched the Red Planet, humanity’s way of exploring Mars changed forever.”',
    readingTime: '3 min read',
    image: '/assets/images/rovers/sojourner.jpg',
    imageAlt:
      'NASA Mars Pathfinder photograph showing the Sojourner rover analyzing Yogi Rock in Ares Vallis',
    imageCredit: 'NASA / JPL (PIA01122)',
    mediaKindLabel: 'ACTUAL NASA MISSION PHOTO',
    quickFacts: [
      { label: 'MARS LANDING', value: 'July 4, 1997' },
      { label: 'REGION', value: 'Ares Vallis' },
      { label: 'DURATION', value: '83 Martian days (sols)' },
      { label: 'PHOTOS', value: 'Approx. 550' },
    ],
    chapters: [
      {
        id: 'sojourner-ch1',
        chapterNumber: 'CHAPTER 01',
        heading: 'Bouncing Down on Giant Airbags',
        paragraphs: [
          'Hello! I am Sojourner. When I left Earth aboard Mars Pathfinder on December 4, 1996, nobody knew for sure if a small robot could roam freely on another planet. Weighing just 10.6 kilograms, I was roughly the size of a microwave oven.',
          'When we entered the Martian atmosphere on July 4, 1997, we did not touch down gently with landing legs like earlier missions. Instead, giant airbags inflated all around us! After our parachute and braking rockets fired, we bounced roughly 15 times across the rocky plain of Ares Vallis before rolling to a stop. When the protective petals opened, I saw an ancient flood channel covered in rusty stones.',
        ],
      },
      {
        id: 'sojourner-ch2',
        chapterNumber: 'CHAPTER 02',
        heading: 'The First Wheel Tracks on Mars',
        paragraphs: [
          'My six wheels were mounted on a special Rocker-Bogie suspension system so I could climb over rocks without tipping over. When I rolled slowly down the lander ramp and left the very first wheel tracks in Martian soil, cheers erupted in Mission Control back on Earth.',
          'My job was not to drive miles away on my own, but to stay near the main lander—named the Carl Sagan Memorial Station—and examine nearby rocks. Scientists gave the intriguing boulders playful nicknames like “Barnacle Bill” and “Yogi.” Using my Alpha Proton X-Ray Spectrometer (APXS), I pressed right up against them to measure their chemical makeup.',
        ],
      },
      {
        id: 'sojourner-ch3',
        chapterNumber: 'CHAPTER 03',
        heading: '83 Martian Days (Sols) Instead of 7',
        paragraphs: [
          'Engineers originally designed me to last just 7 Martian days (sols), hoping at best for 30 sols. Yet my solar panel kept gathering sunlight, and I survived freezing Martian nights for an incredible 83 sols!',
          'Along the way, I sent back approximately 550 photographs, adding to the thousands of images captured by the lander. The rounded pebbles and stacked boulders I studied helped prove that Ares Vallis had been swept by massive floods billions of years ago. When my final signal faded on September 27, 1997, I had paved the way for Spirit, Opportunity, Curiosity, and Perseverance.',
        ],
      },
    ],
    timeline: [
      {
        date: 'December 4, 1996',
        title: 'Launch from Earth',
        detail: 'Lifted off aboard a Delta II rocket inside the Mars Pathfinder spacecraft.',
      },
      {
        date: 'July 4, 1997',
        title: 'Airbag Landing at Ares Vallis',
        detail: 'Bounced to a safe stop inside protective airbags and rolled onto Martian soil.',
      },
      {
        date: 'July – September 1997',
        title: '83 Sols of Science',
        detail: 'Analyzed Barnacle Bill and Yogi rocks and returned approximately 550 images.',
      },
      {
        date: 'September 27, 1997',
        title: 'Final Signal & Legacy',
        detail: 'Ended operations after 83 Martian days—nearly twelve times my primary 7-sol goal.',
      },
    ],
    discoveries: [
      {
        title: 'Evidence of Ancient Megafloods',
        summary:
          'Rounded pebbles and rock orientations at Ares Vallis confirmed that powerful liquid water currents once shaped the region.',
      },
      {
        title: 'Martian Rock Chemistry',
        summary:
          'APXS measurements revealed silica-rich rocks, expanding scientists’ understanding of Mars’s volcanic and crustal history.',
      },
    ],
    glossary: [
      {
        term: 'Sol (Martian Day)',
        explanation:
          'One full rotation of Mars on its axis, lasting 24 hours, 39 minutes, and 35 seconds.',
      },
      {
        term: 'Airbag Landing',
        explanation:
          'A cluster of tough gas-filled bags that cushions a spacecraft as it bounces across a planet’s surface.',
      },
      {
        term: 'APXS Spectrometer',
        explanation:
          'A sensor that measures X-rays and particles from a rock to identify its chemical elements.',
      },
    ],
    relatedRoverId: 'spirit',
    relatedVehicleLabel: 'Explore Mars Rovers',
    scenes: [
      {
        id: 'soj-s1',
        sceneNumber: 'SCENE 01',
        title: 'Bouncing Down on Airbags',
        paragraphs: [
          'I launched on December 4, 1996, and plunged into Mars’s sky on July 4, 1997. Instead of landing legs, giant airbags inflated around us and bounced ~15 times across Ares Vallis!',
        ],
        keyTakeaway: 'Sojourner weighed just 10.6 kg—roughly the size of a microwave oven.',
        learnMoreTitle: 'Why use airbags on Mars?',
        learnMoreDetail:
          'Heavy landing legs could tip over on rocky terrain like Ares Vallis. Tough airbags absorbed the impact while saving mass and cost.',
        interactionPrompt: 'Get ready to drive Sojourner in the 3D scene below!',
      },
      {
        id: 'soj-s2',
        sceneNumber: 'SCENE 02',
        title: 'First Wheel Tracks on the Red Planet',
        paragraphs: [
          'I rolled down the lander ramp and became the first rover to move freely on another planet. My 6-wheel Rocker-Bogie suspension let me climb over rocks without tipping.',
        ],
        keyTakeaway: 'Sojourner left the very first robotic wheel tracks on Mars.',
        learnMoreTitle: 'How does Rocker-Bogie suspension work?',
        learnMoreDetail:
          'Using joints instead of springs, it keeps the rover body steady even when one wheel climbs a rock twice its height.',
        interactionPrompt: 'Use arrow keys or touch buttons in 3D to leave your first tracks.',
      },
      {
        id: 'soj-s3',
        sceneNumber: 'SCENE 03',
        title: 'Secrets of Barnacle Bill and Yogi Rocks',
        paragraphs: [
          'I drove up to nearby boulders and pressed my APXS sensor against them. Rounded pebbles and stacked rocks showed that Ares Vallis was shaped by ancient megafloods.',
        ],
        keyTakeaway: 'Rock chemistry and rounded pebbles point to ancient liquid water on Mars.',
        learnMoreTitle: 'How does APXS read a rock’s chemistry?',
        learnMoreDetail:
          'The Alpha Proton X-Ray Spectrometer sends harmless particles into the rock and measures reflected X-rays to identify elements.',
        interactionPrompt: 'Drive near and click all 3 rock samples on the 3D Martian surface!',
      },
      {
        id: 'soj-s4',
        sceneNumber: 'SCENE 04',
        title: '83 Martian Days (Sols) Instead of 7',
        paragraphs: [
          'Engineers expected just 7 Martian days (sols), yet I lasted 83 sols and sent back ~550 photos—paving the way for every Mars rover after me.',
        ],
        keyTakeaway: 'One Martian day (sol) is 24 hours 39 minutes—not the same as an Earth day.',
        learnMoreTitle: 'Why did the mission end on September 27, 1997?',
        learnMoreDetail:
          'As Martian winter approached, the main lander’s battery froze and could no longer relay signals to Earth.',
        interactionPrompt: 'Collect all 3 samples to earn the "First Mars Explorer" badge!',
      },
    ],
  },
  {
    id: 'ingenuity',
    orderNumber: '02',
    spacecraftName: 'INGENUITY (MARS HELICOPTER)',
    badge: 'STORY 02 · FIRST FLIGHT ON ANOTHER WORLD',
    badgeTitle: 'First Flight Pilot',
    badgeSubtitle: 'Ingenuity · Jezero Crater',
    badgeIcon: '🚁',
    accentColor: '#38bdf8',
    title: 'Hello! I Am Ingenuity',
    subtitle: 'The 1.8 kg Helicopter That Flew 72 Times Through Thin Martian Skies',
    quote:
      '“They told me flying on Mars was nearly impossible. Built for just 5 test flights, I soared through the Martian sky 72 times!”',
    readingTime: '3 min read',
    image: '/assets/images/rovers/perseverance-ingenuity.jpg',
    imageAlt:
      'Real NASA photograph of the Perseverance rover alongside the Ingenuity Mars Helicopter in Jezero Crater',
    imageCredit: 'NASA / JPL-Caltech / MSSS (PIA24542)',
    mediaKindLabel: 'ACTUAL NASA MISSION PHOTO',
    quickFacts: [
      { label: 'MASS', value: 'Approx. 1.8 kg' },
      { label: 'MARS LANDING', value: 'February 18, 2021' },
      { label: 'FIRST FLIGHT', value: 'April 19, 2021' },
      { label: 'TOTAL FLIGHTS', value: '72 (through Jan 2024)' },
    ],
    chapters: [
      {
        id: 'ingenuity-ch1',
        chapterNumber: 'CHAPTER 01',
        heading: 'Flying in Air 100 Times Thinner Than Earth’s',
        paragraphs: [
          'Hello! I am Ingenuity. On February 18, 2021, I landed in Jezero Crater tucked safely beneath the belly of my giant companion, Perseverance. With a mass of only about 1.8 kilograms, my core body is roughly the size of a tissue box.',
          'Flying on Mars is nothing like flying on Earth. Mars’s atmosphere is only about 1% as dense as Earth’s! To generate enough lift in such thin air, I had to be ultra-lightweight and spin my 1.2-meter carbon-fiber rotor blades far faster than an Earth helicopter—around 2,400 revolutions per minute.',
        ],
      },
      {
        id: 'ingenuity-ch2',
        chapterNumber: 'CHAPTER 02',
        heading: 'April 19, 2021: A Wright Brothers Moment',
        paragraphs: [
          'After Perseverance gently set me down on the Martian surface, the rover drove a safe distance away and aimed its cameras at me. Engineers had planned just 5 test flights to answer one historic question: could powered, controlled flight even work on Mars?',
          'On the morning of April 19, 2021, my blades spun up, and I climbed 3 meters into the thin sky, hovering for 39 seconds! It was the first powered, controlled flight ever achieved on another planet. NASA named my takeoff spot “Wright Brothers Field” in honor of aviation history.',
        ],
      },
      {
        id: 'ingenuity-ch3',
        chapterNumber: 'CHAPTER 03',
        heading: 'From 5 Flights to 72: Aerial Scout on Mars',
        paragraphs: [
          'Once I aced all five technology-demonstration flights, NASA extended my mission. I became an aerial scout for Perseverance, flying ahead over rocky ridges and sand dunes to help the team plan safer driving routes.',
          'Over nearly three years, I completed 72 flights and traveled more than 17 kilometers across Mars. Following my 72nd flight in January 2024, one of my rotor blades suffered damage during landing, bringing my flying days to an end. Even grounded, the flight data I gathered is helping engineers design the next generation of Martian aircraft.',
        ],
      },
    ],
    timeline: [
      {
        date: 'February 18, 2021',
        title: 'Landing at Jezero Crater',
        detail: 'Arrived on Mars attached to the underside of the Perseverance rover.',
      },
      {
        date: 'April 19, 2021',
        title: 'Historic First Flight',
        detail: 'Achieved humanity’s first powered flight on another planet (3 m altitude, 39.1 s).',
      },
      {
        date: '2021 – 2023',
        title: 'Aerial Scouting Operations',
        detail: 'Surpassed the 5-flight goal to scout terrain and science targets ahead of Perseverance.',
      },
      {
        date: 'January 2024',
        title: 'Flight 72 & Mission Conclusion',
        detail: 'Concluded flight operations after rotor blade damage on Flight 72 (January 18, 2024).',
      },
    ],
    discoveries: [
      {
        title: 'Aerodynamic Flight in Thin CO₂ Air',
        summary:
          'Proved that autonomous rotorcraft can take off, navigate, and land reliably in an atmosphere ~1% as dense as Earth’s.',
      },
      {
        title: 'Blueprint for Future Mars Aircraft',
        summary:
          'Data from 72 flights directly informs future aerial explorers designed to reach cliffs, canyons, and craters.',
      },
    ],
    glossary: [
      {
        term: 'Atmospheric Density',
        explanation:
          'How tightly gas molecules are packed in air; Mars’s air is only about 1% as dense as Earth’s.',
      },
      {
        term: 'Counter-Rotating Rotors',
        explanation:
          'Two stacked blade sets spinning in opposite directions to keep the helicopter stable without a tail rotor.',
      },
      {
        term: 'Technology Demonstration',
        explanation:
          'A pioneering test mission designed to prove whether a new engineering concept works in space.',
      },
    ],
    relatedRoverId: 'perseverance',
    relatedVehicleLabel: 'Open Perseverance Dossier',
    scenes: [
      {
        id: 'ing-s1',
        sceneNumber: 'SCENE 01',
        title: 'Air 100 Times Thinner Than Earth’s',
        paragraphs: [
          'On February 18, 2021, I landed in Jezero Crater tucked under Perseverance. At only ~1.8 kg, I am a tiny helicopter built for extreme thin air.',
        ],
        keyTakeaway: 'Mars’s atmosphere is only about 1% as dense as Earth’s atmosphere.',
        learnMoreTitle: 'Why is thin air so hard to fly in?',
        learnMoreDetail:
          'With far fewer air molecules to push against, blades generate very little lift unless the craft is ultra-light.',
        interactionPrompt: 'Experience thin Martian air in the 3D flight simulation!',
      },
      {
        id: 'ing-s2',
        sceneNumber: 'SCENE 02',
        title: 'Special Counter-Rotating Blades',
        paragraphs: [
          'My 1.2-meter carbon-fiber blades spin at ~2,400 RPM—much faster than Earth helicopters—and rotate in opposite directions to keep me balanced.',
        ],
        keyTakeaway: 'Specialized high-speed rotors are essential to generate lift on Mars.',
        learnMoreTitle: 'Why don’t I have a tail rotor?',
        learnMoreDetail:
          'Two coaxial rotors spinning in opposite directions cancel each other’s torque, saving weight and complexity.',
        interactionPrompt: 'Press "Takeoff" on the control deck to spin up the rotors.',
      },
      {
        id: 'ing-s3',
        sceneNumber: 'SCENE 03',
        title: 'April 19, 2021: First Flight on Another World',
        paragraphs: [
          'On April 19, 2021, I climbed 3 meters and hovered for 39 seconds—achieving humanity’s first powered, controlled flight on another planet!',
        ],
        keyTakeaway: 'NASA named my takeoff site “Wright Brothers Field” to honor aviation history.',
        learnMoreTitle: 'Why must I fly autonomously?',
        learnMoreDetail:
          'Radio signals take minutes to travel between Earth and Mars, so I use onboard cameras and sensors to balance myself.',
        interactionPrompt: 'Use "Ascend" to climb and view Mars from above!',
      },
      {
        id: 'ing-s4',
        sceneNumber: 'SCENE 04',
        title: 'From 5 Flights to 72 (January 2024)',
        paragraphs: [
          'Built for just 5 test flights, I completed 72 flights and scouted ahead for Perseverance until my final flight in January 2024.',
        ],
        keyTakeaway: 'A 5-flight tech demo grew into a 72-flight aerial scouting triumph.',
        learnMoreTitle: 'How did the mission conclude?',
        learnMoreDetail:
          'During Flight 72 on January 18, 2024, one rotor blade was damaged upon landing on rippled sand dunes.',
        interactionPrompt: 'Take off, climb, and land safely to earn the "First Flight Pilot" badge!',
      },
    ],
  },
  {
    id: 'opportunity',
    orderNumber: '03',
    spacecraftName: 'OPPORTUNITY (MER-B)',
    badge: 'STORY 03 · 15-YEAR MARATHON',
    badgeTitle: 'Mars Geologist',
    badgeSubtitle: 'Opportunity · Meridiani Planum',
    badgeIcon: '🔍',
    accentColor: '#f59e0b',
    title: 'I Am Opportunity: The Silent Explorer of Mars',
    subtitle: 'Planned for 90 Martian Days, Driven Over 45 Kilometers Across Nearly 15 Years',
    quote:
      '“I woke up for a 90-sol mission, yet the horizons of Meridiani Planum were so captivating that I drove more than 45 kilometers.”',
    readingTime: '4 min read',
    image: '/assets/images/rovers/opportunity.jpg',
    imageAlt:
      'Real NASA Pancam self-portrait of the Opportunity (MER-B) rover on the Martian surface',
    imageCredit: 'NASA / JPL-Caltech / Cornell / ASU (PIA17759)',
    mediaKindLabel: 'ACTUAL NASA MISSION PHOTO',
    quickFacts: [
      { label: 'MARS LANDING', value: 'January 25, 2004' },
      { label: 'DURATION', value: 'Approx. 15 years (Planned: 90 sols)' },
      { label: 'DISTANCE', value: 'Over 45 km (45.16 km)' },
      { label: 'PHOTOS', value: 'Over 217,000' },
    ],
    chapters: [
      {
        id: 'opportunity-ch1',
        chapterNumber: 'CHAPTER 01',
        heading: 'A 90-Sol Plan That Lasted Nearly 15 Years',
        paragraphs: [
          'Hello! I am Opportunity—or “Oppy” to my team. I launched from Earth on July 7, 2003, and landed inside a small crater on Meridiani Planum on January 25, 2004. Scientists celebrated the bullseye landing as an “interplanetary hole-in-one.”',
          'My primary mission was planned for just 90 Martian days (sols), because engineers expected Martian dust to coat my solar panels and drain my power. Instead, Martian winds repeatedly swept my panels clean, allowing me to keep exploring for nearly 15 years!',
        ],
      },
      {
        id: 'opportunity-ch2',
        chapterNumber: 'CHAPTER 02',
        heading: 'Hematite “Blueberries” and Ancient Water',
        paragraphs: [
          'Right inside Eagle Crater, I spotted tiny, round, gray mineral spheres scattered across the soil. Researchers nicknamed them “blueberries.” When I examined them closely, I found they were rich in the iron-oxide mineral hematite.',
          'On Earth, hematite spheres typically form when minerals precipitate inside water-soaked rock. That discovery proved Meridiani Planum once held liquid water! Later, along the rims of Victoria and giant Endeavour craters, I uncovered clay minerals and mineral veins formed in ancient watery environments.',
        ],
      },
      {
        id: 'opportunity-ch3',
        chapterNumber: 'CHAPTER 03',
        heading: 'The 45 km Marathon and the 2018 Dust Storm',
        paragraphs: [
          'Year after year, my wheels kept turning. I drove more than 45 kilometers (45.16 km)—setting the all-time off-Earth driving distance record—and transmitted over 217,000 images back to Earth.',
          'In June 2018, a planet-encircling dust storm blotted out the Sun. Without sunlight, my solar panels could not recharge my batteries, and I sent my last signal on June 10, 2018. After months of recovery attempts once the skies cleared, NASA officially concluded my mission in February 2019. My 15-year journey forever transformed what humanity knows about Mars.',
        ],
      },
    ],
    timeline: [
      {
        date: 'July 7, 2003',
        title: 'Launch from Earth',
        detail: 'Launched aboard a Delta II rocket following my twin rover Spirit.',
      },
      {
        date: 'January 25, 2004',
        title: 'Landing in Eagle Crater',
        detail: 'Touched down on Meridiani Planum and discovered water-formed hematite “blueberries.”',
      },
      {
        date: '2011 – 2018',
        title: 'Endeavour Crater & 45.16 km Record',
        detail: 'Drove over 45 km and sent back more than 217,000 photographs of Martian terrain.',
      },
      {
        date: 'June 2018 / February 2019',
        title: 'Global Dust Storm & Farewell',
        detail: 'Lost solar power during the 2018 global dust storm; mission concluded after ~15 years.',
      },
    ],
    discoveries: [
      {
        title: 'Hematite Spheres & Past Liquid Water',
        summary:
          'Confirmed that Meridiani Planum experienced ancient groundwater and surface-water conditions.',
      },
      {
        title: '45+ km Odometry & 217,000+ Images',
        summary:
          'Nearly 15 years of continuous surface science documented craters, meteorites, and Martian weather.',
      },
    ],
    glossary: [
      {
        term: 'Hematite',
        explanation:
          'An iron-oxide mineral that frequently forms in the presence of liquid water.',
      },
      {
        term: 'Global Dust Storm',
        explanation:
          'A massive Martian storm that can wrap the entire planet in dust for weeks, blocking sunlight.',
      },
      {
        term: 'Odometry',
        explanation:
          'Measuring total distance traveled by tracking wheel rotations and surface motion.',
      },
    ],
    relatedRoverId: 'opportunity',
    relatedVehicleLabel: 'Open Opportunity Dossier',
    scenes: [
      {
        id: 'opp-s1',
        sceneNumber: 'SCENE 01',
        title: 'A 90-Sol Plan That Lasted ~15 Years',
        paragraphs: [
          'I landed on Meridiani Planum on January 25, 2004. Engineers planned for 90 Martian days (sols), but Martian winds cleaned my solar panels and kept me going for ~15 years!',
        ],
        keyTakeaway: 'Planned duration was 90 sols; actual active exploration lasted nearly 15 years.',
        learnMoreTitle: 'How did wind save Opportunity?',
        learnMoreDetail:
          'Passing gusts and dust devils periodically blew fine dust off the solar arrays, restoring power generation.',
        interactionPrompt: 'Drive Opportunity in 3D to uncover geological clues!',
      },
      {
        id: 'opp-s2',
        sceneNumber: 'SCENE 02',
        title: 'What Are Hematite “Blueberries”?',
        paragraphs: [
          'In Eagle Crater I found tiny, round gray spheres nicknamed “blueberries.” My instruments showed they were made of the iron-oxide mineral hematite.',
        ],
        keyTakeaway: 'Hematite spheres typically form when minerals precipitate in liquid water.',
        learnMoreTitle: 'How do scientists draw conclusions from rocks?',
        learnMoreDetail:
          'They inspect grain shapes, rock layers, and mineral chemistry, then compare them with known water-formed rocks on Earth.',
        interactionPrompt: 'Inspect hematite spheres and layered outcrops in the 3D scene.',
      },
      {
        id: 'opp-s3',
        sceneNumber: 'SCENE 03',
        title: 'Does Water Evidence Alone Prove Life?',
        paragraphs: [
          'Hematite and clay minerals proved liquid water once existed here. However, water is only one ingredient—geological water evidence alone is NOT proof of past life!',
        ],
        keyTakeaway: 'Water proves a place was habitable, not that life actually lived there.',
        learnMoreTitle: 'What is needed to prove past life?',
        learnMoreDetail:
          'Scientists must find verified biosignatures—such as specific organic patterns, microfossils, or biological isotope ratios.',
        interactionPrompt: 'Collect all clues to generate your Discovery Report!',
      },
      {
        id: 'opp-s4',
        sceneNumber: 'SCENE 04',
        title: '45+ km Marathon & the 2018 Dust Storm',
        paragraphs: [
          'I drove over 45 km (45.16 km) and sent over 217,000 images before a planet-wide 2018 dust storm blocked the Sun and ended my mission in February 2019.',
        ],
        keyTakeaway: 'Opportunity set the off-Earth driving distance record at 45.16 km.',
        learnMoreTitle: 'Why was the 2018 dust storm fatal?',
        learnMoreDetail:
          'Thick global dust blocked sunlight for weeks, draining batteries and preventing internal heaters from keeping electronics warm.',
        interactionPrompt: 'Complete the investigation to earn the "Mars Geologist" badge!',
      },
    ],
  },
  {
    id: 'apollo-lrv',
    orderNumber: '04',
    spacecraftName: 'APOLLO LUNAR ROVING VEHICLE (LRV)',
    badge: 'STORY 04 · ELECTRIC MOON BUGGY',
    badgeTitle: 'Lunar Explorer',
    badgeSubtitle: 'Apollo LRV · Apollo 15–17',
    badgeIcon: '🌕',
    accentColor: '#a78bfa',
    title: 'I Am the Lunar Roving Vehicle: On the Silent Roads of the Moon',
    subtitle: 'The Electric Rover That Carried Apollo 15, 16, and 17 Astronauts Across ~90 km',
    quote:
      '“I folded neatly against a rocket’s lander; once unfolded on the Moon, I became the first electric car to carry astronauts beyond the horizon.”',
    readingTime: '3 min read',
    image: '/assets/images/lunar/apollo-17-lrv.jpg',
    imageAlt:
      'Real NASA photograph of Apollo 17 Commander Eugene Cernan driving Lunar Roving Vehicle (LRV-003) in Taurus-Littrow Valley',
    imageCredit: 'NASA (AS17-147-22526)',
    mediaKindLabel: 'ACTUAL NASA APOLLO PHOTO',
    quickFacts: [
      { label: 'MISSIONS', value: 'Apollo 15, 16 & 17' },
      { label: 'YEARS', value: '1971–1972' },
      { label: 'TOP SPEED', value: 'Approx. 13 km/h' },
      { label: 'TOTAL DISTANCE', value: 'Approx. 90 km (3 missions)' },
    ],
    chapters: [
      {
        id: 'apollo-lrv-ch1',
        chapterNumber: 'CHAPTER 01',
        heading: 'Foldable Frame, Four Electric Wheels',
        paragraphs: [
          'Hello! I am the Apollo Lunar Roving Vehicle (LRV). On early Apollo landings, astronauts in heavy spacesuits could only walk short distances from their lander. Engineers built me so crews could reach distant craters, hills, and valleys.',
          'On Earth I weighed 210 kilograms, but in the Moon’s gentle gravity I felt like just 35 kilograms. To fit inside a narrow bay on the Lunar Module’s descent stage, my frame was designed to fold up. After landing, astronauts pulled deployment cables and I unfolded onto four wheels in minutes!',
        ],
      },
      {
        id: 'apollo-lrv-ch2',
        chapterNumber: 'CHAPTER 02',
        heading: 'Historic Drives on Apollo 15, 16, and 17',
        paragraphs: [
          'Because the Moon has no air, a gasoline engine could not run there. Instead, each of my four wire-mesh wheels had its own electric motor powered by two 36-volt batteries, letting me reach a top speed of about 13 km/h across powdery lunar dust.',
          'Between 1971 and 1972, three identical rovers served on Apollo 15, Apollo 16, and Apollo 17. We carried astronauts, scientific instruments, and hundreds of kilograms of Moon rocks—covering 27.9 km on Apollo 15, 26.7 km on Apollo 16, and 35.9 km on Apollo 17, for a combined total of roughly 90 kilometers!',
        ],
      },
      {
        id: 'apollo-lrv-ch3',
        chapterNumber: 'CHAPTER 03',
        heading: 'Still Parked on the Quiet Lunar Surface',
        paragraphs: [
          'When each crew’s surface exploration ended, the astronauts lifted off in the Lunar Module’s upper stage to return to Earth—leaving us behind on the Moon.',
          'Before departure, our remote-controlled TV cameras broadcast their dramatic liftoff live to viewers on Earth. Today, all three Lunar Roving Vehicles still stand quietly at Hadley Rille, the Descartes Highlands, and Taurus–Littrow Valley as enduring monuments of human exploration.',
        ],
      },
    ],
    timeline: [
      {
        date: 'July 31, 1971',
        title: 'Apollo 15 · First Lunar Drive',
        detail: 'LRV-1 carried astronauts 27.9 km across the Hadley-Apennine region.',
      },
      {
        date: 'April 21, 1972',
        title: 'Apollo 16 · Descartes Highlands',
        detail: 'LRV-2 explored highland craters and covered 26.7 km.',
      },
      {
        date: 'December 11–14, 1972',
        title: 'Apollo 17 · Distance Record',
        detail: 'LRV-3 drove 35.9 km, bringing the three-mission total to ~90 km.',
      },
      {
        date: '1972 – Present',
        title: 'Preserved on the Moon',
        detail: 'All three LRVs remain parked on the lunar surface to this day.',
      },
    ],
    discoveries: [
      {
        title: 'Dramatically Expanded Exploration Range',
        summary:
          'Allowed Apollo crews to travel kilometers from their landing site and sample diverse geological units.',
      },
      {
        title: 'Priceless Lunar Rock Collections',
        summary:
          'Enabled the collection of hundreds of kilograms of lunar rocks, highland breccias, and volcanic glass.',
      },
    ],
    glossary: [
      {
        term: 'Lunar Module (LM)',
        explanation:
          'The two-stage Apollo spacecraft that carried astronauts from lunar orbit to the Moon’s surface and back.',
      },
      {
        term: 'Wire-Mesh Wheels',
        explanation:
          'Flexible piano-wire and titanium-chevron wheels built to grip loose lunar dust without rubber tires.',
      },
      {
        term: 'Regolith',
        explanation:
          'The layer of fine, sharp dust and broken rock fragments covering the Moon’s surface.',
      },
    ],
    relatedLunarMissionId: 'apollo-17-lrv',
    relatedVehicleLabel: 'Open Apollo 17 LRV Dossier',
    scenes: [
      {
        id: 'lrv-s1',
        sceneNumber: 'SCENE 01',
        title: 'Why Astronauts Needed a Moon Buggy',
        paragraphs: [
          'In heavy spacesuits, Apollo astronauts could only walk short distances from their lander. Engineers built me so crews could explore distant craters and valleys.',
        ],
        keyTakeaway: 'The LRV dramatically expanded exploration range on Apollo 15, 16, and 17.',
        learnMoreTitle: 'How did it fit on the rocket?',
        learnMoreDetail:
          'Its 210 kg frame folded neatly into a bay on the Lunar Module descent stage and unfolded on the Moon in minutes.',
        interactionPrompt: 'Drive astronauts safely across the 3D lunar surface!',
      },
      {
        id: 'lrv-s2',
        sceneNumber: 'SCENE 02',
        title: 'Low Lunar Gravity & Electric Power',
        paragraphs: [
          'Lunar gravity is only one-sixth of Earth’s, so dust and boulders behave differently. With no air for a gas engine, I ran on four electric wheel motors and two 36-volt batteries.',
        ],
        keyTakeaway: 'The Lunar Roving Vehicle was a 100% electric four-wheel-drive spacecraft.',
        learnMoreTitle: 'Why wire-mesh wheels instead of rubber?',
        learnMoreDetail:
          'Extreme lunar temperatures and vacuum would ruin rubber tires, so flexible piano-wire mesh with titanium chevrons was used.',
        interactionPrompt: 'Watch your battery energy gauge while driving in 3D!',
      },
      {
        id: 'lrv-s3',
        sceneNumber: 'SCENE 03',
        title: 'Dodge Craters & Collect Moon Rocks',
        paragraphs: [
          'At a top speed of ~13 km/h, three LRVs carried crews, tools, and Moon rocks across ~90 km total during Apollo 15, 16, and 17 (1971–1972).',
        ],
        keyTakeaway: 'Combined distance across Apollo 15, 16, and 17 totaled roughly 90 km.',
        learnMoreTitle: 'What was the peak recorded speed?',
        learnMoreDetail:
          'Normal top speed was ~13 km/h, with a brief ~18 km/h downhill burst recorded during Apollo 17.',
        interactionPrompt: 'Avoid craters/rocks and reach the Rock Sample Collection Point!',
      },
      {
        id: 'lrv-s4',
        sceneNumber: 'SCENE 04',
        title: 'Still Parked on the Moon Today',
        paragraphs: [
          'When each mission ended, astronauts flew home in the Lunar Module—leaving all three LRVs parked on the Moon, where they still sit today.',
        ],
        keyTakeaway: 'All three Apollo LRVs remain on the lunar surface as historic monuments.',
        learnMoreTitle: 'What was their final broadcast?',
        learnMoreDetail:
          'Remote-controlled TV cameras mounted on the rovers filmed the Lunar Module lifting off back to lunar orbit.',
        interactionPrompt: 'Reach the sample point to earn the "Lunar Explorer" badge!',
      },
    ],
  },
];
