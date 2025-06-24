
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRightLeft, 
  Search, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  User,
  MapPin,
  Calendar,
  FileText
} from "lucide-react";
import { StudentPlacementsViewManagement } from "@/components/students/StudentPlacementsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface StudentPlacement {
  id: string;
  studentPersonalId: string;
  studentName: string;
  currentMunicipality: string;
  targetMunicipality: string;
  currentSchool: string;
  targetSchool: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  effectiveDate: string;
  reason: string;
  requestedBy: string;
  notes?: string;
}

const StudentPlacements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState<StudentPlacement | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock data for student placements
  const [placements] = useState<StudentPlacement[]>([
    {
      id: "1",
      studentPersonalId: "199901011234",
      studentName: "Anna Andersson",
      currentMunicipality: "Malmö",
      targetMunicipality: "Lund",
      currentSchool: "Malmö Gymnasium",
      targetSchool: "Lund High School",
      status: "pending",
      requestDate: "2024-12-01",
      effectiveDate: "2025-01-15",
      reason: "Family relocation",
      requestedBy: "Parent",
      notes: "Student maintains high academic performance"
    },
    {
      id: "2",
      studentPersonalId: "199902021234",
      studentName: "Erik Johansson",
      currentMunicipality: "Lund",
      targetMunicipality: "Helsingborg",
      currentSchool: "Lund Technical School",
      targetSchool: "Helsingborg Tech Academy",
      status: "approved",
      requestDate: "2024-11-15",
      effectiveDate: "2024-12-01",
      reason: "Specialized program availability", 
      requestedBy: "School Counselor"
    },
    {
      id: "3",
      studentPersonalId: "199903031234",
      studentName: "Sara Nilsson",
      currentMunicipality: "Helsingborg",
      targetMunicipality: "Malmö",
      currentSchool: "Helsingborg Arts School",
      targetSchool: "Malmö Arts College",
      status: "completed",
      requestDate: "2024-10-10",
      effectiveDate: "2024-11-01",
      reason: "Program completion requirements",
      requestedBy: "Academic Advisor",
      notes: "Transfer completed successfully"
    }
  ]);

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: '1',
      name: 'Default Student Placements View',
      description: 'Standard view showing all placement data',
      columns: [
        { key: 'studentName', label: 'Student Name', visible: true },
        { key: 'currentMunicipality', label: 'Current Municipality', visible: true },
        { key: 'targetMunicipality', label: 'Target Municipality', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'requestDate', label: 'Request Date', visible: true },
        { key: 'effectiveDate', label: 'Effective Date', visible: true },
        { key: 'reason', label: 'Reason', visible: false },
        { key: 'requestedBy', label: 'Requested By', visible: false }
      ],
      filters: [],
      isDefault: true,
      isSystemView: true,
      createdBy: 'system',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [currentColumns, setCurrentColumns] = useState<ViewColumn[]>([
    { key: 'studentName', label: 'Student Name', visible: true },
    { key: 'currentMunicipality', label: 'Current Municipality', visible: true },
    { key: 'targetMunicipality', label: 'Target Municipality', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'requestDate', label: 'Request Date', visible: true },
    { key: 'effectiveDate', label: 'Effective Date', visible: true },
    { key: 'reason', label: 'Reason', visible: false },
    { key: 'requestedBy', label: 'Requested By', visible: false }
  ]);

  const [currentFilters, setCurrentFilters] = useState<ViewFilter[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>(savedViews[0]);

  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setCurrentColumns(view.columns);
    setCurrentFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(savedViews[0]);
    }
  };

  const handleViewPlacement = (placement: StudentPlacement) => {
    setSelectedPlacement(placement);
    setIsDetailModalOpen(true);
  };

  // Apply filters to placements
  const applyFilters = (placements: StudentPlacement[]) => {
    return placements.filter(placement => {
      return currentFilters.every(filter => {
        const value = placement[filter.field as keyof StudentPlacement];
        const filterValue = filter.value as string;
        
        if (!value) return false;
        
        switch (filter.operator) {
          case 'equals':
            return value.toString().toLowerCase() === filterValue.toLowerCase();
          case 'contains':
            return value.toString().toLowerCase().includes(filterValue.toLowerCase());
          case 'startsWith':
            return value.toString().toLowerCase().startsWith(filterValue.toLowerCase());
          case 'endsWith':
            return value.toString().toLowerCase().endsWith(filterValue.toLowerCase());
          default:
            return true;
        }
      });
    });
  };

  const filteredPlacements = applyFilters(
    placements.filter(placement =>
      placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.currentMunicipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.targetMunicipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.reason.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-ike-warning text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "approved":
        return <Badge className="bg-ike-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge className="bg-ike-error text-white"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case "completed":
        return <Badge className="bg-ike-primary text-white"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const visibleColumns = currentColumns.filter(col => col.visible);
  const pendingCount = placements.filter(p => p.status === "pending").length;
  const approvedCount = placements.filter(p => p.status === "approved").length;
  const completedCount = placements.filter(p => p.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Student Placements</h1>
          <p className="text-ike-neutral mt-2">
            Manage student transfers between municipalities and schools
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Request Placement
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{pendingCount}</div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{approvedCount}</div>
            <div className="text-xs text-ike-neutral">Ready for transfer</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{completedCount}</div>
            <div className="text-xs text-ike-neutral">Successfully transferred</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-neutral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{placements.length}</div>
            <div className="text-xs text-ike-neutral">All time</div>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <StudentPlacementsViewManagement
        views={savedViews}
        currentView={currentView}
        onSaveView={handleSaveView}
        onLoadView={handleLoadView}
        onDeleteView={handleDeleteView}
        columns={currentColumns}
        filters={currentFilters}
        onColumnsChange={setCurrentColumns}
        onFiltersChange={setCurrentFilters}
      />

      {/* Student Placements Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <ArrowRightLeft className="w-5 h-5 mr-2 text-ike-primary" />
            Student Placement Requests
          </CardTitle>
          <CardDescription>
            Track and manage student transfers between municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by student name, municipality, or reason..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead key={column.key} className="font-medium">{column.label}</TableHead>
                  ))}
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlacements.map((placement) => (
                  <TableRow key={placement.id} className="hover:bg-ike-neutral-light/50">
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === 'studentName' && (
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-ike-neutral" />
                            <div>
                              <div className="font-medium text-ike-neutral-dark">{placement.studentName}</div>
                              <div className="text-xs text-ike-neutral">{placement.studentPersonalId}</div>
                            </div>
                          </div>
                        )}
                        {column.key === 'currentMunicipality' && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-ike-neutral" />
                            <div>
                              <div className="text-ike-neutral-dark">{placement.currentMunicipality}</div>
                              <div className="text-xs text-ike-neutral">{placement.currentSchool}</div>
                            </div>
                          </div>
                        )}
                        {column.key === 'targetMunicipality' && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-ike-primary" />
                            <div>
                              <div className="text-ike-neutral-dark">{placement.targetMunicipality}</div>
                              <div className="text-xs text-ike-neutral">{placement.targetSchool}</div>
                            </div>
                          </div>
                        )}
                        {column.key === 'status' && getStatusBadge(placement.status)}
                        {column.key === 'requestDate' && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-ike-neutral" />
                            <span className="text-ike-neutral">{placement.requestDate}</span>
                          </div>
                        )}
                        {column.key === 'effectiveDate' && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-ike-neutral" />
                            <span className="text-ike-neutral">{placement.effectiveDate}</span>
                          </div>
                        )}
                        {column.key === 'reason' && (
                          <span className="text-ike-neutral max-w-xs truncate" title={placement.reason}>
                            {placement.reason}
                          </span>
                        )}
                        {column.key === 'requestedBy' && (
                          <span className="text-ike-neutral">{placement.requestedBy}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewPlacement(placement)}
                        className="text-ike-neutral hover:text-ike-primary"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Placement Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Placement Details
            </DialogTitle>
            <DialogDescription>
              Complete information for student placement request
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlacement && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-ike-neutral-light/50 rounded-lg p-4">
                  <h4 className="font-medium text-ike-neutral-dark mb-2">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-ike-neutral">Name:</span>
                      <span className="font-medium ml-2">{selectedPlacement.studentName}</span>
                    </div>
                    <div>
                      <span className="text-ike-neutral">Personal ID:</span>
                      <span className="font-medium ml-2">{selectedPlacement.studentPersonalId}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-ike-neutral-light/50 rounded-lg p-4">
                  <h4 className="font-medium text-ike-neutral-dark mb-2">Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-ike-neutral">Status:</span>
                      <span className="ml-2">{getStatusBadge(selectedPlacement.status)}</span>
                    </div>
                    <div>
                      <span className="text-ike-neutral">Requested by:</span>
                      <span className="font-medium ml-2">{selectedPlacement.requestedBy}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-ike-neutral-light/50 rounded-lg p-4">
                <h4 className="font-medium text-ike-neutral-dark mb-2">Transfer Path</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-ike-neutral block">From:</span>
                    <div className="font-medium">{selectedPlacement.currentMunicipality}</div>
                    <div className="text-ike-neutral">{selectedPlacement.currentSchool}</div>
                  </div>
                  <div>
                    <span className="text-ike-neutral block">To:</span>
                    <div className="font-medium">{selectedPlacement.targetMunicipality}</div>
                    <div className="text-ike-neutral">{selectedPlacement.targetSchool}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-ike-neutral">Reason:</span>
                  <p className="mt-1 text-sm">{selectedPlacement.reason}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-ike-neutral">Request Date:</span>
                    <span className="font-medium ml-2">{selectedPlacement.requestDate}</span>
                  </div>
                  <div>
                    <span className="text-ike-neutral">Effective Date:</span>
                    <span className="font-medium ml-2">{selectedPlacement.effectiveDate}</span>
                  </div>
                </div>
                {selectedPlacement.notes && (
                  <div>
                    <span className="text-ike-neutral">Notes:</span>
                    <p className="mt-1 text-sm">{selectedPlacement.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDetailModalOpen(false)}
              className="border-ike-neutral-light text-ike-neutral hover:bg-ike-neutral-light/50"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPlacements;
