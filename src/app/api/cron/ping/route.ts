import { NextResponse } from "next/server";

export async function GET() {
  try {
    await fetch(`${process.env.API_BASE_URL?.replace("/api/v1", "")}/health`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
