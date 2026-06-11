import { AlertSeverityBadge } from "@/components/alert-severity-badge";
import type { AlertSeverity } from "@/lib/demo-data";

export function ActionCard({
  title,
  context,
  reason,
  recommendation,
  severity,
}: {
  title: string;
  context: string;
  reason: string;
  recommendation: string;
  severity: AlertSeverity;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{context}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <AlertSeverityBadge value={severity} />
      </div>
      <p className="mt-4 text-sm text-slate-600">{reason}</p>
      <div className="mt-4 rounded-md bg-slate-50 p-3">
        <p className="text-sm font-medium text-slate-700">Siguiente accion</p>
        <p className="mt-1 text-sm text-slate-600">{recommendation}</p>
      </div>
    </article>
  );
}
