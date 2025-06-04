
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Download, 
  Calendar, 
  Edit,
  ChevronRight,
  Clock,
  Star,
  User
} from "lucide-react";

const Reports = () => {
  const reportCategories = [
    {
      id: 1,
      name: "Studentrapporter",
      icon: User,
      count: 14,
      popular: "Studentregistrering (månadsvis)"
    },
    {
      id: 2,
      name: "Ekonomirapporter",
      icon: FileText,
      count: 9,
      popular: "Ekonomisk sammanställning (månadsvis)"
    },
    {
      id: 3,
      name: "Kommunrapporter",
      icon: FileText,
      count: 8,
      popular: "Kommunal fördelning (kvartalsvis)"
    },
    {
      id: 4,
      name: "Statistikrapporter",
      icon: FileText,
      count: 12,
      popular: "Programanalys (terminsvis)"
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Student Enrollment Report",
      category: "Studentrapporter",
      generatedDate: "2024-11-15 10:30",
      scheduleType: "Daily",
      nextSchedule: "2024-11-16 06:00",
      format: "Excel",
      user: "Anna Lindström"
    },
    {
      id: 2,
      name: "Financial Summary October 2024",
      category: "Ekonomirapporter",
      generatedDate: "2024-11-10 14:15",
      scheduleType: "Monthly",
      nextSchedule: "2024-12-10 06:00",
      format: "PDF",
      user: "Lars Persson"
    },
    {
      id: 3,
      name: "Conflict Resolution Report",
      category: "Studentrapporter",
      generatedDate: "2024-11-12 09:45",
      scheduleType: "Weekly",
      nextSchedule: "2024-11-19 06:00",
      format: "Excel",
      user: "Maria Andersson"
    }
  ];

  const savedReports = [
    {
      id: 1,
      name: "Student Distribution by Program",
      category: "Studentrapporter",
      lastRun: "2024-11-10",
      favorite: true,
      description: "Shows the distribution of students across all programs"
    },
    {
      id: 2,
      name: "Municipality Cost Analysis",
      category: "Ekonomirapporter",
      lastRun: "2024-11-08",
      favorite: true,
      description: "Detailed cost breakdown per municipality"
    },
    {
      id: 3,
      name: "Grade Performance Analysis",
      category: "Statistikrapporter",
      lastRun: "2024-10-30",
      favorite: false,
      description: "Analysis of grade performance across schools"
    },
    {
      id: 4,
      name: "Demographic Analysis",
      category: "Statistikrapporter",
      lastRun: "2024-10-25",
      favorite: false,
      description: "Student demographics across regions"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Standardrapporter</h1>
          <p className="text-ike-neutral mt-2">
            Generera och hantera vanliga systemrapporter
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Ny Rapport
        </Button>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ike-neutral" />
        <Input
          placeholder="Sök i alla rapporter..."
          className="pl-10 py-6 text-lg border-ike-primary/20 focus:border-ike-primary"
        />
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCategories.map((category) => (
          <Card 
            key={category.id}
            className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-primary"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-ike-primary/10 text-ike-primary rounded-full flex items-center justify-center mr-2">
                    <category.icon className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-ike-neutral-dark">{category.name}</CardTitle>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ike-neutral mb-4">
                Mest populär: <span className="text-ike-neutral-dark">{category.popular}</span>
              </p>
              <Button 
                variant="ghost" 
                className="w-full justify-between text-ike-primary hover:bg-ike-primary/10"
              >
                Visa alla
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Clock className="w-5 h-5 mr-2 text-ike-primary" />
            Senaste Rapporter
          </CardTitle>
          <CardDescription>
            Nyligen genererade och schemalagda rapporter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{report.name}</h3>
                    <div className="text-sm text-ike-neutral mt-1">
                      <span className="mr-4">{report.category}</span>
                      <span className="mr-4">{report.scheduleType}</span>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-ike-neutral mt-2">
                      <User className="w-3 h-3 mr-1" />
                      {report.user}
                      <span className="mx-2">•</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      {report.generatedDate}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schema
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Download className="w-4 h-4 mr-1" />
                    Ladda ner
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Star className="w-5 h-5 mr-2 text-ike-warning" />
            Sparade Rapporter
          </CardTitle>
          <CardDescription>
            Anpassade och sparade rapportmallar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedReports.map((report) => (
              <div 
                key={report.id} 
                className="p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark flex items-center">
                        {report.name}
                        {report.favorite && (
                          <Star className="w-4 h-4 ml-2 text-ike-warning fill-ike-warning" />
                        )}
                      </h3>
                      <div className="text-sm text-ike-neutral">
                        <span>{report.category}</span>
                        <span className="mx-2">•</span>
                        <span>Senast körd: {report.lastRun}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-ike-neutral mt-3">
                  {report.description}
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="border-ike-neutral text-ike-neutral hover:bg-ike-neutral-light">
                    <Edit className="w-4 h-4 mr-1" />
                    Redigera
                  </Button>
                  <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <FileText className="w-4 h-4 mr-1" />
                    Generera
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-ike-primary" />
              Studentrapporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Studentregistrering (Monthly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Elevplatser (Weekly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Konfliktanalys (Daily)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Ekonomirapporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Ekonomisk sammanställning (Monthly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Kostnad per student (Quarterly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Budgetavstämning (Monthly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Statistikrapporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Programanalys (Termly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Kommunfördelning (Quarterly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-ike-neutral-light rounded-md">
              <span className="text-sm">Årsstatistik (Yearly)</span>
              <Button size="sm" variant="ghost">
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
