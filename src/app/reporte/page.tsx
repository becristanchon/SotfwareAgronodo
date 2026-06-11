import { AlertSeverityBadge } from "@/components/alert-severity-badge";
import { alertTypeLabel } from "@/components/alert-type-label";
import { AppShell } from "@/components/app-shell";
import { Metric } from "@/components/metric";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import {
  getPilotReport,
  getPlotFarm,
  getSensor,
  getSensorPlot,
} from "@/lib/demo-data";

export default function ReportPage() {
  const report = getPilotReport();

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              AgroNodo
            </p>
            <h2 className="mt-1 text-3xl font-semibold">{report.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">{report.scope}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
            <p className="text-slate-500">Generado</p>
            <p className="mt-1 font-medium">
              {new Intl.DateTimeFormat("es-CO", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(new Date(report.generatedAt))}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Fincas" value={String(report.summary.farms)} />
          <StatCard label="Lotes" value={String(report.summary.plots)} />
          <StatCard
            label="Alertas activas"
            value={String(report.summary.activeAlerts)}
          />
          <StatCard
            label="Alertas criticas"
            value={String(report.summary.criticalAlerts)}
          />
        </div>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Conclusiones operativas</h3>
          <div className="mt-4 grid gap-4">
            {report.nextActions.map((action) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5"
                key={action.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{action.context}</p>
                    <h4 className="text-lg font-semibold">{action.title}</h4>
                  </div>
                  <AlertSeverityBadge value={action.severity} />
                </div>
                <p className="mt-3 text-sm text-slate-600">{action.reason}</p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {action.recommendation}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Estado por finca</h3>
          <div className="mt-4 grid gap-4">
            {report.farmHealth.map((farm) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5"
                key={farm.farmId}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {farm.producerName} - {farm.municipality}
                    </p>
                    <h4 className="text-lg font-semibold">{farm.farmName}</h4>
                  </div>
                  <StatusBadge status={farm.status} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <Metric label="Lotes" value={String(farm.plots)} />
                  <Metric label="Sensores" value={String(farm.sensors)} />
                  <Metric label="Alertas" value={String(farm.activeAlerts)} />
                  <Metric label="Criticas" value={String(farm.criticalAlerts)} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-semibold">Alertas prioritarias</h3>
          <div className="mt-4 grid gap-4">
            {report.priorityAlerts.map((alert) => {
              const sensor = getSensor(alert.sensorId);
              const plot = sensor ? getSensorPlot(sensor) : undefined;
              const farm = plot ? getPlotFarm(plot) : undefined;

              return (
                <article
                  className="rounded-lg border border-slate-200 bg-white p-5"
                  key={alert.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        {farm?.name ?? "Sin finca"} - {plot?.name ?? "Sin lote"}
                      </p>
                      <h4 className="text-lg font-semibold">
                        {alertTypeLabel(alert.type)}
                      </h4>
                    </div>
                    <AlertSeverityBadge value={alert.severity} />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <Metric
                      label="Detectado"
                      value={`${alert.detectedValue} ${alert.unit}`}
                    />
                    <Metric
                      label="Umbral"
                      value={`${alert.threshold} ${alert.unit}`}
                    />
                    <Metric label="Estado" value={alert.status} />
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    {alert.recommendation}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="no-print mt-8 rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-700">Uso recomendado</p>
          <p className="mt-1 text-sm text-slate-600">
            Este reporte sirve para conversaciones de piloto. Los datos son
            simulados y no reemplazan validacion agronomica ni medicion en
            campo.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
