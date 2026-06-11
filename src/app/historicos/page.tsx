import { AppShell } from "@/components/app-shell";
import { Metric } from "@/components/metric";
import { ReadingForm } from "@/components/reading-form";
import { ReadingsTable } from "@/components/readings-table";
import { RestrictedAction } from "@/components/restricted-action";
import { sensorTypeLabel } from "@/components/sensor-type-label";
import { Sparkline } from "@/components/sparkline";
import { StatCard } from "@/components/stat-card";
import { TrendBadge } from "@/components/trend-badge";
import {
  getSensorPlot,
  getSensorReadings,
  getSensorTrend,
  readings,
  sensors,
} from "@/lib/demo-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function HistoryPage() {
  const profile = await getCurrentProfile();
  const canRecordReadings = hasCapability(profile, "record_readings");
  const simulatedReadings = readings.filter(
    (reading) => reading.origin === "SIMULATED",
  );

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Analitica historica
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Evolucion de variables</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Consulta tendencias por sensor, compara lectura inicial contra
              actual y registra mediciones manuales durante pilotos sin hardware.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <StatCard label="Lecturas totales" value={String(readings.length)} />
              <StatCard
                label="Origen simulado"
                value={String(simulatedReadings.length)}
              />
              <StatCard
                label="Sensores con historico"
                value={String(sensors.length)}
              />
            </div>
          </div>

          {canRecordReadings ? (
            <ReadingForm sensors={sensors} />
          ) : (
            <RestrictedAction
              description="Este perfil puede consultar la evolucion de variables, pero no registrar mediciones manuales."
              title="Registro de mediciones restringido"
            />
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {sensors.map((sensor) => {
            const plot = getSensorPlot(sensor);
            const sensorReadings = getSensorReadings(sensor.id);
            const trend = getSensorTrend(sensor.id);
            const latest = sensorReadings.at(-1);
            const first = sensorReadings.at(0);

            return (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                key={sensor.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {plot?.name ?? "Sin lote"} - {sensorTypeLabel(sensor.type)}
                    </p>
                    <h3 className="text-xl font-semibold">{sensor.name}</h3>
                  </div>
                  <TrendBadge
                    delta={trend.delta}
                    direction={trend.direction}
                    unit={sensor.unit}
                  />
                </div>

                <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-emerald-700">
                  <Sparkline readings={sensorReadings} />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Metric
                    label="Inicio"
                    value={first ? `${first.value} ${first.unit}` : "Sin dato"}
                  />
                  <Metric
                    label="Actual"
                    value={latest ? `${latest.value} ${latest.unit}` : "Sin dato"}
                  />
                  <Metric label="Puntos" value={String(sensorReadings.length)} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6">
          <ReadingsTable sensors={sensors} />
        </div>
      </section>
    </AppShell>
  );
}
