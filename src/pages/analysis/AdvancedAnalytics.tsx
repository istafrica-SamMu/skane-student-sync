
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  School,
  Users,
  ArrowUpDown
} from "lucide-react";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import { ViewFilter } from "@/types/viewManagement";
import { useToast } from "@/hooks/use-toast";

const AdvancedAnalytics = () => {
  const [filters, setFilters] = useState<ViewFilter[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("current");
  const { toast } = useToast();

  // Available fields for filtering
  const availableFields = [
    { key: "educationalPath", label: "Educational Path", type: "select" as const, options: ["Naturvetenskap", "Samhällsvetenskap", "Teknik", "Ekonomi"] },
    { key: "schoolUnit", label: "School Unit", type: "select" as const, options: ["Malmö Gymnasium", "Lund Gymnasium", "Ystad Gymnasium"] },
    { key: "paymentStream", label: "Payment Stream", type: "select" as const, options: ["Municipal", "External", "State"] },
    { key: "municipality", label: "Municipality", type: "select" as const, options: ["Malmö", "Lund", "Helsingborg", "Ystad"] },
    { key: "reconciliationDate", label: "Reconciliation Date", type: "date" as const },
    { key: "studentName", label: "Student Name", type: "text" as const },
    { key: "changeType", label: "Change Type", type: "select" as const, options: ["Path Change", "School Change", "Status Change"] }
  ];

  // Mock data for analysis
  const analysisData = [
    {
      id: 1,
      studentName: "Anna Johansson",
      municipality: "Malmö",
      schoolUnit: "Malmö Gymnasium",
      educationalPath: "Naturvetenskap",
      paymentStream: "Municipal",
      changeType: "Path Change",
      reconciliationDate: "2024-11-15",
      previousValue: "Samhällsvetenskap",
      currentValue: "Naturvetenskap"
    },
    {
      id: 2,
      studentName: "Erik Lindqvist",
      municipality: "Lund",
      schoolUnit: "Lund Gymnasium",
      educationalPath: "Teknik",
      paymentStream: "Municipal",
      changeType: "School Change",
      reconciliationDate: "2024-11-10",
      previousValue: "Malmö Gymnasium",
      currentValue: "Lund Gymnasium"
    },
    {
      id: 3,
      studentName: "Sofia Andersson",
      municipality: "Helsingborg",
      schoolUnit: "Helsingborg Gymnasium",
      educationalPath: "Ekonomi",
      paymentStream: "External",
      changeType: "Status Change",
      reconciliationDate: "2024-11-08",
      previousValue: "Active",
      currentValue: "Transferred"
    }
  ];

  const handleExportAnalysis = () => {
    toast({
      title: "Analysis Exported",
      description: "Advanced analytics data has been exported to Excel format",
    });
  };

  const getFilteredData = () => {
    let filteredData = analysisData;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.schoolUnit.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply advanced filters
    filters.forEach(filter => {
      filteredData = filteredData.filter(item => {
        const fieldValue = (item as any)[filter.field]?.toString().toLowerCase() || '';
        const filterValue = filter.value.toString().toLowerCase();

        switch (filter.operator) {
          case 'equals':
            return fieldValue === filterValue;
          case 'contains':
            return fieldValue.includes(filterValue);
          case 'startsWith':
            return fieldValue.startsWith(filterValue);
          case 'endsWith':
            return fieldValue.endsWith(filterValue);
          default:
            return true;
        }
      });
    });

    return filteredData;
  };

  const filteredData = getFilteredData();

  const getChangeTypeBadge = (type: string) => {
    switch (type) {
      case "Path Change":
        return <Badge className="bg-ike-primary text-white">{type}</Badge>;
      case "School Change":
        return <Badge className="bg-ike-success text-white">{type}</Badge>;
      case "Status Change":
        return <Badge className="bg-ike-warning text-white">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Advanced Analytics</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive analysis with historical data and advanced filtering
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Time Range
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleExportAnalysis}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{filteredData.length}</div>
            <p className="text-xs text-ike-neutral">This period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Path Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              {filteredData.filter(d => d.changeType === "Path Change").length}
            </div>
            <p className="text-xs text-ike-neutral">Educational paths</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">School Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">
              {filteredData.filter(d => d.changeType === "School Change").length}
            </div>
            <p className="text-xs text-ike-neutral">Unit transfers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Payment Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">
              {new Set(filteredData.map(d => d.paymentStream)).size}
            </div>
            <p className="text-xs text-ike-neutral">Active streams</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            Search and Quick Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search by student name, municipality, or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-ike-primary/20 focus:border-ike-primary"
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedTimeRange === "current" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeRange("current")}
              className={selectedTimeRange === "current" ? "bg-ike-primary" : ""}
            >
              Current Period
            </Button>
            <Button 
              variant={selectedTimeRange === "last3months" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeRange("last3months")}
              className={selectedTimeRange === "last3months" ? "bg-ike-primary" : ""}
            >
              Last 3 Months
            </Button>
            <Button 
              variant={selectedTimeRange === "lastyear" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeRange("lastyear")}
              className={selectedTimeRange === "lastyear" ? "bg-ike-primary" : ""}
            >
              Last Year
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <AdvancedFilter
        filters={filters}
        onFiltersChange={setFilters}
        availableFields={availableFields}
      />

      {/* Analysis Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Analysis Results
          </CardTitle>
          <CardDescription>
            Filtered results showing {filteredData.length} records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>School Unit</TableHead>
                <TableHead>Educational Path</TableHead>
                <TableHead>Payment Stream</TableHead>
                <TableHead>Change Type</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.studentName}</TableCell>
                  <TableCell>{record.municipality}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <School className="w-4 h-4 mr-2 text-ike-neutral" />
                      {record.schoolUnit}
                    </div>
                  </TableCell>
                  <TableCell>{record.educationalPath}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.paymentStream}</Badge>
                  </TableCell>
                  <TableCell>{getChangeTypeBadge(record.changeType)}</TableCell>
                  <TableCell className="text-ike-error">{record.previousValue}</TableCell>
                  <TableCell className="text-ike-success font-medium">{record.currentValue}</TableCell>
                  <TableCell>{record.reconciliationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
