export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-2xl font-semibold leading-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
