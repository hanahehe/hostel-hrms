"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockStaff } from "@/lib/data/mock";
import { Plus } from "lucide-react";

export default function StaffManagementPage() {
  return (
    <div>
      <PageHeader
        title="Staff Management"
        description="Onboarding, shifts, roles, and activity tracking"
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add staff
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockStaff.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.department}</p>
                </div>
                <Badge variant={member.status === "on_duty" ? "success" : "secondary"}>
                  {member.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="mt-4 text-sm">
                <span className="text-muted-foreground">Shift:</span> {member.shift}
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
