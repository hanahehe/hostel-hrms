"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockVisitors } from "@/lib/data/mock";
import { formatDateTime } from "@/lib/utils";
import { Plus, ShieldCheck } from "lucide-react";

export default function VisitorsPage() {
  return (
    <div>
      <PageHeader
        title="Visitor Management"
        description="Registration, OTP verification, digital passes, and visiting hours"
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Register visitor
          </Button>
        }
      />

      <div className="space-y-3">
        {mockVisitors.map((visitor) => (
          <Card key={visitor.id}>
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{visitor.name}</p>
                <p className="text-sm text-muted-foreground">
                  Visiting {visitor.visiting} · Room {visitor.room}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Check-in {formatDateTime(visitor.check_in)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {visitor.otp_verified ? (
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    OTP verified
                  </Badge>
                ) : (
                  <Badge variant="warning">Pending OTP</Badge>
                )}
                <Badge>{visitor.status.replace("_", " ")}</Badge>
                <Button size="sm">Digital pass</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
