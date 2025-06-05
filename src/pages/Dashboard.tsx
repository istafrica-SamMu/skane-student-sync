
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
  ArrowDown
} from "lucide-react";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">
            Välkommen till IKE 2.0
          </h1>
          <p className="text-ike-neutral mt-2">
            {currentDate} • Skåne Regional Platform
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Exportera Data
          </Button>
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            Generera Rapport
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Totala Studenter
            </CardTitle>
            <Users className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2,847</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +12.3% från förra månaden
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Aktiva Beräkningar
            </CardTitle>
            <Calculator className="h-4 w-4 text-ike-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="text-xs text-ike-neutral mt-1">
              Pågående processning
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Väntande Konflikter
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-ike-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-warning mt-1">
              Kräver uppmärksamhet
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Månadsbelopp
            </CardTitle>
            <Euro className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3,755,000</div>
            <div className="text-xs text-ike-neutral mt-1">
              SEK för november 2024
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
              Aktuell Beräkningsstatus
            </CardTitle>
            <CardDescription>
              Månatlig IKE-beräkning för november 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Datavalidering</span>
                <Badge className="bg-ike-success text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Klar
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Preliminär beräkning</span>
                <Badge className="bg-ike-warning text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  Pågående
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Slutlig beräkning</span>
                <Badge variant="secondary">Väntande</Badge>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ike-neutral">Nästa körning:</span>
                <span className="text-sm font-medium">15 december 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Snabbåtgärder</CardTitle>
            <CardDescription>
              Vanliga uppgifter och funktioner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Ny Student
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Ny Beräkning
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Lös Konflikter
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generera Rapport
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Senaste Aktivitet</CardTitle>
          <CardDescription>
            Översikt över systemhändelser och användaraktivitet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "10:30",
                action: "Ny student registrerad",
                details: "Erik Andersson - Malmö Gymnasium",
                status: "success"
              },
              {
                time: "09:45",
                action: "Konflikt löst",
                details: "Dubbelregistrering för Maria Johansson",
                status: "warning"
              },
              {
                time: "09:15",
                action: "Beräkning startad",
                details: "Månatlig IKE-beräkning november 2024",
                status: "info"
              },
              {
                time: "08:30",
                action: "Data importerad",
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
                  {activity.status === "success" ? "Klar" :
                   activity.status === "warning" ? "Löst" : "Pågående"}
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
