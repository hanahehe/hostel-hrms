"use client";

import { Download, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { FeeBarChart } from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockFees, mockFeeAnalytics } from "@/lib/data/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function FeesPage() {
  return (
    <div>
      <PageHeader
        title="Fee & Rent Management"
        description="Hostel rent, mess fees, invoices, and payment tracking"
        actions={
          <Button>
            <CreditCard className="h-4 w-4" />
            Pay online
          </Button>
        }
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Financial Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <FeeBarChart data={mockFeeAnalytics} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Dues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockFees.map((fee) => (
            <div
              key={fee.id}
              className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium capitalize">{fee.type.replace("_", " ")}</p>
                <p className="text-sm text-muted-foreground">
                  Due {formatDate(fee.due_date)}
                  {fee.invoice_number ? ` · ${fee.invoice_number}` : ""}
                </p>
                <p className="text-lg font-semibold mt-1">{formatCurrency(fee.amount)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={fee.status === "overdue" ? "destructive" : "warning"}>
                  {fee.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                  Receipt
                </Button>
                <Button size="sm">Pay now</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
