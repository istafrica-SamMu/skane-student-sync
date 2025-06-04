
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserCheck, Download, Search, Eye, ArrowUp, ArrowDown, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FollowUpReports = () => {
  const followUpCategories = [
    { 
      name: "Ej i gymnasieskolan", 
      count: 126, 
      change: +12, 
      status: "increase" 
    },
    { 
      name: "Påbörjade åtgärder", 
      count: 87, 
      change: +8, 
      status: "increase" 
    },
    { 
      name: "Aktiva åtgärder", 
      count: 63, 
      change: -5, 
      status: "decrease" 
    },
    { 
      name: "Återgått till studier", 
      count: 42, 
      change: +15, 
      status: "increase" 
    }
  ];

  const individuals = [
    {
      id: 1,
      name: "Erik Andersson",
      personalNumber: "200602-1234",
      age: 18,
      municipality: "Malmö",
      status: "not_in_school",
      lastContact: "2024-11-10",
      responsible: "Maria Johansson",
      details: "Avbröt studier på Naturvetenskapsprogrammet"
    },
    {
      id: 2,
      name: "Sofia Lindgren",
      personalNumber: "200703-5678",
      age: 17,
      municipality: "Lund",
      status: "measures_started",
      lastContact: "2024-11-08",
      responsible: "Anders Nilsson",
      details: "Anmäld till introduktionsprogram"
    },
    {
      id: 3,
      name: "Lucas Bergman", 
      personalNumber: "200512-9012",
      age: 19,
      municipality: "Helsingborg",
      status: "active_measures",
      lastContact: "2024-11-15",
      responsible: "Karin Svensson",
      details: "Deltar i yrkesvägledning och praktik"
    },
    {
      id: 4,
      name: "Emma Karlsson",
      personalNumber: "200705-3456",
      age: 17,
      municipality: "Malmö",
      status: "returned_to_school",
      lastContact: "2024-11-05",
      responsible: "Per Olsson",
      details: "Återupptog studier på Ekonomiprogrammet"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not_in_school":
        return <Badge className="bg-ike-error text-white">Ej i skolan</Badge>;
      case "measures_started":
        return <Badge className="bg-ike-warning text-white">Påbörjat åtgärder</Badge>;
      case "active_measures":
        return <Badge className="bg-ike-primary text-white">Aktiva åtgärder</Badge>;
      case "returned_to_school":
        return <Badge className="bg-ike-success text-white">Återgått till studier</Badge>;
      default:
        return <Badge variant="secondary">Okänd status</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Uppföljningsrapporter</h1>
          <p className="text-ike-neutral mt-2">
            Uppföljning av ungdomar 16-20 år enligt kommunalt ansvar
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Period: Höst 2024
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Exportera rapport
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {followUpCategories.map((category, index) => (
          <Card key={index} className={
            category.name === "Ej i gymnasieskolan" ? "border-l-4 border-l-ike-error" :
            category.name === "Påbörjade åtgärder" ? "border-l-4 border-l-ike-warning" :
            category.name === "Aktiva åtgärder" ? "border-l-4 border-l-ike-primary" :
            "border-l-4 border-l-ike-success"
          }>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">
                {category.count}
              </div>
              <div className="flex items-center text-xs mt-1">
                {category.status === "increase" ? (
                  <div className="flex items-center text-ike-error">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +{category.change} från förra månaden
                  </div>
                ) : (
                  <div className="flex items-center text-ike-success">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    {category.change} från förra månaden
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <UserCheck className="w-5 h-5 mr-2 text-ike-primary" />
            Uppföljningsstatus
          </CardTitle>
          <CardDescription>
            Översikt över kommunal uppföljning av ungdomar 16-20 år
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total uppföljningsgrad</span>
                <span className="text-sm text-ike-success">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
              <p className="text-xs text-ike-neutral">318 av 328 identifierade ungdomar med uppföljning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dokumenterade åtgärder</span>
                  <span className="text-sm text-ike-primary">89.2%</span>
                </div>
                <Progress value={89.2} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Återgång till studier</span>
                  <span className="text-sm text-ike-success">33.3%</span>
                </div>
                <Progress value={33.3} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kontakt etablerad</span>
                  <span className="text-sm text-ike-warning">92.4%</span>
                </div>
                <Progress value={92.4} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Individuell uppföljning</CardTitle>
          <CardDescription>
            Lista över individer som omfattas av det kommunala aktivitetsansvaret
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                <Input
                  placeholder="Sök efter namn eller personnummer..."
                  className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
              <Button variant="outline" className="flex md:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Namn</TableHead>
                  <TableHead className="font-medium">Personnummer</TableHead>
                  <TableHead className="font-medium">Ålder</TableHead>
                  <TableHead className="font-medium">Kommun</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Senaste kontakt</TableHead>
                  <TableHead className="font-medium">Ansvarig</TableHead>
                  <TableHead className="font-medium text-center">Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {individuals.map((person) => (
                  <TableRow key={person.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell className="font-medium text-ike-neutral-dark">
                      {person.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {person.personalNumber}
                    </TableCell>
                    <TableCell>{person.age}</TableCell>
                    <TableCell>{person.municipality}</TableCell>
                    <TableCell>{getStatusBadge(person.status)}</TableCell>
                    <TableCell>{person.lastContact}</TableCell>
                    <TableCell>{person.responsible}</TableCell>
                    <TableCell className="text-center">
                      <Button size="sm" variant="ghost" className="text-ike-neutral hover:text-ike-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-center">
              <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                Visa fler
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Åtgärdsplaner</CardTitle>
          <CardDescription>
            Översikt över planerade och aktiva åtgärder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-ike-neutral-light">
                <h3 className="font-medium text-ike-neutral-dark mb-2">Studievägledning</h3>
                <div className="text-2xl font-bold text-ike-primary mb-1">42</div>
                <p className="text-sm text-ike-neutral">Aktiva åtgärder</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-ike-neutral-light">
                <h3 className="font-medium text-ike-neutral-dark mb-2">Praktikplats</h3>
                <div className="text-2xl font-bold text-ike-primary mb-1">35</div>
                <p className="text-sm text-ike-neutral">Aktiva åtgärder</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-ike-neutral-light">
                <h3 className="font-medium text-ike-neutral-dark mb-2">Introduktionsprogram</h3>
                <div className="text-2xl font-bold text-ike-primary mb-1">28</div>
                <p className="text-sm text-ike-neutral">Aktiva åtgärder</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-ike-neutral-dark mb-3">Resultat av åtgärder (senaste 12 månaderna)</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Återgång till studier</span>
                    <span className="text-sm text-ike-success">42 personer (33.3%)</span>
                  </div>
                  <Progress value={33.3} className="h-2 bg-gray-100">
                    <div className="h-full bg-ike-success" style={{ width: '33.3%' }} />
                  </Progress>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Påbörjat arbete</span>
                    <span className="text-sm text-ike-primary">18 personer (14.3%)</span>
                  </div>
                  <Progress value={14.3} className="h-2 bg-gray-100">
                    <div className="h-full bg-ike-primary" style={{ width: '14.3%' }} />
                  </Progress>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fortfarande i åtgärdsprogram</span>
                    <span className="text-sm text-ike-warning">63 personer (50%)</span>
                  </div>
                  <Progress value={50} className="h-2 bg-gray-100">
                    <div className="h-full bg-ike-warning" style={{ width: '50%' }} />
                  </Progress>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avbrutna åtgärder</span>
                    <span className="text-sm text-ike-error">3 personer (2.4%)</span>
                  </div>
                  <Progress value={2.4} className="h-2 bg-gray-100">
                    <div className="h-full bg-ike-error" style={{ width: '2.4%' }} />
                  </Progress>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowUpReports;
