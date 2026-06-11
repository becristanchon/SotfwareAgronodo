"use client";

import { useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";
import type { AlertStatus } from "@/lib/demo-data";

const initialStatus: FormStatusState = { type: "idle", message: "" };

export function AlertActions({
  alertId,
  currentStatus,
}: {
  alertId: string;
  currentStatus: AlertStatus;
}) {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function updateStatus(nextStatus: "ACKNOWLEDGED" | "RESOLVED") {
    setIsSubmitting(true);
    setStatus(initialStatus);

    const response = await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alertId, status: nextStatus }),
    });

    if (response.ok) {
      setStatus({
        type: "success",
        message:
          nextStatus === "ACKNOWLEDGED"
            ? "Alerta marcada como revisada."
            : "Alerta marcada como resuelta.",
      });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible actualizar la alerta. Revisa el modo de datos.",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <div className="mt-5 grid gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
          disabled={isSubmitting || currentStatus !== "ACTIVE"}
          onClick={() => updateStatus("ACKNOWLEDGED")}
          type="button"
        >
          Marcar revisada
        </button>
        <button
          className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
          disabled={isSubmitting || currentStatus === "RESOLVED"}
          onClick={() => updateStatus("RESOLVED")}
          type="button"
        >
          Marcar resuelta
        </button>
      </div>
      <FormStatus status={status} />
    </div>
  );
}
