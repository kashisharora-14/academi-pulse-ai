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
import { 
  LogOut, 
  Building2, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award,
  TrendingUp,
  DollarSign,
  Target,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  QrCode,
  Download,
  Plus,
  Edit,
  Shield, // Added for Authority Request Inbox
  Bell,   // Added for Authority Request Inbox
  Send    // Added for Authority Request Inbox
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area 
} from "recharts";

const departmentData = [
  { name: "CS", students: 450, faculty: 25, ratio: 18, capacity: 500 },
  { name: "EE", students: 380, faculty: 22, ratio: 17.3, capacity: 400 },
  { name: "ME", students: 320, faculty: 20, ratio: 16, capacity: 350 },
  { name: "CE", students: 290, faculty: 18, ratio: 16.1, capacity: 320 },
  { name: "EC", students: 410, faculty: 23, ratio: 17.8, capacity: 450 },
];

const placementData = [
  { year: "2020", placed: 75, packages: 650, highest: 1200 },
  { year: "2021", placed: 82, packages: 720, highest: 1500 },
  { year: "2022", placed: 88, packages: 800, highest: 1800 },
  { year: "2023", placed: 91, packages: 920, highest: 2200 },
  { year: "2024", placed: 94, packages: 1050, highest: 2500 },
];

const researchData = [
  { year: "2020", publications: 45, patents: 3, funding: 2.5 },
  { year: "2021", publications: 52, patents: 5, funding: 3.2 },
  { year: "2022", publications: 68, patents: 7, funding: 4.1 },
  { year: "2023", publications: 75, patents: 9, funding: 5.8 },
  { year: "2024", publications: 82, patents: 12, funding: 7.2 },
];

const complianceMetrics = [
  { category: "NAAC", score: 3.2, maxScore: 4, status: "A+", lastUpdated: "2023" },
  { category: "NIRF", rank: 85, type: "Engineering", improvement: "+5", year: "2024" },
  { category: "NBA", programs: 8, accredited: 6, percentage: 75, validity: "2026" },
  { category: "AICTE", status: "Approved", validity: "2025", students: 2000, approved: 2200 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--success))"];

const campusLocations = [
  { id: "1", name: "Main Campus", position: [28.5449, 77.1925] as [number, number], data: "Students: 5000, Area: 200 acres" },
  { id: "2", name: "Research Center", position: [28.5469, 77.1945] as [number, number], data: "Labs: 15, Faculty: 45" },
  { id: "3", name: "Hostel Complex", position: [28.5429, 77.1905] as [number, number], data: "Capacity: 3000 students" },
];

const affiliatedColleges = [
  { 
    id: "aff1", 
    name: "Government College, Sector 42", 
    position: [30.7333, 76.7794] as [number, number], 
    data: "Arts, Science & Commerce",
    city: "Chandigarh",
    type: "Government College",
    students: 3500,
    nirfRank: 120,
    placement: 78,
    research: 6.5,
    dropout: 8.2,
    performance: 'good' as const,
    programs: ["BA", "BSc", "BCom", "MA", "MSc"],
    established: 1965,
    accreditation: "NAAC A"
  },
  { 
    id: "aff2", 
    name: "DAV College", 
    position: [30.7194, 76.7310] as [number, number], 
    data: "Engineering & Technology",
    city: "Chandigarh",
    type: "Private College",
    students: 2800,
    nirfRank: 145,
    placement: 82,
    research: 5.8,
    dropout: 6.5,
    performance: 'good' as const,
    programs: ["B.Tech", "M.Tech", "BCA", "MCA"],
    established: 1978,
    accreditation: "NAAC A+"
  },
  { 
    id: "aff3", 
    name: "Government College", 
    position: [31.3260, 75.5762] as [number, number], 
    data: "Arts & Humanities",
    city: "Jalandhar",
    type: "Government College",
    students: 4200,
    nirfRank: 185,
    placement: 72,
    research: 5.2,
    dropout: 11.5,
    performance: 'average' as const,
    programs: ["BA", "MA", "BEd", "MEd"],
    established: 1968,
    accreditation: "NAAC B++"
  },
  { 
    id: "aff4", 
    name: "Lyallpur Khalsa College", 
    position: [31.3260, 75.5862] as [number, number], 
    data: "Science & Technology",
    city: "Jalandhar",
    type: "Private College",
    students: 3100,
    nirfRank: 165,
    placement: 75,
    research: 6.0,
    dropout: 9.8,
    performance: 'average' as const,
    programs: ["BSc", "MSc", "B.Tech", "Polytechnic"],
    established: 1969,
    accreditation: "NAAC A"
  },
  { 
    id: "aff5", 
    name: "Government Rajindra College", 
    position: [30.3398, 76.3869] as [number, number], 
    data: "Multi-disciplinary",
    city: "Bathinda",
    type: "Government College",
    students: 2950,
    nirfRank: 210,
    placement: 68,
    research: 4.5,
    dropout: 13.2,
    performance: 'needs-attention' as const,
    programs: ["BA", "BSc", "BCom", "BBA"],
    established: 1954,
    accreditation: "NAAC B+"
  },
  { 
    id: "aff6", 
    name: "Khalsa College", 
    position: [31.6340, 74.8723] as [number, number], 
    data: "Arts, Science & Commerce",
    city: "Amritsar",
    type: "Private College",
    students: 5100,
    nirfRank: 142,
    placement: 80,
    research: 7.2,
    dropout: 7.5,
    performance: 'good' as const,
    programs: ["BA", "BSc", "BCom", "MA", "MSc", "MCom"],
    established: 1892,
    accreditation: "NAAC A+"
  },
  { 
    id: "aff7", 
    name: "Government College for Women", 
    position: [30.9010, 75.8573] as [number, number], 
    data: "Women's Education",
    city: "Ludhiana",
    type: "Government College",
    students: 2400,
    nirfRank: 195,
    placement: 70,
    research: 5.5,
    dropout: 10.2,
    performance: 'average' as const,
    programs: ["BA", "BSc", "BCom", "BEd"],
    established: 1963,
    accreditation: "NAAC A"
  },
  { 
    id: "aff8", 
    name: "S.C.D. Government College", 
    position: [30.2010, 74.9455] as [number, number], 
    data: "Science & Arts",
    city: "Ludhiana",
    type: "Government College",
    students: 3600,
    nirfRank: 178,
    placement: 74,
    research: 5.9,
    dropout: 9.5,
    performance: 'average' as const,
    programs: ["BSc", "BA", "MSc", "MA"],
    established: 1949,
    accreditation: "NAAC A"
  },
  { 
    id: "aff9", 
    name: "Government College", 
    position: [30.7046, 76.5161] as [number, number], 
    data: "Multi-disciplinary",
    city: "Mohali",
    type: "Government College",
    students: 2700,
    nirfRank: 205,
    placement: 71,
    research: 5.0,
    dropout: 12.8,
    performance: 'needs-attention' as const,
    programs: ["BA", "BSc", "BCA", "BBA"],
    established: 2005,
    accreditation: "NAAC B++"
  },
  { 
    id: "aff10", 
    name: "Mehr Chand Mahajan DAV College", 
    position: [30.7446, 76.7294] as [number, number], 
    data: "Women's College",
    city: "Chandigarh",
    type: "Private College",
    students: 3200,
    nirfRank: 155,
    placement: 76,
    research: 6.8,
    dropout: 8.5,
    performance: 'good' as const,
    programs: ["BA", "BSc", "BCom", "MA"],
    established: 1965,
    accreditation: "NAAC A"
  }
];

