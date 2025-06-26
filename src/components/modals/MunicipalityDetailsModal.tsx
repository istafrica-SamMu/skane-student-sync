
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building, Euro, Calendar } from 'lucide-react';

interface MunicipalityData {
  id: number;
  name: string;
  code: string;
  basicEducation: number;
  specialEducation: number;
  gymProgram: number;
  vocationalProgram: number;
  preparatoryProgram: number;
}

interface MunicipalityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  municipality: MunicipalityData | null;
  period: string;
}

export const MunicipalityDetailsModal = ({ 
  isOpen, 
  onClose, 
  municipality,
  period 
}: MunicipalityDetailsModalProps) => {
  if (!municipality) return null;

  const priceCategories = [
    { label: 'Basic Education', value: municipality.basicEducation, color: 'bg-blue-100 text-blue-800' },
    { label: 'Special Education', value: municipality.specialEducation, color: 'bg-purple-100 text-purple-800' },
    { label: 'Gym Program', value: municipality.gymProgram, color: 'bg-green-100 text-green-800' },
    { label: 'Vocational Program', value: municipality.vocationalProgram, color: 'bg-orange-100 text-orange-800' },
    { label: 'Preparatory Program', value: municipality.preparatoryProgram, color: 'bg-red-100 text-red-800' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {municipality.name} Price List Details
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <span>Municipality Code: {municipality.code}</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {period}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-3">
            {priceCategories.map((category) => (
              <div key={category.label} className="flex justify-between items-center p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{category.label}</span>
                </div>
                <Badge className={category.color}>
                  {category.value.toLocaleString()} SEK
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Average Price:</span>
                <span className="font-medium ml-2">
                  {Math.round(priceCategories.reduce((sum, cat) => sum + cat.value, 0) / priceCategories.length).toLocaleString()} SEK
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total Programs:</span>
                <span className="font-medium ml-2">{priceCategories.length}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
