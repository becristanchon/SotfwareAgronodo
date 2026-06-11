import Link from "next/link";
import { Metric } from "@/components/metric";
import { StatusBadge } from "@/components/status-badge";
import type { Farm, Plot, PlotProfile } from "@/lib/demo-data";

export function PlotProfileCard({
  plot,
  farm,
  profile,
  alerts,
  sensors,
}: {
  plot: Plot;
  farm?: Farm;
  profile?: PlotProfile;
  alerts: number;
  sensors: number;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="h-2 bg-gradient-to-r from-emerald-700 via-lime-500 to-sky-500" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="break-words text-sm text-slate-500">
              {farm?.name ?? "Sin finca"}
            </p>
            <h3 className="mt-1 break-words text-2xl font-semibold leading-tight">
              {plot.name}
            </h3>
            <p className="mt-2 break-words text-sm text-slate-600">
              {plot.crop} - {profile?.cropStage ?? "Etapa pendiente"}
            </p>
          </div>
          <StatusBadge status={plot.status} />
        </div>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Decision actual
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-slate-700">
            {profile?.currentDecision ?? "Pendiente de caracterizacion del lote."}
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="break-words font-semibold text-slate-700">
              Monitoreo del lote
            </span>
            <span className="shrink-0 font-semibold text-emerald-700">
              {profile?.monitoringProgress ?? 20}%
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-emerald-700"
              style={{ width: `${profile?.monitoringProgress ?? 20}%` }}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Metric label="Humedad suelo" value={`${plot.soilMoisture}%`} />
          <Metric label="Necesidad agua" value={profile?.waterNeed ?? "Pendiente"} />
          <Metric label="Alertas" value={String(alerts)} />
          <Metric label="Sensores" value={String(sensors)} />
        </div>

        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {profile?.tags.map((tag) => (
              <span
                className="break-words rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            className="w-fit shrink-0 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            href={`/lotes/${plot.id}`}
          >
            Ver lote
          </Link>
        </div>
      </div>
    </article>
  );
}
