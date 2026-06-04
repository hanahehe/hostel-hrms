import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Profile, UserRole } from "@/types";
import { getJwtSecretKey } from "@/lib/auth/secret";

export const SESSION_COOKIE = "hostelhr_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
  exp?: number;
}

export function getSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}

export async function signSessionToken(payload: Omit<SessionPayload, "exp">) {
  return new SignJWT({
    sub: payload.sub,
    email: payload.email,
    role: payload.role,
    name: payload.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getJwtSecretKey());
}

/** Set session cookie on a Route Handler response (required for Vercel). */
export function attachSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}

export async function createSession(payload: Omit<SessionPayload, "exp">) {
  const token = await signSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, getSessionCookieOptions());
  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      role: payload.role as UserRole,
      name: payload.name as string,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export function sessionToProfile(session: SessionPayload): Profile {
  return {
    id: session.sub,
    email: session.email,
    full_name: session.name,
    role: session.role,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
