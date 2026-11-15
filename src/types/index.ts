/**
 * Default camera configuration for the 3D scene viewport.
 */
export interface CameraConfig {
  position: [number, number, number];
  fov: number;
}

/**
 * Top-level foundational application configuration.
 */
export type Language = 'tr' | 'en';

export interface AppConfig {
  title: string;
  version: string;
  defaultCamera: CameraConfig;
}

/**
 * Current viewport dimensions and aspect metadata.
 */
export interface ViewportState {
  width: number;
  height: number;
  isCompact: boolean;
}

/**
 * Identifier for each of the four Mars rovers.
 */
export type RoverId = 'spirit' | 'opportunity' | 'curiosity' | 'perseverance';

/**
 * Navigation section identifiers on the home page.
 */
export type SectionId =
  | 'hero'
  | 'mars-exploration'
  | 'mars-map'
  | 'nasa-photo-archive'
  | 'rover-3d-lab'
  | 'rover-comparison'
  | 'mission-simulation'
  | 'lunar-exploration'
  | 'spacecraft-quiz'
  | 'stories-showcase'
  | 'meet-the-explorers'
  | 'explorer-stories'
  | 'project-showcase'
  | 'references';

/**
 * Key telemetry metric displayed at the top of the rover detail screen.
 */
export interface RoverMetric {
  label: string;
  value: string;
  sublabel: string;
}

/**
 * Technical specification key-value pair for a rover.
 */
export interface RoverTechnicalSpec {
  label: string;
  value: string;
}

/**
 * Scientific instrument onboard a Mars rover.
 */
export interface RoverInstrument {
  code: string;
  name: string;
  location: string;
  description: string;
}

/**
 * Major scientific discovery made by a Mars rover.
 */
export interface RoverDiscovery {
  title: string;
  location: string;
  description: string;
}

/**
 * Milestone event in a rover's mission timeline.
 */
export interface RoverTimelineEvent {
  date: string;
  sol: string;
  title: string;
  description: string;
}

/**
 * Mars rover card and full detail definition.
 */
export interface MarsRoverItem {
  id: RoverId;
  name: string;
  code: string;
  landingYear: string;
  landingSite: string;
  landingCoordinates: string;
  launchDate: string;
  landingDate: string;
  missionEndDate: string;
  plannedDuration: string;
  actualDuration: string;
  statusLabel: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  summary: string;
  missionObjective: string;
  finalLegacy: string;
  keyMetrics: readonly RoverMetric[];
  technicalSpecs: readonly RoverTechnicalSpec[];
  scientificInstruments: readonly RoverInstrument[];
  majorDiscoveries: readonly RoverDiscovery[];
  timeline: readonly RoverTimelineEvent[];
}

/**
 * Future-ready lunar mission slot item for the Lunar Exploration section.
 */
export interface LunarMissionPreviewItem {
  id: string;
  program: string;
  title: string;
  era: string;
  summary: string;
  upcomingBadge: string;
}

/**
 * Verified waypoint & discovery marker for the Interactive Mars Map.
 */
export interface MarsMapWaypoint {
  id: string;
  roverId: RoverId;
  name: string;
  sol: string;
  /** Planetocentric latitude in degrees (-90 south to +90 north). */
  lat: number;
  /** East longitude in degrees (0 to 360). */
  lonEast: number;
  /** Normalized regional traverse X coordinate (0..100) within the landing quadrangle. */
  regionalX: number;
  /** Normalized regional traverse Y coordinate (0..100) within the landing quadrangle. */
  regionalY: number;
  kind: 'landing' | 'discovery' | 'milestone';
  elevationMeters: string;
  summary: string;
  scientificFinding: string;
  sourceLabel: string;
  sourceUrl: string;
}

/**
 * Rover landing site & traverse metadata for the Interactive Mars Map.
 */
export interface MarsRoverMapProfile {
  roverId: RoverId;
  roverName: string;
  color: string;
  accentBg: string;
  craterName: string;
  landingSiteName: string;
  /** Planetocentric latitude (-90..+90). */
  lat: number;
  /** East longitude (0..360). */
  lonEast: number;
  coordinateText: string;
  elevationText: string;
  totalTraverseKm: number;
  regionalScaleLabel: string;
  sourceName: string;
  sourceUrl: string;
  waypoints: readonly MarsMapWaypoint[];
}

