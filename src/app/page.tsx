import { ActionCard } from "@/components/action-card";
import { AppShell } from "@/components/app-shell";
import { CropLiveStateCard } from "@/components/crop-live-state-card";
import { Metric } from "@/components/metric";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { TerritoryPanel } from "@/components/territory-panel";
import {
  farms,
  getDashboardSummary,
  getFarmHealth,
  getFarmPlots,
  getFarmProducer,
  getFarmWaterProfile,
  getNextActions,
  getPlotAlerts,
  getPlotSensors,
  plots,
} from "@/lib/demo-data";
import { getCropLiveState } from "@/lib/crop-live-state";
import { roleLabels, type ExperienceRole } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

const homeContentByRole: Record<
  ExperienceRole,
  {
    eyebrow: string;
    title: string;
    description: string;
    answerLabel: string;
    answer: string;
    reasonLabel: string;
    reason: string;
    impactLabel: string;
    sideTitle: string;
    sideEyebrow: string;
    actionsEyebrow: string;
    actionsTitle: string;
    territoryEyebrow: string;
    territoryTitle: string;
  }
> = {
  PRODUCER: {
    eyebrow: "Hoy en la finca",
    title: "Revisar riego en Lote Papa Criolla",
    description:
      "La humedad del suelo esta baja. Revise dos puntos del lote y aplique riego corto solo si el suelo sigue seco.",
    answerLabel: "Respuesta",
    answer: "Regar con cuidado",
    reasonLabel: "Motivo",
    reason: "Humedad baja",
    impactLabel: "Ahorro posible",
    sideEyebrow: "Agua esta semana",
    sideTitle: "Uso y ahorro estimado",
    actionsEyebrow: "Que hacer primero",
    actionsTitle: "Recomendaciones de hoy",
    territoryEyebrow: "Estado por finca",
    territoryTitle: "Agua, cultivo y riesgo",
  },
  FIELD_TECH: {
    eyebrow: "Seguimiento operativo",
    title: "Atender finca con riego en riesgo",
    description:
      "Priorice la visita al lote con humedad baja, confirme lectura en campo y deje registrada la accion tomada.",
    answerLabel: "Prioridad",
    answer: "Visita tecnica",
    reasonLabel: "Caso abierto",
    reason: "Riego por verificar",
    impactLabel: "Ahorro gestionable",
    sideEyebrow: "Operacion semanal",
    sideTitle: "Fincas, lecturas y alertas",
    actionsEyebrow: "Pendientes de campo",
    actionsTitle: "Casos por atender",
    territoryEyebrow: "Fincas asignadas",
    territoryTitle: "Seguimiento operativo",
  },
  AGRONOMIST: {
    eyebrow: "Diagnostico agronomico",
    title: "Validar patron de deficit hidrico",
    description:
      "Compare humedad de suelo, etapa del cultivo y tendencia historica antes de ajustar la regla de riego.",
    answerLabel: "Hipotesis",
    answer: "Deficit hidrico",
    reasonLabel: "Variable clave",
    reason: "Humedad suelo",
    impactLabel: "Ahorro estimado",
    sideEyebrow: "Analisis hidrico",
    sideTitle: "Tendencia y eficiencia",
    actionsEyebrow: "Analisis pendiente",
    actionsTitle: "Recomendaciones tecnicas",
    territoryEyebrow: "Comportamiento por finca",
    territoryTitle: "Riesgo y eficiencia hidrica",
  },
  INSTITUTION: {
    eyebrow: "Impacto territorial",
    title: "Medir ahorro hidrico potencial del piloto",
    description:
      "El piloto ya permite estimar uso de agua, riesgo por finca y potencial de ahorro para priorizar acompanamiento.",
    answerLabel: "Indicador",
    answer: "Ahorro potencial",
    reasonLabel: "Programa",
    reason: "Piloto activo",
    impactLabel: "Ahorro territorial",
    sideEyebrow: "Programa hidrico",
    sideTitle: "Cobertura e impacto",
    actionsEyebrow: "Gestion publica",
    actionsTitle: "Fincas que requieren apoyo",
    territoryEyebrow: "Territorio",
    territoryTitle: "Cobertura, agua y riesgo",
  },
  ADMIN: {
    eyebrow: "Operacion AgroNodo",
    title: "Supervisar salud del piloto hidrico",
    description:
      "Revise productores, fincas, recomendaciones activas y consistencia de datos antes de escalar el piloto.",
    answerLabel: "Estado",
    answer: "Piloto operativo",
    reasonLabel: "Foco",
    reason: "Gestion hidrica",
    impactLabel: "Ahorro proyectado",
    sideEyebrow: "Sistema",
    sideTitle: "Datos y operacion",
    actionsEyebrow: "Gestion prioritaria",
    actionsTitle: "Pendientes del sistema",
    territoryEyebrow: "Operacion por finca",
    territoryTitle: "Agua, datos y riesgo",
  },
};

