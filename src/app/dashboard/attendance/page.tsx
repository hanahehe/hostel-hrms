"use client";

import { QrCode } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AttendanceAreaChart } from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAttendance, mockAttendanceTrend, mockDashboardStats } from "@/lib/data/mock";
import { formatDateTime } from "@/lib/utils";

export default function AttendancePage() {
  const stats = mockDashboardStats;

  return (
    <div>
      <PageHeader
        title="Attendance System"
        description="Daily check-in/out, QR entry, curfew monitoring, and live occupancy"
        actions={
          <Button>
            <QrCode className="h-4 w-4" />
            Scan QR Entry
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard title="Present Today" value={stats.presentToday} icon="clock" delay={0} />
        <StatsCard title="Late Entries" value={stats.lateEntriesToday} icon="user-x" delay={0.05} />
        <StatsCard
          title="Occupancy"
          value={`${stats.occupancyRate}%`}
          icon="qr-code"
          delay={0.1}
        />
        <StatsCard
          title="On Leave"
          value={stats.totalStudents - stats.presentToday}
          icon="user-x"
          delay={0.15}
        />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weekly Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <AttendanceAreaChart data={mockAttendanceTrend} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAttendance.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="font-medium text-sm">Student {record.student_id}</p>
                  <p className="text-xs text-muted-foreground">
                    {record.check_in ? formatDateTime(record.check_in) : "Not checked in"}
                  </p>
                </div>
                <Badge
                  variant={
                    record.status === "late"
                      ? "warning"
                      : record.status === "present"
                        ? "success"
                        : "destructive"
                  }
                >
                  {record.is_late_entry ? "Late entry" : record.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
