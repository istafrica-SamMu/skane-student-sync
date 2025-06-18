
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SavedView, ViewColumn, ViewFilter } from '@/types/viewManagement';
import { Save, Eye, Settings, Trash2 } from 'lucide-react';

interface ViewManagementProps {
  views: SavedView[];
  currentView?: SavedView;
  onSaveView: (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onLoadView: (view: SavedView) => void;
  onDeleteView: (viewId: string) => void;
  columns: ViewColumn[];
  filters: ViewFilter[];
}

export const ViewManagement: React.FC<ViewManagementProps> = ({
  views,
  currentView,
  onSaveView,
  onLoadView,
  onDeleteView,
  columns,
  filters,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [viewName, setViewName] = useState('');
  const [viewDescription, setViewDescription] = useState('');

  const handleSaveView = () => {
    if (viewName.trim()) {
      onSaveView({
        name: viewName,
        description: viewDescription,
        columns,
        filters,
        isDefault: false,
        isSystemView: false,
        createdBy: 'current-user', // This would come from auth context
      });
      setViewName('');
      setViewDescription('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSaveDialog(true)}
        className="flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save View
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowLoadDialog(true)}
        className="flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Load View
      </Button>

      {/* Save View Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
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
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView} disabled={!viewName.trim()}>
              Save View
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load View Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Saved View</DialogTitle>
            <DialogDescription>
              Select a saved view to apply its filters and column configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {views.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No saved views found. Create your first view by configuring filters and columns, then click "Save View".
              </p>
            ) : (
              views.map((view) => (
                <div
                  key={view.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{view.name}</h4>
                        {view.isDefault && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        {view.isSystemView && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                            System
                          </span>
                        )}
                      </div>
                      {view.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {view.description}
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">
                        {view.filters.length} filters, {view.columns.filter(c => c.visible).length} columns
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onLoadView(view);
                          setShowLoadDialog(false);
                        }}
                      >
                        Load
                      </Button>
                      {!view.isSystemView && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteView(view.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
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
    </div>
  );
};
