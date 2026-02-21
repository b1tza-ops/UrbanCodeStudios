import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { leadUpdateSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, email: true } },
      notes: {
        include: { author: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
      },
      tasks: {
        include: { assignedTo: { select: { id: true, name: true } } },
        orderBy: { dueAt: "asc" },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role === "VIEWER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  const parsed = leadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const before = await prisma.lead.findUnique({ where: { id } });
  if (!before) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updated = await prisma.$transaction(async (tx: any) => {
    const lead = await tx.lead.update({
      where: { id },
      data: parsed.data,
      include: { owner: { select: { id: true, name: true } } },
    });

    await createAuditLog(
      {
        actorId: session.user.id,
        action: "UPDATE_LEAD",
        entityType: "Lead",
        entityId: id,
        before,
        after: lead,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip"),
        userAgent: request.headers.get("user-agent"),
      },
      tx
    );

    return lead;
  });

  return NextResponse.json(updated);
}
