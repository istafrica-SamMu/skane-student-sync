
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface PriceCodeFormData {
  code: string;
  name: string;
  specialization: string;
  normalPrice: number;
  internalPrice: number;
  municipality: string;
}

interface PriceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PriceCodeFormData) => void;
  title: string;
  submitText: string;
  initialData?: Partial<PriceCodeFormData>;
}

const PriceCodeModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  submitText, 
  initialData 
}: PriceCodeModalProps) => {
  const { toast } = useToast();

  const municipalities = ["Malmö", "Lund", "Helsingborg", "Kristianstad", "Växjö"];

  const form = useForm<PriceCodeFormData>({
    defaultValues: {
      code: "",
      name: "",
      specialization: "",
      normalPrice: 0,
      internalPrice: 0,
      municipality: "",
    },
  });

  // Reset form with initial data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        code: initialData?.code || "",
        name: initialData?.name || "",
        specialization: initialData?.specialization || "",
        normalPrice: initialData?.normalPrice || 0,
        internalPrice: initialData?.internalPrice || 0,
        municipality: initialData?.municipality || "",
      });
    }
  }, [isOpen, initialData, form]);

  const handleSubmit = (data: PriceCodeFormData) => {
    try {
      onSubmit(data);
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save price code",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">{title}</DialogTitle>
          <DialogDescription>
            Manage program pricing for municipalities
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., NA, SA, TE" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="municipality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Municipality</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select municipality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {municipalities.map((municipality) => (
                          <SelectItem key={municipality} value={municipality}>
                            {municipality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full program name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Program specialization" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="normalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Normal Price (SEK)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="125000"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="internalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internal Price (SEK)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="118000"
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                {submitText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCodeModal;
