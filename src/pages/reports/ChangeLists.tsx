import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { 
  FileText, 
  Search, 
  Download, 
  Calendar,
  Filter,
  AlertTriangle,
  User,
  MapPin,
  Clock,
  Euro,
  DollarSign,
  Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ChangeDetailsModal } from "@/components/reports/ChangeDetailsModal";
import { ExportChangesModal } from "@/components/reports/ExportChangesModal";
import { ConfidentialContactModal } from "@/components/reports/ConfidentialContactModal";

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

const ChangeLists = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024-11");
  const [selectedChangeType, setSelectedChangeType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Modal states
  const [selectedRecord, setSelectedRecord] = useState<ChangeRecord | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isConfidentialModalOpen, setIsConfidentialModalOpen] = useState(false);
  const [confidentialRecordId, setConfidentialRecordId] = useState<string>("");

  // Sample data for all change types including municipality registration with additional amounts
  const mockChangeRecords: ChangeRecord[] = [
    {
      id: "CHG-001",
      studentId: 1,
      studentName: "Erik Andersson",
      changeType: "population_registration",
      changeDate: "2024-11-15T10:30:00Z",
      previousValue: "Stockholm Municipality",
      newValue: "Malmö Municipality",
      municipality: "Malmö",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-002", 
      studentId: 2,
      studentName: "Confidential Student",
      changeType: "population_registration",
      changeDate: "2024-11-12T14:20:00Z",
      previousValue: "***",
      newValue: "***",
      municipality: "Confidential",
      isConfidential: true,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-003",
      studentId: 3,
      studentName: "Anna Petersson",
      changeType: "population_registration", 
      changeDate: "2024-11-08T09:15:00Z",
      previousValue: "Göteborg Municipality",
      newValue: "Lund Municipality",
      municipality: "Lund",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-004",
      studentId: 4,
      studentName: "Magnus Olsson",
      changeType: "price_code",
      changeDate: "2024-11-14T11:45:00Z",
      previousValue: "PC-101 (Standard Rate)",
      newValue: "PC-205 (Premium Rate)",
      municipality: "Malmö",
      schoolUnit: "Malmö Technical School",
      studyPath: "Engineering Program",
      priceCodeCategory: "Technical Education",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-005",
      studentId: 5,
      studentName: "Confidential Student",
      changeType: "price_code",
      changeDate: "2024-11-10T16:30:00Z",
      previousValue: "***",
      newValue: "***",
      municipality: "Confidential",
      schoolUnit: "***",
      studyPath: "***",
      priceCodeCategory: "***",
      isConfidential: true,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-006",
      studentId: 6,
      studentName: "Sara Lindberg",
      changeType: "price_code",
      changeDate: "2024-11-05T13:15:00Z",
      previousValue: "PC-301 (Specialized Rate)",
      newValue: "PC-102 (Basic Rate)",
      municipality: "Stockholm",
      schoolUnit: "Stockholm Arts Academy",
      studyPath: "Arts & Design Program",
      priceCodeCategory: "Creative Arts",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-007",
      studentId: 7,
      studentName: "Johan Svensson",
      changeType: "start_date",
      changeDate: "2024-11-09T08:45:00Z",
      previousValue: "No start date",
      newValue: "2024-11-15",
      municipality: "Malmö",
      schoolUnit: "Malmö Business School",
      studyPath: "Business Administration",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-008",
      studentId: 8,
      studentName: "Maria Nilsson",
      changeType: "start_date",
      changeDate: "2024-11-07T14:20:00Z",
      previousValue: "2024-10-01",
      newValue: "2024-11-01",
      municipality: "Stockholm",
      schoolUnit: "Stockholm Technical Institute",
      studyPath: "Computer Science",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-009",
      studentId: 9,
      studentName: "Confidential Student",
      changeType: "start_date",
      changeDate: "2024-11-11T11:15:00Z",
      previousValue: "***",
      newValue: "***",
      municipality: "Confidential",
      schoolUnit: "***",
      studyPath: "***",
      isConfidential: true,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-010",
      studentId: 10,
      studentName: "Lars Petersson",
      changeType: "end_date",
      changeDate: "2024-11-13T16:30:00Z",
      previousValue: "2025-06-15",
      newValue: "2024-12-20",
      municipality: "Göteborg",
      schoolUnit: "Göteborg Vocational School",
      studyPath: "Automotive Technology",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-011",
      studentId: 11,
      studentName: "Emma Johansson",
      changeType: "end_date",
      changeDate: "2024-11-06T10:10:00Z",
      previousValue: "No end date",
      newValue: "2025-05-30",
      municipality: "Lund",
      schoolUnit: "Lund Arts College",
      studyPath: "Visual Arts Program",
      isConfidential: false,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-012",
      studentId: 12,
      studentName: "Confidential Student",
      changeType: "end_date",
      changeDate: "2024-11-04T09:25:00Z",
      previousValue: "***",
      newValue: "***",
      municipality: "Confidential",
      schoolUnit: "***",
      studyPath: "***",
      isConfidential: true,
      measurementDate: "2024-11-01"
    },
    {
      id: "CHG-013",
      studentId: 13,
      studentName: "Peter Magnusson",
      changeType: "municipality_registration",
      changeDate: "2024-11-16T09:30:00Z",
      previousValue: "Helsingborg Municipality",
      newValue: "Malmö Municipality",
      municipality: "Malmö",
      schoolUnit: "Malmö International School",
      studyPath: "International Baccalaureate",
      isConfidential: false,
      measurementDate: "2024-11-01",
      additionalAmounts: {
        applied: 3,
        total: 15500,
        categories: ["Language Support", "Special Education", "Transportation"]
      }
    },
    {
      id: "CHG-014",
      studentId: 14,
      studentName: "Lisa Karlsson",
      changeType: "municipality_registration",
      changeDate: "2024-11-14T14:15:00Z",
      previousValue: "Kristianstad Municipality",
      newValue: "Lund Municipality",
      municipality: "Lund",
      schoolUnit: "Lund Science Academy",
      studyPath: "Natural Science Program",
      isConfidential: false,
      measurementDate: "2024-11-01",
      additionalAmounts: {
        applied: 2,
        total: 8200,
        categories: ["Lab Equipment", "Advanced Materials"]
      }
    },
    {
      id: "CHG-015",
      studentId: 15,
      studentName: "Confidential Student",
      changeType: "municipality_registration",
      changeDate: "2024-11-11T16:45:00Z",
      previousValue: "***",
      newValue: "***",
      municipality: "Confidential",
      schoolUnit: "***",
      studyPath: "***",
      isConfidential: true,
      measurementDate: "2024-11-01",
      additionalAmounts: {
        applied: 0,
        total: 0,
        categories: []
      }
    },
    {
      id: "CHG-016",
      studentId: 16,
      studentName: "Andreas Johansson",
      changeType: "municipality_registration",
      changeDate: "2024-11-09T11:20:00Z",
      previousValue: "Växjö Municipality",
      newValue: "Stockholm Municipality",
      municipality: "Stockholm",
      schoolUnit: "Stockholm Business Institute",
      studyPath: "Economics Program",
      isConfidential: false,
      measurementDate: "2024-11-01",
      additionalAmounts: {
        applied: 1,
        total: 12000,
        categories: ["Urban Studies Supplement"]
      }
    }
  ];

  const isSummerMonth = (date: string) => {
    const month = new Date(date).getMonth() + 1; // getMonth() returns 0-11
    return month >= 7 && month <= 9; // July (7), August (8), September (9)
  };

  const getFilteredRecords = () => {
    let filtered = mockChangeRecords;

    // Apply change type filter
    if (selectedChangeType !== "all") {
      filtered = filtered.filter(record => record.changeType === selectedChangeType);
    }

    // Apply summer months logic - only show population registration changes during July-September
    if (isSummerMonth(selectedPeriod)) {
      filtered = filtered.filter(record => record.changeType === 'population_registration');
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getPaginatedRecords = () => {
    const filtered = getFilteredRecords();
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredRecords();
    return Math.ceil(filtered.length / recordsPerPage);
  };

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
    return <IconComponent className="w-3 h-3" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE') + ' ' + 
           new Date(dateString).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  const handleViewDetails = (record: ChangeRecord) => {
    setSelectedRecord(record);
    setIsDetailsModalOpen(true);
  };

  const handleConfidentialContact = (recordId: string) => {
    setConfidentialRecordId(recordId);
    setIsConfidentialModalOpen(true);
  };

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const filteredRecords = getFilteredRecords();
  const paginatedRecords = getPaginatedRecords();
  const totalPages = getTotalPages();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'period') setSelectedPeriod(value);
    if (filterType === 'changeType') setSelectedChangeType(value);
    if (filterType === 'search') setSearchTerm(value);
  };

  const handleResetFilters = () => {
    setSelectedChangeType("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Change Lists</h1>
          <p className="text-ike-neutral mt-2">
            Track changes since previous measurement date with comprehensive change tracking
          </p>
        </div>
        <Button 
          className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          onClick={handleExportClick}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Changes
        </Button>
      </div>

      {/* Summer Period Warning */}
      {isSummerMonth(selectedPeriod) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Summer Period Active</p>
                <p className="text-sm text-orange-700">
                  During July, August and September, only population registration changes are shown. 
                  No education-related changes (including price codes, start/end dates, municipality registration) are tracked during summer months.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Filter className="w-5 h-5 mr-2 text-ike-primary" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Period
              </label>
              <Select value={selectedPeriod} onValueChange={(value) => handleFilterChange('period', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-11">November 2024</SelectItem>
                  <SelectItem value="2024-10">October 2024</SelectItem>
                  <SelectItem value="2024-09">September 2024 (Summer)</SelectItem>
                  <SelectItem value="2024-08">August 2024 (Summer)</SelectItem>
                  <SelectItem value="2024-07">July 2024 (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral-dark mb-2 block">
                Change Type
              </label>
              <Select value={selectedChangeType} onValueChange={(value) => handleFilterChange('changeType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Changes</SelectItem>
                  <SelectItem value="population_registration">Population Registration</SelectItem>
                  <SelectItem value="price_code">Price Code</SelectItem>
                  <SelectItem value="start_date">Start Date</SelectItem>
                  <SelectItem value="end_date">End Date</SelectItem>
                  <SelectItem value="municipality_registration">Municipality Registration</SelectItem>
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
                  placeholder="Search changes..."
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

      {/* Change Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-ike-neutral-dark">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Change Records ({filteredRecords.length})
            </span>
            <Badge variant="outline">
              Since: {selectedPeriod}-01
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Change ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Change Type</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>Additional Info</TableHead>
                <TableHead>Change Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.map((record) => (
                <TableRow key={record.id} className={record.isConfidential ? "bg-yellow-50" : ""}>
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-ike-neutral" />
                      <span>{record.studentName}</span>
                      {record.isConfidential && (
                        <Badge variant="destructive" className="text-xs">
                          Confidential
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      {getChangeTypeIcon(record.changeType)}
                      {getChangeTypeLabel(record.changeType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {record.isConfidential ? "***" : record.previousValue}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {record.isConfidential ? "***" : record.newValue}
                  </TableCell>
                  <TableCell className="text-sm">
                    {record.changeType === 'price_code' && !record.isConfidential && (
                      <div className="space-y-1">
                        <div>School: {record.schoolUnit}</div>
                        <div>Study Path: {record.studyPath}</div>
                        <div>Category: {record.priceCodeCategory}</div>
                      </div>
                    )}
                    {(record.changeType === 'start_date' || record.changeType === 'end_date') && !record.isConfidential && (
                      <div className="space-y-1">
                        <div>School Unit: {record.schoolUnit}</div>
                        <div>Study Path: {record.studyPath}</div>
                        <div>Municipality: {record.municipality}</div>
                      </div>
                    )}
                    {record.changeType === 'municipality_registration' && !record.isConfidential && (
                      <div className="space-y-1">
                        <div>School Unit: {record.schoolUnit}</div>
                        <div>Study Path: {record.studyPath}</div>
                        <div>Municipality: {record.municipality}</div>
                        {record.additionalAmounts && record.additionalAmounts.applied > 0 && (
                          <div className="mt-2 p-2 bg-green-50 rounded border">
                            <div className="font-medium text-green-800 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              Additional Amounts Applied: {record.additionalAmounts.applied}
                            </div>
                            <div className="text-green-700 text-xs">
                              Total: {record.additionalAmounts.total.toLocaleString()} SEK
                            </div>
                            <div className="text-green-600 text-xs">
                              Categories: {record.additionalAmounts.categories.join(", ")}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {record.changeType === 'population_registration' && !record.isConfidential && (
                      <div>Municipality: {record.municipality}</div>
                    )}
                    {record.isConfidential && <span className="text-ike-neutral">***</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3 text-ike-neutral" />
                      {formatDate(record.changeDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {record.isConfidential ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleConfidentialContact(record.id)}
                        >
                          Contact Admin
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleViewDetails(record)}
                          className="text-ike-primary hover:text-ike-primary-dark"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-ike-neutral">
                    No change records found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-ike-neutral">
                Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length} results
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

      {/* Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Change Summary</CardTitle>
          <CardDescription>
            Summary of changes since measurement date: {selectedPeriod}-01
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-ike-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-ike-primary">
                {filteredRecords.filter(r => r.changeType === 'population_registration').length}
              </div>
              <div className="text-sm text-ike-neutral">Population Registration</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {filteredRecords.filter(r => r.changeType === 'price_code').length}
              </div>
              <div className="text-sm text-ike-neutral">Price Code Changes</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredRecords.filter(r => r.changeType === 'start_date').length}
              </div>
              <div className="text-sm text-ike-neutral">Start Date Changes</div>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {filteredRecords.filter(r => r.changeType === 'end_date').length}
              </div>
              <div className="text-sm text-ike-neutral">End Date Changes</div>
            </div>
            <div className="text-center p-4 bg-teal-100 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">
                {filteredRecords.filter(r => r.changeType === 'municipality_registration').length}
              </div>
              <div className="text-sm text-ike-neutral">Municipality Registration</div>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {filteredRecords.filter(r => r.isConfidential).length}
              </div>
              <div className="text-sm text-ike-neutral">Confidential Records</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ChangeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        record={selectedRecord}
      />

      <ExportChangesModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        totalRecords={filteredRecords.length}
        selectedPeriod={selectedPeriod}
        selectedChangeType={selectedChangeType}
      />

      <ConfidentialContactModal
        isOpen={isConfidentialModalOpen}
        onClose={() => setIsConfidentialModalOpen(false)}
        recordId={confidentialRecordId}
      />
    </div>
  );
};

export default ChangeLists;
