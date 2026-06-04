import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  attachSessionCookie,
  signSessionToken,
} from "@/lib/auth/session";
import { resolveAuthenticatedUser } from "@/lib/auth/credentials";
import { getDashboardPath } from "@/lib/permissions";
import { v4 as uuidv4 } from "uuid";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email or password format" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const authResult = await resolveAuthenticatedUser(email, password);

    if (!authResult) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password. Click a demo role below (password: demo1234).",
        },
        { status: 401 }
      );
    }

    const { user } = authResult;

    const token = await signSessionToken({
      sub: user.id ?? uuidv4(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      redirect: getDashboardPath(user.role),
      user: { email: user.email, role: user.role, name: user.name },
    });

    return attachSessionCookie(response, token);
  } catch (error) {
    console.error("[auth/login]", error);

    const message =
      error instanceof Error && error.message.includes("JWT_SECRET")
        ? "Server misconfigured: add JWT_SECRET in Vercel → Settings → Environment Variables, then redeploy."
        : "Authentication failed. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
