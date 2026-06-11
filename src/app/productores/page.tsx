import { AppShell } from "@/components/app-shell";
import { ProducerForm } from "@/components/producer-form";
import { ProducerProfileCard } from "@/components/producer-profile-card";
import { RestrictedAction } from "@/components/restricted-action";
import { StatCard } from "@/components/stat-card";
import {
  getPersistentFarms,
  getPersistentProducers,
  getProducerProfileForView,
} from "@/lib/persistent-view-data";
import { hasCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export default async function ProducersPage() {
  const profile = await getCurrentProfile();
  const canManageProducers = hasCapability(profile, "manage_producers");
  const [producers, farms] = await Promise.all([
    getPersistentProducers(),
    getPersistentFarms(),
  ]);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Registro agricola
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Productores</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              El productor no es solo un contacto. Es quien toma decisiones,
              interpreta el clima, conoce el suelo y necesita que AgroNodo hable
              su lenguaje.
            </p>
          </div>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Caracterizacion humana
            </p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-950">
              Perfil del productor
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              Experiencia, acceso tecnologico, cultivos y necesidades de apoyo
              permiten personalizar alertas, reportes y acompanamiento.
            </p>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Productores registrados" value={String(producers.length)} />
          <StatCard label="Fincas asociadas" value={String(farms.length)} />
          <StatCard label="Departamento foco" value="Boyaca" />
        </div>

        <div className="mt-6">
          {canManageProducers ? (
            <ProducerForm />
          ) : (
            <RestrictedAction
              description="Este perfil puede consultar productores, pero no crear nuevos registros. Solicita apoyo de un tecnico o administrador."
              title="Registro de productores restringido"
            />
          )}
        </div>

        <div className="mt-6 grid gap-4">
          {producers.map((producer) => {
            const producerFarms = farms.filter(
              (farm) => farm.producerId === producer.id,
            );

            return (
              <ProducerProfileCard
                farms={producerFarms}
                key={producer.id}
                producer={producer}
                profile={getProducerProfileForView(producer.id)}
              />
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
