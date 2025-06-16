
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
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  School, 
  Search, 
  Download, 
  MoreHorizontal,
  Edit,
  Eye,
  MapPin,
  User,
  FileText,
  Calculator
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

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
  startDate: string;
  ikeCost: number;
  paymentStatus: string;
}

const MunicipalStudents = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<ExternalStudent | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Mock data for external students attending municipal schools
  const externalStudents = [
    {
      id: 1,
      name: "Erik Andersson",
      personalNumber: "200501-1234",
      residenceMunicipality: "Lund",
      schoolMunicipality: "Malmö",
      school: "Malmö Gymnasium",
      program: "Naturvetenskapsprogrammet",
      class: "NA21A",
      status: "active",
      startDate: "2024-08-15",
      ikeCost: 125000,
      paymentStatus: "paid"
    },
    {
      id: 2,
      name: "Anna Petersson",
      personalNumber: "200406-3456",
      residenceMunicipality: "Helsingborg",
      schoolMunicipality: "Malmö",
      school: "Malmö Gymnasium",
      program: "Ekonomiprogrammet",
      class: "EK22A",
      status: "active",
      startDate: "2023-08-15",
      ikeCost: 122000,
      paymentStatus: "paid"
    },
    {
      id: 3,
      name: "Johan Nilsson",
      personalNumber: "200501-7890",
      residenceMunicipality: "Kristianstad",
      schoolMunicipality: "Malmö",
      school: "Jensen Gymnasium",
      program: "Estetiska programmet",
      class: "ES21B",
      status: "active",
      startDate: "2024-08-15",
      ikeCost: 130000,
      paymentStatus: "pending"
    },
    {
      id: 4,
      name: "Lisa Karlsson",
      personalNumber: "200502-4567",
      residenceMunicipality: "Landskrona",
      schoolMunicipality: "Malmö",
      school: "Malmö Gymnasium",
      program: "Samhällsvetenskapsprogrammet",
      class: "SA21C",
      status: "pending",
      startDate: "2024-11-01",
      ikeCost: 128000,
      paymentStatus: "pending"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
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
    const matchesSchool = schoolFilter === "all" || student.school === schoolFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });

  const handleViewDetails = (student: ExternalStudent) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export Successful",
        description: `External students report has been exported successfully. ${filteredStudents.length} students included.`,
      });
      
      console.log("Exporting external students in municipal schools report...", {
        totalStudents: filteredStudents.length,
        filters: { schoolFilter, statusFilter, searchTerm }
      });
      
      setShowExportDialog(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">External Students in Municipal Schools</h1>
          <p className="text-ike-neutral mt-2">
            Students from other municipalities attending schools in your municipality
          </p>
        </div>
        <div className="flex space-x-3">
          <AlertDialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <Button 
              variant="outline" 
              className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              onClick={() => setShowExportDialog(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
                  <Download className="w-5 h-5 mr-2 text-ike-primary" />
                  Export External Students Report
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will export a comprehensive report of external students ({filteredStudents.length} students) 
                  attending municipal schools based on your current filters.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <h4 className="font-medium text-ike-neutral-dark mb-2">Export Details</h4>
                <div className="space-y-2 text-sm text-ike-neutral">
                  <div className="flex justify-between">
                    <span>Total Students:</span>
                    <span className="font-medium">{filteredStudents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>School Filter:</span>
                    <span className="font-medium">{schoolFilter === "all" ? "All" : schoolFilter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status Filter:</span>
                    <span className="font-medium">{statusFilter === "all" ? "All" : statusFilter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">Excel (.xlsx)</span>
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isExporting}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleExportReport}
                  disabled={isExporting}
                  className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
            <div className="text-2xl font-bold text-ike-neutral-dark">284</div>
            <div className="text-xs text-ike-neutral">22.8% of total</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">267</div>
            <div className="text-xs text-ike-neutral">94% of external</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Revenue (Annual)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">36.2M</div>
            <div className="text-xs text-ike-neutral">SEK from IKE</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Source Municipalities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-neutral">Active agreements</div>
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
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                <SelectItem value="Malmö Gymnasium">Malmö Gymnasium</SelectItem>
                <SelectItem value="Jensen Gymnasium">Jensen Gymnasium</SelectItem>
                <SelectItem value="Malmö Borgarskola">Malmö Borgarskola</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
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
            <School className="w-5 h-5 mr-2 text-ike-primary" />
            External Students in Municipal Schools ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Students from other municipalities attending schools in your municipality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Personal Number</TableHead>
                <TableHead className="font-medium">Home Municipality</TableHead>
                <TableHead className="font-medium">School</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Class</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Payment</TableHead>
                <TableHead className="font-medium text-right">IKE Revenue</TableHead>
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
                      {student.residenceMunicipality}
                    </div>
                  </TableCell>
                  <TableCell>{student.school}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.class}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Student
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
                    <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
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
                    <p className="text-sm text-ike-neutral">Current payment status and IKE revenue</p>
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
    </div>
  );
};

export default MunicipalStudents;
