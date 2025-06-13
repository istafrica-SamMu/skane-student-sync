
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Search, 
  Download, 
  Users,
  FileText,
  TrendingUp,
  GraduationCap,
  Calendar,
  Target
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const SchoolStatistics = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const statisticsReports = [
    {
      id: 1,
      name: "Enrollment Statistics",
      description: "Student enrollment trends and analysis",
      value: "247 students",
      change: "+5.2%",
      period: "This year",
      format: "PDF/Excel",
      icon: Users
    },
    {
      id: 2,
      name: "Program Performance Analysis",
      description: "Academic performance across study paths",
      value: "85% completion",
      change: "+3.1%",
      period: "Last semester",
      format: "PDF",
      icon: Target
    },
    {
      id: 3,
      name: "Class Distribution Report",
      description: "Student distribution across classes and programs",
      value: "12 active classes",
      change: "0%",
      period: "Current term",
      format: "Excel",
      icon: GraduationCap
    },
    {
      id: 4,
      name: "Annual School Report",
      description: "Comprehensive yearly school statistics",
      value: "2024 Report",
      change: "New",
      period: "Annual",
      format: "PDF",
      icon: FileText
    }
  ];

  const programStats = [
    { name: "Natural Sciences", students: 45, capacity: 50, percentage: 90 },
    { name: "Social Sciences", students: 38, capacity: 45, percentage: 84 },
    { name: "Technology", students: 52, capacity: 55, percentage: 95 },
    { name: "Arts & Media", students: 29, capacity: 35, percentage: 83 },
    { name: "Business", students: 41, capacity: 50, percentage: 82 },
    { name: "Health Care", students: 42, capacity: 45, percentage: 93 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">School Statistics</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive statistics and data export for your school
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ike-neutral" />
        <Input
          placeholder="Search statistics reports..."
          className="pl-10 border-ike-primary/20 focus:border-ike-primary"
        />
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">247</div>
            <div className="text-xs text-ike-success mt-1">+5.2% from last year</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">85%</div>
            <div className="text-xs text-ike-success mt-1">+3.1% improvement</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Study Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral mt-1">Active programs</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Capacity Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">88%</div>
            <div className="text-xs text-ike-neutral mt-1">Overall utilization</div>
          </CardContent>
        </Card>
      </div>

      {/* Program Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
            Program Enrollment Statistics
          </CardTitle>
          <CardDescription>
            Current enrollment by study program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {programStats.map((program, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-ike-neutral-dark">{program.name}</h4>
                    <span className="text-sm text-ike-neutral">
                      {program.students}/{program.capacity} students
                    </span>
                  </div>
                  <Progress value={program.percentage} className="h-2" />
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-ike-neutral-dark">{program.percentage}%</div>
                  <div className="text-xs text-ike-neutral">Capacity</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Statistics Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
            Available Statistics Reports
          </CardTitle>
          <CardDescription>
            Generate and export school statistics and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statisticsReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <p className="text-sm text-ike-neutral mt-1">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-sm font-medium text-ike-primary">{report.value}</div>
                      <Badge variant="outline">{report.format}</Badge>
                      <div className="flex items-center text-xs text-ike-neutral">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {report.change}
                      </div>
                      <div className="flex items-center text-xs text-ike-neutral">
                        <Calendar className="w-3 h-3 mr-1" />
                        {report.period}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    Preview
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolStatistics;
