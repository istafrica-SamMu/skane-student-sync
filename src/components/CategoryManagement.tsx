
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AmountCategory } from "@/types/additionalAmounts";

interface CategoryManagementProps {
  categories: AmountCategory[];
  onUpdateCategories: (categories: AmountCategory[]) => void;
}

export const CategoryManagement = ({ categories, onUpdateCategories }: CategoryManagementProps) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AmountCategory | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: AmountCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      isDefault: false,
      canDelete: true,
    };

    onUpdateCategories([...categories, newCategory]);
    setNewCategoryName("");
    setIsModalOpen(false);
    
    toast({
      title: "Category Added",
      description: `Successfully added "${newCategory.name}" category`,
    });
  };

  const handleEditCategory = (category: AmountCategory) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategoryName.trim()) return;

    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id
        ? { ...cat, name: newCategoryName.trim() }
        : cat
    );

    onUpdateCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategoryName("");
    setIsModalOpen(false);
    
    toast({
      title: "Category Updated",
      description: `Successfully updated category name`,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find(cat => cat.id === categoryId);
    if (!categoryToDelete?.canDelete) {
      toast({
        title: "Cannot Delete",
        description: "Default categories cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    onUpdateCategories(updatedCategories);
    
    toast({
      title: "Category Deleted",
      description: `Successfully deleted "${categoryToDelete.name}" category`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Settings className="w-5 h-5 mr-2 text-ike-primary" />
            Amount Categories
          </CardTitle>
          <Button 
            onClick={() => {
              setEditingCategory(null);
              setNewCategoryName("");
              setIsModalOpen(true);
            }}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  {category.isDefault ? (
                    <Badge className="bg-ike-primary text-white">Default</Badge>
                  ) : (
                    <Badge variant="secondary">Custom</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                      className="text-ike-neutral hover:text-ike-primary"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {category.canDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-ike-neutral hover:text-ike-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category Name</label>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                  setNewCategoryName("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                className="bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                {editingCategory ? "Update" : "Add"} Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
