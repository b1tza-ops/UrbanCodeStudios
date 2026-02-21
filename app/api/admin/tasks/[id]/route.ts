import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { taskUpdateSchema } from "@/lib/validation";

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

  const parsed = taskUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const before = await prisma.task.findUnique({ where: { id } });
  if (!before) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = { ...parsed.data };
  if (data.dueAt) data.dueAt = new Date(data.dueAt);

  const updated = await prisma.$transaction(async (tx: any) => {
    const task = await tx.task.update({
      where: { id },
      data,
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
      },
    });

    await createAuditLog(
      {
        actorId: session.user.id,
        action: "UPDATE_TASK",
        entityType: "Task",
        entityId: id,
        before,
        after: task,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip"),
        userAgent: request.headers.get("user-agent"),
      },
      tx
    );

    return task;
  });

  return NextResponse.json(updated);
}
