import Link from "next/link";
import type { CropLiveStatus } from "@/lib/crop-live-state";
import type { FarmLiveSummary } from "@/lib/farm-live-summary";

const statusClassName: Record<CropLiveStatus, string> = {
  OPTIMAL: "border-emerald-200 bg-emerald-50 text-emerald-950",
  LOW_MOISTURE: "border-amber-200 bg-amber-50 text-amber-950",
  WATER_STRESS: "border-red-200 bg-red-50 text-red-950",
  EXCESS_WATER: "border-sky-200 bg-sky-50 text-sky-950",
  FROST_RISK: "border-cyan-200 bg-cyan-50 text-cyan-950",
  NO_DATA: "border-slate-200 bg-slate-50 text-slate-800",
};

const countLabels: Array<{ key: CropLiveStatus; label: string }> = [
  { key: "WATER_STRESS", label: "Riego" },
  { key: "LOW_MOISTURE", label: "Agua baja" },
  { key: "FROST_RISK", label: "Frio" },
  { key: "EXCESS_WATER", label: "Exceso" },
  { key: "OPTIMAL", label: "Bien" },
  { key: "NO_DATA", label: "Sin datos" },
];

export function FarmPriorityPanel({ summary }: { summary: FarmLiveSummary }) {
  return (
    <section
      className={`rounded-lg border p-4 ${statusClassName[summary.status]}`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-75">
            Prioridad de finca
          </p>
          <h3 className="mt-1 break-words text-xl font-semibold leading-tight">
            {summary.title}
          </h3>
          <p className="mt-2 break-words text-sm leading-6 opacity-90">
            {summary.message}
          </p>
        </div>

        {summary.urgentPlot ? (
          <Link
            className="w-fit shrink-0 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            href={`/lotes/${summary.urgentPlot.id}`}
          >
            Revisar lote
          </Link>
        ) : null}
      </div>

      <div className="mt-4 rounded-md bg-white/70 p-3">
        <p className="text-sm font-semibold">Accion recomendada</p>
        <p className="mt-1 text-sm leading-6 opacity-90">{summary.recommendation}</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {countLabels.map((item) => (
          <div className="rounded-md bg-white/70 px-3 py-2" key={item.key}>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
              {item.label}
            </p>
            <p className="mt-1 text-lg font-semibold">{summary.counts[item.key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
