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
  Activity,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { MeasuresViewManagement } from "@/components/kaa/MeasuresViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface MeasureAction {
  id: number;
  youngPersonId: number;
  youngPersonName: string;
  personalNumber: string;
  measureType: string;
  actionPlan: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  responsiblePerson: string;
  progress: number;
  outcomes?: string;
  nextReview: string;
  cost?: number;
  provider?: string;
  notes?: string;
}

const measureTypes = [
  "Arbetsmarknadsstöd",
  "Utbildningsinsats",
  "Praktikplats",
  "Jobbcoaching",
  "Språkstöd",
  "Psykosocialt stöd",
  "Mentorskap",
  "Vägledning & rådgivning",
  "Kompetenshöjning",
  "Aktiveringsinsats"
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "planned":
      return <Badge className="bg-blue-500 text-white">Planned</Badge>;
    case "active":
      return <Badge className="bg-ike-success text-white">Active</Badge>;
    case "completed":
      return <Badge className="bg-green-600 text-white">Completed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const MeasuresAndActions = () => {
  const { toast } = useToast();
  const [measures, setMeasures] = useState<MeasureAction[]>([
    {
      id: 1,
      youngPersonId: 1,
      youngPersonName: "Anna Svensson",
      personalNumber: "200501-1234",
      measureType: "Jobbcoaching",
      actionPlan: "Individuell coachning för att förbättra arbetsmarknadskompetens",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      status: "active",
      responsiblePerson: "Maria Lindberg",
      progress: 65,
      nextReview: "2024-03-15",
      cost: 25000,
      provider: "Arbetsmarknadscentrum",
      notes: "Visar god progress, positiv inställning"
    },
    {
      id: 2,
      youngPersonId: 2,
      youngPersonName: "Johan Andersson",
      personalNumber: "200403-5678",
      measureType: "Praktikplats",
      actionPlan: "6 månaders praktik inom IT-sektorn",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      status: "active",
      responsiblePerson: "Erik Johansson",
      progress: 30,
      nextReview: "2024-04-01",
      cost: 15000,
      provider: "TechCorp AB",
      notes: "Började på praktikplats, bra första intryck"
    },
    {
      id: 3,
      youngPersonId: 3,
      youngPersonName: "Sofia Karlsson",
      personalNumber: "200312-9876",
      measureType: "Utbildningsinsats",
      actionPlan: "Komvux-kurs för gymnasiekompetens",
      startDate: "2023-09-01",
      endDate: "2024-06-01",
      status: "completed",
      responsiblePerson: "Anna Nilsson",
      progress: 100,
      nextReview: "2024-06-15",
      cost: 35000,
      provider: "Komvux Malmö",
      outcomes: "Fullförd utbildning med godkända betyg, planerar vidare studier",
      notes: "Utmärkt resultat, fortsätter till högskolan"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedMeasure, setSelectedMeasure] = useState<MeasureAction | null>(null);
  const [showMeasureDetails, setShowMeasureDetails] = useState(false);
  const [showMeasureForm, setShowMeasureForm] = useState(false);
  const [editingMeasure, setEditingMeasure] = useState<MeasureAction | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [measureToDelete, setMeasureToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<MeasureAction, 'id'>>({
    youngPersonId: 0,
    youngPersonName: "",
    personalNumber: "",
    measureType: "",
    actionPlan: "",
    startDate: "",
    endDate: "",
    status: "planned",
    responsiblePerson: "",
    progress: 0,
    nextReview: "",
    cost: 0,
    provider: "",
    notes: ""
  });

  // View Management State
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>(undefined);
  const [viewColumns, setViewColumns] = useState<ViewColumn[]>([
    { key: 'youngPersonName', label: 'Young Person', visible: true },
    { key: 'measureType', label: 'Measure Type', visible: true },
    { key: 'actionPlan', label: 'Action Plan', visible: true },
    { key: 'period', label: 'Period', visible: true },
    { key: 'progress', label: 'Progress', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'actions', label: 'Actions', visible: true }
  ]);
  const [viewFilters, setViewFilters] = useState<ViewFilter[]>([]);

  const filteredMeasuresBase = measures.filter(measure => {
    const matchesSearch = 
      measure.youngPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      measure.personalNumber.includes(searchTerm) ||
      measure.actionPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      measure.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || measure.status === statusFilter;
    const matchesType = typeFilter === "all" || measure.measureType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // View Management Handlers
  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
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

  // Apply view filters to the existing filteredMeasures logic
  const applyViewFilters = (measures: MeasureAction[]) => {
    return measures.filter(measure => {
      return viewFilters.every(filter => {
        const fieldValue = String(measure[filter.field as keyof MeasureAction] || '').toLowerCase();
        const filterValue = String(filter.value).toLowerCase();
        
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

  const filteredMeasures = applyViewFilters(filteredMeasuresBase);

  // Helper function to check if column should be visible
  const isColumnVisible = (columnKey: string) => {
    const column = viewColumns.find(col => col.key === columnKey);
    return column ? column.visible : true;
  };

  const handleViewDetails = (measure: MeasureAction) => {
    setSelectedMeasure(measure);
    setShowMeasureDetails(true);
  };

  const handleEdit = (measure: MeasureAction) => {
    setFormData(measure);
    setEditingMeasure(measure);
    setShowMeasureForm(true);
  };

  const handleDelete = (id: number) => {
    setMeasureToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (measureToDelete !== null) {
      setMeasures(measures.filter(m => m.id !== measureToDelete));
      toast({
        title: "Measure Deleted",
        description: "The measure/action has been deleted successfully.",
      });
      setShowDeleteDialog(false);
      setMeasureToDelete(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const measureData: MeasureAction = {
      ...formData,
      id: editingMeasure ? editingMeasure.id : Date.now(),
    };

    if (editingMeasure) {
      setMeasures(measures.map(m => m.id === editingMeasure.id ? measureData : m));
      toast({
        title: "Measure Updated",
        description: `Measure for ${measureData.youngPersonName} has been updated successfully.`,
      });
    } else {
      setMeasures([...measures, measureData]);
      toast({
        title: "Measure Added",
        description: `Measure for ${measureData.youngPersonName} has been added successfully.`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      youngPersonId: 0,
      youngPersonName: "",
      personalNumber: "",
      measureType: "",
      actionPlan: "",
      startDate: "",
      endDate: "",
      status: "planned",
      responsiblePerson: "",
      progress: 0,
      nextReview: "",
      cost: 0,
      provider: "",
      notes: ""
    });
    setEditingMeasure(null);
    setShowMeasureForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Measures & Actions</h1>
          <p className="text-ike-neutral mt-2">
            Manage intervention measures and action plans for young people under KAA
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={() => setShowMeasureForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Measure
        </Button>
      </div>

      {/* View Management */}
      <MeasuresViewManagement
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
              Total Measures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{measures.length}</div>
            <div className="text-xs text-ike-neutral">All measures</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {measures.filter(m => m.status === "active").length}
            </div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {measures.filter(m => m.status === "completed").length}
            </div>
            <div className="text-xs text-ike-neutral">Successfully completed</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Average Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {Math.round(measures.filter(m => m.status === "active").reduce((sum, m) => sum + m.progress, 0) / measures.filter(m => m.status === "active").length || 0)}%
            </div>
            <div className="text-xs text-ike-neutral">Active measures</div>
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
                placeholder="Search by name, action plan, responsible person..."
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
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Measure Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {measureTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Measures Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Target className="w-5 h-5 mr-2 text-ike-primary" />
            Measures & Actions ({filteredMeasures.length})
          </CardTitle>
          <CardDescription>
            Track intervention measures and action plans for young people
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {isColumnVisible('youngPersonName') && <TableHead className="font-medium">Young Person</TableHead>}
                {isColumnVisible('measureType') && <TableHead className="font-medium">Measure Type</TableHead>}
                {isColumnVisible('actionPlan') && <TableHead className="font-medium">Action Plan</TableHead>}
                {isColumnVisible('period') && <TableHead className="font-medium">Period</TableHead>}
                {isColumnVisible('progress') && <TableHead className="font-medium">Progress</TableHead>}
                {isColumnVisible('status') && <TableHead className="font-medium">Status</TableHead>}
                {isColumnVisible('actions') && <TableHead className="font-medium text-center">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeasures.map((measure) => (
                <TableRow key={measure.id} className="hover:bg-ike-neutral-light/50">
                  {isColumnVisible('youngPersonName') && (
                    <TableCell className="font-medium text-ike-neutral-dark">
                      <div>
                        <div>{measure.youngPersonName}</div>
                        <div className="text-xs text-ike-neutral font-mono">{measure.personalNumber}</div>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible('measureType') && (
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {measure.measureType}
                      </Badge>
                    </TableCell>
                  )}
                  {isColumnVisible('actionPlan') && (
                    <TableCell className="max-w-xs truncate">
                      {measure.actionPlan}
                    </TableCell>
                  )}
                  {isColumnVisible('period') && (
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {measure.startDate}
                      </div>
                      <div className="flex items-center gap-1 text-ike-neutral">
                        <Clock className="w-3 h-3" />
                        {measure.endDate}
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible('progress') && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-ike-primary h-2 rounded-full" 
                            style={{ width: `${measure.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{measure.progress}%</span>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible('status') && (
                    <TableCell>{getStatusBadge(measure.status)}</TableCell>
                  )}
                  {isColumnVisible('actions') && (
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                          <DropdownMenuItem onClick={() => handleViewDetails(measure)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(measure)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Measure
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(measure.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Measure
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Measure Form Modal */}
      <Dialog open={showMeasureForm} onOpenChange={setShowMeasureForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Target className="w-5 h-5 mr-2 text-ike-primary" />
              {editingMeasure ? "Edit Measure" : "New Measure"}
            </DialogTitle>
            <DialogDescription>
              {editingMeasure ? "Update measure information" : "Add a new intervention measure for a young person"}
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
                <Label htmlFor="measureType" className="text-ike-neutral">Measure Type *</Label>
                <Select value={formData.measureType} onValueChange={(value) => setFormData({...formData, measureType: value})} required>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue placeholder="Select measure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {measureTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="responsiblePerson" className="text-ike-neutral">Responsible Person *</Label>
                <Input
                  id="responsiblePerson"
                  type="text"
                  value={formData.responsiblePerson}
                  onChange={(e) => setFormData({...formData, responsiblePerson: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Staff member name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate" className="text-ike-neutral">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-ike-neutral">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="progress" className="text-ike-neutral">Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="nextReview" className="text-ike-neutral">Next Review</Label>
                <Input
                  id="nextReview"
                  type="date"
                  value={formData.nextReview}
                  onChange={(e) => setFormData({...formData, nextReview: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                />
              </div>
              <div>
                <Label htmlFor="cost" className="text-ike-neutral">Cost (SEK)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: parseInt(e.target.value) || 0})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  min="0"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="provider" className="text-ike-neutral">Provider</Label>
                <Input
                  id="provider"
                  type="text"
                  value={formData.provider}
                  onChange={(e) => setFormData({...formData, provider: e.target.value})}
                  className="border-ike-primary/20 focus:border-ike-primary"
                  placeholder="Service provider"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-ike-neutral">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'planned' | 'active' | 'completed' | 'cancelled') => setFormData({...formData, status: value})}>
                  <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="actionPlan" className="text-ike-neutral">Action Plan *</Label>
              <textarea
                id="actionPlan"
                value={formData.actionPlan}
                onChange={(e) => setFormData({...formData, actionPlan: e.target.value})}
                className="w-full min-h-[80px] px-3 py-2 border border-ike-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-ike-primary focus:border-transparent resize-vertical"
                placeholder="Detailed description of the action plan..."
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
                placeholder="Additional notes..."
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
                {editingMeasure ? "Update Measure" : "Add Measure"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Measure Details Modal */}
      <Dialog open={showMeasureDetails} onOpenChange={setShowMeasureDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Target className="w-5 h-5 mr-2 text-ike-primary" />
              Measure Details
            </DialogTitle>
          </DialogHeader>
          {selectedMeasure && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Young Person</label>
                  <p className="text-ike-neutral-dark font-medium">{selectedMeasure.youngPersonName}</p>
                  <p className="text-xs text-ike-neutral font-mono">{selectedMeasure.personalNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Measure Type</label>
                  <p className="text-ike-neutral-dark">{selectedMeasure.measureType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Start Date</label>
                  <p className="text-ike-neutral-dark">{selectedMeasure.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">End Date</label>
                  <p className="text-ike-neutral-dark">{selectedMeasure.endDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Responsible Person</label>
                  <p className="text-ike-neutral-dark">{selectedMeasure.responsiblePerson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedMeasure.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Progress</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-ike-primary h-2 rounded-full" 
                        style={{ width: `${selectedMeasure.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{selectedMeasure.progress}%</span>
                  </div>
                </div>
                {selectedMeasure.cost && (
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Cost</label>
                    <p className="text-ike-neutral-dark">{selectedMeasure.cost?.toLocaleString()} SEK</p>
                  </div>
                )}
                {selectedMeasure.provider && (
                  <div>
                    <label className="text-sm font-medium text-ike-neutral">Provider</label>
                    <p className="text-ike-neutral-dark">{selectedMeasure.provider}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Next Review</label>
                  <p className="text-ike-neutral-dark">{selectedMeasure.nextReview}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Action Plan</label>
                <div className="bg-ike-neutral-light/30 p-3 rounded-lg">
                  <p className="text-ike-neutral-dark">{selectedMeasure.actionPlan}</p>
                </div>
              </div>
              {selectedMeasure.outcomes && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Outcomes</label>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-ike-neutral-dark">{selectedMeasure.outcomes}</p>
                  </div>
                </div>
              )}
              {selectedMeasure.notes && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Notes</label>
                  <div className="bg-ike-neutral-light/30 p-3 rounded-lg">
                    <p className="text-ike-neutral-dark whitespace-pre-wrap">{selectedMeasure.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMeasureDetails(false)}>
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
              Delete Measure
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this measure? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Measure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MeasuresAndActions;
