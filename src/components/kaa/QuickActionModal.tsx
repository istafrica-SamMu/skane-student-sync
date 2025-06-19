
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface QuickActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: 'records' | 'measures' | 'contacts' | 'scb' | null;
}

export const QuickActionModal = ({ open, onOpenChange, actionType }: QuickActionModalProps) => {
  const { toast } = useToast();

  const getModalContent = () => {
    switch (actionType) {
      case 'records':
        return {
          title: "View All Records",
          description: "Navigate to the complete KAA registry to view and manage all registered young people.",
          action: "Go to Registry",
          message: "Navigating to KAA Registry..."
        };
      case 'measures':
        return {
          title: "Manage Measures",
          description: "Access the measures and actions management system to create and track interventions.",
          action: "Go to Measures",
          message: "Opening Measures & Actions..."
        };
      case 'contacts':
        return {
          title: "Contact Occasions",
          description: "View and record contact occasions with young people in the KAA system.",
          action: "Go to Contacts",
          message: "Opening Contact Occasions..."
        };
      case 'scb':
        return {
          title: "SCB Reports",
          description: "Generate and manage reports for Statistics Sweden (SCB) according to regulatory requirements.",
          action: "Go to SCB Reports",
          message: "Opening SCB Reports..."
        };
      default:
        return {
          title: "Quick Action",
          description: "Select an action to continue.",
          action: "Continue",
          message: "Processing..."
        };
    }
  };

  const content = getModalContent();

  const handleAction = () => {
    toast({
      title: "Action Initiated",
      description: content.message,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">{content.title}</DialogTitle>
          <DialogDescription className="text-ike-neutral">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAction}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            {content.action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
