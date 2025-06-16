
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
  GraduationCap, 
  Users, 
  School,
  BookOpen,
  Filter,
  Plus,
  Edit,
  Settings,
  MoreHorizontal,
  Eye,
  Trash2,
  Search,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentsByClass = () => {
  const { t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSchoolUnit, setSelectedSchoolUnit] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showDeleteClass, setShowDeleteClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classToDelete, setClassToDelete] = useState(null);

  // Mock data for classes and study paths
  const classData = [
    {
      id: 1,
      className: "NA21A",
      program: "Naturvetenskapsprogrammet",
      year: "År 3",
      school: "Malmö Gymnasium",
      schoolUnit: "Huvudenhet",
      students: 28,
      capacity: 30,
      teacher: "Anna Andersson",
      room: "A101",
      startDate: "2024-08-15",
      description: "Advanced natural science class focusing on mathematics and physics"
    },
    {
      id: 2,
      className: "SA22B",
      program: "Samhällsvetenskapsprogrammet", 
      year: "År 2",
      school: "Katedralskolan",
      schoolUnit: "Estetisk enhet",
      students: 32,
      capacity: 32,
      teacher: "Erik Johansson",
      room: "B205",
      startDate: "2023-08-15",
      description: "Social sciences with focus on history and economics"
    },
    {
      id: 3,
      className: "TE21C",
      program: "Teknikprogrammet",
      year: "År 3",
      school: "Nicolai Gymnasium",
      schoolUnit: "Teknikcentrum",
      students: 25,
      capacity: 28,
      teacher: "Maria Lindström",
      room: "C302",
      startDate: "2024-08-15",
      description: "Technology program with emphasis on engineering and computer science"
    },
    {
      id: 4,
      className: "EK22A",
      program: "Ekonomiprogrammet",
      year: "År 2",
      school: "Jensen Gymnasium",
      schoolUnit: "Ekonomicentrum",
      students: 30,
      capacity: 30,
      teacher: "Carl Petersson",
      room: "D150",
      startDate: "2023-08-15",
      description: "Economics program covering business and financial management"
    }
  ];

  const getCapacityBadge = (students: number, capacity: number) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 95) {
      return <Badge className="bg-ike-error text-white">Full</Badge>;
    } else if (percentage >= 80) {
      return <Badge className="bg-ike-warning text-white">Nearly Full</Badge>;
    } else {
      return <Badge className="bg-ike-success text-white">Available</Badge>;
    }
  };

  const filteredClasses = classData.filter(classItem => {
    const matchesSearch = classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || classItem.program === selectedProgram;
    const matchesYear = selectedYear === "all" || classItem.year === selectedYear;
    const matchesSchoolUnit = selectedSchoolUnit === "all" || classItem.schoolUnit === selectedSchoolUnit;
    
    return matchesSearch && matchesProgram && matchesYear && matchesSchoolUnit;
  });

  const handleViewClass = (classItem) => {
    setSelectedClass(classItem);
    setShowClassDetails(true);
  };

  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setShowEditClass(true);
  };

  const handleDeleteClass = (classItem) => {
    setClassToDelete(classItem);
    setShowDeleteClass(true);
  };

  const confirmDeleteClass = () => {
    console.log('Deleting class:', classToDelete);
    setShowDeleteClass(false);
    setClassToDelete(null);
  };

  const handleCreateClass = () => {
    console.log('Creating new class');
    setShowCreateClass(false);
  };

  const handleUpdateClass = () => {
    console.log('Updating class:', selectedClass);
    setShowEditClass(false);
    setSelectedClass(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Class Management & Organization</h1>
          <p className="text-ike-neutral mt-2">
            Organize and manage classes, assign teachers, and monitor capacity
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateClass} onOpenChange={setShowCreateClass}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>
                  Set up a new class with program, year, and capacity details.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Class Name</label>
                  <Input placeholder="e.g., NA24A" />
                </div>
                <div>
                  <label className="text-sm font-medium">School Unit</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="huvudenhet">Huvudenhet</SelectItem>
                      <SelectItem value="estetisk">Estetisk enhet</SelectItem>
                      <SelectItem value="teknik">Teknikcentrum</SelectItem>
                      <SelectItem value="ekonomi">Ekonomicentrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Program</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="na">Naturvetenskapsprogrammet</SelectItem>
                      <SelectItem value="sa">Samhällsvetenskapsprogrammet</SelectItem>
                      <SelectItem value="te">Teknikprogrammet</SelectItem>
                      <SelectItem value="ek">Ekonomiprogrammet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">År 1</SelectItem>
                      <SelectItem value="2">År 2</SelectItem>
                      <SelectItem value="3">År 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Capacity</label>
                  <Input type="number" placeholder="30" />
                </div>
                <div>
                  <label className="text-sm font-medium">Classroom</label>
                  <Input placeholder="e.g., A101" />
                </div>
                <div>
                  <label className="text-sm font-medium">Teacher</label>
                  <Input placeholder="Teacher name" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateClass(false)}>
                  Cancel
                </Button>
                <Button className="bg-ike-primary hover:bg-ike-primary/90" onClick={handleCreateClass}>
                  Create Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1,247</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Average Class Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">26.5</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Classes at Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Filter & Search Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input 
                placeholder="Search by class name or teacher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSchoolUnit} onValueChange={setSelectedSchoolUnit}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="School Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="Huvudenhet">Huvudenhet</SelectItem>
                <SelectItem value="Estetisk enhet">Estetisk enhet</SelectItem>
                <SelectItem value="Teknikcentrum">Teknikcentrum</SelectItem>
                <SelectItem value="Ekonomicentrum">Ekonomicentrum</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="Naturvetenskapsprogrammet">Naturvetenskapsprogrammet</SelectItem>
                <SelectItem value="Samhällsvetenskapsprogrammet">Samhällsvetenskapsprogrammet</SelectItem>
                <SelectItem value="Teknikprogrammet">Teknikprogrammet</SelectItem>
                <SelectItem value="Ekonomiprogrammet">Ekonomiprogrammet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="År 1">År 1</SelectItem>
                <SelectItem value="År 2">År 2</SelectItem>
                <SelectItem value="År 3">År 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
            Class Organization Overview ({filteredClasses.length})
          </CardTitle>
          <CardDescription>
            Manage class details, assignments, and capacity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Class</TableHead>
                <TableHead className="font-medium">School Unit</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Year</TableHead>
                <TableHead className="font-medium">Teacher</TableHead>
                <TableHead className="font-medium">Room</TableHead>
                <TableHead className="font-medium">Students</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {classItem.className}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-ike-primary border-ike-primary/20">
                      {classItem.schoolUnit}
                    </Badge>
                  </TableCell>
                  <TableCell>{classItem.program}</TableCell>
                  <TableCell>{classItem.year}</TableCell>
                  <TableCell>{classItem.teacher}</TableCell>
                  <TableCell>{classItem.room}</TableCell>
                  <TableCell>
                    <span className="font-medium">{classItem.students}</span>
                    <span className="text-ike-neutral">/{classItem.capacity}</span>
                  </TableCell>
                  <TableCell>{getCapacityBadge(classItem.students, classItem.capacity)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white z-50">
                        <DropdownMenuItem onClick={() => handleViewClass(classItem)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClass(classItem)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Class
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Students
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClass(classItem)}
                          className="text-ike-error focus:text-ike-error"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Class
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Class Details Modal */}
      <Dialog open={showClassDetails} onOpenChange={setShowClassDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Class Details
            </DialogTitle>
            <DialogDescription>
              Complete information for the selected class
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Class Name</label>
                <p className="text-ike-neutral-dark font-medium">{selectedClass.className}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                <Badge variant="outline" className="text-ike-primary border-ike-primary/20">
                  {selectedClass.schoolUnit}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Program</label>
                <p className="text-ike-neutral-dark">{selectedClass.program}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Year</label>
                <p className="text-ike-neutral-dark">{selectedClass.year}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Teacher</label>
                <p className="text-ike-neutral-dark">{selectedClass.teacher}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Classroom</label>
                <p className="text-ike-neutral-dark">{selectedClass.room}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Capacity</label>
                <p className="text-ike-neutral-dark">
                  <span className="font-medium">{selectedClass.students}</span> / {selectedClass.capacity} students
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Status</label>
                {getCapacityBadge(selectedClass.students, selectedClass.capacity)}
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Description</label>
                <p className="text-ike-neutral-dark">{selectedClass.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClassDetails(false)}>
              Close
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={() => {
                setShowClassDetails(false);
                handleEditClass(selectedClass);
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Modal */}
      <Dialog open={showEditClass} onOpenChange={setShowEditClass}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update class information and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Class Name</label>
                <Input defaultValue={selectedClass.className} />
              </div>
              <div>
                <label className="text-sm font-medium">School Unit</label>
                <Select defaultValue={selectedClass.schoolUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Huvudenhet">Huvudenhet</SelectItem>
                    <SelectItem value="Estetisk enhet">Estetisk enhet</SelectItem>
                    <SelectItem value="Teknikcentrum">Teknikcentrum</SelectItem>
                    <SelectItem value="Ekonomicentrum">Ekonomicentrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Teacher</label>
                <Input defaultValue={selectedClass.teacher} />
              </div>
              <div>
                <label className="text-sm font-medium">Classroom</label>
                <Input defaultValue={selectedClass.room} />
              </div>
              <div>
                <label className="text-sm font-medium">Capacity</label>
                <Input type="number" defaultValue={selectedClass.capacity} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditClass(false)}>
              Cancel
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary/90" onClick={handleUpdateClass}>
              Update Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Class Confirmation Modal */}
      <AlertDialog open={showDeleteClass} onOpenChange={setShowDeleteClass}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-error">
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Class
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete class <strong>{classToDelete?.className}</strong>? 
              This action cannot be undone and will affect all students assigned to this class.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteClass}
              className="bg-ike-error hover:bg-ike-error/90"
            >
              Delete Class
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StudentsByClass;
