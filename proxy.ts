import { NextRequest, NextResponse } from "next/server";
import { hasAuthConfiguration, isValidSession, SESSION_COOKIE } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProductionDeployment = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
  if (!isProductionDeployment) return NextResponse.next();
  if (pathname === "/login" || pathname === "/api/auth" || pathname.startsWith("/api/auth/") || pathname === "/p" || pathname.startsWith("/p/")) return NextResponse.next();
  if (!hasAuthConfiguration()) return new NextResponse("Private playground is not configured.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  if (isValidSession(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  const login = new URL("/login", request.url);
  login.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/((?!_next/static|favicon.ico).*)"] };
