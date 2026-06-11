import { AlertActions } from "@/components/alert-actions";
import { AlertSeverityBadge } from "@/components/alert-severity-badge";
import { AlertStatusBadge } from "@/components/alert-status-badge";
import { alertTypeLabel } from "@/components/alert-type-label";
import { FieldDecisionRecorder } from "@/components/field-decision-recorder";
import { Metric } from "@/components/metric";
import type { Alert, Farm, Plot } from "@/lib/demo-data";

export function AlertQueueCard({
  alert,
  farm,
  plot,
  position,
}: {
  alert: Alert;
  farm?: Farm;
  plot?: Plot;
  position: number;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 xl:grid-cols-[80px_1fr_auto]">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-lg font-semibold text-white">
          {String(position).padStart(2, "0")}
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {farm?.name ?? "Finca sin asignar"} - {plot?.name ?? "Lote sin asignar"}
          </p>
          <h3 className="mt-1 text-xl font-semibold">Revisar {plot?.name ?? "lote"}</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{alert.message}</p>
        </div>

        <div className="flex flex-wrap gap-2 xl:justify-end">
          <AlertSeverityBadge value={alert.severity} />
          <AlertStatusBadge value={alert.status} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Metric label="Motivo" value={alertTypeLabel(alert.type)} />
        <Metric label="Lectura" value={`${alert.detectedValue} ${alert.unit}`} />
        <Metric label="Limite" value={`${alert.threshold} ${alert.unit}`} />
        <Metric
          label="Fecha"
          value={new Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(alert.createdAt))}
        />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Que hacer</p>
        <p className="mt-1 text-sm text-slate-600">{alert.recommendation}</p>
      </div>

      <FieldDecisionRecorder
        alertId={alert.id}
        farmId={farm?.id}
        plotId={plot?.id}
        recommendation={alert.recommendation}
      />

      <AlertActions alertId={alert.id} currentStatus={alert.status} />
    </article>
  );
}
