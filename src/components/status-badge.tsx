import type { PlotStatus } from "@/lib/demo-data";

const statusClassName: Record<PlotStatus, string> = {
  Estable: "bg-emerald-100 text-emerald-800",
  Atencion: "bg-amber-100 text-amber-800",
  Riesgo: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: PlotStatus }) {
  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${statusClassName[status]}`}
    >
      {status}
    </span>
  );
}
