
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  School,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface StudentStudyPath {
  id: number;
  studyPathCode: string;
  studyPathName: string;
  startDate: string;
  endDate?: string;
  schoolUnit: string;
  principalName?: string;
  principalEmail?: string;
  year?: string;
  group?: string;
  status: 'active' | 'completed' | 'transferred' | 'terminated';
  notes?: string;
}

interface StudentStudyPathsProps {
  studentId: number;
  studentName: string;
  studyPaths: StudentStudyPath[];
  onUpdateStudyPaths: (studyPaths: StudentStudyPath[]) => void;
}

const studyPathOptions = [
  { code: "NAT", name: "Naturvetenskapsprogrammet" },
  { code: "EK", name: "Ekonomiprogrammet" },
  { code: "SA", name: "Samhällsvetenskapsprogrammet" },
  { code: "ES", name: "Estetiska programmet" },
  { code: "TEK", name: "Teknikprogrammet" },
  { code: "HU", name: "Humanistiska programmet" },
];

const schoolUnits = [
  "Malmö Gymnasium",
  "Jensen Gymnasium", 
  "Malmö Borgarskola",
  "Lunds Gymnasium",
  "Helsingborgs Gymnasium",
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 text-white">Active</Badge>;
    case "completed":
      return <Badge className="bg-blue-500 text-white">Completed</Badge>;
    case "transferred":
      return <Badge className="bg-yellow-500 text-white">Transferred</Badge>;
    case "terminated":
      return <Badge className="bg-red-500 text-white">Terminated</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getCurrentStudyPath = (studyPaths: StudentStudyPath[]): StudentStudyPath | null => {
  const currentDate = new Date().toISOString().split('T')[0];
  return studyPaths.find(sp => 
    sp.startDate <= currentDate && 
    (sp.endDate === undefined || sp.endDate === "" || sp.endDate >= currentDate) &&
    sp.status === 'active'
  ) || null;
};

export const StudentStudyPaths: React.FC<StudentStudyPathsProps> = ({
  studentId,
  studentName,
  studyPaths,
  onUpdateStudyPaths,
}) => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudyPath, setEditingStudyPath] = useState<StudentStudyPath | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studyPathToDelete, setStudyPathToDelete] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Omit<StudentStudyPath, 'id'>>({
    studyPathCode: "",
    studyPathName: "",
    startDate: "",
    endDate: "",
    schoolUnit: "",
    principalName: "",
    principalEmail: "",
    year: "",
    group: "",
    status: "active",
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      studyPathCode: "",
      studyPathName: "",
      startDate: "",
      endDate: "",
      schoolUnit: "",
      principalName: "",
      principalEmail: "",
      year: "",
      group: "",
      status: "active",
      notes: "",
    });
    setEditingStudyPath(null);
    setShowAddForm(false);
  };

  const handleStudyPathChange = (code: string) => {
    const studyPath = studyPathOptions.find(sp => sp.code === code);
    setFormData(prev => ({
      ...prev,
      studyPathCode: code,
      studyPathName: studyPath ? studyPath.name : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const studyPathData: StudentStudyPath = {
      ...formData,
      id: editingStudyPath ? editingStudyPath.id : Date.now(),
    };

    let updatedStudyPaths: StudentStudyPath[];
    
    if (editingStudyPath) {
      updatedStudyPaths = studyPaths.map(sp => 
        sp.id === editingStudyPath.id ? studyPathData : sp
      );
      toast({
        title: "Study Path Updated",
        description: "The study path assignment has been updated successfully.",
      });
    } else {
      updatedStudyPaths = [...studyPaths, studyPathData];
      toast({
        title: "Study Path Added",
        description: "New study path assignment has been added successfully.",
      });
    }

    onUpdateStudyPaths(updatedStudyPaths);
    resetForm();
  };

  const handleEdit = (studyPath: StudentStudyPath) => {
    setFormData({
      studyPathCode: studyPath.studyPathCode,
      studyPathName: studyPath.studyPathName,
      startDate: studyPath.startDate,
      endDate: studyPath.endDate || "",
      schoolUnit: studyPath.schoolUnit,
      principalName: studyPath.principalName || "",
      principalEmail: studyPath.principalEmail || "",
      year: studyPath.year || "",
      group: studyPath.group || "",
      status: studyPath.status,
      notes: studyPath.notes || "",
    });
    setEditingStudyPath(studyPath);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setStudyPathToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (studyPathToDelete !== null) {
      const updatedStudyPaths = studyPaths.filter(sp => sp.id !== studyPathToDelete);
      onUpdateStudyPaths(updatedStudyPaths);
      toast({
        title: "Study Path Removed",
        description: "The study path assignment has been removed successfully.",
      });
      setShowDeleteDialog(false);
      setStudyPathToDelete(null);
    }
  };

  const currentStudyPath = getCurrentStudyPath(studyPaths);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ike-neutral-dark flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-ike-primary" />
            Study Path History
          </h2>
          <p className="text-ike-neutral">
            Manage {studentName}'s study path assignments over time
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Study Path
        </Button>
      </div>

      {/* Current Study Path */}
      {currentStudyPath && (
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
              Current Study Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-ike-neutral">Program</label>
                <p className="text-ike-neutral-dark font-medium">
                  {currentStudyPath.studyPathName} ({currentStudyPath.studyPathCode})
                </p>
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
          </CardContent>
        </Card>
      )}

      {/* Study Path History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
            All Study Path Assignments ({studyPaths.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {studyPaths.length === 0 ? (
            <div className="text-center py-8 text-ike-neutral">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-ike-neutral" />
              <p>No study path assignments found.</p>
              <p className="text-sm">Add the first study path assignment to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Study Path</TableHead>
                  <TableHead>School Unit</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Year/Group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studyPaths
                  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                  .map((studyPath) => (
                  <TableRow key={studyPath.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{studyPath.studyPathName}</div>
                        <div className="text-sm text-ike-neutral">({studyPath.studyPathCode})</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <School className="w-4 h-4 mr-1 text-ike-neutral" />
                        {studyPath.schoolUnit}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{studyPath.startDate}</div>
                        <div className="text-ike-neutral">
                          to {studyPath.endDate || 'Ongoing'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {studyPath.year && <div>Year: {studyPath.year}</div>}
                        {studyPath.group && <div>Group: {studyPath.group}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(studyPath.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(studyPath)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(studyPath.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Study Path Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <BookOpen className="w-5 h-5 mr-2 text-ike-primary" />
              {editingStudyPath ? "Edit Study Path Assignment" : "Add Study Path Assignment"}
            </DialogTitle>
            <DialogDescription>
              {editingStudyPath ? "Update the study path assignment details" : "Add a new study path assignment for the student"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study Path Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Study Path Information</h3>
                <div>
                  <Label htmlFor="studyPathCode">Study Path *</Label>
                  <Select value={formData.studyPathCode} onValueChange={handleStudyPathChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select study path" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyPathOptions.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          {option.name} ({option.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="schoolUnit">School Unit *</Label>
                  <Select value={formData.schoolUnit} onValueChange={(value) => setFormData({...formData, schoolUnit: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolUnits.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="transferred">Transferred</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Assignment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Assignment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      min={formData.startDate}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      placeholder="e.g., 1, 2, 3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group">Group</Label>
                    <Input
                      id="group"
                      type="text"
                      value={formData.group}
                      onChange={(e) => setFormData({...formData, group: e.target.value})}
                      placeholder="e.g., A, B, NA21A"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="principalName">Principal Name</Label>
                  <Input
                    id="principalName"
                    type="text"
                    value={formData.principalName}
                    onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="principalEmail">Principal Email</Label>
                  <Input
                    id="principalEmail"
                    type="email"
                    value={formData.principalEmail}
                    onChange={(e) => setFormData({...formData, principalEmail: e.target.value})}
                    placeholder="principal@school.se"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Additional notes about this study path assignment..."
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                {editingStudyPath ? "Update Assignment" : "Add Assignment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Study Path Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this study path assignment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Remove Assignment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentStudyPaths;
