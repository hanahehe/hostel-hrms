"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCalendarEvents } from "@/lib/data/mock";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startPad = monthStart.getDay();
  const paddedDays = [...Array(startPad).fill(null), ...days];

  return (
    <div>
      <PageHeader
        title="Smart Calendar"
        description="Events, leave, fee reminders, maintenance, and announcements"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{format(current, "MMMM yyyy")}</CardTitle>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrent(subMonths(current, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrent(new Date())}>
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrent(addMonths(current, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {paddedDays.map((day, i) => (
                <div
                  key={i}
                  className={`min-h-[72px] rounded-lg border p-1 text-sm ${
                    day && isToday(day)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  } ${day && !isSameMonth(day, current) ? "opacity-40" : ""}`}
                >
                  {day ? (
                    <>
                      <span className="font-medium">{format(day, "d")}</span>
                      {mockCalendarEvents
                        .filter((e) => e.date === format(day, "yyyy-MM-dd"))
                        .map((e) => (
                          <div
                            key={e.id}
                            className="mt-1 truncate rounded px-1 text-[10px] text-white"
                            style={{ backgroundColor: e.color }}
                          >
                            {e.title}
                          </div>
                        ))}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCalendarEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-border p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{event.title}</p>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{event.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
