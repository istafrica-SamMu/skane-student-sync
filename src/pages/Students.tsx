import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Search, 
  Filter,
  GraduationCap,
  MapPin,
  Calendar,
  Eye,
  UserCheck,
  Edit,
  MoreHorizontal,
  User,
  School,
  FileText,
  Users2,
  ClockIcon,
  Building
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtectedDataDisplay from "@/components/students/ProtectedDataDisplay";
import PrivacyIndicator from "@/components/students/PrivacyIndicator";
import BulkStudyPathChange from "@/components/students/BulkStudyPathChange";
import BulkSchoolUnitTransfer from "@/components/students/BulkSchoolUnitTransfer";
import { privacyService } from "@/services/privacyService";
import { useToast } from "@/hooks/use-toast";
import { StudentsViewManagement } from "@/components/students/StudentsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

const Students = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkStudyPathChange, setShowBulkStudyPathChange] = useState(false);
  const [showBulkSchoolUnitTransfer, setShowBulkSchoolUnitTransfer] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Form state for add student
  const [addStudentForm, setAddStudentForm] = useState({
    firstName: "",
    lastName: "",
    personalNumber: "",
    birthDate: "",
    homeMunicipality: "",
    studyPath: "",
    schoolYear: "",
    schoolUnit: "",
    studyPathStartDate: "",
    studyPathEndDate: "",
    studentEndDate: ""
  });

  // Form state for edit student
  const [editStudentForm, setEditStudentForm] = useState({
    firstName: "",
    lastName: "",
    personalNumber: "",
    birthDate: "",
    homeMunicipality: "",
    studyPath: "",
    schoolYear: "",
    schoolUnit: "",
    studyPathStartDate: "",
    studyPathEndDate: "",
    studentEndDate: ""
  });

  // Dropdown options
  const municipalities = [
    "Stockholm", "Göteborg", "Malmö", "Uppsala", "Linköping", "Västerås", 
    "Örebro", "Norrköping", "Helsingborg", "Jönköping", "Lund", "Umeå",
    "Gävle", "Borås", "Eskilstuna", "Södertälje", "Karlstad", "Täby"
  ];

  const studyPaths = [
    "Naturvetenskap", "Samhällsvetenskap", "Ekonomi", "Teknik", "Estetik", 
    "Hantverksprogrammet", "Vård och omsorg", "Barn- och fritidsprogrammet",
    "El- och energiprogrammet", "Fordon- och transportprogrammet"
  ];

  const schoolYears = ["1", "2", "3"];

  const schoolUnits = [
    "Stockholm Gymnasium", "Göteborg Tekniska", "Malmö Gymnasium", 
    "Uppsala Naturvetenskap", "Linköping Teknik", "Västerås Gymnasium",
    "Örebro Samhälle", "Norrköping Estetik", "Helsingborg Ekonomi",
    "Jönköping Gymnasium", "Lund Gymnasium", "Umeå Teknik"
  ];

  // Mock student data including some protected students
  const allStudents = [
    {
      id: 1,
      firstName: "Anna",
      lastName: "Johansson",
      birthDate: "2006-03-15",
      personalNumber: "200603-1234",
      homeMunicipality: "Stockholm",
      studyPath: "Naturvetenskap",
      schoolYear: "2",
      schoolUnit: "Stockholm Gymnasium",
      status: "active",
      studyPathStartDate: "2023-08-15",
      studyPathEndDate: "",
      studentEndDate: ""
    },
    {
      id: 2, // This is a protected student (matches privacyService data)
      firstName: "Fatima",
      lastName: "Al-Rashid", 
      birthDate: "2007-11-28",
      personalNumber: "200711-2345",
      homeMunicipality: "Malmö",
      studyPath: "Samhällsvetenskap",
      schoolYear: "2",
      schoolUnit: "Malmö Gymnasium",
      status: "active",
      studyPathStartDate: "2023-08-15",
      studyPathEndDate: "",
      studentEndDate: ""
    },
    {
      id: 3,
      firstName: "Erik",
      lastName: "Lindqvist",
      birthDate: "2005-08-22",
      personalNumber: "200508-3456",
      homeMunicipality: "Göteborg",
      studyPath: "Teknik",
      schoolYear: "3",
      schoolUnit: "Göteborg Tekniska",
      status: "active",
      studyPathStartDate: "2022-08-15",
      studyPathEndDate: "",
      studentEndDate: ""
    },
    {
      id: 4,
      firstName: "Sofia",
      lastName: "Andersson",
      birthDate: "2006-12-10",
      personalNumber: "200612-4567",
      homeMunicipality: "Lund",
      studyPath: "Ekonomi",
      schoolYear: "1",
      schoolUnit: "Lund Gymnasium",
      status: "active",
      studyPathStartDate: "2024-08-15",
      studyPathEndDate: "",
      studentEndDate: ""
    },
    {
      id: 5, // This is a protected student (matches privacyService data)
      firstName: "Maria",
      lastName: "Svensson",
      birthDate: "2007-12-03",
      personalNumber: "200712-0345",
      homeMunicipality: "Ystad",
      studyPath: "Ekonomi",
      schoolYear: "2",
      schoolUnit: "Ystad Gymnasium",
      status: "active",
      studyPathStartDate: "2023-08-15",
      studyPathEndDate: "",
      studentEndDate: ""
    }
  ];

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: '1',
      name: 'Default Students View',
      description: 'Standard view showing all student data',
      columns: [
        { key: 'name', label: 'Name', visible: true },
        { key: 'personalNumber', label: 'Personal Number', visible: true },
        { key: 'birthDate', label: 'Birth Date', visible: true },
        { key: 'homeMunicipality', label: 'Home Municipality', visible: true },
        { key: 'studyPath', label: 'Study Path', visible: true },
        { key: 'schoolYear', label: 'Year', visible: true },
        { key: 'schoolUnit', label: 'School Unit', visible: true },
        { key: 'status', label: 'Status', visible: true }
      ],
      filters: [],
      isDefault: true,
      isSystemView: true,
      createdBy: 'system',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [currentColumns, setCurrentColumns] = useState<ViewColumn[]>([
    { key: 'name', label: 'Name', visible: true },
    { key: 'personalNumber', label: 'Personal Number', visible: true },
    { key: 'birthDate', label: 'Birth Date', visible: true },
    { key: 'homeMunicipality', label: 'Home Municipality', visible: true },
    { key: 'studyPath', label: 'Study Path', visible: true },
    { key: 'schoolYear', label: 'Year', visible: true },
    { key: 'schoolUnit', label: 'School Unit', visible: true },
    { key: 'status', label: 'Status', visible: true }
  ]);

  const [currentFilters, setCurrentFilters] = useState<ViewFilter[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>(savedViews[0]);

  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setCurrentColumns(view.columns);
    setCurrentFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(savedViews[0]);
    }
  };

  // Apply filters to students
  const applyFilters = (students: any[]) => {
    return students.filter(student => {
      return currentFilters.every(filter => {
        let value: string;
        
        // Handle different field mappings
        switch (filter.field) {
          case 'name':
            value = `${student.firstName} ${student.lastName}`;
            break;
          case 'personalNumber':
            value = student.personalNumber;
            break;
          case 'birthDate':
            value = student.birthDate;
            break;
          case 'homeMunicipality':
            value = student.homeMunicipality;
            break;
          case 'studyPath':
            value = student.studyPath;
            break;
          case 'schoolYear':
            value = student.schoolYear;
            break;
          case 'schoolUnit':
            value = student.schoolUnit;
            break;
          case 'status':
            value = student.status;
            break;
          default:
            return true;
        }
        
        const filterValue = filter.value as string;
        
        if (!value) return false;
        
        switch (filter.operator) {
          case 'equals':
            return value.toString().toLowerCase() === filterValue.toLowerCase();
          case 'contains':
            return value.toString().toLowerCase().includes(filterValue.toLowerCase());
          case 'startsWith':
            return value.toString().toLowerCase().startsWith(filterValue.toLowerCase());
          case 'endsWith':
            return value.toString().toLowerCase().endsWith(filterValue.toLowerCase());
          default:
            return true;
        }
      });
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    // Initialize edit form with selected student data
    setEditStudentForm({
      firstName: student.firstName,
      lastName: student.lastName,
      personalNumber: student.personalNumber,
      birthDate: student.birthDate,
      homeMunicipality: student.homeMunicipality,
      studyPath: student.studyPath,
      schoolYear: student.schoolYear,
      schoolUnit: student.schoolUnit,
      studyPathStartDate: student.studyPathStartDate || "",
      studyPathEndDate: student.studyPathEndDate || "",
      studentEndDate: student.studentEndDate || ""
    });
    setShowEditStudent(true);
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete) {
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.firstName} ${studentToDelete.lastName} has been removed from the system.`,
      });
      console.log('Deleting student:', studentToDelete.id);
    }
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  const handleAddStudent = () => {
    if (!addStudentForm.firstName || !addStudentForm.lastName || !addStudentForm.personalNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Student Added",
      description: "New student has been successfully added to the system.",
    });
    console.log('Adding student:', addStudentForm);
    
    // Reset form
    setAddStudentForm({
      firstName: "",
      lastName: "",
      personalNumber: "",
      birthDate: "",
      homeMunicipality: "",
      studyPath: "",
      schoolYear: "",
      schoolUnit: "",
      studyPathStartDate: "",
      studyPathEndDate: "",
      studentEndDate: ""
    });
    setShowAddStudent(false);
  };

  const handleUpdateStudent = () => {
    if (selectedStudent) {
      toast({
        title: "Student Updated",
        description: `${editStudentForm.firstName} ${editStudentForm.lastName} information has been updated.`,
      });
      console.log('Updating student:', selectedStudent.id, editStudentForm);
    }
    setShowEditStudent(false);
    setSelectedStudent(null);
    // Reset edit form
    setEditStudentForm({
      firstName: "",
      lastName: "",
      personalNumber: "",
      birthDate: "",
      homeMunicipality: "",
      studyPath: "",
      schoolYear: "",
      schoolUnit: "",
      studyPathStartDate: "",
      studyPathEndDate: "",
      studentEndDate: ""
    });
  };

  const visibleColumns = currentColumns.filter(col => col.visible);

  const filteredStudents = applyFilters(
    allStudents.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.personalNumber.includes(searchTerm)
    )
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Students</h1>
          <p className="text-ike-neutral mt-2">
            Manage all students in the system
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="outline"
            className="border-ike-success text-ike-success hover:bg-ike-success/10"
            onClick={() => setShowBulkStudyPathChange(true)}
          >
            <Users2 className="w-4 h-4 mr-2" />
            Bulk Study Path Change
          </Button>
          <Button 
            variant="outline"
            className="border-ike-warning text-ike-warning hover:bg-ike-warning/10"
            onClick={() => setShowBulkSchoolUnitTransfer(true)}
          >
            <Building className="w-4 h-4 mr-2" />
            School Unit Transfer
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setShowAddStudent(true)}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{allStudents.length}</div>
            <p className="text-xs text-ike-neutral">Registered students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{allStudents.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-ike-neutral">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Protected Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{allStudents.filter(s => privacyService.isStudentProtected(s.id)).length}</div>
            <p className="text-xs text-ike-neutral">Privacy protected</p>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <StudentsViewManagement
        views={savedViews}
        currentView={currentView}
        onSaveView={handleSaveView}
        onLoadView={handleLoadView}
        onDeleteView={handleDeleteView}
        columns={currentColumns}
        filters={currentFilters}
        onColumnsChange={setCurrentColumns}
        onFiltersChange={setCurrentFilters}
      />

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Search className="w-5 h-5 mr-2 text-ike-primary" />
            Search Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or personal number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            All Students
          </CardTitle>
          <CardDescription>Complete list of students in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const isProtected = privacyService.isStudentProtected(student.id);
                const privacyMark = privacyService.getPrivacyMark(student.id);
                
                return (
                  <TableRow key={student.id}>
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === 'name' && (
                          <div className="font-medium">
                            <div className="flex items-center gap-2">
                              {isProtected ? (
                                <ProtectedDataDisplay 
                                  studentId={student.id}
                                  field="displayName"
                                  fallbackValue={`${student.firstName} ${student.lastName}`}
                                  userRole="principal"
                                  showPrivacyIndicator={true}
                                />
                              ) : (
                                <span>{student.firstName} {student.lastName}</span>
                              )}
                            </div>
                          </div>
                        )}
                        {column.key === 'personalNumber' && (
                          <div className="font-mono">
                            {isProtected ? (
                              <ProtectedDataDisplay 
                                studentId={student.id}
                                field="personalNumber"
                                fallbackValue={student.personalNumber}
                                userRole="principal"
                                showPrivacyIndicator={false}
                              />
                            ) : (
                              student.personalNumber
                            )}
                          </div>
                        )}
                        {column.key === 'birthDate' && (
                          <div>
                            {isProtected ? (
                              <ProtectedDataDisplay 
                                studentId={student.id}
                                field="birthDate"
                                fallbackValue={student.birthDate}
                                userRole="principal"
                                showPrivacyIndicator={false}
                              />
                            ) : (
                              student.birthDate
                            )}
                          </div>
                        )}
                        {column.key === 'homeMunicipality' && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-ike-neutral" />
                            <span>{student.homeMunicipality}</span>
                          </div>
                        )}
                        {column.key === 'studyPath' && (
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                            <span>{student.studyPath}</span>
                          </div>
                        )}
                        {column.key === 'schoolYear' && student.schoolYear}
                        {column.key === 'schoolUnit' && student.schoolUnit}
                        {column.key === 'status' && (
                          <div className="flex items-center gap-2">
                            {getStatusBadge(student.status)}
                            {isProtected && privacyMark && (
                              <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
                            )}
                          </div>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                          <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteStudent(student)}
                            className="text-ike-error focus:text-ike-error"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
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
              Complete information for the selected student
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Full Name</label>
                  <p className="text-ike-neutral-dark font-medium">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                  <p className="text-ike-neutral-dark font-mono">{selectedStudent.personalNumber}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Birth Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.birthDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.homeMunicipality}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studyPath}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">School Year</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.schoolYear}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.schoolUnit}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  {getStatusBadge(selectedStudent.status)}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Study Path Start Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studyPathStartDate || "Not set"}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Study Path End Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studyPathEndDate || "Not set"}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Student End Date</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studentEndDate || "Active"}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStudentDetails(false)}>
              Close
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={() => {
                setShowStudentDetails(false);
                handleEditStudent(selectedStudent);
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Modal */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <UserCheck className="w-5 h-5 mr-2 text-ike-primary" />
              Add New Student
            </DialogTitle>
            <DialogDescription>
              Enter the student information to add them to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ike-neutral">First Name</label>
                <Input 
                  placeholder="Enter first name" 
                  value={addStudentForm.firstName}
                  onChange={(e) => setAddStudentForm({...addStudentForm, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Last Name</label>
                <Input 
                  placeholder="Enter last name" 
                  value={addStudentForm.lastName}
                  onChange={(e) => setAddStudentForm({...addStudentForm, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                <Input 
                  placeholder="YYYYMMDD-XXXX" 
                  value={addStudentForm.personalNumber}
                  onChange={(e) => setAddStudentForm({...addStudentForm, personalNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Birth Date</label>
                <Input 
                  type="date" 
                  value={addStudentForm.birthDate}
                  onChange={(e) => setAddStudentForm({...addStudentForm, birthDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                <Select 
                  value={addStudentForm.homeMunicipality} 
                  onValueChange={(value) => setAddStudentForm({...addStudentForm, homeMunicipality: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                <Select 
                  value={addStudentForm.studyPath} 
                  onValueChange={(value) => setAddStudentForm({...addStudentForm, studyPath: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select study path" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyPaths.map((path) => (
                      <SelectItem key={path} value={path}>
                        {path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Year</label>
                <Select 
                  value={addStudentForm.schoolYear} 
                  onValueChange={(value) => setAddStudentForm({...addStudentForm, schoolYear: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select school year" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                <Select 
                  value={addStudentForm.schoolUnit} 
                  onValueChange={(value) => setAddStudentForm({...addStudentForm, schoolUnit: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select school unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Date Fields Section */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-ike-neutral-dark mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-ike-primary" />
                Date Information
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path Start Date</label>
                  <Input 
                    type="date" 
                    value={addStudentForm.studyPathStartDate}
                    onChange={(e) => setAddStudentForm({...addStudentForm, studyPathStartDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path End Date</label>
                  <Input 
                    type="date" 
                    value={addStudentForm.studyPathEndDate}
                    onChange={(e) => setAddStudentForm({...addStudentForm, studyPathEndDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Student End Date</label>
                  <Input 
                    type="date" 
                    value={addStudentForm.studentEndDate}
                    onChange={(e) => setAddStudentForm({...addStudentForm, studentEndDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudent(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleAddStudent}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Modal */}
      <Dialog open={showEditStudent} onOpenChange={setShowEditStudent}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Edit className="w-5 h-5 mr-2 text-ike-primary" />
              Edit Student
            </DialogTitle>
            <DialogDescription>
              Update student information including dates
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ike-neutral">First Name</label>
                <Input 
                  value={editStudentForm.firstName}
                  onChange={(e) => setEditStudentForm({...editStudentForm, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Last Name</label>
                <Input 
                  value={editStudentForm.lastName}
                  onChange={(e) => setEditStudentForm({...editStudentForm, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                <Input 
                  value={editStudentForm.personalNumber}
                  onChange={(e) => setEditStudentForm({...editStudentForm, personalNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Birth Date</label>
                <Input 
                  type="date" 
                  value={editStudentForm.birthDate}
                  onChange={(e) => setEditStudentForm({...editStudentForm, birthDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                <Select 
                  value={editStudentForm.homeMunicipality} 
                  onValueChange={(value) => setEditStudentForm({...editStudentForm, homeMunicipality: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                <Select 
                  value={editStudentForm.studyPath} 
                  onValueChange={(value) => setEditStudentForm({...editStudentForm, studyPath: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select study path" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyPaths.map((path) => (
                      <SelectItem key={path} value={path}>
                        {path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Year</label>
                <Select 
                  value={editStudentForm.schoolYear} 
                  onValueChange={(value) => setEditStudentForm({...editStudentForm, schoolYear: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select school year" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                <Select 
                  value={editStudentForm.schoolUnit} 
                  onValueChange={(value) => setEditStudentForm({...editStudentForm, schoolUnit: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select school unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Date Fields Section */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-ike-neutral-dark mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-ike-primary" />
                Date Management
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path Start Date</label>
                  <Input 
                    type="date" 
                    value={editStudentForm.studyPathStartDate}
                    onChange={(e) => setEditStudentForm({...editStudentForm, studyPathStartDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path End Date</label>
                  <Input 
                    type="date" 
                    value={editStudentForm.studyPathEndDate}
                    onChange={(e) => setEditStudentForm({...editStudentForm, studyPathEndDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Student End Date</label>
                  <Input 
                    type="date" 
                    value={editStudentForm.studentEndDate}
                    onChange={(e) => setEditStudentForm({...editStudentForm, studentEndDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditStudent(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              onClick={handleUpdateStudent}
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-error">
              <User className="w-5 h-5 mr-2" />
              Remove Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{studentToDelete?.firstName} {studentToDelete?.lastName}</strong> from the system? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteStudent}
              className="bg-ike-error hover:bg-ike-error/90"
            >
              Remove Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Study Path Change Modal */}
      <BulkStudyPathChange
        students={allStudents}
        isOpen={showBulkStudyPathChange}
        onClose={() => setShowBulkStudyPathChange(false)}
      />

      {/* Bulk School Unit Transfer Modal */}
      <BulkSchoolUnitTransfer
        students={allStudents}
        isOpen={showBulkSchoolUnitTransfer}
        onClose={() => setShowBulkSchoolUnitTransfer(false)}
      />
    </div>
  );
};

export default Students;