function getStatsForRole({
  role,
  summary,
  estimatedUse,
  potentialSavings,
  averageWaterScore,
}: {
  role: ExperienceRole;
  summary: ReturnType<typeof getDashboardSummary>;
  estimatedUse: number;
  potentialSavings: number;
  averageWaterScore: number;
}) {
  const sharedWaterStats = [
    { label: "Agua usada", value: `${estimatedUse} m3` },
    { label: "Ahorro posible", value: `${potentialSavings} m3` },
    { label: "Eficiencia", value: `${averageWaterScore}/100` },
  ];

  if (role === "PRODUCER") {
    return [
      { label: "Mis fincas", value: String(summary.farms) },
      { label: "Mis lotes", value: String(summary.plots) },
      { label: "Acciones", value: String(summary.activeAlerts) },
      ...sharedWaterStats,
    ];
  }

  if (role === "FIELD_TECH") {
    return [
      { label: "Productores", value: String(summary.producers) },
      { label: "Fincas a cargo", value: String(summary.farms) },
      { label: "Casos abiertos", value: String(summary.activeAlerts) },
      ...sharedWaterStats,
    ];
  }

  if (role === "AGRONOMIST") {
    return [
      { label: "Lotes evaluados", value: String(summary.plots) },
      { label: "Mediciones", value: String(summary.readings) },
      { label: "Riesgos criticos", value: String(summary.criticalAlerts) },
      ...sharedWaterStats,
    ];
  }

  if (role === "INSTITUTION") {
    return [
      { label: "Productores", value: String(summary.producers) },
      { label: "Fincas activas", value: String(summary.farms) },
      { label: "Lotes cubiertos", value: String(summary.plots) },
      ...sharedWaterStats,
    ];
  }

  return [
    { label: "Productores", value: String(summary.producers) },
    { label: "Fincas", value: String(summary.farms) },
    { label: "Alertas", value: String(summary.activeAlerts) },
    ...sharedWaterStats,
  ];
}

export default async function Home() {
  const profile = await getCurrentProfile();
  const content = homeContentByRole[profile.role];
  const summary = getDashboardSummary();
  const nextActions = getNextActions();
  const farmHealth = getFarmHealth();
  const priorityPlot = plots.find((plot) => plot.status !== "Estable") ?? plots[0];
  const priorityCropState = getCropLiveState(priorityPlot);
  const waterProfiles = farms.flatMap((farm) => {
    const profile = getFarmWaterProfile(farm.id);

    return profile ? [profile] : [];
  });
  const estimatedUse = waterProfiles.reduce(
    (total, profile) => total + profile.estimatedWeeklyUseM3,
    0,
  );
  const potentialSavings = waterProfiles.reduce(
    (total, profile) => total + profile.potentialWeeklySavingsM3,
    0,
  );
  const averageWaterScore = Math.round(
    waterProfiles.reduce((total, profile) => total + profile.waterEfficiencyScore, 0) /
      Math.max(waterProfiles.length, 1),
  );
  const stats = getStatsForRole({
    role: profile.role,
    summary,
    estimatedUse,
    potentialSavings,
    averageWaterScore,
  });

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {content.eyebrow}
            </p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold text-slate-950">
              {content.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              {content.description}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
                  {content.answerLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-red-950">
                  {content.answer}
                </p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {content.reasonLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-amber-950">
                  {content.reason}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {content.impactLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-emerald-950">
                  {potentialSavings} m3/semana
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              {content.sideEyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{content.sideTitle}</h3>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-300">Vista activa</dt>
                <dd className="font-semibold">{roleLabels[profile.role]}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-300">Uso estimado</dt>
                <dd className="font-semibold">{estimatedUse} m3/sem</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <dt className="text-slate-300">Ahorro potencial</dt>
                <dd className="font-semibold">{potentialSavings} m3/sem</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-300">Lecturas hidricas</dt>
                <dd className="font-semibold">{summary.readings}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <CropLiveStateCard
          state={priorityCropState}
          showTechnical={profile.role !== "PRODUCER"}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                {content.actionsEyebrow}
              </p>
              <h2 className="text-2xl font-semibold">{content.actionsTitle}</h2>
            </div>
          </div>
          <div className="grid gap-4">
            {nextActions.map((action) => (
              <ActionCard
                context={action.context}
                key={action.id}
                reason={action.reason}
                recommendation={action.recommendation}
                severity={action.severity}
                title={action.title}
              />
            ))}
          </div>
        </div>

        <TerritoryPanel farms={farmHealth} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {content.territoryEyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-semibold">{content.territoryTitle}</h2>
        </div>

        {farms.map((farm) => {
          const producer = getFarmProducer(farm);
          const farmPlots = getFarmPlots(farm.id);

          return (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={farm.id}
            >
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {farm.village}, {farm.municipality}
                  </p>
                  <h3 className="text-xl font-semibold">{farm.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Productor: {producer?.fullName ?? "Sin productor"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Metric label="Altitud" value={`${farm.altitudeM} m`} />
                  <Metric label="Area" value={`${farm.areaHa} ha`} />
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {farmPlots.map((plot) => (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={plot.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">{plot.crop}</p>
                        <h4 className="font-semibold">{plot.name}</h4>
                      </div>
                      <StatusBadge status={plot.status} />
                    </div>
                    <div className="mt-4 grid gap-2">
                      <Metric
                        label="Humedad suelo"
                        value={`${plot.soilMoisture}%`}
                      />
                      <Metric
                        label="Temperatura"
                        value={`${plot.ambientTemperature} C`}
                      />
                      <Metric
                        label="Humedad ambiente"
                        value={`${plot.ambientHumidity}%`}
                      />
                      <Metric
                        label="Mediciones"
                        value={String(getPlotSensors(plot.id).length)}
                      />
                      <Metric
                        label="Alertas"
                        value={String(getPlotAlerts(plot.id).length)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </AppShell>
  );
}
