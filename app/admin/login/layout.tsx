import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Providers from "@/components/Providers";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Already logged in → redirect to leads
  if (session?.user) {
    redirect("/admin/leads");
  }

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </Providers>
  );
}
