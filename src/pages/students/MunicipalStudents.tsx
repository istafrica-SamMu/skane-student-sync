import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Filter,
  Building,
  MapPin,
  GraduationCap,
  Eye,
  Download,
  User,
  Calendar,
  School
} from "lucide-react";
import ProtectedDataDisplay from "@/components/students/ProtectedDataDisplay";
import PrivacyIndicator from "@/components/students/PrivacyIndicator";
import { MunicipalStudentsViewManagement } from "@/components/students/MunicipalStudentsViewManagement";
import { privacyService } from "@/services/privacyService";
import { useToast } from "@/hooks/use-toast";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

const MunicipalStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const { toast } = useToast();

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [columns, setColumns] = useState<ViewColumn[]>([
    { key: 'name', label: 'Name', visible: true },
    { key: 'personalNumber', label: 'Personal Number', visible: true },
    { key: 'birthDate', label: 'Birth Date', visible: true },
    { key: 'studyPath', label: 'Study Path', visible: true },
    { key: 'schoolYear', label: 'School Year', visible: true },
    { key: 'schoolUnit', label: 'School Unit', visible: true },
    { key: 'enrollmentDate', label: 'Enrollment Date', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'actions', label: 'Actions', visible: true }
  ]);
  const [filters, setFilters] = useState<ViewFilter[]>([]);

  // Mock municipal students data
  const municipalStudents = [
    {
      id: 1,
      firstName: "Anna",
      lastName: "Johansson", 
      birthDate: "2006-03-15",
      personalNumber: "200603-1234",
      studyPath: "Naturvetenskap",
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium A",
      status: "active",
      enrollmentDate: "2023-08-15"
    },
    {
      id: 2, // Protected student
      firstName: "Fatima",
      lastName: "Al-Rashid",
      birthDate: "2007-11-28", 
      personalNumber: "200711-2345",
      studyPath: "Samhällsvetenskap",
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium B",
      status: "active",
      enrollmentDate: "2023-08-15"
    },
    {
      id: 3,
      firstName: "Erik",
      lastName: "Lindqvist",
      birthDate: "2005-08-22",
      personalNumber: "200508-3456", 
      studyPath: "Teknik",
      schoolYear: "3",
      schoolUnit: "Municipal Technical School",
      status: "active",
      enrollmentDate: "2022-08-15"
    },
    {
      id: 5, // Protected student
      firstName: "Maria",
      lastName: "Svensson",
      birthDate: "2007-12-03",
      personalNumber: "200712-0345",
      studyPath: "Ekonomi", 
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium C",
      status: "active",
      enrollmentDate: "2023-08-15"
    }
  ];

  // Apply filters
  const applyFilters = (students: any[]) => {
    return students.filter(student => {
      return filters.every(filter => {
        const value = student[filter.field]?.toString().toLowerCase() || '';
        const filterValue = filter.value.toString().toLowerCase();
        
        switch (filter.operator) {
          case 'equals':
            return value === filterValue;
          case 'contains':
            return value.includes(filterValue);
          case 'startsWith':
            return value.startsWith(filterValue);
          case 'endsWith':
            return value.endsWith(filterValue);
          default:
            return true;
        }
      });
    });
  };

  // Apply search and filters
  const getFilteredStudents = () => {
    let filtered = municipalStudents.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.personalNumber.includes(searchTerm) ||
      student.schoolUnit.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return applyFilters(filtered);
  };

  const filteredStudents = getFilteredStudents();

  // View Management Handlers
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: `view-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setColumns(view.columns);
    setFilters(view.filters);
    toast({
      title: "View Loaded",
      description: `"${view.name}" view has been applied.`,
    });
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
    toast({
      title: "View Deleted",
      description: "View has been removed.",
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

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Municipal student data export has been initiated.",
    });
    console.log('Exporting municipal student data...');
  };

  // Get visible columns
  const visibleColumns = columns.filter(col => col.visible);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Municipal Students</h1>
          <p className="text-ike-neutral mt-2">
            Students enrolled in municipal schools
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleExportData}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Municipal Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{municipalStudents.length}</div>
            <p className="text-xs text-ike-neutral">In municipal schools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{municipalStudents.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-ike-neutral">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Protected Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{municipalStudents.filter(s => privacyService.isStudentProtected(s.id)).length}</div>
            <p className="text-xs text-ike-neutral">Privacy protected</p>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <MunicipalStudentsViewManagement
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

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Search className="w-5 h-5 mr-2 text-ike-primary" />
            Search Municipal Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, personal number, or school..."
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

      {/* Municipal Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Municipal Students List
          </CardTitle>
          <CardDescription>Students enrolled in municipal schools</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key}>
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const isProtected = privacyService.isStudentProtected(student.id);
                const privacyMark = privacyService.getPrivacyMark(student.id);
                
                return (
                  <TableRow key={student.id}>
                    {visibleColumns.map((column) => {
                      if (column.key === 'name') {
                        return (
                          <TableCell key={column.key} className="font-medium">
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
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'personalNumber') {
                        return (
                          <TableCell key={column.key} className="font-mono">
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
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'birthDate') {
                        return (
                          <TableCell key={column.key}>
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
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'studyPath') {
                        return (
                          <TableCell key={column.key}>
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                              <span>{student.studyPath}</span>
                            </div>
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'schoolYear') {
                        return (
                          <TableCell key={column.key}>{student.schoolYear}</TableCell>
                        );
                      }
                      
                      if (column.key === 'schoolUnit') {
                        return (
                          <TableCell key={column.key}>
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-2 text-ike-neutral" />
                              <span>{student.schoolUnit}</span>
                            </div>
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'enrollmentDate') {
                        return (
                          <TableCell key={column.key}>{student.enrollmentDate}</TableCell>
                        );
                      }
                      
                      if (column.key === 'status') {
                        return (
                          <TableCell key={column.key}>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(student.status)}
                              {isProtected && privacyMark && (
                                <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
                              )}
                            </div>
                          </TableCell>
                        );
                      }
                      
                      if (column.key === 'actions') {
                        return (
                          <TableCell key={column.key}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewStudent(student)}
                              className="hover:bg-ike-primary/10"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        );
                      }
                      
                      return <TableCell key={column.key}></TableCell>;
                    })}
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
              Municipal Student Details
            </DialogTitle>
            <DialogDescription>
              Complete information for the selected municipal student
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
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-ike-neutral" />
                    <p className="text-ike-neutral-dark">{selectedStudent.birthDate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                    <p className="text-ike-neutral-dark">{selectedStudent.studyPath}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">School Year</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.schoolYear}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                  <div className="flex items-center">
                    <School className="w-4 h-4 mr-2 text-ike-neutral" />
                    <p className="text-ike-neutral-dark">{selectedStudent.schoolUnit}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Enrollment Date</label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-ike-neutral" />
                    <p className="text-ike-neutral-dark">{selectedStudent.enrollmentDate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  {getStatusBadge(selectedStudent.status)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowStudentDetails(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MunicipalStudents;
