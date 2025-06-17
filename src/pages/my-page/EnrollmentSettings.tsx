
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Settings, 
  Calendar, 
  Users, 
  Shield, 
  Clock, 
  GraduationCap,
  AlertTriangle,
  Check,
  Building,
  FileText,
  Save
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const EnrollmentSettings = () => {
  const { toast } = useToast();
  
  const [municipalSettings, setMunicipalSettings] = useState({
    enrollmentStart: "2024-01-15",
    enrollmentEnd: "2024-03-31",
    priorityDeadline: "2024-02-15",
    allowLateApplications: true,
    lateApplicationDeadline: "2024-04-15",
    requireResidencyProof: true,
    enableWaitingLists: true,
    autoProcessApplications: false
  });

  const [schoolSettings, setSchoolSettings] = useState([
    { 
      school: "Centralskolan", 
      maxCapacity: 180, 
      currentEnrolled: 165, 
      waitingList: 12, 
      acceptingApplications: true 
    },
    { 
      school: "Västerskolan", 
      maxCapacity: 150, 
      currentEnrolled: 142, 
      waitingList: 8, 
      acceptingApplications: true 
    },
    { 
      school: "Norrskolan", 
      maxCapacity: 200, 
      currentEnrolled: 195, 
      waitingList: 25, 
      acceptingApplications: false 
    }
  ]);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleMunicipalSettingChange = (field: string, value: any) => {
    setMunicipalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSchoolSettingChange = (index: number, field: string, value: any) => {
    setSchoolSettings(prev => 
      prev.map((school, i) => 
        i === index ? { ...school, [field]: value } : school
      )
    );
  };

  const handleSaveConfiguration = () => {
    setIsSaveModalOpen(true);
  };

  const handleConfirmSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Municipal enrollment settings have been saved successfully",
    });
    setIsSaveModalOpen(false);
  };

  const handleExportConfiguration = () => {
    setIsExportModalOpen(true);
  };

  const handleConfirmExport = () => {
    toast({
      title: "Configuration Exported",
      description: "Enrollment configuration has been exported successfully",
    });
    setIsExportModalOpen(false);
  };

  const handleResetToDefaults = () => {
    setIsResetModalOpen(true);
  };

  const handleConfirmReset = () => {
    toast({
      title: "Settings Reset",
      description: "All enrollment settings have been reset to defaults",
    });
    setIsResetModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">Municipal Enrollment Management</h1>
        <p className="text-ike-neutral-dark mt-2">
          Configure enrollment periods, school capacities, and application requirements for your municipality
        </p>
      </div>

      {/* Municipal Enrollment Periods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-ike-primary" />
            <span>Municipal Enrollment Periods</span>
          </CardTitle>
          <CardDescription>
            Set enrollment periods and deadlines for your municipal schools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="enrollment-start">Enrollment Period Start</Label>
              <Input
                id="enrollment-start"
                type="date"
                value={municipalSettings.enrollmentStart}
                onChange={(e) => handleMunicipalSettingChange('enrollmentStart', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollment-end">Enrollment Period End</Label>
              <Input
                id="enrollment-end"
                type="date"
                value={municipalSettings.enrollmentEnd}
                onChange={(e) => handleMunicipalSettingChange('enrollmentEnd', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority-deadline">Priority Application Deadline</Label>
            <Input
              id="priority-deadline"
              type="date"
              value={municipalSettings.priorityDeadline}
              onChange={(e) => handleMunicipalSettingChange('priorityDeadline', e.target.value)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Allow Late Applications</Label>
              <p className="text-sm text-ike-neutral">
                Accept applications after the standard deadline
              </p>
            </div>
            <Switch
              checked={municipalSettings.allowLateApplications}
              onCheckedChange={(checked) => handleMunicipalSettingChange('allowLateApplications', checked)}
            />
          </div>

          {municipalSettings.allowLateApplications && (
            <div className="p-4 border border-ike-primary/20 rounded-lg bg-ike-primary/5">
              <div className="space-y-2">
                <Label htmlFor="late-deadline">Late Application Deadline</Label>
                <Input
                  id="late-deadline"
                  type="date"
                  value={municipalSettings.lateApplicationDeadline}
                  onChange={(e) => handleMunicipalSettingChange('lateApplicationDeadline', e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* School Capacity Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-ike-primary" />
            <span>School Capacity Management</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage enrollment capacity for each school in your municipality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {schoolSettings.map((school, index) => (
              <div key={school.school} className="p-4 border border-ike-neutral-light rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-ike-neutral-dark">{school.school}</h4>
                    <Badge variant={school.acceptingApplications ? "default" : "secondary"}>
                      {school.acceptingApplications ? "Accepting Applications" : "Closed"}
                    </Badge>
                  </div>
                  <Switch
                    checked={school.acceptingApplications}
                    onCheckedChange={(checked) => handleSchoolSettingChange(index, 'acceptingApplications', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`max-capacity-${index}`}>Max Capacity</Label>
                    <Input
                      id={`max-capacity-${index}`}
                      type="number"
                      value={school.maxCapacity}
                      onChange={(e) => handleSchoolSettingChange(index, 'maxCapacity', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Enrolled</Label>
                    <div className="text-lg font-medium text-ike-neutral-dark pt-2">{school.currentEnrolled}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Waiting List</Label>
                    <div className="text-lg font-medium text-ike-warning pt-2">{school.waitingList}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Available Spots</Label>
                    <div className="text-lg font-medium text-ike-success pt-2">
                      {school.maxCapacity - school.currentEnrolled}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-ike-primary" />
            <span>Application Settings</span>
          </CardTitle>
          <CardDescription>
            Configure application processing and requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Require Residency Proof</Label>
              <p className="text-sm text-ike-neutral">
                Require proof of municipal residency for enrollment
              </p>
            </div>
            <Switch
              checked={municipalSettings.requireResidencyProof}
              onCheckedChange={(checked) => handleMunicipalSettingChange('requireResidencyProof', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Waiting Lists</Label>
              <p className="text-sm text-ike-neutral">
                Create waiting lists when schools reach capacity
              </p>
            </div>
            <Switch
              checked={municipalSettings.enableWaitingLists}
              onCheckedChange={(checked) => handleMunicipalSettingChange('enableWaitingLists', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-Process Applications</Label>
              <p className="text-sm text-ike-neutral">
                Automatically process applications when requirements are met
              </p>
            </div>
            <Switch
              checked={municipalSettings.autoProcessApplications}
              onCheckedChange={(checked) => handleMunicipalSettingChange('autoProcessApplications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Configuration Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-ike-primary" />
            <span>Configuration Management</span>
          </CardTitle>
          <CardDescription>
            Save, export, or reset your enrollment configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Configuration Status</p>
                <p className="text-sm text-green-700 mt-1">
                  All enrollment settings are properly configured and ready to use
                </p>
              </div>
            </div>
          </div>

          {!municipalSettings.enableWaitingLists && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Waiting Lists Disabled</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Applications may be rejected when schools reach capacity without waiting lists enabled.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleExportConfiguration}>
                Export Configuration
              </Button>
              <Button variant="outline" onClick={handleResetToDefaults}>
                Reset to Defaults
              </Button>
            </div>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={handleSaveConfiguration}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Configuration Modal */}
      <Dialog open={isSaveModalOpen} onOpenChange={setIsSaveModalOpen}>
        <DialogContent className="bg-white max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Save className="w-5 h-5 mr-2 text-ike-primary" />
              Save Configuration
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to save the current enrollment configuration? This will apply all settings immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsSaveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSave}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Configuration Modal */}
      <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
        <DialogContent className="bg-white max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Export Configuration
            </DialogTitle>
            <DialogDescription>
              This will export your current enrollment configuration to a file that can be imported later or shared with other administrators.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsExportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmExport}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              Export Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Configuration Modal */}
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="bg-white max-w-md border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <AlertTriangle className="w-5 h-5 mr-2 text-ike-error" />
              Reset to Defaults
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reset all enrollment settings to their default values? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsResetModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmReset}
              variant="destructive"
            >
              Reset to Defaults
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnrollmentSettings;
