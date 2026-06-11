import { NextResponse } from "next/server";
import { dataRepository, getDataSourceStatus } from "@/lib/data-repository";

export async function GET() {
  return NextResponse.json({
    data: await dataRepository.dashboard.get(),
    meta: getDataSourceStatus(),
  });
}
