import { PageHeader } from "@/components/dashboard/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  AttendanceAreaChart,
  ComplaintPieChart,
  FeeBarChart,
  OccupancyBarChart,
} from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mockAIInsights,
  mockAttendanceTrend,
  mockComplaintAnalytics,
  mockFeeAnalytics,
  mockOccupancyByBlock,
} from "@/lib/data/mock";
export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="AI Analytics Dashboard"
        description="Predictive insights for attendance, occupancy, fees, and operations"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Predicted Collection"
          value="89%"
          subtitle="June fee on-time rate"
          icon="trending-up"
        />
        <StatsCard
          title="Curfew Risk Score"
          value="Medium"
          subtitle="Block B elevated"
          icon="alert-triangle"
        />
        <StatsCard
          title="Occupancy Forecast"
          value="96%"
          subtitle="Next month"
          icon="users"
        />
        <StatsCard
          title="AI Confidence"
          value="92%"
          subtitle="Model accuracy"
          icon="brain"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceAreaChart data={mockAttendanceTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <OccupancyBarChart data={mockOccupancyByBlock} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fee Payment Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <FeeBarChart data={mockFeeAnalytics} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complaint Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplaintPieChart data={mockComplaintAnalytics} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart Operational Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {mockAIInsights.map((insight) => (
            <div
              key={insight.title}
              className="rounded-xl border border-border bg-muted/20 p-4"
            >
              <p className="font-medium text-sm">{insight.title}</p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {insight.insight}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
