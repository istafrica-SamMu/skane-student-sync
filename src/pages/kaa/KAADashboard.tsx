import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Activity,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Download,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatisticsReportModal } from "@/components/kaa/StatisticsReportModal";

const KAADashboard = () => {
  const [timeFilter, setTimeFilter] = useState("month");
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);

  // Mock data for dashboard statistics
  const stats = {
    totalRecords: 145,
    activeRecords: 89,
    completedRecords: 32,
    inactiveRecords: 24,
    contactsThisMonth: 234,
    activeMeasures: 156,
    completedMeasures: 78,
    pendingReviews: 23,
    avgCaseLength: 8.5,
    successRate: 72
  };

  const recentActivity = [
    {
      id: 1,
      type: "contact",
      description: "Contact with Anna Svensson completed",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "measure",
      description: "New measure added for Johan Andersson",
      time: "4 hours ago",
      status: "active"
    },
    {
      id: 3,
      type: "review",
      description: "Case review scheduled for Sofia Karlsson",
      time: "1 day ago",
      status: "pending"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Review case: Anna Svensson",
      dueDate: "2024-03-15",
      priority: "high"
    },
    {
      id: 2,
      task: "Contact follow-up: Johan Andersson",
      dueDate: "2024-03-16",
      priority: "medium"
    },
    {
      id: 3,
      task: "Statistics report deadline",
      dueDate: "2024-03-20",
      priority: "high"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">KAA Management Dashboard</h1>
          <p className="text-ike-neutral mt-2">
            Overview of Municipal Activity Responsibility management and statistics
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowStatisticsModal(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Statistics Sweden Report
          </Button>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total KAA Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{stats.totalRecords}</div>
            <div className="text-xs text-ike-neutral">All registered cases</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Active Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{stats.activeRecords}</div>
            <div className="text-xs text-ike-neutral">Currently active</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{stats.contactsThisMonth}</div>
            <div className="text-xs text-ike-neutral">Contact occasions</div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">{stats.successRate}%</div>
            <div className="text-xs text-ike-neutral">Completed successfully</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Quick Actions</CardTitle>
            <CardDescription>Frequently used KAA management functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/kaa-registry">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage KAA Registry
              </Button>
            </Link>
            <Link to="/kaa/contact-occasions">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Occasions
              </Button>
            </Link>
            <Link to="/kaa/measures-actions">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Measures & Actions
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowStatisticsModal(true)}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Statistics Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Recent Activity</CardTitle>
            <CardDescription>Latest KAA management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-ike-neutral-light/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {activity.type === "contact" && <MessageSquare className="w-4 h-4 text-ike-primary" />}
                    {activity.type === "measure" && <Activity className="w-4 h-4 text-ike-success" />}
                    {activity.type === "review" && <Calendar className="w-4 h-4 text-ike-warning" />}
                    <div>
                      <p className="text-sm text-ike-neutral-dark">{activity.description}</p>
                      <p className="text-xs text-ike-neutral">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for KAA management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-ike-neutral">Average Case Length</span>
              <span className="font-medium">{stats.avgCaseLength} months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ike-neutral">Active Measures</span>
              <span className="font-medium">{stats.activeMeasures}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ike-neutral">Completed Measures</span>
              <span className="font-medium">{stats.completedMeasures}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ike-neutral">Pending Reviews</span>
              <span className="font-medium text-ike-warning">{stats.pendingReviews}</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Upcoming Tasks</CardTitle>
            <CardDescription>Tasks and deadlines requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-ike-neutral-light/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-ike-primary" />
                    <div>
                      <p className="text-sm text-ike-neutral-dark">{task.task}</p>
                      <p className="text-xs text-ike-neutral">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Report Modal */}
      <StatisticsReportModal 
        isOpen={showStatisticsModal}
        onClose={() => setShowStatisticsModal(false)}
      />
    </div>
  );
};

export default KAADashboard;
