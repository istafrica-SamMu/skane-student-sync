import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  Plus, 
  Filter, 
  TrendingUp, 
  Building, 
  Calendar,
  Euro,
  Eye,
  Edit
} from 'lucide-react';
import { CreateReferenceListModal } from '@/components/modals/CreateReferenceListModal';
import { MunicipalityDetailsModal } from '@/components/modals/MunicipalityDetailsModal';
import { EditReferenceListModal } from '@/components/modals/EditReferenceListModal';
import { useToast } from "@/hooks/use-toast";

// Mock data for municipalities
const municipalities = [
  { id: 1, name: "Malmö", code: "1280", basicEducation: 85000, specialEducation: 125000, gymProgram: 95000, vocationalProgram: 105000, preparatoryProgram: 75000 },
  { id: 2, name: "Lund", code: "1281", basicEducation: 82000, specialEducation: 120000, gymProgram: 92000, vocationalProgram: 102000, preparatoryProgram: 72000 },
  { id: 3, name: "Helsingborg", code: "1283", basicEducation: 83000, specialEducation: 122000, gymProgram: 93000, vocationalProgram: 103000, preparatoryProgram: 73000 },
  { id: 4, name: "Kristianstad", code: "1290", basicEducation: 81000, specialEducation: 118000, gymProgram: 91000, vocationalProgram: 101000, preparatoryProgram: 71000 },
  { id: 5, name: "Landskrona", code: "1282", basicEducation: 80000, specialEducation: 115000, gymProgram: 90000, vocationalProgram: 100000, preparatoryProgram: 70000 },
];

// Mock data for reconciliation periods
const reconciliationPeriods = [
  "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4",
  "2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4"
];

// Chart data for trends
const trendData = [
  { period: "2023-Q1", Malmö: 83000, Lund: 80000, Reference: 78000 },
  { period: "2023-Q2", Malmö: 83500, Lund: 80500, Reference: 78500 },
  { period: "2023-Q3", Malmö: 84000, Lund: 81000, Reference: 79000 },
  { period: "2023-Q4", Malmö: 84500, Lund: 81500, Reference: 79500 },
  { period: "2024-Q1", Malmö: 85000, Lund: 82000, Reference: 80000 },
];

const mockReferenceList = {
  id: 'ref-1',
  name: 'Skåne Standard Reference 2024',
  basicEducation: 80000,
  specialEducation: 115000,
  gymProgram: 90000,
  vocationalProgram: 100000,
  preparatoryProgram: 70000
};

