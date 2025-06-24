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
  Phone,
  MessageSquare,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { ContactOccasionsViewManagement } from "@/components/kaa/ContactOccasionsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface ContactOccasion {
  id: number;
  youngPersonId: number;
  youngPersonName: string;
  personalNumber: string;
  type: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  outcome: string;
  followUpRequired: boolean;
  followUpDate?: string;
  contactedBy: string;
  notes?: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

const contactTypes = [
  "Telefon",
  "Fysiskt möte",
  "Videomöte",
  "E-post",
  "SMS",
  "Hembesök",
  "Skolbesök",
  "Myndighetsbesök"
];

const outcomeTypes = [
  "Information given",
  "Åtgärd planerad",
  "Uppföljning krävs",
  "Hänvisning till annan instans",
  "Problem löst",
  "Ingen kontakt uppnådd",
  "Avbokat av ungdom"
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-ike-success text-white">Completed</Badge>;
    case "scheduled":
      return <Badge className="bg-ike-primary text-white">Scheduled</Badge>;
    case "cancelled":
      return <Badge className="bg-ike-warning text-white">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const ContactOccasions = () => {
  const { toast } = useToast();
  const [contactOccasions, setContactOccasions] = useState<ContactOccasion[]>([
    {
      id: 1,
      youngPersonId: 1,
      youngPersonName: "Anna Svensson",
      personalNumber: "200501-1234",
      type: "Telefon",
      description: "Första kontakt och behovsanalys",
      date: "2024-01-15",
      time: "10:00",
      duration: 30,
      outcome: "Åtgärd planerad",
      followUpRequired: true,
      followUpDate: "2024-01-29",
      contactedBy: "Maria Lindberg",
      notes: "Ungdomen behöver stöd för återgång till studier",
      status: "completed"
    },
    {
      id: 2,
      youngPersonId: 2,
      youngPersonName: "Johan Andersson",
      personalNumber: "200403-5678",
      type: "Fysiskt möte",
      description: "Planering av praktikperiod",
      date: "2024-02-01",
      time: "14:00",
      duration: 45,
      outcome: "Åtgärd planerad",
      followUpRequired: true,
      followUpDate: "2024-02-15",
      contactedBy: "Erik Johansson",
      notes: "Praktikplats inom IT-sektorn identifierad",
      status: "completed"
    }
  ]);
  
  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>();
  const [viewColumns, setViewColumns] = useState<ViewColumn[]>([
    { key: 'youngPersonName', label: 'Young Person', visible: true },
    { key: 'personalNumber', label: 'Personal Number', visible: true },
    { key: 'type', label: 'Type', visible: true },
    { key: 'description', label: 'Description', visible: true },
    { key: 'date', label: 'Date', visible: true },
    { key: 'time', label: 'Time', visible: true },
    { key: 'duration', label: 'Duration', visible: true },
    { key: 'outcome', label: 'Outcome', visible: false },
    { key: 'contactedBy', label: 'Contacted By', visible: false },
    { key: 'status', label: 'Status', visible: true }
  ]);
  const [viewFilters, setViewFilters] = useState<ViewFilter[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactOccasion | null>(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactOccasion | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<ContactOccasion, 'id'>>({
    youngPersonId: 0,
    youngPersonName: "",
    personalNumber: "",
    type: "",
    description: "",
    date: "",
    time: "",
    duration: 30,
    outcome: "",
    followUpRequired: false,
    followUpDate: "",
    contactedBy: "",
    notes: "",
    status: "scheduled"
  });

  // View management handlers
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: `view-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setViewColumns(view.columns);
    setViewFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(v => v.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
  };

  const applyViewFilters = (contacts: ContactOccasion[]) => {
    return contacts.filter(contact => {
      return viewFilters.every(filter => {
        const fieldValue = (contact as any)[filter.field]?.toString().toLowerCase() || '';
        const filterValue = filter.value.toString().toLowerCase();
        
        switch (filter.operator) {
          case 'equals':
            return fieldValue === filterValue;
          case 'contains':
            return fieldValue.includes(filterValue);
          case 'startsWith':
            return fieldValue.startsWith(filterValue);
          case 'endsWith':
            return fieldValue.endsWith(filterValue);
          default:
            return true;
        }
      });
    });
  };

  const filteredContacts = applyViewFilters(contactOccasions.filter(contact => {
    const matchesSearch = 
      contact.youngPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.personalNumber.includes(searchTerm) ||
      contact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contactedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesType = typeFilter === "all" || contact.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  }));

  const visibleColumns = viewColumns.filter(col => col.visible);

  const handleViewDetails = (contact: ContactOccasion) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
  };

  const handleEdit = (contact: ContactOccasion) => {
    setFormData(contact);
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const handleDelete = (id: number) => {
    setContactToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (contactToDelete !== null) {
      setContactOccasions(contactOccasions.filter(c => c.id !== contactToDelete));
      toast({
        title: "Contact Occasion Deleted",
        description: "The contact occasion has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setContactToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactData: ContactOccasion = {
      ...formData,
      id: editingContact ? editingContact.id : Date.now(),
    };

    if (editingContact) {
      setContactOccasions(contactOccasions.map(c => c.id === editingContact.id ? contactData : c));
      toast({
        title: "Contact Occasion Updated",
        description: `Contact with ${contactData.youngPersonName} has been updated successfully.`,
      });
    } else {
      setContactOccasions([...contactOccasions, contactData]);
      toast({
        title: "Contact Occasion Added",
        description: `Contact with ${contactData.youngPersonName} has been added successfully.`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      youngPersonId: 0,
      youngPersonName: "",
      personalNumber: "",
      type: "",
      description: "",
      date: "",
      time: "",
      duration: 30,
      outcome: "",
      followUpRequired: false,
      followUpDate: "",
      contactedBy: "",
      notes: "",
      status: "scheduled"
    });
    setEditingContact(null);
    setShowContactForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Contact Occasions</h1>
          <p className="text-ike-neutral mt-2">
            Manage contact interactions with young people under KAA
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setShowContactForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </Button>
      </div>

      {/* View Management */}
      <ContactOccasionsViewManagement
        views={savedViews}
        currentView={currentView}
        onSaveView={handleSaveView}
        onLoadView={handleLoadView}
        onDeleteView={handleDeleteView}
        columns={viewColumns}
        filters={viewFilters}
        onColumnsChange={setViewColumns}
        onFiltersChange={setViewFilters}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{contactOccasions.length}</div>
            <div className="text-xs text-ike-neutral">All contact occasions</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {contactOccasions.filter(c => c.status === "completed").length}
            </div>
            <div className="text-xs text-ike-neutral">Completed contacts</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {contactOccasions.filter(c => c.status === "scheduled").length}
            </div>
            <div className="text-xs text-ike-neutral">Upcoming contacts</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {contactOccasions.filter(c => c.followUpRequired).length}
            </div>
            <div className="text-xs text-ike-neutral">Require follow-up</div>
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
                placeholder="Search by name, personal number, description..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Contact Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {contactTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contact Occasions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <MessageSquare className="w-5 h-5 mr-2 text-ike-primary" />
            Contact Occasions ({filteredContacts.length})
          </CardTitle>
          <CardDescription>
            Track all contact interactions with young people under KAA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key} className="font-medium">
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="font-medium text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-ike-neutral-light/50">
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key}>
                      {column.key === 'youngPersonName' && (
                        <div className="font-medium text-ike-neutral-dark">
                          <div>{contact.youngPersonName}</div>
                          {viewColumns.find(col => col.key === 'personalNumber' && !col.visible) && (
                            <div className="text-xs text-ike-neutral font-mono">{contact.personalNumber}</div>
                          )}
                        </div>
                      )}
                      {column.key === 'personalNumber' && (
                        <div className="text-xs text-ike-neutral font-mono">{contact.personalNumber}</div>
                      )}
                      {column.key === 'type' && (
                        <Badge variant="outline" className="text-xs">
                          {contact.type}
                        </Badge>
                      )}
                      {column.key === 'description' && (
                        <div className="max-w-xs truncate">{contact.description}</div>
                      )}
                      {column.key === 'date' && (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          {contact.date}
                        </div>
                      )}
                      {column.key === 'time' && (
                        <div className="flex items-center gap-1 text-sm text-ike-neutral">
                          <Clock className="w-3 h-3" />
                          {contact.time}
                        </div>
                      )}
                      {column.key === 'duration' && (
                        <div className="text-sm">{contact.duration} min</div>
                      )}
                      {column.key === 'outcome' && (
                        <div className="text-sm">{contact.outcome}</div>
                      )}
                      {column.key === 'contactedBy' && (
                        <div className="text-sm">{contact.contactedBy}</div>
                      )}
                      {column.key === 'status' && getStatusBadge(contact.status)}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                        <DropdownMenuItem onClick={() => handleViewDetails(contact)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(contact)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Contact
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(contact.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Contact
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

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <MessageSquare className="w-5 h-5 mr-2 text-ike-primary" />
              {editingContact ? "Edit Contact Occasion" : "New Contact Occasion"}
            </DialogTitle>
            <DialogDescription>
              {editingContact ? "Update contact occasion information" : "Add a new contact interaction with a young person"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="youngPersonName" className="text-ike-neutral">Young Person *</Label>
                <Input
                  id="youngPersonName"
                  type="text"
                  value={formData.youngPersonName}
                  onChange={(e) => setFormData({...formData, youngPersonName: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Select or enter name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="personalNumber" className="text-ike-neutral">Personal Number</Label>
                <Input
                  id="personalNumber"
                  type="text"
                  value={formData.personalNumber}
                  onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="YYYYMMDD-XXXX"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-ike-neutral">Contact Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})} required>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contactedBy" className="text-ike-neutral">Contacted By *</Label>
                <Input
                  id="contactedBy"
                  type="text"
                  value={formData.contactedBy}
                  onChange={(e) => setFormData({...formData, contactedBy: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Staff member name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-ike-neutral">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-ike-neutral">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-ike-neutral">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  min="1"
                  placeholder="30"
                />
              </div>
              <div>
                <Label htmlFor="outcome" className="text-ike-neutral">Outcome</Label>
                <Select value={formData.outcome} onValueChange={(value) => setFormData({...formData, outcome: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    {outcomeTypes.map((outcome) => (
                      <SelectItem key={outcome} value={outcome}>{outcome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-ike-neutral">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'completed' | 'scheduled' | 'cancelled') => setFormData({...formData, status: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-ike-neutral">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Brief description of the contact purpose..."
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-ike-neutral">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Additional notes about the contact..."
                rows={3}
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
                {editingContact ? "Update Contact" : "Add Contact"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Details Modal */}
      <Dialog open={showContactDetails} onOpenChange={setShowContactDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <MessageSquare className="w-5 h-5 mr-2 text-ike-primary" />
              Contact Occasion Details
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Young Person</label>
                  <p className="text-ike-neutral-dark font-medium">{selectedContact.youngPersonName}</p>
                  <p className="text-xs text-ike-neutral font-mono">{selectedContact.personalNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Contact Type</label>
                  <p className="text-ike-neutral-dark">{selectedContact.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Date & Time</label>
                  <p className="text-ike-neutral-dark">{selectedContact.date} at {selectedContact.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Duration</label>
                  <p className="text-ike-neutral-dark">{selectedContact.duration} minutes</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Contacted By</label>
                  <p className="text-ike-neutral-dark">{selectedContact.contactedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Description</label>
                <p className="text-ike-neutral-dark">{selectedContact.description}</p>
              </div>
              {selectedContact.outcome && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Outcome</label>
                  <p className="text-ike-neutral-dark">{selectedContact.outcome}</p>
                </div>
              )}
              {selectedContact.notes && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Notes</label>
                  <div className="bg-ike-neutral-light/30 p-3 rounded-lg">
                    <p className="text-ike-neutral-dark whitespace-pre-wrap">{selectedContact.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDetails(false)}>
              Close
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
              Delete Contact Occasion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact occasion? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Contact
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactOccasions;
