
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
  Building2, 
  Filter,
  ArrowRightLeft,
  Calendar,
  Users2,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkSchoolUnitTransferProps {
  students: any[];
  isOpen: boolean;
  onClose: () => void;
}

const BulkSchoolUnitTransfer = ({ students, isOpen, onClose }: BulkSchoolUnitTransferProps) => {
  const { toast } = useToast();
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    sourceSchoolUnit: "",
    schoolYear: "",
    studyPath: ""
  });
  const [targetSchoolUnit, setTargetSchoolUnit] = useState("");
  const [transferDate, setTransferDate] = useState("");

  const schoolUnits = [
    "Stockholm Gymnasium", "Göteborg Tekniska", "Malmö Gymnasium", 
    "Uppsala Naturvetenskap", "Linköping Teknik", "Västerås Gymnasium",
    "Örebro Samhälle", "Norrköping Estetik", "Helsingborg Ekonomi",
    "Jönköping Gymnasium", "Lund Gymnasium", "Umeå Teknik"
  ];

  const studyPaths = [
    "Naturvetenskap", "Samhällsvetenskap", "Ekonomi", "Teknik", "Estetik", 
    "Hantverksprogrammet", "Vård och omsorg", "Barn- och fritidsprogrammet",
    "El- och energiprogrammet", "Fordon- och transportprogrammet"
  ];

  const schoolYears = ["1", "2", "3"];

  const filteredStudents = students.filter(student => {
    return (
      (!filters.sourceSchoolUnit || filters.sourceSchoolUnit === "all" || student.schoolUnit === filters.sourceSchoolUnit) &&
      (!filters.schoolYear || filters.schoolYear === "all" || student.schoolYear === filters.schoolYear) &&
      (!filters.studyPath || filters.studyPath === "all" || student.studyPath === filters.studyPath)
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

  const handleBulkTransfer = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student to transfer.",
        variant: "destructive"
      });
      return;
    }

    if (!targetSchoolUnit) {
      toast({
        title: "Target School Unit Required",
        description: "Please select a target school unit for the transfer.",
        variant: "destructive"
      });
      return;
    }

    if (!transferDate) {
      toast({
        title: "Transfer Date Required",
        description: "Please specify the transfer date.",
        variant: "destructive"
      });
      return;
    }

    // Check if source and target are the same
    const sourceUnits = [...new Set(filteredStudents
      .filter(s => selectedStudents.includes(s.id))
      .map(s => s.schoolUnit))];
    
    if (sourceUnits.includes(targetSchoolUnit)) {
      toast({
        title: "Invalid Transfer",
        description: "Cannot transfer students to the same school unit they are already in.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "School Unit Transfer Successful",
      description: `Successfully transferred ${selectedStudents.length} students to ${targetSchoolUnit}.`,
    });
    
    console.log('Bulk school unit transfer:', {
      students: selectedStudents,
      targetSchoolUnit,
      transferDate,
      sourceUnits
    });
    
    onClose();
  };

  const handleClose = () => {
    setSelectedStudents([]);
    setFilters({
      sourceSchoolUnit: "",
      schoolYear: "",
      studyPath: ""
    });
    setTargetSchoolUnit("");
    setTransferDate("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <Building2 className="w-5 h-5 mr-2 text-ike-primary" />
            Bulk School Unit Transfer
          </DialogTitle>
          <DialogDescription>
            Transfer students between school units (requires administrative rights to both units)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Notice */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-orange-800 text-sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Administrator Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-orange-700">
                This function is only available to administrators with write access to both source and target school units. 
                Use this when school units are divided or merged.
              </p>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Filter className="w-4 h-4 mr-2 text-ike-primary" />
                Filter Students by Source School Unit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Source School Unit</label>
                  <Select value={filters.sourceSchoolUnit} onValueChange={(value) => setFilters({...filters, sourceSchoolUnit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All school units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All school units</SelectItem>
                      {schoolUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Year</label>
                  <Select value={filters.schoolYear} onValueChange={(value) => setFilters({...filters, schoolYear: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All years</SelectItem>
                      {schoolYears.map((year) => (
                        <SelectItem key={year} value={year}>Year {year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                  <Select value={filters.studyPath} onValueChange={(value) => setFilters({...filters, studyPath: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All study paths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All study paths</SelectItem>
                      {studyPaths.map((path) => (
                        <SelectItem key={path} value={path}>{path}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <ArrowRightLeft className="w-4 h-4 mr-2 text-ike-primary" />
                Transfer Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Target School Unit *</label>
                  <Select value={targetSchoolUnit} onValueChange={setTargetSchoolUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target school unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Transfer Date *</label>
                  <Input 
                    type="date" 
                    value={transferDate}
                    onChange={(e) => setTransferDate(e.target.value)}
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
                  Select Students to Transfer ({selectedStudents.length} selected)
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all-transfer"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all-transfer" className="text-sm">Select All</label>
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
                      <TableHead>Current School Unit</TableHead>
                      <TableHead>Study Path</TableHead>
                      <TableHead>Year</TableHead>
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
                          <Badge variant="outline">{student.schoolUnit}</Badge>
                        </TableCell>
                        <TableCell>{student.studyPath}</TableCell>
                        <TableCell>{student.schoolYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={handleBulkTransfer}
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Transfer Selected Students
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkSchoolUnitTransfer;