const PriceListsAnalysis = () => {
  const [selectedMunicipalities, setSelectedMunicipalities] = useState<string[]>(['Malmö', 'Lund']);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(['2024-Q3', '2024-Q2', '2024-Q1']);
  const [showReferenceList, setShowReferenceList] = useState(true);
  
  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMunicipality, setSelectedMunicipality] = useState<typeof municipalities[0] | null>(null);
  
  const { toast } = useToast();

  const handleViewDetails = (municipality: typeof municipalities[0]) => {
    setSelectedMunicipality(municipality);
    setDetailsModalOpen(true);
  };

  const handleExportAnalysis = () => {
    toast({
      title: "Export Started",
      description: "Your price list analysis export will be ready shortly.",
    });
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Price list data has been updated with your selected filters.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Price Lists Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Inter-municipal compensation analysis with multi-period comparisons
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAnalysis}>
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Reference List
          </Button>
        </div>
      </div>

      <Tabs defaultValue="comparison" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comparison">Multi-Period Comparison</TabsTrigger>
          <TabsTrigger value="intermunicipal">Inter-Municipal View</TabsTrigger>
          <TabsTrigger value="reference">Reference Lists</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Multi-Period Price Comparison
              </CardTitle>
              <CardDescription>
                Compare price lists across multiple reconciliation periods (up to 5 columns)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Select Municipalities</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose municipalities" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map(muni => (
                        <SelectItem key={muni.id} value={muni.name}>
                          {muni.name} ({muni.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Periods</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose periods" />
                    </SelectTrigger>
                    <SelectContent>
                      {reconciliationPeriods.map(period => (
                        <SelectItem key={period} value={period}>
                          {period}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full" onClick={handleApplyFilters}>
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Municipality</TableHead>
                      <TableHead>2024-Q3</TableHead>
                      <TableHead>2024-Q2</TableHead>
                      <TableHead>2024-Q1</TableHead>
                      <TableHead>2023-Q4</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Malmö</TableCell>
                      <TableCell>85,000 SEK</TableCell>
                      <TableCell>84,500 SEK</TableCell>
                      <TableCell>84,000 SEK</TableCell>
                      <TableCell>83,500 SEK</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +1.8%
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lund</TableCell>
                      <TableCell>82,000 SEK</TableCell>
                      <TableCell>81,500 SEK</TableCell>
                      <TableCell>81,000 SEK</TableCell>
                      <TableCell>80,500 SEK</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +1.9%
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-50">
                      <TableCell className="font-medium">
                        Reference List
                        <Badge variant="secondary" className="ml-2">REF</Badge>
                      </TableCell>
                      <TableCell>80,000 SEK</TableCell>
                      <TableCell>79,500 SEK</TableCell>
                      <TableCell>79,000 SEK</TableCell>
                      <TableCell>78,500 SEK</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +1.9%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intermunicipal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Inter-Municipal Price Lists
              </CardTitle>
              <CardDescription>
                View and compare price lists from other municipalities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {municipalities.map(muni => (
                  <Card key={muni.id} className="border-l-4 border-l-ike-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{muni.name}</CardTitle>
                      <CardDescription>Municipality Code: {muni.code}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Basic Education:</span>
                        <span className="font-medium">{muni.basicEducation.toLocaleString()} SEK</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Special Education:</span>
                        <span className="font-medium">{muni.specialEducation.toLocaleString()} SEK</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gym Program:</span>
                        <span className="font-medium">{muni.gymProgram.toLocaleString()} SEK</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewDetails(muni)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reference" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Reference Price Lists Management
              </CardTitle>
              <CardDescription>
                Create and manage fictitious price lists for comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Existing Reference Lists</h3>
                <div className="grid gap-3">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Skåne Standard Reference 2024</h4>
                          <p className="text-sm text-gray-600">Created: 2024-01-15</p>
                          <p className="text-sm text-gray-600">Period: 2024-Q1 to 2024-Q4</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditModalOpen(true)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              const referenceMunicipality = {
                                id: 999,
                                name: 'Reference List',
                                code: 'REF',
                                basicEducation: mockReferenceList.basicEducation,
                                specialEducation: mockReferenceList.specialEducation,
                                gymProgram: mockReferenceList.gymProgram,
                                vocationalProgram: mockReferenceList.vocationalProgram,
                                preparatoryProgram: mockReferenceList.preparatoryProgram
                              };
                              setSelectedMunicipality(referenceMunicipality);
                              setDetailsModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Price Trend Analysis
              </CardTitle>
              <CardDescription>
                Analyze price developments over time across municipalities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} SEK`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="Malmö" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Lund" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="Reference" stroke="#ffc658" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+2.1%</div>
                <p className="text-sm text-gray-600">Year over year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Price Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">±3.2%</div>
                <p className="text-sm text-gray-600">Between municipalities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Reference Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">+5.8%</div>
                <p className="text-sm text-gray-600">Above reference average</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <CreateReferenceListModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        reconciliationPeriods={reconciliationPeriods}
      />

      <MunicipalityDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedMunicipality(null);
        }}
        municipality={selectedMunicipality}
        period="2024-Q3"
      />

      <EditReferenceListModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        referenceList={mockReferenceList}
      />
    </div>
  );
};

export default PriceListsAnalysis;
