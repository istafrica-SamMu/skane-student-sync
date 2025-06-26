
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
  Euro,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PriceListsMultiPeriodComparison = () => {
  const { toast } = useToast();
  const [selectedPeriods, setSelectedPeriods] = useState(['2024-09', '2024-08', '2024-07', '2024-06', '2024-05']);
  const [selectedMunicipality, setSelectedMunicipality] = useState('all');

  const availablePeriods = [
    '2024-09', '2024-08', '2024-07', '2024-06', '2024-05', 
    '2024-04', '2024-03', '2024-02', '2024-01', '2023-12'
  ];

  const municipalities = [
    'All Municipalities', 'Malmö', 'Lund', 'Helsingborg', 'Kristianstad', 
    'Landskrona', 'Trelleborg', 'Eslöv', 'Ystad', 'Höganäs'
  ];

  const priceComparisonData = [
    {
      priceCode: 'GY-NAT-01',
      studyPath: 'Natural Sciences',
      periods: [89750, 87650, 86200, 85100, 84500]
    },
    {
      priceCode: 'GY-TEK-01', 
      studyPath: 'Technology',
      periods: [92300, 91200, 89800, 88600, 87900]
    },
    {
      priceCode: 'GY-SAM-01',
      studyPath: 'Social Sciences',
      periods: [85400, 84100, 82800, 81500, 80900]
    },
    {
      priceCode: 'GY-EST-01',
      studyPath: 'Aesthetics',
      periods: [94200, 93100, 91700, 90500, 89800]
    },
    {
      priceCode: 'GY-HAN-01',
      studyPath: 'Handicraft',
      periods: [96800, 95600, 94200, 92900, 91700]
    }
  ];

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1) + '%';
  };

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (current < previous) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const handleExportComparison = () => {
    toast({
      title: "Comparison Exported",
      description: "Multi-period price comparison has been exported successfully",
    });
  };

  const removePeriod = (periodToRemove: string) => {
    if (selectedPeriods.length > 2) {
      setSelectedPeriods(selectedPeriods.filter(p => p !== periodToRemove));
    }
  };

  const addPeriod = (newPeriod: string) => {
    if (selectedPeriods.length < 6 && !selectedPeriods.includes(newPeriod)) {
      setSelectedPeriods([...selectedPeriods, newPeriod].sort().reverse());
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
            Multi-Period Price Lists Comparison
          </CardTitle>
          <CardDescription>
            Compare price lists across up to 6 reconciliation periods for intermunicipal compensation analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Municipality:</label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  {municipalities.slice(1).map(municipality => (
                    <SelectItem key={municipality} value={municipality.toLowerCase()}>
                      {municipality}
                    </SelectItem>
                  ))}
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
                  <TableHead className="min-w-32">Price Code</TableHead>
                  <TableHead className="min-w-48">Study Path</TableHead>
                  {selectedPeriods.map(period => (
                    <TableHead key={period} className="text-center min-w-32">
                      {period}
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceComparisonData.map((row) => (
                  <TableRow key={row.priceCode}>
                    <TableCell className="font-medium text-ike-primary">{row.priceCode}</TableCell>
                    <TableCell>{row.studyPath}</TableCell>
                    {selectedPeriods.map((period, index) => (
                      <TableCell key={period} className="text-center">
                        <div className="space-y-1">
                          <div className="font-medium text-ike-neutral-dark">
                            {(row.periods[index] || 0).toLocaleString()} SEK
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

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  Average Price Increase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+5.8%</div>
                <p className="text-xs text-ike-neutral">Across all periods</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-blue-600" />
                  Highest Price Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">GY-HAN-01</div>
                <p className="text-xs text-ike-neutral">96,800 SEK current</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-ike-primary" />
                  Price Variance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ike-primary">14.2%</div>
                <p className="text-xs text-ike-neutral">Between min/max codes</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
