import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { taskCreateSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const filter = searchParams.get("filter") || "all";
  const assignee = searchParams.get("assignee") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const pageSize = 20;

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (filter === "today") {
    where.dueAt = { gte: startOfDay, lt: endOfDay };
    where.status = "OPEN";
  } else if (filter === "overdue") {
    where.dueAt = { lt: startOfDay };
    where.status = "OPEN";
  }

  if (assignee) {
    where.assignedToId = assignee;
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true, company: true } },
      },
      orderBy: { dueAt: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.task.count({ where }),
  ]);

  return NextResponse.json({
    tasks,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "VIEWER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const parsed = taskCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const task = await prisma.$transaction(async (tx: any) => {
    const created = await tx.task.create({
      data: {
        leadId: parsed.data.leadId || null,
        assignedToId: parsed.data.assignedToId,
        title: parsed.data.title,
        dueAt: new Date(parsed.data.dueAt),
      },
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
      },
    });

    await createAuditLog(
      {
        actorId: session.user.id,
        action: "CREATE_TASK",
        entityType: "Task",
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

  return NextResponse.json(task, { status: 201 });
}
