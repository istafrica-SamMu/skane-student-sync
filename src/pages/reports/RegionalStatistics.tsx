
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RegionalStatistics() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Regional Statistics</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive overview of regional education statistics and trends
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calendar className="w-4 h-4 mr-2" />
            Period: 2024
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Regional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">45,230</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.2% from last year
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Municipalities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">42</div>
            <div className="flex items-center text-xs text-ike-neutral mt-1">
              Active regions
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1.2B SEK</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              98.5% utilized
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">94.8%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Regional average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
              Student Distribution by Municipality
            </CardTitle>
            <CardDescription>
              Top performing municipalities in the region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Regional Chart</p>
                <p className="text-sm">(Municipality breakdown visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
              Regional Growth Trends
            </CardTitle>
            <CardDescription>
              Multi-year regional development patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Trend Analysis</p>
                <p className="text-sm">(Regional growth visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Municipality Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">Municipality Performance Overview</CardTitle>
          <CardDescription>
            Key performance indicators across all municipalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Stockholm", students: 8450, budget: "245M SEK", performance: "Excellent", trend: "up" },
              { name: "Göteborg", students: 6200, budget: "180M SEK", performance: "Good", trend: "up" },
              { name: "Malmö", students: 4800, budget: "140M SEK", performance: "Good", trend: "stable" },
              { name: "Uppsala", students: 3200, budget: "95M SEK", performance: "Excellent", trend: "up" },
              { name: "Linköping", students: 2800, budget: "85M SEK", performance: "Fair", trend: "down" }
            ].map((municipality, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{municipality.name}</h3>
                    <p className="text-sm text-ike-neutral">{municipality.students} students • {municipality.budget}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge 
                    className={
                      municipality.performance === "Excellent" ? "bg-ike-success text-white" :
                      municipality.performance === "Good" ? "bg-ike-primary text-white" :
                      "bg-ike-warning text-white"
                    }
                  >
                    {municipality.performance}
                  </Badge>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    municipality.trend === "up" ? "bg-ike-success/10" :
                    municipality.trend === "down" ? "bg-ike-error/10" :
                    "bg-ike-neutral/10"
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      municipality.trend === "up" ? "text-ike-success" :
                      municipality.trend === "down" ? "text-ike-error rotate-180" :
                      "text-ike-neutral"
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
