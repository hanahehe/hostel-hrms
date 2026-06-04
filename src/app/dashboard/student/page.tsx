import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, ClipboardList, MessageSquareWarning, QrCode } from "lucide-react";
import { mockFees, mockLeaveRequests } from "@/lib/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "student") redirect("/dashboard");

  return (
    <div>
      <PageHeader
        title={`Welcome, ${session.name}`}
        description="Your hostel portal — attendance, fees, leave, and complaints"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard title="Today's Status" value="Present" icon="qr-code" />
        <StatsCard title="Room" value="3B-12" icon="qr-code" />
        <StatsCard
          title="Pending Fees"
          value={formatCurrency(19500)}
          icon="credit-card"
        />
        <StatsCard title="Leave Balance" value="12 days" icon="clipboard-list" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Fees</CardTitle>
            <Link href="/dashboard/fees">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockFees.map((fee) => (
              <div key={fee.id} className="flex justify-between items-center rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium capitalize">{fee.type.replace("_", " ")}</p>
                  <p className="text-xs text-muted-foreground">Due {formatDate(fee.due_date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(fee.amount)}</p>
                  <Badge variant={fee.status === "overdue" ? "destructive" : "warning"}>
                    {fee.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            <Link href="/dashboard/leaves">
              <Button variant="outline" className="w-full justify-start">
                <ClipboardList className="h-4 w-4 mr-2" />
                Request leave
              </Button>
            </Link>
            <Link href="/dashboard/complaints">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquareWarning className="h-4 w-4 mr-2" />
                Raise complaint
              </Button>
            </Link>
            <Link href="/dashboard/attendance">
              <Button variant="outline" className="w-full justify-start">
                <QrCode className="h-4 w-4 mr-2" />
                QR check-in
              </Button>
            </Link>
            <Link href="/dashboard/fees">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay fees
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {mockLeaveRequests[0] ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Leave Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {formatDate(mockLeaveRequests[0].start_date)} —{" "}
              {formatDate(mockLeaveRequests[0].end_date)} · {mockLeaveRequests[0].status}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
