import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LeadsFilter from "./LeadsFilter";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    owner?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || "";
  const owner = params.owner || "";
  const page = Math.max(1, parseInt(params.page || "1"));
  const pageSize = 20;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) where.status = status;
  if (owner) where.ownerId = owner;

  const [leads, total, users] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: { owner: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
    prisma.user.findMany({
      where: { role: { in: ["ADMIN", "SALES"] } },
      select: { id: true, name: true },
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-800",
    CONTACTED: "bg-yellow-100 text-yellow-800",
    QUALIFIED: "bg-purple-100 text-purple-800",
    WON: "bg-green-100 text-green-800",
    LOST: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total leads</p>
        </div>
      </div>

      <LeadsFilter
        currentSearch={search}
        currentStatus={status}
        currentOwner={owner}
        users={users}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                Company
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Owner
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="text-accent hover:underline font-medium"
                  >
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.email || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.company || "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[lead.status] || ""
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.owner?.name || "Unassigned"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-gray-400"
                >
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/leads?search=${search}&status=${status}&owner=${owner}&page=${page - 1}`}
                className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/leads?search=${search}&status=${status}&owner=${owner}&page=${page + 1}`}
                className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
