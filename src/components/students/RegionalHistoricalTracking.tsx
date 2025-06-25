
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp, Shield, FileText, Download, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deIdentificationService, type DeIdentifiedChange } from "@/services/deIdentificationService";

const RegionalHistoricalTracking = () => {
  const { toast } = useToast();
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [trackingPeriod, setTrackingPeriod] = useState("semester");
  const [viewMode, setViewMode] = useState("all");

  const municipalities = ["Malmö", "Lund", "Helsingborg", "Kristianstad", "Landskrona"];
  const regionalChanges = deIdentificationService.getRegionalChanges();

  const handleGenerateReport = () => {
    toast({
      title: "Regional Historical Report Generated",
      description: `Generated de-identified tracking report for ${selectedMunicipalities.length || 'all'} municipalities`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "De-identified Data Exported",
      description: "Regional historical tracking data has been exported with privacy protection",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Historical Tracking
            <Shield className="w-4 h-4 ml-2 text-ike-success" />
          </CardTitle>
          <CardDescription>
            Follow selected students across the collaboration area over time (de-identified data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tracking Period</label>
              <Select value={trackingPeriod} onValueChange={setTrackingPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="semester">Semester</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">View Mode</label>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="all">All Changes</SelectItem>
                  <SelectItem value="placements">Placement Changes</SelectItem>
                  <SelectItem value="transfers">Inter-Municipal Transfers</SelectItem>
                  <SelectItem value="progression">Academic Progression</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <Button onClick={handleGenerateReport} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Change History
            <Shield className="w-4 h-4 ml-2 text-ike-success" />
          </CardTitle>
          <CardDescription>
            De-identified timeline of changes across the collaboration area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Field Changed</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionalChanges.map((change, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium font-mono text-sm">
                    {change.studentId}
                  </TableCell>
                  <TableCell>{change.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{change.field}</Badge>
                  </TableCell>
                  <TableCell className="text-ike-error">{change.oldValue}</TableCell>
                  <TableCell className="text-ike-success">{change.newValue}</TableCell>
                  <TableCell>
                    <Badge className="bg-ike-primary text-white">{change.municipality}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{change.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalHistoricalTracking;
