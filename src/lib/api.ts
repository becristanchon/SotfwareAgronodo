import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getDataSourceMode, getDataSourceStatus } from "@/lib/data-repository";

export function readOnlyDemoResponse() {
  return NextResponse.json(
    {
      error: "READ_ONLY_DEMO_MODE",
      message:
        "AgroNodo esta en modo demo. Cambia AGRONODO_DATA_SOURCE=database para crear registros persistentes.",
      meta: getDataSourceStatus(),
    },
    { status: 409 },
  );
}

export function ensureDatabaseMode() {
  return getDataSourceMode() === "database";
}

export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      error: "VALIDATION_ERROR",
      issues: error.flatten(),
      meta: getDataSourceStatus(),
    },
    { status: 422 },
  );
}
