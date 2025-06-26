
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Download, 
  BarChart3,
  LineChart,
  Euro
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export const PriceListsTrends = () => {
  const { toast } = useToast();
  const [selectedChart, setSelectedChart] = useState('trends');
  const [selectedMunicipality, setSelectedMunicipality] = useState('all');

  const priceTrendData = [
    { period: '2024-05', malmö: 84500, lund: 87200, helsingborg: 83100, average: 84900 },
    { period: '2024-06', malmö: 85100, lund: 88100, helsingborg: 83800, average: 85700 },
    { period: '2024-07', malmö: 86200, lund: 89000, helsingborg: 84500, average: 86600 },
    { period: '2024-08', malmö: 87650, lund: 90800, helsingborg: 85900, average: 88100 },
    { period: '2024-09', malmö: 89750, lund: 92100, helsingborg: 87650, average: 89800 }
  ];

  const priceVariationData = [
    { municipality: 'Malmö', currentPrice: 89750, priceIncrease: 6.2, variance: 2.3 },
    { municipality: 'Lund', currentPrice: 92100, priceIncrease: 5.6, variance: 5.0 },
    { municipality: 'Helsingborg', currentPrice: 87650, priceIncrease: 5.5, variance: -0.1 },
    { municipality: 'Kristianstad', currentPrice: 85400, priceIncrease: 4.8, variance: -2.5 },
    { municipality: 'Landskrona', currentPrice: 91200, priceIncrease: 6.1, variance: 4.1 }
  ];

  const handleExportTrends = () => {
    toast({
      title: "Trends Exported",
      description: "Price trends analysis has been exported successfully",
    });
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'trends':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={priceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString()} SEK`, '']} />
              <Legend />
              <Line type="monotone" dataKey="malmö" stroke="#3B82F6" strokeWidth={2} name="Malmö" />
              <Line type="monotone" dataKey="lund" stroke="#10B981" strokeWidth={2} name="Lund" />
              <Line type="monotone" dataKey="helsingborg" stroke="#F59E0B" strokeWidth={2} name="Helsingborg" />
              <Line type="monotone" dataKey="average" stroke="#EF4444" strokeWidth={3} name="Regional Average" strokeDasharray="5 5" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'comparison':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={priceVariationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="municipality" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="currentPrice" fill="#3B82F6" name="Current Price (SEK)" />
              <Bar dataKey="priceIncrease" fill="#10B981" name="Price Increase (%)" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Price Lists Trends Analysis
          </CardTitle>
          <CardDescription>
            Visual analysis of price trends across municipalities and time periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Chart Type:</label>
              <Select value={selectedChart} onValueChange={setSelectedChart}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trends">Price Trends Over Time</SelectItem>
                  <SelectItem value="comparison">Municipality Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-ike-neutral-dark">Focus:</label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  <SelectItem value="malmö">Malmö</SelectItem>
                  <SelectItem value="lund">Lund</SelectItem>
                  <SelectItem value="helsingborg">Helsingborg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleExportTrends}
              className="bg-ike-primary hover:bg-ike-primary-dark text-white ml-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Trends
            </Button>
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded-lg border">
            {renderChart()}
          </div>

          {/* Trend Insights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  Regional Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+5.8%</div>
                <p className="text-xs text-ike-neutral">Average price increase</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Euro className="w-4 h-4 mr-1 text-blue-600" />
                  Highest Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">Malmö</div>
                <p className="text-xs text-ike-neutral">+6.2% price increase</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1 text-ike-primary" />
                  Price Variance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ike-primary">7.5%</div>
                <p className="text-xs text-ike-neutral">Between municipalities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <LineChart className="w-4 h-4 mr-1 text-purple-600" />
                  Trend Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">Consistent</div>
                <p className="text-xs text-ike-neutral">Steady upward trend</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
