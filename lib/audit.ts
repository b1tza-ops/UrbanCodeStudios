import { prisma } from "@/lib/prisma";

interface AuditParams {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  ip?: string | null;
  userAgent?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createAuditLog(params: AuditParams, db: any = prisma) {
  return db.auditLog.create({
    data: {
      actorId: params.actorId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      beforeJson:
        params.before !== undefined
          ? JSON.parse(JSON.stringify(params.before))
          : null,
      afterJson:
        params.after !== undefined
          ? JSON.parse(JSON.stringify(params.after))
          : null,
      ip: params.ip ?? null,
      userAgent: params.userAgent ?? null,
    },
  });
}
