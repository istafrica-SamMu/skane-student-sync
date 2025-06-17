
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole && name && email) {
      login(selectedRole, {
        id: `${selectedRole}-${Date.now()}`,
        name,
        email,
        organization: organization || undefined,
      });
      navigate("/dashboard");
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'regional-admin':
        return 'Highest level access - manages the entire regional system';
      case 'municipality-admin':
        return 'Municipal level access - manages municipal schools and students';
      case 'school-admin':
        return 'School level access - manages individual school or school group';
      case 'orgadmin':
        return 'Organization administrator - manages customer accounts at organizational level';
      case 'devadmin':
        return 'Development administrator - configures integrations, translations, and development tools';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ike-neutral-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-ike-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-ike-primary">IKE 2.0</CardTitle>
          <CardDescription>
            Skåne Regional Platform - Inter-Municipal Compensation System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={selectedRole || ""} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regional-admin">Regional Central Administrator</SelectItem>
                <SelectItem value="municipality-admin">Municipality Administrator</SelectItem>
                <SelectItem value="school-admin">Independent School Administrator</SelectItem>
                <SelectItem value="orgadmin">Organization Administrator</SelectItem>
                <SelectItem value="devadmin">Development Administrator</SelectItem>
              </SelectContent>
            </Select>
            {selectedRole && (
              <p className="text-sm text-ike-neutral">
                {getRoleDescription(selectedRole)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization (Optional)</Label>
            <Input
              id="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="School/Municipality name"
            />
          </div>

          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={!selectedRole || !name || !email}
          >
            Login
          </Button>

          <div className="text-center text-sm text-ike-neutral">
            Demo system - Select any role to explore the interface
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
