import { AlertTriangle } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  AttendanceAreaChart,
  ComplaintPieChart,
  FeeBarChart,
  OccupancyBarChart,
} from "@/components/dashboard/charts";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockAttendanceTrend,
  mockComplaintAnalytics,
  mockComplaints,
  mockDashboardStats,
  mockFeeAnalytics,
  mockOccupancyByBlock,
  mockAIInsights,
} from "@/lib/data/mock";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role === "student") redirect("/dashboard/student");
  if (session.role === "parent") redirect("/dashboard/parent");
  if (session.role === "warden") redirect("/dashboard/warden");
  if (session.role === "staff") redirect("/dashboard/staff");

  const stats = mockDashboardStats;

  return (
    <div>
      <PageHeader
        title="Operations Overview"
        description="Real-time hostel metrics and operational insights"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon="users"
          trend={{ value: 2.4, label: "vs last month" }}
          delay={0}
        />
        <StatsCard
          title="Present Today"
          value={stats.presentToday.toLocaleString()}
          subtitle={`${stats.occupancyRate}% occupancy`}
          icon="user-check"
          trend={{ value: 1.2, label: "vs yesterday" }}
          delay={0.05}
        />
        <StatsCard
          title="Pending Fees"
          value={formatCurrency(stats.pendingFees)}
          icon="credit-card"
          trend={{ value: -5.1, label: "collection rate" }}
          delay={0.1}
        />
        <StatsCard
          title="Open Complaints"
          value={stats.openComplaints}
          icon="message-square-warning"
          trend={{ value: -12, label: "this week" }}
          delay={0.15}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceAreaChart data={mockAttendanceTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Block Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <OccupancyBarChart data={mockOccupancyByBlock} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <FeeBarChart data={mockFeeAnalytics} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplaintPieChart data={mockComplaintAnalytics} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockComplaints.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {c.category} · {c.priority}
                    </p>
                  </div>
                  <Badge
                    variant={
                      c.status === "open"
                        ? "warning"
                        : c.status === "resolved"
                          ? "success"
                          : "default"
                    }
                  >
                    {c.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAIInsights.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-muted/30 p-3"
              >
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
