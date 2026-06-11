import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import {
  farmProfiles,
  farms,
  producerProfiles,
  producers,
} from "@/lib/demo-data";

const characterizationSteps = [
  {
    title: "Productor",
    description:
      "Forma de decidir riego, acceso tecnologico, cultivos y necesidades de apoyo.",
    href: "/productores",
    status: "Activo",
  },
  {
    title: "Finca",
    description:
      "Fuente de agua, suelo, metodo de riego, disponibilidad y reto hidrico.",
    href: "/fincas",
    status: "Activo",
  },
  {
    title: "Lote",
    description:
      "Cultivo, etapa, humedad, necesidad de agua y recomendacion de riego.",
    href: "/lotes",
    status: "Activo",
  },
  {
    title: "Reglas",
    description:
      "Umbrales para deficit hidrico, exceso de humedad y decisiones de riego.",
    href: "/reglas",
    status: "Activo",
  },
];

export default function CharacterizationPage() {
  const producerProgress = Math.round(
    (producerProfiles.length / producers.length) * 100,
  );
  const farmProgress = Math.round((farmProfiles.length / farms.length) * 100);

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="h-3 bg-gradient-to-r from-emerald-700 via-lime-500 to-sky-500" />
          <div className="grid gap-6 p-6 xl:grid-cols-[1fr_360px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Modulo transversal
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Caracterizacion hidrica AgroNodo
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Aqui se registra como una finca accede al agua, como riega,
                que riesgos tiene y que evidencia necesita para ahorrar agua.
              </p>
            </div>

            <aside className="rounded-lg bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Principio CTO
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-950">
                Primero entendemos el uso del agua. Luego usamos sensores,
                alertas y recomendaciones para mejorar decisiones de riego.
              </p>
            </aside>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard label="Productores caracterizados" value={`${producerProgress}%`} />
          <StatCard label="Fincas caracterizadas" value={`${farmProgress}%`} />
          <StatCard label="Lotes con contexto" value="100%" />
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Secuencia de registro
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                De finca registrada a ahorro hidrico
              </h3>
            </div>
            <p className="text-sm text-slate-500">
              Cada capa agrega evidencia para decidir mejor sobre el agua.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {characterizationSteps.map((step, index) => (
              <Link
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 hover:bg-emerald-50"
                href={step.href}
                key={step.title}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {step.status}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Donde se registra
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              En el MVP vive dentro de Productores, Fincas y Lotes
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Este hub ordena la experiencia, pero los datos se capturan desde
              productor, finca y lote. En base de datos evolucionara a perfiles
              hidricos relacionados con Producer, Farm y Plot.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Interactividad
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              Agua antes que decoracion
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              La experiencia debe mostrar evidencia de uso del agua, decisiones
              de riego y ahorro potencial antes que graficas decorativas.
            </p>
          </div>
        </section>
      </section>
    </AppShell>
  );
}
