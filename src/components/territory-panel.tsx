import { StatusBadge } from "@/components/status-badge";
import type { FarmHealth } from "@/lib/demo-data";

export function TerritoryPanel({ farms }: { farms: FarmHealth[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Cobertura territorial
        </p>
        <h2 className="text-xl font-semibold">Boyaca - Piloto pre-MVP</h2>
      </div>
      <div className="mt-5 grid gap-3">
        {farms.map((farm) => (
          <div
            className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_auto]"
            key={farm.farmId}
          >
            <div>
              <p className="text-sm font-semibold">{farm.farmName}</p>
              <p className="mt-1 text-sm text-slate-600">
                {farm.producerName} - {farm.municipality}
              </p>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div
                  className={
                    farm.status === "Riesgo"
                      ? "h-2 rounded-full bg-red-500"
                      : farm.status === "Atencion"
                        ? "h-2 rounded-full bg-amber-500"
                        : "h-2 rounded-full bg-emerald-600"
                  }
                  style={{
                    width:
                      farm.status === "Riesgo"
                        ? "88%"
                        : farm.status === "Atencion"
                          ? "62%"
                          : "36%",
                  }}
                />
              </div>
            </div>
            <div className="flex items-start justify-between gap-3 sm:block sm:text-right">
              <StatusBadge status={farm.status} />
              <p className="mt-2 text-sm text-slate-600">
                {farm.activeAlerts} alertas - {farm.sensors} sensores
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
