import type {
  LunarMissionItem,
  QuizSpacecraftGroup,
  ReferenceCategoryGroup,
  ReferenceItem,
} from '@/types';
import type { LunarSurfaceLandmark } from '@/data/lunarMissionsData';

export const EN_LUNAR_SURFACE_LANDMARKS: readonly LunarSurfaceLandmark[] = [
  {
    id: 'oceanus-procellarum',
    name: 'Oceanus Procellarum (Ocean of Storms)',
    kind: 'Mare (Basaltic Plain)',
    lat: 18.4,
    lon: -57.4,
    detail: 'Largest basaltic plain on the Moon (~4,000,000 km²); historic soft-landing site of Luna 9.',
  },
  {
    id: 'mare-imbrium',
    name: 'Mare Imbrium (Sea of Rains)',
    kind: 'Mare (Basaltic Plain)',
    lat: 32.8,
    lon: -15.6,
    detail: '1,145 km diameter giant impact basin hosting Lunokhod 1, Apollo 15, and Chang’e 3 / Yutu.',
  },
  {
    id: 'mare-serenitatis',
    name: 'Mare Serenitatis (Sea of Serenity)',
    kind: 'Mare (Basaltic Plain)',
    lat: 28.0,
    lon: 17.5,
    detail: 'Eastern border hosts Le Monnier Crater (Lunokhod 2) and the Taurus–Littrow Valley (Apollo 17).',
  },
  {
    id: 'mare-tranquillitatis',
    name: 'Mare Tranquillitatis (Sea of Tranquility)',
    kind: 'Mare (Basaltic Plain)',
    lat: 8.5,
    lon: 31.4,
    detail: 'Basaltic plain hosting Statio Tranquillitatis, where humanity first set foot on the Moon during Apollo 11.',
  },
  {
    id: 'tycho-crater',
    name: 'Tycho Crater',
    kind: 'Impact Crater',
    lat: -43.31,
    lon: -11.36,
    detail: 'Prominent 85 km diameter, 108-million-year-old impact crater in the southern hemisphere with bright ray ejecta.',
  },
  {
    id: 'spa-basin',
    name: 'South Pole–Aitken Basin (Lunar Far Side)',
    kind: 'Basin / Highlands',
    lat: -53.0,
    lon: 169.0,
    detail: '2,500 km wide and 8 km deep—one of the largest and oldest impact basins in the Solar System; home to Chang’e 4 / Yutu-2.',
  },
];

