import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Metric } from "@/components/metric";
import {
  capabilityLabels,
  crudPermissionMatrix,
  navigationByRole,
  roleDescriptions,
  roleLabels,
  type CurrentProfile,
  type ExperienceRole,
} from "@/lib/profile";
import { getDataSourceStatus } from "@/lib/data-repository";
import { getCurrentProfile } from "@/lib/session";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ acceso?: string }>;
}) {
  const profile = (await getCurrentProfile()) as CurrentProfile | null;
  const dataSource = getDataSourceStatus();
  const params = await searchParams;
  const accessLimited = params?.acceso === "limitado";
  const activeActions = profile ? getProfileActions(profile) : [];

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Identidad operativa
          </p>
          <h2 className="text-3xl font-semibold">Perfil</h2>
          <p className="max-w-2xl text-slate-600">
            AgroNodo adapta la misma informacion agricola segun la profundidad
            que necesita cada usuario.
          </p>
        </div>

        {accessLimited ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            Esta vista no esta disponible para el perfil activo. AgroNodo muestra
            solo la profundidad necesaria para cada usuario.
          </div>
        ) : null}

        {!profile ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
            No hay usuario configurado en la fuente de datos actual.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <article className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{profile.email}</p>
              <h3 className="mt-1 text-2xl font-semibold">{profile.name}</h3>
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">
                  {roleLabels[profile.role]}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {roleDescriptions[profile.role]}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Metric label="Vista activa" value={roleLabels[profile.role]} />
                <Metric label="Organizacion" value={profile.organization.name} />
                <Metric label="Modo datos" value={dataSource.mode} />
              </div>
            </article>

            <aside className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Capacidades
              </p>
              <div className="mt-4 grid gap-2">
                {profile.capabilities.map((capability) => (
                  <div
                    className="rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
                    key={capability}
                  >
                    {capabilityLabels[capability]}
                  </div>
                ))}
              </div>
            </aside>

            <article className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Acciones disponibles
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Que puede hacer este perfil
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {activeActions.length > 0 ? (
                  activeActions.map((action) => (
                    <Link
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 hover:bg-emerald-50"
                      href={action.href}
                      key={action.href}
                    >
                      <p className="font-semibold text-slate-900">{action.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {action.description}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-500">
                    Este perfil no tiene acciones operativas habilitadas.
                  </p>
                )}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Experiencia progresiva
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Una sola fuente de datos, varias formas de entenderla
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <div
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    key={role}
                  >
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {roleDescriptions[role as keyof typeof roleDescriptions]}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Navegacion principal
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {navigationByRole[role as keyof typeof navigationByRole][0].items
                        .map((item) => item.label)
                        .join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                CRUD por perfil
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Quien puede manejar cada modulo
              </h3>
              <div className="mt-4 grid gap-3">
                {crudPermissionMatrix.map((item) => (
                  <div
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    key={item.module}
                  >
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                      <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                        {item.module}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 md:grid-cols-4">
                      <CrudCell action="Consultar" roles={item.read} />
                      <CrudCell action="Crear" roles={item.create} />
                      <CrudCell action="Actualizar" roles={item.update} />
                      <CrudCell action="Eliminar" roles={item.delete} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        )}
      </section>
    </AppShell>
  );
}

function CrudCell({ action, roles }: { action: string; roles: ExperienceRole[] }) {
  return (
    <div className="rounded-md bg-white px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {action}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-700">
        {roles.length > 0
          ? roles.map((role) => roleLabels[role]).join(", ")
          : "No disponible"}
      </p>
    </div>
  );
}

function getProfileActions(profile: CurrentProfile) {
  const actions = [];

  if (profile.capabilities.includes("manage_producers")) {
    actions.push({
      href: "/productores",
      title: "Registrar productores",
      description: "Crear y revisar productores vinculados al piloto.",
    });
  }

  if (profile.capabilities.includes("manage_farms")) {
    actions.push({
      href: "/fincas",
      title: "Registrar fincas",
      description: "Crear unidades productivas y revisar prioridad hidrica.",
    });
  }

  if (profile.capabilities.includes("manage_plots")) {
    actions.push({
      href: "/lotes",
      title: "Registrar lotes",
      description: "Crear lotes y asociarlos a una finca.",
    });
  }

  if (profile.capabilities.includes("manage_sensors")) {
    actions.push({
      href: "/sensores",
      title: "Configurar dispositivos",
      description: "Crear sensores virtuales y preparar monitoreo.",
    });
  }

  if (profile.capabilities.includes("record_readings")) {
    actions.push({
      href: "/historicos",
      title: "Registrar mediciones",
      description: "Agregar lecturas manuales para pilotos sin hardware.",
    });
  }

  if (profile.capabilities.includes("manage_rules")) {
    actions.push({
      href: "/reglas",
      title: "Ajustar reglas",
      description: "Revisar y configurar umbrales tecnicos de alerta.",
    });
  }

  if (profile.capabilities.includes("manage_alerts")) {
    actions.push({
      href: "/alertas",
      title: "Atender recomendaciones",
      description: "Registrar decisiones de campo y cerrar el ciclo de accion.",
    });
  }

  if (profile.capabilities.includes("view_reports")) {
    actions.push({
      href: "/reporte",
      title: "Consultar reportes",
      description: "Ver avance, riesgos e impacto del piloto.",
    });
  }

  return actions;
}
