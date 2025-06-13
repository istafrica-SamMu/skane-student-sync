
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Download, 
  Filter,
  FileText,
  GraduationCap,
  Calendar,
  MapPin
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const StudentLists = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const availableReports = [
    {
      id: 1,
      name: "Current Student Roster",
      description: "Complete list of all enrolled students",
      category: "Student Lists",
      format: "Excel/PDF",
      lastGenerated: "2024-11-15",
      icon: Users
    },
    {
      id: 2,
      name: "Students by Class",
      description: "Students organized by class and study path",
      category: "Student Lists",
      format: "Excel/PDF",
      lastGenerated: "2024-11-14",
      icon: GraduationCap
    },
    {
      id: 3,
      name: "Student Contact Information",
      description: "Student and guardian contact details",
      category: "Student Lists",
      format: "Excel",
      lastGenerated: "2024-11-13",
      icon: MapPin
    },
    {
      id: 4,
      name: "Student Attendance Statistics",
      description: "Attendance tracking and statistics",
      category: "Statistics",
      format: "PDF",
      lastGenerated: "2024-11-12",
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Student Lists & Reports</h1>
          <p className="text-ike-neutral mt-2">
            Generate and download student lists and statistics for your school
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ike-neutral" />
          <Input
            placeholder="Search student reports..."
            className="pl-10 border-ike-primary/20 focus:border-ike-primary"
          />
        </div>
        <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">247</div>
            <div className="text-xs text-ike-neutral mt-1">Currently enrolled</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-neutral mt-1">This academic year</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Study Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral mt-1">Available programs</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Reports Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-neutral mt-1">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Available Student Reports
          </CardTitle>
          <CardDescription>
            Generate and download student lists and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <report.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <p className="text-sm text-ike-neutral mt-1">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{report.category}</Badge>
                      <Badge variant="secondary">{report.format}</Badge>
                      <span className="text-xs text-ike-neutral">
                        Last: {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    Preview
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Download className="w-4 h-4 mr-1" />
                    Generate
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

export default StudentLists;
