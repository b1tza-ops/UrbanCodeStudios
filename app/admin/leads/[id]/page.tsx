import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LeadEditor from "./LeadEditor";
import NoteForm from "./NoteForm";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;

  const [lead, users] = await Promise.all([
    prisma.lead.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true } },
        notes: {
          include: { author: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
        },
        tasks: {
          include: { assignedTo: { select: { id: true, name: true } } },
          orderBy: { dueAt: "asc" },
        },
      },
    }),
    prisma.user.findMany({
      where: { role: { in: ["ADMIN", "SALES"] } },
      select: { id: true, name: true },
    }),
  ]);

  if (!lead) notFound();

  return (
    <div>
      <Link
        href="/admin/leads"
        className="text-sm text-accent hover:underline mb-4 inline-block"
      >
        ← Back to Leads
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">{lead.name}</h1>
          <p className="text-gray-500 mt-1">
            {lead.company || "No company"} · {lead.source} ·{" "}
            {new Date(lead.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lead Info + Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-primary mb-4">Contact Info</h2>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-medium">{lead.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Phone</dt>
                <dd className="font-medium">{lead.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Website</dt>
                <dd className="font-medium">{lead.website || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Business Type</dt>
                <dd className="font-medium">{lead.businessType || "—"}</dd>
              </div>
            </dl>
          </div>

          {/* Editable Status / Owner */}
          <LeadEditor
            leadId={lead.id}
            currentStatus={lead.status}
            currentOwnerId={lead.ownerId}
            users={users}
            userRole={session.user.role}
          />

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-primary mb-4">
              Notes ({lead.notes.length})
            </h2>
            <NoteForm leadId={lead.id} userRole={session.user.role} />
            <div className="mt-4 space-y-3">
              {lead.notes.map((note) => (
                <div
                  key={note.id}
                  className="border-l-2 border-accent/30 pl-4 py-2"
                >
                  <p className="text-sm">{note.note}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {note.author.name} ·{" "}
                    {new Date(note.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              ))}
              {lead.notes.length === 0 && (
                <p className="text-sm text-gray-400">No notes yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Tasks sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-primary mb-4">
              Tasks ({lead.tasks.length})
            </h2>
            <TaskForm
              leadId={lead.id}
              users={users}
              userRole={session.user.role}
            />
            <div className="mt-4 space-y-3">
              {lead.tasks.map((task) => {
                const overdue =
                  task.status === "OPEN" && new Date(task.dueAt) < new Date();
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    overdue={overdue}
                    userRole={session.user.role}
                  />
                );
              })}
              {lead.tasks.length === 0 && (
                <p className="text-sm text-gray-400">No tasks yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
