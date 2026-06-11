import type { SensorType } from "@/lib/demo-data";

const labels: Record<SensorType, string> = {
  SOIL_MOISTURE: "Humedad del suelo",
  AMBIENT_TEMPERATURE: "Temperatura ambiente",
  AMBIENT_HUMIDITY: "Humedad ambiental",
};

export function sensorTypeLabel(type: SensorType) {
  return labels[type];
}
