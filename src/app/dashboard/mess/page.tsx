"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMealSchedule } from "@/lib/data/mock";
import { UtensilsCrossed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessPage() {
  return (
    <div>
      <PageHeader
        title="Mess & Meal Tracker"
        description="Schedules, attendance, preferences, feedback, and wastage analytics"
        actions={<Button>Submit feedback</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMealSchedule.map((meal) => (
          <Card key={meal.meal}>
            <CardContent className="p-5">
              <UtensilsCrossed className="h-8 w-8 text-primary mb-3" />
              <p className="font-semibold">{meal.meal}</p>
              <p className="text-sm text-muted-foreground">{meal.time}</p>
              <p className="mt-3 text-2xl font-bold">{meal.attendance}</p>
              <p className="text-xs text-muted-foreground">attended today</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Average rating 4.2/5 this week. 12 feedback submissions pending review.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
