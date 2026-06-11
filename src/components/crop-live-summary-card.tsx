import Link from "next/link";
import { CropVisual } from "@/components/crop-visual";
import type { CropLiveState, CropLiveStatus } from "@/lib/crop-live-state";

const statusLabel: Record<CropLiveStatus, string> = {
  OPTIMAL: "Favorable",
  LOW_MOISTURE: "Necesita agua",
  WATER_STRESS: "Revisar riego",
  EXCESS_WATER: "Exceso posible",
  FROST_RISK: "Riesgo de frio",
  NO_DATA: "Sin datos",
};

const statusClassName: Record<CropLiveStatus, string> = {
  OPTIMAL: "bg-emerald-50 text-emerald-800",
  LOW_MOISTURE: "bg-amber-50 text-amber-800",
  WATER_STRESS: "bg-red-50 text-red-800",
  EXCESS_WATER: "bg-sky-50 text-sky-800",
  FROST_RISK: "bg-cyan-50 text-cyan-800",
  NO_DATA: "bg-slate-100 text-slate-700",
};

export function CropLiveSummaryCard({
  href,
  plotName,
  crop,
  state,
}: {
  href: string;
  plotName: string;
  crop: string;
  state: CropLiveState;
}) {
  return (
    <Link
      className="grid min-w-0 gap-3 rounded-lg border border-slate-200 bg-white p-3 hover:border-emerald-300 hover:bg-emerald-50"
      href={href}
    >
      <div className="h-32 overflow-hidden rounded-md">
        <CropVisual status={state.status} />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="break-words text-sm text-slate-500">{crop}</p>
            <h4 className="mt-1 break-words font-semibold leading-tight">
              {plotName}
            </h4>
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${statusClassName[state.status]}`}
          >
            {statusLabel[state.status]}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{state.title}</p>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2 text-sm">
          <span className="text-slate-500">{state.primaryVariable}</span>
          <span className="font-semibold text-slate-900">{state.primaryValue}</span>
        </div>
      </div>
    </Link>
  );
}
