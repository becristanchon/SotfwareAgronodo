const labelByDirection = {
  up: "Sube",
  down: "Baja",
  stable: "Estable",
};

const classByDirection = {
  up: "bg-amber-100 text-amber-800",
  down: "bg-sky-100 text-sky-800",
  stable: "bg-slate-100 text-slate-700",
};

export function TrendBadge({
  delta,
  direction,
  unit,
}: {
  delta: number;
  direction: "up" | "down" | "stable";
  unit: string;
}) {
  const sign = delta > 0 ? "+" : "";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${classByDirection[direction]}`}
    >
      {labelByDirection[direction]} {sign}
      {delta} {unit}
    </span>
  );
}
