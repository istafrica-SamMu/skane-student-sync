import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AddAccountingStringModal } from "@/components/modals/AddAccountingStringModal";
import { EditAccountingStringModal } from "@/components/modals/EditAccountingStringModal";
import { ViewManagement } from "@/components/ViewManagement";
import { AdvancedFilter } from "@/components/AdvancedFilter";
import { ColumnManagement } from "@/components/ColumnManagement";
import { AccountingString } from "@/types/accounting";
import { SavedView, ViewColumn, ViewFilter } from "@/types/viewManagement";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  Columns,
  Download,
  Settings
} from "lucide-react";

const AccountingConfiguration = () => {
  const [accountingStrings, setAccountingStrings] = useState<AccountingString[]>([
    {
      id: "1",
      counterpartyId: "MUNI-001",
      counterpartyName: "Malmö Municipality",
      priceCodeGroup: "university_prep",
      priceCodes: ["UP-MAT", "UP-SCI"],
      schoolType: "upper_secondary",
      accountingCode: "3100",
      costCenter: "CC-001",
      project: "PROJ-2024",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      isActive: true,
      createdBy: "admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      counterpartyId: "MUNI-002",
      counterpartyName: "Lund Municipality",
      priceCodeGroup: "vocational_prep",
      priceCodes: ["VP-TECH"],
      schoolType: "upper_secondary",
      accountingCode: "3200",
      costCenter: "CC-002",
      startDate: "2024-01-01",
      isActive: true,
      createdBy: "admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingString, setEditingString] = useState<AccountingString | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnConfig, setShowColumnConfig] = useState(false);

  // View management state
  const [savedViews, setSavedViews] = useState<SavedView[]>([
    {
      id: "system-1",
      name: "All Active Configurations",
      description: "Shows all active accounting configurations",
      columns: [
        { key: "counterpartyName", label: "Counterparty", visible: true },
        { key: "priceCodeGroup", label: "Price Code Group", visible: true },
        { key: "priceCodes", label: "Price Codes", visible: true },
        { key: "accountingCode", label: "Accounting Code", visible: true },
        { key: "costCenter", label: "Cost Center", visible: true },
        { key: "startDate", label: "Start Date", visible: true },
        { key: "endDate", label: "End Date", visible: true },
        { key: "isActive", label: "Status", visible: true },
        { key: "actions", label: "Actions", visible: true },
      ],
      filters: [{ field: "isActive", operator: "equals", value: "true" }],
      isSystemView: true,
      createdBy: "system",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  ]);

  const [currentView, setCurrentView] = useState<SavedView | undefined>(savedViews[0]);
  const [viewFilters, setViewFilters] = useState<ViewFilter[]>(savedViews[0]?.filters || []);
  const [viewColumns, setViewColumns] = useState<ViewColumn[]>(savedViews[0]?.columns || [
    { key: "counterpartyName", label: "Counterparty", visible: true },
    { key: "priceCodeGroup", label: "Price Code Group", visible: true },
    { key: "priceCodes", label: "Price Codes", visible: true },
    { key: "accountingCode", label: "Accounting Code", visible: true },
    { key: "costCenter", label: "Cost Center", visible: true },
    { key: "startDate", label: "Start Date", visible: true },
    { key: "endDate", label: "End Date", visible: true },
    { key: "isActive", label: "Status", visible: true },
    { key: "actions", label: "Actions", visible: true },
  ]);

  // Available fields for filtering
  const availableFields = [
    { key: "counterpartyName", label: "Counterparty", type: "text" as const },
    { key: "priceCodeGroup", label: "Price Code Group", type: "select" as const, options: ["university_prep", "vocational_prep", "introductory", "individual"] },
    { key: "schoolType", label: "School Type", type: "select" as const, options: ["upper_secondary", "adapted_upper_secondary"] },
    { key: "accountingCode", label: "Accounting Code", type: "text" as const },
    { key: "costCenter", label: "Cost Center", type: "text" as const },
    { key: "startDate", label: "Start Date", type: "date" as const },
    { key: "endDate", label: "End Date", type: "date" as const },
    { key: "isActive", label: "Status", type: "select" as const, options: ["true", "false"] },
  ];

  // Apply filters to data
  const filteredData = useMemo(() => {
    let filtered = accountingStrings;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.counterpartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.accountingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.costCenter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply advanced filters
    viewFilters.forEach(filter => {
      filtered = filtered.filter(item => {
        const fieldValue = item[filter.field as keyof AccountingString];
        const filterValue = Array.isArray(filter.value) ? filter.value[0] : filter.value;

        switch (filter.operator) {
          case 'equals':
            return String(fieldValue) === filterValue;
          case 'contains':
            return String(fieldValue).toLowerCase().includes(filterValue.toLowerCase());
          case 'startsWith':
            return String(fieldValue).toLowerCase().startsWith(filterValue.toLowerCase());
          case 'endsWith':
            return String(fieldValue).toLowerCase().endsWith(filterValue.toLowerCase());
          case 'before':
            return new Date(String(fieldValue)) < new Date(filterValue);
          case 'after':
            return new Date(String(fieldValue)) > new Date(filterValue);
          default:
            return true;
        }
      });
    });

    return filtered;
  }, [accountingStrings, searchTerm, viewFilters]);

  // View management handlers
  const handleSaveView = (viewData: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newView: SavedView = {
      ...viewData,
      id: `view-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSavedViews([...savedViews, newView]);
  };

  const handleLoadView = (view: SavedView) => {
    setCurrentView(view);
    setViewFilters(view.filters);
    setViewColumns(view.columns);
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(savedViews.filter(v => v.id !== viewId));
    if (currentView?.id === viewId) {
      setCurrentView(undefined);
    }
  };

  const handleAddString = (newString: any) => {
    const accountingString: AccountingString = {
      ...newString,
      id: `string-${Date.now()}`,
      priceCodes: Array.isArray(newString.priceCodes) 
        ? newString.priceCodes 
        : newString.priceCodes.split(',').map((code: string) => code.trim()),
      isActive: true,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAccountingStrings([...accountingStrings, accountingString]);
    setShowAddModal(false);
  };

  const handleEditString = (updatedString: any) => {
    const updated = accountingStrings.map(item =>
      item.id === updatedString.id
        ? {
            ...updatedString,
            priceCodes: Array.isArray(updatedString.priceCodes)
              ? updatedString.priceCodes
              : updatedString.priceCodes.split(',').map((code: string) => code.trim()),
            updatedAt: new Date().toISOString(),
          }
        : item
    );
    setAccountingStrings(updated);
    setEditingString(null);
  };

  const handleDeleteString = (id: string) => {
    setAccountingStrings(accountingStrings.filter(item => item.id !== id));
  };

  const visibleColumns = viewColumns.filter(col => col.visible);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting Configuration</h1>
          <p className="text-muted-foreground">
            Manage accounting strings for inter-municipal compensation calculations.
          </p>
        </div>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
          <TabsTrigger value="columns">Column Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Accounting Strings</CardTitle>
                  <CardDescription>
                    {currentView ? `Current view: ${currentView.name}` : 'Default view'}
                    {filteredData.length !== accountingStrings.length && 
                      ` • ${filteredData.length} of ${accountingStrings.length} records shown`
                    }
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <ViewManagement
                    views={savedViews}
                    currentView={currentView}
                    onSaveView={handleSaveView}
                    onLoadView={handleLoadView}
                    onDeleteView={handleDeleteView}
                    columns={viewColumns}
                    filters={viewFilters}
                  />
                  <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Accounting String
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by counterparty, accounting code, or cost center..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters ({viewFilters.length})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowColumnConfig(!showColumnConfig)}
                  className="flex items-center gap-2"
                >
                  <Columns className="w-4 h-4" />
                  Columns
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {visibleColumns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={visibleColumns.length} className="text-center py-8">
                          No accounting strings found. 
                          {viewFilters.length > 0 && " Try adjusting your filters or "}
                          <Button variant="link" onClick={() => setShowAddModal(true)} className="p-0 h-auto">
                            add a new accounting string
                          </Button>
                          .
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((item) => (
                        <TableRow key={item.id}>
                          {visibleColumns.map((column) => (
                            <TableCell key={column.key}>
                              {column.key === 'counterpartyName' && item.counterpartyName}
                              {column.key === 'priceCodeGroup' && (
                                <Badge variant="outline">
                                  {item.priceCodeGroup.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              )}
                              {column.key === 'priceCodes' && (
                                <div className="flex flex-wrap gap-1">
                                  {item.priceCodes.map((code, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {code}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {column.key === 'accountingCode' && item.accountingCode}
                              {column.key === 'costCenter' && item.costCenter}
                              {column.key === 'startDate' && item.startDate}
                              {column.key === 'endDate' && (item.endDate || 'No end date')}
                              {column.key === 'isActive' && (
                                <Badge variant={item.isActive ? "default" : "secondary"}>
                                  {item.isActive ? "Active" : "Inactive"}
                                </Badge>
                              )}
                              {column.key === 'actions' && (
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingString(item)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteString(item.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filters">
          <AdvancedFilter
            filters={viewFilters}
            onFiltersChange={setViewFilters}
            availableFields={availableFields}
          />
        </TabsContent>

        <TabsContent value="columns">
          <ColumnManagement
            columns={viewColumns}
            onColumnsChange={setViewColumns}
          />
        </TabsContent>
      </Tabs>

      <AddAccountingStringModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddString}
      />

      {editingString && (
        <EditAccountingStringModal
          open={!!editingString}
          onOpenChange={(open) => !open && setEditingString(null)}
          onSubmit={handleEditString}
          accountingString={editingString}
        />
      )}
    </div>
  );
};

export default AccountingConfiguration;
