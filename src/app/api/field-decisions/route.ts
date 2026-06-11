import { NextRequest, NextResponse } from "next/server";
import {
  ensureDatabaseMode,
  readOnlyDemoResponse,
  validationErrorResponse,
} from "@/lib/api";
import { requireCapability } from "@/lib/authorization";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";
import { getAuthenticatedUserId } from "@/lib/session";
import { createFieldDecisionSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const farmId = request.nextUrl.searchParams.get("farmId") ?? undefined;
  const plotId = request.nextUrl.searchParams.get("plotId") ?? undefined;
  const alertId = request.nextUrl.searchParams.get("alertId") ?? undefined;

  return NextResponse.json({
    data: await dataRepository.fieldDecisions.list({ farmId, plotId, alertId }),
    meta: getDataSourceStatus(),
  });
}

export async function POST(request: NextRequest) {
  const forbidden = await requireCapability("manage_alerts");

  if (forbidden) {
    return forbidden;
  }

  if (!ensureDatabaseMode()) {
    return readOnlyDemoResponse();
  }

  try {
    const input = createFieldDecisionSchema.parse(await request.json());
    const userId = await getAuthenticatedUserId();
    const decision = await dataRepository.fieldDecisions.create({
      ...input,
      userId: userId ?? undefined,
    });

    return NextResponse.json(
      { data: decision, meta: getDataSourceStatus() },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    throw error;
  }
}
