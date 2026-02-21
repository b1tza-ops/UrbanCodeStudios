"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SALES");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("SALES");
        setOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create user.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-6 px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
      >
        + Create User
      </button>
    );
  }

  return (
    <div className="mb-6 bg-white rounded-xl shadow-sm border p-6">
      <h2 className="font-semibold text-primary mb-4">Create New User</h2>
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-accent outline-none"
          >
            <option value="ADMIN">Admin</option>
            <option value="SALES">Sales</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create User"}
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
    </div>
  );
}
