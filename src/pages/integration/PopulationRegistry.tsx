
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Sync, Shield, AlertTriangle, CheckCircle, RefreshCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PopulationRegistry = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Population Registry Integration</h1>
          <p className="text-ike-neutral mt-2">
            Synchronize with Navet for population data and address updates
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Sync Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-ike-success" />
              <span className="text-ike-neutral-dark font-medium">Connected</span>
            </div>
            <div className="text-xs text-ike-neutral mt-1">Last check: 5 min ago</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Records Synced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">48,234</div>
            <div className="text-xs text-ike-neutral mt-1">This month</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Protected Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">247</div>
            <div className="flex items-center text-xs text-ike-error mt-1">
              <Shield className="w-3 h-3 mr-1" />
              Confidential
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-ike-neutral-dark">14:30</div>
            <div className="text-xs text-ike-neutral mt-1">Today</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Sync className="w-5 h-5 mr-2 text-ike-primary" />
            Current Synchronization
          </CardTitle>
          <CardDescription>
            Real-time synchronization with population registry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Address Updates</span>
              <Badge className="bg-ike-primary text-white">Running</Badge>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-sm text-ike-neutral">Processing 1,245 of 1,660 records</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Population Data
            </CardTitle>
            <CardDescription>
              Synchronize basic population information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Personal numbers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Names and surnames</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Birth dates</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Civil status</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Shield className="w-5 h-5 mr-2 text-ike-error" />
              Protected Information
            </CardTitle>
            <CardDescription>
              Handle confidential and protected personal data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-ike-warning" />
                <span className="text-sm">Protected identity</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-ike-warning" />
                <span className="text-sm">Confidential addresses</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">GDPR compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-ike-success" />
                <span className="text-sm">Audit logging</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PopulationRegistry;
