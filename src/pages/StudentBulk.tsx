
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  ArrowUp
} from "lucide-react";

const StudentBulk = () => {
  const bulkOperations = [
    {
      id: 1,
      type: "import",
      name: "SS12000 Import - Lunds kommun",
      status: "completed",
      progress: 100,
      totalRecords: 342,
      processedRecords: 342,
      successfulRecords: 338,
      failedRecords: 4,
      startTime: "2024-11-15 09:30",
      endTime: "2024-11-15 09:45",
      user: "Anna Lindström"
    },
    {
      id: 2,
      type: "promotion",
      name: "Årskursavancemang 2024",
      status: "running",
      progress: 65,
      totalRecords: 1247,
      processedRecords: 810,
      successfulRecords: 806,
      failedRecords: 4,
      startTime: "2024-11-15 14:00",
      endTime: null,
      user: "Lars Persson"
    },
    {
      id: 3,
      type: "export",
      name: "Studentdata Export - Malmö",
      status: "pending",
      progress: 0,
      totalRecords: 456,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      startTime: null,
      endTime: null,
      user: "Maria Andersson"
    }
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

  const getOperationIcon = (type: string) => {
    switch (type) {
      case "import":
        return <Upload className="w-4 h-4" />;
      case "export":
        return <Download className="w-4 h-4" />;
      case "promotion":
        return <ArrowUp className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Massoperationer</h1>
          <p className="text-ike-neutral mt-2">
            Hantera stora mängder studentdata effektivt
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            Mallar
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Package className="w-4 h-4 mr-2" />
            Ny Operation
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-primary">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Upload className="w-5 h-5 mr-2 text-ike-primary" />
              Importera Studentdata
            </CardTitle>
            <CardDescription>
              Importera data från SS12000 eller Excel-filer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-primary hover:bg-ike-primary-dark text-white">
              Starta Import
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-success">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <ArrowUp className="w-5 h-5 mr-2 text-ike-success" />
              Årskursavancemang
            </CardTitle>
            <CardDescription>
              Avancera studenter till nästa årskurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-success hover:bg-green-600 text-white">
              Starta Avancemang
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-ike-warning">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Download className="w-5 h-5 mr-2 text-ike-warning" />
              Exportera Data
            </CardTitle>
            <CardDescription>
              Exportera studentdata för rapporter eller backup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-ike-warning hover:bg-yellow-500 text-white">
              Starta Export
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Operation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Package className="w-5 h-5 mr-2 text-ike-primary" />
            Pågående och Senaste Operationer
          </CardTitle>
          <CardDescription>
            Status för massoperationer och dataprocessning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bulkOperations.map((operation) => (
              <div key={operation.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center text-white">
                      {getOperationIcon(operation.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ike-neutral-dark">{operation.name}</h3>
                      <p className="text-sm text-ike-neutral">Startad av: {operation.user}</p>
                    </div>
                  </div>
                  {getStatusBadge(operation.status)}
                </div>

                {operation.status === "running" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ike-neutral">Framsteg</span>
                      <span className="text-ike-neutral">{operation.progress}%</span>
                    </div>
                    <Progress value={operation.progress} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-ike-neutral">Totalt:</span>
                    <p className="text-ike-neutral-dark">{operation.totalRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-neutral">Bearbetat:</span>
                    <p className="text-ike-neutral-dark">{operation.processedRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-success">Framgångsrikt:</span>
                    <p className="text-ike-success">{operation.successfulRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-ike-error">Misslyckade:</span>
                    <p className="text-ike-error">{operation.failedRecords.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="text-sm text-ike-neutral">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Start: {operation.startTime || "Ej startad"}
                      </div>
                      {operation.endTime && (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-ike-success" />
                          Slut: {operation.endTime}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {operation.status === "running" && (
                      <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                        Avbryt
                      </Button>
                    )}
                    {operation.failedRecords > 0 && (
                      <Button size="sm" variant="outline" className="border-ike-warning text-ike-warning hover:bg-ike-warning/10">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Visa Fel
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      Detaljer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Import Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Importriktlinjer</CardTitle>
          <CardDescription>
            Viktiga riktlinjer för dataimpor och massoperationer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-ike-success mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">SS12000 Standard</h4>
                <p className="text-sm text-ike-neutral">Använd SS12000-formatet för att säkerställa kompatibilitet och datakvalitet</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-ike-success mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Validering före Import</h4>
                <p className="text-sm text-ike-neutral">Verifiera alltid data i testmiljö innan import till produktionssystemet</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-ike-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Backup före Massoperationer</h4>
                <p className="text-sm text-ike-neutral">Säkerställ att fullständig backup finns innan stora ändringar genomförs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-ike-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Kommunikation</h4>
                <p className="text-sm text-ike-neutral">Informera berörda parter om planerade massoperationer i god tid</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBulk;
