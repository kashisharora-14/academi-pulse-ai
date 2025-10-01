import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Chatbot } from "@/components/Chatbot";
import { MapView } from "@/components/MapView";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { ExportTools } from "@/components/ExportTools";
import PolicyReport from "@/components/PolicyReport";
import { 
  LogOut, 
  Users, 
  Building2, 
  TrendingUp, 
  Award, 
  BookOpen, 
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Map,
  Bot,
  Activity,
  QrCode,
  Download,
  Plus,
  Edit
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 4000, target: 4200 },
  { month: "Feb", students: 4500, target: 4700 },
  { month: "Mar", students: 5000, target: 5200 },
  { month: "Apr", students: 5500, target: 5800 },
  { month: "May", students: 6000, target: 6300 },
  { month: "Jun", students: 6800, target: 7000 },
];

const schemeData = [
  { name: "PM-YUVA", value: 35, budget: 500, utilized: 425 },
  { name: "RUSA", value: 25, budget: 800, utilized: 720 },
  { name: "NSP", value: 20, budget: 300, utilized: 280 },
  { name: "Others", value: 20, budget: 200, utilized: 180 },
];

const performanceData = [
  { state: "Maharashtra", score: 85, institutions: 1200 },
  { state: "Tamil Nadu", score: 82, institutions: 950 },
  { state: "Karnataka", score: 80, institutions: 800 },
  { state: "Gujarat", score: 78, institutions: 700 },
  { state: "West Bengal", score: 75, institutions: 650 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--success))"];

