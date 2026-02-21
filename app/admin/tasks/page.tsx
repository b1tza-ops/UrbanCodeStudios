import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import TaskToggle from "./TaskToggle";

export default async function TasksPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

  const [overdueTasks, todayTasks, upcomingTasks] = await Promise.all([
    prisma.task.findMany({
      where: { status: "OPEN", dueAt: { lt: startOfDay } },
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
      },
      orderBy: { dueAt: "asc" },
    }),
    prisma.task.findMany({
      where: { status: "OPEN", dueAt: { gte: startOfDay, lt: endOfDay } },
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
      },
      orderBy: { dueAt: "asc" },
    }),
    prisma.task.findMany({
      where: { status: "OPEN", dueAt: { gte: endOfDay } },
      include: {
        assignedTo: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
      },
      orderBy: { dueAt: "asc" },
      take: 20,
    }),
  ]);

  type TaskWithRelations = (typeof overdueTasks)[number];

  const TaskSection = ({
    title,
    tasks,
    variant = "default",
  }: {
    title: string;
    tasks: TaskWithRelations[];
    variant?: "overdue" | "today" | "default";
  }) => {
    const colors = {
      overdue: "border-red-200 bg-red-50",
      today: "border-yellow-200 bg-yellow-50",
      default: "border-gray-200 bg-white",
    };

    return (
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-3">
          {title}{" "}
          <span className="text-sm font-normal text-gray-400">
            ({tasks.length})
          </span>
        </h2>
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks.</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 p-4 rounded-xl border ${colors[variant]} text-sm`}
              >
                <TaskToggle
                  taskId={task.id}
                  status={task.status}
                  userRole={session.user.role}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Assigned to {task.assignedTo.name}
                    {task.lead && (
                      <>
                        {" · "}
                        <Link
                          href={`/admin/leads/${task.lead.id}`}
                          className="text-accent hover:underline"
                        >
                          {task.lead.name}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(task.dueAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Tasks</h1>
      <TaskSection title="Overdue" tasks={overdueTasks} variant="overdue" />
      <TaskSection title="Due Today" tasks={todayTasks} variant="today" />
      <TaskSection title="Upcoming" tasks={upcomingTasks} variant="default" />
    </div>
  );
}
