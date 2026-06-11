import { AppShell } from "@/components/app-shell";
import { CropLiveSummaryCard } from "@/components/crop-live-summary-card";
import { FarmForm } from "@/components/farm-form";
import { FarmProfileCard } from "@/components/farm-profile-card";
import { FarmPriorityPanel } from "@/components/farm-priority-panel";
import { RestrictedAction } from "@/components/restricted-action";
import { StatCard } from "@/components/stat-card";
import {
  getFarmMaturity,
  getFarmProfile,
  getFarmWaterProfile,
} from "@/lib/demo-data";
import { getCropLiveState } from "@/lib/crop-live-state";
import { getFarmLiveSummary } from "@/lib/farm-live-summary";
import {
  getPersistentFarms,
  getPersistentPlots,
  getPersistentProducers,
} from "@/lib/persistent-view-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function FarmsPage() {
  const profile = await getCurrentProfile();
  const canManageFarms = hasCapability(profile, "manage_farms");
  const [farms, producers, plots] = await Promise.all([
    getPersistentFarms(),
    getPersistentProducers(),
    getPersistentPlots(),
  ]);
  const totalArea = farms.reduce((total, farm) => total + farm.areaHa, 0);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Unidades productivas
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Fincas</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Cada finca avanza por un ciclo hidrico: caracterizar agua,
              diagnosticar uso, monitorear humedad, optimizar riego y demostrar ahorro.
            </p>
          </div>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Eje del producto
            </p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-950">
              Gestion inteligente del agua
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              El objetivo es saber cuanta agua usa cada finca, cuanto puede ahorrar
              y que decision de riego debe revisar.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Fincas" value={String(farms.length)} />
          <StatCard label="Area monitoreada" value={`${totalArea.toFixed(1)} ha`} />
          <StatCard label="Productores" value={String(producers.length)} />
        </div>

        <div className="mt-6">
          {canManageFarms ? (
            <FarmForm producers={producers} />
          ) : (
            <RestrictedAction
              description="Este perfil puede revisar el estado hidrico de las fincas, pero no registrar nuevas unidades productivas."
              title="Registro de fincas restringido"
            />
          )}
        </div>

        <div className="mt-6 grid gap-4">
          {farms.map((farm) => {
            const farmPlots = plots.filter((plot) => plot.farmId === farm.id);
            const farmSummary = getFarmLiveSummary(farm);

            return (
              <div className="grid gap-3" key={farm.id}>
                <FarmProfileCard
                  farm={farm}
                  maturity={getFarmMaturity(farm.id)}
                  plots={farmPlots.length}
                  profile={getFarmProfile(farm.id)}
                  waterProfile={getFarmWaterProfile(farm.id)}
                />
                <FarmPriorityPanel summary={farmSummary} />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Estado vivo por lote
                  </p>
                  <div className="mt-3 grid gap-3 lg:grid-cols-3">
                    {farmPlots.map((plot) => (
                      <CropLiveSummaryCard
                        crop={plot.crop}
                        href={`/lotes/${plot.id}`}
                        key={plot.id}
                        plotName={plot.name}
                        state={getCropLiveState(plot)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
