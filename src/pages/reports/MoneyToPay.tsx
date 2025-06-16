
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  DollarSign, 
  Search, 
  Download, 
  Calendar, 
  Filter,
  User,
  Building,
  Euro,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const MoneyToPay = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const payableData = [
    {
      id: 1,
      studentName: "Anna Karlsson",
      studentId: "20050312-1234",
      studyingAt: "Malmö Gymnasium",
      schoolMunicipality: "Malmö",
      program: "Naturvetenskap",
      period: "2024-09",
      amount: 12450
    },
    {
      id: 2,
      studentName: "Erik Lindström",
      studentId: "20040715-5678",
      studyingAt: "Lund Technical College",
      schoolMunicipality: "Lund",
      program: "Teknik",
      period: "2024-09",
      amount: 13200
    },
    {
      id: 3,
      studentName: "Maria Andersson",
      studentId: "20051022-9012",
      studyingAt: "Helsingborg Arts School",
      schoolMunicipality: "Helsingborg",
      program: "Estetiska",
      period: "2024-09",
      amount: 11800
    }
  ];

  // Filter data based on search term
  const filteredData = payableData.filter(item => 
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentId.includes(searchTerm) ||
    item.studyingAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.schoolMunicipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayable = filteredData.reduce((sum, item) => sum + item.amount, 0);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Money to Pay report has been exported successfully",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering options have been applied to the report",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Money to Pay</h1>
          <p className="text-ike-neutral mt-2">
            Reports for municipal students studying at external schools
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={handleFilter}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={handleExportReport}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Municipal Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{filteredData.length}</div>
            <p className="text-xs text-ike-neutral">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Payable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">{totalPayable.toLocaleString()} SEK</div>
            <p className="text-xs text-ike-neutral">September 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
          <Input
            placeholder="Search students..."
            className="pl-10 border-ike-primary/20 focus:border-ike-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          September 2024
        </Button>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Municipal Students at External Schools
          </CardTitle>
          <CardDescription>
            Students from your municipality studying at schools in other municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>School</TableHead>
                <TableHead>School Municipality</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-ike-primary/10 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-ike-primary" />
                      </div>
                      <span className="font-medium text-ike-neutral-dark">{item.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-ike-neutral">{item.studentId}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-ike-neutral" />
                      <span>{item.studyingAt}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-ike-neutral">{item.schoolMunicipality}</TableCell>
                  <TableCell>{item.program}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-ike-error font-medium">
                      <Euro className="w-4 h-4 mr-1" />
                      {item.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-200 shadow-md z-50">
                        <DropdownMenuItem 
                          onClick={() => handleViewDetails(item)}
                          className="cursor-pointer hover:bg-ike-primary/10"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
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

      {/* Student Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-white max-w-2xl border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedStudent?.studentName}
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Student Name</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Student ID</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.studyingAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.schoolMunicipality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Program</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Period</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Amount</label>
                  <p className="text-ike-error font-medium">{selectedStudent.amount.toLocaleString()} SEK</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailModalOpen(false)} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoneyToPay;
