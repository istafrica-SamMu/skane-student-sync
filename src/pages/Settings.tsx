
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon,
  Users,
  Shield,
  Database,
  Bell,
  Palette,
  Download,
  Upload,
  RefreshCw,
  Check,
  X,
  AlertTriangle,
  Info,
  Lock,
  GraduationCap,
  Calendar,
  UserCheck,
  Key
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataPrivacyLevel, setDataPrivacyLevel] = useState("anonymous");
  const [autoUpdate, setAutoUpdate] = useState(true);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Enrollment settings state
  const [enrollmentSettings, setEnrollmentSettings] = useState({
    enrollmentPeriodStart: "2024-01-15",
    enrollmentPeriodEnd: "2024-03-15",
    allowLateEnrollment: false,
    maxStudentsPerGrade: "",
    requireParentConsent: true,
    overrideRegionalSettings: false
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
  };

  const handleDataPrivacyChange = (level: string) => {
    setDataPrivacyLevel(level);
  };

  const handleAutoUpdateChange = (enabled: boolean) => {
    setAutoUpdate(enabled);
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleEnrollmentSettingsChange = (field: string, value: any) => {
    setEnrollmentSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEnrollmentSettings = () => {
    alert("Enrollment settings saved successfully!");
  };

  const handleImport = () => {
    alert("Import functionality not implemented yet.");
  };

  const handleExport = () => {
    alert("Export functionality not implemented yet.");
  };

  const handleReset = () => {
    alert("Reset functionality not implemented yet.");
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
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            {t('settings.general')}
          </TabsTrigger>
          {user?.role === 'municipality-admin' && (
            <TabsTrigger value="enrollment">
              <GraduationCap className="mr-2 h-4 w-4" />
              Enrollment Management
            </TabsTrigger>
          )}
          <TabsTrigger value="password">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            {t('settings.users')}
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            {t('settings.security')}
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" />
            {t('settings.data.management')}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            {t('settings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            {t('settings.appearance')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.general.settings')}</CardTitle>
              <CardDescription>
                {t('settings.general.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="theme">{t('settings.theme')}</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('settings.theme.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t('settings.theme.light')}</SelectItem>
                    <SelectItem value="dark">{t('settings.theme.dark')}</SelectItem>
                    <SelectItem value="system">{t('settings.theme.system')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-update">{t('settings.auto.update')}</Label>
                <Switch
                  id="auto-update"
                  checked={autoUpdate}
                  onCheckedChange={handleAutoUpdateChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === 'municipality-admin' && (
          <TabsContent value="enrollment">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-ike-primary" />
                    <span>Municipal Enrollment Periods</span>
                  </CardTitle>
                  <CardDescription>
                    Customize municipal enrollment periods within regional guidelines
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="enrollment-start">Enrollment Period Start</Label>
                      <Input
                        id="enrollment-start"
                        type="date"
                        value={enrollmentSettings.enrollmentPeriodStart}
                        onChange={(e) => handleEnrollmentSettingsChange('enrollmentPeriodStart', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="enrollment-end">Enrollment Period End</Label>
                      <Input
                        id="enrollment-end"
                        type="date"
                        value={enrollmentSettings.enrollmentPeriodEnd}
                        onChange={(e) => handleEnrollmentSettingsChange('enrollmentPeriodEnd', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="late-enrollment">Allow Late Enrollment</Label>
                    <Switch
                      id="late-enrollment"
                      checked={enrollmentSettings.allowLateEnrollment}
                      onCheckedChange={(checked) => handleEnrollmentSettingsChange('allowLateEnrollment', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-ike-primary" />
                    <span>Enrollment Rules & Restrictions</span>
                  </CardTitle>
                  <CardDescription>
                    Set municipality-specific enrollment rules and grade-level controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="max-students">Maximum Students per Grade Level</Label>
                    <Input
                      id="max-students"
                      type="number"
                      placeholder="Leave empty for no limit"
                      value={enrollmentSettings.maxStudentsPerGrade}
                      onChange={(e) => handleEnrollmentSettingsChange('maxStudentsPerGrade', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="parent-consent">Require Parent Consent for Enrollment</Label>
                    <Switch
                      id="parent-consent"
                      checked={enrollmentSettings.requireParentConsent}
                      onCheckedChange={(checked) => handleEnrollmentSettingsChange('requireParentConsent', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="override-regional">Override Regional Settings (When Authorized)</Label>
                    <Switch
                      id="override-regional"
                      checked={enrollmentSettings.overrideRegionalSettings}
                      onCheckedChange={(checked) => handleEnrollmentSettingsChange('overrideRegionalSettings', checked)}
                    />
                  </div>
                  {enrollmentSettings.overrideRegionalSettings && (
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Regional Override Active</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            You are overriding regional enrollment settings. Ensure you have proper authorization.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button onClick={handleSaveEnrollmentSettings} className="w-full">
                    Save Enrollment Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

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

              <Button 
                onClick={handlePasswordChange}
                disabled={!passwordMeetsRequirements(passwordData.newPassword) || passwordData.newPassword !== passwordData.confirmPassword || !passwordData.currentPassword}
                className="w-full"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.user.management')}</CardTitle>
              <CardDescription>
                {t('settings.user.management.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <p className="text-sm text-ike-neutral">
                  {t('settings.user.management.content')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.security.settings')}</CardTitle>
              <CardDescription>
                {t('settings.security.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="data-privacy">{t('settings.data.privacy.level')}</Label>
                <Select
                  value={dataPrivacyLevel}
                  onValueChange={handleDataPrivacyChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('settings.data.privacy.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anonymous">{t('settings.data.privacy.anonymous')}</SelectItem>
                    <SelectItem value="pseudonymized">{t('settings.data.privacy.pseudonymized')}</SelectItem>
                    <SelectItem value="full">{t('settings.data.privacy.full')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.data.management')}</CardTitle>
              <CardDescription>
                {t('settings.data.management.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center space-x-4">
                <Button onClick={handleImport}>
                  <Upload className="mr-2 h-4 w-4" />
                  {t('settings.data.import')}
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  {t('settings.data.export')}
                </Button>
                <Button variant="destructive" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t('settings.data.reset')}
                </Button>
              </div>
              <div>
                <p className="text-sm text-ike-neutral">
                  <Info className="mr-1 inline-block h-4 w-4" />
                  {t('settings.data.warning')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.notifications')}</CardTitle>
              <CardDescription>
                {t('settings.notifications.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifications">{t('settings.notifications.enable')}</Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={handleNotificationsChange}
                />
              </div>
              <div>
                <Badge variant="secondary" className="space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {t('settings.notifications.warning')}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.appearance')}</CardTitle>
              <CardDescription>
                {t('settings.appearance.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="custom-css">{t('settings.custom.css')}</Label>
                <Input
                  id="custom-css"
                  placeholder={t('settings.custom.css.placeholder')}
                />
              </div>
              <div>
                <Button variant="secondary">
                  <Check className="mr-2 h-4 w-4" />
                  {t('settings.save.css')}
                </Button>
                <Button variant="destructive" className="ml-2">
                  <X className="mr-2 h-4 w-4" />
                  {t('settings.reset.default')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
