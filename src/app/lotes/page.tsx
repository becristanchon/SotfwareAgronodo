import { AppShell } from "@/components/app-shell";
import { PlotForm } from "@/components/plot-form";
import { PlotProfileCard } from "@/components/plot-profile-card";
import { RestrictedAction } from "@/components/restricted-action";
import { StatCard } from "@/components/stat-card";
import {
  getPersistentAlerts,
  getPersistentFarms,
  getPersistentPlots,
  getPersistentSensors,
  getPlotAlertsForView,
  getPlotFarmForView,
  getPlotProfileForView,
  getPlotSensorsForView,
} from "@/lib/persistent-view-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function PlotsPage() {
  const profile = await getCurrentProfile();
  const canManagePlots = hasCapability(profile, "manage_plots");
  const [farms, plots, sensors, alerts] = await Promise.all([
    getPersistentFarms(),
    getPersistentPlots(),
    getPersistentSensors(),
    getPersistentAlerts(),
  ]);
  const riskyPlots = plots.filter((plot) => plot.status !== "Estable").length;

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Zonas monitoreables
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Lotes</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              El lote es donde AgroNodo se vuelve accionable: cultivo, etapa,
              humedad, riesgo y recomendacion se unen en una decision de campo.
            </p>
          </div>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Caracterizacion de lote
            </p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-950">
              Estado agricola vivo
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              Etapa del cultivo, riesgo dominante y decision actual convierten
              las lecturas en manejo practico.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Lotes" value={String(plots.length)} />
          <StatCard label="Con atencion" value={String(riskyPlots)} />
          <StatCard label="Fincas asociadas" value={String(farms.length)} />
        </div>

        <div className="mt-6">
          {canManagePlots ? (
            <PlotForm farms={farms} />
          ) : (
            <RestrictedAction
              description="Este perfil puede consultar lotes y recomendaciones, pero no crear nuevos lotes dentro de una finca."
              title="Registro de lotes restringido"
            />
          )}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {plots.map((plot) => {
            const farm = getPlotFarmForView(plot, farms);
            const plotAlerts = getPlotAlertsForView(plot.id, alerts);

            return (
              <PlotProfileCard
                alerts={plotAlerts.length}
                farm={farm}
                key={plot.id}
                plot={plot}
                profile={getPlotProfileForView(plot.id)}
                sensors={getPlotSensorsForView(plot.id, sensors).length}
              />
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
