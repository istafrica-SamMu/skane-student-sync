
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calculator, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  FileText,
  Download,
  Plus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.totalStudents'),
      value: "2,847",
      icon: Users,
      trend: "+12.3%",
      color: "text-ike-primary"
    },
    {
      title: t('dashboard.activeCalculations'),
      value: "3",
      icon: Calculator,
      trend: "Processing",
      color: "text-ike-warning"
    },
    {
      title: t('dashboard.pendingConflicts'),
      value: "12",
      icon: AlertTriangle,
      trend: "-2 today",
      color: "text-ike-error"
    },
    {
      title: t('dashboard.monthlyAmount'),
      value: "3,755,000 SEK",
      icon: DollarSign,
      trend: "+5.2%",
      color: "text-ike-success"
    }
  ];

  const recentActivity = [
    { action: "Student transferred", details: "Erik Andersson moved to Malmö Gymnasium", time: "2 hours ago" },
    { action: "Calculation completed", details: "November 2024 IKE calculation finalized", time: "4 hours ago" },
    { action: "Conflict resolved", details: "Double registration for Maria Svensson", time: "6 hours ago" },
    { action: "Data imported", details: "Weekly student data from Lund Municipality", time: "8 hours ago" },
    { action: "Report generated", details: "Monthly contribution report for October", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('dashboard.welcome')}</h1>
        <p className="text-ike-neutral">{t('dashboard.overview')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">{stat.value}</div>
              <p className={`text-xs ${stat.color} flex items-center mt-1`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculation Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-ike-primary" />
              <span>{t('dashboard.calculationStatus')}</span>
            </CardTitle>
            <CardDescription>
              Current monthly calculation progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ike-neutral">November 2024 Calculation</span>
                <Badge className="bg-ike-success text-white">Completed</Badge>
              </div>
              <div className="w-full bg-ike-neutral-light rounded-full h-2">
                <div className="bg-ike-primary h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-ike-neutral">Students Processed</p>
                  <p className="font-semibold text-ike-neutral-dark">2,847 / 2,847</p>
                </div>
                <div>
                  <p className="text-ike-neutral">Contributions</p>
                  <p className="font-semibold text-ike-neutral-dark">3,755,000 SEK</p>
                </div>
                <div>
                  <p className="text-ike-neutral">Processing Time</p>
                  <p className="font-semibold text-ike-neutral-dark">1.2 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
            <CardDescription>
              Common tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-ike-primary hover:bg-ike-primary-light">
              <Download className="mr-2 h-4 w-4" />
              {t('common.export')}
            </Button>
            <Button variant="outline" className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary hover:text-white">
              <FileText className="mr-2 h-4 w-4" />
              {t('common.generate')}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              New Calculation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          <CardDescription>
            Latest system activities and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-ike-neutral-light transition-colors">
                <div className="w-2 h-2 bg-ike-primary rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-ike-neutral-dark">{activity.action}</p>
                  <p className="text-sm text-ike-neutral">{activity.details}</p>
                </div>
                <span className="text-xs text-ike-neutral">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
