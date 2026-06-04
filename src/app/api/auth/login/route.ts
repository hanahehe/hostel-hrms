import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_USERS } from "@/lib/constants";
import { createSession } from "@/lib/auth/session";
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

    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createSession({
      sub: uuidv4(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json({
      success: true,
      redirect: getDashboardPath(user.role),
      user: { email: user.email, role: user.role, name: user.name },
    });
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
