
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Calendar, Users } from "lucide-react";

const EnrollmentSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">Enrollment Settings</h1>
        <p className="text-ike-neutral-dark mt-2">
          Configure your enrollment preferences and notification settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-ike-primary" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>
              Choose when and how you want to be notified about enrollment activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm font-medium">
                Email Notifications
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="new-enrollment" className="text-sm font-medium">
                New Enrollment Alerts
              </Label>
              <Switch id="new-enrollment" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="deadline-reminders" className="text-sm font-medium">
                Deadline Reminders
              </Label>
              <Switch id="deadline-reminders" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="status-updates" className="text-sm font-medium">
                Status Change Updates
              </Label>
              <Switch id="status-updates" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-ike-primary" />
              <span>Enrollment Periods</span>
            </CardTitle>
            <CardDescription>
              View and configure enrollment periods for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-period" className="text-sm font-medium">
                Current Enrollment Period
              </Label>
              <Input 
                id="current-period" 
                value="2024 Spring Enrollment" 
                disabled 
                className="bg-ike-neutral-light"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </Label>
              <Input 
                id="start-date" 
                type="date" 
                defaultValue="2024-02-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </Label>
              <Input 
                id="end-date" 
                type="date" 
                defaultValue="2024-03-15"
              />
            </div>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary/90">
              Update Period Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-ike-primary" />
              <span>Default Settings</span>
            </CardTitle>
            <CardDescription>
              Configure default settings for new enrollments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="default-grade" className="text-sm font-medium">
                Default Grade Level
              </Label>
              <Input 
                id="default-grade" 
                placeholder="Enter default grade level"
                defaultValue="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auto-assign" className="text-sm font-medium">
                Auto-assign School Units
              </Label>
              <Switch id="auto-assign" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="require-documents" className="text-sm font-medium">
                Require Document Upload
              </Label>
              <Switch id="require-documents" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-ike-primary" />
              <span>System Preferences</span>
            </CardTitle>
            <CardDescription>
              General system preferences for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm font-medium">
                Timezone
              </Label>
              <Input 
                id="timezone" 
                defaultValue="Europe/Stockholm" 
                disabled
                className="bg-ike-neutral-light"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium">
                Preferred Language
              </Label>
              <Input 
                id="language" 
                defaultValue="Swedish" 
                disabled
                className="bg-ike-neutral-light"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm font-medium">
                Dark Mode
              </Label>
              <Switch id="dark-mode" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default EnrollmentSettings;
