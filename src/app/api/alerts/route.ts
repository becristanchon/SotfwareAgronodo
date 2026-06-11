import { NextRequest, NextResponse } from "next/server";
import {
  ensureDatabaseMode,
  readOnlyDemoResponse,
  validationErrorResponse,
} from "@/lib/api";
import { requireCapability } from "@/lib/authorization";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";
import { updateAlertStatusSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const plotId = request.nextUrl.searchParams.get("plotId");
  const status = request.nextUrl.searchParams.get("status");

  return NextResponse.json({
    data: await dataRepository.alerts.list({
      plotId: plotId ?? undefined,
      status: status ?? undefined,
    }),
    meta: getDataSourceStatus(),
  });
}

export async function PATCH(request: NextRequest) {
  const forbidden = await requireCapability("manage_alerts");

  if (forbidden) {
    return forbidden;
  }

  if (!ensureDatabaseMode()) {
    return readOnlyDemoResponse();
  }

  try {
    const input = updateAlertStatusSchema.parse(await request.json());
    const alert = await dataRepository.alerts.updateStatus(input);

    return NextResponse.json({
      data: alert,
      meta: getDataSourceStatus(),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    throw error;
  }
}
