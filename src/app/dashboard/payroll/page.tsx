"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Download } from "lucide-react";

const payrollData = [
  { id: "1", name: "Rajesh Kumar", base: 28000, overtime: 4, deductions: 1200, net: 29200, status: "processed" },
  { id: "2", name: "Priya Nair", base: 32000, overtime: 0, deductions: 1500, net: 30500, status: "pending" },
  { id: "3", name: "Amit Singh", base: 25000, overtime: 8, deductions: 1000, net: 26200, status: "processed" },
];

export default function PayrollPage() {
  return (
    <div>
      <PageHeader
        title="Payroll Processing"
        description="Salary calculation, payslips, overtime, and attendance-based pay"
        actions={<Button>Run payroll</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>June 2026 Payroll</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {payrollData.map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-sm text-muted-foreground">
                  Base {formatCurrency(row.base)} · OT {row.overtime}h · Deductions{" "}
                  {formatCurrency(row.deductions)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold">{formatCurrency(row.net)}</p>
                <Badge variant={row.status === "processed" ? "success" : "warning"}>
                  {row.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  Payslip
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
