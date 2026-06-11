export type Producer = {
  id: string;
  fullName: string;
  documentNumber: string;
  phone: string;
  department: string;
  municipality: string;
  village: string;
  notes: string;
};

export type Farm = {
  id: string;
  producerId: string;
  name: string;
  department: string;
  municipality: string;
  village: string;
  altitudeM: number;
  areaHa: number;
};

export type FarmProfile = {
  farmId: string;
  shortStory: string;
  productionGoal: string;
  waterSource: string;
  soilType: string;
  irrigationMethod: string;
  mainChallenge: string;
  fieldNotes: string;
  tags: string[];
  progressStages: FarmProgressStage[];
};

export type FarmProgressStage = {
  id: string;
  label: string;
  description: string;
  status: "DONE" | "ACTIVE" | "PENDING";
};

export type FarmMaturityStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "BLOCKED";

export type FarmMaturityStage = {
  key: string;
  level: number;
  name: string;
  objective: string;
  status: FarmMaturityStatus;
  score: number;
  completedCriteria: string[];
  pendingCriteria: string[];
  indicators: {
    label: string;
    value: string;
  }[];
};

export type FarmMaturity = {
  farmId: string;
  currentLevel: number;
  currentStageName: string;
  operationalStatus: string;
  overallScore: number;
  characterizationScore: number;
  trainingScore: number;
  implementationScore: number;
  monitoringScore: number;
  dataUsageScore: number;
  impactScore: number;
  nextRecommendedAction: string;
  institutionalPriority: "Baja" | "Media" | "Alta";
  stages: FarmMaturityStage[];
  transformationEvents: {
    id: string;
    date: string;
    title: string;
    detail: string;
  }[];
};

export type FarmWaterProfile = {
  farmId: string;
  waterEfficiencyScore: number;
  estimatedWeeklyUseM3: number;
  potentialWeeklySavingsM3: number;
  verifiedSavingsM3: number;
  irrigationStatus: "Deficit" | "Adecuado" | "Exceso";
  mainWaterRisk: string;
  waterRecommendation: string;
};

export type ProducerProfile = {
  producerId: string;
  story: string;
  productionExperience: string;
  mainCrops: string[];
  decisionStyle: string;
  techAccess: string;
  supportNeed: string;
  agroNodoGoal: string;
  confidenceLevel: number;
  tags: string[];
};

export type PlotProfile = {
  plotId: string;
  cropStage: string;
  daysSincePlanting: number;
  dominantRisk: string;
  currentDecision: string;
  recommendedAction: string;
  fieldObservation: string;
  waterNeed: "Baja" | "Media" | "Alta";
  monitoringProgress: number;
  tags: string[];
};

export type PlotStatus = "Estable" | "Atencion" | "Riesgo";

export type Plot = {
  id: string;
  farmId: string;
  name: string;
  crop: string;
  areaHa: number;
  plantedAt: string;
  status: PlotStatus;
  soilMoisture: number;
  ambientTemperature: number;
  ambientHumidity: number;
  activeAlerts: number;
};

export type SensorType =
  | "SOIL_MOISTURE"
  | "AMBIENT_TEMPERATURE"
  | "AMBIENT_HUMIDITY";

export type SensorStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export type Sensor = {
  id: string;
  plotId: string;
  name: string;
  type: SensorType;
  unit: string;
  status: SensorStatus;
  relativeLocation: string;
  lastValue: number;
  lastReadingAt: string;
};

export type ReadingOrigin = "SIMULATED" | "DEVICE" | "MANUAL";

export type Reading = {
  id: string;
  sensorId: string;
  value: number;
  unit: string;
  origin: ReadingOrigin;
  takenAt: string;
};

export type AlertType =
  | "LOW_SOIL_MOISTURE"
  | "FROST_RISK"
  | "HIGH_AMBIENT_HUMIDITY";

export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type AlertStatus = "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";

export type Alert = {
  id: string;
  plotId: string;
  sensorId: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  message: string;
  recommendation: string;
  detectedValue: number;
  threshold: number;
  unit: string;
  createdAt: string;
};

export type AlertRuleOperator = "LESS_THAN" | "GREATER_THAN";

export type AlertRule = {
  id: string;
  name: string;
  description: string;
  sensorType: SensorType;
  enabled: boolean;
  operator: AlertRuleOperator;
  warningThreshold: number;
  criticalThreshold: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  scope: "GLOBAL" | "PLOT";
  plotId?: string;
};

