"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { mockLeaveRequests } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";
import type { LeaveRequest } from "@/types";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState(mockLeaveRequests);
  const [modalOpen, setModalOpen] = useState(false);

  function approve(id: string) {
    setLeaves(
      leaves.map((l) => (l.id === id ? { ...l, status: "approved" as const } : l))
    );
    toast.success("Leave request approved");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      student_id: "stu-current",
      start_date: form.get("start_date") as string,
      end_date: form.get("end_date") as string,
      reason: form.get("reason") as string,
      status: "pending",
      is_emergency: form.get("emergency") === "on",
      created_at: new Date().toISOString(),
    };
    setLeaves([newLeave, ...leaves]);
    setModalOpen(false);
    toast.success("Leave request submitted");
  }

  return (
    <div>
      <PageHeader
        title="Leave Management"
        description="Request, approve, and track student leave with parent consent"
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Request leave
          </Button>
        }
      />

      <div className="space-y-3">
        {leaves.map((leave) => (
          <Card key={leave.id}>
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">
                    {formatDate(leave.start_date)} — {formatDate(leave.end_date)}
                  </p>
                  {leave.is_emergency ? (
                    <Badge variant="destructive">Emergency</Badge>
                  ) : null}
                  <Badge
                    variant={
                      leave.status === "approved"
                        ? "success"
                        : leave.status === "pending"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {leave.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{leave.reason}</p>
              </div>
              {leave.status === "pending" ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => approve(leave.id)}>
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request leave"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Start date</label>
              <Input name="start_date" type="date" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End date</label>
              <Input name="end_date" type="date" required />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Reason</label>
            <textarea
              name="reason"
              required
              rows={3}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="emergency" />
            Emergency leave
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
