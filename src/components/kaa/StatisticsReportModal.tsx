
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StatisticsReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StatisticsReportModal = ({ open, onOpenChange }: StatisticsReportModalProps) => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [includedData, setIncludedData] = useState({
    personalData: true,
    measures: true,
    contacts: true,
    outcomes: false
  });
  const [format, setFormat] = useState("excel");

  const reportTypes = [
    { value: "monthly", label: "Monthly KAA Report" },
    { value: "quarterly", label: "Quarterly Statistics" },
    { value: "annual", label: "Annual Report" },
    { value: "scb", label: "Statistics Sweden Report" },
    { value: "custom", label: "Custom Report" }
  ];

  const handleGenerate = () => {
    if (!reportType || !dateFrom || !dateTo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate report generation
    toast({
      title: "Report Generated",
      description: `${reportTypes.find(r => r.value === reportType)?.label} has been generated successfully.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Generate Statistics Report
          </DialogTitle>
          <DialogDescription>
            Create statistical reports for KAA data to send to Statistics Sweden (SCB) or for internal use
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reportType" className="text-ike-neutral">Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType} required>
                <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="format" className="text-ike-neutral">Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFrom" className="text-ike-neutral">From Date *</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border-ike-primary/20 focus:border-ike-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="dateTo" className="text-ike-neutral">To Date *</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border-ike-primary/20 focus:border-ike-primary"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-ike-neutral mb-3 block">Include Data</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="personalData"
                  checked={includedData.personalData}
                  onCheckedChange={(checked) => 
                    setIncludedData(prev => ({ ...prev, personalData: checked as boolean }))
                  }
                />
                <Label htmlFor="personalData" className="text-sm">Personal Data & Demographics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="measures"
                  checked={includedData.measures}
                  onCheckedChange={(checked) => 
                    setIncludedData(prev => ({ ...prev, measures: checked as boolean }))
                  }
                />
                <Label htmlFor="measures" className="text-sm">Measures & Actions</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contacts"
                  checked={includedData.contacts}
                  onCheckedChange={(checked) => 
                    setIncludedData(prev => ({ ...prev, contacts: checked as boolean }))
                  }
                />
                <Label htmlFor="contacts" className="text-sm">Contact Occasions</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="outcomes"
                  checked={includedData.outcomes}
                  onCheckedChange={(checked) => 
                    setIncludedData(prev => ({ ...prev, outcomes: checked as boolean }))
                  }
                />
                <Label htmlFor="outcomes" className="text-sm">Outcomes & Results</Label>
              </div>
            </div>
          </div>

          {reportType === "scb" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Statistics Sweden (SCB) Requirements</h4>
              <p className="text-sm text-blue-800">
                This report will be formatted according to SCB guidelines for KAA reporting. 
                Personal data will be anonymized and aggregated as required by SCB standards.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerate}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
