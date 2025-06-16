
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Euro, Calendar } from "lucide-react";

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobName: string;
  reportData: {
    summary: {
      totalAmount: number;
      municipalitiesCount: number;
      processingDate: string;
      status: string;
    };
    details: Array<{
      municipality: string;
      amountToPay: number;
      amountToReceive: number;
      netAmount: number;
      studentCount: number;
    }>;
  };
}

export const ReportViewModal = ({ isOpen, onClose, jobName, reportData }: ReportViewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Calculation Report - {jobName}
          </DialogTitle>
          <DialogDescription>
            Detailed inter-municipal payment calculation results
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-ike-neutral-light rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-ike-primary">
                €{(reportData.summary.totalAmount / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-ike-neutral">Total Amount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ike-neutral-dark">
                {reportData.summary.municipalitiesCount}
              </div>
              <div className="text-sm text-ike-neutral">Municipalities</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-ike-neutral-dark flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1" />
                {reportData.summary.processingDate}
              </div>
              <div className="text-sm text-ike-neutral">Processing Date</div>
            </div>
            <div className="text-center">
              <Badge className="bg-ike-success text-white">
                {reportData.summary.status}
              </Badge>
              <div className="text-sm text-ike-neutral mt-1">Status</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Print
            </Button>
          </div>

          {/* Details Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-ike-neutral-light p-3 border-b">
              <h3 className="font-semibold text-ike-neutral-dark">Municipal Payment Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-ike-neutral-dark">Municipality</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-ike-neutral-dark">Students</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-ike-neutral-dark">Amount to Pay</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-ike-neutral-dark">Amount to Receive</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-ike-neutral-dark">Net Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.details.map((detail, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-ike-neutral-dark">{detail.municipality}</td>
                      <td className="px-4 py-3 text-sm text-right text-ike-neutral-dark">{detail.studentCount}</td>
                      <td className="px-4 py-3 text-sm text-right text-ike-error">
                        €{detail.amountToPay.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-ike-success">
                        €{detail.amountToReceive.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${
                        detail.netAmount >= 0 ? 'text-ike-success' : 'text-ike-error'
                      }`}>
                        €{detail.netAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
