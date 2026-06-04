import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Hostel configuration, curfew, and system preferences"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hostel Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Hostel name</label>
              <Input defaultValue="Central Hostel Campus" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Curfew time</label>
              <Input type="time" defaultValue="22:00" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Late entry grace (minutes)</label>
              <Input type="number" defaultValue="15" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Fee reminder days before due</label>
              <Select defaultValue="3">
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
              </Select>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked />
              Email notifications
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked />
              SMS alerts for emergencies
            </label>
            <Button>Update preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
