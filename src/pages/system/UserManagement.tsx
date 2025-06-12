
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: "Anna Andersson",
      email: "anna.andersson@malmoe.se",
      role: "Municipality Admin",
      organization: "Malmö Municipality",
      status: "Active",
      lastLogin: "2024-06-10"
    },
    {
      id: 2,
      name: "Erik Eriksson",
      email: "erik@skola.se",
      role: "School Admin",
      organization: "Malmö International School",
      status: "Active",
      lastLogin: "2024-06-11"
    },
    {
      id: 3,
      name: "Maria Nilsson",
      email: "maria.nilsson@region.se",
      role: "Regional Admin",
      organization: "Skåne Regional Platform",
      status: "Active",
      lastLogin: "2024-06-12"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">User Management</h1>
          <p className="text-ike-neutral">Manage system users and their permissions</p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            System Users
          </CardTitle>
          <CardDescription>
            Manage user accounts across all municipalities and schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ike-neutral" />
              <Input
                placeholder="Search users..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Name</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Email</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Role</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Organization</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Status</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Last Login</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-ike-neutral-light/50">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-ike-neutral">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-4 text-ike-neutral">{user.organization}</td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                    </td>
                    <td className="p-4 text-ike-neutral">{user.lastLogin}</td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
