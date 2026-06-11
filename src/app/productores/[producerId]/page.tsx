import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Metric } from "@/components/metric";
import {
  farms,
  getProducerProfile,
  producers,
} from "@/lib/demo-data";

export function generateStaticParams() {
  return producers.map((producer) => ({ producerId: producer.id }));
}

export default async function ProducerDetailPage({
  params,
}: {
  params: Promise<{ producerId: string }>;
}) {
  const { producerId } = await params;
  const producer = producers.find((item) => item.id === producerId);

  if (!producer) {
    return (
      <AppShell>
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            Productor no encontrado.
          </div>
        </section>
      </AppShell>
    );
  }

  const profile = getProducerProfile(producer.id);
  const producerFarms = farms.filter((farm) => farm.producerId === producer.id);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Link className="text-sm font-semibold text-emerald-700" href="/productores">
          Volver a productores
        </Link>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="h-3 bg-gradient-to-r from-emerald-700 via-lime-500 to-sky-500" />
          <div className="grid gap-6 p-6 xl:grid-cols-[1fr_340px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Perfil del productor
              </p>
              <h2 className="mt-2 break-words text-3xl font-semibold leading-tight lg:text-4xl">
                {producer.fullName}
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                {profile?.story ?? producer.notes}
              </p>
            </div>

            <aside className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Ubicacion</p>
              <p className="mt-1 text-lg font-semibold">
                {producer.village}, {producer.municipality}
              </p>
              <p className="mt-3 text-sm text-slate-600">{producer.phone}</p>
            </aside>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <Metric label="Fincas" value={String(producerFarms.length)} />
          <Metric
            label="Experiencia"
            value={profile?.productionExperience ?? "Pendiente"}
          />
          <Metric
            label="Cultivos"
            value={profile?.mainCrops.join(", ") ?? "Pendiente"}
          />
          <Metric
            label="Confianza digital"
            value={`${profile?.confidenceLevel ?? 35}%`}
          />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Caracterizacion
            </p>
            <div className="mt-4 grid gap-4">
              <Info label="Forma de decidir" value={profile?.decisionStyle} />
              <Info label="Acceso tecnologico" value={profile?.techAccess} />
              <Info label="Necesidad de apoyo" value={profile?.supportNeed} />
              <Info label="Meta con AgroNodo" value={profile?.agroNodoGoal} />
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Identidad productiva
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile?.tags.map((tag) => (
                <span
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Fincas asociadas
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {producerFarms.map((farm) => (
              <Link
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 hover:bg-emerald-50"
                href={`/fincas/${farm.id}`}
                key={farm.id}
              >
                <p className="text-sm text-slate-500">
                  {farm.village}, {farm.municipality}
                </p>
                <h3 className="mt-1 font-semibold">{farm.name}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {farm.areaHa} ha a {farm.altitudeM} m
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {value ?? "Pendiente de caracterizacion"}
      </p>
    </div>
  );
}
