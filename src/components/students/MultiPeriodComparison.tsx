
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUp, ArrowDown, Minus, BarChart3, Download, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PeriodData {
  period: string;
  totalStudents: number;
  internalStudents: number;
  externalStudents: number;
  outgoingStudents: number;
  activePrograms: number;
  averageAge: number;
}

const MultiPeriodComparison = () => {
  const { toast } = useToast();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(["2024-spring", "2024-fall"]);
  const [comparisonType, setComparisonType] = useState("absolute");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "totalStudents", "internalStudents", "externalStudents", "outgoingStudents"
  ]);

  // Mock data for different periods
  const periodData: PeriodData[] = [
    {
      period: "2024-spring",
      totalStudents: 1247,
      internalStudents: 1098,
      externalStudents: 149,
      outgoingStudents: 87,
      activePrograms: 8,
      averageAge: 17.2
    },
    {
      period: "2024-fall",
      totalStudents: 1289,
      internalStudents: 1134,
      externalStudents: 155,
      outgoingStudents: 92,
      activePrograms: 8,
      averageAge: 17.1
    },
    {
      period: "2023-fall",
      totalStudents: 1198,
      internalStudents: 1056,
      externalStudents: 142,
      outgoingStudents: 78,
      activePrograms: 7,
      averageAge: 17.3
    },
    {
      period: "2023-spring",
      totalStudents: 1167,
      internalStudents: 1029,
      externalStudents: 138,
      outgoingStudents: 82,
      activePrograms: 7,
      averageAge: 17.4
    }
  ];

  const availablePeriods = [
    { value: "2024-fall", label: "Fall 2024" },
    { value: "2024-spring", label: "Spring 2024" },
    { value: "2023-fall", label: "Fall 2023" },
    { value: "2023-spring", label: "Spring 2023" },
    { value: "2022-fall", label: "Fall 2022" }
  ];

  const availableMetrics = [
    { key: "totalStudents", label: "Total Students" },
    { key: "internalStudents", label: "Internal Students" },
    { key: "externalStudents", label: "External Students" },
    { key: "outgoingStudents", label: "Outgoing Students" },
    { key: "activePrograms", label: "Active Programs" },
    { key: "averageAge", label: "Average Age" }
  ];

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) {
      return <ArrowUp className="w-4 h-4 text-ike-success" />;
    } else if (current < previous) {
      return <ArrowDown className="w-4 h-4 text-ike-error" />;
    }
    return <Minus className="w-4 h-4 text-ike-neutral" />;
  };

  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const handleAddPeriod = () => {
    if (selectedPeriods.length < 5) {
      toast({
        title: "Period Selection",
        description: "Please select an additional period to compare",
      });
    } else {
      toast({
        title: "Maximum Reached",
        description: "Maximum of 5 periods can be compared simultaneously",
        variant: "destructive"
      });
    }
  };

  const handleExportComparison = () => {
    toast({
      title: "Comparison Exported",
      description: "Multi-period comparison data has been exported successfully",
    });
  };

  const toggleMetric = (metricKey: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metricKey)
        ? prev.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const getSelectedPeriodData = () => {
    return periodData.filter(data => selectedPeriods.includes(data.period));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Multi-Period Comparison
          </CardTitle>
          <CardDescription>
            Compare student data across multiple reconciliation periods (up to 5 columns)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Comparison Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Comparison Type</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="absolute">Absolute Values</SelectItem>
                  <SelectItem value="percentage">Percentage Change</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Periods: {selectedPeriods.length}/5</label>
              <div className="flex flex-wrap gap-2">
                {selectedPeriods.map(period => (
                  <Badge key={period} variant="outline" className="text-xs">
                    {availablePeriods.find(p => p.value === period)?.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddPeriod}
                  disabled={selectedPeriods.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Period
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportComparison}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Metric Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Select Metrics to Compare</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableMetrics.map(metric => (
                <div key={metric.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.key}
                    checked={selectedMetrics.includes(metric.key)}
                    onCheckedChange={() => toggleMetric(metric.key)}
                  />
                  <label htmlFor={metric.key} className="text-sm">
                    {metric.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Period-by-Period Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of selected metrics across periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Metric</TableHead>
                  {getSelectedPeriodData().map(data => (
                    <TableHead key={data.period} className="text-center">
                      {availablePeriods.find(p => p.value === data.period)?.label}
                    </TableHead>
                  ))}
                  {comparisonType !== "absolute" && (
                    <TableHead className="text-center">Change</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedMetrics.map(metricKey => {
                  const metric = availableMetrics.find(m => m.key === metricKey);
                  if (!metric) return null;

                  const values = getSelectedPeriodData().map(data => data[metricKey as keyof PeriodData] as number);
                  const previousValue = values[values.length - 2];
                  const currentValue = values[values.length - 1];

                  return (
                    <TableRow key={metricKey}>
                      <TableCell className="font-medium">{metric.label}</TableCell>
                      {values.map((value, index) => (
                        <TableCell key={index} className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span>{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}</span>
                            {index > 0 && getChangeIndicator(value, values[index - 1])}
                          </div>
                        </TableCell>
                      ))}
                      {comparisonType !== "absolute" && previousValue && currentValue && (
                        <TableCell className="text-center">
                          <Badge 
                            variant={currentValue > previousValue ? "default" : "destructive"}
                            className={currentValue > previousValue ? "bg-ike-success" : "bg-ike-error"}
                          >
                            {getChangePercentage(currentValue, previousValue)}%
                          </Badge>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiPeriodComparison;
