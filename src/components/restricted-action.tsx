export function RestrictedAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
        Accion no disponible
      </p>
      <h3 className="mt-1 text-xl font-semibold text-amber-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-amber-900">{description}</p>
    </div>
  );
}
