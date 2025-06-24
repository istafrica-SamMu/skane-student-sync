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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  CreditCard, 
  Search, 
  Download, 
  MoreHorizontal,
  Edit,
  Eye,
  MapPin,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import EligibilityDecisionTools from "@/components/students/EligibilityDecisionTools";
import { TravelCardDocumentsViewManagement } from "@/components/students/TravelCardDocumentsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface TravelCardStudent {
  id: number;
  personalNumber: string;
  firstName: string;
  lastName: string;
  grade: string;
  schoolUnit: string;
  schoolUnitCode: string;
  schoolAddress: string;
  schoolPostalCode: string;
  schoolMunicipality: string;
  studentAddress: string;
  studentCO?: string;
  studentStreetAddress: string;
  studentCOAddress?: string;
  studentPostalCode: string;
  studentCity: string;
  eligibilityStatus: 'eligible' | 'not-eligible' | 'pending';
  lastUpdated: string;
}

const TravelCardDocuments = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<TravelCardStudent | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'firstName', label: 'First Name', visible: true },
    { key: 'lastName', label: 'Last Name', visible: true },
    { key: 'personalNumber', label: 'Personal Number', visible: true },
    { key: 'grade', label: 'Grade', visible: true },
    { key: 'schoolUnit', label: 'School Unit', visible: true },
    { key: 'studentAddress', label: 'Student Address', visible: true },
    { key: 'eligibilityStatus', label: 'Eligibility Status', visible: true },
    { key: 'lastUpdated', label: 'Last Updated', visible: true }
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  // View Management Handlers
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSavedViews([...savedViews, newView]);
    setCurrentView(newView);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setColumns(view.columns);
    setFilters(view.filters);
    toast({
      title: "View Loaded",
      description: `View "${view.name}" has been applied successfully.`,
    });
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
  };

  const handleColumnsChange = (newColumns: ViewColumn[]) => {
    setColumns(newColumns);
  };

  const handleFiltersChange = (newFilters: ViewFilter[]) => {
    setFilters(newFilters);
  };

  // Mock data for travel card students
  const travelCardStudents: TravelCardStudent[] = [
    {
      id: 1,
      personalNumber: "200501-1234",
      firstName: "Erik",
      lastName: "Andersson",
      grade: "9",
      schoolUnit: "Malmö Centrum Grundskola",
      schoolUnitCode: "MAL001",
      schoolAddress: "Storgatan 15",
      schoolPostalCode: "211 34",
      schoolMunicipality: "Malmö",
      studentAddress: "Smågatätan 12",
      studentStreetAddress: "Smågatätan 12",
      studentPostalCode: "213 45",
      studentCity: "Malmö",
      eligibilityStatus: "eligible",
      lastUpdated: "2024-12-17"
    },
    {
      id: 2,
      personalNumber: "200502-5678",
      firstName: "Anna",
      lastName: "Petersson",
      grade: "7",
      schoolUnit: "Rosengård Skola",
      schoolUnitCode: "MAL002",
      schoolAddress: "Rosengård Centrum 8",
      schoolPostalCode: "213 45",
      schoolMunicipality: "Malmö",
      studentAddress: "c/o Petersson, Rosenvägen 23",
      studentCO: "Petersson",
      studentStreetAddress: "Rosenvägen 23",
      studentCOAddress: "c/o Petersson",
      studentPostalCode: "214 56",
      studentCity: "Malmö",
      eligibilityStatus: "pending",
      lastUpdated: "2024-12-17"
    },
    {
      id: 3,
      personalNumber: "200503-9012",
      firstName: "Johan",
      lastName: "Nilsson",
      grade: "1",
      schoolUnit: "Västra Skolan",
      schoolUnitCode: "MAL003",
      schoolAddress: "Västergatan 45",
      schoolPostalCode: "212 23",
      schoolMunicipality: "Malmö",
      studentAddress: "Norra Vägen 8",
      studentStreetAddress: "Norra Vägen 8",
      studentPostalCode: "215 67",
      studentCity: "Malmö",
      eligibilityStatus: "not-eligible",
      lastUpdated: "2024-12-17"
    }
  ];

  const getEligibilityBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return <Badge className="bg-ike-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Eligible</Badge>;
      case "not-eligible":
        return <Badge className="bg-ike-error text-white"><XCircle className="w-3 h-3 mr-1" />Not Eligible</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredStudents = travelCardStudents.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.personalNumber.includes(searchTerm);
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    const matchesEligibility = eligibilityFilter === "all" || student.eligibilityStatus === eligibilityFilter;
    
    // Apply view filters
    const matchesViewFilters = filters.every(filter => {
      const fieldValue = (student as any)[filter.field]?.toString().toLowerCase() || '';
      const filterValue = filter.value.toString().toLowerCase();
      
      switch (filter.operator) {
        case 'equals':
          return fieldValue === filterValue;
        case 'contains':
          return fieldValue.includes(filterValue);
        case 'startsWith':
          return fieldValue.startsWith(filterValue);
        case 'endsWith':
          return fieldValue.endsWith(filterValue);
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesGrade && matchesEligibility && matchesViewFilters;
  });

  const handleViewDetails = (student: TravelCardStudent) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleCloseDetails = () => {
    setShowStudentDetails(false);
    setSelectedStudent(null);
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Export Successful",
        description: `Travel card documentation exported successfully. ${filteredStudents.length} students included.`,
      });
      
      console.log("Exporting travel card documents...", {
        totalStudents: filteredStudents.length,
        filters: { gradeFilter, eligibilityFilter, searchTerm }
      });
      
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export the travel card documentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleEditEligibility = (student: TravelCardStudent) => {
    console.log("Edit eligibility for student:", student.id);
    toast({
      title: "Edit Eligibility",
      description: `Editing eligibility for ${student.firstName} ${student.lastName}`,
    });
  };

  const handleGenerateDocumentation = () => {
    if (selectedStudent) {
      console.log("Generate documentation for student:", selectedStudent.id);
      toast({
        title: "Documentation Generated",
        description: `Travel card documentation generated for ${selectedStudent.firstName} ${selectedStudent.lastName}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Travel Card Documents</h1>
          <p className="text-ike-neutral mt-2">
            Manage travel card eligibility and documentation for municipal students
          </p>
        </div>
        <div className="flex space-x-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Documentation
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
                  <Download className="w-5 h-5 mr-2 text-ike-primary" />
                  Export Travel Card Documentation
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will export travel card documentation for {filteredStudents.length} students 
                  based on your current filters.
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
                    <span>Grade Filter:</span>
                    <span className="font-medium">{gradeFilter === "all" ? "All" : `Grade ${gradeFilter}`}</span>
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
                      Export Documentation
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Statistics Cards - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1,247</div>
            <div className="text-xs text-ike-neutral">Registered for travel cards</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Eligible Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">892</div>
            <div className="text-xs text-ike-neutral">71.5% of total</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">234</div>
            <div className="text-xs text-ike-neutral">18.8% of total</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Not Eligible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">121</div>
            <div className="text-xs text-ike-neutral">9.7% of total</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Eligibility Decision Tools */}
      <EligibilityDecisionTools />

      {/* View Management */}
      <TravelCardDocumentsViewManagement
        views={savedViews}
        currentView={currentView}
        onSaveView={handleSaveView}
        onLoadView={handleLoadView}
        onDeleteView={handleDeleteView}
        columns={columns}
        filters={filters}
        onColumnsChange={handleColumnsChange}
        onFiltersChange={handleFiltersChange}
      />

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
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="1">Grade 1</SelectItem>
                <SelectItem value="2">Grade 2</SelectItem>
                <SelectItem value="3">Grade 3</SelectItem>
                <SelectItem value="4">Grade 4</SelectItem>
                <SelectItem value="5">Grade 5</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
              </SelectContent>
            </Select>
            <Select value={eligibilityFilter} onValueChange={setEligibilityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Eligibility Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <CreditCard className="w-5 h-5 mr-2 text-ike-primary" />
            Travel Card Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Students eligible for travel card allocation and documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.filter(col => col.visible).map((column) => (
                  <TableHead key={column.key} className="font-medium">
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-ike-neutral-light/50">
                  {columns.filter(col => col.visible).map((column) => (
                    <TableCell key={column.key}>
                      {column.key === 'firstName' && (
                        <span className="font-medium text-ike-neutral-dark">
                          {student.firstName}
                        </span>
                      )}
                      {column.key === 'lastName' && (
                        <span className="font-medium text-ike-neutral-dark">
                          {student.lastName}
                        </span>
                      )}
                      {column.key === 'personalNumber' && (
                        <span className="font-mono text-sm">
                          {student.personalNumber}
                        </span>
                      )}
                      {column.key === 'grade' && student.grade}
                      {column.key === 'schoolUnit' && (
                        <div>
                          <div className="font-medium">{student.schoolUnit}</div>
                          <div className="text-sm text-ike-neutral">{student.schoolUnitCode}</div>
                        </div>
                      )}
                      {column.key === 'studentAddress' && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-ike-neutral" />
                          <div>
                            <div className="text-sm">{student.studentStreetAddress}</div>
                            <div className="text-xs text-ike-neutral">{student.studentPostalCode} {student.studentCity}</div>
                          </div>
                        </div>
                      )}
                      {column.key === 'eligibilityStatus' && getEligibilityBadge(student.eligibilityStatus)}
                      {column.key === 'lastUpdated' && (
                        <span className="text-sm text-ike-neutral">
                          {student.lastUpdated}
                        </span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem 
                          onClick={() => handleViewDetails(student)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEditEligibility(student)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Eligibility
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-ike-primary" />
              Travel Card Student Details
            </DialogTitle>
            <DialogDescription>
              Complete information required for travel card allocation
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Student Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Name:</span>
                        <span className="text-sm font-medium text-ike-neutral-dark">{selectedStudent.firstName} {selectedStudent.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Personal Number:</span>
                        <span className="text-sm font-mono text-ike-neutral-dark">{selectedStudent.personalNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Grade:</span>
                        <span className="text-sm font-medium text-ike-neutral-dark">{selectedStudent.grade}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Student Address</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Street Address:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.studentStreetAddress}</span>
                      </div>
                      {selectedStudent.studentCO && (
                        <div className="flex justify-between">
                          <span className="text-sm text-ike-neutral">C/O:</span>
                          <span className="text-sm text-ike-neutral-dark">{selectedStudent.studentCO}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Postal Code:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.studentPostalCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">City:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.studentCity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">School Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">School Unit:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.schoolUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">School Code:</span>
                        <span className="text-sm font-mono text-ike-neutral-dark">{selectedStudent.schoolUnitCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">School Address:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.schoolAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">School Postal Code:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.schoolPostalCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-ike-neutral">Municipality:</span>
                        <span className="text-sm text-ike-neutral-dark">{selectedStudent.schoolMunicipality}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-ike-neutral-light p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-ike-neutral-dark">Travel Card Eligibility</h4>
                    <p className="text-sm text-ike-neutral">Current eligibility status and last update</p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">{getEligibilityBadge(selectedStudent.eligibilityStatus)}</div>
                    <p className="text-sm text-ike-neutral">
                      Last updated: {selectedStudent.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDetails}>
              Close
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleGenerateDocumentation}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Card Documentation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TravelCardDocuments;
