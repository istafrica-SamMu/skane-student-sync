
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Plus } from "lucide-react";

interface Municipality {
  id: string;
  name: string;
  code: string;
}

interface CollaborationAreaFormData {
  name: string;
  region: string;
  description: string;
  coordinatorName: string;
  coordinatorEmail: string;
  status: 'active' | 'inactive';
  municipalityIds: string[];
}

interface CollaborationAreaFormProps {
  initialData?: Partial<CollaborationAreaFormData>;
  onSubmit: (data: CollaborationAreaFormData) => void;
  onCancel: () => void;
  availableMunicipalities: Municipality[];
}

export const CollaborationAreaForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  availableMunicipalities 
}: CollaborationAreaFormProps) => {
  const [formData, setFormData] = useState<CollaborationAreaFormData>({
    name: initialData?.name || '',
    region: initialData?.region || '',
    description: initialData?.description || '',
    coordinatorName: initialData?.coordinatorName || '',
    coordinatorEmail: initialData?.coordinatorEmail || '',
    status: initialData?.status || 'active',
    municipalityIds: initialData?.municipalityIds || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CollaborationAreaFormData, string>>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (field: keyof CollaborationAreaFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addMunicipality = (municipalityId: string) => {
    if (!formData.municipalityIds.includes(municipalityId)) {
      setFormData(prev => ({
        ...prev,
        municipalityIds: [...prev.municipalityIds, municipalityId]
      }));
    }
  };

  const removeMunicipality = (municipalityId: string) => {
    setFormData(prev => ({
      ...prev,
      municipalityIds: prev.municipalityIds.filter(id => id !== municipalityId)
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CollaborationAreaFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.region.trim()) newErrors.region = 'Region is required';
    if (!formData.coordinatorName.trim()) newErrors.coordinatorName = 'Coordinator name is required';
    if (!formData.coordinatorEmail.trim()) {
      newErrors.coordinatorEmail = 'Coordinator email is required';
    } else if (!validateEmail(formData.coordinatorEmail)) {
      newErrors.coordinatorEmail = 'Invalid email format';
    }
    if (formData.municipalityIds.length === 0) {
      newErrors.municipalityIds = 'At least one municipality must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getFieldStatus = (field: keyof CollaborationAreaFormData) => {
    if (errors[field]) return 'error';
    if (formData[field]) {
      if (field === 'coordinatorEmail') return validateEmail(formData[field] as string) ? 'success' : 'error';
      return 'success';
    }
    return 'default';
  };

  const renderFieldWithValidation = (
    field: keyof CollaborationAreaFormData,
    label: string,
    placeholder: string,
    type: string = 'text'
  ) => {
    const status = getFieldStatus(field);
    
    return (
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <Label htmlFor={field}>{label}</Label>
          {status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
          {status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
        </div>
        <Input
          id={field}
          type={type}
          placeholder={placeholder}
          value={formData[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`${status === 'error' ? 'border-red-300' : status === 'success' ? 'border-green-300' : ''}`}
        />
        {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
      </div>
    );
  };

  const selectedMunicipalities = availableMunicipalities.filter(m => 
    formData.municipalityIds.includes(m.id)
  );

  const availableToAdd = availableMunicipalities.filter(m => 
    !formData.municipalityIds.includes(m.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-ike-primary mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderFieldWithValidation('name', 'Collaboration Area Name', 'Enter area name')}
          {renderFieldWithValidation('region', 'Region', 'Enter region name')}
        </div>
        <div className="mt-4">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-ike-primary mb-4">Coordinator Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderFieldWithValidation('coordinatorName', 'Coordinator Name', 'Enter coordinator full name')}
          {renderFieldWithValidation('coordinatorEmail', 'Coordinator Email', 'Enter coordinator email', 'email')}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the collaboration area's purpose and scope..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ike-primary">Municipalities</h3>
          {availableToAdd.length > 0 && (
            <Select onValueChange={addMunicipality}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Add municipality" />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((municipality) => (
                  <SelectItem key={municipality.id} value={municipality.id}>
                    {municipality.name} ({municipality.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        
        {selectedMunicipalities.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-ike-neutral">No municipalities selected</p>
            <p className="text-xs text-ike-neutral mt-1">Use the dropdown above to add municipalities</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {selectedMunicipalities.map((municipality) => (
              <div key={municipality.id} className="flex items-center justify-between p-3 bg-ike-neutral-light rounded-lg">
                <div>
                  <p className="font-medium">{municipality.name}</p>
                  <p className="text-sm text-ike-neutral">Code: {municipality.code}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeMunicipality(municipality.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        {errors.municipalityIds && (
          <p className="text-sm text-red-500 mt-2">{errors.municipalityIds}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-ike-primary hover:bg-ike-primary-dark">
          Save Collaboration Area
        </Button>
      </div>
    </div>
  );
};
