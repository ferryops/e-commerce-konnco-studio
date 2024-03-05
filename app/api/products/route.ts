import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const result = "oke";
  return NextResponse.json(result);
}
