
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  GraduationCap, 
  Users, 
  School,
  BookOpen,
  Filter
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentsByClass = () => {
  const { t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Mock data for classes and study paths
  const classData = [
    {
      id: 1,
      className: "NA21A",
      program: "Naturvetenskapsprogrammet",
      year: "År 3",
      school: "Malmö Gymnasium",
      students: 28,
      capacity: 30,
      teacher: "Anna Andersson"
    },
    {
      id: 2,
      className: "SA22B",
      program: "Samhällsvetenskapsprogrammet", 
      year: "År 2",
      school: "Katedralskolan",
      students: 32,
      capacity: 32,
      teacher: "Erik Johansson"
    },
    {
      id: 3,
      className: "TE21C",
      program: "Teknikprogrammet",
      year: "År 3",
      school: "Nicolai Gymnasium",
      students: 25,
      capacity: 28,
      teacher: "Maria Lindström"
    },
    {
      id: 4,
      className: "EK22A",
      program: "Ekonomiprogrammet",
      year: "År 2",
      school: "Jensen Gymnasium",
      students: 30,
      capacity: 30,
      teacher: "Carl Petersson"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Students by Class & Study Path</h1>
          <p className="text-ike-neutral mt-2">
            Overview of students organized by class and study program
          </p>
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
              Nearly Full Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Filter Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="naturvetenskap">Naturvetenskapsprogrammet</SelectItem>
                <SelectItem value="samhallsvetenskap">Samhällsvetenskapsprogrammet</SelectItem>
                <SelectItem value="teknik">Teknikprogrammet</SelectItem>
                <SelectItem value="ekonomi">Ekonomiprogrammet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">År 1</SelectItem>
                <SelectItem value="2">År 2</SelectItem>
                <SelectItem value="3">År 3</SelectItem>
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
            Classes Overview
          </CardTitle>
          <CardDescription>
            Detailed view of all classes in the municipality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Class</TableHead>
                <TableHead className="font-medium">Program</TableHead>
                <TableHead className="font-medium">Year</TableHead>
                <TableHead className="font-medium">School</TableHead>
                <TableHead className="font-medium">Teacher</TableHead>
                <TableHead className="font-medium">Students</TableHead>
                <TableHead className="font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classData.map((classItem) => (
                <TableRow key={classItem.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {classItem.className}
                  </TableCell>
                  <TableCell>{classItem.program}</TableCell>
                  <TableCell>{classItem.year}</TableCell>
                  <TableCell>{classItem.school}</TableCell>
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
    </div>
  );
};

export default StudentsByClass;
