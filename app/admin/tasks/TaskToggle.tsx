"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskToggle({
  taskId,
  status,
  userRole,
}: {
  taskId: string;
  status: string;
  userRole: string;
}) {
  const router = useRouter();
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (userRole === "VIEWER") return;
    setToggling(true);
    try {
      await fetch(`/api/admin/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "OPEN" ? "DONE" : "OPEN" }),
      });
      router.refresh();
    } catch {
      // ignore
    } finally {
      setToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggling || userRole === "VIEWER"}
      className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors text-xs ${
        status === "DONE"
          ? "bg-green-500 border-green-500 text-white"
          : "border-gray-300 hover:border-accent"
      }`}
    >
      {status === "DONE" && "✓"}
    </button>
  );
}
