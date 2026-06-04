"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { SearchFilterBar } from "@/components/shared/search-filter";
import { FloatingAction } from "@/components/shared/floating-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_PRIORITIES,
  COMPLAINT_STATUSES,
} from "@/lib/constants";
import { mockComplaints } from "@/lib/data/mock";
import { formatDateTime } from "@/lib/utils";
import type { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus } from "@/types";

const statusVariant: Record<string, "default" | "warning" | "success" | "destructive"> = {
  open: "warning",
  in_progress: "default",
  resolved: "success",
  closed: "secondary" as "default",
  escalated: "destructive",
};

export default function ComplaintsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [blockFilter, setBlockFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [complaints, setComplaints] = useState(mockComplaints);

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchPriority = priorityFilter === "all" || c.priority === priorityFilter;
      const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchBlock =
        blockFilter === "all" ||
        (c.block_id && c.block_id.includes(blockFilter.replace("block-", "")));
      return matchSearch && matchStatus && matchPriority && matchCategory && matchBlock;
    });
  }, [complaints, search, statusFilter, priorityFilter, categoryFilter, blockFilter]);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      title: form.get("title") as string,
      description: form.get("description") as string,
      category: form.get("category") as ComplaintCategory,
      priority: form.get("priority") as ComplaintPriority,
      status: "open" as ComplaintStatus,
      block_id: (form.get("block") as string) || undefined,
      floor: form.get("floor") ? Number(form.get("floor")) : undefined,
      reported_by: "current-user",
      created_at: new Date().toISOString(),
    };
    setComplaints([newComplaint, ...complaints]);
    setModalOpen(false);
    toast.success("Complaint submitted successfully");
  }

  return (
    <div>
      <PageHeader
        title="Complaint Management"
        description="Track, filter, and resolve infrastructure and hostel issues"
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New complaint
          </Button>
        }
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            placeholder="Search complaints..."
          >
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-36"
            >
              <option value="all">All status</option>
              {COMPLAINT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-36"
            >
              <option value="all">All priority</option>
              {COMPLAINT_PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-40"
            >
              <option value="all">All categories</option>
              {COMPLAINT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Select>
            <Select
              value={blockFilter}
              onChange={(e) => setBlockFilter(e.target.value)}
              className="w-32"
            >
              <option value="all">All blocks</option>
              <option value="block-a">Block A</option>
              <option value="block-b">Block B</option>
              <option value="block-c">Block C</option>
              <option value="block-d">Block D</option>
            </Select>
          </SearchFilterBar>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((complaint) => (
          <Card key={complaint.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{complaint.title}</h3>
                  <Badge variant={statusVariant[complaint.status] || "default"}>
                    {complaint.status.replace("_", " ")}
                  </Badge>
                  <Badge
                    variant={
                      complaint.priority === "critical"
                        ? "destructive"
                        : complaint.priority === "high"
                          ? "warning"
                          : "outline"
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {complaint.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {complaint.category}
                  {complaint.block_id ? ` · ${complaint.block_id}` : ""}
                  {complaint.floor ? ` · Floor ${complaint.floor}` : ""}
                  {" · "}
                  {formatDateTime(complaint.created_at)}
                </p>
              </div>
              <div className="flex gap-2">
                {complaint.assigned_to ? (
                  <Button variant="outline" size="sm">
                    Assigned
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm">
                    Assign staff
                  </Button>
                )}
                <Button size="sm">View</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No complaints match your filters.</p>
        ) : null}
      </div>

      <FloatingAction onClick={() => setModalOpen(true)} label="New complaint" />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Raise a complaint"
        description="Report infrastructure, room, or mess-related issues"
        size="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <Input name="title" required placeholder="Brief issue title" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              placeholder="Describe the issue in detail"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <Select name="category" required>
                {COMPLAINT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Priority</label>
              <Select name="priority" required defaultValue="medium">
                {COMPLAINT_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Block</label>
              <Select name="block">
                <option value="">Select block</option>
                <option value="block-a">Block A</option>
                <option value="block-b">Block B</option>
                <option value="block-c">Block C</option>
                <option value="block-d">Block D</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Floor</label>
              <Input name="floor" type="number" min={1} max={10} placeholder="e.g. 3" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit complaint</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
