import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users,
  TrendingUp,
  Activity,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";
import { StatisticsReportModal } from "@/components/kaa/StatisticsReportModal";
import { NewRegistrationModal } from "@/components/kaa/NewRegistrationModal";

const KAADashboard = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Mock data for dashboard
  const dashboardStats = {
    totalRecords: 45,
    activeRecords: 28,
    completedRecords: 12,
    inactiveRecords: 5,
    activeMeasures: 35,
    completedMeasures: 18,
    averageProgress: 67,
    monthlyRegistrations: 8
  };

  const recentActivity = [
    {
      id: 1,
      type: "registration",
      description: "Anna Svensson registered in KAA system",
      date: "2024-01-15",
      status: "new"
    },
    {
      id: 2,
      type: "measure",
      description: "Jobbcoaching measure started for Johan Andersson",
      date: "2024-01-14",
      status: "active"
    },
    {
      id: 3,
      type: "completion",
      description: "Sofia Karlsson completed education measure",
      date: "2024-01-13",
      status: "completed"
    },
    {
      id: 4,
      type: "contact",
      description: "Contact occasion recorded for Emma Nilsson",
      date: "2024-01-12",
      status: "contact"
    }
  ];

  const upcomingReviews = [
    {
      id: 1,
      youngPerson: "Anna Svensson",
      measureType: "Jobbcoaching",
      reviewDate: "2024-03-15",
      daysUntil: 15
    },
    {
      id: 2,
      youngPerson: "Johan Andersson",
      measureType: "Praktikplats",
      reviewDate: "2024-04-01",
      daysUntil: 32
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "measure":
        return <Target className="w-4 h-4 text-green-500" />;
      case "completion":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "contact":
        return <Activity className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 text-white">New</Badge>;
      case "active":
        return <Badge className="bg-ike-success text-white">Active</Badge>;
      case "completed":
        return <Badge className="bg-green-600 text-white">Completed</Badge>;
      case "contact":
        return <Badge className="bg-orange-500 text-white">Contact</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">KAA Dashboard</h1>
          <p className="text-ike-neutral mt-2">
            Overview of Municipal Activity Responsibility for young people
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowReportModal(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button 
            className="bg-ike-primary hover:bg-ike-primary-dark text-white"
            onClick={() => setShowRegistrationModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Registration
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total KAA Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{dashboardStats.totalRecords}</div>
            <div className="text-xs text-ike-neutral">+{dashboardStats.monthlyRegistrations} this month</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{dashboardStats.activeRecords}</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{dashboardStats.completedRecords}</div>
            <div className="text-xs text-ike-neutral">Successfully completed</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Avg. Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{dashboardStats.averageProgress}%</div>
            <div className="text-xs text-ike-neutral">Active measures</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Clock className="w-5 h-5 mr-2 text-ike-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates in the KAA system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getActivityIcon(activity.type)}
                    <div>
                      <p className="text-sm font-medium text-ike-neutral-dark">{activity.description}</p>
                      <p className="text-xs text-ike-neutral">{activity.date}</p>
                    </div>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calendar className="w-5 h-5 mr-2 text-ike-primary" />
              Upcoming Reviews
            </CardTitle>
            <CardDescription>Scheduled measure reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Young Person</TableHead>
                  <TableHead className="font-medium">Measure</TableHead>
                  <TableHead className="font-medium">Review Date</TableHead>
                  <TableHead className="font-medium text-center">Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.youngPerson}</TableCell>
                    <TableCell>{review.measureType}</TableCell>
                    <TableCell>{review.reviewDate}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={review.daysUntil <= 7 ? "destructive" : "outline"}>
                        {review.daysUntil}d
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <StatisticsReportModal 
        open={showReportModal} 
        onOpenChange={setShowReportModal}
      />
      
      <NewRegistrationModal 
        open={showRegistrationModal} 
        onOpenChange={setShowRegistrationModal}
      />
    </div>
  );
};

export default KAADashboard;
