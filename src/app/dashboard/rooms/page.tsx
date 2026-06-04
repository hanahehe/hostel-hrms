"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRooms } from "@/lib/data/mock";

const statusColors: Record<string, "success" | "warning" | "default"> = {
  vacant: "success",
  partial: "warning",
  full: "default",
};

export default function RoomsPage() {
  const vacant = mockRooms.filter((r) => r.status === "vacant").length;

  return (
    <div>
      <PageHeader
        title="Room & Hostel Management"
        description="Allocation, vacancy, transfers, and floor map"
        actions={<Button>Request transfer</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{mockRooms.length}</p>
            <p className="text-sm text-muted-foreground">Tracked rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{vacant}</p>
            <p className="text-sm text-muted-foreground">Vacant</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">94%</p>
            <p className="text-sm text-muted-foreground">Occupancy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold">{room.number}</p>
                  <p className="text-sm text-muted-foreground">
                    {room.block} · Floor {room.floor}
                  </p>
                </div>
                <Badge variant={statusColors[room.status]}>{room.status}</Badge>
              </div>
              <p className="mt-4 text-sm">
                {room.occupied}/{room.capacity} occupied
              </p>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
