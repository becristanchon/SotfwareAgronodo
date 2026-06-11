"use client";

import { useMemo, useState } from "react";
import { sensorTypeLabel } from "@/components/sensor-type-label";
import type { AlertRule } from "@/lib/demo-data";

export function AlertRuleCard({
  rule,
  editable = false,
}: {
  rule: AlertRule;
  editable?: boolean;
}) {
  const [enabled, setEnabled] = useState(rule.enabled);
  const [warning, setWarning] = useState(rule.warningThreshold);
  const [critical, setCritical] = useState(rule.criticalThreshold);

  const preview = useMemo(() => {
    const operator = rule.operator === "LESS_THAN" ? "menor que" : "mayor que";

    return {
      warning: `Advertencia si ${operator} ${warning} ${rule.unit}`,
      critical: `Critica si ${operator} ${critical} ${rule.unit}`,
    };
  }, [critical, rule.operator, rule.unit, warning]);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">{sensorTypeLabel(rule.sensorType)}</p>
          <h3 className="mt-1 text-xl font-semibold">{rule.name}</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {rule.description}
          </p>
        </div>
        <label className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium">
          <input
            checked={enabled}
            className="h-4 w-4 accent-emerald-700"
            disabled={!editable}
            onChange={(event) => setEnabled(event.target.checked)}
            type="checkbox"
          />
          {enabled ? "Activa" : "Inactiva"}
        </label>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ThresholdSlider
          label="Umbral de advertencia"
          max={rule.max}
          min={rule.min}
          onChange={editable ? setWarning : undefined}
          readOnly={!editable}
          step={rule.step}
          unit={rule.unit}
          value={warning}
        />
        <ThresholdSlider
          label="Umbral critico"
          max={rule.max}
          min={rule.min}
          onChange={editable ? setCritical : undefined}
          readOnly={!editable}
          step={rule.step}
          unit={rule.unit}
          value={critical}
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Advertencia
          </p>
          <p className="mt-1 text-sm font-medium text-amber-950">
            {preview.warning}
          </p>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
            Critico
          </p>
          <p className="mt-1 text-sm font-medium text-red-950">
            {preview.critical}
          </p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Alcance
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {rule.scope === "GLOBAL" ? "Todos los lotes" : "Lote especifico"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md bg-slate-950 p-3 text-sm text-white">
        {editable
          ? "Vista demo: los ajustes modifican esta tarjeta, pero se persistiran cuando activemos PostgreSQL."
          : "Vista de consulta: este perfil puede revisar reglas, pero no modificar umbrales tecnicos."}
      </div>
    </article>
  );
}

function ThresholdSlider({
  label,
  max,
  min,
  onChange,
  readOnly = false,
  step,
  unit,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  step: number;
  unit: string;
  value: number;
}) {
  return (
    <label className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-semibold">
          {value} {unit}
        </span>
      </div>
      <input
        className="h-2 w-full accent-emerald-700 disabled:opacity-60"
        disabled={readOnly}
        max={max}
        min={min}
        onChange={(event) => onChange?.(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </label>
  );
}
