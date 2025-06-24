
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Calendar, 
  MapPin, 
  Euro, 
  DollarSign, 
  Clock,
  FileText,
  AlertTriangle 
} from "lucide-react";

interface ChangeRecord {
  id: string;
  studentId: number;
  studentName: string;
  changeType: 'population_registration' | 'price_code' | 'start_date' | 'end_date' | 'municipality_registration';
  changeDate: string;
  previousValue: string;
  newValue: string;
  municipality?: string;
  schoolUnit?: string;
  isConfidential: boolean;
  measurementDate: string;
  studyPath?: string;
  priceCodeCategory?: string;
  additionalAmounts?: {
    applied: number;
    total: number;
    categories: string[];
  };
}

interface ChangeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ChangeRecord | null;
}

export const ChangeDetailsModal = ({ isOpen, onClose, record }: ChangeDetailsModalProps) => {
  if (!record) return null;

  const getChangeTypeLabel = (type: string) => {
    const labels = {
      'population_registration': 'Population Registration',
      'price_code': 'Price Code',
      'start_date': 'Start Date',
      'end_date': 'End Date',
      'municipality_registration': 'Municipality Registration'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getChangeTypeIcon = (type: string) => {
    const icons = {
      'population_registration': MapPin,
      'price_code': Euro,
      'start_date': Calendar,
      'end_date': Calendar,
      'municipality_registration': DollarSign
    };
    const IconComponent = icons[type as keyof typeof icons] || MapPin;
    return <IconComponent className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE') + ' ' + 
           new Date(dateString).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-ike-neutral-dark">
            {getChangeTypeIcon(record.changeType)}
            Change Details - {record.id}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this change record
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
              <User className="w-4 h-4" />
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-ike-neutral-light/30 rounded-lg">
              <div>
                <label className="text-sm font-medium text-ike-neutral">Student Name</label>
                <p className="text-ike-neutral-dark">{record.studentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-ike-neutral">Student ID</label>
                <p className="text-ike-neutral-dark">{record.studentId}</p>
              </div>
              {record.municipality && (
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                  <p className="text-ike-neutral-dark">{record.municipality}</p>
                </div>
              )}
              {record.isConfidential && (
                <div className="col-span-2">
                  <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                    <AlertTriangle className="w-3 h-3" />
                    Confidential Student Record
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Change Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ike-neutral-dark flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Change Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getChangeTypeIcon(record.changeType)}
                  {getChangeTypeLabel(record.changeType)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <label className="text-sm font-medium text-red-800">Previous Value</label>
                  <p className="text-red-900 font-mono text-sm mt-1">
                    {record.isConfidential ? "***" : record.previousValue}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <label className="text-sm font-medium text-green-800">New Value</label>
                  <p className="text-green-900 font-mono text-sm mt-1">
                    {record.isConfidential ? "***" : record.newValue}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-ike-neutral">
                <Clock className="w-4 h-4" />
                <span>Changed on: {formatDate(record.changeDate)}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {!record.isConfidential && (record.schoolUnit || record.studyPath || record.priceCodeCategory || record.additionalAmounts) && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-ike-neutral-dark">Additional Information</h3>
                <div className="grid grid-cols-1 gap-3">
                  {record.schoolUnit && (
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">School Unit</label>
                      <p className="text-ike-neutral-dark">{record.schoolUnit}</p>
                    </div>
                  )}
                  {record.studyPath && (
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Study Path</label>
                      <p className="text-ike-neutral-dark">{record.studyPath}</p>
                    </div>
                  )}
                  {record.priceCodeCategory && (
                    <div>
                      <label className="text-sm font-medium text-ike-neutral">Price Code Category</label>
                      <p className="text-ike-neutral-dark">{record.priceCodeCategory}</p>
                    </div>
                  )}
                  {record.additionalAmounts && record.additionalAmounts.applied > 0 && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <label className="font-medium text-green-800">Additional Amounts</label>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>Applied: <span className="font-medium">{record.additionalAmounts.applied}</span></div>
                        <div>Total Amount: <span className="font-medium">{record.additionalAmounts.total.toLocaleString()} SEK</span></div>
                        <div>Categories: <span className="font-medium">{record.additionalAmounts.categories.join(", ")}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