const institutionLocations = [
  { id: "1", name: "IIT Delhi", position: [28.5449, 77.1925] as [number, number], data: "NIRF Rank: 2, Score: 85.4" },
  { id: "2", name: "IIT Mumbai", position: [19.1334, 72.9133] as [number, number], data: "NIRF Rank: 3, Score: 84.2" },
  { id: "3", name: "IIT Madras", position: [12.9916, 80.2336] as [number, number], data: "NIRF Rank: 1, Score: 88.7" },
  { id: "4", name: "IIT Kanpur", position: [26.5123, 80.2329] as [number, number], data: "NIRF Rank: 4, Score: 83.1" },
  { id: "5", name: "AIIMS Delhi", position: [28.5672, 77.2100] as [number, number], data: "Medical Rank: 1, Score: 90.2" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleDemoLogin = (role: string) => {
    // Demo login functionality for different roles
    const demoCredentials = {
      admin: { email: "admin@nedp.gov.in", name: "System Administrator" },
      student: { email: "student@university.edu", name: "Demo Student" },
      teacher: { email: "teacher@university.edu", name: "Demo Teacher" },
      institution: { email: "admin@university.edu", name: "Institution Admin" }
    };

    const cred = demoCredentials[role as keyof typeof demoCredentials];
    if (cred) {
      setUser({ email: cred.email, user_metadata: { name: cred.name } });
      navigate(`/${role}-dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">National Education Data Platform - Admin</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button onClick={() => handleDemoLogin('student')} size="sm" variant="ghost">
                Student Demo
              </Button>
              <Button onClick={() => handleDemoLogin('teacher')} size="sm" variant="ghost">
                Teacher Demo
              </Button>
              <Button onClick={() => handleDemoLogin('institution')} size="sm" variant="ghost">
                Institution Demo
              </Button>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-12 text-xs">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="institutions">Institutions</TabsTrigger>
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="interop">Interoperability</TabsTrigger>
              <TabsTrigger value="policy">Policy Support</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="map">Geo-Analytics</TabsTrigger>
              <TabsTrigger value="qr">
                <QrCode className="h-4 w-4 mr-1" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger value="export">
                <Download className="h-4 w-4 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="ai">AI Insights</TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="block lg:hidden">
            <TabsList className="flex overflow-x-auto pb-2 space-x-1 mobile-tabs-scroll h-auto">
              <TabsTrigger value="overview" className="whitespace-nowrap text-xs">Overview</TabsTrigger>
              <TabsTrigger value="institutions" className="whitespace-nowrap text-xs">Institutions</TabsTrigger>
              <TabsTrigger value="schemes" className="whitespace-nowrap text-xs">Schemes</TabsTrigger>
              <TabsTrigger value="analytics" className="whitespace-nowrap text-xs">Analytics</TabsTrigger>
              <TabsTrigger value="compliance" className="whitespace-nowrap text-xs">Compliance</TabsTrigger>
              <TabsTrigger value="interop" className="whitespace-nowrap text-xs">Interop</TabsTrigger>
              <TabsTrigger value="policy" className="whitespace-nowrap text-xs">Policy</TabsTrigger>
              <TabsTrigger value="security" className="whitespace-nowrap text-xs">Security</TabsTrigger>
              <TabsTrigger value="map" className="whitespace-nowrap text-xs">Map</TabsTrigger>
              <TabsTrigger value="qr" className="whitespace-nowrap text-xs">
                <QrCode className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="export" className="whitespace-nowrap text-xs">
                <Download className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="ai" className="whitespace-nowrap text-xs">AI</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Real-time Overview Cards */}
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-5">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">+12.5%</Badge>
                </div>
                <div className="text-2xl font-bold">10.2M</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
                <Progress value={75} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Aadhaar Linked: 96.8%</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="h-8 w-8 text-accent" />
                  <Badge className="bg-success">+8.3%</Badge>
                </div>
                <div className="text-2xl font-bold">50,234</div>
                <div className="text-sm text-muted-foreground">Institutions</div>
                <Progress value={85} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">AISHE Mapped: 99.2%</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">+15.2%</Badge>
                </div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Active Schemes</div>
                <Progress value={92} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Real-time Tracking</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-success" />
                  <Badge className="bg-success">+22.1%</Badge>
                </div>
                <div className="text-2xl font-bold">₹1,850Cr</div>
                <div className="text-sm text-muted-foreground">Budget Utilized</div>
                <Progress value={68} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">Live Updates</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-success">+18.7%</Badge>
                </div>
                <div className="text-2xl font-bold">1.2M</div>
                <div className="text-sm text-muted-foreground">Faculty Records</div>
                <Progress value={88} className="mt-2" />
                <div className="text-xs text-muted-foreground mt-1">APAR Integrated</div>
              </Card>
            </div>

            {/* Data Redundancy & Interoperability Status */}
            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Data Redundancy Elimination
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <div className="text-lg font-bold text-green-600">78%</div>
                    <div className="text-sm text-green-700">Duplicate entries eliminated</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <div className="text-lg font-bold text-blue-600">12.5M</div>
                    <div className="text-sm text-blue-700">Records deduplicated</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    AI-powered deduplication across departments
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Format Standardization
                </h3>
                <div className="space-y-3">
                  {[
                    { format: "Excel → JSON", progress: 95, status: "Completed" },
                    { format: "PDF → Structured", progress: 87, status: "In Progress" },
                    { format: "Legacy DB → API", progress: 92, status: "Completed" },
                    { format: "Manual → Automated", progress: 76, status: "In Progress" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.format}</span>
                        <Badge variant={item.status === "Completed" ? "default" : "secondary"} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Real-time Scalability
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-green-50 rounded text-center">
                      <div className="text-sm font-bold text-green-600">99.9%</div>
                      <div className="text-xs text-green-700">Uptime</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <div className="text-sm font-bold text-blue-600">50K+</div>
                      <div className="text-xs text-blue-700">Concurrent Users</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded text-center">
                      <div className="text-sm font-bold text-purple-600">2.5s</div>
                      <div className="text-xs text-purple-700">Avg Load Time</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded text-center">
                      <div className="text-sm font-bold text-orange-600">15TB</div>
                      <div className="text-xs text-orange-700">Data Processed</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Auto-scaling infrastructure supports nationwide access
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Student Enrollment vs Target</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Budget Utilization</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={schemeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="hsl(var(--secondary))" name="Budget (Cr)" />
                    <Bar dataKey="utilized" fill="hsl(var(--primary))" name="Utilized (Cr)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Pending Schemes
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Review Compliance Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Monthly Report
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Alerts & Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">5 institutions missing NAAC compliance</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">12 scholarship applications pending</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">NIRF rankings updated successfully</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync</span>
                    <Badge className="bg-success">99.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Uptime</span>
                    <Badge className="bg-success">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Quality</span>
                    <Badge className="bg-success">95.2%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="institutions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Top Performing States</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="hsl(var(--primary))" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={schemeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {schemeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Performance Metrics</h3>
                <div className="space-y-4">
                  {schemeData.map((scheme, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{scheme.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {((scheme.utilized / scheme.budget) * 100).toFixed(1)}% utilized
                        </span>
                      </div>
                      <Progress value={(scheme.utilized / scheme.budget) * 100} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Student Life Cycle Analytics</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">87.3%</div>
                      <div className="text-sm text-green-700">Graduation Rate</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">92.1%</div>
                      <div className="text-sm text-blue-700">Employability</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">2.8%</div>
                      <div className="text-sm text-purple-700">Dropout Risk</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">78%</div>
                      <div className="text-sm text-orange-700">Scheme Uptake</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Insights</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                        <p className="text-sm text-blue-800">Engineering students show 15% higher placement rates when enrolled in PMKVY schemes</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                        <p className="text-sm text-green-800">Rural students benefit 40% more from NSP scholarships than urban counterparts</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <p className="text-sm text-yellow-800">AI predicts 12% increase in STEM enrollment for next academic year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Institutional Performance Matrix</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "NIRF Parameters", score: 85, target: 90, trend: "+5" },
                      { name: "NAAC Compliance", score: 94, target: 95, trend: "+2" },
                      { name: "Research Output", score: 78, target: 85, trend: "+12" },
                      { name: "Student Satisfaction", score: 88, target: 90, trend: "+3" },
                      { name: "Faculty Performance", score: 82, target: 88, trend: "+8" },
                      { name: "Infrastructure Score", score: 91, target: 95, trend: "+1" }
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{metric.score}%</span>
                            <Badge className={`text-xs ${
                              parseInt(metric.trend) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {metric.trend}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={metric.score} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Data Integration & Quality Dashboard</h3>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Sources Integration</h4>
                  <div className="space-y-3">
                    {[
                      { source: "AISHE", status: "Connected", quality: 98, records: "50.2K institutions" },
                      { source: "NIRF", status: "Connected", quality: 96, records: "11.9K ranked" },
                      { source: "NAAC", status: "Connected", quality: 94, records: "8.7K accredited" },
                      { source: "AICTE", status: "Connected", quality: 99, records: "4.3K approved" },
                      { source: "UGC", status: "Syncing", quality: 92, records: "1.1K universities" },
                      { source: "DigiLocker", status: "Connected", quality: 97, records: "120M documents" }
                    ].map((source, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium text-sm">{source.source}</p>
                          <p className="text-xs text-muted-foreground">{source.records}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={source.status === "Connected" ? "default" : "secondary"} className="text-xs">
                            {source.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{source.quality}% quality</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Real-time Processing</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">2.8M</div>
                      <div className="text-sm text-green-700">Records processed today</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">15.2K</div>
                      <div className="text-sm text-blue-700">API calls/hour</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">99.9%</div>
                      <div className="text-sm text-purple-700">System uptime</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">45ms</div>
                      <div className="text-sm text-orange-700">Avg response time</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Identity Linkage</h4>
                  <div className="space-y-3">
                    {[
                      { type: "Aadhaar Linkage", linked: 95.8, total: "Students & Teachers" },
                      { type: "AISHE Code Mapping", linked: 99.2, total: "Institutions" },
                      { type: "APAR ID Integration", linked: 88.4, total: "Faculty Records" },
                      { type: "Enrollment Matching", linked: 96.7, total: "Academic Records" },
                      { type: "Scheme Beneficiary ID", linked: 91.3, total: "Government Programs" }
                    ].map((identity, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{identity.type}</span>
                          <span>{identity.linked}%</span>
                        </div>
                        <Progress value={identity.linked} />
                        <p className="text-xs text-muted-foreground">{identity.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">AI-Powered Recommendations</h3>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Policy Recommendations</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <h5 className="font-semibold text-blue-800">Increase STEM Funding</h5>
                      <p className="text-sm text-blue-700">AI analysis suggests 25% increase in STEM scholarships could boost enrollment by 18% in rural areas</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">High Impact</Badge>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <h5 className="font-semibold text-green-800">Teacher Training Programs</h5>
                      <p className="text-sm text-green-700">Implement AI-based pedagogy training for 40% improvement in student outcomes</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Medium Impact</Badge>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <h5 className="font-semibold text-purple-800">Infrastructure Optimization</h5>
                      <p className="text-sm text-purple-700">Redistribute resources to northeastern states for balanced educational development</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">High Impact</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Intervention Alerts</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <h5 className="font-semibold text-red-800">Urgent: Dropout Risk</h5>
                      </div>
                      <p className="text-sm text-red-700">15 institutions show &gt;10% increase in dropout rates</p>
                      <Button size="sm" className="mt-2 bg-red-600">Take Action</Button>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <h5 className="font-semibold text-yellow-800">Moderate: Compliance Gap</h5>
                      </div>
                      <p className="text-sm text-yellow-700">28 institutions pending NAAC reaccreditation</p>
                      <Button size="sm" variant="outline" className="mt-2">Review</Button>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-orange-600" />
                        <h5 className="font-semibold text-orange-800">Opportunity: Excellence</h5>
                      </div>
                      <p className="text-sm text-orange-700">12 institutions ready for NIRF ranking improvement</p>
                      <Button size="sm" variant="outline" className="mt-2">Support</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">NAAC Compliance</h3>
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-muted-foreground">Institutions compliant</div>
                <Progress value={94.2} className="mt-2" />
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">AICTE Approval</h3>
                <div className="text-2xl font-bold text-blue-600">98.7%</div>
                <div className="text-sm text-muted-foreground">Approved institutions</div>
                <Progress value={98.7} className="mt-2" />
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">UGC Recognition</h3>
                <div className="text-2xl font-bold text-purple-600">96.5%</div>
                <div className="text-sm text-muted-foreground">Recognized institutions</div>
                <Progress value={96.5} className="mt-2" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Top Institutions Nationwide</h3>
              <MapView locations={institutionLocations} />
            </Card>
          </TabsContent>

          <TabsContent value="interop" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Data Interoperability & ETL Pipeline Status</h3>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-semibold">External API Integrations</h4>
                  <div className="space-y-3">
                    {[
                      { api: "AISHE Database", status: "Active", lastSync: "2 min ago", records: "50.2K institutions", health: 98 },
                      { api: "NIRF Portal", status: "Active", lastSync: "5 min ago", records: "11.9K ranked", health: 96 },
                      { api: "AICTE Database", status: "Active", lastSync: "1 min ago", records: "4.3K approved", health: 99 },
                      { api: "UGC Database", status: "Syncing", lastSync: "15 min ago", records: "1.1K universities", health: 94 },
                      { api: "NAD Repository", status: "Active", lastSync: "3 min ago", records: "120M documents", health: 97 },
                      { api: "PMKVY Portal", status: "Active", lastSync: "8 min ago", records: "2.8M beneficiaries", health: 95 },
                      { api: "NSP Database", status: "Active", lastSync: "4 min ago", records: "15M scholarships", health: 96 }
                    ].map((api, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{api.api}</span>
                          <Badge variant={api.status === "Active" ? "default" : "secondary"}>
                            {api.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>Last sync: {api.lastSync}</div>
                          <div>Records: {api.records}</div>
                          <div className="flex items-center gap-2">
                            <span>Health: {api.health}%</span>
                            <Progress value={api.health} className="h-1 flex-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">ETL Pipeline Performance</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">2.8M</div>
                      <div className="text-sm text-green-700">Records processed today</div>
                      <Progress value={85} className="mt-2" />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">15.2K</div>
                      <div className="text-sm text-blue-700">API calls/hour</div>
                      <Progress value={92} className="mt-2" />
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">99.9%</div>
                      <div className="text-sm text-purple-700">Data quality score</div>
                      <Progress value={99.9} className="mt-2" />
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">45ms</div>
                      <div className="text-sm text-orange-700">Avg response time</div>
                      <Progress value={88} className="mt-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Format Standardization</h4>
                  <div className="space-y-3">
                    {[
                      { format: "Excel Sheets", converted: 2500, total: 2800, type: "Institutional Data" },
                      { format: "PDF Documents", converted: 1200, total: 1500, type: "Certificates" },
                      { format: "Legacy Databases", converted: 45, total: 50, type: "Historical Records" },
                      { format: "Manual Entries", converted: 8500, total: 12000, type: "Student Records" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2 p-3 border rounded">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.format}</span>
                          <span>{((item.converted / item.total) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(item.converted / item.total) * 100} />
                        <div className="text-xs text-muted-foreground">
                          {item.converted.toLocaleString()} / {item.total.toLocaleString()} {item.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="policy" className="space-y-6">
            <PolicyReport />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Security & Compliance Dashboard</h3>
                <div className="space-y-4">
                  <h4 className="font-semibold">Identity & Access Management</h4>
                  <div className="space-y-3">
                    {[
                      { 
                        type: "Aadhaar Integration", 
                        coverage: 96.8, 
                        secure: 99.9, 
                        status: "Operational",
                        users: "Students & Faculty"
                      },
                      { 
                        type: "APAR ID Linking", 
                        coverage: 88.4, 
                        secure: 99.7, 
                        status: "Operational",
                        users: "Faculty Records"
                      },
                      { 
                        type: "AISHE Code Mapping", 
                        coverage: 99.2, 
                        secure: 99.8, 
                        status: "Operational",
                        users: "Institutions"
                      },
                      { 
                        type: "eKYC Verification", 
                        coverage: 94.5, 
                        secure: 99.6, 
                        status: "Active",
                        users: "All Stakeholders"
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{item.type}</span>
                          <Badge variant={item.status === "Operational" ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Coverage: {item.coverage}%</span>
                            <span>Security: {item.secure}%</span>
                          </div>
                          <Progress value={item.coverage} />
                          <div className="text-xs text-muted-foreground">{item.users}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Data Privacy & Protection</h3>
                <div className="space-y-4">
                  <h4 className="font-semibold">Compliance Status</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-green-800">GDPR Compliance</h5>
                        <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                      </div>
                      <p className="text-sm text-green-700">
                        Data processing, consent management, and right to deletion fully compliant
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-blue-800">Indian Data Privacy</h5>
                        <Badge className="bg-blue-100 text-blue-800">99.2%</Badge>
                      </div>
                      <p className="text-sm text-blue-700">
                        Personal Data Protection Act compliance with localized data storage
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-purple-800">Aadhaar Masking</h5>
                        <Badge className="bg-purple-100 text-purple-800">100%</Badge>
                      </div>
                      <p className="text-sm text-purple-700">
                        Complete masking of sensitive Aadhaar data with secure hashing
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Blockchain-based Credential Verification</h3>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-semibold">Certificate Verification</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">2.5M</div>
                      <div className="text-sm text-blue-700">Certificates on blockchain</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-green-700">Verification accuracy</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">15,000+</div>
                      <div className="text-sm text-purple-700">Daily verifications</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Security Metrics</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded">
                      <div className="text-lg font-bold text-red-600">0</div>
                      <div className="text-sm text-red-700">Security breaches (2024)</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">256-bit</div>
                      <div className="text-sm text-orange-700">Encryption standard</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded">
                      <div className="text-lg font-bold text-yellow-600">Multi-factor</div>
                      <div className="text-sm text-yellow-700">Authentication enabled</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Fraud Prevention</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50 rounded">
                      <div className="text-lg font-bold text-indigo-600">99.95%</div>
                      <div className="text-sm text-indigo-700">Fraud detection rate</div>
                    </div>
                    <div className="p-3 bg-pink-50 rounded">
                      <div className="text-lg font-bold text-pink-600">1,250</div>
                      <div className="text-sm text-pink-700">Fake certificates blocked</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded">
                      <div className="text-lg font-bold text-teal-600">AI-powered</div>
                      <div className="text-sm text-teal-700">Anomaly detection</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <QRCodeGenerator 
                data={{ 
                  id: "NEDP-ADMIN-001",
                  name: "National Education Data Platform",
                  type: "admin",
                  totalStudents: "10.2M",
                  totalInstitutions: "50,234",
                  activeSchemes: 156,
                  budgetUtilized: "₹1,850Cr",
                  facultyRecords: "1.2M",
                  complianceRate: 94.5,
                  dataQuality: 99.9,
                  systemUptime: 99.9
                }} 
                type="institution"
                title="NEDP Admin Dashboard QR"
              />
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Admin QR Management</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Generate System QR
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🏛️ Platform Overview</h4>
                    <p className="text-sm text-blue-700">
                      Complete NEDP platform statistics and performance metrics
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Update Metrics
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📊 Scheme Analytics</h4>
                    <p className="text-sm text-green-700">
                      Real-time scheme performance and budget utilization
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add New Scheme
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔐 Security Dashboard</h4>
                    <p className="text-sm text-purple-700">
                      Data protection and compliance monitoring
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Security Metric
                    </Button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🌐 State Performance</h4>
                    <p className="text-sm text-orange-700">
                      State-wise education performance and rankings
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add State Data
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ExportTools 
                data={{
                  name: "National Education Data Platform",
                  id: "NEDP-ADMIN-001",
                  totalStudents: "10.2M",
                  totalInstitutions: "50,234",
                  activeSchemes: 156,
                  budgetUtilized: "₹1,850Cr",
                  facultyRecords: "1.2M",
                  enrollmentData: enrollmentData,
                  schemeData: schemeData,
                  performanceData: performanceData,
                  complianceRate: 94.5,
                  dataQuality: 99.9,
                  systemUptime: 99.9
                }}
                title="NEDP Platform Report"
                type="report"
              />
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Admin Export Tools</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Custom Report
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">📈 National Education Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive national education statistics and trends
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add State Data
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">💰 Budget Utilization Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Scheme-wise budget allocation and utilization analysis
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Update Budget
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🎯 Policy Impact Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Analysis of policy interventions and their outcomes
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Policy
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🔒 Compliance Audit Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Data protection and security compliance status
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Update Compliance
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Recommendation</h4>
                    <p className="text-sm text-blue-700">Consider increasing funding for STEM programs in rural areas to improve national competitiveness.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Trend Alert</h4>
                    <p className="text-sm text-green-700">Engineering enrollment up 15% this year - prepare infrastructure scaling plans.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibant text-yellow-800">Action Required</h4>
                    <p className="text-sm text-yellow-700">5 institutions show declining performance metrics - intervention recommended.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;