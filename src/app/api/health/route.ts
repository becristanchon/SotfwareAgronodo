import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    product: "AgroNodo",
    version: "mvp-v1",
  });
}
