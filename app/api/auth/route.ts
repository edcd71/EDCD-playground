import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, hasAuthConfiguration, isValidPassword, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const isProductionDeployment = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
  if (!isProductionDeployment) return NextResponse.json({ ok: true });
  if (!hasAuthConfiguration()) return NextResponse.json({ error: "Private access is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  let password: unknown;
  try { password = (await request.json()).password; } catch { return NextResponse.json({ error: "Enter the workspace password." }, { status: 400 }); }
  if (typeof password !== "string" || !isValidPassword(password)) return NextResponse.json({ error: "That password did not unlock the workspace." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