export type FarmHealth = {
  farmId: string;
  farmName: string;
  producerName: string;
  municipality: string;
  plots: number;
  sensors: number;
  activeAlerts: number;
  criticalAlerts: number;
  status: PlotStatus;
};

export type PilotReport = {
  generatedAt: string;
  title: string;
  scope: string;
  summary: ReturnType<typeof getDashboardSummary>;
  farmHealth: FarmHealth[];
  priorityAlerts: Alert[];
  nextActions: ReturnType<typeof getNextActions>;
};

export const producers: Producer[] = [
  {
    id: "producer-brayan",
    fullName: "Brayan Cristancho",
    documentNumber: "Demo-001",
    phone: "+57 300 000 0000",
    department: "Boyaca",
    municipality: "Sogamoso",
    village: "Morca",
    notes: "Productor demo para validar AgroNodo MVP v1.",
  },
  {
    id: "producer-maria",
    fullName: "Maria Rodriguez",
    documentNumber: "Demo-002",
    phone: "+57 311 000 0000",
    department: "Boyaca",
    municipality: "Tibasosa",
    village: "Patrocinio",
    notes: "Caso demo para asociacion campesina.",
  },
];

export const farms: Farm[] = [
  {
    id: "farm-boyaca-demo",
    producerId: "producer-brayan",
    name: "Finca Demo Boyaca",
    department: "Boyaca",
    municipality: "Sogamoso",
    village: "Morca",
    altitudeM: 2569,
    areaHa: 3.5,
  },
  {
    id: "farm-la-esperanza",
    producerId: "producer-maria",
    name: "La Esperanza",
    department: "Boyaca",
    municipality: "Tibasosa",
    village: "Patrocinio",
    altitudeM: 2520,
    areaHa: 2.2,
  },
];

export const farmProfiles: FarmProfile[] = [
  {
    farmId: "farm-boyaca-demo",
    shortStory:
      "Finca familiar ubicada en zona alta de Sogamoso, con produccion de papa y cebolla en lotes pequenos.",
    productionGoal:
      "Reducir decisiones reactivas de riego y anticipar noches frias durante etapas sensibles del cultivo.",
    waterSource: "Reservorio pequeno y riego por turnos",
    soilType: "Franco arenoso de ladera",
    irrigationMethod: "Riego manual por surcos",
    mainChallenge: "Variacion fuerte de humedad entre sectores del lote",
    fieldNotes:
      "El productor suele decidir el riego por observacion visual del suelo. AgroNodo busca convertir esa experiencia en datos comparables.",
    tags: ["Papa", "Cebolla", "Riesgo de helada", "Riego manual"],
    progressStages: [
      {
        id: "stage-profile",
        label: "Caracterizacion",
        description: "Datos base de finca, agua, suelo y objetivo productivo.",
        status: "DONE",
      },
      {
        id: "stage-monitoring",
        label: "Monitoreo virtual",
        description: "Sensores simulados activos en los lotes principales.",
        status: "ACTIVE",
      },
      {
        id: "stage-decisions",
        label: "Decisiones guiadas",
        description: "Alertas y recomendaciones convertidas en acciones de campo.",
        status: "PENDING",
      },
    ],
  },
  {
    farmId: "farm-la-esperanza",
    shortStory:
      "Unidad productiva de Tibasosa con cultivos de arveja en zona de alta humedad ambiental.",
    productionGoal:
      "Monitorear temperatura y humedad ambiental para prevenir perdidas por heladas y enfermedades.",
    waterSource: "Quebrada cercana y almacenamiento temporal",
    soilType: "Franco arcilloso",
    irrigationMethod: "Riego localizado informal",
    mainChallenge: "Noches frias combinadas con humedad ambiental alta",
    fieldNotes:
      "La finca representa un escenario ideal para validar alertas tempranas antes de instalar sensores reales.",
    tags: ["Arveja", "Humedad ambiental", "Heladas", "Piloto institucional"],
    progressStages: [
      {
        id: "stage-profile",
        label: "Caracterizacion",
        description: "Perfil productivo levantado con enfoque de piloto.",
        status: "DONE",
      },
      {
        id: "stage-monitoring",
        label: "Monitoreo virtual",
        description: "Variables climaticas simuladas con foco en heladas.",
        status: "ACTIVE",
      },
      {
        id: "stage-decisions",
        label: "Decisiones guiadas",
        description: "Validar protocolo de respuesta con productor o tecnico.",
        status: "PENDING",
      },
    ],
  },
];

