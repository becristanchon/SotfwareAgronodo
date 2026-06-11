import type { AlertType } from "@/lib/demo-data";

const labels: Record<AlertType, string> = {
  LOW_SOIL_MOISTURE: "Humedad del suelo baja",
  FROST_RISK: "Riesgo de helada",
  HIGH_AMBIENT_HUMIDITY: "Humedad ambiental alta",
};

export function alertTypeLabel(type: AlertType) {
  return labels[type];
}
