
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Calendar, 
  Clock, 
  Download, 
  RefreshCw, 
  Settings, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Play,
  History,
  Database,
  GraduationCap,
  FileCheck,
  Users,
  Filter,
  ExternalLink,
  AlertOctagon,
} from "lucide-react";
import { ErrorDetailsModal, ErrorDetailsModalProps } from "@/components/integration/ErrorDetailsModal";

const UHRBEDAIntegration = () => {
  const [isManualSyncOpen, setIsManualSyncOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [personalNumber, setPersonalNumber] = useState("");
  const [includeGraduated, setIncludeGraduated] = useState(true);
  const [includeCurrent, setIncludeCurrent] = useState(true);
  const [syncTime, setSyncTime] = useState("02:30");
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedSyncErrors, setSelectedSyncErrors] = useState<any[]>([]);
  const [selectedSyncDate, setSelectedSyncDate] = useState("");

  // Mock data for current configuration
  const currentConfig = {
    lastSync: "2024-01-16 02:30:00",
    nextSync: "2024-01-17 02:30:00",
    status: "active",
    graduatedStudents: true,
    currentStudents: true,
    recordsProcessed: 8642,
    successRate: "98.7%",
    syncTime: "02:30"
  };

  // Mock data for sync history
  const syncHistory = [
    {
      id: 1,
      date: "2024-01-16 02:30:00",
      type: "Scheduled",
      status: "success",
      graduatedRecords: 412,
      currentRecords: 8230,
      diplomaUpdates: 23,
      gradeUpdates: 156,
      duration: "32 minutes",
      errors: 0
    },
    {
      id: 2,
      date: "2024-01-15 16:45:00",
      type: "Manual",
      status: "success",
      graduatedRecords: 1,
      currentRecords: 0,
      diplomaUpdates: 1,
      gradeUpdates: 0,
      duration: "3 seconds",
      errors: 0
    },
    {
      id: 3,
      date: "2024-01-15 02:30:00",
      type: "Scheduled",
      status: "warning",
      graduatedRecords: 398,
      currentRecords: 8156,
      diplomaUpdates: 18,
      gradeUpdates: 142,
      duration: "35 minutes",
      errors: 2
    },
    {
      id: 4,
      date: "2024-01-14 02:30:00",
      type: "Scheduled",
      status: "success",
      graduatedRecords: 405,
      currentRecords: 8089,
      diplomaUpdates: 31,
      gradeUpdates: 189,
      duration: "28 minutes",
      errors: 0
    }
  ];

  // Mock data for errors
  const errorDetails = {
    3: [
      {
        id: 1,
        recordType: "Student Record: 199001011234",
        message: "Invalid diploma format received from BEDA. Expected XML format but received malformed data.",
        timestamp: "2024-01-15 02:45:12",
        severity: "medium"
      },
      {
        id: 2,
        recordType: "Student Record: 199212123456",
        message: "Connection timeout when retrieving student graduation data.",
        timestamp: "2024-01-15 02:48:33",
        severity: "low"
      }
    ]
  };

  const handleManualSync = () => {
    console.log("Triggering manual BEDA sync for:", personalNumber);
    setIsManualSyncOpen(false);
    setPersonalNumber("");
  };

  const handleConfigUpdate = () => {
    console.log("Updating BEDA config:", { includeGraduated, includeCurrent, syncTime });
    setIsConfigOpen(false);
  };

  const handleRefreshStatus = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleViewErrors = (syncId: number, date: string) => {
    setSelectedSyncErrors(errorDetails[syncId as keyof typeof errorDetails] || []);
    setSelectedSyncDate(date);
    setIsErrorModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
      case 'error':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-ike-neutral" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary mb-2">UHR BEDA Integration</h1>
          <p className="text-ike-neutral">
            Manage student diploma and graduation data integration with UHR's BEDA system
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isManualSyncOpen} onOpenChange={setIsManualSyncOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Manual Sync
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual BEDA Sync</DialogTitle>
                <DialogDescription>
                  Trigger manual sync for individual student records from UHR BEDA. This can be used for urgent diploma or grade updates.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="personalNumber">Personal Number</Label>
                  <Input
                    id="personalNumber"
                    placeholder="YYYYMMDD-XXXX"
                    value={personalNumber}
                    onChange={(e) => setPersonalNumber(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsManualSyncOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleManualSync} disabled={!personalNumber}>
                  <Download className="w-4 h-4 mr-2" />
                  Sync Record
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleRefreshStatus} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
        </div>
      </div>

      {/* Current Configuration Card */}
      <Card className="border border-ike-neutral-light">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-ike-primary flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                BEDA Sync Configuration
              </CardTitle>
              <CardDescription className="text-ike-neutral">
                Active sync schedule and student filtering for UHR BEDA integration
              </CardDescription>
            </div>
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update BEDA Configuration</DialogTitle>
                  <DialogDescription>
                    Configure sync settings and student filtering for UHR BEDA integration.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="syncTime">Daily Sync Time</Label>
                    <Input
                      id="syncTime"
                      type="time"
                      value={syncTime}
                      onChange={(e) => setSyncTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Student Categories to Sync</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="graduated"
                        checked={includeGraduated}
                        onCheckedChange={setIncludeGraduated}
                      />
                      <Label htmlFor="graduated">Include Graduated Students</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="current"
                        checked={includeCurrent}
                        onCheckedChange={setIncludeCurrent}
                      />
                      <Label htmlFor="current">Include Current Students</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfigUpdate}>
                    Update Configuration
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Sync Schedule</p>
              <p className="text-ike-neutral flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Daily at {currentConfig.syncTime}
              </p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Last Sync</p>
              <p className="text-ike-neutral">{currentConfig.lastSync}</p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Next Sync</p>
              <p className="text-ike-neutral">{currentConfig.nextSync}</p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Success Rate</p>
              <p className="text-ike-neutral">{currentConfig.successRate}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-ike-neutral-dark">Status: Active</span>
              </div>
              <div className="text-sm text-ike-neutral">
                Last sync processed {currentConfig.recordsProcessed.toLocaleString()} records
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Graduated Students: {currentConfig.graduatedStudents ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Current Students: {currentConfig.currentStudents ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync History */}
      <Card className="border border-ike-neutral-light">
        <CardHeader>
          <CardTitle className="text-ike-primary flex items-center gap-2">
            <History className="w-5 h-5" />
            BEDA Sync History
          </CardTitle>
          <CardDescription className="text-ike-neutral">
            Recent synchronization activities with UHR BEDA system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Records Synced</TableHead>
                  <TableHead>Updates</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Errors</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syncHistory.map((sync) => (
                  <TableRow key={sync.id}>
                    <TableCell className="font-medium">{sync.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {sync.type === 'Scheduled' ? 
                          <Clock className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                        {sync.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(sync.status)}
                        {getStatusBadge(sync.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{sync.graduatedRecords.toLocaleString()} graduated</div>
                        <div className="text-ike-neutral">{sync.currentRecords.toLocaleString()} current</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {sync.diplomaUpdates} diplomas
                        </div>
                        <div className="flex items-center gap-1 text-ike-neutral">
                          <FileCheck className="w-3 h-3" />
                          {sync.gradeUpdates} grades
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{sync.duration}</TableCell>
                    <TableCell>
                      {sync.errors > 0 ? (
                        <Badge variant="destructive">{sync.errors}</Badge>
                      ) : (
                        <span className="text-ike-neutral">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {sync.errors > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center px-2"
                          onClick={() => handleViewErrors(sync.id, sync.date)}
                        >
                          <AlertOctagon className="w-4 h-4 mr-1 text-yellow-600" />
                          <span>View</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ErrorDetailsModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        integrationName="UHR BEDA"
        syncDate={selectedSyncDate}
        errors={selectedSyncErrors}
      />
    </div>
  );
};

export default UHRBEDAIntegration;
