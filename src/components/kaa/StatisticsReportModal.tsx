
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  Calendar,
  Users,
  Activity,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface StatisticsReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatisticsReportModal = ({ isOpen, onClose }: StatisticsReportModalProps) => {
  const [reportType, setReportType] = useState("monthly");
  const [reportPeriod, setReportPeriod] = useState("2024-03");

  // Mock statistics data
  const reportData = {
    totalRegistrations: 45,
    newRegistrations: 12,
    completedCases: 8,
    activeCases: 28,
    cancelledCases: 9,
    averageCaseDuration: 7.2,
    contactOccasions: 156,
    activeMeasures: 89,
    completedMeasures: 34,
    byCategory: {
      "Arbetslös ungdom": 18,
      "Studieavbrott": 15,
      "Rehabilitering": 7,
      "Arbetsmarknadsåtgärd": 5
    },
    byMunicipality: {
      "Malmö kommun": 25,
      "Lund kommun": 12,
      "Helsingborg kommun": 8
    }
  };

  const generateReport = () => {
    // Mock report generation
    console.log(`Generating ${reportType} report for period ${reportPeriod}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Statistics Sweden Report Generator
          </DialogTitle>
          <DialogDescription>
            Generate official statistical reports for Statistics Sweden (SCB) reporting requirements
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Report Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="border-ike-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-ike-neutral mb-2 block">Report Period</label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger className="border-ike-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2024-Q1">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Report Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-ike-neutral-dark">Report Preview</h3>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-ike-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Total Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">{reportData.totalRegistrations}</div>
                  <div className="text-xs text-ike-neutral">All KAA cases</div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-ike-success">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    New Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">{reportData.newRegistrations}</div>
                  <div className="text-xs text-ike-neutral">This period</div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Completed Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">{reportData.completedCases}</div>
                  <div className="text-xs text-ike-neutral">Successfully completed</div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-ike-neutral">
                    Avg. Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-ike-neutral-dark">{reportData.averageCaseDuration}</div>
                  <div className="text-xs text-ike-neutral">Months</div>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ike-neutral-dark">By Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(reportData.byCategory).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-ike-neutral">{category}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-ike-neutral-dark">By Municipality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(reportData.byMunicipality).map(([municipality, count]) => (
                      <div key={municipality} className="flex justify-between items-center">
                        <span className="text-sm text-ike-neutral">{municipality}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-ike-neutral-dark">Additional Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ike-primary">{reportData.contactOccasions}</div>
                    <div className="text-sm text-ike-neutral">Contact Occasions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ike-success">{reportData.activeMeasures}</div>
                    <div className="text-sm text-ike-neutral">Active Measures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{reportData.completedMeasures}</div>
                    <div className="text-sm text-ike-neutral">Completed Measures</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={generateReport}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
