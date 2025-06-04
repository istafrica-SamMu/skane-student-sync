
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  Euro, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Download,
  Play
} from "lucide-react";

const Financial = () => {
  const calculations = [
    {
      id: 1,
      month: "November 2024",
      status: "running",
      progress: 75,
      totalAmount: 3755000,
      studentCount: 2847,
      avgPerStudent: 1319,
      startDate: "2024-11-15",
      estimatedCompletion: "2024-11-15 16:00"
    },
    {
      id: 2,
      month: "Oktober 2024",
      status: "completed",
      progress: 100,
      totalAmount: 3698000,
      studentCount: 2789,
      avgPerStudent: 1326,
      startDate: "2024-10-15",
      completionDate: "2024-10-15 15:45"
    },
    {
      id: 3,
      month: "September 2024",
      status: "completed",
      progress: 100,
      totalAmount: 3542000,
      studentCount: 2654,
      avgPerStudent: 1335,
      startDate: "2024-09-15",
      completionDate: "2024-09-15 14:30"
    }
  ];

  const municipalities = [
    { name: "Malmö", students: 567, amount: 742000, avgCost: 1309 },
    { name: "Lund", students: 342, amount: 451000, avgCost: 1319 },
    { name: "Helsingborg", students: 456, amount: 612000, avgCost: 1342 },
    { name: "Kristianstad", students: 289, amount: 385000, avgCost: 1332 },
    { name: "Landskrona", students: 178, amount: 234000, avgCost: 1315 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">Klar</Badge>;
      case "running":
        return <Badge className="bg-ike-primary text-white">Pågående</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Väntande</Badge>;
      case "failed":
        return <Badge className="bg-ike-error text-white">Misslyckad</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">IKE-beräkningar</h1>
          <p className="text-ike-neutral mt-2">
            Hantera månatliga beräkningar för interkommunal ersättning
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Download className="w-4 h-4 mr-2" />
            Exportera Resultat
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Play className="w-4 h-4 mr-2" />
            Ny Beräkning
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Månadskostnad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              3,755,000 SEK
            </div>
            <div className="text-xs text-ike-success mt-1">
              +1.5% från förra månaden
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Genomsnitt per Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              1,319 SEK
            </div>
            <div className="text-xs text-ike-neutral mt-1">
              Månadsgenomsnitt
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Aktiva Studenter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2,847</div>
            <div className="text-xs text-ike-neutral mt-1">
              Inkluderade i beräkning
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Nästa Beräkning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">15 Dec</div>
            <div className="text-xs text-ike-neutral mt-1">
              Schemalagd körning
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Calculation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
            Aktuell Beräkningsstatus - November 2024
          </CardTitle>
          <CardDescription>
            Detaljerad status för pågående månatlig beräkning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Datavalidering</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Klar
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-ike-neutral">Validerat 2,847 studentposter</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prisberäkning</span>
                  <Badge className="bg-ike-primary text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Pågående
                  </Badge>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-ike-neutral">Bearbetat 2,135 av 2,847 studenter</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Export & Distribution</span>
                  <Badge variant="secondary">Väntande</Badge>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-ike-neutral">Väntar på beräkningskomplettering</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-ike-neutral">
                  <div className="flex items-center space-x-4">
                    <span>Startad: 15 november 2024, 14:00</span>
                    <span>Beräknad färdig: 15 november 2024, 16:00</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                  Visa Detaljer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Beräkningshistorik</CardTitle>
          <CardDescription>
            Översikt över tidigare månatliga beräkningar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations.map((calc) => (
              <div key={calc.id} className="border rounded-lg p-4 hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                      <Calculator className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{calc.month}</h3>
                      <p className="text-sm text-ike-neutral">
                        {calc.status === "completed" ? `Färdig: ${calc.completionDate}` : 
                         calc.status === "running" ? `Beräknad färdig: ${calc.estimatedCompletion}` :
                         `Startdatum: ${calc.startDate}`}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(calc.status)}
                </div>

                {calc.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ike-neutral">Framsteg</span>
                      <span className="text-ike-neutral">{calc.progress}%</span>
                    </div>
                    <Progress value={calc.progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-ike-neutral">Totalt belopp:</span>
                    <p className="text-ike-neutral-dark font-mono">
                      {calc.totalAmount.toLocaleString('sv-SE')} SEK
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-neutral">Antal studenter:</span>
                    <p className="text-ike-neutral-dark">{calc.studentCount.toLocaleString('sv-SE')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-neutral">Genomsnitt/student:</span>
                    <p className="text-ike-neutral-dark">{calc.avgPerStudent.toLocaleString('sv-SE')} SEK</p>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      Detaljer
                    </Button>
                    {calc.status === "completed" && (
                      <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Municipality Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Kommunfördelning - November 2024
          </CardTitle>
          <CardDescription>
            Kostnadsfördeling per kommun för aktuell månad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {municipalities.map((municipality, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {municipality.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-ike-neutral-dark">{municipality.name}</h4>
                    <p className="text-sm text-ike-neutral">{municipality.students} studenter</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-ike-neutral-dark">
                    {municipality.amount.toLocaleString('sv-SE')} SEK
                  </div>
                  <div className="text-sm text-ike-neutral">
                    {municipality.avgCost} SEK/student
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;
