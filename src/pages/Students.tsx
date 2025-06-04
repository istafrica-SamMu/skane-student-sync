
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreHorizontal,
  Edit,
  ArrowUpDown,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [municipalityFilter, setMunicipalityFilter] = useState("all");

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Erik Andersson",
      personalNumber: "200501-1234",
      municipality: "Malmö",
      school: "Malmö Gymnasium",
      program: "Naturvetenskapsprogrammet",
      class: "NA21A",
      status: "active",
      startDate: "2024-08-15",
      amount: 125000
    },
    {
      id: 2,
      name: "Maria Johansson",
      personalNumber: "200403-5678",
      municipality: "Lund",
      school: "Katedralskolan",
      program: "Samhällsvetenskapsprogrammet",
      class: "SA22B",
      status: "conflict",
      startDate: "2023-08-15",
      amount: 128000
    },
    {
      id: 3,
      name: "Carl Lindström",
      personalNumber: "200502-9012",
      municipality: "Helsingborg",
      school: "Nicolai Gymnasium",
      program: "Teknikprogrammet",
      class: "TE21C",
      status: "active",
      startDate: "2024-08-15",
      amount: 135000
    },
    {
      id: 4,
      name: "Anna Petersson",
      personalNumber: "200406-3456",
      municipality: "Kristianstad",
      school: "Kristianstad Gymnasium",
      program: "Ekonomiprogrammet",
      class: "EK22A",
      status: "pending",
      startDate: "2024-11-01",
      amount: 122000
    },
    {
      id: 5,
      name: "Johan Nilsson",
      personalNumber: "200501-7890",
      municipality: "Malmö",
      school: "Jensen Gymnasium",
      program: "Estetiska programmet",
      class: "ES21B",
      status: "active",
      startDate: "2024-08-15",
      amount: 130000
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Aktiv</Badge>;
      case "conflict":
        return <Badge className="bg-ike-error text-white">Konflikt</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Väntande</Badge>;
      default:
        return <Badge variant="secondary">Okänd</Badge>;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.personalNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesMunicipality = municipalityFilter === "all" || student.municipality === municipalityFilter;
    
    return matchesSearch && matchesStatus && matchesMunicipality;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Studentregister</h1>
          <p className="text-ike-neutral mt-2">
            Hantera studentregistrering och placeringar
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Download className="w-4 h-4 mr-2" />
            Exportera
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Plus className="w-4 h-4 mr-2" />
            Ny Student
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Totala Studenter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1,247</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Interkommunala
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">342</div>
            <div className="text-xs text-ike-neutral">27.4%</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Väntande Överföringar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Nya denna månad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">89</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Sök och Filtrera</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Sök efter namn eller personnummer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla statusar</SelectItem>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="conflict">Konflikt</SelectItem>
                <SelectItem value="pending">Väntande</SelectItem>
              </SelectContent>
            </Select>
            <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kommun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla kommuner</SelectItem>
                <SelectItem value="Malmö">Malmö</SelectItem>
                <SelectItem value="Lund">Lund</SelectItem>
                <SelectItem value="Helsingborg">Helsingborg</SelectItem>
                <SelectItem value="Kristianstad">Kristianstad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Studenter ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Detaljerad lista över alla registrerade studenter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">
                  <Button variant="ghost" className="h-auto p-0 font-medium">
                    Namn
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium">Personnummer</TableHead>
                <TableHead className="font-medium">Kommun</TableHead>
                <TableHead className="font-medium">Skola</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Klass</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-right">Belopp (SEK)</TableHead>
                <TableHead className="font-medium text-center">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {student.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {student.personalNumber}
                  </TableCell>
                  <TableCell>{student.municipality}</TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {student.amount.toLocaleString('sv-SE')}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visa detaljer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Redigera
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Överför
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
