
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Building,
  Euro,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FinancialViewManagement } from "@/components/financial/FinancialViewManagement";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";

const Financial = () => {
  const { t } = useLanguage();

  // Mock data for financial calculations
  const calculationHistory = [
    {
      id: 1,
      period: "2024-09",
      municipality: "Stockholm",
      totalAmount: 2450000,
      status: "completed",
      calculatedDate: "2024-10-15",
      studentsCount: 156
    },
    {
      id: 2,
      period: "2024-08", 
      municipality: "Göteborg",
      totalAmount: 1890000,
      status: "pending",
      calculatedDate: "2024-09-20",
      studentsCount: 123
    },
    {
      id: 3,
      period: "2024-09",
      municipality: "Malmö",
      totalAmount: 3200000,
      status: "error",
      calculatedDate: "2024-10-10",
      studentsCount: 201
    }
  ];

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: '1',
      name: 'Default Financial View',
      description: 'Standard view showing all financial calculation data',
      columns: [
        { key: 'period', label: 'Period', visible: true },
        { key: 'municipality', label: 'Municipality', visible: true },
        { key: 'totalAmount', label: 'Total Amount', visible: true },
        { key: 'status', label: 'Status', visible: true },
        { key: 'calculatedDate', label: 'Calculated Date', visible: true },
        { key: 'studentsCount', label: 'Students Count', visible: true }
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
    { key: 'period', label: 'Period', visible: true },
    { key: 'municipality', label: 'Municipality', visible: true },
    { key: 'totalAmount', label: 'Total Amount', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'calculatedDate', label: 'Calculated Date', visible: true },
    { key: 'studentsCount', label: 'Students Count', visible: true }
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-ike-success text-white">Completed</Badge>;
      case "pending":
        return <Badge className="bg-ike-warning text-white">Pending</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const visibleColumns = currentColumns.filter(col => col.visible);
  const filteredData = calculationHistory; // Apply filters here when implemented

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Financial Calculations</h1>
          <p className="text-ike-neutral mt-2">
            Manage and monitor financial calculations and payments
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <Calculator className="w-4 h-4 mr-2" />
          New Calculation
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Completed Calculations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">42</div>
            <div className="text-xs text-ike-success">This month</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">8</div>
            <div className="text-xs text-ike-neutral">Awaiting approval</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">7.54M SEK</div>
            <div className="text-xs text-ike-neutral">Current period</div>
          </CardContent>
        </Card>
      </div>

      {/* View Management */}
      <FinancialViewManagement
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

      {/* Calculation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Recent Calculations
          </CardTitle>
          <CardDescription>
            Latest financial calculations and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key}>
                      {column.key === 'period' && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-ike-neutral" />
                          <span>{item.period}</span>
                        </div>
                      )}
                      {column.key === 'municipality' && (
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-ike-neutral" />
                          <span className="font-medium text-ike-neutral-dark">{item.municipality}</span>
                        </div>
                      )}
                      {column.key === 'totalAmount' && (
                        <div className="flex items-center text-ike-primary font-medium">
                          <Euro className="w-4 h-4 mr-1" />
                          {item.totalAmount.toLocaleString()}
                        </div>
                      )}
                      {column.key === 'status' && getStatusBadge(item.status)}
                      {column.key === 'calculatedDate' && (
                        <span className="text-ike-neutral">{item.calculatedDate}</span>
                      )}
                      {column.key === 'studentsCount' && (
                        <span className="text-ike-neutral-dark">{item.studentsCount}</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Quick Actions</CardTitle>
          <CardDescription>
            Common financial calculation tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <Calculator className="w-6 h-6 mb-2" />
              <span>Run Calculation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <CheckCircle className="w-6 h-6 mb-2" />
              <span>Approve Pending</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <AlertCircle className="w-6 h-6 mb-2" />
              <span>Review Errors</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <Clock className="w-6 h-6 mb-2" />
              <span>Schedule Auto</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;
