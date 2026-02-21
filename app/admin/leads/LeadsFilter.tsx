"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"];

export default function LeadsFilter({
  currentSearch,
  currentStatus,
  currentOwner,
  users,
}: {
  currentSearch: string;
  currentStatus: string;
  currentOwner: string;
  users: { id: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(currentSearch);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams();
      const values: Record<string, string> = {
        search: key === "search" ? value : currentSearch,
        status: key === "status" ? value : currentStatus,
        owner: key === "owner" ? value : currentOwner,
      };
      Object.entries(values).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, currentSearch, currentStatus, currentOwner]
  );

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") updateParams("search", search);
        }}
        className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none w-64"
      />
      <button
        onClick={() => updateParams("search", search)}
        className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
      >
        Search
      </button>

      <select
        value={currentStatus}
        onChange={(e) => updateParams("status", e.target.value)}
        className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-accent outline-none"
      >
        <option value="">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={currentOwner}
        onChange={(e) => updateParams("owner", e.target.value)}
        className="px-4 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-accent outline-none"
      >
        <option value="">All Owners</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
}
