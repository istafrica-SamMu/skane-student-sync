
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Download, FileText, Table, File } from "lucide-react";

interface ExportChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalRecords: number;
  selectedPeriod: string;
  selectedChangeType: string;
}

export const ExportChangesModal = ({ 
  isOpen, 
  onClose, 
  totalRecords, 
  selectedPeriod, 
  selectedChangeType 
}: ExportChangesModalProps) => {
  const [exportFormat, setExportFormat] = useState<string>("excel");
  const [includeConfidential, setIncludeConfidential] = useState(false);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: "excel", label: "Excel (.xlsx)", icon: Table },
    { value: "csv", label: "CSV (.csv)", icon: FileText },
    { value: "pdf", label: "PDF Report (.pdf)", icon: File },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would trigger the actual export
    console.log("Exporting with options:", {
      format: exportFormat,
      includeConfidential,
      includeDetails,
      period: selectedPeriod,
      changeType: selectedChangeType
    });
    
    setIsExporting(false);
    onClose();
    
    // Show success message
    alert(`Export completed! ${totalRecords} records exported to ${exportFormat.toUpperCase()} format.`);
  };

  const getFormatIcon = (format: string) => {
    const option = formatOptions.find(opt => opt.value === format);
    const IconComponent = option?.icon || Download;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-ike-neutral-dark">
            <Download className="w-5 h-5 text-ike-primary" />
            Export Changes
          </DialogTitle>
          <DialogDescription>
            Configure export settings for {totalRecords} change records
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-ike-neutral-dark">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-ike-neutral-dark">Export Options</label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeDetails" 
                checked={includeDetails}
                onCheckedChange={(checked) => setIncludeDetails(checked === true)}
              />
              <label htmlFor="includeDetails" className="text-sm text-ike-neutral-dark">
                Include detailed information (school units, study paths, etc.)
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="includeConfidential" 
                checked={includeConfidential}
                onCheckedChange={(checked) => setIncludeConfidential(checked === true)}
              />
              <label htmlFor="includeConfidential" className="text-sm text-ike-neutral-dark">
                Include confidential student records
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-ike-neutral-light/30 rounded-lg">
            <h4 className="font-medium text-ike-neutral-dark mb-2">Export Summary</h4>
            <div className="text-sm text-ike-neutral space-y-1">
              <div>Period: {selectedPeriod}</div>
              <div>Change Type: {selectedChangeType === 'all' ? 'All Types' : selectedChangeType}</div>
              <div>Records: {totalRecords}</div>
              <div>Format: {formatOptions.find(opt => opt.value === exportFormat)?.label}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={onClose} variant="outline" disabled={isExporting}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            disabled={isExporting}
          >
            {isExporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Exporting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {getFormatIcon(exportFormat)}
                Export Changes
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
