"use client";

import { FormEvent, useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";
import type { Farm } from "@/lib/demo-data";

const initialStatus: FormStatusState = { type: "idle", message: "" };

export function PlotForm({ farms }: { farms: Farm[] }) {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(form);
    const payload = {
      farmId: String(formData.get("farmId") ?? ""),
      name: String(formData.get("name") ?? ""),
      crop: String(formData.get("crop") ?? ""),
      areaHa: String(formData.get("areaHa") ?? ""),
      plantedAt: String(formData.get("plantedAt") ?? ""),
      status: String(formData.get("status") ?? "MONITORED"),
    };

    const response = await fetch("/api/plots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      form.reset();
      setStatus({ type: "success", message: "Lote creado correctamente." });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible crear el lote. Revisa los campos e intenta de nuevo.",
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
          Nuevo lote
        </p>
        <h3 className="mt-1 text-xl font-semibold">Registrar lote</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Finca</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="farmId"
            required
          >
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </label>
        <Field label="Nombre lote" name="name" required />
        <Field label="Cultivo" name="crop" required />
        <Field label="Area ha" name="areaHa" step="0.01" type="number" />
        <Field label="Fecha siembra" name="plantedAt" type="date" />
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Estado</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="status"
          >
            <option value="MONITORED">Monitoreado</option>
            <option value="Atencion">Atencion</option>
            <option value="Riesgo">Riesgo</option>
          </select>
        </label>
      </div>
      <FormStatus status={status} />
      <button
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Guardando..." : "Crear lote"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  step,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  step?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
        name={name}
        required={required}
        step={step}
        type={type}
      />
    </label>
  );
}
