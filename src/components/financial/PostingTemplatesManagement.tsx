
import { useState } from "react";
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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, FileText, Search } from "lucide-react";
import type { PostingTemplate } from "@/types/posting";

interface PostingTemplatesManagementProps {
  templates: PostingTemplate[];
  onUpdateTemplates: (templates: PostingTemplate[]) => void;
}

const PostingTemplatesManagement: React.FC<PostingTemplatesManagementProps> = ({
  templates,
  onUpdateTemplates
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PostingTemplate | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      accountingCode: "",
      costCenter: "",
      project: "",
      department: "",
      activity: "",
      applicableFor: "all" as "student" | "school" | "principal" | "all",
      isDefault: false,
    },
  });

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.accountingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.municipalityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTemplate = (data: any) => {
    const newTemplate: PostingTemplate = {
      id: `template-${Date.now()}`,
      municipalityId: "mun-001",
      municipalityName: "Malmö Municipality",
      ...data,
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onUpdateTemplates([...templates, newTemplate]);
    setIsAddModalOpen(false);
    form.reset();
    
    toast({
      title: "Template Created",
      description: `Successfully created posting template "${data.name}"`,
    });
  };

  const handleEditTemplate = (data: any) => {
    if (!selectedTemplate) return;
    
    const updatedTemplates = templates.map(template =>
      template.id === selectedTemplate.id
        ? { ...template, ...data, updatedAt: new Date().toISOString() }
        : template
    );
    
    onUpdateTemplates(updatedTemplates);
    setIsEditModalOpen(false);
    setSelectedTemplate(null);
    form.reset();
    
    toast({
      title: "Template Updated",
      description: `Successfully updated posting template "${data.name}"`,
    });
  };

  const openEditModal = (template: PostingTemplate) => {
    setSelectedTemplate(template);
    form.reset({
      name: template.name,
      description: template.description || "",
      accountingCode: template.accountingCode,
      costCenter: template.costCenter,
      project: template.project || "",
      department: template.department || "",
      activity: template.activity || "",
      applicableFor: template.applicableFor,
      isDefault: template.isDefault,
    });
    setIsEditModalOpen(true);
  };

  const TemplateModal = ({ isOpen, onClose, onSubmit, title, submitText }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    title: string;
    submitText: string;
  }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-ike-neutral-dark">{title}</DialogTitle>
          <DialogDescription>
            Create reusable posting templates for automatic financial integration
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Student Basic Posting" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="applicableFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applicable For</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="all">All Entities</option>
                        <option value="student">Students Only</option>
                        <option value="school">Schools Only</option>
                        <option value="principal">Principals Only</option>
                      </select>
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
                    <Input {...field} placeholder="Describe when to use this template" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountingCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accounting Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 4510" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Center</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., 5001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Project code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Department code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Activity code" />
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Posting Templates
            </CardTitle>
            <CardDescription>
              Manage reusable posting templates for financial integration
            </CardDescription>
          </div>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search templates..."
              className="pl-10 border-ike-primary/20 focus:border-ike-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Applicable For</TableHead>
                <TableHead>Accounting Code</TableHead>
                <TableHead>Cost Center</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      {template.description && (
                        <div className="text-xs text-ike-neutral">{template.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{template.applicableFor}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{template.accountingCode}</TableCell>
                  <TableCell className="font-mono">{template.costCenter}</TableCell>
                  <TableCell>
                    {template.isDefault && (
                      <Badge className="bg-ike-success text-white">Default</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditModal(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-ike-error hover:text-ike-error"
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

      <TemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTemplate}
        title="Create Posting Template"
        submitText="Create Template"
      />

      <TemplateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTemplate(null);
          form.reset();
        }}
        onSubmit={handleEditTemplate}
        title="Edit Posting Template"
        submitText="Update Template"
      />
    </Card>
  );
};

export default PostingTemplatesManagement;
