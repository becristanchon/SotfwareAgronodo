"use client";

import { FormEvent, useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";

const initialStatus: FormStatusState = { type: "idle", message: "" };

export function ProducerForm() {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(event.currentTarget);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      documentNumber: String(formData.get("documentNumber") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      municipality: String(formData.get("municipality") ?? ""),
      village: String(formData.get("village") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    const response = await fetch("/api/producers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus({ type: "success", message: "Productor creado correctamente." });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible crear el productor. Revisa los campos e intenta de nuevo.",
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
          Nuevo productor
        </p>
        <h3 className="mt-1 text-xl font-semibold">Registrar productor</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nombre completo" name="fullName" required />
        <Field label="Documento" name="documentNumber" />
        <Field label="Telefono" name="phone" />
        <Field label="Municipio" name="municipality" />
        <Field label="Vereda" name="village" />
      </div>
      <label className="grid gap-1 text-sm">
        <span className="font-medium text-slate-700">Notas</span>
        <textarea
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
          name="notes"
        />
      </label>
      <FormStatus status={status} />
      <button
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Guardando..." : "Crear productor"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input
        className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
        name={name}
        required={required}
      />
    </label>
  );
}
