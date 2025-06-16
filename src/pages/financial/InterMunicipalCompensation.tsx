
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
import { ArrowUpDown, FileText, CheckCircle, Clock } from "lucide-react";

const InterMunicipalCompensation = () => {
  const compensationData = [
    {
      id: 1,
      municipality: "Lund",
      type: "Outgoing",
      students: 45,
      totalAmount: 5625000,
      period: "2024-11"
    },
    {
      id: 2,
      municipality: "Helsingborg",
      type: "Incoming",
      students: 32,
      totalAmount: 4032000,
      period: "2024-11"
    },
    {
      id: 3,
      municipality: "Kristianstad",
      type: "Outgoing",
      students: 18,
      totalAmount: 2268000,
      period: "2024-11"
    },
    {
      id: 4,
      municipality: "Landskrona",
      type: "Incoming",
      students: 12,
      totalAmount: 1512000,
      period: "2024-11"
    }
  ];

  const getStatusIcon = (type: string) => {
    return type === "Incoming" ? 
      <CheckCircle className="w-4 h-4 text-ike-success" /> : 
      <Clock className="w-4 h-4 text-ike-warning" />;
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

  const handleViewDetails = (municipalityName: string) => {
    console.log(`Viewing details for ${municipalityName}`);
    // This would open a detailed view modal or navigate to details page
  };

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
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Agreements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{compensationData.length}</div>
            <div className="text-xs text-ike-neutral">Current period</div>
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
                <TableHead className="font-medium">Period</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compensationData.map((item) => (
                <TableRow key={item.id} className="hover:bg-ike-neutral-light/50 transition-colors">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {item.municipality}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.type)}
                      <span className={getTypeColor(item.type)}>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.students}</TableCell>
                  <TableCell className={`text-right font-medium ${getTypeColor(item.type)}`}>
                    {item.type === "Incoming" ? "+" : "-"}{item.totalAmount.toLocaleString('sv-SE')} SEK
                  </TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-ike-neutral hover:text-ike-primary hover:bg-ike-primary/10 transition-colors"
                      onClick={() => handleViewDetails(item.municipality)}
                    >
                      Details
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

export default InterMunicipalCompensation;
