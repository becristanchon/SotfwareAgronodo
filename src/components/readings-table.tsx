import { sensorTypeLabel } from "@/components/sensor-type-label";
import type { Sensor } from "@/lib/demo-data";

export function ReadingsTable({ sensors }: { sensors: Sensor[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Inventario de series
        </p>
        <h2 className="text-xl font-semibold">Sensores con historico</h2>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="py-3 pr-4 font-semibold">Sensor</th>
              <th className="py-3 pr-4 font-semibold">Variable</th>
              <th className="py-3 pr-4 font-semibold">Estado</th>
              <th className="py-3 pr-4 font-semibold">Ultimo valor</th>
              <th className="py-3 pr-4 font-semibold">Ubicacion</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr className="border-b border-slate-100" key={sensor.id}>
                <td className="py-3 pr-4 font-medium text-slate-900">{sensor.name}</td>
                <td className="py-3 pr-4 text-slate-600">
                  {sensorTypeLabel(sensor.type)}
                </td>
                <td className="py-3 pr-4 text-slate-600">{sensor.status}</td>
                <td className="py-3 pr-4 text-slate-600">
                  {sensor.lastValue} {sensor.unit}
                </td>
                <td className="py-3 pr-4 text-slate-600">
                  {sensor.relativeLocation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
