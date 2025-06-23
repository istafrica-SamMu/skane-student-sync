import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Euro, Plus, Calculator, TrendingUp, Edit, Trash2, History, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PriceCode {
  id: string;
  code: string;
  name: string;
  price: number;
  studyPaths: number;
  status: "Active" | "Updated" | "Inactive";
  lastUpdated: string;
  description?: string;
  municipality: string;
}

export default function PriceCodes() {
  const { toast } = useToast();
  const municipalities = ["Malmö", "Lund", "Helsingborg", "Kristianstad", "Växjö"];
  
  const [priceCodes, setPriceCodes] = useState<PriceCode[]>([
    { id: "1", code: "PC001", name: "Natural Science", price: 98500, studyPaths: 8, status: "Active", lastUpdated: "2024-01-15", description: "Science and mathematics programs", municipality: "Malmö" },
    { id: "2", code: "PC002", name: "Social Science", price: 92300, studyPaths: 12, status: "Active", lastUpdated: "2024-01-10", description: "Social studies and humanities", municipality: "Lund" },
    { id: "3", code: "PC003", name: "Technology", price: 105200, studyPaths: 6, status: "Updated", lastUpdated: "2024-01-20", description: "Technical and engineering programs", municipality: "Helsingborg" },
    { id: "4", code: "PC004", name: "Arts", price: 89750, studyPaths: 4, status: "Active", lastUpdated: "2024-01-05", description: "Creative and artistic programs", municipality: "Kristianstad" },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingPriceCode, setEditingPriceCode] = useState<PriceCode | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    description: "",
    municipality: "",
    status: "Active" as PriceCode["status"]
  });

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      price: "",
      description: "",
      municipality: "",
      status: "Active"
    });
  };

  const handleAdd = () => {
    if (!formData.code || !formData.name || !formData.price || !formData.municipality) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including municipality.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price amount.",
        variant: "destructive",
      });
      return;
    }

    const newPriceCode: PriceCode = {
      id: Date.now().toString(),
      code: formData.code,
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      municipality: formData.municipality,
      status: formData.status,
      studyPaths: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setPriceCodes([...priceCodes, newPriceCode]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Success",
      description: "Price code added successfully.",
    });
  };

  const handleEdit = (priceCode: PriceCode) => {
    setEditingPriceCode(priceCode);
    setFormData({
      code: priceCode.code,
      name: priceCode.name,
      price: priceCode.price.toString(),
      description: priceCode.description || "",
      municipality: priceCode.municipality,
      status: priceCode.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.code || !formData.name || !formData.price || !formData.municipality || !editingPriceCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including municipality.",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price amount.",
        variant: "destructive",
      });
      return;
    }

    const updatedPriceCodes = priceCodes.map(pc =>
      pc.id === editingPriceCode.id
        ? {
            ...pc,
            code: formData.code,
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            municipality: formData.municipality,
            status: formData.status,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : pc
    );

    setPriceCodes(updatedPriceCodes);
    setIsEditDialogOpen(false);
    setEditingPriceCode(null);
    resetForm();
    
    toast({
      title: "Success",
      description: "Price code updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setPriceCodes(priceCodes.filter(pc => pc.id !== id));
    toast({
      title: "Success",
      description: "Price code deleted successfully.",
    });
  };

  const handleShowHistory = (priceCode: PriceCode) => {
    setEditingPriceCode(priceCode);
    setIsHistoryDialogOpen(true);
  };

  const handleImport = () => {
    toast({
      title: "Import Started",
      description: "Importing regional pricelist from national database...",
    });
    setIsImportDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} SEK`;
  };

  const getAveragePrice = () => {
    if (priceCodes.length === 0) return 0;
    const total = priceCodes.reduce((sum, pc) => sum + pc.price, 0);
    return Math.round(total / priceCodes.length);
  };

  const getTotalUpdates = () => {
    return priceCodes.filter(pc => pc.status === "Updated").length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Price Codes</h1>
          <p className="text-ike-neutral mt-2">
            Manage price codes for study paths and inter-municipal compensation
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Import Regional Pricelist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Regional Pricelist</DialogTitle>
                <DialogDescription>
                  This will import the latest regional pricelist and price codes from the Swedish national database.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-ike-neutral-light rounded-lg">
                  <h4 className="font-medium mb-2">Import Options:</h4>
                  <ul className="text-sm text-ike-neutral space-y-1">
                    <li>• Regional price codes and compensation rates</li>
                    <li>• Updated study path pricing information</li>
                    <li>• Inter-municipal compensation rates</li>
                    <li>• National price code mappings</li>
                  </ul>
                </div>
                <p className="text-sm text-ike-neutral">
                  Last import: December 10, 2024. This operation will update existing price codes and add new ones from the regional database.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImport} className="bg-ike-primary hover:bg-ike-primary/90">
                  Start Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ike-primary hover:bg-ike-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Price Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Price Code</DialogTitle>
                <DialogDescription>
                  Create a new price code for study path compensation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Price Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., PC005"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="municipality">Municipality *</Label>
                  <Select value={formData.municipality} onValueChange={(value) => setFormData({ ...formData, municipality: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {municipalities.map((municipality) => (
                        <SelectItem key={municipality} value={municipality}>
                          {municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (SEK) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 95000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Optional description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="bg-ike-primary hover:bg-ike-primary/90">
                  Add Price Code
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-ike-primary" />
              Total Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{priceCodes.length}</div>
            <p className="text-ike-neutral text-sm">Active price codes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-ike-primary" />
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{formatPrice(getAveragePrice())}</div>
            <p className="text-ike-neutral text-sm">Per student per year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ike-primary" />
              Price Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">{getTotalUpdates()}</div>
            <p className="text-ike-neutral text-sm">This school year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Code Overview</CardTitle>
          <CardDescription>Current price codes and their associated study paths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priceCodes.map((priceCode) => (
              <div key={priceCode.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{priceCode.name}</h3>
                  <p className="text-sm text-ike-neutral">
                    {priceCode.code} • {formatPrice(priceCode.price)} • {priceCode.municipality} • {priceCode.studyPaths} study paths
                    {priceCode.description && ` • ${priceCode.description}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {priceCode.lastUpdated}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    priceCode.status === "Active" ? "default" : 
                    priceCode.status === "Updated" ? "secondary" : 
                    "outline"
                  }>
                    {priceCode.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShowHistory(priceCode)}
                      title="View history"
                    >
                      <History className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(priceCode)}
                      title="Edit price code"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" title="Delete price code">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Price Code</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{priceCode.name}" ({priceCode.code})? This action cannot be undone and may affect {priceCode.studyPaths} study paths.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(priceCode.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
            {priceCodes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No price codes available. Add one to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Price Code</DialogTitle>
            <DialogDescription>
              Update the price code information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Price Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., PC005"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-municipality">Municipality *</Label>
              <Select value={formData.municipality} onValueChange={(value) => setFormData({ ...formData, municipality: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select municipality" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price (SEK) *</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 95000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as PriceCode["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Updated">Updated</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingPriceCode(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-ike-primary hover:bg-ike-primary/90">
              Update Price Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Price Code History</DialogTitle>
            <DialogDescription>
              Historical changes for {editingPriceCode?.name} ({editingPriceCode?.code})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Version</span>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Price: {editingPriceCode && formatPrice(editingPriceCode.price)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {editingPriceCode?.lastUpdated}
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Previous Version</span>
                  <Badge variant="outline">Historical</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Price: {editingPriceCode && formatPrice(editingPriceCode.price - 2500)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Updated: 2024-01-01
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
