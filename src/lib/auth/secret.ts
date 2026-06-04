/**
 * Resolves JWT signing secret.
 * On Vercel, falls back to a stable per-project key so demo login works
 * before JWT_SECRET is configured. Set JWT_SECRET in production for security.
 */
export function getJwtSecret(): string {
  const explicit =
    process.env.JWT_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();

  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return "dev-only-change-in-production-hostelhr-secret";
  }

  if (process.env.VERCEL === "1") {
    const projectId = process.env.VERCEL_PROJECT_ID || "hostelhr";
    return `hostelhr-vercel-session-${projectId}`;
  }

  throw new Error("JWT_SECRET is not configured");
}

export function getJwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(getJwtSecret());
}
