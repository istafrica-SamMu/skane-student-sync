
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Filter, Shield, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

const MunicipalUserAdmin = () => {
  const municipalUsers = [
    {
      id: 1,
      name: "Lars Andersson",
      email: "lars.andersson@malmoe.se",
      role: "School Principal",
      school: "Malmö Central Elementary",
      status: "Active",
      lastLogin: "2024-06-12",
      permissions: ["Student Management", "Staff Management"]
    },
    {
      id: 2,
      name: "Sofia Eriksson",
      email: "sofia.eriksson@malmoe.se",
      role: "Administrative Staff",
      school: "Malmö North High School",
      status: "Active",
      lastLogin: "2024-06-11",
      permissions: ["Student Records", "Reports"]
    },
    {
      id: 3,
      name: "Michael Johansson",
      email: "michael.johansson@malmoe.se",
      role: "Teacher",
      school: "Malmö Tech Academy",
      status: "Pending",
      lastLogin: "Never",
      permissions: ["Class Management"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-primary">Municipal User Administration</h1>
          <p className="text-ike-neutral">Manage user accounts within your municipality</p>
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
            Municipal Users
          </CardTitle>
          <CardDescription>
            Manage all user accounts within your municipal school system
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
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">School</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Status</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Last Login</th>
                  <th className="text-left p-4 font-medium text-ike-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {municipalUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-ike-neutral-light/50">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-ike-neutral">{user.email}</td>
                    <td className="p-4">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-4 text-ike-neutral">{user.school}</td>
                    <td className="p-4">
                      <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-ike-neutral">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Shield className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </div>
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

export default MunicipalUserAdmin;
