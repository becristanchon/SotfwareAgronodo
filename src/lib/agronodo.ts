export type SensorType =
  | "SOIL_MOISTURE"
  | "AMBIENT_TEMPERATURE"
  | "AMBIENT_HUMIDITY";

export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export const agriculturalVariables: Record<
  SensorType,
  { label: string; unit: string; healthyRange: string }
> = {
  SOIL_MOISTURE: {
    label: "Humedad del suelo",
    unit: "%",
    healthyRange: "25% - 60%",
  },
  AMBIENT_TEMPERATURE: {
    label: "Temperatura ambiente",
    unit: "C",
    healthyRange: "4 C - 28 C",
  },
  AMBIENT_HUMIDITY: {
    label: "Humedad ambiental",
    unit: "%",
    healthyRange: "45% - 90%",
  },
};

export const alertThresholds = {
  lowSoilMoisture: 25,
  frostRiskTemperature: 4,
  highAmbientHumidity: 90,
};

export const demoDashboard = {
  producer: "Brayan Cristancho",
  farm: "Finca Demo Boyaca",
  municipality: "Sogamoso",
  plots: [
    {
      name: "Lote Papa Criolla",
      crop: "Papa",
      status: "Atencion",
      soilMoisture: 22,
      ambientTemperature: 6,
      ambientHumidity: 78,
      activeAlerts: 1,
    },
    {
      name: "Lote Cebolla Larga",
      crop: "Cebolla",
      status: "Estable",
      soilMoisture: 39,
      ambientTemperature: 13,
      ambientHumidity: 72,
      activeAlerts: 0,
    },
    {
      name: "Lote Arveja",
      crop: "Arveja",
      status: "Riesgo",
      soilMoisture: 28,
      ambientTemperature: 3,
      ambientHumidity: 92,
      activeAlerts: 2,
    },
  ],
};