const InstitutionDashboard = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">XYZ Institute of Technology - Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="enhanced-tabs-list grid w-full grid-cols-11">
              <TabsTrigger value="overview" className="enhanced-tab-trigger">
                <Building2 className="h-4 w-4 enhanced-tab-icon" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="enhanced-tab-trigger bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 font-semibold">
                <Award className="h-4 w-4 enhanced-tab-icon" />
                NIRF Analytics
              </TabsTrigger>
              <TabsTrigger value="academics" className="enhanced-tab-trigger">
                <BookOpen className="h-4 w-4 enhanced-tab-icon" />
                Academics
              </TabsTrigger>
              <TabsTrigger value="placements" className="enhanced-tab-trigger">
                <Users className="h-4 w-4 enhanced-tab-icon" />
                Placements
              </TabsTrigger>
              <TabsTrigger value="research" className="enhanced-tab-trigger">
                <FileText className="h-4 w-4 enhanced-tab-icon" />
                Research
              </TabsTrigger>
              <TabsTrigger value="compliance" className="enhanced-tab-trigger">
                <CheckCircle className="h-4 w-4 enhanced-tab-icon" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="schemes" className="enhanced-tab-trigger">
                <DollarSign className="h-4 w-4 enhanced-tab-icon" />
                Schemes
              </TabsTrigger>
              <TabsTrigger value="faculty" className="enhanced-tab-trigger">
                <GraduationCap className="h-4 w-4 enhanced-tab-icon" />
                Faculty
              </TabsTrigger>
              <TabsTrigger value="campus" className="enhanced-tab-trigger">
                <Building2 className="h-4 w-4 enhanced-tab-icon" />
                Campus
              </TabsTrigger>
              <TabsTrigger value="qr" className="enhanced-tab-trigger">
                <QrCode className="h-4 w-4 enhanced-tab-icon" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="export" className="enhanced-tab-trigger">
                <Download className="h-4 w-4 enhanced-tab-icon" />
                Export
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Enhanced Grid */}
          <div className="block lg:hidden">
            <div className="enhanced-mobile-tabs">
              <TabsTrigger value="overview" className="enhanced-mobile-tab">
                <Building2 className="enhanced-mobile-tab-icon" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="enhanced-mobile-tab bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300">
                <Award className="enhanced-mobile-tab-icon" />
                <span>NIRF</span>
              </TabsTrigger>
              <TabsTrigger value="academics" className="enhanced-mobile-tab">
                <BookOpen className="enhanced-mobile-tab-icon" />
                <span>Academics</span>
              </TabsTrigger>
              <TabsTrigger value="placements" className="enhanced-mobile-tab">
                <Users className="enhanced-mobile-tab-icon" />
                <span>Placements</span>
              </TabsTrigger>
              <TabsTrigger value="research" className="enhanced-mobile-tab">
                <FileText className="enhanced-mobile-tab-icon" />
                <span>Research</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="enhanced-mobile-tab">
                <CheckCircle className="enhanced-mobile-tab-icon" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="enhanced-mobile-tab">
                <DollarSign className="enhanced-mobile-tab-icon" />
                <span>Schemes</span>
              </TabsTrigger>
              <TabsTrigger value="faculty" className="enhanced-mobile-tab">
                <GraduationCap className="enhanced-mobile-tab-icon" />
                <span>Faculty</span>
              </TabsTrigger>
              <TabsTrigger value="campus" className="enhanced-mobile-tab">
                <Building2 className="enhanced-mobile-tab-icon" />
                <span>Campus</span>
              </TabsTrigger>
              <TabsTrigger value="qr" className="enhanced-mobile-tab">
                <QrCode className="enhanced-mobile-tab-icon" />
                <span>QR</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="enhanced-mobile-tab">
                <Download className="enhanced-mobile-tab-icon" />
                <span>Export</span>
              </TabsTrigger>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">+5.2%</Badge>
                </div>
                <div className="text-2xl font-bold">5,240</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
                <Progress value={87} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="h-8 w-8 text-accent" />
                  <Badge className="bg-success">+3.8%</Badge>
                </div>
                <div className="text-2xl font-bold">320</div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
                <Progress value={92} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">Rank 85</Badge>
                </div>
                <div className="text-2xl font-bold">NIRF</div>
                <div className="text-sm text-muted-foreground">Engineering Category</div>
                <Progress value={75} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-success" />
                  <Badge className="bg-success">94%</Badge>
                </div>
                <div className="text-2xl font-bold">Placement</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <Progress value={94} className="mt-2" />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Department-wise Enrollment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="hsl(var(--primary))" name="Current Students" />
                    <Bar dataKey="capacity" fill="hsl(var(--secondary))" name="Capacity" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Placement Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placed" stroke="hsl(var(--primary))" strokeWidth={2} name="Placement %" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate NIRF Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Faculty Performance Review
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Academic Analytics
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Compliance Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NAAC Accreditation</span>
                    <Badge className="bg-success">A+</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AICTE Approval</span>
                    <Badge className="bg-success">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NBA Accreditation</span>
                    <Badge className="bg-warning">Pending</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="text-sm font-semibold">4.2/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Faculty-Student Ratio</span>
                    <span className="text-sm font-semibold">1:16</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Research Output</span>
                    <span className="text-sm font-semibold">82 papers</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{dept.name}</h4>
                        <Badge variant="outline">{dept.students} students</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Faculty:</span>
                          <span className="ml-2 font-medium">{dept.faculty}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ratio:</span>
                          <span className="ml-2 font-medium">1:{dept.ratio}</span>
                        </div>
                      </div>
                      <Progress value={(dept.students / dept.capacity) * 100} className="mt-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Academic Calendar</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Current: Semester 6</h4>
                    <p className="text-sm text-blue-700">Mid-term examinations in progress</p>
                    <p className="text-xs text-blue-600">March 15 - March 30, 2024</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Upcoming: Summer Internships</h4>
                    <p className="text-sm text-green-700">Industry placement program</p>
                    <p className="text-xs text-green-600">May 1 - July 31, 2024</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Planning: Semester 7</h4>
                    <p className="text-sm text-purple-700">Course registration opens</p>
                    <p className="text-xs text-purple-600">July 15, 2024</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="placements" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Placement Statistics Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="placed" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Package Distribution by Year</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="packages" fill="hsl(var(--accent))" name="Average Package (₹L)" />
                    <Bar dataKey="highest" fill="hsl(var(--success))" name="Highest Package (₹L)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Top Recruiting Companies (2024)</h3>
                <div className="space-y-3">
                  {[
                    { company: "Microsoft", offers: 45, package: "₹18-25L", type: "Tech" },
                    { company: "Amazon", offers: 38, package: "₹15-22L", type: "Tech" },
                    { company: "Infosys", offers: 120, package: "₹6-8L", type: "IT Services" },
                    { company: "TCS", offers: 95, package: "₹5.5-7L", type: "IT Services" },
                    { company: "Goldman Sachs", offers: 12, package: "₹20-28L", type: "Finance" },
                    { company: "Google", offers: 8, package: "₹25-35L", type: "Tech" },
                    { company: "Wipro", offers: 78, package: "₹5-7L", type: "IT Services" },
                    { company: "Deloitte", offers: 25, package: "₹8-12L", type: "Consulting" }
                  ].map((company, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold text-sm">{company.company}</p>
                        <p className="text-xs text-muted-foreground">{company.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{company.offers} offers</p>
                        <p className="text-xs text-muted-foreground">{company.package}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Department-wise Placement Rates</h3>
                <div className="space-y-4">
                  {[
                    { dept: "Computer Science", placed: 185, total: 195, rate: 94.9 },
                    { dept: "Electronics & Comm", placed: 78, total: 85, rate: 91.8 },
                    { dept: "Mechanical", placed: 65, total: 75, rate: 86.7 },
                    { dept: "Civil", placed: 45, total: 55, rate: 81.8 },
                    { dept: "Electrical", placed: 52, total: 62, rate: 83.9 }
                  ].map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dept.dept}</span>
                        <span className="text-sm">{dept.rate}%</span>
                      </div>
                      <Progress value={dept.rate} />
                      <div className="text-xs text-muted-foreground">
                        {dept.placed} placed out of {dept.total} students
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Placement Support Services</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Training & Development</h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Technical skill workshops</li>
                      <li>• Soft skills training</li>
                      <li>• Mock interviews</li>
                      <li>• Resume building sessions</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Industry Partnerships</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• 150+ industry partners</li>
                      <li>• Regular campus drives</li>
                      <li>• Internship programs</li>
                      <li>• Alumni network support</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Career Guidance</h4>
                    <ul className="text-sm text-purple-700 mt-2 space-y-1">
                      <li>• One-on-one counseling</li>
                      <li>• Career path planning</li>
                      <li>• Higher studies guidance</li>
                      <li>• Entrepreneurship support</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Placement Calendar 2024-25</h3>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-blue-400 bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Pre-Placement Talks</h4>
                    <p className="text-sm text-blue-700">July - August 2024</p>
                    <p className="text-xs text-blue-600">Company presentations and job descriptions</p>
                  </div>

                  <div className="p-3 border-l-4 border-green-400 bg-green-50">
                    <h4 className="font-semibold text-green-800">Campus Recruitment Drive</h4>
                    <p className="text-sm text-green-700">September - December 2024</p>
                    <p className="text-xs text-green-600">Main placement season with major companies</p>
                  </div>

                  <div className="p-3 border-l-4 border-purple-400 bg-purple-50">
                    <h4 className="font-semibold text-purple-800">Pool Campus Drives</h4>
                    <p className="text-sm text-purple-700">January - March 2025</p>
                    <p className="text-xs text-purple-600">Additional opportunities for remaining students</p>
                  </div>

                  <div className="p-3 border-l-4 border-orange-400 bg-orange-50">
                    <h4 className="font-semibant text-orange-800">Internship Placements</h4>
                    <p className="text-sm text-orange-700">April - June 2025</p>
                    <p className="text-xs text-orange-600">Summer internship opportunities</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Success Stories & Achievements</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-yellow-800">Highest Package 2024</h4>
                    <p className="text-lg font-bold text-yellow-900">₹45 LPA</p>
                    <p className="text-sm text-yellow-700">International offer from Google (Software Engineer)</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800">100% Placement Achievement</h4>
                    <p className="text-sm text-green-700">Computer Science & Engineering department achieves 100% placement for 3rd consecutive year</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800">Alumni Success</h4>
                    <p className="text-sm text-blue-700">15 alumni in leadership positions at Fortune 500 companies, including 3 CEOs and 8 CTOs</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-semibold text-purple-800">Entrepreneurship</h4>
                    <p className="text-sm text-purple-700">25+ student startups funded, total valuation ₹150 Cr</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Performance Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={researchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="publications" stroke="hsl(var(--primary))" strokeWidth={2} name="Publications" />
                    <Line type="monotone" dataKey="patents" stroke="hsl(var(--secondary))" strokeWidth={2} name="Patents" />
                    <Line type="monotone" dataKey="funding" stroke="hsl(var(--success))" strokeWidth={2} name="Funding (₹Cr)" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Impact Metrics</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">4,250</div>
                      <div className="text-sm text-blue-700">Total Citations</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8.2</div>
                      <div className="text-sm text-green-700">H-Index Score</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">156</div>
                      <div className="text-sm text-purple-700">Scopus Indexed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">89</div>
                      <div className="text-sm text-orange-700">SCI Journals</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Research Quality Score</span>
                      <span className="font-semibold">85/100</span>
                    </div>
                    <Progress value={85} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">International Collaborations</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <Progress value={68} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Industry Partnerships</span>
                      <span className="font-semibold">72%</span>
                    </div>
                    <Progress value={72} />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Research Centers & Labs</h3>
                <div className="space-y-3">
                  {[
                    { name: "AI & Machine Learning Lab", faculty: 12, projects: 28, funding: "₹2.5Cr" },
                    { name: "Renewable Energy Research Center", faculty: 8, projects: 15, funding: "₹1.8Cr" },
                    { name: "Biotechnology Research Institute", faculty: 10, projects: 22, funding: "₹3.2Cr" },
                    { name: "Advanced Materials Lab", faculty: 6, projects: 18, funding: "₹1.5Cr" },
                    { name: "Cyber Security Research Center", faculty: 9, projects: 25, funding: "₹2.8Cr" },
                    { name: "Robotics & Automation Lab", faculty: 7, projects: 20, funding: "₹2.1Cr" }
                  ].map((lab, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">{lab.name}</h4>
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>Faculty: {lab.faculty}</div>
                        <div>Projects: {lab.projects}</div>
                        <div>Funding: {lab.funding}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Current Research Projects</h3>
                <div className="space-y-3">
                  {[
                    { 
                      title: "AI-Powered Educational Assessment", 
                      pi: "Dr. Sharma", 
                      funding: "₹45L", 
                      agency: "DST",
                      duration: "2023-2026",
                      status: "Ongoing"
                    },
                    { 
                      title: "Smart Grid Technologies", 
                      pi: "Dr. Kumar", 
                      funding: "₹38L", 
                      agency: "SERB",
                      duration: "2022-2025", 
                      status: "Ongoing"
                    },
                    { 
                      title: "Nano-materials for Water Purification", 
                      pi: "Dr. Patel", 
                      funding: "₹52L", 
                      agency: "DBT",
                      duration: "2024-2027", 
                      status: "New"
                    },
                    { 
                      title: "Blockchain in Healthcare", 
                      pi: "Dr. Singh", 
                      funding: "₹28L", 
                      agency: "ICMR",
                      duration: "2023-2025", 
                      status: "Ongoing"
                    }
                  ].map((project, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm">{project.title}</h4>
                        <Badge variant={project.status === "New" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>PI: {project.pi}</div>
                        <div>Funding: {project.funding} ({project.agency})</div>
                        <div>Duration: {project.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Research Achievements</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-yellow-800">Patent Filed</h4>
                    <p className="text-sm text-yellow-700">"Smart IoT Device for Air Quality Monitoring"</p>
                    <p className="text-xs text-yellow-600">Filed: March 2024</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800">Best Paper Award</h4>
                    <p className="text-sm text-blue-700">IEEE International Conference on AI</p>
                    <p className="text-xs text-blue-600">Dr. Sharma's research team</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800">Research Grant Sanctioned</h4>
                    <p className="text-sm text-green-700">₹85L from ISRO for Satellite Technology</p>
                    <p className="text-xs text-green-600">3-year project duration</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-semibold text-purple-800">Technology Transfer</h4>
                    <p className="text-sm text-purple-700">2 technologies licensed to industry partners</p>
                    <p className="text-xs text-purple-600">Revenue: ₹15L generated</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800">International Collaboration</h4>
                    <p className="text-sm text-red-700">MoU signed with MIT for joint research</p>
                    <p className="text-xs text-red-600">Focus: Clean Energy Solutions</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Publications by Domain</h3>
                <div className="space-y-4">
                  {[
                    { domain: "Artificial Intelligence & ML", count: 28, impact: 4.2, trending: "+15%" },
                    { domain: "Renewable Energy", count: 22, impact: 3.8, trending: "+22%" },
                    { domain: "Biotechnology", count: 18, impact: 3.9, trending: "+8%" },
                    { domain: "Materials Science", count: 15, impact: 3.5, trending: "+12%" },
                    { domain: "Cyber Security", count: 12, impact: 4.1, trending: "+25%" },
                    { domain: "Robotics & Automation", count: 10, impact: 3.7, trending: "+18%" }
                  ].map((domain, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold text-sm">{domain.domain}</p>
                        <p className="text-xs text-muted-foreground">Impact Factor: {domain.impact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{domain.count} papers</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">{domain.trending}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Support & Infrastructure</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Funding Sources</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Government Agencies: 65% (DST, SERB, DBT, ICMR)</li>
                      <li>• Industry Partnerships: 25% (TCS, Infosys, BHEL)</li>
                      <li>• International Grants: 10% (Newton Fund, NSF)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Research Facilities</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Central Instrumentation Facility</li>
                      <li>• High Performance Computing Center</li>
                      <li>• Advanced Characterization Lab</li>
                      <li>• Prototype Development Workshop</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Student Research Programs</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• 150+ UG students in research projects</li>
                      <li>• 85 PhD scholars enrolled</li>
                      <li>• 25 research publications by students</li>
                      <li>• Summer Research Internship Program</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {complianceMetrics.map((metric, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-4">{metric.category} Status</h3>
                  <div className="space-y-3">
                    {metric.category === "NAAC" && (
                      <>
                        <div className="flex justify-between">
                          <span>Grade:</span>
                          <Badge className="bg-success">{metric.status}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span>{metric.score}/{metric.maxScore}</span>
                        </div>
                        <Progress value={(metric.score! / metric.maxScore!) * 100} />
                      </>
                    )}
                    {metric.category === "NIRF" && (
                      <>
                        <div className="flex justify-between">
                          <span>Rank:</span>
                          <span className="font-semibold">{metric.rank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{metric.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Improvement:</span>
                          <Badge className="bg-success">{metric.improvement}</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Government Schemes Management</h3>
                <div className="space-y-6">

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Scheme Category</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>All Categories</option>
                        <option>Merit Scholarships</option>
                        <option>Need-based Aid</option>
                        <option>Research Grants</option>
                        <option>Infrastructure Development</option>
                        <option>Skill Development</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Academic Year</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>2024-25</option>
                        <option>2023-24</option>
                        <option>2022-23</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "National Scholarship Portal (NSP)",
                        category: "Merit Scholarship",
                        budget: "₹50,00,000",
                        allocated: "₹45,00,000",
                        utilized: "₹38,50,000",
                        beneficiaries: 320,
                        status: "Active",
                        deadline: "March 31, 2024",
                        criteria: "Family income < ₹2.5 LPA, Min 75% marks",
                        documents: ["Income Certificate", "Marksheet", "Bank Details"],
                        contact: "nsp@education.gov.in"
                      },
                      {
                        name: "Post Matric Scholarship SC/ST",
                        category: "Need-based Aid", 
                        budget: "₹35,00,000",
                        allocated: "₹35,00,000",
                        utilized: "₹28,75,000",
                        beneficiaries: 185,
                        status: "Active",
                        deadline: "April 15, 2024",
                        criteria: "SC/ST category, Family income < ₹2 LPA",
                        documents: ["Caste Certificate", "Income Certificate", "Marksheet"],
                        contact: "pmss@tribal.gov.in"
                      },
                      {
                        name: "INSPIRE Scholarship",
                        category: "Research Grants",
                        budget: "₹25,00,000", 
                        allocated: "₹20,00,000",
                        utilized: "₹15,50,000",
                        beneficiaries: 50,
                        status: "Active",
                        deadline: "May 31, 2024",
                        criteria: "Top 1% in Board exams, Science stream",
                        documents: ["Marksheet", "Research Proposal", "Recommendation Letter"],
                        contact: "inspire@dst.gov.in"
                      },
                      {
                        name: "PMKVY 4.0 - Skill Development",
                        category: "Skill Development",
                        budget: "₹15,00,000",
                        allocated: "₹12,00,000", 
                        utilized: "₹10,80,000",
                        beneficiaries: 120,
                        status: "Ongoing",
                        deadline: "June 30, 2024",
                        criteria: "Age 18-35, Class 10+ pass",
                        documents: ["Age Proof", "Educational Certificate", "Aadhar Card"],
                        contact: "pmkvy@msde.gov.in"
                      }
                    ].map((scheme, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{scheme.name}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{scheme.category}</Badge>
                              <Badge variant={scheme.status === "Active" ? "default" : "secondary"}>
                                {scheme.status}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total Budget:</span>
                            <div className="font-semibold text-primary">{scheme.budget}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Allocated:</span>
                            <div className="font-semibold text-blue-600">{scheme.allocated}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Utilized:</span>
                            <div className="font-semibold text-green-600">{scheme.utilized}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Beneficiaries:</span>
                            <div className="font-semibold">{scheme.beneficiaries}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Utilization Progress</span>
                            <span>{((parseFloat(scheme.utilized.replace(/[₹,]/g, '')) / parseFloat(scheme.allocated.replace(/[₹,]/g, ''))) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(parseFloat(scheme.utilized.replace(/[₹,]/g, '')) / parseFloat(scheme.allocated.replace(/[₹,]/g, ''))) * 100} />
                        </div>

                        <div className="bg-gray-50 rounded p-3 space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium">Deadline: </span>
                              <span className="text-red-600">{scheme.deadline}</span>
                            </div>
                            <div>
                              <span className="font-medium">Contact: </span>
                              <span className="text-blue-600">{scheme.contact}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Eligibility: </span>
                            <span>{scheme.criteria}</span>
                          </div>
                          <div>
                            <span className="font-medium">Required Documents: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {scheme.documents.map((doc, docIndex) => (
                                <Badge key={docIndex} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Add Beneficiary
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="h-4 w-4 mr-1" />
                            Student List
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="mr-2 h-4 w-4" />
                      Apply New Scheme
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Compliance Check
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Budget Planning
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Add New Beneficiary</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Student ID</label>
                      <input 
                        type="text" 
                        placeholder="Enter Student ID"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Scheme</label>
                      <select className="w-full p-2 border rounded-md text-sm">
                        <option>Select Scheme</option>
                        <option>NSP Scholarship</option>
                        <option>Post Matric SC/ST</option>
                        <option>INSPIRE</option>
                        <option>PMKVY 4.0</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <input 
                        type="number" 
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    <Button size="sm" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Add Beneficiary
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Scheme Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Applications</span>
                      <span className="font-semibold">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approved</span>
                      <span className="font-semibold text-green-600">896</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <span className="font-semibold text-yellow-600">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rejected</span>
                      <span className="font-semibold text-red-600">110</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-sm mb-2">Approval Rate: 72.3%</div>
                      <Progress value={72.3} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Faculty Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Professors", value: 45, fill: "hsl(var(--primary))" },
                        { name: "Associate Prof", value: 120, fill: "hsl(var(--secondary))" },
                        { name: "Assistant Prof", value: 155, fill: "hsl(var(--accent))" },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                    >
                      {[
                        { name: "Professors", value: 45, fill: "hsl(var(--primary))" },
                        { name: "Associate Prof", value: 120, fill: "hsl(var(--secondary))" },
                        { name: "Assistant Prof", value: 155, fill: "hsl(var(--accent))" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Qualifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Ph.D Holders:</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <Progress value={75} />
                  <div className="flex justify-between">
                    <span>Industry Experience:</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <Progress value={40} />
                  <div className="flex justify-between">
                    <span>Published Authors:</span>
                    <span className="font-semibold">62%</span>
                  </div>
                  <Progress value={62} />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Avg. Rating:</span>
                    <span className="font-semibold">4.2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Research Active:</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training Completed:</span>
                    <span className="font-semibold">92%</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Department-wise Faculty Strength</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="faculty" fill="hsl(var(--primary))" name="Faculty Count" />
                    <Bar dataKey="ratio" fill="hsl(var(--secondary))" name="Student-Faculty Ratio" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Faculty Recruitment Timeline</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Ongoing Recruitment</h4>
                    <p className="text-sm text-blue-700">Computer Science - 5 positions</p>
                    <p className="text-xs text-blue-600">Applications close: April 15, 2024</p>
                    <Button size="sm" className="mt-2">View Applications</Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Interview Schedule</h4>
                    <p className="text-sm text-green-700">Mechanical Engg - 3 candidates</p>
                    <p className="text-xs text-green-600">Date: March 25-27, 2024</p>
                    <Button size="sm" className="mt-2">Manage Interviews</Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Joining Soon</h4>
                    <p className="text-sm text-purple-700">Electronics - 2 new faculty</p>
                    <p className="text-xs text-purple-600">Expected: May 1, 2024</p>
                    <Button size="sm" className="mt-2">Onboarding Prep</Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Faculty Development</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">Workshops Attended</h4>
                    <p className="text-xs text-muted-foreground">85 faculty in Q1 2024</p>
                    <Progress value={85} className="mt-1" />
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">Conference Participation</h4>
                    <p className="text-xs text-muted-foreground">45 international, 78 national</p>
                    <Progress value={75} className="mt-1" />
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">Research Collaboration</h4>
                    <p className="text-xs text-muted-foreground">32 active projects</p>
                    <Progress value={68} className="mt-1" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recognition & Awards</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">Dr. Sharma - Best Teacher Award</p>
                      <p className="text-xs text-muted-foreground">National Level - 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">Prof. Kumar - Research Excellence</p>
                      <p className="text-xs text-muted-foreground">IEEE Recognition - 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Dr. Patel - Innovation Grant</p>
                      <p className="text-xs text-muted-foreground">DST Grant - ₹25L</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add New Faculty
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Performance Review
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Training Schedule
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campus" className="space-y-6">
            {/* Affiliated Colleges Section */}
            <div className="mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-primary" />
                      Affiliated Colleges Network
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      View and monitor all colleges affiliated with Panjab University across Punjab
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{affiliatedColleges.length}</div>
                    <div className="text-sm text-muted-foreground">Total Colleges</div>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {affiliatedColleges.reduce((sum, college) => sum + college.students, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(affiliatedColleges.reduce((sum, college) => sum + college.placement, 0) / affiliatedColleges.length)}%
                    </div>
                    <div className="text-sm text-green-700">Avg Placement</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">
                      {affiliatedColleges.filter(c => c.performance === 'good').length}
                    </div>
                    <div className="text-sm text-purple-700">High Performers</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">
                      {affiliatedColleges.filter(c => c.performance === 'needs-attention').length}
                    </div>
                    <div className="text-sm text-orange-700">Need Attention</div>
                  </div>
                </div>

                {/* Map of Affiliated Colleges */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-3">Geographic Distribution</h3>
                  <MapView 
                    locations={affiliatedColleges} 
                    center={[30.7333, 76.7794]} 
                    zoom={8} 
                  />
                </div>

                {/* Performance Legend */}
                <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Good Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Average</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Needs Attention</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Colleges by City */}
            <div className="mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Colleges by City</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from(new Set(affiliatedColleges.map(c => c.city))).map((city) => {
                    const cityColleges = affiliatedColleges.filter(c => c.city === city);
                    return (
                      <div key={city} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">{city}</h4>
                          <Badge variant="outline">{cityColleges.length} colleges</Badge>
                        </div>
                        <div className="space-y-2">
                          {cityColleges.map((college) => (
                            <div key={college.id} className="p-2 bg-gray-50 rounded text-sm">
                              <div className="font-medium">{college.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                👥 {college.students.toLocaleString()} students • 📊 {college.placement}% placement
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {college.type} • Est. {college.established}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Detailed College Information Table */}
            <div className="mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Detailed College Information</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3 font-semibold">College Name</th>
                        <th className="text-left p-3 font-semibold">City</th>
                        <th className="text-center p-3 font-semibold">Students</th>
                        <th className="text-center p-3 font-semibold">NIRF Rank</th>
                        <th className="text-center p-3 font-semibold">Placement %</th>
                        <th className="text-center p-3 font-semibold">Accreditation</th>
                        <th className="text-center p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliatedColleges.map((college) => (
                        <tr key={college.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium">{college.name}</div>
                            <div className="text-xs text-muted-foreground">{college.data}</div>
                          </td>
                          <td className="p-3">{college.city}</td>
                          <td className="p-3 text-center">{college.students.toLocaleString()}</td>
                          <td className="p-3 text-center">#{college.nirfRank}</td>
                          <td className="p-3 text-center">
                            <span className={`font-medium ${
                              college.placement >= 80 ? 'text-green-600' :
                              college.placement >= 70 ? 'text-yellow-600' : 'text-orange-600'
                            }`}>
                              {college.placement}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant="outline">{college.accreditation}</Badge>
                          </td>
                          <td className="p-3 text-center">
                            <Badge className={
                              college.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                              college.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-orange-100 text-orange-800'
                            }>
                              {college.performance === 'good' ? 'Good' :
                               college.performance === 'average' ? 'Average' : 'Needs Attention'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Original Campus Infrastructure Section */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Main Campus Infrastructure Map</h3>
                <MapView locations={campusLocations} center={[28.5449, 77.1925]} zoom={15} />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Infrastructure Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">200</div>
                    <div className="text-sm text-blue-700">Total Acres</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <div className="text-sm text-green-700">Buildings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">120</div>
                    <div className="text-sm text-purple-700">Classrooms</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">35</div>
                    <div className="text-sm text-orange-700">Laboratories</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Facility Utilization</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Classrooms</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Laboratories</span>
                      <span className="text-sm font-semibold">78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Library</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Auditorium</span>
                      <span className="text-sm font-semibold">65%</span>
                    </div>
                    <Progress value={65} />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Maintenance Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Electrical Systems</p>
                      <p className="text-xs text-muted-foreground">Last checked: March 15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">HVAC Systems</p>
                      <p className="text-xs text-muted-foreground">Maintenance due</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Network Infrastructure</p>
                      <p className="text-xs text-muted-foreground">Optimal performance</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Security & Safety</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">CCTV Cameras</h4>
                    <p className="text-xs text-muted-foreground">450 active cameras</p>
                    <Badge className="bg-success mt-1">100% operational</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">Fire Safety</h4>
                    <p className="text-xs text-muted-foreground">All systems checked</p>
                    <Badge className="bg-success mt-1">Compliant</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm">Security Personnel</h4>
                    <p className="text-xs text-muted-foreground">24/7 coverage</p>
                    <Badge className="bg-success mt-1">Full staffed</Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Infrastructure Projects</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">New Computer Lab</h4>
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">State-of-the-art computing facility with 60 workstations</p>
                    <div className="text-xs text-muted-foreground">
                      Budget: ₹50L | Completed: March 2024
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Solar Power Installation</h4>
                      <Badge className="bg-blue-500">In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">500KW solar panel installation for sustainable energy</p>
                    <Progress value={75} className="mb-2" />
                    <div className="text-xs text-muted-foreground">
                      Budget: ₹2.5Cr | Expected: April 2024
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Student Recreation Center</h4>
                      <Badge className="bg-yellow-500">Planning</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Multi-purpose facility with gym, games, and cafeteria</p>
                    <div className="text-xs text-muted-foreground">
                      Budget: ₹8Cr | Expected Start: June 2024
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Campus Services</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Hostels</h4>
                    <p className="text-xs text-muted-foreground">8 blocks, 3000 capacity</p>
                    <Badge className="bg-success mt-1">95% occupied</Badge>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Library</h4>
                    <p className="text-xs text-muted-foreground">5 floors, 50K books</p>
                    <Badge className="bg-success mt-1">Digital enabled</Badge>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Cafeteria</h4>
                    <p className="text-xs text-muted-foreground">4 outlets, 1200 seats</p>
                    <Badge className="bg-success mt-1">Hygienic certified</Badge>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Sports Complex</h4>
                    <p className="text-xs text-muted-foreground">10 sports, Olympic size</p>
                    <Badge className="bg-success mt-1">Award winning</Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Book Facility
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Usage Analytics
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <QRCodeGenerator 
                data={{ 
                  id: "INST-2024-001",
                  name: "XYZ Institute of Technology",
                  nirfRank: 85,
                  naacGrade: "A+",
                  totalStudents: 5240,
                  faculty: 320,
                  placementRate: 94,
                  researchPapers: 82,
                  patents: 12,
                  funding: 7.2,
                  accreditations: ["NAAC A+", "NBA", "AICTE"],
                  departments: ["CS", "EE", "ME", "CE", "EC"]
                }} 
                type="institution"
                title="Institution Profile QR"
              />
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">QR Code Management</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Generate New QR
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🏛️ Institution Profile</h4>
                    <p className="text-sm text-blue-700">
                      Complete institutional profile with NIRF ranking, accreditations, and performance metrics
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Update Info
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎓 Department Wise</h4>
                    <p className="text-sm text-green-700">
                      Individual QR codes for each department with faculty and student details
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Department
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🏆 Achievements</h4>
                    <p className="text-sm text-purple-700">
                      Awards, recognitions, and milestone achievements
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Achievement
                    </Button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🔬 Research Centers</h4>
                    <p className="text-sm text-orange-700">
                      Research facilities and ongoing projects
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Research Center
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
                  name: "XYZ Institute of Technology",
                  id: "INST-2023-001",
                  totalStudents: 5240,
                  totalFaculty: 320,
                  nirf_rank: 85,
                  placement_rate: 94,
                  research_papers: 82,
                  patents: 12,
                  funding: "₹7.2Cr"
                }}
                title="Institution Report - XYZ Institute"
                type="institution"
              />
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Export Options</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🏛️ Institutional Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete institutional performance and analytics report
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">👥 Faculty Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      APAR data and teaching effectiveness metrics
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🎓 Student Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Academic outcomes and placement statistics
                    </p>
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
                    Authority Request Inbox
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Respond to data requests from higher authorities. All requests are legally binding.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">2 Urgent</Badge>
                  <Badge variant="outline">5 Pending</Badge>
                </div>
              </div>

              {/* Urgent Request */}
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-red-800">URGENT: Ministry of Education Data Request</h4>
                        <Badge className="bg-red-500">3 Days Remaining</Badge>
                      </div>
                      <p className="text-sm text-red-700">Received: March 15, 2024 • Due: March 20, 2024 • Authority: MoE Level 1</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded mb-3">
                    <h5 className="font-semibold mb-2">Requested Data:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complete faculty APAR data for 2023-24</li>
                      <li>• NIRF parameter-wise institutional scores</li>
                      <li>• Student placement statistics (company-wise)</li>
                      <li>• Research output and patent information</li>
                      <li>• Infrastructure utilization metrics</li>
                    </ul>
                  </div>

                  <div className="bg-red-100 p-3 rounded mb-3">
                    <div className="text-sm text-red-800">
                      <span className="font-medium">Legal Notice:</span> This is an official request under the Education Act. 
                      Non-compliance may result in administrative action.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Submit Response
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      Upload Documents
                    </Button>
                    <Button variant="outline">
                      <Bell className="h-4 w-4 mr-1" />
                      Request Extension
                    </Button>
                  </div>
                </div>

                {/* Regular Requests */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">UGC Annual Compliance Report</h4>
                        <Badge className="bg-blue-500">15 Days Remaining</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Received: March 10, 2024 • Due: March 30, 2024 • Authority: UGC</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded mb-3 text-sm">
                    <span className="font-medium">Requirements: </span>
                    Annual academic audit, financial statements, faculty qualification matrix, student feedback analysis
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Start Preparation</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">AICTE Technical Audit Data</h4>
                        <Badge className="bg-green-500">Submitted</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Submitted: March 8, 2024 • Authority: AICTE</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">Response submitted successfully. Acknowledgment received.</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              </div>

              {/* Response Form */}
              <Card className="p-6 mt-6 bg-blue-50/30 border-blue-200">
                <h3 className="text-lg font-bold mb-4">Submit Response to Authority Request</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Select Request</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>Ministry of Education Data Request (Due: Mar 20)</option>
                      <option>UGC Annual Compliance Report (Due: Mar 30)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Response Status</label>
                    <select className="w-full p-2 border rounded-md mt-1">
                      <option>Complete Response</option>
                      <option>Partial Response - More time needed</option>
                      <option>Unable to comply - Request clarification</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Upload Documents</label>
                    <input type="file" multiple className="w-full p-2 border rounded-md mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">Accepted formats: PDF, Excel, ZIP (Max 50MB per file)</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Additional Comments</label>
                    <textarea
                      className="w-full p-2 border rounded-md mt-1"
                      rows={3}
                      placeholder="Any additional information or clarifications..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Official Response
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>


          <TabsContent value="analytics" className="space-y-6">
            {/* NIRF Analytics Dashboard */}
            <div className="grid gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                      NIRF Analytics Dashboard
                    </h2>
                    <p className="text-gray-600 mt-1">Live NIRF-style ranking and performance analytics</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">#85</div>
                    <div className="text-sm text-gray-600">NIRF Rank 2024</div>
                    <Badge className="bg-green-100 text-green-800 mt-1">+5 from 2023</Badge>
                  </div>
                </div>

                {/* NIRF Parameter Scores */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="text-center">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-800">72.5</div>
                      <div className="text-sm text-blue-600">Teaching & Learning</div>
                      <Progress value={72.5} className="mt-2 h-2" />
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
                    <div className="text-center">
                      <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-800">64.2</div>
                      <div className="text-sm text-green-600">Research & Innovation</div>
                      <Progress value={64.2} className="mt-2 h-2" />
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
                    <div className="text-center">
                      <GraduationCap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">75.8</div>
                      <div className="text-sm text-purple-600">Graduation Outcomes</div>
                      <Progress value={75.8} className="mt-2 h-2" />
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100">
                    <div className="text-center">
                      <Building2 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-800">58.3</div>
                      <div className="text-sm text-orange-600">Outreach & Inclusivity</div>
                      <Progress value={58.3} className="mt-2 h-2" />
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100">
                    <div className="text-center">
                      <Target className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-pink-800">69.1</div>
                      <div className="text-sm text-pink-600">Perception</div>
                      <Progress value={69.1} className="mt-2 h-2" />
                    </div>
                  </Card>
                </div>
              </Card>
            </div>

            {/* Peer Comparison Section */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Peer Comparison Analysis
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Research Output Gap</h4>
                    <p className="text-sm text-red-700 mb-2">
                      You are <span className="font-bold">8.3 points</span> behind <span className="font-bold">IIT Ropar</span> in Research & Innovation
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded">Your Score: <span className="font-bold">64.2</span></div>
                      <div className="bg-white p-2 rounded">IIT Ropar: <span className="font-bold">72.5</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800 mb-2">📊 Below State Average</h4>
                    <p className="text-sm text-orange-700 mb-2">
                      Outreach & Inclusivity is <span className="font-bold">11.7 points</span> below Punjab state average
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded">Your Score: <span className="font-bold">58.3</span></div>
                      <div className="bg-white p-2 rounded">Punjab Avg: <span className="font-bold">70.0</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">🏆 Strength Area</h4>
                    <p className="text-sm text-green-700 mb-2">
                      Graduation Outcomes <span className="font-bold">5.5 points</span> above national average
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded">Your Score: <span className="font-bold">75.8</span></div>
                      <div className="bg-white p-2 rounded">National Avg: <span className="font-bold">70.3</span></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Detailed Performance Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { parameter: 'Teaching', your: 72.5, peer: 78.2, state: 69.8, national: 65.4 },
                    { parameter: 'Research', your: 64.2, peer: 72.5, state: 67.1, national: 58.7 },
                    { parameter: 'Placements', your: 75.8, peer: 73.4, state: 71.2, national: 70.3 },
                    { parameter: 'Outreach', your: 58.3, peer: 65.7, state: 70.0, national: 52.1 },
                    { parameter: 'Perception', your: 69.1, peer: 74.8, state: 67.3, national: 61.9 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="parameter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="your" fill="#8884d8" name="Your Institution" />
                    <Bar dataKey="peer" fill="#82ca9d" name="Top Peer (IIT Ropar)" />
                    <Bar dataKey="state" fill="#ffc658" name="State Average" />
                    <Bar dataKey="national" fill="#ff7300" name="National Average" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Actionable Insights */}
            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-red-800">🎯 Priority Actions</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                    <h4 className="font-semibold text-sm">Research Publications</h4>
                    <p className="text-xs text-gray-600">Target: +25 publications in top-tier journals</p>
                    <p className="text-xs text-red-600 mt-1">Expected NIRF boost: +3.2 points</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                    <h4 className="font-semibold text-sm">Patent Filing</h4>
                    <p className="text-xs text-gray-600">Current: 12 patents | Target: 20 patents</p>
                    <p className="text-xs text-red-600 mt-1">Expected NIRF boost: +2.8 points</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                    <h4 className="font-semibant text-sm">Industry Collaboration</h4>
                    <p className="text-xs text-gray-600">Increase funded projects from industry</p>
                    <p className="text-xs text-red-600 mt-1">Expected NIRF boost: +2.1 points</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  <Target className="h-4 w-4 mr-2" />
                  Create Action Plan
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-800">📈 Growth Opportunities</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <h4 className="font-semibold text-sm">International Faculty</h4>
                    <p className="text-xs text-gray-600">Current: 8% | Peer average: 15%</p>
                    <p className="text-xs text-blue-600 mt-1">Gap to close: 7 percentage points</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <h4 className="font-semibold text-sm">Ph.D Enrollment</h4>
                    <p className="text-xs text-gray-600">Current: 85 students | Target: 120</p>
                    <p className="text-xs text-blue-600 mt-1">Increase research capacity</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <h4 className="font-semibold text-sm">Consultancy Projects</h4>
                    <p className="text-xs text-gray-600">Current revenue: ₹2.5Cr | Target: ₹5Cr</p>
                    <p className="text-xs text-blue-600 mt-1">Double industry engagement</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Roadmap
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 text-green-800">✅ Maintain Strengths</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <h4 className="font-semibold text-sm">Placement Rate</h4>
                    <p className="text-xs text-gray-600">Current: 94% | National avg: 70%</p>
                    <p className="text-xs text-green-600 mt-1">Continue excellence</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <h4 className="font-semibold text-sm">Faculty-Student Ratio</h4>
                    <p className="text-xs text-gray-600">Current: 1:16 | Benchmark: 1:20</p>
                    <p className="text-xs text-green-600 mt-1">Better than average</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <h4 className="font-semibold text-sm">Alumni Network</h4>
                    <p className="text-xs text-gray-600">Strong industry connections</p>
                    <p className="text-xs text-green-600 mt-1">Leverage for placements</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Success Strategies
                </Button>
              </Card>
            </div>

            {/* Ranking Prediction */}
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                NIRF Ranking Prediction & Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2">📉 Current Trajectory</h4>
                  <div className="text-2xl font-bold text-red-900">#92-98</div>
                  <p className="text-sm text-red-700 mt-1">If no action taken</p>
                  <p className="text-xs text-red-600 mt-2">Risk: Research output decline</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">⚡ With Improvements</h4>
                  <div className="text-2xl font-bold text-blue-900">#75-80</div>
                  <p className="text-sm text-blue-700 mt-1">Moderate improvements</p>
                  <p className="text-xs text-blue-600 mt-2">Timeline: 12-18 months</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">🚀 Ambitious Target</h4>
                  <div className="text-2xl font-bold text-green-900">#65-70</div>
                  <p className="text-sm text-green-700 mt-1">Aggressive improvements</p>
                  <p className="text-xs text-green-600 mt-2">Timeline: 24-30 months</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">🎯 Key Focus Areas for Next NIRF Cycle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-yellow-900">Research & Innovation (Priority #1)</p>
                    <ul className="text-yellow-700 text-xs mt-1 space-y-1">
                      <li>• Target 30+ high-impact publications</li>
                      <li>• File 8+ patents annually</li>
                      <li>• Secure ₹5Cr+ research funding</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-900">Outreach & Inclusivity (Priority #2)</p>
                    <ul className="text-yellow-700 text-xs mt-1 space-y-1">
                      <li>• Increase rural student enrollment</li>
                      <li>• Launch 5+ community programs</li>
                      <li>• Enhance accessibility infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI-Generated Insights */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Performance Trend</h4>
                    <p className="text-sm text-blue-700">Your NIRF ranking has improved by 5 positions. Continue focus on research output.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Strength</h4>
                    <p className="text-sm text-green-700">Placement rates consistently above national average. Excellent industry partnerships.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Recommendation</h4>
                    <p className="text-sm text-yellow-700">Increase research funding allocation to boost publication count and patent filings.</p>
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

export default InstitutionDashboard;