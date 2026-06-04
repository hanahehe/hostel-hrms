"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockComplaints } from "@/lib/data/mock";
import Link from "next/link";
import { MessageSquareWarning, Wrench } from "lucide-react";

export default function StaffDeskPage() {
  const assigned = mockComplaints.filter((c) => c.assigned_to);

  return (
    <div>
      <PageHeader
        title="Staff Desk"
        description="Your assigned tasks, complaints, and shift overview"
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{assigned.length}</p>
              <p className="text-sm text-muted-foreground">Assigned tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Today&apos;s shift</p>
            <p className="text-lg font-semibold">Morning · 6 AM - 2 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant="success" className="mt-1">On duty</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquareWarning className="h-4 w-4" />
            Assigned Complaints
          </CardTitle>
          <Link href="/dashboard/complaints">
            <Button variant="outline" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {assigned.map((c) => (
            <div key={c.id} className="flex justify-between items-center rounded-lg border p-3">
              <div>
                <p className="font-medium text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{c.category}</p>
              </div>
              <Badge>{c.status.replace("_", " ")}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
