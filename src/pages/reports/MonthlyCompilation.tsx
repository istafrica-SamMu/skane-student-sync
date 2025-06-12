
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, FileText, Users, Calculator, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MonthlyCompilation() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Monthly Compilation</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive monthly reports compilation for regional oversight
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            November 2024
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Reports Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">142</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">45.2K</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Processed this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Municipalities Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">42/42</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              100% completion rate
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">98.7%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              High quality data
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Users className="w-5 h-5 mr-2 text-ike-primary" />
              Student Reports
            </CardTitle>
            <CardDescription>
              Monthly student data compilation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Enrollment Summary</p>
                  <p className="text-sm text-ike-neutral">42 municipalities</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Placement Statistics</p>
                  <p className="text-sm text-ike-neutral">All regions</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Conflict Analysis</p>
                  <p className="text-sm text-ike-neutral">Resolution tracking</p>
                </div>
                <Badge className="bg-ike-warning text-white">In Progress</Badge>
              </div>
            </div>
            <Button className="w-full mt-4 bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Student Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
              Financial Reports
            </CardTitle>
            <CardDescription>
              Monthly financial compilation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Budget Analysis</p>
                  <p className="text-sm text-ike-neutral">All municipalities</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Cost per Student</p>
                  <p className="text-sm text-ike-neutral">Regional breakdown</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Payment Tracking</p>
                  <p className="text-sm text-ike-neutral">Inter-municipal</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
            </div>
            <Button className="w-full mt-4 bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Financial Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <FileText className="w-5 h-5 mr-2 text-ike-primary" />
              Operational Reports
            </CardTitle>
            <CardDescription>
              Monthly operational compilation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">System Performance</p>
                  <p className="text-sm text-ike-neutral">Uptime & usage</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">Integration Status</p>
                  <p className="text-sm text-ike-neutral">All systems</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-ike-neutral-dark">User Activity</p>
                  <p className="text-sm text-ike-neutral">Regional summary</p>
                </div>
                <Badge className="bg-ike-success text-white">Complete</Badge>
              </div>
            </div>
            <Button className="w-full mt-4 bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Operational Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Monthly Report History</CardTitle>
          <CardDescription>
            Previous monthly compilation reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "October 2024", reports: 138, quality: "99.1%", status: "Complete" },
              { month: "September 2024", reports: 135, quality: "98.8%", status: "Complete" },
              { month: "August 2024", reports: 140, quality: "99.2%", status: "Complete" },
              { month: "July 2024", reports: 142, quality: "98.9%", status: "Complete" }
            ].map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{month.month}</h3>
                    <p className="text-sm text-ike-neutral">{month.reports} reports • Quality: {month.quality}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-ike-success text-white">{month.status}</Badge>
                  <Button size="sm" variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
