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
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User, 
  School, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { AdditionalAmountsViewManagement } from "@/components/financial/AdditionalAmountsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

const AdditionalAmounts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for additional amounts
  const [additionalAmountsData, setAdditionalAmountsData] = useState([
    {
      id: 1,
      studentPersonalId: "199901011234",
      studentName: "Anna Andersson",
      schoolUnit: "Malmö Gymnasium",
      principal: "Lars Larsson",
      amountType: "Transport Support",
      amount: 1500,
      period: "2024-12",
      status: "approved",
      createdDate: "2024-12-15",
      description: "Monthly transport allowance"
    },
    {
      id: 2,
      studentPersonalId: "199902021234",
      studentName: "Erik Johansson",
      schoolUnit: "Lund High School",
      principal: "Maria Svensson",
      amountType: "Special Needs Support",
      amount: 2800,
      period: "2024-12",
      status: "pending",
      createdDate: "2024-12-10",
      description: "Additional support for learning disabilities"
    },
    {
      id: 3,
      studentPersonalId: "199903031234",
      studentName: "Sara Nilsson",
      schoolUnit: "Technical School",
      principal: "Erik Eriksson",
      amountType: "Equipment Allowance",
      amount: 850,
      period: "2024-11",
      status: "processed",
      createdDate: "2024-11-25",
      description: "Computer equipment for technical program"
    }
  ]);

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: '1',
      name: 'Default Additional Amounts View',
      description: 'Standard view showing all additional amounts data',
      columns: [
        { key: 'studentName', label: 'Student Name', visible: true },
        { key: 'schoolUnit', label: 'School Unit', visible: true },
        { key: 'amountType', label: 'Amount Type', visible: true },
        { key: 'amount', label: 'Amount', visible: true },
        { key: 'period', label: 'Period', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'createdDate', label: 'Created Date', visible: true },
        { key: 'description', label: 'Description', visible: false }
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
    { key: 'schoolUnit', label: 'School Unit', visible: true },
    { key: 'amountType', label: 'Amount Type', visible: true },
    { key: 'amount', label: 'Amount', visible: true },
    { key: 'period', label: 'Period', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'createdDate', label: 'Created Date', visible: true },
    { key: 'description', label: 'Description', visible: false }
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

  const handleAddAmount = () => {
    setShowAddDialog(true);
  };

  const handleEditAmount = (item: any) => {
    setSelectedItem(item);
    setShowEditDialog(true);
  };

  const handleDeleteAmount = (item: any) => {
    setSelectedItem(item);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setAdditionalAmountsData(prev => prev.filter(item => item.id !== selectedItem.id));
      toast({
        title: "Amount Deleted",
        description: `Additional amount for ${selectedItem.studentName} has been deleted.`,
      });
      setShowDeleteDialog(false);
      setSelectedItem(null);
    }
  };

  const filteredData = additionalAmountsData.filter(item =>
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.schoolUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.amountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-ike-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "processed":
        return <Badge className="bg-ike-primary text-white"><DollarSign className="w-3 h-3 mr-1" />Processed</Badge>;
      case "rejected":
        return <Badge className="bg-ike-error text-white"><AlertCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const visibleColumns = currentColumns.filter(col => col.visible);
  const approvedCount = additionalAmountsData.filter(item => item.status === "approved").length;
  const pendingCount = additionalAmountsData.filter(item => item.status === "pending").length;
  const totalAmount = additionalAmountsData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Additional Amounts</h1>
          <p className="text-ike-neutral mt-2">
            Manage additional amounts for students beyond standard pricing
          </p>
        </div>
        <Button 
          onClick={handleAddAmount}
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Additional Amount
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Approved Amounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-success">{approvedCount}</div>
            <div className="text-xs text-ike-neutral">Ready for processing</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-warning">{pendingCount}</div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{totalAmount.toLocaleString()} SEK</div>
            <div className="text-xs text-ike-neutral">Current period</div>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <AdditionalAmountsViewManagement
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

      {/* Additional Amounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <DollarSign className="w-5 h-5 mr-2 text-ike-primary" />
            Additional Amounts Management
          </CardTitle>
          <CardDescription>
            Track and manage additional amounts for student support and special circumstances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by student name, school, amount type, or description..."
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
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-ike-neutral-light/50">
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === 'studentName' && (
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-ike-neutral" />
                            <div>
                              <div className="font-medium text-ike-neutral-dark">{item.studentName}</div>
                              <div className="text-xs text-ike-neutral">{item.studentPersonalId}</div>
                            </div>
                          </div>
                        )}
                        {column.key === 'schoolUnit' && (
                          <div className="flex items-center">
                            <School className="w-4 h-4 mr-2 text-ike-neutral" />
                            <div>
                              <div className="text-ike-neutral-dark">{item.schoolUnit}</div>
                              <div className="text-xs text-ike-neutral">{item.principal}</div>
                            </div>
                          </div>
                        )}
                        {column.key === 'amountType' && (
                          <span className="text-ike-neutral-dark font-medium">{item.amountType}</span>
                        )}
                        {column.key === 'amount' && (
                          <div className="flex items-center text-ike-primary font-medium">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {item.amount.toLocaleString()} SEK
                          </div>
                        )}
                        {column.key === 'period' && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-ike-neutral" />
                            <span className="text-ike-neutral">{item.period}</span>
                          </div>
                        )}
                        {column.key === 'status' && getStatusBadge(item.status)}
                        {column.key === 'createdDate' && (
                          <span className="text-ike-neutral">{item.createdDate}</span>
                        )}
                        {column.key === 'description' && (
                          <span className="text-ike-neutral max-w-xs truncate" title={item.description}>
                            {item.description}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditAmount(item)}
                          className="text-ike-neutral hover:text-ike-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteAmount(item)}
                          className="text-ike-neutral hover:text-ike-error"
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

      {/* Add Amount Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Add Additional Amount</DialogTitle>
            <DialogDescription>
              Create a new additional amount entry for a student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-ike-neutral">
              Additional amount form will be implemented here.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowAddDialog(false);
                toast({
                  title: "Feature Coming Soon",
                  description: "Add additional amount functionality will be implemented.",
                });
              }}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              Add Amount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Amount Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit Additional Amount</DialogTitle>
            <DialogDescription>
              Modify the selected additional amount entry.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem && (
              <div className="text-sm text-ike-neutral">
                <p><strong>Student:</strong> {selectedItem.studentName}</p>
                <p><strong>Amount Type:</strong> {selectedItem.amountType}</p>
                <p><strong>Current Amount:</strong> {selectedItem.amount} SEK</p>
              </div>
            )}
            <p className="text-sm text-ike-neutral">
              Edit form will be implemented here.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowEditDialog(false);
                toast({
                  title: "Feature Coming Soon",
                  description: "Edit additional amount functionality will be implemented.",
                });
              }}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Delete Additional Amount</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this additional amount? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem && (
              <div className="bg-ike-error/10 p-4 rounded-lg border border-ike-error/20">
                <p className="text-sm text-ike-neutral-dark">
                  <strong>Student:</strong> {selectedItem.studentName}
                </p>
                <p className="text-sm text-ike-neutral-dark">
                  <strong>Amount Type:</strong> {selectedItem.amountType}
                </p>
                <p className="text-sm text-ike-neutral-dark">
                  <strong>Amount:</strong> {selectedItem.amount} SEK
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Delete Amount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdditionalAmounts;
