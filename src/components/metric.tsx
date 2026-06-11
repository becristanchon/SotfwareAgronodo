export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md border border-slate-200 bg-white p-3">
      <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-lg font-semibold leading-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
