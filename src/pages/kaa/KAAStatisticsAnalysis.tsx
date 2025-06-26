
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Download, 
  Filter,
  Users,
  Activity,
  Calendar,
  BarChart3,
  ClipboardList
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { KAAMultiPeriodComparison } from "@/components/kaa/KAAMultiPeriodComparison";
import { KAAConsolidatedDataTable } from "@/components/kaa/KAAConsolidatedDataTable";
import { KAAStatisticsTrends } from "@/components/kaa/KAAStatisticsTrends";

const KAAStatisticsAnalysis = () => {
  const { toast } = useToast();

  const kaaSummary = {
    totalRegistrations: 145,
    activeKAA: 87,
    completedActions: 234,
    contactOccasions: 412,
    averageAge: 16.2
  };

  const handleExportAnalysis = () => {
    toast({
      title: "Analysis Exported",
      description: "KAA statistics analysis has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">KAA Statistics Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive analysis of Municipal Activity Responsibility (KAA) data across multiple periods
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter Periods
          </Button>
          <Button 
            onClick={handleExportAnalysis}
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <ClipboardList className="w-4 h-4 mr-1 text-ike-primary" />
              Total KAA Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              {kaaSummary.totalRegistrations}
            </div>
            <p className="text-xs text-ike-neutral">All time registrations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Users className="w-4 h-4 mr-1 text-green-600" />
              Active KAA Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {kaaSummary.activeKAA}
            </div>
            <p className="text-xs text-ike-neutral">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Activity className="w-4 h-4 mr-1 text-blue-600" />
              Completed Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {kaaSummary.completedActions}
            </div>
            <p className="text-xs text-ike-neutral">Total actions taken</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Contact Occasions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{kaaSummary.contactOccasions}</div>
            <p className="text-xs text-ike-neutral">Total contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Average Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{kaaSummary.averageAge}</div>
            <p className="text-xs text-ike-neutral">Years old</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Multi-Period</TabsTrigger>
          <TabsTrigger value="consolidated">All KAA Data</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <ClipboardList className="w-5 h-5 mr-2 text-ike-primary" />
                  KAA Registration Summary
                </CardTitle>
                <CardDescription>Current period breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Active KAA Cases</span>
                    <span className="font-bold text-green-600">{kaaSummary.activeKAA}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">Completed Actions</span>
                    <span className="font-bold text-blue-600">{kaaSummary.completedActions}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-ike-primary/10 rounded-lg border-2 border-ike-primary/20">
                    <span className="font-bold text-ike-primary">Total Registrations</span>
                    <span className="font-bold text-ike-primary">{kaaSummary.totalRegistrations}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
                  Recent KAA Periods
                </CardTitle>
                <CardDescription>Last 5 reconciliation periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['2024-09', '2024-08', '2024-07', '2024-06', '2024-05'].map((period, index) => (
                    <div key={period} className="flex justify-between items-center p-2 hover:bg-ike-neutral-light rounded">
                      <span className="font-medium">{period}</span>
                      <div className="text-right">
                        <div className="font-medium text-ike-primary">
                          {kaaSummary.activeKAA - (index * 5)} active
                        </div>
                        <div className="text-xs text-ike-neutral">
                          {index === 0 ? 'Current' : `${index} months ago`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <KAAMultiPeriodComparison />
        </TabsContent>

        <TabsContent value="consolidated">
          <KAAConsolidatedDataTable />
        </TabsContent>

        <TabsContent value="trends">
          <KAAStatisticsTrends />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KAAStatisticsAnalysis;
