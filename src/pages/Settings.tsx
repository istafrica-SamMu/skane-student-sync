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

const Settings = () => {
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
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Inställningar</h1>
          <p className="text-ike-neutral mt-2">
            Anpassa systeminställningar och preferenser
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Allmänt
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Användare
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Säkerhet
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" />
            Datahantering
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Aviseringar
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Utseende
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Allmänna Inställningar</CardTitle>
              <CardDescription>
                Konfigurera grundläggande systeminställningar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Välj tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Ljust</SelectItem>
                    <SelectItem value="dark">Mörkt</SelectItem>
                    <SelectItem value="system">Systemstandard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-update">Automatisk Uppdatering</Label>
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
              <CardTitle>Användarhantering</CardTitle>
              <CardDescription>
                Hantera användarkonton och behörigheter.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <p className="text-sm text-ike-neutral">
                  Här kan du lägga till, redigera eller ta bort användare.
                </p>
                {/* Implement user management UI here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Säkerhetsinställningar</CardTitle>
              <CardDescription>
                Konfigurera säkerhetsalternativ för systemet.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="data-privacy">Datasekretessnivå</Label>
                <Select
                  value={dataPrivacyLevel}
                  onValueChange={handleDataPrivacyChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Välj nivå" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anonymous">Anonymiserad</SelectItem>
                    <SelectItem value="pseudonymized">Pseudonymiserad</SelectItem>
                    <SelectItem value="full">Fullständig</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Datahantering</CardTitle>
              <CardDescription>
                Importera, exportera eller återställ systemdata.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center space-x-4">
                <Button onClick={handleImport}>
                  <Upload className="mr-2 h-4 w-4" />
                  Importera Data
                </Button>
                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportera Data
                </Button>
                <Button variant="destructive" onClick={handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Återställ Data
                </Button>
              </div>
              <div>
                <p className="text-sm text-ike-neutral">
                  <Info className="mr-1 inline-block h-4 w-4" />
                  Var försiktig med datahantering. Återställning kan leda till
                  dataförlust.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Aviseringar</CardTitle>
              <CardDescription>
                Hantera systemaviseringar och påminnelser.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notifications">Aktivera Aviseringar</Label>
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
                    Viktigt: Inaktivering av aviseringar kan påverka din
                    förmåga att reagera på viktiga händelser.
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Utseende</CardTitle>
              <CardDescription>
                Anpassa systemets utseende och känsla.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="custom-css">Anpassad CSS</Label>
                <Input
                  id="custom-css"
                  placeholder="Lägg till anpassad CSS här"
                />
              </div>
              <div>
                <Button variant="secondary">
                  <Check className="mr-2 h-4 w-4" />
                  Spara CSS
                </Button>
                <Button variant="destructive" className="ml-2">
                  <X className="mr-2 h-4 w-4" />
                  Återställ Standard
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
