
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Check,
  X,
  Lock,
  Key,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match!",
        variant: "destructive"
      });
      return;
    }

    if (!passwordMeetsRequirements(passwordData.newPassword)) {
      toast({
        title: "Error",
        description: "Password does not meet security requirements!",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setIsPasswordDialogOpen(false);
    }, 1000);
  };

  const passwordMeetsRequirements = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*]/.test(password);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">{t('settings.title')}</h1>
          <p className="text-ike-neutral mt-2">
            {t('settings.subtitle')}
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="password" className="w-full">
        <TabsList>
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-ike-primary" />
                <span>Change Password</span>
              </CardTitle>
              <CardDescription>
                Update your account password. Password must meet security requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Repeat New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
              
              {/* Password Requirements */}
              <div className="p-4 border border-ike-neutral-light rounded-lg bg-ike-neutral-light/30">
                <h4 className="font-medium text-ike-neutral-dark mb-3">Password Requirements:</h4>
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center space-x-2 ${passwordData.newPassword.length >= 8 ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {passwordData.newPassword.length >= 8 ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>At least 8 characters long</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[A-Z]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[A-Z]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[a-z]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[a-z]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[0-9]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[0-9]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains number</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${/[!@#$%^&*]/.test(passwordData.newPassword) ? 'text-ike-success' : 'text-ike-neutral'}`}>
                    {/[!@#$%^&*]/.test(passwordData.newPassword) ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>Contains special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>

              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    disabled={!passwordMeetsRequirements(passwordData.newPassword) || passwordData.newPassword !== passwordData.confirmPassword || !passwordData.currentPassword}
                    className="w-full"
                  >
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Password Change</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to change your password? You will need to log in again with your new password.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePasswordChange}>
                      Change Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
