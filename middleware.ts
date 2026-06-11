import { NextResponse, type NextRequest } from "next/server";
import { canAccessPath } from "@/lib/access-policy";
import { authSessionCookieName, demoRoleCookieName } from "@/lib/auth-constants";
import { isExperienceRole } from "@/lib/profile";

const publicPaths = ["/login"];

function isPublicPath(pathname: string) {
  return (
    publicPaths.includes(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/agronodo-logo.png"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const role = request.cookies.get(demoRoleCookieName)?.value;
  const sessionToken = request.cookies.get(authSessionCookieName)?.value;

  if (!sessionToken && !isExperienceRole(role)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionToken) {
    return NextResponse.next();
  }

  if (!isExperienceRole(role)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessPath(role, pathname)) {
    const profileUrl = new URL("/perfil", request.url);
    profileUrl.searchParams.set("acceso", "limitado");
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
