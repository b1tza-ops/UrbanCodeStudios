"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"];

export default function LeadEditor({
  leadId,
  currentStatus,
  currentOwnerId,
  users,
  userRole,
}: {
  leadId: string;
  currentStatus: string;
  currentOwnerId: string | null;
  users: { id: string; name: string }[];
  userRole: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [ownerId, setOwnerId] = useState(currentOwnerId || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const canEdit = userRole !== "VIEWER";

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          ownerId: ownerId || null,
        }),
      });

      if (res.ok) {
        setMessage("Saved!");
        router.refresh();
        setTimeout(() => setMessage(""), 2000);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save.");
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="font-semibold text-primary mb-4">Manage Lead</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={!canEdit}
            className="w-full px-3 py-2 border rounded-lg text-sm bg-white disabled:bg-gray-100"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Owner</label>
          <select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            disabled={!canEdit}
            className="w-full px-3 py-2 border rounded-lg text-sm bg-white disabled:bg-gray-100"
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {canEdit && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <span
              className={`text-sm ${
                message === "Saved!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
