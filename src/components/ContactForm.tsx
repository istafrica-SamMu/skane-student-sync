
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ContactFormProps {
  initialData?: Partial<ContactFormData>;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
}

export const ContactForm = ({ initialData, onSubmit, onCancel }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: initialData?.name || '',
    role: initialData?.role || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    street: initialData?.street || '',
    postalCode: initialData?.postalCode || '',
    city: initialData?.city || '',
    country: initialData?.country || 'sweden',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+46|0)\s?\d{2,3}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(phone);
  };

  const validatePostalCode = (postalCode: string) => {
    return /^\d{3}\s?\d{2}$/.test(postalCode);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid Swedish phone number format';
    }
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!validatePostalCode(formData.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format (XXXXX)';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getFieldStatus = (field: keyof ContactFormData) => {
    if (errors[field]) return 'error';
    if (formData[field]) {
      if (field === 'email') return validateEmail(formData[field]) ? 'success' : 'error';
      if (field === 'phone') return validatePhone(formData[field]) ? 'success' : 'error';
      if (field === 'postalCode') return validatePostalCode(formData[field]) ? 'success' : 'error';
      return 'success';
    }
    return 'default';
  };

  const renderFieldWithValidation = (
    field: keyof ContactFormData,
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
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`${status === 'error' ? 'border-red-300' : status === 'success' ? 'border-green-300' : ''}`}
        />
        {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-ike-primary mb-4">Contact Person Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderFieldWithValidation('name', 'Full Name', 'Enter full name')}
          {renderFieldWithValidation('role', 'Role/Title', 'Enter position or title')}
          {renderFieldWithValidation('email', 'Email Address', 'Enter email address', 'email')}
          {renderFieldWithValidation('phone', 'Phone Number', '+46 XX XXX XX XX', 'tel')}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-ike-primary mb-4">Address Information</h3>
        <div className="space-y-4">
          <div className="col-span-2">
            {renderFieldWithValidation('street', 'Street Address', 'Enter street name and number')}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderFieldWithValidation('postalCode', 'Postal Code', 'XXX XX')}
            {renderFieldWithValidation('city', 'City', 'Enter city name')}
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sweden">Sweden</SelectItem>
                <SelectItem value="norway">Norway</SelectItem>
                <SelectItem value="denmark">Denmark</SelectItem>
                <SelectItem value="finland">Finland</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-ike-primary hover:bg-ike-primary-dark">
          Save Contact Information
        </Button>
      </div>
    </div>
  );
};
