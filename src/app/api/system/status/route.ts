import { NextResponse } from "next/server";
import { getDataSourceStatus } from "@/lib/data-repository";

export function GET() {
  return NextResponse.json({
    data: {
      app: "AgroNodo",
      version: "mvp-v1",
      dataSource: getDataSourceStatus(),
    },
  });
}
