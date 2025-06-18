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
import { 
  UserPlus,
  Search,
  Edit,
  MapPin,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  RotateCcw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DualPlacementDetector from "./DualPlacementDetector";
import GradeRepetitionDetector from "./GradeRepetitionDetector";

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
  const [hasConflicts, setHasConflicts] = useState(false);
  const [hasGradeRepetitions, setHasGradeRepetitions] = useState(false);

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
    startDate: ""
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
      endDate: "2024-12-15",
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

  // Mock enrollment history for grade repetition testing
  const [enrollmentHistory] = useState([
    {
      id: 1,
      studentId: 5,
      studentName: "Maria Svensson",
      studyPath: "Ekonomi",
      schoolYear: "2",
      schoolUnit: "Malmö Gymnasium",
      startDate: "2023-08-15",
      endDate: "2024-06-15",
      homeMunicipalityContact: "ystad.municipality@kommun.se"
    },
    {
      id: 2,
      studentId: 5,
      studentName: "Maria Svensson",
      studyPath: "Ekonomi",
      schoolYear: "2", // Same grade repetition
      schoolUnit: "Ystad Gymnasium",
      startDate: "2024-08-15",
      homeMunicipalityContact: "ystad.municipality@kommun.se"
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
      startDate: ""
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

  const filteredStudents = tfStudents.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.tfNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Convert TF students to enrollment format for dual placement detection
  const enrollments = tfStudents.map(student => ({
    id: student.id,
    studentId: student.id,
    studentName: `${student.firstName} ${student.lastName}`,
    schoolUnit: student.schoolUnit,
    contactEmail: student.contactEmail || 'contact@school.se',
    startDate: student.startDate || '2024-08-15',
    endDate: student.endDate,
    studyPath: student.studyPath,
    schoolYear: student.schoolYear
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">TF Number Registration</h1>
          <p className="text-ike-neutral mt-2">
            Manage students with temporary personal identity numbers (TF numbers)
          </p>
        </div>
        <Dialog open={showRegistrationForm} onOpenChange={setShowRegistrationForm}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
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

      {/* Conflict Detection Systems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DualPlacementDetector 
          enrollments={enrollments}
          onDetectionChange={setHasConflicts}
        />
        <GradeRepetitionDetector 
          enrollmentHistory={enrollmentHistory}
          onDetectionChange={setHasGradeRepetitions}
        />
      </div>

      {/* Alert Summary */}
      {(hasConflicts || hasGradeRepetitions) && (
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Detection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hasConflicts && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>Dual placement conflicts detected - Payments blocked</span>
                </div>
              )}
              {hasGradeRepetitions && (
                <div className="flex items-center text-orange-600">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Grade repetitions detected - Municipalities notified</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Search className="w-5 h-5 mr-2 text-ike-primary" />
            Search TF Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or TF number..."
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

      {/* TF Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">TF Number Students</CardTitle>
          <CardDescription>Students with temporary personal identity numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">TF Number</TableHead>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Birth Date</TableHead>
                <TableHead className="font-medium">Municipal Code</TableHead>
                <TableHead className="font-medium">Home Municipality</TableHead>
                <TableHead className="font-medium">Study Path</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono">{student.tfNumber}</TableCell>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.birthDate}</TableCell>
                  <TableCell className="font-mono">{student.municipalCode}</TableCell>
                  <TableCell>
                    {student.needsHomeMunicipality ? (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600">Not Assigned</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{student.homeMunicipality}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{student.studyPath}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      {student.needsHomeMunicipality && (
                        <Select onValueChange={(value) => handleAssignMunicipality(student.id, value)}>
                          <SelectTrigger className="w-32 h-8">
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
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  );
};

export default TFNumberRegistration;
