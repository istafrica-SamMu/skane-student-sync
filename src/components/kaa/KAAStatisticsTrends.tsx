import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Download, 
  BarChart3,
  LineChart,
  PieChart,
  Activity
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from "recharts";

export const KAAStatisticsTrends = () => {
  const { toast } = useToast();
  const [selectedChart, setSelectedChart] = useState('registrations');

  const registrationTrendData = [
    { period: '2024-05', registrations: 18, completed: 12, active: 45 },
    { period: '2024-06', registrations: 21, completed: 15, active: 51 },
    { period: '2024-07', registrations: 19, completed: 13, active: 57 },
    { period: '2024-08', registrations: 23, completed: 18, active: 62 },
    { period: '2024-09', registrations: 25, completed: 20, active: 67 }
  ];

  const categoryDistributionData = [
    { name: 'School Absence', value: 35, color: '#3B82F6' },
    { name: 'Work Training', value: 28, color: '#10B981' },
    { name: 'Study Support', value: 22, color: '#F59E0B' },
    { name: 'Behavioral Issues', value: 15, color: '#EF4444' }
  ];

  const actionCompletionData = [
    { period: '2024-05', planned: 42, completed: 35, rate: 83 },
    { period: '2024-06', planned: 45, completed: 39, rate: 87 },
    { period: '2024-07', planned: 41, completed: 38, rate: 93 },
    { period: '2024-08', planned: 48, completed: 42, rate: 88 },
    { period: '2024-09', planned: 52, completed: 45, rate: 87 }
  ];

  const handleExportTrends = () => {
    toast({
      title: "Trends Exported",
      description: "KAA statistics trends have been exported successfully",
    });
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'registrations':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={registrationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="registrations" stroke="#3B82F6" strokeWidth={2} name="New Registrations" />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed Cases" />
              <Line type="monotone" dataKey="active" stroke="#F59E0B" strokeWidth={2} name="Active Cases" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'categories':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={categoryDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case 'completion':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={actionCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#94A3B8" name="Planned Actions" />
              <Bar dataKey="completed" fill="#3B82F6" name="Completed Actions" />
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
            KAA Statistics Trends
          </CardTitle>
          <CardDescription>
            Visual analysis of KAA data trends over time
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
                  <SelectItem value="registrations">Registration Trends</SelectItem>
                  <SelectItem value="categories">Category Distribution</SelectItem>
                  <SelectItem value="completion">Action Completion</SelectItem>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  Growth Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+38%</div>
                <p className="text-xs text-ike-neutral">Registration increase</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <Activity className="w-4 h-4 mr-1 text-blue-600" />
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <p className="text-xs text-ike-neutral">Average completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1 text-ike-primary" />
                  Most Common
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ike-primary">School Absence</div>
                <p className="text-xs text-ike-neutral">35% of all cases</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
