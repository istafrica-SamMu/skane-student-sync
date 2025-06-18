
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewFilter } from '@/types/viewManagement';
import { Plus, X } from 'lucide-react';

interface AdvancedFilterProps {
  filters: ViewFilter[];
  onFiltersChange: (filters: ViewFilter[]) => void;
  availableFields: Array<{ key: string; label: string; type: 'text' | 'date' | 'select'; options?: string[] }>;
}

export const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  filters,
  onFiltersChange,
  availableFields,
}) => {
  const addFilter = () => {
    const newFilter: ViewFilter = {
      field: availableFields[0]?.key || '',
      operator: 'contains',
      value: '',
    };
    onFiltersChange([...filters, newFilter]);
  };

  const updateFilter = (index: number, updates: Partial<ViewFilter>) => {
    const updatedFilters = filters.map((filter, i) =>
      i === index ? { ...filter, ...updates } : filter
    );
    onFiltersChange(updatedFilters);
  };

  const removeFilter = (index: number) => {
    onFiltersChange(filters.filter((_, i) => i !== index));
  };

  const getOperatorOptions = (fieldType: string) => {
    switch (fieldType) {
      case 'text':
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts with' },
          { value: 'endsWith', label: 'Ends with' },
        ];
      case 'date':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'before', label: 'Before' },
          { value: 'after', label: 'After' },
          { value: 'between', label: 'Between' },
        ];
      case 'select':
        return [
          { value: 'equals', label: 'Equals' },
        ];
      default:
        return [{ value: 'contains', label: 'Contains' }];
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Advanced Filters</CardTitle>
          <Button onClick={addFilter} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filters.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No filters applied. Click "Add Filter" to create your first filter.
          </p>
        ) : (
          filters.map((filter, index) => {
            const field = availableFields.find(f => f.key === filter.field);
            const operatorOptions = getOperatorOptions(field?.type || 'text');

            return (
              <div key={index} className="flex items-end gap-2 p-4 border rounded-lg">
                <div className="flex-1">
                  <Label>Field</Label>
                  <Select
                    value={filter.field}
                    onValueChange={(value) => updateFilter(index, { field: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFields.map((field) => (
                        <SelectItem key={field.key} value={field.key}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Label>Operator</Label>
                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateFilter(index, { operator: value as ViewFilter['operator'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {operatorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Label>Value</Label>
                  {field?.type === 'select' && field.options ? (
                    <Select
                      value={Array.isArray(filter.value) ? filter.value[0] : filter.value}
                      onValueChange={(value) => updateFilter(index, { value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={field?.type === 'date' ? 'date' : 'text'}
                      value={Array.isArray(filter.value) ? filter.value.join(', ') : filter.value}
                      onChange={(e) => updateFilter(index, { value: e.target.value })}
                      placeholder="Enter filter value"
                    />
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFilter(index)}
                  className="flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
