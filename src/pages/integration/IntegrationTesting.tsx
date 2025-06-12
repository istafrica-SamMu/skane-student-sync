
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Play, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const IntegrationTesting = () => {
  const { t } = useLanguage();

  const testResults = [
    {
      name: "Malmö SIS Connection",
      status: "success",
      lastRun: "2024-11-15 14:30",
      duration: "2.3s",
      records: 1245
    },
    {
      name: "SS12000 Data Validation",
      status: "success",
      lastRun: "2024-11-15 14:25",
      duration: "1.8s",
      records: 3456
    },
    {
      name: "Navet API Response",
      status: "warning",
      lastRun: "2024-11-15 14:20",
      duration: "5.2s",
      records: 234
    },
    {
      name: "File Import Processing",
      status: "error",
      lastRun: "2024-11-15 14:15",
      duration: "0.5s",
      records: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-ike-success" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-ike-warning" />;
      case "error":
        return <XCircle className="w-4 h-4 text-ike-error" />;
      default:
        return <Clock className="w-4 h-4 text-ike-neutral" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-ike-success text-white">Passed</Badge>;
      case "warning":
        return <Badge className="bg-ike-warning text-white">Warning</Badge>;
      case "error":
        return <Badge className="bg-ike-error text-white">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Integration Testing</h1>
          <p className="text-ike-neutral mt-2">
            Test and validate integration connections and data flows
          </p>
        </div>
        <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
          <Play className="w-4 h-4 mr-2" />
          Run All Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Passed Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">15</div>
            <div className="text-xs text-ike-success mt-1">Out of 18 total</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2</div>
            <div className="text-xs text-ike-warning mt-1">Performance issues</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-error">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Failed Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1</div>
            <div className="text-xs text-ike-error mt-1">Requires attention</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last Run</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-ike-neutral-dark">14:30</div>
            <div className="text-xs text-ike-neutral mt-1">Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Tests</TabsTrigger>
          <TabsTrigger value="automated">Automated Tests</TabsTrigger>
          <TabsTrigger value="manual">Manual Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>
                Latest integration test executions and their results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h3 className="font-medium">{test.name}</h3>
                        <p className="text-sm text-ike-neutral">
                          {test.lastRun} • {test.duration} • {test.records} records
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(test.status)}
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Test Suite</CardTitle>
              <CardDescription>
                Scheduled and continuous integration tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Daily Health Check</h3>
                    <p className="text-sm text-ike-neutral">Runs every day at 06:00</p>
                  </div>
                  <Badge className="bg-ike-success text-white">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Weekly Full Test</h3>
                    <p className="text-sm text-ike-neutral">Comprehensive test every Sunday</p>
                  </div>
                  <Badge className="bg-ike-success text-white">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Post-Deployment Tests</h3>
                    <p className="text-sm text-ike-neutral">After each system update</p>
                  </div>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Test Cases</CardTitle>
              <CardDescription>
                On-demand testing for specific scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Test New Municipality Setup
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Test Large Data Import
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Test Error Handling
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Test Security Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationTesting;
