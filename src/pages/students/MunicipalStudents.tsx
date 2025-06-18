
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter,
  Building,
  MapPin,
  GraduationCap,
  Eye,
  Download
} from "lucide-react";
import ProtectedDataDisplay from "@/components/students/ProtectedDataDisplay";
import PrivacyIndicator from "@/components/students/PrivacyIndicator";
import { privacyService } from "@/services/privacyService";

const MunicipalStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock municipal students data
  const municipalStudents = [
    {
      id: 1,
      firstName: "Anna",
      lastName: "Johansson", 
      birthDate: "2006-03-15",
      personalNumber: "200603-1234",
      studyPath: "Naturvetenskap",
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium A",
      status: "active",
      enrollmentDate: "2023-08-15"
    },
    {
      id: 2, // Protected student
      firstName: "Fatima",
      lastName: "Al-Rashid",
      birthDate: "2007-11-28", 
      personalNumber: "200711-2345",
      studyPath: "Samhällsvetenskap",
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium B",
      status: "active",
      enrollmentDate: "2023-08-15"
    },
    {
      id: 3,
      firstName: "Erik",
      lastName: "Lindqvist",
      birthDate: "2005-08-22",
      personalNumber: "200508-3456", 
      studyPath: "Teknik",
      schoolYear: "3",
      schoolUnit: "Municipal Technical School",
      status: "active",
      enrollmentDate: "2022-08-15"
    },
    {
      id: 5, // Protected student
      firstName: "Maria",
      lastName: "Svensson",
      birthDate: "2007-12-03",
      personalNumber: "200712-0345",
      studyPath: "Ekonomi", 
      schoolYear: "2",
      schoolUnit: "Municipal Gymnasium C",
      status: "active",
      enrollmentDate: "2023-08-15"
    }
  ];

  const filteredStudents = municipalStudents.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.personalNumber.includes(searchTerm) ||
    student.schoolUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "inactive": 
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Municipal Students</h1>
          <p className="text-ike-neutral mt-2">
            Students enrolled in municipal schools
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Municipal Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{municipalStudents.length}</div>
            <p className="text-xs text-ike-neutral">In municipal schools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{municipalStudents.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-ike-neutral">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Protected Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{municipalStudents.filter(s => privacyService.isStudentProtected(s.id)).length}</div>
            <p className="text-xs text-ike-neutral">Privacy protected</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Search className="w-5 h-5 mr-2 text-ike-primary" />
            Search Municipal Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, personal number, or school..."
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

      {/* Municipal Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            Municipal Students List
          </CardTitle>
          <CardDescription>Students enrolled in municipal schools</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Personal Number</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Study Path</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>School Unit</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const isProtected = privacyService.isStudentProtected(student.id);
                const privacyMark = privacyService.getPrivacyMark(student.id);
                
                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isProtected ? (
                          <ProtectedDataDisplay 
                            studentId={student.id}
                            field="displayName"
                            fallbackValue={`${student.firstName} ${student.lastName}`}
                            userRole="principal"
                            showPrivacyIndicator={true}
                          />
                        ) : (
                          <span>{student.firstName} {student.lastName}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {isProtected ? (
                        <ProtectedDataDisplay 
                          studentId={student.id}
                          field="personalNumber"
                          fallbackValue={student.personalNumber}
                          userRole="principal"
                          showPrivacyIndicator={false}
                        />
                      ) : (
                        student.personalNumber
                      )}
                    </TableCell>
                    <TableCell>
                      {isProtected ? (
                        <ProtectedDataDisplay 
                          studentId={student.id}
                          field="birthDate"
                          fallbackValue={student.birthDate}
                          userRole="principal"
                          showPrivacyIndicator={false}
                        />
                      ) : (
                        student.birthDate
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span>{student.studyPath}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.schoolYear}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-ike-neutral" />
                        <span>{student.schoolUnit}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(student.status)}
                        {isProtected && privacyMark && (
                          <PrivacyIndicator privacyMark={privacyMark} showDetails={false} />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MunicipalStudents;
