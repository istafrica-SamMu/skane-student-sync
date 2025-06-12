
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, TrendingUp, Calculator, BarChart3, PieChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancialAnalysis() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Financial Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive financial analysis and budget tracking across the region
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Calculator className="w-4 h-4 mr-2" />
            Budget Calculator
          </Button>
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Total Regional Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">1.2B SEK</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3.2% from 2023
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Budget Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">98.5%</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              Excellent utilization
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Cost per Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">127K SEK</div>
            <div className="flex items-center text-xs text-ike-error mt-1">
              +2.1% increase
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              Savings Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">18M SEK</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              1.5% of total budget
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
              Budget vs Actual Spending
            </CardTitle>
            <CardDescription>
              Monthly budget tracking and variance analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Budget Chart</p>
                <p className="text-sm">(Budget vs actual visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <PieChart className="w-5 h-5 mr-2 text-ike-primary" />
              Budget Allocation by Category
            </CardTitle>
            <CardDescription>
              Distribution of regional education budget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-lg">
              <div className="text-center text-ike-neutral">
                <PieChart className="w-12 h-12 mx-auto mb-2 text-ike-primary" />
                <p>Interactive Allocation Chart</p>
                <p className="text-sm">(Budget distribution visualization)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
            Detailed Cost Analysis
          </CardTitle>
          <CardDescription>
            Breakdown of costs by municipality and program type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                municipality: "Stockholm", 
                totalBudget: "245M SEK", 
                utilized: "98.2%", 
                costPerStudent: "129K SEK",
                variance: "+2.3%",
                trend: "up"
              },
              { 
                municipality: "Göteborg", 
                totalBudget: "180M SEK", 
                utilized: "97.8%", 
                costPerStudent: "126K SEK",
                variance: "+1.8%",
                trend: "up"
              },
              { 
                municipality: "Malmö", 
                totalBudget: "140M SEK", 
                utilized: "99.1%", 
                costPerStudent: "124K SEK",
                variance: "+0.9%",
                trend: "stable"
              },
              { 
                municipality: "Uppsala", 
                totalBudget: "95M SEK", 
                utilized: "98.5%", 
                costPerStudent: "131K SEK",
                variance: "+3.1%",
                trend: "up"
              },
              { 
                municipality: "Linköping", 
                totalBudget: "85M SEK", 
                utilized: "96.8%", 
                costPerStudent: "128K SEK",
                variance: "+2.5%",
                trend: "up"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-ike-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ike-neutral-dark">{item.municipality}</h3>
                    <p className="text-sm text-ike-neutral">
                      Budget: {item.totalBudget} • Utilized: {item.utilized}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-ike-neutral-dark">{item.costPerStudent}</p>
                    <p className={`text-sm ${
                      item.variance.startsWith('+') ? 'text-ike-error' : 'text-ike-success'
                    }`}>
                      {item.variance} variance
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.trend === "up" ? "bg-ike-error/10" :
                    item.trend === "down" ? "bg-ike-success/10" :
                    "bg-ike-neutral/10"
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === "up" ? "text-ike-error" :
                      item.trend === "down" ? "text-ike-success rotate-180" :
                      "text-ike-neutral"
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Cost Optimization Opportunities</CardTitle>
            <CardDescription>
              Identified areas for potential savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 border-l-ike-success bg-ike-success/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Administrative Efficiency</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Potential savings: 2.3M SEK through shared administrative services
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-primary bg-ike-primary/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Resource Sharing</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Potential savings: 1.8M SEK through inter-municipal resource sharing
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-warning bg-ike-warning/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Technology Integration</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Potential savings: 1.2M SEK through improved system integration
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Budget Alerts & Recommendations</CardTitle>
            <CardDescription>
              Financial insights and action items
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-l-4 border-l-ike-error bg-ike-error/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">High Variance Alert</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Uppsala showing 3.1% cost increase - requires investigation
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-success bg-ike-success/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Efficiency Achievement</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Malmö achieved excellent budget utilization at 99.1%
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-ike-primary bg-ike-primary/5 rounded-r-lg">
              <h4 className="font-medium text-ike-neutral-dark">Budget Planning</h4>
              <p className="text-sm text-ike-neutral mt-1">
                Q1 2025 budget planning should consider inflation adjustments
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
