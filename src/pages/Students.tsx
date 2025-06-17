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
  UserPlus,
  Users,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  FileText,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { StudentHistoryModal } from "@/components/students/StudentHistoryModal";
import { StudentEducationHistory, EducationHistory } from "@/components/students/StudentEducationHistory";
import { StudentStudyPaths, StudentStudyPath } from "@/components/students/StudentStudyPaths";

interface Student {
  id: number;
  name: string;
  personalNumber: string;
  email: string;
  phone: string;
  address: string;
  municipality: string;
  municipalityCode: string;
  populationRegMunicipality?: string;
  populationRegMunicipalityCode?: string;
  school: string;
  program: string;
  class: string;
  status: string;
  startDate: string;
  endDate?: string;
  principalName?: string;
  principalEmail?: string;
  principalPhone?: string;
  principalStartDate?: string;
  principalEndDate?: string;
  personalSupplement?: string;
  educationHistory?: EducationHistory[];
  studyPaths?: StudentStudyPath[];
}

interface HistoryEntry {
  id: number;
  date: string;
  type: 'enrollment' | 'status_change' | 'program_change' | 'school_change' | 'contact_update' | 'principal_change';
  description: string;
  oldValue?: string;
  newValue?: string;
  changedBy: string;
  notes?: string;
}

