
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, GraduationCap, Search, Download, Filter, Shield, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegionalPriceCodeData {
  priceCode: string;
  priceCodeName: string;
  studyPath: string;
  unitPrice: number;
  totalStudents: number;
  municipalityBreakdown: Array<{
    municipality: string;
    students: number;
    totalCost: number;
  }>;
  averageCostPerMunicipality: number;
  crossMunicipalPlacements: number;
}

const RegionalPriceCodeAnalysis = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudyPath, setSelectedStudyPath] = useState("all");
  const [selectedMunicipality, setSelectedMunicipality] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");

  const municipalities = ["Malmö", "Lund", "Helsingborg", "Kristianstad", "Landskrona"];
  const studyPaths = ["Naturvetenskap", "Samhällsvetenskap", "Teknik", "Ekonomi", "Estetiska"];

  const regionalPriceCodeData: RegionalPriceCodeData[] = [
    {
      priceCode: "GYNAT01",
      priceCodeName: "Naturvetenskap - Year 1",
      studyPath: "Naturvetenskap",
      unitPrice: 87500,
      totalStudents: 445,
      municipalityBreakdown: [
        { municipality: "Malmö", students: 198, totalCost: 17325000 },
        { municipality: "Lund", students: 87, totalCost: 7612500 },
        { municipality: "Helsingborg", students: 92, totalCost: 8050000 },
        { municipality: "Kristianstad", students: 68, totalCost: 5950000 }
      ],
      averageCostPerMunicipality: 9734375,
      crossMunicipalPlacements: 89
    },
    {
      priceCode: "GYTEK01",
      priceCodeName: "Teknik - Year 1",
      studyPath: "Teknik",
      unitPrice: 95000,
      totalStudents: 387,
      municipalityBreakdown: [
        { municipality: "Malmö", students: 142, totalCost: 13490000 },
        { municipality: "Lund", students: 76, totalCost: 7220000 },
        { municipality: "Helsingborg", students: 98, totalCost: 9310000 },
        { municipality: "Kristianstad", students: 71, totalCost: 6745000 }
      ],
      averageCostPerMunicipality: 9191250,
      crossMunicipalPlacements: 76
    }
  ];

  const getFilteredData = () => {
    return regionalPriceCodeData.filter(item => {
      const matchesSearch = 
        item.priceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.priceCodeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studyPath.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStudyPath = selectedStudyPath === "all" || item.studyPath === selectedStudyPath;
      
      const matchesMunicipality = selectedMunicipality === "all" || 
        item.municipalityBreakdown.some(m => m.municipality === selectedMunicipality);
      
      const matchesPriceRange = priceRangeFilter === "all" || 
        (priceRangeFilter === "low" && item.unitPrice < 80000) ||
        (priceRangeFilter === "medium" && item.unitPrice >= 80000 && item.unitPrice < 90000) ||
        (priceRangeFilter === "high" && item.unitPrice >= 90000);
      
      return matchesSearch && matchesStudyPath && matchesMunicipality && matchesPriceRange;
    });
  };

  const filteredData = getFilteredData();
  const totalStudents = filteredData.reduce((sum, item) => sum + item.totalStudents, 0);
  const totalCrossPlacement = filteredData.reduce((sum, item) => sum + item.crossMunicipalPlacements, 0);
  const averageUnitPrice = filteredData.length > 0 
    ? filteredData.reduce((sum, item) => sum + item.unitPrice, 0) / filteredData.length 
    : 0;

  const handleExportAnalysis = () => {
    toast({
      title: "Regional Price Code Analysis Exported",
      description: "De-identified regional price code data has been exported",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{totalStudents}</div>
            <p className="text-xs text-ike-neutral">Across collaboration area</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Cross-Municipal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{totalCrossPlacement}</div>
            <p className="text-xs text-ike-neutral">Student placements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Average Unit Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{formatCurrency(averageUnitPrice)}</div>
            <p className="text-xs text-ike-neutral">Regional average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Price Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{filteredData.length}</div>
            <p className="text-xs text-ike-neutral">Active in region</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Price Code Analysis Filters
            <Shield className="w-4 h-4 ml-2 text-ike-success" />
          </CardTitle>
          <CardDescription>
            Filter and analyze regional price codes across municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-ike-neutral" />
                <Input
                  placeholder="Search price codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Study Path</label>
              <Select value={selectedStudyPath} onValueChange={setSelectedStudyPath}>
                <SelectTrigger className="border-ike-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="all">All Study Paths</SelectItem>
                  {studyPaths.map(path => (
                    <SelectItem key={path} value={path}>{path}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Municipality</label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger className="border-ike-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="all">All Municipalities</SelectItem>
                  {municipalities.map(municipality => (
                    <SelectItem key={municipality} value={municipality}>{municipality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                <SelectTrigger className="border-ike-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Low (&lt; 80,000 SEK)</SelectItem>
                  <SelectItem value="medium">Medium (80,000 - 90,000 SEK)</SelectItem>
                  <SelectItem value="high">High (&gt; 90,000 SEK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button onClick={handleExportAnalysis} className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Price Code Details
            <Shield className="w-4 h-4 ml-2 text-ike-success" />
          </CardTitle>
          <CardDescription>
            Detailed breakdown of price codes across municipalities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredData.map((item) => (
            <div key={item.priceCode} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-mono text-sm font-medium">{item.priceCode}</h3>
                  <p className="text-sm text-ike-neutral">{item.priceCodeName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatCurrency(item.unitPrice)}</div>
                  <div className="flex items-center text-sm text-ike-neutral">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {item.studyPath}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Students:</span>
                  <Badge variant="outline">{item.totalStudents}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cross-Municipal:</span>
                  <Badge className="bg-ike-warning text-white">{item.crossMunicipalPlacements}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Municipality Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.municipalityBreakdown.map((breakdown, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{breakdown.municipality}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold">{breakdown.students} students</div>
                        <div className="text-xs text-ike-neutral">{formatCurrency(breakdown.totalCost)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalPriceCodeAnalysis;
