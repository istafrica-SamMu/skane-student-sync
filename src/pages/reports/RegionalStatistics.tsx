import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  Download, 
  TrendingUp,
  Shield,
  Users,
  DollarSign,
  History,
  GitCompare,
  MapPin,
  GraduationCap,
  Building
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import RegionalHistoricalTracking from "@/components/students/RegionalHistoricalTracking";
import RegionalMultiPeriodComparison from "@/components/students/RegionalMultiPeriodComparison";
import RegionalPriceCodeAnalysis from "@/components/students/RegionalPriceCodeAnalysis";
import { deIdentificationService, type DeIdentifiedStudent } from "@/services/deIdentificationService";

export default function RegionalStatistics() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Get de-identified regional data
  const regionalStudents = deIdentificationService.getRegionalStudentData();
  
  const statisticsData = {
    totalStudents: regionalStudents.length,
    activeMunicipalities: [...new Set(regionalStudents.map(s => s.municipality))].length,
    crossMunicipalPlacements: regionalStudents.filter(s => s.municipality !== s.region).length,
    activePrograms: [...new Set(regionalStudents.map(s => s.studyPath))].length,
    completionRate: 94.8,
    averageUnitPrice: regionalStudents.reduce((sum, s) => sum + s.unitPrice, 0) / regionalStudents.length,
    trends: {
      students: "+5.2%",
      placements: "+8.1%"
    }
  };

  const municipalityData = regionalStudents.reduce((acc, student) => {
    if (!acc[student.municipality]) {
      acc[student.municipality] = {
        name: student.municipality,
        students: 0,
        activePrograms: new Set(),
        averagePrice: 0,
        totalCost: 0
      };
    }
    acc[student.municipality].students++;
    acc[student.municipality].activePrograms.add(student.studyPath);
    acc[student.municipality].totalCost += student.unitPrice;
    return acc;
  }, {} as Record<string, any>);

  const municipalityStats = Object.values(municipalityData).map((m: any) => ({
    ...m,
    activePrograms: m.activePrograms.size,
    averagePrice: m.totalCost / m.students
  }));

  const programDistribution = regionalStudents.reduce((acc, student) => {
    if (!acc[student.studyPath]) {
      acc[student.studyPath] = { program: student.studyPath, students: 0, municipalities: new Set() };
    }
    acc[student.studyPath].students++;
    acc[student.studyPath].municipalities.add(student.municipality);
    return acc;
  }, {} as Record<string, any>);

  const programStats = Object.values(programDistribution).map((p: any) => ({
    ...p,
    municipalities: p.municipalities.size,
    percentage: ((p.students / regionalStudents.length) * 100).toFixed(1)
  }));

  const handleExportAnalytics = () => {
    toast({
      title: "Regional Analytics Exported",
      description: "De-identified regional statistics have been exported successfully",
    });
  };

  const canViewCrossMunicipal = user?.role === 'regional-admin' || user?.role === 'municipality-admin';

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ike-neutral-dark">Regional Statistics</h1>
          <div className="flex items-center gap-2 text-ike-neutral mt-2">
            <Shield className="w-4 h-4 text-ike-success" />
            <span className="text-sm sm:text-base">Comprehensive de-identified regional education analytics</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white w-full sm:w-auto"
            onClick={handleExportAnalytics}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-5 min-w-max">
            <TabsTrigger value="overview" className="flex items-center space-x-2 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center space-x-2 text-xs sm:text-sm">
              <History className="w-4 h-4" />
              <span>Historical</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2 text-xs sm:text-sm">
              <GitCompare className="w-4 h-4" />
              <span>Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="pricecodes" className="flex items-center space-x-2 text-xs sm:text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Price Codes</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2 text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              <span>Students</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">{statisticsData.totalStudents.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-ike-success" />
                  <span className="text-ike-success">{statisticsData.trends.students}</span>
                  <span className="text-ike-neutral ml-1">vs last year</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral">Active Municipalities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-ike-primary">{statisticsData.activeMunicipalities}</div>
                <p className="text-xs text-ike-neutral">In collaboration area</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral">Cross-Municipal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-ike-warning">{statisticsData.crossMunicipalPlacements}</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-ike-success" />
                  <span className="text-ike-success">{statisticsData.trends.placements}</span>
                  <span className="text-ike-neutral ml-1">placements</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-ike-success">{statisticsData.completionRate}%</div>
                <p className="text-xs text-ike-neutral">Regional average</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <MapPin className="w-5 h-5 mr-2 text-ike-primary" />
                  Municipality Distribution
                </CardTitle>
                <CardDescription>
                  De-identified student distribution across municipalities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {municipalityStats.slice(0, 6).map((municipality: any, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-ike-primary/10 rounded-full flex items-center justify-center">
                          <Building className="w-4 h-4 text-ike-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-ike-neutral-dark text-sm sm:text-base">{municipality.name}</h3>
                          <p className="text-xs sm:text-sm text-ike-neutral">{municipality.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-ike-primary border-ike-primary text-xs">
                          {municipality.activePrograms} programs
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
                  Program Distribution
                </CardTitle>
                <CardDescription>
                  Regional breakdown by educational programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {programStats.slice(0, 6).map((program: any, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-ike-success/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-ike-success" />
                        </div>
                        <div>
                          <h3 className="font-medium text-ike-neutral-dark text-sm sm:text-base">{program.program}</h3>
                          <p className="text-xs sm:text-sm text-ike-neutral">{program.municipalities} municipalities</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-ike-neutral-dark">{program.students}</div>
                        <Badge variant="outline" className="text-xs">{program.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {canViewCrossMunicipal && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <Users className="w-5 h-5 mr-2 text-ike-primary" />
                  De-identified Student Data Sample
                  <Shield className="w-4 h-4 ml-2 text-ike-success" />
                </CardTitle>
                <CardDescription>
                  Sample of de-identified regional student data (Municipal Principals can view all placements)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Study Path</TableHead>
                        <TableHead>School Year</TableHead>
                        <TableHead>Age Group</TableHead>
                        <TableHead>Municipality</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Unit Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regionalStudents.slice(0, 10).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-mono text-sm">{student.anonymizedId}</TableCell>
                          <TableCell>{student.studyPath}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.schoolYear}</Badge>
                          </TableCell>
                          <TableCell>{student.ageGroup}</TableCell>
                          <TableCell>
                            <Badge className="bg-ike-primary text-white">{student.municipality}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={student.status === 'active' ? 'bg-ike-success' : 'bg-ike-neutral'}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{formatCurrency(student.unitPrice)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="historical">
          <RegionalHistoricalTracking />
        </TabsContent>

        <TabsContent value="comparison">
          <RegionalMultiPeriodComparison />
        </TabsContent>

        <TabsContent value="pricecodes">
          <RegionalPriceCodeAnalysis />
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Users className="w-5 h-5 mr-2 text-ike-primary" />
                Regional Student Data Access
                <Shield className="w-4 h-4 ml-2 text-ike-success" />
              </CardTitle>
              <CardDescription>
                Access comprehensive de-identified student data across the collaboration area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                  variant="outline"
                  onClick={() => window.location.href = '/students/municipal'}
                >
                  <Users className="w-5 sm:w-6 h-5 sm:h-6 text-ike-primary" />
                  <span className="text-sm sm:text-base">All Regional Students</span>
                  <span className="text-xs text-ike-neutral">De-identified data across municipalities</span>
                </Button>
                <Button 
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2"
                  variant="outline"
                  onClick={() => window.location.href = '/students/external'}
                >
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-ike-primary" />
                  <span className="text-sm sm:text-base">Cross-Municipal Placements</span>
                  <span className="text-xs text-ike-neutral">Students studying outside home municipality</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
