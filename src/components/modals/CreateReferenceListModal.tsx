
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CreateReferenceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  reconciliationPeriods: string[];
}

export const CreateReferenceListModal = ({ 
  isOpen, 
  onClose, 
  reconciliationPeriods 
}: CreateReferenceListModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    period: '',
    basedOn: '',
    basicEducation: '',
    specialEducation: '',
    gymProgram: '',
    vocationalProgram: '',
    preparatoryProgram: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.period || !formData.basedOn) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reference List Created",
        description: `"${formData.name}" has been created successfully.`,
      });
    }, 500);
    
    onClose();
    setFormData({
      name: '',
      period: '',
      basedOn: '',
      basicEducation: '',
      specialEducation: '',
      gymProgram: '',
      vocationalProgram: '',
      preparatoryProgram: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Reference List
          </DialogTitle>
          <DialogDescription>
            Create a new reference price list for comparison analysis
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Reference List Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Skåne Standard 2024"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="period">Period *</Label>
            <Select value={formData.period} onValueChange={(value) => setFormData(prev => ({ ...prev, period: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {reconciliationPeriods.map(period => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="basedOn">Based On *</Label>
            <Select value={formData.basedOn} onValueChange={(value) => setFormData(prev => ({ ...prev, basedOn: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose calculation method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="average">Municipal Average</SelectItem>
                <SelectItem value="median">Municipal Median</SelectItem>
                <SelectItem value="custom">Custom Values</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.basedOn === 'custom' && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm">Custom Price Values (SEK)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="basicEducation" className="text-xs">Basic Education</Label>
                  <Input
                    id="basicEducation"
                    type="number"
                    placeholder="80000"
                    value={formData.basicEducation}
                    onChange={(e) => setFormData(prev => ({ ...prev, basicEducation: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="specialEducation" className="text-xs">Special Education</Label>
                  <Input
                    id="specialEducation"
                    type="number"
                    placeholder="115000"
                    value={formData.specialEducation}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialEducation: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="gymProgram" className="text-xs">Gym Program</Label>
                  <Input
                    id="gymProgram"
                    type="number"
                    placeholder="90000"
                    value={formData.gymProgram}
                    onChange={(e) => setFormData(prev => ({ ...prev, gymProgram: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="vocationalProgram" className="text-xs">Vocational Program</Label>
                  <Input
                    id="vocationalProgram"
                    type="number"
                    placeholder="100000"
                    value={formData.vocationalProgram}
                    onChange={(e) => setFormData(prev => ({ ...prev, vocationalProgram: e.target.value }))}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="preparatoryProgram" className="text-xs">Preparatory Program</Label>
                  <Input
                    id="preparatoryProgram"
                    type="number"
                    placeholder="70000"
                    value={formData.preparatoryProgram}
                    onChange={(e) => setFormData(prev => ({ ...prev, preparatoryProgram: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Reference List
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
