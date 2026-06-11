import { AlertRuleCard } from "@/components/alert-rule-card";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { alertRulesConfig } from "@/lib/demo-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function AlertRulesPage() {
  const profile = await getCurrentProfile();
  const canManageRules = hasCapability(profile, "manage_rules");
  const enabledRules = alertRulesConfig.filter((rule) => rule.enabled);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Configuracion agricola
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Reglas de alerta</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Define en que punto una variable debe generar advertencia o alerta
              critica. En MVP las reglas son globales para todos los lotes.
            </p>
          </div>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Criterio CTO
            </p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-950">
              Configurable, pero con guardrails
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              {canManageRules
                ? "Este perfil puede ajustar umbrales con reglas base para evitar configuraciones riesgosas en etapa MVP."
                : "Este perfil puede consultar los umbrales, pero no modificar criterios tecnicos de alerta."}
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Reglas" value={String(alertRulesConfig.length)} />
          <StatCard label="Activas" value={String(enabledRules.length)} />
          <StatCard label="Alcance" value="Global" />
        </div>

        <div className="mt-6 grid gap-4">
          {alertRulesConfig.map((rule) => (
            <AlertRuleCard editable={canManageRules} key={rule.id} rule={rule} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
