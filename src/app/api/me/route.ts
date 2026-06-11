import { NextResponse } from "next/server";
import { getDataSourceStatus } from "@/lib/data-repository";
import { getCurrentProfile } from "@/lib/session";

export async function GET() {
  return NextResponse.json({
    data: await getCurrentProfile(),
    meta: getDataSourceStatus(),
  });
}
