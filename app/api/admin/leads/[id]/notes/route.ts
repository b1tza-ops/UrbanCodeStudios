import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { noteCreateSchema } from "@/lib/validation";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role === "VIEWER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  const parsed = noteCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const note = await prisma.$transaction(async (tx: any) => {
    const created = await tx.leadNote.create({
      data: {
        leadId: id,
        authorId: session.user.id,
        note: parsed.data.note,
      },
      include: { author: { select: { id: true, name: true } } },
    });

    await createAuditLog(
      {
        actorId: session.user.id,
        action: "CREATE_NOTE",
        entityType: "LeadNote",
        entityId: created.id,
        after: created,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip"),
        userAgent: request.headers.get("user-agent"),
      },
      tx
    );

    return created;
  });

  return NextResponse.json(note, { status: 201 });
}
