import type { Reading } from "@/lib/demo-data";

export function Sparkline({ readings }: { readings: Reading[] }) {
  if (readings.length === 0) {
    return <div className="h-16 rounded-md bg-slate-100" />;
  }

  const values = readings.map((reading) => reading.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = readings.length === 1 ? 0 : (index / (readings.length - 1)) * 100;
      const y = 42 - ((value - min) / range) * 34;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      aria-hidden="true"
      className="h-16 w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 48"
    >
      <polyline
        fill="none"
        points={points}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}
