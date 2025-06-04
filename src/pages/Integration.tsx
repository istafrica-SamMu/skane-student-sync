
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Upload,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const Integration = () => {
  const integrations = [
    {
      id: 1,
      name: "Municipal SIS - Malmö",
      type: "ist_admin",
      status: "success",
      lastSync: "2024-11-15 14:30",
      processed: 1245,
      errors: 0,
      nextScheduled: "2024-11-16 02:00"
    },
    {
      id: 2,
      name: "SS12000 Import - Lund",
      type: "ss12000",
      status: "running",
      lastSync: "2024-11-15 15:45",
      processed: 458,
      errors: 0,
      nextScheduled: "Pågående..."
    },
    {
      id: 3,
      name: "Navet Integration",
      type: "navet",
      status: "scheduled",
      lastSync: "2024-11-15 08:00",
      processed: 2847,
      errors: 3,
      nextScheduled: "2024-11-15 20:00"
    },
    {
      id: 4,
      name: "File Import - Helsingborg",
      type: "file",
      status: "error",
      lastSync: "2024-11-15 10:15",
      processed: 342,
      errors: 12,
      nextScheduled: "Fel - Manuell åtgärd krävs"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-ike-success text-white">Framgångsrik</Badge>;
      case "running":
        return <Badge className="bg-ike-primary text-white">Pågående</Badge>;
      case "scheduled":
        return <Badge className="bg-ike-warning text-white">Schemalagd</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Fel</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "ist_admin":
        return <Database className="w-5 h-5 text-white" />;
      case "ss12000":
        return <Upload className="w-5 h-5 text-white" />;
      case "navet":
        return <User className="w-5 h-5 text-white" />;
      case "file":
        return <FileText className="w-5 h-5 text-white" />;
      default:
        return <Database className="w-5 h-5 text-white" />;
    }
  };

  const getIntegrationIconBg = (type: string) => {
    switch (type) {
      case "ist_admin":
        return "bg-blue-500";
      case "ss12000":
        return "bg-ike-primary";
      case "navet":
        return "bg-green-500";
      case "file":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Integration & Import</h1>
          <p className="text-ike-neutral mt-2">
            Hantera dataintegration med externa system
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Synkronisera nu
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Framgångsrika synkroniseringar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">24</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              Senaste 24 timmarna
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Behandlade poster
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">48,234</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Senaste 24 timmarna
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Integrationsproblem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="flex items-center text-xs text-ike-error mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              Kräver åtgärd
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Genomsnittlig synktid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1.8h</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowDown className="w-3 h-3 mr-1" />
              -0.5h från föregående månad
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Database className="w-5 h-5 mr-2 text-ike-primary" />
            Integrationsstatus
          </CardTitle>
          <CardDescription>
            Status för aktiva systemintegrationer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {integrations.map((integration) => (
              <div 
                key={integration.id} 
                className={`border rounded-lg p-4 ${
                  integration.status === 'error' ? 'border-ike-error/30 bg-ike-error/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIntegrationIconBg(integration.type)}`}>
                      {getIntegrationIcon(integration.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{integration.name}</h3>
                      <p className="text-sm text-ike-neutral">
                        Senaste synk: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>

                {integration.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ike-neutral">Förlopp</span>
                      <span className="text-ike-neutral">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">Bearbetade poster:</span>
                    <span className="font-medium">{integration.processed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between bg-ike-neutral-light p-2 rounded-lg">
                    <span className="text-ike-neutral">Fel:</span>
                    <span className={`font-medium ${integration.errors > 0 ? 'text-ike-error' : ''}`}>
                      {integration.errors}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-ike-neutral">
                    <Clock className="w-4 h-4 mr-1" />
                    Nästa: {integration.nextScheduled}
                  </div>

                  <div className="flex space-x-2">
                    {integration.status === "error" && (
                      <Button size="sm" className="bg-ike-error hover:bg-ike-error/80 text-white">
                        <XCircle className="w-4 h-4 mr-1" />
                        Visa fel
                      </Button>
                    )}

                    {integration.status === "running" && (
                      <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                        Avbryt
                      </Button>
                    )}

                    {(integration.status === "success" || integration.status === "error") && (
                      <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                        <RefreshCcw className="w-4 h-4 mr-1" />
                        Synkronisera
                      </Button>
                    )}

                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      Konfiguration
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Database className="w-5 h-5 mr-2 text-blue-500" />
              Kommunal SIS Synk
            </CardTitle>
            <CardDescription>
              Integration med kommunala skoladministrationssystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">IST Admin</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Tieto Education</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Alfa E-skola</span>
              </div>
              
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-2">
                Konfigurera anslutningar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-primary" />
              SS12000 Import
            </CardTitle>
            <CardDescription>
              Import via SS12000-standarden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Fullt stöd för SS12000 v1.1</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Batch och realtidsimport</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Validering och konflikthantering</span>
              </div>
              
              <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white mt-2">
                Importera SS12000-data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-green-500" />
              Navet Integration
            </CardTitle>
            <CardDescription>
              Integration med Skatteverkets folkbokföring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Befolkningsdata</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Adressuppdateringar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Skyddat persondata</span>
              </div>
              
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-2">
                Navet-inställningar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Processing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-amber-500" />
            Filbehandling
          </CardTitle>
          <CardDescription>
            Manuell import och export av filer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 bg-ike-neutral-light/40">
              <h3 className="font-medium text-ike-neutral-dark mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-ike-primary" />
                Importera data
              </h3>
              <p className="text-sm text-ike-neutral mb-4">
                Ladda upp Excel-filer eller CSV-data för import till systemet
              </p>
              <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
                Välj fil för import
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 bg-ike-neutral-light/40">
              <h3 className="font-medium text-ike-neutral-dark mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-amber-500" />
                Exportera data
              </h3>
              <p className="text-sm text-ike-neutral mb-4">
                Exportera data till Excel eller CSV för användning i externa system
              </p>
              <Button className="w-full border-amber-500 text-amber-500 hover:bg-amber-500/10" variant="outline">
                Välj data för export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integration;
