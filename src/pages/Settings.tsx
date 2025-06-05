
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
  Info
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataPrivacyLevel, setDataPrivacyLevel] = useState("anonymous");
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // Implement theme change logic here (e.g., using CSS classes)
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    // Implement notification settings change logic here
  };

  const handleDataPrivacyChange = (level: string) => {
    setDataPrivacyLevel(level);
    // Implement data privacy level change logic here
  };

  const handleAutoUpdateChange = (enabled: boolean) => {
    setAutoUpdate(enabled);
    // Implement auto-update settings change logic here
  };

  const handleImport = () => {
    // Implement import logic here
    alert("Import functionality not implemented yet.");
  };

  const handleExport = () => {
    // Implement export logic here
    alert("Export functionality not implemented yet.");
  };

  const handleReset = () => {
    // Implement reset logic here
    alert("Reset functionality not implemented yet.");
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
                {/* Implement user management UI here */}
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
