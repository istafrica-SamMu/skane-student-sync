import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calculator, 
  AlertTriangle, 
  Euro, 
  TrendingUp, 
  Download, 
  FileText,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Building,
  School,
  Globe,
  Database,
  Shield,
  Settings,
  GraduationCap,
  Calendar,
  MapPin,
  DollarSign,
  Book,
  BarChart3,
  Building2,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // School Admin specific dashboard
  if (user?.role === 'school-admin') {
    return (
      <div className="space-y-6">
        {/* Welcome Header - School Admin */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ike-neutral-dark">
              School Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-2">
              {currentDate} • {user.organization || 'School Unit'} Management
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Student Lists
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <FileText className="w-4 h-4 mr-2" />
              School Reports
            </Button>
          </div>
        </div>

        {/* School Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-ike-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">847</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                +15 new this term
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Active Classes
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-ike-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">34</div>
              <div className="text-xs text-ike-neutral mt-1">
                Across all programs
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Pending Placements
              </CardTitle>
              <ArrowUpDown className="h-4 w-4 text-ike-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
              <div className="text-xs text-ike-warning mt-1">
                Require attention
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Monthly Compensation
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">4.2M SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                Expected for November
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* School Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <School className="w-5 h-5 mr-2 text-ike-primary" />
                School Unit Information
              </CardTitle>
              <CardDescription>
                Current status and key information about your school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Name</label>
                  <p className="text-lg font-semibold text-ike-neutral-dark">Malmö Gymnasium</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Code</label>
                  <p className="text-lg font-semibold text-ike-neutral-dark">MA-GYM-001</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ike-neutral">Municipality</label>
                  <p className="text-lg font-semibold text-ike-neutral-dark">Malmö</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-ike-neutral">School Type</label>
                  <p className="text-lg font-semibold text-ike-neutral-dark">Gymnasium</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-ike-neutral">Available Programs</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Naturvetenskapsprogrammet",
                    "Samhällsvetenskapsprogrammet", 
                    "Teknikprogrammet",
                    "Ekonomiprogrammet"
                  ].map((program, index) => (
                    <Badge key={index} variant="secondary" className="bg-ike-primary/10 text-ike-primary">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* School Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">School Operations</CardTitle>
              <CardDescription>
                Quick access to key school functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Student Roster
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Manage Placements
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Class Management
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Programs & Classes Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Programs & Classes Overview</CardTitle>
            <CardDescription>
              Current enrollment status across all programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  program: "Naturvetenskapsprogrammet",
                  classes: 8,
                  students: 240,
                  capacity: 256,
                  statusColor: "success"
                },
                {
                  program: "Samhällsvetenskapsprogrammet", 
                  classes: 10,
                  students: 320,
                  capacity: 320,
                  statusColor: "warning"
                },
                {
                  program: "Teknikprogrammet",
                  classes: 9,
                  students: 162,
                  capacity: 288,
                  statusColor: "success"
                },
                {
                  program: "Ekonomiprogrammet",
                  classes: 7,
                  students: 125,
                  capacity: 224,
                  statusColor: "success"
                }
              ].map((program, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                      <Book className="w-6 h-6 text-ike-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark">{program.program}</h3>
                      <p className="text-sm text-ike-neutral">{program.classes} classes • {program.students}/{program.capacity} students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress 
                      value={(program.students / program.capacity) * 100} 
                      className="w-24 h-2"
                    />
                    <Badge 
                      className={
                        program.statusColor === "success" ? "bg-ike-success text-white" :
                        program.statusColor === "warning" ? "bg-ike-warning text-white" :
                        "bg-ike-error text-white"
                      }
                    >
                      {Math.round((program.students / program.capacity) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Student Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Recent Student Activity</CardTitle>
              <CardDescription>
                Latest changes and updates to student records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  time: "14:30",
                  action: "New student enrollment",
                  details: "Erik Andersson - Naturvetenskapsprogrammet",
                  status: "success"
                },
                {
                  time: "13:15",
                  action: "Class placement updated",
                  details: "Maria Johansson moved to SA22B",
                  status: "info"
                },
                {
                  time: "11:45",
                  action: "Student transfer request", 
                  details: "Carl Lindström - Pending approval",
                  status: "warning"
                },
                {
                  time: "10:20",
                  action: "Graduation completed",
                  details: "Anna Petersson - Ekonomiprogrammet",
                  status: "success"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-ike-neutral-light">
                  <div className="text-sm text-ike-neutral font-mono">{activity.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-ike-neutral-dark">
                      {activity.action}
                    </div>
                    <div className="text-xs text-ike-neutral">{activity.details}</div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={
                      activity.status === "success" ? "bg-ike-success/10 text-ike-success" :
                      activity.status === "warning" ? "bg-ike-warning/10 text-ike-warning" :
                      "bg-ike-primary/10 text-ike-primary"
                    }
                  >
                    {activity.status === "success" ? "Completed" :
                     activity.status === "warning" ? "Pending" : "Updated"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Quick Statistics</CardTitle>
              <CardDescription>
                Key metrics for this academic year
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">New enrollments this month:</span>
                <span className="font-medium">15 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Completed transfers:</span>
                <span className="font-medium">8 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Pending placements:</span>
                <span className="font-medium text-ike-warning">12 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Average class size:</span>
                <span className="font-medium">24.9 students</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Overall capacity:</span>
                  <span className="font-bold text-ike-primary">79.2%</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Detailed Statistics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Municipal Admin specific dashboard
  if (user?.role === 'municipality-admin') {
    return (
      <div className="space-y-6">
        {/* Welcome Header - Municipal Admin */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ike-neutral-dark">
              Municipal Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-2">
              {currentDate} • {user.organization || 'Municipality'} Overview
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Municipal Report
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <FileText className="w-4 h-4 mr-2" />
              Financial Export
            </Button>
          </div>
        </div>

        {/* Municipal Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Municipal Students
              </CardTitle>
              <Users className="h-4 w-4 text-ike-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">4,250</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                +2.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                External Students
              </CardTitle>
              <ArrowUp className="h-4 w-4 text-ike-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">847</div>
              <div className="text-xs text-ike-neutral mt-1">
                In independent schools
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Money to Pay
              </CardTitle>
              <Euro className="h-4 w-4 text-ike-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">2.8M SEK</div>
              <div className="text-xs text-ike-warning mt-1">
                November calculation
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Money to Receive
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">1.4M SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                From other municipalities
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Municipal Integration Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Database className="w-5 h-5 mr-2 text-ike-primary" />
                Municipal Integration Status
              </CardTitle>
              <CardDescription>
                System integration and data synchronization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Schedule Integration</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Student Data Import</span>
                  <Badge className="bg-ike-warning text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Processing
                  </Badge>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regional Sync</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Up to date
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Last sync:</span>
                  <span className="text-sm font-medium">5 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Municipal Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Municipal Operations</CardTitle>
              <CardDescription>
                Quick access to key functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Student Management
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              >
                <Euro className="w-4 h-4 mr-2" />
                Financial Reports
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <School className="w-4 h-4 mr-2" />
                Municipal Schools
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Enrollment Control
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Municipal Schools Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">Municipal Schools Overview</CardTitle>
            <CardDescription>
              Status and metrics for municipal school units
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Centralskolan",
                  students: 420,
                  grade: "F-9",
                  status: "Active",
                  integration: "Connected",
                  statusColor: "success"
                },
                {
                  name: "Gymnasieskolan Väst",
                  students: 850,
                  grade: "Gy",
                  status: "Active",
                  integration: "Connected",
                  statusColor: "success"
                },
                {
                  name: "Österskolan",
                  students: 320,
                  grade: "F-6",
                  status: "Active",
                  integration: "Warning",
                  statusColor: "warning"
                },
                {
                  name: "Södraskolan",
                  students: 280,
                  grade: "7-9",
                  status: "Active",
                  integration: "Connected",
                  statusColor: "success"
                }
              ].map((school, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                      <School className="w-6 h-6 text-ike-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ike-neutral-dark">{school.name}</h3>
                      <p className="text-sm text-ike-neutral">{school.students} students • Grade {school.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={
                        school.statusColor === "success" ? "bg-ike-success text-white" :
                        school.statusColor === "warning" ? "bg-ike-warning text-white" :
                        "bg-ike-error text-white"
                      }
                    >
                      {school.integration}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${
                      school.statusColor === "success" ? "bg-ike-success" : "bg-ike-warning"
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Inter-Municipal Compensation</CardTitle>
              <CardDescription>
                Current month financial overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Students in external schools:</span>
                <span className="font-medium">847 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">External students in our schools:</span>
                <span className="font-medium">312 students</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Net compensation:</span>
                  <span className="font-bold text-ike-warning">-1.4M SEK</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Enrollment Periods</CardTitle>
              <CardDescription>
                Municipal enrollment management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Current period:</span>
                <Badge className="bg-ike-success text-white">Open</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Applications received:</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ike-neutral">Deadline:</span>
                <span className="font-medium">15 mars 2025</span>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage Enrollment Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Regional Admin specific dashboard
  if (user?.role === 'regional-admin') {
    return (
      <div className="space-y-6">
        {/* Welcome Header - Regional Admin */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ike-neutral-dark">
              Regional Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-2">
              {currentDate} • System Overview for Region Skåne
            </p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Regional Report
            </Button>
            <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
              <FileText className="w-4 h-4 mr-2" />
              Generate System Report
            </Button>
          </div>
        </div>

        {/* Regional Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Total Municipalities
              </CardTitle>
              <Building className="h-4 w-4 text-ike-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">33</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                All active and connected
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Regional Students
              </CardTitle>
              <Users className="h-4 w-4 text-ike-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">89,247</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                +3.2% from last year
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                System Issues
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-ike-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">7</div>
              <div className="text-xs text-ike-warning mt-1">
                Across 4 municipalities
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-ike-neutral">
                Regional Budget
              </CardTitle>
              <Euro className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ike-neutral-dark">1.2B SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                November 2024 calculation
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional System Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-ike-neutral-dark">
                <Database className="w-5 h-5 mr-2 text-ike-primary" />
                Regional System Status
              </CardTitle>
              <CardDescription>
                Monthly calculation and system health overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regional Data Synchronization</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Municipal Integration Health</span>
                  <Badge className="bg-ike-success text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    98% Connected
                  </Badge>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regional Calculation Processing</span>
                  <Badge className="bg-ike-warning text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ike-neutral">Next regional sync:</span>
                  <span className="text-sm font-medium">Tomorrow 03:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Operations */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-ike-primary" />
                Regional Operations
              </CardTitle>
              <CardDescription>
                Manage regional system components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                asChild
                className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
              >
                <Link to="/system/municipalities">
                  <Building className="w-4 h-4 mr-2" />
                  Manage Municipalities
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
              >
                <Link to="/system/schools">
                  <School className="w-4 h-4 mr-2" />
                  School Unit Overview
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="w-full justify-start"
              >
                <Link to="/system/users">
                  <Users className="w-4 h-4 mr-2" />
                  User Management
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="w-full justify-start"
              >
                <Link to="/settings">
                  <Shield className="w-4 h-4 mr-2" />
                  System Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Municipality Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-ike-neutral-dark">Municipality Status Overview</CardTitle>
              <CardDescription>
                Real-time status of municipalities in the region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Malmö",
                    students: 12450,
                    status: "Active",
                    lastSync: "2 min ago",
                    integration: "Healthy",
                    statusColor: "success"
                  },
                  {
                    name: "Lund",
                    students: 8200,
                    status: "Active",
                    lastSync: "5 min ago",
                    integration: "Healthy",
                    statusColor: "success"
                  },
                  {
                    name: "Helsingborg",
                    students: 9800,
                    status: "Active",
                    lastSync: "1 min ago",
                    integration: "Warning",
                    statusColor: "warning"
                  },
                  {
                    name: "Kristianstad",
                    students: 5600,
                    status: "Active",
                    lastSync: "15 min ago",
                    integration: "Error",
                    statusColor: "error"
                  }
                ].map((municipality, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-ike-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ike-neutral-dark">{municipality.name}</h3>
                        <p className="text-sm text-ike-neutral">{municipality.students} students • Last sync: {municipality.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        className={
                          municipality.statusColor === "success" ? "bg-ike-success text-white" :
                          municipality.statusColor === "warning" ? "bg-ike-warning text-white" :
                          "bg-ike-error text-white"
                        }
                      >
                        {municipality.integration}
                      </Badge>
                      <div className="w-3 h-3 bg-ike-success rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Keep existing dashboard for other roles
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ike-neutral-dark">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-ike-neutral mt-2">
            {currentDate} • {t('dashboard.date')}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-ike-primary hover:bg-ike-primary-dark text-white">
            <Download className="w-4 h-4 mr-2" />
            {t('dashboard.export')}
          </Button>
          <Button variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10">
            <FileText className="w-4 h-4 mr-2" />
            {t('dashboard.generate')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-ike-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.total.students')}
            </CardTitle>
            <Users className="h-4 w-4 text-ike-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">2,847</div>
            <div className="flex items-center text-xs text-ike-success mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              +12.3% {t('dashboard.from.last.month')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.active.calculations')}
            </CardTitle>
            <Calculator className="h-4 w-4 text-ike-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3</div>
            <div className="text-xs text-ike-neutral mt-1">
              {t('dashboard.ongoing.processing')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-ike-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.pending.conflicts')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-ike-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">12</div>
            <div className="text-xs text-ike-warning mt-1">
              {t('dashboard.requires.attention')}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-ike-neutral">
              {t('dashboard.monthly.amount')}
            </CardTitle>
            <Euro className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ike-neutral-dark">3,755,000</div>
            <div className="text-xs text-ike-neutral mt-1">
              {t('dashboard.for.november')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Calculation Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-ike-neutral-dark">
              <Calculator className="w-5 h-5 mr-2 text-ike-primary" />
              {t('dashboard.calculation.status')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.monthly.calculation')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.data.validation')}</span>
                <Badge className="bg-ike-success text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t('dashboard.completed')}
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.preliminary.calculation')}</span>
                <Badge className="bg-ike-warning text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {t('dashboard.ongoing')}
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('dashboard.final.calculation')}</span>
                <Badge variant="secondary">{t('dashboard.pending')}</Badge>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ike-neutral">{t('dashboard.next.run')}:</span>
                <span className="text-sm font-medium">15 december 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ike-neutral-dark">{t('dashboard.quick.actions')}</CardTitle>
            <CardDescription>
              {t('dashboard.common.tasks')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              {t('dashboard.new.student')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {t('dashboard.new.calculation')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('dashboard.resolve.conflicts')}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              {t('dashboard.generate')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ike-neutral-dark">{t('dashboard.recent.activity')}</CardTitle>
          <CardDescription>
            {t('dashboard.system.events')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "10:30",
                action: t('dashboard.student.registered'),
                details: "Erik Andersson - Malmö Gymnasium",
                status: "success"
              },
              {
                time: "09:45",
                action: t('dashboard.conflict.resolved'),
                details: "Dubbelregistrering för Maria Johansson",
                status: "warning"
              },
              {
                time: "09:15",
                action: t('dashboard.calculation.started'),
                details: t('dashboard.monthly.calculation'),
                status: "info"
              },
              {
                time: "08:30",
                action: t('dashboard.data.imported'),
                details: "SS12000 import från Lunds kommun",
                status: "success"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-ike-neutral-light">
                <div className="text-sm text-ike-neutral font-mono">{activity.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ike-neutral-dark">
                    {activity.action}
                  </div>
                  <div className="text-xs text-ike-neutral">{activity.details}</div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    activity.status === "success" ? "bg-ike-success/10 text-ike-success" :
                    activity.status === "warning" ? "bg-ike-warning/10 text-ike-warning" :
                    "bg-ike-primary/10 text-ike-primary"
                  }
                >
                  {activity.status === "success" ? t('dashboard.done') :
                   activity.status === "warning" ? t('dashboard.resolved') : t('dashboard.ongoing')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
