
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Euro, 
  Search, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PriceCodePaymentAnalysis = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const priceCodeData = [
    {
      priceCode: 'PC001',
      program: 'Samhällsvetenskap',
      municipality: 'Stockholm',
      students: 12,
      pricePerStudent: 11900,
      totalAmount: 142800,
      trend: 'up',
      periods: [142800, 131600, 119000]
    },
    {
      priceCode: 'PC002',
      program: 'Ekonomi',
      municipality: 'Göteborg',
      students: 8,
      pricePerStudent: 12650,
      totalAmount: 101200,
      trend: 'up',
      periods: [101200, 89400, 88900]
    },
    {
      priceCode: 'PC003',
      program: 'Naturvetenskap',
      municipality: 'Malmö',
      students: 15,
      pricePerStudent: 13100,
      totalAmount: 196500,
      trend: 'down',
      periods: [196500, 209800, 196500]
    },
    {
      priceCode: 'PC004',
      program: 'Teknik',
      municipality: 'Uppsala',
      students: 6,
      pricePerStudent: 14200,
      totalAmount: 85200,
      trend: 'stable',
      periods: [85200, 84600, 85200]
    }
  ];

  const filteredData = priceCodeData.filter(item => {
    const matchesSearch = item.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.priceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.municipality.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = selectedProgram === 'all' || item.program === selectedProgram;
    
    const matchesPriceRange = priceRange === 'all' || 
      (priceRange === 'low' && item.pricePerStudent < 12000) ||
      (priceRange === 'medium' && item.pricePerStudent >= 12000 && item.pricePerStudent < 14000) ||
      (priceRange === 'high' && item.pricePerStudent >= 14000);

    return matchesSearch && matchesProgram && matchesPriceRange;
  });

  const totalAmount = filteredData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalStudents = filteredData.reduce((sum, item) => sum + item.students, 0);
  const averagePrice = totalStudents > 0 ? totalAmount / totalStudents : 0;

  const handleExportAnalysis = () => {
    toast({
      title: "Analysis Exported",
      description: "Price code analysis has been exported successfully",
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    const colors = {
      up: 'bg-green-100 text-green-800',
      down: 'bg-red-100 text-red-800',
      stable: 'bg-gray-100 text-gray-800'
    };
    return colors[trend as keyof typeof colors] || colors.stable;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{totalAmount.toLocaleString()} SEK</div>
            <p className="text-xs text-ike-neutral">Across all price codes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{totalStudents}</div>
            <p className="text-xs text-ike-neutral">In filtered results</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{Math.round(averagePrice).toLocaleString()} SEK</div>
            <p className="text-xs text-ike-neutral">Per student</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Price Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{filteredData.length}</div>
            <p className="text-xs text-ike-neutral">Active codes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Euro className="w-5 h-5 mr-2 text-ike-primary" />
            Price Code Payment Analysis
          </CardTitle>
          <CardDescription>
            Detailed breakdown of payments by price codes and study programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search price codes, programs, or municipalities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="Samhällsvetenskap">Samhällsvetenskap</SelectItem>
                <SelectItem value="Ekonomi">Ekonomi</SelectItem>
                <SelectItem value="Naturvetenskap">Naturvetenskap</SelectItem>
                <SelectItem value="Teknik">Teknik</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">< 12,000 SEK</SelectItem>
                <SelectItem value="medium">12,000 - 14,000 SEK</SelectItem>
                <SelectItem value="high">> 14,000 SEK</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleExportAnalysis}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price Code</TableHead>
                  <TableHead>Study Program</TableHead>
                  <TableHead>Municipality</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Price/Student</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>3-Month Trend</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.priceCode}>
                    <TableCell>
                      <div className="font-medium text-ike-primary">{item.priceCode}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span>{item.program}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-ike-neutral">{item.municipality}</TableCell>
                    <TableCell className="font-medium">{item.students}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-ike-primary font-medium">
                        <Euro className="w-4 h-4 mr-1" />
                        {item.pricePerStudent.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-ike-primary">
                        {item.totalAmount.toLocaleString()} SEK
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(item.trend)}
                        <div className="text-xs">
                          {item.periods.map((amount, index) => (
                            <div key={index} className="text-ike-neutral">
                              {amount.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTrendBadge(item.trend)}>
                        {item.trend === 'up' ? 'Increasing' : 
                         item.trend === 'down' ? 'Decreasing' : 'Stable'}
                      </Badge>
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