/**
 * Global Mars topographic feature reference point (IAU verified coordinates).
 */
export interface MarsGlobalLandmark {
  id: string;
  name: string;
  kind: string;
  lat: number;
  lonEast: number;
  detail: string;
}

/**
 * NASA Photo Archive entry (supports both verified offline fallback and live NASA Images API results).
 */
export interface NasaArchivePhoto {
  id: string;
  roverId: RoverId;
  roverName: string;
  title: string;
  solOrDate: string;
  earthDate: string;
  cameraCode: string;
  cameraFullName: string;
  missionLabel: string;
  mediaKind: 'Actual NASA Mission Photo' | 'Official NASA/JPL Mission Concept Illustration';
  mediaKindLabelTr: string;
  imageUrl: string;
  description: string;
  credit: string;
  nasaPiaCode: string;
  sourceUrl: string;
}

/**
 * Selectable 3D Rover anatomical subsystem / instrument part in the 3D Rover Lab.
 */
export interface Rover3DPart {
  id: string;
  code: string;
  name: string;
  category: 'mobility' | 'optics' | 'arm' | 'power' | 'comms' | 'science';
  categoryLabel: string;
  functionSummary: string;
  technicalDetails: string;
  specs: string;
  position: [number, number, number];
}

/**
 * Quantitative and qualitative comparison record for the Rover Comparison Lab.
 */
export interface RoverComparisonProfile {
  roverId: RoverId;
  name: string;
  generationLabel: string;
  color: string;
  massKg: number;
  massNote: string;
  dimensionsText: string;
  lengthM: number;
  widthM: number;
  heightM: number;
  maxSpeedCmPerSec: number;
  avgSpeedNote: string;
  energySource: string;
  powerCapacityWatts: number;
  powerCapacityNote: string;
  communicationSystem: string;
  processor: string;
  memorySpec: string;
  plannedSol: number;
  actualSol: number;
  actualDurationNote: string;
  isOngoing: boolean;
  distanceKm: number;
  distanceNote: string;
  scientificInstrumentCount: number;
  scientificInstrumentsSummary: string;
  keyDiscoveriesSummary: string;
  sourceUrl: string;
}

/**
 * Chronological step in the Interactive Historical Mission Simulation.
 */
export interface MissionSimulationStage {
  id: string;
  stageNumber: number;
  phaseCode: 'LAUNCH' | 'CRUISE' | 'EDL' | 'SURFACE_EARLY' | 'PRIME_DISCOVERY' | 'EXTENDED_OR_END';
  phaseLabel: string;
  date: string;
  sol: string;
  title: string;
  location: string;
  telemetryBadge: string;
  imageUrl: string;
  imageCaption: string;
  imageKindLabel: string;
  narrative: string;
  scientificExplanation: string;
  keyEvents: readonly string[];
  specialAlert?: {
    title: string;
    detail: string;
  };
  sourceLabel: string;
  sourceUrl: string;
}

/**
 * Identifier for each of the nine featured Lunar missions.
 */
export type LunarMissionId =
  | 'luna-9'
  | 'lunokhod-1'
  | 'apollo-15-lrv'
  | 'apollo-16-lrv'
  | 'apollo-17-lrv'
  | 'lunokhod-2'
  | 'change-3-yutu'
  | 'change-4-yutu-2'
  | 'chandrayaan-3-pragyan';

/**
 * Detailed Lunar surface mission record for the expanded Lunar Exploration section
 * and interactive 3D Moon surface globe.
 */
