
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  Search, 
  Download, 
  Calendar, 
  Filter,
  User,
  Building,
  Euro
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MoneyToReceive = () => {
  const { t } = useLanguage();

  const receivableData = [
    {
      id: 1,
      studentName: "Anna Karlsson",
      studentId: "20050312-1234",
      studyingAt: "Malmö Gymnasium",
      program: "Naturvetenskap",
      period: "2024-09",
      amount: 12450,
      status: "Pending"
    },
    {
      id: 2,
      studentName: "Erik Lindström",
      studentId: "20040715-5678",
      studyingAt: "Lund Technical College",
      program: "Teknik",
      period: "2024-09",
      amount: 13200,
      status: "Confirmed"
    },
    {
      id: 3,
      studentName: "Maria Andersson",
      studentId: "20051022-9012",
      studyingAt: "Helsingborg Arts School",
      program: "Estetiska",
      period: "2024-09",
      amount: 11800,
      status: "Pending"
    }
  ];

  const totalReceivable = receivableData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Money to Receive</h1>
          <p className="text-ike-neutral mt-2">
            Reports for municipal students studying at external schools
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{receivableData.length}</div>
            <p className="text-xs text-ike-neutral">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{totalReceivable.toLocaleString()} SEK</div>
            <p className="text-xs text-ike-neutral">September 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">1</div>
            <p className="text-xs text-ike-neutral">Ready for payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">2</div>
            <p className="text-xs text-ike-neutral">Awaiting confirmation</p>
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
                <TableHead>Program</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
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
                      <span>{item.studyingAt}</span>
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
                    <Badge 
                      variant={item.status === "Confirmed" ? "default" : "secondary"}
                      className={item.status === "Confirmed" ? "bg-ike-success text-white" : "bg-ike-warning text-white"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoneyToReceive;
