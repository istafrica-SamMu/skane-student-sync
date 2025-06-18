
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ViewColumn } from '@/types/viewManagement';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

interface ColumnManagementProps {
  columns: ViewColumn[];
  onColumnsChange: (columns: ViewColumn[]) => void;
}

export const ColumnManagement: React.FC<ColumnManagementProps> = ({
  columns,
  onColumnsChange,
}) => {
  const toggleColumn = (key: string) => {
    const updatedColumns = columns.map(col =>
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(updatedColumns);
  };

  const showAllColumns = () => {
    const updatedColumns = columns.map(col => ({ ...col, visible: true }));
    onColumnsChange(updatedColumns);
  };

  const hideAllColumns = () => {
    const updatedColumns = columns.map(col => ({ ...col, visible: false }));
    onColumnsChange(updatedColumns);
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    onColumnsChange(newColumns);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Column Configuration</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={showAllColumns}>
              <Eye className="w-4 h-4 mr-1" />
              Show All
            </Button>
            <Button variant="outline" size="sm" onClick={hideAllColumns}>
              <EyeOff className="w-4 h-4 mr-1" />
              Hide All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {columns.map((column, index) => (
            <div
              key={column.key}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="cursor-move">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>
              
              <Checkbox
                checked={column.visible}
                onCheckedChange={() => toggleColumn(column.key)}
              />
              
              <div className="flex-1">
                <span className={`font-medium ${!column.visible ? 'text-muted-foreground' : ''}`}>
                  {column.label}
                </span>
              </div>
              
              {column.visible && (
                <div className="text-sm text-muted-foreground">
                  Visible
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          {columns.filter(c => c.visible).length} of {columns.length} columns visible
        </div>
      </CardContent>
    </Card>
  );
};
