
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar,
  Building,
  DollarSign,
  AlertTriangle,
  Users,
  MapPin,
  Clock,
  Shield,
  Eye,
  Filter,
  Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PrivacyIndicator from "@/components/students/PrivacyIndicator";

interface ChangeListItem {
  id: string;
  studentId: number;
  changeType: 'population_registration' | 'price_code' | 'start_date' | 'end_date' | 'municipality_registration_additional';
  changeDate: string;
  previousValue: string;
  newValue: string;
  municipality: string;
  schoolUnit?: string;
  priceCode?: string;
  isConfidential: boolean;
  measurementPeriod: string;
}

const ChangeLists = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedChangeType, setSelectedChangeType] = useState<string>("all");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isConfidentialModalOpen, setIsConfidentialModalOpen] = useState(false);
  const [selectedConfidentialItem, setSelectedConfidentialItem] = useState<ChangeListItem | null>(null);

  // Mock data for testing - in real implementation this would come from API
  const [changeListItems, setChangeListItems] = useState<ChangeListItem[]>([
    {
      id: "1",
      studentId: 12345,
      changeType: 'population_registration',
      changeDate: '2024-11-10',
      previousValue: 'Malmö Municipality',
      newValue: 'Lund Municipality',
      municipality: 'Lund',
      isConfidential: false,
      measurementPeriod: '2024-11'
    },
    {
      id: "2",
      studentId: 67890,
      changeType: 'price_code',
      changeDate: '2024-11-12',
      previousValue: 'PC001 - Standard Rate',
      newValue: 'PC003 - Enhanced Rate',
      municipality: 'Malmö',
      schoolUnit: 'Malmö Gymnasium',
      priceCode: 'PC003',
      isConfidential: true,
      measurementPeriod: '2024-11'
    },
    {
      id: "3",
      studentId: 11111,
      changeType: 'start_date',
      changeDate: '2024-11-08',
      previousValue: 'No enrollment',
      newValue: '2024-11-15',
      municipality: 'Helsingborg',
      schoolUnit: 'Helsingborg Technical School',
      isConfidential: false,
      measurementPeriod: '2024-11'
    },
    {
      id: "4",
      studentId: 22222,
      changeType: 'end_date',
      changeDate: '2024-11-05',
      previousValue: 'Active enrollment',
      newValue: '2024-11-30',
      municipality: 'Kristianstad',
      schoolUnit: 'Kristianstad Business School',
      isConfidential: false,
      measurementPeriod: '2024-11'
    },
    {
      id: "5",
      studentId: 33333,
      changeType: 'municipality_registration_additional',
      changeDate: '2024-11-14',
      previousValue: 'Malmö Municipality (Additional: 500 SEK)',
      newValue: 'Lund Municipality (Additional: 750 SEK)',
      municipality: 'Lund',
      isConfidential: true,
      measurementPeriod: '2024-11'
    }
  ]);

  // Check if current month is summer period (July, August, September)
  const isSummerPeriod = () => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    return currentMonth >= 7 && currentMonth <= 9;
  };

  // Filter changes based on summer period restrictions
  const getFilteredChanges = () => {
    let filtered = changeListItems;

    // Summer period restrictions
    if (isSummerPeriod()) {
      filtered = filtered.filter(item => item.changeType === 'population_registration');
    }

    // Apply user filters
    if (selectedChangeType !== "all") {
      filtered = filtered.filter(item => item.changeType === selectedChangeType);
    }

    if (selectedMunicipality !== "all") {
      filtered = filtered.filter(item => item.municipality === selectedMunicipality);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.studentId.toString().includes(searchTerm) ||
        item.municipality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.schoolUnit && item.schoolUnit.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case 'population_registration':
        return 'Population Registration';
      case 'price_code':
        return 'Price Code';
      case 'start_date':
        return 'Start Date';
      case 'end_date':
        return 'End Date';
      case 'municipality_registration_additional':
        return 'Municipality Registration (Additional Amounts)';
      default:
        return type;
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'population_registration':
        return <MapPin className="w-4 h-4" />;
      case 'price_code':
        return <DollarSign className="w-4 h-4" />;
      case 'start_date':
      case 'end_date':
        return <Calendar className="w-4 h-4" />;
      case 'municipality_registration_additional':
        return <Building className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleConfidentialItemClick = (item: ChangeListItem) => {
    setSelectedConfidentialItem(item);
    setIsConfidentialModalOpen(true);
  };

  const handleExportChanges = () => {
    const filteredChanges = getFilteredChanges();
    toast({
      title: "Export Started",
      description: `Exporting ${filteredChanges.length} change list items...`,
    });
  };

  const filteredChanges = getFilteredChanges();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Change Lists</h1>
          <p className="text-ike-neutral mt-2">
            Track changes since previous measurement date for population registration, price codes, and student placements
          </p>
          {isSummerPeriod() && (
            <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-700">
                  Summer Period Active: Only population registration changes are shown (July-September)
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={handleExportChanges}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Changes
          </Button>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-ike-neutral">Measurement Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-11">November 2024</SelectItem>
                  <SelectItem value="2024-10">October 2024</SelectItem>
                  <SelectItem value="2024-09">September 2024</SelectItem>
                  <SelectItem value="2024-08">August 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral">Change Type</label>
              <Select value={selectedChangeType} onValueChange={setSelectedChangeType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All changes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Changes</SelectItem>
                  <SelectItem value="population_registration">Population Registration</SelectItem>
                  {!isSummerPeriod() && (
                    <>
                      <SelectItem value="price_code">Price Code</SelectItem>
                      <SelectItem value="start_date">Start Date</SelectItem>
                      <SelectItem value="end_date">End Date</SelectItem>
                      <SelectItem value="municipality_registration_additional">Municipality Registration (Additional)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral">Municipality</label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All municipalities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  <SelectItem value="malmö">Malmö</SelectItem>
                  <SelectItem value="lund">Lund</SelectItem>
                  <SelectItem value="helsingborg">Helsingborg</SelectItem>
                  <SelectItem value="kristianstad">Kristianstad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-ike-neutral">Search</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                <Input
                  placeholder="Student ID, municipality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{filteredChanges.length}</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Since last measurement
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Confidential Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {filteredChanges.filter(item => item.isConfidential).length}
            </div>
            <div className="flex items-center text-xs text-ike-warning mt-1">
              Require special handling
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Population Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {filteredChanges.filter(item => item.changeType === 'population_registration').length}
            </div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Municipality transfers
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Student Placements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {filteredChanges.filter(item => item.changeType === 'start_date' || item.changeType === 'end_date').length}
            </div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Start/end dates
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change List Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <FileText className="w-5 h-5 mr-2 text-ike-primary" />
            Change List Items
          </CardTitle>
          <CardDescription>
            Changes tracked since the previous measurement date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredChanges.length === 0 ? (
              <div className="text-center py-8 text-ike-neutral">
                <FileText className="w-12 h-12 mx-auto mb-4 text-ike-neutral/50" />
                <p>No changes found for the selected filters.</p>
              </div>
            ) : (
              filteredChanges.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-ike-neutral-light/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-ike-primary/10 text-ike-primary rounded-lg flex items-center justify-center">
                      {getChangeTypeIcon(item.changeType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-ike-neutral-dark">
                          {item.isConfidential ? (
                            <span className="flex items-center">
                              <Shield className="w-4 h-4 mr-1 text-ike-warning" />
                              Confidential Student Information
                            </span>
                          ) : (
                            `Student ID: ${item.studentId}`
                          )}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {getChangeTypeLabel(item.changeType)}
                        </Badge>
                      </div>
                      
                      {!item.isConfidential ? (
                        <div className="text-sm text-ike-neutral mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <span className="font-medium">From:</span> {item.previousValue}
                            </div>
                            <div>
                              <span className="font-medium">To:</span> {item.newValue}
                            </div>
                          </div>
                          {item.schoolUnit && (
                            <div className="mt-1">
                              <span className="font-medium">School Unit:</span> {item.schoolUnit}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-ike-neutral mt-1">
                          Contact Skåne Municipality system administrator for more information
                        </div>
                      )}
                      
                      <div className="flex items-center text-xs text-ike-neutral mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.changeDate}
                        <span className="mx-2">•</span>
                        <Building className="w-3 h-3 mr-1" />
                        {item.municipality}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.isConfidential && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-ike-warning text-ike-warning hover:bg-ike-warning/10"
                        onClick={() => handleConfidentialItemClick(item)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confidential Item Details Modal */}
      <Dialog open={isConfidentialModalOpen} onOpenChange={setIsConfidentialModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-ike-neutral-dark">
              <Shield className="w-5 h-5 mr-2 text-ike-warning" />
              Confidential Student Information
            </DialogTitle>
            <DialogDescription>
              Information about confidential student change
            </DialogDescription>
          </DialogHeader>
          
          {selectedConfidentialItem && (
            <div className="space-y-6">
              <div className="p-4 bg-ike-warning/10 border-l-4 border-ike-warning rounded-md">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-ike-warning mr-2" />
                  <h4 className="font-medium text-ike-warning">Confidential Information</h4>
                </div>
                <p className="text-sm text-ike-neutral">
                  This student is marked as confidential. For detailed information about the student and available population registration data, 
                  please contact the Skåne Municipality system administrator.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Change Type</label>
                  <p className="text-ike-neutral-dark">{getChangeTypeLabel(selectedConfidentialItem.changeType)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Change Date</label>
                  <p className="text-ike-neutral-dark">{selectedConfidentialItem.changeDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                  <p className="text-ike-neutral-dark">{selectedConfidentialItem.municipality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Measurement Period</label>
                  <p className="text-ike-neutral-dark">{selectedConfidentialItem.measurementPeriod}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">Contact Information</h4>
                <p className="text-sm text-blue-700">
                  <strong>Skåne Municipality System Administrator</strong><br />
                  Email: systemadmin@skane.se<br />
                  Phone: +46 40 123 456<br />
                  Available: Monday-Friday, 8:00-17:00
                </p>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setIsConfidentialModalOpen(false)}
                  className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeLists;
