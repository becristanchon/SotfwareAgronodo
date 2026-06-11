export type FieldDecisionStatus = "APPLIED" | "DISCARDED" | "PENDING_REVIEW";

export type FieldDecision = {
  id: string;
  farmId: string;
  plotId: string;
  alertId?: string;
  status: FieldDecisionStatus;
  title: string;
  actionTaken: string;
  reason: string;
  waterImpactM3?: number;
  decidedBy: string;
  decidedAt: string;
};

export const fieldDecisions: FieldDecision[] = [
  {
    id: "decision-papa-riego-corto",
    farmId: "farm-boyaca-demo",
    plotId: "plot-papa-criolla",
    alertId: "alert-sensor-papa-humedad-suelo",
    status: "APPLIED",
    title: "Riego corto aplicado",
    actionTaken: "Se aplico riego corto solo en el sector con humedad mas baja.",
    reason: "La humedad manual confirmo suelo seco bajo 25%.",
    waterImpactM3: 1.6,
    decidedBy: "Productor demo",
    decidedAt: "2026-06-10T14:30:00.000Z",
  },
  {
    id: "decision-cebolla-observar",
    farmId: "farm-boyaca-demo",
    plotId: "plot-cebolla-larga",
    status: "PENDING_REVIEW",
    title: "Mantener observacion",
    actionTaken: "Se mantiene riego programado y revision visual del cultivo.",
    reason: "La humedad esta estable y no se justifica riego adicional.",
    waterImpactM3: 0.8,
    decidedBy: "Tecnico de campo",
    decidedAt: "2026-06-09T09:20:00.000Z",
  },
  {
    id: "decision-arveja-helada",
    farmId: "farm-la-esperanza",
    plotId: "plot-arveja",
    alertId: "alert-sensor-arveja-humedad-ambiente",
    status: "APPLIED",
    title: "Revision por noche fria",
    actionTaken: "Se evito riego nocturno y se reviso el lote al amanecer.",
    reason: "Habia humedad ambiente alta con riesgo de frio.",
    decidedBy: "Productor demo",
    decidedAt: "2026-06-08T06:10:00.000Z",
  },
];

export function getFieldDecisionsForPlot(plotId: string) {
  return fieldDecisions.filter((decision) => decision.plotId === plotId);
}

export function getFieldDecisionsForFarm(farmId: string) {
  return fieldDecisions.filter((decision) => decision.farmId === farmId);
}

export function getFieldDecisionsForAlert(alertId: string) {
  return fieldDecisions.filter((decision) => decision.alertId === alertId);
}
