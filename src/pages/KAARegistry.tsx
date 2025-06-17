
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from "@/components/ui/alert-dialog";
import { 
  UserPlus,
  Users,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface KAARecord {
  id: number;
  personalNumber: string;
  firstName: string;
  lastName: string;
  populationRegMunicipalityCode: string;
  populationRegMunicipalityName: string;
  registrationDate: string;
  deregistrationDate?: string;
  status: 'active' | 'inactive' | 'completed';
  category: string;
  notes?: string;
  schoolPlacements: SchoolPlacement[];
  measures: Measure[];
  contactOccasions: ContactOccasion[];
}

interface SchoolPlacement {
  id: number;
  schoolName: string;
  program: string;
  startDate: string;
  endDate?: string;
  status: string;
}

interface Measure {
  id: number;
  type: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface ContactOccasion {
  id: number;
  type: string;
  description: string;
  date: string;
  duration?: number;
  outcome?: string;
}

const municipalities = [
  { name: "Malmö kommun", code: "1280" },
  { name: "Lund kommun", code: "1281" },
  { name: "Helsingborg kommun", code: "1282" },
  { name: "Landskrona kommun", code: "1283" },
];

const kaaCategories = [
  "Arbetslös ungdom",
  "Studieavbrott",
  "Rehabilitering",
  "Arbetsmarknadsåtgärd",
  "Praktik",
  "Kompetensutveckling"
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-ike-primary text-white">Active</Badge>;
    case "inactive":
      return <Badge className="bg-ike-warning text-white">Inactive</Badge>;
    case "completed":
      return <Badge className="bg-ike-success text-white">Completed</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const KAARegistry = () => {
  const { toast } = useToast();
  const [kaaRecords, setKaaRecords] = useState<KAARecord[]>([
    {
      id: 1,
      personalNumber: "200501-1234",
      firstName: "Anna",
      lastName: "Svensson",
      populationRegMunicipalityCode: "1280",
      populationRegMunicipalityName: "Malmö kommun",
      registrationDate: "2024-01-15",
      status: "active",
      category: "Studieavbrott",
      notes: "Avbröt gymnasiestudier, behöver stöd för återgång till utbildning",
      schoolPlacements: [
        {
          id: 1,
          schoolName: "Malmö Gymnasium",
          program: "Naturvetenskapsprogrammet",
          startDate: "2023-08-15",
          endDate: "2024-01-10",
          status: "avbrutet"
        }
      ],
      measures: [
        {
          id: 1,
          type: "Studievägledning",
          description: "Vägledning för återgång till studier",
          startDate: "2024-01-20",
          status: "active"
        }
      ],
      contactOccasions: [
        {
          id: 1,
          type: "Telefon",
          description: "Första kontakt och behovsanalys",
          date: "2024-01-15",
          duration: 30,
          outcome: "Planering av åtgärder"
        }
      ]
    },
    {
      id: 2,
      personalNumber: "200403-5678",
      firstName: "Johan",
      lastName: "Andersson",
      populationRegMunicipalityCode: "1281",
      populationRegMunicipalityName: "Lund kommun",
      registrationDate: "2024-02-01",
      status: "active",
      category: "Arbetslös ungdom",
      schoolPlacements: [],
      measures: [
        {
          id: 2,
          type: "Praktik",
          description: "Praktikplats inom IT-sektorn",
          startDate: "2024-02-15",
          endDate: "2024-05-15",
          status: "active"
        }
      ],
      contactOccasions: [
        {
          id: 2,
          type: "Fysiskt möte",
          description: "Planering av praktikperiod",
          date: "2024-02-01",
          duration: 45,
          outcome: "Praktikplats identifierad"
        }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<KAARecord | null>(null);
  const [showRecordDetails, setShowRecordDetails] = useState(false);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<KAARecord | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<KAARecord, 'id' | 'schoolPlacements' | 'measures' | 'contactOccasions'>>({
    personalNumber: "",
    firstName: "",
    lastName: "",
    populationRegMunicipalityCode: "",
    populationRegMunicipalityName: "",
    registrationDate: "",
    deregistrationDate: "",
    status: "active",
    category: "",
    notes: ""
  });

  const filteredRecords = kaaRecords.filter(record => {
    const matchesSearch = 
      record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.personalNumber.includes(searchTerm) ||
      record.populationRegMunicipalityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || record.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewDetails = (record: KAARecord) => {
    setSelectedRecord(record);
    setShowRecordDetails(true);
  };

  const handleEdit = (record: KAARecord) => {
    setFormData({
      personalNumber: record.personalNumber,
      firstName: record.firstName,
      lastName: record.lastName,
      populationRegMunicipalityCode: record.populationRegMunicipalityCode,
      populationRegMunicipalityName: record.populationRegMunicipalityName,
      registrationDate: record.registrationDate,
      deregistrationDate: record.deregistrationDate || "",
      status: record.status,
      category: record.category,
      notes: record.notes || ""
    });
    setEditingRecord(record);
    setShowRecordForm(true);
  };

  const handleDelete = (id: number) => {
    setRecordToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (recordToDelete !== null) {
      setKaaRecords(kaaRecords.filter(r => r.id !== recordToDelete));
      toast({
        title: "KAA Record Deleted",
        description: "The KAA record has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setRecordToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recordData: KAARecord = {
      ...formData,
      id: editingRecord ? editingRecord.id : Date.now(),
      schoolPlacements: editingRecord?.schoolPlacements || [],
      measures: editingRecord?.measures || [],
      contactOccasions: editingRecord?.contactOccasions || []
    };

    if (editingRecord) {
      setKaaRecords(kaaRecords.map(r => r.id === editingRecord.id ? recordData : r));
      toast({
        title: "KAA Record Updated",
        description: `${recordData.firstName} ${recordData.lastName} has been updated successfully.`,
      });
    } else {
      setKaaRecords([...kaaRecords, recordData]);
      toast({
        title: "KAA Record Added",
        description: `${recordData.firstName} ${recordData.lastName} has been added successfully.`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      personalNumber: "",
      firstName: "",
      lastName: "",
      populationRegMunicipalityCode: "",
      populationRegMunicipalityName: "",
      registrationDate: "",
      deregistrationDate: "",
      status: "active",
      category: "",
      notes: ""
    });
    setEditingRecord(null);
    setShowRecordForm(false);
  };

  const handleMunicipalityChange = (value: string) => {
    const muni = municipalities.find((m) => m.name === value);
    setFormData((prev) => ({
      ...prev,
      populationRegMunicipalityName: value,
      populationRegMunicipalityCode: muni ? muni.code : "",
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">KAA Registry</h1>
          <p className="text-ike-neutral mt-2">
            Municipal Activity Responsibility - Register of young people outside the school system
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setShowRecordForm(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          New KAA Registration
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total KAA Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{kaaRecords.length}</div>
            <div className="text-xs text-ike-neutral">Registered young people</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {kaaRecords.filter(r => r.status === "active").length}
            </div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Inactive Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {kaaRecords.filter(r => r.status === "inactive").length}
            </div>
            <div className="text-xs text-ike-neutral">Temporarily inactive</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {kaaRecords.filter(r => r.status === "completed").length}
            </div>
            <div className="text-xs text-ike-neutral">Successfully completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by name, personal number, municipality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {kaaCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* KAA Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Users className="w-5 h-5 mr-2 text-ike-primary" />
            KAA Records ({filteredRecords.length})
          </CardTitle>
          <CardDescription>
            Manage and track young people under Municipal Activity Responsibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Personal Number</TableHead>
                <TableHead className="font-medium">Municipality</TableHead>
                <TableHead className="font-medium">Category</TableHead>
                <TableHead className="font-medium">Registration Date</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    {record.firstName} {record.lastName}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {record.personalNumber}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{record.populationRegMunicipalityName}</div>
                      <div className="text-ike-neutral text-xs">({record.populationRegMunicipalityCode})</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {record.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {record.registrationDate}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem onClick={() => handleViewDetails(record)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(record)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(record.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Record
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

      {/* KAA Record Form Modal */}
      <Dialog open={showRecordForm} onOpenChange={setShowRecordForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              {editingRecord ? "Edit KAA Record" : "New KAA Registration"}
            </DialogTitle>
            <DialogDescription>
              {editingRecord ? "Update KAA record information" : "Register a new young person under Municipal Activity Responsibility"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personalNumber" className="text-ike-neutral">Personal Number *</Label>
                <Input
                  id="personalNumber"
                  type="text"
                  value={formData.personalNumber}
                  onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="YYYYMMDD-XXXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="firstName" className="text-ike-neutral">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-ike-neutral">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="municipality" className="text-ike-neutral">Population Registration Municipality *</Label>
                <Select value={formData.populationRegMunicipalityName} onValueChange={handleMunicipalityChange} required>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((muni) => (
                      <SelectItem key={muni.code} value={muni.name}>
                        {muni.name} ({muni.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="registrationDate" className="text-ike-neutral">Registration Date *</Label>
                <Input
                  id="registrationDate"
                  type="date"
                  value={formData.registrationDate}
                  onChange={(e) => setFormData({...formData, registrationDate: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deregistrationDate" className="text-ike-neutral">Deregistration Date</Label>
                <Input
                  id="deregistrationDate"
                  type="date"
                  value={formData.deregistrationDate}
                  onChange={(e) => setFormData({...formData, deregistrationDate: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-ike-neutral">KAA Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {kaaCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-ike-neutral">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'completed') => setFormData({...formData, status: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes" className="text-ike-neutral">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full min-h-[100px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Additional notes about the young person's situation and needs..."
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                {editingRecord ? "Update Record" : "Register"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Record Details Modal */}
      <Dialog open={showRecordDetails} onOpenChange={setShowRecordDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              KAA Record Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected KAA record
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Full Name</label>
                    <p className="text-ike-neutral-dark font-medium">{selectedRecord.firstName} {selectedRecord.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Personal Number</label>
                    <p className="text-ike-neutral-dark font-mono">{selectedRecord.personalNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Population Registration Municipality</label>
                    <p className="text-ike-neutral-dark">{selectedRecord.populationRegMunicipalityName} ({selectedRecord.populationRegMunicipalityCode})</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedRecord.status)}</div>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Registration Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Registration Date</label>
                    <p className="text-ike-neutral-dark">{selectedRecord.registrationDate}</p>
                  </div>
                  {selectedRecord.deregistrationDate && (
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Deregistration Date</label>
                      <p className="text-ike-neutral-dark">{selectedRecord.deregistrationDate}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Category</label>
                    <p className="text-ike-neutral-dark">{selectedRecord.category}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedRecord.notes && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-ike-neutral-dark border-b pb-2">Notes</h3>
                  <div className="bg-ike-neutral-light/30 p-4 rounded-lg">
                    <p className="text-ike-neutral-dark whitespace-pre-wrap">{selectedRecord.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecordDetails(false)}>
              Close
            </Button>
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-ike-neutral-dark">
              <Trash2 className="w-5 h-5 mr-2 text-red-500" />
              Delete KAA Record
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this KAA record? This action cannot be undone and will permanently remove 
              all data related to this young person's registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default KAARegistry;
