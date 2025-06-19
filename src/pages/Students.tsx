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
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtectedDataDisplay from "@/components/students/ProtectedDataDisplay";
import PrivacyIndicator from "@/components/students/PrivacyIndicator";
import { privacyService } from "@/services/privacyService";
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

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
      status: "active"
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
      status: "active"
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
      status: "active"
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
      status: "active"
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
      status: "active"
    }
  ];

  const filteredStudents = allStudents.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.personalNumber.includes(searchTerm)
  );

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
    toast({
      title: "Student Added",
      description: "New student has been successfully added to the system.",
    });
    setShowAddStudent(false);
  };

  const handleUpdateStudent = () => {
    if (selectedStudent) {
      toast({
        title: "Student Updated",
        description: `${selectedStudent.firstName} ${selectedStudent.lastName} information has been updated.`,
      });
    }
    setShowEditStudent(false);
    setSelectedStudent(null);
  };

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
                <TableHead>Name</TableHead>
                <TableHead>Personal Number</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Home Municipality</TableHead>
                <TableHead>Study Path</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>School Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const isProtected = privacyService.isStudentProtected(student.id);
                const privacyMark = privacyService.getPrivacyMark(student.id);
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
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
                    <TableCell className="font-mono">
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
                    <TableCell>
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
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span>{student.homeMunicipality}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span>{student.studyPath}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.schoolYear}</TableCell>
                    <TableCell>{student.schoolUnit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(student.status)}
                        {isProtected && privacyMark && (
                          <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
                        )}
                      </div>
                    </TableCell>
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
        <DialogContent className="max-w-2xl">
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
                <Input placeholder="Enter first name" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Last Name</label>
                <Input placeholder="Enter last name" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                <Input placeholder="YYYYMMDD-XXXX" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Birth Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                <Input placeholder="Enter municipality" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                <Input placeholder="Enter study path" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Year</label>
                <Input placeholder="Enter school year" />
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                <Input placeholder="Enter school unit" />
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Edit className="w-5 h-5 mr-2 text-ike-primary" />
              Edit Student
            </DialogTitle>
            <DialogDescription>
              Update student information
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">First Name</label>
                  <Input defaultValue={selectedStudent.firstName} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Last Name</label>
                  <Input defaultValue={selectedStudent.lastName} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                  <Input defaultValue={selectedStudent.personalNumber} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Birth Date</label>
                  <Input type="date" defaultValue={selectedStudent.birthDate} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                  <Input defaultValue={selectedStudent.homeMunicipality} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                  <Input defaultValue={selectedStudent.studyPath} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Year</label>
                  <Input defaultValue={selectedStudent.schoolYear} />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                  <Input defaultValue={selectedStudent.schoolUnit} />
                </div>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Students;