export const farmMaturities: FarmMaturity[] = [
  {
    farmId: "farm-boyaca-demo",
    currentLevel: 4,
    currentStageName: "Monitoreo hidrico",
    operationalStatus: "La finca ya genera senales utiles para decidir riego.",
    overallScore: 63,
    characterizationScore: 88,
    trainingScore: 52,
    implementationScore: 66,
    monitoringScore: 74,
    dataUsageScore: 39,
    impactScore: 18,
    nextRecommendedAction:
      "Registrar si se aplico riego por humedad baja para medir ahorro potencial.",
    institutionalPriority: "Alta",
    stages: [
      maturityStage(0, "registered", "Registrada", "COMPLETED", 100, [
        "Productor vinculado",
        "Ubicacion registrada",
        "Area estimada definida",
      ], [], "Identidad", "100%"),
      maturityStage(1, "water-characterized", "Caracterizacion hidrica", "COMPLETED", 88, [
        "Fuente de agua registrada",
        "Metodo de riego definido",
        "Riesgos de humedad priorizados",
      ], ["Georreferenciar puntos criticos de agua"], "Agua", "88%"),
      maturityStage(2, "water-diagnosis", "Diagnostico de uso del agua", "COMPLETED", 66, [
        "Lotes definidos",
        "Humedad de suelo priorizada",
        "Reglas de deficit configuradas",
      ], ["Estimar consumo semanal por lote"], "Diagnostico", "66%"),
      maturityStage(3, "water-plan", "Plan hidrico", "COMPLETED", 70, [
        "Sensores virtuales asignados",
        "Responsable de seguimiento definido",
        "Recomendaciones iniciales activas",
      ], ["Preparar medicion fisica de caudal"], "Plan", "70%"),
      maturityStage(4, "water-monitoring", "Monitoreo hidrico", "IN_PROGRESS", 74, [
        "Sensores virtuales activos",
        "Historico de humedad disponible",
        "Alertas hidricas generadas",
      ], ["Medir continuidad semanal de datos"], "Monitoreo", "74%"),
      maturityStage(5, "irrigation-optimization", "Optimizacion del riego", "PENDING", 39, [
        "Recomendaciones visibles para el productor",
      ], ["Registrar acciones de riego", "Medir respuesta a alertas"], "Riego", "39%"),
      maturityStage(6, "water-saving", "Ahorro hidrico estimado", "PENDING", 18, [
        "Linea base inicial estimada",
      ], ["Registrar ahorro de agua", "Comparar riegos evitados"], "Ahorro", "18%"),
      maturityStage(7, "verified-sustainability", "Sostenibilidad hidrica verificada", "PENDING", 0, [
      ], ["Validar ahorro con evidencia externa", "Generar reporte institucional"], "Evidencia", "0%"),
    ],
    transformationEvents: [
      {
        id: "event-boyaca-1",
        date: "2026-06-01",
        title: "Finca identificada",
        detail: "Se registro productor, ubicacion y area productiva.",
      },
      {
        id: "event-boyaca-2",
        date: "2026-06-04",
        title: "Caracterizacion inicial",
        detail: "Se definieron fuente de agua, suelo, riego y reto principal.",
      },
      {
        id: "event-boyaca-3",
        date: "2026-06-09",
        title: "Monitoreo virtual activo",
        detail: "Sensores simulados generaron senales hidricas y alertas iniciales.",
      },
    ],
  },
  {
    farmId: "farm-la-esperanza",
    currentLevel: 4,
    currentStageName: "Monitoreo hidrico",
    operationalStatus: "La finca opera con foco en humedad ambiental y riesgo hidrico.",
    overallScore: 68,
    characterizationScore: 91,
    trainingScore: 61,
    implementationScore: 70,
    monitoringScore: 78,
    dataUsageScore: 45,
    impactScore: 22,
    nextRecommendedAction:
      "Registrar si la recomendacion hidrica fue aplicada o descartada por clima.",
    institutionalPriority: "Alta",
    stages: [
      maturityStage(0, "registered", "Registrada", "COMPLETED", 100, [
        "Productora vinculada",
        "Municipio y vereda registrados",
        "Area estimada definida",
      ], [], "Identidad", "100%"),
      maturityStage(1, "water-characterized", "Caracterizacion hidrica", "COMPLETED", 91, [
        "Riesgo de helada priorizado",
        "Humedad ambiental documentada",
        "Fuente de agua documentada",
      ], ["Levantar historial de deficit hidrico"], "Agua", "91%"),
      maturityStage(2, "water-diagnosis", "Diagnostico de uso del agua", "COMPLETED", 70, [
        "Temperatura priorizada",
        "Humedad ambiental priorizada",
        "Reglas de humedad configuradas",
      ], ["Estimar consumo por ciclo de cultivo"], "Diagnostico", "70%"),
      maturityStage(3, "water-plan", "Plan hidrico", "COMPLETED", 76, [
        "Sensores virtuales asignados",
        "Reporte demo explicado",
        "Responsable de seguimiento definido",
      ], ["Simular decision de riego"], "Plan", "76%"),
      maturityStage(4, "water-monitoring", "Monitoreo hidrico", "IN_PROGRESS", 78, [
        "Monitoreo virtual de temperatura",
        "Alertas criticas disponibles",
        "Historico de 7 dias",
      ], ["Medir continuidad mensual"], "Monitoreo", "78%"),
      maturityStage(5, "irrigation-optimization", "Optimizacion del riego", "PENDING", 45, [
        "Alerta critica priorizada",
      ], ["Registrar decision de riego", "Validar recomendacion con tecnico"], "Riego", "45%"),
      maturityStage(6, "water-saving", "Ahorro hidrico estimado", "PENDING", 22, [
        "Escenario de impacto definido",
      ], ["Comparar riegos aplicados", "Registrar evidencia tecnica"], "Ahorro", "22%"),
      maturityStage(7, "verified-sustainability", "Sostenibilidad hidrica verificada", "PENDING", 0, [
      ], ["Validar ahorro con evidencia externa", "Generar reporte institucional"], "Evidencia", "0%"),
    ],
    transformationEvents: [
      {
        id: "event-esperanza-1",
        date: "2026-06-02",
        title: "Finca vinculada a piloto",
        detail: "Se registro como caso de validacion con enfoque asociativo.",
      },
      {
        id: "event-esperanza-2",
        date: "2026-06-06",
        title: "Riesgo climatico priorizado",
        detail: "Helada y humedad ambiental quedaron como variables criticas.",
      },
      {
        id: "event-esperanza-3",
        date: "2026-06-09",
        title: "Alerta critica simulada",
        detail: "El lote de arveja genero riesgo de helada para decision guiada.",
      },
    ],
  },
];

