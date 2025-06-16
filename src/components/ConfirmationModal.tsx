
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, RefreshCcw, XCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  actionType: 'cancel' | 'restart' | 'delete';
  jobName?: string;
}

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  actionType,
  jobName 
}: ConfirmationModalProps) => {
  const getIcon = () => {
    switch (actionType) {
      case 'cancel':
        return <XCircle className="w-5 h-5 text-ike-error" />;
      case 'restart':
        return <RefreshCcw className="w-5 h-5 text-ike-primary" />;
      case 'delete':
        return <AlertTriangle className="w-5 h-5 text-ike-error" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-ike-warning" />;
    }
  };

  const getActionButtonClass = () => {
    switch (actionType) {
      case 'cancel':
      case 'delete':
        return "bg-ike-error hover:bg-ike-error/80 text-white";
      case 'restart':
        return "bg-ike-primary hover:bg-ike-primary-dark text-white";
      default:
        return "bg-ike-warning hover:bg-ike-warning/80 text-white";
    }
  };

  const getActionButtonText = () => {
    switch (actionType) {
      case 'cancel':
        return 'Cancel Job';
      case 'restart':
        return 'Restart Job';
      case 'delete':
        return 'Delete Job';
      default:
        return 'Confirm';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            {getIcon()}
            <span className="ml-2">{title}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-ike-neutral">
            {description}
            {jobName && (
              <div className="mt-2 p-2 bg-ike-neutral-light rounded text-sm">
                <strong>Job:</strong> {jobName}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={getActionButtonClass()}
          >
            {getActionButtonText()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
