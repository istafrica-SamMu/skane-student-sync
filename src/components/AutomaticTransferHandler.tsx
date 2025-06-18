
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, Clock, CheckCircle, AlertTriangle, Eye } from "lucide-react";

interface TransferEvent {
  id: string;
  studentId: string;
  studentName: string;
  fromMunicipality: string;
  toMunicipality: string;
  transferDate: string;
  affectedAmounts: number;
  status: "pending" | "processed" | "failed";
  autoEndDate?: string;
  createdAt: string;
}

interface AutomaticTransferHandlerProps {
  onTransferProcessed: (transferId: string) => void;
}

export const AutomaticTransferHandler = ({ onTransferProcessed }: AutomaticTransferHandlerProps) => {
  const { toast } = useToast();
  const [transfers, setTransfers] = useState<TransferEvent[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferEvent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Mock transfer events - in real implementation, this would come from API
  useEffect(() => {
    const mockTransfers: TransferEvent[] = [
      {
        id: "transfer-001",
        studentId: "student-001",
        studentName: "Anna Andersson",
        fromMunicipality: "Malmö",
        toMunicipality: "Lund",
        transferDate: "2024-02-15",
        affectedAmounts: 2,
        status: "pending",
        autoEndDate: "2024-02-14",
        createdAt: "2024-02-15T09:00:00Z"
      },
      {
        id: "transfer-002",
        studentId: "student-002",
        studentName: "Erik Svensson",
        fromMunicipality: "Lund",
        toMunicipality: "Helsingborg",
        transferDate: "2024-02-10",
        affectedAmounts: 1,
        status: "processed",
        autoEndDate: "2024-02-09",
        createdAt: "2024-02-10T14:30:00Z"
      },
      {
        id: "transfer-003",
        studentId: "student-003",
        studentName: "Maria Nilsson",
        fromMunicipality: "Helsingborg",
        toMunicipality: "Malmö",
        transferDate: "2024-02-12",
        affectedAmounts: 3,
        status: "failed",
        createdAt: "2024-02-12T11:15:00Z"
      }
    ];
    
    setTransfers(mockTransfers);
  }, []);

  const filteredTransfers = transfers.filter(transfer =>
    transfer.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.fromMunicipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.toMunicipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcessTransfer = (transferId: string) => {
    console.log("Processing transfer:", transferId);
    
    setTransfers(prev => prev.map(transfer => 
      transfer.id === transferId 
        ? { ...transfer, status: "processed" as const }
        : transfer
    ));

    onTransferProcessed(transferId);
    
    toast({
      title: "Transfer Processed",
      description: "Additional amounts have been automatically ended due to municipality transfer.",
    });
  };

  const handleRetryTransfer = (transferId: string) => {
    console.log("Retrying transfer:", transferId);
    
    setTransfers(prev => prev.map(transfer => 
      transfer.id === transferId 
        ? { ...transfer, status: "pending" as const }
        : transfer
    ));
    
    toast({
      title: "Transfer Retry Initiated",
      description: "Attempting to process the failed transfer again.",
    });
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    toast({
      title: isMonitoring ? "Monitoring Disabled" : "Monitoring Enabled",
      description: isMonitoring 
        ? "Automatic transfer detection has been disabled." 
        : "Automatic transfer detection has been enabled.",
    });
  };

  const openDetailModal = (transfer: TransferEvent) => {
    setSelectedTransfer(transfer);
    setIsDetailModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-ike-success text-white">Processed</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "failed":
        return <Badge className="bg-ike-error text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4 text-ike-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-ike-warning" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-ike-error" />;
      default:
        return null;
    }
  };

  const pendingCount = transfers.filter(t => t.status === "pending").length;
  const failedCount = transfers.filter(t => t.status === "failed").length;

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Monitoring Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-lg font-bold ${isMonitoring ? 'text-ike-success' : 'text-ike-error'}`}>
                {isMonitoring ? 'Active' : 'Inactive'}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleMonitoring}
                className={isMonitoring ? 'text-ike-error hover:text-ike-error' : 'text-ike-success hover:text-ike-success'}
              >
                {isMonitoring ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Transfers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{pendingCount}</div>
            <div className="text-xs text-ike-neutral">Awaiting processing</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Failed Transfers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">{failedCount}</div>
            <div className="text-xs text-ike-neutral">Require attention</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{transfers.filter(t => t.status === "processed").length}</div>
            <div className="text-xs text-ike-neutral">Successfully handled</div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer Events Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowRightLeft className="w-5 h-5 mr-2 text-ike-primary" />
            Municipality Transfer Events
          </CardTitle>
          <CardDescription>
            Automatic detection and handling of student municipality transfers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search by student name or municipality..."
                className="border-ike-primary/20 focus:border-ike-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Student</TableHead>
                  <TableHead className="font-medium">Transfer Route</TableHead>
                  <TableHead className="font-medium">Transfer Date</TableHead>
                  <TableHead className="font-medium">Affected Amounts</TableHead>
                  <TableHead className="font-medium">Auto End Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell className="font-medium text-ike-neutral-dark">
                      <div>
                        <div>{transfer.studentName}</div>
                        <div className="text-xs text-ike-neutral">ID: {transfer.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{transfer.fromMunicipality}</span>
                        <ArrowRightLeft className="w-3 h-3 text-ike-neutral" />
                        <span className="text-sm font-medium">{transfer.toMunicipality}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transfer.transferDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transfer.affectedAmounts} amounts</Badge>
                    </TableCell>
                    <TableCell>
                      {transfer.autoEndDate ? (
                        <span className="text-ike-error">{transfer.autoEndDate}</span>
                      ) : (
                        <span className="text-ike-neutral">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transfer.status)}
                        {getStatusBadge(transfer.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openDetailModal(transfer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {transfer.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-ike-success hover:text-ike-success"
                            onClick={() => handleProcessTransfer(transfer.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {transfer.status === "failed" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-ike-warning hover:text-ike-warning"
                            onClick={() => handleRetryTransfer(transfer.id)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-ike-neutral-dark">Transfer Details</DialogTitle>
            <DialogDescription>
              Detailed information about the municipality transfer and affected amounts
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransfer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-ike-neutral-dark">Student Information</h4>
                  <p className="text-sm text-ike-neutral">Name: {selectedTransfer.studentName}</p>
                  <p className="text-sm text-ike-neutral">ID: {selectedTransfer.studentId}</p>
                </div>
                <div>
                  <h4 className="font-medium text-ike-neutral-dark">Transfer Details</h4>
                  <p className="text-sm text-ike-neutral">Date: {selectedTransfer.transferDate}</p>
                  <p className="text-sm text-ike-neutral">
                    Route: {selectedTransfer.fromMunicipality} → {selectedTransfer.toMunicipality}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-ike-neutral-dark mb-2">Impact Summary</h4>
                <div className="bg-ike-neutral-light p-3 rounded-md">
                  <p className="text-sm">
                    • {selectedTransfer.affectedAmounts} additional amounts will be ended
                  </p>
                  {selectedTransfer.autoEndDate && (
                    <p className="text-sm text-ike-error">
                      • Automatic end date set to: {selectedTransfer.autoEndDate}
                    </p>
                  )}
                  <p className="text-sm">
                    • Status: {selectedTransfer.status}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDetailModalOpen(false)}
            >
              Close
            </Button>
            {selectedTransfer?.status === "pending" && (
              <Button 
                onClick={() => {
                  handleProcessTransfer(selectedTransfer.id);
                  setIsDetailModalOpen(false);
                }}
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                Process Transfer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
