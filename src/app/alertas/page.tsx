import { AlertQueueCard } from "@/components/alert-queue-card";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import {
  alerts,
  getActiveAlerts,
  getPlotFarm,
  getSensor,
  getSensorPlot,
} from "@/lib/demo-data";

const severityOrder = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export default function AlertsPage() {
  const activeAlerts = getActiveAlerts();
  const criticalAlerts = activeAlerts.filter(
    (alert) => alert.severity === "CRITICAL",
  );
  const highAlerts = activeAlerts.filter((alert) => alert.severity === "HIGH");
  const sortedAlerts = [...alerts].sort(
    (a, b) => severityOrder[b.severity] - severityOrder[a.severity],
  );

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Que hacer hoy
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Recomendaciones ordenadas por urgencia
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              AgroNodo traduce las alertas en acciones simples: revisar, regar
              con cuidado, esperar o validar el lote antes de gastar agua.
            </p>
          </div>

          <aside className="rounded-lg border border-red-100 bg-red-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
              Revisar primero
            </p>
            <h3 className="mt-2 text-xl font-semibold text-red-950">
              {criticalAlerts.length > 0
                ? "Lote con mayor riesgo"
                : "Sin urgencias criticas"}
            </h3>
            <p className="mt-2 text-sm text-red-900">
              Empieza por la accion mas urgente y registra que hiciste en campo.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Acciones pendientes" value={String(activeAlerts.length)} />
          <StatCard label="Urgentes" value={String(criticalAlerts.length)} />
          <StatCard label="Importantes" value={String(highAlerts.length)} />
        </div>

        <div className="mt-6 grid gap-4">
          {sortedAlerts.map((alert, index) => {
            const sensor = getSensor(alert.sensorId);
            const plot = sensor ? getSensorPlot(sensor) : undefined;
            const farm = plot ? getPlotFarm(plot) : undefined;

            return (
              <AlertQueueCard
                alert={alert}
                farm={farm}
                key={alert.id}
                plot={plot}
                position={index + 1}
              />
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
