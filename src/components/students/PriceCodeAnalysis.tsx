
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, GraduationCap, Search, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PriceCodeData {
  priceCode: string;
  priceCodeName: string;
  studyPath: string;
  unitPrice: number;
  studentCount: number;
  totalCost: number;
  municipalStudents: number;
  externalStudents: number;
}

const PriceCodeAnalysis = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudyPath, setSelectedStudyPath] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");

  // Mock price code data
  const priceCodeData: PriceCodeData[] = [
    {
      priceCode: "GYNAT01",
      priceCodeName: "Naturvetenskap - Year 1",
      studyPath: "Naturvetenskap",
      unitPrice: 87500,
      studentCount: 245,
      totalCost: 21437500,
      municipalStudents: 198,
      externalStudents: 47
    },
    {
      priceCode: "GYSAM01",
      priceCodeName: "Samhällsvetenskap - Year 1",
      studyPath: "Samhällsvetenskap",
      unitPrice: 82000,
      studentCount: 198,
      totalCost: 16236000,
      municipalStudents: 165,
      externalStudents: 33
    },
    {
      priceCode: "GYTEK01",
      priceCodeName: "Teknik - Year 1",
      studyPath: "Teknik",
      unitPrice: 95000,
      studentCount: 187,
      totalCost: 17765000,
      municipalStudents: 142,
      externalStudents: 45
    },
    {
      priceCode: "GYEKO01",
      priceCodeName: "Ekonomi - Year 1",
      studyPath: "Ekonomi",
      unitPrice: 78000,
      studentCount: 165,
      totalCost: 12870000,
      municipalStudents: 132,
      externalStudents: 33
    },
    {
      priceCode: "GYEST01",
      priceCodeName: "Estetiska - Year 1",
      studyPath: "Estetiska",
      unitPrice: 92000,
      studentCount: 142,
      totalCost: 13064000,
      municipalStudents: 108,
      externalStudents: 34
    }
  ];

  const studyPaths = ["Naturvetenskap", "Samhällsvetenskap", "Teknik", "Ekonomi", "Estetiska"];

  const getFilteredData = () => {
    return priceCodeData.filter(item => {
      const matchesSearch = 
        item.priceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.priceCodeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studyPath.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStudyPath = selectedStudyPath === "all" || item.studyPath === selectedStudyPath;
      
      const matchesPriceRange = priceRangeFilter === "all" || 
        (priceRangeFilter === "low" && item.unitPrice < 80000) ||
        (priceRangeFilter === "medium" && item.unitPrice >= 80000 && item.unitPrice < 90000) ||
        (priceRangeFilter === "high" && item.unitPrice >= 90000);
      
      return matchesSearch && matchesStudyPath && matchesPriceRange;
    });
  };

  const filteredData = getFilteredData();
  const totalStudents = filteredData.reduce((sum, item) => sum + item.studentCount, 0);
  const totalCost = filteredData.reduce((sum, item) => sum + item.totalCost, 0);
  const averageUnitPrice = filteredData.length > 0 
    ? filteredData.reduce((sum, item) => sum + item.unitPrice, 0) / filteredData.length 
    : 0;

  const handleExportAnalysis = () => {
    toast({
      title: "Price Code Analysis Exported",
      description: "Price code data has been exported successfully",
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{totalStudents}</div>
            <p className="text-xs text-ike-neutral">Across all price codes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{formatCurrency(totalCost)}</div>
            <p className="text-xs text-ike-neutral">Annual education cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Average Unit Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{formatCurrency(averageUnitPrice)}</div>
            <p className="text-xs text-ike-neutral">Per student per year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Price Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{filteredData.length}</div>
            <p className="text-xs text-ike-neutral">Active price codes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            Price Code Analysis Filters
          </CardTitle>
          <CardDescription>
            Filter and analyze price codes linked to student education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Price Code Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Price Code Details
          </CardTitle>
          <CardDescription>
            Detailed breakdown of price codes and associated student costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price Code</TableHead>
                <TableHead>Study Path</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Students</TableHead>
                <TableHead className="text-right">Municipal</TableHead>
                <TableHead className="text-right">External</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.priceCode}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-mono text-sm">{item.priceCode}</p>
                      <p className="text-xs text-ike-neutral">{item.priceCodeName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                      <span>{item.studyPath}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(item.unitPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{item.studentCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-ike-primary text-white">{item.municipalStudents}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-ike-warning text-white">{item.externalStudents}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">
                    {formatCurrency(item.totalCost)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceCodeAnalysis;
