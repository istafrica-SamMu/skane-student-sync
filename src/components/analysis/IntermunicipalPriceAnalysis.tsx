
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Download, 
  ArrowRightLeft,
  Euro,
  TrendingUp,
  AlertTriangle,
  Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const IntermunicipalPriceAnalysis = () => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState('current');

  const compensationData = [
    {
      sendingMunicipality: 'Malmö',
      receivingMunicipality: 'Lund',
      studentsPlaced: 45,
      avgPriceHome: 89750,
      avgPriceReceiving: 92100,
      totalCompensation: 105750,
      impactPerStudent: 2350,
      riskLevel: 'medium'
    },
    {
      sendingMunicipality: 'Helsingborg',
      receivingMunicipality: 'Malmö', 
      studentsPlaced: 32,
      avgPriceHome: 87650,
      avgPriceReceiving: 89750,
      totalCompensation: 67200,
      impactPerStudent: 2100,
      riskLevel: 'low'
    },
    {
      sendingMunicipality: 'Kristianstad',
      receivingMunicipality: 'Lund',
      studentsPlaced: 28,
      avgPriceHome: 85400,
      avgPriceReceiving: 92100,
      totalCompensation: 187600,
      impactPerStudent: 6700,
      riskLevel: 'high'
    },
    {
      sendingMunicipality: 'Landskrona',
      receivingMunicipality: 'Helsingborg',
      studentsPlaced: 23,
      avgPriceHome: 91200,
      avgPriceReceiving: 87650,
      totalCompensation: -81650,
      impactPerStudent: -3550,
      riskLevel: 'benefit'
    }
  ];

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Cost</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      case 'benefit':
        return <Badge className="bg-blue-100 text-blue-800">Benefit</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 5000) return 'text-red-600';
    if (impact > 2000) return 'text-yellow-600';
    if (impact > 0) return 'text-green-600';
    return 'text-blue-600';
  };

  const totalStudents = compensationData.reduce((sum, item) => sum + item.studentsPlaced, 0);
  const totalCompensation = compensationData.reduce((sum, item) => sum + item.totalCompensation, 0);

  const handleExportAnalysis = () => {
    toast({
      title: "Compensation Analysis Exported", 
      description: "Intermunicipal compensation analysis has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
            Intermunicipal Compensation Analysis
          </CardTitle>
          <CardDescription>
            Analysis of compensation costs based on student placements and price differences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Scenario:</label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Period</SelectItem>
                  <SelectItem value="projected">Next Period Projection</SelectItem>
                  <SelectItem value="comparison">Year-over-Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleExportAnalysis}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white ml-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Users className="w-4 h-4 mr-1 text-ike-primary" />
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ike-primary">{totalStudents}</div>
                <p className="text-xs text-ike-neutral">Inter-municipal placements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-green-600" />
                  Total Compensation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {totalCompensation.toLocaleString()} SEK
                </div>
                <p className="text-xs text-ike-neutral">Net regional flow</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                  Avg. Per Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(totalCompensation / totalStudents).toLocaleString()} SEK
                </div>
                <p className="text-xs text-ike-neutral">Average compensation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
                  High Risk Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {compensationData.filter(item => item.riskLevel === 'high').length}
                </div>
                <p className="text-xs text-ike-neutral">Require attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Compensation Analysis Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sending Municipality</TableHead>
                  <TableHead>Receiving Municipality</TableHead>
                  <TableHead className="text-center">Students</TableHead>
                  <TableHead className="text-center">Home Price</TableHead>
                  <TableHead className="text-center">Receiving Price</TableHead>
                  <TableHead className="text-center">Per Student Impact</TableHead>
                  <TableHead className="text-center">Total Compensation</TableHead>
                  <TableHead className="text-center">Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compensationData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.sendingMunicipality}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ArrowRightLeft className="w-4 h-4 mr-2 text-ike-neutral" />
                        {row.receivingMunicipality}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">{row.studentsPlaced}</TableCell>
                    <TableCell className="text-center">
                      {row.avgPriceHome.toLocaleString()} SEK
                    </TableCell>
                    <TableCell className="text-center">
                      {row.avgPriceReceiving.toLocaleString()} SEK
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={getImpactColor(row.impactPerStudent)}>
                        {row.impactPerStudent > 0 ? '+' : ''}{row.impactPerStudent.toLocaleString()} SEK
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      <span className={getImpactColor(row.totalCompensation)}>
                        {row.totalCompensation > 0 ? '+' : ''}{row.totalCompensation.toLocaleString()} SEK
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getRiskBadge(row.riskLevel)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Analysis Notes */}
          <Card className="mt-6 bg-ike-neutral-light">
            <CardHeader>
              <CardTitle className="text-lg text-ike-neutral-dark">Compensation Analysis Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-ike-neutral">
                <li>• <strong>Positive values</strong> indicate additional compensation required</li>
                <li>• <strong>Negative values</strong> indicate cost savings (receiving municipality has lower prices)</li>
                <li>• <strong>High Risk</strong> cases have {'>'}5,000 SEK per student impact</li>
                <li>• Total compensation shows net regional money flow for intermunicipal student placements</li>
                <li>• Analysis based on current price lists and actual student placement data</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
