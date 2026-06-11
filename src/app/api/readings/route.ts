import { NextRequest, NextResponse } from "next/server";
import {
  ensureDatabaseMode,
  readOnlyDemoResponse,
  validationErrorResponse,
} from "@/lib/api";
import { requireCapability } from "@/lib/authorization";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";
import { createReadingSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const sensorId = request.nextUrl.searchParams.get("sensorId");

  return NextResponse.json({
    data: await dataRepository.readings.list(sensorId ?? undefined),
    meta: getDataSourceStatus(),
  });
}

export async function POST(request: NextRequest) {
  const forbidden = await requireCapability("record_readings");

  if (forbidden) {
    return forbidden;
  }

  if (!ensureDatabaseMode()) {
    return readOnlyDemoResponse();
  }

  try {
    const input = createReadingSchema.parse(await request.json());
    const reading = await dataRepository.readings.create(input);

    return NextResponse.json(
      { data: reading, meta: getDataSourceStatus() },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error);
    }

    throw error;
  }
}
