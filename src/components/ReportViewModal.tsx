
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Euro, Calendar, ArrowRight, Building2, GraduationCap } from "lucide-react";

interface PaymentFlow {
  fromMunicipality: string;
  toMunicipality?: string;
  toSchool?: string;
  amount: number;
  studentCount: number;
  type: 'municipal' | 'independent';
}

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
  // Mock detailed payment flows - in real app this would come from props
  const paymentFlows: PaymentFlow[] = [
    {
      fromMunicipality: "Municipality A",
      toMunicipality: "Municipality B", 
      amount: 125000,
      studentCount: 25,
      type: 'municipal'
    },
    {
      fromMunicipality: "Municipality A",
      toSchool: "Kunskapsskolan Malmö",
      amount: 98000,
      studentCount: 18,
      type: 'independent'
    },
    {
      fromMunicipality: "Municipality B",
      toMunicipality: "Municipality C",
      amount: 87000,
      studentCount: 19,
      type: 'municipal'
    },
    {
      fromMunicipality: "Municipality C",
      toSchool: "International School of Stockholm",
      amount: 156000,
      studentCount: 24,
      type: 'independent'
    },
    {
      fromMunicipality: "Municipality B",
      toMunicipality: "Municipality A",
      amount: 47000,
      studentCount: 12,
      type: 'municipal'
    },
    {
      fromMunicipality: "Municipality C",
      toMunicipality: "Municipality A",
      amount: 89000,
      studentCount: 16,
      type: 'municipal'
    }
  ];

  const totalMunicipalPayments = paymentFlows
    .filter(flow => flow.type === 'municipal')
    .reduce((sum, flow) => sum + flow.amount, 0);

  const totalIndependentPayments = paymentFlows
    .filter(flow => flow.type === 'independent')
    .reduce((sum, flow) => sum + flow.amount, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Payment Flow Report - {jobName}
          </DialogTitle>
          <DialogDescription>
            Detailed inter-municipal payment flows and independent school compensations
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-ike-neutral-light rounded-lg">
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
              <div className="text-2xl font-bold text-blue-600">
                €{(totalMunicipalPayments / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-ike-neutral">Municipal Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                €{(totalIndependentPayments / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-ike-neutral">Independent Schools</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-ike-neutral-dark flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-1" />
                {reportData.summary.processingDate}
              </div>
              <div className="text-sm text-ike-neutral">Processing Date</div>
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

          {/* Payment Flow Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Municipal Payments */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-blue-50 p-3 border-b flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-semibold text-ike-neutral-dark">Inter-Municipal Payments</h3>
                <Badge className="ml-auto bg-blue-600 text-white">
                  €{(totalMunicipalPayments / 1000).toFixed(0)}K
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                {paymentFlows
                  .filter(flow => flow.type === 'municipal')
                  .map((flow, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-ike-neutral-dark">
                            {flow.fromMunicipality}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-ike-neutral" />
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-ike-neutral-dark">
                            {flow.toMunicipality}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-ike-primary">
                          €{flow.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-ike-neutral">
                          {flow.studentCount} students
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Independent School Payments */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-purple-50 p-3 border-b flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="font-semibold text-ike-neutral-dark">Independent School Payments</h3>
                <Badge className="ml-auto bg-purple-600 text-white">
                  €{(totalIndependentPayments / 1000).toFixed(0)}K
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                {paymentFlows
                  .filter(flow => flow.type === 'independent')
                  .map((flow, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-ike-neutral-dark">
                            {flow.fromMunicipality}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-ike-neutral" />
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-ike-neutral-dark">
                            {flow.toSchool}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-ike-primary">
                          €{flow.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-ike-neutral">
                          {flow.studentCount} students
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-ike-neutral-light p-3 border-b">
              <h3 className="font-semibold text-ike-neutral-dark">Municipal Net Position Summary</h3>
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
