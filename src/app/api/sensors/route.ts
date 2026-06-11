import { NextRequest, NextResponse } from "next/server";
import {
  ensureDatabaseMode,
  readOnlyDemoResponse,
  validationErrorResponse,
} from "@/lib/api";
import { requireCapability } from "@/lib/authorization";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";
import { createSensorSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET() {
  return NextResponse.json({
    data: await dataRepository.sensors.list(),
    meta: getDataSourceStatus(),
  });
}

export async function POST(request: NextRequest) {
  const forbidden = await requireCapability("manage_sensors");

  if (forbidden) {
    return forbidden;
  }

  if (!ensureDatabaseMode()) {
    return readOnlyDemoResponse();
  }

  try {
    const input = createSensorSchema.parse(await request.json());
    const sensor = await dataRepository.sensors.create(input);

    return NextResponse.json(
      { data: sensor, meta: getDataSourceStatus() },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    throw error;
  }
}