export const farmWaterProfiles: FarmWaterProfile[] = [
  {
    farmId: "farm-boyaca-demo",
    waterEfficiencyScore: 63,
    estimatedWeeklyUseM3: 42,
    potentialWeeklySavingsM3: 8,
    verifiedSavingsM3: 0,
    irrigationStatus: "Deficit",
    mainWaterRisk: "Humedad baja en papa criolla",
    waterRecommendation:
      "Validar humedad manual y aplicar riego corto solo en sectores bajo 25%.",
  },
  {
    farmId: "farm-la-esperanza",
    waterEfficiencyScore: 68,
    estimatedWeeklyUseM3: 26,
    potentialWeeklySavingsM3: 5,
    verifiedSavingsM3: 0,
    irrigationStatus: "Adecuado",
    mainWaterRisk: "Humedad ambiental alta con noches frias",
    waterRecommendation:
      "Evitar riego nocturno y priorizar seguimiento de humedad antes de aplicar agua.",
  },
];

export const producerProfiles: ProducerProfile[] = [
  {
    producerId: "producer-brayan",
    story:
      "Productor demo que representa a pequenos agricultores de zona alta con decisiones basadas en experiencia, observacion del suelo y clima local.",
    productionExperience: "5 anos en cultivos de ciclo corto",
    mainCrops: ["Papa", "Cebolla larga"],
    decisionStyle:
      "Decide riego y manejo por observacion directa, color del suelo y experiencia familiar.",
    techAccess: "Celular Android, WhatsApp y conectividad intermitente",
    supportNeed:
      "Alertas simples, lectura rapida de humedad y acompanamiento para interpretar datos.",
    agroNodoGoal:
      "Convertir la experiencia del productor en decisiones comparables y registradas.",
    confidenceLevel: 68,
    tags: ["Productor pequeno", "Zona alta", "Riego manual", "Piloto directo"],
  },
  {
    producerId: "producer-maria",
    story:
      "Productora demo orientada a validar AgroNodo como herramienta para asociaciones campesinas y acompanamiento tecnico.",
    productionExperience: "8 anos en horticultura y arveja",
    mainCrops: ["Arveja", "Hortalizas"],
    decisionStyle:
      "Combina experiencia propia con recomendaciones de vecinos y tecnicos locales.",
    techAccess: "Celular compartido, WhatsApp y apoyo familiar para herramientas digitales",
    supportNeed:
      "Lenguaje sencillo, priorizacion de riesgos y reportes faciles de compartir.",
    agroNodoGoal:
      "Ayudar a anticipar heladas y humedad alta con evidencia clara para la familia y tecnicos.",
    confidenceLevel: 74,
    tags: ["Asociacion", "Heladas", "Acompanamiento tecnico", "Reporte comunitario"],
  },
];

