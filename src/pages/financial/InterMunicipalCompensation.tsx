
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
import { ArrowUpDown, DollarSign, TrendingUp, CheckCircle, Clock, FileText } from "lucide-react";

const InterMunicipalCompensation = () => {
  const compensationData = [
    {
      id: 1,
      municipality: "Lund",
      type: "Outgoing",
      students: 45,
      totalAmount: 5625000,
      avgPerStudent: 125000,
      status: "confirmed",
      period: "2024-11",
      dueDate: "2024-12-15"
    },
    {
      id: 2,
      municipality: "Helsingborg",
      type: "Incoming",
      students: 32,
      totalAmount: 4032000,
      avgPerStudent: 126000,
      status: "pending",
      period: "2024-11",
      dueDate: "2024-12-10"
    },
    {
      id: 3,
      municipality: "Kristianstad",
      type: "Outgoing",
      students: 18,
      totalAmount: 2268000,
      avgPerStudent: 126000,
      status: "paid",
      period: "2024-11",
      dueDate: "2024-12-05"
    },
    {
      id: 4,
      municipality: "Landskrona",
      type: "Incoming",
      students: 12,
      totalAmount: 1512000,
      avgPerStudent: 126000,
      status: "confirmed",
      period: "2024-11",
      dueDate: "2024-12-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-ike-success text-white">Paid</Badge>;
      case "confirmed":
        return <Badge className="bg-ike-primary text-white">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-ike-error text-white">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-ike-success" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-ike-primary" />;
      case "pending":
        return <Clock className="w-4 h-4 text-ike-warning" />;
      default:
        return <Clock className="w-4 h-4 text-ike-neutral" />;
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Incoming" ? "text-ike-success" : "text-ike-error";
  };

  const totalIncoming = compensationData
    .filter(item => item.type === "Incoming")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const totalOutgoing = compensationData
    .filter(item => item.type === "Outgoing")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const netBalance = totalIncoming - totalOutgoing;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Inter-Municipal Compensation</h1>
          <p className="text-ike-neutral mt-2">
            Track payments between municipalities for student placements
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Process Payments
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Incoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">
              {totalIncoming.toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">From other municipalities</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Outgoing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">
              {totalOutgoing.toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">To other municipalities</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Net Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-ike-success' : 'text-ike-error'}`}>
              {netBalance >= 0 ? '+' : ''}{netBalance.toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">Current period</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="text-xs text-ike-neutral">Awaiting confirmation</div>
          </CardContent>
        </Card>
      </div>

      {/* Compensation Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
            Inter-Municipal Compensation Tracking
          </CardTitle>
          <CardDescription>
            Monitor incoming and outgoing compensation for student placements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Municipality</TableHead>
                <TableHead className="font-medium">Type</TableHead>
                <TableHead className="font-medium">Students</TableHead>
                <TableHead className="font-medium text-right">Total Amount</TableHead>
                <TableHead className="font-medium text-right">Per Student</TableHead>
                <TableHead className="font-medium">Period</TableHead>
                <TableHead className="font-medium">Due Date</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compensationData.map((item) => (
                <TableRow key={item.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {item.municipality}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={getTypeColor(item.type)}>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.students}</TableCell>
                  <TableCell className={`text-right font-medium ${getTypeColor(item.type)}`}>
                    {item.type === "Incoming" ? "+" : "-"}{item.totalAmount.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell className="text-right">
                    {item.avgPerStudent.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Monthly Trends
            </CardTitle>
            <CardDescription>
              Compensation trends over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Compensation Chart</p>
                <p className="text-sm">(Monthly trends visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Payment Schedule</CardTitle>
            <CardDescription>
              Upcoming payment deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 border-l-ike-error bg-ike-error/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Payment Due</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Helsingborg - 4,032,000 SEK due December 10, 2024
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-warning bg-ike-warning/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Pending Confirmation</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Lund - 5,625,000 SEK due December 15, 2024
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-success bg-ike-success/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Incoming Payment</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Landskrona - 1,512,000 SEK due December 20, 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterMunicipalCompensation;
