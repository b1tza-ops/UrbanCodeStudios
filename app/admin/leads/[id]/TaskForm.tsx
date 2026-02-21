"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function TaskForm({
  leadId,
  users,
  userRole,
}: {
  leadId: string;
  users: { id: string; name: string }[];
  userRole: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [assignedToId, setAssignedToId] = useState(users[0]?.id || "");
  const [dueAt, setDueAt] = useState("");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  if (userRole === "VIEWER") return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignedToId || !dueAt) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          assignedToId,
          title,
          dueAt: new Date(dueAt).toISOString(),
        }),
      });
      if (res.ok) {
        setTitle("");
        setDueAt("");
        setOpen(false);
        router.refresh();
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-accent hover:underline"
      >
        + Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-b pb-4 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
      />
      <select
        value={assignedToId}
        onChange={(e) => setAssignedToId(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={dueAt}
        onChange={(e) => setDueAt(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Task"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
