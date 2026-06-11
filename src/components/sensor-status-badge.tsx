import type { SensorStatus } from "@/lib/demo-data";

const status: Record<SensorStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Activo",
    className: "bg-emerald-100 text-emerald-800",
  },
  INACTIVE: {
    label: "Inactivo",
    className: "bg-slate-200 text-slate-700",
  },
  MAINTENANCE: {
    label: "Mantenimiento",
    className: "bg-amber-100 text-amber-800",
  },
};

export function SensorStatusBadge({ value }: { value: SensorStatus }) {
  const item = status[value];

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${item.className}`}
    >
      {item.label}
    </span>
  );
}
