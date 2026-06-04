"use client";

import { useState } from "react";
import { AlertTriangle, Bell, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function EmergencyPage() {
  const [sosModal, setSosModal] = useState(false);

  function triggerSOS() {
    toast.error("SOS alert broadcast to warden and security", {
      duration: 5000,
    });
    setSosModal(false);
  }

  return (
    <div>
      <PageHeader
        title="Emergency & Safety"
        description="SOS panic button, incident reporting, and broadcast alerts"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-bold">SOS Panic Button</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Instantly alert wardens, security, and emergency contacts with your live location.
            </p>
            <Button
              variant="destructive"
              size="lg"
              className="mt-6"
              onClick={() => setSosModal(true)}
            >
              Trigger SOS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Broadcast Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Alert title" />
            <textarea
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
              placeholder="Message to all residents..."
            />
            <Button className="w-full">Send broadcast</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Report Incident</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Incident type</label>
            <Select>
              <option>Medical</option>
              <option>Fire</option>
              <option>Security</option>
              <option>Structural</option>
              <option>Other</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>
            <Input placeholder="Block, floor, room" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[100px]" />
          </div>
          <Button>Submit incident report</Button>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-4 rounded-xl border border-border p-4">
        <Phone className="h-8 w-8 text-primary" />
        <div>
          <p className="font-medium">Emergency hotline</p>
          <p className="text-sm text-muted-foreground">+91 1800-HOSTEL-HELP (24/7)</p>
        </div>
      </div>

      <Modal
        open={sosModal}
        onClose={() => setSosModal(false)}
        title="Confirm SOS Alert"
        description="This will immediately notify all emergency responders."
      >
        <p className="text-sm text-muted-foreground mb-4">
          Only use in genuine emergencies. False alarms may result in disciplinary action.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setSosModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={triggerSOS}>
            Confirm SOS
          </Button>
        </div>
      </Modal>
    </div>
  );
}
