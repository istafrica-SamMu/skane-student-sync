
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings, 
  Calendar, 
  Users, 
  Shield, 
  Clock, 
  GraduationCap,
  AlertTriangle,
  Check,
  Globe,
  Building
} from "lucide-react";
import { useState } from "react";

const EnrollmentSettings = () => {
  const [systemSettings, setSystemSettings] = useState({
    globalEnrollmentStart: "2024-01-15",
    globalEnrollmentEnd: "2024-03-31",
    allowMunicipalOverrides: true,
    autoEnforceRules: true,
    requireDocumentation: true,
    enableLateEnrollment: false,
    lateEnrollmentDeadline: "2024-04-15",
    maxLateEnrollmentDays: 14
  });

  const [gradeSettings, setGradeSettings] = useState([
    { grade: "Förskoleklass", maxStudents: 25, priorityDeadline: "2024-02-15", enabled: true },
    { grade: "Årskurs 1", maxStudents: 30, priorityDeadline: "2024-02-20", enabled: true },
    { grade: "Årskurs 2", maxStudents: 30, priorityDeadline: "2024-02-20", enabled: true },
    { grade: "Årskurs 3", maxStudents: 30, priorityDeadline: "2024-02-20", enabled: true },
    { grade: "Årskurs 4", maxStudents: 32, priorityDeadline: "2024-02-25", enabled: true },
    { grade: "Årskurs 5", maxStudents: 32, priorityDeadline: "2024-02-25", enabled: true },
    { grade: "Årskurs 6", maxStudents: 32, priorityDeadline: "2024-02-25", enabled: true }
  ]);

  const [enrollmentRules, setEnrollmentRules] = useState({
    residencyRequired: true,
    siblingPriority: true,
    specialNeedsPriority: true,
    geographicZoning: false,
    capacityLimits: true,
    waitingListEnabled: true
  });

  const handleSystemSettingChange = (field: string, value: any) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleGradeSettingChange = (index: number, field: string, value: any) => {
    setGradeSettings(prev => 
      prev.map((grade, i) => 
        i === index ? { ...grade, [field]: value } : grade
      )
    );
  };

  const handleRuleChange = (rule: string, value: boolean) => {
    setEnrollmentRules(prev => ({ ...prev, [rule]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">System Enrollment Management</h1>
        <p className="text-ike-neutral-dark mt-2">
          Configure system-wide enrollment periods, restrictions, and default rules for all municipalities
        </p>
      </div>

      {/* System-wide Enrollment Periods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-ike-primary" />
            <span>Global Enrollment Periods</span>
          </CardTitle>
          <CardDescription>
            Set system-wide enrollment periods that apply to all municipalities by default
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="global-start">Global Enrollment Start</Label>
              <Input
                id="global-start"
                type="date"
                value={systemSettings.globalEnrollmentStart}
                onChange={(e) => handleSystemSettingChange('globalEnrollmentStart', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="global-end">Global Enrollment End</Label>
              <Input
                id="global-end"
                type="date"
                value={systemSettings.globalEnrollmentEnd}
                onChange={(e) => handleSystemSettingChange('globalEnrollmentEnd', e.target.value)}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Allow Municipal Overrides</Label>
              <p className="text-sm text-ike-neutral">
                Permit municipalities to customize enrollment periods within guidelines
              </p>
            </div>
            <Switch
              checked={systemSettings.allowMunicipalOverrides}
              onCheckedChange={(checked) => handleSystemSettingChange('allowMunicipalOverrides', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Late Enrollment</Label>
              <p className="text-sm text-ike-neutral">
                Allow enrollments after the standard deadline
              </p>
            </div>
            <Switch
              checked={systemSettings.enableLateEnrollment}
              onCheckedChange={(checked) => handleSystemSettingChange('enableLateEnrollment', checked)}
            />
          </div>

          {systemSettings.enableLateEnrollment && (
            <div className="grid grid-cols-2 gap-4 p-4 border border-ike-primary/20 rounded-lg bg-ike-primary/5">
              <div className="space-y-2">
                <Label htmlFor="late-deadline">Late Enrollment Deadline</Label>
                <Input
                  id="late-deadline"
                  type="date"
                  value={systemSettings.lateEnrollmentDeadline}
                  onChange={(e) => handleSystemSettingChange('lateEnrollmentDeadline', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-late-days">Max Late Enrollment Days</Label>
                <Input
                  id="max-late-days"
                  type="number"
                  value={systemSettings.maxLateEnrollmentDays}
                  onChange={(e) => handleSystemSettingChange('maxLateEnrollmentDays', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Default Enrollment Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-ike-primary" />
            <span>Default Enrollment Rules</span>
          </CardTitle>
          <CardDescription>
            Configure default enrollment rules that municipalities can customize
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Residency Requirement</Label>
                  <p className="text-xs text-ike-neutral">Student must reside in municipality</p>
                </div>
                <Switch
                  checked={enrollmentRules.residencyRequired}
                  onCheckedChange={(checked) => handleRuleChange('residencyRequired', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Sibling Priority</Label>
                  <p className="text-xs text-ike-neutral">Priority for siblings at same school</p>
                </div>
                <Switch
                  checked={enrollmentRules.siblingPriority}
                  onCheckedChange={(checked) => handleRuleChange('siblingPriority', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Special Needs Priority</Label>
                  <p className="text-xs text-ike-neutral">Priority for special needs students</p>
                </div>
                <Switch
                  checked={enrollmentRules.specialNeedsPriority}
                  onCheckedChange={(checked) => handleRuleChange('specialNeedsPriority', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Geographic Zoning</Label>
                  <p className="text-xs text-ike-neutral">Restrict enrollment by catchment areas</p>
                </div>
                <Switch
                  checked={enrollmentRules.geographicZoning}
                  onCheckedChange={(checked) => handleRuleChange('geographicZoning', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Capacity Limits</Label>
                  <p className="text-xs text-ike-neutral">Enforce maximum class sizes</p>
                </div>
                <Switch
                  checked={enrollmentRules.capacityLimits}
                  onCheckedChange={(checked) => handleRuleChange('capacityLimits', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Waiting Lists</Label>
                  <p className="text-xs text-ike-neutral">Enable waiting lists when capacity reached</p>
                </div>
                <Switch
                  checked={enrollmentRules.waitingListEnabled}
                  onCheckedChange={(checked) => handleRuleChange('waitingListEnabled', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Automatic Rule Enforcement</Label>
              <p className="text-sm text-ike-neutral">
                Automatically enforce enrollment rules and restrictions
              </p>
            </div>
            <Switch
              checked={systemSettings.autoEnforceRules}
              onCheckedChange={(checked) => handleSystemSettingChange('autoEnforceRules', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Require Documentation</Label>
              <p className="text-sm text-ike-neutral">
                Require supporting documents for enrollment
              </p>
            </div>
            <Switch
              checked={systemSettings.requireDocumentation}
              onCheckedChange={(checked) => handleSystemSettingChange('requireDocumentation', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Grade-Specific Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-ike-primary" />
            <span>Grade-Specific Enrollment Windows</span>
          </CardTitle>
          <CardDescription>
            Configure enrollment windows and capacity limits for each grade level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {gradeSettings.map((grade, index) => (
              <div key={grade.grade} className="p-4 border border-ike-neutral-light rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-ike-neutral-dark">{grade.grade}</h4>
                    <Badge variant={grade.enabled ? "default" : "secondary"}>
                      {grade.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Switch
                    checked={grade.enabled}
                    onCheckedChange={(checked) => handleGradeSettingChange(index, 'enabled', checked)}
                  />
                </div>
                
                {grade.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`max-students-${index}`}>Maximum Students</Label>
                      <Input
                        id={`max-students-${index}`}
                        type="number"
                        value={grade.maxStudents}
                        onChange={(e) => handleGradeSettingChange(index, 'maxStudents', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`priority-deadline-${index}`}>Priority Deadline</Label>
                      <Input
                        id={`priority-deadline-${index}`}
                        type="date"
                        value={grade.priorityDeadline}
                        onChange={(e) => handleGradeSettingChange(index, 'priorityDeadline', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status & Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-ike-primary" />
            <span>System Configuration</span>
          </CardTitle>
          <CardDescription>
            Review and apply enrollment management configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Configuration Status</p>
                <p className="text-sm text-green-700 mt-1">
                  All enrollment settings are properly configured and ready to deploy
                </p>
              </div>
            </div>
          </div>

          {!systemSettings.allowMunicipalOverrides && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Restricted Municipal Access</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Municipalities cannot override these settings. Ensure all configurations meet regional requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <div className="flex space-x-3">
              <Button variant="outline">
                Export Configuration
              </Button>
              <Button variant="outline">
                Import Configuration
              </Button>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                Reset to Defaults
              </Button>
              <Button className="bg-ike-primary hover:bg-ike-primary/90">
                Apply Configuration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentSettings;
