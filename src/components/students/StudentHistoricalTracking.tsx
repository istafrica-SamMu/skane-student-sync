
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp, Users, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentHistoricalData {
  studentId: string;
  studentName: string;
  personalNumber: string;
  changes: Array<{
    date: string;
    field: string;
    oldValue: string;
    newValue: string;
    reason: string;
  }>;
}

const StudentHistoricalTracking = () => {
  const { toast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [trackingPeriod, setTrackingPeriod] = useState("semester");
  const [viewMode, setViewMode] = useState("changes");

  // Mock historical data
  const historicalData: StudentHistoricalData[] = [
    {
      studentId: "1",
      studentName: "Anna Johansson",
      personalNumber: "200603-1234",
      changes: [
        {
          date: "2024-01-15",
          field: "Study Path",
          oldValue: "Samhällsvetenskap",
          newValue: "Naturvetenskap",
          reason: "Student request - interest change"
        },
        {
          date: "2024-03-20",
          field: "School Unit",
          oldValue: "Municipal Gymnasium A",
          newValue: "Municipal Gymnasium B",
          reason: "Family relocation"
        }
      ]
    },
    {
      studentId: "2",
      studentName: "Erik Lindqvist",
      personalNumber: "200508-3456",
      changes: [
        {
          date: "2024-02-10",
          field: "School Year",
          oldValue: "2",
          newValue: "3",
          reason: "Academic progression"
        }
      ]
    }
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Historical Report Generated",
      description: `Generated tracking report for ${selectedStudents.length} students`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Historical tracking data has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Student Historical Tracking
          </CardTitle>
          <CardDescription>
            Follow selected students over time to track changes and progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Selection */}
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

            {/* Tracking Period */}
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

            {/* View Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">View Mode</label>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="changes">Changes Only</SelectItem>
                  <SelectItem value="progression">Academic Progression</SelectItem>
                  <SelectItem value="transfers">Transfers & Moves</SelectItem>
                  <SelectItem value="all">All Events</SelectItem>
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

      {/* Historical Changes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Student Change History
          </CardTitle>
          <CardDescription>
            Detailed timeline of changes for tracked students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Field Changed</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalData.flatMap(student =>
                student.changes.map((change, index) => (
                  <TableRow key={`${student.studentId}-${index}`}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{student.studentName}</p>
                        <p className="text-sm text-ike-neutral font-mono">{student.personalNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>{change.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{change.field}</Badge>
                    </TableCell>
                    <TableCell className="text-ike-error">{change.oldValue}</TableCell>
                    <TableCell className="text-ike-success">{change.newValue}</TableCell>
                    <TableCell className="text-sm">{change.reason}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHistoricalTracking;
