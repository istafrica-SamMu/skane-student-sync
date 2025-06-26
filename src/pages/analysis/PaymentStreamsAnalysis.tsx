
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Download, 
  Filter,
  Euro,
  ArrowUpDown,
  Calculator,
  BarChart3,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MultiPeriodComparisonTable } from "@/components/analysis/MultiPeriodComparisonTable";
import { PriceCodePaymentAnalysis } from "@/components/analysis/PriceCodePaymentAnalysis";
import { PaymentTrendsChart } from "@/components/analysis/PaymentTrendsChart";

const PaymentStreamsAnalysis = () => {
  const { toast } = useToast();

  const paymentSummary = {
    totalReceivable: 1245000,
    totalPayable: 987500,
    netPosition: 257500,
    activeStudents: 145,
    priceCodeCount: 28
  };

  const handleExportAnalysis = () => {
    toast({
      title: "Analysis Exported",
      description: "Payment streams analysis has been exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">Payment Streams Analysis</h1>
          <p className="text-ike-neutral mt-2">
            Comprehensive analysis of payment flows and income streams for municipal students
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
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              Money to Receive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {paymentSummary.totalReceivable.toLocaleString()} SEK
            </div>
            <p className="text-xs text-ike-neutral">From external students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <TrendingDown className="w-4 h-4 mr-1 text-red-600" />
              Money to Pay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {paymentSummary.totalPayable.toLocaleString()} SEK
            </div>
            <p className="text-xs text-ike-neutral">For municipal students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Calculator className="w-4 h-4 mr-1 text-ike-primary" />
              Net Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-primary">
              +{paymentSummary.netPosition.toLocaleString()} SEK
            </div>
            <p className="text-xs text-ike-neutral">Net receivable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{paymentSummary.activeStudents}</div>
            <p className="text-xs text-ike-neutral">Cross-municipal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">Price Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{paymentSummary.priceCodeCount}</div>
            <p className="text-xs text-ike-neutral">Active programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Multi-Period</TabsTrigger>
          <TabsTrigger value="pricecodes">Price Codes</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <ArrowUpDown className="w-5 h-5 mr-2 text-ike-primary" />
                  Payment Flow Summary
                </CardTitle>
                <CardDescription>Current reconciliation period breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Income from External Students</span>
                    <span className="font-bold text-green-600">+{paymentSummary.totalReceivable.toLocaleString()} SEK</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-800">Payments for Municipal Students</span>
                    <span className="font-bold text-red-600">-{paymentSummary.totalPayable.toLocaleString()} SEK</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-ike-primary/10 rounded-lg border-2 border-ike-primary/20">
                    <span className="font-bold text-ike-primary">Net Position</span>
                    <span className="font-bold text-ike-primary">+{paymentSummary.netPosition.toLocaleString()} SEK</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-ike-neutral-dark">
                  <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
                  Recent Reconciliation Periods
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
                          +{(paymentSummary.netPosition - (index * 15000)).toLocaleString()} SEK
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
          <MultiPeriodComparisonTable />
        </TabsContent>

        <TabsContent value="pricecodes">
          <PriceCodePaymentAnalysis />
        </TabsContent>

        <TabsContent value="trends">
          <PaymentTrendsChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentStreamsAnalysis;
