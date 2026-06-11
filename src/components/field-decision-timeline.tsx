import type { FieldDecision, FieldDecisionStatus } from "@/lib/field-decisions";

type TimelineDecision = FieldDecision & {
  user?: { name: string } | null;
};

const statusLabel: Record<FieldDecisionStatus, string> = {
  APPLIED: "Aplicada",
  DISCARDED: "Descartada",
  PENDING_REVIEW: "Pendiente",
};

const statusClassName: Record<FieldDecisionStatus, string> = {
  APPLIED: "bg-emerald-50 text-emerald-800",
  DISCARDED: "bg-slate-100 text-slate-700",
  PENDING_REVIEW: "bg-amber-50 text-amber-800",
};

export function FieldDecisionTimeline({
  decisions,
  title = "Bitacora de decisiones",
}: {
  decisions: TimelineDecision[];
  title?: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Evidencia de campo
      </p>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>

      <div className="mt-4 grid gap-3">
        {decisions.length > 0 ? (
          decisions.map((decision) => (
            <article className="border-l-2 border-emerald-200 pl-4" key={decision.id}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {new Intl.DateTimeFormat("es-CO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(decision.decidedAt))}
                  </p>
                  <h4 className="mt-1 font-semibold">{decision.title}</h4>
                </div>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClassName[decision.status]}`}
                >
                  {statusLabel[decision.status]}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {decision.actionTaken}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Motivo: {decision.reason}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                <span>
                  Responsable: {decision.user?.name ?? decision.decidedBy ?? "Sin usuario"}
                </span>
                {decision.waterImpactM3 ? (
                  <span>Ahorro estimado: {String(decision.waterImpactM3)} m3</span>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-500">
            Aun no hay decisiones registradas para este contexto.
          </p>
        )}
      </div>
    </section>
  );
}
