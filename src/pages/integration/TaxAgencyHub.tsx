
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
  AlertOctagon
} from "lucide-react";
import { ErrorDetailsModal } from "@/components/integration/ErrorDetailsModal";

const TaxAgencyHub = () => {
  const [isManualUpdateOpen, setIsManualUpdateOpen] = useState(false);
  const [isScheduleConfigOpen, setIsScheduleConfigOpen] = useState(false);
  const [personalNumber, setPersonalNumber] = useState("");
  const [selectedDay, setSelectedDay] = useState("tuesday");
  const [selectedTime, setSelectedTime] = useState("02:00");
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedSyncErrors, setSelectedSyncErrors] = useState<any[]>([]);
  const [selectedSyncDate, setSelectedSyncDate] = useState("");

  // Mock data for current configuration
  const currentConfig = {
    scheduledDay: "Tuesday",
    scheduledTime: "02:00",
    lastUpdate: "2024-01-16 02:00:00",
    nextUpdate: "2024-01-23 02:00:00",
    status: "active",
    recordsUpdated: 15247,
    successRate: "99.2%"
  };

  // Mock data for recent sync history
  const syncHistory = [
    {
      id: 1,
      date: "2024-01-16 02:00:00",
      type: "Scheduled",
      status: "success",
      recordsProcessed: 15247,
      recordsUpdated: 1423,
      duration: "45 minutes",
      errors: 0
    },
    {
      id: 2,
      date: "2024-01-15 14:30:00",
      type: "Manual",
      status: "success",
      recordsProcessed: 1,
      recordsUpdated: 1,
      duration: "2 seconds",
      errors: 0
    },
    {
      id: 3,
      date: "2024-01-09 02:00:00",
      type: "Scheduled",
      status: "success",
      recordsProcessed: 14891,
      recordsUpdated: 1205,
      duration: "42 minutes",
      errors: 0
    },
    {
      id: 4,
      date: "2024-01-02 02:00:00",
      type: "Scheduled",
      status: "warning",
      recordsProcessed: 14632,
      recordsUpdated: 1156,
      duration: "48 minutes",
      errors: 3
    }
  ];

  // Mock error data
  const errorDetails = {
    4: [
      {
        id: 1,
        recordType: "Municipality: Malmö",
        message: "Connection timeout when retrieving population data for 250 records.",
        timestamp: "2024-01-02 02:15:23",
        severity: "medium"
      },
      {
        id: 2,
        recordType: "Municipality: Lund",
        message: "Invalid personal number format detected in batch import.",
        timestamp: "2024-01-02 02:28:45",
        severity: "low"
      },
      {
        id: 3,
        recordType: "Authentication",
        message: "Temporary authentication failure with Tax Agency API.",
        timestamp: "2024-01-02 02:35:12",
        severity: "high"
      }
    ]
  };

  const handleManualUpdate = () => {
    console.log("Triggering manual update for:", personalNumber);
    setIsManualUpdateOpen(false);
    setPersonalNumber("");
  };

  const handleScheduleUpdate = () => {
    console.log("Updating schedule:", selectedDay, selectedTime);
    setIsScheduleConfigOpen(false);
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
          <h1 className="text-3xl font-bold text-ike-primary mb-2">Tax Agency Hub Integration</h1>
          <p className="text-ike-neutral">
            Manage personal and population registration data integration with Tax Agency's Hub for Skåne Municipalities
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isManualUpdateOpen} onOpenChange={setIsManualUpdateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                Manual Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Record Update</DialogTitle>
                <DialogDescription>
                  Update individual records from Tax Agency Hub. This can be used for urgent updates outside the scheduled sync.
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
                <Button variant="outline" onClick={() => setIsManualUpdateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleManualUpdate} disabled={!personalNumber}>
                  <Download className="w-4 h-4 mr-2" />
                  Update Record
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
                <Database className="w-5 h-5" />
                Current Configuration
              </CardTitle>
              <CardDescription className="text-ike-neutral">
                Active sync schedule and status for Tax Agency Hub
              </CardDescription>
            </div>
            <Dialog open={isScheduleConfigOpen} onOpenChange={setIsScheduleConfigOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Sync Schedule</DialogTitle>
                  <DialogDescription>
                    Configure the scheduled update times for Tax Agency Hub integration. Changes will take effect from the next scheduled update.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="day">Scheduled Day</Label>
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="time">Scheduled Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsScheduleConfigOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleScheduleUpdate}>
                    Update Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Schedule</p>
              <p className="text-ike-neutral flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {currentConfig.scheduledDay}s at {currentConfig.scheduledTime}
              </p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Last Update</p>
              <p className="text-ike-neutral">{currentConfig.lastUpdate}</p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Next Update</p>
              <p className="text-ike-neutral">{currentConfig.nextUpdate}</p>
            </div>
            <div>
              <p className="font-medium text-ike-neutral-dark mb-1">Success Rate</p>
              <p className="text-ike-neutral">{currentConfig.successRate}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-ike-neutral-dark">Status: Active</span>
              </div>
              <div className="text-sm text-ike-neutral">
                Last sync processed {currentConfig.recordsUpdated.toLocaleString()} records
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
            Sync History
          </CardTitle>
          <CardDescription className="text-ike-neutral">
            Recent synchronization activities with Tax Agency Hub
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
                  <TableHead>Records</TableHead>
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
                        <div>{sync.recordsProcessed.toLocaleString()} processed</div>
                        <div className="text-ike-neutral">{sync.recordsUpdated.toLocaleString()} updated</div>
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
        integrationName="Tax Agency Hub"
        syncDate={selectedSyncDate}
        errors={selectedSyncErrors}
      />
    </div>
  );
};

export default TaxAgencyHub;
