
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Download, 
  Plus,
  Minus,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const MultiPeriodComparisonTable = () => {
  const { toast } = useToast();
  const [selectedPeriods, setSelectedPeriods] = useState(['2024-09', '2024-08', '2024-07', '2024-06', '2024-05']);
  const [comparisonType, setComparisonType] = useState('absolute');

  const availablePeriods = [
    '2024-09', '2024-08', '2024-07', '2024-06', '2024-05', 
    '2024-04', '2024-03', '2024-02', '2024-01', '2023-12'
  ];

  const comparisonData = [
    {
      metric: 'Money to Receive',
      type: 'income',
      periods: [1245000, 1189000, 1234000, 1167000, 1198000]
    },
    {
      metric: 'Money to Pay',
      type: 'expense',
      periods: [987500, 945000, 967000, 923000, 956000]
    },
    {
      metric: 'Net Position',
      type: 'net',
      periods: [257500, 244000, 267000, 244000, 242000]
    },
    {
      metric: 'Active Students',
      type: 'count',
      periods: [145, 142, 148, 139, 144]
    },
    {
      metric: 'External Students (Income)',
      type: 'count',
      periods: [87, 85, 89, 82, 86]
    },
    {
      metric: 'Municipal Students (Expense)',
      type: 'count',
      periods: [58, 57, 59, 57, 58]
    }
  ];

  const calculateChange = (current: number, previous: number) => {
    if (comparisonType === 'percentage') {
      return ((current - previous) / previous * 100).toFixed(1) + '%';
    }
    return (current - previous).toLocaleString();
  };

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const formatValue = (value: number, type: string) => {
    if (type === 'count') {
      return value.toString();
    }
    return value.toLocaleString() + ' SEK';
  };

  const handleExportComparison = () => {
    toast({
      title: "Comparison Exported",
      description: "Multi-period comparison has been exported successfully",
    });
  };

  const removePeriod = (periodToRemove: string) => {
    if (selectedPeriods.length > 2) {
      setSelectedPeriods(selectedPeriods.filter(p => p !== periodToRemove));
    }
  };

  const addPeriod = (newPeriod: string) => {
    if (selectedPeriods.length < 5 && !selectedPeriods.includes(newPeriod)) {
      setSelectedPeriods([...selectedPeriods, newPeriod].sort().reverse());
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Multi-Period Payment Comparison
          </CardTitle>
          <CardDescription>
            Compare payment streams across up to 5 reconciliation periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Comparison Type:</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="absolute">Absolute Values</SelectItem>
                  <SelectItem value="percentage">Percentage Change</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Add Period:</label>
              <Select onValueChange={addPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods
                    .filter(period => !selectedPeriods.includes(period))
                    .map(period => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleExportComparison}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white ml-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Comparison
            </Button>
          </div>

          {/* Selected Periods */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-ike-neutral-dark">Selected Periods:</span>
            {selectedPeriods.map((period) => (
              <Badge 
                key={period} 
                variant="outline" 
                className="border-ike-primary text-ike-primary"
              >
                {period}
                {selectedPeriods.length > 2 && (
                  <button 
                    onClick={() => removePeriod(period)}
                    className="ml-1 hover:text-red-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-48">Metric</TableHead>
                  {selectedPeriods.map(period => (
                    <TableHead key={period} className="text-center min-w-32">
                      {period}
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    {selectedPeriods.map((period, index) => (
                      <TableCell key={period} className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${
                            row.type === 'income' ? 'text-green-600' :
                            row.type === 'expense' ? 'text-red-600' :
                            row.type === 'net' ? 'text-ike-primary' :
                            'text-ike-neutral-dark'
                          }`}>
                            {formatValue(row.periods[index] || 0, row.type)}
                          </div>
                          {index > 0 && (
                            <div className="text-xs text-ike-neutral flex items-center justify-center">
                              {getChangeIcon(row.periods[index], row.periods[index - 1])}
                              <span className="ml-1">
                                {calculateChange(row.periods[index], row.periods[index - 1])}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      {getChangeIcon(row.periods[0], row.periods[selectedPeriods.length - 1])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
