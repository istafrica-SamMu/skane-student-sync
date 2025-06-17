import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Plus, Search, MoreHorizontal, Edit, Trash2, Calendar, CreditCard, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PrincipalManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPrincipalOpen, setIsAddPrincipalOpen] = useState(false);
  const [isEditPrincipalOpen, setIsEditPrincipalOpen] = useState(false);
  const [selectedPrincipal, setSelectedPrincipal] = useState(null);
  const [deletePrincipalId, setDeletePrincipalId] = useState(null);
  
  const [principals, setPrincipals] = useState([
    {
      id: 1,
      name: "Malmö International School AB",
      organizationNumber: "556789-1234",
      bankgiro: "123-4567",
      postgiro: "890 123-4",
      groupAffiliation: "Education Malmö Group",
      connectedSchoolUnits: 3,
      startDate: "2023-01-01",
      endDate: null,
      contactPerson: "Anna Andersson",
      address: "Storgatan 12, 211 34 Malmö",
      municipalityCode: "1280",
      municipalityName: "Malmö",
      status: "Active"
    },
    {
      id: 2,
      name: "Lund Science Academy AB",
      organizationNumber: "556789-5678",
      bankgiro: "567-8901",
      postgiro: "234 567-8",
      groupAffiliation: "Lund Education Holdings",
      connectedSchoolUnits: 2,
      startDate: "2022-08-15",
      endDate: null,
      contactPerson: "Erik Johansson",
      address: "Vetenskapsgatan 5, 223 62 Lund",
      municipalityCode: "1281",
      municipalityName: "Lund",
      status: "Active"
    }
  ]);

  const [newPrincipal, setNewPrincipal] = useState({
    name: "",
    organizationNumber: "",
    bankgiro: "",
    postgiro: "",
    groupAffiliation: "",
    startDate: "",
    endDate: "",
    contactPerson: "",
    address: "",
    municipalityCode: "",
    municipalityName: ""
  });

  const groups = ["Education Malmö Group", "Lund Education Holdings", "Independent"];

  const filteredPrincipals = principals.filter(principal =>
    principal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.organizationNumber.includes(searchTerm) ||
    principal.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrincipal = () => {
    const principalToAdd = {
      ...newPrincipal,
      id: principals.length + 1,
      connectedSchoolUnits: 0,
      status: "Active"
    };
    setPrincipals([...principals, principalToAdd]);
    setNewPrincipal({
      name: "",
      organizationNumber: "",
      bankgiro: "",
      postgiro: "",
      groupAffiliation: "",
      startDate: "",
      endDate: "",
      contactPerson: "",
      address: "",
      municipalityCode: "",
      municipalityName: ""
    });
    setIsAddPrincipalOpen(false);
    toast({
      title: "Principal Added",
      description: `${newPrincipal.name} has been successfully added.`,
    });
  };

  const handleEditPrincipal = (principal) => {
    setSelectedPrincipal(principal);
    setIsEditPrincipalOpen(true);
  };

  const handleUpdatePrincipal = () => {
    setPrincipals(principals.map(principal => 
      principal.id === selectedPrincipal.id ? selectedPrincipal : principal
    ));
    setIsEditPrincipalOpen(false);
    setSelectedPrincipal(null);
    toast({
      title: "Principal Updated",
      description: `${selectedPrincipal.name} has been successfully updated.`,
    });
  };

  const handleDeletePrincipal = () => {
    setPrincipals(principals.filter(principal => principal.id !== deletePrincipalId));
    setDeletePrincipalId(null);
    toast({
      title: "Principal Deleted",
      description: "The principal has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Principal Management</h1>
          <p className="text-ike-neutral">Manage educational principals and their school units</p>
        </div>
        <Dialog open={isAddPrincipalOpen} onOpenChange={setIsAddPrincipalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Principal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Principal</DialogTitle>
              <DialogDescription>
                Enter the details for the new educational principal
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label htmlFor="principalName">Principal Name</Label>
                <Input
                  id="principalName"
                  value={newPrincipal.name}
                  onChange={(e) => setNewPrincipal({...newPrincipal, name: e.target.value})}
                  placeholder="Enter principal name"
                />
              </div>
              <div>
                <Label htmlFor="orgNumber">Organization Number</Label>
                <Input
                  id="orgNumber"
                  value={newPrincipal.organizationNumber}
                  onChange={(e) => setNewPrincipal({...newPrincipal, organizationNumber: e.target.value})}
                  placeholder="556123-4567"
                />
              </div>
              <div>
                <Label htmlFor="groupAffiliation">Group Affiliation</Label>
                <Select value={newPrincipal.groupAffiliation} onValueChange={(value) => setNewPrincipal({...newPrincipal, groupAffiliation: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bankgiro">Bankgiro Number</Label>
                <Input
                  id="bankgiro"
                  value={newPrincipal.bankgiro}
                  onChange={(e) => setNewPrincipal({...newPrincipal, bankgiro: e.target.value})}
                  placeholder="123-4567"
                />
              </div>
              <div>
                <Label htmlFor="postgiro">Postgiro Number</Label>
                <Input
                  id="postgiro"
                  value={newPrincipal.postgiro}
                  onChange={(e) => setNewPrincipal({...newPrincipal, postgiro: e.target.value})}
                  placeholder="890 123-4"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newPrincipal.startDate}
                  onChange={(e) => setNewPrincipal({...newPrincipal, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newPrincipal.endDate}
                  onChange={(e) => setNewPrincipal({...newPrincipal, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newPrincipal.contactPerson}
                  onChange={(e) => setNewPrincipal({...newPrincipal, contactPerson: e.target.value})}
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <Label htmlFor="municipalityCode">Municipality Code</Label>
                <Input
                  id="municipalityCode"
                  value={newPrincipal.municipalityCode}
                  onChange={(e) => setNewPrincipal({...newPrincipal, municipalityCode: e.target.value})}
                  placeholder="1280"
                />
              </div>
              <div>
                <Label htmlFor="municipalityName">Municipality Name</Label>
                <Input
                  id="municipalityName"
                  value={newPrincipal.municipalityName}
                  onChange={(e) => setNewPrincipal({...newPrincipal, municipalityName: e.target.value})}
                  placeholder="Malmö"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newPrincipal.address}
                  onChange={(e) => setNewPrincipal({...newPrincipal, address: e.target.value})}
                  placeholder="Street address, postal code, city"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPrincipalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPrincipal} className="bg-ike-primary hover:bg-ike-primary/90">
                Add Principal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-ike-primary" />
            Educational Principals
          </CardTitle>
          <CardDescription>
            Manage principals and their connected school units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search principals..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Principal Name</TableHead>
                <TableHead>Organization Number</TableHead>
                <TableHead>Group Affiliation</TableHead>
                <TableHead>Payment Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Connected Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrincipals.map((principal) => (
                <TableRow key={principal.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-ike-neutral" />
                      <div>
                        <div className="font-medium">{principal.name}</div>
                        <div className="text-sm text-ike-neutral">{principal.contactPerson}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{principal.organizationNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{principal.groupAffiliation}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-ike-neutral" />
                      <div className="text-sm">
                        <div>BG: {principal.bankgiro}</div>
                        <div>PG: {principal.postgiro}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-ike-neutral" />
                      <div className="text-sm">
                        <div>{principal.municipalityName}</div>
                        <div className="text-ike-neutral">Code: {principal.municipalityCode}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{principal.connectedSchoolUnits} units</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {principal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                        <DropdownMenuItem onClick={() => handleEditPrincipal(principal)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeletePrincipalId(principal.id)} 
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
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

      {/* Edit Principal Dialog */}
      <Dialog open={isEditPrincipalOpen} onOpenChange={setIsEditPrincipalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Principal</DialogTitle>
            <DialogDescription>
              Update the principal information
            </DialogDescription>
          </DialogHeader>
          {selectedPrincipal && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label htmlFor="editPrincipalName">Principal Name</Label>
                <Input
                  id="editPrincipalName"
                  value={selectedPrincipal.name}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editOrgNumber">Organization Number</Label>
                <Input
                  id="editOrgNumber"
                  value={selectedPrincipal.organizationNumber}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, organizationNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editGroupAffiliation">Group Affiliation</Label>
                <Select value={selectedPrincipal.groupAffiliation} onValueChange={(value) => setSelectedPrincipal({...selectedPrincipal, groupAffiliation: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editBankgiro">Bankgiro Number</Label>
                <Input
                  id="editBankgiro"
                  value={selectedPrincipal.bankgiro}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, bankgiro: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPostgiro">Postgiro Number</Label>
                <Input
                  id="editPostgiro"
                  value={selectedPrincipal.postgiro}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, postgiro: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editStartDate">Start Date</Label>
                <Input
                  id="editStartDate"
                  type="date"
                  value={selectedPrincipal.startDate}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editEndDate">End Date (Optional)</Label>
                <Input
                  id="editEndDate"
                  type="date"
                  value={selectedPrincipal.endDate || ""}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editContactPerson">Contact Person</Label>
                <Input
                  id="editContactPerson"
                  value={selectedPrincipal.contactPerson}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editMunicipalityCode">Municipality Code</Label>
                <Input
                  id="editMunicipalityCode"
                  value={selectedPrincipal.municipalityCode}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, municipalityCode: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editMunicipalityName">Municipality Name</Label>
                <Input
                  id="editMunicipalityName"
                  value={selectedPrincipal.municipalityName}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, municipalityName: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="editAddress">Address</Label>
                <Input
                  id="editAddress"
                  value={selectedPrincipal.address}
                  onChange={(e) => setSelectedPrincipal({...selectedPrincipal, address: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPrincipalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePrincipal} className="bg-ike-primary hover:bg-ike-primary/90">
              Update Principal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePrincipalId} onOpenChange={() => setDeletePrincipalId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the principal and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePrincipal} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PrincipalManagement;
