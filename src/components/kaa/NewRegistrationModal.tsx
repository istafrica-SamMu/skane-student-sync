
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const municipalities = [
  { name: "Malmö kommun", code: "1280" },
  { name: "Lund kommun", code: "1281" },
  { name: "Helsingborg kommun", code: "1282" },
  { name: "Landskrona kommun", code: "1283" },
];

const kaaCategories = [
  "Arbetslös ungdom",
  "Studieavbrott",
  "Rehabilitering",
  "Arbetsmarknadsåtgärd",
  "Praktik",
  "Kompetensutveckling"
];

export const NewRegistrationModal = ({ open, onOpenChange }: NewRegistrationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    personalNumber: "",
    firstName: "",
    lastName: "",
    municipality: "",
    category: "",
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.personalNumber || !formData.firstName || !formData.lastName || !formData.municipality || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    toast({
      title: "Registration Successful",
      description: `${formData.firstName} ${formData.lastName} has been registered in the KAA system.`,
    });
    
    // Reset form and close modal
    setFormData({
      personalNumber: "",
      firstName: "",
      lastName: "",
      municipality: "",
      category: "",
      registrationDate: new Date().toISOString().split('T')[0]
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <UserPlus className="w-5 h-5 mr-2 text-ike-primary" />
            New KAA Registration
          </DialogTitle>
          <DialogDescription>
            Register a new young person under Municipal Activity Responsibility
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="personalNumber" className="text-ike-neutral">Personal Number *</Label>
              <Input
                id="personalNumber"
                type="text"
                value={formData.personalNumber}
                onChange={(e) => setFormData({...formData, personalNumber: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                placeholder="YYYYMMDD-XXXX"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="registrationDate" className="text-ike-neutral">Registration Date *</Label>
              <Input
                id="registrationDate"
                type="date"
                value={formData.registrationDate}
                onChange={(e) => setFormData({...formData, registrationDate: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="firstName" className="text-ike-neutral">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-ike-neutral">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="border-ike-primary/20 focus:border-ike-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="municipality" className="text-ike-neutral">Municipality *</Label>
              <Select value={formData.municipality} onValueChange={(value) => setFormData({...formData, municipality: value})} required>
                <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((muni) => (
                    <SelectItem key={muni.code} value={muni.name}>
                      {muni.name} ({muni.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="category" className="text-ike-neutral">KAA Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                <SelectTrigger className="border-ike-primary/20 focus:border-ike-primary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {kaaCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