const municipalities = [
  { name: "Malmö kommun", code: "1280" },
  { name: "Lund kommun", code: "1281" },
  { name: "Helsingborg kommun", code: "1282" },
  { name: "Landskrona kommun", code: "1283" },
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

const getCurrentStudyPath = (studyPaths: StudentStudyPath[] = []): StudentStudyPath | null => {
  const currentDate = new Date().toISOString().split('T')[0];
  return studyPaths.find(sp => 
    sp.startDate <= currentDate && 
    (sp.endDate === undefined || sp.endDate === "" || sp.endDate >= currentDate) &&
    sp.status === 'active'
  ) || null;
};

const StudentForm = ({
  formData,
  setFormData,
  municipalities,
  editingStudent,
  handleSubmit,
  resetForm,
}: {
  formData: Student;
  setFormData: React.Dispatch<React.SetStateAction<Student>>;
  municipalities: { name: string; code: string }[];
  editingStudent: Student | null;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}) => {
  const handleMunicipalityChange = (value: string) => {
    const muni = municipalities.find((m) => m.name === value);
    setFormData((prev) => ({
      ...prev,
      municipality: value,
      municipalityCode: muni ? muni.code : "",
    }));
  };

  const handlePopulationRegMunicipalityChange = (value: string) => {
    const muni = municipalities.find((m) => m.name === value);
    setFormData((prev) => ({
      ...prev,
      populationRegMunicipality: value,
      populationRegMunicipalityCode: muni ? muni.code : "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Personal Information</h3>
          <div>
            <Label htmlFor="name" className="text-ike-neutral">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              required
            />
          </div>
          <div>
            <Label htmlFor="personalNumber" className="text-ike-neutral">Personal Number *</Label>
            <Input
              id="personalNumber"
              type="text"
              value={formData.personalNumber}
              onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="YYYYMMDD-XXXX"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-ike-neutral">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-ike-neutral">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-ike-neutral">Address</Label>
            <Input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
            />
          </div>
        </div>

        {/* Registration Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Registration Information</h3>
          <div>
            <Label htmlFor="municipality" className="text-ike-neutral">Municipality *</Label>
            <Select value={formData.municipality} onValueChange={handleMunicipalityChange} required>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>
              <SelectContent>
                {municipalities.map((muni) => (
                  <SelectItem key={muni.code} value={muni.name}>
                    {muni.name} ({muni.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="populationRegMunicipality" className="text-ike-neutral">Population Registration Municipality</Label>
            <Select value={formData.populationRegMunicipality || ""} onValueChange={handlePopulationRegMunicipalityChange}>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue placeholder="Select population registration municipality" />
              </SelectTrigger>
              <SelectContent>
                {municipalities.map((muni) => (
                  <SelectItem key={muni.code} value={muni.name}>
                    {muni.name} ({muni.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="school" className="text-ike-neutral">School *</Label>
            <Select value={formData.school} onValueChange={(value) => setFormData({...formData, school: value})} required>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Malmö Gymnasium">Malmö Gymnasium</SelectItem>
                <SelectItem value="Jensen Gymnasium">Jensen Gymnasium</SelectItem>
                <SelectItem value="Malmö Borgarskola">Malmö Borgarskola</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="program" className="text-ike-neutral">Program *</Label>
            <Select value={formData.program} onValueChange={(value) => setFormData({...formData, program: value})} required>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Naturvetenskapsprogrammet">Naturvetenskapsprogrammet</SelectItem>
                <SelectItem value="Ekonomiprogrammet">Ekonomiprogrammet</SelectItem>
                <SelectItem value="Samhällsvetenskapsprogrammet">Samhällsvetenskapsprogrammet</SelectItem>
                <SelectItem value="Estetiska programmet">Estetiska programmet</SelectItem>
                <SelectItem value="Teknikprogrammet">Teknikprogrammet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="class" className="text-ike-neutral">Class</Label>
            <Input
              id="class"
              type="text"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="e.g., NA21A"
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-ike-neutral">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Study Period and Principal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Period */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Study Period</h3>
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
            <Label htmlFor="endDate" className="text-ike-neutral">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              min={formData.startDate}
            />
            {formData.startDate && formData.endDate && formData.endDate <= formData.startDate && (
              <p className="text-red-500 text-sm mt-1">End date must be after start date</p>
            )}
          </div>
        </div>

        {/* Principal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Principal Information</h3>
          <div>
            <Label htmlFor="principalName" className="text-ike-neutral">Principal Name</Label>
            <Input
              id="principalName"
              type="text"
              value={formData.principalName}
              onChange={(e) => setFormData({...formData, principalName: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="Full name of the principal"
            />
          </div>
          <div>
            <Label htmlFor="principalEmail" className="text-ike-neutral">Principal Email</Label>
            <Input
              id="principalEmail"
              type="email"
              value={formData.principalEmail}
              onChange={(e) => setFormData({...formData, principalEmail: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="principal@school.se"
            />
          </div>
          <div>
            <Label htmlFor="principalPhone" className="text-ike-neutral">Principal Phone</Label>
            <Input
              id="principalPhone"
              type="tel"
              value={formData.principalPhone}
              onChange={(e) => setFormData({...formData, principalPhone: e.target.value})}
              className="border-ike-primary/20 focus:border-ike-primary"
              placeholder="040-123456"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="principalStartDate" className="text-ike-neutral">Assignment Start</Label>
              <Input
                id="principalStartDate"
                type="date"
                value={formData.principalStartDate}
                onChange={(e) => setFormData({...formData, principalStartDate: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <div>
              <Label htmlFor="principalEndDate" className="text-ike-neutral">Assignment End</Label>
              <Input
                id="principalEndDate"
                type="date"
                value={formData.principalEndDate}
                onChange={(e) => setFormData({...formData, principalEndDate: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                min={formData.principalStartDate}
              />
            </div>
          </div>
          {formData.principalStartDate && formData.principalEndDate && formData.principalEndDate <= formData.principalStartDate && (
            <p className="text-red-500 text-sm">Principal end date must be after start date</p>
          )}
        </div>
      </div>

      {/* Personal Supplement */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Personal Supplement</h3>
        <div>
          <Label htmlFor="personalSupplement" className="text-ike-neutral">Additional Information</Label>
          <textarea
            id="personalSupplement"
            value={formData.personalSupplement || ""}
            onChange={(e) => setFormData({...formData, personalSupplement: e.target.value})}
            className="w-full min-h-[100px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
            placeholder="Enter any additional information, notes, or special circumstances..."
            rows={4}
          />
          <p className="text-sm text-ike-neutral mt-1">
            This field can contain special circumstances, additional notes, or any supplementary information about the student.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={resetForm}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          disabled={!formData.name || !formData.personalNumber || !formData.municipality || !formData.school || !formData.program || !formData.startDate || (formData.endDate && formData.endDate <= formData.startDate)}
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const StudentTable = ({
  filteredStudents,
  handleViewDetails,
  handleEdit,
  handleDelete,
  handleViewHistory,
  handleViewEducationHistory,
  handleViewStudyPaths,
}: {
  filteredStudents: Student[];
  handleViewDetails: (student: Student) => void;
  handleEdit: (student: Student) => void;
  handleDelete: (id: number) => void;
  handleViewHistory: (student: Student) => void;
  handleViewEducationHistory: (student: Student) => void;
  handleViewStudyPaths: (student: Student) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Name</TableHead>
          <TableHead className="font-medium">Personal Number</TableHead>
          <TableHead className="font-medium">Current Study Path</TableHead>
          <TableHead className="font-medium">School</TableHead>
          <TableHead className="font-medium">Principal</TableHead>
          <TableHead className="font-medium">Status</TableHead>
          <TableHead className="font-medium text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStudents.map((student) => {
          const currentStudyPath = getCurrentStudyPath(student.studyPaths);
          return (
            <TableRow key={student.id} className="hover:bg-ike-neutral-light/50">
              <TableCell className="font-medium text-ike-neutral-dark">
                {student.name}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {student.personalNumber}
              </TableCell>
              <TableCell>
                {currentStudyPath ? (
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-ike-primary" />
                    <div>
                      <div className="font-medium text-sm">{currentStudyPath?.studyPathName}</div>
                      <div className="text-xs text-ike-neutral">({currentStudyPath?.studyPathCode})</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-ike-neutral text-sm">No active study path</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-ike-neutral" />
                  {currentStudyPath?.schoolUnit || student.school}
                </div>
              </TableCell>
              <TableCell>
                {(currentStudyPath?.principalName || student.principalName) ? (
                  <div className="text-sm">
                    <div className="font-medium">{currentStudyPath?.principalName || student.principalName}</div>
                    <div className="text-ike-neutral text-xs">{currentStudyPath?.principalEmail || student.principalEmail}</div>
                  </div>
                ) : (
                  <span className="text-ike-neutral text-sm">Not assigned</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(student.status)}</TableCell>
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
                    <DropdownMenuItem onClick={() => handleViewStudyPaths(student)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Paths
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewHistory(student)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewEducationHistory(student)}>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Education History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(student)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Student
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(student.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Student
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const StudentDetailsModal = ({
  selectedStudent,
  showStudentDetails,
  setShowStudentDetails,
  getStatusBadge,
}: {
  selectedStudent: Student | null;
  showStudentDetails: boolean;
  setShowStudentDetails: React.Dispatch<React.SetStateAction<boolean>>;
  getStatusBadge: (status: string) => JSX.Element;
}) => {
  const currentStudyPath = selectedStudent ? getCurrentStudyPath(selectedStudent.studyPaths) : null;

  return (
    <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Student Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the selected student
          </DialogDescription>
        </DialogHeader>
        {selectedStudent && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Personal Information</h3>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Full Name</label>
                <p className="text-ike-neutral-dark font-medium">{selectedStudent.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                <p className="text-ike-neutral-dark font-mono">{selectedStudent.personalNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Email</label>
                <p className="text-ike-neutral-dark">{selectedStudent.email || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Phone</label>
                <p className="text-ike-neutral-dark">{selectedStudent.phone || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Address</label>
                <p className="text-ike-neutral-dark">{selectedStudent.address || "Not provided"}</p>
              </div>
            </div>

            {/* Registration Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Registration Information</h3>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                <p className="text-ike-neutral-dark">{selectedStudent.municipality} ({selectedStudent.municipalityCode})</p>
              </div>
              {selectedStudent.populationRegMunicipality && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Population Registration Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.populationRegMunicipality} ({selectedStudent.populationRegMunicipalityCode})</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-ike-neutral">Status</label>
                <div className="mt-1">{getStatusBadge(selectedStudent.status)}</div>
              </div>
            </div>

            {/* Current Study Path */}
            {currentStudyPath && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Current Study Path</h3>
                <div className="bg-ike-neutral-light/30 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                      <p className="text-ike-neutral-dark">{currentStudyPath.studyPathName} ({currentStudyPath.studyPathCode})</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                      <p className="text-ike-neutral-dark">{currentStudyPath.schoolUnit}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Period</label>
                      <p className="text-ike-neutral-dark">
                        {currentStudyPath.startDate} - {currentStudyPath.endDate || 'Ongoing'}
                      </p>
                    </div>
                    {currentStudyPath.year && (
                      <div>
                        <label className="text-sm font-medium text-ike-neutral">Year</label>
                        <p className="text-ike-neutral-dark">{currentStudyPath.year}</p>
                      </div>
                    )}
                    {currentStudyPath.group && (
                      <div>
                        <label className="text-sm font-medium text-ike-neutral">Group</label>
                        <p className="text-ike-neutral-dark">{currentStudyPath.group}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Personal Supplement */}
            {selectedStudent.personalSupplement && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Personal Supplement</h3>
                <div className="bg-ike-neutral-light/30 p-4 rounded-lg">
                  <label className="text-sm font-medium text-ike-neutral">Additional Information</label>
                  <p className="text-ike-neutral-dark mt-2 whitespace-pre-wrap">
                    {selectedStudent.personalSupplement}
                  </p>
                </div>
              </div>
            )}

            {/* Education History */}
            {selectedStudent.educationHistory && selectedStudent.educationHistory.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Education History</h3>
                <div className="space-y-3">
                  {selectedStudent.educationHistory.map((education) => (
                    <div key={education.id} className="bg-ike-neutral-light/30 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-ike-neutral">School</label>
                          <p className="text-ike-neutral-dark">{education.schoolName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-ike-neutral">Program</label>
                          <p className="text-ike-neutral-dark">{education.program}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-ike-neutral">Period</label>
                          <p className="text-ike-neutral-dark">
                            {education.startDate} - {education.endDate || 'Ongoing'}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-ike-neutral">Status</label>
                          <p className="text-ike-neutral-dark capitalize">{education.completionStatus.replace('_', ' ')}</p>
                        </div>
                        {education.credits && (
                          <div>
                            <label className="text-sm font-medium text-ike-neutral">Credits</label>
                            <p className="text-ike-neutral-dark">{education.credits}</p>
                          </div>
                        )}
                        {education.grades && (
                          <div>
                            <label className="text-sm font-medium text-ike-neutral">Grades</label>
                            <p className="text-ike-neutral-dark">{education.grades}</p>
                          </div>
                        )}
                      </div>
                      {education.notes && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-ike-neutral">Notes</label>
                          <p className="text-ike-neutral-dark text-sm mt-1">{education.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
  );
};

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Anna Svensson",
      personalNumber: "200501-1234",
      email: "anna.svensson@example.com",
      phone: "070-1234567",
      address: "Storgatan 12, Malmö",
      municipality: "Malmö kommun",
      municipalityCode: "1280",
      populationRegMunicipality: "Malmö kommun",
      populationRegMunicipalityCode: "1280",
      school: "Malmö Gymnasium",
      program: "Naturvetenskapsprogrammet",
      class: "NA21A",
      status: "active",
      startDate: "2024-08-15",
      endDate: "2027-06-15",
      principalName: "Erik Johansson",
      principalEmail: "erik.johansson@malmo.se",
      principalPhone: "040-123456",
      principalStartDate: "2023-01-01",
      principalEndDate: "2025-12-31",
      personalSupplement: "Additional information about Anna Svensson",
      educationHistory: [
        {
          id: 1,
          schoolName: "Malmö Grundskola",
          program: "Grundskolan",
          municipality: "Malmö kommun",
          startDate: "2018-08-15",
          endDate: "2021-06-15",
          completed: true,
          completionStatus: "completed",
          grades: "A-B average",
          credits: 320,
          notes: "Completed with good results in mathematics and science"
        }
      ],
      studyPaths: [
        {
          id: 1,
          studyPathCode: "NAT",
          studyPathName: "Naturvetenskapsprogrammet",
          startDate: "2024-08-15",
          endDate: "2027-06-15",
          schoolUnit: "Malmö Gymnasium",
          principalName: "Erik Johansson",
          principalEmail: "erik.johansson@malmo.se",
          year: "1",
          group: "NA21A",
          status: "active",
          notes: "Current enrollment in Natural Science Program"
        }
      ]
    },
    {
      id: 2,
      name: "Johan Andersson",
      personalNumber: "200403-5678",
      email: "johan.andersson@example.com",
      phone: "070-2345678",
      address: "Lundavägen 34, Malmö",
      municipality: "Malmö kommun",
      municipalityCode: "1280",
      populationRegMunicipality: "Lund kommun",
      populationRegMunicipalityCode: "1281",
      school: "Jensen Gymnasium",
      program: "Ekonomiprogrammet",
      class: "EK22B",
      status: "active",
      startDate: "2023-08-15",
      endDate: "2026-06-15",
      principalName: "Maria Lindberg",
      principalEmail: "maria.lindberg@jensen.se",
      principalPhone: "040-234567",
      principalStartDate: "2022-08-01",
      personalSupplement: "Additional information about Johan Andersson",
      educationHistory: [
        {
          id: 2,
          schoolName: "Lunds Gymnasium",
          program: "Teknikprogrammet",
          municipality: "Lund kommun",
          startDate: "2021-08-15",
          endDate: "2023-01-15",
          completed: false,
          completionStatus: "transferred",
          credits: 150,
          notes: "Transferred to focus on economics instead of technology"
        }
      ],
      studyPaths: [
        {
          id: 2,
          studyPathCode: "TEK",
          studyPathName: "Teknikprogrammet",
          startDate: "2021-08-15",
          endDate: "2023-01-15",
          schoolUnit: "Lunds Gymnasium",
          year: "1",
          status: "transferred",
          notes: "Transferred from Technology Program"
        },
        {
          id: 3,
          studyPathCode: "EK",
          studyPathName: "Ekonomiprogrammet",
          startDate: "2023-01-16",
          endDate: "2026-06-15",
          schoolUnit: "Jensen Gymnasium",
          principalName: "Maria Lindberg",
          principalEmail: "maria.lindberg@jensen.se",
          year: "2",
          group: "EK22B",
          status: "active",
          notes: "Current enrollment in Economics Program"
        }
      ]
    },
    {
      id: 3,
      name: "Lisa Nilsson",
      personalNumber: "200502-9012",
      email: "lisa.nilsson@example.com",
      phone: "070-3456789",
      address: "Rosengård 45, Malmö",
      municipality: "Lund kommun",
      municipalityCode: "1281",
      populationRegMunicipality: "Malmö kommun",
      populationRegMunicipalityCode: "1280",
      school: "Malmö Borgarskola",
      program: "Samhällsvetenskapsprogrammet",
      class: "SA21C",
      status: "pending",
      startDate: "2024-08-15",
      principalName: "Peter Karlsson",
      principalEmail: "peter.karlsson@borgarskola.se",
      principalPhone: "040-345678",
      principalStartDate: "2024-01-01",
      principalEndDate: "2026-12-31",
      personalSupplement: "Additional information about Lisa Nilsson",
      educationHistory: [],
      studyPaths: [
        {
          id: 4,
          studyPathCode: "SA",
          studyPathName: "Samhällsvetenskapsprogrammet",
          startDate: "2024-08-15",
          schoolUnit: "Malmö Borgarskola",
          principalName: "Peter Karlsson",
          principalEmail: "peter.karlsson@borgarskola.se",
          year: "1",
          group: "SA21C",
          status: "active",
          notes: "New enrollment in Social Science Program"
        }
      ]
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Student>({
    id: 0,
    name: "",
    personalNumber: "",
    email: "",
    phone: "",
    address: "",
    municipality: "",
    municipalityCode: "",
    populationRegMunicipality: "",
    populationRegMunicipalityCode: "",
    school: "",
    program: "",
    class: "",
    status: "active",
    startDate: "",
    endDate: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    principalStartDate: "",
    principalEndDate: "",
    personalSupplement: ""
  });
  const [showStudentHistory, setShowStudentHistory] = useState(false);
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<Student | null>(null);
  const [studentHistory, setStudentHistory] = useState<HistoryEntry[]>([]);
  const [showEducationHistory, setShowEducationHistory] = useState(false);
  const [selectedStudentForEducation, setSelectedStudentForEducation] = useState<Student | null>(null);
  const [showStudyPaths, setShowStudyPaths] = useState(false);
  const [selectedStudentForStudyPaths, setSelectedStudentForStudyPaths] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.personalNumber.includes(searchTerm) ||
                         student.municipality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = schoolFilter === "all" || student.school === schoolFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesSchool && matchesStatus;
  });

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  const handleViewHistory = (student: Student) => {
    setSelectedStudentForHistory(student);
    setStudentHistory(getStudentHistory(student.id));
    setShowStudentHistory(true);
  };

  const handleViewEducationHistory = (student: Student) => {
    setSelectedStudentForEducation(student);
    setShowEducationHistory(true);
  };

  const handleViewStudyPaths = (student: Student) => {
    setSelectedStudentForStudyPaths(student);
    setShowStudyPaths(true);
  };

  const handleEdit = (student: Student) => {
    setFormData({
      id: student.id,
      name: student.name,
      personalNumber: student.personalNumber,
      email: student.email,
      phone: student.phone,
      address: student.address,
      municipality: student.municipality,
      municipalityCode: student.municipalityCode,
      populationRegMunicipality: student.populationRegMunicipality || "",
      populationRegMunicipalityCode: student.populationRegMunicipalityCode || "",
      school: student.school,
      program: student.program,
      class: student.class,
      status: student.status,
      startDate: student.startDate,
      endDate: student.endDate || "",
      principalName: student.principalName || "",
      principalEmail: student.principalEmail || "",
      principalPhone: student.principalPhone || "",
      principalStartDate: student.principalStartDate || "",
      principalEndDate: student.principalEndDate || "",
      personalSupplement: student.personalSupplement || ""
    });
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleDelete = (id: number) => {
    setStudentToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (studentToDelete !== null) {
      setStudents(students.filter(s => s.id !== studentToDelete));
      toast({
        title: "Student Deleted",
        description: "The student has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setStudentToDelete(null);
    }
  };

  const getStudentHistory = (studentId: number): HistoryEntry[] => {
    const mockHistory: HistoryEntry[] = [
      {
        id: 1,
        date: "2024-08-15",
        type: "enrollment",
        description: "Student enrolled in Naturvetenskapsprogrammet",
        changedBy: "Maria Andersson",
        notes: "Initial enrollment for academic year 2024-2025"
      },
      {
        id: 2,
        date: "2024-09-01",
        type: "status_change",
        description: "Status changed from pending to active",
        oldValue: "pending",
        newValue: "active",
        changedBy: "Erik Johansson",
        notes: "All required documents received and verified"
      },
      {
        id: 3,
        date: "2024-10-15",
        type: "contact_update",
        description: "Phone number updated",
        oldValue: "070-1234567",
        newValue: "070-9876543",
        changedBy: "System",
        notes: "Updated by student through self-service portal"
      },
      {
        id: 4,
        date: "2024-11-01",
        type: "principal_change",
        description: "Principal assignment updated",
        oldValue: "No principal assigned",
        newValue: "Erik Johansson",
        changedBy: "Maria Lindberg",
        notes: "Principal assigned for better student support"
      }
    ];
    
    return mockHistory.filter(() => Math.random() > 0.3); // Randomly return some entries for demo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      ...formData,
      id: editingStudent ? editingStudent.id : Date.now(),
      principalName: formData.principalName || "",
      principalEmail: formData.principalEmail || "",
      principalPhone: formData.principalPhone || "",
      principalStartDate: formData.principalStartDate || "",
      principalEndDate: formData.principalEndDate || "",
      personalSupplement: formData.personalSupplement || "",
      studyPaths: editingStudent?.studyPaths || []
    };

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? studentData : s));
      toast({
        title: "Student Updated",
        description: `${studentData.name} has been updated successfully.`,
      });
      
      // Add history entry for update
      const historyEntry: HistoryEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        type: "contact_update",
        description: "Student information updated",
        changedBy: "Current User",
        notes: "Student record updated through admin interface"
      };
      
    } else {
      setStudents([...students, studentData]);
      toast({
        title: "Student Added",
        description: `${studentData.name} has been added successfully.`,
      });
      
      // Add history entry for new enrollment
      const historyEntry: HistoryEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        type: "enrollment",
        description: `Student enrolled in ${studentData.program}`,
        changedBy: "Current User",
        notes: "New student registration completed"
      };
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      personalNumber: "",
      email: "",
      phone: "",
      address: "",
      municipality: "",
      municipalityCode: "",
      populationRegMunicipality: "",
      populationRegMunicipalityCode: "",
      school: "",
      program: "",
      class: "",
      status: "active",
      startDate: "",
      endDate: "",
      principalName: "",
      principalEmail: "",
      principalPhone: "",
      principalStartDate: "",
      principalEndDate: "",
      personalSupplement: ""
    });
    setEditingStudent(null);
    setShowStudentForm(false);
  };

  const handleUpdateEducationHistory = (studentId: number, history: EducationHistory[]) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, educationHistory: history }
        : s
    ));
  };

  const handleUpdateStudyPaths = (studentId: number, studyPaths: StudentStudyPath[]) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, studyPaths: studyPaths }
        : s
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Student Management</h1>
          <p className="text-ike-neutral mt-2">
            Manage student records, enrollments, and academic information
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setShowStudentForm(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          New Student
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{students.length}</div>
            <div className="text-xs text-ike-neutral">Registered students</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {students.filter(s => s.status === "active").length}
            </div>
            <div className="text-xs text-ike-neutral">Currently enrolled</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {students.filter(s => s.status === "pending").length}
            </div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {students.filter(s => s.status === "completed").length}
            </div>
            <div className="text-xs text-ike-neutral">Graduated</div>
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
                placeholder="Search by name, personal number, municipality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="School" />
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
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Manage and track student information and enrollment details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentTable 
            filteredStudents={filteredStudents} 
            handleViewDetails={handleViewDetails} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete}
            handleViewHistory={handleViewHistory}
            handleViewEducationHistory={handleViewEducationHistory}
            handleViewStudyPaths={handleViewStudyPaths}
          />
        </CardContent>
      </Card>

      {/* Student Form Modal */}
      <Dialog open={showStudentForm} onOpenChange={setShowStudentForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              {editingStudent ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription>
              {editingStudent ? "Update student information" : "Enter student details to create a new record"}
            </DialogDescription>
          </DialogHeader>
          <StudentForm 
            formData={formData} 
            setFormData={setFormData} 
            municipalities={municipalities} 
            editingStudent={editingStudent} 
            handleSubmit={handleSubmit} 
            resetForm={resetForm} 
          />
        </DialogContent>
      </Dialog>

      {/* Student Details Modal */}
      <StudentDetailsModal 
        selectedStudent={selectedStudent} 
        showStudentDetails={showStudentDetails} 
        setShowStudentDetails={setShowStudentDetails} 
        getStatusBadge={getStatusBadge} 
      />

      {/* Student History Modal */}
      {selectedStudentForHistory && (
        <StudentHistoryModal
          isOpen={showStudentHistory}
          onClose={() => setShowStudentHistory(false)}
          studentName={selectedStudentForHistory.name}
          studentId={selectedStudentForHistory.id}
          history={studentHistory}
        />
      )}

      {/* Education History Modal */}
      {selectedStudentForEducation && (
        <Dialog open={showEducationHistory} onOpenChange={setShowEducationHistory}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>Education History</DialogTitle>
            </DialogHeader>
            <StudentEducationHistory
              studentId={selectedStudentForEducation.id}
              studentName={selectedStudentForEducation.name}
              educationHistory={selectedStudentForEducation.educationHistory || []}
              onUpdateHistory={(history) => handleUpdateEducationHistory(selectedStudentForEducation.id, history)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Study Paths Modal */}
      {selectedStudentForStudyPaths && (
        <Dialog open={showStudyPaths} onOpenChange={setShowStudyPaths}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>Study Paths</DialogTitle>
            </DialogHeader>
            <StudentStudyPaths
              studentId={selectedStudentForStudyPaths.id}
              studentName={selectedStudentForStudyPaths.name}
              studyPaths={selectedStudentForStudyPaths.studyPaths || []}
              onUpdateStudyPaths={(studyPaths) => handleUpdateStudyPaths(selectedStudentForStudyPaths.id, studyPaths)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Trash2 className="w-5 h-5 mr-2 text-red-500" />
              Delete Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this student? This action cannot be undone and will permanently remove 
              all student data and records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Students;
