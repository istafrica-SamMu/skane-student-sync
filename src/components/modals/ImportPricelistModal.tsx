
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Calendar } from "lucide-react";

interface ImportFormData {
  file: FileList | null;
  validFrom: string;
  validTo: string;
  description: string;
}

interface ImportPricelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ImportFormData) => void;
}

const ImportPricelistModal = ({ isOpen, onClose, onSubmit }: ImportPricelistModalProps) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);

  const form = useForm<ImportFormData>({
    defaultValues: {
      file: null,
      validFrom: "",
      validTo: "",
      description: "",
    },
  });

  const handleSubmit = (data: ImportFormData) => {
    if (!data.file || data.file.length === 0) {
      toast({
        title: "Error",
        description: "Please select a file to import",
        variant: "destructive",
      });
      return;
    }

    try {
      onSubmit(data);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import pricelist",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileList = e.dataTransfer.files;
      form.setValue("file", fileList);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">Import Pricelist</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file containing program pricing data
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricelist File</FormLabel>
                  <FormControl>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive
                          ? "border-ike-primary bg-ike-primary/5"
                          : "border-ike-neutral/30 hover:border-ike-primary/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-ike-neutral" />
                      <p className="text-sm text-ike-neutral-dark mb-2">
                        Drag and drop your file here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={(e) => field.onChange(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-4 py-2 bg-ike-primary text-white rounded-md hover:bg-ike-primary-dark cursor-pointer"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Choose File
                      </label>
                      <p className="text-xs text-ike-neutral mt-2">
                        Supported formats: CSV, Excel (.xlsx, .xls)
                      </p>
                    </div>
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
                    <FormLabel>Valid From</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                        <Input {...field} type="date" className="pl-10" />
                      </div>
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
                    <FormLabel>Valid To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
                        <Input {...field} type="date" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Updated prices for 2024-2025 school year" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                Import Pricelist
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPricelistModal;
