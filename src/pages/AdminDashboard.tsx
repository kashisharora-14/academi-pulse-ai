import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
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
  Edit,
  MapPin,
  Database,
  FileText,
  Settings,
  Bell,
  Shield,
  GraduationCap,
  Send,
  Globe,
  UserCheck,
  Star,
  Trophy
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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const institutionLocations = [
  {
    id: "1",
    name: "IIT Delhi",
    position: [28.5449, 77.1925] as [number, number],
    data: "NIRF Rank: 2, Score: 85.4",
    performance: 'excellent' as const,
    city: "New Delhi",
    type: "IIT",
    students: 9000,
    nirfRank: 2,
    placement: 95.2,
    research: 88.5,
    dropout: 2.1
  },
  {
    id: "2",
    name: "IIT Mumbai",
    position: [19.1334, 72.9133] as [number, number],
    data: "NIRF Rank: 3, Score: 84.2",
    performance: 'excellent' as const,
    city: "Mumbai",
    type: "IIT",
    students: 10500,
    nirfRank: 3,
    placement: 94.8,
    research: 87.3,
    dropout: 2.5
  },
  {
    id: "3",
    name: "IIT Madras",
    position: [12.9916, 80.2336] as [number, number],
    data: "NIRF Rank: 1, Score: 88.7",
    performance: 'excellent' as const,
    city: "Chennai",
    type: "IIT",
    students: 8500,
    nirfRank: 1,
    placement: 96.5,
    research: 92.1,
    dropout: 1.8
  },
  {
    id: "4",
    name: "IIT Kanpur",
    position: [26.5123, 80.2329] as [number, number],
    data: "NIRF Rank: 4, Score: 83.1",
    performance: 'excellent' as const,
    city: "Kanpur",
    type: "IIT",
    students: 8000,
    nirfRank: 4,
    placement: 93.7,
    research: 85.9,
    dropout: 2.3
  },
  {
    id: "5",
    name: "AIIMS Delhi",
    position: [28.5672, 77.2100] as [number, number],
    data: "Medical Rank: 1, Score: 90.2",
    performance: 'excellent' as const,
    city: "New Delhi",
    type: "Medical College",
    students: 5000,
    nirfRank: 1,
    placement: 98.5,
    research: 91.2,
    dropout: 1.2
  },
  {
    id: "6",
    name: "Delhi University",
    position: [28.6863, 77.2059] as [number, number],
    data: "NIRF Rank: 11, Score: 75.3",
    performance: 'good' as const,
    city: "New Delhi",
    type: "Central University",
    students: 130000,
    nirfRank: 11,
    placement: 78.4,
    research: 72.5,
    dropout: 8.5
  },
  {
    id: "7",
    name: "Banaras Hindu University",
    position: [25.2677, 82.9913] as [number, number],
    data: "NIRF Rank: 15, Score: 70.8",
    performance: 'good' as const,
    city: "Varanasi",
    type: "Central University",
    students: 28000,
    nirfRank: 15,
    placement: 75.2,
    research: 68.9,
    dropout: 9.2
  },
  {
    id: "8",
    name: "Anna University",
    position: [13.0115, 80.2337] as [number, number],
    data: "NIRF Rank: 18, Score: 68.5",
    performance: 'average' as const,
    city: "Chennai",
    type: "State University",
    students: 40000,
    nirfRank: 18,
    placement: 72.8,
    research: 65.3,
    dropout: 11.5
  },
  {
    id: "9",
    name: "Jadavpur University",
    position: [22.4993, 88.3717] as [number, number],
    data: "NIRF Rank: 12, Score: 74.2",
    performance: 'good' as const,
    city: "Kolkata",
    type: "State University",
    students: 12000,
    nirfRank: 12,
    placement: 81.5,
    research: 71.8,
    dropout: 7.8
  },
  {
    id: "10",
    name: "Pune Engineering College",
    position: [18.5304, 73.8567] as [number, number],
    data: "NIRF Rank: 45, Score: 58.3",
    performance: 'needs-attention' as const,
    city: "Pune",
    type: "State Engineering College",
    students: 3500,
    nirfRank: 45,
    placement: 68.2,
    research: 52.4,
    dropout: 15.3
  },
  {
    id: "11",
    name: "Rajasthan Technical University",
    position: [26.8470, 75.8060] as [number, number],
    data: "NIRF Rank: 78, Score: 48.5",
    performance: 'needs-attention' as const,
    city: "Kota",
    type: "State University",
    students: 8500,
    nirfRank: 78,
    placement: 62.5,
    research: 48.7,
    dropout: 18.5
  },
  {
    id: "12",
    name: "Bihar Engineering College",
    position: [25.5941, 85.1376] as [number, number],
    data: "NIRF Rank: 95, Score: 42.8",
    performance: 'critical' as const,
    city: "Patna",
    type: "State Engineering College",
    students: 2800,
    nirfRank: 95,
    placement: 48.3,
    research: 38.5,
    dropout: 24.7
  },
  {
    id: "13",
    name: "Uttar Pradesh State University",
    position: [26.8467, 80.9462] as [number, number],
    data: "NIRF Rank: 112, Score: 38.2",
    performance: 'critical' as const,
    city: "Lucknow",
    type: "State University",
    students: 15000,
    nirfRank: 112,
    placement: 42.8,
    research: 35.1,
    dropout: 28.3
  },
  {
    id: "14",
    name: "NIT Trichy",
    position: [10.7596, 78.8149] as [number, number],
    data: "NIRF Rank: 8, Score: 78.9",
    performance: 'excellent' as const,
    city: "Tiruchirappalli",
    type: "NIT",
    students: 8200,
    nirfRank: 8,
    placement: 91.5,
    research: 82.3,
    dropout: 3.2
  },
  {
    id: "15",
    name: "NIT Surathkal",
    position: [13.0127, 74.7951] as [number, number],
    data: "NIRF Rank: 13, Score: 72.5",
    performance: 'good' as const,
    city: "Mangalore",
    type: "NIT",
    students: 7500,
    nirfRank: 13,
    placement: 88.7,
    research: 76.4,
    dropout: 4.1
  },
  {
    id: "16",
    name: "Hyderabad Central University",
    position: [17.4569, 78.3309] as [number, number],
    data: "NIRF Rank: 21, Score: 66.8",
    performance: 'average' as const,
    city: "Hyderabad",
    type: "Central University",
    students: 6500,
    nirfRank: 21,
    placement: 73.5,
    research: 64.2,
    dropout: 10.8
  },
  {
    id: "17",
    name: "Gujarat University",
    position: [23.0332, 72.5167] as [number, number],
    data: "NIRF Rank: 35, Score: 61.2",
    performance: 'average' as const,
    city: "Ahmedabad",
    type: "State University",
    students: 22000,
    nirfRank: 35,
    placement: 70.3,
    research: 58.9,
    dropout: 13.2
  },
  {
    id: "18",
    name: "Chandigarh University",
    position: [30.7677, 76.7794] as [number, number],
    data: "NIRF Rank: 42, Score: 59.5",
    performance: 'average' as const,
    city: "Chandigarh",
    type: "Private University",
    students: 18000,
    nirfRank: 42,
    placement: 74.8,
    research: 55.3,
    dropout: 12.5
  },
  {
    id: "19",
    name: "Odisha Engineering Institute",
    position: [20.2961, 85.8245] as [number, number],
    data: "NIRF Rank: 88, Score: 45.3",
    performance: 'critical' as const,
    city: "Bhubaneswar",
    type: "State Engineering College",
    students: 3200,
    nirfRank: 88,
    placement: 52.7,
    research: 41.8,
    dropout: 22.1
  },
  {
    id: "20",
    name: "Kerala State University",
    position: [8.5241, 76.9366] as [number, number],
    data: "NIRF Rank: 28, Score: 63.7",
    performance: 'good' as const,
    city: "Thiruvananthapuram",
    type: "State University",
    students: 14000,
    nirfRank: 28,
    placement: 76.9,
    research: 62.5,
    dropout: 9.8
  }
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
            <TabsList className="gov-tabs-list flex w-full flex-wrap justify-start">
              <TabsTrigger value="overview" className="gov-tab-trigger">
                <Building2 className="h-4 w-4 enhanced-tab-icon" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="institutions" className="gov-tab-trigger">
                <Users className="h-4 w-4 enhanced-tab-icon" />
                Institutions
              </TabsTrigger>
              <TabsTrigger value="schemes" className="gov-tab-trigger">
                <Award className="h-4 w-4 enhanced-tab-icon" />
                Schemes
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gov-tab-trigger">
                <BarChart3 className="h-4 w-4 enhanced-tab-icon" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="compliance" className="gov-tab-trigger">
                <CheckCircle className="h-4 w-4 enhanced-tab-icon" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="interop" className="gov-tab-trigger">
                <Database className="h-4 w-4 enhanced-tab-icon" />
                Interop
              </TabsTrigger>
              <TabsTrigger value="policy" className="gov-tab-trigger">
                <FileText className="h-4 w-4 enhanced-tab-icon" />
                Policy
              </TabsTrigger>
              <TabsTrigger value="security" className="gov-tab-trigger">
                <Shield className="h-4 w-4 enhanced-tab-icon" />
                Security
              </TabsTrigger>
              <TabsTrigger value="authority-requests" className="gov-tab-trigger">
                <Shield className="h-4 w-4 enhanced-tab-icon" />
                Authority
              </TabsTrigger>
              <TabsTrigger value="ratings" className="gov-tab-trigger">
                <Star className="h-4 w-4 enhanced-tab-icon" />
                Ratings
              </TabsTrigger>
              <TabsTrigger value="map" className="gov-tab-trigger">
                <MapPin className="h-4 w-4 enhanced-tab-icon" />
                Geo-Analytics
              </TabsTrigger>
              <TabsTrigger value="qr" className="gov-tab-trigger">
                <QrCode className="h-4 w-4 enhanced-tab-icon" />
                QR Codes
              </TabsTrigger>
              <TabsTrigger value="export" className="gov-tab-trigger">
                <Download className="h-4 w-4 enhanced-tab-icon" />
                Export
              </TabsTrigger>
              <TabsTrigger value="ai" className="gov-tab-trigger">
                <Bot className="h-4 w-4 enhanced-tab-icon" />
                AI Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Enhanced Grid */}
          <div className="block lg:hidden">
            <TabsList className="enhanced-mobile-tabs">
              <TabsTrigger value="overview" className="enhanced-mobile-tab">
                <Building2 className="enhanced-mobile-tab-icon" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="institutions" className="enhanced-mobile-tab">
                <Users className="enhanced-mobile-tab-icon" />
                <span>Institutions</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="enhanced-mobile-tab">
                <Award className="enhanced-mobile-tab-icon" />
                <span>Schemes</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="enhanced-mobile-tab">
                <BarChart3 className="enhanced-mobile-tab-icon" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="enhanced-mobile-tab">
                <CheckCircle className="enhanced-mobile-tab-icon" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="interop" className="enhanced-mobile-tab">
                <Database className="enhanced-mobile-tab-icon" />
                <span>Interop</span>
              </TabsTrigger>
              <TabsTrigger value="policy" className="enhanced-mobile-tab">
                <FileText className="enhanced-mobile-tab-icon" />
                <span>Policy</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="enhanced-mobile-tab">
                <Shield className="enhanced-mobile-tab-icon" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="authority-requests" className="enhanced-mobile-tab">
                <Shield className="enhanced-mobile-tab-icon" />
                <span>Authority</span>
              </TabsTrigger>
              <TabsTrigger value="ratings" className="enhanced-mobile-tab">
                <Star className="enhanced-mobile-tab-icon" />
                <span>Ratings</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="enhanced-mobile-tab">
                <MapPin className="enhanced-mobile-tab-icon" />
                <span>Map</span>
              </TabsTrigger>
              <TabsTrigger value="qr" className="enhanced-mobile-tab">
                <QrCode className="enhanced-mobile-tab-icon" />
                <span>QR</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="enhanced-mobile-tab">
                <Download className="enhanced-mobile-tab-icon" />
                <span>Export</span>
              </TabsTrigger>
              <TabsTrigger value="ai" className="enhanced-mobile-tab">
                <Bot className="enhanced-mobile-tab-icon" />
                <span>AI</span>
              </TabsTrigger>
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
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Target" />
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
                    <Bar dataKey="budget" fill="#8b5cf6" name="Budget (Cr)" />
                    <Bar dataKey="utilized" fill="#3b82f6" name="Utilized (Cr)" />
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
                  <Bar dataKey="score" fill="#3b82f6" name="Performance Score" />
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
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {schemeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
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
                    <h4 className="font-semibold text-yellow-800">Action Required</h4>
                    <p className="text-sm text-yellow-700">5 institutions show declining performance metrics - intervention recommended.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="authority-requests" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Shield className="h-6 w-6 text-red-600" />
                    Authority Request System
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Request detailed information from institutions, teachers, and students. All requests are tracked and logged.
                  </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Authority Request
                </Button>
              </div>

              {/* Quick Request Categories */}
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Institution Data</h3>
                    <p className="text-xs text-blue-600 mt-1">Request detailed institutional reports</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">245 Available</Badge>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-green-50 border-green-200">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">Faculty Records</h3>
                    <p className="text-xs text-green-600 mt-1">APAR data and performance metrics</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">12.5K Available</Badge>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-purple-50 border-purple-200">
                  <div className="text-center">
                    <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-800">Student Analytics</h3>
                    <p className="text-xs text-purple-600 mt-1">Academic progress and outcomes</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">2.1M Available</Badge>
                  </div>
                </Card>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-orange-50 border-orange-200">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-orange-800">Scheme Data</h3>
                    <p className="text-xs text-orange-600 mt-1">Scholarship and program analytics</p>
                    <Badge className="mt-2 bg-orange-100 text-orange-800">156 Schemes</Badge>
                  </div>
                </Card>
              </div>

              {/* Active Requests */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-bold">Active Authority Requests</h3>

                {/* Request 1 - Pending Approval */}
                <div className="border rounded-lg p-4 bg-yellow-50/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">Request for IIT Delhi Performance Data</h4>
                        <Badge className="bg-yellow-500">Awaiting Institution Response</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Requested by: Ministry of Education • Priority: High • Due: March 20, 2024</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3 space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Request Details: </span>
                      <span>Complete faculty APAR data, NIRF metrics, student placement statistics, and research output for Q4 2023</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Authority Level: </span>
                      <span className="text-red-600">Ministry of Education (Level 1)</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Target: </span>
                      <span>IIT Delhi Administration</span>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">Request Initiated</span>
                          <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Authority request sent to IIT Delhi</p>
                      </div>
                    </div>

                    <div className="ml-4 h-8 w-0.5 bg-green-500"></div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">Institution Notified</span>
                          <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                        </div>
                        <p className="text-xs text-muted-foreground">IIT Delhi administration received request</p>
                      </div>
                    </div>

                    <div className="ml-4 h-8 w-0.5 bg-yellow-500 animate-pulse"></div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white animate-pulse">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">Data Compilation</span>
                          <span className="text-xs text-yellow-600 font-medium">In Progress</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Institution compiling requested data</p>
                      </div>
                    </div>

                    <div className="ml-4 h-8 w-0.5 bg-gray-300"></div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-500">Data Submission</span>
                        <p className="text-xs text-muted-foreground">Expected: March 20, 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-1" />
                      Send Reminder
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      View Request Details
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Escalate Request
                    </Button>
                  </div>
                </div>

                {/* Request 2 - Completed */}
                <div className="border rounded-lg p-4 bg-green-50/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">Punjab State University Data Request</h4>
                        <Badge className="bg-green-500">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Requested: March 10, 2024 • Completed: March 18, 2024</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="p-2 bg-white rounded">
                      <span className="text-muted-foreground">Data Points:</span>
                      <span className="ml-2 font-bold text-green-600">2,847 records</span>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <span className="text-muted-foreground">Response Time:</span>
                      <span className="ml-2 font-medium">8 days</span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-green-100 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-700" />
                    <span className="text-sm text-green-800 font-medium">
                      Complete dataset received. All 156 affiliated colleges' data included.
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Analytics
                    </Button>
                  </div>
                </div>

                {/* Request 3 - Escalated */}
                <div className="border rounded-lg p-4 bg-red-50/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">Faculty Performance Review - Bihar Colleges</h4>
                        <Badge className="bg-red-500">Escalated</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Requested: March 5, 2024 • Overdue by: 5 days</p>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-700 mt-0.5" />
                      <div className="text-sm text-red-800">
                        <span className="font-medium">Escalation Notice:</span> Request overdue. Director intervention required.
                        <div className="mt-2">
                          <span className="font-medium">Issues:</span> 3 institutions non-responsive, data quality concerns
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Shield className="h-4 w-4 mr-1" />
                      Director Intervention
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-1" />
                      Final Notice
                    </Button>
                  </div>
                </div>
              </div>

              {/* Request Form */}
              <Card className="p-6 bg-blue-50/30 border-blue-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Authority Request
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Request Type</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>Institution Performance Data</option>
                      <option>Faculty APAR Records</option>
                      <option>Student Analytics Report</option>
                      <option>Scholarship Utilization Data</option>
                      <option>Research Output Analysis</option>
                      <option>NIRF Ranking Data</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target Entity</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>Select Institution/Department</option>
                      <option>All IITs (23 institutions)</option>
                      <option>All NITs (31 institutions)</option>
                      <option>State Universities - Punjab</option>
                      <option>Central Universities</option>
                      <option>Private Universities</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority Level</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>High - 7 days</option>
                      <option>Medium - 15 days</option>
                      <option>Low - 30 days</option>
                      <option>Urgent - 3 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Data Period</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>Current Academic Year</option>
                      <option>Last 6 Months</option>
                      <option>Q4 2023</option>
                      <option>Full Year 2023</option>
                      <option>Custom Date Range</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium">Detailed Requirements</label>
                  <textarea
                    className="w-full p-2 border rounded-md mt-1"
                    rows={3}
                    placeholder="Specify exact data requirements, format preferences, and any special instructions..."
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Authority Request
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            {/* National Education System Rating Overview */}
            <div className="grid gap-6 md:grid-cols-4 mb-6">
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">7.2</div>
                <div className="flex justify-center mb-2">
                  {[...Array(10)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 text-yellow-500 ${i < 7 ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <div className="text-sm text-blue-700">National Education Index</div>
                <div className="text-xs text-blue-600 mt-1">Out of 10.0</div>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">82%</div>
                <div className="text-sm text-green-700">Overall Satisfaction</div>
                <div className="text-xs text-green-600 mt-1">Students & Parents</div>
                <Badge className="mt-2 bg-green-600 text-white">Above Target</Badge>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">68%</div>
                <div className="text-sm text-purple-700">Institution Compliance</div>
                <div className="text-xs text-purple-600 mt-1">Quality Standards</div>
                <Badge className="mt-2 bg-purple-600 text-white">Improving</Badge>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="text-4xl font-bold text-orange-600 mb-2">4.5</div>
                <div className="text-sm text-orange-700">Policy Effectiveness</div>
                <div className="text-xs text-orange-600 mt-1">Out of 5.0</div>
                <Badge className="mt-2 bg-orange-600 text-white">Good</Badge>
              </Card>
            </div>

            {/* State-wise Performance Ratings */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Top Performing States
              </h3>
              <div className="space-y-4">
                {[
                  { state: "Kerala", rating: 8.9, rank: 1, improvement: "+0.3", color: "text-green-600" },
                  { state: "Tamil Nadu", rating: 8.5, rank: 2, improvement: "+0.2", color: "text-green-600" },
                  { state: "Maharashtra", rating: 8.2, rank: 3, improvement: "+0.4", color: "text-green-600" },
                  { state: "Karnataka", rating: 7.9, rank: 4, improvement: "+0.1", color: "text-green-600" },
                  { state: "Punjab", rating: 7.6, rank: 5, improvement: "-0.1", color: "text-red-600" },
                  { state: "Gujarat", rating: 7.4, rank: 6, improvement: "+0.5", color: "text-green-600" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`text-2xl font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-600'}`}>
                        #{item.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.state}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Rating: {item.rating}/10</span>
                          <span className={item.color}>({item.improvement})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating / 2) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <Progress value={item.rating * 10} className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sector-wise Ratings */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  Education Sector Performance
                </h3>
                <div className="space-y-4">
                  {[
                    { sector: "Higher Education", rating: 7.8, institutions: 1200, color: "bg-blue-500" },
                    { sector: "Technical Education", rating: 8.2, institutions: 850, color: "bg-green-500" },
                    { sector: "Vocational Training", rating: 6.9, institutions: 650, color: "bg-purple-500" },
                    { sector: "Research & Innovation", rating: 7.4, institutions: 420, color: "bg-orange-500" },
                    { sector: "Skill Development", rating: 7.1, institutions: 980, color: "bg-pink-500" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.sector}</span>
                        <span className="text-sm text-muted-foreground">{item.rating}/10 ({item.institutions} institutions)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.rating * 10} className="flex-1" />
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating / 2) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="h-6 w-6 text-green-600" />
                  Policy Impact Ratings
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {[
                    {
                      policy: "National Education Policy 2020",
                      rating: 8.5,
                      impact: "High",
                      status: "Active",
                      year: "2020"
                    },
                    {
                      policy: "PM YUVA Scheme",
                      rating: 7.8,
                      impact: "Medium",
                      status: "Active",
                      year: "2022"
                    },
                    {
                      policy: "Digital Education Initiative",
                      rating: 8.2,
                      impact: "High",
                      status: "Active",
                      year: "2021"
                    },
                    {
                      policy: "RUSA (Rashtriya Uchchatar Shiksha Abhiyan)",
                      rating: 7.5,
                      impact: "Medium",
                      status: "Active",
                      year: "2013"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating / 2) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">{item.impact} Impact</Badge>
                      </div>
                      <div className="font-semibold mb-1">{item.policy}</div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Launched: {item.year}</span>
                        <span>Rating: {item.rating}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* National Performance Trends */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">National Education Performance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { year: "2019", literacy: 71.5, enrollment: 78.2, quality: 6.8, dropout: 14.5 },
                  { year: "2020", literacy: 72.1, enrollment: 79.5, quality: 7.0, dropout: 13.8 },
                  { year: "2021", literacy: 72.8, enrollment: 80.8, quality: 7.1, dropout: 13.2 },
                  { year: "2022", literacy: 73.5, enrollment: 82.1, quality: 7.3, dropout: 12.5 },
                  { year: "2023", literacy: 74.2, enrollment: 83.4, quality: 7.5, dropout: 11.8 },
                  { year: "2024", literacy: 74.9, enrollment: 84.7, quality: 7.8, dropout: 11.2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="literacy" stroke="#3b82f6" strokeWidth={2} name="Literacy Rate (%)" />
                  <Line type="monotone" dataKey="enrollment" stroke="#10b981" strokeWidth={2} name="Enrollment (%)" />
                  <Line type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} name="Quality Index" />
                  <Line type="monotone" dataKey="dropout" stroke="#ef4444" strokeWidth={2} name="Dropout Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Highlights */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Achievements
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• 96.8% Aadhaar linkage completed</li>
                  <li>• 84.7% gross enrollment ratio</li>
                  <li>• 1200+ institutes in top NIRF rankings</li>
                  <li>• Digital learning adoption: 78%</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Reduce dropout rate to under 10%</li>
                  <li>• Improve rural infrastructure quality</li>
                  <li>• Enhance faculty-student ratio</li>
                  <li>• Increase research output by 25%</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Recognition
                </h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• UNESCO award for digital education</li>
                  <li>• World Bank commendation for NEP 2020</li>
                  <li>• 23 institutes in global top 500</li>
                  <li>• Excellence in skill development programs</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* New Government Tabs */}
          <TabsContent value="government" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Government Dashboard
                </CardTitle>
                <CardDescription>
                  Policy analytics, state performance, and AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">National Literacy</p>
                          <p className="text-2xl font-bold">74.2%</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Dropout Rate</p>
                          <p className="text-2xl font-bold">12.8%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Scheme Adoption</p>
                          <p className="text-2xl font-bold">67.3%</p>
                        </div>
                        <Award className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active Policies</p>
                          <p className="text-2xl font-bold">47</p>
                        </div>
                        <FileText className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-600">Access comprehensive government-level analytics and policy insights.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nirf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  NIRF Analytics
                </CardTitle>
                <CardDescription>
                  Institution ranking analytics and peer comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Current Rank</p>
                        <p className="text-2xl font-bold">#42</p>
                        <p className="text-sm text-green-600">+6 from last year</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Teaching</p>
                        <p className="text-2xl font-bold">72.5</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Research</p>
                        <p className="text-2xl font-bold">64.2</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Placements</p>
                        <p className="text-2xl font-bold">75.8</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Perception</p>
                        <p className="text-2xl font-bold">69.1</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-600">Live NIRF-style ranking dashboard with detailed analytics.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Performance Heatmap
                </CardTitle>
                <CardDescription>
                  Interactive visualization of education metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-green-500 text-white rounded-lg">
                    <h3 className="font-medium">Kerala</h3>
                    <p className="text-sm opacity-90">Excellent Performance</p>
                    <p className="text-lg font-bold">3.2% Dropout</p>
                  </div>
                  <div className="p-4 bg-blue-500 text-white rounded-lg">
                    <h3 className="font-medium">Maharashtra</h3>
                    <p className="text-sm opacity-90">Good Performance</p>
                    <p className="text-lg font-bold">8.1% Dropout</p>
                  </div>
                  <div className="p-4 bg-yellow-500 text-white rounded-lg">
                    <h3 className="font-medium">Punjab</h3>
                    <p className="text-sm opacity-90">Average Performance</p>
                    <p className="text-lg font-bold">11.2% Dropout</p>
                  </div>
                  <div className="p-4 bg-red-500 text-white rounded-lg">
                    <h3 className="font-medium">Bihar</h3>
                    <p className="text-sm opacity-90">Needs Attention</p>
                    <p className="text-lg font-bold">18.9% Dropout</p>
                  </div>
                </div>
                <p className="text-gray-600">Real-time heatmap visualization with red/green indicators for performance metrics.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Blockchain Verification
                </CardTitle>
                <CardDescription>
                  High-authority verification for credentials and documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Verified Credentials</p>
                          <p className="text-2xl font-bold">12,847</p>
                        </div>
                        <Database className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Institutions Verified</p>
                          <p className="text-2xl font-bold">156</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Fake Documents Detected</p>
                          <p className="text-2xl font-bold">89</p>
                        </div>
                        <Shield className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-600">Blockchain-powered verification system for degrees, credentials, and institutional records.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;