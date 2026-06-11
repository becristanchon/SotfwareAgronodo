import {
  getPlotAlerts,
  getPlotSensors,
  getSensorReadings,
  type Alert,
  type Plot,
  type Sensor,
} from "@/lib/demo-data";

export type CropLiveStatus =
  | "OPTIMAL"
  | "LOW_MOISTURE"
  | "WATER_STRESS"
  | "EXCESS_WATER"
  | "FROST_RISK"
  | "NO_DATA";

export type CropLiveSeverity = "INFO" | "WATCH" | "WARNING" | "CRITICAL" | "UNKNOWN";

export type CropLiveState = {
  plotId: string;
  status: CropLiveStatus;
  severity: CropLiveSeverity;
  title: string;
  message: string;
  recommendation: string;
  confidence: number;
  primaryVariable: string;
  primaryValue: string;
  lastReadingAt: string | null;
  trend: "Subiendo" | "Bajando" | "Estable" | "Sin tendencia";
  activeAlerts: Alert[];
  technicalSummary: string;
};

const staleReadingMs = 1000 * 60 * 60 * 24 * 3;

export function getCropLiveState(plot: Plot): CropLiveState {
  const sensors = getPlotSensors(plot.id);
  const activeAlerts = getPlotAlerts(plot.id).filter(
    (alert) => alert.status === "ACTIVE",
  );
  const soilMoistureSensor = sensors.find((sensor) => sensor.type === "SOIL_MOISTURE");
  const temperatureSensor = sensors.find(
    (sensor) => sensor.type === "AMBIENT_TEMPERATURE",
  );
  const humiditySensor = sensors.find(
    (sensor) => sensor.type === "AMBIENT_HUMIDITY",
  );
  const lastReadingAt = getLastReadingDate(sensors);

  if (!lastReadingAt || Date.now() - lastReadingAt.getTime() > staleReadingMs) {
    return buildState({
      plot,
      status: "NO_DATA",
      severity: "UNKNOWN",
      title: "Sin datos recientes",
      message: "No hay datos recientes para evaluar el cultivo.",
      recommendation: "Registrar una medicion o revisar el dispositivo del lote.",
      confidence: 20,
      primaryVariable: "Datos",
      primaryValue: "Pendiente",
      lastReadingAt,
      trend: "Sin tendencia",
      activeAlerts,
      technicalSummary: "No se encontraron lecturas recientes para el lote.",
    });
  }

  const frostAlert = activeAlerts.find((alert) => alert.type === "FROST_RISK");
  const lowMoistureAlert = activeAlerts.find(
    (alert) => alert.type === "LOW_SOIL_MOISTURE",
  );
  const soilMoisture = soilMoistureSensor?.lastValue ?? plot.soilMoisture;
  const temperature = temperatureSensor?.lastValue ?? plot.ambientTemperature;
  const ambientHumidity = humiditySensor?.lastValue ?? plot.ambientHumidity;
  const moistureTrend = soilMoistureSensor
    ? getSensorTrendLabel(soilMoistureSensor)
    : "Sin tendencia";

  if (frostAlert || temperature <= 4) {
    return buildState({
      plot,
      status: "FROST_RISK",
      severity: "CRITICAL",
      title: "Condicion fria detectada",
      message: "Hay riesgo de frio fuerte para el cultivo.",
      recommendation:
        frostAlert?.recommendation ??
        "Revisar protocolo local de proteccion contra helada.",
      confidence: 82,
      primaryVariable: "Temperatura",
      primaryValue: `${temperature} C`,
      lastReadingAt,
      trend: "Bajando",
      activeAlerts,
      technicalSummary: `Temperatura estimada: ${temperature} C. Humedad ambiente: ${ambientHumidity}%.`,
    });
  }

  if (lowMoistureAlert || soilMoisture <= 25) {
    return buildState({
      plot,
      status: "WATER_STRESS",
      severity: "CRITICAL",
      title: "Se recomienda revisar riego",
      message: "El cultivo muestra senales de estres hidrico.",
      recommendation:
        lowMoistureAlert?.recommendation ??
        "Validar humedad manual y aplicar riego controlado si el suelo sigue seco.",
      confidence: 86,
      primaryVariable: "Humedad suelo",
      primaryValue: `${soilMoisture}%`,
      lastReadingAt,
      trend: moistureTrend,
      activeAlerts,
      technicalSummary: `Humedad del suelo en ${soilMoisture}%. Umbral critico estimado: 25%.`,
    });
  }

  if (soilMoisture < 34 || moistureTrend === "Bajando") {
    return buildState({
      plot,
      status: "LOW_MOISTURE",
      severity: "WARNING",
      title: "El cultivo empieza a necesitar agua",
      message: "La humedad esta bajando y conviene revisar el lote.",
      recommendation:
        "Revisar dos puntos del suelo y preparar riego corto si la condicion se mantiene.",
      confidence: 74,
      primaryVariable: "Humedad suelo",
      primaryValue: `${soilMoisture}%`,
      lastReadingAt,
      trend: moistureTrend,
      activeAlerts,
      technicalSummary: `Humedad del suelo en ${soilMoisture}%. Tendencia: ${moistureTrend}.`,
    });
  }

  if (soilMoisture >= 58 || (soilMoisture >= 50 && ambientHumidity >= 88)) {
    return buildState({
      plot,
      status: "EXCESS_WATER",
      severity: "WATCH",
      title: "Posible exceso de agua",
      message: "El lote puede estar acumulando mas humedad de la necesaria.",
      recommendation: "Evitar riego adicional y revisar drenaje del suelo.",
      confidence: 68,
      primaryVariable: "Humedad suelo",
      primaryValue: `${soilMoisture}%`,
      lastReadingAt,
      trend: moistureTrend,
      activeAlerts,
      technicalSummary: `Humedad del suelo en ${soilMoisture}%. Humedad ambiente: ${ambientHumidity}%.`,
    });
  }

  return buildState({
    plot,
    status: "OPTIMAL",
    severity: "INFO",
    title: "Condicion hidrica favorable",
    message: "No se detectan senales hidricas criticas en este momento.",
    recommendation: "Mantener seguimiento y registrar cambios observados en campo.",
    confidence: 78,
    primaryVariable: "Humedad suelo",
    primaryValue: `${soilMoisture}%`,
    lastReadingAt,
    trend: moistureTrend,
    activeAlerts,
    technicalSummary: `Humedad del suelo en ${soilMoisture}%. Temperatura: ${temperature} C.`,
  });
}

function buildState(
  input: Omit<CropLiveState, "plotId" | "lastReadingAt"> & {
    plot: Plot;
    lastReadingAt: Date | null;
  },
) {
  const { plot, ...state } = input;

  return {
    ...state,
    plotId: plot.id,
    lastReadingAt: input.lastReadingAt?.toISOString() ?? null,
  };
}

function getLastReadingDate(sensors: Sensor[]) {
  const dates = sensors
    .map((sensor) => new Date(sensor.lastReadingAt))
    .filter((date) => !Number.isNaN(date.getTime()));

  if (dates.length === 0) {
    return null;
  }

  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

function getSensorTrendLabel(sensor: Sensor): CropLiveState["trend"] {
  const readings = getSensorReadings(sensor.id);
  const first = readings.at(0);
  const latest = readings.at(-1);

  if (!first || !latest) {
    return "Sin tendencia";
  }

  const delta = latest.value - first.value;

  if (delta <= -3) {
    return "Bajando";
  }

  if (delta >= 3) {
    return "Subiendo";
  }

  return "Estable";
}
