
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { 
  AlertTriangle, 
  Search, 
  Download, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  MapPin
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PaymentError, ErrorListFilters } from "@/types/errorLists";
import { ErrorDetailsModal } from "@/components/reports/ErrorDetailsModal";

const ErrorLists = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024-11");
  const [selectedErrorType, setSelectedErrorType] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Modal states
  const [selectedError, setSelectedError] = useState<PaymentError | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data for payment errors
  const mockPaymentErrors: PaymentError[] = [
    {
      id: "ERR-001",
      studentId: 1001,
      studentName: "Erik Andersson",
      personalId: "20051201-1234",
      errorType: "price_code_missing",
      errorCategory: "payment_blocking",
      severity: "high",
      municipality: "Malmö",
      principal: "Malmö Technical School",
      schoolUnit: "Malmö Technical High School",
      studyPath: "Engineering Program",
      errorMessage: "No price information available from principal for price code PC-205",
      detectedDate: "2024-11-15T10:30:00Z",
      status: "active",
      paymentImpact: {
        blockedAmount: 15000,
        affectedPeriods: ["2024-11", "2024-12"]
      },
      additionalInfo: {
        priceCode: "PC-205"
      }
    },
    {
      id: "ERR-002",
      studentId: 1002,
      studentName: "Anna Petersson",
      personalId: "20040315-5678",
      errorType: "municipality_connection",
      errorCategory: "payment_blocking",
      severity: "high",
      municipality: "Unknown",
      schoolUnit: "Lund Arts Academy",
      studyPath: "Visual Arts Program",
      errorMessage: "Student has no connection to any paying home municipality",
      detectedDate: "2024-11-14T14:20:00Z",
      status: "investigating",
      paymentImpact: {
        blockedAmount: 12500,
        affectedPeriods: ["2024-11"]
      }
    },
    {
      id: "ERR-003",
      studentId: 1003,
      studentName: "Magnus Olsson",
      personalId: "20050620-9012",
      errorType: "emigrated",
      errorCategory: "information",
      severity: "medium",
      municipality: "Stockholm",
      schoolUnit: "Stockholm International School",
      studyPath: "International Baccalaureate",
      errorMessage: "Student has emigrated according to population registration",
      detectedDate: "2024-11-13T09:15:00Z",
      status: "resolved",
      paymentImpact: {
        blockedAmount: 0,
        affectedPeriods: []
      }
    },
    {
      id: "ERR-004",
      studentId: 1004,
      studentName: "Sara Lindberg",
      personalId: "20041110-3456",
      errorType: "overlapping_placement",
      errorCategory: "payment_blocking",
      severity: "high",
      municipality: "Göteborg",
      schoolUnit: "Multiple Units",
      studyPath: "Multiple Programs",
      errorMessage: "Student has overlapping placements at Göteborg Technical School and Göteborg Arts College",
      detectedDate: "2024-11-12T16:45:00Z",
      status: "active",
      paymentImpact: {
        blockedAmount: 18000,
        affectedPeriods: ["2024-11", "2024-12"]
      },
      additionalInfo: {
        placementDates: ["2024-09-01 to 2025-06-15", "2024-10-15 to 2025-05-30"]
      }
    },
    {
      id: "ERR-005",
      studentId: 1005,
      studentName: "Johan Svensson",
      personalId: "20020801-7890",
      errorType: "year_4_upper_secondary",
      errorCategory: "validation",
      severity: "medium",
      municipality: "Malmö",
      schoolUnit: "Malmö Business School",
      studyPath: "Business Administration",
      errorMessage: "Student is in year 4 of upper secondary education",
      detectedDate: "2024-11-11T11:30:00Z",
      status: "active",
      paymentImpact: {
        blockedAmount: 14000,
        affectedPeriods: ["2024-11"]
      }
    },
    {
      id: "ERR-006",
      studentId: 1006,
      studentName: "Maria Nilsson",
      personalId: "20030425-2345",
      errorType: "year_5_adapted",
      errorCategory: "validation",
      severity: "medium",
      municipality: "Lund",
      schoolUnit: "Lund Special Education Center",
      studyPath: "Adapted Program",
      errorMessage: "Student is in year 5 of adapted upper secondary education",
      detectedDate: "2024-11-10T13:20:00Z",
      status: "investigating"
    },
    {
      id: "ERR-007",
      studentId: 1007,
      studentName: "Lars Petersson",
      personalId: "20040712-6789",
      errorType: "has_diploma",
      errorCategory: "validation",
      severity: "low",
      municipality: "Stockholm",
      schoolUnit: "Stockholm Technical Institute",
      studyPath: "Computer Science",
      errorMessage: "Student has already received a diploma but is still registered",
      detectedDate: "2024-11-09T15:45:00Z",
      status: "resolved",
      additionalInfo: {
        diplomaDate: "2024-06-15"
      }
    },
    {
      id: "ERR-008",
      studentId: 1008,
      studentName: "Emma Johansson",
      personalId: "20050330-0123",
      errorType: "integration_missing",
      errorCategory: "information",
      severity: "high",
      municipality: "Helsingborg",
      principal: "Helsingborg Education Group",
      schoolUnit: "Unknown",
      studyPath: "Unknown",
      errorMessage: "Student no longer appears in principal's student register integration",
      detectedDate: "2024-11-08T08:30:00Z",
      status: "active"
    }
  ];

  const getFilteredErrors = () => {
    let filtered = mockPaymentErrors;

    if (selectedErrorType !== "all") {
      filtered = filtered.filter(error => error.errorType === selectedErrorType);
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter(error => error.severity === selectedSeverity);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(error => error.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(error => 
        error.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.personalId.includes(searchTerm)
      );
    }

    return filtered;
  };

  const getPaginatedErrors = () => {
    const filtered = getFilteredErrors();
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredErrors();
    return Math.ceil(filtered.length / recordsPerPage);
  };

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

  const handleViewDetails = (error: PaymentError) => {
    setSelectedError(error);
    setIsDetailsModalOpen(true);
  };

  const filteredErrors = getFilteredErrors();
  const paginatedErrors = getPaginatedErrors();
  const totalPages = getTotalPages();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'errorType') setSelectedErrorType(value);
    if (filterType === 'severity') setSelectedSeverity(value);
    if (filterType === 'status') setSelectedStatus(value);
    if (filterType === 'search') setSearchTerm(value);
  };

  const handleResetFilters = () => {
    setSelectedErrorType("all");
    setSelectedSeverity("all");
    setSelectedStatus("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Error Lists</h1>
          <p className="text-ike-neutral mt-2">
            Payment-affecting errors and validation issues requiring attention
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Error Report
        </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Error Type
              </label>
              <Select value={selectedErrorType} onValueChange={(value) => handleFilterChange('errorType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Error Types</SelectItem>
                  <SelectItem value="price_code_missing">Missing Price Code</SelectItem>
                  <SelectItem value="municipality_connection">No Municipality Connection</SelectItem>
                  <SelectItem value="emigrated">Emigrated Student</SelectItem>
                  <SelectItem value="overlapping_placement">Overlapping Placement</SelectItem>
                  <SelectItem value="year_4_upper_secondary">Year 4 Upper Secondary</SelectItem>
                  <SelectItem value="year_5_adapted">Year 5 Adapted Education</SelectItem>
                  <SelectItem value="has_diploma">Has Diploma</SelectItem>
                  <SelectItem value="integration_missing">Integration Missing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Severity
              </label>
              <Select value={selectedSeverity} onValueChange={(value) => handleFilterChange('severity', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                <Input
                  placeholder="Search errors..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full border-ike-primary text-ike-primary hover:bg-ike-primary/10"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-red-600">Active Errors</p>
                <p className="text-2xl font-bold text-red-700">
                  {filteredErrors.filter(e => e.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-orange-600">Payment Blocked</p>
                <p className="text-2xl font-bold text-orange-700">
                  {filteredErrors.reduce((sum, e) => sum + (e.paymentImpact?.blockedAmount || 0), 0).toLocaleString()} SEK
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-yellow-600">Investigating</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {filteredErrors.filter(e => e.status === 'investigating').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="ml-2">
                <p className="text-sm font-medium text-green-600">Resolved</p>
                <p className="text-2xl font-bold text-green-700">
                  {filteredErrors.filter(e => e.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Lists Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
            <span className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-ike-primary" />
              Payment Errors ({filteredErrors.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Error ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Error Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell className="font-mono text-sm">{error.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-ike-neutral" />
                      <div>
                        <div className="font-medium">{error.studentName}</div>
                        <div className="text-sm text-ike-neutral">{error.personalId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getErrorTypeLabel(error.errorType)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(error.severity)}</TableCell>
                  <TableCell>{getStatusBadge(error.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-ike-neutral" />
                      {error.municipality}
                    </div>
                  </TableCell>
                  <TableCell>
                    {error.paymentImpact?.blockedAmount ? (
                      <div className="text-sm">
                        <div className="font-medium text-red-600">
                          {error.paymentImpact.blockedAmount.toLocaleString()} SEK
                        </div>
                        <div className="text-ike-neutral">
                          {error.paymentImpact.affectedPeriods.length} periods
                        </div>
                      </div>
                    ) : (
                      <span className="text-ike-neutral">No impact</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-ike-neutral">
                    {new Date(error.detectedDate).toLocaleDateString('sv-SE')}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleViewDetails(error)}
                      className="text-ike-primary hover:text-ike-primary-dark"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedErrors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-ike-neutral">
                    No errors found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-ike-neutral">
                Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, filteredErrors.length)} of {filteredErrors.length} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Details Modal */}
      <ErrorDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        error={selectedError}
      />
    </div>
  );
};

export default ErrorLists;
