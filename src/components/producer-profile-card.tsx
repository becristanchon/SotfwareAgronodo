import Link from "next/link";
import { Metric } from "@/components/metric";
import type { Farm, Producer, ProducerProfile } from "@/lib/demo-data";

export function ProducerProfileCard({
  producer,
  profile,
  farms,
}: {
  producer: Producer;
  profile?: ProducerProfile;
  farms: Farm[];
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-4 p-5 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-slate-500">
            {producer.village}, {producer.municipality}
          </p>
          <h3 className="mt-1 break-words text-2xl font-semibold leading-tight">
            {producer.fullName}
          </h3>
          <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-slate-600">
            {profile?.story ?? producer.notes}
          </p>
        </div>

        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
            Confianza digital
          </p>
          <div className="mt-3 h-2 rounded-full bg-white">
            <div
              className="h-2 rounded-full bg-emerald-700"
              style={{ width: `${profile?.confidenceLevel ?? 35}%` }}
            />
          </div>
          <p className="mt-2 break-words text-sm font-semibold leading-tight text-emerald-950">
            {profile?.confidenceLevel ?? 35}% caracterizado
          </p>
        </div>
      </div>

      <div className="grid gap-3 border-t border-slate-100 p-5 sm:grid-cols-3">
        <Metric label="Fincas" value={String(farms.length)} />
        <Metric
          label="Cultivos"
          value={profile?.mainCrops.join(", ") ?? "Pendiente"}
        />
        <Metric label="Soporte" value={profile?.supportNeed ?? "Pendiente"} />
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {profile?.tags.map((tag) => (
            <span
              className="break-words rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          className="w-fit shrink-0 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          href={`/productores/${producer.id}`}
        >
          Ver caracterizacion
        </Link>
      </div>
    </article>
  );
}