export const plots: Plot[] = [
  {
    id: "plot-papa-criolla",
    farmId: "farm-boyaca-demo",
    name: "Lote Papa Criolla",
    crop: "Papa",
    areaHa: 1.2,
    plantedAt: "2026-04-15",
    status: "Atencion",
    soilMoisture: 22,
    ambientTemperature: 6,
    ambientHumidity: 78,
    activeAlerts: 1,
  },
  {
    id: "plot-cebolla-larga",
    farmId: "farm-boyaca-demo",
    name: "Lote Cebolla Larga",
    crop: "Cebolla",
    areaHa: 0.9,
    plantedAt: "2026-05-02",
    status: "Estable",
    soilMoisture: 39,
    ambientTemperature: 13,
    ambientHumidity: 72,
    activeAlerts: 0,
  },
  {
    id: "plot-arveja",
    farmId: "farm-la-esperanza",
    name: "Lote Arveja",
    crop: "Arveja",
    areaHa: 0.8,
    plantedAt: "2026-03-28",
    status: "Riesgo",
    soilMoisture: 28,
    ambientTemperature: 3,
    ambientHumidity: 92,
    activeAlerts: 2,
  },
];

export const plotProfiles: PlotProfile[] = [
  {
    plotId: "plot-papa-criolla",
    cropStage: "Desarrollo vegetativo",
    daysSincePlanting: 56,
    dominantRisk: "Deficit de humedad en suelo",
    currentDecision: "Definir si se activa riego antes de la siguiente noche fria.",
    recommendedAction:
      "Validar humedad manual en dos puntos y priorizar riego corto si el suelo sigue bajo 25%.",
    fieldObservation:
      "El centro del lote pierde humedad mas rapido que el borde superior.",
    waterNeed: "Alta",
    monitoringProgress: 72,
    tags: ["Papa", "Riego prioritario", "Seguimiento diario"],
  },
  {
    plotId: "plot-cebolla-larga",
    cropStage: "Crecimiento activo",
    daysSincePlanting: 39,
    dominantRisk: "Variacion moderada de humedad",
    currentDecision: "Mantener riego programado y observar zonas con menor cobertura.",
    recommendedAction:
      "Conservar frecuencia de riego y revisar el sensor de humedad ambiente en mantenimiento.",
    fieldObservation:
      "El lote esta estable, pero requiere continuidad de lecturas para confirmar tendencia.",
    waterNeed: "Media",
    monitoringProgress: 64,
    tags: ["Cebolla", "Estable", "Sensor en revision"],
  },
  {
    plotId: "plot-arveja",
    cropStage: "Floracion",
    daysSincePlanting: 74,
    dominantRisk: "Helada y humedad ambiental alta",
    currentDecision: "Activar revision nocturna por riesgo climatico.",
    recommendedAction:
      "Preparar protocolo de helada y revisar presencia de enfermedades asociadas a humedad.",
    fieldObservation:
      "La parte baja del lote concentra frio y humedad durante la madrugada.",
    waterNeed: "Baja",
    monitoringProgress: 81,
    tags: ["Arveja", "Floracion", "Helada", "Humedad alta"],
  },
];

