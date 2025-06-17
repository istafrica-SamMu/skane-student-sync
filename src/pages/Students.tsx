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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Users, 
  Search, 
  Plus,
  MoreHorizontal,
  Edit,
  ArrowUpDown,
  Eye,
  GraduationCap,
  Trash2,
  FileText,
  Upload
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";

const Students = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [schoolUnitFilter, setSchoolUnitFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isNewStudentDialogOpen, setIsNewStudentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      personalNumber: "",
      municipality: "",
      school: "",
      program: "",
      class: "",
      year: "",
      teacher: "",
      status: "active"
    }
  });

  // Mock student data with enhanced school unit information
  const students = [
    {
      id: 1,
      name: "Erik Andersson",
      personalNumber: "200501-1234",
      municipality: "Malmö",
      school: "Malmö Gymnasium",
      schoolUnit: "Huvudenhet",
      program: "Naturvetenskapsprogrammet",
      class: "NA21A",
      year: "År 3",
      status: "active",
      startDate: "2024-08-15",
      amount: 125000,
      teacher: "Anna Andersson"
    },
    {
      id: 2,
      name: "Maria Johansson",
      personalNumber: "200403-5678",
      municipality: "Lund",
      school: "Katedralskolan",
      schoolUnit: "Estetisk enhet",
      program: "Samhällsvetenskapsprogrammet",
      class: "SA22B",
      year: "År 2",
      status: "conflict",
      startDate: "2023-08-15",
      amount: 128000,
      teacher: "Erik Johansson"
    },
    {
      id: 3,
      name: "Carl Lindström",
      personalNumber: "200502-9012",
      municipality: "Helsingborg",
      school: "Nicolai Gymnasium",
      schoolUnit: "Teknikcentrum",
      program: "Teknikprogrammet",
      class: "TE21C",
      year: "År 3",
      status: "active",
      startDate: "2024-08-15",
      amount: 135000,
      teacher: "Maria Lindström"
    },
    {
      id: 4,
      name: "Anna Petersson",
      personalNumber: "200406-3456",
      municipality: "Kristianstad",
      school: "Kristianstad Gymnasium",
      schoolUnit: "Ekonomicentrum",
      program: "Ekonomiprogrammet",
      class: "EK22A",
      year: "År 2",
      status: "pending",
      startDate: "2024-11-01",
      amount: 122000,
      teacher: "Carl Petersson"
    },
    {
      id: 5,
      name: "Johan Nilsson",
      personalNumber: "200501-7890",
      municipality: "Malmö",
      school: "Jensen Gymnasium",
      schoolUnit: "Kreativ enhet",
      program: "Estetiska programmet",
      class: "ES21B",
      year: "År 3",
      status: "active",
      startDate: "2024-08-15",
      amount: 130000,
      teacher: "Lena Svensson"
    }
  ];

  // Mock class data for class view
  const classData = [
    {
      id: 1,
      className: "NA21A",
      program: "Naturvetenskapsprogrammet",
      year: "År 3",
      students: 28,
      capacity: 30,
      teacher: "Anna Andersson",
      schoolUnit: "Huvudenhet"
    },
    {
      id: 2,
      className: "SA22B",
      program: "Samhällsvetenskapsprogrammet", 
      year: "År 2",
      students: 32,
      capacity: 32,
      teacher: "Erik Johansson",
      schoolUnit: "Estetisk enhet"
    },
    {
      id: 3,
      className: "TE21C",
      program: "Teknikprogrammet",
      year: "År 3",
      students: 25,
      capacity: 28,
      teacher: "Maria Lindström",
      schoolUnit: "Teknikcentrum"
    },
    {
      id: 4,
      className: "EK22A",
      program: "Ekonomiprogrammet",
      year: "År 2",
      students: 30,
      capacity: 30,
      teacher: "Carl Petersson",
      schoolUnit: "Ekonomicentrum"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">{t('students.active')}</Badge>;
      case "conflict":
        return <Badge className="bg-ike-error text-white">{t('students.conflict')}</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">{t('students.pending')}</Badge>;
      default:
        return <Badge variant="secondary">{t('students.unknown')}</Badge>;
    }
  };

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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.personalNumber.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesProgram = programFilter === "all" || student.program === programFilter;
    const matchesClass = classFilter === "all" || student.class === classFilter;
    const matchesYear = yearFilter === "all" || student.year === yearFilter;
    const matchesSchoolUnit = schoolUnitFilter === "all" || student.schoolUnit === schoolUnitFilter;
    
    return matchesSearch && matchesStatus && matchesProgram && matchesClass && matchesYear && matchesSchoolUnit;
  });

  const filteredClasses = classData.filter(classItem => {
    const matchesProgram = programFilter === "all" || classItem.program === programFilter;
    const matchesYear = yearFilter === "all" || classItem.year === yearFilter;
    const matchesSchoolUnit = schoolUnitFilter === "all" || classItem.schoolUnit === schoolUnitFilter;
    return matchesProgram && matchesYear && matchesSchoolUnit;
  });

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsStudentDialogOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    form.reset(student);
    setIsNewStudentDialogOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting student:', studentToDelete);
    setIsDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleNewStudent = () => {
    setSelectedStudent(null);
    form.reset({
      name: "",
      personalNumber: "",
      municipality: "",
      school: "",
      program: "",
      class: "",
      year: "",
      teacher: "",
      status: "active"
    });
    setIsNewStudentDialogOpen(true);
  };

  const handleImportStudents = () => {
    setIsImportDialogOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleImportConfirm = () => {
    if (selectedFile) {
      console.log('Importing students from file:', selectedFile.name);
      // Add actual import logic here
      setIsImportDialogOpen(false);
      setSelectedFile(null);
    }
  };

  const onSubmit = (data) => {
    console.log('Submitting student data:', data);
    setIsNewStudentDialogOpen(false);
  };

  const handleExportData = () => {
    console.log('Exporting student data...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Student Roster & Classes</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive view of students organized by individual records and class groupings
          </p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-ike-primary text-ike-primary hover:bg-ike-primary hover:text-white"
                onClick={handleImportStudents}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Students
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Import Students from File</DialogTitle>
                <DialogDescription>
                  Upload a CSV or Excel file containing student information to import multiple students at once.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                      Select File
                    </label>
                    <Input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="border-ike-primary/20 focus:border-ike-primary"
                    />
                    <p className="text-xs text-ike-neutral mt-1">
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                  </div>
                  {selectedFile && (
                    <div className="bg-ike-primary/5 border border-ike-primary/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-ike-primary" />
                        <span className="text-sm text-ike-neutral-dark">{selectedFile.name}</span>
                        <Badge variant="outline" className="text-ike-primary border-ike-primary/20">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsImportDialogOpen(false);
                  setSelectedFile(null);
                }}>
                  Cancel
                </Button>
                <Button 
                  className="bg-ike-primary hover:bg-ike-primary/90"
                  onClick={handleImportConfirm}
                  disabled={!selectedFile}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Students
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewStudentDialogOpen} onOpenChange={setIsNewStudentDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-ike-primary hover:bg-ike-primary/90 text-white"
                onClick={handleNewStudent}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedStudent ? 'Edit Student' : 'Add New Student'}
                </DialogTitle>
                <DialogDescription>
                  {selectedStudent ? 'Update student information below.' : 'Enter student information below.'}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Number</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYYMMDD-XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select school" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Malmö Gymnasium">Malmö Gymnasium</SelectItem>
                              <SelectItem value="Katedralskolan">Katedralskolan</SelectItem>
                              <SelectItem value="Nicolai Gymnasium">Nicolai Gymnasium</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select program" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Naturvetenskapsprogrammet">Naturvetenskapsprogrammet</SelectItem>
                                <SelectItem value="Samhällsvetenskapsprogrammet">Samhällsvetenskapsprogrammet</SelectItem>
                                <SelectItem value="Teknikprogrammet">Teknikprogrammet</SelectItem>
                                <SelectItem value="Ekonomiprogrammet">Ekonomiprogrammet</SelectItem>
                                <SelectItem value="Estetiska programmet">Estetiska programmet</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. NA21A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="År 1">År 1</SelectItem>
                                <SelectItem value="År 2">År 2</SelectItem>
                                <SelectItem value="År 3">År 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teacher"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teacher</FormLabel>
                          <FormControl>
                            <Input placeholder="Teacher name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsNewStudentDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-ike-primary hover:bg-ike-primary/90">
                      {selectedStudent ? 'Update Student' : 'Add Student'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('students.total.students')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1,247</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('students.pending.transfers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">23</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Full Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('students.search.filter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder={t('students.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={schoolUnitFilter} onValueChange={setSchoolUnitFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="School Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="Huvudenhet">Huvudenhet</SelectItem>
                <SelectItem value="Estetisk enhet">Estetisk enhet</SelectItem>
                <SelectItem value="Teknikcentrum">Teknikcentrum</SelectItem>
                <SelectItem value="Ekonomicentrum">Ekonomicentrum</SelectItem>
                <SelectItem value="Kreativ enhet">Kreativ enhet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={programFilter} onValueChange={setProgramFilter}>
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
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="NA21A">NA21A</SelectItem>
                <SelectItem value="SA22B">SA22B</SelectItem>
                <SelectItem value="TE21C">TE21C</SelectItem>
                <SelectItem value="EK22A">EK22A</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="År 1">År 1</SelectItem>
                <SelectItem value="År 2">År 2</SelectItem>
                <SelectItem value="År 3">År 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('students.all.statuses')}</SelectItem>
                <SelectItem value="active">{t('students.active')}</SelectItem>
                <SelectItem value="conflict">{t('students.conflict')}</SelectItem>
                <SelectItem value="pending">{t('students.pending')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed View */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Individual Students
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Classes Overview
          </TabsTrigger>
        </TabsList>

        {/* Individual Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Users className="w-5 h-5 mr-2 text-ike-primary" />
                {t('students.student.list')} ({filteredStudents.length})
              </CardTitle>
              <CardDescription>
                {t('students.detailed.list')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">
                      <Button variant="ghost" className="h-auto p-0 font-medium">
                        {t('students.name')}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="font-medium">{t('students.personal.number')}</TableHead>
                    <TableHead className="font-medium">School Unit</TableHead>
                    <TableHead className="font-medium">{t('students.program')}</TableHead>
                    <TableHead className="font-medium">{t('students.class')}</TableHead>
                    <TableHead className="font-medium">Year</TableHead>
                    <TableHead className="font-medium">Teacher</TableHead>
                    <TableHead className="font-medium">{t('students.status')}</TableHead>
                    <TableHead className="font-medium text-center">{t('students.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-ike-neutral-light/50">
                      <TableCell className="font-medium text-ike-neutral-dark">
                        {student.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {student.personalNumber}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-ike-primary border-ike-primary/20">
                          {student.schoolUnit}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.teacher}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white z-50">
                            <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                              <Eye className="mr-2 h-4 w-4" />
                              {t('students.view.details')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {t('students.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteStudent(student)}
                              className="text-ike-error focus:text-ike-error"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Student
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
        </TabsContent>

        {/* Classes Overview Tab */}
        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <GraduationCap className="w-5 h-5 mr-2 text-ike-primary" />
                Classes Overview ({filteredClasses.length})
              </CardTitle>
              <CardDescription>
                Detailed view of all classes and their capacity
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
                    <TableHead className="font-medium">Students</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
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
                      <TableCell>
                        <span className="font-medium">{classItem.students}</span>
                        <span className="text-ike-neutral">/{classItem.capacity}</span>
                      </TableCell>
                      <TableCell>{getCapacityBadge(classItem.students, classItem.capacity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Student Details Modal */}
      <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Student Details
            </DialogTitle>
            <DialogDescription>
              Complete information for the selected student
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Full Name</label>
                <p className="text-ike-neutral-dark">{selectedStudent.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                <p className="font-mono text-ike-neutral-dark">{selectedStudent.personalNumber}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">School</label>
                <p className="text-ike-neutral-dark">{selectedStudent.school}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                <Badge variant="outline" className="text-ike-primary border-ike-primary/20">
                  {selectedStudent.schoolUnit}
                </Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Program</label>
                <p className="text-ike-neutral-dark">{selectedStudent.program}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Class</label>
                <p className="text-ike-neutral-dark">{selectedStudent.class}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Year</label>
                <p className="text-ike-neutral-dark">{selectedStudent.year}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Teacher</label>
                <p className="text-ike-neutral-dark">{selectedStudent.teacher}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Status</label>
                {getStatusBadge(selectedStudent.status)}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ike-neutral">Start Date</label>
                <p className="text-ike-neutral-dark">{selectedStudent.startDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStudentDialogOpen(false)}>
              Close
            </Button>
            <Button 
              className="bg-ike-primary hover:bg-ike-primary/90"
              onClick={() => {
                setIsStudentDialogOpen(false);
                handleEditStudent(selectedStudent);
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-error">
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{studentToDelete?.name}</strong>? 
              This action cannot be undone and will permanently remove the student from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-ike-error hover:bg-ike-error/90"
            >
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Students;
