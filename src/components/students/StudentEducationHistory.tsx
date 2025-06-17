
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  GraduationCap,
  Calendar,
  School,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface EducationHistory {
  id: number;
  schoolName: string;
  program: string;
  municipality: string;
  startDate: string;
  endDate?: string;
  completed: boolean;
  completionStatus: 'completed' | 'incomplete' | 'transferred' | 'dropped_out';
  grades?: string;
  credits?: number;
  notes?: string;
}

interface StudentEducationHistoryProps {
  studentId: number;
  studentName: string;
  educationHistory: EducationHistory[];
  onUpdateHistory: (history: EducationHistory[]) => void;
}

export const StudentEducationHistory = ({
  studentId,
  studentName,
  educationHistory,
  onUpdateHistory,
}: StudentEducationHistoryProps) => {
  const { toast } = useToast();
  const [showHistoryForm, setShowHistoryForm] = useState(false);
  const [editingHistory, setEditingHistory] = useState<EducationHistory | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<EducationHistory, 'id'>>({
    schoolName: "",
    program: "",
    municipality: "",
    startDate: "",
    endDate: "",
    completed: false,
    completionStatus: "incomplete",
    grades: "",
    credits: 0,
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      schoolName: "",
      program: "",
      municipality: "",
      startDate: "",
      endDate: "",
      completed: false,
      completionStatus: "incomplete",
      grades: "",
      credits: 0,
      notes: "",
    });
    setEditingHistory(null);
    setShowHistoryForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const historyData: EducationHistory = {
      ...formData,
      id: editingHistory ? editingHistory.id : Date.now(),
      credits: formData.credits || undefined,
      grades: formData.grades || undefined,
      notes: formData.notes || undefined,
    };

    let updatedHistory;
    if (editingHistory) {
      updatedHistory = educationHistory.map(h => 
        h.id === editingHistory.id ? historyData : h
      );
      toast({
        title: "Education History Updated",
        description: "The education record has been updated successfully.",
      });
    } else {
      updatedHistory = [...educationHistory, historyData];
      toast({
        title: "Education History Added",
        description: "New education record has been added successfully.",
      });
    }

    onUpdateHistory(updatedHistory);
    resetForm();
  };

  const handleEdit = (history: EducationHistory) => {
    setFormData({
      schoolName: history.schoolName,
      program: history.program,
      municipality: history.municipality,
      startDate: history.startDate,
      endDate: history.endDate || "",
      completed: history.completed,
      completionStatus: history.completionStatus,
      grades: history.grades || "",
      credits: history.credits || 0,
      notes: history.notes || "",
    });
    setEditingHistory(history);
    setShowHistoryForm(true);
  };

  const handleDelete = (id: number) => {
    setHistoryToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (historyToDelete !== null) {
      const updatedHistory = educationHistory.filter(h => h.id !== historyToDelete);
      onUpdateHistory(updatedHistory);
      toast({
        title: "Education History Deleted",
        description: "The education record has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setHistoryToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">Completed</Badge>;
      case "transferred":
        return <Badge className="bg-ike-primary text-white">Transferred</Badge>;
      case "dropped_out":
        return <Badge className="bg-red-500 text-white">Dropped Out</Badge>;
      default:
        return <Badge className="bg-ike-warning text-white">Incomplete</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
              Education History - {studentName}
            </CardTitle>
            <p className="text-ike-neutral text-sm mt-1">
              Previous upper secondary education records
            </p>
          </div>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setShowHistoryForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education Record
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {educationHistory.length === 0 ? (
          <div className="text-center py-8 text-ike-neutral">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-ike-neutral/40" />
            <p>No education history records found</p>
            <p className="text-sm">Add previous education records to track the student's academic background</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">School</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Period</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Credits</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {educationHistory.map((history) => (
                <TableRow key={history.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-ike-neutral-dark">{history.schoolName}</div>
                      <div className="text-sm text-ike-neutral">{history.municipality}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-ike-neutral-dark">{history.program}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-ike-neutral" />
                      <span className="text-ike-neutral-dark">
                        {history.startDate} - {history.endDate || 'Ongoing'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(history.completionStatus)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {history.credits && (
                        <div className="text-ike-neutral-dark">{history.credits} credits</div>
                      )}
                      {history.grades && (
                        <div className="text-ike-neutral text-xs">{history.grades}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem onClick={() => handleEdit(history)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(history.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Education History Form Modal */}
      <Dialog open={showHistoryForm} onOpenChange={setShowHistoryForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <School className="w-5 h-5 mr-2 text-ike-primary" />
              {editingHistory ? "Edit Education Record" : "Add Education Record"}
            </DialogTitle>
            <DialogDescription>
              {editingHistory ? "Update education history information" : "Add previous upper secondary education details"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName" className="text-ike-neutral">School Name *</Label>
                <Input
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Name of the school"
                  required
                />
              </div>
              <div>
                <Label htmlFor="municipality" className="text-ike-neutral">Municipality</Label>
                <Input
                  id="municipality"
                  value={formData.municipality}
                  onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="School municipality"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="program" className="text-ike-neutral">Program *</Label>
              <Input
                id="program"
                value={formData.program}
                onChange={(e) => setFormData({...formData, program: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                placeholder="Study program or course"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="completionStatus" className="text-ike-neutral">Completion Status</Label>
                <Select 
                  value={formData.completionStatus} 
                  onValueChange={(value: any) => setFormData({...formData, completionStatus: value})}
                >
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                    <SelectItem value="transferred">Transferred</SelectItem>
                    <SelectItem value="dropped_out">Dropped Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="credits" className="text-ike-neutral">Credits Earned</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Number of credits"
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="grades" className="text-ike-neutral">Grades/Results</Label>
              <Input
                id="grades"
                value={formData.grades}
                onChange={(e) => setFormData({...formData, grades: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                placeholder="Final grades or results"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-ike-neutral">Additional Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Any additional information about this education period..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                disabled={!formData.schoolName || !formData.program || !formData.startDate}
              >
                {editingHistory ? "Update Record" : "Add Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Trash2 className="w-5 h-5 mr-2 text-red-500" />
              Delete Education Record
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this education record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
