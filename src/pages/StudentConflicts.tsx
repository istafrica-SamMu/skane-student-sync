
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, CheckCircle, Clock, MessageSquare, User } from "lucide-react";

const StudentConflicts = () => {
  const conflicts = [
    {
      id: 1,
      studentName: "Maria Johansson",
      personalNumber: "200403-5678",
      conflictType: "Dubbelregistrering",
      school1: "Katedralskolan, Lund",
      school2: "Malmö Gymnasium, Malmö",
      program1: "Samhällsvetenskapsprogrammet",
      program2: "Naturvetenskapsprogrammet",
      detectedDate: "2024-11-12",
      priority: "high",
      status: "pending",
      responsible: "Anna Lindström"
    },
    {
      id: 2,
      studentName: "Johan Svensson",
      personalNumber: "200505-9876",
      conflictType: "Felaktig kommun",
      school1: "Helsingborg Gymnasium, Helsingborg",
      school2: null,
      program1: "Teknikprogrammet",
      program2: null,
      detectedDate: "2024-11-10",
      priority: "medium",
      status: "investigating",
      responsible: "Lars Persson"
    },
    {
      id: 3,
      studentName: "Emma Karlsson",
      personalNumber: "200404-3456",
      conflictType: "Datum konflikt",
      school1: "Kristianstad Gymnasium, Kristianstad",
      school2: "Jensen Gymnasium, Malmö",
      program1: "Ekonomiprogrammet",
      program2: "Ekonomiprogrammet",
      detectedDate: "2024-11-08",
      priority: "low",
      status: "resolved",
      responsible: "Maria Andersson"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-ike-error text-white">Väntande</Badge>;
      case "investigating":
        return <Badge className="bg-ike-warning text-white">Utreds</Badge>;
      case "resolved":
        return <Badge className="bg-ike-success text-white">Löst</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Hög</Badge>;
      case "medium":
        return <Badge className="bg-ike-warning text-white">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Låg</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Konfliktlösning</h1>
          <p className="text-ike-neutral mt-2">
            Identifiera och lösa konflikter i studentregistret
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Kör Konfliktanalys
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Aktiva Konflikter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-error">Kräver uppmärksamhet</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Under Utredning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">5</div>
            <div className="text-xs text-ike-neutral">Pågående process</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Lösta denna månad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-success">94% lösningsgrad</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Genomsnittlig Lösningstid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2.3</div>
            <div className="text-xs text-ike-neutral">dagar</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Conflicts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <AlertTriangle className="w-5 h-5 mr-2 text-ike-error" />
            Aktiva Konflikter
          </CardTitle>
          <CardDescription>
            Konflikter som kräver omedelbar uppmärksamhet och åtgärd
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conflicts.map((conflict) => (
              <div key={conflict.id} className="border rounded-lg p-4 hover:bg-ike-neutral-light/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-ike-error rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ike-neutral-dark">{conflict.studentName}</h3>
                        <p className="text-sm text-ike-neutral font-mono">{conflict.personalNumber}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getPriorityBadge(conflict.priority)}
                        {getStatusBadge(conflict.status)}
                      </div>
                    </div>
                    
                    <div className="bg-ike-neutral-light rounded-lg p-3 mb-3">
                      <h4 className="font-medium text-ike-error mb-2">
                        {conflict.conflictType}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium text-ike-neutral">Skola 1:</span>
                              <p className="text-ike-neutral-dark">{conflict.school1}</p>
                              {conflict.program1 && (
                                <p className="text-xs text-ike-neutral">{conflict.program1}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {conflict.school2 && (
                          <div>
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-ike-neutral">Skola 2:</span>
                                <p className="text-ike-neutral-dark">{conflict.school2}</p>
                                {conflict.program2 && (
                                  <p className="text-xs text-ike-neutral">{conflict.program2}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-ike-neutral">
                        <Clock className="w-4 h-4 mr-1" />
                        Upptäckt: {conflict.detectedDate}
                      </div>
                      <div className="flex items-center text-ike-neutral">
                        <User className="w-4 h-4 mr-1" />
                        Ansvarig: {conflict.responsible}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col space-y-2">
                    {conflict.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                          <Users className="w-4 h-4 mr-1" />
                          Välj Placering
                        </Button>
                        <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                          Redigera
                        </Button>
                      </>
                    )}
                    {conflict.status === "investigating" && (
                      <Button size="sm" className="bg-ike-success hover:bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Markera Löst
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Kommentarer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conflict Resolution Process */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Konfliktlösningsprocess</CardTitle>
          <CardDescription>
            Standardprocess för att lösa konflikter i studentregistret
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-error rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Automatisk Upptäckt</h4>
                <p className="text-sm text-ike-neutral">Systemet identifierar potentiella konflikter vid dataregistrering</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-warning rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Prioritering</h4>
                <p className="text-sm text-ike-neutral">Konflikter prioriteras baserat på typ och påverkan</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Utredning</h4>
                <p className="text-sm text-ike-neutral">Ansvarig administrator kontaktar berörda skolor</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-ike-success rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-ike-neutral-dark">Lösning</h4>
                <p className="text-sm text-ike-neutral">Korrekt placering bestäms och systemet uppdateras</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentConflicts;
