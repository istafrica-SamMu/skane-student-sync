
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, 
  AlertTriangle,
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
    lateApplicationDeadline: "2024-04-15"
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleMunicipalSettingChange = (field: string, value: any) => {
    setMunicipalSettings(prev => ({ ...prev, [field]: value }));
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

      {/* Save Configuration Button */}
      <div className="flex justify-end">
        <Button 
          className="bg-ike-primary hover:bg-ike-primary/90"
          onClick={handleSaveConfiguration}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>

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
