
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Calendar, CheckCircle, Clock, User } from "lucide-react";

const StudentPlacements = () => {
  const placements = [
    {
      id: 1,
      studentName: "Erik Andersson",
      personalNumber: "200501-1234",
      fromMunicipality: "Malmö",
      toMunicipality: "Lund",
      fromSchool: "Malmö Gymnasium",
      toSchool: "Katedralskolan",
      program: "Naturvetenskapsprogrammet",
      requestDate: "2024-11-15",
      status: "pending",
      reason: "Familjeпереезд"
    },
    {
      id: 2,
      studentName: "Maria Johansson",
      personalNumber: "200403-5678",
      fromMunicipality: "Lund",
      toMunicipality: "Helsingborg",
      fromSchool: "Katedralskolan",
      toSchool: "Nicolai Gymnasium",
      program: "Samhällsvetenskapsprogrammet",
      requestDate: "2024-11-10",
      status: "approved",
      reason: "Programbyte"
    },
    {
      id: 3,
      studentName: "Carl Lindström",
      personalNumber: "200502-9012",
      fromMunicipality: "Helsingborg",
      toMunicipality: "Malmö",
      fromSchool: "Nicolai Gymnasium",
      toSchool: "Jensen Gymnasium",
      program: "Estetiska programmet",
      requestDate: "2024-11-08",
      status: "completed",
      reason: "Specialisering"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-ike-warning text-white">Väntande</Badge>;
      case "approved":
        return <Badge className="bg-ike-primary text-white">Godkänd</Badge>;
      case "completed":
        return <Badge className="bg-ike-success text-white">Genomförd</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Placeringar & Överföringar</h1>
          <p className="text-ike-neutral mt-2">
            Hantera studentöverföringar mellan kommuner och skolor
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Ny Överföring
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Väntande Överföringar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-neutral">Kräver godkännande</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Godkända denna månad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
            <div className="text-xs text-ike-neutral">+15% från förra månaden</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Genomförda överföringar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">156</div>
            <div className="text-xs text-ike-neutral">Sedan terminsstart</div>
          </CardContent>
        </Card>
      </div>

      {/* Placement Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
            Aktuella Överföringsförfrågningar
          </CardTitle>
          <CardDescription>
            Pågående och nyligen genomförda studentöverföringar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {placements.map((placement) => (
              <div key={placement.id} className="border rounded-lg p-4 hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ike-neutral-dark">{placement.studentName}</h3>
                        <p className="text-sm text-ike-neutral font-mono">{placement.personalNumber}</p>
                      </div>
                      {getStatusBadge(placement.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-ike-neutral">Från:</span>
                            <p className="text-ike-neutral-dark">{placement.fromSchool}</p>
                            <p className="text-xs text-ike-neutral">{placement.fromMunicipality} kommun</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-ike-neutral">Till:</span>
                            <p className="text-ike-neutral-dark">{placement.toSchool}</p>
                            <p className="text-xs text-ike-neutral">{placement.toMunicipality} kommun</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-ike-neutral">Program:</span>
                          <span className="ml-2 text-ike-neutral-dark">{placement.program}</span>
                        </div>
                        <div className="flex items-center text-ike-neutral">
                          <Calendar className="w-4 h-4 mr-1" />
                          {placement.requestDate}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="font-medium text-ike-neutral">Anledning:</span>
                        <span className="ml-2 text-ike-neutral-dark">{placement.reason}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col space-y-2">
                    {placement.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-ike-success hover:bg-green-600 text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Godkänn
                        </Button>
                        <Button size="sm" variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                          Avslå
                        </Button>
                      </>
                    )}
                    {placement.status === "approved" && (
                      <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                        <Clock className="w-4 h-4 mr-1" />
                        Genomför
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      Visa detaljer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Överföringsprocess</CardTitle>
          <CardDescription>
            Standardprocess för studentöverföringar mellan kommuner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-success rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Ansökan inkommen</h4>
                <p className="text-sm text-ike-neutral">Student eller vårdnadshavare lämnar in ansökan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Granskning</h4>
                <p className="text-sm text-ike-neutral">Både avgående och mottagande skola granskar ansökan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-warning rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Godkännande</h4>
                <p className="text-sm text-ike-neutral">Beslut fattas av ansvarig administrator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Genomförande</h4>
                <p className="text-sm text-ike-neutral">Systemet uppdaterar studentregistret och beräknar nya bidrag</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPlacements;
