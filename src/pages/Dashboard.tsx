import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calculator, 
  AlertTriangle, 
  Euro, 
  TrendingUp, 
  Download, 
  FileText,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Building,
  School,
  Globe,
  Database,
  Shield,
  Settings
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Regional Admin specific dashboard
  if (user?.role === 'regional-admin') {
    return (
      <div className="space-y-6">
        {/* Welcome Header - Regional Admin */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ike-neutral-dark">
              Regional Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-2">
              {currentDate} • System Overview for Region Skåne
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Regional Report
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <FileText className="w-4 h-4 mr-2" />
              Generate System Report
            </Button>
          </div>
        </div>

        {/* Regional Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Total Municipalities
              </CardTitle>
              <Building className="h-4 w-4 text-ike-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">33</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                All active and connected
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Regional Students
              </CardTitle>
              <Users className="h-4 w-4 text-ike-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">89,247</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                +3.2% from last year
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                System Issues
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-ike-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">7</div>
              <div className="text-xs text-ike-warning mt-1">
                Across 4 municipalities
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Regional Budget
              </CardTitle>
              <Euro className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">1.2B SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                November 2024 calculation
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional System Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Database className="w-5 h-5 mr-2 text-ike-primary" />
                Regional System Status
              </CardTitle>
              <CardDescription>
                Monthly calculation and system health overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regional Data Synchronization</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Municipal Integration Health</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    98% Connected
                  </Badge>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regional Calculation Processing</span>
                  <Badge className="bg-ike-warning text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Next regional sync:</span>
                  <span className="text-sm font-medium">Tomorrow 03:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Regional Operations</CardTitle>
              <CardDescription>
                System administration and oversight
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                <Building className="w-4 h-4 mr-2" />
                Manage Municipalities
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              >
                <School className="w-4 h-4 mr-2" />
                School Unit Overview
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Shield className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Municipality Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Municipality Status Overview</CardTitle>
            <CardDescription>
              Real-time status of municipalities in the region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Malmö",
                  students: 12450,
                  status: "Active",
                  lastSync: "2 min ago",
                  integration: "Healthy",
                  statusColor: "success"
                },
                {
                  name: "Lund",
                  students: 8200,
                  status: "Active",
                  lastSync: "5 min ago",
                  integration: "Healthy",
                  statusColor: "success"
                },
                {
                  name: "Helsingborg",
                  students: 9800,
                  status: "Active",
4 lastSync: "1 min ago",
                  integration: "Warning",
                  statusColor: "warning"
                },
                {
                  name: "Kristianstad",
                  students: 5600,
                  status: "Active",
                  lastSync: "15 min ago",
                  integration: "Error",
                  statusColor: "error"
                }
              ].map((municipality, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-ike-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark">{municipality.name}</h3>
                      <p className="text-sm text-ike-neutral">{municipality.students} students • Last sync: {municipality.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={
                        municipality.statusColor === "success" ? "bg-ike-success text-white" :
                        municipality.statusColor === "warning" ? "bg-ike-warning text-white" :
                        "bg-ike-error text-white"
                      }
                    >
                      {municipality.integration}
                    </Badge>
                    <div className="w-3 h-3 bg-ike-success rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Keep existing dashboard for other roles
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-ike-neutral mt-2">
            {currentDate} • {t('dashboard.date')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            {t('dashboard.export')}
          </Button>
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            {t('dashboard.generate')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.total.students')}
            </CardTitle>
            <Users className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2,847</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +12.3% {t('dashboard.from.last.month')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.active.calculations')}
            </CardTitle>
            <Calculator className="h-4 w-4 text-ike-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="text-xs text-ike-neutral mt-1">
              {t('dashboard.ongoing.processing')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.pending.conflicts')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-ike-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-warning mt-1">
              {t('dashboard.requires.attention')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.monthly.amount')}
            </CardTitle>
            <Euro className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3,755,000</div>
            <div className="text-xs text-ike-neutral mt-1">
              {t('dashboard.for.november')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Calculation Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
              {t('dashboard.calculation.status')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.monthly.calculation')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.data.validation')}</span>
                <Badge className="bg-ike-success text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t('dashboard.completed')}
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.preliminary.calculation')}</span>
                <Badge className="bg-ike-warning text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {t('dashboard.ongoing')}
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.final.calculation')}</span>
                <Badge variant="secondary">{t('dashboard.pending')}</Badge>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ike-neutral">{t('dashboard.next.run')}:</span>
                <span className="text-sm font-medium">15 december 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">{t('dashboard.quick.actions')}</CardTitle>
            <CardDescription>
              {t('dashboard.common.tasks')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              {t('dashboard.new.student')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {t('dashboard.new.calculation')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('dashboard.resolve.conflicts')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              {t('dashboard.generate')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('dashboard.recent.activity')}</CardTitle>
          <CardDescription>
            {t('dashboard.system.events')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "10:30",
                action: t('dashboard.student.registered'),
                details: "Erik Andersson - Malmö Gymnasium",
                status: "success"
              },
              {
                time: "09:45",
                action: t('dashboard.conflict.resolved'),
                details: "Dubbelregistrering för Maria Johansson",
                status: "warning"
              },
              {
                time: "09:15",
                action: t('dashboard.calculation.started'),
                details: t('dashboard.monthly.calculation'),
                status: "info"
              },
              {
                time: "08:30",
                action: t('dashboard.data.imported'),
                details: "SS12000 import från Lunds kommun",
                status: "success"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-ike-neutral-light">
                <div className="text-sm text-ike-neutral font-mono">{activity.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ike-neutral-dark">
                    {activity.action}
                  </div>
                  <div className="text-xs text-ike-neutral">{activity.details}</div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    activity.status === "success" ? "bg-ike-success/10 text-ike-success" :
                    activity.status === "warning" ? "bg-ike-warning/10 text-ike-warning" :
                    "bg-ike-primary/10 text-ike-primary"
                  }
                >
                  {activity.status === "success" ? t('dashboard.done') :
                   activity.status === "warning" ? t('dashboard.resolved') : t('dashboard.ongoing')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
