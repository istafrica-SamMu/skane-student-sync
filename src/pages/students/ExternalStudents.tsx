
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
  ArrowUpDown, 
  Search, 
  Download, 
  MoreHorizontal,
  Eye,
  Calculator,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const ExternalStudents = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalityFilter, setMunicipalityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for external students (municipal residents attending other municipalities' schools)
  const externalStudents = [
    {
      id: 1,
      name: "Maria Johansson",
      personalNumber: "200403-5678",
      residenceMunicipality: "Malmö",
      schoolMunicipality: "Lund",
      school: "Katedralskolan",
      program: "Samhällsvetenskapsprogrammet",
      class: "SA22B",
      status: "active",
      ikeCost: 128000,
      paymentStatus: "paid"
    },
    {
      id: 2,
      name: "Carl Lindström",
      personalNumber: "200502-9012",
      residenceMunicipality: "Malmö",
      schoolMunicipality: "Helsingborg",
      school: "Nicolai Gymnasium",
      program: "Teknikprogrammet",
      class: "TE21C",
      status: "active",
      ikeCost: 135000,
      paymentStatus: "pending"
    },
    {
      id: 3,
      name: "Sara Olsson",
      personalNumber: "200504-1122",
      residenceMunicipality: "Malmö",
      schoolMunicipality: "Kristianstad",
      school: "Kristianstad Gymnasium",
      program: "Estetiska programmet",
      class: "ES22A",
      status: "active",
      ikeCost: 132000,
      paymentStatus: "paid"
    },
    {
      id: 4,
      name: "Peter Svensson",
      personalNumber: "200503-3344",
      residenceMunicipality: "Malmö",
      schoolMunicipality: "Lund",
      school: "Polhemskolan",
      program: "Teknikprogrammet",
      class: "TE21A",
      status: "transfer_pending",
      ikeCost: 136000,
      paymentStatus: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "transfer_pending":
        return <Badge className="bg-ike-warning text-white">Transfer Pending</Badge>;
      case "completed":
        return <Badge className="bg-ike-neutral text-white">Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-ike-success text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-ike-error text-white">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredStudents = externalStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.personalNumber.includes(searchTerm);
    const matchesMunicipality = municipalityFilter === "all" || student.schoolMunicipality === municipalityFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesMunicipality && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">External School Students</h1>
          <p className="text-ike-neutral mt-2">
            Municipal residents attending schools in other municipalities
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate IKE
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              External Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">342</div>
            <div className="text-xs text-ike-neutral">27.4% of total</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
            <div className="text-xs text-ike-neutral">6.7% of students</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Cost (Annual)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">45.2M</div>
            <div className="text-xs text-ike-neutral">SEK</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Agreements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral">Municipalities</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name or personal number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="School Municipality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Municipalities</SelectItem>
                <SelectItem value="Lund">Lund</SelectItem>
                <SelectItem value="Helsingborg">Helsingborg</SelectItem>
                <SelectItem value="Kristianstad">Kristianstad</SelectItem>
                <SelectItem value="Landskrona">Landskrona</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="transfer_pending">Transfer Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
            External Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Municipal residents attending schools in other municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Personal Number</TableHead>
                <TableHead className="font-medium">School Municipality</TableHead>
                <TableHead className="font-medium">School</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Payment</TableHead>
                <TableHead className="font-medium text-right">IKE Cost</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
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
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-ike-neutral" />
                      {student.schoolMunicipality}
                    </div>
                  </TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{getPaymentBadge(student.paymentStatus)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {student.ikeCost.toLocaleString('sv-SE')}
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calculator className="mr-2 h-4 w-4" />
                          IKE Calculation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Transfer Request
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

export default ExternalStudents;