export const sensors: Sensor[] = [
  {
    id: "sensor-papa-humedad-suelo",
    plotId: "plot-papa-criolla",
    name: "Sensor virtual humedad suelo 01",
    type: "SOIL_MOISTURE",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Centro del lote",
    lastValue: 22,
    lastReadingAt: "2026-06-09T22:30:00-05:00",
  },
  {
    id: "sensor-papa-temperatura",
    plotId: "plot-papa-criolla",
    name: "Sensor virtual temperatura ambiente 01",
    type: "AMBIENT_TEMPERATURE",
    unit: "C",
    status: "ACTIVE",
    relativeLocation: "Borde superior del lote",
    lastValue: 6,
    lastReadingAt: "2026-06-09T22:30:00-05:00",
  },
  {
    id: "sensor-cebolla-humedad-suelo",
    plotId: "plot-cebolla-larga",
    name: "Sensor virtual humedad suelo 02",
    type: "SOIL_MOISTURE",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Zona de riego principal",
    lastValue: 39,
    lastReadingAt: "2026-06-09T22:35:00-05:00",
  },
  {
    id: "sensor-cebolla-humedad-ambiente",
    plotId: "plot-cebolla-larga",
    name: "Sensor virtual humedad ambiente 01",
    type: "AMBIENT_HUMIDITY",
    unit: "%",
    status: "MAINTENANCE",
    relativeLocation: "Entrada del lote",
    lastValue: 72,
    lastReadingAt: "2026-06-09T20:10:00-05:00",
  },
  {
    id: "sensor-arveja-temperatura",
    plotId: "plot-arveja",
    name: "Sensor virtual temperatura ambiente 02",
    type: "AMBIENT_TEMPERATURE",
    unit: "C",
    status: "ACTIVE",
    relativeLocation: "Parte baja del lote",
    lastValue: 3,
    lastReadingAt: "2026-06-09T22:40:00-05:00",
  },
  {
    id: "sensor-arveja-humedad-ambiente",
    plotId: "plot-arveja",
    name: "Sensor virtual humedad ambiente 02",
    type: "AMBIENT_HUMIDITY",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Parte baja del lote",
    lastValue: 92,
    lastReadingAt: "2026-06-09T22:40:00-05:00",
  },
];

export const alertRulesConfig: AlertRule[] = [
  {
    id: "rule-low-soil-moisture",
    name: "Humedad del suelo baja",
    description: "Detecta deficit de agua disponible en el lote monitoreado.",
    sensorType: "SOIL_MOISTURE",
    enabled: true,
    operator: "LESS_THAN",
    warningThreshold: 30,
    criticalThreshold: 20,
    min: 0,
    max: 80,
    step: 1,
    unit: "%",
    scope: "GLOBAL",
  },
  {
    id: "rule-frost-risk",
    name: "Riesgo de helada",
    description: "Detecta temperaturas bajas que pueden afectar cultivos sensibles.",
    sensorType: "AMBIENT_TEMPERATURE",
    enabled: true,
    operator: "LESS_THAN",
    warningThreshold: 6,
    criticalThreshold: 3,
    min: -5,
    max: 20,
    step: 1,
    unit: "C",
    scope: "GLOBAL",
  },
  {
    id: "rule-high-ambient-humidity",
    name: "Humedad ambiental alta",
    description: "Detecta condiciones que pueden favorecer enfermedades.",
    sensorType: "AMBIENT_HUMIDITY",
    enabled: true,
    operator: "GREATER_THAN",
    warningThreshold: 85,
    criticalThreshold: 95,
    min: 40,
    max: 100,
    step: 1,
    unit: "%",
    scope: "GLOBAL",
  },
];

const readingSeries: Record<string, number[]> = {
  "sensor-papa-humedad-suelo": [36, 34, 31, 29, 27, 24, 22],
  "sensor-papa-temperatura": [12, 11, 10, 9, 8, 7, 6],
  "sensor-cebolla-humedad-suelo": [42, 41, 40, 40, 39, 39, 39],
  "sensor-cebolla-humedad-ambiente": [64, 66, 67, 70, 71, 72, 72],
  "sensor-arveja-temperatura": [9, 8, 7, 6, 5, 4, 3],
  "sensor-arveja-humedad-ambiente": [78, 81, 84, 87, 89, 91, 92],
};

const readingDates = [
  "2026-06-03T06:00:00-05:00",
  "2026-06-04T06:00:00-05:00",
  "2026-06-05T06:00:00-05:00",
  "2026-06-06T06:00:00-05:00",
  "2026-06-07T06:00:00-05:00",
  "2026-06-08T06:00:00-05:00",
  "2026-06-09T06:00:00-05:00",
];

export const readings: Reading[] = sensors.flatMap((sensor) => {
  const values = readingSeries[sensor.id] ?? [];

  return values.map((value, index) => ({
    id: `reading-${sensor.id}-${index + 1}`,
    sensorId: sensor.id,
    value,
    unit: sensor.unit,
    origin: "SIMULATED",
    takenAt: readingDates[index],
  }));
});

