"use client";

import { FormEvent, useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";
import type { Plot, SensorType } from "@/lib/demo-data";

const initialStatus: FormStatusState = { type: "idle", message: "" };

const unitByType: Record<SensorType, string> = {
  SOIL_MOISTURE: "%",
  AMBIENT_TEMPERATURE: "C",
  AMBIENT_HUMIDITY: "%",
};

export function SensorForm({ plots }: { plots: Plot[] }) {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sensorType, setSensorType] = useState<SensorType>("SOIL_MOISTURE");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(event.currentTarget);
    const type = String(formData.get("type") ?? "SOIL_MOISTURE") as SensorType;

    const payload = {
      plotId: String(formData.get("plotId") ?? ""),
      name: String(formData.get("name") ?? ""),
      type,
      unit: unitByType[type],
      status: String(formData.get("status") ?? "ACTIVE"),
      relativeLocation: String(formData.get("relativeLocation") ?? ""),
    };

    const response = await fetch("/api/sensors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      event.currentTarget.reset();
      setSensorType("SOIL_MOISTURE");
      setStatus({ type: "success", message: "Sensor creado correctamente." });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible crear el sensor. Revisa los campos e intenta de nuevo.",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5"
      onSubmit={onSubmit}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Nuevo sensor virtual
        </p>
        <h3 className="mt-1 text-xl font-semibold">Configurar sensor</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Lote</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="plotId"
            required
          >
            {plots.map((plot) => (
              <option key={plot.id} value={plot.id}>
                {plot.name} - {plot.crop}
              </option>
            ))}
          </select>
        </label>
        <Field label="Nombre sensor" name="name" required />
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Variable</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="type"
            onChange={(event) => setSensorType(event.target.value as SensorType)}
            value={sensorType}
          >
            <option value="SOIL_MOISTURE">Humedad del suelo</option>
            <option value="AMBIENT_TEMPERATURE">Temperatura ambiente</option>
            <option value="AMBIENT_HUMIDITY">Humedad ambiental</option>
          </select>
        </label>
        <Field label="Unidad" name="unitPreview" readOnly value={unitByType[sensorType]} />
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Estado</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="status"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
            <option value="MAINTENANCE">Mantenimiento</option>
          </select>
        </label>
        <Field label="Ubicacion relativa" name="relativeLocation" />
      </div>
      <FormStatus status={status} />
      <button
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Guardando..." : "Crear sensor"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  readOnly,
  required,
  value,
}: {
  label: string;
  name: string;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600 read-only:bg-slate-100"
        name={name}
        readOnly={readOnly}
        required={required}
        value={value}
      />
    </label>
  );
}
