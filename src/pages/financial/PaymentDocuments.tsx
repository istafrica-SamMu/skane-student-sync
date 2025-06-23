
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileX
} from "lucide-react";
import type { PaymentDocument, PaymentDocumentItem, PaymentDocumentFilters } from "@/types/paymentDocuments";

const PaymentDocuments = () => {
  const { toast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<PaymentDocument | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<PaymentDocument | null>(null);
  const [filters, setFilters] = useState<PaymentDocumentFilters>({
    documentType: "all",
    status: "all"
  });

  // Mock data for payment documents
  const [paymentDocuments, setPaymentDocuments] = useState<PaymentDocument[]>([
    {
      id: "doc-001",
      documentNumber: "PAY-2024-001",
      type: "preliminary",
      status: "draft",
      period: "2024-12",
      measurementDate: "2024-12-31",
      createdDate: "2024-12-23T10:00:00Z",
      municipality: "Malmö Municipality",
      principal: "Lars Larsson",
      schoolUnit: "Malmö Gymnasium",
      totalAmount: 125000,
      studentCount: 25,
      canDelete: true
    },
    {
      id: "doc-002", 
      documentNumber: "PAY-2024-002",
      type: "definitive",
      status: "approved",
      period: "2024-11",
      measurementDate: "2024-11-30",
      createdDate: "2024-11-30T15:30:00Z",
      municipality: "Lund Municipality",
      principal: "Maria Svensson",
      schoolUnit: "Lund High School",
      totalAmount: 89500,
      studentCount: 18,
      errorMessages: ["Missing price code for 2 students"],
      canDelete: false
    },
    {
      id: "doc-003",
      documentNumber: "PAY-2024-003",
      type: "preliminary",
      status: "error",
      period: "2024-12",
      measurementDate: "2024-12-31",
      createdDate: "2024-12-22T09:15:00Z",
      municipality: "Helsingborg Municipality",
      principal: "Erik Eriksson",
      schoolUnit: "Technical School",
      totalAmount: 0,
      studentCount: 0,
      errorMessages: ["No valid students found", "Price code validation failed"],
      canDelete: true
    }
  ]);

  // Mock data for document items
  const [documentItems] = useState<PaymentDocumentItem[]>([
    {
      id: "item-001",
      documentId: "doc-001",
      studentPersonalId: "199901011234",
      studentFirstName: "Anna",
      studentLastName: "Andersson",
      schoolUnit: "Malmö Gymnasium",
      studyPath: "Naturvetenskapsprogrammet",
      year: "2024",
      priceCode: "NAT001",
      baseAmount: 4800,
      additionalAmount: 200,
      totalAmount: 5000
    },
    {
      id: "item-002",
      documentId: "doc-001",
      studentPersonalId: "199902021234",
      studentFirstName: "Erik",
      studentLastName: "Johansson",
      schoolUnit: "Malmö Gymnasium",
      studyPath: "Teknikprogrammet",
      year: "2024",
      priceCode: "TEK001",
      baseAmount: 5200,
      additionalAmount: 0,
      totalAmount: 5200
    }
  ]);

  const filteredDocuments = paymentDocuments.filter(doc => {
    if (filters.documentType !== "all" && doc.type !== filters.documentType) return false;
    if (filters.status !== "all" && doc.status !== filters.status) return false;
    if (filters.municipality && !doc.municipality.toLowerCase().includes(filters.municipality.toLowerCase())) return false;
    if (filters.principal && !doc.principal.toLowerCase().includes(filters.principal.toLowerCase())) return false;
    if (filters.period && doc.period !== filters.period) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="text-ike-neutral"><Clock className="w-3 h-3 mr-1" />Draft</Badge>;
      case "approved":
        return <Badge className="bg-ike-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "processed":
        return <Badge className="bg-ike-primary text-white"><FileText className="w-3 h-3 mr-1" />Processed</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white"><AlertTriangle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === "preliminary" ? 
      <Badge variant="outline" className="text-ike-warning">Preliminary</Badge> : 
      <Badge className="bg-ike-primary text-white">Definitive</Badge>;
  };

  const handleViewDocument = (document: PaymentDocument) => {
    setSelectedDocument(document);
    setIsDetailModalOpen(true);
  };

  const handleDeleteDocument = (document: PaymentDocument) => {
    setDocumentToDelete(document);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteDocument = () => {
    if (!documentToDelete) return;
    
    setPaymentDocuments(prev => prev.filter(doc => doc.id !== documentToDelete.id));
    setIsDeleteDialogOpen(false);
    setDocumentToDelete(null);
    
    toast({
      title: "Document Deleted",
      description: `Payment document ${documentToDelete.documentNumber} has been deleted.`,
      variant: "destructive",
    });
  };

  const getDocumentItems = (documentId: string) => {
    return documentItems.filter(item => item.documentId === documentId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Payment Documents</h1>
          <p className="text-ike-neutral mt-2">
            Manage preliminary and definitive payment documents for municipalities and principals
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Document
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{paymentDocuments.length}</div>
            <div className="text-xs text-ike-neutral">All periods</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Preliminary Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {paymentDocuments.filter(d => d.type === 'preliminary').length}
            </div>
            <div className="text-xs text-ike-neutral">Current period</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {paymentDocuments.reduce((sum, doc) => sum + doc.totalAmount, 0).toLocaleString('sv-SE')} SEK
            </div>
            <div className="text-xs text-ike-neutral">All documents</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Documents with Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {paymentDocuments.filter(d => d.status === 'error' || d.errorMessages?.length).length}
            </div>
            <div className="text-xs text-ike-neutral">Need attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral">Period</label>
              <Input
                type="month"
                value={filters.period || ""}
                onChange={(e) => setFilters({...filters, period: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ike-neutral">Document Type</label>
              <Select value={filters.documentType} onValueChange={(value) => setFilters({...filters, documentType: value as any})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="preliminary">Preliminary</SelectItem>
                  <SelectItem value="definitive">Definitive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-ike-neutral">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-ike-neutral">Municipality</label>
              <Input
                placeholder="Filter by municipality"
                value={filters.municipality || ""}
                onChange={(e) => setFilters({...filters, municipality: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ike-neutral">Principal</label>
              <Input
                placeholder="Filter by principal"
                value={filters.principal || ""}
                onChange={(e) => setFilters({...filters, principal: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => setFilters({ documentType: "all", status: "all" })}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Payment Documents ({filteredDocuments.length})
          </CardTitle>
          <CardDescription>
            Manage and view payment documents for all municipalities and principals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id} className="hover:bg-ike-neutral-light/50">
                  <TableCell className="font-medium text-ike-neutral-dark">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-ike-primary" />
                      {document.documentNumber}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(document.type)}</TableCell>
                  <TableCell>{getStatusBadge(document.status)}</TableCell>
                  <TableCell>{document.period}</TableCell>
                  <TableCell>{document.municipality}</TableCell>
                  <TableCell>{document.principal}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-ike-neutral" />
                      {document.studentCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-ike-success" />
                      {document.totalAmount.toLocaleString('sv-SE')} SEK
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(document.createdDate).toLocaleDateString('sv-SE')}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-ike-primary hover:bg-ike-primary/10"
                        onClick={() => handleViewDocument(document)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {document.canDelete && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-error hover:bg-ike-error/10"
                          onClick={() => handleDeleteDocument(document)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Payment Document Details
            </DialogTitle>
            <DialogDescription>
              Detailed view of payment document {selectedDocument?.documentNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6">
              {/* Document Header Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-ike-neutral-light/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Document Number</label>
                  <p className="text-lg font-semibold text-ike-neutral-dark">{selectedDocument.documentNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Type & Status</label>
                  <div className="flex space-x-2 mt-1">
                    {getTypeBadge(selectedDocument.type)}
                    {getStatusBadge(selectedDocument.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Period</label>
                  <p className="text-ike-neutral-dark">{selectedDocument.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Measurement Date</label>
                  <p className="text-ike-neutral-dark">{selectedDocument.measurementDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedDocument.municipality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Principal</label>
                  <p className="text-ike-neutral-dark">{selectedDocument.principal}</p>
                </div>
              </div>

              {/* Error Messages */}
              {selectedDocument.errorMessages && selectedDocument.errorMessages.length > 0 && (
                <div className="p-4 bg-ike-error/10 border border-ike-error/20 rounded-lg">
                  <h4 className="font-medium text-ike-error mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Error Messages
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedDocument.errorMessages.map((error, index) => (
                      <li key={index} className="text-sm text-ike-error">{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Document Items */}
              <div>
                <h4 className="font-medium text-ike-neutral-dark mb-4">Student Payment Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Personal ID</TableHead>
                      <TableHead className="text-xs">Student Name</TableHead>
                      <TableHead className="text-xs">Study Path</TableHead>
                      <TableHead className="text-xs">Price Code</TableHead>
                      <TableHead className="text-xs">Base Amount</TableHead>
                      <TableHead className="text-xs">Additional</TableHead>
                      <TableHead className="text-xs">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDocumentItems(selectedDocument.id).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-xs">{item.studentPersonalId}</TableCell>
                        <TableCell className="text-xs">{item.studentFirstName} {item.studentLastName}</TableCell>
                        <TableCell className="text-xs">{item.studyPath}</TableCell>
                        <TableCell className="text-xs">{item.priceCode}</TableCell>
                        <TableCell className="text-xs">{item.baseAmount.toLocaleString('sv-SE')} SEK</TableCell>
                        <TableCell className="text-xs">{item.additionalAmount.toLocaleString('sv-SE')} SEK</TableCell>
                        <TableCell className="text-xs font-medium">{item.totalAmount.toLocaleString('sv-SE')} SEK</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="p-4 bg-ike-primary/10 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-ike-neutral">Total Students</p>
                    <p className="text-2xl font-bold text-ike-neutral-dark">{selectedDocument.studentCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ike-neutral">Total Amount</p>
                    <p className="text-2xl font-bold text-ike-success">{selectedDocument.totalAmount.toLocaleString('sv-SE')} SEK</p>
                  </div>
                  <div>
                    <p className="text-sm text-ike-neutral">Average per Student</p>
                    <p className="text-2xl font-bold text-ike-primary">
                      {selectedDocument.studentCount > 0 ? 
                        Math.round(selectedDocument.totalAmount / selectedDocument.studentCount).toLocaleString('sv-SE') : '0'} SEK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete payment document {documentToDelete?.documentNumber}? 
              This action cannot be undone and will permanently remove the document and all associated payment data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteDocument}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Delete Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentDocuments;
