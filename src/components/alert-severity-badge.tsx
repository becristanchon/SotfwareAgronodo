import type { AlertSeverity } from "@/lib/demo-data";

const severity: Record<AlertSeverity, { label: string; className: string }> = {
  LOW: {
    label: "Baja",
    className: "bg-slate-100 text-slate-700",
  },
  MEDIUM: {
    label: "Media",
    className: "bg-amber-100 text-amber-800",
  },
  HIGH: {
    label: "Alta",
    className: "bg-orange-100 text-orange-800",
  },
  CRITICAL: {
    label: "Critica",
    className: "bg-red-100 text-red-800",
  },
};

export function AlertSeverityBadge({ value }: { value: AlertSeverity }) {
  const item = severity[value];

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${item.className}`}
    >
      {item.label}
    </span>
  );
}
