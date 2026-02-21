"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskItem({
  task,
  overdue,
  userRole,
}: {
  task: {
    id: string;
    title: string;
    status: string;
    dueAt: string | Date;
    assignedTo: { id: string; name: string };
  };
  overdue: boolean;
  userRole: string;
}) {
  const router = useRouter();
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    if (userRole === "VIEWER") return;
    setToggling(true);
    try {
      await fetch(`/api/admin/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: task.status === "OPEN" ? "DONE" : "OPEN",
        }),
      });
      router.refresh();
    } catch {
      // ignore
    } finally {
      setToggling(false);
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${
        task.status === "DONE"
          ? "bg-gray-50 border-gray-200"
          : overdue
          ? "bg-red-50 border-red-200"
          : "bg-white border-gray-200"
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={toggling || userRole === "VIEWER"}
        className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors text-xs ${
          task.status === "DONE"
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-accent"
        }`}
      >
        {task.status === "DONE" && "✓"}
      </button>
      <div className="flex-1 min-w-0">
        <p
          className={
            task.status === "DONE" ? "line-through text-gray-400" : ""
          }
        >
          {task.title}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {task.assignedTo.name} ·{" "}
          {new Date(task.dueAt).toLocaleDateString("en-GB")}
          {overdue && task.status === "OPEN" && (
            <span className="text-red-500 font-medium ml-1">Overdue</span>
          )}
        </p>
      </div>
    </div>
  );
}
