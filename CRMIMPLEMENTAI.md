You are my senior full-stack engineer. Implement a small internal multi-user CRM inside this existing Next.js (App Router) project. Keep changes incremental and production-ready for a VPS deployment (Caddy + PM2). Use PostgreSQL + Prisma + Auth.js (NextAuth) with secure session cookies. Enforce RBAC roles and add audit logging. Do NOT create a separate repo.

GOALS
1) Multi-user authentication (Admin, Sales, Viewer) with secure sessions.
2) Admin dashboard under /admin with:
   - /admin/login
   - /admin/leads (table list with search, filters: status, owner, source; pagination)
   - /admin/leads/[id] (detail view: edit status/owner, add notes, create tasks)
   - /admin/tasks (due today/overdue, assign, mark done)
   - /admin/users (admin only: create users, set roles)
   - /admin/audit (admin only: view audit trail)
3) API routes under /api/admin/* protected by auth + RBAC (server-side enforcement).
4) Website contact form (existing) should store leads in DB and notify Telegram (use env vars TG_BOT_TOKEN and TG_CHAT_ID). Auto-tag / auto-assign optional but nice.
5) Audit log records all mutations: who did what, entity type/id, before/after JSON, timestamp, IP, user-agent.

TECH STACK / CONSTRAINTS
- Next.js App Router + TypeScript
- Prisma ORM + PostgreSQL
- Auth.js/NextAuth (Credentials provider is fine; hash passwords with bcrypt or argon2)
- Use server actions or route handlers where appropriate
- Use middleware.ts to protect /admin routes and block unauthorized users
- Use environment variables for secrets (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, TG_BOT_TOKEN, TG_CHAT_ID)
- Minimal UI styling using existing components/CSS; keep it clean and functional.
- Add basic rate limiting for /admin/login (simple in-memory or minimal middleware).
- Add safe input validation (zod) for lead creation, notes, tasks, users.

DATABASE MODEL (Prisma)
- User: id, name, email(unique), passwordHash, role (ADMIN|SALES|VIEWER), createdAt, lastLoginAt
- Lead: id, name, email, phone, company, website, businessType, source, status (NEW|CONTACTED|QUALIFIED|WON|LOST), ownerId (User), createdAt, updatedAt
- LeadNote: id, leadId, authorId(User), note, createdAt
- Task: id, leadId, assignedToId(User), title, dueAt, status (OPEN|DONE), createdAt
- AuditLog: id, actorId(User), action, entityType, entityId, beforeJson, afterJson, ip, userAgent, createdAt

IMPLEMENTATION STEPS
A) Add Prisma + schema + migrations. Provide commands to run.
B) Add Auth.js config and login page. Create a seed script to create the first ADMIN user from env vars (ADMIN_EMAIL, ADMIN_PASSWORD).
C) Add middleware RBAC for /admin and /api/admin/*.
D) Implement API route handlers:
   - GET /api/admin/leads?search=&status=&owner=&page=
   - GET /api/admin/leads/[id]
   - PATCH /api/admin/leads/[id] (status, owner)
   - POST /api/admin/leads/[id]/notes
   - POST /api/admin/tasks
   - PATCH /api/admin/tasks/[id]
   - GET/POST /api/admin/users (admin only)
   - GET /api/admin/audit (admin only)
E) Implement admin UI pages for leads/tasks/users/audit using server components where possible, with client components only where needed (forms, filters).
F) Connect existing contact form endpoint to create a Lead record (status NEW, source "website") and send Telegram notification. Ensure it works behind Cloudflare and on VPS.

QUALITY BAR
- All admin endpoints must enforce RBAC (do not rely on UI only).
- Use transactions for multi-step updates and audit writes.
- Store audit before/after JSON safely.
- Provide clear file structure and explain where code was added.
- Keep secrets out of git; update .env.example.

Deliver: a working CRM MVP with the pages + API + DB + seed admin user.