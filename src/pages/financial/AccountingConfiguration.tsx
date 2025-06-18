
import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Search, Edit, Trash2, Plus, FileSpreadsheet, Settings, Building, GraduationCap } from "lucide-react";
import type { AccountingString, AccountingStringFormData } from "@/types/accounting";
import AddAccountingStringModal from "@/components/modals/AddAccountingStringModal";
import EditAccountingStringModal from "@/components/modals/EditAccountingStringModal";

const AccountingConfiguration = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedString, setSelectedString] = useState<AccountingString | null>(null);

  const [accountingStrings, setAccountingStrings] = useState<AccountingString[]>([
    {
      id: "1",
      counterpartyId: "municipality-001",
      counterpartyName: "Malmö Kommun",
      priceCodeGroup: "university_prep",
      priceCodes: ["NA01", "NA02", "NA03"],
      schoolType: "upper_secondary",
      accountingCode: "3401.001",
      costCenter: "CC-EDU-001",
      project: "PROJ-2024-UNI",
      startDate: "2024-01-01",
      endDate: "",
      isActive: true,
      createdBy: "Finance Admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "2",
      counterpartyId: "municipality-002",
      counterpartyName: "Lund Kommun",
      priceCodeGroup: "vocational_prep",
      priceCodes: ["TE01", "TE02", "TE03"],
      schoolType: "upper_secondary",
      accountingCode: "3402.001",
      costCenter: "CC-EDU-002",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      isActive: false,
      createdBy: "Finance Admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-06-30T00:00:00Z"
    }
  ]);

  const filteredStrings = accountingStrings.filter(str =>
    str.counterpartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    str.accountingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    str.priceCodeGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    str.priceCodes.some(code => code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeStrings = accountingStrings.filter(str => str.isActive);
  const expiredStrings = accountingStrings.filter(str => !str.isActive);

  const handleAddString = (data: AccountingStringFormData) => {
    // Auto-expire existing strings for same counterparty and price code group
    const updatedStrings = accountingStrings.map(str => 
      str.counterpartyId === data.counterpartyId && 
      str.priceCodeGroup === data.priceCodeGroup &&
      str.isActive
        ? { ...str, endDate: new Date().toISOString().split('T')[0], isActive: false, updatedAt: new Date().toISOString() }
        : str
    );

    const newString: AccountingString = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      isActive: true,
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAccountingStrings([...updatedStrings, newString]);
    setIsAddModalOpen(false);
    
    toast({
      title: "Accounting String Created",
      description: `New accounting configuration added for ${data.counterpartyName}`,
    });
  };

  const handleEditString = (data: AccountingStringFormData) => {
    if (!selectedString) return;
    
    const updatedStrings = accountingStrings.map(str =>
      str.id === selectedString.id
        ? { ...str, ...data, updatedAt: new Date().toISOString() }
        : str
    );
    
    setAccountingStrings(updatedStrings);
    setIsEditModalOpen(false);
    setSelectedString(null);
    
    toast({
      title: "Accounting String Updated",
      description: `Updated accounting configuration for ${data.counterpartyName}`,
    });
  };

  const handleDeleteString = () => {
    if (!selectedString) return;
    
    const updatedStrings = accountingStrings.filter(str => str.id !== selectedString.id);
    setAccountingStrings(updatedStrings);
    setIsDeleteDialogOpen(false);
    setSelectedString(null);
    
    toast({
      title: "Accounting String Deleted",
      description: `Removed accounting configuration for ${selectedString.counterpartyName}`,
    });
  };

  const openEditModal = (accountingString: AccountingString) => {
    setSelectedString(accountingString);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (accountingString: AccountingString) => {
    setSelectedString(accountingString);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (accountingString: AccountingString) => {
    if (accountingString.isActive) {
      return <Badge className="bg-ike-success text-white">Active</Badge>;
    } else {
      return <Badge variant="secondary">Expired</Badge>;
    }
  };

  const getPriceCodeGroupLabel = (group: string) => {
    switch (group) {
      case "university_prep":
        return "University Preparatory";
      case "vocational_prep":
        return "Vocational Preparatory";
      case "introductory":
        return "Introductory Programs";
      case "individual":
        return "Individual Codes";
      default:
        return group;
    }
  };

  const getSchoolTypeIcon = (type: string) => {
    return type === "upper_secondary" ? 
      <GraduationCap className="w-4 h-4 mr-1 text-ike-primary" /> :
      <Building className="w-4 h-4 mr-1 text-ike-warning" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Accounting Configuration</h1>
          <p className="text-ike-neutral mt-2">
            Manage accounting strings per counterparty and price code groups
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className="border-ike-primary text-ike-primary hover:bg-ike-primary hover:text-white"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Accounting String
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{activeStrings.length}</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Expired Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{expiredStrings.length}</div>
            <div className="text-xs text-ike-neutral">Historical records</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{accountingStrings.length}</div>
            <div className="text-xs text-ike-neutral">All time</div>
          </CardContent>
        </Card>
      </div>

      {/* Accounting Strings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
            Accounting Strings
          </CardTitle>
          <CardDescription>
            Manage accounting configurations per counterparty and price code groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by counterparty, accounting code, or price codes..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Counterparty</TableHead>
                  <TableHead className="font-medium">Price Code Group</TableHead>
                  <TableHead className="font-medium">School Type</TableHead>
                  <TableHead className="font-medium">Accounting Code</TableHead>
                  <TableHead className="font-medium">Cost Center</TableHead>
                  <TableHead className="font-medium">Period</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStrings.map((accountingString) => (
                  <TableRow key={accountingString.id} className="hover:bg-ike-neutral-light/50">
                    <TableCell className="font-medium text-ike-neutral-dark">
                      <div>
                        <div>{accountingString.counterpartyName}</div>
                        <div className="text-xs text-ike-neutral">
                          Price Codes: {accountingString.priceCodes.join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getPriceCodeGroupLabel(accountingString.priceCodeGroup)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        {getSchoolTypeIcon(accountingString.schoolType)}
                        {accountingString.schoolType === "upper_secondary" ? "Upper Secondary" : "Adapted Upper Secondary"}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {accountingString.accountingCode}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {accountingString.costCenter}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>
                        <div>{accountingString.startDate}</div>
                        <div className="text-ike-neutral">
                          {accountingString.endDate ? `to ${accountingString.endDate}` : "Ongoing"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(accountingString)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-primary"
                          onClick={() => openEditModal(accountingString)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-error"
                          onClick={() => openDeleteDialog(accountingString)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddAccountingStringModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddString}
      />
      
      <EditAccountingStringModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedString(null);
        }}
        onSubmit={handleEditString}
        accountingString={selectedString}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Accounting String</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the accounting configuration for {selectedString?.counterpartyName}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteString}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountingConfiguration;
