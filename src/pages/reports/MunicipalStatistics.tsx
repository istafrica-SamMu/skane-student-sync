
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users,
  TrendingUp,
  TrendingDown,
  School,
  Euro
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MunicipalStatistics = () => {
  const { t } = useLanguage();

  const statisticsData = {
    totalStudents: 1247,
    internalStudents: 1098,
    externalStudents: 149,
    outgoingStudents: 87,
    totalCost: 15650000,
    costPerStudent: 12550,
    trends: {
      students: "+3.2%",
      cost: "+2.8%",
      efficiency: "+1.4%"
    }
  };

  const programDistribution = [
    { program: "Naturvetenskap", students: 245, percentage: 19.6 },
    { program: "Samhällsvetenskap", students: 198, percentage: 15.9 },
    { program: "Teknik", students: 187, percentage: 15.0 },
    { program: "Ekonomi", students: 165, percentage: 13.2 },
    { program: "Estetiska", students: 142, percentage: 11.4 },
    { program: "Vårdförberedande", students: 128, percentage: 10.3 },
    { program: "Hantverksprogram", students: 98, percentage: 7.9 },
    { program: "Övriga", students: 84, percentage: 6.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Municipal Statistics</h1>
          <p className="text-ike-neutral mt-2">
            Statistical reports and analytics for municipal education
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Change Period
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{statisticsData.totalStudents.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="w-3 h-3 mr-1 text-ike-success" />
              <span className="text-ike-success">{statisticsData.trends.students}</span>
              <span className="text-ike-neutral ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Internal Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{statisticsData.internalStudents.toLocaleString()}</div>
            <p className="text-xs text-ike-neutral">
              {((statisticsData.internalStudents / statisticsData.totalStudents) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">External Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{statisticsData.externalStudents}</div>
            <p className="text-xs text-ike-neutral">From other municipalities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Outgoing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">{statisticsData.outgoingStudents}</div>
            <p className="text-xs text-ike-neutral">Studying elsewhere</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Education Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {(statisticsData.totalCost / 1000000).toFixed(1)}M SEK
            </div>
            <div className="flex items-center text-xs">
              <TrendingUp className="w-3 h-3 mr-1 text-ike-success" />
              <span className="text-ike-success">{statisticsData.trends.cost}</span>
              <span className="text-ike-neutral ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Cost per Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{statisticsData.costPerStudent.toLocaleString()} SEK</div>
            <p className="text-xs text-ike-neutral">Average annual cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Cost Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">92.4%</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="w-3 h-3 mr-1 text-ike-success" />
              <span className="text-ike-success">{statisticsData.trends.efficiency}</span>
              <span className="text-ike-neutral ml-1">improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Student Distribution by Program
          </CardTitle>
          <CardDescription>
            Breakdown of students across different educational programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-ike-primary/10 rounded-full flex items-center justify-center">
                    <School className="w-4 h-4 text-ike-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{item.program}</h3>
                    <p className="text-sm text-ike-neutral">{item.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-ike-primary border-ike-primary">
                    {item.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              Student Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ike-neutral mb-4">
              Detailed analysis of student demographics and performance
            </p>
            <Button variant="outline" className="w-full border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Euro className="w-5 h-5 mr-2 text-ike-primary" />
              Financial Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ike-neutral mb-4">
              Cost analysis and budget comparisons across programs
            </p>
            <Button variant="outline" className="w-full border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Trend Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ike-neutral mb-4">
              Historical trends and predictive analytics
            </p>
            <Button variant="outline" className="w-full border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              View Trends
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MunicipalStatistics;
