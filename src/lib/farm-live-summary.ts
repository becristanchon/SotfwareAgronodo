import { getCropLiveState, type CropLiveState, type CropLiveStatus } from "@/lib/crop-live-state";
import { getFarmPlots, type Farm, type Plot } from "@/lib/demo-data";

export type FarmLiveSummary = {
  farmId: string;
  status: CropLiveStatus;
  title: string;
  message: string;
  recommendation: string;
  urgentPlot: Plot | null;
  urgentState: CropLiveState | null;
  states: Array<{ plot: Plot; state: CropLiveState }>;
  counts: Record<CropLiveStatus, number>;
};

const priorityByStatus: Record<CropLiveStatus, number> = {
  NO_DATA: 6,
  FROST_RISK: 5,
  WATER_STRESS: 4,
  EXCESS_WATER: 3,
  LOW_MOISTURE: 2,
  OPTIMAL: 1,
};

const farmTitleByStatus: Record<CropLiveStatus, string> = {
  OPTIMAL: "Finca en condicion favorable",
  LOW_MOISTURE: "Finca con humedad bajando",
  WATER_STRESS: "Finca requiere revisar riego",
  EXCESS_WATER: "Finca con posible exceso de agua",
  FROST_RISK: "Finca con riesgo de frio",
  NO_DATA: "Finca sin datos recientes",
};

export function getFarmLiveSummary(farm: Farm): FarmLiveSummary {
  const plots = getFarmPlots(farm.id);
  const states = plots.map((plot) => ({ plot, state: getCropLiveState(plot) }));
  const sorted = [...states].sort(
    (a, b) => priorityByStatus[b.state.status] - priorityByStatus[a.state.status],
  );
  const urgent = sorted[0] ?? null;
  const status = urgent?.state.status ?? "NO_DATA";
  const counts = states.reduce(
    (accumulator, item) => {
      accumulator[item.state.status] += 1;
      return accumulator;
    },
    {
      OPTIMAL: 0,
      LOW_MOISTURE: 0,
      WATER_STRESS: 0,
      EXCESS_WATER: 0,
      FROST_RISK: 0,
      NO_DATA: 0,
    } satisfies Record<CropLiveStatus, number>,
  );

  return {
    farmId: farm.id,
    status,
    title: farmTitleByStatus[status],
    message: urgent
      ? `${urgent.plot.name}: ${urgent.state.title}.`
      : "No hay lotes configurados para esta finca.",
    recommendation:
      urgent?.state.recommendation ??
      "Registrar lotes y mediciones para iniciar seguimiento hidrico.",
    urgentPlot: urgent?.plot ?? null,
    urgentState: urgent?.state ?? null,
    states,
    counts,
  };
}
