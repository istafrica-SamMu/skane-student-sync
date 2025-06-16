
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TrendingUp, 
  Search, 
  Download, 
  Calendar, 
  Filter,
  User,
  Building,
  Euro,
  MoreHorizontal,
  Eye,
  FileText,
  Mail
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const MoneyToReceive = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const receivableData = [
    {
      id: 1,
      studentName: "Lisa Johansson",
      studentId: "20050201-3456",
      homeMunicipality: "Stockholm",
      program: "Samhällsvetenskap",
      period: "2024-09",
      amount: 11900,
      status: "Invoiced"
    },
    {
      id: 2,
      studentName: "Johan Svensson",
      studentId: "20040830-7890",
      homeMunicipality: "Göteborg",
      program: "Ekonomi",
      period: "2024-09",
      amount: 12650,
      status: "Confirmed"
    },
    {
      id: 3,
      studentName: "Sara Nilsson",
      studentId: "20051115-2345",
      homeMunicipality: "Malmö",
      program: "Naturvetenskap",
      period: "2024-09",
      amount: 13100,
      status: "Pending"
    }
  ];

  const totalReceivable = receivableData.reduce((sum, item) => sum + item.amount, 0);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleGenerateInvoice = (student) => {
    setSelectedStudent(student);
    setIsInvoiceModalOpen(true);
  };

  const handleSendReminder = (student) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${student.homeMunicipality} for ${student.studentName}`,
    });
  };

  const confirmGenerateInvoice = () => {
    toast({
      title: "Invoice Generated",
      description: `Invoice generated for ${selectedStudent?.studentName}`,
    });
    setIsInvoiceModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Money to Receive</h1>
          <p className="text-ike-neutral mt-2">
            Reports for external students studying in your municipality
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">External Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{receivableData.length}</div>
            <p className="text-xs text-ike-neutral">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Receivable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{totalReceivable.toLocaleString()} SEK</div>
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
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            External Students in Municipal Schools
          </CardTitle>
          <CardDescription>
            Students from other municipalities studying in your schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Home Municipality</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivableData.map((item) => (
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
                      <span>{item.homeMunicipality}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.program}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-ike-primary font-medium">
                      <Euro className="w-4 h-4 mr-1" />
                      {item.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white">
                        <DialogHeader>
                          <DialogTitle>Student Actions</DialogTitle>
                          <DialogDescription>
                            Choose an action for {item.studentName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3">
                          <Button 
                            onClick={() => handleViewDetails(item)}
                            variant="outline" 
                            className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button 
                            onClick={() => handleGenerateInvoice(item)}
                            variant="outline" 
                            className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Invoice
                          </Button>
                          <Button 
                            onClick={() => handleSendReminder(item)}
                            variant="outline" 
                            className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Payment Reminder
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-white max-w-2xl">
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
                  <label className="text-sm font-medium text-ike-neutral">Home Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedStudent.homeMunicipality}</p>
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
                  <p className="text-ike-primary font-medium">{selectedStudent.amount.toLocaleString()} SEK</p>
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

      {/* Invoice Generation Modal */}
      <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Generate Invoice</DialogTitle>
            <DialogDescription>
              Generate invoice for {selectedStudent?.studentName} from {selectedStudent?.homeMunicipality}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-ike-neutral">
              This will generate an invoice for <strong>{selectedStudent?.amount?.toLocaleString()} SEK</strong> 
              and send it to {selectedStudent?.homeMunicipality} municipality.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsInvoiceModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={confirmGenerateInvoice} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoneyToReceive;
