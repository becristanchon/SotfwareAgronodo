export type FormStatusState =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function FormStatus({ status }: { status: FormStatusState }) {
  if (status.type === "idle") {
    return null;
  }

  return (
    <div
      className={
        status.type === "success"
          ? "rounded-md bg-emerald-50 p-3 text-sm text-emerald-800"
          : "rounded-md bg-amber-50 p-3 text-sm text-amber-800"
      }
    >
      {status.message}
    </div>
  );
}
