import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { CropLiveStateCard } from "@/components/crop-live-state-card";
import { FieldDecisionTimeline } from "@/components/field-decision-timeline";
import { Metric } from "@/components/metric";
import { StatusBadge } from "@/components/status-badge";
import {
  getPlotAlerts,
  getPlotFarm,
  getPlotProfile,
  getPlotReadings,
  getPlotSensors,
  plots,
} from "@/lib/demo-data";
import { getCropLiveState } from "@/lib/crop-live-state";
import { dataRepository } from "@/lib/data-repository";
import type { FieldDecision } from "@/lib/field-decisions";

export function generateStaticParams() {
  return plots.map((plot) => ({ plotId: plot.id }));
}

export default async function PlotDetailPage({
  params,
}: {
  params: Promise<{ plotId: string }>;
}) {
  const { plotId } = await params;
  const plot = plots.find((item) => item.id === plotId);

  if (!plot) {
    return (
      <AppShell>
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            Lote no encontrado.
          </div>
        </section>
      </AppShell>
    );
  }

  const farm = getPlotFarm(plot);
  const profile = getPlotProfile(plot.id);
  const sensors = getPlotSensors(plot.id);
  const alerts = getPlotAlerts(plot.id);
  const readings = getPlotReadings(plot.id);
  const cropState = getCropLiveState(plot);
  const fieldDecisions = (await dataRepository.fieldDecisions.list({
    plotId: plot.id,
  })) as FieldDecision[];

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Link className="text-sm font-semibold text-emerald-700" href="/lotes">
          Volver a lotes
        </Link>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="h-3 bg-gradient-to-r from-emerald-700 via-lime-500 to-sky-500" />
          <div className="grid gap-6 p-6 xl:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Perfil de lote
              </p>
              <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
                <h2 className="break-words text-3xl font-semibold leading-tight lg:text-4xl">
                  {plot.name}
                </h2>
                <StatusBadge status={plot.status} />
              </div>
              <p className="mt-3 max-w-3xl text-slate-600">
                {plot.crop} en etapa {profile?.cropStage ?? "pendiente"} dentro
                de {farm?.name ?? "finca sin asignar"}. La decision actual se
                construye con estado del cultivo, lecturas simuladas y alertas.
              </p>
            </div>

            <aside className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Avance de monitoreo</p>
              <p className="mt-1 text-3xl font-semibold text-emerald-700">
                {profile?.monitoringProgress ?? 20}%
              </p>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-emerald-700"
                  style={{ width: `${profile?.monitoringProgress ?? 20}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {profile?.dominantRisk ?? "Pendiente de caracterizacion"}
              </p>
            </aside>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <Metric label="Area" value={`${plot.areaHa} ha`} />
          <Metric label="Dias desde siembra" value={`${profile?.daysSincePlanting ?? 0}`} />
          <Metric label="Sensores" value={String(sensors.length)} />
          <Metric label="Alertas" value={String(alerts.length)} />
        </div>

        <div className="mt-6">
          <CropLiveStateCard state={cropState} showTechnical />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Decision de campo
            </p>
            <div className="mt-4 grid gap-4">
              <Info label="Decision actual" value={profile?.currentDecision} />
              <Info label="Accion recomendada" value={profile?.recommendedAction} />
              <Info label="Observacion de campo" value={profile?.fieldObservation} />
              <Info label="Necesidad de agua" value={profile?.waterNeed} />
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Variables actuales
            </p>
            <div className="mt-4 grid gap-3">
              <Metric label="Humedad suelo" value={`${plot.soilMoisture}%`} />
              <Metric label="Temperatura" value={`${plot.ambientTemperature} C`} />
              <Metric label="Humedad ambiente" value={`${plot.ambientHumidity}%`} />
              <Metric label="Lecturas historicas" value={String(readings.length)} />
            </div>
          </aside>
        </div>

        <div className="mt-6">
          <FieldDecisionTimeline decisions={fieldDecisions} />
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Ruta operativa del lote
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-4">
            <Stage label="Caracterizado" status="DONE" />
            <Stage label="Sensores virtuales" status={sensors.length > 0 ? "DONE" : "PENDING"} />
            <Stage label="Alertas activas" status={alerts.length > 0 ? "ACTIVE" : "PENDING"} />
            <Stage label="Decision registrada" status="PENDING" />
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Sensores asociados
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {sensors.map((sensor) => (
              <article className="rounded-lg bg-slate-50 p-4" key={sensor.id}>
                <p className="text-sm text-slate-500">{sensor.relativeLocation}</p>
                <h3 className="mt-1 font-semibold">{sensor.name}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Ultima lectura: {sensor.lastValue} {sensor.unit}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {value ?? "Pendiente de caracterizacion"}
      </p>
    </div>
  );
}

function Stage({
  label,
  status,
}: {
  label: string;
  status: "DONE" | "ACTIVE" | "PENDING";
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        status === "ACTIVE"
          ? "border-emerald-300 bg-emerald-50"
          : status === "DONE"
            ? "border-slate-200 bg-slate-50"
            : "border-slate-200 bg-white"
      }`}
    >
      <p className="font-semibold">{label}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {status === "DONE"
          ? "Completado"
          : status === "ACTIVE"
            ? "En curso"
            : "Pendiente"}
      </p>
    </div>
  );
}
