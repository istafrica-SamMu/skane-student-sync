
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Users2, 
  Filter,
  GraduationCap,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkStudyPathChangeProps {
  students: any[];
  isOpen: boolean;
  onClose: () => void;
}

const BulkStudyPathChange = ({ students, isOpen, onClose }: BulkStudyPathChangeProps) => {
  const { toast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    schoolYear: "",
    currentStudyPath: "",
    schoolUnit: ""
  });
  const [newStudyPath, setNewStudyPath] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [currentEndDate, setCurrentEndDate] = useState("");

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

  const filteredStudents = students.filter(student => {
    return (
      (!filters.schoolYear || student.schoolYear === filters.schoolYear) &&
      (!filters.currentStudyPath || student.studyPath === filters.currentStudyPath) &&
      (!filters.schoolUnit || student.schoolUnit === filters.schoolUnit)
    );
  });

  const handleStudentSelection = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleBulkChange = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student to update.",
        variant: "destructive"
      });
      return;
    }

    if (!newStudyPath) {
      toast({
        title: "Study Path Required",
        description: "Please select a new study path.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Update Successful",
      description: `Updated study path for ${selectedStudents.length} students to ${newStudyPath}.`,
    });
    
    console.log('Bulk study path change:', {
      students: selectedStudents,
      newStudyPath,
      newStartDate,
      currentEndDate
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <Users2 className="w-5 h-5 mr-2 text-ike-primary" />
            Bulk Study Path Change
          </DialogTitle>
          <DialogDescription>
            Select students and update their study paths in bulk
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Filter className="w-4 h-4 mr-2 text-ike-primary" />
                Filter Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Year</label>
                  <Select value={filters.schoolYear} onValueChange={(value) => setFilters({...filters, schoolYear: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All years</SelectItem>
                      {schoolYears.map((year) => (
                        <SelectItem key={year} value={year}>Year {year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Current Study Path</label>
                  <Select value={filters.currentStudyPath} onValueChange={(value) => setFilters({...filters, currentStudyPath: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All study paths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All study paths</SelectItem>
                      {studyPaths.map((path) => (
                        <SelectItem key={path} value={path}>{path}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                  <Select value={filters.schoolUnit} onValueChange={(value) => setFilters({...filters, schoolUnit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All school units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All school units</SelectItem>
                      {schoolUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Study Path Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <GraduationCap className="w-4 h-4 mr-2 text-ike-primary" />
                New Study Path Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">New Study Path *</label>
                  <Select value={newStudyPath} onValueChange={setNewStudyPath}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new study path" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyPaths.map((path) => (
                        <SelectItem key={path} value={path}>{path}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">New Start Date</label>
                  <Input 
                    type="date" 
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Current Study Path End Date</label>
                  <Input 
                    type="date" 
                    value={currentEndDate}
                    onChange={(e) => setCurrentEndDate(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
                <div className="flex items-center">
                  <Users2 className="w-4 h-4 mr-2 text-ike-primary" />
                  Select Students ({selectedStudents.length} selected)
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm">Select All</label>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Study Path</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>School Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {student.firstName} {student.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.studyPath}</Badge>
                        </TableCell>
                        <TableCell>{student.schoolYear}</TableCell>
                        <TableCell>{student.schoolUnit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleBulkChange}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Update Selected Students
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkStudyPathChange;
