import Link from "next/link";
import { Metric } from "@/components/metric";
import type {
  Farm,
  FarmMaturity,
  FarmProfile,
  FarmWaterProfile,
} from "@/lib/demo-data";

export function FarmProfileCard({
  farm,
  profile,
  plots,
  maturity,
  waterProfile,
}: {
  farm: Farm;
  profile?: FarmProfile;
  plots: number;
  maturity?: FarmMaturity;
  waterProfile?: FarmWaterProfile;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="h-2 bg-gradient-to-r from-emerald-700 via-lime-500 to-amber-400" />
      <div className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="break-words text-sm text-slate-500">
              {farm.village}, {farm.municipality}
            </p>
            <h3 className="mt-1 break-words text-2xl font-semibold leading-tight">
              {farm.name}
            </h3>
            <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-slate-600">
              {profile?.shortStory ?? "Finca pendiente de caracterizacion."}
            </p>
          </div>
          <Link
            className="w-fit shrink-0 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            href={`/fincas/${farm.id}`}
          >
            Ver agua
          </Link>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <Metric label="Area" value={`${farm.areaHa} ha`} />
          <Metric label="Altitud" value={`${farm.altitudeM} m`} />
          <Metric label="Lotes" value={String(plots)} />
          <Metric
            label="Eficiencia"
            value={`${waterProfile?.waterEfficiencyScore ?? maturity?.overallScore ?? 0}/100`}
          />
        </div>

        <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Estado hidrico
              </p>
              <p className="mt-1 break-words font-semibold leading-tight text-emerald-950">
                {maturity?.currentStageName ?? "Registrada"}
              </p>
            </div>
            <p className="max-w-xl break-words text-sm font-medium leading-6 text-emerald-900">
              {waterProfile?.waterRecommendation ??
                maturity?.operationalStatus ??
                "Pendiente de diagnostico hidrico"}
            </p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white">
            <div
              className="h-2 rounded-full bg-emerald-700"
              style={{
                width: `${waterProfile?.waterEfficiencyScore ?? maturity?.overallScore ?? 0}%`,
              }}
            />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Metric
              label="Uso estimado"
              value={`${waterProfile?.estimatedWeeklyUseM3 ?? 0} m3/sem`}
            />
            <Metric
              label="Ahorro posible"
              value={`${waterProfile?.potentialWeeklySavingsM3 ?? 0} m3/sem`}
            />
            <Metric
              label="Riego"
              value={waterProfile?.irrigationStatus ?? "Pendiente"}
            />
          </div>
        </div>

        {profile ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span
                className="break-words rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
