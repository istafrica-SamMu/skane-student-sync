
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Shield, Search, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessManagement = ({ isOpen, onClose }: AccessManagementProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Anna Lindberg",
      role: "Municipality Admin",
      organization: "Malmö Municipality",
      permissions: {
        viewStatistics: true,
        exportData: true,
        advancedAnalysis: false,
        geographicalTools: true
      }
    },
    {
      id: 2,
      name: "Erik Svensson", 
      role: "School Principal",
      organization: "Lund High School",
      permissions: {
        viewStatistics: true,
        exportData: false,
        advancedAnalysis: false,
        geographicalTools: false
      }
    },
    {
      id: 3,
      name: "Maria Johansson",
      role: "Municipal Admin",
      organization: "Kristianstad Municipality", 
      permissions: {
        viewStatistics: true,
        exportData: true,
        advancedAnalysis: true,
        geographicalTools: true
      }
    }
  ]);

  const updatePermission = (userId: number, permission: string, value: boolean) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, permissions: { ...user.permissions, [permission]: value }}
        : user
    ));
    
    toast({
      title: "Permission Updated",
      description: "User access permissions have been modified.",
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-ike-primary" />
            Analysis Access Management
          </DialogTitle>
          <DialogDescription>
            Manage user access to statistics and analysis features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-ike-primary/20"
            />
          </div>

          {/* Users Table */}
          <div className="border rounded-lg">
            <div className="grid grid-cols-6 gap-4 p-4 bg-ike-neutral-light font-medium text-sm">
              <div className="col-span-2">User</div>
              <div>View Statistics</div>
              <div>Export Data</div>
              <div>Advanced Analysis</div>
              <div>Geographical Tools</div>
            </div>
            
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-t hover:bg-ike-neutral-light/50">
                <div className="col-span-2">
                  <div className="font-medium text-ike-neutral-dark">{user.name}</div>
                  <div className="text-sm text-ike-neutral">{user.organization}</div>
                  <Badge variant="outline" className="text-xs mt-1">{user.role}</Badge>
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    checked={user.permissions.viewStatistics}
                    onCheckedChange={(checked) => 
                      updatePermission(user.id, 'viewStatistics', checked === true)
                    }
                  />
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    checked={user.permissions.exportData}
                    onCheckedChange={(checked) => 
                      updatePermission(user.id, 'exportData', checked === true)
                    }
                  />
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    checked={user.permissions.advancedAnalysis}
                    onCheckedChange={(checked) => 
                      updatePermission(user.id, 'advancedAnalysis', checked === true)
                    }
                  />
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    checked={user.permissions.geographicalTools}
                    onCheckedChange={(checked) => 
                      updatePermission(user.id, 'geographicalTools', checked === true)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-ike-neutral mx-auto mb-4" />
              <p className="text-ike-neutral">No users found matching your search.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