export interface LunarMissionItem {
  id: LunarMissionId;
  name: string;
  code: string;
  agency: string;
  country: string;
  missionType: string;
  eraBadge: string;
  launchDate: string;
  landingDate: string;
  missionEndDate: string;
  durationLabel: string;
  landingSite: string;
  landingCoordinates: string;
  /** Selenographic latitude in degrees (-90 south to +90 north). */
  lat: number;
  /** Selenographic east-positive or standard longitude (-180 to +180). */
  lon: number;
  hemisphereLabel: string;
  markerColor: string;
  statusLabel: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  mediaKindLabel: string;
  nasaSearchQuery: string;
  nasaArchiveId?: string;
  summary: string;
  missionObjective: string;
  missionOutcome: string;
  keyMetrics: readonly RoverMetric[];
  technicalSpecs: readonly RoverTechnicalSpec[];
  scientificInstruments: readonly RoverInstrument[];
  majorDiscoveries: readonly RoverDiscovery[];
  timeline: readonly RoverTimelineEvent[];
  sourceLabel: string;
  sourceUrl: string;
  secondarySourceLabel?: string;
  secondarySourceUrl?: string;
}

/**
 * Category identifiers for the academic/scientific Bibliography (Kaynakça) section.
 */
export type ReferenceCategoryId =
  | 'nasa-official'
  | 'nasa-media'
  | 'nasa-technical'
  | 'turkish-space'
  | 'wikipedia-tr'
  | 'models-open-data';

/**
 * Individual citation item in the Bibliography (Kaynakça) section.
 */
export interface ReferenceItem {
  id: string;
  categoryId: ReferenceCategoryId;
  title: string;
  organization: string;
  url: string;
  accessDate: string;
  usedInSections: readonly string[];
  description: string;
  badge: string;
}

/**
 * Category metadata for the Bibliography (Kaynakça) section.
 */
export interface ReferenceCategoryGroup {
  id: ReferenceCategoryId;
  code: string;
  title: string;
  subtitle: string;
}

/**
 * Option key for the 10-question interactive Spacecraft Quiz.
 */
export type QuizOptionKey = 'A' | 'B' | 'C' | 'D';

/**
 * Single multiple-choice option in a quiz question.
 */
export interface QuizOption {
  key: QuizOptionKey;
  text: string;
}

/**
 * Individual question record in the Spacecraft Quiz.
 */
export interface QuizQuestionItem {
  id: string;
  questionNumber: number;
  spacecraftGroupId: string;
  spacecraftTitle: string;
  prompt: string;
  options: readonly QuizOption[];
  correctOption: QuizOptionKey;
  explanation: string;
}

/**
 * Grouping of 2 questions under a featured spacecraft header.
 */
export interface QuizSpacecraftGroup {
  id: string;
  groupNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  questions: readonly QuizQuestionItem[];
}

/**
 * Identifiers for the four first-person educational explorer stories.
 */
export type ExplorerStoryId = 'sojourner' | 'ingenuity' | 'opportunity' | 'apollo-lrv';

export interface ExplorerStoryFact {
  label: string;
  value: string;
}

export interface ExplorerStoryChapter {
  id: string;
  chapterNumber: string;
  heading: string;
  paragraphs: readonly string[];
}

export interface ExplorerStoryTimelineEvent {
  date: string;
  title: string;
  detail: string;
}

export interface ExplorerStoryDiscovery {
  title: string;
  summary: string;
}

export interface ExplorerStoryGlossaryTerm {
  term: string;
  explanation: string;
}

export interface ExplorerStoryScene {
  id: string;
  sceneNumber: string;
  title: string;
  paragraphs: readonly string[];
  keyTakeaway: string;
  learnMoreTitle: string;
  learnMoreDetail: string;
  interactionPrompt: string;
}

export interface ExplorerStoryItem {
  id: ExplorerStoryId;
  orderNumber: string;
  spacecraftName: string;
  badge: string;
  badgeTitle: string;
  badgeSubtitle: string;
  badgeIcon: string;
  accentColor: string;
  title: string;
  subtitle: string;
  quote: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  mediaKindLabel: string;
  quickFacts: readonly ExplorerStoryFact[];
  chapters: readonly ExplorerStoryChapter[];
  scenes: readonly ExplorerStoryScene[];
  timeline: readonly ExplorerStoryTimelineEvent[];
  discoveries: readonly ExplorerStoryDiscovery[];
  glossary: readonly ExplorerStoryGlossaryTerm[];
  relatedRoverId?: RoverId;
  relatedLunarMissionId?: LunarMissionId;
  relatedVehicleLabel: string;
}
