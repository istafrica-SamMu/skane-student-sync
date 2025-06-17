
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
import { Building2, Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GroupManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [deleteGroupId, setDeleteGroupId] = useState(null);
  
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Education Malmö Group",
      organizationNumber: "556123-4567",
      municipalityCode: "1280",
      municipalityName: "Malmö",
      startDate: "2023-01-01",
      endDate: null,
      linkedPrincipals: 5,
      linkedSchoolUnits: 12,
      contactPerson: "Anna Svensson",
      address: "Stortorget 1, 211 34 Malmö",
      status: "Active"
    },
    {
      id: 2,
      name: "Lund Education Holdings",
      organizationNumber: "556789-0123",
      municipalityCode: "1281",
      municipalityName: "Lund",
      startDate: "2022-08-15",
      endDate: null,
      linkedPrincipals: 3,
      linkedSchoolUnits: 8,
      contactPerson: "Erik Johansson",
      address: "Kyrkogatan 5, 222 22 Lund",
      status: "Active"
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    organizationNumber: "",
    municipalityCode: "",
    municipalityName: "",
    startDate: "",
    endDate: "",
    contactPerson: "",
    address: ""
  });

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.organizationNumber.includes(searchTerm) ||
    group.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGroup = () => {
    const groupToAdd = {
      ...newGroup,
      id: groups.length + 1,
      linkedPrincipals: 0,
      linkedSchoolUnits: 0,
      status: "Active"
    };
    setGroups([...groups, groupToAdd]);
    setNewGroup({
      name: "",
      organizationNumber: "",
      municipalityCode: "",
      municipalityName: "",
      startDate: "",
      endDate: "",
      contactPerson: "",
      address: ""
    });
    setIsAddGroupOpen(false);
    toast({
      title: "Group Added",
      description: `${newGroup.name} has been successfully added.`,
    });
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setIsEditGroupOpen(true);
  };

  const handleUpdateGroup = () => {
    setGroups(groups.map(group => 
      group.id === selectedGroup.id ? selectedGroup : group
    ));
    setIsEditGroupOpen(false);
    setSelectedGroup(null);
    toast({
      title: "Group Updated",
      description: `${selectedGroup.name} has been successfully updated.`,
    });
  };

  const handleDeleteGroup = () => {
    setGroups(groups.filter(group => group.id !== deleteGroupId));
    setDeleteGroupId(null);
    toast({
      title: "Group Deleted",
      description: "The group has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Group Management</h1>
          <p className="text-ike-neutral">Manage parent companies and their educational subsidiaries</p>
        </div>
        <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ike-primary hover:bg-ike-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>
                Enter the details for the new educational group
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <Label htmlFor="orgNumber">Organization Number</Label>
                <Input
                  id="orgNumber"
                  value={newGroup.organizationNumber}
                  onChange={(e) => setNewGroup({...newGroup, organizationNumber: e.target.value})}
                  placeholder="556123-4567"
                />
              </div>
              <div>
                <Label htmlFor="municipalityCode">Municipality Code</Label>
                <Input
                  id="municipalityCode"
                  value={newGroup.municipalityCode}
                  onChange={(e) => setNewGroup({...newGroup, municipalityCode: e.target.value})}
                  placeholder="1280"
                />
              </div>
              <div>
                <Label htmlFor="municipalityName">Municipality Name</Label>
                <Input
                  id="municipalityName"
                  value={newGroup.municipalityName}
                  onChange={(e) => setNewGroup({...newGroup, municipalityName: e.target.value})}
                  placeholder="Malmö"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newGroup.startDate}
                  onChange={(e) => setNewGroup({...newGroup, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newGroup.endDate}
                  onChange={(e) => setNewGroup({...newGroup, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={newGroup.contactPerson}
                  onChange={(e) => setNewGroup({...newGroup, contactPerson: e.target.value})}
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newGroup.address}
                  onChange={(e) => setNewGroup({...newGroup, address: e.target.value})}
                  placeholder="Street address, postal code, city"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGroupOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGroup} className="bg-ike-primary hover:bg-ike-primary/90">
                Add Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-ike-primary" />
            Educational Groups
          </CardTitle>
          <CardDescription>
            Manage parent companies and their linked principals and school units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search groups..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Organization Number</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Linked Units</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-ike-neutral" />
                      <div>
                        <div className="font-medium">{group.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{group.organizationNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{group.municipalityName}</div>
                      <div className="text-sm text-ike-neutral">Code: {group.municipalityCode}</div>
                    </div>
                  </TableCell>
                  <TableCell>{group.contactPerson}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-ike-neutral" />
                      <span className="text-sm">{group.startDate} - {group.endDate || 'Active'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{group.linkedPrincipals} principals</div>
                      <div>{group.linkedSchoolUnits} school units</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {group.status}
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
                        <DropdownMenuItem onClick={() => handleEditGroup(group)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteGroupId(group.id)} 
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

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Update the group information
            </DialogDescription>
          </DialogHeader>
          {selectedGroup && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="editGroupName">Group Name</Label>
                <Input
                  id="editGroupName"
                  value={selectedGroup.name}
                  onChange={(e) => setSelectedGroup({...selectedGroup, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editOrgNumber">Organization Number</Label>
                <Input
                  id="editOrgNumber"
                  value={selectedGroup.organizationNumber}
                  onChange={(e) => setSelectedGroup({...selectedGroup, organizationNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editMunicipalityCode">Municipality Code</Label>
                <Input
                  id="editMunicipalityCode"
                  value={selectedGroup.municipalityCode}
                  onChange={(e) => setSelectedGroup({...selectedGroup, municipalityCode: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editMunicipalityName">Municipality Name</Label>
                <Input
                  id="editMunicipalityName"
                  value={selectedGroup.municipalityName}
                  onChange={(e) => setSelectedGroup({...selectedGroup, municipalityName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editStartDate">Start Date</Label>
                <Input
                  id="editStartDate"
                  type="date"
                  value={selectedGroup.startDate}
                  onChange={(e) => setSelectedGroup({...selectedGroup, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editEndDate">End Date (Optional)</Label>
                <Input
                  id="editEndDate"
                  type="date"
                  value={selectedGroup.endDate || ""}
                  onChange={(e) => setSelectedGroup({...selectedGroup, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editContactPerson">Contact Person</Label>
                <Input
                  id="editContactPerson"
                  value={selectedGroup.contactPerson}
                  onChange={(e) => setSelectedGroup({...selectedGroup, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editAddress">Address</Label>
                <Input
                  id="editAddress"
                  value={selectedGroup.address}
                  onChange={(e) => setSelectedGroup({...selectedGroup, address: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGroupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGroup} className="bg-ike-primary hover:bg-ike-primary/90">
              Update Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteGroupId} onOpenChange={() => setDeleteGroupId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the group and remove all linked principals and school units.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGroup} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GroupManagement;