const alertRules: Record<
  SensorType,
  | {
      type: AlertType;
      threshold: number;
      severity: AlertSeverity;
      shouldAlert: (value: number, threshold: number) => boolean;
      message: (value: number, unit: string) => string;
      recommendation: string;
    }
  | undefined
> = {
  SOIL_MOISTURE: {
    type: "LOW_SOIL_MOISTURE",
    threshold: 25,
    severity: "HIGH",
    shouldAlert: (value, threshold) => value < threshold,
    message: (value, unit) => `Humedad del suelo baja: ${value} ${unit}.`,
    recommendation:
      "Revisar riego del lote y validar humedad manual antes de aplicar agua.",
  },
  AMBIENT_TEMPERATURE: {
    type: "FROST_RISK",
    threshold: 4,
    severity: "CRITICAL",
    shouldAlert: (value, threshold) => value < threshold,
    message: (value, unit) => `Riesgo de helada: temperatura en ${value} ${unit}.`,
    recommendation:
      "Activar protocolo preventivo de helada y revisar cultivos sensibles.",
  },
  AMBIENT_HUMIDITY: {
    type: "HIGH_AMBIENT_HUMIDITY",
    threshold: 90,
    severity: "MEDIUM",
    shouldAlert: (value, threshold) => value > threshold,
    message: (value, unit) => `Humedad ambiental alta: ${value} ${unit}.`,
    recommendation:
      "Revisar ventilacion, presencia de enfermedades y condiciones del cultivo.",
  },
};

export const alerts: Alert[] = sensors.flatMap((sensor) => {
  const rule = alertRules[sensor.type];
  const latestReading = readings
    .filter((reading) => reading.sensorId === sensor.id)
    .at(-1);

  if (!rule || !latestReading) {
    return [];
  }

  if (!rule.shouldAlert(latestReading.value, rule.threshold)) {
    return [];
  }

  return [
    {
      id: `alert-${sensor.id}`,
      plotId: sensor.plotId,
      sensorId: sensor.id,
      type: rule.type,
      severity: rule.severity,
      status: "ACTIVE",
      message: rule.message(latestReading.value, latestReading.unit),
      recommendation: rule.recommendation,
      detectedValue: latestReading.value,
      threshold: rule.threshold,
      unit: latestReading.unit,
      createdAt: latestReading.takenAt,
    },
  ];
});

function maturityStage(
  level: number,
  key: string,
  name: string,
  status: FarmMaturityStatus,
  score: number,
  completedCriteria: string[],
  pendingCriteria: string[],
  indicatorLabel: string,
  indicatorValue: string,
): FarmMaturityStage {
  const objectives = [
    "Registrar la finca como unidad productiva para seguimiento hidrico.",
    "Comprender fuentes de agua, riego, suelo y riesgos hidricos.",
    "Diagnosticar como se usa el agua y donde puede haber perdida o deficit.",
    "Definir un plan hidrico con variables, reglas y responsables.",
    "Operar con lecturas, alertas e historicos enfocados en agua.",
    "Usar recomendaciones para ajustar riego y registrar decisiones de campo.",
    "Estimar o comprobar ahorro hidrico con evidencia comparable.",
    "Consolidar evidencia para sostenibilidad hidrica verificable.",
  ];

  return {
    key,
    level,
    name,
    objective: objectives[level] ?? "Avanzar la adopcion tecnologica.",
    status,
    score,
    completedCriteria,
    pendingCriteria,
    indicators: [
      { label: indicatorLabel, value: indicatorValue },
      { label: "Avance", value: `${score}%` },
    ],
  };
}

export function getFarmProducer(farm: Farm) {
  return producers.find((producer) => producer.id === farm.producerId);
}

export function getFarmProfile(farmId: string) {
  return farmProfiles.find((profile) => profile.farmId === farmId);
}

export function getFarmMaturity(farmId: string) {
  return farmMaturities.find((maturity) => maturity.farmId === farmId);
}

export function getFarmWaterProfile(farmId: string) {
  return farmWaterProfiles.find((profile) => profile.farmId === farmId);
}

export function getProducerProfile(producerId: string) {
  return producerProfiles.find((profile) => profile.producerId === producerId);
}

export function getFarmPlots(farmId: string) {
  return plots.filter((plot) => plot.farmId === farmId);
}

export function getPlotFarm(plot: Plot) {
  return farms.find((farm) => farm.id === plot.farmId);
}

export function getPlotProfile(plotId: string) {
  return plotProfiles.find((profile) => profile.plotId === plotId);
}

