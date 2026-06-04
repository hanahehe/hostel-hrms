import { redirect } from "next/navigation";
import { getSession, sessionToProfile } from "@/lib/auth/session";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = sessionToProfile(session);

  return (
    <DashboardShell
      role={profile.role}
      userName={profile.full_name}
      title=""
      subtitle=""
    >
      {children}
    </DashboardShell>
  );
}
