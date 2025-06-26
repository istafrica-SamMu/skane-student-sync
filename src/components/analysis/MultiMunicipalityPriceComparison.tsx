
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Download, 
  Search,
  Euro,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const MultiMunicipalityPriceComparison = () => {
  const { toast } = useToast();
  const [selectedPriceCode, setSelectedPriceCode] = useState('GY-NAT-01');
  const [searchTerm, setSearchTerm] = useState('');

  const priceCodes = [
    'GY-NAT-01', 'GY-TEK-01', 'GY-SAM-01', 'GY-EST-01', 'GY-HAN-01'
  ];

  const municipalityPriceData = [
    {
      municipality: 'Malmö',
      price: 89750,
      referenceDeviation: 2.3,
      lastUpdated: '2024-09-15',
      status: 'current'
    },
    {
      municipality: 'Lund',
      price: 92100,
      referenceDeviation: 5.0,
      lastUpdated: '2024-09-15',
      status: 'current'
    },
    {
      municipality: 'Helsingborg',
      price: 87650,
      referenceDeviation: -0.1,
      lastUpdated: '2024-09-12',
      status: 'current'
    },
    {
      municipality: 'Kristianstad',
      price: 85400,
      referenceDeviation: -2.5,
      lastUpdated: '2024-09-10',
      status: 'outdated'
    },
    {
      municipality: 'Landskrona',
      price: 91200,
      referenceDeviation: 4.1,
      lastUpdated: '2024-09-14', 
      status: 'current'
    },
    {
      municipality: 'Trelleborg',
      price: 88900,
      referenceDeviation: 1.4,
      lastUpdated: '2024-09-13',
      status: 'current'
    },
    {
      municipality: 'Eslöv',
      price: 86750,
      referenceDeviation: -1.1,
      lastUpdated: '2024-09-11',
      status: 'current'
    },
    {
      municipality: 'Ystad',
      price: 90500,
      referenceDeviation: 3.2,
      lastUpdated: '2024-09-15',
      status: 'current'
    }
  ];

  const skaneReferencePrice = 87750; // SEK

  const getDeviationColor = (deviation: number) => {
    if (Math.abs(deviation) <= 2) return 'text-green-600';
    if (Math.abs(deviation) <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'current') {
      return <Badge className="bg-green-100 text-green-800">Current</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Outdated</Badge>;
  };

  const filteredData = municipalityPriceData.filter(item =>
    item.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportComparison = () => {
    toast({
      title: "Municipality Comparison Exported",
      description: "Multi-municipality price comparison has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Building className="w-5 h-5 mr-2 text-ike-primary" />
            Multi-Municipality Price Comparison
          </CardTitle>
          <CardDescription>
            Compare price lists across all Skåne municipalities for intermunicipal compensation analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Price Code:</label>
              <Select value={selectedPriceCode} onValueChange={setSelectedPriceCode}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceCodes.map(code => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-ike-neutral" />
              <Input
                placeholder="Search municipalities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>

            <Button 
              onClick={handleExportComparison}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white ml-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Comparison
            </Button>
          </div>

          {/* Reference Price Info */}
          <Card className="mb-6 bg-ike-primary/5 border-ike-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-ike-primary">Skåne Reference Price for {selectedPriceCode}</h3>
                  <p className="text-sm text-ike-neutral">Regional benchmark for comparison</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-ike-primary">{skaneReferencePrice.toLocaleString()} SEK</div>
                  <p className="text-xs text-ike-neutral">Reference price/student</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Municipality</TableHead>
                  <TableHead className="text-center">Price (SEK)</TableHead>
                  <TableHead className="text-center">Reference Deviation</TableHead>
                  <TableHead className="text-center">Compensation Impact</TableHead>
                  <TableHead className="text-center">Last Updated</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.municipality}>
                    <TableCell className="font-medium">{row.municipality}</TableCell>
                    <TableCell className="text-center font-medium">
                      {row.price.toLocaleString()} SEK
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        {row.referenceDeviation > 0 ? (
                          <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
                        ) : row.referenceDeviation < 0 ? (
                          <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                        ) : null}
                        <span className={getDeviationColor(row.referenceDeviation)}>
                          {row.referenceDeviation > 0 ? '+' : ''}{row.referenceDeviation}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={getDeviationColor(row.referenceDeviation)}>
                        {row.referenceDeviation > 0 ? 'Pay More' : row.referenceDeviation < 0 ? 'Pay Less' : 'Neutral'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-ike-neutral">
                      {row.lastUpdated}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(row.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-ike-primary" />
                  Highest Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-ike-primary">92,100 SEK</div>
                <p className="text-xs text-ike-neutral">Lund (+5.0%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-green-600" />
                  Lowest Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-600">85,400 SEK</div>
                <p className="text-xs text-ike-neutral">Kristianstad (-2.5%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                  Price Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-blue-600">6,700 SEK</div>
                <p className="text-xs text-ike-neutral">7.8% variation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-yellow-600" />
                  Outdated Prices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-yellow-600">1</div>
                <p className="text-xs text-ike-neutral">Needs update</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
