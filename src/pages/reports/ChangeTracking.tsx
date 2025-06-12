
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Download, Clock, User, FileText, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ChangeTracking() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Change Tracking</h1>
          <p className="text-ike-neutral mt-2">
            Monitor and track all changes across the regional education system
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Clock className="w-4 h-4 mr-2" />
            Real-time View
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      {/* Change Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Changes Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">247</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Across all systems
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Critical Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="flex items-center text-xs text-ike-warning mt-1">
              Requires review
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">89</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Making changes now
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">99.8%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              All systems operational
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Critical Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <AlertTriangle className="w-5 h-5 mr-2 text-ike-warning" />
            Critical Changes Requiring Attention
          </CardTitle>
          <CardDescription>
            High-impact changes that need administrator review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "Budget Allocation",
                description: "Major budget reallocation in Stockholm municipality",
                user: "Anna Lindström",
                timestamp: "2024-11-15 14:32",
                impact: "High",
                status: "Pending Review"
              },
              {
                id: 2,
                type: "Student Transfer",
                description: "Bulk student transfer between Malmö and Lund",
                user: "Lars Persson",
                timestamp: "2024-11-15 13:45",
                impact: "Medium",
                status: "Under Review"
              },
              {
                id: 3,
                type: "System Configuration",
                description: "Integration settings modified for Population Registry",
                user: "Maria Andersson",
                timestamp: "2024-11-15 12:20",
                impact: "High",
                status: "Approved"
              }
            ].map((change) => (
              <div key={change.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    change.impact === "High" ? "bg-ike-error/10" :
                    change.impact === "Medium" ? "bg-ike-warning/10" :
                    "bg-ike-success/10"
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      change.impact === "High" ? "text-ike-error" :
                      change.impact === "Medium" ? "text-ike-warning" :
                      "text-ike-success"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{change.type}</h3>
                    <p className="text-sm text-ike-neutral">{change.description}</p>
                    <div className="flex items-center text-xs text-ike-neutral mt-1">
                      <User className="w-3 h-3 mr-1" />
                      {change.user}
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      {change.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={
                    change.impact === "High" ? "bg-ike-error text-white" :
                    change.impact === "Medium" ? "bg-ike-warning text-white" :
                    "bg-ike-success text-white"
                  }>
                    {change.impact} Impact
                  </Badge>
                  <Badge variant="outline" className={
                    change.status === "Pending Review" ? "border-ike-warning text-ike-warning" :
                    change.status === "Under Review" ? "border-ike-primary text-ike-primary" :
                    "border-ike-success text-ike-success"
                  }>
                    {change.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Change Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <User className="w-5 h-5 mr-2 text-ike-primary" />
              Student Data Changes
            </CardTitle>
            <CardDescription>
              Recent modifications to student records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">New Enrollments</p>
                  <p className="text-sm text-ike-neutral">45 students today</p>
                </div>
                <Badge className="bg-ike-success text-white">Normal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Placement Changes</p>
                  <p className="text-sm text-ike-neutral">23 modifications</p>
                </div>
                <Badge className="bg-ike-warning text-white">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Data Corrections</p>
                  <p className="text-sm text-ike-neutral">8 corrections</p>
                </div>
                <Badge className="bg-ike-primary text-white">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              System Configuration
            </CardTitle>
            <CardDescription>
              Administrative and system changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">User Permissions</p>
                  <p className="text-sm text-ike-neutral">3 role updates</p>
                </div>
                <Badge className="bg-ike-primary text-white">Normal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Integration Settings</p>
                  <p className="text-sm text-ike-neutral">1 configuration change</p>
                </div>
                <Badge className="bg-ike-error text-white">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">School Unit Updates</p>
                  <p className="text-sm text-ike-neutral">2 school modifications</p>
                </div>
                <Badge className="bg-ike-success text-white">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Activity className="w-5 h-5 mr-2 text-ike-primary" />
              Financial Changes
            </CardTitle>
            <CardDescription>
              Budget and financial modifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Budget Adjustments</p>
                  <p className="text-sm text-ike-neutral">2 major changes</p>
                </div>
                <Badge className="bg-ike-error text-white">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Price List Updates</p>
                  <p className="text-sm text-ike-neutral">5 price changes</p>
                </div>
                <Badge className="bg-ike-warning text-white">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Payment Processing</p>
                  <p className="text-sm text-ike-neutral">12 transactions</p>
                </div>
                <Badge className="bg-ike-success text-white">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Clock className="w-5 h-5 mr-2 text-ike-primary" />
            Recent Change Timeline
          </CardTitle>
          <CardDescription>
            Chronological view of recent system changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "14:32", type: "Budget", change: "Major budget reallocation - Stockholm", user: "Anna L.", impact: "high" },
              { time: "13:45", type: "Student", change: "Bulk transfer: 45 students Malmö → Lund", user: "Lars P.", impact: "medium" },
              { time: "12:20", type: "System", change: "Population Registry integration updated", user: "Maria A.", impact: "high" },
              { time: "11:15", type: "User", change: "New regional admin added - Göteborg", user: "Admin", impact: "low" },
              { time: "10:30", type: "Data", change: "Student data correction batch processed", user: "System", impact: "low" },
              { time: "09:45", type: "Financial", change: "Price list updated for Q1 2025", user: "Erik S.", impact: "medium" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 border-l-4 border-l-ike-primary/20 bg-ike-neutral-light/30 rounded-r-lg">
                <div className="text-sm font-mono text-ike-neutral-dark min-w-[50px]">
                  {item.time}
                </div>
                <Badge variant="outline" className="min-w-[80px] justify-center">
                  {item.type}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm text-ike-neutral-dark">{item.change}</p>
                  <p className="text-xs text-ike-neutral">by {item.user}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  item.impact === "high" ? "bg-ike-error" :
                  item.impact === "medium" ? "bg-ike-warning" :
                  "bg-ike-success"
                }`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
