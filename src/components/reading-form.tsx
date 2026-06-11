"use client";

import { FormEvent, useState } from "react";
import { FormStatus, type FormStatusState } from "@/components/form-status";
import { sensorTypeLabel } from "@/components/sensor-type-label";
import type { Sensor } from "@/lib/demo-data";

const initialStatus: FormStatusState = { type: "idle", message: "" };

export function ReadingForm({ sensors }: { sensors: Sensor[] }) {
  const [status, setStatus] = useState<FormStatusState>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSensorId, setSelectedSensorId] = useState(sensors[0]?.id ?? "");

  const selectedSensor = sensors.find((sensor) => sensor.id === selectedSensorId);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(form);
    const sensor = sensors.find(
      (item) => item.id === String(formData.get("sensorId") ?? ""),
    );

    const payload = {
      sensorId: String(formData.get("sensorId") ?? ""),
      value: String(formData.get("value") ?? ""),
      unit: sensor?.unit ?? "",
      origin: "MANUAL",
      takenAt: new Date().toISOString(),
    };

    const response = await fetch("/api/readings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      form.reset();
      setStatus({ type: "success", message: "Lectura registrada correctamente." });
    } else {
      const body = await response.json();
      setStatus({
        type: "error",
        message:
          body.message ??
          "No fue posible registrar la lectura. Revisa los campos e intenta de nuevo.",
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
          Nueva lectura manual
        </p>
        <h3 className="mt-1 text-xl font-semibold">Registrar medicion</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Sensor</span>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="sensorId"
            onChange={(event) => setSelectedSensorId(event.target.value)}
            value={selectedSensorId}
          >
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name} - {sensorTypeLabel(sensor.type)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium text-slate-700">
            Valor {selectedSensor ? `(${selectedSensor.unit})` : ""}
          </span>
          <input
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            name="value"
            required
            step="0.01"
            type="number"
          />
        </label>
      </div>
      <FormStatus status={status} />
      <button
        className="w-fit rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Guardando..." : "Registrar lectura"}
      </button>
    </form>
  );
}
