
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
  UserCheck,
  BookOpen
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
      <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
        {/* Welcome Header - School Admin */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-neutral-dark leading-tight">
              Independent School Dashboard
            </h1>
            <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
              <span className="block sm:inline">{currentDate}</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">{user.organization || 'Independent School'} Management</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button asChild className="bg-ike-primary hover:bg-ike-primary-dark text-white w-full justify-center text-sm sm:text-base">
              <Link to="/reports/students">
                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Export Student Data</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* School Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-ike-primary flex-shrink-0" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">847</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1 flex-shrink-0" />
                +15 new this term
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-ike-success flex-shrink-0" />
                Active Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">8</div>
              <div className="text-xs text-ike-neutral mt-1">
                Educational programs
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">4.2M SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                Expected for November
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* School Information */}
          <Card className="lg:col-span-2">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center text-ike-neutral-dark text-base sm:text-lg lg:text-xl">
                <School className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-ike-primary flex-shrink-0" />
                Independent School Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Current status and key information about your school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-ike-neutral">School Name</label>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-ike-neutral-dark break-words">{user?.organization || 'Independent School'}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-ike-neutral">School Code</label>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-ike-neutral-dark">IS-001</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-ike-neutral">School Type</label>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-ike-neutral-dark">Independent School</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-ike-neutral">Accreditation</label>
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-ike-neutral-dark">Approved</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-xs sm:text-sm font-medium text-ike-neutral">Available Programs</label>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                    {[
                      "International Baccalaureate",
                      "Advanced Mathematics", 
                      "Science & Technology",
                      "Language Studies",
                      "Arts & Creative"
                    ].map((program, index) => (
                      <Badge key={index} variant="secondary" className="bg-ike-primary/10 text-ike-primary text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* School Actions */}
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">School Management</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Quick access to key school functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <Button 
                asChild
                className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white text-sm"
              >
                <Link to="/students">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  Student Management
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="w-full justify-start text-sm"
              >
                <Link to="/my-school/info">
                  <School className="w-4 h-4 mr-2 flex-shrink-0" />
                  School Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Programs & Enrollment Overview */}
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Programs & Enrollment Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Current enrollment status across all educational programs
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  program: "International Baccalaureate",
                  students: 180,
                  capacity: 200,
                  statusColor: "success"
                },
                {
                  program: "Advanced Mathematics", 
                  students: 95,
                  capacity: 100,
                  statusColor: "warning"
                },
                {
                  program: "Science & Technology",
                  students: 240,
                  capacity: 280,
                  statusColor: "success"
                },
                {
                  program: "Language Studies",
                  students: 160,
                  capacity: 180,
                  statusColor: "warning"
                },
                {
                  program: "Arts & Creative",
                  students: 172,
                  capacity: 200,
                  statusColor: "success"
                }
              ].map((program, index) => (
                <div key={index} className="flex flex-col gap-3 p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-ike-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-ike-neutral-dark text-sm sm:text-base break-words leading-tight">{program.program}</h3>
                      <p className="text-xs sm:text-sm text-ike-neutral mt-1">{program.students}/{program.capacity} students enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress 
                      value={(program.students / program.capacity) * 100} 
                      className="flex-1 h-2"
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
      </div>
    );
  }

  // Municipal Admin specific dashboard
  if (user?.role === 'municipality-admin') {
    return (
      <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
        {/* Welcome Header - Municipal Admin */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-neutral-dark leading-tight">
              Municipal Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
              <span className="block sm:inline">{currentDate}</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">{user.organization || 'Municipality'} Overview</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button asChild className="bg-ike-primary hover:bg-ike-primary-dark text-white flex-1 justify-center text-sm">
              <Link to="/reports/municipal-statistics">
                <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Export Municipal Report</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-ike-primary text-ike-primary hover:bg-ike-primary/10 flex-1 justify-center text-sm">
              <Link to="/reports/financial-export">
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Financial Export</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Municipal Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-ike-primary flex-shrink-0" />
                Municipal Students
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">4,250</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1 flex-shrink-0" />
                +2.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-ike-success flex-shrink-0" />
                External Students
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">847</div>
              <div className="text-xs text-ike-neutral mt-1">
                In independent schools
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <Euro className="h-3 w-3 sm:h-4 sm:w-4 text-ike-warning flex-shrink-0" />
                Money to Pay
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">2.8M SEK</div>
              <div className="text-xs text-ike-warning mt-1">
                November calculation
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                Money to Receive
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">1.4M SEK</div>
              <div className="text-xs text-ike-neutral mt-1">
                From other municipalities
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Municipal Schools Overview - Full Width */}
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Municipal Schools Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Status and metrics for municipal school units
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
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
                <div key={index} className="flex flex-col gap-3 p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <School className="w-5 h-5 sm:w-6 sm:h-6 text-ike-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-ike-neutral-dark text-sm sm:text-base">{school.name}</h3>
                      <p className="text-xs sm:text-sm text-ike-neutral mt-1">{school.students} students • Grade {school.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={
                        school.statusColor === "success" ? "bg-ike-success text-white" :
                        school.statusColor === "warning" ? "bg-ike-warning text-white" :
                        "bg-ike-error text-white"
                      }
                    >
                      {school.integration}
                    </Badge>
                    <div className="w-3 h-3 bg-ike-success rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary & Quick Actions - Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Inter-Municipal Compensation</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Current month financial overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-ike-neutral">Students in external schools:</span>
                <span className="font-medium text-xs sm:text-sm">847 students</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-ike-neutral">External students in our schools:</span>
                <span className="font-medium text-xs sm:text-sm">312 students</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-sm sm:text-base lg:text-lg">
                  <span className="font-medium">Net compensation:</span>
                  <span className="font-bold text-ike-warning">-1.4M SEK</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link to="/reports/money-to-receive">
                    <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">To Receive</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <Link to="/reports/money-to-pay">
                    <DollarSign className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">To Pay</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Municipal Management</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Essential municipal functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <Button asChild className="w-full justify-start bg-ike-primary hover:bg-ike-primary-dark text-white text-xs sm:text-sm">
                <Link to="/students">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  Student Management
                </Link>
              </Button>
              <Button asChild className="w-full justify-start text-xs sm:text-sm" variant="outline">
                <Link to="/students/municipal">
                  <School className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Municipal School Students</span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start text-xs sm:text-sm" variant="outline">
                <Link to="/students/external">
                  <ArrowUpDown className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">External School Students</span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start text-xs sm:text-sm" variant="outline">
                <Link to="/financial/pricelists">
                  <Euro className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Municipal Price Lists</span>
                </Link>
              </Button>
              <Button asChild className="w-full justify-start text-xs sm:text-sm" variant="outline">
                <Link to="/operations/municipal-users">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Municipal User Admin</span>
                </Link>
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
      <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
        {/* Welcome Header - Regional Admin */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-neutral-dark leading-tight">
              Regional Administration Dashboard
            </h1>
            <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
              <span className="block sm:inline">{currentDate}</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">System Overview for Region Skåne</span>
            </p>
          </div>
        </div>

        {/* Regional Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <Card className="border-l-4 border-l-ike-primary">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <Building className="h-3 w-3 sm:h-4 sm:w-4 text-ike-primary flex-shrink-0" />
                Total Municipalities
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">33</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1 flex-shrink-0" />
                All active and connected
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-success">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-ike-success flex-shrink-0" />
                Regional Students
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">89,247</div>
              <div className="flex items-center text-xs text-ike-success mt-1">
                <ArrowUp className="w-3 h-3 mr-1 flex-shrink-0" />
                +3.2% from last year
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-ike-warning sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-ike-neutral flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-ike-warning flex-shrink-0" />
                System Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="text-xl sm:text-2xl font-bold text-ike-neutral-dark">7</div>
              <div className="text-xs text-ike-warning mt-1">
                Across 4 municipalities
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Operations - Full Width */}
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Regional Operations</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              System administration and oversight
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                asChild
                className="justify-start bg-ike-primary hover:bg-ike-primary-dark text-white text-xs sm:text-sm"
              >
                <Link to="/system/municipalities">
                  <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Manage Municipalities</span>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="justify-start border-ike-primary text-ike-primary hover:bg-ike-primary/10 text-xs sm:text-sm"
              >
                <Link to="/system/schools">
                  <School className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">School Unit Overview</span>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="justify-start text-xs sm:text-sm"
              >
                <Link to="/system/users">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">User Management</span>
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="justify-start text-xs sm:text-sm"
              >
                <Link to="/settings">
                  <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">System Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Municipality Overview */}
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-ike-neutral-dark text-base sm:text-lg lg:text-xl">Municipality Status Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Real-time status of municipalities in the region
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
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
                <div key={index} className="flex flex-col gap-3 p-3 sm:p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ike-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 sm:w-6 sm:h-6 text-ike-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-ike-neutral-dark text-sm sm:text-base">{municipality.name}</h3>
                      <p className="text-xs sm:text-sm text-ike-neutral mt-1">{municipality.students} students • Last sync: {municipality.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
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
    );
  }

  // Default fallback dashboard
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-3 sm:p-4 lg:p-0">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ike-neutral-dark leading-tight">
            Dashboard
          </h1>
          <p className="text-ike-neutral mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base leading-relaxed">
            Welcome to the IKE System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
