
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Activity, Globe, Server, GitBranch, Languages, Monitor } from "lucide-react";

const DevAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ike-primary">Development Administration</h1>
        <p className="text-ike-neutral">Configure integrations, translations, and development tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Code className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-ike-neutral">12 pending configuration</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Translation Coverage</CardTitle>
            <Languages className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-ike-neutral">5 languages supported</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Endpoints</CardTitle>
            <Server className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-ike-neutral">99.8% uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Performance</CardTitle>
            <Monitor className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98ms</div>
            <p className="text-xs text-ike-neutral">Average response time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
            <CardDescription>Customer integration configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">SS12000 Integrations</span>
                <span className="font-medium">23 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Navet Connections</span>
                <span className="font-medium">15 configured</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Population Registry</span>
                <span className="font-medium">8 synchronized</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Setups</span>
                <span className="font-medium">4 customers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Activities</CardTitle>
            <CardDescription>Recent development and configuration tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Translation update deployed</p>
                  <p className="text-xs text-ike-neutral">Swedish locale updated - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New API endpoint configured</p>
                  <p className="text-xs text-ike-neutral">Customer integration setup - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Database migration completed</p>
                  <p className="text-xs text-ike-neutral">Schema updates applied - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevAdminDashboard;
