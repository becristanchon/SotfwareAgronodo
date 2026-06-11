"use client";

import { useState } from "react";
import type { FieldDecisionStatus } from "@/lib/field-decisions";

const decisionOptions: Array<{
  status: FieldDecisionStatus;
  label: string;
  description: string;
}> = [
  {
    status: "APPLIED",
    label: "Accion aplicada",
    description: "La recomendacion se ejecuto en campo.",
  },
  {
    status: "PENDING_REVIEW",
    label: "Queda en revision",
    description: "Se necesita revisar suelo, clima o cultivo antes de decidir.",
  },
  {
    status: "DISCARDED",
    label: "No se aplico",
    description: "El productor o tecnico decidio no ejecutar la recomendacion.",
  },
];

export function FieldDecisionRecorder({
  recommendation,
  farmId,
  plotId,
  alertId,
}: {
  recommendation: string;
  farmId?: string;
  plotId?: string;
  alertId?: string;
}) {
  const [selectedStatus, setSelectedStatus] =
    useState<FieldDecisionStatus>("PENDING_REVIEW");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  async function confirmDecision() {
    setSaved(false);
    setMessage("");

    if (!farmId || !plotId) {
      setSaved(true);
      setMessage("Decision confirmada solo en pantalla: faltan finca o lote para persistir.");
      return;
    }

    const response = await fetch("/api/field-decisions", {
      body: JSON.stringify({
        farmId,
        plotId,
        alertId,
        status: selectedStatus,
        title: decisionOptions.find((option) => option.status === selectedStatus)?.label,
        actionTaken: note.trim() || recommendation,
        reason: note.trim() || "Decision registrada desde recomendacion AgroNodo.",
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (response.ok) {
      setSaved(true);
      setMessage("Decision guardada correctamente.");
      return;
    }

    const body = await response.json().catch(() => null);
    setSaved(true);
    setMessage(
      body?.message ??
        "Decision confirmada en pantalla. La persistencia quedara activa con PostgreSQL.",
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-800">
        Registrar decision de campo
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Recomendacion base: {recommendation}
      </p>

      <div className="mt-4 grid gap-2 lg:grid-cols-3">
        {decisionOptions.map((option) => (
          <button
            className={`rounded-md border px-3 py-3 text-left text-sm ${
              selectedStatus === option.status
                ? "border-emerald-500 bg-emerald-50 text-emerald-950"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
            key={option.status}
            onClick={() => {
              setSelectedStatus(option.status);
              setSaved(false);
            }}
            type="button"
          >
            <span className="block font-semibold">{option.label}</span>
            <span className="mt-1 block text-xs leading-5">{option.description}</span>
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-700">
          Observacion breve
        </span>
        <textarea
          className="mt-2 min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          onChange={(event) => {
            setNote(event.target.value);
            setSaved(false);
          }}
          placeholder="Ejemplo: se reviso humedad manual y se aplico riego corto en la zona baja."
          value={note}
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">
          Modo demo: esta decision se confirma en pantalla, pero aun no se guarda en
          base de datos.
        </p>
        <button
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          onClick={confirmDecision}
          type="button"
        >
          Confirmar decision
        </button>
      </div>

      {saved ? (
        <div className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900">
          {message || `Decision registrada: ${selectedStatus}`}
          {note.trim() ? ` - ${note.trim()}` : ""}
        </div>
      ) : null}
    </div>
  );
}
