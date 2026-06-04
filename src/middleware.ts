import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { getJwtSecretKey } from "@/lib/auth/secret";
import {
  applyCorsHeaders,
  applySecurityHeaders,
  handleCorsPreflight,
} from "@/lib/cors";

const PUBLIC_PATHS = ["/", "/login", "/api/auth/login", "/api/auth/logout"];

const ROLE_ROUTES: Record<string, string[]> = {
  student: ["/dashboard/student"],
  parent: ["/dashboard/parent"],
  warden: ["/dashboard/warden"],
  staff: ["/dashboard/staff"],
};

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // CORS for all API routes
  if (pathname.startsWith("/api")) {
    if (request.method === "OPTIONS") {
      return handleCorsPreflight(request);
    }

    const response = NextResponse.next();
    applyCorsHeaders(request, response);
    applySecurityHeaders(response);
    return response;
  }

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifyToken(token) : null;

  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && session) {
    const role = session.role as string;
    const redirectMap: Record<string, string> = {
      student: "/dashboard/student",
      parent: "/dashboard/parent",
      warden: "/dashboard/warden",
      staff: "/dashboard/staff",
    };
    const dest = redirectMap[role] || "/dashboard";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (session && pathname.startsWith("/dashboard")) {
    const role = session.role as string;

    for (const [restrictedRole, routes] of Object.entries(ROLE_ROUTES)) {
      if (role !== restrictedRole) {
        for (const route of routes) {
          if (pathname.startsWith(route)) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        }
      }
    }
  }

  if (!isPublic && pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
