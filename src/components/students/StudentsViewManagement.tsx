
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Save, 
  Eye, 
  Trash2, 
  Plus,
  Filter,
  X
} from "lucide-react";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface StudentsViewManagementProps {
  views: SavedView[];
  currentView?: SavedView;
  onSaveView: (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onLoadView: (view: SavedView) => void;
  onDeleteView: (viewId: string) => void;
  columns: ViewColumn[];
  filters: ViewFilter[];
  onColumnsChange: (columns: ViewColumn[]) => void;
  onFiltersChange: (filters: ViewFilter[]) => void;
}

export const StudentsViewManagement = ({
  views,
  currentView,
  onSaveView,
  onLoadView,
  onDeleteView,
  columns,
  filters,
  onColumnsChange,
  onFiltersChange,
}: StudentsViewManagementProps) => {
  const { toast } = useToast();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [newViewDescription, setNewViewDescription] = useState("");
  const [tempColumns, setTempColumns] = useState<ViewColumn[]>(columns);
  const [tempFilters, setTempFilters] = useState<ViewFilter[]>(filters);
  const [newFilter, setNewFilter] = useState<ViewFilter>({
    field: "",
    operator: "equals",
    value: ""
  });

  const handleSaveView = () => {
    if (!newViewName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a view name.",
        variant: "destructive"
      });
      return;
    }

    onSaveView({
      name: newViewName,
      description: newViewDescription,
      columns,
      filters,
      isDefault: false,
      isSystemView: false,
      createdBy: "Current User"
    });

    setNewViewName("");
    setNewViewDescription("");
    setShowSaveDialog(false);
    
    toast({
      title: "View Saved",
      description: `View "${newViewName}" has been saved successfully.`,
    });
  };

  const handleApplyColumns = () => {
    onColumnsChange(tempColumns);
    setShowColumnDialog(false);
    toast({
      title: "Columns Updated",
      description: "Column visibility has been updated.",
    });
  };

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setShowFilterDialog(false);
    toast({
      title: "Filters Applied",
      description: `${tempFilters.length} filter(s) applied.`,
    });
  };

  const handleAddFilter = () => {
    if (!newFilter.field || !newFilter.value) {
      toast({
        title: "Validation Error",
        description: "Please fill in all filter fields.",
        variant: "destructive"
      });
      return;
    }

    setTempFilters([...tempFilters, { ...newFilter }]);
    setNewFilter({ field: "", operator: "equals", value: "" });
  };

  const handleRemoveFilter = (index: number) => {
    setTempFilters(tempFilters.filter((_, i) => i !== index));
  };

  const handleToggleColumn = (columnKey: string) => {
    setTempColumns(tempColumns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    ));
  };

  const availableFields = [
    { key: 'name', label: 'Name' },
    { key: 'personalNumber', label: 'Personal Number' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'homeMunicipality', label: 'Home Municipality' },
    { key: 'studyPath', label: 'Study Path' },
    { key: 'schoolYear', label: 'School Year' },
    { key: 'schoolUnit', label: 'School Unit' },
    { key: 'status', label: 'Status' }
  ];

  const userViews = views.filter(view => !view.isSystemView);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
          <div className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-ike-primary" />
            View Management
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColumnDialog(true)}
              className="border-ike-primary/20 text-ike-primary hover:bg-ike-primary/10"
            >
              <Settings className="w-4 h-4 mr-1" />
              Columns
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterDialog(true)}
              className="border-ike-primary/20 text-ike-primary hover:bg-ike-primary/10"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              className="border-ike-primary/20 text-ike-primary hover:bg-ike-primary/10"
            >
              <Save className="w-4 h-4 mr-1" />
              Save View
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Manage custom views and filters for students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current View Display */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-ike-neutral">Current View:</span>
              <Badge variant="outline" className="ml-2">
                {currentView?.name || "Default View"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              {filters.length > 0 && (
                <Badge className="bg-ike-primary text-white">
                  {filters.length} filter(s) active
                </Badge>
              )}
            </div>
          </div>

          {/* Saved Views */}
          {userViews.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-ike-neutral">Saved Views:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {userViews.map((view) => (
                  <div key={view.id} className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLoadView(view)}
                      className="border-ike-neutral/20 hover:bg-ike-primary/10"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      {view.name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteView(view.id)}
                      className="text-ike-error hover:text-ike-error/80 hover:bg-ike-error/10 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Save View Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Save Current View</DialogTitle>
            <DialogDescription>
              Save the current column and filter configuration as a reusable view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="viewName">View Name *</Label>
              <Input
                id="viewName"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                placeholder="Enter view name"
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <div>
              <Label htmlFor="viewDescription">Description</Label>
              <Textarea
                id="viewDescription"
                value={newViewDescription}
                onChange={(e) => setNewViewDescription(e.target.value)}
                placeholder="Optional description"
                rows={3}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Column Management Dialog */}
      <Dialog open={showColumnDialog} onOpenChange={setShowColumnDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Manage Columns</DialogTitle>
            <DialogDescription>
              Choose which columns to display in the table.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {tempColumns.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={column.visible}
                  onCheckedChange={() => handleToggleColumn(column.key)}
                />
                <Label htmlFor={column.key} className="text-sm">
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowColumnDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyColumns} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Management Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Manage Filters</DialogTitle>
            <DialogDescription>
              Add and remove filters to customize the data view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Current Filters */}
            {tempFilters.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Current Filters:</Label>
                <div className="space-y-2 mt-2">
                  {tempFilters.map((filter, index) => (
                    <div key={index} className="flex items-center justify-between bg-ike-neutral-light/50 p-2 rounded">
                      <span className="text-sm">
                        {availableFields.find(f => f.key === filter.field)?.label} {filter.operator} "{filter.value}"
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFilter(index)}
                        className="text-ike-error hover:text-ike-error/80"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Filter */}
            <div>
              <Label className="text-sm font-medium">Add New Filter:</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <Select value={newFilter.field} onValueChange={(value) => setNewFilter({...newFilter, field: value})}>
                  <SelectTrigger className="border-ike-primary/20">
                    <SelectValue placeholder="Field" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                    {availableFields.map((field) => (
                      <SelectItem key={field.key} value={field.key}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newFilter.operator} onValueChange={(value: any) => setNewFilter({...newFilter, operator: value})}>
                  <SelectTrigger className="border-ike-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="startsWith">Starts With</SelectItem>
                    <SelectItem value="endsWith">Ends With</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={newFilter.value as string}
                  onChange={(e) => setNewFilter({...newFilter, value: e.target.value})}
                  placeholder="Value"
                  className="border-ike-primary/20 focus:border-ike-primary"
                />
                <Button onClick={handleAddFilter} size="sm" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
