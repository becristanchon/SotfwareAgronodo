import { CropVisual } from "@/components/crop-visual";
import { Metric } from "@/components/metric";
import type { CropLiveState } from "@/lib/crop-live-state";

const severityClassName: Record<CropLiveState["severity"], string> = {
  INFO: "bg-emerald-50 text-emerald-800",
  WATCH: "bg-sky-50 text-sky-800",
  WARNING: "bg-amber-50 text-amber-800",
  CRITICAL: "bg-red-50 text-red-800",
  UNKNOWN: "bg-slate-100 text-slate-700",
};

const severityLabel: Record<CropLiveState["severity"], string> = {
  INFO: "Favorable",
  WATCH: "Observar",
  WARNING: "Atencion",
  CRITICAL: "Prioritario",
  UNKNOWN: "Sin certeza",
};

export function CropLiveStateCard({
  state,
  compact = false,
  showTechnical = false,
}: {
  state: CropLiveState;
  compact?: boolean;
  showTechnical?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`grid gap-0 ${compact ? "" : "lg:grid-cols-[360px_1fr]"}`}>
        <CropVisual status={state.status} />

        <div className="min-w-0 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Estado vivo del cultivo
              </p>
              <h3 className="mt-1 text-2xl font-semibold leading-tight">
                {state.title}
              </h3>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${severityClassName[state.severity]}`}
            >
              {severityLabel[state.severity]}
            </span>
          </div>

          <p className="mt-4 text-base leading-7 text-slate-700">{state.message}</p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Recomendacion</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {state.recommendation}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric label={state.primaryVariable} value={state.primaryValue} />
            <Metric label="Tendencia" value={state.trend} />
            <Metric label="Confianza" value={`${state.confidence}%`} />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Ultima lectura:{" "}
            {state.lastReadingAt
              ? new Intl.DateTimeFormat("es-CO", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(state.lastReadingAt))
              : "Sin dato reciente"}
          </p>

          {showTechnical ? (
            <details className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                Ver detalle tecnico
              </summary>
              <div className="mt-3 grid gap-3 text-sm text-slate-600">
                <p>{state.technicalSummary}</p>
                <p>Alertas activas: {state.activeAlerts.length}</p>
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </article>
  );
}
