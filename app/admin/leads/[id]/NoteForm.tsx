"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NoteForm({
  leadId,
  userRole,
}: {
  leadId: string;
  userRole: string;
}) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  if (userRole === "VIEWER") return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (res.ok) {
        setNote("");
        router.refresh();
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note..."
        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
      />
      <button
        type="submit"
        disabled={saving || !note.trim()}
        className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