export const EN_LUNAR_MISSIONS: readonly LunarMissionItem[] = [
  {
    id: 'luna-9',
    name: 'Luna 9 (E-6M #202)',
    code: 'USSR · LUNA-9 · 1966',
    agency: 'OKB-1 / Lavochkin (Soviet Union)',
    country: 'USSR',
    missionType: 'Soft Lander',
    eraBadge: '1966 · PIONEER ERA',
    launchDate: 'January 31, 1966 (11:41 UTC · Baikonur)',
    landingDate: 'February 3, 1966 (18:45:30 UTC)',
    missionEndDate: 'February 6, 1966 (22:55 UTC · Battery Depletion)',
    durationLabel: '3 Days (8 Hours 5 Minutes Active Transmission)',
    landingSite: 'Oceanus Procellarum (Ocean of Storms · Planitia Descensus)',
    landingCoordinates: '7.08° N, 64.37° W (295.63° E)',
    lat: 7.08,
    lon: -64.37,
    hemisphereLabel: 'Near Side',
    markerColor: '#f59e0b',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/luna-9.svg',
    imageAlt: 'Technical diagram of the Luna 9 soft-landing capsule and its 4-petal deployable shell',
    imageCredit:
      'Technical Mission Reconstruction Diagram (Data Source: NASA NSSDCA ID 1966-006A & Lavochkin Archive) · Live NASA Archive link available.',
    mediaKindLabel: 'Technical Mission & Surface Reconstruction Illustration',
    nasaSearchQuery: 'Luna 9 lunar lander',
    summary:
      'Historic spacecraft that achieved the first successful soft landing on the Moon (and on any celestial body beyond Earth) and transmitted the first panoramic photographs directly from the lunar surface.',
    missionObjective:
      'Determine whether the lunar surface was covered in a deep, treacherous dust sink that would swallow a spacecraft, validate airbag-cushioned soft-landing technology, and transmit the first direct television panoramas from the Moon.',
    missionOutcome:
      'Complete success. Touching down in Oceanus Procellarum on February 3, 1966, the 99 kg spherical ALS capsule unfolded its four petals to right itself and proved that lunar regolith firmly supports a lander—paving the way for Apollo and robotic rovers.',
    keyMetrics: [
      {
        label: 'LAUNCH / LANDED MASS',
        value: '1,583 kg / 99 kg',
        sublabel: 'Sphere diameter: 58 cm (ALS capsule)',
      },
      {
        label: 'SURFACE PANORAMAS',
        value: '27 Frames',
        sublabel: '360° views across 3 solar elevation angles',
      },
      {
        label: 'ACTIVE RADIO SESSIONS',
        value: '7 Sessions',
        sublabel: '8 hours 5 minutes total data transmission',
      },
      {
        label: 'HISTORIC SIGNIFICANCE',
        value: 'First Soft Landing',
        sublabel: 'First intact touchdown on an extraterrestrial body',
      },
    ],
    technicalSpecs: [
      { label: 'Mission Class', value: 'Automatic Lunar Station (ALS E-6M)' },
      { label: 'Launch Vehicle', value: 'Molniya-M (8K78M) 4-Stage Rocket' },
      { label: 'Landing System', value: 'KTDU-5A Liquid-Propellant Retro-Engine + Dual Airbags' },
      { label: 'Capsule Dimensions', value: '58 cm hermetically sealed sphere (4-petal stabilizer)' },
      { label: 'Power Source', value: 'Silver-Zinc (Ag-Zn) Battery (~500 Wh capacity)' },
      { label: 'Communication Frequency', value: '183.538 MHz VHF (4 whip + 4 petal antennas)' },
      { label: 'Thermal Control', value: 'Pressurized nitrogen gas circulation & evaporative cooling' },
      { label: 'COSPAR / NSSDCA ID', value: '1966-006A' },
    ],
    scientificInstruments: [
      {
        code: 'OPT-TV',
        name: '860-A Opto-Mechanical Panoramic Television Camera',
        location: 'Upper Rotating Turret',
        description:
          'Weighing 1.4 kg with a 360° horizontal and 29° vertical field of view, this scanning camera resolved nearby regolith grains down to 1.5–2 mm.',
      },
      {
        code: 'SBM',
        name: 'SBM Radiation Detector (Gas-Discharge Counter)',
        location: 'Internal Capsule Hull',
        description:
          'Measured cosmic-ray and secondary lunar surface radiation doses, recording a daily dose of ~30 millirads.',
      },
      {
        code: 'DIHEDRAL-MIRROR',
        name: 'Triple Dihedral Stereoscopic Mirrors',
        location: 'Upper Hull Perimeter',
        description:
          'Calibration mirrors positioned in the camera field of view to enable stereoscopic distance measurements of nearby pebbles and craters.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Confirmation of Lunar Regolith Bearing Strength',
        location: 'Oceanus Procellarum (Northeast of Cavalerius Crater)',
        description:
          'Refuted the "deep electrostatic dust swamp" hypothesis, proving that the lunar surface possesses sufficient bearing capacity to support spacecraft and astronauts.',
      },
      {
        title: 'First Panoramic Surface Imagery from Another World',
        location: 'Planitia Descensus',
        description:
          'Panoramas captured at solar elevations of 7°, 14°, 27°, and 41° revealed millimeter-scale regolith structure, micro-craters, and basaltic rock fragments.',
      },
    ],
    timeline: [
      {
        date: 'January 31, 1966',
        sol: 'T+0 Days',
        title: 'Launch from Baikonur',
        description: 'Luna 9 lifted off aboard a Molniya-M rocket and entered its translunar coast trajectory.',
      },
      {
        date: 'February 3, 1966 · 18:45 UTC',
        sol: 'Landing Day',
        title: 'First Soft Touchdown in Oceanus Procellarum',
        description: 'Ejected 5 meters above the surface from its braking stage, the airbag-cushioned capsule bounced to rest and deployed its 4 petals.',
      },
      {
        date: 'February 4–6, 1966',
        sol: 'Surface Days 1–3',
        title: 'Panorama Transmission & End of Mission',
        description: 'After 8 hours and 5 minutes of radio sessions across 3 days, the onboard batteries depleted and the mission concluded in triumph.',
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
    code: 'USSR · LUNOKHOD-1 · 1970',
    agency: 'Lavochkin / VNIItransmash (Soviet Union)',
    country: 'USSR',
    missionType: 'Robotic Lunar Rover',
    eraBadge: '1970–1971 · FIRST ROBOTIC ROVER',
    launchDate: 'November 10, 1970 (14:44 UTC · Baikonur)',
    landingDate: 'November 17, 1970 (03:47 UTC)',
    missionEndDate: 'September 14, 1971 (Official End of Mission: October 4, 1971)',
    durationLabel: '322 Earth Days (11 Lunar Days · Planned: 3 Lunar Days)',
    landingSite: 'Mare Imbrium (Sea of Rains · South of Sinus Iridum)',
    landingCoordinates: '38.24° N, 35.00° W (325.00° E)',
    lat: 38.24,
    lon: -35.0,
    hemisphereLabel: 'Near Side',
    markerColor: '#38bdf8',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/lunokhod-1.svg',
    imageAlt: 'Technical diagram of the 8-wheeled Lunokhod 1 robotic lunar rover and hinged solar clamshell lid',
    imageCredit:
      'Technical Mission Reconstruction Diagram (Data Source: NASA NSSDCA ID 1970-095A & LROC Archive) · Live NASA Archive link available.',
    mediaKindLabel: 'Technical Mission & Surface Reconstruction Illustration',
    nasaSearchQuery: 'Lunokhod 1 rover moon',
    summary:
      'The first remote-controlled robotic rover to successfully drive on another celestial body. Operated for 11 lunar days and traversed 10.54 km across Mare Imbrium.',
    missionObjective:
      'Delivered to Mare Imbrium by the Luna 17 descent stage to conduct long-duration mobile surface exploration, measure soil mechanical bearing strength and chemical composition at hundreds of sites, and perform laser ranging experiments.',
    missionOutcome:
      'Exceeded its planned 3-lunar-day (~90 Earth-day) lifespan nearly fourfold by operating for 322 days; drove 10.54 km, transmitted over 20,000 TV images and 206 high-resolution panoramas. In 2010, NASA’s LRO pinpointed its resting place and scientists bounced laser pulses off its retroreflector again.',
    keyMetrics: [
      {
        label: 'DISTANCE DRIVEN',
        value: '10.54 km',
        sublabel: 'First long-range extraterrestrial traverse',
      },
      {
        label: 'MISSION DURATION',
        value: '322 Days',
        sublabel: '11 Lunar Days / 10 Freezing Lunar Nights',
      },
      {
        label: 'IMAGE ARCHIVE',
        value: '20,000+ Frames',
        sublabel: '206 panoramic surface mosaics',
      },
      {
        label: 'SOIL TESTS',
        value: '537 Locations',
        sublabel: 'PrOP penetrometer & 25 RIFMA X-ray analyses',
      },
    ],
    technicalSpecs: [
      { label: 'Rover Mass', value: '756 kg (5,600 kg total with Luna 17 descent stage)' },
      { label: 'Dimensions', value: 'Length: 2.22 m · Width: 1.60 m · Height: 1.35 m' },
      { label: 'Mobility System', value: '8 Independently Powered Wire-Mesh Wheels (51 cm diameter)' },
      { label: 'Driving Speed', value: 'Dual speed gears: 0.8 km/h and 2.0 km/h' },
      { label: 'Power & Thermal System', value: 'GaAs Solar Cells on Hinged Clamshell Lid + Polonium-210 RTG Heater' },
      { label: 'Control Method', value: 'Real-time teleoperation by a 5-person Earth crew' },
      { label: 'COSPAR / NSSDCA ID', value: '1970-095A' },
    ],
    scientificInstruments: [
      {
        code: 'RIFMA',
        name: 'RIFMA X-Ray Fluorescence Spectrometer',
        location: 'Front Lower Hull',
        description:
          'Analyzed in-situ abundances of aluminum, calcium, silicon, iron, magnesium, titanium, and potassium in the lunar regolith.',
      },
      {
        code: 'PROP',
        name: 'PrOP Cone-Vane Soil Penetrometer + Ninth-Wheel Odometer',
        location: 'Rear Chassis Mechanism',
        description:
          'Pressed and rotated a conical vane into the soil at 537 locations to quantify regolith shear strength and bearing capacity.',
      },
      {
        code: 'TL-LASER',
        name: 'French-Soviet Corner-Cube Laser Retroreflector (14 Prisms)',
        location: 'Front Upper Deck',
        description:
          'Reflected laser pulses from Earth observatories to measure the Earth–Moon distance to centimeter precision.',
      },
      {
        code: 'RT-1 / RV-2N',
        name: 'X-Ray Telescope & Radiation Detector',
        location: 'Upper Hull',
        description:
          'Observed the galactic X-ray background and solar proton events from the lunar surface.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Geochemical Mapping of Mare Imbrium Basalts',
        location: 'Western Mare Imbrium Basin',
        description:
          'RIFMA measurements confirmed that Mare Imbrium’s surface consists of iron- and titanium-rich basaltic lava flows.',
      },
      {
        title: 'Nuclear Thermal Survival Across 10 Lunar Nights',
        location: '10 Lunar Night Cycles (-150 °C)',
        description:
          'By closing its hinged solar lid at sunset and circulating heat from a Polonium-210 radioisotope heater, it became the first rover to survive multiple 14-day freezing lunar nights.',
      },
    ],
    timeline: [
      {
        date: 'November 17, 1970',
        sol: 'Lunar Day 1',
        title: 'Luna 17 Touchdown & Ramp Rollout',
        description: 'Two and a half hours after landing, Lunokhod 1 rolled down one of the dual ramps onto the lunar soil.',
      },
      {
        date: 'February 1971',
        sol: 'Lunar Day 4',
        title: 'Surpassing Planned 90-Day Lifespan',
        description: 'Completed all primary scientific objectives and began extended north–south geological traverse profiles.',
      },
      {
        date: 'September 14, 1971',
        sol: 'Lunar Day 11',
        title: 'Polonium-210 Heat Source Decay & Final Contact',
        description: 'As the radioisotope heater decayed entering the 11th lunar night, internal temperatures dropped and the mission officially concluded on October 4, 1971.',
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
    agency: 'NASA / Boeing / Delco Electronics (USA)',
    country: 'USA',
    missionType: 'Crewed Lunar Roving Vehicle (LRV)',
    eraBadge: '1971 · FIRST CREWED MOON BUGGY',
    launchDate: 'July 26, 1971 (13:34 UTC · Kennedy Space Center)',
    landingDate: 'July 30, 1971 (22:16 UTC · First Drive: July 31, 1971)',
    missionEndDate: 'August 2, 1971 (Parked on Surface After 3 EVAs)',
    durationLabel: '3 Hours 2 Minutes Driving Time (3 Surface EVAs)',
    landingSite: 'Hadley–Apennine (Hadley Rille & Montes Apenninus)',
    landingCoordinates: '26.13° N, 3.63° E',
    lat: 26.13,
    lon: 3.63,
    hemisphereLabel: 'Near Side',
    markerColor: '#fb923c',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/apollo-15-lrv.svg',
    imageAlt: 'Apollo 15 Lunar Roving Vehicle (LRV-001) Hadley-Apennine mission schematic',
    imageCredit:
      'Technical Mission Diagram & NASA ALSJ Archive (AS15-88-11901 / NASA History LRV Documents) · Live NASA Archive photo available.',
    mediaKindLabel: 'Technical Mission & Surface Reconstruction Illustration',
    nasaSearchQuery: 'Apollo 15 Lunar Roving Vehicle',
    nasaArchiveId: 'as15-88-11901',
    summary:
      'Driven by astronauts David Scott and James Irwin across the Hadley–Apennine region, LRV-001 was humanity’s first crewed electric exploration vehicle driven on another world.',
    missionObjective:
      'Dramatically expand the exploration radius beyond walking distance to reach the foothills of Montes Apenninus and the edge of Hadley Rille; collect primordial lunar crust anorthosite samples ("Genesis Rock").',
    missionOutcome:
      'Drove 27.76 km and enabled the collection of 77 kg of lunar rock and soil samples, including the famous 4.1-billion-year-old "Genesis Rock" (Sample 15415). Its remotely controlled TV camera broadcast the Lunar Module Falcon’s liftoff live to Earth.',
    keyMetrics: [
      {
        label: 'TOTAL DRIVING DISTANCE',
        value: '27.76 km',
        sublabel: '3 hr 02 min driving time across 3 EVAs',
      },
      {
        label: 'EMPTY MASS / PAYLOAD',
        value: '210 kg / 490 kg',
        sublabel: 'Carries more than twice its own weight',
      },
      {
        label: 'SAMPLES COLLECTED',
        value: '77.3 kg',
        sublabel: 'Including famous 15415 "Genesis Rock" anorthosite',
      },
      {
        label: 'MAX RANGE FROM LM',
        value: '5.0 km',
        sublabel: 'Within safe walk-back safety envelope',
      },
    ],
    technicalSpecs: [
      { label: 'Prime Contractors', value: 'Boeing (Prime) & General Motors Delco Electronics' },
      { label: 'Dimensions', value: 'Length: 3.10 m · Width: 1.83 m · Wheelbase: 2.29 m' },
      { label: 'Wheel Design', value: '81 cm woven zinc-coated steel wire mesh + titanium chevron treads' },
      { label: 'Propulsion System', value: 'Four 0.25 hp (190 W) electric wheel motors + 80:1 harmonic drives' },
      { label: 'Power Source', value: 'Dual 36V non-rechargeable Silver-Zinc (Ag-Zn) batteries (121 Ah each)' },
      { label: 'Control System', value: 'Center console T-Handle fly-by-wire controller between seats' },
      { label: 'Navigation (LRV Nav)', value: 'Directional gyroscope, odometer & sun-shadow dead-reckoning computer' },
    ],
    scientificInstruments: [
      {
        code: 'LCRU-TV',
        name: 'Lunar Communications Relay Unit (LCRU) & RCA Color TV Camera',
        location: 'Front Chassis & High-Gain S-Band Umbrella Antenna',
        description:
          'Remotely panned and tilted by flight controller Ed Fendell in Houston to broadcast geological traverses and the Lunar Module liftoff live to Earth.',
      },
      {
        code: 'LRV-NAV',
        name: 'Boeing / Kearfott Inertial Navigation & Dead-Reckoning Computer',
        location: 'Front Instrument Console',
        description:
          'On a Moon without a global magnetic field, used a directional gyro and wheel revolution counters to display bearing, range, and distance back to the Lunar Module within 1% accuracy.',
      },
      {
        code: 'GEO-RACK',
        name: 'Geological Tool Carrier, Rotary-Percussive Drill & Sample Bags',
        location: 'Rear Cargo Pallet',
        description:
          'Carried lunar rakes, geology hammers, scoops, a polarimetric gnomon, and deep regolith core tubes.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Discovery of the "Genesis Rock" (Sample 15415)',
        location: 'Spur Crater · Station 7 (EVA-2)',
        description:
          'Scott and Irwin discovered a ~4.1-billion-year-old pristine anorthosite rock crystallized from the Moon’s primordial magma ocean, illuminating early lunar crustal evolution.',
      },
      {
        title: 'Direct Observation of Layered Basalt Strata in Hadley Rille',
        location: 'Hadley Rille Rim · Station 9A',
        description:
          'Photographed and sampled in-situ bedrock basalt layers exposed along the walls of the 1.5 km wide, 300 m deep Hadley Rille lava channel.',
      },
    ],
    timeline: [
      {
        date: 'July 31, 1971',
        sol: 'EVA-1 (10.3 km)',
        title: 'LRV Unfolding from Falcon & First Lunar Drive',
        description: 'Despite a temporary front-steering circuit fault, rear-wheel steering carried the crew to Elbow and St. George craters.',
      },
      {
        date: 'August 1, 1971',
        sol: 'EVA-2 (12.5 km)',
        title: 'Apennine Front Climb & Genesis Rock Discovery',
        description: 'With both front and rear steering operational, the crew climbed the slopes of Mons Hadley Delta and found the Genesis Rock at Spur Crater.',
      },
      {
        date: 'August 2, 1971',
        sol: 'EVA-3 (5.0 km) & Liftoff',
        title: 'Hadley Rille Survey & Live Liftoff Broadcast',
        description: 'Parked 90 m east of Falcon, the LRV’s camera transmitted live footage of the Lunar Module blasting off from the Moon.',
      },
    ],
    sourceLabel: 'NASA History — Apollo Lunar Roving Vehicle Documentation (ALSJ)',
    sourceUrl: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    secondarySourceLabel: 'Wikipedia — Lunar Roving Vehicle (Apollo LRV)',
    secondarySourceUrl: 'https://en.wikipedia.org/wiki/Lunar_Roving_Vehicle',
  },
  {
    id: 'apollo-16-lrv',
    name: 'Apollo 16 LRV (LRV-002)',
    code: 'NASA · APOLLO 16 · LRV-2',
    agency: 'NASA / Boeing / Delco Electronics (USA)',
    country: 'USA',
    missionType: 'Crewed Lunar Roving Vehicle (LRV)',
    eraBadge: '1972 · HIGHLANDS EXPLORER',
    launchDate: 'April 16, 1972 (17:54 UTC · Kennedy Space Center)',
    landingDate: 'April 21, 1972 (02:23 UTC)',
    missionEndDate: 'April 24, 1972 (Parked on Surface After 3 EVAs)',
    durationLabel: '3 Hours 26 Minutes Driving Time (26.55 km)',
    landingSite: 'Descartes Highlands (Descartes & Cayley Formations)',
    landingCoordinates: '8.97° S, 15.50° E',
    lat: -8.97,
    lon: 15.5,
    hemisphereLabel: 'Near Side',
    markerColor: '#f97316',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/apollo-16-lrv.svg',
    imageAlt: 'Apollo 16 Lunar Roving Vehicle (LRV-002) Descartes Highlands mission schematic',
    imageCredit:
      'Technical Mission Diagram & NASA ALSJ Archive (AS16-116-18649 / NASA History LRV Documents) · Live NASA Archive photo available.',
    mediaKindLabel: 'Technical Mission & Surface Reconstruction Illustration',
    nasaSearchQuery: 'Apollo 16 Lunar Roving Vehicle',
    nasaArchiveId: 'as16-116-18649',
    summary:
      'Driven by John Young and Charles Duke during Apollo 16—the only Apollo mission to land in the rugged Lunar Highlands—climbing 152 meters up the flank of Stone Mountain.',
    missionObjective:
      'Investigate whether the ancient, rugged lunar highlands outside the basaltic maria (the Cayley Plains and Descartes Mountains) were formed by silicic volcanism or giant impact breccias.',
    missionOutcome:
      'Traversed 26.55 km and enabled the collection of 95.7 kg of rock samples. Proved that the highland formations consist of giant impact breccias rather than volcanic rhyolite—fundamentally rewriting models of lunar geology. John Young also conducted the famous "Lunar Grand Prix" handling test.',
    keyMetrics: [
      {
        label: 'TOTAL DRIVING DISTANCE',
        value: '26.55 km',
        sublabel: '3 hr 26 min driving across rugged highlands',
      },
      {
        label: 'CLIMB ELEVATION',
        value: '+152 m',
        sublabel: 'Highest elevation climb of any Apollo mission (Stone Mountain)',
      },
      {
        label: 'SAMPLES COLLECTED',
        value: '95.71 kg',
        sublabel: 'Including 11.7 kg "Big Muley" (largest Apollo rock)',
      },
      {
        label: 'SLOPE CAPABILITY',
        value: '20° Slope',
        sublabel: 'Full traction across steep crater walls & mountain flanks',
      },
    ],
    technicalSpecs: [
      { label: 'Vehicle Serial Code', value: 'LRV-002 (Apollo 16 Orion Lunar Module)' },
      { label: 'Maximum Slope Performance', value: '25° static stability, ~20° active climb on Stone Mountain' },
      { label: 'Turning Radius', value: '3.05 meters (Independent front & rear double Ackermann steering)' },
      { label: 'Ground Clearance', value: '35.6 cm (Fully loaded)' },
      { label: 'Suspension', value: 'Double-wishbone torsion bar & damper suspension system' },
      { label: 'Energy Consumption', value: 'Consumed only ~93 Ah across the entire 26.55 km campaign' },
    ],
    scientificInstruments: [
      {
        code: 'LPM',
        name: 'Lunar Portable Magnetometer',
        location: 'LRV Cargo Bay',
        description:
          'Measured local remanent magnetic fields across traverse stations, detecting the strongest local magnetic anomaly of the Apollo program (327 gammas) in the Cayley formation.',
      },
      {
        code: 'LCRU-TV',
        name: 'Remotely Controlled Color TV & S-Band Relay Unit',
        location: 'Front Chassis',
        description:
          'Transmitted live video of geological sampling high on Stone Mountain and along the rim of North Ray Crater directly to science support rooms in Houston.',
      },
      {
        code: 'UV-CAM',
        name: 'Far Ultraviolet Camera / Spectrograph',
        location: 'Lunar Module Shadow (LRV-Supported Operations)',
        description:
          'First astronomical telescope operated on another planetary body, imaging Earth’s geocorona and the Large Magellanic Cloud in far-UV light.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Refutation of the Volcanic Highlands Hypothesis',
        location: 'Descartes & Cayley Formations',
        description:
          'Every rock sampled across the LRV traverse proved to be impact-melted metamorphic breccia ejected by giant basin impacts (Imbrium and Nectaris) rather than volcanic lava.',
      },
      {
        title: 'North Ray Crater & "House Rock" Megabreccia Survey',
        location: 'EVA-3 · Station 11',
        description:
          'Sampled four-story-tall megabreccia boulders ("House Rock" and "Shadow Rock") on the rim of the 1 km wide North Ray Crater.',
      },
    ],
    timeline: [
      {
        date: 'April 21, 1972',
        sol: 'EVA-1 (4.2 km)',
        title: 'Flag & Spook Craters Drive and the "Lunar Grand Prix"',
        description: 'Drove west to Flag Crater before John Young tested the LRV’s low-gravity skidding, acceleration, and braking dynamics.',
      },
      {
        date: 'April 22, 1972',
        sol: 'EVA-2 (11.1 km)',
        title: 'Ascent of Stone Mountain',
        description: 'Climbed 152 m above the valley floor to the Cinco Craters (Station 4), setting the Apollo altitude climb record.',
      },
      {
        date: 'April 23, 1972',
        sol: 'EVA-3 (11.4 km)',
        title: 'North Ray Crater Traverse & Speed Run',
        description: 'Explored the deep North Ray Crater to the north and concluded the mission with 95.7 kg of highland samples.',
      },
    ],
    sourceLabel: 'NASA History — Apollo Lunar Roving Vehicle Documentation (ALSJ)',
    sourceUrl: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    secondarySourceLabel: 'Wikipedia — Lunar Roving Vehicle (Apollo LRV)',
    secondarySourceUrl: 'https://en.wikipedia.org/wiki/Lunar_Roving_Vehicle',
  },
  {
    id: 'apollo-17-lrv',
    name: 'Apollo 17 LRV (LRV-003)',
    code: 'NASA · APOLLO 17 · LRV-3',
    agency: 'NASA / Boeing / Delco Electronics (USA)',
    country: 'USA',
    missionType: 'Crewed Lunar Roving Vehicle (LRV)',
    eraBadge: '1972 · RECORD-HOLDING MOON BUGGY',
    launchDate: 'December 7, 1972 (05:33 UTC · Kennedy Space Center)',
    landingDate: 'December 11, 1972 (19:54 UTC)',
    missionEndDate: 'December 14, 1972 (Final Crewed Lunar EVA)',
    durationLabel: '4 Hours 26 Minutes Driving Time (35.89 km)',
    landingSite: 'Taurus–Littrow Valley (Southeastern Rim of Mare Serenitatis)',
    landingCoordinates: '20.19° N, 30.77° E',
    lat: 20.19,
    lon: 30.77,
    hemisphereLabel: 'Near Side',
    markerColor: '#ea580c',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/apollo-17-lrv.jpg',
    imageAlt: 'Apollo 17 Commander Eugene Cernan test-driving the Lunar Roving Vehicle (LRV-003) in the Taurus–Littrow Valley (NASA AS17-147-22526)',
    imageCredit:
      'NASA / Harrison Schmitt · Apollo 17 Hasselblad Photograph (AS17-147-22526 · Taurus–Littrow Valley, December 11, 1972) · Source: NASA Apollo 50th & ALSJ',
    mediaKindLabel: 'Actual NASA / Archive Photograph',
    nasaSearchQuery: 'Apollo 17 Lunar Roving Vehicle',
    nasaArchiveId: 'as17-147-22526',
    summary:
      'Driven by Commander Eugene Cernan and geologist-astronaut Harrison Schmitt across the Taurus–Littrow Valley; holds the all-time Apollo records for total distance (35.89 km), max range from the LM (7.6 km), and speed (18 km/h).',
    missionObjective:
      'Investigate ancient highland massifs (North & South Massif) alongside young dark valley floor deposits in Taurus–Littrow, conduct seismic and gravimetric profiling, and perform field geology with the first professional geologist on the Moon, Harrison Schmitt.',
    missionOutcome:
      'Drove 35.89 km—setting the Apollo LRV distance record, furthest range from the Lunar Module (7.6 km), and official lunar land-speed record (18 km/h). Enabled collection of 110.5 kg of lunar rocks and the discovery of volcanic "Orange Soil" at Shorty Crater.',
    keyMetrics: [
      {
        label: 'TOTAL DRIVING DISTANCE',
        value: '35.89 km',
        sublabel: 'Longest surface traverse of the Apollo program (4 hr 26 min)',
      },
      {
        label: 'LUNAR SPEED RECORD',
        value: '18.0 km/h',
        sublabel: 'Downhill speed record set by Eugene Cernan',
      },
      {
        label: 'MAX RANGE FROM LM',
        value: '7.6 km',
        sublabel: 'EVA-2 · Station 2 (Nansen Crater / South Massif)',
      },
      {
        label: 'SAMPLES COLLECTED',
        value: '110.52 kg',
        sublabel: 'Including Shorty Crater orange volcanic glass beads',
      },
    ],
    technicalSpecs: [
      { label: 'Vehicle Serial Code', value: 'LRV-003 (Apollo 17 Challenger Lunar Module)' },
      { label: 'Top Recorded Speed', value: '18.0 km/h (11.2 mph · Guinness Extraterrestrial Speed Record)' },
      { label: 'Field Fender Repair', value: 'Broken right-rear fender repaired with 4 laminated lunar maps, duct tape & clamps' },
      { label: 'Carried Science Payload', value: 'Traverse Gravimeter (TGE), SEP Transmitter/Receiver, LSPE Seismic Charges' },
      { label: 'Total EVA Duration', value: '22 hours 04 minutes (across 3 EVAs)' },
    ],
    scientificInstruments: [
      {
        code: 'TGE',
        name: 'Traverse Gravimeter Experiment',
        location: 'LRV Rear Pallet',
        description:
          'Measured gravitational acceleration at 12 stations across the valley, determining that the high-density basalt fill beneath Taurus–Littrow is ~1.4 km thick.',
      },
      {
        code: 'SEP',
        name: 'Surface Electrical Properties Experiment',
        location: 'LRV Aft Receiver Mount',
        description:
          'Used radio waves to probe the dielectric constant and subsurface rock/moisture discontinuities down to several hundred meters depth.',
      },
      {
        code: 'LSPE',
        name: 'Lunar Seismic Profiling Experiment',
        location: '8 Explosive Seismic Packages Deployed From LRV',
        description:
          'Eight seismic charges deployed along the LRV routes were detonated remotely after crew departure to map the seismic velocity profile of the upper lunar crust.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Discovery of Volcanic "Orange Soil" (Sample 74220) at Shorty Crater',
        location: 'EVA-2 · Station 4 (Shorty Crater)',
        description:
          'Geologist Harrison Schmitt discovered orange soil composed of microscopic titanium-rich volcanic glass beads erupted from a lunar fire fountain 3.64 billion years ago—later shown to trap primordial magmatic water.',
      },
      {
        title: 'Troctolite 76535 — Evidence of an Ancient Lunar Magnetic Dynamo',
        location: 'EVA-3 · Station 6 (North Massif)',
        description:
          'A 4.25-billion-year-old slowly cooled deep-crustal rock (Troctolite 76535) proved that the early Moon possessed a liquid core dynamo and a global magnetic field.',
      },
    ],
    timeline: [
      {
        date: 'December 11, 1972',
        sol: 'EVA-1 (3.5 km)',
        title: 'ALSEP Deployment, Steno Crater & Fender Damage',
        description: 'When Cernan’s hammer snagged the right-rear fender extension, the broken fender kicked up a "rooster tail" of dark lunar dust.',
      },
      {
        date: 'December 12, 1972',
        sol: 'EVA-2 (20.4 km)',
        title: 'Map Fender Repair, 7.6 km Range Record & Orange Soil',
        description: 'With a replacement fender fashioned from 4 laminated lunar maps and duct tape, the crew drove 7.6 km to South Massif and discovered Orange Soil at Shorty Crater.',
      },
      {
        date: 'December 13–14, 1972',
        sol: 'EVA-3 (12.1 km)',
        title: 'North Massif, Sculptured Hills & Challenger Liftoff',
        description: 'Sampled the giant Split Rock boulder before the LRV camera broadcast humanity’s final departure from the Moon.',
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
    code: 'USSR · LUNOKHOD-2 · 1973',
    agency: 'Lavochkin / VNIItransmash (Soviet Union)',
    country: 'USSR',
    missionType: 'Robotic Lunar Rover',
    eraBadge: '1973 · 39 KM LUNAR DISTANCE RECORD',
    launchDate: 'January 8, 1973 (06:55 UTC · Baikonur)',
    landingDate: 'January 15, 1973 (23:35 UTC)',
    missionEndDate: 'May 10, 1973 (Official Announcement: June 3, 1973)',
    durationLabel: '4 Months (5 Lunar Days · 39 km Traverse)',
    landingSite: 'Le Monnier Crater (Eastern Margin of Mare Serenitatis)',
    landingCoordinates: '25.85° N, 30.45° E',
    lat: 25.85,
    lon: 30.45,
    hemisphereLabel: 'Near Side',
    markerColor: '#60a5fa',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/lunokhod-2.svg',
    imageAlt: 'Technical diagram of the long-range Lunokhod 2 robotic lunar rover and raised 3rd navigation camera',
    imageCredit:
      'Technical Mission Reconstruction Diagram (Data Source: NASA NSSDCA ID 1973-001A & LROC Archive) · Live NASA Archive link available.',
    mediaKindLabel: 'Technical Mission & Surface Reconstruction Illustration',
    nasaSearchQuery: 'Lunokhod 2 lunar rover',
    summary:
      'Advanced Soviet robotic rover that traversed 39 km (~39–42 km by LRO wheel-track measurements) across Le Monnier Crater—still holding the all-time lunar surface driving distance record.',
    missionObjective:
      'Explore the geological, magnetic, and photometric transition zone between the Mare Serenitatis basalt plain and the Taurus highland massif inside Le Monnier Crater using an elevated third navigation camera for high-speed driving.',
    missionOutcome:
      'Covered ~39 km in just 4 months, holding the all-time extraterrestrial driving record for 41 years until surpassed by Mars rover Opportunity in 2014 (and still #1 on the Moon). In May 1973, its open solar clamshell lid brushed against a loose crater wall, dumping dark insulating dust onto its radiator and causing terminal overheating.',
    keyMetrics: [
      {
        label: 'LUNAR DISTANCE RECORD',
        value: '39.0 km',
        sublabel: 'All-time longest surface drive on the Moon',
      },
      {
        label: 'PANORAMIC IMAGERY',
        value: '86 Panoramas',
        sublabel: '+ Over 80,000 television frames',
      },
      {
        label: 'ELEVATED OPTICS',
        value: '3 TV Cameras',
        sublabel: 'Raised mast camera for faster driver visibility',
      },
      {
        label: 'LASER RETROREFLECTOR',
        value: 'Still Active',
        sublabel: 'Continues to return Earth laser ranging pulses',
      },
    ],
    technicalSpecs: [
      { label: 'Rover Mass', value: '840 kg (84 kg heavier and more capable than Lunokhod 1)' },
      { label: 'Camera Suite', value: '3 slow-scan TV cameras + 4 panoramic telephoto cameras' },
      { label: 'Solar Array Upgrade', value: 'Higher-efficiency Gallium-Arsenide (GaAs) cells replacing silicon' },
      { label: 'Mobility System', value: '8 independent titanium-steel mesh wheels + dual-range traction drive' },
      { label: 'COSPAR / NSSDCA ID', value: '1973-001A' },
    ],
    scientificInstruments: [
      {
        code: 'SG-70',
        name: 'Three-Axis Fluxgate Magnetometer on 1.5 m Boom',
        location: 'Front Extendable Boom',
        description:
          'Measured local magnetic field anomalies along basalt plains and across the Fossa Recta tectonic rille.',
      },
      {
        code: 'AF-3L',
        name: 'AF-3L Visible & Ultraviolet Astrophotometer',
        location: 'Upper Hull',
        description:
          'Measured lunar daytime and twilight sky brightness, detecting forward light scattering from electrostatically levitated dust in the tenuous lunar exosphere.',
      },
      {
        code: 'RIFMA-M & PROP',
        name: 'Upgraded RIFMA-M X-Ray Spectrometer & PrOP Penetrometer',
        location: 'Front & Rear Chassis',
        description:
          'Confirmed in situ that iron abundance decreases while aluminum increases as the rover climbed from mare basalt toward highland anorthosite.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Exploration of the Fossa Recta Tectonic Graben (Rille)',
        location: 'Southeastern Le Monnier Crater',
        description:
          'Mapped boulder outcrops and fault wall structure along the 300–400 m wide, 6 km long Fossa Recta tectonic fracture zone.',
      },
      {
        title: 'Measurement of Lunar Twilight Horizon Glow',
        location: 'Le Monnier Crater',
        description:
          'AF-3L astrophotometer data revealed that fine regolith dust grains electrostatically lofted above the surface scatter sunlight after sunset.',
      },
    ],
    timeline: [
      {
        date: 'January 15, 1973',
        sol: 'Lunar Day 1',
        title: 'Touchdown 180 km North of Apollo 17',
        description: 'Luna 21 landed inside Le Monnier Crater just 180 km north of the Apollo 17 Taurus–Littrow valley.',
      },
      {
        date: 'February–March 1973',
        sol: 'Lunar Days 2–3',
        title: 'Record 16.5 km Traverse in a Single Lunar Day',
        description: 'Aided by its raised third navigation camera, Lunokhod 2 covered 16.5 km during a single lunar day.',
      },
      {
        date: 'May 9–10, 1973',
        sol: 'Lunar Day 5',
        title: 'Crater Wall Dust Contact & Thermal Overheating',
        description: 'Dark lunar dust dumped into the open solar lid covered the top radiator, causing internal temperatures to spike and ending the mission.',
      },
    ],
    sourceLabel: 'NASA NSSDCA — Luna 21 / Lunokhod 2 (1973-001A)',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-001A',
    secondarySourceLabel: 'NASA Science — Luna 21 / Lunokhod 2',
    secondarySourceUrl: 'https://science.nasa.gov/mission/luna-21/',
  },
  {
    id: 'change-3-yutu',
    name: 'Chang’e 3 & Yutu (Jade Rabbit)',
    code: 'CNSA · CHANG’E-3 & YUTU · 2013',
    agency: 'CNSA — China National Space Administration (China)',
    country: 'China',
    missionType: 'Robotic Lunar Rover',
    eraBadge: '2013 · MODERN LUNAR RENAISSANCE',
    launchDate: 'December 1, 2013 (17:30 UTC · Xichang)',
    landingDate: 'December 14, 2013 (13:11 UTC)',
    missionEndDate: 'July 31, 2016 (Yutu Rover · Lander LUT still operational)',
    durationLabel: '31 Months (972 Days Active Data · Planned: 3 Months)',
    landingSite: 'Northern Mare Imbrium (Zi Wei / Guang Han Gong Crater)',
    landingCoordinates: '44.12° N, 19.51° W (340.49° E)',
    lat: 44.12,
    lon: -19.51,
    hemisphereLabel: 'Near Side',
    markerColor: '#34d399',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/change-3-yutu.jpg',
    imageAlt: 'Chang’e 3 lander on the surface of Mare Imbrium photographed by the Yutu (Jade Rabbit) rover’s panoramic camera',
    imageCredit:
      'CNSA / Chinese Academy of Sciences (CAS) / The Planetary Society — Chang’e 3 Lander Imaged by Yutu Rover (Mare Imbrium, December 2013)',
    mediaKindLabel: 'Actual NASA / Archive Photograph',
    nasaSearchQuery: 'Change 3 landing site LRO',
    summary:
      'First soft landing on the Moon in 37 years (since Luna 24 in 1976) and China’s first lunar rover. Pioneered the first in-situ Lunar Penetrating Radar (LPR) subsurface survey on the Moon.',
    missionObjective:
      'Execute an autonomous laser/microwave hazard-avoidance soft landing under Phase 2 of the Chinese Lunar Exploration Program (CLEP), map subsurface stratigraphy using ground-penetrating radar on the 6-wheeled Yutu rover, and conduct ultraviolet astronomy from the lunar surface.',
    missionOutcome:
      'Although a drive-control circuit anomaly immobilized Yutu after 114.8 m during its 2nd lunar day, its scientific instruments continued transmitting data for 31 months (972 days) and discovered a previously unknown type of intermediate-titanium basalt.',
    keyMetrics: [
      {
        label: 'ROVER / LANDER MASS',
        value: '140 kg / 1,200 kg',
        sublabel: '6-wheel Rocker-Bogie chassis',
      },
      {
        label: 'SUBSURFACE RADAR (LPR)',
        value: '400 m Depth',
        sublabel: 'Identified 9 distinct subsurface volcanic layers',
      },
      {
        label: 'OPERATIONAL DURATION',
        value: '972 Days',
        sublabel: 'Over 10× its planned 90-day design life',
      },
      {
        label: 'NEW ROCK DISCOVERY',
        value: 'Mid-Ti Basalt',
        sublabel: 'New basalt type absent from Apollo & Luna samples',
      },
    ],
    technicalSpecs: [
      { label: 'Launch Vehicle', value: 'Long March 3B (CZ-3B) Rocket' },
      { label: 'Yutu Dimensions', value: 'Length: 1.5 m · Width: 1.0 m · Height: 1.1 m' },
      { label: 'Mobility System', value: '6-Wheel Rocker-Bogie (independent steering on 4 corner wheels)' },
      { label: 'Power & Thermal System', value: '2 Fold-Out Solar Panels + Plutonium-238 RHU Heaters' },
      { label: 'Lander Capabilities', value: '7,500 N variable-thrust engine + 3D Laser Hazard Avoidance System' },
      { label: 'COSPAR / NSSDCA ID', value: '2013-070A' },
    ],
    scientificInstruments: [
      {
        code: 'LPR',
        name: 'Lunar Penetrating Radar (60 MHz & 500 MHz)',
        location: 'Yutu Lower Chassis',
        description:
          'First ground-penetrating radar operated on the lunar surface; probed regolith down to 30 m at 500 MHz and basaltic lava layers down to 400 m at 60 MHz.',
      },
      {
        code: 'APXS & VNIS',
        name: 'Alpha Particle X-Ray Spectrometer & Visible/Near-Infrared Imaging Spectrometer',
        location: 'Yutu Robotic Arm & Front Hull',
        description:
          'Performed in-situ mineralogical and elemental analyses of young Mare Imbrium basalts around Zi Wei Crater.',
      },
      {
        code: 'LUT',
        name: 'Lunar-based Ultraviolet Telescope (150 mm Ritchey–Chrétien)',
        location: 'Chang’e 3 Lander Deck',
        description:
          'First long-term robotic astronomical observatory on the Moon, monitoring variable stars and active galactic nuclei for years.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Discovery of a New Type of Lunar Basalt (Intermediate-Titanium Olivine Basalt)',
        location: 'Zi Wei Crater (Guang Han Gong)',
        description:
          'APXS and VNIS measurements proved that ~2.96-billion-year-old young lava flows contain intermediate titanium and high iron/olivine—distinct from all Apollo and Soviet Luna samples.',
      },
      {
        title: 'Radar Detection of 9 Distinct Subsurface Geological Layers',
        location: 'Northeastern Mare Imbrium',
        description:
          'LPR radar profiles revealed 9 subsurface strata representing at least 3 separate volcanic flood-basalt episodes over the past 3.3 billion years.',
      },
    ],
    timeline: [
      {
        date: 'December 14, 2013',
        sol: 'Lunar Day 1',
        title: 'Soft Touchdown in Mare Imbrium & Yutu Rollout',
        description: 'Seven hours after landing, Yutu rolled down the deployment ramp and photographed the Chang’e 3 lander.',
      },
      {
        date: 'January 2014',
        sol: 'Lunar Day 2',
        title: '114.8-Meter Drive & Transition to Stationary Science',
        description: 'Following a mobility control anomaly, Yutu continued full APXS and spectral science from a fixed position.',
      },
      {
        date: 'July 31, 2016',
        sol: 'Lunar Day 33',
        title: 'Completion of Yutu’s 972-Day Surface Mission',
        description: 'Yutu set a new longevity record for a lunar surface rover (later surpassed by Yutu-2) before permanently shutting down.',
      },
    ],
    sourceLabel: 'The Planetary Society — Chang’e 3 & Yutu Surface Image Archive',
    sourceUrl: 'https://www.planetary.org/space-images/yutu-self-portrait',
    secondarySourceLabel: 'NASA NSSDCA — Chang’e 3 & Yutu Rover (2013-070A)',
    secondarySourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2013-070A',
  },
  {
    id: 'change-4-yutu-2',
    name: 'Chang’e 4 & Yutu-2',
    code: 'CNSA · CHANG’E-4 & YUTU-2 · 2019',
    agency: 'CNSA — China National Space Administration (China)',
    country: 'China',
    missionType: 'Robotic Lunar Rover',
    eraBadge: '2019–PRESENT · FIRST FAR-SIDE EXPLORER',
    launchDate: 'December 7, 2018 (18:23 UTC · Xichang)',
    landingDate: 'January 3, 2019 (02:26 UTC)',
    missionEndDate: 'Active Mission (70+ Lunar Days · 1,600+ m Traverse)',
    durationLabel: '6+ Years Active (Longest-Operating Lunar Surface Rover in History)',
    landingSite: 'Von Kármán Crater · South Pole–Aitken (SPA) Basin (Lunar Far Side)',
    landingCoordinates: '45.46° S, 177.60° E',
    lat: -45.46,
    lon: 177.6,
    hemisphereLabel: 'Far Side',
    markerColor: '#10b981',
    statusLabel: 'ACTIVE / EXTENDED MISSION',
    image: '/assets/images/lunar/change-4-yutu-2.jpg',
    imageAlt: 'Chang’e 4 lander and DLR LND experiment inside Von Kármán Crater on the lunar far side imaged by the Yutu-2 rover',
    imageCredit:
      'CNSA / CLEP / DLR (German Aerospace Center) — Chang’e 4 Lander & LND Experiment Imaged by Yutu-2 Rover (Von Kármán Crater)',
    mediaKindLabel: 'Actual NASA / Archive Photograph',
    nasaSearchQuery: 'Change 4 landing site LRO',
    summary:
      'First spacecraft in human history to achieve a soft landing on the permanently hidden Far Side of the Moon, deploying the Yutu-2 rover inside the South Pole–Aitken Basin via the Queqiao relay satellite.',
    missionObjective:
      'Communicate via the Queqiao relay satellite at the Earth–Moon L2 Lagrange point to soft-land inside Von Kármán Crater within the giant South Pole–Aitken (SPA) impact basin, and analyze deep lunar crust and upper-mantle minerals in situ.',
    missionOutcome:
      'Complete success and ongoing active mission. Surviving over 70 freezing lunar nights since January 2019, Yutu-2 has driven over 1.6 km and holds the all-time record as the longest-operating rover on the Moon.',
    keyMetrics: [
      {
        label: 'HISTORIC FIRST',
        value: 'Far-Side Landing',
        sublabel: 'First soft touchdown on the hidden lunar hemisphere',
      },
      {
        label: 'ACTIVE MISSION DURATION',
        value: '70+ Lunar Days',
        sublabel: 'Over 6 years of continuous operations since 2019',
      },
      {
        label: 'RELAY ARCHITECTURE',
        value: 'Queqiao (L2)',
        sublabel: 'X-band relay via Earth–Moon L2 halo orbit',
      },
      {
        label: 'RADAR PENETRATION',
        value: '40 m Fine Regolith',
        sublabel: 'Multi-layered ejecta stratigraphy mapped at 500 MHz',
      },
    ],
    technicalSpecs: [
      { label: 'Yutu-2 Rover Mass', value: '135 kg (One of the lightest planetary rovers ever built)' },
      { label: 'Communications Relay', value: 'Queqiao & Queqiao-2 Relay Satellites (L2 / Frozen Elliptical Orbit)' },
      { label: 'International Payloads', value: 'Germany (LND), Sweden (ASAN), Netherlands (NCLE)' },
      { label: 'Mobility Upgrade', value: 'Reinforced internal cable routing preventing the fault seen on Yutu-1' },
      { label: 'COSPAR / NSSDCA ID', value: '2018-103A' },
    ],
    scientificInstruments: [
      {
        code: 'VNIS',
        name: 'Visible and Near-Infrared Imaging Spectrometer (450–2400 nm)',
        location: 'Yutu-2 Front Lower Hull',
        description:
          'Measured reflectance spectra of rocks and regolith inside the SPA basin, identifying low-calcium pyroxene and olivine.',
      },
      {
        code: 'LND & ASAN',
        name: 'Lunar Lander Neutrons and Dosimetry (Germany) & Advanced Small Analyzer for Neutrals (Sweden)',
        location: 'Chang’e 4 Lander & Yutu-2 Rover',
        description:
          'Directly measured the full radiation dose equivalent on the lunar surface (1,369 µSv/day) for future astronaut safety and studied solar-wind/regolith interactions.',
      },
      {
        code: 'LPR',
        name: 'Dual-Channel Lunar Penetrating Radar (60 MHz & 500 MHz)',
        location: 'Yutu-2 Underbelly',
        description:
          'Mapped fine-grained regolith and alternating impact ejecta layers across the top 40 meters of Von Kármán Crater.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'Identification of Deep Crustal / Upper Mantle Minerals',
        location: 'Von Kármán Crater (SPA Basin)',
        description:
          'VNIS spectroscopy detected low-calcium pyroxene and olivine in material excavated by the nearby Finsen Crater impact—providing the first in-situ evidence of deep lunar crust/upper mantle composition.',
      },
      {
        title: 'First Direct Measurement of Lunar Surface Radiation Dose',
        location: 'Statio Tianhe',
        description:
          'The German LND detector revealed that lunar surface radiation is ~2.6× higher than inside the International Space Station (ISS) and ~200× higher than on Earth’s surface.',
      },
    ],
    timeline: [
      {
        date: 'January 3, 2019',
        sol: 'Lunar Day 1',
        title: 'Historic Touchdown in Von Kármán Crater (Statio Tianhe)',
        description: 'Chang’e 4 achieved humanity’s first soft landing on the lunar far side; Yutu-2 rolled onto the surface 12 hours later.',
      },
      {
        date: 'May–August 2019',
        sol: 'Lunar Days 5–8',
        title: 'Deep Mantle Minerals & Glassy Impact Melt Discovery',
        description: 'Discovered dark-green, glossy "gel-like" impact melt breccia inside a small fresh crater.',
      },
      {
        date: '2020–2026',
        sol: 'Lunar Days 15–70+',
        title: 'Extended Exploration Surpassing 1.6 Kilometers',
        description: 'Yutu-2 continues driving northwest, discovering translucent impact glass spherules and transmitting live science.',
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
    agency: 'ISRO — Indian Space Research Organisation (India)',
    country: 'India',
    missionType: 'Robotic Lunar Rover',
    eraBadge: '2023 · SOUTH POLE PIONEER',
    launchDate: 'July 14, 2023 (09:05 UTC · Satish Dhawan Space Centre)',
    landingDate: 'August 23, 2023 (12:32 UTC)',
    missionEndDate: 'September 3, 2023 (Lunar Night Sleep Mode)',
    durationLabel: '1 Full Lunar Day (12 Earth Days Active Surface Operations)',
    landingSite: 'Statio Shiv Shakti (Between Manzinus U & Boguslawsky M Craters · South Polar Region)',
    landingCoordinates: '69.37° S, 32.32° E',
    lat: -69.37,
    lon: 32.32,
    hemisphereLabel: 'South Polar Region',
    markerColor: '#a78bfa',
    statusLabel: 'HISTORIC MISSION COMPLETED',
    image: '/assets/images/lunar/chandrayaan-3-pragyan.jpg',
    imageAlt: 'Vikram lander at Statio Shiv Shakti in the Lunar South Polar region captured by the Chandrayaan-3 Pragyan rover’s NavCam',
    imageCredit:
      'ISRO (Indian Space Research Organisation) — Vikram Lander Imaged by Pragyan Rover NavCam (Statio Shiv Shakti, August 30, 2023)',
    mediaKindLabel: 'Actual NASA / Archive Photograph',
    nasaSearchQuery: 'Chandrayaan 3 landing site LRO',
    summary:
      'First space mission to achieve a soft landing in the rugged Lunar South Polar region (69.37° S). Made India the 4th nation to soft-land on the Moon and confirmed in-situ sulfur in high-latitude regolith.',
    missionObjective:
      'Demonstrate a safe soft landing in rugged highland terrain near the lunar south pole, analyze the elemental composition of high-latitude regolith using the 6-wheeled Pragyan rover, and measure the near-surface thermal gradient in situ.',
    missionOutcome:
      'Complete success. The Vikram lander and 26 kg Pragyan rover achieved all primary objectives. Pragyan drove 101.4 meters and directly detected sulfur (S) alongside major rock-forming elements, while Vikram fired its engines again at the end of the lunar day to execute a 40 cm vertical "Hop Experiment"—landing a second time on the Moon.',
    keyMetrics: [
      {
        label: 'SOUTHERN LATITUDE RECORD',
        value: '69.37° South',
        sublabel: 'First soft landing in the lunar south polar region',
      },
      {
        label: 'PRAGYAN TRAVERSE',
        value: '101.4 Meters',
        sublabel: '26 kg mass · 6-wheel Rocker-Bogie',
      },
      {
        label: 'THERMAL GRADIENT',
        value: '+50 °C → -10 °C',
        sublabel: '60 °C temperature drop just 8 cm below surface',
      },
      {
        label: 'HOP EXPERIMENT',
        value: '40 cm Hop',
        sublabel: 'Vikram reignited its engines and landed a second time',
      },
    ],
    technicalSpecs: [
      { label: 'Launch Vehicle', value: 'LVM3-M4 (Launch Vehicle Mark-3) Heavy-Lift Rocket' },
      { label: 'Vikram Landed Mass', value: '1,749.86 kg (including Pragyan rover)' },
      { label: 'Pragyan Mass & Power', value: '26 kg · 50 W vertical deployable solar panel' },
      { label: 'Pragyan Dimensions', value: '91.7 cm × 75.0 cm × 39.7 cm (6 wheels)' },
      { label: 'NASA Contribution', value: 'NASA Laser Retroreflector Array (LRA) passive target on Vikram' },
      { label: 'COSPAR / NSSDCA ID', value: '2023-098A' },
    ],
    scientificInstruments: [
      {
        code: 'LIBS & APXS',
        name: 'Laser-Induced Breakdown Spectroscope & Alpha Particle X-Ray Spectrometer',
        location: 'Pragyan Rover Underbelly & Front Articulated Arm',
        description:
          'Vaporized regolith with high-energy laser pulses to directly detect sulfur (S), aluminum (Al), calcium (Ca), iron (Fe), chromium (Cr), and titanium (Ti) in situ.',
      },
      {
        code: 'ChaSTE',
        name: 'Chandra’s Surface Thermophysical Experiment (10-Sensor Thermal Probe)',
        location: 'Vikram Lander',
        description:
          'Penetrated 10 cm into the soil to measure the superior thermal insulation of south-polar lunar regolith in situ for the first time.',
      },
      {
        code: 'ILSA & RAMBHA-LP',
        name: 'Instrument for Lunar Seismic Activity (ILSA) & Langmuir Plasma Probe',
        location: 'Vikram Lander',
        description:
          'Recorded Pragyan’s wheel vibrations and a candidate natural moonquake while measuring near-surface photoelectron plasma density.',
      },
      {
        code: 'NASA-LRA',
        name: 'NASA Laser Retroreflector Array',
        location: 'Vikram Upper Deck',
        description:
          'Reflected laser pulses from NASA’s Lunar Reconnaissance Orbiter (LRO), serving as a permanent geodetic benchmark near the south pole.',
      },
    ],
    majorDiscoveries: [
      {
        title: 'First In-Situ Confirmation of Sulfur (S) in South Polar Regolith',
        location: 'Statio Shiv Shakti (69.37° S)',
        description:
          'Pragyan’s LIBS and APXS spectrometers unambiguously confirmed elemental sulfur in high-latitude lunar soil—a volatile signature difficult to resolve from orbit.',
      },
      {
        title: 'Measurement of Steep Subsurface Temperature Drop (Thermal Insulation)',
        location: 'Vikram ChaSTE Probe Site',
        description:
          'Demonstrated that while surface daytime temperature reached +50 °C, temperature dropped to -10 °C just 8 cm underground—proving how effectively lunar topsoil insulates subsurface water ice.',
      },
    ],
    timeline: [
      {
        date: 'August 23, 2023',
        sol: 'Lunar Day 1',
        title: 'Soft Touchdown at Statio Shiv Shakti & Pragyan Rollout',
        description: 'Vikram landed safely at 69.37° S; hours later, Pragyan rolled down the two-segment ramp onto the lunar surface.',
      },
      {
        date: 'August 27–30, 2023',
        sol: 'Surface Days 5–8',
        title: 'ChaSTE Thermal Profile & LIBS Sulfur Confirmation',
        description: 'Pragyan autonomously detoured around a 4-meter crater and confirmed the sulfur emission spectrum via LIBS.',
      },
      {
        date: 'September 3, 2023',
        sol: 'Surface Day 12',
        title: 'Vikram Hop Experiment & Lunar Night Sleep Mode',
        description: 'Vikram fired its engines to hop 40 cm up and 30–40 cm laterally before both spacecraft entered sleep mode ahead of the lunar night.',
      },
    ],
    sourceLabel: 'ISRO — Official Chandrayaan-3 Mission Details & Surface Imagery',
    sourceUrl: 'https://www.isro.gov.in/ISRO_EN/Chandrayaan3_Details.html',
    secondarySourceLabel: 'NASA NSSDCA — Chandrayaan-3 Mission (2023-098A)',
    secondarySourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2023-098A',
  },
];

export const EN_SPACECRAFT_QUIZ_GROUPS: readonly QuizSpacecraftGroup[] = [
  {
    id: 'ingenuity',
    groupNumber: 1,
    title: '1. SPACECRAFT: INGENUITY MARS HELICOPTER',
    subtitle: 'First Aircraft to Achieve Powered, Controlled Flight on Another Planet (Jezero Crater · 2021–2024)',
    badge: 'MARS ROTORCRAFT · 72 FLIGHTS',
    accentColor: '#38bdf8',
    questions: [
      {
        id: 'quiz-q1',
        questionNumber: 1,
        spacecraftGroupId: 'ingenuity',
        spacecraftTitle: '1. SPACECRAFT: INGENUITY MARS HELICOPTER',
        prompt:
          'Attached to the belly of which Mars rover was the Ingenuity helicopter carried to the Martian surface?',
        options: [
          { key: 'A', text: 'Curiosity' },
          { key: 'B', text: 'Perseverance' },
          { key: 'C', text: 'Opportunity' },
          { key: 'D', text: 'Spirit' },
        ],
        correctOption: 'B',
        explanation:
          'As part of NASA’s Mars 2020 mission, Ingenuity was carried to Mars attached to the underside (belly) of the Perseverance rover and landed in Jezero Crater on February 18, 2021.',
      },
      {
        id: 'quiz-q2',
        questionNumber: 2,
        spacecraftGroupId: 'ingenuity',
        spacecraftTitle: '1. SPACECRAFT: INGENUITY MARS HELICOPTER',
        prompt:
          'How was Ingenuity able to generate lift in Mars’s thin atmosphere, which has only 1% the density of Earth’s?',
        options: [
          { key: 'A', text: 'By using a buoyant hot-air balloon system' },
          { key: 'B', text: 'By ascending vertically with rocket thrusters' },
          {
            key: 'C',
            text: 'Thanks to its ultra-lightweight body and wide counter-rotating dual rotors spinning at roughly 2,500 rpm',
          },
          { key: 'D', text: 'By riding strong Martian thermal wind currents' },
        ],
        correctOption: 'C',
        explanation:
          'Ingenuity achieved flight thanks to its ultra-light 1.8 kg fuselage and its 1.2-meter carbon-fiber counter-rotating coaxial rotors spinning at approximately 2,400–2,537 revolutions per minute.',
      },
    ],
  },
  {
    id: 'sojourner',
    groupNumber: 2,
    title: '2. SPACECRAFT: SOJOURNER ROVER',
    subtitle: 'First Wheeled Robotic Rover to Leave Tracks on Mars (Mars Pathfinder · Ares Vallis · 1997)',
    badge: 'PIONEER MARS ROVER · 83 DAYS',
    accentColor: '#f59e0b',
    questions: [
      {
        id: 'quiz-q3',
        questionNumber: 3,
        spacecraftGroupId: 'sojourner',
        spacecraftTitle: '2. SPACECRAFT: SOJOURNER ROVER',
        prompt:
          'By what method did Sojourner make a safe touchdown in the Ares Vallis region of Mars on July 4, 1997?',
        options: [
          { key: 'A', text: 'By grappling directly onto boulders with parachute hooks' },
          { key: 'B', text: 'By bouncing like a ball across the surface inside giant airbags' },
          { key: 'C', text: 'By autorotating down on helicopter blades' },
          { key: 'D', text: 'By being lowered on cables from another spacecraft’s crane' },
        ],
        correctOption: 'B',
        explanation:
          'Sojourner touched down safely in the rocky Ares Vallis floodplain by bouncing across the surface inside giant airbags, rolling down its ramp on the night of July 5 to leave humanity’s first wheel tracks in the red soil.',
      },
      {
        id: 'quiz-q4',
        questionNumber: 4,
        spacecraftGroupId: 'sojourner',
        spacecraftTitle: '2. SPACECRAFT: SOJOURNER ROVER',
        prompt:
          'Originally designed to operate for only 7 days, how many days in total did Sojourner operate on the Martian surface?',
        options: [
          { key: 'A', text: '15 days' },
          { key: 'B', text: '30 days' },
          { key: 'C', text: '83 days' },
          { key: 'D', text: '365 days' },
        ],
        correctOption: 'C',
        explanation:
          'Planned for just a 7-day baseline mission, Sojourner far exceeded expectations by operating for 83 days until September 27, 1997 and transmitting 550 photographs back to Earth.',
      },
    ],
  },
  {
    id: 'opportunity',
    groupNumber: 3,
    title: '3. SPACECRAFT: OPPORTUNITY ROVER',
    subtitle: 'Record-Breaking Rover That Drove 45.16 km From Meridiani Planum to Endeavour Crater (MER-B · 2004–2018)',
    badge: 'MARS MARATHONER · 5,111 SOLS',
    accentColor: '#e2643a',
    questions: [
      {
        id: 'quiz-q5',
        questionNumber: 5,
        spacecraftGroupId: 'opportunity',
        spacecraftTitle: '3. SPACECRAFT: OPPORTUNITY ROVER',
        prompt:
          'What nickname did scientists give to the small, spherical hematite concretions discovered by Opportunity that proved liquid water once existed on Mars?',
        options: [
          { key: 'A', text: 'Crimson pearls' },
          { key: 'B', text: 'Martian blueberries' },
          { key: 'C', text: 'Space pebbles' },
          { key: 'D', text: 'Iron droplets' },
        ],
        correctOption: 'B',
        explanation:
          'Opportunity discovered small, spherical hematite concretions formed in ancient water-saturated sediments; mission scientists affectionately named them "Martian blueberries."',
      },
      {
        id: 'quiz-q6',
        questionNumber: 6,
        spacecraftGroupId: 'opportunity',
        spacecraftTitle: '3. SPACECRAFT: OPPORTUNITY ROVER',
        prompt:
          'After operating for nearly 15 years, what caused Opportunity to lose contact with Earth in 2018?',
        options: [
          { key: 'A', text: 'Tumbling into a crater and breaking its wheels' },
          {
            key: 'B',
            text: 'A massive planet-encircling dust storm that blocked sunlight and depleted its solar energy',
          },
          { key: 'C', text: 'Being remotely shut down because its scheduled mission time expired' },
          { key: 'D', text: 'An asteroid impact that severed its high-gain antenna' },
        ],
        correctOption: 'B',
        explanation:
          'A colossal global dust storm in 2018 blocked out sunlight over Perseverance Valley, depleting Opportunity’s solar-charged batteries; its final signal was received on June 10, 2018.',
      },
    ],
  },
  {
    id: 'apollo-lrv',
    groupNumber: 4,
    title: '4. SPACECRAFT: APOLLO LUNAR ROVING VEHICLE (MOON BUGGY)',
    subtitle: 'Crewed Electric Exploration Vehicle Driven by Astronauts on Apollo 15, 16, and 17 (1971–1972)',
    badge: 'CREWED LUNAR ROVER · APOLLO 15–17',
    accentColor: '#34d399',
    questions: [
      {
        id: 'quiz-q7',
        questionNumber: 7,
        spacecraftGroupId: 'apollo-lrv',
        spacecraftTitle: '4. SPACECRAFT: APOLLO LUNAR ROVING VEHICLE (MOON BUGGY)',
        prompt:
          'What power source propelled the Lunar Roving Vehicle during Apollo 15, 16, and 17, and what was its approximate normal top speed on flat ground?',
        options: [
          { key: 'A', text: 'Powered by solar panels, with a top speed of 5 km/h' },
          { key: 'B', text: 'Powered by liquid rocket propellant, with a top speed of 40 km/h' },
          {
            key: 'C',
            text: 'Powered by batteries (electricity), with a top speed of approximately 13 km/h',
          },
          { key: 'D', text: 'Powered by nuclear energy, with a top speed of 25 km/h' },
        ],
        correctOption: 'C',
        explanation:
          'The four-wheeled Lunar Roving Vehicle was battery-powered (electric) using dual 36V silver-zinc batteries, with a designed flat-ground top speed of approximately 13 km/h (8 mph).',
      },
      {
        id: 'quiz-q8',
        questionNumber: 8,
        spacecraftGroupId: 'apollo-lrv',
        spacecraftTitle: '4. SPACECRAFT: APOLLO LUNAR ROVING VEHICLE (MOON BUGGY)',
        prompt:
          'Why were the Lunar Roving Vehicles not brought back to Earth with the astronauts when the missions concluded?',
        options: [
          { key: 'A', text: 'Because they were lost in a lunar sandstorm' },
          {
            key: 'B',
            text: 'Because space and ascent mass on the return module were strictly limited, and lunar rock samples were the most valuable payload',
          },
          { key: 'C', text: 'Because they were scheduled to be reused by another crew the following month' },
          { key: 'D', text: 'Because their batteries exploded after the final drive' },
        ],
        correctOption: 'B',
        explanation:
          'Because volume and liftoff mass on the Lunar Module ascent stage were strictly constrained—and collected lunar rocks were the most valuable scientific cargo—all three rovers were left behind at Hadley Rille, the Descartes Highlands, and the Taurus–Littrow Valley.',
      },
    ],
  },
  {
    id: 'insight',
    groupNumber: 5,
    title: '5. SPACECRAFT: INSIGHT MARS LANDER',
    subtitle: 'Geophysical Discovery Station That Mapped Mars’s Crust, Mantle, and Core via Seismic Waves (Elysium Planitia · 2018–2022)',
    badge: 'MARS SEISMOLOGY STATION · 1,300+ QUAKES',
    accentColor: '#a78bfa',
    questions: [
      {
        id: 'quiz-q9',
        questionNumber: 9,
        spacecraftGroupId: 'insight',
        spacecraftTitle: '5. SPACECRAFT: INSIGHT MARS LANDER',
        prompt:
          'Which scientific instrument did the stationary InSight lander place on the surface to listen to the "heartbeat" of Mars and map its internal structure?',
        options: [
          { key: 'A', text: 'A deep rotary coring drill' },
          { key: 'B', text: 'An ultra-sensitive seismometer' },
          { key: 'C', text: 'An infrared space telescope' },
          { key: 'D', text: 'A chemical soil pyrolysis oven' },
        ],
        correctOption: 'B',
        explanation:
          'InSight used its ultra-sensitive seismometer (SEIS) placed directly on the Martian ground to detect over 1,300 marsquakes and analyze seismic waves—mapping the planet’s crust, mantle, and liquid core.',
      },
      {
        id: 'quiz-q10',
        questionNumber: 10,
        spacecraftGroupId: 'insight',
        spacecraftTitle: '5. SPACECRAFT: INSIGHT MARS LANDER',
        prompt:
          'Originally planned for 2 years and operating for 4 years, why did InSight’s mission come to an end in December 2022?',
        options: [
          {
            key: 'A',
            text: 'Because Martian dust coated its solar arrays and depleted its electrical energy',
          },
          { key: 'B', text: 'Because it tipped over during a powerful marsquake' },
          { key: 'C', text: 'Because it drove into a deep crater while relocating' },
          { key: 'D', text: 'Because its nuclear fuel tank ran empty' },
        ],
        correctOption: 'A',
        explanation:
          'A stationary solar-powered lander, InSight concluded its mission in December 2022 after accumulating thick Martian dust on its solar arrays, which gradually depleted its power generation.',
      },
    ],
  },
];

export const EN_REFERENCE_CATEGORIES: readonly ReferenceCategoryGroup[] = [
  {
    id: 'nasa-official',
    code: 'CAT-01',
    title: 'Official NASA Mission Portals',
    subtitle: 'Primary NASA Science & NSSDCA mission portals for Mars and Lunar surface exploration',
  },
  {
    id: 'nasa-media',
    code: 'CAT-02',
    title: 'NASA Visual & Media Archives',
    subtitle: 'Verified NASA/JPL Photojournal (PIA) and NASA Image and Video Library records used in this project',
  },
  {
    id: 'nasa-technical',
    code: 'CAT-03',
    title: 'NASA / JPL Technical & Geodetic Documentation',
    subtitle: 'Apollo LRV engineering manuals, USGS planetary nomenclature coordinates, and PDS telemetry archives',
  },
  {
    id: 'turkish-space',
    code: 'CAT-04',
    title: 'TÜBİTAK & Turkish Space Agency (TUA)',
    subtitle: 'Institutional science communication, aerospace terminology, and national lunar research references',
  },
  {
    id: 'wikipedia-tr',
    code: 'CAT-05',
    title: 'Encyclopedic & Wikipedia References',
    subtitle: 'Encyclopedic spacecraft summaries and cross-linguistic technical terminology references',
  },
  {
    id: 'models-open-data',
    code: 'CAT-06',
    title: '3D Engineering Models & Open Data Sources',
    subtitle: 'Procedural 3D planetary surface synthesis, multi-part R3F CAD schematics, and open API documentation',
  },
];

export const EN_REFERENCE_ITEMS: readonly ReferenceItem[] = [
  {
    id: 'nasa-mer-opportunity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Exploration Rover Opportunity (MER-B)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mer-opportunity/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration', 'Opportunity Technical Dossier', 'Interactive Mars Map', 'Mission Simulation'],
    description:
      'Primary source for Opportunity’s (MER-B) 5,352-Sol mission, 45.16 km traverse route, hematite spherules discovery, and 2018 global dust storm telemetry.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-mer-spirit',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Exploration Rover Spirit (MER-A)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mer-spirit/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration', 'Spirit Technical Dossier', 'Interactive Mars Map', 'Mission Simulation'],
    description:
      'Official record of Spirit’s (MER-A) Gusev Crater landing, Husband Hill summit climb, Home Plate opaline silica discovery, and Troy sand trap operations.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-msl-curiosity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Science Laboratory (Curiosity Rover)',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/msl-curiosity/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration', 'Curiosity Technical Dossier', '3D Rover Lab', 'Comparison Lab'],
    description:
      'Official data source for Curiosity’s Gale Crater (Bradbury Landing) touchdown, Yellowknife Bay mudstone drilling, Mount Sharp ascent, and SAM/CheMin results.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-m2020-perseverance',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars 2020 Perseverance Rover',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration', 'Perseverance Technical Dossier', '3D Rover Lab', 'Mission Simulation'],
    description:
      'Official portal for Perseverance’s Jezero Crater (Octavia E. Butler Landing) touchdown, MOXIE oxygen generation, Three Forks sample depot, and Cheyava Falls discovery.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-ingenuity',
    categoryId: 'nasa-official',
    title: 'NASA Science — Ingenuity Mars Helicopter Mission',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer Missions)', 'NASA Photo Archive (PIA24542)', '3D Rover Lab', 'Spacecraft Quiz'],
    description:
      'Flight log and engineering data for the 72 flights of the Ingenuity Mars Helicopter—the first aircraft to achieve powered, controlled flight on another planet.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-insight',
    categoryId: 'nasa-official',
    title: 'NASA Science — InSight Mars Lander Mission',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/insight/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer & Geophysical Missions)', 'Spacecraft Quiz', 'Bibliography'],
    description:
      'Official source for the InSight geophysical lander at Elysium Planitia, documenting 1,300+ marsquakes recorded by its SEIS seismometer and Martian core/crust measurements.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-pathfinder',
    categoryId: 'nasa-official',
    title: 'NASA Science — Mars Pathfinder & Sojourner Rover',
    organization: 'NASA / Jet Propulsion Laboratory (JPL)',
    url: 'https://science.nasa.gov/mission/mars-pathfinder/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer Missions)', '3D Rover Lab (Rocker-Bogie Heritage)', 'Spacecraft Quiz'],
    description:
      'Official mission portal for the 11.5 kg Sojourner rover—the first wheeled rover on Mars—and the airbag landing system validated at Ares Vallis in 1997.',
    badge: 'OFFICIAL NASA MISSION PORTAL',
  },
  {
    id: 'nasa-nssdca-lunar',
    categoryId: 'nasa-official',
    title: 'NASA NSSDCA — Lunar Spacecraft Catalog (Luna 9, Lunokhod 1/2, Chang’e 3/4, Chandrayaan-3)',
    organization: 'NASA Goddard Space Flight Center (NSSDCA)',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html',
    accessDate: 'November 14, 2026',
    usedInSections: ['Lunar Exploration', '3D Selenographic Moon Globe'],
    description:
      'COSPAR / NSSDCA mission catalogs and landing coordinates for Luna 9 (1966-006A), Lunokhod 1 (1970-095A), Lunokhod 2 (1973-001A), Chang’e 3/Yutu (2013-070A), Chang’e 4/Yutu-2 (2018-103A), and Chandrayaan-3 (2023-098A).',
    badge: 'NASA NSSDCA CATALOG',
  },
  {
    id: 'nasa-images-library',
    categoryId: 'nasa-media',
    title: 'NASA Image and Video Library (images.nasa.gov & REST API)',
    organization: 'NASA Headquarters / Office of Communications',
    url: 'https://images.nasa.gov/',
    accessDate: 'November 14, 2026',
    usedInSections: ['NASA Photo Archive', 'Lunar Mission Live Imagery Query'],
    description:
      'Official NASA public-domain media database powering both our verified offline archive photos and live REST API (images-api.nasa.gov) queries.',
    badge: 'OFFICIAL MEDIA ARCHIVE',
  },
  {
    id: 'nasa-photojournal-mer',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Spirit & Opportunity Imagery (PIA10128, PIA17759, PIA07269, PIA04413)',
    organization: 'NASA / JPL-Caltech / Cornell University',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA07269',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration Cards', 'NASA Photo Archive', 'Mission Simulation'],
    description:
      'Primary PIA catalog entries for Spirit’s Gusev Crater solar deck mosaic (PIA10128), Opportunity’s Heat Shield Rock meteorite (PIA07269), Opportunity’s self-portrait (PIA17759), and the MER concept visualization (PIA04413).',
    badge: 'ACTUAL MISSION IMAGERY',
  },
  {
    id: 'nasa-photojournal-msl',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Curiosity MAHLI & Mastcam Imagery (PIA19807, PIA19912, PIA26356)',
    organization: 'NASA / JPL-Caltech / MSSS',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA19807',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration Cards', 'NASA Photo Archive', 'Mission Simulation'],
    description:
      'Curiosity’s MAHLI self-portrait at the Buckskin drill site (PIA19807), Mount Sharp (Aeolis Mons) Mastcam 100 mm panorama (PIA19912), and Gediz Vallis elemental sulfur discovery (PIA26356).',
    badge: 'ACTUAL MISSION IMAGERY',
  },
  {
    id: 'nasa-photojournal-m2020',
    categoryId: 'nasa-media',
    title: 'NASA/JPL Photojournal — Perseverance & Ingenuity Imagery (PIA24542, PIA24836, PIA26368)',
    organization: 'NASA / JPL-Caltech / MSSS',
    url: 'https://photojournal.jpl.nasa.gov/catalog/PIA24542',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration Cards', 'NASA Photo Archive', 'Mission Simulation'],
    description:
      'Perseverance and Ingenuity’s dual portrait captured by the WATSON camera on Sol 46 (PIA24542), Rochette rock core self-portrait (PIA24836), and Cheyava Falls rock analysis (PIA26368).',
    badge: 'ACTUAL MISSION IMAGERY',
  },
  {
    id: 'nasa-alsj-lrv',
    categoryId: 'nasa-technical',
    title: 'NASA History — Apollo Lunar Roving Vehicle (LRV) Documentation (ALSJ)',
    organization: 'NASA History Division / Apollo Lunar Surface Journal',
    url: 'https://www.nasa.gov/history/alsj/alsj-LRVdocs.html',
    accessDate: 'November 14, 2026',
    usedInSections: ['Lunar Exploration (Apollo 15, 16, 17 LRV)', 'Apollo LRV Dossiers', 'Spacecraft Quiz'],
    description:
      'Boeing/Delco engineering manuals, traverse odometry logs, power consumption data, and inertial navigation documentation for Apollo 15 (LRV-001), Apollo 16 (LRV-002), and Apollo 17 (LRV-003).',
    badge: 'TECHNICAL ENGINEERING DOCUMENT',
  },
  {
    id: 'usgs-planetary-names',
    categoryId: 'nasa-technical',
    title: 'USGS Astrogeology Science Center — Gazetteer of Planetary Nomenclature (Mars & Moon)',
    organization: 'USGS / International Astronomical Union (IAU)',
    url: 'https://planetarynames.wr.usgs.gov/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Interactive Mars Map', '3D Selenographic Moon Globe'],
    description:
      'IAU-approved geodetic coordinates for Mars (Gusev, Meridiani Planum, Gale, Jezero, Olympus Mons, Valles Marineris) and the Moon (Mare Imbrium, Oceanus Procellarum, Taurus–Littrow, Von Kármán).',
    badge: 'GEODETIC DATA SOURCE',
  },
  {
    id: 'nasa-pds-geosciences',
    categoryId: 'nasa-technical',
    title: 'NASA Planetary Data System (PDS) — Geosciences Node (MER, MSL & Mars 2020 Analyst’s Notebook)',
    organization: 'NASA PDS / Washington University in St. Louis',
    url: 'https://pds-geosciences.wustl.edu/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Interactive Mars Map (Waypoints)', 'Rover Comparison Lab'],
    description:
      'Scientific data archive containing Sol-by-Sol odometry, spectrometer records (APXS, Mössbauer, ChemCam, SHERLOC), and drill site coordinates.',
    badge: 'SCIENTIFIC TELEMETRY ARCHIVE',
  },
  {
    id: 'tubitak-bilimgenc',
    categoryId: 'turkish-space',
    title: 'TÜBİTAK Bilim Genç — Space & Planetary Exploration Science Portal',
    organization: 'TÜBİTAK (Scientific and Technological Research Council of Türkiye)',
    url: 'https://bilimgenc.tubitak.gov.tr/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Bilingual Scientific Narrative)', 'Lunar Exploration', 'Bibliography'],
    description:
      'Institutional popular science reference used for planetary geology, space robotics, and Turkish–English astronomy and aerospace engineering terminology alignment.',
    badge: 'INSTITUTIONAL SCIENCE SOURCE',
  },
  {
    id: 'tua-gov-tr',
    categoryId: 'turkish-space',
    title: 'Turkish Space Agency (TUA) Official Portal',
    organization: 'Turkish Space Agency (TUA)',
    url: 'https://tua.gov.tr/',
    accessDate: 'November 14, 2026',
    usedInSections: ['Lunar Exploration (National Lunar Research Context)', 'Bibliography'],
    description:
      'Institutional reference for the National Space Program, Lunar Research Program (AYAP), and bilingual space mission terminology standards.',
    badge: 'OFFICIAL INSTITUTIONAL SOURCE',
  },
  {
    id: 'wiki-tr-ay-tasiti',
    categoryId: 'wikipedia-tr',
    title: 'Wikipedia — Lunar Roving Vehicle (Apollo LRV / Ay Taşıtı)',
    organization: 'Wikipedia Free Encyclopedia',
    url: 'https://en.wikipedia.org/wiki/Lunar_Roving_Vehicle',
    accessDate: 'November 14, 2026',
    usedInSections: ['Lunar Exploration (Apollo 15, 16, 17 LRV)', 'Apollo LRV Dossiers'],
    description:
      'Supplementary encyclopedic reference for the dimensions, subsystems, and EVA traverse summaries of the Apollo 15, 16, and 17 Lunar Roving Vehicles.',
    badge: 'ENCYCLOPEDIC SOURCE',
  },
  {
    id: 'wiki-tr-opportunity',
    categoryId: 'wikipedia-tr',
    title: 'Wikipedia — Opportunity (MER-B Mars Rover)',
    organization: 'Wikipedia Free Encyclopedia',
    url: 'https://en.wikipedia.org/wiki/Opportunity_(rover)',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration', 'Opportunity Dossier', 'Comparison Lab'],
    description:
      'Mission chronology, Meridiani Planum geological findings, and 15-year operational summary reference for the Opportunity (MER-B) rover.',
    badge: 'ENCYCLOPEDIC SOURCE',
  },
  {
    id: 'wiki-tr-ingenuity',
    categoryId: 'wikipedia-tr',
    title: 'Wikipedia — Ingenuity (Mars Helicopter)',
    organization: 'Wikipedia Free Encyclopedia',
    url: 'https://en.wikipedia.org/wiki/Ingenuity_(helicopter)',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer Missions)', 'Perseverance Dossier', 'NASA Photo Archive'],
    description:
      'Reference for the coaxial rotor design and 72-flight history of the Ingenuity Mars Helicopter deployed by Perseverance.',
    badge: 'ENCYCLOPEDIC SOURCE',
  },
  {
    id: 'wiki-tr-insight',
    categoryId: 'wikipedia-tr',
    title: 'Wikipedia — InSight Mars Lander',
    organization: 'Wikipedia Free Encyclopedia',
    url: 'https://en.wikipedia.org/wiki/InSight',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer & Geophysical Missions)', 'Bibliography'],
    description:
      'Mission overview for the InSight spacecraft that studied Mars’s interior structure, seismic activity, and heat flow.',
    badge: 'ENCYCLOPEDIC SOURCE',
  },
  {
    id: 'wiki-tr-sojourner',
    categoryId: 'wikipedia-tr',
    title: 'Wikipedia — Sojourner (Mars Pathfinder Rover)',
    organization: 'Wikipedia Free Encyclopedia',
    url: 'https://en.wikipedia.org/wiki/Sojourner_(rover)',
    accessDate: 'November 14, 2026',
    usedInSections: ['Mars Exploration (Pioneer Missions)', '3D Rover Lab', 'Bibliography'],
    description:
      'Technical and historical overview of Sojourner, the first rover to operate on Mars during the 1997 Mars Pathfinder mission.',
    badge: 'ENCYCLOPEDIC SOURCE',
  },
  {
    id: 'nasa-3d-resources-rover',
    categoryId: 'models-open-data',
    title: 'Three.js / React Three Fiber Multi-Part Engineering CAD Models & NASA 3D Resources Reference',
    organization: 'HVB HORIZON Procedural Engineering Engine & NASA 3D Resources (nasa3d.arc.nasa.gov)',
    url: 'https://nasa3d.arc.nasa.gov/models',
    accessDate: 'November 14, 2026',
    usedInSections: ['3D Rover Inspection Lab (Rover3DViewport.tsx)'],
    description:
      'Interactive real-time Three.js 3D CAD models built to authentic JPL/NASA chassis proportions (6 cleated wheels, articulated Rocker-Bogie suspension, butterfly solar wings, 8-finned MMRTG, PMA/RSM camera mast, and 5-axis robotic arm/turret).',
    badge: '3D MODEL & CAD ARCHITECTURE',
  },
  {
    id: 'procedural-mars-moon-textures',
    categoryId: 'models-open-data',
    title: 'Unit-Sphere 3D fBm Procedural Mars & Selenographic Lunar Surface Textures',
    organization: 'HVB HORIZON Mathematical Surface Synthesizer (marsTexture.ts & moonTexture.ts)',
    url: 'https://threejs.org/docs/#api/en/textures/CanvasTexture',
    accessDate: 'November 14, 2026',
    usedInSections: ['Hero 3D Mars Globe', '3D Selenographic Moon Globe (Lunar Exploration)'],
    description:
      'Runtime-generated 3D diffuse and bump maps synthesized via 3D fractal Brownian motion (fBm), crater bowl/rim functions, and authentic selenographic mare coordinates (Mare Imbrium, Oceanus Procellarum, Mare Serenitatis, SPA Basin)—transparently labeled as procedural models.',
    badge: 'PROCEDURAL 3D TEXTURE SYSTEM',
  },
];
