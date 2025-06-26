
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Download, 
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PaymentTrendsChart = () => {
  const { toast } = useToast();
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('12months');

  const monthlyData = [
    { month: '2023-10', receive: 1089000, pay: 876000, net: 213000 },
    { month: '2023-11', receive: 1145000, pay: 912000, net: 233000 },
    { month: '2023-12', receive: 1123000, pay: 889000, net: 234000 },
    { month: '2024-01', receive: 1198000, pay: 956000, net: 242000 },
    { month: '2024-02', receive: 1176000, pay: 934000, net: 242000 },
    { month: '2024-03', receive: 1211000, pay: 967000, net: 244000 },
    { month: '2024-04', receive: 1167000, pay: 923000, net: 244000 },
    { month: '2024-05', receive: 1234000, pay: 967000, net: 267000 },
    { month: '2024-06', receive: 1189000, pay: 945000, net: 244000 },
    { month: '2024-07', receive: 1245000, pay: 987500, net: 257500 }
  ];

  const programDistribution = [
    { name: 'Samhällsvetenskap', value: 325000, color: '#0088FE' },
    { name: 'Ekonomi', value: 287000, color: '#00C49F' },
    { name: 'Naturvetenskap', value: 412000, color: '#FFBB28' },
    { name: 'Teknik', value: 221000, color: '#FF8042' }
  ];

  const municipalityData = [
    { municipality: 'Stockholm', students: 34, amount: 425000 },
    { municipality: 'Göteborg', students: 28, amount: 356000 },
    { municipality: 'Malmö', students: 31, amount: 398000 },
    { municipality: 'Uppsala', students: 22, amount: 287000 },
    { municipality: 'Västerås', students: 18, amount: 234000 },
    { municipality: 'Örebro', students: 12, amount: 156000 }
  ];

  const handleExportCharts = () => {
    toast({
      title: "Charts Exported",
      description: "Payment trend charts have been exported successfully",
    });
  };

  const formatCurrency = (value: number) => {
    return `${(value / 1000).toFixed(0)}k SEK`;
  };

  const formatTooltip = (value: number, name: string) => {
    const labels = {
      receive: 'Money to Receive',
      pay: 'Money to Pay',
      net: 'Net Position'
    };
    return [`${value.toLocaleString()} SEK`, labels[name as keyof typeof labels] || name];
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-ike-neutral-dark">Chart Type:</label>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-ike-neutral-dark">Time Range:</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="24months">Last 24 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleExportCharts}
          className="bg-ike-primary hover:bg-ike-primary-dark text-white ml-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Charts
        </Button>
      </div>

      {/* Main Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-ike-neutral-dark">
            <TrendingUp className="w-5 h-5 mr-2 text-ike-primary" />
            Payment Streams Over Time
          </CardTitle>
          <CardDescription>
            Monthly trends for money to receive, pay, and net position
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={formatTooltip} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="receive" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    name="receive"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pay" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="pay"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="net" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="net"
                  />
                </LineChart>
              ) : (
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={formatTooltip} />
                  <Legend />
                  <Bar dataKey="receive" fill="#22c55e" name="receive" />
                  <Bar dataKey="pay" fill="#ef4444" name="pay" />
                  <Bar dataKey="net" fill="#3b82f6" name="net" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <PieChartIcon className="w-5 h-5 mr-2 text-ike-primary" />
              Payment Distribution by Program
            </CardTitle>
            <CardDescription>
              Breakdown of payments across study programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {programDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value.toLocaleString()} SEK`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <BarChart3 className="w-5 h-5 mr-2 text-ike-primary" />
              Top Municipalities by Amount
            </CardTitle>
            <CardDescription>
              Highest receiving amounts by municipality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={municipalityData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={formatCurrency} />
                  <YAxis dataKey="municipality" type="category" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} SEK`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
