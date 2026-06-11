import { AppShell } from "@/components/app-shell";
import { Metric } from "@/components/metric";
import { RestrictedAction } from "@/components/restricted-action";
import { SensorForm } from "@/components/sensor-form";
import { SensorStatusBadge } from "@/components/sensor-status-badge";
import { sensorTypeLabel } from "@/components/sensor-type-label";
import { Sparkline } from "@/components/sparkline";
import { StatCard } from "@/components/stat-card";
import { TrendBadge } from "@/components/trend-badge";
import {
  getPersistentPlots,
  getPersistentSensors,
  getSensorPlotForView,
  getSensorReadingsForView,
  getSensorTrendForView,
} from "@/lib/persistent-view-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function SensorsPage() {
  const profile = await getCurrentProfile();
  const canManageSensors = hasCapability(profile, "manage_sensors");
  const [plots, sensors] = await Promise.all([
    getPersistentPlots(),
    getPersistentSensors(),
  ]);
  const readingsBySensor = new Map(
    await Promise.all(
      sensors.map(async (sensor) => [
        sensor.id,
        await getSensorReadingsForView(sensor.id),
      ] as const),
    ),
  );
  const activeSensors = sensors.filter((sensor) => sensor.status === "ACTIVE");
  const maintenanceSensors = sensors.filter(
    (sensor) => sensor.status === "MAINTENANCE",
  );

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Monitoreo sin hardware
          </p>
          <h2 className="text-3xl font-semibold">Sensores virtuales</h2>
          <p className="max-w-2xl text-slate-600">
            AgroNodo valida experiencia, modelo de datos y alertas antes de
            instalar ESP32, LoRaWAN o estaciones reales.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Sensores configurados" value={String(sensors.length)} />
          <StatCard label="Activos" value={String(activeSensors.length)} />
          <StatCard
            label="En mantenimiento"
            value={String(maintenanceSensors.length)}
          />
        </div>

        <div className="mt-6">
          {canManageSensors ? (
            <SensorForm plots={plots} />
          ) : (
            <RestrictedAction
              description="Este perfil puede revisar dispositivos y lecturas, pero no crear ni modificar sensores virtuales."
              title="Gestion de sensores restringida"
            />
          )}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {sensors.map((sensor) => {
            const plot = getSensorPlotForView(sensor, plots);
            const readings = readingsBySensor.get(sensor.id) ?? [];
            const trend = getSensorTrendForView(sensor.id);

            return (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5"
                key={sensor.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {sensorTypeLabel(sensor.type)}
                    </p>
                    <h3 className="text-xl font-semibold">{sensor.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Lote: {plot?.name ?? "Sin lote asignado"}
                    </p>
                  </div>
                  <SensorStatusBadge value={sensor.status} />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Metric
                    label="Ultima lectura"
                    value={`${sensor.lastValue} ${sensor.unit}`}
                  />
                  <Metric label="Ubicacion" value={sensor.relativeLocation} />
                  <Metric
                    label="Fecha lectura"
                    value={new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(sensor.lastReadingAt))}
                  />
                  <Metric label="Origen" value="Simulado" />
                </div>

                <div className="mt-5 rounded-lg bg-slate-50 p-4 text-emerald-700">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">
                      Tendencia 7 dias
                    </p>
                    <TrendBadge
                      delta={trend.delta}
                      direction={trend.direction}
                      unit={sensor.unit}
                    />
                  </div>
                  <Sparkline readings={readings} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
