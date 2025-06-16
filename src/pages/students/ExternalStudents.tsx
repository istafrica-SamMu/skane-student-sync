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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowUpDown, 
  Search, 
  Download, 
  MoreHorizontal,
  Eye,
  Calculator,
  MapPin,
  FileText,
  Calendar,
  User,
  Building,
  GraduationCap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExternalStudent {
  id: number;
  name: string;
  personalNumber: string;
  residenceMunicipality: string;
  schoolMunicipality: string;
  school: string;
  program: string;
  class: string;
  status: string;
  ikeCost: number;
  paymentStatus: string;
}

const ExternalStudents = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalityFilter, setMunicipalityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<ExternalStudent | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showIKECalculation, setShowIKECalculation] = useState(false);

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

  const handleViewDetails = (student: ExternalStudent) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleIKECalculation = (student: ExternalStudent) => {
    setSelectedStudent(student);
    setShowIKECalculation(true);
  };

  const handleExportReport = () => {
    console.log("Exporting external students report...");
  };

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
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={handleExportReport}
          >
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
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleIKECalculation(student)}>
                          <Calculator className="mr-2 h-4 w-4" />
                          IKE Calculation
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

      {/* Student Details Modal */}
      <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-ike-primary" />
              Student Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the external student
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Full Name</label>
                    <p className="text-ike-neutral-dark font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                    <p className="text-ike-neutral-dark font-mono">{selectedStudent.personalNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Residence Municipality</label>
                    <p className="text-ike-neutral-dark">{selectedStudent.residenceMunicipality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedStudent.status)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">School Municipality</label>
                    <p className="text-ike-neutral-dark">{selectedStudent.schoolMunicipality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">School</label>
                    <p className="text-ike-neutral-dark">{selectedStudent.school}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Program</label>
                    <p className="text-ike-neutral-dark">{selectedStudent.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Class</label>
                    <p className="text-ike-neutral-dark">{selectedStudent.class}</p>
                  </div>
                </div>
              </div>
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-ike-neutral-dark">Payment Information</h4>
                    <p className="text-sm text-ike-neutral">Current payment status and IKE cost</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">{getPaymentBadge(selectedStudent.paymentStatus)}</div>
                    <p className="text-lg font-bold text-ike-neutral-dark">
                      {selectedStudent.ikeCost.toLocaleString('sv-SE')} SEK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStudentDetails(false)}>
              Close
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IKE Calculation Modal */}
      <Dialog open={showIKECalculation} onOpenChange={setShowIKECalculation}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
              IKE Cost Calculation
            </DialogTitle>
            <DialogDescription>
              Detailed breakdown of Inter-municipal compensation costs
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">Student Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-ike-neutral">Name:</span>
                    <span className="ml-2 text-ike-neutral-dark font-medium">{selectedStudent.name}</span>
                  </div>
                  <div>
                    <span className="text-ike-neutral">Program:</span>
                    <span className="ml-2 text-ike-neutral-dark">{selectedStudent.program}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-ike-neutral-dark">Cost Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-ike-neutral">Base education cost</span>
                    <span className="font-medium text-ike-neutral-dark">95,000 SEK</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-ike-neutral">Program supplement</span>
                    <span className="font-medium text-ike-neutral-dark">25,000 SEK</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-ike-neutral">Administrative fee</span>
                    <span className="font-medium text-ike-neutral-dark">8,000 SEK</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-ike-neutral">Special needs adjustment</span>
                    <span className="font-medium text-ike-neutral-dark">8,000 SEK</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-ike-primary/10 px-4 rounded font-bold">
                    <span className="text-ike-primary">Total IKE Cost</span>
                    <span className="text-ike-primary text-lg">{selectedStudent.ikeCost.toLocaleString('sv-SE')} SEK</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Payment Schedule</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Annual cost paid in 10 monthly installments (Aug-May): {Math.round(selectedStudent.ikeCost / 10).toLocaleString('sv-SE')} SEK/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIKECalculation(false)}>
              Close
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Calculation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExternalStudents;
