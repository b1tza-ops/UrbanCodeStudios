"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/tasks", label: "Tasks", icon: "✅" },
  { href: "/admin/users", label: "Users", icon: "👥", adminOnly: true },
  { href: "/admin/audit", label: "Audit Log", icon: "📜", adminOnly: true },
];

export default function AdminSidebar({
  userName,
  userRole,
}: {
  userName: string;
  userRole: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">UrbanCode CRM</h1>
        <p className="text-sm text-white/60 mt-1">{userName}</p>
        <span className="inline-block mt-1 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
          {userRole}
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems
          .filter((item) => !item.adminOnly || userRole === "ADMIN")
          .map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          ← Sign Out
        </button>
      </div>
    </aside>
  );
}
