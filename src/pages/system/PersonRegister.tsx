
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Shield,
  Database
} from "lucide-react";

interface Person {
  id: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    municipality: string;
  };
  contact: {
    phone?: string;
    email?: string;
  };
  hasSystemUser: boolean;
  lastUpdated: string;
  source: 'manual' | 'tax-agency' | 'population-registry';
  status: 'active' | 'inactive' | 'protected';
}

const mockPersons: Person[] = [
  {
    id: "1",
    personalNumber: "19850315-1234",
    firstName: "Anna",
    lastName: "Andersson",
    dateOfBirth: "1985-03-15",
    address: {
      street: "Kungsgatan 12",
      city: "Stockholm",
      postalCode: "11143",
      municipality: "Stockholm"
    },
    contact: {
      phone: "+46701234567",
      email: "anna.andersson@email.com"
    },
    hasSystemUser: true,
    lastUpdated: "2024-01-15",
    source: "tax-agency",
    status: "active"
  },
  {
    id: "2",
    personalNumber: "19920708-5678",
    firstName: "Erik",
    lastName: "Johansson",
    dateOfBirth: "1992-07-08",
    address: {
      street: "Storgatan 25",
      city: "Göteborg",
      postalCode: "41125",
      municipality: "Göteborg"
    },
    contact: {
      phone: "+46709876543"
    },
    hasSystemUser: false,
    lastUpdated: "2024-01-10",
    source: "population-registry",
    status: "active"
  },
  {
    id: "3",
    personalNumber: "19780922-9012",
    firstName: "Maria",
    lastName: "Larsson",
    dateOfBirth: "1978-09-22",
    address: {
      street: "Parkvägen 8",
      city: "Malmö",
      postalCode: "21115",
      municipality: "Malmö"
    },
    contact: {
      email: "maria.larsson@email.com"
    },
    hasSystemUser: true,
    lastUpdated: "2024-01-08",
    source: "manual",
    status: "protected"
  }
];

export default function PersonRegister() {
  const [persons, setPersons] = useState<Person[]>(mockPersons);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showPersonDialog, setShowPersonDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);

  const filteredPersons = persons.filter(person => {
    const matchesSearch = 
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.personalNumber.includes(searchTerm) ||
      person.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || person.status === statusFilter;
    const matchesSource = sourceFilter === "all" || person.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusBadge = (status: Person['status']) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      protected: "bg-red-100 text-red-800 border-red-200"
    };
    return variants[status] || variants.active;
  };

  const getSourceBadge = (source: Person['source']) => {
    const variants = {
      manual: "bg-blue-100 text-blue-800 border-blue-200",
      'tax-agency': "bg-purple-100 text-purple-800 border-purple-200",
      'population-registry': "bg-orange-100 text-orange-800 border-orange-200"
    };
    return variants[source] || variants.manual;
  };

  const handleViewPerson = (person: Person) => {
    setSelectedPerson(person);
    setShowPersonDialog(true);
  };

  const handleEditPerson = (person: Person) => {
    setEditingPerson(person);
    setShowEditDialog(true);
  };

  const handleDeletePerson = (person: Person) => {
    setPersonToDelete(person);
    setShowDeleteDialog(true);
  };

  const confirmDeletePerson = () => {
    if (personToDelete) {
      setPersons(prev => prev.filter(p => p.id !== personToDelete.id));
      setPersonToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleAddPerson = () => {
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ike-neutral-dark">Person Register</h1>
          <p className="text-ike-neutral mt-1">
            Central registry for all persons in the system
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            className="bg-ike-primary hover:bg-ike-primary-dark"
            onClick={handleAddPerson}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Person
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-ike-primary" />
              <div>
                <p className="text-sm text-ike-neutral">Total Persons</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">{persons.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-ike-neutral">Active</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {persons.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-ike-neutral">Protected</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {persons.filter(p => p.status === 'protected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-ike-neutral">With System User</p>
                <p className="text-xl font-semibold text-ike-neutral-dark">
                  {persons.filter(p => p.hasSystemUser).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ike-neutral w-4 h-4" />
              <Input
                placeholder="Search by name, personal number, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="protected">Protected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="tax-agency">Tax Agency</SelectItem>
                <SelectItem value="population-registry">Population Registry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Person Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Persons ({filteredPersons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personal Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>System User</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersons.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-mono text-sm">
                      {person.personalNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {person.firstName} {person.lastName}
                        </div>
                        <div className="text-sm text-ike-neutral">
                          Born: {person.dateOfBirth}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{person.address.street}</div>
                        <div className="text-ike-neutral">
                          {person.address.postalCode} {person.address.city}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        {person.contact.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {person.contact.phone}
                          </div>
                        )}
                        {person.contact.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {person.contact.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(person.status)}>
                        {person.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSourceBadge(person.source)}>
                        {person.source.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={person.hasSystemUser ? "default" : "outline"}>
                        {person.hasSystemUser ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {person.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPerson(person)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPerson(person)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeletePerson(person)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Person Details Sheet */}
      <Sheet open={showPersonDialog} onOpenChange={setShowPersonDialog}>
        <SheetContent className="sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Person Details</SheetTitle>
            <SheetDescription>
              Complete information for this person
            </SheetDescription>
          </SheetHeader>
          {selectedPerson && (
            <div className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedPerson.firstName} {selectedPerson.lastName}</p>
                    <p><span className="font-medium">Personal Number:</span> {selectedPerson.personalNumber}</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span className="font-medium">Date of Birth:</span> {selectedPerson.dateOfBirth}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Status & Source
                  </h3>
                  <div className="space-y-2">
                    <Badge className={getStatusBadge(selectedPerson.status)}>
                      {selectedPerson.status}
                    </Badge>
                    <Badge className={getSourceBadge(selectedPerson.source)}>
                      {selectedPerson.source.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address Information
                </h3>
                <div className="text-sm space-y-1">
                  <p>{selectedPerson.address.street}</p>
                  <p>{selectedPerson.address.postalCode} {selectedPerson.address.city}</p>
                  <p>{selectedPerson.address.municipality} Municipality</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark">Contact Information</h3>
                <div className="text-sm space-y-1">
                  {selectedPerson.contact.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedPerson.contact.phone}
                    </p>
                  )}
                  {selectedPerson.contact.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedPerson.contact.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  System Information
                </h3>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Has System User:</span> {selectedPerson.hasSystemUser ? "Yes" : "No"}</p>
                  <p><span className="font-medium">Last Updated:</span> {selectedPerson.lastUpdated}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Person Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Person</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input placeholder="Enter last name" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Personal Number</label>
              <Input placeholder="YYYYMMDD-XXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <Input placeholder="Enter street address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <Input placeholder="Enter postal code" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input placeholder="Enter city" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-ike-primary hover:bg-ike-primary-dark">
                Add Person
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Person Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Person</DialogTitle>
          </DialogHeader>
          {editingPerson && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input defaultValue={editingPerson.firstName} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input defaultValue={editingPerson.lastName} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Personal Number</label>
                <Input defaultValue={editingPerson.personalNumber} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" defaultValue={editingPerson.contact.email} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input defaultValue={editingPerson.contact.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <Input defaultValue={editingPerson.address.street} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <Input defaultValue={editingPerson.address.postalCode} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input defaultValue={editingPerson.address.city} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-ike-primary hover:bg-ike-primary-dark">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Person</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this person? This action cannot be undone.
              {personToDelete && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <strong>{personToDelete.firstName} {personToDelete.lastName}</strong> ({personToDelete.personalNumber})
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeletePerson}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
