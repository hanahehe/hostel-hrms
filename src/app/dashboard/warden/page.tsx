import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  mockDashboardStats,
  mockComplaints,
  mockLeaveRequests,
} from "@/lib/data/mock";
export default async function WardenDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "warden") redirect("/dashboard");

  const stats = mockDashboardStats;

  return (
    <div>
      <PageHeader
        title="Warden Desk"
        description="Daily operations — attendance, curfew, complaints, and emergencies"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard title="Present Today" value={stats.presentToday} icon="user-check" />
        <StatsCard title="Late Entries" value={stats.lateEntriesToday} icon="alert-triangle" />
        <StatsCard title="Open Complaints" value={stats.openComplaints} icon="message-square-warning" />
        <StatsCard title="Pending Leaves" value={stats.pendingLeaves} icon="clipboard-list" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Priority Complaints</CardTitle>
            <Link href="/dashboard/complaints">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockComplaints
              .filter((c) => c.priority === "high" || c.priority === "critical")
              .map((c) => (
                <div key={c.id} className="rounded-lg border p-3">
                  <p className="font-medium text-sm">{c.title}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="destructive">{c.priority}</Badge>
                    <Badge>{c.status}</Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {mockLeaveRequests
              .filter((l) => l.status === "pending")
              .map((l) => (
                <div key={l.id} className="rounded-lg border p-3 mb-2">
                  <p className="text-sm font-medium">{l.reason}</p>
                  <Badge variant="warning" className="mt-2">
                    Pending
                  </Badge>
                </div>
              ))}
            <Link href="/dashboard/leaves">
              <Button className="mt-2 w-full" variant="outline">
                Manage leaves
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
