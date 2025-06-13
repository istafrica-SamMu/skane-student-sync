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
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreHorizontal,
  Edit,
  ArrowUpDown,
  Eye,
  GraduationCap,
  School
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const Students = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Mock student data with enhanced class/program information
  const students = [
    {
      id: 1,
      name: "Erik Andersson",
      personalNumber: "200501-1234",
      municipality: "Malmö",
      school: "Malmö Gymnasium",
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
      teacher: "Anna Andersson"
    },
    {
      id: 2,
      className: "SA22B",
      program: "Samhällsvetenskapsprogrammet", 
      year: "År 2",
      students: 32,
      capacity: 32,
      teacher: "Erik Johansson"
    },
    {
      id: 3,
      className: "TE21C",
      program: "Teknikprogrammet",
      year: "År 3",
      students: 25,
      capacity: 28,
      teacher: "Maria Lindström"
    },
    {
      id: 4,
      className: "EK22A",
      program: "Ekonomiprogrammet",
      year: "År 2",
      students: 30,
      capacity: 30,
      teacher: "Carl Petersson"
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
    
    return matchesSearch && matchesStatus && matchesProgram && matchesClass && matchesYear;
  });

  const filteredClasses = classData.filter(classItem => {
    const matchesProgram = programFilter === "all" || classItem.program === programFilter;
    const matchesYear = yearFilter === "all" || classItem.year === yearFilter;
    return matchesProgram && matchesYear;
  });

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
          <Button className="bg-ike-primary hover:bg-ike-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Student
          </Button>
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Download className="w-4 h-4 mr-2" />
            {t('students.export')}
          </Button>
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              {t('students.view.details')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              {t('students.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              {t('students.transfer')}
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
    </div>
  );
};

export default Students;
