
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Database,
  Bell,
  Key,
  Clock,
  LogOut,
  Save,
  RefreshCcw
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-ike-neutral-dark">Inställningar</h1>
        <p className="text-ike-neutral mt-2">
          Hantera systeminställningar och användarprofil
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Säkerhet</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="audit">Granskning</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <User className="w-5 h-5 mr-2 text-ike-primary" />
                Profilinformation
              </CardTitle>
              <CardDescription>
                Hantera din användarinformation och inställningar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-ike-primary rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-ike-neutral-dark">Anna Lindström</h3>
                    <p className="text-ike-neutral">Kommunal administratör, Malmö</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Ändra bild
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Namn</Label>
                    <Input id="name" value="Anna Lindström" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post</Label>
                    <Input id="email" value="anna.lindstrom@malmo.se" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" value="070-123 45 67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Roll</Label>
                    <Input id="role" value="Kommunal administratör" readOnly className="bg-ike-neutral-light" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Meddelanden</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">E-postnotifikationer</p>
                      <p className="text-xs text-ike-neutral">Få meddelanden via e-post</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">Systemnotifikationer</p>
                      <p className="text-xs text-ike-neutral">Visa notifikationer i systemet</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Avbryt</Button>
                  <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Spara ändringar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Shield className="w-5 h-5 mr-2 text-ike-primary" />
                Säkerhetsinställningar
              </CardTitle>
              <CardDescription>
                Hantera lösenord och säkerhetsinställningar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-ike-neutral-dark">Ändra lösenord</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Nuvarande lösenord</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nytt lösenord</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Bekräfta nytt lösenord</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Key className="w-4 h-4 mr-2" />
                    Uppdatera lösenord
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Tvåfaktorsautentisering</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">Aktivera tvåfaktorsautentisering</p>
                      <p className="text-xs text-ike-neutral">Öka säkerheten för ditt konto</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    Konfigurera tvåfaktorsautentisering
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Sessionshantering</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ike-neutral-dark">Aktiv session</p>
                        <p className="text-xs text-ike-neutral">Malmö, Sverige • Chrome • 2024-11-15 14:30</p>
                      </div>
                      <Badge className="bg-ike-success text-white">Aktuell</Badge>
                    </div>
                    
                    <Button variant="outline" className="border-ike-error text-ike-error hover:bg-ike-error/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logga ut från alla enheter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <SettingsIcon className="w-5 h-5 mr-2 text-ike-primary" />
                Systeminställningar
              </CardTitle>
              <CardDescription>
                Hantera systemkonfiguration och inställningar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-ike-neutral-dark">Integration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ist-endpoint">IST Admin endpoint</Label>
                      <Input id="ist-endpoint" value="https://api.ist.malmo.se/v1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="navet-endpoint">Navet API endpoint</Label>
                      <Input id="navet-endpoint" value="https://api.navet.skatteverket.se/v2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">Aktivera SS12000-import</p>
                      <p className="text-xs text-ike-neutral">Tillåt import via SS12000-format</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Beräkningsinställningar</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="calc-date">Beräkningsdatum</Label>
                    <Input id="calc-date" value="15" />
                    <p className="text-xs text-ike-neutral">Dag i månaden för månatlig beräkning</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">Automatiska beräkningar</p>
                      <p className="text-xs text-ike-neutral">Kör beräkningar automatiskt på schemalagt datum</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Systemunderhåll</h3>
                  
                  <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10 mr-4">
                    <Database className="w-4 h-4 mr-2" />
                    Skapa databas-backup
                  </Button>
                  
                  <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Återställ cache
                  </Button>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Avbryt</Button>
                  <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Spara ändringar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Clock className="w-5 h-5 mr-2 text-ike-primary" />
                Granskningsloggar
              </CardTitle>
              <CardDescription>
                Visa system- och användaraktivitet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-ike-neutral-dark">Senaste aktiviteter</h3>
                  <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    <Bell className="w-4 h-4 mr-2" />
                    Visa alla aktiviteter
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Tidstämpel</TableHead>
                      <TableHead className="font-medium">Användare</TableHead>
                      <TableHead className="font-medium">Aktivitet</TableHead>
                      <TableHead className="font-medium">IP-adress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        timestamp: "2024-11-15 15:30:42",
                        user: "Anna Lindström",
                        activity: "Loggade in",
                        ip: "192.168.1.105"
                      },
                      { 
                        timestamp: "2024-11-15 15:32:18", 
                        user: "Anna Lindström",
                        activity: "Öppnade studentregister",
                        ip: "192.168.1.105"
                      },
                      { 
                        timestamp: "2024-11-15 15:35:47",
                        user: "Anna Lindström",
                        activity: "Uppdaterade studentdata för ID #12345",
                        ip: "192.168.1.105"
                      },
                      { 
                        timestamp: "2024-11-15 15:40:12",
                        user: "Systemet",
                        activity: "Schemalagd databas-backup",
                        ip: "Lokal"
                      },
                      { 
                        timestamp: "2024-11-15 15:42:36",
                        user: "Lars Persson",
                        activity: "Loggade in",
                        ip: "192.168.1.110"
                      },
                    ].map((log, index) => (
                      <TableRow key={index} className="hover:bg-ike-neutral-light/50">
                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.activity}</TableCell>
                        <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-ike-neutral">
                      Visar 5 av 1,248 loggposter
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Föregående
                    </Button>
                    <Button variant="outline" size="sm">
                      Nästa
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-ike-neutral-dark">Loggexport</h3>
                  
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                      <Download className="w-4 h-4 mr-2" />
                      Exportera till Excel
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportera till CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
