
import React, { useState, useEffect } from 'react';
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
import { Edit, Euro } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReferenceList {
  id: string;
  name: string;
  basicEducation: number;
  specialEducation: number;
  gymProgram: number;
  vocationalProgram: number;
  preparatoryProgram: number;
}

interface EditReferenceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceList: ReferenceList | null;
}

export const EditReferenceListModal = ({ 
  isOpen, 
  onClose, 
  referenceList 
}: EditReferenceListModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    basicEducation: 0,
    specialEducation: 0,
    gymProgram: 0,
    vocationalProgram: 0,
    preparatoryProgram: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (referenceList) {
      setFormData({
        name: referenceList.name,
        basicEducation: referenceList.basicEducation,
        specialEducation: referenceList.specialEducation,
        gymProgram: referenceList.gymProgram,
        vocationalProgram: referenceList.vocationalProgram,
        preparatoryProgram: referenceList.preparatoryProgram
      });
    }
  }, [referenceList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Missing Information",
        description: "Please enter a reference list name.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reference List Updated",
        description: `"${formData.name}" has been updated successfully.`,
      });
    }, 500);
    
    onClose();
  };

  if (!referenceList) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Reference List
          </DialogTitle>
          <DialogDescription>
            Update the reference price list values
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Reference List Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Price Values (SEK)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="edit-basic" className="text-xs">Basic Education</Label>
                <Input
                  id="edit-basic"
                  type="number"
                  value={formData.basicEducation}
                  onChange={(e) => setFormData(prev => ({ ...prev, basicEducation: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-special" className="text-xs">Special Education</Label>
                <Input
                  id="edit-special"
                  type="number"
                  value={formData.specialEducation}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialEducation: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-gym" className="text-xs">Gym Program</Label>
                <Input
                  id="edit-gym"
                  type="number"
                  value={formData.gymProgram}
                  onChange={(e) => setFormData(prev => ({ ...prev, gymProgram: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="edit-vocational" className="text-xs">Vocational Program</Label>
                <Input
                  id="edit-vocational"
                  type="number"
                  value={formData.vocationalProgram}
                  onChange={(e) => setFormData(prev => ({ ...prev, vocationalProgram: Number(e.target.value) }))}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-preparatory" className="text-xs">Preparatory Program</Label>
                <Input
                  id="edit-preparatory"
                  type="number"
                  value={formData.preparatoryProgram}
                  onChange={(e) => setFormData(prev => ({ ...prev, preparatoryProgram: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Update Reference List
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
