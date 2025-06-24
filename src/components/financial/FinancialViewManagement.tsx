
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SavedView, ViewColumn, ViewFilter } from '@/types/viewManagement';
import { Save, Eye, Settings, Trash2, Columns, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FinancialViewManagementProps {
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

export const FinancialViewManagement: React.FC<FinancialViewManagementProps> = ({
  views,
  currentView,
  onSaveView,
  onLoadView,
  onDeleteView,
  columns,
  filters,
  onColumnsChange,
  onFiltersChange,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showColumnsDialog, setShowColumnsDialog] = useState(false);
  const [showFiltersDialog, setShowFiltersDialog] = useState(false);
  const [viewName, setViewName] = useState('');
  const [viewDescription, setViewDescription] = useState('');
  const { toast } = useToast();

  const handleSaveView = () => {
    if (viewName.trim()) {
      onSaveView({
        name: viewName,
        description: viewDescription,
        columns,
        filters,
        isDefault: false,
        isSystemView: false,
        createdBy: 'current-user',
      });
      setViewName('');
      setViewDescription('');
      setShowSaveDialog(false);
      toast({
        title: "View Saved",
        description: `View "${viewName}" has been saved successfully.`,
      });
    }
  };

  const handleLoadView = (view: SavedView) => {
    onLoadView(view);
    setShowLoadDialog(false);
    toast({
      title: "View Loaded",
      description: `View "${view.name}" has been loaded.`,
    });
  };

  const handleColumnToggle = (columnKey: string, visible: boolean) => {
    const updatedColumns = columns.map(col =>
      col.key === columnKey ? { ...col, visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Eye className="w-4 h-4 mr-2" />
            Views
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-md z-50">
          <DropdownMenuItem onClick={() => setShowSaveDialog(true)} className="cursor-pointer hover:bg-ike-primary/10">
            <Save className="w-4 h-4 mr-2" />
            Save Current View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowLoadDialog(true)} className="cursor-pointer hover:bg-ike-primary/10">
            <Eye className="w-4 h-4 mr-2" />
            Load Saved View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowColumnsDialog(true)}
        className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
      >
        <Columns className="w-4 h-4 mr-2" />
        Columns
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFiltersDialog(true)}
        className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>

      {/* Save View Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Save Current View</DialogTitle>
            <DialogDescription>
              Save your current filter and column configuration as a reusable view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="viewName">View Name</Label>
              <Input
                id="viewName"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                placeholder="Enter view name"
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
            <div>
              <Label htmlFor="viewDescription">Description (Optional)</Label>
              <Textarea
                id="viewDescription"
                value={viewDescription}
                onChange={(e) => setViewDescription(e.target.value)}
                placeholder="Describe what this view shows"
                rows={3}
                className="border-ike-primary/20 focus:border-ike-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveView} 
              disabled={!viewName.trim()}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load View Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Load Saved View</DialogTitle>
            <DialogDescription>
              Select a saved view to apply its filters and column configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {views.length === 0 ? (
              <p className="text-ike-neutral text-center py-8">
                No saved views found. Create your first view by configuring filters and columns, then save it.
              </p>
            ) : (
              views.map((view) => (
                <div
                  key={view.id}
                  className="border rounded-lg p-4 hover:bg-ike-neutral/5 transition-colors cursor-pointer"
                  onClick={() => handleLoadView(view)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-ike-neutral-dark">{view.name}</h4>
                        {view.isDefault && (
                          <span className="text-xs bg-ike-primary text-white px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      {view.description && (
                        <p className="text-sm text-ike-neutral mb-2">{view.description}</p>
                      )}
                      <div className="text-xs text-ike-neutral">
                        {view.filters.length} filters, {view.columns.filter(c => c.visible).length} visible columns
                      </div>
                    </div>
                    {!view.isSystemView && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteView(view.id);
                        }}
                        className="hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Columns Dialog */}
      <Dialog open={showColumnsDialog} onOpenChange={setShowColumnsDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Manage Columns</DialogTitle>
            <DialogDescription>
              Choose which columns to display in the table view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {columns.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={column.visible}
                  onCheckedChange={(checked) => handleColumnToggle(column.key, !!checked)}
                />
                <Label htmlFor={column.key} className="flex-1 cursor-pointer">
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowColumnsDialog(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters Dialog */}
      <Dialog open={showFiltersDialog} onOpenChange={setShowFiltersDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle>Manage Filters</DialogTitle>
            <DialogDescription>
              Apply filters to narrow down the displayed data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-ike-neutral">
              Currently {filters.length} filter(s) applied. Advanced filtering coming soon.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowFiltersDialog(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
