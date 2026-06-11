import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { CropLiveSummaryCard } from "@/components/crop-live-summary-card";
import { FarmPriorityPanel } from "@/components/farm-priority-panel";
import { FieldDecisionTimeline } from "@/components/field-decision-timeline";
import { Metric } from "@/components/metric";
import {
  farms,
  getFarmMaturity,
  getFarmPlots,
  getFarmProducer,
  getFarmProfile,
  getFarmWaterProfile,
  type FarmMaturityStatus,
} from "@/lib/demo-data";
import { getCropLiveState } from "@/lib/crop-live-state";
import { dataRepository } from "@/lib/data-repository";
import { getFarmLiveSummary } from "@/lib/farm-live-summary";
import type { FieldDecision } from "@/lib/field-decisions";

export function generateStaticParams() {
  return farms.map((farm) => ({ farmId: farm.id }));
}

export default async function FarmDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ farmId: string }>;
  searchParams?: Promise<{ paso?: string }>;
}) {
  const { farmId } = await params;
  const query = await searchParams;
  const farm = farms.find((item) => item.id === farmId);

  if (!farm) {
    return (
      <AppShell>
        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            Finca no encontrada.
          </div>
        </section>
      </AppShell>
    );
  }

  const producer = getFarmProducer(farm);
  const profile = getFarmProfile(farm.id);
  const maturity = getFarmMaturity(farm.id);
  const waterProfile = getFarmWaterProfile(farm.id);
  const plots = getFarmPlots(farm.id);
  const farmSummary = getFarmLiveSummary(farm);
  const fieldDecisions = (await dataRepository.fieldDecisions.list({
    farmId: farm.id,
  })) as FieldDecision[];
  const stages = maturity?.stages ?? [];
  const requestedStep = Number(query?.paso ?? maturity?.currentLevel ?? 0);
  const safeStep = Number.isFinite(requestedStep)
    ? Math.min(Math.max(requestedStep, 0), Math.max(stages.length - 1, 0))
    : 0;
  const selectedStage = stages[safeStep] ?? stages[0];
  const nextStage = stages[safeStep + 1];
  const previousStage = stages[safeStep - 1];
  const completedCount = selectedStage?.completedCriteria.length ?? 0;
  const pendingCount = selectedStage?.pendingCriteria.length ?? 0;

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Link className="text-sm font-semibold text-emerald-700" href="/fincas">
          Volver a fincas
        </Link>

        <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Guia hidrica AgroNodo
              </p>
              <h2 className="mt-2 break-words text-3xl font-semibold leading-tight lg:text-4xl">
                {farm.name}
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                {profile?.shortStory}
              </p>
            </div>

            <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Estado actual
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-emerald-950">
                {maturity?.currentStageName ?? "Registrada"}
              </h3>
              <p className="mt-2 text-sm text-emerald-900">
                Eficiencia hidrica: {waterProfile?.waterEfficiencyScore ?? 0}/100
              </p>
              <div className="mt-3 h-2 rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-emerald-700"
                  style={{ width: `${waterProfile?.waterEfficiencyScore ?? 0}%` }}
                />
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <Metric label="Productor" value={producer?.fullName ?? "Sin productor"} />
          <Metric label="Ubicacion" value={`${farm.village}, ${farm.municipality}`} />
          <Metric label="Area" value={`${farm.areaHa} ha`} />
          <Metric
            label="Uso estimado"
            value={`${waterProfile?.estimatedWeeklyUseM3 ?? 0} m3/sem`}
          />
          <Metric
            label="Ahorro posible"
            value={`${waterProfile?.potentialWeeklySavingsM3 ?? 0} m3/sem`}
          />
        </div>

        <div className="mt-6">
          <FarmPriorityPanel summary={farmSummary} />
        </div>

        {selectedStage ? (
          <section className="mt-6 min-w-0 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  Paso seleccionado
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-emerald-950">
                  {selectedStage.name}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-emerald-900">
                  {selectedStage.objective}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[360px]">
                <StepFact label="Avance" value={`${selectedStage.score}%`} />
                <StepFact label="Listas" value={String(completedCount)} />
                <StepFact label="Pendientes" value={String(pendingCount)} />
              </div>
            </div>
          </section>
        ) : null}

          <section className="mt-6 min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Ciclo de gestion hidrica
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                De caracterizacion a ahorro comprobado
              </h3>
            </div>
            <p className="text-sm text-slate-500">
              Selecciona un paso para revisar evidencia sobre agua y riego.
            </p>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {stages.map((stage, index) => (
              <Link
                className={`min-w-[168px] rounded-lg border p-3 ${
                  index === safeStep
                    ? "border-emerald-400 bg-emerald-50"
                    : stage.status === "COMPLETED"
                      ? "border-slate-200 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
                href={`/fincas/${farm.id}?paso=${index}`}
                key={stage.key}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      index === safeStep
                        ? "bg-emerald-700 text-white"
                        : stage.status === "COMPLETED"
                          ? "bg-slate-950 text-white"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {stageStatusLabel(stage.status)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-tight">
                  {stage.name}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {selectedStage ? (
          <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-0 xl:grid-cols-[340px_1fr]">
              <aside className="min-w-0 border-b border-slate-200 bg-slate-50 p-5 xl:border-b-0 xl:border-r">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Paso {safeStep + 1} de {stages.length}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{selectedStage.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Revisa que evidencias ya existen y que falta para que la finca avance.
                </p>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">Avance</span>
                    <span className="font-semibold text-emerald-700">
                      {selectedStage.score}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-emerald-700"
                      style={{ width: `${selectedStage.score}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <StepFact label="Estado" value={stageStatusLabel(selectedStage.status)} />
                  <StepFact label="Evidencias listas" value={String(completedCount)} />
                  <StepFact label="Pendientes" value={String(pendingCount)} />
                </div>
              </aside>

              <div className="min-w-0 p-5">
                <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        Objetivo del paso
                      </p>
                      <h4 className="mt-2 break-words text-xl font-semibold leading-tight">
                        {selectedStage.name}
                      </h4>
                      <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-600">
                        {selectedStage.objective}
                      </p>
                    </div>
                    <div className="grid min-w-0 gap-2 lg:min-w-[220px]">
                      {selectedStage.indicators.map((indicator) => (
                        <div
                          className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-3 py-2 text-sm"
                          key={indicator.label}
                        >
                          <span className="text-slate-500">{indicator.label}</span>
                          <span className="font-semibold">{indicator.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <EvidenceList
                    items={selectedStage.completedCriteria}
                    tone="done"
                    title="Evidencia registrada"
                  />
                  <EvidenceList
                    items={selectedStage.pendingCriteria}
                    tone="pending"
                    title="Evidencia pendiente"
                  />
                </div>

                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                    Proxima accion
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-950">
                    {selectedStage.status === "IN_PROGRESS"
                    ? maturity?.nextRecommendedAction
                      : nextStage
                        ? `Preparar evidencia para avanzar hacia ${nextStage.name}.`
                        : "La finca esta lista para evaluacion y seguimiento institucional."}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {previousStage ? (
                    <Link
                      className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                      href={`/fincas/${farm.id}?paso=${safeStep - 1}`}
                    >
                      Paso anterior
                    </Link>
                  ) : (
                    <span />
                  )}
                  {nextStage ? (
                    <Link
                      className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                      href={`/fincas/${farm.id}?paso=${safeStep + 1}`}
                    >
                      Siguiente paso
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Indice hidrico AgroNodo
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                Salud de la gestion del agua
              </h3>
            </div>
            <p className="text-sm text-slate-500">
              Resume caracterizacion, monitoreo, decisiones de riego y ahorro.
            </p>
          </div>
          <div className="mt-5 grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-6">
            <ScoreCard label="Caracterizacion" value={maturity?.characterizationScore} />
            <ScoreCard label="Monitoreo" value={maturity?.monitoringScore} />
            <ScoreCard label="Recomendaciones" value={maturity?.dataUsageScore} />
            <ScoreCard label="Riego" value={maturity?.implementationScore} />
            <ScoreCard label="Ahorro" value={maturity?.impactScore} />
            <ScoreCard label="Adopcion" value={maturity?.trainingScore} />
          </div>
        </section>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Estado vivo por lote
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Comparacion rapida del estado hidrico y productivo de cada lote.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {plots.map((plot) => (
                <CropLiveSummaryCard
                  crop={plot.crop}
                  href={`/lotes/${plot.id}`}
                  key={plot.id}
                  plotName={plot.name}
                  state={getCropLiveState(plot)}
                />
              ))}
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Historial reciente
            </p>
            <div className="mt-4 grid gap-4">
              {maturity?.transformationEvents.map((event) => (
                <div className="border-l-2 border-emerald-200 pl-4" key={event.id}>
                  <p className="text-xs font-semibold text-slate-500">{event.date}</p>
                  <p className="mt-1 font-semibold">{event.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {event.detail}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-6">
          <FieldDecisionTimeline
            decisions={fieldDecisions}
            title="Decisiones recientes de la finca"
          />
        </div>
      </section>
    </AppShell>
  );
}

function ScoreCard({ label, value = 0 }: { label: string; value?: number }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="shrink-0 text-sm font-semibold text-emerald-700">{value}%</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-emerald-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StepFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md border border-slate-200 bg-white px-3 py-2">
      <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold leading-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

function EvidenceList({
  items,
  title,
  tone,
}: {
  items: string[];
  title: string;
  tone: "done" | "pending";
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <p
              className={`break-words rounded-md px-3 py-2 text-sm leading-6 ${
                tone === "done"
                  ? "bg-emerald-50 text-emerald-950"
                  : "bg-slate-50 text-slate-700"
              }`}
              key={item}
            >
              {item}
            </p>
          ))
        ) : (
          <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-500">
            Sin registros.
          </p>
        )}
      </div>
    </div>
  );
}

function stageStatusLabel(status: FarmMaturityStatus) {
  const labels: Record<FarmMaturityStatus, string> = {
    BLOCKED: "Bloqueado",
    COMPLETED: "Completado",
    IN_PROGRESS: "En curso",
    PENDING: "Pendiente",
  };

  return labels[status];
}
