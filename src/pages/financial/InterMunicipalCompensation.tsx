
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ArrowUpDown, FileText, CheckCircle, Clock, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const InterMunicipalCompensation = () => {
  const { toast } = useToast();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>(null);

  const compensationData = [
    {
      id: 1,
      municipality: "Lund",
      type: "Outgoing",
      students: 45,
      totalAmount: 5625000,
      period: "2024-11"
    },
    {
      id: 2,
      municipality: "Helsingborg",
      type: "Incoming",
      students: 32,
      totalAmount: 4032000,
      period: "2024-11"
    },
    {
      id: 3,
      municipality: "Kristianstad",
      type: "Outgoing",
      students: 18,
      totalAmount: 2268000,
      period: "2024-11"
    },
    {
      id: 4,
      municipality: "Landskrona",
      type: "Incoming",
      students: 12,
      totalAmount: 1512000,
      period: "2024-11"
    }
  ];

  const getStatusIcon = (type: string) => {
    return type === "Incoming" ? 
      <CheckCircle className="w-4 h-4 text-ike-success" /> : 
      <Clock className="w-4 h-4 text-ike-warning" />;
  };

  const getTypeColor = (type: string) => {
    return type === "Incoming" ? "text-ike-success" : "text-ike-error";
  };

  const totalIncoming = compensationData
    .filter(item => item.type === "Incoming")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const totalOutgoing = compensationData
    .filter(item => item.type === "Outgoing")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const handleViewDetails = (municipality: any) => {
    console.log(`Opening details modal for ${municipality.municipality}`);
    setSelectedMunicipality(municipality);
    setDetailsModalOpen(true);
  };

  const handleDownloadDetails = () => {
    console.log(`Downloading details for ${selectedMunicipality?.municipality}`);
    toast({
      title: "Download Started",
      description: `Downloading detailed report for ${selectedMunicipality?.municipality}...`,
      duration: 2000
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `Report for ${selectedMunicipality?.municipality} has been downloaded successfully.`,
        duration: 3000
      });
      setDetailsModalOpen(false);
    }, 2000);
  };

  const handleExportReport = () => {
    console.log("Opening export modal");
    setExportModalOpen(true);
  };

  const handleConfirmExport = () => {
    console.log("Confirming export");
    toast({
      title: "Export Started",
      description: "Preparing your inter-municipal compensation report...",
      duration: 2000
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your compensation report has been downloaded successfully.",
        duration: 3000
      });
      setExportModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Inter-Municipal Compensation</h1>
          <p className="text-ike-neutral mt-2">
            Track payments between municipalities for student placements
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10 transition-colors"
            onClick={handleExportReport}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-ike-success hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Incoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">
              {totalIncoming.toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">From other municipalities</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Outgoing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">
              {totalOutgoing.toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">To other municipalities</div>
          </CardContent>
        </Card>
      </div>

      {/* Compensation Tracking */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
            Inter-Municipal Compensation Tracking
          </CardTitle>
          <CardDescription>
            Monitor incoming and outgoing compensation for student placements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Municipality</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Students</TableHead>
                  <TableHead className="font-medium text-right">Total Amount</TableHead>
                  <TableHead className="font-medium">Period</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compensationData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-ike-neutral-light/50 transition-colors">
                    <TableCell className="font-medium text-ike-neutral-dark">
                      {item.municipality}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.type)}
                        <span className={getTypeColor(item.type)}>{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.students}</TableCell>
                    <TableCell className={`text-right font-medium ${getTypeColor(item.type)}`}>
                      {item.type === "Incoming" ? "+" : "-"}{item.totalAmount.toLocaleString('sv-SE')} SEK
                    </TableCell>
                    <TableCell className="text-ike-neutral">{item.period}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-ike-neutral hover:text-ike-primary hover:bg-ike-primary/10 transition-colors"
                        onClick={() => handleViewDetails(item)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Report Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Export Compensation Report
            </DialogTitle>
            <DialogDescription>
              Generate a comprehensive report of all inter-municipal compensation data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-ike-neutral-light/50 rounded-lg p-4">
              <h4 className="font-medium text-ike-neutral-dark mb-2">Report Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-ike-neutral">Total Records:</span>
                  <span className="font-medium ml-2">{compensationData.length}</span>
                </div>
                <div>
                  <span className="text-ike-neutral">Period:</span>
                  <span className="font-medium ml-2">2024-11</span>
                </div>
                <div>
                  <span className="text-ike-success">Total Incoming:</span>
                  <span className="font-medium ml-2">{totalIncoming.toLocaleString('sv-SE')} SEK</span>
                </div>
                <div>
                  <span className="text-ike-error">Total Outgoing:</span>
                  <span className="font-medium ml-2">{totalOutgoing.toLocaleString('sv-SE')} SEK</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setExportModalOpen(false)}
              className="border-ike-neutral-light text-ike-neutral hover:bg-ike-neutral-light/50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmExport}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-ike-primary" />
              Compensation Details - {selectedMunicipality?.municipality}
            </DialogTitle>
            <DialogDescription>
              Detailed breakdown of compensation data for this municipality.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMunicipality && (
            <div className="space-y-4">
              <div className="bg-ike-neutral-light/50 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Municipality:</span>
                    <span className="font-medium">{selectedMunicipality.municipality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Type:</span>
                    <span className={`font-medium ${getTypeColor(selectedMunicipality.type)}`}>
                      {selectedMunicipality.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Number of Students:</span>
                    <span className="font-medium">{selectedMunicipality.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Total Amount:</span>
                    <span className={`font-medium ${getTypeColor(selectedMunicipality.type)}`}>
                      {selectedMunicipality.type === "Incoming" ? "+" : "-"}
                      {selectedMunicipality.totalAmount.toLocaleString('sv-SE')} SEK
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Period:</span>
                    <span className="font-medium">{selectedMunicipality.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ike-neutral">Amount per Student:</span>
                    <span className="font-medium">
                      {Math.round(selectedMunicipality.totalAmount / selectedMunicipality.students).toLocaleString('sv-SE')} SEK
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This detailed report can be downloaded as a PDF for your records.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setDetailsModalOpen(false)}
              className="border-ike-neutral-light text-ike-neutral hover:bg-ike-neutral-light/50"
            >
              Close
            </Button>
            <Button 
              onClick={handleDownloadDetails}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterMunicipalCompensation;
