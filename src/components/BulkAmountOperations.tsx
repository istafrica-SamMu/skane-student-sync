
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Users, Filter, Play } from "lucide-react";
import type { BulkAmountOperation, AmountCategory, AmountFormData } from "@/types/additionalAmounts";

interface BulkAmountOperationsProps {
  categories: AmountCategory[];
  onBulkOperation: (operation: BulkAmountOperation) => void;
}

export const BulkAmountOperations = ({ categories, onBulkOperation }: BulkAmountOperationsProps) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    year: "",
    studyPath: "",
    schoolUnit: "",
    municipality: ""
  });

  const form = useForm<AmountFormData>({
    defaultValues: {
      type: "Student",
      targetId: "",
      targetName: "",
      school: "",
      principal: "",
      program: "",
      category: "Basic amount",
      title: "",
      amount: 0,
      multiplier: 1,
      note: "",
      validFrom: "",
      validTo: "",
    },
  });

  const [operation, setOperation] = useState<"create" | "update" | "terminate">("create");
  const [previewCount, setPreviewCount] = useState(0);

  // Mock data for filters - in real implementation, this would come from API
  const filterOptions = {
    years: ["2024", "2023", "2022"],
    studyPaths: ["Naturvetenskapsprogrammet", "Teknikprogrammet", "Samhällsvetenskapsprogrammet"],
    schoolUnits: ["Malmö Gymnasium", "Lund High School", "Technical School"],
    municipalities: ["Malmö", "Lund", "Helsingborg"]
  };

  const handleFilterChange = (filterType: string, value: string) => {
    console.log("Filter changed:", filterType, value);
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // Mock calculation of affected records
    let count = 0;
    if (value) {
      count = Math.floor(Math.random() * 50) + 1; // Mock: 1-50 records
    }
    setPreviewCount(count);
  };

  const clearFilters = () => {
    setSelectedFilters({ year: "", studyPath: "", schoolUnit: "", municipality: "" });
    setPreviewCount(0);
  };

  const handleBulkSubmit = (data: AmountFormData) => {
    console.log("Bulk submit:", data);
    
    const bulkOperation: BulkAmountOperation = {
      operation,
      filters: selectedFilters,
      changes: data
    };

    onBulkOperation(bulkOperation);
    setIsModalOpen(false);
    form.reset();
    clearFilters();

    toast({
      title: "Bulk Operation Completed",
      description: `Successfully ${operation}d ${previewCount} additional amounts`,
    });
  };

  const getOperationDescription = () => {
    switch (operation) {
      case "create":
        return "Create new additional amounts for selected students";
      case "update":
        return "Update existing additional amounts for selected students";
      case "terminate":
        return "Terminate (set end date) additional amounts for selected students";
      default:
        return "";
    }
  };

  const handleOperationChange = (newOperation: "create" | "update" | "terminate") => {
    console.log("Operation changed to:", newOperation);
    setOperation(newOperation);
    // Reset preview count when changing operation
    if (previewCount > 0) {
      const hasFilters = Object.values(selectedFilters).some(filter => filter !== "");
      if (hasFilters) {
        setPreviewCount(Math.floor(Math.random() * 50) + 1);
      }
    }
  };

  const openConfigurationModal = () => {
    console.log("Opening configuration modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-ike-neutral-dark">
          <Users className="w-5 h-5 mr-2 text-ike-primary" />
          Bulk Operations
        </CardTitle>
        <CardDescription>
          Create, update, or terminate additional amounts for multiple students simultaneously
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={operation === "create" ? "default" : "outline"}
              onClick={() => handleOperationChange("create")}
              className={operation === "create" ? "bg-ike-primary hover:bg-ike-primary-dark text-white" : ""}
            >
              Create Amounts
            </Button>
            <Button
              variant={operation === "update" ? "default" : "outline"}
              onClick={() => handleOperationChange("update")}
              className={operation === "update" ? "bg-ike-primary hover:bg-ike-primary-dark text-white" : ""}
            >
              Update Amounts
            </Button>
            <Button
              variant={operation === "terminate" ? "default" : "outline"}
              onClick={() => handleOperationChange("terminate")}
              className={operation === "terminate" ? "bg-ike-error hover:bg-ike-error/90 text-white" : ""}
            >
              Terminate Amounts
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedFilters.year} onValueChange={(value) => handleFilterChange("year", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFilters.studyPath} onValueChange={(value) => handleFilterChange("studyPath", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Study Path" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.studyPaths.map((path) => (
                  <SelectItem key={path} value={path}>{path}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFilters.schoolUnit} onValueChange={(value) => handleFilterChange("schoolUnit", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select School Unit" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.schoolUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFilters.municipality} onValueChange={(value) => handleFilterChange("municipality", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.municipalities.map((municipality) => (
                  <SelectItem key={municipality} value={municipality}>{municipality}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {previewCount > 0 && (
            <div className="flex items-center justify-between p-4 bg-ike-neutral-light rounded-md">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-ike-primary" />
                <span className="text-sm text-ike-neutral-dark">
                  {previewCount} students match the selected criteria
                </span>
                <Badge variant="secondary">{previewCount}</Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="text-ike-neutral hover:text-ike-neutral-dark"
                >
                  Clear Filters
                </Button>
                <Button
                  onClick={openConfigurationModal}
                  className="bg-ike-primary hover:bg-ike-primary-dark text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Configure {operation === "create" ? "Creation" : operation === "update" ? "Update" : "Termination"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Bulk Operation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-ike-neutral-dark">
              Bulk {operation === "create" ? "Create" : operation === "update" ? "Update" : "Terminate"} Additional Amounts
            </DialogTitle>
            <DialogDescription>
              {getOperationDescription()} ({previewCount} students selected)
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleBulkSubmit)} className="space-y-4">
              {operation !== "terminate" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.name}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (SEK)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number" 
                              placeholder="Enter amount"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="multiplier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Multiplier</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number" 
                              min="1"
                              placeholder="Multiplier"
                              value={field.value || 1}
                              onChange={(e) => field.onChange(e.target.value === "" ? 1 : parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter additional notes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="validFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid From *</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="validTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valid To (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {operation === "terminate" && (
                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Termination Date *</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className={operation === "terminate" ? "bg-ike-error hover:bg-ike-error/90 text-white" : "bg-ike-primary hover:bg-ike-primary-dark text-white"}
                >
                  {operation === "create" ? "Create" : operation === "update" ? "Update" : "Terminate"} {previewCount} Amounts
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
