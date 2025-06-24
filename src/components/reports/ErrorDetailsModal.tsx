
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  User, 
  MapPin, 
  School, 
  Calendar,
  DollarSign,
  FileText,
  X
} from "lucide-react";
import { PaymentError } from "@/types/errorLists";

interface ErrorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: PaymentError | null;
}

export const ErrorDetailsModal = ({ isOpen, onClose, error }: ErrorDetailsModalProps) => {
  if (!error) return null;

  const getErrorTypeLabel = (type: string) => {
    const labels = {
      'price_code_missing': 'Missing Price Code',
      'municipality_connection': 'No Municipality Connection',
      'emigrated': 'Emigrated Student',
      'overlapping_placement': 'Overlapping Placement',
      'year_4_upper_secondary': 'Year 4 Upper Secondary',
      'year_5_adapted': 'Year 5 Adapted Education',
      'has_diploma': 'Has Diploma',
      'integration_missing': 'Integration Missing'
    };
    return labels[type as keyof typeof labels] || type;
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-600 text-white">Investigating</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <AlertTriangle className="w-5 h-5 mr-2 text-ike-primary" />
              Error Details - {error.id}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>
            Detailed information about the payment error and its impact
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Error Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-ike-neutral">Error Type</label>
              <Badge variant="outline" className="text-sm">
                {getErrorTypeLabel(error.errorType)}
              </Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ike-neutral">Severity</label>
              {getSeverityBadge(error.severity)}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ike-neutral">Status</label>
              {getStatusBadge(error.status)}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ike-neutral">Detected Date</label>
              <p className="text-sm">{new Date(error.detectedDate).toLocaleDateString('sv-SE')}</p>
            </div>
          </div>

          {/* Student Information */}
          <div className="border rounded-lg p-4 bg-ike-neutral/5">
            <h3 className="flex items-center font-medium text-ike-neutral-dark mb-3">
              <User className="w-4 h-4 mr-2" />
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-ike-neutral">Name</label>
                <p className="font-medium">{error.studentName}</p>
              </div>
              <div>
                <label className="text-ike-neutral">Personal ID</label>
                <p className="font-medium">{error.personalId}</p>
              </div>
              <div>
                <label className="text-ike-neutral">Student ID</label>
                <p className="font-medium">{error.studentId}</p>
              </div>
              <div>
                <label className="text-ike-neutral">Municipality</label>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-ike-neutral" />
                  <p className="font-medium">{error.municipality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* School Information */}
          {(error.principal || error.schoolUnit || error.studyPath) && (
            <div className="border rounded-lg p-4 bg-ike-neutral/5">
              <h3 className="flex items-center font-medium text-ike-neutral-dark mb-3">
                <School className="w-4 h-4 mr-2" />
                School Information
              </h3>
              <div className="space-y-2 text-sm">
                {error.principal && (
                  <div>
                    <label className="text-ike-neutral">Principal</label>
                    <p className="font-medium">{error.principal}</p>
                  </div>
                )}
                {error.schoolUnit && (
                  <div>
                    <label className="text-ike-neutral">School Unit</label>
                    <p className="font-medium">{error.schoolUnit}</p>
                  </div>
                )}
                {error.studyPath && (
                  <div>
                    <label className="text-ike-neutral">Study Path</label>
                    <p className="font-medium">{error.studyPath}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Details */}
          <div className="border rounded-lg p-4 bg-red-50">
            <h3 className="flex items-center font-medium text-ike-neutral-dark mb-3">
              <FileText className="w-4 h-4 mr-2" />
              Error Message
            </h3>
            <p className="text-sm text-ike-neutral-dark bg-white p-3 rounded border">
              {error.errorMessage}
            </p>
          </div>

          {/* Payment Impact */}
          {error.paymentImpact && (
            <div className="border rounded-lg p-4 bg-orange-50">
              <h3 className="flex items-center font-medium text-ike-neutral-dark mb-3">
                <DollarSign className="w-4 h-4 mr-2" />
                Payment Impact
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-ike-neutral">Blocked Amount</label>
                  <p className="font-medium text-red-600">
                    {error.paymentImpact.blockedAmount?.toLocaleString() || 0} SEK
                  </p>
                </div>
                <div>
                  <label className="text-ike-neutral">Affected Periods</label>
                  <p className="font-medium">
                    {error.paymentImpact.affectedPeriods?.length || 0} periods
                  </p>
                </div>
              </div>
              {error.paymentImpact.affectedPeriods && error.paymentImpact.affectedPeriods.length > 0 && (
                <div className="mt-2">
                  <label className="text-ike-neutral text-sm">Periods</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {error.paymentImpact.affectedPeriods.map((period) => (
                      <Badge key={period} variant="outline" className="text-xs">
                        {period}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional Information */}
          {error.additionalInfo && Object.keys(error.additionalInfo).length > 0 && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="flex items-center font-medium text-ike-neutral-dark mb-3">
                <FileText className="w-4 h-4 mr-2" />
                Additional Information
              </h3>
              <div className="space-y-2 text-sm">
                {Object.entries(error.additionalInfo).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-ike-neutral capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <p className="font-medium">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
