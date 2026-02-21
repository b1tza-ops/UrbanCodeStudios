import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import Providers from "@/components/Providers";

export const metadata = {
  title: "CRM | UrbanCode Studio",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // No session → render children only (login page)
  if (!session?.user) {
    return (
      <Providers>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </Providers>
    );
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar
          userName={session.user.name || session.user.email || "User"}
          userRole={session.user.role}
        />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}
