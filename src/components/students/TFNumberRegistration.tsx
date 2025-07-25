import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  UserPlus,
  Search,
  Edit,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProtectedDataDisplay from "./ProtectedDataDisplay";
import PrivacyIndicator from "./PrivacyIndicator";
import { privacyService } from "@/services/privacyService";
import { TFRegistrationViewManagement } from "./TFRegistrationViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface TFStudent {
  id: number;
  tfNumber: string;
  originalTF: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  municipalCode: string;
  homeMunicipality: string;
  studyPath: string;
  schoolYear: string;
  schoolUnit: string;
  status: "active" | "needs_municipality" | "payment_blocked";
  needsHomeMunicipality: boolean;
  contactEmail?: string;
  startDate?: string;
  endDate?: string;
}

const TFNumberRegistration = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<TFStudent | null>(null);
  const [studentToConvert, setStudentToConvert] = useState<TFStudent | null>(null);

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'tfNumber', label: 'TF Number', visible: true },
    { key: 'firstName', label: 'First Name', visible: true },
    { key: 'lastName', label: 'Last Name', visible: true },
    { key: 'birthDate', label: 'Birth Date', visible: true },
    { key: 'municipalCode', label: 'Municipal Code', visible: true },
    { key: 'homeMunicipality', label: 'Home Municipality', visible: true },
    { key: 'studyPath', label: 'Study Path', visible: true },
    { key: 'status', label: 'Status', visible: true },
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    tfNumber: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    municipalCode: "",
    homeMunicipality: "",
    studyPath: "",
    schoolYear: "",
    schoolUnit: "",
    startDate: "",
    contactEmail: ""
  });

  // Mock data for TF number students with state management
  const [tfStudents, setTfStudents] = useState<TFStudent[]>([
    {
      id: 1,
      tfNumber: "TF240115001",
      originalTF: "TF123456",
      firstName: "Ahmed",
      lastName: "Hassan",
      birthDate: "2008-03-15",
      municipalCode: "SK01",
      homeMunicipality: "Assigned: Malmö",
      studyPath: "Naturvetenskap",
      schoolYear: "1",
      schoolUnit: "Malmö Gymnasium",
      status: "active",
      needsHomeMunicipality: false,
      contactEmail: "malmo.gym@education.se",
      startDate: "2024-08-15",
    },
    {
      id: 2,
      tfNumber: "TF240115002", 
      originalTF: "TF789012",
      firstName: "Fatima",
      lastName: "Al-Rashid",
      birthDate: "2007-11-28",
      municipalCode: "SK02",
      homeMunicipality: "Not Assigned",
      studyPath: "Samhällsvetenskap",
      schoolYear: "2",
      schoolUnit: "Lund Gymnasium",
      status: "needs_municipality",
      needsHomeMunicipality: true,
      contactEmail: "lund.gym@education.se",
      startDate: "2024-08-15",
    },
    {
      id: 3,
      tfNumber: "TF240115003",
      originalTF: "TF345678",
      firstName: "Erik",
      lastName: "Johansson",
      birthDate: "2008-05-10",
      municipalCode: "SK03",
      homeMunicipality: "Assigned: Helsingborg",
      studyPath: "Teknik",
      schoolYear: "1",
      schoolUnit: "Helsingborg Gymnasium",
      status: "payment_blocked",
      needsHomeMunicipality: false,
      contactEmail: "helsingborg.gym@education.se",
      startDate: "2024-08-15",
    },
    {
      id: 4,
      tfNumber: "TF240115003", // Same student, different school (dual placement)
      originalTF: "TF345678",
      firstName: "Erik",
      lastName: "Johansson",
      birthDate: "2008-05-10",
      municipalCode: "SK03",
      homeMunicipality: "Assigned: Helsingborg",
      studyPath: "Teknik",
      schoolYear: "1",
      schoolUnit: "Kristianstad Gymnasium",
      status: "payment_blocked",
      needsHomeMunicipality: false,
      contactEmail: "kristianstad.gym@education.se",
      startDate: "2024-09-01",
    },
    {
      id: 5,
      tfNumber: "TF240115004",
      originalTF: "TF456789",
      firstName: "Maria",
      lastName: "Svensson",
      birthDate: "2007-12-03",
      municipalCode: "SK04",
      homeMunicipality: "Assigned: Ystad",
      studyPath: "Ekonomi",
      schoolYear: "2",
      schoolUnit: "Ystad Gymnasium",
      status: "active",
      needsHomeMunicipality: false,
      contactEmail: "ystad.gym@education.se",
      startDate: "2024-08-15",
    }
  ]);

  const municipalities = [
    "Malmö", "Lund", "Helsingborg", "Kristianstad", "Landskrona",
    "Trelleborg", "Eslöv", "Ängelholm", "Hässleholm", "Ystad"
  ];

  const studyPaths = [
    "Naturvetenskap", "Samhällsvetenskap", "Ekonomi", "Teknik",
    "Estetik", "Hantverksprogrammet", "Vård och omsorg"
  ];

  // View Management Functions
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: `view-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setColumns(view.columns);
    setFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(v => v.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
  };

  const handleConvertTF = (student: TFStudent) => {
    setStudentToConvert(student);
  };

  const confirmConvertTF = () => {
    if (!studentToConvert) return;
    
    const newMunicipalCode = `SK${String(tfStudents.length + 1).padStart(2, '0')}`;
    
    // Update student state
    setTfStudents(prev => prev.map(s => 
      s.id === studentToConvert.id 
        ? { ...s, municipalCode: newMunicipalCode, status: "active" as const }
        : s
    ));
    
    toast({
      title: "TF Number Converted",
      description: `TF number converted to unique municipal code: ${newMunicipalCode}`,
    });
    
    setStudentToConvert(null);
  };

  const handleAssignMunicipality = (studentId: number, municipality: string) => {
    setTfStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { 
            ...s, 
            homeMunicipality: `Assigned: ${municipality}`, 
            needsHomeMunicipality: false,
            status: "active" as const
          }
        : s
    ));
    
    toast({
      title: "Municipality Assigned",
      description: `Home municipality "${municipality}" assigned successfully.`,
    });
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tfNumber || !formData.firstName || !formData.lastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate unique municipal code
    const municipalCode = `SK${String(tfStudents.length + 1).padStart(2, '0')}`;
    
    // Add new student to state
    const newStudent: TFStudent = {
      id: tfStudents.length + 1,
      tfNumber: formData.tfNumber,
      originalTF: formData.tfNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      municipalCode: municipalCode,
      homeMunicipality: formData.homeMunicipality ? `Assigned: ${formData.homeMunicipality}` : "Not Assigned",
      studyPath: formData.studyPath,
      schoolYear: formData.schoolYear,
      schoolUnit: formData.schoolUnit || "To be assigned",
      status: formData.homeMunicipality ? "active" : "needs_municipality",
      needsHomeMunicipality: !formData.homeMunicipality,
      contactEmail: formData.contactEmail || "contact@school.se",
      startDate: formData.startDate || "2024-08-15"
    };
    
    setTfStudents(prev => [...prev, newStudent]);
    
    toast({
      title: "Student Registered",
      description: `Student with TF number registered successfully. Municipal code: ${municipalCode}`,
    });
    
    // Reset form
    setFormData({
      tfNumber: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      municipalCode: "",
      homeMunicipality: "",
      studyPath: "",
      schoolYear: "",
      schoolUnit: "",
      startDate: "",
      contactEmail: ""
    });
    setShowRegistrationForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "needs_municipality":
        return <Badge variant="destructive">Needs Municipality</Badge>;
      case "payment_blocked":
        return <Badge className="bg-red-600 text-white">Payment Blocked</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  // Apply filters to students
  const applyFilters = (students: TFStudent[]) => {
    return students.filter(student => {
      return filters.every(filter => {
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
    });
  };

  const filteredStudents = applyFilters(
    tfStudents.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.tfNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-ike-neutral-dark truncate">TF Number Registration</h1>
            <p className="text-ike-neutral mt-2 text-sm sm:text-base">
              Manage students with temporary personal identity numbers (TF numbers)
            </p>
          </div>
          <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white whitespace-nowrap shrink-0">
                <UserPlus className="w-4 h-4 mr-2" />
                Register TF Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-ike-neutral-dark">Register TF Number Student</DialogTitle>
                <DialogDescription>Register a new student with temporary personal identity number</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitRegistration} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tfNumber" className="text-ike-neutral">TF Number *</Label>
                    <Input
                      id="tfNumber"
                      value={formData.tfNumber}
                      onChange={(e) => setFormData({...formData, tfNumber: e.target.value})}
                      placeholder="TF123456"
                      className="border-ike-primary/20 focus:border-ike-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="firstName" className="text-ike-neutral">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="border-ike-primary/20 focus:border-ike-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-ike-neutral">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="border-ike-primary/20 focus:border-ike-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate" className="text-ike-neutral">Birth Date *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      className="border-ike-primary/20 focus:border-ike-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeMunicipality" className="text-ike-neutral">Home Municipality</Label>
                    <Select value={formData.homeMunicipality} onValueChange={(value) => setFormData({...formData, homeMunicipality: value})}>
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
                    <Label htmlFor="studyPath" className="text-ike-neutral">Study Path *</Label>
                    <Select value={formData.studyPath} onValueChange={(value) => setFormData({...formData, studyPath: value})}>
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
                    <Label htmlFor="schoolYear" className="text-ike-neutral">School Year *</Label>
                    <Select value={formData.schoolYear} onValueChange={(value) => setFormData({...formData, schoolYear: value})}>
                      <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="startDate" className="text-ike-neutral">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="border-ike-primary/20 focus:border-ike-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="text-ike-neutral">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="border-ike-primary/20 focus:border-ike-primary"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowRegistrationForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                  >
                    Register Student
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* View Management Component */}
        <TFRegistrationViewManagement
          views={savedViews}
          currentView={currentView}
          onSaveView={handleSaveView}
          onLoadView={handleLoadView}
          onDeleteView={handleDeleteView}
          columns={columns}
          filters={filters}
          onColumnsChange={setColumns}
          onFiltersChange={setFilters}
        />

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Search className="w-5 h-5 mr-2 text-ike-primary" />
              Search TF Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <Input
                  placeholder="Search by name or TF number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-ike-primary/20 focus:border-ike-primary w-full"
                />
              </div>
              <Button variant="outline" className="whitespace-nowrap shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* TF Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">TF Number Students</CardTitle>
            <CardDescription>Students with temporary personal identity numbers</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    {visibleColumns.map((column) => (
                      <TableHead key={column.key} className="font-medium min-w-[120px]">
                        {column.label}
                      </TableHead>
                    ))}
                    <TableHead className="font-medium text-center min-w-[200px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const isProtected = privacyService.isStudentProtected(student.id);
                    const privacyMark = privacyService.getPrivacyMark(student.id);
                    
                    return (
                      <TableRow key={student.id}>
                        {visibleColumns.map((column) => (
                          <TableCell key={column.key} className={column.key === 'tfNumber' ? 'font-mono' : column.key === 'firstName' || column.key === 'lastName' ? 'font-medium' : ''}>
                            {(() => {
                              switch (column.key) {
                                case 'firstName':
                                case 'lastName':
                                  if (column.key === 'firstName') {
                                    return (
                                      <div className="flex items-center gap-2 min-w-0">
                                        {isProtected ? (
                                          <ProtectedDataDisplay 
                                            studentId={student.id}
                                            field="displayName"
                                            fallbackValue={`${student.firstName} ${student.lastName}`}
                                            userRole="principal"
                                            showPrivacyIndicator={true}
                                          />
                                        ) : (
                                          <span className="truncate max-w-[140px]">{student.firstName} {student.lastName}</span>
                                        )}
                                      </div>
                                    );
                                  }
                                  return null; // lastName is included in firstName display
                                case 'birthDate':
                                  return isProtected ? (
                                    <ProtectedDataDisplay 
                                      studentId={student.id}
                                      field="birthDate"
                                      fallbackValue={student.birthDate}
                                      userRole="principal"
                                      showPrivacyIndicator={false}
                                    />
                                  ) : (
                                    student.birthDate
                                  );
                                case 'homeMunicipality':
                                  return student.needsHomeMunicipality ? (
                                    <div className="flex items-center gap-2">
                                      <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                                      <span className="text-orange-600 truncate">Not Assigned</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                      <span className="truncate max-w-[160px]">{student.homeMunicipality}</span>
                                    </div>
                                  );
                                case 'status':
                                  return (
                                    <div className="flex items-center gap-2">
                                      {getStatusBadge(student.status)}
                                      {isProtected && privacyMark && (
                                        <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
                                      )}
                                    </div>
                                  );
                                case 'studyPath':
                                  return <span className="truncate max-w-[110px] block">{student.studyPath}</span>;
                                default:
                                  return (student as any)[column.key];
                              }
                            })()}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-1 justify-center flex-wrap">
                            {student.needsHomeMunicipality && (
                              <Select onValueChange={(value) => handleAssignMunicipality(student.id, value)}>
                                <SelectTrigger className="w-24 h-8 text-xs">
                                  <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent>
                                  {municipalities.map((municipality) => (
                                    <SelectItem key={municipality} value={municipality}>
                                      {municipality}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleConvertTF(student)}
                                  className="text-xs px-2 py-1"
                                >
                                  <RefreshCw className="w-3 h-3 mr-1" />
                                  Convert
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Convert TF Number</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to convert TF number "{studentToConvert?.tfNumber}" to a unique municipal code? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setStudentToConvert(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={confirmConvertTF}>
                                    Convert
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                              className="px-2 py-1"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Student Dialog */}
        {selectedStudent && (
          <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Student: {selectedStudent.firstName} {selectedStudent.lastName}</DialogTitle>
                <DialogDescription>Update student information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>TF Number</Label>
                  <Input value={selectedStudent.tfNumber} disabled />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input value={selectedStudent.firstName} />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={selectedStudent.lastName} />
                  </div>
                </div>
                <div>
                  <Label>Study Path</Label>
                  <Select value={selectedStudent.studyPath}>
                    <SelectTrigger>
                      <SelectValue />
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setSelectedStudent(null)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default TFNumberRegistration;
