import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/permissions";
import { mockComplaints } from "@/lib/data/mock";

const createSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  category: z.enum([
    "infrastructure",
    "water",
    "electricity",
    "maintenance",
    "room",
    "mess",
    "other",
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  block_id: z.string().optional(),
  floor: z.number().optional(),
});

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");

  let data = [...mockComplaints];

  if (status && status !== "all") {
    data = data.filter((c) => c.status === status);
  }
  if (priority && priority !== "all") {
    data = data.filter((c) => c.priority === priority);
  }
  if (category && category !== "all") {
    data = data.filter((c) => c.category === category);
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !hasPermission(session.role, "complaints.create") &&
    !hasPermission(session.role, "complaints.manage")
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const complaint = {
      id: `cmp-${Date.now()}`,
      ...parsed.data,
      status: "open" as const,
      reported_by: session.sub,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ data: complaint }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
