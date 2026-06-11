import { NextRequest, NextResponse } from "next/server";
import {
  ensureDatabaseMode,
  readOnlyDemoResponse,
  validationErrorResponse,
} from "@/lib/api";
import { requireCapability } from "@/lib/authorization";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";
import { createPlotSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET() {
  return NextResponse.json({
    data: await dataRepository.plots.list(),
    meta: getDataSourceStatus(),
  });
}

export async function POST(request: NextRequest) {
  const forbidden = await requireCapability("manage_plots");

  if (forbidden) {
    return forbidden;
  }

  if (!ensureDatabaseMode()) {
    return readOnlyDemoResponse();
  }

  try {
    const input = createPlotSchema.parse(await request.json());
    const plot = await dataRepository.plots.create(input);

    return NextResponse.json(
      { data: plot, meta: getDataSourceStatus() },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    throw error;
  }
}
