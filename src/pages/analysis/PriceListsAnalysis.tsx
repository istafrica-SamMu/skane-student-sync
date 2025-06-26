
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Euro, 
  Download, 
  Filter,
  TrendingUp,
  Building,
  BarChart3,
  LineChart,
  FileSpreadsheet
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PriceListsMultiPeriodComparison } from "@/components/analysis/PriceListsMultiPeriodComparison";
import { MultiMunicipalityPriceComparison } from "@/components/analysis/MultiMunicipalityPriceComparison";
import { PriceListsTrends } from "@/components/analysis/PriceListsTrends";
import { IntermunicipalPriceAnalysis } from "@/components/analysis/IntermunicipalPriceAnalysis";

const PriceListsAnalysis = () => {
  const { toast } = useToast();

  const priceAnalysisSummary = {
    totalMunicipalities: 33,
    totalPriceCodes: 156,
    averagePricePerStudent: 89750,
    referencePriceVariance: 12.5,
    lastUpdated: '2024-09-15'
  };

  const handleExportAnalysis = () => {
    toast({
      title: "Analysis Exported",
      description: "Price lists analysis has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Price Lists Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive analysis of price lists across municipalities for intermunicipal compensation
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
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
              <Building className="w-4 h-4 mr-1 text-ike-primary" />
              Municipalities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              {priceAnalysisSummary.totalMunicipalities}
            </div>
            <p className="text-xs text-ike-neutral">Total in Skåne</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Euro className="w-4 h-4 mr-1 text-green-600" />
              Price Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {priceAnalysisSummary.totalPriceCodes}
            </div>
            <p className="text-xs text-ike-neutral">Active price codes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
              Avg. Price/Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {priceAnalysisSummary.averagePricePerStudent.toLocaleString()} SEK
            </div>
            <p className="text-xs text-ike-neutral">Regional average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Reference Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">
              {priceAnalysisSummary.referencePriceVariance}%
            </div>
            <p className="text-xs text-ike-neutral">From Skåne reference</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-ike-neutral-dark">
              {priceAnalysisSummary.lastUpdated}
            </div>
            <p className="text-xs text-ike-neutral">Price data sync</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="multi-period" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="multi-period">Multi-Period</TabsTrigger>
          <TabsTrigger value="municipalities">Municipalities</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="reference">Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="multi-period">
          <PriceListsMultiPeriodComparison />
        </TabsContent>

        <TabsContent value="municipalities">
          <MultiMunicipalityPriceComparison />
        </TabsContent>

        <TabsContent value="trends">
          <PriceListsTrends />
        </TabsContent>

        <TabsContent value="compensation">
          <IntermunicipalPriceAnalysis />
        </TabsContent>

        <TabsContent value="reference">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <FileSpreadsheet className="w-5 h-5 mr-2 text-ike-primary" />
                Skåne Reference Price List Management
              </CardTitle>
              <CardDescription>
                Manage the regional reference price list for comparative analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileSpreadsheet className="w-16 h-16 mx-auto text-ike-neutral mb-4" />
                <p className="text-ike-neutral mb-4">Reference Price List Management will be implemented here</p>
                <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
                  <Euro className="w-4 h-4 mr-2" />
                  Create Reference Price List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceListsAnalysis;
