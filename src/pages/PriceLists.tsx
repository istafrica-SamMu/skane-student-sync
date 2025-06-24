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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Euro, Search, Plus, Edit, Upload, Trash2, TrendingUp, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import PriceCodeModal from "@/components/modals/PriceCodeModal";
import ImportPricelistModal from "@/components/modals/ImportPricelistModal";
import { PriceListsViewManagement } from "@/components/financial/PriceListsViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

interface PriceCode {
  id: number;
  code: string;
  name: string;
  specialization: string;
  normalPrice: number;
  internalPrice: number;
  municipality: string;
  status: "active" | "inactive";
  lastUpdated: string;
}

interface PriceCodeFormData {
  code: string;
  name: string;
  specialization: string;
  normalPrice: number;
  internalPrice: number;
  municipality: string;
}

interface ImportFormData {
  file: FileList | null;
  validFrom: string;
  validTo: string;
  description: string;
}

const PriceLists = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPriceCode, setSelectedPriceCode] = useState<PriceCode | null>(null);

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: '1',
      name: 'Default Price Lists View',
      description: 'Standard view showing all price code data',
      columns: [
        { key: 'code', label: 'Code', visible: true },
        { key: 'name', label: 'Program Name', visible: true },
        { key: 'municipality', label: 'Municipality', visible: true },
        { key: 'specialization', label: 'Specialization', visible: true },
        { key: 'normalPrice', label: 'Normal Price', visible: true },
        { key: 'internalPrice', label: 'Internal Price', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'lastUpdated', label: 'Last Updated', visible: true }
      ],
      filters: [],
      isDefault: true,
      isSystemView: true,
      createdBy: 'system',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [currentColumns, setCurrentColumns] = useState<ViewColumn[]>([
    { key: 'code', label: 'Code', visible: true },
    { key: 'name', label: 'Program Name', visible: true },
    { key: 'municipality', label: 'Municipality', visible: true },
    { key: 'specialization', label: 'Specialization', visible: true },
    { key: 'normalPrice', label: 'Normal Price', visible: true },
    { key: 'internalPrice', label: 'Internal Price', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'lastUpdated', label: 'Last Updated', visible: true }
  ]);

  const [currentFilters, setCurrentFilters] = useState<ViewFilter[]>([]);
  const [currentView, setCurrentView] = useState<SavedView | undefined>(savedViews[0]);

  const handleSaveView = (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...view,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setCurrentColumns(view.columns);
    setCurrentFilters(view.filters);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(view => view.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(savedViews[0]);
    }
  };

  // Mock data for current municipality
  const municipalityName = "Malmö";
  const [priceCodes, setPriceCodes] = useState<PriceCode[]>([
    {
      id: 1,
      code: "NA",
      name: "Naturvetenskapsprogrammet",
      specialization: "Naturvetenskap och samhälle",
      normalPrice: 125000,
      internalPrice: 118000,
      municipality: "Malmö",
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 2,
      code: "SA",
      name: "Samhällsvetenskapsprogrammet",
      specialization: "Samhällsvetenskap",
      normalPrice: 122000,
      internalPrice: 115000,
      municipality: "Malmö",
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 3,
      code: "TE",
      name: "Teknikprogrammet",
      specialization: "Teknik",
      normalPrice: 135000,
      internalPrice: 128000,
      municipality: "Lund",
      status: "active",
      lastUpdated: "2024-06-15"
    },
    {
      id: 4,
      code: "EK",
      name: "Ekonomiprogrammet",
      specialization: "Ekonomi",
      normalPrice: 120000,
      internalPrice: 113000,
      municipality: "Helsingborg",
      status: "inactive",
      lastUpdated: "2024-05-20"
    }
  ]);

  const filteredPriceCodes = priceCodes.filter(priceCode =>
    priceCode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    priceCode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    priceCode.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    priceCode.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPriceCode = (data: PriceCodeFormData) => {
    const newPriceCode: PriceCode = {
      id: Math.max(...priceCodes.map(pc => pc.id)) + 1,
      ...data,
      status: "active",
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setPriceCodes([...priceCodes, newPriceCode]);
    setIsAddModalOpen(false);
    
    toast({
      title: "Price Code Added",
      description: `Successfully added price code ${data.code} - ${data.name}`,
    });
  };

  const handleEditPriceCode = (data: PriceCodeFormData) => {
    if (!selectedPriceCode) return;
    
    const updatedPriceCodes = priceCodes.map(priceCode =>
      priceCode.id === selectedPriceCode.id
        ? { ...priceCode, ...data, lastUpdated: new Date().toISOString().split('T')[0] }
        : priceCode
    );
    
    setPriceCodes(updatedPriceCodes);
    setIsEditModalOpen(false);
    setSelectedPriceCode(null);
    
    toast({
      title: "Price Code Updated",
      description: `Successfully updated ${data.code} - ${data.name}`,
    });
  };

  const handleDeletePriceCode = () => {
    if (!selectedPriceCode) return;
    
    const updatedPriceCodes = priceCodes.filter(priceCode => priceCode.id !== selectedPriceCode.id);
    setPriceCodes(updatedPriceCodes);
    setIsDeleteDialogOpen(false);
    setSelectedPriceCode(null);
    
    toast({
      title: "Price Code Deleted",
      description: `Successfully deleted ${selectedPriceCode.code} - ${selectedPriceCode.name}`,
      variant: "destructive",
    });
  };

  const handleImportPricelist = (data: ImportFormData) => {
    console.log("Importing pricelist:", data);
    setIsImportModalOpen(false);
    
    toast({
      title: "Import Initiated",
      description: "Your pricelist import has been started. You'll be notified when it's complete.",
    });
  };

  const openEditModal = (priceCode: PriceCode) => {
    setSelectedPriceCode(priceCode);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (priceCode: PriceCode) => {
    setSelectedPriceCode(priceCode);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "inactive":
        return <Badge className="bg-ike-neutral text-white">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const activePriceCodes = priceCodes.filter(pc => pc.status === "active");
  const averageNormalPrice = activePriceCodes.length > 0 
    ? Math.round(activePriceCodes.reduce((sum, pc) => sum + pc.normalPrice, 0) / activePriceCodes.length)
    : 0;
  const averageInternalPrice = activePriceCodes.length > 0 
    ? Math.round(activePriceCodes.reduce((sum, pc) => sum + pc.internalPrice, 0) / activePriceCodes.length)
    : 0;

  const visibleColumns = currentColumns.filter(col => col.visible);
  const filteredData = filteredPriceCodes; // Apply filters here when implemented

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark flex items-center">
            <Building className="w-8 h-8 mr-3 text-ike-primary" />
            Regional Pricelists
          </h1>
          <p className="text-ike-neutral mt-2">
            Manage program pricing and price codes across municipalities
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            onClick={() => setIsImportModalOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Pricelist
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Price Code
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{activePriceCodes.length}</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Avg Normal Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{averageNormalPrice.toLocaleString('sv-SE')}</div>
            <div className="text-xs text-ike-neutral">SEK per student/year</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Avg Internal Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{averageInternalPrice.toLocaleString('sv-SE')}</div>
            <div className="text-xs text-ike-neutral">SEK per student/year</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Price Difference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {((averageNormalPrice - averageInternalPrice) / averageNormalPrice * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-ike-neutral">Internal vs Normal</div>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <PriceListsViewManagement
        views={savedViews}
        currentView={currentView}
        onSaveView={handleSaveView}
        onLoadView={handleLoadView}
        onDeleteView={handleDeleteView}
        columns={currentColumns}
        filters={currentFilters}
        onColumnsChange={setCurrentColumns}
        onFiltersChange={setCurrentFilters}
      />

      {/* Price Codes Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Euro className="w-5 h-5 mr-2 text-ike-primary" />
            Regional Price Codes
          </CardTitle>
          <CardDescription>
            Manage program pricing across different municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search by code, program name, specialization, or municipality..."
                className="pl-10 border-ike-primary/20 focus:border-ike-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead key={column.key} className="font-medium">
                      {column.key === 'normalPrice' || column.key === 'internalPrice' 
                        ? <span className="text-right">{column.label}</span>
                        : column.label
                      }
                    </TableHead>
                  ))}
                  <TableHead className="font-medium text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((priceCode) => (
                  <TableRow key={priceCode.id} className="hover:bg-ike-neutral-light/50">
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === 'code' && (
                          <span className="font-medium font-mono text-ike-primary">{priceCode.code}</span>
                        )}
                        {column.key === 'name' && (
                          <span className="font-medium text-ike-neutral-dark">{priceCode.name}</span>
                        )}
                        {column.key === 'municipality' && (
                          <span className="font-medium text-ike-primary">{priceCode.municipality}</span>
                        )}
                        {column.key === 'specialization' && priceCode.specialization}
                        {column.key === 'normalPrice' && (
                          <span className="text-right font-medium block">
                            {priceCode.normalPrice.toLocaleString('sv-SE')} SEK
                          </span>
                        )}
                        {column.key === 'internalPrice' && (
                          <span className="text-right font-medium block">
                            {priceCode.internalPrice.toLocaleString('sv-SE')} SEK
                          </span>
                        )}
                        {column.key === 'status' && getStatusBadge(priceCode.status)}
                        {column.key === 'lastUpdated' && (
                          <span className="text-ike-neutral">{priceCode.lastUpdated}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-primary"
                          onClick={() => openEditModal(priceCode)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-ike-neutral hover:text-ike-error"
                          onClick={() => openDeleteDialog(priceCode)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Price Code Modal */}
      <PriceCodeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPriceCode}
        title="Add New Price Code"
        submitText="Add Price Code"
      />

      {/* Edit Price Code Modal */}
      <PriceCodeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPriceCode(null);
        }}
        onSubmit={handleEditPriceCode}
        title="Edit Price Code"
        submitText="Update Price Code"
        initialData={selectedPriceCode || undefined}
      />

      {/* Import Pricelist Modal */}
      <ImportPricelistModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSubmit={handleImportPricelist}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Price Code</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the price code "{selectedPriceCode?.code}" - {selectedPriceCode?.name}? 
              This action cannot be undone and will remove all associated pricing information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePriceCode}
              className="bg-ike-error hover:bg-ike-error/90 text-white"
            >
              Delete Price Code
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PriceLists;
