import {
  getPlotFarm as getDemoPlotFarm,
  getPlotProfile as getDemoPlotProfile,
  getProducerProfile as getDemoProducerProfile,
  getSensorPlot as getDemoSensorPlot,
  getSensorReadings as getDemoSensorReadings,
  getSensorTrend,
  type Alert,
  type Farm,
  type Plot,
  type Producer,
  type Reading,
  type Sensor,
} from "@/lib/demo-data";
import { dataRepository, getDataSourceMode } from "@/lib/data-repository";

type DecimalLike = {
  toNumber?: () => number;
  toString: () => string;
};

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  if (value && typeof value === "object" && "toString" in value) {
    const decimal = value as DecimalLike;
    if (decimal.toNumber) {
      return decimal.toNumber();
    }

    const parsed = Number(decimal.toString());
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return new Date().toISOString();
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getAlertUnit(type: Alert["type"]): string {
  if (type === "FROST_RISK") {
    return "C";
  }

  return "%";
}

function getAlertRecommendation(type: Alert["type"]): string {
  if (type === "FROST_RISK") {
    return "Revisar cobertura del cultivo y monitorear temperatura en la madrugada.";
  }

  if (type === "HIGH_AMBIENT_HUMIDITY") {
    return "Revisar ventilacion y signos de enfermedad por humedad alta.";
  }

  return "Revisar riego y humedad del suelo antes de aplicar agua adicional.";
}

export async function getPersistentProducers(): Promise<Producer[]> {
  if (getDataSourceMode() !== "database") {
    const { producers } = await import("@/lib/demo-data");
    return producers;
  }

  const rows = await dataRepository.producers.list();

  return rows.map((row) => {
    const producer = asRecord(row);

    return {
      id: String(producer.id ?? ""),
      fullName: String(producer.fullName ?? "Productor sin nombre"),
      documentNumber: String(producer.documentNumber ?? ""),
      phone: String(producer.phone ?? ""),
      department: String(producer.department ?? "Boyaca"),
      municipality: String(producer.municipality ?? ""),
      village: String(producer.village ?? ""),
      notes: String(producer.notes ?? ""),
    };
  });
}

export async function getPersistentFarms(): Promise<Farm[]> {
  if (getDataSourceMode() !== "database") {
    const { farms } = await import("@/lib/demo-data");
    return farms;
  }

  const rows = await dataRepository.farms.list();

  return rows.map((row) => {
    const farm = asRecord(row);

    return {
      id: String(farm.id ?? ""),
      producerId: String(farm.producerId ?? ""),
      name: String(farm.name ?? "Finca sin nombre"),
      department: String(farm.department ?? "Boyaca"),
      municipality: String(farm.municipality ?? ""),
      village: String(farm.village ?? ""),
      altitudeM: toNumber(farm.altitudeM),
      areaHa: toNumber(farm.areaHa),
    };
  });
}

export async function getPersistentPlots(): Promise<Plot[]> {
  if (getDataSourceMode() !== "database") {
    const { plots } = await import("@/lib/demo-data");
    return plots;
  }

  const rows = await dataRepository.plots.list();

  return rows.map((row) => {
    const plot = asRecord(row);
    const sensors = Array.isArray(plot.sensors) ? plot.sensors.map(asRecord) : [];
    const alerts = Array.isArray(plot.alerts) ? plot.alerts.map(asRecord) : [];
    const soilSensor = sensors.find((sensor) => sensor.type === "SOIL_MOISTURE");
    const ambientTempSensor = sensors.find(
      (sensor) => sensor.type === "AMBIENT_TEMPERATURE",
    );
    const ambientHumiditySensor = sensors.find(
      (sensor) => sensor.type === "AMBIENT_HUMIDITY",
    );

    return {
      id: String(plot.id ?? ""),
      farmId: String(plot.farmId ?? ""),
      name: String(plot.name ?? "Lote sin nombre"),
      crop: String(plot.crop ?? "Cultivo"),
      areaHa: toNumber(plot.areaHa),
      plantedAt: toIsoDate(plot.plantedAt),
      status:
        plot.status === "Riesgo" || plot.status === "Atencion"
          ? plot.status
          : alerts.length > 0
            ? "Atencion"
            : "Estable",
      soilMoisture: toNumber(soilSensor?.lastValue, 0),
      ambientTemperature: toNumber(ambientTempSensor?.lastValue, 0),
      ambientHumidity: toNumber(ambientHumiditySensor?.lastValue, 0),
      activeAlerts: alerts.filter((alert) => alert.status === "ACTIVE").length,
    };
  });
}

export async function getPersistentSensors(): Promise<Sensor[]> {
  if (getDataSourceMode() !== "database") {
    const { sensors } = await import("@/lib/demo-data");
    return sensors;
  }

  const rows = await dataRepository.sensors.list();

  return rows.map((row) => {
    const sensor = asRecord(row);
    const readings = Array.isArray(sensor.readings)
      ? sensor.readings.map(asRecord)
      : [];
    const lastReading = readings.at(-1);

    return {
      id: String(sensor.id ?? ""),
      plotId: String(sensor.plotId ?? ""),
      name: String(sensor.name ?? "Sensor sin nombre"),
      type: sensor.type as Sensor["type"],
      unit: String(sensor.unit ?? ""),
      status: sensor.status as Sensor["status"],
      relativeLocation: String(sensor.relativeLocation ?? "Sin ubicacion"),
      lastValue: toNumber(lastReading?.value),
      lastReadingAt: toIsoDate(lastReading?.takenAt),
    };
  });
}

export async function getPersistentReadings(sensorId?: string): Promise<Reading[]> {
  if (getDataSourceMode() !== "database") {
    return getDemoSensorReadings(sensorId ?? "");
  }

  const rows = await dataRepository.readings.list(sensorId);

  return rows.map((row) => {
    const reading = asRecord(row);

    return {
      id: String(reading.id ?? ""),
      sensorId: String(reading.sensorId ?? ""),
      value: toNumber(reading.value),
      unit: String(reading.unit ?? ""),
      origin: reading.origin as Reading["origin"],
      takenAt: toIsoDate(reading.takenAt),
    };
  });
}

export async function getPersistentAlerts(): Promise<Alert[]> {
  if (getDataSourceMode() !== "database") {
    const { alerts } = await import("@/lib/demo-data");
    return alerts;
  }

  const rows = await dataRepository.alerts.list();

  return rows.map((row) => {
    const alert = asRecord(row);
    const type = alert.type as Alert["type"];

    return {
      id: String(alert.id ?? ""),
      plotId: String(alert.plotId ?? ""),
      sensorId: alert.sensorId ? String(alert.sensorId) : "",
      type,
      severity: alert.severity as Alert["severity"],
      status: alert.status as Alert["status"],
      message: String(alert.message ?? ""),
      recommendation: getAlertRecommendation(type),
      detectedValue: toNumber(alert.detectedValue),
      threshold: toNumber(alert.threshold),
      unit: getAlertUnit(type),
      createdAt: toIsoDate(alert.createdAt),
    };
  });
}

export function getProducerProfileForView(producerId: string) {
  return getDemoProducerProfile(producerId);
}

export function getPlotProfileForView(plotId: string) {
  return getDemoPlotProfile(plotId);
}

export function getPlotFarmForView(plot: Plot, farms: Farm[]) {
  return farms.find((farm) => farm.id === plot.farmId) ?? getDemoPlotFarm(plot);
}

export function getPlotSensorsForView(plotId: string, sensors: Sensor[]) {
  return sensors.filter((sensor) => sensor.plotId === plotId);
}

export function getPlotAlertsForView(plotId: string, alerts: Alert[]) {
  return alerts.filter((alert) => alert.plotId === plotId);
}

export function getSensorPlotForView(sensor: Sensor, plots: Plot[]) {
  return plots.find((plot) => plot.id === sensor.plotId) ?? getDemoSensorPlot(sensor);
}

export async function getSensorReadingsForView(sensorId: string) {
  const readings = await getPersistentReadings(sensorId);

  if (readings.length === 0) {
    return getDemoSensorReadings(sensorId);
  }

  return readings;
}

export function getSensorTrendForView(sensorId: string) {
  return getSensorTrend(sensorId);
}