export function getPlotSensors(plotId: string) {
  return sensors.filter((sensor) => sensor.plotId === plotId);
}

export function getSensorPlot(sensor: Sensor) {
  return plots.find((plot) => plot.id === sensor.plotId);
}

export function getSensor(sensorId: string) {
  return sensors.find((sensor) => sensor.id === sensorId);
}

export function getSensorReadings(sensorId: string) {
  return readings.filter((reading) => reading.sensorId === sensorId);
}

export function getLatestSensorReading(sensorId: string) {
  return getSensorReadings(sensorId).at(-1);
}

export function getPlotReadings(plotId: string) {
  const plotSensorIds = getPlotSensors(plotId).map((sensor) => sensor.id);

  return readings.filter((reading) => plotSensorIds.includes(reading.sensorId));
}

export function getSensorTrend(sensorId: string) {
  const sensorReadings = getSensorReadings(sensorId);
  const first = sensorReadings.at(0);
  const last = sensorReadings.at(-1);

  if (!first || !last) {
    return {
      delta: 0,
      direction: "stable" as const,
    };
  }

  const delta = Number((last.value - first.value).toFixed(2));

  return {
    delta,
    direction:
      delta > 0 ? ("up" as const) : delta < 0 ? ("down" as const) : ("stable" as const),
  };
}

export function getPlotAlerts(plotId: string) {
  return alerts.filter((alert) => alert.plotId === plotId);
}

export function getActiveAlerts() {
  return alerts.filter((alert) => alert.status === "ACTIVE");
}

const alertPriority: Record<AlertSeverity, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export function getPriorityAlerts(limit = 3) {
  return [...getActiveAlerts()]
    .sort((a, b) => {
      const severityDiff = alertPriority[b.severity] - alertPriority[a.severity];

      if (severityDiff !== 0) {
        return severityDiff;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, limit);
}

export function getFarmHealth(): FarmHealth[] {
  return farms.map((farm) => {
    const producer = getFarmProducer(farm);
    const farmPlots = getFarmPlots(farm.id);
    const plotIds = farmPlots.map((plot) => plot.id);
    const farmSensors = sensors.filter((sensor) => plotIds.includes(sensor.plotId));
    const farmAlerts = alerts.filter((alert) => plotIds.includes(alert.plotId));
    const criticalAlerts = farmAlerts.filter(
      (alert) => alert.severity === "CRITICAL",
    );

    return {
      farmId: farm.id,
      farmName: farm.name,
      producerName: producer?.fullName ?? "Sin productor",
      municipality: farm.municipality,
      plots: farmPlots.length,
      sensors: farmSensors.length,
      activeAlerts: farmAlerts.length,
      criticalAlerts: criticalAlerts.length,
      status:
        criticalAlerts.length > 0
          ? "Riesgo"
          : farmAlerts.length > 0
            ? "Atencion"
            : "Estable",
    };
  });
}

export function getNextActions() {
  return getPriorityAlerts(3).map((alert) => {
    const sensor = getSensor(alert.sensorId);
    const plot = sensor ? getSensorPlot(sensor) : undefined;
    const farm = plot ? getPlotFarm(plot) : undefined;

    return {
      id: `action-${alert.id}`,
      title: plot ? `Revisar ${plot.name}` : "Revisar lote",
      context: farm ? `${farm.name}, ${farm.municipality}` : "Sin finca asignada",
      reason: alert.message,
      recommendation: alert.recommendation,
      severity: alert.severity,
    };
  });
}

export function getDashboardSummary() {
  const activeAlerts = getActiveAlerts();

  return {
    producers: producers.length,
    farms: farms.length,
    plots: plots.length,
    sensors: sensors.length,
    activeSensors: sensors.filter((sensor) => sensor.status === "ACTIVE").length,
    readings: readings.length,
    activeAlerts: activeAlerts.length,
    criticalAlerts: activeAlerts.filter((alert) => alert.severity === "CRITICAL")
      .length,
    riskyPlots: plots.filter((plot) => plot.status !== "Estable").length,
  };
}

export function getPilotReport(): PilotReport {
  return {
    generatedAt: "2026-06-10T08:00:00-05:00",
    title: "Reporte AgroNodo MVP v1",
    scope: "Demo de monitoreo agricola con datos simulados en Boyaca",
    summary: getDashboardSummary(),
    farmHealth: getFarmHealth(),
    priorityAlerts: getPriorityAlerts(5),
    nextActions: getNextActions(),
  };
}
