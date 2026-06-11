import type { CropLiveStatus } from "@/lib/crop-live-state";

const visualByStatus: Record<
  CropLiveStatus,
  {
    stem: string;
    leaf: string;
    soil: string;
    ground: string;
    leafDrop: number;
    opacity: string;
    accent?: "dry" | "water" | "frost";
  }
> = {
  OPTIMAL: {
    stem: "#287a4a",
    leaf: "#2f9e58",
    soil: "#6f5137",
    ground: "#d9ead8",
    leafDrop: 0,
    opacity: "1",
  },
  LOW_MOISTURE: {
    stem: "#5f7f45",
    leaf: "#7aa35a",
    soil: "#9a6a3d",
    ground: "#efe4cf",
    leafDrop: 8,
    opacity: "0.92",
    accent: "dry",
  },
  WATER_STRESS: {
    stem: "#76623a",
    leaf: "#9a8a4a",
    soil: "#9b6139",
    ground: "#ead4b8",
    leafDrop: 18,
    opacity: "0.82",
    accent: "dry",
  },
  EXCESS_WATER: {
    stem: "#2d6f63",
    leaf: "#4f9a83",
    soil: "#4f5f69",
    ground: "#d9ecf4",
    leafDrop: 5,
    opacity: "0.95",
    accent: "water",
  },
  FROST_RISK: {
    stem: "#52736d",
    leaf: "#7fa69f",
    soil: "#65727a",
    ground: "#e2eef2",
    leafDrop: 7,
    opacity: "0.88",
    accent: "frost",
  },
  NO_DATA: {
    stem: "#7c817a",
    leaf: "#9aa397",
    soil: "#8a7a68",
    ground: "#e7e5df",
    leafDrop: 2,
    opacity: "0.62",
  },
};

export function CropVisual({ status }: { status: CropLiveStatus }) {
  const visual = visualByStatus[status];
  const leftLeafRotation = -24 - visual.leafDrop;
  const rightLeafRotation = 24 + visual.leafDrop;

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[4/3] min-h-[220px] items-end justify-center overflow-hidden rounded-lg border border-slate-200"
      style={{ background: visual.ground }}
    >
      {visual.accent === "frost" ? <FrostLayer /> : null}
      {visual.accent === "water" ? <WaterLayer /> : null}
      <div
        className="absolute bottom-0 h-16 w-full"
        style={{ background: visual.soil }}
      />
      {visual.accent === "dry" ? <DryCracks /> : null}

      <div className="relative z-10 mb-10 flex flex-col items-center" style={{ opacity: visual.opacity }}>
        <div
          className="h-32 w-4 rounded-full"
          style={{ background: visual.stem }}
        />
        <Leaf
          color={visual.leaf}
          className="absolute top-8 -left-20"
          rotation={leftLeafRotation}
        />
        <Leaf
          color={visual.leaf}
          className="absolute top-10 left-6"
          rotation={rightLeafRotation}
        />
        <Leaf
          color={visual.leaf}
          className="absolute top-0 -left-12"
          rotation={leftLeafRotation + 18}
          small
        />
        <Leaf
          color={visual.leaf}
          className="absolute top-2 left-2"
          rotation={rightLeafRotation - 18}
          small
        />
      </div>
    </div>
  );
}

function Leaf({
  color,
  className,
  rotation,
  small = false,
}: {
  color: string;
  className: string;
  rotation: number;
  small?: boolean;
}) {
  return (
    <div
      className={`${className} rounded-[100%_0]`}
      style={{
        background: color,
        height: small ? 42 : 58,
        transform: `rotate(${rotation}deg)`,
        width: small ? 78 : 112,
      }}
    />
  );
}

function DryCracks() {
  return (
    <div className="absolute bottom-6 z-10 flex w-full justify-center gap-8 text-[#6f432c]">
      <span className="h-8 w-px rotate-12 bg-current" />
      <span className="h-10 w-px -rotate-12 bg-current" />
      <span className="h-7 w-px rotate-6 bg-current" />
    </div>
  );
}

function WaterLayer() {
  return (
    <div className="absolute bottom-10 z-10 h-8 w-[86%] rounded-full bg-sky-300/45" />
  );
}

function FrostLayer() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-white/80 to-transparent" />
  );
}
