import type { AlertStatus } from "@/lib/demo-data";

const status: Record<AlertStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Activa",
    className: "bg-red-100 text-red-800",
  },
  ACKNOWLEDGED: {
    label: "Revisada",
    className: "bg-sky-100 text-sky-800",
  },
  RESOLVED: {
    label: "Resuelta",
    className: "bg-emerald-100 text-emerald-800",
  },
};

export function AlertStatusBadge({ value }: { value: AlertStatus }) {
  const item = status[value];

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${item.className}`}
    >
      {item.label}
    </span>
  );
}
