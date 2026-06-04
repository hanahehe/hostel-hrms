import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "hostelhr_session";
const PUBLIC_PATHS = ["/", "/login", "/api/auth/login", "/api/auth/logout"];

const ROLE_ROUTES: Record<string, string[]> = {
  student: ["/dashboard/student"],
  parent: ["/dashboard/parent"],
  warden: ["/dashboard/warden"],
  staff: ["/dashboard/staff"],
};

async function verifyToken(token: string) {
  const secret =
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV === "development"
      ? "dev-only-change-in-production-hostelhr-secret"
      : undefined);
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
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
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
