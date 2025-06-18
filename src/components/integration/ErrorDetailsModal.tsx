
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Download } from "lucide-react";

interface ErrorDetail {
  id: number;
  recordType?: string;
  message: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ErrorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  integrationName: string;
  syncDate: string;
  errors: ErrorDetail[];
}

export const ErrorDetailsModal = ({ 
  isOpen, 
  onClose, 
  integrationName, 
  syncDate, 
  errors 
}: ErrorDetailsModalProps) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-600 text-white">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500 text-white">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <AlertTriangle className="w-5 h-5 mr-2 text-ike-error" />
            Error Details - {integrationName} ({syncDate})
          </DialogTitle>
          <DialogDescription>
            Review and analyze errors that occurred during the synchronization process
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-ike-neutral">
              Total Errors: <span className="font-semibold">{errors.length}</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Error Log
            </Button>
          </div>

          <div className="space-y-3">
            {errors.map((error) => (
              <div key={error.id} className="border rounded-lg p-4 bg-ike-error/5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-ike-neutral-dark">{error.recordType || "System Error"}</h4>
                    {getSeverityBadge(error.severity)}
                  </div>
                  <div className="text-sm text-ike-neutral">{error.timestamp}</div>
                </div>
                <p className="text-sm text-ike-neutral-dark bg-white p-3 rounded border">
                  {error.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
