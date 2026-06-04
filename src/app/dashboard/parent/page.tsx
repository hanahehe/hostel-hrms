import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockFees, mockLeaveRequests, mockAttendance } from "@/lib/data/mock";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

export default async function ParentDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "parent") redirect("/dashboard");

  return (
    <div>
      <PageHeader
        title="Parent Portal"
        description="Monitor your ward's attendance, fees, and leave approvals"
      />

      <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">Ward</p>
        <p className="text-lg font-semibold">Rahul Sharma · Room 3B-12</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatsCard title="Today's Attendance" value="Present" icon="user-check" />
        <StatsCard
          title="Outstanding Fees"
          value={formatCurrency(19500)}
          icon="credit-card"
        />
        <StatsCard title="Pending Approvals" value={1} icon="clipboard-list" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            {mockAttendance.map((a) => (
              <div key={a.id} className="flex justify-between py-2 border-b last:border-0">
                <span className="text-sm">{a.date}</span>
                <Badge variant={a.is_late_entry ? "warning" : "success"}>
                  {a.is_late_entry ? "Late" : a.status}
                </Badge>
                {a.check_in ? (
                  <span className="text-xs text-muted-foreground">
                    {formatDateTime(a.check_in)}
                  </span>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Leave Approval Required</CardTitle>
            <Link href="/dashboard/leaves">
              <Button size="sm">Review</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {mockLeaveRequests
              .filter((l) => l.status === "pending")
              .map((leave) => (
                <div key={leave.id} className="rounded-lg border p-3">
                  <p className="font-medium text-sm">
                    {formatDate(leave.start_date)} — {formatDate(leave.end_date)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{leave.reason}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">Approve</Button>
                    <Button size="sm" variant="outline">Reject</Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
