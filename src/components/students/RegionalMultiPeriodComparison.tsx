
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUp, ArrowDown, Minus, BarChart3, Download, Plus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegionalPeriodData {
  period: string;
  totalStudents: number;
  activeMunicipalities: number;
  crossMunicipalPlacements: number;
  completionRate: number;
  averageUnitPrice: number;
  activePrograms: number;
}

const RegionalMultiPeriodComparison = () => {
  const { toast } = useToast();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(["2024-spring", "2024-fall"]);
  const [comparisonType, setComparisonType] = useState("absolute");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "totalStudents", "activeMunicipalities", "crossMunicipalPlacements", "completionRate"
  ]);

  const periodData: RegionalPeriodData[] = [
    {
      period: "2024-spring",
      totalStudents: 5247,
      activeMunicipalities: 12,
      crossMunicipalPlacements: 487,
      completionRate: 94.2,
      averageUnitPrice: 84500,
      activePrograms: 8
    },
    {
      period: "2024-fall",
      totalStudents: 5398,
      activeMunicipalities: 12,
      crossMunicipalPlacements: 523,
      completionRate: 95.1,
      averageUnitPrice: 86200,
      activePrograms: 8
    },
    {
      period: "2023-fall",
      totalStudents: 5089,
      activeMunicipalities: 11,
      crossMunicipalPlacements: 445,
      completionRate: 93.8,
      averageUnitPrice: 82300,
      activePrograms: 7
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
    { key: "activeMunicipalities", label: "Active Municipalities" },
    { key: "crossMunicipalPlacements", label: "Cross-Municipal Placements" },
    { key: "completionRate", label: "Completion Rate (%)" },
    { key: "averageUnitPrice", label: "Average Unit Price (SEK)" },
    { key: "activePrograms", label: "Active Programs" }
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
      title: "Regional Comparison Exported",
      description: "De-identified multi-period comparison data has been exported",
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

  const formatValue = (value: number, metricKey: string) => {
    if (metricKey === 'averageUnitPrice') {
      return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    if (metricKey === 'completionRate') {
      return `${value}%`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Multi-Period Comparison
            <Shield className="w-4 h-4 ml-2 text-ike-success" />
          </CardTitle>
          <CardDescription>
            Compare de-identified regional data across multiple reconciliation periods (up to 5 columns)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Select Regional Metrics to Compare</label>
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

      <Card>
        <CardHeader>
          <CardTitle>Regional Period-by-Period Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of selected regional metrics across periods
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

                  const values = getSelectedPeriodData().map(data => data[metricKey as keyof RegionalPeriodData] as number);
                  const previousValue = values[values.length - 2];
                  const currentValue = values[values.length - 1];

                  return (
                    <TableRow key={metricKey}>
                      <TableCell className="font-medium">{metric.label}</TableCell>
                      {values.map((value, index) => (
                        <TableCell key={index} className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <span>{formatValue(value, metricKey)}</span>
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

export default RegionalMultiPeriodComparison;
