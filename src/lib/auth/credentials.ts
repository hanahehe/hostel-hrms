import { DEMO_USERS } from "@/lib/constants";
import type { UserRole } from "@/types";
import { createClient } from "@supabase/supabase-js";

export interface AuthUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

function getEnvAuthUsers(): AuthUser[] {
  const extra: AuthUser[] = [];

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    extra.push({
      email: adminEmail,
      password: adminPassword,
      role: (process.env.ADMIN_ROLE as UserRole) || "admin",
      name: process.env.ADMIN_NAME?.trim() || "Administrator",
    });
  }

  const authUsersJson = process.env.AUTH_USERS?.trim();
  if (authUsersJson) {
    try {
      const parsed = JSON.parse(authUsersJson) as AuthUser[];
      if (Array.isArray(parsed)) {
        for (const user of parsed) {
          if (user.email && user.password && user.role) {
            extra.push({
              email: user.email,
              password: user.password,
              role: user.role,
              name: user.name || user.email.split("@")[0],
            });
          }
        }
      }
    } catch {
      console.error("[auth] AUTH_USERS env is not valid JSON");
    }
  }

  return extra;
}

export function getAllowedUsers(): AuthUser[] {
  const envUsers = getEnvAuthUsers();
  const byEmail = new Map<string, AuthUser>();

  for (const user of DEMO_USERS) {
    byEmail.set(user.email.toLowerCase(), user);
  }
  for (const user of envUsers) {
    byEmail.set(user.email.toLowerCase(), user);
  }

  return Array.from(byEmail.values());
}

export function authenticateWithCredentials(
  email: string,
  password: string
): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getAllowedUsers().find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  return user ?? null;
}

export interface AuthenticatedUser extends AuthUser {
  id?: string;
}

export async function authenticateWithSupabase(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey || url.includes("your-project")) return null;

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user?.email) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", data.user.id)
      .maybeSingle();

    const role = (profile?.role as UserRole) || "student";

    return {
      id: data.user.id,
      email: data.user.email,
      password,
      role,
      name: profile?.full_name || data.user.email.split("@")[0],
    };
  } catch (err) {
    console.error("[auth] Supabase sign-in error:", err);
    return null;
  }
}

export async function resolveAuthenticatedUser(
  email: string,
  password: string
): Promise<{ user: AuthenticatedUser; source: "supabase" | "credentials" } | null> {
  const localUser = authenticateWithCredentials(email, password);
  if (localUser) {
    return { user: localUser, source: "credentials" };
  }

  const supabaseUser = await authenticateWithSupabase(email, password);
  if (supabaseUser) {
    return { user: supabaseUser, source: "supabase" };
  }

  return null;
}
