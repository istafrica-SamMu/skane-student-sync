
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  Users,
  Settings,
  Play,
  Pause,
  Calendar,
  Clock,
  MapPin,
  School,
  UserCheck,
  Mail,
  Phone,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdmissionIntegration = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [lastSync, setLastSync] = useState("2024-08-15 14:30:00");
  const [nextSync, setNextSync] = useState("2024-08-16 02:00:00");
  const { toast } = useToast();

  // Mock configuration data
  const [config, setConfig] = useState({
    autoSync: true,
    syncTime: "02:00",
    includePlacementInfo: true,
    includeGradeData: true,
    includeContactInfo: true,
    dailySyncEnabled: true,
    syncPeriodStart: "2024-08-01",
    syncPeriodEnd: "2024-09-15",
    specialSyncDate: "2024-07-01"
  });

  // Mock statistics data
  const admissionStats = {
    totalStudents: 2847,
    newAdmissions: 156,
    schoolTransfers: 23,
    pendingPlacements: 45,
    completedPlacements: 2802,
    lastSyncRecords: 89
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "admission",
      student: "Anna Andersson",
      schoolUnit: "Malmö Gymnasium",
      studyPath: "Naturvetenskap",
      timestamp: "2024-08-15 14:28:00",
      status: "completed"
    },
    {
      id: 2,
      type: "transfer",
      student: "Erik Johansson",
      schoolUnit: "Lund Technical School",
      studyPath: "Teknik",
      timestamp: "2024-08-15 14:25:00",
      status: "completed"
    },
    {
      id: 3,
      type: "grade_update",
      student: "Maria Svensson",
      data: "Merit value updated",
      timestamp: "2024-08-15 14:20:00",
      status: "completed"
    }
  ];

  const handleManualSync = () => {
    setIsRunning(true);
    toast({
      title: "Manual Sync Started",
      description: "Admission integration sync has been initiated manually.",
    });
    
    // Simulate sync process
    setTimeout(() => {
      setIsRunning(false);
      setLastSync(new Date().toLocaleString('sv-SE'));
      toast({
        title: "Sync Completed",
        description: "Admission data has been successfully synchronized.",
      });
    }, 3000);
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Admission integration settings have been updated.",
    });
    setShowConfigModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Admission Integration</h1>
          <p className="text-ike-neutral mt-2">
            Integration with admission system for student placements and grade data
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={() => setShowConfigModal(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleManualSync}
            disabled={isRunning}
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? "Syncing..." : "Manual Sync"}
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{admissionStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-ike-neutral">In admission system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">New Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{admissionStats.newAdmissions}</div>
            <p className="text-xs text-ike-neutral">Since last sync</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">School Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{admissionStats.schoolTransfers}</div>
            <p className="text-xs text-ike-neutral">Placement changes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Pending Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{admissionStats.pendingPlacements}</div>
            <p className="text-xs text-ike-neutral">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Activity className="w-5 h-5 mr-2 text-ike-primary" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-ike-neutral">Last Sync</Label>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-ike-neutral" />
                <span className="text-ike-neutral-dark">{lastSync}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-ike-neutral">Next Scheduled Sync</Label>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-ike-neutral" />
                <span className="text-ike-neutral-dark">{nextSync}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-ike-neutral">Sync Status</Label>
              <div className="flex items-center">
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 text-ike-primary animate-spin" />
                    <span className="text-ike-primary">Running</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-ike-success" />
                    <span className="text-ike-success">Idle</span>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-ike-neutral">Records Processed</Label>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-ike-neutral" />
                <span className="text-ike-neutral-dark">{admissionStats.lastSyncRecords}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="schedule">Sync Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Placement Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <School className="w-5 h-5 mr-2 text-ike-primary" />
                  Student Placement Data
                </CardTitle>
                <CardDescription>Information retrieved from admission system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Personal Identification</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Study Path</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Start Date</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">School Unit</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
              </CardContent>
            </Card>

            {/* Grade and Merit Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
                  Grade and Merit Data
                </CardTitle>
                <CardDescription>Academic information from admission system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Grade Lines</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Merit Value</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Eligibility</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">National Grade Database</span>
                  <AlertCircle className="w-4 h-4 text-ike-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <UserCheck className="w-5 h-5 mr-2 text-ike-primary" />
                Contact Information Integration
              </CardTitle>
              <CardDescription>Email and phone data for students in Skåne and western Blekinge cooperation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-ike-neutral" />
                  <span className="text-sm text-ike-neutral">Email Addresses</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-ike-neutral" />
                  <span className="text-sm text-ike-neutral">Phone Numbers</span>
                  <CheckCircle className="w-4 h-4 text-ike-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Activity className="w-5 h-5 mr-2 text-ike-primary" />
                Recent Integration Activities
              </CardTitle>
              <CardDescription>Latest admission system integrations and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-ike-primary rounded-full"></div>
                      <div>
                        <p className="font-medium text-ike-neutral-dark">
                          {activity.type === 'admission' && 'New Admission'}
                          {activity.type === 'transfer' && 'School Transfer'}
                          {activity.type === 'grade_update' && 'Grade Update'}
                        </p>
                        <p className="text-sm text-ike-neutral">
                          {activity.student && `${activity.student} - `}
                          {activity.schoolUnit && `${activity.schoolUnit} - `}
                          {activity.studyPath && `${activity.studyPath}`}
                          {activity.data && activity.data}
                        </p>
                        <p className="text-xs text-ike-neutral">{activity.timestamp}</p>
                      </div>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
                Sync Schedule Configuration
              </CardTitle>
              <CardDescription>Manage automatic sync schedules and special dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-ike-neutral-dark">Special Sync Dates</h3>
                  <div className="space-y-2">
                    <Label className="text-sm text-ike-neutral">July 1st Integration</Label>
                    <Input value="2024-07-01" className="border-ike-primary/20" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-ike-neutral-dark">Daily Sync Period</h3>
                  <div className="space-y-2">
                    <Label className="text-sm text-ike-neutral">Start Date</Label>
                    <Input value="2024-08-01" className="border-ike-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-ike-neutral">End Date</Label>
                    <Input value="2024-09-15" className="border-ike-primary/20" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-ike-neutral-dark">Current Schedule Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium text-ike-neutral-dark">July 1st Sync</p>
                    <p className="text-sm text-ike-success">Completed</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium text-ike-neutral-dark">Daily Sync (Aug-Sep)</p>
                    <p className="text-sm text-ike-primary">Active</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium text-ike-neutral-dark">Manual Triggers</p>
                    <p className="text-sm text-ike-neutral">Available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Modal */}
      <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Settings className="w-5 h-5 mr-2 text-ike-primary" />
              Admission Integration Configuration
            </DialogTitle>
            <DialogDescription>
              Configure settings for the admission system integration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sync Time</Label>
                <Input 
                  value={config.syncTime} 
                  onChange={(e) => setConfig({...config, syncTime: e.target.value})}
                  className="border-ike-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Special Sync Date</Label>
                <Input 
                  value={config.specialSyncDate} 
                  onChange={(e) => setConfig({...config, specialSyncDate: e.target.value})}
                  className="border-ike-primary/20"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Include Placement Information</Label>
                <Switch 
                  checked={config.includePlacementInfo}
                  onCheckedChange={(checked) => setConfig({...config, includePlacementInfo: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Include Grade Data</Label>
                <Switch 
                  checked={config.includeGradeData}
                  onCheckedChange={(checked) => setConfig({...config, includeGradeData: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Include Contact Information</Label>
                <Switch 
                  checked={config.includeContactInfo}
                  onCheckedChange={(checked) => setConfig({...config, includeContactInfo: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Daily Sync</Label>
                <Switch 
                  checked={config.dailySyncEnabled}
                  onCheckedChange={(checked) => setConfig({...config, dailySyncEnabled: checked})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleSaveConfig}
            >
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdmissionIntegration;
