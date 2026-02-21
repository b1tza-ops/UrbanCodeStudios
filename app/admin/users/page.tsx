import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CreateUserForm from "./CreateUserForm";

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  if (session.user.role !== "ADMIN") redirect("/admin/leads");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
      _count: { select: { leads: true, tasks: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const roleColors: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-800",
    SALES: "bg-blue-100 text-blue-800",
    VIEWER: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Users</h1>

      <CreateUserForm />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Name
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Email
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Role
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Leads
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Tasks
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Last Login
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      roleColors[user.role] || ""
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {user._count.leads}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {user._count.tasks}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString("en-GB")
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
