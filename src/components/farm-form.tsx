"use client";

import { FormEvent, useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";
import type { Producer } from "@/lib/demo-data";

const initialStatus: FormStatusState = { type: "idle", message: "" };

export function FarmForm({ producers }: { producers: Producer[] }) {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(event.currentTarget);
    const payload = {
      producerId: String(formData.get("producerId") ?? ""),
      name: String(formData.get("name") ?? ""),
      municipality: String(formData.get("municipality") ?? ""),
      village: String(formData.get("village") ?? ""),
      altitudeM: String(formData.get("altitudeM") ?? ""),
      areaHa: String(formData.get("areaHa") ?? ""),
    };

    const response = await fetch("/api/farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus({ type: "success", message: "Finca creada correctamente." });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible crear la finca. Revisa los campos e intenta de nuevo.",
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
          Nueva finca
        </p>
        <h3 className="mt-1 text-xl font-semibold">Registrar finca</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">Productor</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="producerId"
            required
          >
            {producers.map((producer) => (
              <option key={producer.id} value={producer.id}>
                {producer.fullName}
              </option>
            ))}
          </select>
        </label>
        <Field label="Nombre finca" name="name" required />
        <Field label="Municipio" name="municipality" />
        <Field label="Vereda" name="village" />
        <Field label="Altitud m" name="altitudeM" type="number" />
        <Field label="Area ha" name="areaHa" step="0.01" type="number" />
      </div>
      <FormStatus status={status} />
      <button
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Guardando..." : "Crear finca"}
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
