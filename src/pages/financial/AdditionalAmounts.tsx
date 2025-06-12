
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
import { DollarSign, Search, Plus, Edit, User, School } from "lucide-react";

const AdditionalAmounts = () => {
  const additionalAmounts = [
    {
      id: 1,
      type: "Student",
      name: "Anna Andersson",
      school: "Malmö Gymnasium",
      program: "Naturvetenskapsprogrammet",
      amount: 5000,
      reason: "Special needs support",
      status: "active",
      validFrom: "2024-01-15",
      validTo: "2024-06-30"
    },
    {
      id: 2,
      type: "School",
      name: "Malmö Technical School",
      school: "Malmö Technical School",
      program: "All programs",
      amount: -2000,
      reason: "Administrative efficiency discount",
      status: "active",
      validFrom: "2024-07-01",
      validTo: "2025-06-30"
    },
    {
      id: 3,
      type: "Student",
      name: "Erik Eriksson",
      school: "Lund High School",
      program: "Teknikprogrammet",
      amount: 3000,
      reason: "Transport allowance",
      status: "pending",
      validFrom: "2024-02-01",
      validTo: "2024-12-31"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "expired":
        return <Badge className="bg-ike-error text-white">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAmountDisplay = (amount: number) => {
    const isDeduction = amount < 0;
    return (
      <span className={isDeduction ? "text-ike-error" : "text-ike-success"}>
        {isDeduction ? "-" : "+"}{Math.abs(amount).toLocaleString('sv-SE')} SEK
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Additional Amounts</h1>
          <p className="text-ike-neutral mt-2">
            Manage additional amounts and deductions for students or schools
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Amount
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Additional Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">+125,000 SEK</div>
            <div className="text-xs text-ike-neutral">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Deductions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-error">-35,000 SEK</div>
            <div className="text-xs text-ike-neutral">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">47</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Amounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Additional Amounts & Deductions
          </CardTitle>
          <CardDescription>
            Manage special amounts for students and schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by student name, school, or reason..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Name/School</TableHead>
                  <TableHead className="font-medium">Program</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Reason</TableHead>
                  <TableHead className="font-medium">Valid Period</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalAmounts.map((amount) => (
                  <TableRow key={amount.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell>
                      <div className="flex items-center">
                        {amount.type === "Student" ? (
                          <User className="w-4 h-4 mr-2 text-ike-primary" />
                        ) : (
                          <School className="w-4 h-4 mr-2 text-ike-primary" />
                        )}
                        {amount.type}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-ike-neutral-dark">
                      {amount.name}
                    </TableCell>
                    <TableCell>{amount.program}</TableCell>
                    <TableCell className="font-medium">
                      {getAmountDisplay(amount.amount)}
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={amount.reason}>
                      {amount.reason}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{amount.validFrom}</div>
                        <div className="text-ike-neutral">to {amount.validTo}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(amount.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" className="text-ike-neutral hover:text-ike-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalAmounts;
